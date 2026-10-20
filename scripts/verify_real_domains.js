/* 全量复核 68 家域名：https / https+www / http / http+www 四路实测，
   记录「实际能打开的那个 URL + 状态码 + 首页 <title>」。
   产出 verify-out.json，供 build 脚本回写 data-real-companies.js。 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const DIR = path.join(__dirname, "..");
global.window = {};
require(path.join(DIR, "data-real-companies.js"));
const REAL = window.FAL_REAL;

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function curl(args) {
  try {
    return execFileSync("curl", args, { encoding: "utf8", timeout: 30000, maxBuffer: 8 * 1024 * 1024 });
  } catch (e) {
    return "";
  }
}
function status(url) {
  const out = curl(["-s", "-o", "/dev/null", "-w", "%{http_code}|%{url_effective}", "-L",
    "--max-time", "12", "--noproxy", "*", "-A", UA, url]);
  const [code, eff] = (out || "000|").split("|");
  return { code: parseInt(code, 10) || 0, eff: eff || url };
}
function title(url) {
  const html = curl(["-s", "-L", "--max-time", "12", "--noproxy", "*", "-A", UA, url]);
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!m) return "";
  return m[1].replace(/\s+/g, " ").trim().slice(0, 120);
}

const cand = [];
REAL.forEach(function (r, i) {
  cand.push({ i: i, nm: r.nm, dm: r.dm });
});

const out = [];
cand.forEach(function (c) {
  const tries = [
    "https://" + c.dm,
    "https://www." + c.dm,
    "http://" + c.dm,
    "http://www." + c.dm
  ];
  let hit = null;
  for (const u of tries) {
    const s = status(u);
    if (s.code && s.code < 400) { hit = { url: s.eff || u, code: s.code }; break; }
    if (s.code === 403 || s.code === 429) { hit = { url: s.eff || u, code: s.code }; break; }  /* 反爬 = 域名真实可达 */
    if (!hit && s.code) hit = { url: s.eff || u, code: s.code };
  }
  if (!hit) hit = { url: "https://" + c.dm, code: 0 };
  const t = (hit.code && hit.code < 400) ? title(hit.url) : "";
  out.push({ nm: c.nm, dm: c.dm, url: hit.url, reach: hit.code, title: t });
  process.stderr.write(`[${out.length}/${cand.length}] ${c.nm.padEnd(26)} ${String(hit.code).padStart(3)} ${hit.url}  ${t.slice(0, 40)}\n`);
});

fs.writeFileSync(path.join(DIR, "verify-out.json"), JSON.stringify(out, null, 2));
const dist = out.reduce(function (a, r) { a[r.reach] = (a[r.reach] || 0) + 1; return a; }, {});
process.stderr.write("\n状态码分布: " + JSON.stringify(dist) + "\n");
process.stderr.write("有 title: " + out.filter(r => r.title).length + " / " + out.length + "\n");
process.stderr.write("完全不通(0): " + out.filter(r => !r.reach).map(r => r.dm).join(", ") + "\n");
