/* FALCORA 获客通AI — 跨页统计 registry（2026-10-14）
   --------------------------------------------------------------------------
   为什么要有它（2026-10-14 用户：「检查这排数字的真实性，不要虚报」）：
   驾驶舱 KPI 原为**硬编码常量**（今日新线索 326 / 已锁定客户 1,842 / 覆盖国家 76 /
   本周拦截风险 47 / 节省尽调工时 312），与系统内真实数据严重不符：
     · ② 页演示池实际 **16 家**  · ③ 页尽调档案实际 **2 份**  · 管线默认 **0 家**
     · 「节省尽调工时」在产品里**根本没有对应功能**
   而 ② 页 changelog 与注释里早就立过铁律：「不编造『312 家 / 47 家』这类数字」
   「漏斗三步一律按当前线索池实时统计」。本模块即把该口径推广到跨页。

   用法：
     · 数据持有页在数据就绪后    __falStats.set(命名空间, {...})
     · 阅读页（如 index.html）   __falStats.get(命名空间)
   首次打开过某页之前，对应命名空间**不存在** —— 阅读方必须按「尚未统计到」处理，
   **绝不回退到任何预设数字**（否则又变成另一种虚报）。
   -------------------------------------------------------------------------- */
(function () {
  var KEY = 'falcora_stats_v1';

  function read() {
    try {
      var o = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (o && typeof o === 'object') return o;
    } catch (e) {}
    return {};
  }
  function write(o) {
    try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {}
  }

  window.__falStats = {
    KEY: KEY,
    /* get()            → 整个注册表
       get('leads')     → 该命名空间，未上报过则返回 null（不返回假数字） */
    get: function (ns) { var o = read(); return ns ? (o[ns] || null) : o; },
    set: function (ns, data) { var o = read(); o[ns] = data; o.__ts = Date.now(); write(o); return o; },
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) {} }
  };
})();
