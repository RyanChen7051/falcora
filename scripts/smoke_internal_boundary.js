#!/usr/bin/env node
/* Smoke for the 2026-11-11 round-5 internal-boundary fix.
   Usage: node scripts/smoke_internal_boundary.js local | online
   Guards:
     A - the 3 landing pages keep "Ryan Chen" on one line without breaking contacts
     B - 名录库_预览.html carries noindex,nofollow and a visible internal-only notice
     C - that page is not in sitemap, not robots-disallowed (so Googlebot can READ the
         noindex tag), and not linked from any public page; v78 / try.html defences intact
   Assertion signature is chk(ok, name, extra). Never hard-code marketing copy.
*/
const fs = require('fs');
const path = require('path');
const https = require('https');
const R = path.resolve(__dirname, '..');
const MODE = (process.argv[2] || 'local').toLowerCase();
const BASE = 'https://ryanchen7051.github.io/falcora/';

const LANDINGS = ['index.html', 'falcora-landing.html', 'falcora-landing-en.html'];
const PUBLIC = LANDINGS.concat([
  'how-to-verify-overseas-buyer.html',
  'pre-deal-due-diligence-checklist.html',
  'verify-company-with-public-sources.html',
  'sample-intel-pack-festo.html',
  'sample-intel-pack-festo-en.html',
  'try.html',
  'free-preview-faq.html'
]);
const INTERNAL = '名录库_预览.html';
const ALL = [INTERNAL].concat(PUBLIC, ['app.html', 'sitemap.xml', 'robots.txt']);

const P = [];
function chk(ok, name, extra) {
  P.push(!!ok);
  console.log((ok ? '\u2705 ' : '\u274c ') + name + (extra !== undefined ? '  \u2192 ' + extra : ''));
}
function fetchOnline(f) {
  return new Promise((resolve, reject) => {
    const req = https.get(encodeURI(BASE + f), { headers: { 'User-Agent': 'FALCORA-smoke/1.0' } }, (res) => {
      let b = ''; res.setEncoding('utf8');
      res.on('data', (c) => { b += c; });
      res.on('end', () => resolve({ code: res.statusCode, body: b }));
    });
    req.setTimeout(20000, () => req.destroy(new Error('timeout ' + f)));
    req.on('error', reject);
  });
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
  for (const f of ALL) chk(doc[f].code === 200 && doc[f].body.length > 150, 'fetch ' + f, doc[f].code + ' / ' + doc[f].body.length + 'B');

  /* ---------- A. owner name no longer wraps ---------- */
  console.log('\n=== A. WhatsApp card typography ===');
  const NOWRAP = '<span style="white-space:nowrap">Ryan Chen</span>';
  for (const f of LANDINGS) {
    const s = doc[f].body;
    chk((s.split(NOWRAP).length - 1) === 1, 'A [' + f + '] exactly one nowrap owner name');
    chk(!/ \u00b7 Ryan Chen<\/p>/.test(s), 'A [' + f + '] old splitting wording removed');
    chk(/wa\.me\/886982310045/.test(s) && /\+886 982310045/.test(s), 'A [' + f + '] WhatsApp number intact');
    chk(/3531885069@qq\.com/.test(s) && /pccnsysu@gmail\.com/.test(s), 'A [' + f + '] both emails intact');
    chk(/pccnsysu/.test(s) && /Ryanpcc/.test(s), 'A [' + f + '] LINE / WeChat intact');
  }

  /* ---------- B. internal preview boundary ---------- */
  console.log('\n=== B. 名录库_预览.html internal boundary ===');
  const ib = doc[INTERNAL].body;
  chk(/<meta name="robots" content="noindex,nofollow" \/>/.test(ib), 'B1 noindex,nofollow meta present');
  chk((ib.split(/noindex,nofollow/).length - 1) === 1, 'B2 noindex declared exactly once');
  chk(/内部预览 \u00b7 非对外页面/.test(ib), 'B3 visible "internal preview / not a public page" notice');
  chk(/供货方/.test(ib) && /采购方名录永不合并/.test(ib), 'B4 notice states supplier != buyer');
  chk(/不是对外产品页/.test(ib) && /可售套餐|平台能力/.test(ib), 'B5 notice denies sellable plans / platform claims');
  chk(!/\u00a5\s?\d|套餐价格|席位价格/.test(ib), 'B6 no fictional pricing on this page');
  chk(/href="app\.html"/.test(ib), 'B7 v78 internal pointer to app.html intact');
  chk(/<title>FALCORA \u00b7 全球名录库（预览）<\/title>/.test(ib), 'B8 title stays an internal preview, not a product page');

  /* ---------- C. isolation + v78 defences ---------- */
  console.log('\n=== C. isolation ===');
  const sm = doc['sitemap.xml'].body;
  const rb = doc['robots.txt'].body;
  chk(!/名录库_预览/.test(sm), 'C1 internal preview is NOT in sitemap');
  chk(!/Disallow:\s*\/名录库_预览/.test(rb), 'C2 robots does NOT disallow it (Googlebot must read noindex)');
  const linked = PUBLIC.filter((f) => /名录库_预览\.html/.test(doc[f].body));
  chk(linked.length === 0, 'C3 no public page links to the internal preview', linked.join(',') || 'none');
  const locs = (sm.match(/<loc>/g) || []).length;
  chk(locs === 9, 'C4 sitemap still has 9 loc', locs);
  chk(/falcora\/try\.html/.test(sm), 'C5 try.html still in sitemap');
  chk(/noindex,nofollow/.test(doc['app.html'].body), 'C6 app.html STILL noindex');
  chk(/内部样机 \u00b7 演示数据/.test(doc['app.html'].body), 'C7 app.html STILL labelled internal prototype');
  chk(!/noindex/i.test(doc['try.html'].body), 'C8 try.html STILL indexable');
  chk(/falcora\/free-preview-faq\.html/.test(sm), 'C9 FAQ page is in sitemap');
  chk(!/noindex/i.test(doc['free-preview-faq.html'].body), 'C10 FAQ page is indexable');
  chk(!/free-preview-faq\.html/.test(doc['app.html'].body), 'C11 internal prototype does not link to the FAQ page');

  const pass = P.filter(Boolean).length;
  console.log('\n' + pass + ' / ' + P.length + (pass === P.length ? '  ALL GREEN' : '  FAILED'));
  process.exit(pass === P.length ? 0 : 1);
})().catch((e) => { console.error('SMOKE ERROR', e); process.exit(1); });
