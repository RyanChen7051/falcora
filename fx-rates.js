/* ================= 汇率快照 + 每日自动刷新（2026-10-22 v62）=================
   为什么要有这个文件：
     v61 之前 08 页的「报价汇率 / 当前汇率」全靠手输，没有任何更新机制 ——
     用户填一次 7.18 就永远停在 7.18，报价和实际结算的汇率差可能已经很大，
     而「汇率损益」那一行还在拿这个旧值算，等于把风险算成了 0。

   三层取值（优先级从高到低）：
     ① localStorage 缓存（falcora_fx_v1）—— 当天已拉过、且拿到的就是当日牌价，就不再请求
     ② 运行时拉取，三个源依次尝试：
        · open.er-api.com        166 币种，与银行中间价最接近（实测 CNY/TWD 差 0.04%）
        · currency-api (jsDelivr) 166 币种，国内可达（er-api 在国内常超时）
        · api.frankfurter.dev    欧洲央行，最稳但缺 AED / VND / TWD
     ③ 本文件内置快照 SNAP —— 离线 / 首次打开 / 三个源全挂时的兜底，保证页面永远有值可用

   口径（重要）：
     · rates[X] = 「1 单位基准币（CNY）= 多少 X」。
       页面要的是「1 单位报价币 = 多少本币」，换算：rate(from→to) = rates[to] / rates[from]。
     · 这是**公开参考牌价（中间价）**，不是银行结汇价。实际结汇有 0.1%~0.5% 价差与手续费，
       页面脚注必须写清，不能让使用者以为这就是到手汇率。
     · 币种相同（如报价币与本币都是 CNY）→ 汇率恒为 1，不查表。
     · **不同来源之间本来就差 0.1%~0.4%**，不是算错（2026-10-29 实测同一天：
       百度财经 CNYTWD 4.8588 / er-api 4.8567~4.8780 / jsDelivr 4.8690）。
       TWD、VND 这类管制货币，聚合商都是拿美元交叉折算，不是当地市场直接报价，
       差得比欧美货币更明显。所以界面必须写出来源与日期，并允许手输覆盖。

   对外接口（挂在 window 上，供 08 页调用）：
     window.__falFx.current()             → { base, date, source, rates, fetchedAt, fetchedToday, stale }
     window.__falFx.rate(from, to)        → number | null
     window.__falFx.ensureFresh(cb)       → 当天没拉过就异步拉，cb(status)
     window.__falFx.refresh(cb)           → 强制拉一次，cb(status)
     window.__falFx.status()              → { date, source, stale, ok, fetchedToday }
   刷新成功会 dispatch 'fal-fx-updated' 事件，页面监听后重算。
   ========================================================================= */
