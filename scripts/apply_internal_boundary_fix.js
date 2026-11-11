#!/usr/bin/env node
/* 2026-11-11 第 5 轮收尾：
   ① 3 个落地页「询价 / 合作」的 WhatsApp 卡片：把 "Ryan Chen" 包进 nowrap，
      避免 1280 宽 4 列布局把姓名折成 "Ryan" / "Chen" 两行（孤字）。
   ② 名录库_预览.html：加 noindex,nofollow + 可见「内部预览 · 非对外页面」边界声明。
      这是含 75,180 条参展商 / 3,775 条协会会员 / 1,763 条政府采购方的内部数据视图，
      v78 教训：可公开打开的 URL 随时可能被贴进 AI 模式，光靠 noindex 挡不住误读，
      所以必须同时有可见声明，并显式写清「供货方 ≠ 采购方」。

   ⚠️ 故意不加 robots.txt Disallow：被 disallow 的页面 Googlebot 不会重新抓取，
      也就永远读不到 noindex 标签，反而可能残留一条无摘要索引。

   全量预检通过才落盘：任何 oldS 命中次数 != 1 就抛错，磁盘不动。
   Usage: node scripts/apply_internal_boundary_fix.js
*/
const fs = require('fs');
const path = require('path');
const R = path.resolve(__dirname, '..');

const plan = [];
function q(file, oldS, newS, label) { plan.push({ file, oldS, newS, label }); }

const WA_OLD = '<div class="cbox"><div class="ic ic-txt">WA</div><h3>WhatsApp</h3><p><a href="https://wa.me/886982310045" target="_blank" rel="noopener">+886 982310045</a> · Ryan Chen</p></div>';
const WA_NEW = WA_OLD.replace(' · Ryan Chen</p>', ' · <span style="white-space:nowrap">Ryan Chen</span></p>');
for (const f of ['index.html', 'falcora-landing.html', 'falcora-landing-en.html']) {
  q(f, WA_OLD, WA_NEW, 'WhatsApp card keeps the owner name on one line');
}

const HEAD_OLD = '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>FALCORA · 全球名录库（预览）</title>';
const HEAD_NEW = HEAD_OLD + '\n<meta name="robots" content="noindex,nofollow" />';
q('名录库_预览.html', HEAD_OLD, HEAD_NEW, 'internal preview gets noindex,nofollow');

const NOTE = '  <div style="background:rgba(245,184,65,.10);border:1px solid rgba(245,184,65,.42);color:#F7CE84;border-radius:10px;padding:10px 12px;font-size:12.5px;line-height:1.75;margin-bottom:14px">\n'
  + '    <b>内部预览 · 非对外页面</b> — 本页是 FALCORA 内部名录库的数据核对视图，不是对外产品页，也不代表任何可售套餐或平台能力。所列<b>参展商 / 协会会员为供货方</b>，与采购方名录永不合并；请勿把本页当作客户名单或对外报价依据。\n'
  + '  </div>';
const BODY_OLD = '<div class="wrap">\n  <nav class="topnav" aria-label="页面导航">';
const BODY_NEW = '<div class="wrap">\n' + NOTE + '\n  <nav class="topnav" aria-label="页面导航">';
q('名录库_预览.html', BODY_OLD, BODY_NEW, 'visible internal-only boundary notice');

const cache = {};
for (const it of plan) {
  if (!(it.file in cache)) cache[it.file] = fs.readFileSync(path.join(R, it.file), 'utf8');
  const n = cache[it.file].split(it.oldS).length - 1;
  if (n !== 1) {
    throw new Error('[' + it.file + '] ' + it.label + ' matched ' + n + ' times (expected 1). NOTHING WRITTEN.');
  }
  cache[it.file] = cache[it.file].replace(it.oldS, () => it.newS);
}
for (const f of Object.keys(cache)) fs.writeFileSync(path.join(R, f), cache[f]);
console.log('APPLIED ' + plan.length + ' replacements across ' + Object.keys(cache).length + ' files');
