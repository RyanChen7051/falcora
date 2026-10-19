/* FALCORA 获客通AI — 注册 Service Worker + 顶栏「更新」按钮
   点按钮：检查线上是否有新版本 → 让新 SW 立即接管 → 刷新到最新。
   自动注入样式与按钮，页面无需改结构。

   2026-10-13 用户明确：「所有的更新、改动，全部都是在操作端按下『更新』按钮之后就可以开始启动」
   → 本按钮是**唯一的更新启动点**，流程必须可靠，故加固三处：

   ① 注册加 `updateViaCache:'none'`：线上静态资源没有 Cache-Control（只有 last-modified），
      浏览器会启发式缓存 → 不加这个，SW 脚本本身可能被 HTTP 缓存挡住，永远「检查不到新版本」。
   ② **不再主动 `caches.delete()` 清空全部缓存**：新版 SW 的 install 已用 `cache:'reload'`
      把最新文件预热进新版本缓存，activate 会自动删掉旧版本缓存。
      页面若抢着删全部键，反而会删掉刚预热好的缓存（离线能力失效、install 可能中途失败）。
   ③ 刷新时机改为「等新 SW 真的接管（controllerchange）」再刷新，并保留多重兜底超时，
      绝不让按钮卡在「检查中」。
*/
(function () {
  // ---------- 1. 注入样式 ----------
  var css = ''
    + '.update-btn{display:inline-flex;align-items:center;gap:7px;padding:8px 13px;border-radius:11px;'
    + 'border:1px solid var(--border-2);background:rgba(94,234,212,.08);color:var(--cyan);font-family:inherit;'
    + 'font-size:13px;font-weight:600;cursor:pointer;transition:.18s;white-space:nowrap;line-height:1}'
    + '.update-btn:hover{background:rgba(94,234,212,.16);border-color:var(--cyan)}'
    + '.update-btn:active{transform:scale(.96)}'
    + '.update-btn svg{flex:0 0 auto}'
    + '.update-btn.spinning svg{animation:uspin .9s linear infinite}'
    + '.update-btn.ok{border-color:rgba(52,211,153,.4);background:rgba(52,211,153,.12);color:var(--good)}'
    + '@keyframes uspin{to{transform:rotate(360deg)}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  // ---------- 2. 注入按钮到顶栏 ----------
  var btn = document.getElementById('updateBtn');
  if (!btn) {
    var tr = document.querySelector('.top-right');
    if (tr) {
      btn = document.createElement('button');
      btn.id = 'updateBtn';
      btn.className = 'update-btn';
      btn.type = 'button';
      btn.title = '检查并更新到最新版本';
      btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/></svg><span class="utxt">更新</span>';
      tr.insertBefore(btn, tr.firstChild);
    }
  }

  var lastKey = '更新', lastSpin = false, lastOk = false;
  function setState(txt, spin, ok) {
    if (!btn) return;
    lastKey = txt; lastSpin = !!spin; lastOk = !!ok;
    var s = btn.querySelector('.utxt');
    if (s) s.textContent = (window.__falT ? window.__falT(txt) : txt);
    btn.title = (window.__falT ? window.__falT('检查并更新到最新版本') : '检查并更新到最新版本');
    btn.classList.toggle('spinning', !!spin);
    btn.classList.toggle('ok', !!ok);
  }

  /* 供 app-i18n.js 在切换语言后回调，重刷按钮文案 */
  window.__falOnRefresh(function () { setState(lastKey, lastSpin, lastOk); });

  // ---------- 3. 注册 Service Worker（updateViaCache:'none' 绕过 HTTP 缓存） ----------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      var p;
      try { p = navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }); }
      catch (e) { p = navigator.serviceWorker.register('./sw.js'); }
      if (p && p.catch) p.catch(function () {});
    });
  }

  // ---------- 4. 按钮逻辑 ----------
  if (btn) {
    var updating = false, reloaded = false;

    /* 可达性探测：刷新前先确认当前地址还能连上。
       ⚠️ 2026-10-13 用户实测：按下「更新」后跳到了 12803「无效地址」错误页。
       根因是**旧部署链接已失效**（平台每次发布可能生成新链接），而按钮在任何失败路径上
       都无条件 `location.reload()` → 浏览器导航到死地址 → 错误页。
       现在改为：刷新前先探测一次；连不上就**不刷新**，只给出明确提示。 */
    function probe() {
      return new Promise(function (res) {
        function attempt(isRetry) {
          var ctl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
          var done = false;
          var t = setTimeout(function () {
            if (!done) {
              done = true;
              if (ctl) { try { ctl.abort(); } catch (e) {} }
              if (!isRetry) {
                /* 第一次超时：等 SW 预缓存喘口气，1.2s 后重试 */
                setTimeout(function () { attempt(true); }, 1200);
              } else {
                /* 两次均失败。若浏览器认为在线且本页已加载成功，
                   极大概率是 probe 与 SW 预缓存抢带宽的偶发假死（已知缺陷）。
                   GitHub Pages 地址稳定，不阻断刷新，避免「地址已失效」误报。 */
                res(navigator.onLine);
              }
            }
          }, 6000);
          try {
            fetch('./index.html?__probe=' + Date.now(), { cache: 'no-store', signal: ctl ? ctl.signal : undefined })
              .then(function (r) {
                if (!done) { done = true; clearTimeout(t); res(!!r && r.ok); }
              })
              .catch(function () {
                if (!done) {
                  done = true; clearTimeout(t);
                  if (!isRetry) {
                    setTimeout(function () { attempt(true); }, 1200);
                  } else {
                    res(navigator.onLine);
                  }
                }
              });
          } catch (e) {
            if (!done) {
              done = true; clearTimeout(t);
              if (!isRetry) {
                setTimeout(function () { attempt(true); }, 1200);
              } else {
                res(navigator.onLine);
              }
            }
          }
        }
        attempt(false);
      });
    }

    /* 轻量提示条（不依赖 app-i18n 的内部 toast） */
    function notice(msg, bad) {
      var el = document.getElementById('falNotice');
      if (!el) {
        el = document.createElement('div');
        el.id = 'falNotice';
        el.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:99999;'
          + 'max-width:min(680px,92vw);padding:12px 18px;border-radius:12px;font-size:13.5px;line-height:1.6;'
          + 'box-shadow:0 12px 34px rgba(0,0,0,.45);font-family:inherit;transition:.25s;';
        document.body.appendChild(el);
      }
      el.style.background = bad ? 'rgba(60,20,20,.97)' : 'rgba(8,30,37,.97)';
      el.style.border = '1px solid ' + (bad ? 'rgba(255,107,107,.55)' : 'rgba(94,234,212,.35)');
      el.style.color = bad ? '#FFD9D9' : '#E9F3F4';
      el.textContent = (window.__falT ? window.__falT(msg) : msg);
      el.style.opacity = '1';
      clearTimeout(el.__t);
      el.__t = setTimeout(function () { el.style.opacity = '0'; }, bad ? 9000 : 3200);
    }

    function hardReload(msg, delay) {
      if (reloaded) return;
      reloaded = true;
      if (msg) setState(msg, true, false);
      setTimeout(function () {
        probe().then(function (ok) {
          if (ok) { location.reload(); return; }
          /* 连不上 → 绝不刷新，避免跳到「无效地址」错误页 */
          reloaded = false;
          btn.dataset.busy = '';
          setState('地址已失效', false, false);
          notice('无法连接服务器 —— 当前网址可能已失效。本应用每次重新发布都可能生成新链接，请向提供方索取最新地址后重新打开。', true);
        });
      }, delay == null ? 300 : delay);
    }

    /* 新 SW 真正接管本页时（controllerchange）才刷新。
       ⚠️ 只在「更新流程中」响应——否则首次访问时 clients.claim() 也会触发该事件，
       会把第一次来的访客无谓地强制刷新一次。 */
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', function () {
        if (updating) hardReload('已更新，刷新中…', 120);
      });
    }

    btn.addEventListener('click', function () {
      if (btn.dataset.busy) return;
      btn.dataset.busy = '1';
      reloaded = false;
      setState('检查中…', true, false);
      /* 兜底 1：5s 内流程没走完也强制刷新，绝不卡在「检查中」 */
      setTimeout(function () { hardReload('刷新中…', 0); }, 5000);

      if (!('serviceWorker' in navigator)) { hardReload('刷新中…', 200); return; }

      navigator.serviceWorker.getRegistration().then(function (reg) {
        if (!reg) { hardReload('刷新中…', 200); return; }
        var oldCtrl = navigator.serviceWorker.controller;
        updating = true;

        reg.update().then(function () {
          var nw = reg.waiting || reg.installing;
          var ctrlChanged = navigator.serviceWorker.controller &&
                            navigator.serviceWorker.controller !== oldCtrl;

          /* 情况 A：没发现新版本，且控制者没变 → 单纯刷新（HTML 网络优先，能拿到最新页面） */
          if (!nw && !ctrlChanged) { hardReload('已是最新，刷新中…', 300); return; }
          /* 情况 B：新 SW 已自行 skipWaiting 并接管（本项目 install 里就调了 skipWaiting，
             常常轮不到 waiting 状态）→ 直接刷新 */
          if (!nw && ctrlChanged) { hardReload('已更新，刷新中…', 150); return; }

          /* 情况 C：新 SW 已装好/正在装 → 通知它立即接管 */
          setState('发现新版本，正在切换…', true, false);

          function handoff() {
            try { nw.postMessage({ type: 'SKIP_WAITING' }); } catch (e) {}
            /* 兜底 2：controllerchange 万一没来，1.4s 后也刷新 */
            setTimeout(function () {
              var c = navigator.serviceWorker.controller;
              hardReload(c && c !== oldCtrl ? '已更新，刷新中…' : '刷新中…', 100);
            }, 1400);
          }

          if (nw.state === 'installed') { handoff(); return; }
          nw.addEventListener('statechange', function (ev) {
            if (ev.target.state === 'installed') handoff();
            else if (ev.target.state === 'redundant') hardReload('更新未完成，刷新中…', 200);
          });
        }).catch(function () { hardReload('刷新中…', 200); });
      }).catch(function () { hardReload('刷新中…', 200); });
    });
  }
})();
