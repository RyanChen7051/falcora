#!/usr/bin/env node
/* 2026-11-12 round: publish the public "what can I try" FAQ page.
   All replacements are pre-validated: every (file, oldS) must match exactly
   `expected` times (default 1). Nothing is written to disk unless ALL pass.
*/
const fs = require('fs');
const path = require('path');
const R = path.resolve(__dirname, '..');

const plan = [];
function q(file, oldS, newS, label, expected) {
  plan.push({ file, oldS, newS, label, expected: expected === undefined ? 1 : expected });
}

const KB_OLD = '    <p>FALCORA B2B 不是又一个「帮你找客户」的名单工具，而是交易前的核验与证据留存：用公开来源确认对方真实存在、仍在经营，把「这家公司值不值得谈」变成一份每条都能点开复核的情报包。检索与核验方法可在<a href="try.html">公开体验版</a>免费试用；导出情报包、L2 企业职能联系方式与名录交叉验证明细按次交付，没有订阅套餐。</p>';
const KB_NEW = '    <p>FALCORA B2B 不是又一个「帮你找客户」的名单工具，而是交易前的核验与证据留存：用公开来源确认对方真实存在、仍在经营，把「这家公司值不值得谈」变成一份每条都能点开复核的情报包。检索与核验方法可在<a href="try.html">公开体验版</a>免费试用；导出情报包、L2 企业职能联系方式与名录交叉验证明细按次交付，没有订阅套餐。完整的<a href="free-preview-faq.html">体验范围与付费说明</a>见这一页。</p>';

/* --- sitemap: bump all lastmod, then append the new url block --- */
q('sitemap.xml', '<lastmod>2026-11-11</lastmod>', '<lastmod>2026-11-12</lastmod>',
  'sitemap bump all lastmod to 2026-11-12', 8);
q('sitemap.xml', '  </url>\n\n</urlset>',
  '  </url>\n\n  <url>\n    <loc>https://ryanchen7051.github.io/falcora/free-preview-faq.html</loc>\n    <lastmod>2026-11-12</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n\n</urlset>',
  'sitemap append free-preview-faq.html');

/* --- Chinese landing pages: link the new explainer from the .kb block --- */
q('index.html', KB_OLD, KB_NEW, 'index.html .kb link');
q('falcora-landing.html', KB_OLD, KB_NEW, 'falcora-landing.html .kb link');

/* --- try.html: nav + footer links (independent classes, FAQ count untouched) --- */
q('try.html',
  '        <a href="sample-intel-pack-festo.html">样品情报包</a>\n      </nav>',
  '        <a href="sample-intel-pack-festo.html">样品情报包</a>\n        <a href="free-preview-faq.html">体验范围说明</a>\n      </nav>',
  'try.html top nav link');
q('try.html',
  '  <a href="./">返回中文介绍</a> · <a href="falcora-landing-en.html" hreflang="en" lang="en">English</a> · <a href="sample-intel-pack-festo.html">样品情报包</a>',
  '  <a href="./">返回中文介绍</a> · <a href="falcora-landing-en.html" hreflang="en" lang="en">English</a> · <a href="sample-intel-pack-festo.html">样品情报包</a> · <a href="free-preview-faq.html">体验范围说明</a>',
  'try.html footer link');

/* --- smoke_contact_lang.js --- */
q('scripts/smoke_contact_lang.js',
  "const ALL = PAGES.concat(LONGTAIL, OTHERS, ['try.html', 'sitemap.xml', 'assets/content-pages.css']);",
  "const ALL = PAGES.concat(LONGTAIL, OTHERS, ['try.html', 'free-preview-faq.html', 'sitemap.xml', 'assets/content-pages.css']);",
  'contact_lang ALL includes new page');
q('scripts/smoke_contact_lang.js',
  "chk(locs.length === 8, '[sitemap] 8 loc', locs.length);",
  "chk(locs.length === 9, '[sitemap] 9 loc', locs.length);",
  'contact_lang sitemap loc count');
q('scripts/smoke_contact_lang.js',
  "chk(mods.length === 8, '[sitemap] 8 lastmod', mods.length);",
  "chk(mods.length === 9, '[sitemap] 9 lastmod', mods.length);",
  'contact_lang sitemap lastmod count');
q('scripts/smoke_contact_lang.js',
  "chk(blocks.length === 8 && blocks.every((b) => /<loc>/.test(b) && /<lastmod>/.test(b)),",
  "chk(blocks.length === 9 && blocks.every((b) => /<loc>/.test(b) && /<lastmod>/.test(b)),",
  'contact_lang sitemap url block count');

/* --- smoke_longtail_pages.js --- */
q('scripts/smoke_longtail_pages.js',
  "chk(locs.length === 8, 'sitemap has 8 loc entries', locs.length);",
  "chk(locs.length === 9, 'sitemap has 9 loc entries', locs.length);",
  'longtail sitemap loc count');
