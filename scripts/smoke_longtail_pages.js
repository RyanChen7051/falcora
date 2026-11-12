#!/usr/bin/env node
/* FALCORA — long-tail English content pages, LOCAL static smoke test.
   Run: node scripts/smoke_longtail_pages.js
   Online (HTTP / Googlebot UA / rendered DOM) is verified separately after deploy.

   Assertion signature is chk(ok, name, extra). Do not reorder: a wrong signature
   has historically produced "all green" results that were actually false. */
const fs = require('fs');
const path = require('path');
const R = path.resolve(__dirname, '..');

const BASE = 'https://ryanchen7051.github.io/falcora/';
const PAGES = [
  { f: 'how-to-verify-overseas-buyer.html',       key: /how to verify an overseas buyer/i },
  { f: 'pre-deal-due-diligence-checklist.html',   key: /pre-deal due diligence checklist/i },
  { f: 'verify-company-with-public-sources.html', key: /verify a company with public sources/i }
];
const P = [];
function chk(ok, name, extra) {
  P.push(!!ok);
  console.log((ok ? '\u2705 ' : '\u274c ') + name + (extra !== undefined ? '  \u2192 ' + extra : ''));
}
const read = (f) => fs.readFileSync(path.join(R, f), 'utf8');
const exists = (f) => fs.existsSync(path.join(R, f));
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
function jsonLdOfType(html, type) {
  const out = [];
  const re = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const o = JSON.parse(m[1].trim());
      if (o['@type'] === type) out.push(o);
    } catch (e) { /* reported as a parse failure below */ }
  }
  return out;
}
function allLdBlocksParse(html) {
  const re = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  let m, n = 0, bad = 0;
  while ((m = re.exec(html)) !== null) {
    n++;
    try { JSON.parse(m[1].trim()); } catch (e) { bad++; }
  }
  return { n, bad };
}

console.log('=== 3 long-tail English content pages (local) ===');
for (const p of PAGES) {
  const tag = p.f;
  chk(exists(p.f), tag + ' exists');
  if (!exists(p.f)) continue;
  const h = read(p.f);
  chk(h.length > 6000, tag + ' substantive content', h.length + ' bytes');

  chk(/<html lang="en">/.test(h), tag + ' lang=en');
  chk(!/noindex/i.test(h), tag + ' no noindex');
  chk(!/<meta[^>]+name=["']robots["']/i.test(h), tag + ' no meta robots');

  const title = (h.match(/<title>([^<]*)<\/title>/) || ['', ''])[1];
  chk(p.key.test(title), tag + ' title carries the searched question', title);
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || ['', ''])[1];
  chk(p.key.test(h1), tag + ' H1 carries the searched question');
  chk(/<meta name="description" content="[^"]{80,}"/.test(h), tag + ' description present');

  const canon = (h.match(/<link rel="canonical" href="([^"]+)"/) || ['', ''])[1];
  chk(canon === BASE + p.f, tag + ' canonical self-referencing', canon);
  chk((h.match(/<link rel="alternate" hreflang="en" href="([^"]+)"/) || ['', ''])[1] === BASE + p.f,
      tag + ' hreflang en self');
  chk((h.match(/<link rel="alternate" hreflang="x-default" href="([^"]+)"/) || ['', ''])[1] === BASE + p.f,
      tag + ' x-default self');
  chk(!/<link[^>]+rel=["']alternate["'][^>]+hreflang=["']zh-Hans["']/i.test(h),
      tag + ' no zh-Hans alternate (no translated twin, avoids hreflang mismatch)');

  const ld = allLdBlocksParse(h);
  chk(ld.n >= 2 && ld.bad === 0, tag + ' all JSON-LD blocks parse', ld.n + ' blocks / ' + ld.bad + ' bad');
  const art = jsonLdOfType(h, 'Article');
  chk(art.length === 1 && art[0].inLanguage === 'en', tag + ' Article JSON-LD inLanguage=en');
  const faq = jsonLdOfType(h, 'FAQPage');
  chk(faq.length === 1 && faq[0].mainEntity.length === 5, tag + ' FAQPage has 5 questions',
      faq.length ? faq[0].mainEntity.length : 'missing');

  const vis = visible(h);
  if (faq.length === 1) {
    const missingQ = faq[0].mainEntity.filter((q) => !vis.includes(q.name)).map((q) => q.name);
    chk(missingQ.length === 0, tag + ' every FAQ question visible in body',
        missingQ.length ? missingQ.join(' | ') : '5/5');
    const missingA = faq[0].mainEntity.filter((q) => !vis.includes(q.acceptedAnswer.text))
      .map((q) => q.name);
    chk(missingA.length === 0, tag + ' every FAQ answer matches visible body',
        missingA.length ? missingA.join(' | ') : '5/5');
  }

  chk(/<link rel="stylesheet" href="assets\/content-pages\.css\?v=1"/.test(h),
      tag + ' shared stylesheet linked');
  chk(exists('assets/content-pages.css'), tag + ' shared stylesheet exists on disk');
  chk(!/<script[^>]+\bsrc=/i.test(h), tag + ' zero external JS (no runtime exceptions possible)');

  const links = [];
  const re = /<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(h)) !== null) links.push(m[1]);
  const internal = links.filter((u) => !/^(https?:|#|mailto:)/i.test(u));
  const broken = internal.filter((u) => !exists(u.split('#')[0].split('?')[0] || 'index.html'));
  chk(internal.length >= 5, tag + ' internal links >= 5', internal.length + ' links');
  chk(broken.length === 0, tag + ' all internal links resolve locally',
      broken.length ? broken.join(' | ') : '0 broken');

  chk(/Data boundary/.test(vis), tag + ' data-boundary statement visible');
  chk(/found but empty/.test(vis) && /not found/.test(vis), tag + ' three-state output stated');
  chk(/never collected, inferred|never collects, infers/i.test(vis) || /user-supplied only/i.test(vis),
      tag + ' L3 personal-contact boundary stated');
  chk(/supplier/i.test(vis) && /buyer/i.test(vis), tag + ' supplier / buyer distinction stated');
  chk(/pccnsysu/.test(vis) && /Ryanpcc/.test(vis), tag + ' real contact handles present');
  chk(!/130\+/.test(vis), tag + ' no unverified 130+ claim');
  chk(!/Chinese supplier/i.test(vis), tag + ' not narrowed to China sourcing');
  chk(!/(test@|foo@|acme\.com|example\.com)/i.test(vis), tag + ' no fabricated sample values');
}

console.log('\n=== sitemap.xml ===');
const sm = read('sitemap.xml');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
chk(/^<\?xml version="1\.0" encoding="UTF-8"\?>/.test(sm), 'sitemap XML declaration');
chk(locs.length === 9, 'sitemap has 9 loc entries', locs.length);
chk(locs.every((u) => /^https:\/\//.test(u)), 'all loc are absolute https');
const lastmods = [...sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1].trim());
chk(lastmods.length === 9 && lastmods.every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d + 'T00:00:00Z'))),
    'all 9 lastmod are valid ISO dates', lastmods.join(','));
