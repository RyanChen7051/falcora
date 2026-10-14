/* FALCORA 获客通AI — 全局「上一页」+「首页」按钮
   在所有分页顶栏 .top-right 注入两个按钮（顺序：上一页 → 首页）：
     · 「← 上一页」：回到浏览器上一页；若无历史可退（如直接打开本页/新标签），则回 index.html
     · 「⌂ 首页」：一键回到 index.html（增长总司令驾驶舱）
   · 必须在 app-update.js 之后、app-i18n.js 之前加载：
     本脚本插到 #updateBtn 之前 → 最终顺序 = 上一页 → 首页 → 语言 → 更新 → 版本 → 通知 → 设置。
   · 按钮文案「上一页 / 返回上一页 / 首页 / 返回首页」走 app-i18n.js 反查字典，切换语言时一起翻译。
     2026-10-13 用户明确叫它「上一页」，故可见文案由「返回」改为「上一页」（与「首页」同为页导航，语义更直白）。
   · 页面侧栏的「当前分页」那一栏也改为 <a>，故侧栏 7 栏全部可点；这两个按钮是分页深处的快速回退入口。
*/
(function () {
  // ---------- 样式 ----------
  var css = ''
    // 上一页按钮（描边式，与「首页」形成主次）；与首页等宽居中，视觉成对
    + '.back-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:8px 13px;'
    + 'min-width:88px;border-radius:11px;'
    + 'border:1px solid var(--border);background:rgba(0,0,0,.22);'
    + 'color:#CFE3E6;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;text-decoration:none;'
    + 'transition:.18s;white-space:nowrap;line-height:1;flex:0 0 auto}'
    + '.back-btn:hover{border-color:var(--border-2);background:rgba(94,234,212,.10);color:#fff;transform:translateY(-1px)}'
    + '.back-btn:active{transform:translateY(0)}'
    + '.back-btn svg{flex:0 0 auto;color:var(--cyan)}'
    // 首页按钮（主色填充）
    + '.home-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:8px 13px;'
    + 'min-width:88px;border-radius:11px;'
    + 'border:1px solid rgba(94,234,212,.38);background:linear-gradient(180deg,rgba(94,234,212,.20),rgba(14,154,142,.24));'
    + 'color:#EAFBF7;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;text-decoration:none;'
    + 'transition:.18s;white-space:nowrap;line-height:1;flex:0 0 auto}'
    + '.home-btn:hover{border-color:var(--cyan);background:linear-gradient(180deg,rgba(94,234,212,.30),rgba(14,154,142,.36));'
    + 'color:#fff;transform:translateY(-1px);box-shadow:0 6px 16px rgba(14,154,142,.28)}'
    + '.home-btn:active{transform:translateY(0);box-shadow:none}'
    + '.home-btn svg{flex:0 0 auto;color:var(--cyan)}';
  // 注：直立屏 / 窄屏（≤860px）适配已统一收进 app-design.css（单一规范源），
  // 本文件不再重复定义 media query，避免两份规则因 cascade 顺序打架。
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  // ---------- 注入「上一页」（排最前，紧邻「首页」） ----------
  function injectBack() {
    var tr = document.querySelector('.top-right');
    if (!tr || document.querySelector('.back-btn')) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'back-btn';
    b.title = '返回上一页';
    b.setAttribute('aria-label', '返回上一页');
    b.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
      + 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + '<path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>'
      + '<span>上一页</span>';
    b.addEventListener('click', function () {
      if (window.history && window.history.length > 1) window.history.back();
      else window.location.href = 'index.html';
    });
    tr.insertBefore(b, tr.firstChild);
  }

  // ---------- 注入「首页」（排在「更新」按钮左侧） ----------
  function injectHome() {
    var tr = document.querySelector('.top-right');
    if (!tr || document.querySelector('.home-btn')) return;
    var a = document.createElement('a');
    a.className = 'home-btn';
    a.href = 'index.html';
    a.title = '返回首页';
    a.setAttribute('aria-label', '返回首页');
    a.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
      + 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + '<path d="M3 10.6 12 3.2l9 7.4"/><path d="M5.6 9.4V20.8h12.8V9.4"/>'
      + '<path d="M9.6 20.8v-5.6h4.8v5.6"/></svg>'
      + '<span>首页</span>';
    var ub = document.getElementById('updateBtn');
    if (ub) { tr.insertBefore(a, ub); return; }
    var pill = tr.querySelector('.pill');
    if (pill) { tr.insertBefore(a, pill); return; }
    tr.appendChild(a);
  }

  function inject() { injectBack(); injectHome(); injectAccount(); }

  // ---------- 注入「账号与成员」（排在侧栏「当前分页」之后、用户卡之前） ----------
  // 各分页的侧栏导航是各自硬写的，故统一由本脚本补上第 8 栏，避免逐页改动。
  function injectAccount() {
    var sb = document.querySelector('.sidebar');
    if (!sb) return;
    if (sb.querySelector('a[href^="07_"]')) return;   // 07 页自身已写好，不重复注入
    var a = document.createElement('a');
    a.className = 'nav-item nav-account';
    a.href = '07_账号与成员管理.html';
    a.innerHTML = '<span class="idx">⚙</span> <span>账号与成员</span>';
    var foot = sb.querySelector('.side-foot');
    if (foot) sb.insertBefore(a, foot); else sb.appendChild(a);
  }

  /* 三个注入函数都是幂等的（内部各自查重），可安全重复调用。 */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
  /* 兜底重试：SW 首次安装 / 慢网络下，DOMContentLoaded 时 .top-right 可能尚未就绪，
     会导致「上一页 / 首页」按钮整组缺失。load 后再补一次（幂等，不会重复注入）。 */
  window.addEventListener('load', function () { setTimeout(inject, 120); });
  setTimeout(inject, 600);
})();
