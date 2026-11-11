/* 2026-11-11 · FALCORA B2B keyword + public preview entry.
   Full preflight before ANY disk write: every (file, oldS) must match exactly once.
   Usage: node scripts/apply_falcora_b2b_try.js
*/
const fs = require('fs');
const path = require('path');
const R = path.resolve(__dirname, '..');

const plan = [];
function q(file, oldS, newS, label) { plan.push({ file, oldS, newS, label }); }

const CSS_OLD = `  .cbox p a{word-break:break-all}
</style>`;
const CSS_NEW = `  .cbox p a{word-break:break-all}
  .cta-note{margin-top:12px;font-size:13px;opacity:.82}
  .kb{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 22px}
  .kb p{font-size:13.5px;color:var(--mut);margin:0;line-height:1.9}
  .kb a{text-decoration:underline;text-underline-offset:2px}
</style>`;

const ZH_TITLE_OLD = `<title>海外客户怎么核实 · 交易前尽调清单 | FALCORA 获客通AI</title>`;
const ZH_TITLE_NEW = `<title>海外客户怎么核实 · 交易前尽调清单 | FALCORA B2B 客户尽调</title>`;
const ZH_ORG_OLD = `  "description": "全球 B2B 客户情报与交易前尽调。每条结论都可追溯到带检索日期的公开来源。",`;
const ZH_ORG_NEW = `  "description": "FALCORA B2B：全球客户情报与交易前尽调。每条结论都可追溯到带检索日期的公开来源。",`;
const ZH_LEAD_OLD = `    <p class="lead">海外客户怎么核实？在付订金、签合同前确认对方真实存在、仍在经营，并留下可复核的证据链。
      用展会参展商名录、协会会员名录与政府招标公告交叉验证，覆盖 100+ 国家与地区，每条结论都点得开来源链接。</p>`;
const ZH_LEAD_NEW = `    <p class="lead">海外客户怎么核实？在付订金、签合同前确认对方真实存在、仍在经营，并留下可复核的证据链。
      用展会参展商名录、协会会员名录与政府招标公告交叉验证，覆盖 100+ 国家与地区，每条结论都点得开来源链接。
      FALCORA B2B 守的是「谈之前查清 + 留证据」这一层，不是帮你堆更多名单。</p>`;
const ZH_FOOT_OLD = `  全球 B2B 客户情报与交易前尽调 · 每条结论均可点开来源复核。<br>`;
const ZH_FOOT_NEW = `  FALCORA B2B · 全球客户情报与交易前尽调 · 每条结论均可点开来源复核。<br>`;
const ZH_NOTE = `    <div class="cta-note">公开体验版可免费试检索真实采购方名录；导出情报包等能力仅随正式情报包按次交付。</div>`;

const ZH_KB_NEW = `  <section class="pad kb" id="about-falcora-b2b" style="padding-top:10px">
    <h2 class="sec">什么是 FALCORA B2B</h2>
    <p>FALCORA B2B 不是又一个「帮你找客户」的名单工具，而是交易前的核验与证据留存：用公开来源确认对方真实存在、仍在经营，把「这家公司值不值得谈」变成一份每条都能点开复核的情报包。检索与核验方法可在<a href="try.html">公开体验版</a>免费试用；导出情报包、L2 企业职能联系方式与名录交叉验证明细按次交付，没有订阅套餐。</p>
  </section>

  <section class="pad" id="faq" style="padding-top:10px">`;
const FAQ_ANCHOR = `  <section class="pad" id="faq" style="padding-top:10px">`;

/* ---------- index.html (root, zh-Hans) ---------- */
q('index.html', ZH_TITLE_OLD, ZH_TITLE_NEW, 'root title carries FALCORA B2B');
q('index.html', ZH_ORG_OLD, ZH_ORG_NEW, 'root Organization description');
q('index.html', CSS_OLD, CSS_NEW, 'root CSS for cta-note + kb');
q('index.html', ZH_LEAD_OLD, ZH_LEAD_NEW, 'root lead visible keyword');
q('index.html', `    <div class="cta">
      <a class="btn btn-pri" href="app.html">进入应用 →</a>
      <a class="btn btn-pri" href="sample-intel-pack-festo.html">查看样品情报包 →</a>
      <a class="btn btn-ghost" href="#contact">询价 / 合作</a>
    </div>`, `    <div class="cta">
      <a class="btn btn-pri" href="try.html">进入应用（公开体验版）→</a>
      <a class="btn btn-pri" href="sample-intel-pack-festo.html">查看样品情报包 →</a>
      <a class="btn btn-ghost" href="#contact">询价 / 合作</a>
    </div>
` + ZH_NOTE, 'root CTA points to public preview');
q('index.html', FAQ_ANCHOR, ZH_KB_NEW, 'root kb section (own class, FAQ untouched)');
q('index.html', ZH_FOOT_OLD, ZH_FOOT_NEW, 'root footer keyword');

