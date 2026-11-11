/* Smoke test for the 2026-11-11 visible language switcher + contact block.
   Usage: node scripts/smoke_contact_lang.js local | online
   Asserts structure/semantics, never hard-codes marketing copy.
*/
const fs = require('fs');
const path = require('path');
const https = require('https');
const R = path.resolve(__dirname, '..');
const MODE = (process.argv[2] || 'local').toLowerCase();
const BASE = 'https://ryanchen7051.github.io/falcora/';

const PAGES = ['index.html', 'falcora-landing.html', 'falcora-landing-en.html'];
const LONGTAIL = [
  'how-to-verify-overseas-buyer.html',
  'pre-deal-due-diligence-checklist.html',
  'verify-company-with-public-sources.html'
];
const OTHERS = ['sample-intel-pack-festo.html', 'sample-intel-pack-festo-en.html'];
const ALL = PAGES.concat(LONGTAIL, OTHERS, ['sitemap.xml', 'assets/content-pages.css']);

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
  } else {
    throw new Error('mode must be local or online');
  }

  console.log('MODE = ' + MODE + '\n');
  for (const f of ALL) chk(doc[f].code === 200 && doc[f].body.length > 500, f + ' fetched', doc[f].code + ' / ' + doc[f].body.length + 'B');

  for (const f of PAGES) {
    const s = doc[f].body;
    const tag = '[' + f + ']';
    const isEN = f === 'falcora-landing-en.html';

    chk(/<div class="topbar">/.test(s), tag + ' topbar present');
    chk(/<nav class="lang"/.test(s), tag + ' language switcher is a visible nav');
    chk(/<span class="lang-cur" aria-current="true">/.test(s), tag + ' current language marked');
    chk(s.indexOf('中文') >= 0 && s.indexOf('English') >= 0, tag + ' both language labels visible');

    if (isEN) {
      chk(/<span class="lang-cur" aria-current="true">English<\/span>/.test(s), tag + ' English is current');
      chk(/<a href="\.\/" hreflang="zh-Hans" lang="zh-Hans">中文<\/a>/.test(s), tag + ' link back to zh root');
      chk(s.indexOf('中文版') >= 0, tag + ' footer zh link kept');
    } else {
      chk(/<span class="lang-cur" aria-current="true">中文<\/span>/.test(s), tag + ' Chinese is current');
      chk(/<a href="falcora-landing-en\.html" hreflang="en" lang="en">English<\/a>/.test(s), tag + ' link to English page');
      chk(s.indexOf('English version') >= 0, tag + ' footer EN link kept');
    }

    chk(s.indexOf('https://wa.me/886982310045') >= 0, tag + ' WhatsApp deeplink');
    chk(/\+886 982310045/.test(s) && /Ryan Chen/.test(s), tag + ' WhatsApp number + name visible');
    chk(/mailto:3531885069@qq\.com/.test(s) && /mailto:pccnsysu@gmail\.com/.test(s), tag + ' both emails as mailto links');
    chk(s.indexOf('3531885069@qq.com') >= 0 && s.indexOf('pccnsysu@gmail.com') >= 0, tag + ' both emails visible as text');
    chk(s.indexOf('pccnsysu') >= 0 && s.indexOf('Ryanpcc') >= 0, tag + ' original LINE / WeChat kept');
    chk((s.match(/class="cbox"/g) || []).length === 4, tag + ' 4 contact cards', (s.match(/class="cbox"/g) || []).length);
    chk(!/noindex/i.test(s), tag + ' no noindex');
    chk(/rel="canonical"/.test(s), tag + ' canonical kept');

    const lds = ldBlocks(s);
    chk(lds.length >= 2 && lds.every((x) => x !== null), tag + ' all JSON-LD parse', lds.length + ' blocks');
    const faq = lds.find((x) => x && x['@type'] === 'FAQPage');
    chk(!!faq && faq.mainEntity && faq.mainEntity.length === 5, tag + ' FAQPage still 5 questions', faq ? faq.mainEntity.length : 'none');
    if (faq) {
      const missing = faq.mainEntity.filter((q) => s.indexOf(q.name) < 0).map((q) => q.name);
      chk(missing.length === 0, tag + ' every FAQ question still visible in body', missing.length ? missing.join(' | ') : '5/5');
    }
    chk(/<div class="faq">/.test(s), tag + ' faq container intact');
  }

  const en = doc['falcora-landing-en.html'].body;
  chk(/id="guides"/.test(en), '[EN landing] guides section intact');
  chk((en.match(/href="(how-to-verify-overseas-buyer|pre-deal-due-diligence-checklist|verify-company-with-public-sources)\.html"/g) || []).length === 3,
      '[EN landing] 3 long-tail internal links intact');

  for (const f of LONGTAIL.concat(OTHERS)) {
    const s = doc[f].body;
    const tag = '[' + f + ']';
    chk(!/noindex/i.test(s), tag + ' still indexable');
    chk(s.length > 5000, tag + ' full content', s.length + 'B');
    chk(s.indexOf('https://wa.me/886982310045') >= 0, tag + ' WhatsApp deeplink');
    chk(/\+886 982310045/.test(s) && /Ryan Chen/.test(s), tag + ' WhatsApp number + name');
    chk(/mailto:3531885069@qq\.com/.test(s) && /mailto:pccnsysu@gmail\.com/.test(s), tag + ' both mailto emails');
    chk(s.indexOf('3531885069@qq.com') >= 0 && s.indexOf('pccnsysu@gmail.com') >= 0, tag + ' both emails visible as text');
    chk(s.indexOf('pccnsysu') >= 0 && s.indexOf('Ryanpcc') >= 0, tag + ' original LINE / WeChat kept');
    if (f.indexOf('sample-intel-pack') === 0) {
      chk(/class="owner-contact"/.test(s) && /own contact channels|我方联系方式/.test(s),
          tag + ' own channels explicitly separated from report contacts');
    }
  }

  // Semantic assertions only: NEVER hard-code a date or a page count-per-date.
  // A later round may bump one page, all pages, or a different date -> must not false-fail.
  const sm = doc['sitemap.xml'].body;
  const blocks = [...sm.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const mods = [...sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1].trim());
  chk(locs.length === 7, '[sitemap] 7 loc', locs.length);
  chk(mods.length === 7, '[sitemap] 7 lastmod', mods.length);
  chk(blocks.length === 7 && blocks.every((b) => /<loc>/.test(b) && /<lastmod>/.test(b)),
      '[sitemap] every url block has loc + lastmod', blocks.length);
  chk(locs.every((u) => /^https:\/\/ryanchen7051\.github\.io\/falcora\//.test(u)),
      '[sitemap] all loc are absolute https under /falcora/');
  chk(mods.every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d + 'T00:00:00Z')) && d >= '2026-11-10'),
      '[sitemap] no stale lastmod (valid ISO, on/after content launch)', mods.join(','));

  const css = doc['assets/content-pages.css'].body;
  chk(/\.contactline a\{[^}]*color:/.test(css), '[shared CSS] contactline links have readable color on dark CTA band');
  chk(/\.contactline\{[^}]*line-height/.test(css), '[shared CSS] contactline has multi-line spacing');

  const pass = P.filter(Boolean).length;
  console.log('\n' + pass + ' / ' + P.length + (pass === P.length ? '  ALL GREEN' : '  *** FAILED ***'));
  if (pass !== P.length) process.exitCode = 1;
})().catch((e) => { console.error('SMOKE CRASH: ' + e.message); process.exitCode = 1; });
