/* Smoke test for the 2026-11-11 FALCORA B2B public preview (try.html).
   Usage: node scripts/smoke_trypage.js local | online
   Guards: real-L1-only data loading, honest paywall wording, FAQ integrity,
           and the v78 boundary that app.html stays an unindexed internal prototype.
*/
const fs = require('fs');
const path = require('path');
const https = require('https');
const R = path.resolve(__dirname, '..');
const MODE = (process.argv[2] || 'local').toLowerCase();
const BASE = 'https://ryanchen7051.github.io/falcora/';
const LANDINGS = ['index.html', 'falcora-landing.html', 'falcora-landing-en.html'];
const ALL = ['try.html', 'free-preview-faq.html'].concat(LANDINGS, ['sitemap.xml', 'app.html', 'robots.txt', 'sw.js', 'data-real-companies.js']);

const P = [];
function chk(ok, name, extra) {
  P.push(!!ok);
  console.log((ok ? '\u2705 ' : '\u274c ') + name + (extra !== undefined ? '  \u2192 ' + extra : ''));
}
function fetchOnline(f) {
  return new Promise((resolve, reject) => {
    const req = https.get(BASE + f, { headers: { 'User-Agent': 'FALCORA-smoke/1.0' } }, (res) => {
      let b = ''; res.setEncoding('utf8');
      res.on('data', (c) => { b += c; });
      res.on('end', () => resolve({ code: res.statusCode, body: b }));
    });
    req.setTimeout(20000, () => req.destroy(new Error('timeout ' + f)));
    req.on('error', reject);
  });
}
function ldBlocks(s) {
  const re = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  const out = []; let m;
  while ((m = re.exec(s)) !== null) {
    try { out.push(JSON.parse(m[1].trim())); } catch (e) { out.push(null); }
  }
  return out;
}

