/* FALCORA 获客通AI — 侧栏「每日汇率」小组件（2026-10-14）
   --------------------------------------------------------------------------
   用户需求（2026-10-14）：「帮我在主导航上方加入一排每日最新国际汇率，基础汇率是人民币，
   换算币种包含 美金、欧元、日币、韩元、台币、泰铢、印度卢比、英镑…等主要货币。
   每天早上北京时间 8 点整，自动更新最新汇率。」

   位置：注入到 `.sidebar` 里、**第一个 `.nav-label`（主导航）之前** → 视觉上位于「主导航」上方。
   基准：1 人民币（CNY）= 各币种金额。

   ⚠️ 关于「每天早上 8 点自动更新」的诚实口径：
   本项目是**纯前端静态页**（GitHub Pages / 双击即开），没有服务器定时任务。
   因此实现为「**到点即刷 + 打开即补**」：
     · 页面开着时，到北京时间 08:00 会自行拉取一次，并排下一次；
     · 页面关着时不做事；下次打开若发现上次更新早于最近一次 08:00，立刻补拉一次；
     · 标签页从后台切回前台时，若数据已过期也补拉。
   这与「服务器 cron」效果等价（用户看到的永远不早于最近一次 08:00），但**不假装有后端**。

   数据源（2026-10-14 实测：从 https 源 fetch 均 200 + CORS 放行）：
     1. cdn.jsdelivr.net/npm/@fawazahmed0/currency-api   （含 TWD/THB/KRW 等全部所需币种）
     2. latest.currency-api.pages.dev                    （同上，同一项目的备用域名）
     3. open.er-api.com/v6/latest/CNY                    （ExchangeRate-API 开放端点）
   三个源全部失败时，退回 localStorage 缓存并**明确标注「离线缓存」**，不静默假装成功。
   ⚠️ 币种名称与数字格式**走 Intl**（DisplayNames / NumberFormat），不进 i18n 字典 ——
      与本项目「动态日期/数字不走字典」的既有铁律一致，避免逐语言维护 20+ 币种名。
   ⚠️ 界面文案（每日汇率 / 基准 / 更新 / 展开 / 参考汇率…）仍走 i18n 字典：
      注入时写**中文原文**，由 app-i18n.js 的 MutationObserver 翻译；切语言时本脚本
      注册 `__falOnRefresh` 回调**整体重绘**（否则 __src 会被缓存成外文，切回中文会残留外文）。
   -------------------------------------------------------------------------- */
