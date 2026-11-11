#!/usr/bin/env node
/* smoke_v78_local.js —— 根路径语义纠正冒烟（2026-11-10）
   验收：任何人/AI 打开域名根目录，看到的必须是真实对外定位，而不是内部样机。
   ① 根 / 渲染为对外落地页（主张 + 进入应用 → app.html），且不含驾驶舱能力/套餐面板
   ② /app.html 渲染为内部驾驶舱（保留 noindex + 内部样机声明）
   ③ 8 屏侧栏「首页」、行业清单、名录库预览 全部指向 app.html
   ④ 静态指针：manifest start_url / sw.js PRECACHE+fallback / robots / sitemap / hreflang
   ⑤ 两页零 JS 异常（铁律 15）
   ⚠️ 铁律 16/18：随机端口 + 预检标记 + --no-proxy-server + 同进程内启停。 */
const http = require("http"), fs = require("fs"), path = require("path"), { spawn } = require("child_process");
const DIR = path.join(__dirname, "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const MIME = { ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json",
  ".xml": "application/xml", ".txt": "text/plain" };
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0; const fails = [];
function ok(c, name, extra) {
  if (c) { pass++; console.log("  ✓ " + name); }
  else { fail++; fails.push(name + (extra ? " → " + extra : "")); console.log("  ✗ " + name + (extra ? " → " + extra : "")); }
}
function startServer() {
  return new Promise(res => {
    const s = http.createServer((req, rp) => {
      let p = decodeURIComponent(req.url.split("?")[0]);
      if (p === "/") p = "/index.html";
      const f = path.join(DIR, p);
      if (!f.startsWith(DIR) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { rp.writeHead(404); rp.end("nf"); return; }
      rp.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" });
      fs.createReadStream(f).pipe(rp);
    });
    s.listen(0, "127.0.0.1", () => res({ s, port: s.address().port }));
  });
}

(async function () {
  const { s: srv, port } = await startServer();
  const base = "http://127.0.0.1:" + port + "/";
  const rootHtml = fs.readFileSync(path.join(DIR, "index.html"), "utf8");
  if (!/先查清楚，再去谈/.test(rootHtml)) { console.error("预检失败：根 index.html 不是本项目落地页"); srv.close(); process.exit(2); }
  console.log("预检 OK（根落地页标记点命中）· 端口 " + port);

  console.log("\n=== A. 静态指针（无需浏览器） ===");
  const appHtml = fs.readFileSync(path.join(DIR, "app.html"), "utf8");
  const sw = fs.readFileSync(path.join(DIR, "sw.js"), "utf8");
  const manifest = JSON.parse(fs.readFileSync(path.join(DIR, "manifest.webmanifest"), "utf8"));
  const robots = fs.readFileSync(path.join(DIR, "robots.txt"), "utf8");
  const sitemap = fs.readFileSync(path.join(DIR, "sitemap.xml"), "utf8");
  const nav = fs.readFileSync(path.join(DIR, "app-nav.js"), "utf8");
  const panel = fs.readFileSync(path.join(DIR, "app-panel.js"), "utf8");
  const upd = fs.readFileSync(path.join(DIR, "app-update.js"), "utf8");
  const en = fs.readFileSync(path.join(DIR, "falcora-landing-en.html"), "utf8");
  const screens = ["01_战略_企业战略档案.html","02_全球线索获取.html","03_客户尽调与风险核查.html",
    "04_获客执行与内容.html","05_客户深挖.html","06_转化率升级.html","07_账号与成员管理.html",
    "08_成本与报价测算.html","行业覆盖清单.html","名录库_预览.html"];
  const rootTitle = (rootHtml.match(/<title>([^<]*)<\/title>/) || ["", ""])[1];
  ok(/FALCORA/.test(rootTitle) && !/内部样机|驾驶舱|增长总司令/.test(rootTitle), "A1 根 title 为对外定位（非内部样机）");
  ok(/海外客户怎么核实|Verify an Overseas Buyer/.test(rootTitle), "A1b 根 title 含客户会搜的问句");
  ok(!/noindex/.test(rootHtml), "A2 根落地页无 noindex（可索引）");
  ok(/href="app\.html">进入应用/.test(rootHtml), "A3 根落地页含「进入应用 → app.html」");
  ok(/rel="canonical" href="https:\/\/ryanchen7051\.github\.io\/falcora\/"/.test(rootHtml), "A4 根 canonical 指向根 /");
  ok(/name="robots" content="noindex,nofollow"/.test(appHtml), "A5 app.html 保留 noindex");
  ok(/内部样机 · 演示数据/.test(appHtml), "A6 app.html 保留内部样机声明");
  ok(!/增长总司令驾驶舱<\/title>/.test(appHtml), "A7 app.html 标题已去虚构定位");
  ok(screens.every(f => /href="app\.html"/.test(fs.readFileSync(path.join(DIR, f), "utf8"))),
     "A8 10 个内部页「首页」全部指向 app.html");
  ok(!screens.some(f => /href="index\.html"/.test(fs.readFileSync(path.join(DIR, f), "utf8"))),
     "A9 内部页无残留 href=index.html");
  ok(/window\.location\.href = 'app\.html'/.test(nav) && /a\.href = 'app\.html'/.test(nav), "A10 app-nav.js 两处回退/首页指向 app.html");
  ok(/PAGE_HOME = "app\.html"/.test(panel), "A11 app-panel.js PAGE_HOME 指向 app.html");
  ok(/fetch\('\.\/app\.html\?__probe=/.test(upd), "A12 app-update.js 探针指向 app.html");
  ok(manifest.start_url === "./app.html", "A13 manifest start_url = ./app.html", manifest.start_url);
  ok(/const CACHE = 'falcora-v78'/.test(sw), "A14 SW CACHE = falcora-v78");
  ok(/'\.\/app\.html',/.test(sw) && !/'\.\/index\.html',/.test(sw), "A15 PRECACHE 含 app.html、不含 index.html");
  ok(/caches\.match\('\.\/app\.html'\)/.test(sw), "A16 离线导航回落指向 app.html");
  ok(/Disallow: \/app\.html/.test(robots) && !/Disallow: \/index\.html/.test(robots), "A17 robots 禁 app.html、不再禁 index.html");
  ok(/<loc>https:\/\/ryanchen7051\.github\.io\/falcora\/<\/loc>/.test(sitemap), "A18 sitemap 主 URL = 根 /");
  ok(/hreflang="zh-Hans" href="https:\/\/ryanchen7051\.github\.io\/falcora\/"/.test(en), "A19 英文页中文 hreflang 指向根 /");
  ok(/<nav class="lang"/.test(en) && /<a href="\.\/" hreflang="zh-Hans" lang="zh-Hans">中文<\/a>/.test(en), "A20 英文页语言切换器含指回根 / 的中文选项");

  // ---- 浏览器渲染：零 JS 异常 + innerText 语义 ----
  const dbg = 9800 + Math.floor(Math.random() * 120);
  const ud = fs.mkdtempSync("/tmp/fal-v78-");
  const ch = spawn(CHROME, ["--headless=new", "--disable-gpu", "--no-sandbox", "--mute-audio",
    "--window-size=1400,1800", "--remote-debugging-port=" + dbg, "--no-proxy-server",
    "--proxy-bypass-list=<-loopback>", "--user-data-dir=" + ud, "about:blank"], { stdio: "ignore" });
  let ver = null;
  for (let i = 0; i < 60; i++) { await sleep(400); try { ver = await new Promise((a, b) => http.get({ host: "127.0.0.1", port: dbg, path: "/json/version" }, r => { let t = ""; r.on("data", c => t += c); r.on("end", () => a(JSON.parse(t))); }).on("error", b)); if (ver) break; } catch (e) {} }
  if (!ver) { console.error("Chrome 未就绪"); srv.close(); process.exit(3); }
  const tl = await new Promise((a, b) => http.get({ host: "127.0.0.1", port: dbg, path: "/json/list" }, r => { let t = ""; r.on("data", c => t += c); r.on("end", () => a(JSON.parse(t))); }).on("error", b));
  const ws = new WebSocket(tl.find(x => x.type === "page").webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener("open", r));
  let id = 0; const waiting = new Map(); let errs = [];
  ws.addEventListener("message", ev => {
    const m = JSON.parse(ev.data);
    if (m.id && waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
    if (m.method === "Runtime.exceptionThrown") errs.push((m.params.exceptionDetails || {}).text || "exc");
  });
  const send = (method, params) => new Promise((a, b) => { const i = ++id; waiting.set(i, m => m.error ? b(new Error(JSON.stringify(m.error))) : a(m.result)); ws.send(JSON.stringify({ id: i, method, params: params || {} })); });
  const ev = async expr => { const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) return "__EXC__ " + (r.exceptionDetails.text || ""); return r.result.value; };
  await send("Runtime.enable"); await send("Page.enable");

  console.log("\n=== B. 根 / 渲染（对外落地页） ===");
  errs = [];
  await send("Page.navigate", { url: base });
  await sleep(2000);
  const rootInfo = await ev(`(function(){
    var links=[].slice.call(document.querySelectorAll('a[href]')).map(function(a){return a.getAttribute('href');});
    return { title:document.title, text:document.body.innerText.slice(0,1200), faq:document.querySelectorAll('.faq h3').length, links:links,
      hasPlans:/套餐与价格/.test(document.body.innerText), hasCaps:/平台能力覆盖/.test(document.body.innerText) };
  })()`);
  ok(typeof rootInfo === "object" && rootInfo && !String(rootInfo).startsWith("__EXC__"), "B1 根页面可渲染并取到 innerText");
  ok(/FALCORA/.test(rootInfo.title || "") && !/内部样机|驾驶舱/.test(rootInfo.title || ""), "B2 渲染 title = 对外定位（非内部样机）");
  ok(rootInfo.faq === 5, "B7 渲染后 FAQ 五问可见");
  ok(/先查清楚，再去谈/.test(rootInfo.text || "") && /Know who you're dealing with/.test(rootInfo.text || ""), "B3 渲染含中英主张");
  ok((rootInfo.links || []).indexOf("app.html") >= 0, "B4 渲染后「进入应用」链接指向 app.html");
  ok(!rootInfo.hasPlans && !rootInfo.hasCaps, "B5 根页面不含样机「套餐与价格 / 平台能力覆盖」面板");
  ok(errs.length === 0, "B6 根页面零 JS 异常", errs.join(" | "));

  console.log("\n=== C. /app.html 渲染（内部驾驶舱） ===");
  errs = [];
  await send("Page.navigate", { url: base + "app.html" });
  await sleep(3000);
  const appInfo = await ev(`(function(){
    return { title:document.title, text:document.body.innerText.slice(0,600),
      hasPlans:/套餐与价格/.test(document.body.innerText), hasCaps:/平台能力覆盖/.test(document.body.innerText),
      selfLinks:[].slice.call(document.querySelectorAll('a[href="app.html"]')).length };
  })()`);
  ok(typeof appInfo === "object" && appInfo && !String(appInfo).startsWith("__EXC__"), "C1 app.html 可渲染并取到 innerText");
  ok(/驾驶舱（内部样机 · 演示数据）/.test(appInfo.title || ""), "C2 app.html title = 内部样机");
  ok(/内部样机 · 演示数据/.test(appInfo.text || ""), "C3 app.html 正文含边界声明");
  ok(appInfo.hasPlans && appInfo.hasCaps, "C4 驾驶舱能力/套餐面板仍在（未破版）");
  ok(errs.length === 0, "C5 app.html 零 JS 异常", errs.join(" | "));

  ws.close(); try { ch.kill(); } catch (e) {}
  try { fs.rmSync(ud, { recursive: true, force: true }); } catch (e) {}
  srv.close();

  console.log("\n=== 结果 ===");
  console.log("通过 " + pass + " / " + (pass + fail) + (fail ? "  ❌ 失败 " + fail : "  ✅ 全绿"));
  if (fail) { fails.forEach(f => console.log("   - " + f)); process.exitCode = 1; }
})().catch(e => { console.error("冒烟异常:", e && e.stack || e); process.exitCode = 3; });