chk((sm.match(/<url>/g) || []).length === 9 && (sm.match(/<\/url>/g) || []).length === 9,
    'url open/close tags 9/9');
chk((sm.match(/<\/urlset>/g) || []).length === 1, 'single closing urlset');
const smBroken = locs.filter((u) => {
  const rel = u.replace(BASE, '').split('?')[0];
  const f = rel === '' ? 'index.html' : rel;
  return !exists(f);
});
chk(smBroken.length === 0, 'every sitemap loc resolves to a local file',
    smBroken.length ? smBroken.join(' | ') : '8/8');
const newBlocks = PAGES.map((p) => {
  const i = sm.indexOf('<loc>' + BASE + p.f + '</loc>');
  if (i < 0) return null;
  const s = sm.lastIndexOf('<url>', i), e = sm.indexOf('</url>', i);
  return sm.slice(s, e);
});
chk(newBlocks.every(Boolean), '3 new page blocks found in sitemap');
chk(newBlocks.every((b) => b && !/xhtml:link/.test(b)),
    'new English-only pages carry no hreflang alternates (no mismatch)');

console.log('\n=== falcora-landing-en.html (guides block) ===');
const le = read('falcora-landing-en.html');
const faqBlock = (le.match(/<div class="faq">([\s\S]*?)<\/div>/) || ['', ''])[1];
chk((faqBlock.match(/<h3>/g) || []).length === 5,
    'original FAQ still 5 questions (unaffected by guides block)',
    (faqBlock.match(/<h3>/g) || []).length);
const guides = (le.match(/<div class="guides">([\s\S]*?)<\/div>/) || ['', ''])[1];
const gLinks = [...guides.matchAll(/<a href="([^"]+)">([\s\S]*?)<\/a>/g)];
chk(gLinks.length === 3, 'guides block has 3 links', gLinks.length);
chk(PAGES.every((p) => guides.includes('href="' + p.f + '"')),
    'guides links point at all 3 new pages');
chk(gLinks.every((g) => p_key(g[2])), 'guide anchor texts use real long-tail wording');
function p_key(t) { return /verify|checklist|public sources/i.test(t); }

const pass = P.filter(Boolean).length;
console.log('\n' + pass + ' / ' + P.length + (pass === P.length ? '  \u2705 ALL GREEN' : '  \u274c FAILURES'));
process.exit(pass === P.length ? 0 : 1);