/* ---------- falcora-landing.html (zh copy, canonical -> root) ---------- */
q('falcora-landing.html', ZH_TITLE_OLD, ZH_TITLE_NEW, 'zh copy title');
q('falcora-landing.html', ZH_ORG_OLD, ZH_ORG_NEW, 'zh copy Organization description');
q('falcora-landing.html', CSS_OLD, CSS_NEW, 'zh copy CSS');
q('falcora-landing.html', ZH_LEAD_OLD, ZH_LEAD_NEW, 'zh copy lead');
q('falcora-landing.html', `    <div class="cta">
      <a class="btn btn-pri" href="sample-intel-pack-festo.html">查看样品情报包 →</a>
      <a class="btn btn-ghost" href="#contact">询价 / 合作</a>
    </div>`, `    <div class="cta">
      <a class="btn btn-pri" href="try.html">进入应用（公开体验版）→</a>
      <a class="btn btn-pri" href="sample-intel-pack-festo.html">查看样品情报包 →</a>
      <a class="btn btn-ghost" href="#contact">询价 / 合作</a>
    </div>
` + ZH_NOTE, 'zh copy gains public preview CTA');
q('falcora-landing.html', FAQ_ANCHOR, ZH_KB_NEW, 'zh copy kb section');
q('falcora-landing.html', ZH_FOOT_OLD, ZH_FOOT_NEW, 'zh copy footer keyword');

/* ---------- falcora-landing-en.html ---------- */
q('falcora-landing-en.html',
  `<title>How to Verify an Overseas Buyer Before You Pay | FALCORA Due Diligence</title>`,
  `<title>How to Verify an Overseas Buyer Before You Pay | FALCORA B2B Due Diligence</title>`,
  'EN title carries FALCORA B2B');
q('falcora-landing-en.html',
  `  "description": "Global B2B customer intelligence and pre-deal due diligence. Every conclusion is traceable to a public source with a retrieval date.",`,
  `  "description": "FALCORA B2B: global customer intelligence and pre-deal due diligence. Every conclusion is traceable to a public source with a retrieval date.",`,
  'EN Organization description');
q('falcora-landing-en.html', CSS_OLD, CSS_NEW, 'EN CSS');
q('falcora-landing-en.html',
  `    <p class="lead">How do you verify an overseas buyer before the deposit leaves your account? FALCORA helps sales and BD teams confirm, before signing or wiring a deposit,
      that the counterparty is a real, still-operating company — with a clickable public source and a retrieval date on every conclusion.</p>`,
  `    <p class="lead">How do you verify an overseas buyer before the deposit leaves your account? FALCORA helps sales and BD teams confirm, before signing or wiring a deposit,
      that the counterparty is a real, still-operating company — with a clickable public source and a retrieval date on every conclusion.
      FALCORA B2B is built for that pre-deal check, not for piling up more lead lists.</p>`,
  'EN lead visible keyword');
q('falcora-landing-en.html',
  `    <div class="cta">
      <a class="btn btn-pri" href="sample-intel-pack-festo-en.html">See a sample intel pack →</a>
      <a class="btn btn-ghost" href="#contact">Request a quote</a>
    </div>`,
  `    <div class="cta">
      <a class="btn btn-pri" href="try.html">Try the free preview →</a>
      <a class="btn btn-pri" href="sample-intel-pack-festo-en.html">See a sample intel pack →</a>
      <a class="btn btn-ghost" href="#contact">Request a quote</a>
    </div>
    <div class="cta-note">The free preview lets you search a real public buyer directory; intel-pack export and similar capabilities are delivered per order.</div>`,
  'EN CTA gains public preview');
q('falcora-landing-en.html', FAQ_ANCHOR,
  `  <section class="pad kb" id="about-falcora-b2b" style="padding-top:10px">
    <h2 class="sec">What FALCORA B2B is</h2>
    <p>FALCORA B2B is not another lead-generation list tool. It is the verification and evidence layer before a deal: public sources are used to confirm that a counterparty is real and still operating, turning 'is this company worth talking to' into an intel pack where every line can be opened and checked. Search and the verification method are free in the <a href="try.html">public preview</a>; intel-pack export, L2 corporate contacts and directory cross-check details are delivered per order, with no subscription plans.</p>
  </section>

  <section class="pad" id="faq" style="padding-top:10px">`,
  'EN kb section');
q('falcora-landing-en.html',
  `  Global B2B intelligence &amp; pre-deal due diligence · Every conclusion traceable to a public source.<br>`,
  `  FALCORA B2B · Global customer intelligence &amp; pre-deal due diligence · Every conclusion traceable to a public source.<br>`,
  'EN footer keyword');

/* ---------- sitemap.xml : 7 -> 8 loc ---------- */
q('sitemap.xml',
  `    <priority>0.7</priority>
  </url>

</urlset>`,
  `    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://ryanchen7051.github.io/falcora/try.html</loc>
    <lastmod>2026-11-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>`,
  'sitemap gains try.html');

