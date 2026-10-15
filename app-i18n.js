/* FALCORA 获客通AI — 语言选择器 + 反查字典式 i18n 引擎
   10 语言：zh / zh-Hant / en / es / ja / fr / de / ar / vi / hi
   （zh-Hant 繁體中文 由 OpenCC s2twp 从简体原文生成，随字典一并维护）
   机制：扫描文本节点，按「中文原文」反查 app-i18n-dict.js 的 FAL_DICT（对齐 PMApp / PWA 家族 DICT 思路）。
   · 记忆：localStorage 'falcora_lang'
   · 动态内容：MutationObserver 监听，页面 JS 新渲染的文案同样被翻译
   · 选择器位置：注入到顶栏 .top-right，位于「更新」按钮左侧
   依赖：app-i18n-dict.js（须先加载）；建议在 app-update.js 之后加载。
*/
(function () {
  var LANGS = [
    { code: 'zh', label: '简体中文' },
    { code: 'zh-Hant', label: '繁體中文' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'ja', label: '日本語' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ar', label: 'العربية' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'hi', label: 'हिन्दी' }
  ];
  var ORDER = (window.FAL_ORDER && window.FAL_ORDER.length) ? window.FAL_ORDER : ['en', 'es', 'ja', 'fr', 'de', 'ar', 'vi', 'hi'];
  var DICT = window.FAL_DICT || {};
  var IDX = {};
  ORDER.forEach(function (c, i) { IDX[c] = i; });

  var STORE = 'falcora_lang';
  var SKIP_TAGS = /^(SCRIPT|STYLE|TEXTAREA|CODE|PRE)$/;
  /* .draft-b = ④ 内容工坊的可编辑草稿正文：内容本身即为目标语言（或用户手改），
     不参与界面文案反查翻译，避免把用户编辑的内容改掉。
     .noi18n (2026-10-15) = 使用者自填的「关键词」等业务数据：绝不做机器翻译 ——
     否则字典里恰好收录过的词（如「光学瞄准镜」）会被翻成英文，没收录的（如「红点瞄具」）
     原样保留，同一屏出现半英文半中文的混乱观感；且关键词是分组键，翻掉后与
     ① 档案里存的原文对不上。需要翻译的是包裹它的 UI 标签，不是数据本身。 */
  var SKIP_SEL = '.lang-picker,.lang-toast,#updateBtn,.draft-b,.noi18n';

  function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }

  /* 繁體兜底：主字典只收「静态界面文案」，页面上还有一批运行时拼接的中文
     （① 战略页分析结论、② 页占位符、⑤ 页下拉选项……）整句不在字典里。
     此时若语言是 zh-Hant，交给 app-i18n-zht.js 的 __falZHT() 做
     「词组优先 + 单字兜底 + 回修」的简→繁转换，保证繁体界面不残留简体。
     其它语言不做兜底（保持原样，与既有行为一致）。 */
  function resolve(key, e, lang) {
    if (lang === 'zh') return key;
    var v = (e && e[IDX[lang]]) || '';
    if (v) return v;
    if (lang === 'zh-Hant' && typeof window.__falZHT === 'function') {
      return window.__falZHT(key);
    }
    return key;
  }

  function getLang() {
    try { var v = localStorage.getItem(STORE); if (v && IDX[v] !== undefined) return v; } catch (e) {}
    return 'zh';
  }
  function setLang(code) { try { localStorage.setItem(STORE, code); } catch (e) {} }

  /* 翻译单个字符串（供 app-update.js 等调用） */
  function T(zh) {
    var lang = getLang();
    return resolve(norm(zh), DICT[norm(zh)], lang);
  }
  window.__falT = T;
  window.__falGetLang = getLang;

  /* 多订阅者刷新钩子：页面可多次注册「语言切换时重渲染自身」的回调，
     避免单一 window.__falRefreshUI 被后加载的脚本覆盖（如 app-update.js）。 */
  if (!window.__falRefreshCbs) window.__falRefreshCbs = [];
  window.__falOnRefresh = function (fn) { if (typeof fn === "function") window.__falRefreshCbs.push(fn); };
  /* 兼容旧写法：若某脚本直接赋值 window.__falRefreshUI，也登记为一条回调 */
  function refreshAll() {
    for (var i = 0; i < window.__falRefreshCbs.length; i++) {
      try { window.__falRefreshCbs[i](); } catch (e) {}
    }
    if (typeof window.__falRefreshUI === "function") {
      try { window.__falRefreshUI(); } catch (e) {}
    }
  }

  var applying = false;

  function skip(el) {
    if (!el || el.nodeType !== 1) return true;
    if (SKIP_TAGS.test(el.tagName)) return true;
    return !!(el.closest && el.closest(SKIP_SEL));
  }

  /* 文本节点 */
  function applyText(lang) {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walker.nextNode())) {
      var el = n.parentNode;
      if (skip(el)) continue;
      if (n.__src == null) n.__src = n.nodeValue;
      var key = norm(n.__src);
      if (!key) continue;
      var e = DICT[key];
      var val = resolve(key, e, lang);
      var lead = n.__src.match(/^\s*/)[0], trail = n.__src.match(/\s*$/)[0];
      var out = lead + val + trail;
      if (n.nodeValue !== out) n.nodeValue = out;
    }
  }

  /* 属性：placeholder / title / aria-label */
  function applyAttrs(lang) {
    var els = document.querySelectorAll('[placeholder],[title],[aria-label]');
    Array.prototype.forEach.call(els, function (el) {
      if (el.closest && el.closest(SKIP_SEL)) return;
      ['placeholder', 'title', 'aria-label'].forEach(function (a) {
        var cur = el.getAttribute(a);
        if (cur == null) return;
        var prop = '__fal_' + a;
        if (el[prop] == null) el[prop] = cur;
        var key = norm(el[prop]);
        if (!key) return;
        var e = DICT[key];
        var val = resolve(key, e, lang);
        if (cur !== val) el.setAttribute(a, val);
      });
    });
  }

  function apply(lang) {
    if (!document.body) return;
    applying = true;
    try { applyText(lang); applyAttrs(lang); } catch (e) {}
    applying = false;
    document.documentElement.lang = (lang === 'zh' ? 'zh-CN' : lang);
    document.documentElement.setAttribute('data-lang', lang);
  }
  window.__falApply = apply;

  /* ---------- 样式 ---------- */
  var css = ''
    + '.lang-picker{position:relative;display:inline-flex;align-items:center;gap:6px;padding:7px 11px 7px 9px;'
    + 'border:1px solid var(--border);background:rgba(0,0,0,.2);border-radius:11px;color:var(--muted);transition:.18s;cursor:pointer}'
    + '.lang-picker:hover{border-color:var(--border-2);color:var(--ink)}'
    + '.lang-picker:focus-within{border-color:var(--cyan);color:var(--ink)}'
    + '.lang-picker svg{flex:0 0 auto;opacity:.85}'
    + '.lang-picker select{appearance:none;-webkit-appearance:none;-moz-appearance:none;background:transparent;border:0;outline:0;'
    + 'color:inherit;font-family:inherit;font-size:13px;cursor:pointer;padding:0 14px 0 0;line-height:1.4}'
    + '.lang-picker select option{background:#0B2632;color:#EAF4F6}'
    + '.lang-picker::after{content:"";position:absolute;right:9px;top:50%;width:6px;height:6px;border-right:1.6px solid currentColor;'
    + 'border-bottom:1.6px solid currentColor;transform:translateY(-70%) rotate(45deg);pointer-events:none;opacity:.7}'
    + '.lang-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%) translateY(12px);z-index:9999;'
    + 'background:rgba(8,30,37,.96);border:1px solid var(--border-2);color:var(--ink);padding:10px 18px;border-radius:12px;'
    + 'font-size:13px;opacity:0;transition:.28s;box-shadow:0 12px 34px rgba(0,0,0,.4);pointer-events:none}'
    + '.lang-toast.on{opacity:1;transform:translateX(-50%) translateY(0)}'
    + 'html[data-lang="ar"] .lang-picker select{direction:rtl}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------- 注入选择器（「更新」按钮左侧） ---------- */
  var picker = null, sel = null;
  function buildPicker() {
    var tr = document.querySelector('.top-right');
    if (!tr || document.querySelector('.lang-picker')) return;
    picker = document.createElement('label');
    picker.className = 'lang-picker';
    picker.title = T('语言');
    var opts = LANGS.map(function (l) {
      return '<option value="' + l.code + '"' + (l.code === 'zh' ? ' selected' : '') + '>' + l.label + '</option>';
    }).join('');
    picker.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>'
      + '<select aria-label="Language">' + opts + '</select>';
    var ub = document.getElementById('updateBtn');
    if (ub) tr.insertBefore(picker, ub);
    else tr.insertBefore(picker, tr.firstChild);

    sel = picker.querySelector('select');
    sel.value = getLang();
    sel.addEventListener('change', function () {
      var code = sel.value;
      setLang(code);
      apply(code);
      if (picker) picker.title = T('语言');
      refreshAll();
      toast(LANGS.filter(function (l) { return l.code === code; })[0].label);
    });
  }

  function toast(msg) {
    var t = document.querySelector('.lang-toast');
    if (!t) { t = document.createElement('div'); t.className = 'lang-toast'; document.body.appendChild(t); }
    t.textContent = '🌐 ' + msg;
    t.classList.add('on');
    clearTimeout(t.__t);
    t.__t = setTimeout(function () { t.classList.remove('on'); }, 1600);
  }

  /* ---------- 动态内容：MutationObserver ---------- */
  function observe() {
    if (!window.MutationObserver || !document.body) return;
    var timer = null;
    var mo = new MutationObserver(function () {
      if (applying) return;
      clearTimeout(timer);
      timer = setTimeout(function () {
        var lang = getLang();
        if (lang === 'zh') return;
        apply(lang);
      }, 60);
    });
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* ---------- 启动 ---------- */
  function boot() {
    buildPicker();
    observe();
    apply(getLang());
    refreshAll();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