(function () {
  "use strict";

  /* ↓↓↓ 快照由 scripts/build_fx_snapshot.js 生成，勿手改 ↓↓↓ */
  var SNAP = {
    base: "CNY",
    date: "2026-10-28",
    source: "exchangerate-api.com",
    rates: {
      CNY: 1, USD: 0.149678, EUR: 0.134436, JPY: 23.636948, GBP: 0.112486,
      AED: 0.54969, VND: 3875.968992, INR: 14.269203, HKD: 1.174105, TWD: 4.878049,
      AUD: 0.213258, CAD: 0.210137, CHF: 0.124075, SGD: 0.191707, KRW: 198.294666,
      MYR: 0.609793, THB: 5.049058, PHP: 9.587728, IDR: 2717.391304, MXN: 2.767017,
      BRL: 0.81182, ZAR: 2.481439, TRY: 7.434944, SEK: 1.487818, NOK: 1.394645,
      DKK: 1.001996, NZD: 0.263924, PLN: 0.587786, ILS: 0.456941, SAR: 0.56129,
      RUB: 12.106538
    }
  };
  /* ↑↑↑ 快照结束 ↑↑↑ */

  var LS = "falcora_fx_v1";
  var URL_A = "https://open.er-api.com/v6/latest/CNY";
  /* 第二源：jsDelivr 上的 currency-api（166 币种，含 TWD / AED / VND）。
     加它的原因是国内网络访问 open.er-api.com 经常超时，一旦失败就退回内置快照，
     而快照再新也是「上一次构建时」的牌价。jsDelivr 有国内 CDN 节点，命中率高得多。
     ⚠️ 它的 CNY/TWD 与 er-api 会差 0.1%~0.3%（都是拿美元交叉折算的），
        所以只做备胎，不做主源；界面上的 source 会如实写出来。 */
  var URL_C = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cny.json";
  var URL_B = "https://api.frankfurter.dev/v1/latest?base=CNY";
  var TIMEOUT = 9000;

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function clone(o) {
    var r = {}, k;
    for (k in o) { if (Object.prototype.hasOwnProperty.call(o, k)) r[k] = o[k]; }
    return r;
  }

  /* 当前生效的快照：缓存优先（同一天），否则内置 */
  function cached() {
    try {
      var o = JSON.parse(localStorage.getItem(LS) || "null");
      if (o && o.rates && o.date) return o;
    } catch (e) {}
    return null;
  }

  function dayOf(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function current() {
    var c = cached();
    var base = SNAP;
    if (c && c.date >= SNAP.date) base = c;          /* 缓存不比内置旧就用缓存 */
    var today = todayStr();
    var out = {
      base: base.base || "CNY",
      date: base.date,
      source: base.source || "—",
      rates: clone(base.rates),
      fetchedAt: base.fetchedAt || "",
      partial: base.partial || [],
      fetchedToday: dayOf(base.fetchedAt) === today,
      /* stale 的语义是「这张牌价不是今天的」，它**不等于**「离线」：
         数据源每天 UTC 0 点（北京 08:00）才更新一次，早于这个时点打开页面，
         拿到的必然还是前一天的牌价 —— 那是源还没更新，不是我们没联网。
         界面上「离线」只由 fetchedToday 判定，两个概念必须分开，否则每天早上都误报一次。 */
      stale: base.date !== today
    };
    return out;
  }

  /* 1 from = ? to
     ⚠️ 缺币种时必须回退到内置快照，不能直接返回 null：
        回退源（ECB / frankfurter）**不含基准币 CNY 本身**，一旦用它的 rates 覆盖，
        rate('USD','CNY') 的分母就没了 → 整条自动填汇率链路静默失效（2026-10-22 实测踩过）。 */
  function rate(from, to) {
    from = String(from || "").toUpperCase();
    to = String(to || "").toUpperCase();
    if (!from || !to) return null;
    if (from === to) return 1;                        /* 同币种恒为 1，不查表 */
    var r = current().rates;
    var a = (r[from] !== undefined && r[from] > 0) ? r[from] : SNAP.rates[from];
    var b = (r[to] !== undefined && r[to] > 0) ? r[to] : SNAP.rates[to];
    if (!a || !b) return null;                        /* 两边都查不到才放弃 */
    return b / a;
  }

  function status() {
    var c = current();
    return {
      date: c.date, source: c.source, stale: c.stale, ok: !c.stale,
      fetchedToday: c.fetchedToday, partial: c.partial || []
    };
  }

  function save(obj) {
    try { localStorage.setItem(LS, JSON.stringify(obj)); } catch (e) {}
  }

  function getJSON(url) {
    return new Promise(function (resolve, reject) {
      var done = false;
      var ctl = (typeof AbortController !== "undefined") ? new AbortController() : null;
      var tm = setTimeout(function () {
        if (done) return; done = true;
        if (ctl) { try { ctl.abort(); } catch (e) {} }
        reject(new Error("timeout"));
      }, TIMEOUT);
      fetch(url, ctl ? { signal: ctl.signal, cache: "no-store" } : { cache: "no-store" })
        .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
        .then(function (j) { if (done) return; done = true; clearTimeout(tm); resolve(j); })
        .catch(function (e) { if (done) return; done = true; clearTimeout(tm); reject(e); });
    });
  }

  /* 三个源按「与银行牌价的接近程度 + 可达性」排序，逐个试，第一个成功即用：
     A er-api      与银行中间价最接近（实测 CNY/TWD 与百度只差 0.04%），但国内常超时
     C jsDelivr    166 币种全、国内可达，代价是 CNY/TWD 走美元交叉，与直接报价差 0.1%~0.3%
     B frankfurter 欧洲央行，最稳但**没有 TWD / AED / VND**，只能兜最后一道 */
  var SOURCES = [
    { name: "exchangerate-api.com", url: URL_A, parse: function (j) {
        if (!j || j.result !== "success" || !j.rates) return null;
        return { rates: j.rates, date: dayOf(j.time_last_update_utc) };
      } },
    { name: "currency-api (jsDelivr)", url: URL_C, parse: function (j) {
        if (!j || !j.cny) return null;
        var r = {}, k;
        for (k in j.cny) {
          if (Object.prototype.hasOwnProperty.call(j.cny, k)) r[String(k).toUpperCase()] = j.cny[k];
        }
        return { rates: r, date: j.date || "" };
      } },
    { name: "ECB / frankfurter", url: URL_B, parse: function (j) {
        if (!j || !j.rates) return null;
        return { rates: j.rates, date: j.date || "" };
      } }
  ];

  /* 三个源都试；任一成功即写缓存。后两个源缺币种时用内置/旧缓存补齐，避免「刷新一次反而少了几个币种」 */
  function refresh(cb) {
    var before = current();
    function finish(ok, src, rates, date, err) {
      if (ok) {
        /* 三层合并，顺序不可调换：
           ① 内置快照打底 —— 保证任何回退源都不会把币种表「缩水」到比发版时还少；
           ② 旧缓存覆盖 —— 保留上一次已知的、可能比快照新的值；
           ③ 新拉到的值覆盖 —— 只有新源真的提供的币种才算「今日牌价」。 */
        var merged = clone(SNAP.rates), k;
        for (k in before.rates) { if (Object.prototype.hasOwnProperty.call(before.rates, k)) merged[k] = before.rates[k]; }
        var partial = [];
        for (k in rates) { if (Object.prototype.hasOwnProperty.call(rates, k)) merged[k] = rates[k]; }
        for (k in merged) {
          if (!Object.prototype.hasOwnProperty.call(rates, k) && k !== SNAP.base) partial.push(k);
        }
        merged[SNAP.base] = 1;                        /* 基准币恒为 1，回退源不含它 */
        var obj = {
          base: SNAP.base, date: date || todayStr(), source: src,
          rates: merged, partial: partial, fetchedAt: new Date().toISOString()
        };
        save(obj);
        try { window.dispatchEvent(new CustomEvent("fal-fx-updated", { detail: obj })); } catch (e) {}
        if (cb) cb({ ok: true, date: obj.date, source: src, rates: merged, partial: partial });
      } else {
        if (cb) cb({ ok: false, date: before.date, source: before.source, error: err || "failed" });
      }
    }

    var lastErr = "";
    (function next(i) {
      if (i >= SOURCES.length) { finish(false, null, null, null, lastErr || "all failed"); return; }
      var s = SOURCES[i];
      getJSON(s.url).then(function (j) {
        var p = s.parse(j);
        if (!p) throw new Error("bad payload");
        finish(true, s.name, p.rates, p.date || todayStr());
      }).catch(function (e) {
        lastErr = (e && e.message) || "failed";
        next(i + 1);
      });
    })(0);
  }

  /* 当天没拉过才拉；已经是最新就直接回调，不打扰用户 */
  function ensureFresh(cb) {
    var c = current();
    /* 判定条件用 fetchedToday + stale 两个，缺一不可：
       只判 stale  → 每天早上 08:00 源滚档之前，每次开页都白拉一次；
       只判 fetchedToday → 早上 07:00 拉到的「昨日牌价」会被当成今天的一直用到明天。 */
    if (c.fetchedToday && !c.stale) {
      if (cb) cb({ ok: true, date: c.date, source: c.source, cached: true });
      return;
    }
    refresh(cb);
  }

  window.FAL_FX_SNAP = SNAP;
  window.__falFx = {
    current: current, rate: rate, refresh: refresh, ensureFresh: ensureFresh, status: status,
    today: todayStr
  };
})();
