/* 2026-11-11 round 2
   Propagate WhatsApp + both contact emails to the remaining 5 public pages
   (3 English long-tail guides + the zh/en Festo sample reports).
   Sample reports explicitly label these as FALCORA's OWN channels so they
   cannot be confused with the company (L2) contacts shown inside the report.

   Rule: preflight EVERY replacement first; write only if all hit exactly once.
*/
const fs = require('fs');
const path = require('path');
const R = path.resolve(__dirname, '..');

const plan = [];
function q(file, oldS, newS, label) { plan.push({ file, oldS, newS, label }); }

const WA = '<a href="https://wa.me/886982310045" target="_blank" rel="noopener">+886 982310045</a>';
const M1 = '<a href="mailto:3531885069@qq.com">3531885069@qq.com</a>';
const M2 = '<a href="mailto:pccnsysu@gmail.com">pccnsysu@gmail.com</a>';

/* ---- 1. shared stylesheet: make contact links readable on the dark CTA band ---- */
const CSS_OLD = `.contactline{font-size:13px;opacity:.85;margin-top:14px}
.contactline b{color:#ffd23f}`;
const CSS_NEW = `.contactline{font-size:13px;opacity:.9;margin-top:14px;line-height:1.9}
.contactline b{color:#ffd23f}
.contactline a{color:#ffd23f;text-decoration:underline;text-underline-offset:2px}
.contactline a:hover{color:#fff}`;
q('assets/content-pages.css', CSS_OLD, CSS_NEW, 'contactline link styling');

/* ---- 2. three English guides: same contactline block in every file ---- */
const LINE_OLD = `      <div class="contactline">LINE <b>pccnsysu</b> &nbsp;·&nbsp; WeChat <b>Ryanpcc</b></div>`;
const LINE_NEW = `      <div class="contactline">
        LINE <b>pccnsysu</b> &nbsp;·&nbsp; WeChat <b>Ryanpcc</b> &nbsp;·&nbsp; WhatsApp ${WA} (Ryan Chen)<br>
        Email ${M1} &nbsp;·&nbsp; ${M2}
      </div>`;
for (const f of [
  'how-to-verify-overseas-buyer.html',
  'pre-deal-due-diligence-checklist.html',
  'verify-company-with-public-sources.html'
]) q(f, LINE_OLD, LINE_NEW, 'contactline with WhatsApp + 2 emails');

/* ---- 3. two sample reports: own-channel block inside footer ---- */
const FOOT_CSS_OLD = `  footer{margin-top:30px;color:var(--mut);font-size:12.5px;text-align:center;border-top:1px solid var(--line);padding-top:18px}`;
const FOOT_CSS_NEW = FOOT_CSS_OLD + `
  .owner-contact{margin:14px auto 0;max-width:760px;font-size:12.5px;line-height:1.9;color:#33425a}
  .owner-contact b{color:var(--ink)}
  .owner-contact a{word-break:break-all}`;

const ZH_FOOT_OLD = `    <a href="./">← 返回 FALCORA</a> · <a href="sample-intel-pack-festo-en.html" hreflang="en" lang="en">English version</a>`;
const ZH_FOOT_NEW = `    <div class="owner-contact">
      <b>需要正式情报包？以下为 FALCORA 我方联系方式（与本报告中的企业联系方式无关）：</b><br>
      WhatsApp ${WA} · Ryan Chen &nbsp;｜&nbsp; 邮箱 ${M1} · ${M2}<br>
      LINE <b>pccnsysu</b> &nbsp;·&nbsp; 微信 <b>Ryanpcc</b>
    </div>
` + ZH_FOOT_OLD;

const EN_FOOT_OLD = `    <a href="falcora-landing-en.html">← Back to FALCORA</a> · <a href="sample-intel-pack-festo.html" hreflang="zh-Hans" lang="zh-Hans">中文版</a>`;
const EN_FOOT_NEW = `    <div class="owner-contact">
      <b>Need a real intel pack? These are FALCORA's own contact channels (not the company contacts shown in this report):</b><br>
      WhatsApp ${WA} · Ryan Chen &nbsp;|&nbsp; Email ${M1} · ${M2}<br>
      LINE <b>pccnsysu</b> &nbsp;·&nbsp; WeChat <b>Ryanpcc</b>
    </div>
` + EN_FOOT_OLD;

for (const f of ['sample-intel-pack-festo.html', 'sample-intel-pack-festo-en.html']) {
  q(f, FOOT_CSS_OLD, FOOT_CSS_NEW, 'owner-contact CSS');
}
q('sample-intel-pack-festo.html', ZH_FOOT_OLD, ZH_FOOT_NEW, 'zh footer own channels');
q('sample-intel-pack-festo-en.html', EN_FOOT_OLD, EN_FOOT_NEW, 'en footer own channels');

/* ---- 4. sitemap: bump the 5 pages changed today ---- */
for (const f of [
  'sample-intel-pack-festo.html',
  'sample-intel-pack-festo-en.html',
  'how-to-verify-overseas-buyer.html',
  'pre-deal-due-diligence-checklist.html',
  'verify-company-with-public-sources.html'
]) {
  q('sitemap.xml',
    '    <loc>https://ryanchen7051.github.io/falcora/' + f + '</loc>\n    <lastmod>2026-11-10</lastmod>',
    '    <loc>https://ryanchen7051.github.io/falcora/' + f + '</loc>\n    <lastmod>2026-11-11</lastmod>',
    'lastmod ' + f);
}

/* ---- preflight: nothing is written until every replacement hits exactly once ---- */
const cache = {};
for (const it of plan) {
  if (!(it.file in cache)) cache[it.file] = fs.readFileSync(path.join(R, it.file), 'utf8');
  const n = cache[it.file].split(it.oldS).length - 1;
  if (n !== 1) {
    throw new Error('[' + it.file + '] ' + it.label + ' 命中 ' + n + ' 次（应为 1），已中止，磁盘未改动');
  }
  cache[it.file] = cache[it.file].replace(it.oldS, () => it.newS);
}
for (const f of Object.keys(cache)) fs.writeFileSync(path.join(R, f), cache[f], 'utf8');
console.log('APPLIED ' + plan.length + ' replacements across ' + Object.keys(cache).length + ' files');
