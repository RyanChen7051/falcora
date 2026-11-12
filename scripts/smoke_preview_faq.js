#!/usr/bin/env node
/* Smoke for the 2026-11-12 public "what can I try" FAQ page.
   Usage: node scripts/smoke_preview_faq.js local | online
   Guards: indexability, canonical/hreflang, Article + FAQPage JSON-LD with answers
   byte-for-byte identical to visible copy, honest paywall wording, unified contacts,
   internal links, sitemap, and the v78 / try.html isolation defences.
   Assertion signature is chk(ok, name, extra). Never hard-code marketing copy.
*/
const fs = require('fs');
const path = require('path');
const https = require('https');
const R = path.resolve(__dirname, '..');
const MODE = (process.argv[2] || 'local').toLowerCase();
const BASE = 'https://ryanchen7051.github.io/falcora/';

const FAQ_PAGE = 'free-preview-faq.html';
const ALL = [
  FAQ_PAGE, 'try.html', 'index.html', 'falcora-landing.html', 'falcora-landing-en.html',
  'sample-intel-pack-festo.html', 'app.html', '名录库_预览.html',
  'sitemap.xml', 'robots.txt', 'sw.js', 'assets/content-pages.css'
];

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
function visible(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ').trim();
}
function ldBlocks(html) {
  const out = [];
  const re = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try { out.push(JSON.parse(m[1])); } catch (e) { out.push(null); }
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
  for (const f of ALL) chk(doc[f].code === 200 && doc[f].body.length > 150, 'fetch ' + f, doc[f].code + ' / ' + doc[f].body.length + 'B');

  const s = doc[FAQ_PAGE].body;
  const head = (s.match(/<head>[\s\S]*?<\/head>/) || [''])[0];
  const vis = visible(s);

  /* ---------- A. indexability + metadata ---------- */
  console.log('\n=== A. indexability / metadata ===');
  chk(/<html lang="zh-Hans">/.test(s), 'A1 html lang=zh-Hans');
  chk(!/noindex/i.test(s), 'A2 no noindex (publicly indexable)');
  chk(new RegExp('<link rel="canonical" href="' + BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + FAQ_PAGE + '"').test(head), 'A3 canonical self');
  chk(/hreflang="zh-Hans"[^>]+free-preview-faq\.html/.test(head), 'A4 zh-Hans hreflang self');
  chk(/hreflang="x-default"[^>]+free-preview-faq\.html/.test(head), 'A5 x-default hreflang self');
  chk(!/hreflang="en"/.test(head), 'A6 no en hreflang (no translated twin)');
  chk(/<title>[^<]*FALCORA B2B[^<]*<\/title>/.test(head), 'A7 title carries FALCORA B2B');
  chk(/name="description"[^>]+FALCORA B2B/.test(head), 'A8 description carries FALCORA B2B');
  chk(/rel="stylesheet" href="assets\/content-pages\.css\?v=1"/.test(head), 'A9 shared content stylesheet loaded');
  chk(!/<script[^>]+src=/.test(s), 'A10 zero external JavaScript');
  chk((s.match(/<script/g) || []).length === 2, 'A11 exactly 2 inline JSON-LD blocks', (s.match(/<script/g) || []).length);

  /* ---------- B. structured data ---------- */
  console.log('\n=== B. Article + FAQPage ===');
  const lds = ldBlocks(s);
  chk(lds.length === 2 && lds.every((x) => x !== null), 'B1 both JSON-LD blocks parse', lds.length);
  const art = lds.find((x) => x && x['@type'] === 'Article');
  chk(!!art && art.inLanguage === 'zh-Hans', 'B2 Article JSON-LD inLanguage=zh-Hans');
  chk(!!art && /^https:\/\/ryanchen7051\.github\.io\/falcora\/$/.test(art.isPartOf.url), 'B3 Article isPartOf FALCORA WebSite');
  const faq = lds.find((x) => x && x['@type'] === 'FAQPage');
  chk(!!faq && faq.mainEntity.length === 5, 'B4 FAQPage has 5 questions', faq ? faq.mainEntity.length : 'missing');
  if (faq) {
    const missingQ = faq.mainEntity.filter((q) => !vis.includes(q.name)).map((q) => q.name);
    chk(missingQ.length === 0, 'B5 every FAQ question visible in body', missingQ.length ? missingQ.join(' | ') : '5/5');
    const missingA = faq.mainEntity.filter((q) => !vis.includes(q.acceptedAnswer.text)).map((q) => q.name);
    chk(missingA.length === 0, 'B6 every FAQ answer matches visible body verbatim', missingA.length ? missingA.join(' | ') : '5/5');
  }
  const faqBlock = (s.match(/<div class="faq">([\s\S]*?)<\/div>/) || ['', ''])[1];
  chk((faqBlock.match(/<h3>/g) || []).length === 5, 'B7 visible FAQ has 5 h3 questions', (faqBlock.match(/<h3>/g) || []).length);
  chk((faqBlock.match(/<p>/g) || []).length === 5, 'B8 visible FAQ has 5 answers', (faqBlock.match(/<p>/g) || []).length);

  /* ---------- C. honest product boundaries ---------- */
  console.log('\n=== C. honest product boundaries ===');
  chk(!/专业版|企业版|Enterprise|旗舰版/.test(s), 'C1 no fictional plan tiers');
  chk(!/¥\s?\d|套餐价格|席位价格|¥999|¥2,999|\$\s?\d+/.test(s), 'C2 no fictional pricing');
  chk(!/海关提单反查|股权穿透/.test(vis.replace(/不提供/g, '')) || /不提供海关提单反查/.test(vis), 'C3 prohibited capabilities only appear as disclaimers');
  chk(/没有订阅套餐|没有自助订阅/.test(s), 'C4 no subscription plan stated');
  chk(/没有在线支付|没有.*在线支付/.test(s), 'C5 no online payment stated');
  chk(/账号系统|账户鉴权/.test(s), 'C6 no-account-system boundary stated');
  chk(/不是账户鉴权|不是账户权限判断/.test(s), 'C7 paywall is explicitly not authentication');
  chk(/按次交付/.test(s), 'C8 per-delivery model stated');
  chk(/付费用户使用/.test(s), 'C9 exact gating wording present');
  chk(/前 12 家/.test(s), 'C10 12-result display cap disclosed');
  chk(/398 家/.test(s), 'C11 real L1 directory size stated');
  chk(/三态|查到 \/ 查到但无值 \/ 查不到/.test(s), 'C12 three-state output stated');
  chk(/供货方 ≠ 采购方/.test(s), 'C13 supplier vs buyer boundary stated');
  chk(/绝不.*「无风险」|不判「无风险」/.test(s), 'C14 never outputs a no-risk conclusion');
  chk(/平台绝不填示例值|绝不填示例值/.test(s), 'C15 no sample values stated');
  for (const cap of ['导出情报包', 'L2 企业职能联系方式', '名录交叉验证', '完整名录库与批量导出', '客户管线', '战略 / 转化 / 报价 / 账号']) {
    chk(s.indexOf(cap) >= 0, 'C16 gated capability described: ' + cap);
  }

  /* ---------- D. unified contact block ---------- */
  console.log('\n=== D. unified contacts ===');
  chk(s.indexOf('https://wa.me/886982310045') >= 0, 'D1 WhatsApp deeplink');
  chk(/\+886 982310045/.test(s) && /Ryan Chen/.test(s), 'D2 WhatsApp number + name');
  chk(/mailto:3531885069@qq\.com/.test(s) && /mailto:pccnsysu@gmail\.com/.test(s), 'D3 both mailto links');
  chk(s.indexOf('3531885069@qq.com') >= 0 && s.indexOf('pccnsysu@gmail.com') >= 0, 'D4 both emails visible as text');
  chk(/pccnsysu/.test(s) && /Ryanpcc/.test(s), 'D5 LINE / WeChat IDs');
  chk(/class="contactline"/.test(s), 'D6 contactline block present');

  /* ---------- E. internal links + site integrity ---------- */
  console.log('\n=== E. links and site integrity ===');
  chk(/href="try\.html"/.test(s), 'E1 FAQ page links to the public preview');
  chk(/href="sample-intel-pack-festo\.html"/.test(s), 'E2 FAQ page links to the sample pack');
  chk(/href="\.\/"/.test(s), 'E3 FAQ page links back to the landing page');
  for (const f of ['index.html', 'falcora-landing.html']) {
    chk(/href="free-preview-faq\.html"/.test(doc[f].body), 'E4 ' + f + ' links to FAQ page');
    const kb = (doc[f].body.match(/<section class="pad kb"[\s\S]*?<\/section>/) || [''])[0];
    chk(/href="free-preview-faq\.html"/.test(kb), 'E5 ' + f + ' link sits in .kb (FAQ count untouched)');
  }
  chk((doc['try.html'].body.match(/href="free-preview-faq\.html"/g) || []).length === 2,
      'E6 try.html links to FAQ page in nav + footer',
      (doc['try.html'].body.match(/href="free-preview-faq\.html"/g) || []).length);
  chk(!/href="free-preview-faq\.html"/.test(doc['falcora-landing-en.html'].body),
      'E7 English landing does not link to a Chinese-only page');
  const sm = doc['sitemap.xml'].body;
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const mods = [...sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1].trim());
  chk(locs.length === 9, 'E8 sitemap has 9 loc', locs.length);
  chk(locs.indexOf(BASE + FAQ_PAGE) >= 0, 'E9 FAQ page in sitemap');
  chk(mods.length === 9 && mods.every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d + 'T00:00:00Z'))),
      'E10 9 valid ISO lastmod', mods.join(','));
  chk(locs.every((u) => {
    const rel = u.replace(BASE, '').split('?')[0];
    const f = rel === '' ? 'index.html' : decodeURIComponent(rel);
    return fs.existsSync(path.join(R, f));
  }), 'E11 every sitemap loc maps to a local file');
  chk(!/Disallow:\s*\/free-preview-faq/.test(doc['robots.txt'].body), 'E12 robots does not block the FAQ page');
  chk(/noindex,nofollow/.test(doc['app.html'].body) && /内部样机 · 演示数据/.test(doc['app.html'].body),
      'E13 app.html still an unindexed internal prototype');
  chk(/noindex,nofollow/.test(doc['名录库_预览.html'].body), 'E14 internal directory preview still noindex');
  chk(/falcora-v78/.test(doc['sw.js'].body), 'E15 sw.js untouched (still falcora-v78)');
  chk((doc['try.html'].body.match(/<script[^>]+src=/g) || []).length === 1 &&
      /src="data-real-companies\.js"/.test(doc['try.html'].body),
      'E16 try.html still loads only the real L1 directory');
  chk(/contactline/.test(doc['assets/content-pages.css'].body), 'E17 shared stylesheet still has contactline styles');

  const pass = P.filter(Boolean).length;
  console.log('\n' + pass + ' / ' + P.length + (pass === P.length ? '  ALL GREEN' : '  FAILED'));
  process.exit(pass === P.length ? 0 : 1);
})().catch((e) => { console.error('SMOKE ERROR', e); process.exit(1); });