(async function main() {
  const doc = {};
  if (MODE === 'local') {
    for (const f of ALL) doc[f] = { code: 200, body: fs.readFileSync(path.join(R, f), 'utf8') };
  } else if (MODE === 'online') {
    for (const f of ALL) {
      try { doc[f] = await fetchOnline(f); }
      catch (e) { doc[f] = { code: 0, body: '' }; console.log('FETCH ERROR ' + f + ' ' + e.message); }
    }
  } else throw new Error('mode must be local or online');

  console.log('MODE = ' + MODE + '\n');
  for (const f of ALL) chk(doc[f].code === 200 && doc[f].body.length > 200, f + ' fetched', doc[f].code + ' / ' + doc[f].body.length + 'B');

  /* ---------- A. try.html ---------- */
  console.log('\n=== A. try.html (public preview) ===');
  const t = doc['try.html'].body;
  chk(!/noindex/i.test(t), 'A1 preview is indexable (no noindex)');
  chk(/rel="canonical" href="https:\/\/ryanchen7051\.github\.io\/falcora\/try\.html"/.test(t), 'A2 canonical self-reference');
  chk(/hreflang="zh-Hans"/.test(t) && /hreflang="x-default"/.test(t), 'A3 hreflang zh-Hans + x-default self (no unmatched en alternate)');
  const tTitleMatch = t.match(/<title>([\s\S]*?)<\/title>/);
  const tTitle = tTitleMatch ? tTitleMatch[1] : '';
  chk(/FALCORA B2B/.test(tTitle), 'A4 title carries FALCORA B2B', tTitle);
  const tlds = ldBlocks(t);
  chk(tlds.length >= 1 && tlds.every((x) => x !== null), 'A5 all JSON-LD parse', tlds.length + ' blocks');
  chk(tlds.some((x) => x && x['@type'] === 'WebPage' && /FALCORA B2B/.test(x.name || '')), 'A6 WebPage JSON-LD present');
  chk((t.match(/FALCORA B2B/g) || []).length >= 3, 'A7 keyword visible in body multiple times', (t.match(/FALCORA B2B/g) || []).length);
  chk(/id="about-falcora-b2b"|公开体验版 · 真实公开数据/.test(t), 'A8 public-preview banner states the boundary');

  // Hard guard: the preview must load ONLY the L1 buyer directory.
  const srcs = [...t.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  chk(srcs.length === 1 && srcs[0] === 'data-real-companies.js', 'A9 only data-real-companies.js is loaded', srcs.join(','));
  chk(!/data-xref\.js|data-l2-contacts\.js|data-assoc-members\.js|data-gov-buyers\.js|app-[a-z]+\.js/.test(t),
      'A10 no L2 / xref / bulk directory / cockpit scripts loaded');
  chk(/window\.FAL_REAL/.test(t) && /FAL_REAL_META/.test(t), 'A11 reads real L1 array + verification meta');
  chk(!/¥\s?\d|套餐价格|席位价格|¥999|¥2,999/.test(t), 'A12 no fictional pricing or seat plans');

  // Search UI is genuinely interactive, not a static mockup.
  for (const id of ['q', 'fam', 'go', 'grid', 'meta', 'empty']) {
    chk(new RegExp('id="' + id + '"').test(t), 'A13 control #' + id + ' present');
  }
  chk(/function search\(\)/.test(t) && /\.filter\(/.test(t) && /addEventListener\('click', search\)/.test(t),
      'A14 real client-side filtering wired up');
  chk(/new URLSearchParams\(location\.search\)/.test(t), 'A15 ?q= deep link supported');
  chk(/体验版不填入任何实际核验值/.test(t) && /不生成该企业的尽调结论/.test(t),
      'A16 preview never fabricates verification values or conclusions');

  // Paywall: exactly the wording the user asked for, with honest boundaries.
  const locks = [...t.matchAll(/data-lock="([^"]+)"/g)].map((m) => m[1]);
  chk(locks.length === 6, 'A17 six paid capabilities gated', locks.length);
  chk(locks.some((x) => /导出情报包/.test(x)), 'A18 intel-pack export is gated (the sellable asset)');
  chk(locks.some((x) => /L2/.test(x)) && locks.some((x) => /名录交叉验证/.test(x)), 'A19 L2 + xref details are gated');
  chk((t.match(/付费用户使用/g) || []).length >= 6, 'A20 "付费用户使用" shown on gated items', (t.match(/付费用户使用/g) || []).length);
  chk(/id="ov"/.test(t) && /id="modal-title"/.test(t) && /classList\.add\('open'\)/.test(t),
      'A21 paywall modal is functional');
  chk(/没有自助订阅、在线支付或账号系统/.test(t), 'A22 no fake subscription / payment / account claim');
  chk(/只按次交付情报包/.test(t), 'A23 per-delivery business model stated');
  chk(/权限提示只是功能说明，不是账户权限判断/.test(t), 'A24 explicitly says the gate is UI-only, not real auth');

  // Contacts + data honesty.
  chk(t.indexOf('https://wa.me/886982310045') >= 0 && /\+886 982310045/.test(t), 'A25 WhatsApp deeplink + number');
  chk(/mailto:3531885069@qq\.com/.test(t) && /mailto:pccnsysu@gmail\.com/.test(t), 'A26 both mailto emails');
  chk(t.indexOf('pccnsysu') >= 0 && t.indexOf('Ryanpcc') >= 0, 'A27 LINE / WeChat kept');
  chk(/供货方 ≠ 采购方/.test(t) && /绝不互相兜底/.test(t), 'A28 supplier/buyer separation stated');
  chk(/三态输出/.test(t) && /绝不输出「无风险」/.test(t), 'A29 three-state output + no "no risk" verdict');
  chk(/平台绝不填示例值/.test(t), 'A30 no sample values');
  chk(/261/.test(t) && /128/.test(t) && /9/.test(t) && /398/.test(t), 'A31 real measured figures stated');

  /* ---------- B. landing pages ---------- */
  console.log('\n=== B. landing pages: keyword + preview entry ===');
  for (const f of LANDINGS) {
    const s = doc[f].body, tag = '[' + f + ']';
    chk(/FALCORA B2B/.test((s.match(/<title>([\s\S]*?)<\/title>/) || ['', ''])[1]), tag + ' title carries FALCORA B2B');
    chk(/class="pad kb"/.test(s), tag + ' keyword block uses its own .kb class');
    chk(!/<div class="faq kb"|class="kb faq"/.test(s), tag + ' keyword block does not reuse .faq');
    const faqDiv = (s.match(/<div class="faq">([\s\S]*?)<\/div>/) || ['', ''])[1];
    chk((faqDiv.match(/<h3>/g) || []).length === 5, tag + ' FAQ still exactly 5 questions', (faqDiv.match(/<h3>/g) || []).length);
    chk(/href="try\.html"/.test(s), tag + ' links to public preview');
    chk(/cta-note/.test(s), tag + ' CTA clarifies what is free vs per-delivery');
    chk(ldBlocks(s).every((x) => x !== null), tag + ' all JSON-LD still parse');
  }
  const root = doc['index.html'].body;
  chk(!/href="app\.html"/.test(root), '[index.html] no public link into the internal prototype anymore');
  chk(/进入应用/.test(root), '[index.html] "进入应用" option kept (now -> try.html)');

  /* ---------- C. site-wide integrity ---------- */
  console.log('\n=== C. site-wide integrity ===');
  const sm = doc['sitemap.xml'].body;
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  chk(locs.length === 9, 'C1 sitemap has 9 loc', locs.length);
  chk(locs.indexOf(BASE + 'try.html') >= 0, 'C2 try.html is in sitemap');
  chk(locs.every((u) => /^https:\/\/ryanchen7051\.github\.io\/falcora\//.test(u)), 'C3 all loc absolute https under /falcora/');
  const mods = [...sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1].trim());
  chk(mods.length === 9 && mods.every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d + 'T00:00:00Z'))),
      'C4 9 valid ISO lastmod', mods.join(','));
  chk(!/Disallow: \/try\.html/.test(doc['robots.txt'].body), 'C5 robots does not block try.html');
  const app = doc['app.html'].body;
  chk(/name="robots" content="noindex,nofollow"/.test(app), 'C6 app.html STILL noindex (v78 defence intact)');
  chk(/内部样机 · 演示数据/.test(app), 'C7 app.html STILL labelled internal prototype');
  chk(/falcora-v78/.test(doc['sw.js'].body), 'C8 sw.js untouched (still falcora-v78)');
  chk(/window\.FAL_REAL/.test(doc['data-real-companies.js'].body), 'C9 real L1 directory file present');
  chk(locs.indexOf(BASE + 'free-preview-faq.html') >= 0, 'C10 FAQ page is in sitemap');
  chk(!/noindex/i.test(doc['free-preview-faq.html'].body) && /rel="canonical"/.test(doc['free-preview-faq.html'].body),
      'C11 FAQ page is indexable with a canonical');

  const pass = P.filter(Boolean).length;
  console.log('\n' + pass + ' / ' + P.length + (pass === P.length ? '  ALL GREEN' : '  *** FAILED ***'));
  if (pass !== P.length) process.exitCode = 1;
})().catch((e) => { console.error('SMOKE CRASH: ' + e.message); process.exitCode = 1; });