(function () {
  var STORE = 'falcora_fx_v1';
  var BASE = 'CNY';

  /* 用户指定的 8 个币种（顺序即用户列举顺序：美金 / 欧元 / 日币 / 韩元 / 台币 / 泰铢 / 印度卢比 / 英镑） */
  var MAIN = ['USD', 'EUR', 'JPY', 'KRW', 'TWD', 'THB', 'INR', 'GBP'];
  /* 展开后追加的常用币种（出口业务高频：港/新/澳/加 + 东南亚） */
  var MORE = ['HKD', 'SGD', 'AUD', 'CAD', 'MYR', 'VND', 'IDR', 'PHP'];
  var ALL = MAIN.concat(MORE);

  var SOURCES = [
    { name: 'cdn.jsdelivr.net', url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cny.json', kind: 'fawaz' },
    { name: 'currency-api.pages.dev', url: 'https://latest.currency-api.pages.dev/v1/currencies/cny.json', kind: 'fawaz' },
    { name: 'open.er-api.com', url: 'https://open.er-api.com/v6/latest/CNY', kind: 'erapi' }
  ];
  var TIMEOUT = 9000;          /* 单源超时 */
  var STALE_MS = 12 * 3600e3;  /* 兜底：距上次更新超过 12h 也刷一次 */

  /* ---------- 时间：北京时间 08:00 = UTC 00:00，故无需时区库 ---------- */
  function utcMidnight(ts) {
    var d = new Date(ts);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }
  /* 最近一次已过去的「北京 08:00」时间戳 */
  function lastBeijing8() {
    var now = Date.now(), t = utcMidnight(now);
    return now >= t ? t : t - 86400e3;
  }
  /* 距下一次「北京 08:00」还有多少毫秒（最大 < 24h，远小于 setTimeout 上限） */
  function msToNextBeijing8() {
    var now = Date.now(), t = utcMidnight(now);
    if (now >= t) t += 86400e3;
    return t - now;
  }

  /* ---------- 本地化（不走字典） ---------- */
  function locale() {
    var l = (window.__falGetLang && window.__falGetLang()) || 'zh';
    return l === 'zh' ? 'zh-CN' : l;
  }
  function dn() {
    try { return new Intl.DisplayNames([locale()], { type: 'currency' }); }
    catch (e) { return null; }
  }
  function cname(code, D) {
    try { return (D || dn()).of(code) || code; } catch (e) { return code; }
  }
  function digits(v) {
    var a = Math.abs(v);
    if (a >= 1000) return 1;
    if (a >= 100) return 2;
    if (a >= 10) return 3;
    return 4;
  }
  function num(v) {
    if (typeof v !== 'number' || !isFinite(v)) return '—';
    try {
      return new Intl.NumberFormat(locale(), { minimumFractionDigits: digits(v), maximumFractionDigits: digits(v) }).format(v);
    } catch (e) { return String(v); }
  }
  function stamp(ts) {
    try {
      var p = new Intl.DateTimeFormat(locale(), { timeZone: 'Asia/Shanghai', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date(ts));
      var g = {};
      p.forEach(function (x) { g[x.type] = x.value; });
      var hh = g.hour === '24' ? '00' : g.hour;
      return g.month + '-' + g.day + ' ' + hh + ':' + g.minute;
    } catch (e) {
      var d = new Date(ts);
      function z(n) { return (n < 10 ? '0' : '') + n; }
      return z(d.getMonth() + 1) + '-' + z(d.getDate()) + ' ' + z(d.getHours()) + ':' + z(d.getMinutes());
    }
  }

  /* ---------- 存储 ---------- */
  function load() {
    try {
      var o = JSON.parse(localStorage.getItem(STORE) || 'null');
      if (o && o.rates && typeof o.ts === 'number') return o;
    } catch (e) {}
    return null;
  }
  function save(o) { try { localStorage.setItem(STORE, JSON.stringify(o)); } catch (e) {} }

  /* ---------- 数据源归一化 ---------- */
  function normalize(src, j) {
    var rates = {}, date = '';
    if (src.kind === 'fawaz') {
      if (!j || !j.cny) return null;
      ALL.forEach(function (c) { var v = j.cny[c.toLowerCase()]; if (typeof v === 'number') rates[c] = v; });
      date = j.date || '';
    } else {
      if (!j || j.result !== 'success' || !j.rates) return null;
      ALL.forEach(function (c) { var v = j.rates[c]; if (typeof v === 'number') rates[c] = v; });
      var t = Date.parse(j.time_last_update_utc || '');
      if (isFinite(t)) { var d = new Date(t); date = d.toISOString().slice(0, 10); }
    }
    if (!rates.USD || !rates.EUR) return null;   /* 关键币种缺失视为该源不可用 */
    return { ts: Date.now(), base: BASE, date: date, src: src.name, rates: rates };
  }

  /* ---------- 拉取（多源顺序回退） ---------- */
  function fetchJson(url) {
    return new Promise(function (res, rej) {
      var ctl = null, tid = null;
      try { ctl = new AbortController(); } catch (e) {}
      var opt = { cache: 'no-store' };
      if (ctl) opt.signal = ctl.signal;
      tid = setTimeout(function () { if (ctl) ctl.abort(); rej(new Error('timeout')); }, TIMEOUT);
      fetch(url, opt).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).then(function (j) { clearTimeout(tid); res(j); })
        .catch(function (e) { clearTimeout(tid); rej(e); });
    });
  }

  var state = { mode: 'loading', data: load(), more: false, busy: false };

  function pull(i) {
    if (i >= SOURCES.length) {
      state.mode = state.data ? 'stale' : 'error';
      state.busy = false;
      render();
      return;
    }
    fetchJson(SOURCES[i].url).then(function (j) {
      var r = normalize(SOURCES[i], j);
      if (!r) return pull(i + 1);
      state.data = r; state.mode = 'ok'; state.busy = false;
      save(r); render();
    }).catch(function () { pull(i + 1); });
  }

  function refresh(manual) {
    if (state.busy) return;
    state.busy = true;
    if (manual || !state.data) { state.mode = 'loading'; }
    render();
    pull(0);
  }

  /* ---------- 渲染 ---------- */
  var card = null;

  function render() {
    if (!card) return;
    var d = state.data, D = dn();
    var list = state.more ? ALL : MAIN;
    var baseName = cname(BASE, D);
    var h = '';

    /* 头部 */
    h += '<div class="fx-h"><span class="fx-ic">💱</span><b>每日汇率</b>'
      + '<button type="button" class="fx-r' + (state.mode === 'loading' ? ' spin' : '') + '" title="刷新汇率" aria-label="刷新汇率">'
      + '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">'
      + '<path d="M20 11a8 8 0 1 0-2.3 6.3"/><path d="M20 4v7h-7"/></svg></button></div>';

    if (state.mode === 'loading' && !d) {
      h += '<div class="fx-msg">正在获取汇率…</div>';
    } else if (state.mode === 'error' && !d) {
      h += '<div class="fx-msg fx-bad">汇率数据源暂不可用</div>'
        + '<button type="button" class="fx-retry">重试</button>';
    } else {
      /* 基准行 */
      h += '<div class="fx-base">1 人民币 =</div>';
      /* 网格 */
      h += '<div class="fx-grid">';
      list.forEach(function (c) {
        var v = d.rates[c];
        var nm = cname(c, D);
        var tip = nm + ' · ' + c;
        if (typeof v === 'number') tip += ' — 1 ' + baseName + ' = ' + num(v) + ' ' + c;
        h += '<div class="fx-c" title="' + tip + '">'
          + '<span class="c">' + c + '</span>'
          + '<span class="v num">' + num(v) + '</span></div>';
      });
      h += '</div>';
      h += '<div class="fx-note">参考汇率 · 非交易牌价</div>';
      /* 页脚：前缀与时间拆成两个节点 —— 前缀才能被字典单独翻译。
         若拼成「更新 10-14 08:00」整串，反查落空 → 英文界面会残留中文。 */
      h += '<div class="fx-foot"><span class="t">'
        + '<span class="pfx">' + (state.mode === 'stale' ? '离线缓存' : '更新于') + '</span>'
        + '<span class="ts num">' + stamp(d.ts) + '</span></span>'
        + '<button type="button" class="fx-more">' + (state.more ? '收起' : '展开全部') + '</button></div>';
      if (state.mode === 'stale') h += '<div class="fx-msg fx-bad">数据源不可达，显示本机缓存</div>';
    }

    card.className = 'fx-card' + (state.mode === 'error' ? ' err' : (state.mode === 'stale' ? ' warn' : ''));
    card.innerHTML = h;
    /* ⚠️ title 不能含中文：applyAttrs 是「整串反查字典」，拼接串永远查不到 →
       英文界面下会把中文原样留下。故这里只用 Intl 产出的本地化名称 + 数据源 + 日期。 */
    var ttl = baseName + (d ? ' · ' + d.src + (d.date ? ' · ' + d.date : '') : '');
    card.title = ttl;
    /* ⚠️ 属性缓存同步（必须）：app-i18n.js 的 applyAttrs 会**永久缓存**节点首次出现的
       title（el.__fal_title），之后每次翻译都从该缓存回写。`.fx-card` 是**持久节点**
       （不像 .fx-c 那样每次重绘都重建），若不主动同步缓存，切到英文后 MutationObserver
       触发翻译 → 用首次缓存的中文回写 → title 永远停在中文。
       此处值纯由 Intl 产出（不含任何字典键），同步后翻译结果与原值一致，无副作用。 */
    card.__fal_title = ttl;

    var rb = card.querySelector('.fx-r');
    if (rb) rb.addEventListener('click', function () { refresh(true); });
    var rt = card.querySelector('.fx-retry');
    if (rt) rt.addEventListener('click', function () { refresh(true); });
    var mb = card.querySelector('.fx-more');
    if (mb) mb.addEventListener('click', function () { state.more = !state.more; render(); });
  }

  /* ---------- 样式（只作用于本组件自身） ---------- */
  var css = ''
    + '.fx-card{margin:0 0 8px;padding:11px 11px 9px;border-radius:11px;'
    + 'border:1px solid var(--border);background:linear-gradient(180deg,rgba(94,234,212,.07),rgba(0,0,0,.18));'
    + 'font-size:11px;min-width:0}'
    + '.fx-card.err{border-color:rgba(255,107,107,.34)}'
    + '.fx-card.warn{border-color:rgba(245,184,65,.34)}'
    + '.fx-h{display:flex;align-items:center;gap:6px;margin-bottom:7px}'
    + '.fx-ic{font-size:11.5px;line-height:1}'
    + '.fx-h b{font-size:11.5px;font-weight:700;color:var(--ink);letter-spacing:.2px}'
    + '.fx-r{margin-left:auto;width:19px;height:19px;padding:0;border-radius:6px;border:1px solid var(--border);'
    + 'background:rgba(0,0,0,.22);color:var(--muted);display:grid;place-items:center;cursor:pointer;flex:0 0 auto;font-family:inherit}'
    + '.fx-r:hover{color:var(--cyan);border-color:var(--border-2)}'
    + '.fx-r.spin svg{animation:fxspin .9s linear infinite}'
    + '@keyframes fxspin{to{transform:rotate(360deg)}}'
    + '.fx-base{font-size:10px;color:var(--muted-2);margin-bottom:5px;letter-spacing:.2px}'
    + '.fx-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:3px 7px}'
    + '.fx-c{display:flex;align-items:baseline;gap:4px;min-width:0}'
    + '.fx-c .c{flex:0 0 auto;font-family:"SF Mono",ui-monospace,Menlo,Consolas,monospace;font-size:9px;'
    + 'font-weight:700;letter-spacing:.2px;color:var(--cyan)}'
    + '.fx-c .v{min-width:0;font-size:10.5px;font-weight:600;color:var(--ink);'
    + 'font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
    + '.fx-note{font-size:9px;color:var(--muted-2);margin-top:6px;letter-spacing:.1px}'
    + '.fx-foot{display:flex;align-items:center;gap:6px;margin-top:6px;padding-top:6px;'
    + 'border-top:1px dashed rgba(126,170,178,.18)}'
    + '.fx-foot .t{flex:1 1 auto;min-width:0;font-size:9.5px;color:var(--muted-2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'
    + '.fx-foot .ts{margin-left:5px}'
    + '.fx-more{margin-left:auto;flex:0 0 auto;padding:0;border:0;background:none;font-family:inherit;'
    + 'font-size:9.5px;font-weight:700;color:var(--cyan);cursor:pointer}'
    + '.fx-more:hover{text-decoration:underline}'
    + '.fx-msg{font-size:10px;line-height:1.5;color:var(--muted-2)}'
    + '.fx-msg.fx-bad{color:var(--warn)}'
    + '.fx-retry{margin-top:6px;padding:4px 10px;border-radius:7px;border:1px solid var(--border-2);'
    + 'background:rgba(94,234,212,.08);color:var(--cyan);font-family:inherit;font-size:10px;font-weight:700;cursor:pointer}'
    + '.fx-retry:hover{background:rgba(94,234,212,.16)}'
    /* 直立屏：侧栏变成横向滚动条，导航标签与用户卡本就隐藏，汇率块同样隐藏 */
    + '@media (max-width:860px){.fx-card{display:none}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------- 注入到「主导航」上方 ---------- */
  function inject() {
    var sb = document.querySelector('.sidebar');
    if (!sb) return false;
    if (sb.querySelector('.fx-card')) { card = sb.querySelector('.fx-card'); return true; }
    card = document.createElement('div');
    card.className = 'fx-card';
    var lbl = sb.querySelector('.nav-label');
    if (lbl) sb.insertBefore(card, lbl);
    else {
      var brand = sb.querySelector('.brand');
      if (brand && brand.nextSibling) sb.insertBefore(card, brand.nextSibling);
      else sb.insertBefore(card, sb.firstChild);
    }
    render();
    return true;
  }

  /* ---------- 定时与唤醒 ---------- */
  var timer = null;
  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(function () { refresh(false); schedule(); }, msToNextBeijing8());
  }
  function stale() {
    var d = state.data;
    if (!d) return true;
    if (d.ts < lastBeijing8()) return true;      /* 上次更新早于最近一次北京 08:00 */
    if (Date.now() - d.ts > STALE_MS) return true;
    return false;
  }

  function boot() {
    if (!inject()) { setTimeout(boot, 300); return; }   /* 等 DOM 就绪（SW 首装竞态） */
    if (state.data) { state.mode = 'ok'; render(); }
    if (stale()) refresh(false); else render();
    schedule();
    /* 切语言：整体重绘（避免 __src 缓存外文；数字/币种名走 Intl 重新格式化） */
    if (window.__falOnRefresh) window.__falOnRefresh(function () { render(); });
    else setTimeout(function () { if (window.__falOnRefresh) window.__falOnRefresh(function () { render(); }); }, 400);
  }

  /* 后台切回前台：过期就补拉 */
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && stale()) { refresh(false); schedule(); }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.addEventListener('load', function () { setTimeout(function () { if (!card) boot(); }, 150); });
  setTimeout(function () { if (!card) boot(); }, 700);

  /* 可测钩子（与 app-panel.js 的 __falPanel 同风格） */
  window.__falFX = {
    refresh: function () { refresh(true); },
    state: function () { return state; },
    next8: function () { return new Date(Date.now() + msToNextBeijing8()).toISOString(); },
    last8: function () { return new Date(lastBeijing8()).toISOString(); },
    stale: stale
  };
})();