q('scripts/smoke_longtail_pages.js',
  "chk(lastmods.length === 8 && lastmods.every((d) => /^\\d{4}-\\d{2}-\\d{2}$/.test(d) && !Number.isNaN(Date.parse(d + 'T00:00:00Z'))),\n    'all 8 lastmod are valid ISO dates', lastmods.join(','));",
  "chk(lastmods.length === 9 && lastmods.every((d) => /^\\d{4}-\\d{2}-\\d{2}$/.test(d) && !Number.isNaN(Date.parse(d + 'T00:00:00Z'))),\n    'all 9 lastmod are valid ISO dates', lastmods.join(','));",
  'longtail sitemap lastmod count');
q('scripts/smoke_longtail_pages.js',
  "chk((sm.match(/<url>/g) || []).length === 8 && (sm.match(/<\\/url>/g) || []).length === 8,\n    'url open/close tags 8/8');",
  "chk((sm.match(/<url>/g) || []).length === 9 && (sm.match(/<\\/url>/g) || []).length === 9,\n    'url open/close tags 9/9');",
  'longtail sitemap url tag count');

/* --- smoke_trypage.js --- */
q('scripts/smoke_trypage.js',
  "const ALL = ['try.html'].concat(LANDINGS, ['sitemap.xml', 'app.html', 'robots.txt', 'sw.js', 'data-real-companies.js']);",
  "const ALL = ['try.html', 'free-preview-faq.html'].concat(LANDINGS, ['sitemap.xml', 'app.html', 'robots.txt', 'sw.js', 'data-real-companies.js']);",
  'trypage ALL includes new page');
q('scripts/smoke_trypage.js',
  "chk(locs.length === 8, 'C1 sitemap has 8 loc', locs.length);",
  "chk(locs.length === 9, 'C1 sitemap has 9 loc', locs.length);",
  'trypage sitemap loc count');
q('scripts/smoke_trypage.js',
  "chk(mods.length === 8 && mods.every((d) => /^\\d{4}-\\d{2}-\\d{2}$/.test(d) && !Number.isNaN(Date.parse(d + 'T00:00:00Z'))),\n      'C4 8 valid ISO lastmod', mods.join(','));",
  "chk(mods.length === 9 && mods.every((d) => /^\\d{4}-\\d{2}-\\d{2}$/.test(d) && !Number.isNaN(Date.parse(d + 'T00:00:00Z'))),\n      'C4 9 valid ISO lastmod', mods.join(','));",
  'trypage sitemap lastmod count');
q('scripts/smoke_trypage.js',
  "  chk(/window\\.FAL_REAL/.test(doc['data-real-companies.js'].body), 'C9 real L1 directory file present');",
  "  chk(/window\\.FAL_REAL/.test(doc['data-real-companies.js'].body), 'C9 real L1 directory file present');\n  chk(locs.indexOf(BASE + 'free-preview-faq.html') >= 0, 'C10 FAQ page is in sitemap');\n  chk(!/noindex/i.test(doc['free-preview-faq.html'].body) && /rel=\"canonical\"/.test(doc['free-preview-faq.html'].body),\n      'C11 FAQ page is indexable with a canonical');",
  'trypage new C10/C11 assertions');

/* --- smoke_internal_boundary.js --- */
q('scripts/smoke_internal_boundary.js',
  "  'try.html'\n]);",
  "  'try.html',\n  'free-preview-faq.html'\n]);",
  'internal_boundary PUBLIC includes new page');
q('scripts/smoke_internal_boundary.js',
  "  chk(locs === 8, 'C4 sitemap still has 8 loc', locs);",
  "  chk(locs === 9, 'C4 sitemap still has 9 loc', locs);",
  'internal_boundary sitemap loc count');
q('scripts/smoke_internal_boundary.js',
  "  chk(!/noindex/i.test(doc['try.html'].body), 'C8 try.html STILL indexable');",
  "  chk(!/noindex/i.test(doc['try.html'].body), 'C8 try.html STILL indexable');\n  chk(/falcora\\/free-preview-faq\\.html/.test(sm), 'C9 FAQ page is in sitemap');\n  chk(!/noindex/i.test(doc['free-preview-faq.html'].body), 'C10 FAQ page is indexable');\n  chk(!/free-preview-faq\\.html/.test(doc['app.html'].body), 'C11 internal prototype does not link to the FAQ page');",
  'internal_boundary new C9/C10/C11 assertions');

/* ---------- pre-validate everything before touching disk ---------- */
const cache = {};
for (const it of plan) {
  if (!(it.file in cache)) cache[it.file] = fs.readFileSync(path.join(R, it.file), 'utf8');
  const n = cache[it.file].split(it.oldS).length - 1;
  if (n !== it.expected) {
    throw new Error('[' + it.file + '] ' + it.label + ' matched ' + n + ' times (expected ' + it.expected + '). NOTHING WRITTEN.');
  }
  cache[it.file] = cache[it.file].split(it.oldS).join(it.newS);
}

for (const f of Object.keys(cache)) {
  fs.writeFileSync(path.join(R, f), cache[f], 'utf8');
}
console.log('APPLIED ' + plan.length + ' replacements across ' + Object.keys(cache).length + ' files');
