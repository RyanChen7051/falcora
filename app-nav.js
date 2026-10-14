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
    + '.home-btn svg{flex:0 0 auto;color:var(--cyan)}'
    // 直立屏 / 窄屏适配：顶栏控件（上一页·首页·铃铛·齿轮·演示标）过多，桌面一行排不下会溢出右侧
    + '@media (max-width:860px){'
    + '.topbar{flex-wrap:wrap;gap:10px;padding:12px 14px}'
    + '.title{flex:1 1 auto;min-width:0}'
    + '.title p{display:none}'
    + '.title h1{font-size:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
    + '.search{order:9;flex:1 1 100%;max-width:none;margin-left:0}'
    + '.top-right{order:5;margin-left:auto;flex-wrap:wrap;justify-content:flex-end;gap:8px}'
    + '.back-btn span,.home-btn span{display:none}'
    + '.back-btn,.home-btn{min-width:0;padding:8px}'
    + '.pill{display:none}'
    // 直立屏：侧栏固定 248px + 内容 .layout 的 320px 副栏会把页面撑到 ~428px 宽 → 横向溢出。
    // 折叠侧栏到顶部整宽、内容改为单列，铃铛/齿轮已在上一条规则里确保留在可视区。
    + '.app{flex-direction:column}'
    + '.sidebar{width:100%;flex:0 0 auto;height:auto;position:static;flex-direction:column;padding:12px 14px;gap:8px}'
    + '.sidebar .nav-label{display:none}'
    + '.main{width:100%}'
    + '.content{padding:16px 14px 40px}'
    + '.layout{grid-template-columns:1fr}'
    + '.layout .sb{order:2}'
    // 关键：.content 是 flex column，.card 为 flex item，默认 min-width:auto=min-content，
    // 内部多列网格（sggrid/ctgrid/ctrow）会把 min-content 撑到 ~400px，
    // 导致卡片拒绝收缩、横向溢出视口。给所有直接子项 min-width:0 解除自动最小宽，
    // 再让内部两列网格在手机屏堆叠为单列，内容才真正能收窄。
    + '.content>*{min-width:0;max-width:100%}'
    + '.layout>*{min-width:0}'
    + '.card{min-width:0}'
    + '.sidebar>*{min-width:0}'
    + '.sggrid,.ctgrid{grid-template-columns:1fr}'
    + '.ctrow{grid-template-columns:1fr}'
    + '.card,.sb,.content{overflow-x:hidden}'
    + '.side-foot{margin-top:12px}'
    + '}';
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
