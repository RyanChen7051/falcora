#!/usr/bin/env node
/* Render smoke for try.html: real browser, real clicks, zero JS exceptions.
   Usage: node scripts/smoke_trypage_render.js local | online
   Local mode starts a random-port static server and stops it in the same process.
   CDP uses Node 22 built-in WebSocket; every command has a hard timeout.
*/
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const DIR = path.join(__dirname, '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'https://ryanchen7051.github.io/falcora/';
const MODE = (process.argv[2] || 'local').toLowerCase();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };

const P = [];
function chk(ok, name, extra) {
  P.push(!!ok);
  console.log((ok ? '\u2705 ' : '\u274c ') + name + (extra !== undefined ? '  \u2192 ' + extra : ''));
}

function startServer() {
  return new Promise((res) => {
    const s = http.createServer((req, rp) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p === '/') p = '/index.html';
      const f = path.join(DIR, p);
      if (!f.startsWith(DIR) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { rp.writeHead(404); rp.end('nf'); return; }
      rp.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(rp);
    });
    s.listen(0, '127.0.0.1', () => res({ s, port: s.address().port }));
  });
}

class CDP {
  constructor(url) { this.url = url; this.ws = null; this.id = 0; this.pending = new Map(); this.exceptions = []; }
  open() {
    return new Promise((res, rej) => {
      this.ws = new WebSocket(this.url);
      const t = setTimeout(() => rej(new Error('websocket open timeout')), 12000);
      this.ws.onopen = () => { clearTimeout(t); res(); };
      this.ws.onerror = (e) => { clearTimeout(t); rej(new Error('websocket error ' + (e.message || ''))); };
      this.ws.onmessage = (ev) => {
        let m; try { m = JSON.parse(ev.data); } catch (e) { return; }
        if (m.method === 'Runtime.exceptionThrown') {
          this.exceptions.push((m.params.exceptionDetails || {}).text || 'exception');
        }
        if (m.id && this.pending.has(m.id)) {
          const p = this.pending.get(m.id); this.pending.delete(m.id); clearTimeout(p.t);
          m.error ? p.rej(new Error(m.error.message)) : p.res(m.result);
        }
      };
    });
  }
  send(method, params) {
    return new Promise((res, rej) => {
      const id = ++this.id;
      const t = setTimeout(() => { this.pending.delete(id); rej(new Error('CDP timeout: ' + method)); }, 15000);
      this.pending.set(id, { res, rej, t });
      this.ws.send(JSON.stringify({ id, method, params: params || {} }));
    });
  }
  async eval(expr) {
    const r = await this.send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error('eval: ' + (r.exceptionDetails.text || 'exception'));
    return r.result.value;
  }
  close() { try { this.ws.close(); } catch (e) { /* ignore */ } }
}

