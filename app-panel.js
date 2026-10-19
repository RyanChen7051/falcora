/* FALCORA 获客通AI — 全局顶栏面板：铃铛（通知中心）+ 齿轮（设置）
   ------------------------------------------------------------------
   形态：右侧抽屉式，不是居中弹窗 —— 设置是「随时瞄一眼就关」的动作，
        跳页会丢掉当前筛选与滚动位置，抽屉滑出/关掉，上下文一点不丢。
   位置：每页末尾按序加载 app-update.js → app-nav.js → app-panel.js → app-i18n-dict.js → app-i18n.js
        面板 DOM 懒创建（首次点击才建），此时 i18n 引擎已就绪，
        MutationObserver 会自动翻译新插入的文案。

   ── 齿轮四组（按「用户此刻想干什么」分组，不按系统模块） ──
   1 我的企业   企业资料（读 ① 档案 + 完成度）· 发信署名（与 ④ 页同源）· 账号与成员
   2 使用偏好   界面语言 9 种 · 我方时区 · 5 类通知开关
   3 套餐与用量 当前套餐 · 剩余点数 · 本月消耗   ← 无后端，界面明标「演示值」
   4 数据与关于 本机数据清单 · 导出 JSON · 逐项清空 · 版本与合规

   ── 铃铛五类通知 ──
   风险预警 / 新线索命中 / 触达待办 / 数据源更新 / 点数不足
   ⚠️ 原型无后端、无推送通道。只有「从使用者本机数据推导出来的」才标真实，
      其余一律标「演示」——不假装已接入服务端推送。

   存储键：falcora_notify_v1（通知开关）/ falcora_prefs_v1（时区）/ falcora_notif_read_v1（已读）
*/
(function () {
  "use strict";

  var KEY = {
    profile: "falcora_strategy_profile_v1",
    profileOld: "falpora_strategy_profile_v1",
    cards: "falcora_cards_v1",
    contacts: "falcora_contacts_v1",
    sender: "falcora_sender_v1",
    drafts: "falcora_drafts_v1",
    sig: "falcora_sig_edited_v1",
    pipeline: "falcora_pipeline_v1",
    lang: "falcora_lang",
    notify: "falcora_notify_v1",
    prefs: "falcora_prefs_v1",
    read: "falcora_notif_read_v1"
  };

  var PAGE_STRATEGY = "01_战略_企业战略档案.html";
  var PAGE_LEADS = "02_全球线索获取.html";
  var PAGE_DUE = "03_客户尽调与风险核查.html";
  var PAGE_OUTREACH = "04_获客执行与内容.html";
  var PAGE_ACCOUNT = "07_账号与成员管理.html";
  var PAGE_HOME = "index.html";

  var DEFAULT_NOTIFY = { risk: true, lead: true, touch: true, source: false, quota: true };

  var TZS = [
    ["Asia/Shanghai", "UTC+08:00 · Shanghai"],
    ["Asia/Hong_Kong", "UTC+08:00 · Hong Kong"],
    ["Asia/Taipei", "UTC+08:00 · Taipei"],
    ["Asia/Tokyo", "UTC+09:00 · Tokyo"],
    ["Asia/Seoul", "UTC+09:00 · Seoul"],
    ["Asia/Singapore", "UTC+08:00 · Singapore"],
    ["Asia/Bangkok", "UTC+07:00 · Bangkok"],
    ["Asia/Jakarta", "UTC+07:00 · Jakarta"],
    ["Asia/Kolkata", "UTC+05:30 · Kolkata"],
    ["Asia/Dubai", "UTC+04:00 · Dubai"],
    ["Europe/Istanbul", "UTC+03:00 · Istanbul"],
    ["Europe/Berlin", "UTC+01:00 · Berlin"],
    ["Europe/Paris", "UTC+01:00 · Paris"],
    ["Europe/London", "UTC+00:00 · London"],
    ["America/New_York", "UTC-05:00 · New York"],
    ["America/Chicago", "UTC-06:00 · Chicago"],
    ["America/Los_Angeles", "UTC-08:00 · Los Angeles"],
    ["America/Sao_Paulo", "UTC-03:00 · São Paulo"],
    ["Africa/Lagos", "UTC+01:00 · Lagos"],
    ["Australia/Sydney", "UTC+11:00 · Sydney"]
  ];

  var LANGS = [
    ["zh", "简体中文"], ["en", "English"], ["es", "Español"], ["ja", "日本語"],
    ["fr", "Français"], ["de", "Deutsch"], ["ar", "العربية"], ["vi", "Tiếng Việt"], ["hi", "हिन्दी"]
  ];

  /* 企业资料完成度只看这 7 项 —— 其余字段缺失不影响 ② 线索收敛 */
  var PROFILE_FIELDS = [
    { k: "cn", label: "企业中文名称" },
    { k: "en", label: "企业英文名称" },
    { k: "industry", label: "所属行业" },
    { k: "keywords", label: "主营产品 / 服务关键词" },
    { k: "ch_regions", label: "目标区域" },
    { k: "ch_custTypes", label: "目标客户类型" },
    { k: "ch_productCats", label: "主营产品品类" }
  ];

  /* ---------- 工具 ---------- */
  /* 取字典译文。⚠️ window.confirm() 的文本不在 DOM 里，i18n 的文本节点扫描
     碰不到它，必须手动过 __falT，否则清空确认框永远显示中文。 */
  function T(zh) {
    try { return (window.__falT && window.__falT(zh)) || zh; } catch (e) { return zh; }
  }
  /* 带变量的句子：整句作 key 并保留 {name} 占位符，翻译后再替换 —— 各语言语序都对 */
  function Tn(zh, name) {
    return T(zh).replace("{name}", name == null ? "" : String(name));
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function rd(k, fb) {
    try {
      var v = localStorage.getItem(k);
      if (v == null) return fb;
      return JSON.parse(v);
    } catch (e) { return fb; }
  }
  function wr(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
  }
  function raw(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  /* ---------- 创始人授权（v55）：应用内激活 ----------
     为什么不能只靠 ?owner=1：macOS「加入程序坞 / 安装为应用」是**独立存储容器**，
     浏览器里写进 localStorage 的凭证，装到 Dock 的应用读不到（整份档案都是空的）。
     所以这里提供一个「在应用内输入授权码」的入口，任何容器都能激活。
     码不存明文，只比对 djb2 指纹；纯本机校验，不上传。 */
  var OWNER_KEY = "falcora_owner_v1";
  var OWNER_HASH = "d8c1b0c3"; /* FALCORA-CPO-2026 */
  function isOwner() { try { return localStorage.getItem(OWNER_KEY) === "1"; } catch (e) { return false; } }
  function ownerHash(s) {
    s = String(s == null ? "" : s).trim().toUpperCase().replace(/\s+/g, "");
    var h = 5381;
    for (var i = 0; i < s.length; i++) { h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; }
    return h.toString(16);
  }
  function setOwnerPlan(on) {
    var p = rd("falcora_plan_v1", null) || {};
    if (on) {
      p.tier = "pro"; p.founder = true; p.demo = false;
      if (!p.founderSince) p.founderSince = Date.now();
    } else {
      p.founder = false; p.tier = "free"; p.downgradedAt = Date.now();
    }
    wr("falcora_plan_v1", p);
  }
  function profile() {
    return rd(KEY.profile, null) || rd(KEY.profileOld, null) || {};
  }
  function notifyPref() {
    var o = rd(KEY.notify, null);
    if (!o || typeof o !== "object") return JSON.parse(JSON.stringify(DEFAULT_NOTIFY));
    var out = {};
    Object.keys(DEFAULT_NOTIFY).forEach(function (k) {
      out[k] = (o[k] === undefined) ? DEFAULT_NOTIFY[k] : !!o[k];
    });
    return out;
  }
  function readIds() {
    var a = rd(KEY.read, []);
    return Object.prototype.toString.call(a) === "[object Array]" ? a : [];
  }
  function curLang() {
    try { return (window.__falGetLang && window.__falGetLang()) || raw(KEY.lang) || "zh"; } catch (e) { return "zh"; }
  }
  function tzOf() {
    var p = rd(KEY.prefs, {}) || {};
    return p.tz || "Asia/Shanghai";
  }
  function bytesOf(k) {
    var s = raw(k);
    if (s == null) return 0;
    try { return new Blob([s]).size; } catch (e) { return s.length; }
  }
  function fmtSize(b) {
    if (!b) return "0 B";
    if (b < 1024) return b + " B";
    return (b / 1024).toFixed(1) + " KB";
  }
  /* 整页重渲染通知：i18n 的 MutationObserver 会跟着翻译 */
  function applyLang() {
    try {
      var l = curLang();
      if (window.__falApply) window.__falApply(l);
      if (window.__falRefreshCbs) {
        for (var i = 0; i < window.__falRefreshCbs.length; i++) {
          try { window.__falRefreshCbs[i](); } catch (e) {}
        }
      }
    } catch (e) {}
  }

  /* ---------- 样式 ---------- */
  var CSS = ''
    + '.fal-scrim{position:fixed;inset:0;background:rgba(3,16,21,.62);z-index:1200;opacity:0;transition:opacity .24s}'
    + '.fal-scrim.on{opacity:1}'
    + '.fal-drawer{position:fixed;top:0;right:0;bottom:0;width:min(600px,95vw);z-index:1201;display:flex;flex-direction:column;'
    + 'background:linear-gradient(180deg,#0B2A34,#08222A);border-left:1px solid var(--border,rgba(126,154,160,.16));'
    + 'box-shadow:-26px 0 64px rgba(0,0,0,.5);transform:translateX(101%);transition:transform .3s cubic-bezier(.4,0,.2,1);'
    + 'font-family:var(--font,inherit);color:var(--ink,#E9F3F4)}'
    + '.fal-drawer.on{transform:translateX(0)}'
    + '.fd-h{display:flex;align-items:center;gap:12px;padding:16px 18px;border-bottom:1px solid var(--border,rgba(126,154,160,.16));flex:0 0 auto}'
    + '.fd-h .fd-ic{width:34px;height:34px;flex:0 0 auto;border-radius:11px;background:rgba(94,234,212,.13);display:grid;place-items:center;color:var(--cyan,#5EEAD4)}'
    + '.fd-h b{font-size:16px;font-weight:700;display:block;line-height:1.3}'
    + '.fd-h small{font-size:11.5px;color:var(--muted-2,#6E878C);letter-spacing:1.1px}'
    /* 标题是「中文主标 + 英文副标」的双语 lockup。英文界面下主标本身就是 Notifications / Settings，
       再挂英文副标会重复成「Notifications / Notifications」→ 英文界面隐藏副标。
       用 CSS + html[data-lang] 而非 JS 判断：切语言时 app-i18n.js 会更新 data-lang，自动生效，
       不需要在 __falOnRefresh 里额外重绘 header。 */
    + 'html[data-lang="en"] .fd-h small{display:none}'
    + '.fd-x{margin-left:auto;width:34px;height:34px;flex:0 0 auto;border-radius:10px;border:1px solid var(--border,rgba(126,154,160,.16));'
    + 'background:rgba(0,0,0,.2);color:var(--muted,#8AA3A8);cursor:pointer;font-size:15px;line-height:1;font-family:inherit;transition:.16s}'
    + '.fd-x:hover{color:var(--ink,#E9F3F4);border-color:var(--border-2,rgba(94,234,212,.14))}'
    + '.fd-split{flex:1;min-height:0;display:grid;grid-template-columns:158px minmax(0,1fr)}'
    + '.fd-nav{border-right:1px solid var(--border,rgba(126,154,160,.16));padding:12px 9px;display:flex;flex-direction:column;gap:3px;overflow:auto}'
    + '.fd-ni{padding:9px 11px;border-radius:10px;font-size:13px;color:var(--muted,#8AA3A8);cursor:pointer;transition:.15s;user-select:none}'
    + '.fd-ni:hover{background:rgba(94,234,212,.06);color:var(--ink,#E9F3F4)}'
    + '.fd-ni.on{background:linear-gradient(135deg,rgba(94,234,212,.18),rgba(14,154,142,.05));color:#eafff9;font-weight:650}'
    + '.fd-b{flex:1;min-height:0;overflow:auto;padding:16px 18px 28px}'
    + '.fd-split .fd-b{padding:16px 18px 28px}'
    + '.fg-sec{margin-bottom:22px}'
    + '.fg-sec:last-child{margin-bottom:4px}'
    + '.fg-t{font-size:11.5px;color:var(--muted-2,#6E878C);letter-spacing:1.4px;margin-bottom:9px}'
    + '.fg-card{border:1px solid var(--border,rgba(126,154,160,.16));border-radius:14px;padding:14px 15px;background:rgba(0,0,0,.16)}'
    + '.fg-card + .fg-card{margin-top:10px}'
    + '.fg-row{display:flex;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid rgba(126,154,160,.09)}'
    + '.fg-row:last-child{border-bottom:0;padding-bottom:0}'
    + '.fg-row:first-child{padding-top:0}'
    + '.fg-row .fg-k{font-size:13px;color:var(--muted,#8AA3A8);flex:0 0 auto;min-width:96px}'
    + '.fg-row .fg-v{font-size:13px;color:var(--ink,#E9F3F4);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}'
    + '.fg-row .fg-v.na{color:var(--muted-2,#6E878C)}'
    + '.fg-go{flex:0 0 auto;font-size:12px;color:var(--cyan,#5EEAD4);text-decoration:none;cursor:pointer;background:none;border:0;font-family:inherit;padding:0}'
    + '.fg-go:hover{text-decoration:underline}'
    + '.fg-sel{width:100%;padding:9px 11px;border-radius:10px;border:1px solid var(--border,rgba(126,154,160,.16));'
    + 'background:rgba(0,0,0,.26);color:var(--ink,#E9F3F4);font-size:13px;font-family:inherit;outline:none}'
    + '.fg-sel:focus{border-color:var(--cyan,#5EEAD4)}'
    + '.fg-sel option{background:#0B2632;color:#EAF4F6}'
    + '.fg-bar{height:8px;border-radius:5px;background:rgba(255,255,255,.07);overflow:hidden;margin:9px 0 7px}'
    + '.fg-bar > i{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,var(--teal,#0E9A8E),var(--cyan,#5EEAD4))}'
    + '.fg-note{font-size:11.5px;color:var(--muted-2,#6E878C);line-height:1.65}'
    + '.fg-miss{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}'
    + '.fg-miss a{font-size:11.5px;padding:4px 9px;border-radius:999px;border:1px solid rgba(245,184,65,.32);'
    + 'background:rgba(245,184,65,.10);color:var(--gold,#F5B841);text-decoration:none;white-space:nowrap}'
    + '.fg-miss a:hover{background:rgba(245,184,65,.18)}'
    + '.fg-sw{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(126,154,160,.09)}'
    + '.fg-sw:last-child{border-bottom:0;padding-bottom:0}'
    + '.fg-sw:first-child{padding-top:0}'
    + '.fg-sw .sw-t{font-size:13px;min-width:0;flex:1}'
    + '.fg-sw .sw-d{font-size:11.5px;color:var(--muted-2,#6E878C);display:block;margin-top:2px}'
    + '.fg-tg{flex:0 0 auto;width:42px;height:23px;border-radius:999px;border:1px solid var(--border,rgba(126,154,160,.16));'
    + 'background:rgba(0,0,0,.3);position:relative;cursor:pointer;transition:.2s;padding:0}'
    + '.fg-tg::after{content:"";position:absolute;top:2px;left:2px;width:17px;height:17px;border-radius:50%;'
    + 'background:var(--muted-2,#6E878C);transition:.2s}'
    + '.fg-tg.on{background:linear-gradient(135deg,rgba(94,234,212,.34),rgba(14,154,142,.24));border-color:var(--cyan,#5EEAD4)}'
    + '.fg-tg.on::after{left:21px;background:var(--cyan,#5EEAD4)}'
    + '.fg-metric{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}'
    + '.fg-metric b{font-size:22px;font-weight:750;color:var(--cyan,#5EEAD4);font-variant-numeric:tabular-nums}'
    + '.fg-metric span{font-size:12.5px;color:var(--muted,#8AA3A8)}'
    + '.fg-tag{font-size:10.5px;padding:3px 8px;border-radius:999px;font-weight:700;white-space:nowrap;flex:0 0 auto}'
    + '.fg-tag.demo{background:rgba(245,184,65,.13);color:var(--gold,#F5B841);border:1px solid rgba(245,184,65,.3)}'
    + '.fg-tag.real{background:rgba(52,211,153,.13);color:var(--good,#34D399);border:1px solid rgba(52,211,153,.28)}'
    + '.fg-tag.own{background:rgba(245,184,65,.16);color:var(--gold,#F5B841);border:1px solid rgba(245,184,65,.42)}'
    + '.fg-acts{display:flex;gap:9px;flex-wrap:wrap;margin-top:12px}'
    + '.fg-btn{padding:9px 15px;border-radius:10px;border:1px solid var(--border,rgba(126,154,160,.16));background:rgba(0,0,0,.2);'
    + 'color:var(--ink,#E9F3F4);font-size:12.5px;font-weight:650;font-family:inherit;cursor:pointer;transition:.16s}'
    + '.fg-btn:hover{border-color:var(--border-2,rgba(94,234,212,.14));background:rgba(94,234,212,.08)}'
    + '.fg-btn.pri{border-color:rgba(94,234,212,.4);background:linear-gradient(135deg,rgba(94,234,212,.2),rgba(14,154,142,.24));color:#eafff9}'
    + '.fg-btn.dg{border-color:rgba(255,107,107,.3);color:var(--danger,#FF6B6B);background:rgba(255,107,107,.07)}'
    + '.fg-btn.dg:hover{background:rgba(255,107,107,.14)}'
    + '.fg-link{font-size:12px;color:var(--cyan,#5EEAD4);text-decoration:none;display:inline-flex;align-items:center;gap:5px}'
    + '.fg-link:hover{text-decoration:underline}'
    /* 铃铛 */
    + '.fal-dot{position:absolute;top:-5px;right:-5px;min-width:17px;height:17px;padding:0 4px;border-radius:999px;'
    + 'background:var(--danger,#FF6B6B);color:#fff;font-size:10.5px;font-weight:750;font-style:normal;line-height:17px;'
    + 'text-align:center;border:2px solid #0B2632;box-sizing:content-box;pointer-events:none}'
    + '.icon-btn{position:relative}'
    + '.nb-item{display:flex;gap:11px;padding:12px 0;border-bottom:1px solid rgba(126,154,160,.09)}'
    + '.nb-item:last-child{border-bottom:0}'
    + '.nb-item.unread .nb-dot{background:var(--cyan,#5EEAD4);box-shadow:0 0 0 3px rgba(94,234,212,.16)}'
    + '.nb-dot{flex:0 0 auto;width:7px;height:7px;border-radius:50%;background:transparent;margin-top:6px}'
    + '.nb-main{min-width:0;flex:1}'
    + '.nb-t{font-size:13.5px;font-weight:650;line-height:1.45}'
    + '.nb-d{font-size:12px;color:var(--muted,#8AA3A8);line-height:1.6;margin-top:3px}'
    + '.nb-f{display:flex;align-items:center;gap:10px;margin-top:7px;flex-wrap:wrap}'
    + '.nb-empty{padding:34px 8px;text-align:center;color:var(--muted-2,#6E878C);font-size:13px;line-height:1.7}'
    + '.nb-foot{border-top:1px solid var(--border,rgba(126,154,160,.16));padding:12px 18px;display:flex;gap:10px;align-items:center;flex:0 0 auto}'
    + '.fd-b .fg-tag{margin-left:auto}'
    + 'html[data-lang="ar"] .fal-drawer{left:0;right:auto;border-left:0;border-right:1px solid var(--border,rgba(126,154,160,.16));'
    + 'transform:translateX(-101%);box-shadow:26px 0 64px rgba(0,0,0,.5)}'
    + 'html[data-lang="ar"] .fal-drawer.on{transform:translateX(0)}'
    + '@media (max-width:720px){.fd-split{grid-template-columns:1fr}.fd-nav{flex-direction:row;border-right:0;'
    + 'border-bottom:1px solid var(--border,rgba(126,154,160,.16));overflow-x:auto}.fd-ni{white-space:nowrap}}';

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* ---------- 图标 SVG ---------- */
  var SVG_BELL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
    + 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>'
    + '<path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>';
  var SVG_GEAR = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
    + 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/>'
    + '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 '
    + '1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83'
    + 'l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82'
    + 'l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 '
    + '1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09'
    + 'a1.65 1.65 0 0 0-1.51 1z"/></svg>';

  /* ---------- 通知：从本机数据推导 ---------- */
  function buildNotifs() {
    var out = [];
    var p = profile();
    var nf = notifyPref();

    /* ① 风险预警 —— 真实：读本机数据能否支撑 ③ 尽调 */
    if (nf.risk) {
      var cards0 = rd(KEY.cards, []) || [];
      if (cards0.length) {
        out.push({
          id: "risk-cards",
          kind: "risk",
          real: true,
          t: "有 N 张展会名片建档后尚未核查",
          tn: cards0.length,
          d: "名片是 L3 个人联系方式的唯一合法来源。建档后风险默认「未核查」，须走 ③ 尽调才能更新 —— 不因「自己录入的」就默认干净。",
          go: PAGE_DUE,
          goTxt: "前往客户尽调"
        });
      }
      if (!p.cn && !p.en) {
        out.push({
          id: "risk-profile",
          kind: "risk",
          real: true,
          t: "企业档案尚未填写企业名称",
          d: "④ 开发信的署名取「企业自己」的名称，不是平台品牌。档案为空时，草稿只能用中性自称。",
          go: PAGE_STRATEGY,
          goTxt: "前往战略档案"
        });
      }
    }

    /* ② 新线索命中 —— 真实：档案关键词决定 ② 的收敛范围 */
    if (nf.lead) {
      if (!p.keywords) {
        out.push({
          id: "lead-keywords",
          kind: "lead",
          real: true,
          t: "企业档案缺「主营产品 / 服务关键词」",
          d: "② 全球线索获取要按这个字段收敛范围。没填，线索池就只能给你全量演示数据，会出现与你主营无关的行业。",
          go: PAGE_STRATEGY,
          goTxt: "前往战略档案"
        });
      } else {
        out.push({
          id: "lead-scope",
          kind: "lead",
          real: true,
          t: "已按你的主营关键词「{kw}」收敛线索范围",
          d: "② 线索池当前以此为准；要扩大或收窄范围，改档案里的关键词即可。",
          kw: String(p.keywords),
          go: PAGE_LEADS,
          goTxt: "查看线索池"
        });
      }
    }

    /* ③ 触达待办 —— 演示：真实发送窗口由 ⑤ 页按时区计算，无后端无法在此复现 */
    if (nf.touch) {
      out.push({
        id: "touch-demo",
        kind: "touch",
        real: false,
        t: "触达待办：今日建议发送窗口",
        d: "演示提醒。真实环境由 ⑤ 客户深挖按对方当地时间、工作周与假期自动计算，到点推给你。",
        go: PAGE_OUTREACH,
        goTxt: "前往获客执行"
      });
    }

    /* ④ 数据源更新 —— 演示：海关 / 名单数据未接入 */
    if (nf.source) {
      out.push({
        id: "source-demo",
        kind: "source",
        real: false,
        t: "数据源更新：海关提单与商业名单",
        d: "演示提醒。这两类数据源尚未接入，接入后此处会推送刷新记录与覆盖范围变化。",
        go: PAGE_LEADS,
        goTxt: "查看线索池"
      });
    }

    /* ⑤ 点数不足 —— 演示：无后端计费 */
    if (nf.quota) {
      out.push({
        id: "quota-demo",
        kind: "quota",
        real: false,
        t: "查询点数余额提醒",
        d: "演示提醒。原型没有后端计费，真实点数余额与消耗明细由服务端下发。",
        go: PAGE_HOME,
        goTxt: "查看套餐与价格"
      });
    }
    return out;
  }

  /* 带变量的通知文案：整句作字典 key，变量写成 {n} / {kw} 占位符，
     翻译完再替换 —— 拆 span 会让「中文+变量+中文」整串查不到字典（本项目的老坑）。
     ⚠️ 这里用 T() 预翻译插入 DOM，故必须在语言切换时重绘面板（见 regRefresh）：
        否则 applyText 会把已翻译的外文当 __src，切回中文时反查不到、残留外文。 */
  function notifTitle(n) {
    var zh = String(n.t);
    if (n.tn != null) zh = zh.replace("N", "{n}");
    var out = T(zh);
    if (n.tn != null) out = out.replace("{n}", String(n.tn));
    if (n.kw != null) out = out.replace("{kw}", String(n.kw));
    return esc(out);
  }
  function notifDesc(n) {
    var out = T(String(n.d));
    if (n.kw != null) out = out.replace("{kw}", String(n.kw));
    return esc(out);
  }

  /* ---------- 抽屉骨架 ---------- */
  var scrim = null, bell = null, gear = null, bellBody = null, gearBody = null, gearNav = null;

  function ensureDom() {
    if (scrim) return;

    scrim = document.createElement("div");
    scrim.className = "fal-scrim";
    scrim.hidden = true;
    scrim.addEventListener("click", closeAll);
    document.body.appendChild(scrim);

    /* 铃铛抽屉 */
    bell = document.createElement("aside");
    bell.id = "falBellDrawer";
    bell.className = "fal-drawer";
    bell.hidden = true;
    bell.setAttribute("role", "dialog");
    bell.setAttribute("aria-modal", "true");
    bell.innerHTML =
      '<div class="fd-h">'
      + '<div class="fd-ic">' + SVG_BELL + '</div>'
      + '<div><b>通知</b><small>Notifications</small></div>'
      + '<button class="fd-x" data-fal-close aria-label="关闭">✕</button>'
      + '</div>'
      + '<div class="fd-b" id="falBellBody"></div>'
      + '<div class="nb-foot">'
      + '<button class="fg-btn" id="falBellReadAll">全部标为已读</button>'
      + '<button class="fg-btn" id="falBellPref">通知偏好</button>'
      + '</div>';
    document.body.appendChild(bell);
    bellBody = bell.querySelector("#falBellBody");
    bell.querySelector("[data-fal-close]").addEventListener("click", closeAll);
    bell.querySelector("#falBellReadAll").addEventListener("click", function () {
      var ids = buildNotifs().map(function (n) { return n.id; });
      wr(KEY.read, ids);
      paintBell();
      updateBadge();
    });
    bell.querySelector("#falBellPref").addEventListener("click", function () {
      openDrawer(gear);
      gearNavGo("pref");
    });

    /* 齿轮抽屉 */
    gear = document.createElement("aside");
    gear.id = "falGearDrawer";
    gear.className = "fal-drawer";
    gear.hidden = true;
    gear.setAttribute("role", "dialog");
    gear.setAttribute("aria-modal", "true");
    gear.innerHTML =
      '<div class="fd-h">'
      + '<div class="fd-ic">' + SVG_GEAR + '</div>'
      + '<div><b>设置</b><small>Settings</small></div>'
      + '<button class="fd-x" data-fal-close aria-label="关闭">✕</button>'
      + '</div>'
      + '<div class="fd-split">'
      + '<nav class="fd-nav" id="falGearNav"></nav>'
      + '<div class="fd-b" id="falGearBody"></div>'
      + '</div>';
    document.body.appendChild(gear);
    gearBody = gear.querySelector("#falGearBody");
    gearNav = gear.querySelector("#falGearNav");
    gear.querySelector("[data-fal-close]").addEventListener("click", closeAll);

    var GEAR_GROUPS = [
      ["biz", "我的企业"],
      ["pref", "使用偏好"],
      ["plan", "套餐与用量"],
      ["data", "数据与关于"]
    ];
    gearNav.innerHTML = GEAR_GROUPS.map(function (g) {
      return '<div class="fd-ni" data-g="' + g[0] + '">' + esc(g[1]) + '</div>';
    }).join("");
    gearNav.addEventListener("click", function (e) {
      var it = e.target.closest ? e.target.closest(".fd-ni") : null;
      if (it) gearNavGo(it.dataset.g);
    });
  }

  var gearCur = "biz";
  function gearNavGo(g) {
    gearCur = g || "biz";
    Array.prototype.forEach.call(gearNav.querySelectorAll(".fd-ni"), function (n) {
      n.classList.toggle("on", n.dataset.g === gearCur);
    });
    paintGear();
  }

  function openDrawer(el) {
    ensureDom();
    closeAll(true);
    scrim.hidden = false;
    el.hidden = false;
    requestAnimationFrame(function () {
      scrim.classList.add("on");
      el.classList.add("on");
    });
    document.body.style.overflow = "hidden";
  }
  function closeAll(keepScrim) {
    if (!scrim) return;
    [bell, gear].forEach(function (el) {
      if (el) el.classList.remove("on");
    });
    scrim.classList.remove("on");
    document.body.style.overflow = "";
    /* 300ms 后收尾：只隐藏「动画结束时确实处于关闭态」的元素 ——
       否则「同一个抽屉重复打开」时，这次收尾会把刚打开的抽屉又藏起来。 */
    setTimeout(function () {
      [bell, gear].forEach(function (el) {
        if (el && !el.classList.contains("on")) el.hidden = true;
      });
      if (scrim && !scrim.classList.contains("on")) scrim.hidden = true;
    }, 320);
    void keepScrim;
  }

  function openBell() {
    ensureDom();
    paintBell();
    openDrawer(bell);
  }
  function openGear() {
    ensureDom();
    gearNavGo(gearCur || "biz");
    openDrawer(gear);
  }

  /* ---------- 铃铛内容 ---------- */
  function paintBell() {
    var ns = buildNotifs();
    var read = readIds();
    if (!ns.length) {
      bellBody.innerHTML = '<div class="nb-empty"><span>当前没有通知。</span><br><span>可在「通知偏好」中开启需要的类别。</span></div>';
      return;
    }
    bellBody.innerHTML = ns.map(function (n) {
      var unread = read.indexOf(n.id) === -1;
      return '<div class="nb-item' + (unread ? " unread" : "") + '" data-id="' + esc(n.id) + '">'
        + '<span class="nb-dot"></span>'
        + '<div class="nb-main">'
        + '<div class="nb-t">' + notifTitle(n) + '</div>'
        + '<div class="nb-d">' + notifDesc(n) + '</div>'
        + '<div class="nb-f">'
        + '<a class="fg-go" href="' + esc(n.go) + '">' + esc(n.goTxt) + '</a>'
        + (n.real ? '<span class="fg-tag real">来自本机数据</span>' : '<span class="fg-tag demo">演示</span>')
        + (unread ? '<button class="fg-go" data-mark="' + esc(n.id) + '">标为已读</button>' : '')
        + '</div></div></div>';
    }).join("");
    Array.prototype.forEach.call(bellBody.querySelectorAll("[data-mark]"), function (b) {
      b.addEventListener("click", function () {
        var ids = readIds();
        if (ids.indexOf(b.dataset.mark) === -1) ids.push(b.dataset.mark);
        wr(KEY.read, ids);
        paintBell();
        updateBadge();
      });
    });
  }

  /* ---------- 齿轮内容 ---------- */
  function paintGear() {
    if (!gearBody) return;
    if (gearCur === "biz") gearBody.innerHTML = secBiz();
    else if (gearCur === "pref") gearBody.innerHTML = secPref();
    else if (gearCur === "plan") gearBody.innerHTML = secPlan();
    else gearBody.innerHTML = secData();
    wireGear();
  }

  function secBiz() {
    var p = profile();
    var s = rd(KEY.sender, {}) || {};

    var filled = PROFILE_FIELDS.filter(function (f) {
      var v = p[f.k];
      if (Object.prototype.toString.call(v) === "[object Array]") return v.length > 0;
      return !!(v && String(v).trim());
    }).length;
    var total = PROFILE_FIELDS.length;
    var pct = Math.round(filled / total * 100);
    var miss = PROFILE_FIELDS.filter(function (f) {
      var v = p[f.k];
      if (Object.prototype.toString.call(v) === "[object Array]") return !(v.length > 0);
      return !(v && String(v).trim());
    });

    var h = "";
    h += '<div class="fg-sec"><div class="fg-t">企业资料</div><div class="fg-card">';
    h += '<div class="fg-row"><span class="fg-k">企业名称</span><span class="fg-v' + ((p.cn || p.en) ? "" : " na") + '">'
      + esc(p.cn || p.en || "尚未填写") + '</span></div>';
    h += '<div class="fg-row"><span class="fg-k">英文名称</span><span class="fg-v' + (p.en ? "" : " na") + '">'
      + esc(p.en || "尚未填写") + '</span></div>';
    h += '<div class="fg-row"><span class="fg-k">所属行业</span><span class="fg-v' + (p.industry ? "" : " na") + '">'
      + esc(p.industry || "尚未填写") + '</span></div>';
    h += '<div class="fg-row"><span class="fg-k">主营关键词</span><span class="fg-v' + (p.keywords ? "" : " na") + '" title="'
      + esc(p.keywords || "") + '">' + esc(p.keywords || "尚未填写") + '</span></div>';
    h += '<div style="margin-top:13px">'
      + '<div class="fg-row" style="border:0;padding:0"><span class="fg-k" style="min-width:auto">档案完成度</span>'
      + '<span class="fg-v" style="text-align:right"><span>' + filled + '</span><span> / </span><span>' + total + '</span><span> 项</span></span></div>'
      + '<div class="fg-bar"><i style="width:' + pct + '%"></i></div>'
      + '<div class="fg-note"><span>企业资料越完整，② 线索收敛与 ④ 内容生成越准。完成度 </span><span>' + pct + '%</span><span>。</span></div>'
      + '</div>';
    if (miss.length) {
      h += '<div class="fg-miss">' + miss.map(function (f) {
        return '<a href="' + PAGE_STRATEGY + '">＋ ' + esc(f.label) + '</a>';
      }).join("") + '</div>';
    }
    h += '<div class="fg-acts"><a class="fg-btn pri" href="' + PAGE_STRATEGY + '" style="text-decoration:none">前往战略档案</a></div>';
    h += '</div></div>';

    h += '<div class="fg-sec"><div class="fg-t">发信署名</div><div class="fg-card">';
    h += '<div class="fg-row"><span class="fg-k">企业署名</span><span class="fg-v' + (s.company ? "" : " na") + '">'
      + esc(s.company || "尚未设置") + '</span></div>';
    h += '<div class="fg-row"><span class="fg-k">发件人</span><span class="fg-v' + ((s.person || s.title) ? "" : " na") + '">'
      + esc([s.person, s.title].filter(Boolean).join(" · ") || "尚未设置") + '</span></div>';
    h += '<div class="fg-row"><span class="fg-k">部门邮箱</span><span class="fg-v' + (s.email ? "" : " na") + '">'
      + esc(s.email || "尚未设置") + '</span></div>';
    h += '<div class="fg-note" style="margin-top:11px">开发信的署名取「企业自己」的名称，不是平台品牌。此处与 ④ 页发信设置共用同一份本机存档，改哪边都一样。</div>';
    h += '<div class="fg-acts"><a class="fg-btn" href="' + PAGE_OUTREACH + '" style="text-decoration:none">前往获客执行与内容</a></div>';
    h += '</div></div>';

    h += '<div class="fg-sec"><div class="fg-t">账号与成员</div><div class="fg-card">';
    h += '<div class="fg-row"><span class="fg-k">当前账号</span><span class="fg-v">陈邦杰 · 首席产品设计官</span></div>';
    h += '<div class="fg-row"><span class="fg-k">席位</span><span class="fg-v">3 席位（专业版）</span></div>';
    h += '<div class="fg-note" style="margin-top:11px">席位 = 一个可以登录使用本平台的账号，按「人」算，不按「公司」算。1 席位 = 1 位同事。</div>';
    h += '<div class="fg-acts"><a class="fg-btn" href="' + PAGE_ACCOUNT + '" style="text-decoration:none">管理成员与席位</a></div>';
    h += '</div></div>';
    return h;
  }

  function secPref() {
    var nf = notifyPref();
    var h = "";
    h += '<div class="fg-sec"><div class="fg-t">界面语言</div><div class="fg-card">';
    h += '<select class="fg-sel" id="falLangSel">' + LANGS.map(function (l) {
      return '<option value="' + l[0] + '"' + (l[0] === curLang() ? " selected" : "") + '>' + esc(l[1]) + '</option>';
    }).join("") + '</select>';
    h += '<div class="fg-note" style="margin-top:10px">与顶栏语言选择器同源，改哪边都一样，选择会记住。</div>';
    h += '</div></div>';

    h += '<div class="fg-sec"><div class="fg-t">我方时区</div><div class="fg-card">';
    h += '<select class="fg-sel" id="falTzSel">' + TZS.map(function (z) {
      return '<option value="' + z[0] + '"' + (z[0] === tzOf() ? " selected" : "") + '>' + esc(z[1]) + '</option>';
    }).join("") + '</select>';
    h += '<div class="fg-note" style="margin-top:10px">用于 ⑤ 客户深挖的触达时机换算：先按对方当地时间定窗口，再折算回你的工作时间。</div>';
    h += '</div></div>';

    var SW = [
      ["risk", "风险预警", "③ 尽调发现黄标或红标"],
      ["lead", "新线索命中", "② 出现与主营关键词匹配的新采购方"],
      ["touch", "触达待办", "⑤ 到达建议发送窗口"],
      ["source", "数据源更新", "海关提单与商业名单刷新"],
      ["quota", "点数不足", "剩余查询点数低于阈值"]
    ];
    h += '<div class="fg-sec"><div class="fg-t">通知偏好</div><div class="fg-card">';
    h += SW.map(function (x) {
      var on = nf[x[0]];
      return '<div class="fg-sw"><div class="sw-t"><span>' + esc(x[1]) + '</span>'
        + '<span class="sw-d">' + esc(x[2]) + '</span></div>'
        + '<button class="fg-tg' + (on ? " on" : "") + '" data-sw="' + x[0] + '" role="switch" aria-checked="'
        + (on ? "true" : "false") + '" aria-label="' + esc(x[1]) + '"></button></div>';
    }).join("");
    h += '<div class="fg-note" style="margin-top:11px">关掉的类别不再进铃铛。开关只存本机。</div>';
    h += '</div></div>';
    return h;
  }

  function secPlan() {
    var h = "";
    var own = isOwner();
    /* 创始人授权卡：Dock / 独立容器里也能激活，不依赖网址参数 */
    h += '<div class="fg-sec"><div class="fg-t">创始人授权</div><div class="fg-card">';
    h += '<div class="fg-row"><span class="fg-k">状态</span><span class="fg-v' + (own ? "" : " na") + '">'
      + '<span class="noi18n">' + esc(own ? (T("已激活") + " · " + T("永久有效")) : T("未激活")) + '</span></span></div>';
    if (own) {
      h += '<div class="fg-note noi18n" style="margin-top:10px">'
        + esc(T("授权只存本机；换设备或换浏览器（含「加入程序坞」的独立容器）需重新激活一次。")) + '</div>';
      h += '<div class="fg-acts"><button class="fg-btn dg" id="falOwnerOff">' + esc(T("解除授权")) + '</button></div>';
    } else {
      h += '<input class="fg-sel" id="falOwnerCode" type="password" autocomplete="off" '
        + 'placeholder="' + esc(T("输入创始人授权码")) + '" style="margin-top:10px" />';
      h += '<div class="fg-note noi18n" style="margin-top:9px">'
        + esc(T("授权码只在本机校验，不上传服务器。")) + '</div>';
      h += '<div class="fg-acts"><button class="fg-btn pri" id="falOwnerOn">' + esc(T("激活")) + '</button></div>';
      h += '<div class="fg-note noi18n" id="falOwnerMsg" style="margin-top:8px;color:#FF9A9A"></div>';
    }
    h += '</div></div>';

    h += '<div class="fg-sec"><div class="fg-t">当前套餐</div><div class="fg-card">';
    h += '<div class="fg-row"><span class="fg-k">套餐</span><span class="fg-v">专业版</span>'
      + (own ? '<span class="fg-tag own">' + esc(T("创始人")) + '</span>' : '<span class="fg-tag demo">演示值</span>') + '</div>';
    h += '<div class="fg-row"><span class="fg-k">价格</span><span class="fg-v">' + (own ? "—" : "¥999 / 月") + '</span></div>';
    h += '<div class="fg-row"><span class="fg-k">席位</span><span class="fg-v">3 席位</span></div>';
    if (own) {
      h += '<div class="fg-note noi18n" style="margin-top:11px">'
        + esc(T("创始人账号：专业版永久有效，不参与 7 天试用与到期降级。")) + '</div>';
    } else {
      h += '<div class="fg-note" style="margin-top:11px">原型没有后端计费，本组数字全部为演示值，不代表任何真实账务。</div>';
    }
    h += '</div></div>';

    h += '<div class="fg-sec"><div class="fg-t">查询点数</div><div class="fg-card">';
    h += '<div class="fg-metric"><b>458</b><span>/ 500 点</span><span class="fg-tag demo">演示值</span></div>';
    h += '<div class="fg-bar"><i style="width:91.6%"></i></div>';
    h += '<div class="fg-note">按当前消耗速度，约 11 天后用尽。这是有用信息，不是催费弹窗。</div>';
    h += '<div class="fg-note" style="margin-top:8px">计费口径：每调用一次商业数据源（海关提单反查、商业名单筛查、股权穿透等）扣 1 点；名片扫描与免费名单筛查不扣点。</div>';
    h += '</div></div>';

    h += '<div class="fg-sec"><div class="fg-t">本月消耗</div><div class="fg-card">';
    h += '<div class="fg-row"><span class="fg-k">海关提单反查</span><span class="fg-v" style="text-align:right">18 点</span></div>';
    h += '<div class="fg-row"><span class="fg-k">商业名单筛查</span><span class="fg-v" style="text-align:right">14 点</span></div>';
    h += '<div class="fg-row"><span class="fg-k">股权穿透</span><span class="fg-v" style="text-align:right">10 点</span></div>';
    h += '<div class="fg-row"><span class="fg-k">合计</span><span class="fg-v" style="text-align:right">42 点</span></div>';
    h += '<div class="fg-acts"><a class="fg-btn pri" href="' + PAGE_HOME + '#plans" style="text-decoration:none">查看套餐与价格</a></div>';
    h += '</div></div>';
    return h;
  }

  function secData() {
    var items = [
      [KEY.profile, "战略档案"],
      [KEY.cards, "展会名片"],
      [KEY.contacts, "补录联系方式"],
      [KEY.drafts, "开发信草稿"],
      [KEY.sig, "签名档自定义"],
      [KEY.pipeline, "管线状态"]
    ];
    var h = "";
    h += '<div class="fg-sec"><div class="fg-t">本机数据</div><div class="fg-card">';
    items.forEach(function (it) {
      var b = bytesOf(it[0]);
      h += '<div class="fg-row"><span class="fg-k">' + esc(it[1]) + '</span>'
        + '<span class="fg-v' + (b ? "" : " na") + '">' + (b ? fmtSize(b) : "暂无数据") + '</span>'
        + (b ? '<button class="fg-go" data-clear="' + esc(it[0]) + '" data-name="' + esc(it[1]) + '">清空</button>' : "")
        + '</div>';
    });
    h += '<div class="fg-note" style="margin-top:11px">全部数据只存在你这台设备的浏览器里，不会上传。清空后无法恢复。</div>';
    h += '<div class="fg-acts"><button class="fg-btn" id="falExport">导出为 JSON</button>'
      + '<button class="fg-btn dg" id="falWipe">清空全部本机数据</button></div>';
    h += '</div></div>';

    h += '<div class="fg-sec"><div class="fg-t">关于</div><div class="fg-card">';
    h += '<div class="fg-row"><span class="fg-k">产品</span><span class="fg-v">获客通AI · FALCORA</span></div>';
    h += '<div class="fg-row"><span class="fg-k">形态</span><span class="fg-v">原型演示 · 纯静态单文件</span></div>';
    h += '<div class="fg-row"><span class="fg-k">数据分层</span><span class="fg-v">L1 公开 / L2 职能 / L3 自备</span></div>';
    h += '<div class="fg-note" style="margin-top:11px">L1 公开企业信息可自由检索；L2 企业公开职能联系方式可用但须标来源；'
      + 'L3 个人联系方式只接受使用者自备，平台不抓取、不买卖、不推断。</div>';
    h += '<div class="fg-note" style="margin-top:8px">「未发现命中」与「数据未覆盖」均不等于「无风险」。</div>';
    h += '</div></div>';
    return h;
  }

  /* ---------- 齿轮事件 ---------- */
  function wireGear() {
    /* 创始人授权：激活 / 解除（v55） */
    var oOn = gearBody.querySelector("#falOwnerOn");
    if (oOn) oOn.addEventListener("click", function () {
      var inp = gearBody.querySelector("#falOwnerCode");
      var msg = gearBody.querySelector("#falOwnerMsg");
      if (ownerHash(inp ? inp.value : "") === OWNER_HASH) {
        try { localStorage.setItem(OWNER_KEY, "1"); } catch (e) {}
        setOwnerPlan(true);
        if (msg) msg.style.color = "#5EEAD4", msg.textContent = T("已激活，正在刷新…");
        setTimeout(function () { location.reload(); }, 450);
      } else {
        if (msg) msg.textContent = T("授权码不正确");
        if (inp) { inp.value = ""; inp.focus(); }
      }
    });
    var oOff = gearBody.querySelector("#falOwnerOff");
    if (oOff) oOff.addEventListener("click", function () {
      try { localStorage.removeItem(OWNER_KEY); } catch (e) {}
      setOwnerPlan(false);
      setTimeout(function () { location.reload(); }, 300);
    });

    var ls = gearBody.querySelector("#falLangSel");
    if (ls) ls.addEventListener("change", function () {
      try { localStorage.setItem(KEY.lang, ls.value); } catch (e) {}
      var top = document.querySelector('.lang-picker select');
      if (top) top.value = ls.value;
      applyLang();
    });

    var tz = gearBody.querySelector("#falTzSel");
    if (tz) tz.addEventListener("change", function () {
      var p = rd(KEY.prefs, {}) || {};
      p.tz = tz.value;
      wr(KEY.prefs, p);
    });

    Array.prototype.forEach.call(gearBody.querySelectorAll("[data-sw]"), function (b) {
      b.addEventListener("click", function () {
        var nf = notifyPref();
        nf[b.dataset.sw] = !nf[b.dataset.sw];
        wr(KEY.notify, nf);
        b.classList.toggle("on", nf[b.dataset.sw]);
        b.setAttribute("aria-checked", nf[b.dataset.sw] ? "true" : "false");
        updateBadge();
      });
    });

    Array.prototype.forEach.call(gearBody.querySelectorAll("[data-clear]"), function (b) {
      b.addEventListener("click", function () {
        var k = b.dataset.clear, nm = b.dataset.name;
        if (!window.confirm(Tn("确定清空「{name}」？此操作不可恢复。", T(nm)))) return;
        try { localStorage.removeItem(k); } catch (e) {}
        paintGear();
        updateBadge();
      });
    });

    var ex = gearBody.querySelector("#falExport");
    if (ex) ex.addEventListener("click", function () {
      var dump = {};
      Object.keys(KEY).forEach(function (k) {
        var v = raw(KEY[k]);
        if (v != null) dump[k] = v;
      });
      var blob = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "FALCORA_on_device_backup.json";
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    });

    var wp = gearBody.querySelector("#falWipe");
    if (wp) wp.addEventListener("click", function () {
      if (!window.confirm(T("确定清空全部本机数据？包括战略档案、名片、补录联系方式与草稿，此操作不可恢复。"))) return;
      ["profile", "profileOld", "cards", "contacts", "sender", "drafts", "sig", "pipeline", "notify", "prefs", "read"].forEach(function (k) {
        try { localStorage.removeItem(KEY[k]); } catch (e) {}
      });
      paintGear();
      updateBadge();
    });
  }

  /* ---------- 未读角标 ---------- */
  function updateBadge() {
    var btns = document.querySelectorAll('.icon-btn[data-fal-panel="bell"]');
    if (!btns.length) return;
    var read = readIds();
    var n = buildNotifs().filter(function (x) { return read.indexOf(x.id) === -1; }).length;
    Array.prototype.forEach.call(btns, function (b) {
      var d = b.querySelector(".fal-dot");
      if (!d) return;
      if (n > 0) { d.hidden = false; d.textContent = n > 9 ? "9+" : String(n); }
      else { d.hidden = true; }
    });
  }

  /* ---------- 顶栏图标绑定（幂等） ---------- */
  function bindIcons() {
    var tr = document.querySelector(".top-right");
    if (!tr) return;
    var btns = tr.querySelectorAll(".icon-btn");
    var b = null, g = null;

    Array.prototype.forEach.call(btns, function (x) {
      var p = x.dataset.falPanel;
      if (p === "bell") { b = x; return; }
      if (p === "gear") { g = x; return; }
      var title = (x.getAttribute("title") || "") + "";
      if (/通知|Notification/i.test(title)) { x.dataset.falPanel = "bell"; b = x; }
      else { x.dataset.falPanel = "gear"; g = x; }
    });

    /* 02–07 页顶栏只有一个齿轮字符图标，补一个铃铛在它左边 */
    if (!b) {
      b = document.createElement("div");
      b.className = "icon-btn";
      b.dataset.falPanel = "bell";
      b.setAttribute("title", "通知");
      b.setAttribute("aria-label", "通知");
      tr.insertBefore(b, g || null);
    }

    if (b && b.dataset.falIcon !== "1") {
      b.dataset.falIcon = "1";
      b.innerHTML = SVG_BELL + '<i class="fal-dot" hidden></i>';
      b.addEventListener("click", openBell);
    }
    if (g && g.dataset.falIcon !== "1") {
      g.dataset.falIcon = "1";
      g.innerHTML = SVG_GEAR;
      g.addEventListener("click", openGear);
    }
    updateBadge();
  }

  /* ---------- Esc 关闭 ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && scrim && !scrim.hidden) closeAll();
  });

  /* ---------- 语言切换时重绘面板 ---------- */
  /* 通知文案是「T() 预翻译后再插入 DOM」的，所以切语言必须重绘面板：
     否则 applyText 会把已翻译的外文当成 __src，切回中文时反查不到、残留外文。
     app-i18n.js 在本脚本之后加载，故带重试等待它挂上 __falOnRefresh。 */
  function regRefresh(tries) {
    tries = tries || 0;
    if (window.__falOnRefresh) {
      window.__falOnRefresh(function () {
        if (bell && !bell.hidden) paintBell();
        if (gear && !gear.hidden) paintGear();
      });
      return;
    }
    if (tries < 40) setTimeout(function () { regRefresh(tries + 1); }, 80);
  }
  regRefresh();

  /* ---------- 启动 ---------- */
  function boot() { bindIcons(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  window.addEventListener("load", function () { setTimeout(boot, 140); });
  setTimeout(boot, 640);

  /* 供验证脚本断言 */
  window.__falPanel = {
    openBell: openBell,
    openGear: openGear,
    close: closeAll,
    notifs: buildNotifs,
    notifyPref: notifyPref,
    tz: tzOf,
    bind: bindIcons
  };
})();
