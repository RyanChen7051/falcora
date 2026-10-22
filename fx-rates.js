/* ================= 汇率快照 + 每日自动刷新（2026-10-22 v62）=================
   为什么要有这个文件：
     v61 之前 08 页的「报价汇率 / 当前汇率」全靠手输，没有任何更新机制 ——
     用户填一次 7.18 就永远停在 7.18，报价和实际结算的汇率差可能已经很大，
     而「汇率损益」那一行还在拿这个旧值算，等于把风险算成了 0。

   三层取值（优先级从高到低）：
     ① localStorage 缓存（falcora_fx_v1）—— 当天已拉过就直接用，不重复请求
     ② 运行时拉取：open.er-api.com（166 币种，每日更新一次）
        失败则回退 api.frankfurter.dev（欧洲央行数据，~30 币种，缺 AED/VND/TWD）
     ③ 本文件内置快照 SNAP —— 离线 / 首次打开 / 接口全挂时的兜底，保证页面永远有值可用

   口径（重要）：
     · rates[X] = 「1 单位基准币（CNY）= 多少 X」。
       页面要的是「1 单位报价币 = 多少本币」，换算：rate(from→to) = rates[to] / rates[from]。
     · 这是**公开参考牌价（中间价）**，不是银行结汇价。实际结汇有 0.1%~0.5% 价差与手续费，
       页面脚注必须写清，不能让使用者以为这就是到手汇率。
     · 币种相同（如报价币与本币都是 CNY）→ 汇率恒为 1，不查表。

   对外接口（挂在 window 上，供 08 页调用）：
     window.__falFx.current()             → { base, date, source, rates, fetchedAt, stale }
     window.__falFx.rate(from, to)        → number | null
     window.__falFx.ensureFresh(cb)       → 当天没拉过就异步拉，cb(status)
     window.__falFx.refresh(cb)           → 强制拉一次，cb(status)
     window.__falFx.status()              → { date, source, stale, ok }
   刷新成功会 dispatch 'fal-fx-updated' 事件，页面监听后重算。
   ========================================================================= */
(function () {
  "use strict";

  /* ↓↓↓ 快照由 scripts/build_fx_snapshot.js 生成，勿手改 ↓↓↓ */
  var SNAP = {
    base: "CNY",
    date: "2026-10-21",
    source: "exchangerate-api.com",
    rates: {
      CNY: 1, USD: 0.149448, EUR: 0.133199, JPY: 23.656989, GBP: 0.111931,
      AED: 0.548846, VND: 3875.968992, INR: 14.205958, HKD: 1.172876, TWD: 4.86618,
      AUD: 0.213722, CAD: 0.210271, CHF: 0.123489, SGD: 0.19095, KRW: 198.530872,
      MYR: 0.608606, THB: 5.014666, PHP: 9.433962, IDR: 2695.41779, MXN: 2.745744,
      BRL: 0.754318, ZAR: 2.445332, TRY: 7.39645, SEK: 1.479549, NOK: 1.406325,
      DKK: 0.994036, NZD: 0.263941, PLN: 0.580821, ILS: 0.463254, SAR: 0.560428,
      RUB: 12.391574
    }
  };
  /* ↑↑↑ 快照结束 ↑↑↑ */

  var LS = "falcora_fx_v1";
  var URL_A = "https://open.er-api.com/v6/latest/CNY";
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

  function current() {
    var c = cached();
    var base = SNAP;
    if (c && c.date >= SNAP.date) base = c;          /* 缓存不比内置旧就用缓存 */
    var out = {
      base: base.base || "CNY",
      date: base.date,
      source: base.source || "—",
      rates: clone(base.rates),
      fetchedAt: base.fetchedAt || "",
      partial: base.partial || [],
      stale: base.date !== todayStr()
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
    return { date: c.date, source: c.source, stale: c.stale, ok: !c.stale, partial: c.partial || [] };
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

  /* 两个源都试；任一成功即写缓存。第二个源缺币种时用内置/旧缓存补齐，避免「刷新一次反而少了几个币种」 */
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

    getJSON(URL_A).then(function (j) {
      if (j && j.result === "success" && j.rates) {
        var d = j.time_last_update_utc ? new Date(j.time_last_update_utc) : new Date();
        finish(true, "exchangerate-api.com",
          j.rates,
          d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()));
      } else {
        throw new Error("bad payload");
      }
    }).catch(function () {
      /* 回退：欧洲央行数据（frankfurter）。缺 AED / VND / TWD 等，靠 merge 保留旧值。 */
      getJSON(URL_B).then(function (j) {
        if (j && j.rates) finish(true, "ECB / frankfurter", j.rates, j.date || todayStr());
        else finish(false, null, null, null, "both failed");
      }).catch(function (e2) { finish(false, null, null, null, e2 && e2.message); });
    });
  }

  /* 当天没拉过才拉；已经是最新就直接回调，不打扰用户 */
  function ensureFresh(cb) {
    var c = current();
    if (!c.stale) { if (cb) cb({ ok: true, date: c.date, source: c.source, cached: true }); return; }
    refresh(cb);
  }

  window.FAL_FX_SNAP = SNAP;
  window.__falFx = {
    current: current, rate: rate, refresh: refresh, ensureFresh: ensureFresh, status: status,
    today: todayStr
  };
})();