(async function main() {
  if (!['local', 'online'].includes(MODE)) throw new Error('mode must be local or online');
  const marker = fs.readFileSync(path.join(DIR, 'try.html'), 'utf8');
  if (!/FALCORA B2B/.test(marker)) { console.error('preflight failed: try.html is not the expected page'); process.exit(2); }
  console.log('preflight OK (try.html marker) · mode = ' + MODE + '\n');

  let srv = null, base = BASE;
  if (MODE === 'local') {
    srv = await startServer();
    base = 'http://127.0.0.1:' + srv.port + '/';
  }

  const PORT = 40000 + Math.floor(Math.random() * 9000);
  const profile = '/tmp/falcora_cdp_' + process.pid + '_' + Date.now();
  const args = ['--headless=new', '--disable-gpu', '--no-sandbox', '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + profile, '--no-proxy-server', '--proxy-bypass-list=<-loopback>', 'about:blank'];
  const chrome = spawn(CHROME, args, { stdio: 'ignore' });
  const cleanup = () => { try { chrome.kill('SIGTERM'); } catch (e) {} if (srv) { try { srv.s.close(); } catch (e) {} } };
  process.on('exit', cleanup);

  try {
    let version = null;
    for (let i = 0; i < 40; i++) {
      try {
        const r = await fetch('http://127.0.0.1:' + PORT + '/json/version');
        if (r.ok) { version = await r.json(); break; }
      } catch (e) { /* not up yet */ }
      await sleep(250);
    }
    if (!version) throw new Error('Chrome DevTools endpoint did not come up');

    const url = base + 'try.html?q=vortex';
    const nr = await fetch('http://127.0.0.1:' + PORT + '/json/new?' + encodeURIComponent(url), { method: 'PUT' });
    const tab = await nr.json();
    if (!tab.webSocketDebuggerUrl) throw new Error('no webSocketDebuggerUrl for new tab');

    const cdp = new CDP(tab.webSocketDebuggerUrl);
    await cdp.open();
    await cdp.send('Runtime.enable');
    await cdp.send('Page.enable');

    let ready = false;
    for (let i = 0; i < 40; i++) {
      try { ready = await cdp.eval("document.readyState === 'complete' && !!document.querySelector('#meta')"); } catch (e) { /* loading */ }
      if (ready) break;
      await sleep(250);
    }
    chk(ready, 'R1 page reaches readyState complete');

    const baseInfo = await cdp.eval(`(() => ({
      title: document.title,
      meta: (document.querySelector('#meta')||{}).innerText || '',
      cards: document.querySelectorAll('.co').length,
      first: (document.querySelector('.co b')||{}).innerText || '',
      families: document.querySelectorAll('#fam option').length,
      total: (document.querySelector('#total')||{}).innerText || '',
      verifiedAt: (document.querySelector('#verifiedAt')||{}).innerText || '',
      locks: document.querySelectorAll('[data-lock]').length,
      bodyKeyword: (document.body.innerText.match(/FALCORA B2B/g)||[]).length
    }))()`);
    chk(/FALCORA B2B/.test(baseInfo.title), 'R2 rendered title', baseInfo.title);
    chk(/命中\s*1\s*家/.test(baseInfo.meta) && /398/.test(baseInfo.meta), 'R3 real search ran (?q=vortex)', baseInfo.meta);
    chk(baseInfo.cards === 1 && /Vortex/i.test(baseInfo.first), 'R4 one real company card rendered', baseInfo.first);
    chk(baseInfo.families > 20, 'R5 industry filters populated from real data', baseInfo.families);
    chk(baseInfo.total === '398' && /\d{4}-\d{2}-\d{2}/.test(baseInfo.verifiedAt), 'R6 real meta injected', baseInfo.total + ' / ' + baseInfo.verifiedAt);
    chk(baseInfo.locks === 6, 'R7 six gated capabilities in DOM', baseInfo.locks);
    chk(baseInfo.bodyKeyword >= 3, 'R8 FALCORA B2B visible in rendered text', baseInfo.bodyKeyword);

    const dim = await cdp.eval(`(() => {
      const b = document.querySelector('.dim-btn'); if (!b) return { opened:false, text:'' };
      b.click();
      const d = document.querySelector('.dims');
      return { opened: d.className.indexOf('open') >= 0, text: d.innerText.slice(0,80) };
    })()`);
    chk(dim.opened && /三态|核验维度|不填入/.test(dim.text), 'R9 verification-dimension disclosure opens', dim.text.slice(0, 60));

    const pay = await cdp.eval(`(() => {
      const b = document.querySelector('[data-lock]'); b.click();
      return {
        open: document.querySelector('#ov').className.indexOf('open') >= 0,
        title: (document.querySelector('#modal-title')||{}).innerText || '',
        body: (document.querySelector('#modal-body')||{}).innerText || '',
        full: (document.querySelector('.modal')||{}).innerText || ''
      };
    })()`);
    chk(pay.open, 'R10 paywall modal actually opens on click');
    chk(pay.title === '付费用户使用', 'R11 modal shows the exact requested wording', pay.title);
    chk(/导出情报包/.test(pay.body), 'R12 modal names the clicked capability', pay.body);
    chk(/按次交付|没有自助订阅/.test(pay.full) && /账号系统/.test(pay.full), 'R13 modal states honest business boundary');
    chk(/wa\.me\/886982310045/.test((await cdp.eval("document.querySelector('.modal .ch').innerHTML")) || ''), 'R14 modal carries real contact channels');

    const closed = await cdp.eval(`(() => { document.querySelector('[data-close]').click(); return document.querySelector('#ov').className.indexOf('open') < 0; })()`);
    chk(closed, 'R15 modal closes');

    const reSearch = await cdp.eval(`(() => {
      const i = document.querySelector('#q'); i.value = 'US';
      document.querySelector('#go').click();
      const tags = [].slice.call(document.querySelectorAll('.co .tag')).map(function(x){ return x.innerText; });
      return {
        meta: document.querySelector('#meta').innerText,
        cards: document.querySelectorAll('.co').length,
        ccTags: tags.filter(function(t){ return /^[A-Z]{2}$/.test(t); })
      };
    })()`);
    chk(/命中\s*\d+\s*家/.test(reSearch.meta) && reSearch.cards > 0, 'R16 typing a new query re-filters live', reSearch.meta);
    chk(reSearch.ccTags.length > 0 && reSearch.ccTags.every((t) => t === 'US'),
        'R17 two-letter country code matches exactly, not as a substring',
        reSearch.ccTags.slice(0, 6).join(','));
    chk(cdp.exceptions.length === 0, 'R18 zero JS exceptions', cdp.exceptions.join(' | ') || 'none');
    cdp.close();
  } finally {
    cleanup();
  }

  const pass = P.filter(Boolean).length;
  console.log('\n' + pass + ' / ' + P.length + (pass === P.length ? '  ALL GREEN' : '  *** FAILED ***'));
  if (pass !== P.length) process.exitCode = 1;
})().catch((e) => { console.error('RENDER SMOKE CRASH: ' + e.message); process.exitCode = 1; });