/* ---------- smoke scripts: semantic, never hard-code the old CTA target ---------- */
for (const f of ['scripts/smoke_v78_online.js', 'scripts/smoke_v78_local.js']) {
  q(f, `   ① 根 / 渲染为对外落地页（主张 + 进入应用 → app.html），且不含驾驶舱能力/套餐面板`,
    `   ① 根 / 渲染为对外落地页（主张 + 进入应用 → try.html 公开体验版），且不含驾驶舱能力/套餐面板`,
    'header comment');
  q(f, `  ok(/href="app\\.html">进入应用/.test(rootHtml), "A3 根落地页含「进入应用 → app.html」");`,
    `  ok(/href="try\\.html">进入应用/.test(rootHtml), "A3 根落地页含「进入应用 → try.html 公开体验版」");`,
    'A3 semantic CTA assertion');
  q(f, `  ok((rootInfo.links || []).indexOf("app.html") >= 0, "B4 渲染后「进入应用」链接指向 app.html");`,
    `  ok((rootInfo.links || []).indexOf("try.html") >= 0, "B4 渲染后「进入应用」链接指向 try.html 公开体验版");`,
    'B4 semantic rendered-link assertion');
}

q('scripts/smoke_contact_lang.js',
  `const ALL = PAGES.concat(LONGTAIL, OTHERS, ['sitemap.xml', 'assets/content-pages.css']);`,
  `const ALL = PAGES.concat(LONGTAIL, OTHERS, ['try.html', 'sitemap.xml', 'assets/content-pages.css']);`,
  'fetch try.html in both modes');
q('scripts/smoke_contact_lang.js',
  `  chk(locs.length === 7, '[sitemap] 7 loc', locs.length);`,
  `  chk(locs.length === 8, '[sitemap] 8 loc', locs.length);`, '8 loc');
q('scripts/smoke_contact_lang.js',
  `  chk(mods.length === 7, '[sitemap] 7 lastmod', mods.length);`,
  `  chk(mods.length === 8, '[sitemap] 8 lastmod', mods.length);`, '8 lastmod');
q('scripts/smoke_contact_lang.js',
  `  chk(blocks.length === 7 && blocks.every((b) => /<loc>/.test(b) && /<lastmod>/.test(b)),`,
  `  chk(blocks.length === 8 && blocks.every((b) => /<loc>/.test(b) && /<lastmod>/.test(b)),`,
  '8 url blocks');

q('scripts/smoke_longtail_pages.js',
  `chk(locs.length === 7, 'sitemap has 7 loc entries', locs.length);`,
  `chk(locs.length === 8, 'sitemap has 8 loc entries', locs.length);`, '8 loc');
q('scripts/smoke_longtail_pages.js',
  `chk(lastmods.length === 7 && lastmods.every((d) => /^\\d{4}-\\d{2}-\\d{2}$/.test(d) && !Number.isNaN(Date.parse(d + 'T00:00:00Z'))),
    'all 7 lastmod are valid ISO dates', lastmods.join(','));`,
  `chk(lastmods.length === 8 && lastmods.every((d) => /^\\d{4}-\\d{2}-\\d{2}$/.test(d) && !Number.isNaN(Date.parse(d + 'T00:00:00Z'))),
    'all 8 lastmod are valid ISO dates', lastmods.join(','));`, '8 lastmod');
q('scripts/smoke_longtail_pages.js',
  `chk((sm.match(/<url>/g) || []).length === 7 && (sm.match(/<\\/url>/g) || []).length === 7,
    'url open/close tags 7/7');`,
  `chk((sm.match(/<url>/g) || []).length === 8 && (sm.match(/<\\/url>/g) || []).length === 8,
    'url open/close tags 8/8');`, '8 url tags');
q('scripts/smoke_longtail_pages.js',
  `    smBroken.length ? smBroken.join(' | ') : '7/7');`,
  `    smBroken.length ? smBroken.join(' | ') : '8/8');`, 'loc resolution extra text');

/* ---------- preflight ---------- */
const cache = {};
for (const it of plan) {
  if (!(it.file in cache)) cache[it.file] = fs.readFileSync(path.join(R, it.file), 'utf8');
  const n = cache[it.file].split(it.oldS).length - 1;
  if (n !== 1) {
    throw new Error('[' + it.file + '] ' + it.label + ' matched ' + n + ' times (expected 1). NOTHING WRITTEN.');
  }
  cache[it.file] = cache[it.file].replace(it.oldS, () => it.newS);
}

/* ---------- commit to disk ---------- */
for (const f of Object.keys(cache)) fs.writeFileSync(path.join(R, f), cache[f], 'utf8');
console.log('APPLIED ' + plan.length + ' replacements across ' + Object.keys(cache).length + ' files');
