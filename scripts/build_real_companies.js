/* 把 verify-out.json 的实测结果回写进 data-real-companies.js
   —— 只替换 window.FAL_REAL = [ ... ] 这一段的数组体，文件头注释 / 尾部统计与索引保持原样。 */
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..");
const DATA = path.join(DIR, "data-real-companies.js");

global.window = {};
require(DATA);
const REAL = window.FAL_REAL.slice();
const V = JSON.parse(fs.readFileSync(path.join(DIR, "verify-out.json"), "utf8"));
const byNm = {};
V.forEach(function (v) { byNm[v.nm] = v; });

/* ---------- 人工复核后的修正（2026-10-20 实测 + DoH 交叉验证）---------- */
const DM_FIX = {
  "KITE OPTICS": "kiteoptics.com"          /* .be 无 A 记录响应；.com 实测 200，标题 "KITE OPTICS — Home of Belgian..." */
};
/* 必须剔除的条目：
   · Direct Action：directaction.info 已被他人抢注，实测跳转到 unoffensiveanimal.is（无关网站），
     其余候选域名全部无响应 —— 无法确认真实官网就不该出现在名单里。 */
const DROP = ["Direct Action"];

/* 网关拦截页识别：本机 DNS 被劫持/网关过滤时，curl 会「成功」返回一个 200 的过滤页。
   这种 200 是假的可达 —— 必须判为 0，否则又给了使用者一个打不开的链接。 */
function isGatewayPage(u) {
  return /1\.1\.1\.2|urlfilter|sangfor|深信服/i.test(u || "");
}

const kept = [];
REAL.forEach(function (r) {
  if (DROP.indexOf(r.nm) !== -1) return;
  const dm = DM_FIX[r.nm] || r.dm;
  const v = byNm[r.nm] || {};
  let reach = Number(v.reach) || 0;
  let url = v.url || ("https://" + dm);
  let title = v.title || "";
  if (isGatewayPage(url)) { reach = 0; url = "https://" + dm; title = ""; }
  /* 域名被改过时，旧实测结果不可信 → 回到 0，等下一轮复核 */
  if (dm !== r.dm) { reach = 0; url = "https://" + dm; title = ""; }
  kept.push(Object.assign({}, r, { dm: dm, url: url, reach: reach, title: title }));
});

/* 人工补实测（KITE OPTICS 改用 .com 后实测 200） */
const MANUAL = {
  "KITE OPTICS": { reach: 200, url: "https://kiteoptics.com/en/", title: "KITE OPTICS — Home of Belgian innovative optics" }
};
kept.forEach(function (r) {
  const m = MANUAL[r.nm];
  if (m) { r.reach = m.reach; r.url = m.url; r.title = m.title; }
});

/* ---------- 序列化 ---------- */
function q(s) { return JSON.stringify(String(s == null ? "" : s)); }
const body = kept.map(function (r) {
  return "  {nm:" + q(r.nm) + ", dm:" + q(r.dm) + ", cc:" + q(r.cc) + ", region:" + q(r.region) +
    ", famId:" + q(r.famId) + ", ind:" + q(r.ind) + ", btype:" + q(r.btype) + ",\n" +
    "   need:" + q(r.need) + ", kw:" + q(r.kw) + ", reach:" + (Number(r.reach) || 0) +
    ", url:" + q(r.url) + ", title:" + q(r.title) + "}";
}).join(",\n");

const src = fs.readFileSync(DATA, "utf8");
const headEnd = src.indexOf("window.FAL_REAL = [");
const arrStart = headEnd + "window.FAL_REAL = [".length;
const arrEnd = src.indexOf("\n];", arrStart);
if (headEnd < 0 || arrEnd < 0) throw new Error("找不到数组边界");

const head = src.slice(0, arrStart);
const tail = src.slice(arrEnd);
fs.writeFileSync(DATA, head + "\n" + body + tail);

/* ---------- 自检 ---------- */
const dist = kept.reduce(function (a, r) { a[r.reach] = (a[r.reach] || 0) + 1; return a; }, {});
const fams = kept.reduce(function (a, r) { a[r.famId] = (a[r.famId] || 0) + 1; return a; }, {});
const regs = kept.reduce(function (a, r) { a[r.region] = (a[r.region] || 0) + 1; return a; }, {});
console.log("条目数:", kept.length, "| 族:", JSON.stringify(fams), "| 区域:", JSON.stringify(regs));
console.log("状态码分布:", JSON.stringify(dist));
console.log("有 title:", kept.filter(r => r.title).length, "/", kept.length);
console.log("非 https 开头 url:", kept.filter(r => !/^https?:\/\//.test(r.url)).map(r => r.dm).join(",") || "无");
console.log("网关页残留:", kept.filter(r => isGatewayPage(r.url)).length);
console.log("重复域名:", (function () {
  const seen = {}, d = [];
  kept.forEach(r => { if (seen[r.dm]) d.push(r.dm); seen[r.dm] = 1; });
  return d.join(",") || "无";
})());
