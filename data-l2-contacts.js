/* ================= L2 企业职能联系方式（2026-10-20 v59）=================
   由 scripts/fetch_l2.js 从**各企业官网**公开页面原样提取，未经任何改写。
   每条都带 src（抓到它的那个页面 URL）与 at（提取日期），可逐条复核。
   ⚠️ 只收企业职能联系方式：角色邮箱（info/sales/service…白名单）与总机类电话；
      姓名式邮箱 / 个人直线一律不收（那是 L3，平台不抓取、不推断）。
   ⚠️ note = 未检索到公开准确信息的原因（反爬 / 无公开联系方式），不是「无风险」。
   ⚠️ 已人工复核的跨域来源（同主体的区域站 / 更名站 / 并购后官网，非串号）：
       · dmgmori.com → cn.dmgmori.com.cn（DMG MORI 中国站）
       · inditex.com → www.inditex.cn（Inditex 中国站）
       · cuidevices.com → www.sameskydevices.com（CUI Devices 已更名 Same Sky）
       · berryglobal.com → www.amcor.com（已并入 Amcor，该条已从名录剔除）
   复核方法：点开任一条的 src 即可在官网上看到同一值。
   ⚠️ 抓取通道（同一 URL 同一时刻实测，2026-10-20）：curl / node 被 Fastly 类 WAF 判 406 返回 0 字节；
      python3.13（托管版）可得 200 + 完整 HTML → 主通道；SPA / JS 渲染站再用 headless Chrome
      补抓一轮（第二轮 +14 家）。浏览器渲染后仍为 0 的，记「未检索到公开准确信息」而非猜测。
   ⚠️ 已做存量清洗（scripts/clean_l2_phones.js，2026-10-20）：剔除 19 条假号码
      （如 expeditors 的 +2000206/+0460052/+0400045/+04900491 系从「€+2.000.206」这类金额里误拼，
      以及 555-555-5555、(000) 000-0000、+1234567890000 等占位符），合并 7 家同号重复写法。
      校验规则：真实国际冠号表 + 冠号后至少 6 位 + 5 连相同数字/完整升降序列剔除。 */
/* ===== 号码规范化 2026-10-21 =====
   · 修 59 条「国际格式夹着国内干线 0」的号码（+49 (0) 202 4045 → +492024045）；
     +39 / +378 例外不动（意大利国内号码本身以 0 开头）。
   · 同记录内按纯数字去重，删 16 条重复写法；删 1 条「重复块开头」的假号。
   · 只改格式，数字一个不动；每条仍带 src，点开可在官网核对。 */
/* ===== 补抓记录 2026-11-02 =====
   · 本轮 检索 307 家，其中 131 家取到职能联系方式
   · 通道：managed python3.13 为主 + curl 回退（铁律 19：Fastly 类 WAF 对 curl/node 返 406）
   · 每条仍带 src / at，点开即可在官网复核；取不到的一律记 note，不猜不编。 */
/* ===== 展会名录回填 2026-10-31 =====
   · 从 data-expo-exhibitors.js（75180 家参展商）回填 21 家的企业级职能邮箱
   · 只填空：原本已有邮箱的记录一律跳过；邮箱域必须=企业域/子域/同品牌
   · 这类记录的 src 是**展会名录地址**（不是官网原页），带 via:"expo" 以区分，复核需在名录内再搜企业名。 */
window.FAL_L2 = {
 "leupold.com": {
  "dm": "leupold.com",
  "at": "2026-10-21",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取"
 },
 "sightron.com": {
  "dm": "sightron.com",
  "at": "2026-10-21",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取"
 },
 "ior.ro": {
  "dm": "ior.ro",
  "at": "2026-10-21",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取"
 },
 "bulgin.co.uk": {
  "dm": "bulgin.co.uk",
  "at": "2026-10-21",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取"
 },
 "molex.com": {
  "dm": "molex.com",
  "at": "2026-10-21",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取"
 },
 "stanleyblackanddecker.com": {
  "dm": "stanleyblackanddecker.com",
  "at": "2026-10-21",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取"
 },
 "draeger.com": {
  "dm": "draeger.com",
  "at": "2026-10-21",
  "phones": [],
  "emails": [
   {
    "v": "info@draeger.com",
    "src": "https://www.medica-tradefair.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取"
 },
 "dhl.com": {
  "dm": "dhl.com",
  "at": "2026-10-21",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取"
 },
 "phocos.com": {
  "dm": "phocos.com",
  "at": "2026-10-21",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取"
 },
 "kahles.at": {
  "dm": "kahles.at",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+432236520200",
    "src": "https://www.kahles.at/en/contact",
    "kind": "tel"
   },
   {
    "v": "+432236506827",
    "src": "https://www.kahles.at/en/contact",
    "kind": "tel"
   },
   {
    "v": "+4366287212322",
    "src": "https://www.kahles.at/en/service",
    "kind": "tel"
   },
   {
    "v": "+61439570537",
    "src": "https://www.kahles.at/en/service",
    "kind": "text",
    "loc": "AU"
   }
  ],
  "emails": [
   {
    "v": "info@kahles.at",
    "src": "https://www.kahles.at/en/contact"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.kahles.at/en/contact",
   "https://www.kahles.at/en/service",
   "https://www.kahles.at/en/service/reticles",
   "https://www.kahles.at/en/service/dealer-login",
   "https://www.kahles.at/en/imprint",
   "https://www.kahles.at/en/"
  ],
  "note": ""
 },
 "swarovskioptik.com": {
  "dm": "swarovskioptik.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "800-426-3089",
    "src": "https://www.swarovskioptik.com/at/en/hunting/service/shipping-options",
    "kind": "text"
   },
   {
    "v": "0080032425056",
    "src": "https://www.swarovskioptik.com/at/en/hunting/service/contact",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "customerservice@swarovskioptik.com",
    "src": "https://www.swarovskioptik.com/at/en/hunting/service/shipping-options"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.swarovskioptik.com/at/en/hunting/service/shipping-options",
   "https://www.swarovskioptik.com/at/en/hunting/service/faq",
   "https://www.swarovskioptik.com/at/en/hunting/service/returns-and-repairs",
   "https://www.swarovskioptik.com/at/en/hunting/service/order-process",
   "https://www.swarovskioptik.com/at/en/hunting/service/contact",
   "https://www.swarovskioptik.com/at/en/hunting/about-us/purpose-and-vision",
   "https://www.swarovskioptik.com/at/en/hunting"
  ],
  "note": ""
 },
 "nightforceoptics.com": {
  "dm": "nightforceoptics.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "2084769814",
    "src": "https://www.nightforceoptics.com/about-us/",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info@nightforceoptics.com",
    "src": "https://www.nightforceoptics.com/about-us/"
   }
  ],
  "addr": [
   {
    "v": "336 Hazen Lane Orofino, ID 83544",
    "src": "https://www.nightforceoptics.com/about-us/",
    "kind": "tag"
   }
  ],
  "pages": [
   "https://www.nightforceoptics.com/about-us/",
   "https://www.nightforceoptics.com/support/",
   "https://www.nightforceoptics.com/contact-us/",
   "https://www.nightforceoptics.com/"
  ],
  "note": ""
 },
 "schmidt-bender.de": {
  "dm": "schmidt-bender.de",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+496409811520",
    "src": "https://www.schmidtundbender.de/kontakt/",
    "kind": "text"
   },
   {
    "v": "+496409811511",
    "src": "https://www.schmidtundbender.de/kontakt/",
    "kind": "text"
   },
   {
    "v": "+496409811545",
    "src": "https://www.schmidtundbender.de/kontakt/",
    "kind": "text"
   },
   {
    "v": "+496409811541",
    "src": "https://www.schmidtundbender.de/kontakt/",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "sales@schmidt-bender.de",
    "src": "https://www.schmidtundbender.de/kontakt/"
   },
   {
    "v": "service@schmidt-bender.de",
    "src": "https://www.schmidtundbender.de/kontakt/"
   },
   {
    "v": "info@schmidt-bender.de",
    "src": "https://www.schmidtundbender.de/kontakt/"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.schmidtundbender.de/kontakt/",
   "https://www.schmidtundbender.de/"
  ],
  "note": ""
 },
 "steiner-optics.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+18885506255",
    "src": "https://www.steiner-optics.com/support",
    "kind": "tel"
   },
   {
    "v": "+49921787915",
    "src": "https://www.steiner-optics.com/support",
    "kind": "tel"
   },
   {
    "v": "+19374262341",
    "src": "https://www.steiner-optics.com/support",
    "kind": "text"
   },
   {
    "v": "1-888-550-6255",
    "src": "https://www.steiner-optics.com/support/repairs",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.steiner-optics.com/support",
   "https://www.steiner-optics.com/support/repairs",
   "https://www.steiner-optics.com/support/warranty",
   "https://www.steiner-optics.com/support/dontation-requests",
   "https://www.steiner-optics.com/support/steiner-employment",
   "https://www.steiner-optics.com/support/about-us",
   "https://www.steiner-optics.com/support/faqs",
   "https://www.steiner-optics.com/",
   "https://www.steiner-optics.com/support/legal"
  ],
  "note": ""
 },
 "zeiss.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "1-925-701-3600",
    "src": "https://www.zeiss.com/semiconductor-manufacturing-technology/about-us.html?vaURL=www.zeiss.com/about-zeiss-smt",
    "kind": "text"
   },
   {
    "v": "+4936412200",
    "src": "https://www.zeiss.com/meditec/en/about-us/contact-us.html",
    "kind": "tel"
   },
   {
    "v": "+493641220112",
    "src": "https://www.zeiss.com/meditec/en/about-us/contact-us.html",
    "kind": "tel"
   },
   {
    "v": "+497364206000",
    "src": "https://www.zeiss.com/meditec/en/about-us/contact-us.html",
    "kind": "tel"
   },
   {
    "v": "+497364204959",
    "src": "https://www.zeiss.com/meditec/en/about-us/contact-us.html",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.zeiss.com/bin/core/services/userdataprovider/datalayer.json/content/cco/international/website/en/home",
   "https://www.zeiss.com/bin/core/cached/services/crisis/content.json?context=/content/cco/international/website/en/home",
   "https://www.zeiss.com/corporate/en/about-zeiss.html",
   "https://www.zeiss.com/corporate/en/contact.html",
   "https://www.zeiss.com/corporate/en/about-zeiss/future/digitalization/artificial-intelligence.html",
   "https://www.zeiss.com/meditec/en/about-us/contact-us.html",
   "https://www.zeiss.com/semiconductor-manufacturing-technology/about-us.html?vaURL=www.zeiss.com/about-zeiss-smt",
   "https://www.zeiss.com/corporate/en/home.html",
   "https://www.zeiss.com/bin/core/services/userdataprovider/datalayer.json/content/cco/international/website/en/about-us",
   "https://www.zeiss.com/bin/core/cached/services/crisis/content.json?context=/content/cco/international/website/en/about-us",
   "https://www.zeiss.com/corporate/en/about-zeiss/present/facts-figures/carl-zeiss-foundation.html",
   "https://www.zeiss.com/corporate/en/about-zeiss/present/sustainability.html",
   "https://www.zeiss.com/about-zeiss-smt",
   "https://www.zeiss.com/photo/service"
  ],
  "note": ""
 },
 "athlonoptics.com": {
  "dm": "athlonoptics.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "1.855.913.5678",
    "src": "https://athlonoptics.com/contact-us/",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "contact@athlonoptics.com",
    "src": "https://athlonoptics.com/contact-us/"
   },
   {
    "v": "sales@athlonoptics.com",
    "src": "https://athlonoptics.com/contact-us/"
   }
  ],
  "addr": [],
  "pages": [
   "https://athlonoptics.com/wp-content/plugins/contact-form-7/includes/css/styles.css?ver=6.1.7",
   "https://athlonoptics.com/contact-us/",
   "https://athlonoptics.com/about/",
   "https://athlonoptics.com/wp-content/uploads/2022/01/contact.jpg",
   "https://athlonoptics.com/",
   "https://athlonoptics.com/contact",
   "https://athlonoptics.com/contact-us",
   "https://athlonoptics.com/contactus"
  ],
  "note": ""
 },
 "marchscopes.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+81266755658",
    "src": "https://marchscopes.com/support/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://marchscopes.com/wp-content/plugins/contact-form-7/includes/css/styles.css?ver=6.1.6",
   "https://marchscopes.com/support/",
   "https://marchscopes.com/about-us/",
   "https://marchscopes.com/",
   "https://marchscopes.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fmarchscopes.com%2Fsupport%2F",
   "https://marchscopes.com/wp-content/uploads/2022/12/Engraving-service-March-Scopes.pdf"
  ],
  "note": ""
 },
 "meopta.com": {
  "dm": "meopta.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+420581241111",
    "src": "https://www.meopta.com/en/about",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@meopta.com",
    "src": "https://www.meopta.com/en/about"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.meopta.com/en/about",
   "https://www.meopta.com/en/contact/",
   "https://www.meopta.com/en/all-in-one-service",
   "https://www.meopta.com/en/"
  ],
  "note": ""
 },
 "burrisoptics.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+18884400244",
    "src": "https://www.burrisoptics.com/support/customer-service",
    "kind": "tel"
   },
   {
    "v": "1-888-440-0244",
    "src": "https://www.burrisoptics.com/support/warranty",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.burrisoptics.com/support",
   "https://www.burrisoptics.com/support/repairs",
   "https://www.burrisoptics.com/support/user-manuals",
   "https://www.burrisoptics.com/support/customer-service",
   "https://www.burrisoptics.com/support/warranty",
   "https://www.burrisoptics.com/support/faqs",
   "https://www.burrisoptics.com/support/careers",
   "https://www.burrisoptics.com/",
   "https://www.burrisoptics.com/support/donation-requests"
  ],
  "note": ""
 },
 "vortexoptics.com": {
  "dm": "vortexoptics.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "18004867839",
    "src": "https://vortexoptics.com/contactus",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "service@vortexoptics.com",
    "src": "https://vortexoptics.com/service-request"
   }
  ],
  "addr": [],
  "pages": [
   "https://vortexoptics.com/contactus",
   "https://vortexoptics.com/service-request",
   "https://vortexoptics.com/about-you",
   "https://vortexoptics.com/"
  ],
  "note": ""
 },
 "steiner.de": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+499217879111",
    "src": "https://www.steiner.de/footer/service/katalog",
    "kind": "jsonld"
   },
   {
    "v": "+499217879112",
    "src": "https://www.steiner.de/footer/service/katalog",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "customer-service@steiner.de",
    "src": "https://www.steiner.de/footer/service/katalog"
   },
   {
    "v": "customer-service-international@steiner.de",
    "src": "https://www.steiner.de/footer/service/katalog"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.steiner.de/footer/service/katalog",
   "https://www.steiner.de/footer/service/service-welt",
   "https://www.steiner.de/footer/service/reparatur-ersatzteilservice",
   "https://www.steiner.de/footer/service/produktgarantie",
   "https://www.steiner.de/footer/service/optiklexikon",
   "https://www.steiner.de/footer/service/faq",
   "https://www.steiner.de/footer/service/haendlersuche",
   "https://www.steiner.de/"
  ],
  "note": ""
 },
 "trijicon.com": {
  "dm": "trijicon.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "18003380563",
    "src": "https://www.trijicon.com/contact-us",
    "kind": "tel"
   },
   {
    "v": "12489607700",
    "src": "https://www.trijicon.com/contact-us",
    "kind": "tel"
   },
   {
    "v": "+447734396260",
    "src": "https://www.trijicon.com/contact-us",
    "kind": "text",
    "loc": "GB"
   }
  ],
  "emails": [
   {
    "v": "info@trijicon.com",
    "src": "https://www.trijicon.com/contact-us"
   },
   {
    "v": "customerservice@trijicon.com",
    "src": "https://www.trijicon.com/contact-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.trijicon.com/contact-us",
   "https://www.trijicon.com/support/export-controls",
   "https://www.trijicon.com/"
  ],
  "note": ""
 },
 "ritonoptics.com": {
  "dm": "ritonoptics.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "1-855-397-4866",
    "src": "https://ritonoptics.com/contact-us/",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@ritonoptics.com",
    "src": "https://ritonoptics.com/contact-us/"
   },
   {
    "v": "customerservice@ritonoptics.com",
    "src": "https://ritonoptics.com/support-faqs/"
   },
   {
    "v": "sales@ritonoptics.com",
    "src": "https://ritonoptics.com/support-faqs/"
   }
  ],
  "addr": [],
  "pages": [
   "https://ritonoptics.com/wp-content/plugins/metorik-helper/assets/css/metorik.css?ver=2.0.10",
   "https://ritonoptics.com/contact-us/",
   "https://ritonoptics.com/support-faqs/",
   "https://ritonoptics.com/submit-dealer-location/",
   "https://ritonoptics.com/"
  ],
  "note": ""
 },
 "primaryarms.com": {
  "dm": "primaryarms.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "17133449600",
    "src": "https://www.primaryarms.com/",
    "kind": "tel"
   },
   {
    "v": "7134369194",
    "src": "https://www.primaryarms.com/",
    "kind": "jsonld"
   }
  ],
  "emails": [
   {
    "v": "info@primaryarms.com",
    "src": "https://www.primaryarms.com/"
   }
  ],
  "addr": [
   {
    "v": "3219 S Sam Houston Pkwy E #100, 77047, Houston, TX, USA",
    "src": "https://www.primaryarms.com/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.primaryarms.com/brand/bravo-company-manufacturing/in-stock/false?order=custitem_ns_sc_ext_ts_365_amount:desc,relevance:desc",
   "https://www.primaryarms.com/bravo-company-mfg-mk2-ar15-lower-receiver-mod0-fde-blem-pa-exclusive",
   "https://www.primaryarms.com/contact-us",
   "https://www.primaryarms.com/help-center",
   "https://www.primaryarms.com/help-center/warranty-and-returns",
   "https://www.primaryarms.com/help-center/pickup-center",
   "https://www.primaryarms.com/"
  ],
  "note": ""
 },
 "deltaoptical.pl": {
  "dm": "deltaoptical.pl",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "257860520",
    "src": "https://deltaoptical.pl/kontakt.html",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info@deltaoptical.pl",
    "src": "https://deltaoptical.pl/kontakt.html"
   }
  ],
  "addr": [
   {
    "v": "Piękna 1, 05-300, Mińsk Mazowiecki, mazowieckie",
    "src": "https://deltaoptical.pl/kontakt.html",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://deltaoptical.pl/kontakt.html",
   "https://deltaoptical.pl/"
  ],
  "note": ""
 },
 "holosun.com": {
  "dm": "holosun.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+19095942888",
    "src": "https://www.holosun.com/contact-us",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info@holosun.com",
    "src": "https://www.holosun.com/contact-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.holosun.com/contact-us",
   "https://www.holosun.com/about-us",
   "https://www.holosun.com/contact-us/success",
   "https://www.holosun.com/"
  ],
  "note": ""
 },
 "crimsontrace.com": {
  "dm": "crimsontrace.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "18004422406",
    "src": "https://www.crimsontrace.com/complete-focus/about-us/",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "support@crimsontrace.com",
    "src": "https://www.crimsontrace.com/complete-focus/about-us/"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.crimsontrace.com/complete-focus/about-us/",
   "https://www.crimsontrace.com/contactus/?form=ContactUs",
   "https://www.crimsontrace.com/support/free-batteries-for-life/",
   "https://www.crimsontrace.com/support/patents/",
   "https://www.crimsontrace.com/support/promotions/",
   "https://www.crimsontrace.com/"
  ],
  "note": ""
 },
 "gpo-usa.com": {
  "dm": "gpo-usa.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "8446924667",
    "src": "https://gpo-usa.com/contact/",
    "kind": "tel"
   },
   {
    "v": "8044958561",
    "src": "https://gpo-usa.com/contact/",
    "kind": "tel"
   },
   {
    "v": "8044958560",
    "src": "https://gpo-usa.com/contact/",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info@gpo-usa.com",
    "src": "https://gpo-usa.com/contact/"
   },
   {
    "v": "service@gpo-usa.com",
    "src": "https://gpo-usa.com/contact/"
   }
  ],
  "addr": [
   {
    "v": "711 Moorefield Park Dr., Ste. C, North Chesterfield, VA, 23236",
    "src": "https://gpo-usa.com/contactus",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://gpo-usa.com/contact/",
   "https://gpo-usa.com/about/",
   "https://gpo-usa.com/contact",
   "https://gpo-usa.com/contact-us",
   "https://gpo-usa.com/contactus",
   "https://gpo-usa.com/en/contact",
   "https://gpo-usa.com/"
  ],
  "note": ""
 },
 "element-optics.com": {
  "dm": "element-optics.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [
   {
    "v": "info@element-optics.com",
    "src": "https://global.element-optics.com/contact/"
   },
   {
    "v": "sales@element-optics.com",
    "src": "https://global.element-optics.com/contact/"
   }
  ],
  "addr": [],
  "pages": [
   "https://global.element-optics.com/contact/",
   "https://global.element-optics.com/contact/",
   "https://global.element-optics.com/about/",
   "https://global.element-optics.com/"
  ],
  "note": ""
 },
 "ddoptics.de": {
  "dm": "ddoptics.de",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+4937157383010",
    "src": "https://www.ddoptics.de/jobs/stellenangebot-technik-service/",
    "kind": "tel"
   },
   {
    "v": "+49351417223099",
    "src": "https://www.ddoptics.de/impressum",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@ddoptics.de",
    "src": "https://www.ddoptics.de/impressum"
   }
  ],
  "addr": [
   {
    "v": "Schönherrstraße 8, 09113, Chemnitz, Sachsen, DE",
    "src": "https://www.ddoptics.de/jobs/stellenangebot-technik-service/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.ddoptics.de/jobs/stellenangebot-technik-service/",
   "https://www.ddoptics.de/service/",
   "https://www.ddoptics.de/service/downloads/",
   "https://www.ddoptics.de/kontaktformular",
   "https://www.ddoptics.de/ddoptics-garantie-service-de/en",
   "https://www.ddoptics.de/impressum",
   "https://www.ddoptics.de/"
  ],
  "note": ""
 },
 "kiteoptics.com": {
  "dm": "kiteoptics.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+3250692319",
    "src": "https://kiteoptics.com/en/about-us/belgian-innovation",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info@kiteoptics.com",
    "src": "https://kiteoptics.com/en/about-us/belgian-innovation"
   }
  ],
  "addr": [],
  "pages": [
   "https://kiteoptics.com/en/about-us/belgian-innovation",
   "https://kiteoptics.com/en/about-us/vacancies",
   "https://kiteoptics.com/en/support/faq",
   "https://kiteoptics.com/en/support/customer-service",
   "https://kiteoptics.com/en/support/request-repairs",
   "https://kiteoptics.com/en/support/product-registration",
   "https://kiteoptics.com/en/"
  ],
  "note": ""
 },
 "magpul.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "8774624785",
    "src": "https://magpul.com/help/locate-store",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://magpul.com/help/locate-store",
   "https://magpul.com/"
  ],
  "note": ""
 },
 "511tactical.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.511tactical.com/company-info/about-511",
   "https://www.511tactical.com/company-info/careers",
   "https://www.511tactical.com/customer-service/help-center",
   "https://www.511tactical.com/customer-service/return-policy",
   "https://www.511tactical.com/customer-service/warranty",
   "https://www.511tactical.com/customer-service/size-charts",
   "https://www.511tactical.com/company-info/vendor-code-of-conduct",
   "https://www.511tactical.com/",
   "https://www.511tactical.com/company-info/company-info/privacy-opt-out-and-request-webform-69c12d0059d6a",
   "https://www.511tactical.com/customer-service/shipping-information",
   "https://www.511tactical.com/company-info/privacy-security-terms",
   "https://www.511tactical.com/company-info/supply-chain-act"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "konus.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+390456767670",
    "src": "https://www.konus.com/contattaci/",
    "kind": "tel"
   },
   {
    "v": "+13058847618",
    "src": "https://www.konus.com/contattaci/",
    "kind": "tel"
   },
   {
    "v": "393274066621",
    "src": "https://www.konus.com/contattaci/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.konus.com/contattaci/",
   "https://www.konus.com/en/contacts",
   "https://www.konus.com/",
   "https://www.konus.com/es/contactos",
   "https://www.konus.com/de/kontakte",
   "https://www.konus.com/en/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fwww.konus.com%2Fen%2Fcontacts%2F",
   "https://www.konus.com/en/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fwww.konus.com%2Fen%2Fcontacts%2F&amp;format=xml"
  ],
  "note": ""
 },
 "usoptics.com": {
  "dm": "usoptics.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "828-874-2242",
    "src": "https://www.usoptics.com/support/optics/",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@usoptics.com",
    "src": "https://www.usoptics.com/support/optics/"
   },
   {
    "v": "sales@usoptics.com",
    "src": "https://www.usoptics.com/"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.usoptics.com/wp-content/plugins/contact-form-7/includes/css/styles.css?ver=6.1.7",
   "https://www.usoptics.com/support/optics/",
   "https://www.usoptics.com/support/how-to/",
   "https://www.usoptics.com/support/reticles/",
   "https://www.usoptics.com/support/military-law-enforcement-first-responder-program/",
   "https://www.usoptics.com/about-us-optics/",
   "https://www.usoptics.com/"
  ],
  "note": ""
 },
 "swampfoxoptics.com": {
  "dm": "swampfoxoptics.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "7203896719",
    "src": "https://www.swampfoxoptics.com/contact-us",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "support@swampfoxoptics.com",
    "src": "https://www.swampfoxoptics.com/contact-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.swampfoxoptics.com/contact-us",
   "https://www.swampfoxoptics.com/our-company",
   "https://www.swampfoxoptics.com/our-company",
   "https://www.swampfoxoptics.com/"
  ],
  "note": ""
 },
 "helikon-tex.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+48717684590",
    "src": "https://helikon-tex.com/en/about-helikon-tex",
    "kind": "tel"
   },
   {
    "v": "+48717694590",
    "src": "https://helikon-tex.com/en/about-helikon-tex",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "Radomska 34, 54-032, Wrocław, dolnośląskie, Poland",
    "src": "https://helikon-tex.com/en/about-helikon-tex",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://helikon-tex.com/en/about-helikon-tex",
   "https://helikon-tex.com/en/"
  ],
  "note": ""
 },
 "cryeprecision.com": {
  "dm": "cryeprecision.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "718.246.3838",
    "src": "https://www.cryeprecision.com/contact-other",
    "kind": "text"
   },
   {
    "v": "718.246.3833",
    "src": "https://www.cryeprecision.com/contact-other",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "sales@cryeprecision.com",
    "src": "https://www.cryeprecision.com/contact-other"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.cryeprecision.com/support",
   "https://www.cryeprecision.com/contact",
   "https://www.cryeprecision.com/contact-us",
   "https://www.cryeprecision.com/contacts",
   "https://www.cryeprecision.com/contact-us/",
   "https://www.cryeprecision.com/",
   "https://www.cryeprecision.com/contact-other"
  ],
  "note": ""
 },
 "blueforcegear.com": {
  "dm": "blueforcegear.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "9123309166",
    "src": "https://blueforcegear.com/contact-us",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "sales@blueforcegear.com",
    "src": "https://blueforcegear.com/contact-us"
   }
  ],
  "addr": [
   {
    "v": "166 Pine Barren Rd Pooler, GA 31322 United States of America",
    "src": "https://blueforcegear.com/contact-us",
    "kind": "tag"
   }
  ],
  "pages": [
   "https://blueforcegear.com/contact-us",
   "https://blueforcegear.com/about_us/",
   "https://blueforcegear.com/causes-we-support/",
   "https://blueforcegear.com/contact-us",
   "https://blueforcegear.com/about_us/",
   "https://blueforcegear.com/"
  ],
  "note": ""
 },
 "tacticaltailor.com": {
  "dm": "tacticaltailor.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "253-984-7854",
    "src": "https://tacticaltailor.com/contact/",
    "kind": "text"
   },
   {
    "v": "1-866-984-7854",
    "src": "https://tacticaltailor.com/contact/",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "customerservice@tacticaltailor.com",
    "src": "https://tacticaltailor.com/contact/"
   }
  ],
  "addr": [
   {
    "v": "2 S. Division St Kellogg, ID 83837",
    "src": "https://tacticaltailor.com/contact/",
    "kind": "tag"
   }
  ],
  "pages": [
   "https://tacticaltailor.com/contact/",
   "https://tacticaltailor.com/contact/",
   "https://tacticaltailor.com/"
  ],
  "note": ""
 },
 "ufpro.com": {
  "dm": "ufpro.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+38612927710",
    "src": "https://ufpro.com/contact-us",
    "kind": "jsonld"
   },
   {
    "v": "+38612927765",
    "src": "https://ufpro.com/imprint",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "support@ufpro.com",
    "src": "https://ufpro.com/contact-us"
   }
  ],
  "addr": [
   {
    "v": "Planjava 6, 1236, Trzin, Slovenia",
    "src": "https://ufpro.com/contact-us",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://ufpro.com/contact-us",
   "https://ufpro.com/imprint",
   "https://ufpro.com/about-us",
   "https://ufpro.com/about-mehler-systems",
   "https://ufpro.com/"
  ],
  "note": ""
 },
 "lindnerhof-taktik.de": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+498042503900",
    "src": "https://lindnerhof-taktik.de/newsroom/company-news",
    "kind": "tel"
   },
   {
    "v": "+4980425039099",
    "src": "https://lindnerhof-taktik.de/legal-notice",
    "kind": "text"
   },
   {
    "v": "+49804250390",
    "src": "https://lindnerhof-taktik.de/legal-notice",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "Lindnerhof Taktik Isarring 3 83661 Lenggries Germany",
    "src": "https://lindnerhof-taktik.de/newsroom/company-news",
    "kind": "tag"
   },
   {
    "v": "Isarring 3 83661 Lenggries Germany",
    "src": "https://lindnerhof-taktik.de/contact-us",
    "kind": "tag"
   }
  ],
  "pages": [
   "https://lindnerhof-taktik.de/newsroom/company-news",
   "https://lindnerhof-taktik.de/about-us",
   "https://lindnerhof-taktik.de/contact-us",
   "https://lindnerhof-taktik.de/legal-notice",
   "https://lindnerhof-taktik.de/",
   "https://lindnerhof-taktik.de/us/newsroom/company-news",
   "https://lindnerhof-taktik.de/de/newsroom/unternehmensnachrichten",
   "https://lindnerhof-taktik.de/us/about-us"
  ],
  "note": ""
 },
 "tasmaniantiger.info": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4982059602",
    "src": "https://www.tasmaniantiger.info/en/imprint/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "Robert-Bosch-Str. 3, 86453, Dasing",
    "src": "https://www.tasmaniantiger.info/en/service/carrying-systems/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.tasmaniantiger.info/en/service/carrying-systems/",
   "https://www.tasmaniantiger.info/en/service/adjust-your-backpack/",
   "https://www.tasmaniantiger.info/en/service/materials/",
   "https://www.tasmaniantiger.info/en/service/mobile-wallpapers/",
   "https://www.tasmaniantiger.info/en/company/history/",
   "https://www.tasmaniantiger.info/en/company/open-factory/",
   "https://www.tasmaniantiger.info/en/imprint/",
   "https://www.tasmaniantiger.info/en/"
  ],
  "note": ""
 },
 "clawgear.com": {
  "dm": "clawgear.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+43725250900",
    "src": "https://www.clawgear.com/en/i/contact/",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@clawgear.com",
    "src": "https://www.clawgear.com/en/c/service-patches/"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.clawgear.com/en/c/service-patches/",
   "https://www.clawgear.com/en/c/woven-service-patches/",
   "https://www.clawgear.com/en/i/contact/",
   "https://www.clawgear.com/en/i/imprint/",
   "https://www.clawgear.com/en/imprint",
   "https://www.clawgear.com/en/imprint",
   "https://www.clawgear.com/"
  ],
  "note": ""
 },
 "mechanix.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "(800) 222-4296",
    "src": "https://www.mechanix.com/us-en/info-about-mechanix.html",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.mechanix.com/us-en/info-about-mechanix.html",
   "https://www.mechanix.com/us-en/"
  ],
  "note": ""
 },
 "teamwendy.com": {
  "dm": "teamwendy.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+12167382518",
    "src": "https://www.teamwendy.com/about/",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info@teamwendy.com",
    "src": "https://www.teamwendy.com/about/"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.teamwendy.com/about/",
   "https://www.teamwendy.com/about/headstrong/",
   "https://www.teamwendy.com/about/honoring-wendy/",
   "https://www.teamwendy.com/about/our-culture/",
   "https://www.teamwendy.com/about/headstrong/headstrong-helmet-shoots/",
   "https://www.teamwendy.com/about/headstrong/headstrong-webinars/",
   "https://www.teamwendy.com/"
  ],
  "note": ""
 },
 "esseyepro.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "18777264072",
    "src": "https://esseyepro.com/en_us/contact",
    "kind": "tel"
   },
   {
    "v": "12087264072",
    "src": "https://esseyepro.com/en_us/contact",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://esseyepro.com/en_us/contact",
   "https://esseyepro.com/contact",
   "https://esseyepro.com/contact-us",
   "https://esseyepro.com/contact-us/",
   "https://esseyepro.com/"
  ],
  "note": ""
 },
 "esstac.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://esstac.com/contact-us/",
   "https://esstac.com/support/",
   "https://esstac.com/"
  ],
  "note": "已读取官网 3 个页面，未检索到公开职能联系方式"
 },
 "mysteryranch.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "2065238135",
    "src": "https://www.mysteryranch.com/contact",
    "kind": "tel"
   },
   {
    "v": "4065483234",
    "src": "https://www.mysteryranch.com/contact",
    "kind": "tel"
   },
   {
    "v": "4065851428",
    "src": "https://www.mysteryranch.com/contact",
    "kind": "tel"
   },
   {
    "v": "18335481999",
    "src": "https://www.mysteryranch.com/contact",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "4415 Stone Way N., 98103, Seattle, WA",
    "src": "https://www.mysteryranch.com/contact",
    "kind": "microdata"
   }
  ],
  "pages": [
   "https://www.mysteryranch.com/contact",
   "https://www.mysteryranch.com/community-support-program",
   "https://www.mysteryranch.com/contactus",
   "https://www.mysteryranch.com/contacts",
   "https://www.mysteryranch.com/contact-us/",
   "https://www.mysteryranch.com/en/contact",
   "https://www.mysteryranch.com/",
   "https://www.mysteryranch.com/en/contact-us"
  ],
  "note": ""
 },
 "velocitysystems.net": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "http://velocitysystems.net/contact",
   "http://velocitysystems.net/contact-us",
   "http://velocitysystems.net/contactus",
   "http://velocitysystems.net/contacts",
   "http://velocitysystems.net/contact-us/",
   "http://velocitysystems.net/en/contact",
   "http://velocitysystems.net/en/contact-us",
   "http://velocitysystems.net/"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "logitech.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.logitech.com/en-ie/change-location",
   "https://www.logitech.com/en-in/change-location",
   "https://www.logitech.com/en-ae/change-location",
   "https://www.logitech.com/en-za/change-location",
   "https://www.logitech.com/no-no/change-location",
   "https://www.logitech.com/zh-cn/change-location",
   "https://www.logitech.com/nl-be/change-location",
   "https://www.logitech.com/en-us/change-location",
   "https://www.logitech.com/el-gr/change-location",
   "https://www.logitech.com/en-my/change-location",
   "https://www.logitech.com/nl-nl/change-location",
   "https://www.logitech.com/en-eu/change-location"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "minox.com": {
  "dm": "minox.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+49756298135",
    "src": "https://www.minox.com/de/Support/",
    "kind": "text"
   },
   {
    "v": "+49644156691700",
    "src": "https://www.minox.com/de/Support/",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@minox.com",
    "src": "https://www.minox.com/de/Support/"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.minox.com/de/",
   "https://www.minox.com/de/Support/",
   "https://www.minox.com/de/Informationen/Impressum/",
   "https://www.minox.com/de/Informationen/Kontakt/"
  ],
  "note": ""
 },
 "sennheiser.com": {
  "dm": "sennheiser.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+3224664410",
    "src": "https://www.sennheiser.com/en-de/support",
    "kind": "text",
    "loc": "BE"
   },
   {
    "v": "+4951306000",
    "src": "https://www.sennheiser.com/en-de/support",
    "kind": "text"
   },
   {
    "v": "+358931588710",
    "src": "https://www.sennheiser.com/en-de/support",
    "kind": "text",
    "loc": "FI"
   },
   {
    "v": "+33149870300",
    "src": "https://www.sennheiser.com/en-de/support",
    "kind": "text",
    "loc": "FR"
   }
  ],
  "emails": [
   {
    "v": "contact@sennheiser.com",
    "src": "https://www.sennheiser.com/en-de/support"
   }
  ],
  "addr": [
   {
    "v": "Am Labor 1, 30900, Wedemark, DE",
    "src": "https://www.sennheiser.com/en-de/support",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.sennheiser.com/en-de/support",
   "https://www.sennheiser.com/en-de/about-us",
   "https://www.sennheiser.com/en-de/support/tools",
   "https://www.sennheiser.com/en-de/support/collaborate-with-us",
   "https://www.sennheiser.com/en-de/support/downloads-and-instructions",
   "https://www.sennheiser.com/en-de/imprint",
   "https://www.sennheiser.com/en-de"
  ],
  "note": ""
 },
 "philips.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.philips.com/a-w/about",
   "https://www.philips.com/a-w/about/news-and-insights.html",
   "https://www.philips.com/a-w/about/innovation.html",
   "https://www.philips.com/a-w/about/sustainability.html",
   "https://www.philips.com.ph/",
   "https://www.philips.com/a-w/about.html",
   "https://www.philips.com/a-w/about/our-strategy.html",
   "https://www.philips.com/a-w/about/artificial-intelligence.html"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "bose.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "18003792073",
    "src": "https://www.bose.com/home",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://support.bose.com/get-help-landing-page",
   "https://support.bose.com/repair-or-replacement",
   "https://www.bose.com/support/bm-safety-service",
   "https://www.bose.com/about",
   "https://careers.bose.com/us/en",
   "https://www.bose.com/home",
   "https://www.bose.com/p/earbuds/bose-noise-cancelling-wired-earbuds/NCWEARB-HEADPHONEIN.html",
   "https://www.bose.com/support/bm-safety-service-overlay"
  ],
  "note": ""
 },
 "gentexcorp.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "888-894-1755",
    "src": "https://www.gentexcorp.com/contact/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.gentexcorp.com/contact/",
   "https://www.gentexcorp.com/about-us/",
   "https://www.gentexcorp.com/news/gentex-selected-to-support-us-army-ngc2-program/",
   "https://www.gentexcorp.com/news/ops-core-secures-order-supporting-canadian-army/",
   "https://www.gentexcorp.com/",
   "https://www.gentexcorp.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fwww.gentexcorp.com%2Fcontact%2F",
   "https://www.gentexcorp.com/about-us",
   "https://www.gentexcorp.com/news/ops-core-secures-order-supporting-canadian-army"
  ],
  "note": ""
 },
 "legrand.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+33149725353",
    "src": "https://www.legrand.com/en/investors-and-shareholders/contact-us",
    "kind": "text"
   },
   {
    "v": "+33555067015",
    "src": "https://www.legrand.com/en/investors-and-shareholders/contact-us",
    "kind": "text"
   },
   {
    "v": "0800414243",
    "src": "https://www.legrand.com/en/investors-and-shareholders/shareholders-corner/contact-us",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.legrand.com/en/investors-and-shareholders/contact-us",
   "https://www.legrand.com/en/contact",
   "https://www.legrand.com/en",
   "https://www.legrand.com/fr/investisseurs-et-actionnaires/contacts",
   "https://www.legrand.com/fr/contact",
   "https://www.legrand.com/en/investors-and-shareholders/shareholders-corner/contact-us"
  ],
  "note": ""
 },
 "belkin.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+18002235546",
    "src": "https://www.belkin.com/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.belkin.com/p/6-outlet-home%2Foffice-surge-protector-4-ft.-cord/BE106000-04.html",
   "https://www.belkin.com/p/7-outlet-home%2Foffice-surge-protector-6-cord/BE107200-06.html",
   "https://www.belkin.com/p/12-outlet-home%2Foffice-surge-protector-with-8-foot-cord/SRA009p12tt8.html",
   "https://www.belkin.com/p/6-outlet-home%2Foffice-surge-protector-rotating-plug-8-cord/BE106000-08R.html",
   "https://www.belkin.com/company/blog/docking-stations-to-power-your-apple-m4-macbook-pro/",
   "https://www.belkin.com/company/blog/belkin-enterprise-environments/",
   "https://www.belkin.com/company/blog/streamlining-government-operations-through-modern-tech/",
   "https://www.belkin.com/",
   "https://www.belkin.com/support-center",
   "https://www.belkin.com/p/usb-c-to-hdmi-adapter-supports-dolby-vision/F2CU038dsWHTAPL.html"
  ],
  "note": ""
 },
 "schurter.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "info.de@schurter.com",
    "src": "https://www.medica-tradefair.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.schurter.com/en/markets/automotive/emc-measurement-service",
   "https://www.schurter.com/en/info-center/help-center",
   "https://www.schurter.com/en/info-center/support-tools",
   "https://www.schurter.com/en/info-center/support-tools/cross-reference",
   "https://www.schurter.com/en/info-center/support-tools/cad-drawings",
   "https://www.schurter.com/en/info-center/support-tools/track-and-trace",
   "https://www.schurter.com/en/info-center/support-tools/stock-check-distributors",
   "https://www.schurter.com/en",
   "https://www.schurter.com/de/maerkte/automobiltechnologie/emv-messservice",
   "https://www.schurter.com/en/info-center/support-tools/approvals",
   "https://www.schurter.com/en/contact",
   "https://www.schurter.com/en/about-us"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "wago.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+495718870",
    "src": "https://www.wago.com/global/contact",
    "kind": "tel"
   },
   {
    "v": "+4957188744222",
    "src": "https://www.wago.com/global/contact",
    "kind": "tel"
   },
   {
    "v": "+4957188744333",
    "src": "https://www.wago.com/global/contact",
    "kind": "tel"
   },
   {
    "v": "+4957188744630",
    "src": "https://www.wago.com/global/contact",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "order.de@wago.com",
    "src": "https://www.wago.com/global/contact"
   },
   {
    "v": "info.de@wago.com",
    "src": "https://www.wago.com/global/contact"
   },
   {
    "v": "sales.int@wago.com",
    "src": "https://www.wago.com/global/contact"
   },
   {
    "v": "support.de@wago.com",
    "src": "https://www.wago.com/global/contact"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.wago.com/global/contact",
   "https://www.wago.com/global/country-selection"
  ],
  "note": ""
 },
 "skf.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.skf.com/ph/contact",
   "https://www.skf.com/ph/contact-us",
   "https://www.skf.com/ph/contactus",
   "https://www.skf.com/ph/contacts",
   "https://www.skf.com/ph/contact-us/",
   "https://www.skf.com/ph/en/contact",
   "https://www.skf.com/ph/en/contact-us",
   "https://www.skf.com/ph",
   "https://www.skf.com/ph/contact-us/favicon.ico",
   "https://www.skf.com/ph/contact-us/apple-touch-icon.png",
   "https://www.skf.com/ph/contact-us/icon-96.png",
   "https://www.skf.com/ph/contact-us/favicon.svg"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "harman.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "(800) 645-7484",
    "src": "https://www.harman.com/contact-us",
    "kind": "text"
   },
   {
    "v": "+918043306300",
    "src": "https://www.harman.com/India/contact-us",
    "kind": "text"
   },
   {
    "v": "+918040976806",
    "src": "https://www.harman.com/India/contact-us",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.harman.com/contact-us",
   "https://www.harman.com/company",
   "https://www.harman.com/contact",
   "https://www.harman.com/contactus",
   "https://www.harman.com/India/contact-us",
   "https://www.harman.com/brasil/contact-us",
   "https://www.harman.com/japan/contact-us",
   "https://www.harman.com/"
  ],
  "note": ""
 },
 "nsk.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+81337797111",
    "src": "https://www.nsk.com/company/about-us/corporate-profile/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.nsk.com/products/ball-bearings/angular-contact-ball-bearings/",
   "https://www.nsk.com/products/super-precision-bearings/precision-angular-contact-bearings/",
   "https://www.nsk.com/products/super-precision-bearings/ball-screw-support-bearings/",
   "https://www.nsk.com/industries/office-equipment/",
   "https://www.nsk.com/company/",
   "https://www.nsk.com/company/about-us/",
   "https://www.nsk.com/company/about-us/corporate-profile/",
   "https://www.nsk.com/",
   "https://www.nsk.com/jp-ja/products/ball-bearings/angular-contact-ball-bearings/",
   "https://www.nsk.com/eu-en/products/bearings/ball-bearings/angular-contact-ball-bearings/",
   "https://www.nsk.com/eu-de/products/bearings/ball-bearings/angular-contact-ball-bearings/"
  ],
  "note": ""
 },
 "festo.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+49711347",
    "src": "https://corp.festo.com/en/imprint/index.html",
    "kind": "text"
   },
   {
    "v": "+497113472144",
    "src": "https://corp.festo.com/en/imprint/index.html",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@festo.com",
    "src": "https://sps.mesago.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [
   "https://festo.com/contact",
   "https://festo.com/kontakt",
   "https://festo.com/kontakt/",
   "https://festo.com/",
   "https://festo.com/impressum",
   "https://festo.com/imprint",
   "https://corp.festo.com/en/imprint/index.html",
   "https://festo.com/contact-us",
   "https://festo.com/contactus",
   "https://festo.com/en/contact",
   "https://festo.com/en/contact-us"
  ],
  "note": "已读取官网 4 个页面，未检索到公开职能联系方式"
 },
 "dmgmori.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "400 820 0969",
    "src": "https://cn.dmgmori.com.cn/?redirect=i/contact",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://cn.dmgmori.com.cn/?redirect=i/contact",
   "https://cn.dmgmori.com.cn/?redirect=i/contact-us",
   "https://cn.dmgmori.com.cn/?redirect=i/contactus",
   "https://cn.dmgmori.com.cn/?redirect=i/contacts",
   "https://cn.dmgmori.com.cn/?redirect=i/contact-us/",
   "https://cn.dmgmori.com.cn/?redirect=i/en/contact",
   "https://cn.dmgmori.com.cn/?redirect=i/en/contact-us",
   "https://cn.dmgmori.com.cn/?redirect=i",
   "https://cn.dmgmori.com.cn/?redirect=i/kontakt"
  ],
  "note": ""
 },
 "habasit.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "info@habasit.com",
    "src": "https://iffa.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [
   "https://habasit.com/en/Contact-us",
   "https://habasit.com/en/About-us",
   "https://habasit.com/en/About-us/Who-we-are",
   "https://habasit.com/en/About-us/Our-history",
   "https://habasit.com/en/About-us/Sustainability",
   "https://habasit.com/en/About-us/Quality",
   "https://habasit.com/en/About-us/Memberships",
   "https://habasit.com/",
   "https://habasit.com/assets/css/contact-map.css",
   "https://www.habasit.com/en/Contact-us",
   "https://habasit.com/en/About-us/Our-Locations",
   "https://www.habasit.com/en/About-us"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "kaeser.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+499561640124",
    "src": "https://www.kaeser.com/int-en/services/kaeser-report",
    "kind": "tel"
   },
   {
    "v": "+40212245688",
    "src": "https://www.kaeser.com/ro-ro/services",
    "kind": "tel"
   },
   {
    "v": "+40212245681",
    "src": "https://www.kaeser.com/ro-ro/services",
    "kind": "tel"
   },
   {
    "v": "+351252080441",
    "src": "https://www.kaeser.com/pt-pt/services",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info@kaeser.com",
    "src": "https://automechanika.messefrankfurt.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.kaeser.com/int-en/services",
   "https://www.kaeser.com/int-en/company",
   "https://www.kaeser.com/int-en/services/contact",
   "https://www.kaeser.com/int-en/services/kaeser-report",
   "https://www.kaeser.com/int-en/services/whitepaper",
   "https://www.kaeser.com/int-en/services/analysis-and-advice",
   "https://www.kaeser.com/int-en/services/news-and-dates",
   "https://www.kaeser.com/int-en",
   "https://www.kaeser.com/ro-ro/services",
   "https://www.kaeser.com/pt-pt/services",
   "https://www.kaeser.com/se-sv/services",
   "https://www.kaeser.com/no-no/services"
  ],
  "note": ""
 },
 "cuidevices.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "971-335-3648",
    "src": "https://www.sameskydevices.com:443/contact",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "6405 SW Rosewood St, Ste C Lake Oswego, OR 97035 1-877-323-3576",
    "src": "https://www.sameskydevices.com:443/contact",
    "kind": "tag"
   },
   {
    "v": "株式会社 Same Sky Japan 〒108-0071 東京都港区白金台2-11-8 永昌高輪台ビル8F Tel: 03-6721-9396 Fax: 03-6721-9397",
    "src": "https://www.sameskydevices.com:443/contact",
    "kind": "tag"
   }
  ],
  "pages": [
   "https://www.sameskydevices.com:443/contact",
   "https://www.sameskydevices.com:443/"
  ],
  "note": ""
 },
 "atlascopco.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.atlascopco.com/"
  ],
  "note": "已读取官网 1 个页面，未检索到公开职能联系方式"
 },
 "makita.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://makita.com/"
  ],
  "note": "已读取官网 1 个页面，未检索到公开职能联系方式"
 },
 "hilti.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "18008798000",
    "src": "https://www.hilti.com/c/CLS_MODULAR_SUPPORT_SYSTEM",
    "kind": "jsonld"
   },
   {
    "v": "(800) 879-8000",
    "src": "https://www.hilti.com/content/hilti/W1/US/en/support/support/ad-rental-locations.html",
    "kind": "text"
   },
   {
    "v": "(800)-879-5000",
    "src": "https://www.hilti.com/content/hilti/W1/US/en/support/support/ad-rental-locations.html",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.hilti.com/c/CLS_MODULAR_SUPPORT_SYSTEM",
   "https://www.hilti.com/c/CLS_SERVICES",
   "https://www.hilti.com/content/resources/tool-support/local/warranty",
   "https://www.hilti.com/c/CLS_SERVICES/CLS_LOGISTICS_ADMIN",
   "https://www.hilti.com/c/CLS_SERVICES/CLS_TRAININGS",
   "https://www.hilti.com/content/company/press-releases",
   "https://www.hilti.com/content/resources/tool-support/local/trade-in-program",
   "https://www.hilti.com/",
   "https://www.hilti.com/content/resources/tool-support/local/tool-repair",
   "https://www.hilti.com/content/resources/faqs/local/support-hilti-online",
   "https://www.hilti.com/content/resources/sales-channels/customer-service",
   "https://www.hilti.com/content/hilti/W1/US/en/support/support/ad-rental-locations.html",
   "https://www.hilti.com/content/company/about-hilti",
   "https://www.hilti.com/content/hilti/W1/US/en/company/company/about-hilti/sustainability.html",
   "https://www.hilti.com/content/hilti/W1/US/en/support/support/help-center.html"
  ],
  "note": ""
 },
 "wirtgen.de": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.wirtgen-group.com/wirtgen/kontakt.php",
   "https://www.wirtgen-group.com/wirtgen/"
  ],
  "note": "已读取官网 2 个页面，未检索到公开职能联系方式"
 },
 "tracopower.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+6568441660",
    "src": "https://www.tracopower.com/int/contact",
    "kind": "text"
   },
   {
    "v": "+6568441659",
    "src": "https://www.tracopower.com/int/contact",
    "kind": "text"
   },
   {
    "v": "+41433114511",
    "src": "https://www.tracopower.com/int/contact",
    "kind": "text"
   },
   {
    "v": "+41433114545",
    "src": "https://www.tracopower.com/int/contact",
    "kind": "text"
   },
   {
    "v": "+861063322248",
    "src": "https://www.tracopower.com/int/contact",
    "kind": "text",
    "loc": "CN"
   },
   {
    "v": "+862161677266",
    "src": "https://www.tracopower.com/int/contact",
    "kind": "text",
    "loc": "CN"
   },
   {
    "v": "+8675523676366",
    "src": "https://www.tracopower.com/int/contact",
    "kind": "text",
    "loc": "CN"
   },
   {
    "v": "+8675523676367",
    "src": "https://www.tracopower.com/int/contact",
    "kind": "text",
    "loc": "CN"
   }
  ],
  "emails": [
   {
    "v": "marketing@tracopower.com",
    "src": "https://www.tracopower.com/int/contact"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.tracopower.com/int/contact",
   "https://www.tracopower.com/int/about-traco-power-1",
   "https://www.tracopower.com/int/locations",
   "https://www.tracopower.com/int/contact/europe",
   "https://www.tracopower.com/int/contact/americas",
   "https://www.tracopower.com/int/contact/asia-pacific",
   "https://www.tracopower.com/int/contact/middle-east",
   "https://www.tracopower.com/int"
  ],
  "note": ""
 },
 "gearwrench.com": {
  "dm": "gearwrench.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "18776263433",
    "src": "https://www.gearwrench.com/support",
    "kind": "jsonld"
   },
   {
    "v": "(980) 441-4068",
    "src": "https://www.gearwrench.com/terms-service",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "support@gearwrench.com",
    "src": "https://www.gearwrench.com/support"
   }
  ],
  "addr": [
   {
    "v": "910 Ridgebrook Road, 21152, Suite 200 Sparks, Maryland, USA",
    "src": "https://www.gearwrench.com/support",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.gearwrench.com/support",
   "https://www.gearwrench.com/support/gearwrench-sema",
   "https://www.gearwrench.com/terms-service",
   "https://www.gearwrench.com/support",
   "https://www.gearwrench.com/",
   "https://www.gearwrench.com/"
  ],
  "note": ""
 },
 "fischer.de": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+497443124361",
    "src": "https://www.fischer.de/de-de/service/academy?_tab=Seminare&amp;Zielgruppe=Planer+%26+Statiker",
    "kind": "text"
   },
   {
    "v": "+497443126879",
    "src": "https://www.fischer.de/de-de/service/academy?_tab=Seminare&amp;Zielgruppe=Planer+%26+Statiker",
    "kind": "text"
   },
   {
    "v": "+497443126108",
    "src": "https://www.fischer.de/de-de/service/academy?_tab=Seminare&amp;Zielgruppe=Planer+%26+Statiker",
    "kind": "text"
   },
   {
    "v": "+4974436879",
    "src": "https://www.fischer.de/de-de/service/academy?_tab=Seminare&amp;Zielgruppe=Planer+%26+Statiker",
    "kind": "text"
   },
   {
    "v": "+497443120",
    "src": "https://www.fischer.de/de-de/project-business/planer-ingenieure?utm_source=google&utm_medium=banner&utm_campaign=fixperience",
    "kind": "tel"
   },
   {
    "v": "07443124000",
    "src": "https://www.fischer.de/de-de/project-business/planer-ingenieure?utm_source=google&utm_medium=banner&utm_campaign=fixperience",
    "kind": "tel"
   },
   {
    "v": "+497443126000",
    "src": "https://www.fischer.de/de-de/project-business/planer-ingenieure?utm_source=google&utm_medium=banner&utm_campaign=fixperience",
    "kind": "tel"
   },
   {
    "v": "+497443124000",
    "src": "https://www.fischer.de/de-de/project-business/planer-ingenieure?utm_source=google&utm_medium=banner&utm_campaign=fixperience",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info@fischer.de",
    "src": "https://ish.messefrankfurt.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.fischer.de/de-de/service/academy?_tab=Seminare&amp;Zielgruppe=Planer+%26+Statiker",
   "https://www.fischer.de/de-de/service/academy",
   "https://www.fischer.de/de-de/kontakt",
   "https://www.fischer.de/de-de/service/newsletter",
   "https://www.fischer.de/de-de/service/handel/haendlersuche",
   "https://www.fischer.de/de-de/service/infos-und-updates/informationsmaterial",
   "https://www.fischer.de/de-de/rechtliches/impressum",
   "https://www.fischer.de/de-de",
   "https://www.fischer.de/dist/fischer-website-rebrush/css/ContactFi-Bq_r5Jth.css",
   "https://www.fischer.de/dist/fischer-website-rebrush/css/ContactDetailsFi-BksDxdSN.css",
   "https://www.fischer.de/de-de/service",
   "https://www.fischer.de/-/media/fixing-systems/rebrush/fide/lieferservice-2025.pdf",
   "https://www.fischer.de/de-de/project-business/planer-ingenieure?utm_source=google&utm_medium=banner&utm_campaign=fixperience"
  ],
  "note": ""
 },
 "strongtie.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "(209) 234-3868",
    "src": "https://www.strongtie.com/about/locations",
    "kind": "text"
   },
   {
    "v": "(209) 234-7775",
    "src": "https://www.strongtie.com/about/locations",
    "kind": "text"
   },
   {
    "v": "+33251284477",
    "src": "https://www.strongtie.com/about/locations",
    "kind": "text",
    "loc": "FR"
   },
   {
    "v": "+33251284478",
    "src": "https://www.strongtie.com/about/locations",
    "kind": "text",
    "loc": "FR"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.strongtie.com/contact",
   "https://www.strongtie.com/",
   "https://www.strongtie.com/about",
   "https://www.strongtie.com/about/locations",
   "https://www.strongtie.com/solutions/software/professional-services",
   "https://www.strongtie.com/about/upcoming-shows-and-events",
   "https://www.strongtie.com/about/missionvisionvalues"
  ],
  "note": "已读取官网 2 个页面，未检索到公开职能联系方式"
 },
 "wera.de": {
  "dm": "wera.de",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+4902024045",
    "src": "https://www.wera.de/de/service-hilfe/datenschutzerklaerung",
    "kind": "text"
   },
   {
    "v": "+4920240450",
    "src": "https://www.wera.de/de/service-hilfe/impressum",
    "kind": "tel"
   },
   {
    "v": "351 880 5577",
    "src": "https://www.wera.de/de/service-hilfe/haendler-finden",
    "kind": "text"
   },
   {
    "v": "+4935149282",
    "src": "https://www.wera.de/de/service-hilfe/haendler-finden",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@wera.de",
    "src": "https://www.wera.de/de/service-hilfe/datenschutzerklaerung"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.wera.de/de/unternehmen/kontakt",
   "https://www.wera.de/de/service-hilfe",
   "https://www.wera.de/de/service-hilfe/datenschutzerklaerung",
   "https://www.wera.de/de/service-hilfe/impressum",
   "https://www.wera.de/de/service-hilfe/haendler-finden",
   "https://www.wera.de/de/service-hilfe/vertriebspartner",
   "https://www.wera.de/de/"
  ],
  "note": ""
 },
 "irwin.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.irwintools.com/contact",
   "https://www.irwintools.com/kontakt.html",
   "https://www.irwintools.com/"
  ],
  "note": "已读取官网 3 个页面，未检索到公开职能联系方式"
 },
 "basf.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+63288118001",
    "src": "https://www.basf.com/ph/en/who-we-are/sites-and-contacts",
    "kind": "tel"
   },
   {
    "v": "+634950113580179",
    "src": "https://www.basf.com/ph/en/who-we-are/sites-and-contacts",
    "kind": "tel"
   },
   {
    "v": "+63288381025",
    "src": "https://www.basf.com/ph/en/who-we-are/sites-and-contacts",
    "kind": "text"
   },
   {
    "v": "+63495011358",
    "src": "https://www.basf.com/ph/en/who-we-are/sites-and-contacts",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "jobs@basf.com",
    "src": "https://www.basf.com/global/en/legal/contact"
   },
   {
    "v": "global.info@basf.com",
    "src": "https://www.basf.com/global/en/legal/contact"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.basf.com/ph/en/legal/contact",
   "https://www.basf.com/global/en/who-we-are/organization/group-companies/BASF_Renewable-Energy-GmbH/company",
   "https://www.basf.com/ph/en/who-we-are/sites-and-contacts",
   "https://www.basf.com/ph/en",
   "https://www.basf.com/global/en/who-we-are/organization/group-companies/BASF_Renewable-Energy-GmbH/contact",
   "https://www.basf.com/global/en/who-we-are/organization/locations",
   "https://www.basf.com/global/en/legal/contact"
  ],
  "note": ""
 },
 "clariant.com": {
  "dm": "clariant.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+41614695111",
    "src": "https://www.clariant.com/en/Meta-Nav/Imprint",
    "kind": "text"
   },
   {
    "v": "+41614696512",
    "src": "https://www.clariant.com/en/Meta-Nav/Imprint",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@clariant.com",
    "src": "https://www.clariant.com/en/Meta-Nav/Imprint"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.clariant.com/en/Company",
   "https://www.clariant.com/en/Company/Conrad-Keijzer-Opinion-Piece-Handelsblatt",
   "https://www.clariant.com/en/Corporate/Blog/2026-Blog-Posts/04/How-Clariant-helps-mining-producers-deliver-more-copper-for-the-energy-transition",
   "https://www.clariant.com/en/Corporate/Blog/2026-Blog-Posts/02/Clariant-Oil-Services",
   "https://www.clariant.com/en/Meta-Nav/Imprint",
   "https://www.clariant.com/en/Corporate"
  ],
  "note": ""
 },
 "lanxess.com": {
  "dm": "lanxess.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+375447500400",
    "src": "https://lanxess.com/en/company/organization",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@lanxess.com",
    "src": "https://lanxess.com/"
   }
  ],
  "addr": [],
  "pages": [
   "https://lanxess.com/en/company/contact/contact-us",
   "https://lanxess.com/en/company",
   "https://lanxess.com/en/company/about-us",
   "https://lanxess.com/en/company/organization",
   "https://lanxess.com/en/company/energizing-sustainability",
   "https://lanxess.com/en/company/trade-fairs-and-webinars",
   "https://lanxess.com/"
  ],
  "note": ""
 },
 "wacker.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.wacker.com/contact",
   "https://www.wacker.com/contact-us",
   "https://www.wacker.com/contactus",
   "https://www.wacker.com/contacts",
   "https://www.wacker.com/contact-us/",
   "https://www.wacker.com/en/contact",
   "https://www.wacker.com/en/contact-us",
   "https://www.wacker.com/"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "arkema.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+33149007463",
    "src": "https://www.arkema.com/global/en/investor-relations/ir-contacts/",
    "kind": "text"
   },
   {
    "v": "+33681874877",
    "src": "https://www.arkema.com/global/en/media/media-contact/",
    "kind": "tel"
   },
   {
    "v": "+33149007007",
    "src": "https://www.arkema.com/global/en/media/media-contact/",
    "kind": "tel"
   },
   {
    "v": "+331490038",
    "src": "https://www.arkema.com/global/en/all-arkema-locations/",
    "kind": "text"
   },
   {
    "v": "146 957 2464",
    "src": "https://www.arkema.com/global/en/all-arkema-locations/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.arkema.com/global/en/investor-relations/ir-contacts/",
   "https://www.arkema.com/global/en/media/media-contact/",
   "https://www.arkema.com/global/en/websites-and-locations/",
   "https://www.arkema.com/global/en/all-arkema-locations/",
   "https://www.arkema.com/global/en/products/services/",
   "https://www.arkema.com/global/en/",
   "https://www.arkema.com/global/fr/investor-relations/ir-contacts/"
  ],
  "note": ""
 },
 "eastman.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "3235685111",
    "src": "https://www.eastman.com/en/who-we-are/locations",
    "kind": "tel"
   },
   {
    "v": "3292436211",
    "src": "https://www.eastman.com/en/who-we-are/locations",
    "kind": "tel"
   },
   {
    "v": "3292541411",
    "src": "https://www.eastman.com/en/who-we-are/locations",
    "kind": "tel"
   },
   {
    "v": "3723325900",
    "src": "https://www.eastman.com/en/who-we-are/locations",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "37662, Kingsport, TN, USA",
    "src": "https://www.eastman.com/en/who-we-are/our-organization/company-profile",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.eastman.com/en/who-we-are/our-organization/company-profile",
   "https://www.eastman.com/en/who-we-are/locations",
   "https://www.eastman.com/en/sustainability/environmental/circularity/site-locations",
   "https://www.eastman.com/en/sustainability/environmental/circularity/site-locations/tennessee-site",
   "https://www.eastman.com/en/sustainability/environmental/circularity/site-locations/france-site",
   "https://www.eastman.com/en/sustainability/environmental/circularity/circular-contact-us",
   "https://www.eastman.com/en/careers/featured-locations",
   "https://www.eastman.com/en",
   "https://www.eastman.com/fr/who-we-are/our-organization/company-profile",
   "https://www.eastman.com/es/who-we-are/our-organization/company-profile",
   "https://www.eastman.com/en/media-center/media-contacts",
   "https://www.eastman.com/en/contact-us"
  ],
  "note": ""
 },
 "evonik.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "info@evonik.com",
    "src": "https://formnext.mesago.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [
   {
    "v": "Opernplatz 1, 45128, Essen, DE",
    "src": "https://www.evonik.com/en.html",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.evonik.com/en/company/about-evonik.html",
   "https://www.evonik.com/en/company/we-go-beyond.html",
   "https://www.evonik.com/en/company/purpose.html",
   "https://www.evonik.com/en/company/Innovation.html",
   "https://www.evonik.com/en/company/aerospace-and-defense.html",
   "https://www.evonik.com/en/company/circular-economy.html",
   "https://www.evonik.com/en/company/BVB.html",
   "https://www.evonik.com/en.html",
   "https://www.evonik.com/de/unternehmen/about-evonik.html",
   "https://login.evonik.com/nidp//app/login?target=https%3A%2F%2Flogin.evonik.com%2Fnidp%2Foauth%2Fnam%2Fauthz%3Fresponse_type%3Dcode%26client_id%3D6003149e-d113-48d6-9918-9e46b7a447bf%26redirect_uri%3Dhttps%3A%2F%2Fwww.evonik.com%2Fcallback%2Fj_security_check%26scope%3Daem%26state%3D%7B%22n%22%3A%22uga0phipiip28tv52c929tt85l%22%2C%22r%22%3A%22%22%7D&id=Login",
   "https://www.evonik.com/en/company/history.html",
   "https://www.evonik.com/en/company/executive-board.html"
  ],
  "note": ""
 },
 "mcgc.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "0367487300",
    "src": "https://www.mcgc.com/group/outline/mcc/location/index.html",
    "kind": "tel"
   },
   {
    "v": "0764371500",
    "src": "https://www.mcgc.com/group/outline/mcc/location/plant.html",
    "kind": "tel"
   },
   {
    "v": "0463865350",
    "src": "https://www.mcgc.com/group/outline/mcc/location/plant.html",
    "kind": "tel"
   },
   {
    "v": "0455011241",
    "src": "https://www.mcgc.com/group/outline/mcc/location/plant.html",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.mcgc.com/contact/pdf/mcg_jp.pdf",
   "https://www.mcgc.com/group/outline/mcc/location/index.html",
   "https://www.mcgc.com/group/outline/mcc/location/plant.html",
   "https://www.mcgc.com/group/outline/mcc/location/rd.html",
   "https://www.mcgc.com/ir/contact.html",
   "https://www.mcgc.com/ir/stock_info/stock_services.html",
   "https://www.mcgc.com/contact/index.html",
   "https://www.mcgc.com/",
   "https://www.mcgc.com/group/outline/mcc/location/assets2023/css/style.css",
   "https://www.mcgc.com/group/outline/mcc/location/plant01_outline.html",
   "https://www.mcgc.com/group/outline/mcc/location/plant02_outline.html",
   "https://www.mcgc.com/group/outline/mcc/location/plant03_outline.html"
  ],
  "note": ""
 },
 "dic-global.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+6562240600",
    "src": "https://www.dic-global.com/ap/contact/",
    "kind": "text"
   },
   {
    "v": "+81367333000",
    "src": "https://www.dic-global.com/ap/about/outline.html",
    "kind": "text"
   },
   {
    "v": "+81662526161",
    "src": "https://www.dic-global.com/ap/about/outline.html",
    "kind": "text"
   },
   {
    "v": "+81662455239",
    "src": "https://www.dic-global.com/ap/about/outline.html",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.dic-global.com/ap/contact/",
   "https://www.dic-global.com/ap/about/",
   "https://www.dic-global.com/ap/about/top_message.html",
   "https://www.dic-global.com/ap/about/dicway.html",
   "https://www.dic-global.com/ap/about/outline.html",
   "https://www.dic-global.com/ap/about/officers.html",
   "https://www.dic-global.com/ap/about/group.html",
   "https://www.dic-global.com:443/ap/",
   "https://www.dic-global.com/ap/about/subsidiaries.html",
   "https://www.dic-global.com/ap/about/overseas.html"
  ],
  "note": ""
 },
 "ascendmaterials.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+3210608600",
    "src": "https://www.ascendmaterials.com/contact/locations",
    "kind": "tel"
   },
   {
    "v": "+17133155700",
    "src": "https://www.ascendmaterials.com/contact/locations",
    "kind": "tel"
   },
   {
    "v": "+12812284000",
    "src": "https://www.ascendmaterials.com/contact/locations",
    "kind": "tel"
   },
   {
    "v": "8334663878",
    "src": "https://www.ascendmaterials.com/contact/locations",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "1010 Travis St., Ste. 900, TX 77002, Texas, United States",
    "src": "https://www.ascendmaterials.com/about/sustainability",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.ascendmaterials.com/about/sustainability",
   "https://www.ascendmaterials.com/about",
   "https://www.ascendmaterials.com/about/health-and-safety",
   "https://www.ascendmaterials.com/about/values",
   "https://www.ascendmaterials.com/about/history",
   "https://www.ascendmaterials.com/about/leadership-team",
   "https://www.ascendmaterials.com/innovation-and-technology/application-development/chemical-support",
   "https://www.ascendmaterials.com/",
   "https://www.ascendmaterials.com/innovation-and-technology/application-development/fiber-and-textile-lab-services",
   "https://www.ascendmaterials.com/about/newsroom",
   "https://www.ascendmaterials.com/contact/locations",
   "https://www.ascendmaterials.com/contact"
  ],
  "note": ""
 },
 "kuraray.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.kuraray.com/global-en/company/",
   "https://www.kuraray.com/global-en/company/overview/",
   "https://www.kuraray.com/global-en/company/president/",
   "https://www.kuraray.com/global-en/company/philosophy/",
   "https://www.kuraray.com/global-en/company/directors/",
   "https://www.kuraray.com/global-en/company/organization/",
   "https://www.kuraray.com/global-en/company/history/",
   "https://www.kuraray.com/global-en/",
   "https://www.kuraray.com/jp-ja/company/",
   "https://www.kuraray.com/eu-en/company/",
   "https://www.kuraray.com/eu-de/company/"
  ],
  "note": "已读取官网 11 个页面，未检索到公开职能联系方式"
 },
 "siemens-healthineers.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.siemens-healthineers.com/products-services",
   "https://www.siemens-healthineers.com/company",
   "https://www.siemens-healthineers.com/services/value-partnerships",
   "https://www.siemens-healthineers.com/services",
   "https://www.siemens-healthineers.com/support-documentation/cybersecurity",
   "https://www.siemens-healthineers.com/support-documentation/ecommerce",
   "https://www.siemens-healthineers.com/services/it-standards",
   "https://www.siemens-healthineers.com/",
   "https://www.siemens-healthineers.com/how-can-we-help-you",
   "https://www.siemens-healthineers.com/support-documentation",
   "https://www.siemens-healthineers.com/about"
  ],
  "note": "已读取官网 11 个页面，未检索到公开职能联系方式"
 },
 "gehealthcare.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "1-800-437-1171",
    "src": "https://www.gehealthcare.com/en-us/services",
    "kind": "text"
   },
   {
    "v": "877-305-9677",
    "src": "https://www.gehealthcare.com/en-us/support/site-planning",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.gehealthcare.com/en-us/services/patient-care-solutions",
   "https://www.gehealthcare.com/en-us/products/molecular-imaging-agents/pharma-services",
   "https://www.gehealthcare.com/en-us/services/cybersecurity",
   "https://www.gehealthcare.com/en-us/services/financial-services",
   "https://www.gehealthcare.com/en-us/services",
   "https://www.gehealthcare.com/en-us/services/service-agreements",
   "https://www.gehealthcare.com/en-us/services/mtas",
   "https://www.gehealthcare.com/en-us",
   "https://www.gehealthcare.com/en-us/services/mtas/playbook-resources",
   "https://www.gehealthcare.com/en-us/services/mtas/stratum",
   "https://www.gehealthcare.com/en-us/services/predictive-services",
   "https://www.gehealthcare.com/en-us/support/site-planning"
  ],
  "note": ""
 },
 "medtronic.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "400-820-0869",
    "src": "https://www.medtronic.com/cn-zh/your-health/patient-services.html",
    "kind": "text"
   },
   {
    "v": "400-820-1981",
    "src": "https://www.medtronic.com/cn-zh/your-health/patient-services.html",
    "kind": "text"
   },
   {
    "v": "400-820-6787",
    "src": "https://www.medtronic.com/cn-zh/your-health/patient-services.html",
    "kind": "text"
   },
   {
    "v": "800-820-1981",
    "src": "https://www.medtronic.com/cn-zh/your-health/patient-services.html",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.medtronic.com/contact-us",
   "https://www.medtronic.com/contact-us/",
   "https://www.medtronic.com/",
   "https://global.medtronic.com/xg-en/about/hong-kong.html",
   "https://global.medtronic.com/xg-en/about/taiwan.html",
   "https://www.medtronic.com/cn-zh/your-health/patient-services.html",
   "https://www.medtronic.com/cn-zh/our-company.html",
   "https://www.medtronic.com/cn-zh/our-company/key-facts.html",
   "https://www.medtronic.com/cn-zh/our-company/leadership.html"
  ],
  "note": "已读取官网 3 个页面，未检索到公开职能联系方式"
 },
 "baxter.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "18004229837",
    "src": "https://www.baxter.com/contact-us",
    "kind": "tel"
   },
   {
    "v": "12249481812",
    "src": "https://www.baxter.com/contact-us",
    "kind": "tel"
   },
   {
    "v": "18003878399",
    "src": "https://www.baxter.com/contact-us",
    "kind": "tel"
   },
   {
    "v": "19053696000",
    "src": "https://www.baxter.com/contact-us",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.baxter.com/contact-us",
   "https://www.baxter.com/locations",
   "https://www.baxter.com/about-baxter",
   "https://www.baxter.com/about-baxterpages/sustainability",
   "https://www.baxter.com/about-baxter/culture-mission-vision",
   "https://www.baxter.com/about-baxter/our-evolution",
   "https://www.baxter.com/about-baxter/governance",
   "https://www.baxter.com/",
   "https://www.baxter.com/about-baxter/leadership",
   "https://www.baxter.com/about-baxter/partners-suppliers",
   "https://www.baxter.com/about-baxter/our-evolution/affiliated-brands",
   "https://www.baxter.com/about-baxterquick-links/sustainability-report"
  ],
  "note": ""
 },
 "zimmerbiomet.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "18003482759",
    "src": "https://www.zimmerbiomet.com/en/support.html",
    "kind": "tel"
   },
   {
    "v": "18006136131",
    "src": "https://www.zimmerbiomet.com/en/support.html",
    "kind": "jsonld"
   },
   {
    "v": "8669460444",
    "src": "https://www.zimmerbiomet.com/en/support/reimbursement.html",
    "kind": "tel"
   },
   {
    "v": "410-582-6161",
    "src": "https://www.zimmerbiomet.com/en/support/reimbursement.html",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.zimmerbiomet.com/en/support.html",
   "https://www.zimmerbiomet.com/en/support/reimbursement.html",
   "https://www.zimmerbiomet.com/en/about-us/contact-us/service-solutions.html",
   "https://www.zimmerbiomet.com/en/about-us/company-overview.html",
   "https://www.zimmerbiomet.com/en/about-us/leadership.html",
   "https://www.zimmerbiomet.com/en/about-us/our-impact.html",
   "https://www.zimmerbiomet.com/en/about-us/contact-us.html",
   "https://www.zimmerbiomet.com/en",
   "https://www.zimmerbiomet.com/en/support/medical-affiars.html",
   "https://www.zimmerbiomet.com/en/support/product-compatibility.html",
   "https://www.zimmerbiomet.com/en/support/mri.html",
   "https://www.zimmerbiomet.com/en/support/safety-data-sheets.html"
  ],
  "note": ""
 },
 "stryker.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+12693852600",
    "src": "https://www.stryker.com/us/en/about/contact.html",
    "kind": "text"
   },
   {
    "v": "+12693892300",
    "src": "https://www.stryker.com/us/en/about/contact.html",
    "kind": "text"
   },
   {
    "v": "+861065261295",
    "src": "https://www.stryker.com/us/en/about/contact.html",
    "kind": "text"
   },
   {
    "v": "+861065130255",
    "src": "https://www.stryker.com/us/en/about/contact.html",
    "kind": "text"
   },
   {
    "v": "269 385 2600",
    "src": "https://www.stryker.com/us/en/about/contact.html",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.stryker.com/us/en/about/contact.html",
   "https://www.stryker.com/contact",
   "https://www.stryker.com/contact-us",
   "https://www.stryker.com/",
   "https://www.stryker.com/ar/es/about/contact.html",
   "https://www.stryker.com/ar/en/about/contact.html",
   "https://www.stryker.com/au/en/about/contact.html",
   "https://www.stryker.com/at/en/about/contact.html"
  ],
  "note": ""
 },
 "wiha.com": {
  "dm": "wiha.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+41817506030",
    "src": "https://wiha.com/company/wiha-worldwide/locations",
    "kind": "text",
    "loc": "CH"
   },
   {
    "v": "+41817506039",
    "src": "https://wiha.com/company/wiha-worldwide/locations",
    "kind": "text",
    "loc": "CH"
   },
   {
    "v": "+48587623903",
    "src": "https://wiha.com/company/wiha-worldwide/locations",
    "kind": "text",
    "loc": "PL"
   },
   {
    "v": "+84280370938",
    "src": "https://wiha.com/company/wiha-worldwide/locations",
    "kind": "text",
    "loc": "VN"
   }
  ],
  "emails": [
   {
    "v": "info.de@wiha.com",
    "src": "https://wiha.com/company/about-wiha"
   },
   {
    "v": "purchase.pl@wiha.com",
    "src": "https://wiha.com/company/wiha-worldwide/locations"
   }
  ],
  "addr": [],
  "pages": [
   "https://wiha.com/company/about-wiha",
   "https://wiha.com/knowledge/support",
   "https://wiha.com/company/about-wiha/history",
   "https://wiha.com/company/about-wiha/compliance",
   "https://wiha.com/company/wiha-worldwide",
   "https://wiha.com/company/wiha-worldwide/find-a-dealer",
   "https://wiha.com/company/wiha-worldwide/locations",
   "https://wiha.com/"
  ],
  "note": ""
 },
 "bessey.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "未检索到公开准确信息"
 },
 "hartmann.info": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.hartmann.info/contact",
   "https://www.hartmann.info/contact-us",
   "https://www.hartmann.info/contactus",
   "https://www.hartmann.info/contacts",
   "https://www.hartmann.info/contact-us/",
   "https://www.hartmann.info/en/contact",
   "https://www.hartmann.info/kontakt",
   "https://www.hartmann.info/",
   "https://www.hartmann.info/en/products/brands/dermaplast/dermaplast-active-ready-with-support",
   "https://www.hartmann.info/en/products/brands/sterillium/contact",
   "https://www.hartmann.info/en/products/wound-management/contact-layers",
   "https://www.hartmann.info/en/products/wound-management/contact-layers/impregnated-contact-layers"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "sma.de": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+3215286730",
    "src": "https://www.sma.de/kontakt/service-kontakte",
    "kind": "tel"
   },
   {
    "v": "+56228202101",
    "src": "https://www.sma.de/kontakt/service-kontakte",
    "kind": "tel"
   },
   {
    "v": "+61294914200",
    "src": "https://www.sma.de/kontakt/service-kontakte",
    "kind": "tel"
   },
   {
    "v": "+8801713477822",
    "src": "https://www.sma.de/kontakt/service-kontakte",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info@sma.de",
    "src": "https://light-building.messefrankfurt.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.sma.de/service/downloads",
   "https://www.sma.de/kontakt/kontakt",
   "https://www.sma.de/kontakt/service-kontakte",
   "https://www.sma.de/kontakt/fachhandwerkersuche",
   "https://www.sma.de/kontakt/handelspartner",
   "https://www.sma.de/unternehmen/ueber-sma",
   "https://www.sma.de/unternehmen/vorstand-aufsichtsrat",
   "https://www.sma.de/",
   "https://www.sma.de/en/service/downloads",
   "https://www.sma.de/fr/service/telechargements",
   "https://www.sma.de/es/service/descargas",
   "https://www.sma.de/unternehmen/group-compliance"
  ],
  "note": ""
 },
 "enphase.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "180013200138",
    "src": "https://enphase.com/en-ph/contact-enphase-support",
    "kind": "tel"
   },
   {
    "v": "80060001",
    "src": "https://enphase.com/en-ph/contact-us",
    "kind": "tel"
   },
   {
    "v": "80085850",
    "src": "https://enphase.com/en-ph/contact-us",
    "kind": "tel"
   },
   {
    "v": "800050454",
    "src": "https://enphase.com/en-ph/contact-us",
    "kind": "tel"
   },
   {
    "v": "880000204",
    "src": "https://enphase.com/en-ph/contact-us",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "support_emea@enphase.com",
    "src": "https://enphase.com/en-ph/contact-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://enphase.com/en-ph/support/homeowners",
   "https://enphase.com/en-ph/support",
   "https://enphase.com/en-ph/contact-enphase-support",
   "https://enphase.com/en-ph/contact-us",
   "https://enphase.com/about-us",
   "https://enphase.com/en-ph/company/sustainability",
   "https://enphase.com/en-ph"
  ],
  "note": ""
 },
 "fronius.com": {
  "dm": "fronius.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+4372422410",
    "src": "https://www.fronius.com/en/about-us",
    "kind": "tel"
   },
   {
    "v": "+4372422414200",
    "src": "https://www.fronius.com/en/about-us/career/jobs-at-fronius",
    "kind": "tel"
   },
   {
    "v": "+4372422414007",
    "src": "https://www.fronius.com/en/about-us/career/jobs-at-fronius",
    "kind": "text"
   },
   {
    "v": "+4372422411126",
    "src": "https://www.fronius.com/en/about-us/career/jobs-at-fronius",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "contact@fronius.com",
    "src": "https://www.fronius.com/en/about-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.fronius.com/en/about-us",
   "https://www.fronius.com/en/about-us/updates/news-and-press",
   "https://www.fronius.com/en/about-us/career/jobs-at-fronius",
   "https://www.fronius.com/en/help-center",
   "https://www.fronius.com/en/help-center/solar-energy",
   "https://www.fronius.com/en/help-center/welding",
   "https://www.fronius.com/en"
  ],
  "note": ""
 },
 "lohmann-rauscher.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.lohmann-rauscher.com/en/company/who-we-are",
   "https://www.lohmann-rauscher.com/en/company/who-we-are/our-vision-and-mission",
   "https://www.lohmann-rauscher.com/en/company/who-we-are/people",
   "https://www.lohmann-rauscher.com/en/company/who-we-are/executive-board",
   "https://www.lohmann-rauscher.com/en/company/who-we-are/facts-figures",
   "https://www.lohmann-rauscher.com/en/company/who-we-are/history",
   "https://www.lohmann-rauscher.com/en/company/where-we-are",
   "https://www.lohmann-rauscher.com/en/",
   "https://www.lohmann-rauscher.com/en/company/sustainability",
   "https://www.lohmann-rauscher.com/en/company/sustainability/sustainability-report",
   "https://www.lohmann-rauscher.com/en/company/sustainability/financial-sustainability"
  ],
  "note": "已读取官网 11 个页面，未检索到公开职能联系方式"
 },
 "bbraun.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+12025550123",
    "src": "https://www.bbraun.com/en/products-and-solutions/solutions/technical-service.html",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.bbraun.com/en/products-and-solutions/solutions/technical-service.html",
   "https://www.bbraun.com/en/patient-care/services.html",
   "https://www.bbraun.com/en/patient-care/services/home-care.html",
   "https://www.bbraun.com/en/patient-care/services/hip-knee-and-spine-surgery.html",
   "https://www.bbraun.com/en/patient-care/services/care-and-dialysis-centers.html",
   "https://www.bbraun.com/en/patient-care/services/infection-in-hospital.html",
   "https://www.bbraun.com/en/about-us/company.html",
   "https://www.bbraun.com/en.html",
   "https://www.bbraun.com/en/about-us/company/facts-and-figures.html",
   "https://www.bbraun.com/en/about-us/company/stories.html",
   "https://www.bbraun.com/en/about-us/company/vision-and-values.html",
   "https://www.bbraun.com/en/about-us/company/brand.html"
  ],
  "note": ""
 },
 "sonnen.de": {
  "dm": "sonnen.de",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+49830492933400",
    "src": "https://www.sonnen.de/impressum",
    "kind": "text"
   },
   {
    "v": "+49830492933401",
    "src": "https://www.sonnen.de/impressum",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@sonnen.de",
    "src": "https://www.sonnen.de/impressum"
   }
  ],
  "addr": [
   {
    "v": "Am Riedbach 1, 87499, Wildpoldsried, DE",
    "src": "https://www.sonnen.de/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.sonnen.de/kontakt",
   "https://www.sonnen.de/impressum",
   "https://www.sonnen.de/impressum",
   "https://www.sonnen.de/ueber-sonnen",
   "https://www.sonnen.de/"
  ],
  "note": ""
 },
 "victronenergy.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+491721869341",
    "src": "https://www.victronenergy.com/contact",
    "kind": "tel"
   },
   {
    "v": "+447540538060",
    "src": "https://www.victronenergy.com/contact",
    "kind": "tel"
   },
   {
    "v": "+34965221561",
    "src": "https://www.victronenergy.com/contact",
    "kind": "tel"
   },
   {
    "v": "+31365359700",
    "src": "https://www.victronenergy.com/contact",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "sales@victronenergy.com",
    "src": "https://www.victronenergy.com/contact"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.victronenergy.com/support",
   "https://www.victronenergy.com/support/warranty-and-repairs",
   "https://www.victronenergy.com/support-and-downloads/software",
   "https://www.victronenergy.com/support-and-downloads/manuals",
   "https://www.victronenergy.com/support-and-downloads/datasheets",
   "https://www.victronenergy.com/support-and-downloads/technical-information",
   "https://www.victronenergy.com/support-and-downloads/systems",
   "https://www.victronenergy.com/",
   "https://www.victronenergy.com/support-and-downloads/enclosures",
   "https://www.victronenergy.com/support-and-downloads/brochures",
   "https://www.victronenergy.com/support-and-downloads/certificates",
   "https://www.victronenergy.com/contact"
  ],
  "note": "已读取官网 11 个页面，未检索到公开职能联系方式"
 },
 "ibc-solar.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.ibc-solar.com/corporate/contact",
   "https://www.ibc-solar.com/contact",
   "https://www.ibc-solar.com/contact-us",
   "https://www.ibc-solar.com/"
  ],
  "note": "已读取官网 4 个页面，未检索到公开职能联系方式"
 },
 "baywa-re.com": {
  "dm": "baywa-re.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+4989383932",
    "src": "https://www.baywa-re.com/en/imprint",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@baywa-re.com",
    "src": "https://www.baywa-re.com/en/contact"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.baywa-re.com/en/contact",
   "https://www.baywa-re.com/en/company/company-information",
   "https://www.baywa-re.com/en/company/management-and-supervisory-board",
   "https://www.baywa-re.com/en/company/locations",
   "https://www.baywa-re.com/en/company/events",
   "https://www.baywa-re.com/en/imprint",
   "https://www.baywa-re.com/en"
  ],
  "note": ""
 },
 "bosch.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4971140040990",
    "src": "https://www.bosch.com/contact/",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@bosch.com",
    "src": "https://ish.messefrankfurt.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.bosch.com/contact/",
   "https://www.bosch.com/products-and-services/",
   "https://www.bosch.com/products-and-services/mobility/",
   "https://www.bosch.com/products-and-services/at-home/",
   "https://www.bosch.com/products-and-services/industry-and-trades/",
   "https://www.bosch.com/company/",
   "https://www.bosch.com/company/leadership/",
   "https://www.bosch.com/",
   "https://www.bosch.com/de/kontakt/"
  ],
  "note": ""
 },
 "krannich.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "zf.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.zf.com/mobile/en/products/products_services.html",
   "https://www.zf.com/mobile/en/company/divisions_business_units/div_aftermarket/div_aftermarket.html",
   "https://www.zf.com/mobile/en/company/divisions_business_units/research_development/stories/gollewski_interview.html",
   "https://www.zf.com/mobile/en/company/divisions_business_units/research_development/open_source/stories/open_vehicle_diagnostics.html",
   "https://www.zf.com/mobile/en/company/corporate_governance/compliance_the_right_way/compliance_index.html?pageLink=acc_117341_0",
   "https://www.zf.com/mobile/en/company/corporate_governance/compliance_the_right_way/compliance_index.html?pageLink=acc_117341_1",
   "https://www.zf.com/mobile/en/company/corporate_governance/compliance_the_right_way/compliance_index.html?pageLink=trustline_acc_1_117351_0",
   "https://www.zf.com/mobile/en/homepage/homepage.html",
   "https://www.zf.com/mobile/de/products/products_services.html",
   "https://www.zf.com/mobile/en/products/products_services.html?pageLink=products_automotive_tm_1_1890591",
   "https://www.zf.com/mobile/en/products/products_services.html?pageLink=tm_cv_1_1890593",
   "https://www.zf.com/mobile/en/products/products_services.html?pageLink=text_with_media_1_1984277"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "valeo.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+33761528275",
    "src": "https://www.valeo.com/en/calendar-media-contacts/",
    "kind": "text"
   },
   {
    "v": "+33632136915",
    "src": "https://www.valeo.com/en/calendar-media-contacts/",
    "kind": "text"
   },
   {
    "v": "+33762441785",
    "src": "https://www.valeo.com/en/calendar-media-contacts/",
    "kind": "text"
   },
   {
    "v": "+33612182600",
    "src": "https://www.valeo.com/en/calendar-media-contacts/",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "press-contact.mailbox@valeo.com",
    "src": "https://www.valeo.com/en/calendar-media-contacts/"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.valeo.com/en/valeo-service/",
   "https://www.valeo.com/en/valeo-answer-software-services/",
   "https://www.valeo.com/en/calendar-and-contacts/",
   "https://www.valeo.com/en/calendar-media-contacts/",
   "https://www.valeo.com/en/contact/",
   "https://www.valeo.com/en/",
   "https://www.valeo.com/en/catalogue/cda/tech-services/"
  ],
  "note": ""
 },
 "continental.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+495119381163",
    "src": "https://www.continental.com/en/investors/ir-contact/",
    "kind": "tel"
   },
   {
    "v": "+4951193812908",
    "src": "https://www.continental.com/en/investors/ir-contact/",
    "kind": "tel"
   },
   {
    "v": "+4951193812147",
    "src": "https://www.continental.com/en/investors/ir-contact/",
    "kind": "tel"
   },
   {
    "v": "+495119381880",
    "src": "https://www.continental.com/en/investors/ir-contact/",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.continental.com/en/press/press-contacts/",
   "https://www.continental.com/en/career/contact-faqs/",
   "https://www.continental.com/en/investors/ir-contact/",
   "https://www.continental.com/en/investors/about-us/",
   "https://www.continental.com/en/general/sustainability-contact-form/",
   "https://www.continental.com/en/company/",
   "https://www.continental.com/en/general/contact-us/",
   "https://www.continental.com/en/",
   "https://www.continental.com/cs-cz/pro-media/media-kontakty/",
   "https://www.continental.com/de/presse/presskontakte/",
   "https://www.continental-tires.com/mx/es/about-us/newsroom/"
  ],
  "note": ""
 },
 "segen.co.uk": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+443309000141",
    "src": "https://www.segen.co.uk/contact-us/open-an-account/",
    "kind": "tel",
    "loc": "GB"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.segen.co.uk/contact-us/open-an-account/",
   "https://www.segen.co.uk/about-us/",
   "https://www.segen.co.uk/contact-us/contact/",
   "https://segen.co.uk/about-us/",
   "https://www.segen.co.uk/news/free-palletised-collection-service-expanded/",
   "https://segen.co.uk/contact-us/open-an-account/",
   "https://www.segen.co.uk/"
  ],
  "note": "未检索到公开准确信息"
 },
 "magna.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.magna.com/company/company-information",
   "https://www.magna.com/company/company-information/magna-groups",
   "https://www.magna.com/company/company-information/facts-history",
   "https://www.magna.com/company/company-information/customers",
   "https://www.magna.com/company/company-information/leadership-and-governance",
   "https://www.magna.com/company/company-information/global-reach",
   "https://www.magna.com/",
   "https://www.magna.com/company/investors",
   "https://www.magna.com/newsroom/financial-news",
   "https://www.magna.com/company/investors/financial-reports-public-filings/downloads"
  ],
  "note": "已读取官网 10 个页面，未检索到公开职能联系方式"
 },
 "aptiv.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [
   {
    "v": "Spitalstrasse 5, 8200 Schaffhausen, Switzerland",
    "src": "https://www.aptiv.com/en/contact",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.aptiv.com/en/contact",
   "https://www.aptiv.com/contact",
   "https://www.aptiv.com/en/solutions/software-and-services",
   "https://www.aptiv.com/en/about/engineered-components",
   "https://www.aptiv.com/en/about/sustainability",
   "https://www.aptiv.com/en/solutions/connection-systems/contact-us",
   "https://www.aptiv.com/en/about",
   "https://www.aptiv.com/",
   "https://www.aptiv.com/de/kontakt",
   "https://www.aptiv.com/fr/contactez",
   "https://www.aptiv.com/pl/kontakt",
   "https://www.aptiv.com/en/contact-us",
   "https://win.aptiv.com/support/connect-with-an-engineer"
  ],
  "note": "已读取官网 11 个页面，未检索到公开职能联系方式"
 },
 "hella.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+492941381600",
    "src": "https://www.hella.com/en/Company/Purchasing-253/",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@hella.com",
    "src": "https://automechanika.messefrankfurt.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.hella.com/en/Company-226/",
   "https://www.hella.com/en/Company/Governance-257/",
   "https://www.hella.com/en/Company/Compliance-258/",
   "https://www.hella.com/en/Company/Sustainability-252/",
   "https://www.hella.com/en/Company/Purchasing-253/",
   "https://www.hella.com/en/Company/Quality-2425/",
   "https://www.hella.com/en/Products-Services-227/",
   "https://www.hella.com/en/"
  ],
  "note": ""
 },
 "aisin.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+81566248441",
    "src": "https://www.aisin.com/en/contact/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.aisin.com/en/profile/officer/",
   "https://www.aisin.com/en/contact/",
   "https://aisin.com/en/contact/",
   "https://aisin.com/en/",
   "https://www.aisin.com/jp/assets/css/contact.css?1793604979",
   "https://www.aisin.com/en/assets/css/contact.css?1793604979"
  ],
  "note": ""
 },
 "lear.com": {
  "dm": "lear.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [
   {
    "v": "info@lear.com",
    "src": "https://www.lear.com/contact-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.lear.com/company",
   "https://www.lear.com/newsroom/lear-named-a-linkedin-top-company-for-2026",
   "https://www.lear.com/company/innovation",
   "https://www.lear.com/contact-us",
   "https://www.lear.com/"
  ],
  "note": ""
 },
 "studer-innotec.com": {
  "dm": "studer-innotec.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+41272056080",
    "src": "https://studer-innotec.com/support/",
    "kind": "tel"
   },
   {
    "v": "+918026715771",
    "src": "https://studer-innotec.com/contact/",
    "kind": "tel",
    "loc": "IN"
   },
   {
    "v": "+919731333711",
    "src": "https://studer-innotec.com/contact/",
    "kind": "tel",
    "loc": "IN"
   }
  ],
  "emails": [
   {
    "v": "info@studer-innotec.com",
    "src": "https://studer-innotec.com/support/"
   }
  ],
  "addr": [],
  "pages": [
   "https://studer-innotec.com/support/",
   "https://studer-innotec.com/after-sales-service/",
   "https://studer-innotec.com/support/faq/",
   "https://studer-innotec.com/support/battery-compatibility/",
   "https://studer-innotec.com/company/",
   "https://studer-innotec.com/contact/",
   "https://studer-innotec.com/"
  ],
  "note": ""
 },
 "webasto.com": {
  "dm": "webasto.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+498985794",
    "src": "https://www.webasto.com/en-int/footer-navigation/meta-nav/imprint.html",
    "kind": "text"
   },
   {
    "v": "+498985794448",
    "src": "https://www.webasto.com/en-int/footer-navigation/meta-nav/imprint.html",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@webasto.com",
    "src": "https://www.webasto.com/en-int/footer-navigation/meta-nav/imprint.html"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.webasto.com/en-int/footer-navigation/meta-nav/contact.html",
   "https://www.webasto.com/en-int/footer-navigation/meta-nav/imprint.html",
   "https://www.webasto.com/en-int.html/contact.html",
   "https://www.webasto.com/en-int.html/contact-us.html",
   "https://www.webasto.com/en-int.html/contactus.html",
   "https://www.webasto.com/en-int.html/en/contact.html",
   "https://www.webasto.com/en-int.html"
  ],
  "note": ""
 },
 "brembo.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.brembo.com/en/contactus",
   "https://www.brembo.com/en/news-archive/6-things-no-one-ever-told-you-about-nascar-cup-series-brakes",
   "https://www.brembo.com/en/news-archive/brembo-for-the-best-moto-company",
   "https://www.brembo.com/en",
   "https://www.brembo.com/en/contactus-form",
   "https://www.brembo.com/en/contactusform-corporate"
  ],
  "note": "已读取官网 6 个页面，未检索到公开职能联系方式"
 },
 "c-and-a.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.c-and-a.com/eu/en/shop/service/feedback",
   "https://www.c-and-a.com/eu/en/shop/service/reporting-of-illegal-content",
   "https://www.c-and-a.com/eu/en/shop/service/faq",
   "https://www.c-and-a.com/eu/en/shop/service/delivery",
   "https://www.c-and-a.com/eu/en/shop/service/payment-vouchers/payment",
   "https://www.c-and-a.com/eu/en/shop/service/returns-complaints/return",
   "https://www.c-and-a.com/eu/en/shop/service/returns-complaints/complaint",
   "https://www.c-and-a.com/eu/en/shop?showCountrySelector=true",
   "https://www.c-and-a.com/de/de/shop/service/feedback",
   "https://www.c-and-a.com/eu/cz/shop/service/kontakt-a-zpetna-vazba",
   "https://www.c-and-a.com/be/nl/shop/service/feedback",
   "https://www.c-and-a.com/nl/nl/shop/service/feedback"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "vfc.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+17815752725",
    "src": "https://vfc.com/investors/shareholder-services",
    "kind": "text"
   },
   {
    "v": "1-800-791-8943",
    "src": "https://vfc.com/contact",
    "kind": "text"
   },
   {
    "v": "(833) 955-1181",
    "src": "https://vfc.com/contact",
    "kind": "text"
   },
   {
    "v": "(866) 301-9661",
    "src": "https://vfc.com/contact",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "press_emea@vfc.com",
    "src": "https://vfc.com/contact"
   }
  ],
  "addr": [
   {
    "v": "1551 Wewatta St., Denver, CO 80202",
    "src": "https://vfc.com/our-company",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://vfc.com/our-company",
   "https://vfc.com/our-company/company-history",
   "https://vfc.com/our-company/global-leadership-team",
   "https://vfc.com/our-company/board-of-directors",
   "https://vfc.com/our-company/inclusion-diversity-equity-action",
   "https://vfc.com/our-company/government-affairs",
   "https://vfc.com/investors/shareholder-services",
   "https://vfc.com/",
   "https://vfc.com/contact",
   "https://vfc.com/our-company/global-leadership-team/detail/114434",
   "https://vfc.com/our-company/global-leadership-team/detail/135366",
   "https://vfc.com/our-company/global-leadership-team/detail/122223"
  ],
  "note": ""
 },
 "pvh.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.pvh.com/company",
   "https://www.pvh.com/company/leadership",
   "https://www.pvh.com/company/we-are-pvh",
   "https://www.pvh.com/company/archives",
   "https://www.pvh.com:443/",
   "https://www.pvh.com/company/leadership/stefan-larsson",
   "https://www.pvh.com/company/leadership/alexis-rollier",
   "https://www.pvh.com/company/leadership/david-savman",
   "https://www.pvh.com/company/leadership/lea-rytz-goldman"
  ],
  "note": "已读取官网 9 个页面，未检索到公开职能联系方式"
 },
 "hugoboss.com": {
  "dm": "hugoboss.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+6563475959",
    "src": "https://www.hugoboss.com/ph/en/contactus",
    "kind": "text",
    "loc": "SG"
   },
   {
    "v": "+497123940",
    "src": "https://www.hugoboss.com/ph/en/home",
    "kind": "jsonld"
   }
  ],
  "emails": [
   {
    "v": "info@hugoboss.com",
    "src": "https://www.hugoboss.com/ph/en/home",
    "loc": "PH"
   }
  ],
  "addr": [
   {
    "v": "Holy-Allee 3, 72555, Metzingen, BW, DE",
    "src": "https://www.hugoboss.com/ph/en/home",
    "kind": "jsonld",
    "loc": "PH"
   }
  ],
  "pages": [
   "https://www.hugoboss.com/on/demandware.store/Sites-W2-Site/en_PH/ServiceWorker-Manifest",
   "https://www.hugoboss.com/ph/en/contactus",
   "https://www.hugoboss.com/ph/en/customer-service/return-policy/general-information-returns.html",
   "https://www.hugoboss.com/ph/en/about-hugo-boss/imprint/about-us.html",
   "https://www.hugoboss.com/ph/en/about-hugo-boss/privacy-statement-experience/privacy-statement-experience.html",
   "https://www.hugoboss.com/ph/en/home"
  ],
  "note": ""
 },
 "next.co.uk": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "03337778000",
    "src": "https://zendesk.next.co.uk/hc/en-gb",
    "kind": "tel"
   },
   {
    "v": "03337778999",
    "src": "https://zendesk.next.co.uk/hc/en-gb",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "customer_team@next.co.uk",
    "src": "https://zendesk.next.co.uk/hc/en-gb"
   }
  ],
  "addr": [],
  "pages": [
   "https://zendesk.next.co.uk/hc/en-gb",
   "https://www.next.co.uk/",
   "https://www.next.co.uk/help",
   "https://www.next.co.uk/contact",
   "https://www.next.co.uk/contact-us",
   "https://www.next.co.uk/contactus",
   "https://www.next.co.uk/en/contact",
   "https://www.next.co.uk/en/contact-us"
  ],
  "note": ""
 },
 "inditex.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+34981185400",
    "src": "https://www.inditex.com/itxcomweb/ph/en/info/contact-us",
    "kind": "text"
   },
   {
    "v": "+34981334900",
    "src": "https://www.inditex.com/itxcomweb/ph/en/info/contact-us",
    "kind": "text"
   },
   {
    "v": "+34937667699",
    "src": "https://www.inditex.com/itxcomweb/ph/en/info/contact-us",
    "kind": "text"
   },
   {
    "v": "+34937667698",
    "src": "https://www.inditex.com/itxcomweb/ph/en/info/contact-us",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "press@inditex.com",
    "src": "https://www.inditex.com/itxcomweb/ph/en/info/contact-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.inditex.com/itxcomweb/ph/en/info/contact-us",
   "https://www.inditex.com/itxcomweb/ph/en/press/news-detail/87cfe8fb-6995-4e5d-bb7b-1b35d79f10e2/inditex-contributes-5-billion-colombian-pesos-to-the-red-cross-to-support-people-affected-by-the-earthquake-in-colombia",
   "https://www.inditex.com/itxcomweb/ph/en/press/news-detail/36da65f2-795e-43cd-95b9-748f77bad23a/inditex-commits-65-million-to-conservation-international-over-three-years-to-support-the-protection-of-the-amazon-rainforest",
   "https://www.inditex.com/itxcomweb/hk/en/home",
   "https://www.inditex.com/itxcomweb/ph/en/home",
   "https://www.inditex.cn/itxcomweb/ph/en/info/contact-us",
   "https://www.inditex.cn/itxcomweb/ph/en/press/news-detail/87cfe8fb-6995-4e5d-bb7b-1b35d79f10e2/inditex-contributes-5-billion-colombian-pesos-to-the-red-cross-to-support-people-affected-by-the-earthquake-in-colombia",
   "https://www.inditex.cn/itxcomweb/ph/en/press/news-detail/36da65f2-795e-43cd-95b9-748f77bad23a/inditex-commits-65-million-to-conservation-international-over-three-years-to-support-the-protection-of-the-amazon-rainforest",
   "https://www.inditex.cn/itxcomweb/es/en/home",
   "https://www.inditex.cn/itxcomweb/ph/en/home"
  ],
  "note": ""
 },
 "memodo.de": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4989904101500",
    "src": "https://www.memodo.de/m/services",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "+49 (0)89 9041 015 00 info@ remove-this. memodo.de Montag - Donnerstag: 07:00 - 18:00 Uhr Freitag: 07:00 - 16:00 Uhr Zum Kontakt",
    "src": "https://www.memodo.de/m/services",
    "kind": "tag"
   }
  ],
  "pages": [
   "https://www.memodo.de/m/services",
   "https://www.memodo.de/photovoltaik/solarmodule/back-contact-module",
   "https://www.memodo.de/photovoltaik/gewerbespeicher/service",
   "https://www.memodo.de/photovoltaik/ladestationen/phoenix-contact",
   "https://www.memodo.de/photovoltaik/zubehoer-elektro/phoenix-contact",
   "https://www.memodo.de/"
  ],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "fastretailing.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.fastretailing.com/eng/about/frway/",
   "https://www.fastretailing.com/eng/about/message/",
   "https://www.fastretailing.com/eng/about/company/",
   "https://www.fastretailing.com/eng/about/business/",
   "https://www.fastretailing.com/eng/about/history/",
   "https://www.fastretailing.com/eng/about/news/",
   "https://www.fastretailing.com/eng/about/photolibrary/",
   "https://www.fastretailing.com/eng/"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "zalando.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://zalando.com/contact",
   "https://zalando.com/contact-us",
   "https://zalando.com/contactus",
   "https://zalando.com/contacts",
   "https://zalando.com/contact-us/",
   "https://zalando.com/en/contact",
   "https://zalando.com/en/contact-us",
   "https://zalando.com/"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "levistrauss.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [
   {
    "v": "1155 Battery Street, 94111, San Francisco, CA, US",
    "src": "https://www.levistrauss.com/who-we-are/company/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.levistrauss.com/who-we-are/company/",
   "https://www.levistrauss.com/sustainability-report/reporting/about-our-reporting/",
   "https://www.levistrauss.com/"
  ],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "dssmith.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "24966188400",
    "src": "https://www.dssmith.com/de/kontaktieren-sie-uns",
    "kind": "tel"
   },
   {
    "v": "241627882323",
    "src": "https://www.dssmith.com/chde/kontaktieren-sie-uns",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.dssmith.com/get-in-touch",
   "https://www.dssmith.com/company",
   "https://www.dssmith.com/company/who-we-are",
   "https://www.dssmith.com/company/our-innovation",
   "https://www.dssmith.com/company/our-innovation/supply-chain-challenges",
   "https://www.dssmith.com/company/suppliers",
   "https://www.dssmith.com/company/suppliers/responsible-sourcing",
   "https://www.dssmith.com/",
   "https://www.dssmith.com/uk/get-in-touch",
   "https://www.dssmith.com/de/kontaktieren-sie-uns",
   "https://www.dssmith.com/chde/kontaktieren-sie-uns",
   "https://www.dssmith.com/fr/contactez-nous"
  ],
  "note": ""
 },
 "mondigroup.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+2431790130",
    "src": "https://www.mondigroup.com/locations",
    "kind": "jsonld"
   },
   {
    "v": "121 812 2999",
    "src": "https://www.mondigroup.com/locations",
    "kind": "text"
   },
   {
    "v": "201 585 8875",
    "src": "https://www.mondigroup.com/locations",
    "kind": "text"
   },
   {
    "v": "212 465 7460",
    "src": "https://www.mondigroup.com/locations",
    "kind": "text"
   },
   {
    "v": "002431790130",
    "src": "https://www.mondigroup.com/locations",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "Marxergasse 4A, 1030, Vienna, AT",
    "src": "https://www.mondigroup.com/locations",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.mondigroup.com/locations",
   "https://www.mondigroup.com/contact",
   "https://www.mondigroup.com/about-mondi",
   "https://www.mondigroup.com/about-mondi/who-we-are",
   "https://www.mondigroup.com/about-mondi/what-we-do",
   "https://www.mondigroup.com/about-mondi/our-businesses",
   "https://www.mondigroup.com/about-mondi/our-strategy",
   "https://www.mondigroup.com/",
   "https://www.mondigroup.com/de/standorte",
   "https://www.mondigroup.com/about-mondi/our-leadership",
   "https://www.mondigroup.com/about-mondi/our-suppliers",
   "https://www.mondigroup.com/products-and-solutions/product-finder/?filters=uncoated-printing-paper&amp;categoryFilters=uncoated-printing-paper%1euncoated-office-paper%1euncoated-converting-paper"
  ],
  "note": ""
 },
 "amcor.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+41443161717",
    "src": "https://www.amcor.com/contact-us",
    "kind": "text"
   },
   {
    "v": "+14136842463",
    "src": "https://www.amcor.com/about/overview/innovation",
    "kind": "text"
   },
   {
    "v": "+41443166502",
    "src": "https://www.amcor.com/media/media-contacts",
    "kind": "text"
   },
   {
    "v": "+18472042319",
    "src": "https://www.amcor.com/media/media-contacts",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.amcor.com/about",
   "https://www.amcor.com/contact-us",
   "https://www.amcor.com/about/events",
   "https://www.amcor.com/about/overview/culture",
   "https://www.amcor.com/about/overview/executive-officers",
   "https://www.amcor.com/about/overview/innovation",
   "https://www.amcor.com/about/overview/history",
   "https://www.amcor.com/",
   "https://www.amcor.com/media/media-contacts",
   "https://www.amcor.com/about/events-archive",
   "https://www.amcor.com/about/overview/innovation/catalyst/emea",
   "https://www.amcor.com/about/overview/innovation/catalyst"
  ],
  "note": ""
 },
 "huhtamaki.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+358106867000",
    "src": "https://www.huhtamaki.com/en/about/contact-us/",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "media@huhtamaki.com",
    "src": "https://www.huhtamaki.com/en/about/contact-us/"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.huhtamaki.com/en/foodservice/products/paper-hot-cups-and-lids/",
   "https://www.huhtamaki.com/en-gb/foodservice-uk/",
   "https://www.huhtamaki.com/en/foodservice/categories/food-to-go/",
   "https://www.huhtamaki.com/en/about/",
   "https://www.huhtamaki.com/en/about/contact-us/",
   "https://www.huhtamaki.com/en/foodservice/",
   "https://www.huhtamaki.com/zh-cn/foodservice/",
   "https://www.huhtamaki.com/"
  ],
  "note": ""
 },
 "cflex.com": {
  "dm": "cflex.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+4318885640",
    "src": "https://www.cflex.com/contact",
    "kind": "tel"
   },
   {
    "v": "+4318892676",
    "src": "https://www.cflex.com/contact",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "office@cflex.com",
    "src": "https://www.cflex.com/contact"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.cflex.com/about-us",
   "https://www.cflex.com/locations",
   "https://www.cflex.com/contact",
   "https://www.cflex.com/about-us/vision-mission",
   "https://www.cflex.com/about-us/management",
   "https://www.cflex.com/about-us/quality",
   "https://www.cflex.com/"
  ],
  "note": ""
 },
 "gerresheimer.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+492116181",
    "src": "https://www.gerresheimer.com/en/contact",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.gerresheimer.com/en/contact",
   "https://www.gerresheimer.com/en/customer/company",
   "https://www.gerresheimer.com/en/customer/company/about-us",
   "https://www.gerresheimer.com/en/customer/company/management",
   "https://www.gerresheimer.com/en/customer/company/locations",
   "https://www.gerresheimer.com/en/customer/company/news",
   "https://www.gerresheimer.com/en/customer/company/events",
   "https://www.gerresheimer.com/en",
   "https://www.gerresheimer.com/kontakt",
   "https://www.gerresheimer.com/cn/top-navigation/contact",
   "https://www.gerresheimer.com/en/customer/company/company-history",
   "https://www.gerresheimer.com/en/customer/products-solutions/cosmetics/products-services"
  ],
  "note": ""
 },
 "otto.de": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.otto.de/service/",
   "https://www.otto.de/service/agb/",
   "https://www.otto.de/service/datenschutz/",
   "https://www.otto.de/service/impressum/",
   "https://www.otto.de/service/ottoversprechen/",
   "https://www.otto.de/chat/assets/nucleus.cassandra.AuthenticationTokenService.module.BlJZ3dgT.js",
   "https://www.otto.de/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "sidel.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.sidel.com/en/services/aseptic-knowledge-center",
   "https://www.sidel.com/en/about/media/evo-on-impact",
   "https://www.sidel.com/en/services/go-green",
   "https://www.sidel.com/en/services/secure-uptime",
   "https://www.sidel.com/en/services/boost-performance",
   "https://www.sidel.com/en/services/increase-flexibility",
   "https://www.sidel.com/en/services/sidel-services-online",
   "https://www.sidel.com/en",
   "https://www.sidel.com/en/services/maintenance",
   "https://www.sidel.com/en/services/spare-parts",
   "https://www.sidel.com/en/services/performance-based-services-sidel",
   "https://www.sidel.com/en/services/line-assessments"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "grohe.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.grohe.com/en-GB/service-support",
   "https://www.grohe.com/en-GB/service-support/guarantee/product-registration",
   "https://www.grohe.com/en-GB/about-grohe",
   "https://www.grohe.com/en-GB/service-support/contact",
   "https://www.grohe.com/en-GB/service-support/locator",
   "https://www.grohe.com/en-GB/service-support/Project-Lists",
   "https://www.grohe.com/en-GB/service-support/Project-Lists/my-project-list",
   "https://www.grohe.com/en-GB",
   "https://www.grohe.com/en-GB/about-grohe/quality",
   "https://www.grohe.com/en-GB/about-grohe/design",
   "https://www.grohe.com/en-GB/about-grohe/sustainability",
   "https://www.grohe.com/en-GB/service-support/faq"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "wienerberger.com": {
  "dm": "wienerberger.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+431601920",
    "src": "https://www.wienerberger.com/en/about.html",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "office@wienerberger.com",
    "src": "https://www.wienerberger.com/en/about.html"
   }
  ],
  "addr": [
   {
    "v": "Wienerberger AG Headquarter +43 1 60192-0 Send e-mail Contact via LinkedIn",
    "src": "https://www.wienerberger.com/en/about.html",
    "kind": "tag"
   }
  ],
  "pages": [
   "https://www.wienerberger.com/en/about.html",
   "https://www.wienerberger.com/en/about/strategy.html",
   "https://www.wienerberger.com/en/about/corporate-culture.html",
   "https://www.wienerberger.com/en/about/compliance.html",
   "https://www.wienerberger.com/en/about/management.html",
   "https://www.wienerberger.com/en/about/history.html",
   "https://www.wienerberger.com/en.html"
  ],
  "note": ""
 },
 "dormakaba.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+41448189011",
    "src": "https://www.dormakaba.com/cn-zh",
    "kind": "jsonld"
   },
   {
    "v": "1800675411",
    "src": "https://www.dormakaba.com/au-en/about",
    "kind": "tel"
   },
   {
    "v": "0800436762",
    "src": "https://www.dormakaba.com/au-en/about",
    "kind": "tel"
   },
   {
    "v": "3178064454",
    "src": "https://www.dormakaba.com/ca-en/about",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info.au@dormakaba.com",
    "src": "https://www.dormakaba.com/au-en/about"
   },
   {
    "v": "info.nz@dormakaba.com",
    "src": "https://www.dormakaba.com/au-en/about"
   },
   {
    "v": "info.ch@dormakaba.com",
    "src": "https://www.dormakaba.com/ch-en/about-us"
   }
  ],
  "addr": [
   {
    "v": "dormakaba Head Office 12 - 13 Dansu Court 3803 Hallam, Victoria, Australia 1800 675 411 info.au@dormakaba.com",
    "src": "https://www.dormakaba.com/au-en/about",
    "kind": "tag"
   },
   {
    "v": "Sydney 12-14 Yulong Close 2170 Moorebank, Australia 1800 675 411 info.au@dormakaba.com",
    "src": "https://www.dormakaba.com/au-en/about",
    "kind": "tag"
   }
  ],
  "pages": [
   "https://www.dormakaba.com/cn-zh/about",
   "https://www.dormakaba.com/cn-zh/offering/vertical-markets/office",
   "https://www.dormakaba.com/cn-zh/general-contact-form",
   "https://www.dormakaba.com/cn-zh/legal-notice",
   "https://www.dormakaba.com/cn-zh",
   "https://www.dormakaba.com/au-en/about",
   "https://www.dormakaba.com/ca-en/about",
   "https://www.dormakaba.com/ch-en/about-us",
   "https://www.dormakaba.com/cn-en/about"
  ],
  "note": ""
 },
 "assaabloy.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+63285646615",
    "src": "https://www.assaabloy.com/ph/en/contact-us",
    "kind": "text",
    "loc": "PH"
   }
  ],
  "emails": [
   {
    "v": "info.ph@assaabloy.com",
    "src": "https://www.assaabloy.com/ph/en/contact-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.assaabloy.com/ph/en/contact-us",
   "https://www.assaabloy.com/ph/en/solutions/products/electronic-access-control/cliq-locking-system-ikon/cliq-go/cylinder-cliq-go/special-cylinder-cliq-go/locking-cylinder-cliq-go-nc31-service-cliqgo",
   "https://www.assaabloy.com/ph/en/solutions/products/electronic-access-control/cliq-locking-system-ikon/cliq-go/cylinder-cliq-go/special-cylinder-cliq-go/locking-cylinder-cliq-go-n702-service-cliqgo",
   "https://www.assaabloy.com/ph/en/solutions/products/electronic-access-control/cliq-locking-system-ikon/cliq-go/cylinder-cliq-go/furniture-lock-cliq-go/furniture-lock-cliq-go-n577-aus-4-service-cliqgo",
   "https://www.assaabloy.com/ph/en/stories/blogs/what-covid-19-taught-us-about-the-design-of-health-facilities-for-better-patient-experience",
   "https://www.assaabloy.com/ph/en/solutions/products/electronic-access-control/cliq-locking-system-ikon/cliq-go/cylinder-cliq-go/furniture-lock-cliq-go/drawer-cylinder-nt06-service-cliqgo",
   "https://www.assaabloy.com/ph/en",
   "https://www.assaabloy.com/ph/en/about-us",
   "https://www.assaabloy.com/ph/en/contact",
   "https://www.assaabloy.com/ph/en/contactus",
   "https://www.assaabloy.com/ph/en/en/contact"
  ],
  "note": ""
 },
 "kingspan.com": {
  "dm": "kingspan.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+353429698000",
    "src": "https://kingspan.com/en/contact",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "admin@kingspan.com",
    "src": "https://kingspan.com/en/contact"
   }
  ],
  "addr": [],
  "pages": [
   "https://kingspan.com/contact",
   "https://kingspan.com/contact-us",
   "https://kingspan.com/contactus",
   "https://kingspan.com/en/contact",
   "https://kingspan.com/en/contact-us",
   "https://kingspan.com/kontakt",
   "https://kingspan.com/"
  ],
  "note": ""
 },
 "rockwool.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4546560300",
    "src": "https://www.rockwool.com/group/about-us/news/",
    "kind": "tel"
   },
   {
    "v": "+4546563311",
    "src": "https://www.rockwool.com/group/about-us/news/",
    "kind": "tel"
   },
   {
    "v": "+4540446060",
    "src": "https://www.rockwool.com/group/about-us/news/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "ROCKWOOL A/S Hovedgaden 584 2640 Hedehusene Denmark Tel : +45 46 56 03 00 Fax : +45 46 56 33 11",
    "src": "https://www.rockwool.com/group/about-us/news/",
    "kind": "tag"
   }
  ],
  "pages": [
   "https://www.rockwool.com/group/about-us/news/",
   "https://www.rockwool.com/group/contact/",
   "https://www.rockwool.com/group/about-us/rockwool-group/our-brands/",
   "https://www.rockwool.com/group/about-us/sustainability/sustainability-spotlight-2025/",
   "https://www.rockwool.com/group/about-us/racing/",
   "https://www.rockwool.com/group/about-us/racing/beneath-the-surface/",
   "https://www.rockwool.com/group/about-us/news/2026/rockwool-releases-h1-2026-results/",
   "https://www.rockwool.com/group/",
   "https://www.rockwool.com/group/about-us/"
  ],
  "note": ""
 },
 "beiersdorf.com": {
  "dm": "beiersdorf.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+39225772",
    "src": "https://www.beiersdorf.com/about-us/locations/global-presence",
    "kind": "text",
    "loc": "IT"
   },
   {
    "v": "+43161400",
    "src": "https://www.beiersdorf.com/about-us/locations/global-presence",
    "kind": "text",
    "loc": "AT"
   },
   {
    "v": "+49404909",
    "src": "https://www.beiersdorf.com/about-us/locations/global-presence",
    "kind": "text"
   },
   {
    "v": "+493039982",
    "src": "https://www.beiersdorf.com/about-us/locations/global-presence",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "kontakt@beiersdorf.com",
    "src": "https://www.beiersdorf.com/about-us/locations/global-presence"
   },
   {
    "v": "contact@poznan.beiersdorf.com",
    "src": "https://www.beiersdorf.com/about-us/locations/global-presence"
   },
   {
    "v": "contact@nairobi.beiersdorf.com",
    "src": "https://www.beiersdorf.com/about-us/locations/global-presence"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.beiersdorf.com/meta-pages/contact/contact-form",
   "https://www.beiersdorf.com/meta-pages/imprint",
   "https://www.beiersdorf.com/about-us",
   "https://www.beiersdorf.com/about-us/our-profile/strategy",
   "https://www.beiersdorf.com/about-us/our-profile/our-purpose",
   "https://www.beiersdorf.com/about-us/our-profile/our-core-values",
   "https://www.beiersdorf.com/about-us/our-profile/our-leadership-team",
   "https://www.beiersdorf.com/",
   "https://www.beiersdorf.com/about-us/our-profile/supervisory-board",
   "https://www.beiersdorf.com/about-us/locations",
   "https://www.beiersdorf.com/about-us/locations/global-presence"
  ],
  "note": ""
 },
 "pg.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "8006920132",
    "src": "https://us.pg.com/contact-us/",
    "kind": "tel"
   },
   {
    "v": "8003327787",
    "src": "https://us.pg.com/contact-us/",
    "kind": "tel"
   },
   {
    "v": "15139831100",
    "src": "https://us.pg.com/contact-us/",
    "kind": "tel"
   },
   {
    "v": "+390650971",
    "src": "https://us.pg.com/contact-us/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://us.pg.com/contact-us/",
   "https://us.pg.com/talkaboutbias/index.html",
   "https://us.pg.com/locations/",
   "https://us.pg.com/talk-about-bias/",
   "https://us.pg.com/blogs/innovation-series-pg-scientist-helps-get-rid-of-bugs/",
   "https://us.pg.com/blogs/three-leadership-tips-from-pg-chief-operating-officer/",
   "https://us.pg.com/"
  ],
  "note": ""
 },
 "loreal.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+61459996367",
    "src": "https://www.loreal.com/en/anz/pages/group/contacts-anz/",
    "kind": "text"
   },
   {
    "v": "+61401570320",
    "src": "https://www.loreal.com/en/anz/pages/group/contacts-anz/",
    "kind": "text"
   },
   {
    "v": "+61417502854",
    "src": "https://www.loreal.com/en/anz/pages/group/contacts-anz/",
    "kind": "text"
   },
   {
    "v": "+61405698611",
    "src": "https://www.loreal.com/en/anz/pages/group/contacts-anz/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.loreal.com/en/commitments-and-responsibilities/for-the-planet/support-communities",
   "https://www.loreal.com/en/anz/pages/group/contacts-anz/",
   "https://www.loreal.com/en/articles/brands/garnier-hair-color-services/",
   "https://www.loreal.com/en/articles/commitments/esat-supporting-companies/",
   "https://www.loreal.com/en/articles/commitments/launch-of-solstice-fund-to-support-suppliers’-decarbonization-initiatives/",
   "https://www.loreal.com/en/articles/commitments/l-oreal-supports-the-united-nations-global-compact/",
   "https://www.loreal.com/en/articles/commitments/supporting-female-entrepreneurs-usa/",
   "https://www.loreal.com/en/",
   "https://www.loreal.com/en/articles/commitments/supporting-the-well-being-and-resilience-of-women",
   "https://www.loreal.com/en/anz/pages/group/contacts-anz",
   "https://www.loreal.com/en/articles/brands/garnier-hair-color-services",
   "https://www.loreal.com/fr/articles/brands/garnier-hair-color-services"
  ],
  "note": ""
 },
 "hoermann.de": {
  "dm": "hoermann.de",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+49523161669",
    "src": "https://www.hoermann.de/unternehmen/",
    "kind": "text"
   },
   {
    "v": "+495204915100",
    "src": "https://www.hoermann.de/private-bauherren-und-modernisierer/service-kontakt/",
    "kind": "tel"
   },
   {
    "v": "05204922588",
    "src": "https://www.hoermann.de/private-bauherren-und-modernisierer/service-kontakt/",
    "kind": "tel"
   },
   {
    "v": "052049154915",
    "src": "https://www.hoermann.de/industrie-gewerbe-oeffentliche-hand/service-kontakt/",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info@hoermann.de",
    "src": "https://www.hoermann.de/impressum/"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.hoermann.de/unternehmen/",
   "https://www.hoermann.de/kontakt/",
   "https://www.hoermann.de/private-bauherren-und-modernisierer/service-kontakt/",
   "https://www.hoermann.de/industrie-gewerbe-oeffentliche-hand/service-kontakt/",
   "https://www.hoermann.de/private-bauherren-und-modernisierer/service-kontakt/angebot-anfordern/",
   "https://www.hoermann.de/impressum/",
   "https://www.hoermann.de/"
  ],
  "note": ""
 },
 "smurfitwestrock.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "2627076247",
    "src": "https://www.smurfitwestrock.com/locations",
    "kind": "tel"
   },
   {
    "v": "+19042775827",
    "src": "https://www.smurfitwestrock.com/locations",
    "kind": "tel",
    "loc": "US"
   },
   {
    "v": "+16083393371",
    "src": "https://www.smurfitwestrock.com/locations",
    "kind": "tel",
    "loc": "US"
   },
   {
    "v": "+19075622267",
    "src": "https://www.smurfitwestrock.com/locations",
    "kind": "tel",
    "loc": "US"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "Beech Hill, D04 N2R2, Clonskeagh, Dublin 4, IE",
    "src": "https://www.smurfitwestrock.com/locations",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.smurfitwestrock.com/locations",
   "https://www.smurfitwestrock.com/contact",
   "https://www.smurfitwestrock.com/products/packaging/food-contact",
   "https://www.smurfitwestrock.com/about/what-we-do/recycling",
   "https://www.smurfitwestrock.com/industries/foodservice",
   "https://www.smurfitwestrock.com/industries/foodservice/pizza-packaging",
   "https://www.smurfitwestrock.com/industries/foodservice/restaurant-packaging",
   "https://www.smurfitwestrock.com/",
   "https://www.smurfitwestrock.com/industries/foodservice/bakery-packaging",
   "https://www.smurfitwestrock.com/about",
   "https://www.smurfitwestrock.com/about/what-we-do",
   "https://www.smurfitwestrock.com/about/inclusive-workplace"
  ],
  "note": ""
 },
 "henkel.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+49211797",
    "src": "https://www.henkel.com/company/locations",
    "kind": "text"
   },
   {
    "v": "+49736281",
    "src": "https://www.henkel.com/company/locations",
    "kind": "text"
   },
   {
    "v": "+492151577",
    "src": "https://www.henkel.com/company/locations",
    "kind": "text"
   },
   {
    "v": "+495112140",
    "src": "https://www.henkel.com/company/locations",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.henkel.com/service/en/39580/asFeed/index.xml",
   "https://www.henkel.com/service/en/204408/asFeed/index.xml",
   "https://www.henkel.com/service/en/33922/asFeed/index.xml",
   "https://www.henkel.com/service/en/985194/asFeed/index.xml",
   "https://www.henkel.com/contact-us",
   "https://www.henkel.com/company",
   "https://www.henkel.com/company/henkel-brand-design",
   "https://www.henkel.com/",
   "https://www.henkel.com/company/downloads-and-publications",
   "https://www.henkel.com/company/locations",
   "https://www.henkel.com/company/150-years-of-henkel",
   "https://www.henkel.com/company/corporate-culture"
  ],
  "note": ""
 },
 "3ds.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+33161626162",
    "src": "https://www.3ds.com/about/company/contact-information",
    "kind": "text"
   },
   {
    "v": "+17818103000",
    "src": "https://www.3ds.com/about/company/contact-information",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.3ds.com/core-static/ds-contact-form.CMyeG6Ob.css",
   "https://www.3ds.com/about/company/what-is-dassault-systemes",
   "https://www.3ds.com/about/company/dassault-systemes-in-peoples-lives",
   "https://www.3ds.com/support/",
   "https://www.3ds.com/about/company/contact-information",
   "https://www.3ds.com/",
   "https://www.3ds.com/core/ContentTypeAbout.C6Wl0S-9.css",
   "https://www.3ds.com/core/ds-contact-form.CMyeG6Ob.css",
   "https://www.3ds.com/fr/about/company/what-is-dassault-systemes",
   "https://www.3ds.com/it/about/company/what-is-dassault-systemes",
   "https://www.3ds.com/core-static/ds-contact-form.DnmQ2TPI.css",
   "https://www.3ds.com/about/corporate-responsibility/impact-report"
  ],
  "note": ""
 },
 "odoo.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+3222903490",
    "src": "https://www.odoo.com/app/helpdesk",
    "kind": "tel"
   },
   {
    "v": "+3226168002",
    "src": "https://www.odoo.com/help",
    "kind": "tel"
   },
   {
    "v": "+3233615430",
    "src": "https://www.odoo.com/help",
    "kind": "tel"
   },
   {
    "v": "+16508702051",
    "src": "https://www.odoo.com/help",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.odoo.com/app/helpdesk",
   "https://www.odoo.com/industries/it-hardware-support",
   "https://www.odoo.com/industries/cleaning-services",
   "https://www.odoo.com/industries/hvac-services",
   "https://www.odoo.com/forum/help-1",
   "https://www.odoo.com/services/partners",
   "https://www.odoo.com/help",
   "https://www.odoo.com/",
   "https://www.odoo.com/ar/app/helpdesk",
   "https://www.odoo.com/ca_ES/app/helpdesk",
   "https://www.odoo.com/zh_CN/app/helpdesk",
   "https://www.odoo.com/zh_TW/app/helpdesk"
  ],
  "note": ""
 },
 "ikea.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [
   {
    "v": "Olof Palmestraat 1, 2616 LN, Delft, Delft, NL",
    "src": "https://www.ikea.com/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.ikea.com/global/en/stories/ideas-inspiration/lets-get-to-work-home-office-260708/",
   "https://www.ikea.com/global/en/support/faq/",
   "https://www.ikea.com/global/en/support/contact-ikea-submit-complaint/",
   "https://www.ikea.com/",
   "https://www.ikea.com/global/en/stories/ideas-inspiration/lets-get-to-work-home-office-260708/_astro/extractFromInline.3150dfbd.js",
   "https://www.ikea.com/global/en/stories/ideas-inspiration/lets-get-to-work-home-office-260708/_astro/extractFromInline.16b2d96f.css",
   "https://www.ikea.com/global/en/stories/ideas-inspiration/lets-get-to-work-home-office-260708/_astro/Core.DhTXcyvQ.css"
  ],
  "note": ""
 },
 "ptc.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+33442970000",
    "src": "https://www.ptc.com/en/ptc-offices",
    "kind": "text"
   },
   {
    "v": "+34934751200",
    "src": "https://www.ptc.com/en/ptc-offices",
    "kind": "text"
   },
   {
    "v": "+34933323435",
    "src": "https://www.ptc.com/en/ptc-offices",
    "kind": "text"
   },
   {
    "v": "+861085873399",
    "src": "https://www.ptc.com/en/ptc-offices",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@ptc.com",
    "src": "https://sps.mesago.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [
   {
    "v": "121 Seaport Blvd, 02210, Boston, MA, Massachusetts, US",
    "src": "https://www.ptc.com/en/about",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.ptc.com/en/about/ptc-next",
   "https://www.ptc.com/en/about/awards-and-recognition",
   "https://www.ptc.com/en/about",
   "https://www.ptc.com/en/contact-us",
   "https://www.ptc.com/en/about/executive-team",
   "https://www.ptc.com/en/ptc-offices",
   "https://www.ptc.com/en",
   "https://www.ptc.com/en/about/ptc-next/on-demand-access?utm_source=PTC_Sales&amp;utm_medium=email&amp;cmsrc=PTC_Sales&amp;utm_content=webcast-email-61174&amp;cl1=webcast-email-61174",
   "https://www.ptc.com/en/resources/service-lifecycle-management/demo/servicemax-product-demos",
   "https://www.ptc.com/en/products/servicemax/whats-new",
   "https://www.ptc.com/en/about/ptc-next/on-demand-access"
  ],
  "note": ""
 },
 "sgs.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+41227399111",
    "src": "https://www.sgs.com/en/office-directory",
    "kind": "tel"
   },
   {
    "v": "+3550682032321",
    "src": "https://www.sgs.com/en/office-directory",
    "kind": "tel"
   },
   {
    "v": "+213023230899",
    "src": "https://www.sgs.com/en/office-directory",
    "kind": "tel"
   },
   {
    "v": "+244225300400",
    "src": "https://www.sgs.com/en/office-directory",
    "kind": "tel"
   },
   {
    "v": "+864000996058",
    "src": "https://www.sgs.com/en/contact",
    "kind": "tel",
    "loc": "CN"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.sgs.com/en/office-directory",
   "https://www.sgs.com/en/contact-form?",
   "https://www.sgs.com/en/our-company/careers-at-sgs",
   "https://www.sgs.com/en/our-company/about-sgs",
   "https://www.sgs.com/en/contact-form",
   "https://www.sgs.com/en",
   "https://www.sgs.com/en/our-company/careers-at-sgs/job-opportunities",
   "https://www.sgs.com/en/our-company/corporate-sustainability",
   "https://www.sgs.com/en/contact-form?inquiryType=Recruitment%20%20Jobs",
   "https://www.sgs.com/en/our-company/careers-at-sgs/experience-our-culture",
   "https://www.sgsgroup.com.cn/en-cn",
   "https://www.sgs.com/en/contact",
   "https://www.sgs.com/en/contact-us",
   "https://www.sgs.com/en/contactus",
   "https://www.sgs.com/en/en/contact",
   "https://www.sgs.com/en/en/contact-us",
   "https://www.sgs.com/en/kontakt"
  ],
  "note": ""
 },
 "tuv.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.tuv.com/philippines/en/about-us/",
   "https://www.tuv.com/landingpage/en/government-inspections-international-trade/",
   "https://www.tuv.com/philippines/en/optically-stimulated-luminescence-dosimetry-service.html",
   "https://www.tuv.com/market-access-services/en/?wt_mc=Website.tuv-com.no-interface.CW19_X00_MAS.text-picture-ad.sliderfrontpage&cpid=CW19_X00_MAS01_WS",
   "https://www.tuv.com/landingpage/en/sustainability/navi/service-search/",
   "https://www.tuv.com/philippines/en/service-page_26368.html",
   "https://www.tuv.com/world/en/about-us/history/",
   "https://www.tuv.com/philippines/en/",
   "https://www.tuv.com/philippines/en/about-us/t%c3%bcv-rheinland-philippines/",
   "https://www.tuv.com/world/en/about-us/",
   "https://www.tuv.com/philippines/en/about-us/regulations-and-standard-updates/"
  ],
  "note": "已读取官网 11 个页面，未检索到公开职能联系方式"
 },
 "essity.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4687885100",
    "src": "https://www.essity.com/company",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.essity.com/company",
   "https://www.essity.com/company/facts-and-figures",
   "https://www.essity.com/company/business-areas",
   "https://www.essity.com/company/strategy",
   "https://www.essity.com/company/corporate-governance",
   "https://www.essity.com/company/business-areas/health-and-medical",
   "https://www.essity.com/company/business-areas/personal-care",
   "https://www.essity.com/",
   "https://www.essity.com/company/business-areas/consumer-tissue",
   "https://www.essity.com/company/business-areas/professional-hygiene",
   "https://www.essity.com/company/corporate-governance/annual-general-meeting",
   "https://www.essity.com/company/corporate-governance/nomination-committee"
  ],
  "note": ""
 },
 "bureauveritas.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://group.bureauveritas.com:443/contact-form",
   "https://group.bureauveritas.com/my-fuel-consumption-new-application-help-shipowners-comply-new-regulations-energy-efficiency",
   "https://group.bureauveritas.com/bureau-veritas-schutter-group-introduce-rapid-aflatoxin-testing-services-agricultural-industry",
   "https://group.bureauveritas.com/bureau-veritas-consumer-products-services-supports-world-environment-day-2017",
   "https://group.bureauveritas.com/bureau-veritas-consumer-products-services-obtains-nabl-status-india",
   "https://group.bureauveritas.com/bureau-veritas-partners-onward-security-corporation-launch-security-assessment-service-taiwan",
   "https://group.bureauveritas.com/newsroom/bureau-veritas-releases-new-rules-offshore-service-vessels-and-tugs",
   "https://group.bureauveritas.com:443/"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "reckitt.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+441753506800",
    "src": "https://www.reckitt.com/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.reckitt.com/our-company/",
   "https://www.reckitt.com/our-company/who-we-are/",
   "https://www.reckitt.com/our-company/our-strategy/",
   "https://www.reckitt.com/our-company/our-leadership/",
   "https://www.reckitt.com/our-company/our-science/",
   "https://www.reckitt.com/our-company/our-history/",
   "https://www.reckitt.com/our-company/policies-reports/",
   "https://www.reckitt.com/"
  ],
  "note": ""
 },
 "atlassian.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+14157011110",
    "src": "https://www.atlassian.com/",
    "kind": "jsonld",
    "loc": "US"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "350 Bush Street, Floor 13, 94104, San Francisco, CA, US",
    "src": "https://www.atlassian.com/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.atlassian.com/collections/service",
   "https://www.atlassian.com/software/customer-service-management",
   "https://www.atlassian.com/blog/company-news/ai-sdlc",
   "https://www.atlassian.com/industries/professional-services",
   "https://www.atlassian.com/company/contact/general-inquiries",
   "https://www.atlassian.com/company/contact/product-evaluator-advice",
   "https://www.atlassian.com/ja/collections/service",
   "https://www.atlassian.com/fr/collections/service",
   "https://www.atlassian.com/es/collections/service",
   "https://www.atlassian.com/software/jira/service-management",
   "https://www.atlassian.com/"
  ],
  "note": "已读取官网 9 个页面，未检索到公开职能联系方式"
 },
 "ul.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "info.de@ul.com",
    "src": "https://sps.mesago.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.ul.com/services/clean-and-sustainable-mobility",
   "https://www.ul.com/services/vehicle-safety-and-quality",
   "https://www.ul.com/industries/building-technologies-and-construction/building-envelope-services",
   "https://www.ul.com/services/building-infrastructure-safety-and-performance",
   "https://www.ul.com/services/safer-building-products-and-systems",
   "https://www.ul.com/services/effective-utility-management-and-optimization",
   "https://www.ul.com/services/healthy-and-sustainable-buildings",
   "https://www.ul.com/",
   "https://www.ul.com/zh-hans/services/clean-and-sustainable-mobility",
   "https://www.ul.com/zh-hant/services/clean-and-sustainable-mobility",
   "https://www.ul.com/ja/services/clean-and-sustainable-mobility",
   "https://www.ul.com/ko/services/clean-and-sustainable-mobility"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "intertek.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "2864008869926",
    "src": "https://www.intertek.com/hazardous-locations/",
    "kind": "tel"
   },
   {
    "v": "218009675352",
    "src": "https://www.intertek.com/hazardous-locations/",
    "kind": "tel"
   },
   {
    "v": "231881268888",
    "src": "https://www.intertek.com/hazardous-locations/",
    "kind": "tel"
   },
   {
    "v": "2441162961620",
    "src": "https://www.intertek.com/hazardous-locations/",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.intertek.com/industries-services/",
   "https://www.intertek.com/hazardous-locations/",
   "https://www.intertek.com/government/customs-services/",
   "https://www.intertek.com/services/",
   "https://www.intertek.com/about/",
   "https://www.intertek.com/about/executive-committee/",
   "https://www.intertek.com/about/history/",
   "https://www.intertek.com/"
  ],
  "note": ""
 },
 "expeditors.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.expeditors.com/locations",
   "https://www.expeditors.com/contact",
   "https://www.expeditors.com/capabilities/consultancy-managed-services",
   "https://www.expeditors.com/services",
   "https://www.expeditors.com/services/supply-chain",
   "https://www.expeditors.com/services/transportation",
   "https://www.expeditors.com/services/customs-compliance",
   "https://www.expeditors.com/",
   "https://www.expeditors.com/services/warehousing-distribution",
   "https://www.expeditors.com/about-us",
   "https://www.expeditors.com/about-us/company",
   "https://www.expeditors.com/about-us/culture"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "dsv.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4561229392",
    "src": "https://www.dsv.com/en/about-dsv/press",
    "kind": "text"
   },
   {
    "v": "+4525417737",
    "src": "https://www.dsv.com/en/about-dsv/press",
    "kind": "text"
   },
   {
    "v": "+4541736121",
    "src": "https://www.dsv.com/en/about-dsv/press",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "press@dsv.com",
    "src": "https://www.dsv.com/en/about-dsv/press"
   }
  ],
  "addr": [
   {
    "v": "Any questions? Our experts are ready to help. Get in touch and we&#39;ll find the solution you need. Contact us online",
    "src": "https://www.dsv.com/en/our-solutions/modes-of-transport/value-added-services",
    "kind": "tag"
   }
  ],
  "pages": [
   "https://www.dsv.com/en/our-solutions/modes-of-transport/value-added-services",
   "https://www.dsv.com/en/support/glossary",
   "https://www.dsv.com/en/about-dsv/purpose-and-strategy",
   "https://www.dsv.com/en/about-dsv/values",
   "https://www.dsv.com/en/about-dsv/our-future",
   "https://www.dsv.com/en/about-dsv/dsv-50",
   "https://www.dsv.com/en/about-dsv",
   "https://www.dsv.com/en",
   "https://www.dsv.com/en/about-dsv/history",
   "https://www.dsv.com/en/about-dsv/management",
   "https://www.dsv.com/en/about-dsv/press",
   "https://www.dsv.com/en/support/self-services"
  ],
  "note": ""
 },
 "dbschenker.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.dsv.com/en"
  ],
  "note": "已读取官网 1 个页面，未检索到公开职能联系方式"
 },
 "scg.com": {
  "dm": "scg.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+6625862222",
    "src": "https://scg.com/contact-us",
    "kind": "tel"
   },
   {
    "v": "+6625861111",
    "src": "https://scg.com/contact-us",
    "kind": "tel"
   },
   {
    "v": "+6625865555",
    "src": "https://scg.com/contact-us",
    "kind": "tel"
   },
   {
    "v": "+6625864444",
    "src": "https://scg.com/contact-us",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "contact@scg.com",
    "src": "https://scg.com/contact-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://scg.com/contact-us",
   "https://scg.com/about-scg/business-purpose",
   "https://scg.com/about-scg/executives-and-board-of-directors",
   "https://scg.com/about-scg/organization-structure",
   "https://scg.com/about-scg/awards-and-recognition",
   "https://scg.com/about-scg/milestones",
   "https://scg.com/company-profile",
   "https://scg.com/"
  ],
  "note": ""
 },
 "eurofins.com": {
  "dm": "eurofins.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [
   {
    "v": "info@eurofins.com",
    "src": "https://www.eurofins.com:443/en/"
   }
  ],
  "addr": [
   {
    "v": "23 Val Fleuri, L-1526, Luxembourg, LU",
    "src": "https://www.eurofins.com:443/en/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.eurofins.com/en/biopharma-services",
   "https://www.eurofins.com/en/biopharma-services/biopharma-product-testing",
   "https://www.eurofins.com/en/biopharma-services/medical-device-services",
   "https://www.eurofins.com/en/biopharma-services/cdmo",
   "https://www.eurofins.com/en/biopharma-services/eurofins-professional-scientific-services-insourcing-solutions",
   "https://www.eurofins.com:443/en/"
  ],
  "note": ""
 },
 "kuehne-nagel.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.kuehne-nagel.com/services/sea-freight",
   "https://www.kuehne-nagel.com/services/air-freight",
   "https://www.kuehne-nagel.com/services/road-transport",
   "https://www.kuehne-nagel.com/services/warehousing",
   "https://www.kuehne-nagel.com/services/customs-clearance",
   "https://www.kuehne-nagel.com/services/cargo-insurance",
   "https://www.kuehne-nagel.com/services/e-commerce",
   "https://www.kuehne-nagel.com/",
   "https://www.kuehne-nagel.com/be/de/services/seefracht",
   "https://www.kuehne-nagel.com/jp/services/sea-freight",
   "https://www.kuehne-nagel.com/in/services/sea-freight",
   "https://www.kuehne-nagel.com/au/services/sea-freight"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "courts.com.sg": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.courts.com.sg/furniture/home-office/tables",
   "https://www.courts.com.sg/furniture/furniture/office-chairs",
   "https://www.courts.com.sg/services",
   "https://www.courts.com.sg/warranty-services/cleaning-maintenance/sofa",
   "https://www.courts.com.sg/warranty-services/cleaning-maintenance/aircon",
   "https://www.courts.com.sg/warranty-services/cleaning-maintenance/cleaning-supplies",
   "https://www.courts.com.sg/warranty-services/protection/mobile-phone-service",
   "https://www.courts.com.sg/",
   "https://www.courts.com.sg/warranty-services/warranty-protection/apple-care",
   "https://www.courts.com.sg/warranty-services/installation/tv-audio",
   "https://www.courts.com.sg/warranty-services/installation/fans-water-heaters",
   "https://www.courts.com.sg/services/services-installation/services-installation-fridge"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "indorama.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+6562221347",
    "src": "https://www.indorama.com/",
    "kind": "text"
   },
   {
    "v": "+911147304000",
    "src": "https://www.indorama.com/",
    "kind": "text"
   },
   {
    "v": "+917021846889",
    "src": "https://www.indorama.com/",
    "kind": "text"
   },
   {
    "v": "+62215261555",
    "src": "https://www.indorama.com/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.indorama.com/",
   "https://www.indorama.com/about-us",
   "https://www.indorama.com/about-us/history",
   "https://www.indorama.com/about-us/the-indorama-compass",
   "https://www.indorama.com/about-us/leadership",
   "https://www.indorama.com/about-us/global-footprint",
   "https://www.indorama.com/about-us/group-policies"
  ],
  "note": ""
 },
 "falabella.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "6003906500",
    "src": "https://www.falabella.com/falabella-cl/page/contactanos",
    "kind": "tel"
   },
   {
    "v": "+56223800256",
    "src": "https://www.falabella.com/falabella-cl/page/contactanos",
    "kind": "tel"
   },
   {
    "v": "6003292002",
    "src": "https://www.falabella.com/falabella-cl/page/contactanos",
    "kind": "tel"
   },
   {
    "v": "+56924173100",
    "src": "https://www.falabella.com/falabella-cl/page/contactanos",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.falabella.com/falabella-cl/page/contactanos",
   "https://www.falabella.com/falabella-cl"
  ],
  "note": ""
 },
 "harveynorman.com.au": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.harveynorman.com.au/contact",
   "https://www.harveynorman.com.au/contact-us",
   "https://www.harveynorman.com.au/contactus",
   "https://www.harveynorman.com.au/contacts",
   "https://www.harveynorman.com.au/contact-us/",
   "https://www.harveynorman.com.au/en/contact",
   "https://www.harveynorman.com.au/en/contact-us",
   "https://www.harveynorman.com.au/"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "shoprite.co.za": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "0800010709",
    "src": "https://www.shoprite.co.za/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.shoprite.co.za/"
  ],
  "note": ""
 },
 "reece.com.au": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.reece.com.au/tools-and-services/bathroom-renovation-workshops",
   "https://www.reece.com.au/tools-and-services/book-a-consultation",
   "https://www.reece.com.au/customised-service",
   "https://www.reece.com.au/contact-us",
   "https://www.reece.com.au/",
   "https://www.reece.com.au/help/s/topic/0TOIh000000blNaOAI/orders-deliveries-returns",
   "https://www.reece.com.au/help/s/topic/0TOIh000000blNcOAI/products-parts-support",
   "https://www.reece.com.au/help/s/topic/0TOOa0000007p7ROAQ/installation-services",
   "https://www.reece.com.au/help/s/topic/0TOIh000000blNdOAI/warranty-faults-issues"
  ],
  "note": "已读取官网 9 个页面，未检索到公开职能联系方式"
 },
 "dekra.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.dekra.com/en/contact-dekra/",
   "https://www.dekra.com/en/all-services/",
   "https://www.dekra.com/en/certification-of-services-and-processes/",
   "https://www.dekra.com/en/home/",
   "https://www.dekra.com/en/contact-claims-and-expertise/",
   "https://www.dekra.com/en/about-dekra-audit/",
   "https://www.dekra.com/en/contact-dekra-audit/",
   "https://www.dekra.com/en/vehicle-appraisal-services/",
   "https://www.dekra.com/en/vehicle-management-services/"
  ],
  "note": "已读取官网 5 个页面，未检索到公开职能联系方式"
 },
 "alfuttaim.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "456 789 0000",
    "src": "https://www.alfuttaim.com/en/divisions/financial-services/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.alfuttaim.com/en/about-us/",
   "https://www.alfuttaim.com/en/divisions/financial-services/",
   "https://www.alfuttaim.com/en/",
   "https://www.alfuttaim.com/ar/about-us/",
   "https://www.alfuttaim.com/ar/divisions/financial-services/"
  ],
  "note": ""
 },
 "majidalfuttaim.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "97142949999",
    "src": "https://www.majidalfuttaim.com/en/contact-us",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.majidalfuttaim.com/en/contact-us",
   "https://www.majidalfuttaim.com/contact-us",
   "https://www.majidalfuttaim.com/",
   "https://www.majidalfuttaim.com/en/sustainability-contact-us",
   "https://www.majidalfuttaim.com/ar/sustainability-contact-us",
   "https://www.majidalfuttaim.com/en/customer-contact"
  ],
  "note": ""
 },
 "eotechinc.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "7343568030",
    "src": "https://www.eotechinc.com/pages/help-center",
    "kind": "tel"
   },
   {
    "v": "+4974526059150",
    "src": "https://www.eotechinc.com/pages/help-center-warranty-information",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.eotechinc.com/pages/help-center-counterfeit-detection",
   "https://www.eotechinc.com/pages/about-eotech",
   "https://www.eotechinc.com/pages/help-center",
   "https://www.eotechinc.com/pages/help-center-product-registration",
   "https://www.eotechinc.com/pages/help-center-warranty-information",
   "https://www.eotechinc.com/pages/company-dealer-program",
   "https://www.eotechinc.com/pages/help-center-product-manuals",
   "https://www.eotechinc.com/",
   "https://www.eotechinc.com/pages/contact",
   "https://www.eotechinc.com/pages/company-eotech-careers",
   "https://www.eotechinc.com/policies/terms-of-service"
  ],
  "note": ""
 },
 "bushnell.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.bushnell.com/"
  ],
  "note": "已读取官网 1 个页面，未检索到公开职能联系方式"
 },
 "mavenbuilt.com": {
  "dm": "mavenbuilt.com",
  "at": "2026-11-02",
  "phones": [
   {
    "v": "800.307.1109",
    "src": "https://mavenbuilt.com/pages/about-us",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "customerservice@mavenbuilt.com",
    "src": "https://mavenbuilt.com/pages/contact-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://mavenbuilt.com/pages/about-us",
   "https://mavenbuilt.com/pages/contact-us",
   "https://mavenbuilt.com/pages/contact-us/",
   "https://mavenbuilt.com/"
  ],
  "note": ""
 },
 "tractoptics.com": {
  "dm": "tractoptics.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "6316627354",
    "src": "https://tractoptics.com/contact-us/",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "support@tractoptics.com",
    "src": "https://tractoptics.com/contact-us/"
   }
  ],
  "addr": [],
  "pages": [
   "https://tractoptics.com/contact-us/",
   "https://tractoptics.com/about",
   "https://tractoptics.com/"
  ],
  "note": ""
 },
 "aimpoint.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.aimpoint.com/about-us/",
   "https://www.aimpoint.com/about-us/our-history/",
   "https://www.aimpoint.com/about-us/our-core-values/",
   "https://www.aimpoint.com/about-us/news/",
   "https://www.aimpoint.com/about-us/events/",
   "https://www.aimpoint.com/support/",
   "https://www.aimpoint.com/support/contact-us/",
   "https://www.aimpoint.com/"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "sigsauer.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "hawkeoptics.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "noblex.de": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4936866889022",
    "src": "https://noblex-e-optics.com/",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "service@noblex-e-optics.com",
    "src": "https://eurobike.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [
   "https://noblex-e-optics.com/"
  ],
  "note": ""
 },
 "arkenoptics.com": {
  "dm": "arkenoptics.com",
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "info@arkenoptics.com",
    "src": "https://arkenoptics.com/pages/about-arken"
   }
  ],
  "addr": [],
  "pages": [
   "https://arkenoptics.com/pages/about-arken",
   "https://arkenoptics.com/cdn/shop/t/35/assets/component-custom-service-block.css?v=177873360551507631191788939288",
   "https://arkenoptics.com/pages/term-of-service",
   "https://arkenoptics.com/"
  ],
  "note": ""
 },
 "tangenttheta.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "9024546384",
    "src": "https://armament.com/pages/about-tangent-theta/contact",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://armament.com/pages/about-tangent-theta/contact",
   "https://armament.com/pages/about-tangent-theta/contact-us",
   "https://armament.com/pages/about-tangent-theta/contactus",
   "https://armament.com/pages/about-tangent-theta/contacts",
   "https://armament.com/pages/about-tangent-theta/contact-us/",
   "https://armament.com/pages/about-tangent-theta/kontakt",
   "https://armament.com/pages/about-tangent-theta/kontakt/",
   "https://armament.com/pages/about-tangent-theta"
  ],
  "note": ""
 },
 "safariland.com": {
  "dm": "safariland.com",
  "at": "2026-11-02",
  "phones": [
   {
    "v": "8003471200",
    "src": "https://safariland.com/pages/service-bulletins",
    "kind": "tel"
   },
   {
    "v": "+441925840048",
    "src": "https://safariland.com/pages/service-bulletins",
    "kind": "tel"
   },
   {
    "v": "+370837706611",
    "src": "https://safariland.com/pages/service-bulletins",
    "kind": "tel"
   },
   {
    "v": "18003471200",
    "src": "https://safariland.com/pages/contact-us",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "sales-uk@safariland.com",
    "src": "https://safariland.com/pages/contact-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://safariland.com/pages/service-bulletins",
   "https://safariland.com/pages/about-us",
   "https://safariland.com/pages/contact-us",
   "https://safariland.com/policies/terms-of-service",
   "https://safariland.com/pages/contact-us#gbaid1266089",
   "https://safariland.com/pages/contact-us#gbaid829566",
   "https://safariland.com/"
  ],
  "note": ""
 },
 "blackhawk.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.blackhawk.com/pages/about-us",
   "https://www.blackhawk.com/"
  ],
  "note": "已读取官网 2 个页面，未检索到公开职能联系方式"
 },
 "highspeedgear.com": {
  "dm": "highspeedgear.com",
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "sales@highspeedgear.com",
    "src": "https://www.highspeedgear.com/pages/about-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.highspeedgear.com/pages/about-us",
   "https://www.highspeedgear.com/pages/oem-services",
   "https://www.highspeedgear.com/pages/contact",
   "https://www.highspeedgear.com/"
  ],
  "note": ""
 },
 "maxpedition.com": {
  "dm": "maxpedition.com",
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+13107680098",
    "src": "https://www.maxpedition.com/pages/customer-service",
    "kind": "text"
   },
   {
    "v": "(310) 768-0098",
    "src": "https://www.maxpedition.com/pages/press-coverage-about-maxpedition",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@maxpedition.com",
    "src": "https://www.maxpedition.com/pages/customer-service"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.maxpedition.com/pages/customer-service",
   "https://www.maxpedition.com/pages/press-coverage-about-maxpedition",
   "https://www.maxpedition.com/"
  ],
  "note": ""
 },
 "vertx.com": {
  "dm": "vertx.com",
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "support@vertx.com",
    "src": "https://vertx.com/pages/about-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://vertx.com/pages/about-us",
   "https://vertx.com/pages/contact-us",
   "https://vertx.com/"
  ],
  "note": ""
 },
 "pentagon-tactical.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "wileyx.com": {
  "dm": "wileyx.com",
  "at": "2026-11-02",
  "phones": [
   {
    "v": "9452601011",
    "src": "https://www.wileyx.com/pages/about-us",
    "kind": "tel"
   },
   {
    "v": "800-776-7842",
    "src": "https://www.wileyx.com/pages/contact",
    "kind": "text"
   },
   {
    "v": "+19452601011",
    "src": "https://www.wileyx.com/",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "support@wileyx.com",
    "src": "https://www.wileyx.com/pages/about-us"
   },
   {
    "v": "hr@wileyx.com",
    "src": "https://www.wileyx.com/pages/about-us"
   }
  ],
  "addr": [
   {
    "v": "15755 Preston Road, 75033, Frisco, Texas, US",
    "src": "https://www.wileyx.com/pages/about-us",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.wileyx.com/pages/about-us",
   "https://www.wileyx.com/blogs/articles/honor-support-give-back",
   "https://www.wileyx.com/pages/contact",
   "https://www.wileyx.com/policies/terms-of-service",
   "https://www.wileyx.com/"
  ],
  "note": ""
 },
 "condoroutdoor.com": {
  "dm": "condoroutdoor.com",
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+8005522554",
    "src": "https://condoroutdoor.com/",
    "kind": "jsonld"
   }
  ],
  "emails": [
   {
    "v": "support@condoroutdoor.com",
    "src": "https://condoroutdoor.com/pages/contact-us"
   },
   {
    "v": "info@condoroutdoor.com",
    "src": "https://condoroutdoor.com/pages/contact-us"
   },
   {
    "v": "media@condoroutdoor.com",
    "src": "https://condoroutdoor.com/pages/contact-us"
   }
  ],
  "addr": [
   {
    "v": "5268 Rivergrade Rd, 91706, Irwindale, California, US",
    "src": "https://condoroutdoor.com/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://condoroutdoor.com/pages/contact-us",
   "https://condoroutdoor.com/pages/about-us",
   "https://condoroutdoor.com/pages/terms-of-service",
   "https://condoroutdoor.com/"
  ],
  "note": ""
 },
 "sordin.se": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://sordin.com/"
  ],
  "note": "已读取官网 1 个页面，未检索到公开职能联系方式"
 },
 "eberlestock.com": {
  "dm": "eberlestock.com",
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+12084245081",
    "src": "https://eberlestock.com/pages/contact-us",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "customerservice@eberlestock.com",
    "src": "https://eberlestock.com/pages/contact-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://eberlestock.com/pages/contact-us",
   "https://eberlestock.com/pages/professional-services",
   "https://eberlestock.com/policies/terms-of-service",
   "https://eberlestock.com/"
  ],
  "note": ""
 },
 "kifaru.net": {
  "dm": "kifaru.net",
  "at": "2026-11-02",
  "phones": [
   {
    "v": "3073707981",
    "src": "https://kifaru.net/pages/customer-support",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "hello@kifaru.net",
    "src": "https://kifaru.net/pages/customer-support"
   }
  ],
  "addr": [],
  "pages": [
   "https://kifaru.net/pages/customer-support",
   "https://kifaru.net/policies/terms-of-service",
   "https://kifaru.net/"
  ],
  "note": ""
 },
 "phoenixcontact.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "info@phoenixcontact.com",
    "src": "https://light-building.messefrankfurt.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "te.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "amphenol.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "smcworld.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "parker.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "trumpf.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "info@de.trumpf.com",
    "src": "https://www.wire.de",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "haascnc.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "krones.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "info@krones.com",
    "src": "https://iffa.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.krones.com/en/locations-worldwide",
   "https://www.krones.com/en/contact",
   "https://www.krones.com/en/company/about-us/company-history",
   "https://www.krones.com/en/company/press/krones-magazine/event/gulfood-manufacturing",
   "https://www.krones.com/en/products/lifecycle-service",
   "https://www.krones.com/en/products/digital-services/digital-solutions",
   "https://www.krones.com/en/company/press/krones-magazine",
   "https://www.krones.com/en/",
   "https://www.krones.com/en/locations-worldwide/africa",
   "https://www.krones.com/en/locations-worldwide/asia",
   "https://www.krones.com/en/locations-worldwide/europe",
   "https://www.krones.com/en/locations-worldwide/north-america"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "gates.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "3037445070",
    "src": "https://www.gates.com/us/en/customer-support/contact-us.html",
    "kind": "tel"
   },
   {
    "v": "3037445651",
    "src": "https://www.gates.com/us/en/customer-support/contact-us.html",
    "kind": "tel"
   },
   {
    "v": "3037445800",
    "src": "https://www.gates.com/us/en/customer-support/contact-us.html",
    "kind": "tel"
   },
   {
    "v": "6038901515",
    "src": "https://www.gates.com/us/en/customer-support/contact-us.html",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.gates.com/us/en/customer-support/contact-us.html",
   "https://www.gates.com/us/en/markets/industrial-and-off-highway/inventory-support.html",
   "https://www.gates.com/us/en/knowledge-center/original-equipment-solutions-and-services.html",
   "https://www.gates.com/us/en/knowledge-center/original-equipment-solutions-and-services/industrial-oe-first-fit.html",
   "https://www.gates.com/us/en/knowledge-center/original-equipment-solutions-and-services/industrial-oe-first-fit/power-transmission.html",
   "https://www.gates.com/us/en/knowledge-center/original-equipment-solutions-and-services/industrial-oe-first-fit/hydraulics.html",
   "https://www.gates.com/us/en/knowledge-center/original-equipment-solutions-and-services/industrial-oe-first-fit/industrial-hose-applications.html",
   "https://www.gates.com/",
   "https://www.gates.com/us/en/other-products/service-station-and-shop-support-hose.html",
   "https://www.gates.com/us/en/errors/404.html",
   "https://www.gates.com/us/en/other-products/service-station-and-shop-support-hose/air-service-hose.html",
   "https://www.gates.com/us/en/knowledge-center/original-equipment-solutions-and-services/auto-oe-first-fit.html"
  ],
  "note": ""
 },
 "knipex.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "bahco.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "solvay.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "celanese.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "dow.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "info@dow.com",
    "src": "https://ish.messefrankfurt.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "bd.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "convatec.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "solaredge.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "forvia.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "denso.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "hm.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "decathlon.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.decathlon.com/policies/terms-of-service",
   "https://www.decathlon.com/pages/contact-us",
   "https://www.decathlon.com/pages/about-decathlon",
   "https://www.decathlon.com/"
  ],
  "note": "已读取官网 4 个页面，未检索到公开职能联系方式"
 },
 "mango.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "primark.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "sealedair.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "tetrapak.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "saint-gobain.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "ball.com": {
  "dm": "ball.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+441582408999",
    "src": "https://www.ball.com/our-company/contact",
    "kind": "text",
    "loc": "GB"
   },
   {
    "v": "+33320536860",
    "src": "https://www.ball.com/our-company/contact",
    "kind": "text",
    "loc": "FR"
   },
   {
    "v": "+33328829884",
    "src": "https://www.ball.com/our-company/contact",
    "kind": "text",
    "loc": "FR"
   },
   {
    "v": "+85226856600",
    "src": "https://www.ball.com/our-company/contact",
    "kind": "text",
    "loc": "HK"
   }
  ],
  "emails": [
   {
    "v": "sales@asia.ball.com",
    "src": "https://www.ball.com/our-company/contact"
   },
   {
    "v": "info@ball.com",
    "src": "https://www.ball.com/our-company/our-story/locations-map"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.ball.com/our-company/contact",
   "https://www.ball.com/our-company",
   "https://www.ball.com/our-company/our-story/history-timeline",
   "https://www.ball.com/our-company/our-story/locations-map",
   "https://www.ball.com/our-company/quick-facts",
   "https://www.ball.com/our-company/the-ball-foundation",
   "https://www.ball.com/our-company/ball-stories",
   "https://www.ball.com/"
  ],
  "note": ""
 },
 "knauf.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "geberit.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "hansgrohe.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "duravit.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "unilever.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "colgatepalmolive.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "kimberly-clark.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "scjohnson.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "williams-sonoma.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "autodesk.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "ifs.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "sap.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+576003000",
    "src": "https://www.sap.com/about/legal/privacy.html",
    "kind": "text"
   },
   {
    "v": "+61299354939",
    "src": "https://www.sap.com/about/legal/privacy.html",
    "kind": "text"
   },
   {
    "v": "+60330035000",
    "src": "https://www.sap.com/about/legal/privacy.html",
    "kind": "text"
   },
   {
    "v": "+2342012776400",
    "src": "https://www.sap.com/about/legal/privacy.html",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.sap.com/registration/contact.html?pageTitle=Home&countryOfOrigin=en_us&refererPagePath=https%3A%2F%2Fwww.sap.com%2Findex.html&refererContentPath=%2Fcontent%2Fsapdx%2Fcountries%2Fen_us&navTitle=Connect+with+SAP",
   "https://www.sap.com/registration/contact.html?navTitle=Connect+with+SAP",
   "https://www.sap.com/about/trust-center.html",
   "https://www.sap.com/services-support",
   "https://www.sap.com/about/company.html",
   "https://www.sap.com/about/company/office-locations.html",
   "https://www.sap.com/about/customer-stories.html",
   "https://www.sap.com/index.html",
   "https://www.sap.com/registration/contact.html",
   "https://www.sap.com/registration/contact.html?pageTitle=Connect+with+SAP&countryOfOrigin=en_us&refererPagePath=https%3A%2F%2Fwww.sap.com%2Fregistration%2Fcontact.html&refererContentPath=%2Fcontent%2Fsapdx%2Flanguages%2Fen_us%2Fregistration%2Fcontact&navTitle=Connect+with+SAP",
   "https://www.sap.com/about/legal/privacy.html"
  ],
  "note": "已读取官网 10 个页面，未检索到公开职能联系方式"
 },
 "villeroy-boch.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "1-800 845-5376",
    "src": "https://www.villeroy-boch.com/service/about-villeroy-boch/",
    "kind": "text"
   },
   {
    "v": "18008455376",
    "src": "https://www.villeroy-boch.com/service/contact/",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.villeroy-boch.com/service/about-villeroy-boch/",
   "https://www.villeroy-boch.com/service/my-club/",
   "https://www.villeroy-boch.com/service/faq/",
   "https://www.villeroy-boch.com/service/contact/",
   "https://www.villeroy-boch.com/legal-notice/",
   "https://www.villeroy-boch.com:443/",
   "https://www.villeroy-boch.com/service/"
  ],
  "note": ""
 },
 "sage.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+852800900343",
    "src": "https://www.sage.com/en-hk/",
    "kind": "tel"
   },
   {
    "v": "800900343",
    "src": "https://www.sage.com/en-hk/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.sage.com/en-hk/",
   "https://www.sage.com/en-hk/industry/services/",
   "https://www.sage.com/en-hk/partners/service-delivery-partners/",
   "https://www.sage.com/en-hk/support/",
   "https://www.sage.com/en-hk/company/",
   "https://www.sage.com/en-hk/company/sage-foundation/"
  ],
  "note": ""
 },
 "tuvsud.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "action.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.action.com/"
  ],
  "note": "已读取官网 1 个页面，未检索到公开职能联系方式"
 },
 "epicor.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "18009991809",
    "src": "https://www.epicor.com/en/company/contact/ways-to-contact-us",
    "kind": "tel"
   },
   {
    "v": "+18009991809",
    "src": "https://www.epicor.com/en/",
    "kind": "jsonld"
   },
   {
    "v": "+15123282300",
    "src": "https://www.epicor.com/en/",
    "kind": "jsonld"
   },
   {
    "v": "+18006785266",
    "src": "https://www.epicor.com/en/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.epicor.com/en/company/global-sites",
   "https://www.epicor.com/en/company/contact/ways-to-contact-us",
   "https://www.epicor.com/en/customers/customer-support",
   "https://www.epicor.com/en/customers/support-services",
   "https://www.epicor.com/en/customers/support-services/epicor-consulting",
   "https://www.epicor.com/en/company",
   "https://www.epicor.com/en/company/about",
   "https://www.epicor.com/en/",
   "https://www.epicor.com/en-us/company/global-sites",
   "https://www.epicor.com/en-gb/company/global-sites",
   "https://www.epicor.com/es-mx/company/global-sites",
   "https://www.epicor.com/de-de/company/global-sites"
  ],
  "note": ""
 },
 "landmarkgroup.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "elektra.com.mx": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "未检索到公开准确信息"
 },
 "freshworks.com": {
  "dm": "freshworks.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+18557476767",
    "src": "https://www.freshworks.com/contact/",
    "kind": "tel"
   },
   {
    "v": "+914466678040",
    "src": "https://www.freshworks.com/contact/",
    "kind": "tel",
    "loc": "IN"
   },
   {
    "v": "+914466678072",
    "src": "https://www.freshworks.com/contact/",
    "kind": "tel",
    "loc": "IN"
   },
   {
    "v": "+31850013362",
    "src": "https://www.freshworks.com/contact/",
    "kind": "tel",
    "loc": "NL"
   }
  ],
  "emails": [
   {
    "v": "sales@freshworks.com",
    "src": "https://www.freshworks.com/events/whats-new-in-freshservice-november-2026/"
   },
   {
    "v": "support@freshworks.com",
    "src": "https://www.freshworks.com/contact/"
   },
   {
    "v": "careers@freshworks.com",
    "src": "https://www.freshworks.com/contact/"
   }
  ],
  "addr": [
   {
    "v": "2950 S. Delaware Street, Suite 201, 94403, San Mateo, CA, US",
    "src": "https://www.freshworks.com/",
    "kind": "jsonld"
   },
   {
    "v": "Chennai, Tamil Nadu, IN",
    "src": "https://www.freshworks.com/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.freshworks.com/beta/icons/nav/freshservice-tab-icon.svg",
   "https://www.freshworks.com/beta/icons/nav/customer-service-tab-icon.svg",
   "https://www.freshworks.com/events/whats-new-in-freshservice-november-2026/",
   "https://www.freshworks.com/contact/",
   "https://www.freshworks.com/freshservice/pricing/",
   "https://www.freshworks.com/freshservice/benchmark-report-2025/",
   "https://www.freshworks.com/gartner-magic-quadrant-for-it-service-management-platforms-report-2026/",
   "https://www.freshworks.com/"
  ],
  "note": ""
 },
 "bunnings.com.au": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "wayfair.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "ashleyfurniture.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://ashleyfurniture.com/contact",
   "https://ashleyfurniture.com/contact-us",
   "https://ashleyfurniture.com/"
  ],
  "note": "已读取官网 3 个页面，未检索到公开职能联系方式"
 },
 "steelcase.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "616.247.2710",
    "src": "https://www.steelcase.com/about/connect/contact-us/",
    "kind": "text"
   },
   {
    "v": "+4980314050",
    "src": "https://www.steelcase.com/eu-de/kontakt/",
    "kind": "text"
   },
   {
    "v": "+442074219000",
    "src": "https://www.steelcase.com/eu-en/contact-us/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.steelcase.com/about/connect/contact-us/",
   "https://www.steelcase.com/about/information/media/",
   "https://www.steelcase.com/about/steelcase/careers/",
   "https://www.steelcase.com/about/connect/contact-us/?topic=Furniture%20Products%20Support",
   "https://www.steelcase.com/about/information/small-midsize-business/",
   "https://www.steelcase.com:443/",
   "https://www.steelcase.com/restapi/oembed/1.0/embed?url=https%3A%2F%2Fwww.steelcase.com%2Fabout%2Fconnect%2Fcontact-us%2F",
   "https://www.steelcase.com/eu-de/kontakt/",
   "https://www.steelcase.com/eu-en/contact-us/"
  ],
  "note": ""
 },
 "hermanmiller.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.hermanmiller.com/en_apc/location-selector/",
   "https://www.hermanmiller.com/en_apc/customer-service/",
   "https://www.hermanmiller.com/en_apc/contact/",
   "https://www.hermanmiller.com/en_apc/products/seating/office-chairs/",
   "https://www.hermanmiller.com/en_apc/products/workspaces/private-office/",
   "https://www.hermanmiller.com/en_apc/products/accessories/technology-support/",
   "https://www.hermanmiller.com/en_apc/products/seating/office-chairs/aeron-chair/",
   "https://www.hermanmiller.com/"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "natuzzi.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "xxxlutz.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "conforama.fr": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "home24.de": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "dfs.co.uk": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "vitra.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+18003384872",
    "src": "https://www.vitra.com/en-as/home",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.vitra.com/en-as/home"
  ],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "lazboy.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "(555) 123-4567",
    "src": "https://www.la-z-boy.com/p/living-room/ottomans/roundabout-ottoman/R-024225",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.la-z-boy.com/p/living-room/ottomans/roundabout-ottoman/R-024225",
   "https://www.la-z-boy.com/p/living-room/chairs/office-chairs/sutherland-quilted-leather-office-chair-light-ivory/R-44813C-LZB",
   "https://www.la-z-boy.com/p/living-room/chairs/office-chairs/nova-executive-leather-office-chair-brown/R-52372-BRN",
   "https://www.la-z-boy.com/p/living-room/chairs/office-chairs/sutherland-quilted-leather-office-chair-jet-black/R-44813A-LZB",
   "https://www.la-z-boy.com/",
   "https://www.la-z-boy.com/p/living-room/chairs/office-chairs/bellamy-executive-leather-office-chair-brown/R-45783-LZB"
  ],
  "note": ""
 },
 "boconcept.com": {
  "dm": "boconcept.com",
  "at": "2026-10-21",
  "phones": [],
  "emails": [
   {
    "v": "support@boconcept.com",
    "src": "https://www.boconcept.com/da-dk/indretningsservice/"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.boconcept.com/da-dk/indretningsservice/",
   "https://www.boconcept.com/da-dk/kundeservice/",
   "https://www.boconcept.com/da-dk/kundeservice/kontakt/",
   "https://www.boconcept.com/da-dk/kundeservice/levering/",
   "https://www.boconcept.com/da-dk/kundeservice/produktpleje/",
   "https://www.boconcept.com/da-dk/kundeservice/assembly-instructions/",
   "https://www.boconcept.com/da-dk/kundeservice/garanti/",
   "https://www.boconcept.com/da-dk/"
  ],
  "note": ""
 },
 "osram.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+498961230",
    "src": "https://www.osram.com/apps/cbcontact/contacts/add",
    "kind": "jsonld"
   },
   {
    "v": "+3618892588",
    "src": "https://www.osram.com/am/services/productrecall_obsl360.jsp",
    "kind": "text"
   },
   {
    "v": "+4915201008721",
    "src": "https://www.osram.com/am/services/productrecall_obsl360.jsp",
    "kind": "text"
   },
   {
    "v": "+35932348248",
    "src": "https://www.osram.com/am/services/productrecall_obsl360.jsp",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "Marcel-Breuer-Str. 4, 80807, Munich",
    "src": "https://www.osram.com/apps/cbcontact/contacts/add",
    "kind": "jsonld"
   },
   {
    "v": "Marcel-Breuer-Straße 6, 80807, Munich",
    "src": "https://www.osram.com/am/services/productrecall_obsl360.jsp",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.osram.com/apps/cbcontact/contacts/add",
   "https://www.osram.com/cb/services/contact/index.jsp?etcc_cmp=com-cb-menu-to-contact&etcc_med=menu&etcc_grp=&etcc_par=&etcc_ctv=&et_cmp_seg5=",
   "https://www.osram.com/am/services/productrecall_obsl360.jsp",
   "https://www.osram.com/cb/services/imprint/index.jsp",
   "https://www.osram.com/cb/services/terms-of-use/index.jsp",
   "https://www.osram.com/cb/services/privacy-policy/index.jsp",
   "https://www.osram.com/cb/services/cookie-policy/index.jsp",
   "https://www.osram.com/cb/",
   "https://www.osram.com/apps/cbcontact/css/cbc.css",
   "https://www.osram.com/cb/services/contact/index.jsp",
   "https://www.osram.com/am/services/faqs-for-automotive-lighting/am_com_faqs_automotive_lighting_3.jsp"
  ],
  "note": ""
 },
 "signify.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+14254877710",
    "src": "https://www.signify.com/global/our-company/intellectual-property/about",
    "kind": "text"
   },
   {
    "v": "+14404833455",
    "src": "https://www.signify.com/global/our-company/intellectual-property/about",
    "kind": "text"
   },
   {
    "v": "+17243875026",
    "src": "https://www.signify.com/global/our-company/intellectual-property/about",
    "kind": "text"
   },
   {
    "v": "+19143339635",
    "src": "https://www.signify.com/global/our-company/intellectual-property/about",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "High Tech Campus 48 5656 AE Eindhoven The Netherlands",
    "src": "https://www.signify.com/global/our-company/investors",
    "kind": "tag"
   },
   {
    "v": "9/F The Brilliance Center, 11th Ave, 40th Street, Taguig City 1634, Philippines.",
    "src": "https://www.signify.com/en-ph/contact?locale_code=en_&remember_locale=en_ph",
    "kind": "tag"
   }
  ],
  "pages": [
   "https://www.signify.com/global/our-company/investors",
   "https://www.signify.com/global/signify-services",
   "https://www.signify.com/global/service-tag",
   "https://www.signify.com/global/applications/office",
   "https://www.signify.com/global/our-company/news/press-releases",
   "https://www.signify.com/global/our-company",
   "https://www.signify.com/global/our-company/about-us",
   "https://www.signify.com/global",
   "https://www.signify.com/global/our-company/corporate-social-responsibility",
   "https://www.signify.com/global/our-company/intellectual-property/about",
   "https://www.signify.com/en-ph/contact?locale_code=en_&remember_locale=en_ph",
   "https://www.signify.com/global/our-company/news"
  ],
  "note": ""
 },
 "progresslighting.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+18004470573",
    "src": "https://progresslighting.com/pages/about",
    "kind": "tel"
   },
   {
    "v": "+18664185542",
    "src": "https://progresslighting.com/pages/about",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://progresslighting.com/cdn/shop/t/463/assets/preload-helper.a4192956.chunk.min.js",
   "https://progresslighting.com/pages/about",
   "https://progresslighting.com/pages/contact",
   "https://progresslighting.com/"
  ],
  "note": ""
 },
 "artemide.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.artemide.com/en/company/identity",
   "https://www.artemide.com/en/company/designers",
   "https://www.artemide.com/en/company/awards",
   "https://www.artemide.com/en/company/sustainability",
   "https://www.artemide.com/en/contact-us",
   "https://www.artemide.com/en/home",
   "https://www.artemide.com/en/company/designers/32774/gae-aulenti",
   "https://www.artemide.com/en/company/designers/71525/klaus-begasse"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "kichler.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+18665585706",
    "src": "https://www.kichler.com/customer-care/contact-us",
    "kind": "jsonld"
   },
   {
    "v": "+18445424537",
    "src": "https://www.kichler.com/customer-care/contact-us",
    "kind": "jsonld"
   },
   {
    "v": "216-643-3604",
    "src": "https://www.kichler.com/customer-care/contact-us",
    "kind": "text"
   },
   {
    "v": "(800) 305-9564",
    "src": "https://www.kichler.com/customer-care/contact-us",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "30455 Solon Road, 44139, Solon, OH, US",
    "src": "https://www.kichler.com/customer-care/contact-us",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.kichler.com/customer-care/contact-us",
   "https://www.kichler.com/customer-care/newsroom/news-and-events",
   "https://www.kichler.com/customer-care/faqs",
   "https://www.kichler.com/customer-care/warranty-information",
   "https://www.kichler.com/contact",
   "https://www.kichler.com/",
   "https://www.kichler.com/customer-care",
   "https://www.kichler.com/customer-care/AppSupport",
   "https://www.kichler.com/professionals/resources/layout-design-services",
   "https://www.kichler.com/customer-care/newsroom"
  ],
  "note": ""
 },
 "acuitybrands.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "zumtobel.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+435572390",
    "src": "https://www.zumtobel.com/com-en/imprint.html",
    "kind": "text"
   },
   {
    "v": "+43664808923640",
    "src": "https://www.zumtobel.com/com-en/company.html",
    "kind": "text"
   },
   {
    "v": "+43557222826",
    "src": "https://www.zumtobel.com/com-en/contact.html",
    "kind": "text"
   },
   {
    "v": "+3238609393",
    "src": "https://z.lighting/en/zumtobel/products/#office",
    "kind": "tel",
    "loc": "BE"
   },
   {
    "v": "+3614502490",
    "src": "https://z.lighting/en/zumtobel/products/#office",
    "kind": "tel",
    "loc": "HU"
   },
   {
    "v": "+38631664035",
    "src": "https://z.lighting/en/zumtobel/products/#office",
    "kind": "tel",
    "loc": "SI"
   },
   {
    "v": "+61298399875",
    "src": "https://z.lighting/en/zumtobel/products/#office",
    "kind": "tel",
    "loc": "AU"
   }
  ],
  "emails": [
   {
    "v": "info@zumtobel.info",
    "src": "https://www.zumtobel.com/com-en/imprint.html"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.zumtobel.com/com-en/imprint.html",
   "https://www.zumtobel.com/com-en/company.html",
   "https://www.zumtobel.com/com-en/service.html",
   "https://www.zumtobel.com/com-en/contact.html",
   "https://www.zumtobel.com/com-en/office-roadshow-frankfurt.html",
   "https://www.zumtobel.com/com-en/index.html",
   "https://z.lighting/en/zumtobel/products/#office"
  ],
  "note": ""
 },
 "flos.com": {
  "dm": "flos.com",
  "at": "2026-10-21",
  "phones": [],
  "emails": [
   {
    "v": "customer.service@flos.com",
    "src": "https://flos.com/en/wo/"
   }
  ],
  "addr": [
   {
    "v": "Via Angelo Faini 2, 25073, Bovezzo (BS), IT",
    "src": "https://flos.com/en/wo/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://flos.com/en/wo/"
  ],
  "note": ""
 },
 "lego.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "fagerhult.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+3256123360",
    "src": "https://www.fagerhult.com/Contact",
    "kind": "tel"
   },
   {
    "v": "+4636108500",
    "src": "https://www.fagerhult.com/Contact",
    "kind": "tel"
   },
   {
    "v": "+31306889900",
    "src": "https://www.fagerhult.com/Contact",
    "kind": "tel"
   },
   {
    "v": "+4543553700",
    "src": "https://www.fagerhult.com/Contact",
    "kind": "tel"
   },
   {
    "v": "+3726507901",
    "src": "https://www.fagerhult.com/Contact",
    "kind": "tel",
    "loc": "EE"
   }
  ],
  "emails": [
   {
    "v": "info@fagerhult.be",
    "src": "https://www.fagerhult.com/Contact"
   },
   {
    "v": "info@fagerhult.fi",
    "src": "https://www.fagerhult.com/Contact"
   },
   {
    "v": "info@fagerhult.de",
    "src": "https://www.fagerhult.com/Contact"
   },
   {
    "v": "info@fagerhult.fr",
    "src": "https://www.fagerhult.com/Contact"
   },
   {
    "v": "info@fagerhult.pl",
    "src": "https://www.fagerhult.com/Contact"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.fagerhult.com/about-fagerhult",
   "https://www.fagerhult.com/Contact",
   "https://www.fagerhult.com/about-fagerhult/sustainability/circular-solutions",
   "https://www.fagerhult.com/about-fagerhult/sustainability/energy-efficiency",
   "https://www.fagerhult.com/about-fagerhult/sustainability/pure-materials",
   "https://www.fagerhult.com/about-fagerhult/sustainability/conscious-production",
   "https://www.fagerhult.com/about-fagerhult/sustainability/relight",
   "https://www.fagerhult.com/"
  ],
  "note": ""
 },
 "hasbro.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://consumercare.hasbro.com/worldwide"
  ],
  "note": "已读取官网 1 个页面，未检索到公开职能联系方式"
 },
 "bega.de": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4923739660",
    "src": "https://www.bega.com/en/knowledge/lighting-practice/roundabout/",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info@bega.com",
    "src": "https://light-building.messefrankfurt.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.bega.com/en/knowledge/lighting-practice/roundabout/",
   "https://www.bega.com/en/knowledge/lighting-practice/office-building-entrance/",
   "https://www.bega.com/en/references/ed-g-e-office-complex-milan/",
   "https://www.bega.com/en/references/sparkasse-head-office-weil-am-rhein/",
   "https://www.bega.com/en/references/head-office-of-sparkasse-oberoesterreich-linz/",
   "https://www.bega.com/en/company/events/",
   "https://www.bega.com/en/",
   "https://www.bega.com/en/products/light-control/zigbee-control-modules-with-relay-contact-71051/"
  ],
  "note": ""
 },
 "slv.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4924514833355",
    "src": "https://www.slv.com/de/service",
    "kind": "tel"
   },
   {
    "v": "+4924514188",
    "src": "https://www.slv.com/de/service",
    "kind": "text"
   },
   {
    "v": "+4924514833",
    "src": "https://www.slv.com/de/service",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.slv.com/de/service",
   "https://www.slv.com/de/unternehmen",
   "https://www.slv.com/de/service/werkzeuge-ressourcen/leuchten-kataloge/big-white/big-white-neuheiten",
   "https://www.slv.com/de/service/werkzeuge-ressourcen/leuchten-kataloge/big-white",
   "https://www.slv.com/de/service/werkzeuge-ressourcen/leuchten-kataloge",
   "https://www.slv.com/de/service/ihr-kontakt/kontakt-aufnehmen",
   "https://www.slv.com/de/service/werkzeuge-ressourcen/lichtplanung",
   "https://www.slv.com/de",
   "https://www.slv.com/de/service/werkzeuge-ressourcen/werkzeuge",
   "https://www.slv.com/de/service/werkzeuge-ressourcen/downloads"
  ],
  "note": ""
 },
 "munchkin.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+18003442229",
    "src": "https://www.munchkin.com/contact",
    "kind": "text"
   },
   {
    "v": "+18053442229",
    "src": "https://www.munchkin.com/contact",
    "kind": "text"
   },
   {
    "v": "+18339496673",
    "src": "https://www.munchkin.com/contact",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.munchkin.com/about",
   "https://www.munchkin.com/contact",
   "https://www.munchkin.com/"
  ],
  "note": ""
 },
 "ravensburger.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.ravensburger.com/start/legal-notice/index.html",
   "https://www.ravensburger.com/start/index.html"
  ],
  "note": "已读取官网 2 个页面，未检索到公开职能联系方式"
 },
 "thetoyshop.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "chicco.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "800188898",
    "src": "https://www.chicco.com/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "Grandate (CO), Via Saldarini Catelli 1, 22070, Grandate, Lombardia, IT",
    "src": "https://www.chicco.com/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.chicco.com/about-us.html",
   "https://www.chicco.com/contact.html",
   "https://www.chicco.com/",
   "https://www.chicco.com/about-us-quality.html"
  ],
  "note": ""
 },
 "ergobaby.com": {
  "dm": "ergobaby.com",
  "at": "2026-11-02",
  "phones": [
   {
    "v": "18884164888",
    "src": "https://ergobaby.com/en-us/pages/customer-care",
    "kind": "tel"
   },
   {
    "v": "(888) 416-4888",
    "src": "https://ergobaby.com/en-us/pages/terms-of-service",
    "kind": "text"
   },
   {
    "v": "1-800-778-7879",
    "src": "https://ergobaby.com/en-us/pages/terms-of-service",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "support@ergobaby.com",
    "src": "https://ergobaby.com/en-us/pages/terms-of-service"
   }
  ],
  "addr": [],
  "pages": [
   "https://ergobaby.com/en-us/pages/customer-care",
   "https://ergobaby.com/en-us/pages/terms-of-service",
   "https://ergobaby.com/en-us/pages/imprint-legal-notice",
   "https://ergobaby.com/en-us"
  ],
  "note": ""
 },
 "schleich-s.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+441279870000",
    "src": "https://gb.schleich-s.com/pages/language-not-found/contact",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://gb.schleich-s.com/pages/language-not-found/contact",
   "https://gb.schleich-s.com/pages/language-not-found/contact-us",
   "https://gb.schleich-s.com/pages/language-not-found/contactus",
   "https://gb.schleich-s.com/pages/language-not-found/contacts",
   "https://gb.schleich-s.com/pages/language-not-found/contact-us/",
   "https://gb.schleich-s.com/pages/language-not-found/kontakt",
   "https://gb.schleich-s.com/pages/language-not-found/kontakt/",
   "https://gb.schleich-s.com/pages/language-not-found"
  ],
  "note": ""
 },
 "clarks.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "playmobil.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.playmobil.com/en-us/content/p_impressum/P_IMPRESSUM.html",
   "https://www.playmobil.com/en-us/contact-us/",
   "https://www.playmobil.com/en-us/",
   "https://www.playmobil.com/de-at/inhalt/p_impressum/P_IMPRESSUM.html",
   "https://www.playmobil.com/nl-be/content/p_impressum/P_IMPRESSUM.html",
   "https://www.playmobil.com/fr-be/content/p_impressum/P_IMPRESSUM.html",
   "https://www.playmobil.com/en-ca/content/p_impressum/P_IMPRESSUM.html"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "crayola.com": {
  "dm": "crayola.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "(610) 253-6271",
    "src": "https://www.crayola.com/company",
    "kind": "text"
   },
   {
    "v": "610-250-5261",
    "src": "https://www.crayola.com/company/colorful-careers",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "recruiting@crayola.com",
    "src": "https://www.crayola.com/company/colorful-careers"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.crayola.com/company",
   "https://www.crayola.com/company/about-us",
   "https://www.crayola.com/company/colorful-careers",
   "https://www.crayola.com/company/crayola-culture",
   "https://www.crayola.com/feature/crayola-experience",
   "https://www.crayola.com/company/media-center",
   "https://www.crayola.com/about-us/sustainability",
   "https://www.crayola.com/"
  ],
  "note": ""
 },
 "crocs.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "timberland.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "deichmann.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "schuh.co.uk": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "tomy.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://us.tomy.com/contact-us/",
   "https://us.tomy.com/"
  ],
  "note": "已读取官网 2 个页面，未检索到公开职能联系方式"
 },
 "ledvance.com": {
  "dm": "ledvance.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+4989780673660",
    "src": "https://www.ledvance.com/en-int/professional-lighting/services/lamp-finder",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "contact@ledvance.com",
    "src": "https://www.ledvance.com/en-int/professional-lighting/services/lamp-finder"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.ledvance.com/en-int/professional-lighting/application-areas/office-lighting",
   "https://www.ledvance.com/en-int/professional-lighting/projects/office-lighting-in-new-prague-office",
   "https://www.ledvance.com/en-int/professional-lighting/projects/lighting-of-the-new-offices-of-teta",
   "https://www.ledvance.com/en-int/professional-lighting/services",
   "https://www.ledvance.com/en-int/professional-lighting/services/downloads",
   "https://www.ledvance.com/en-int/professional-lighting/services/myledvance",
   "https://www.ledvance.com/en-int/professional-lighting/services/training",
   "https://www.ledvance.com/en-int",
   "https://www.ledvance.com/en-int/professional-lighting/services/project-services",
   "https://www.ledvance.com/en-int/professional-lighting/services/lamp-finder",
   "https://www.ledvance.com/en-int/professional-lighting/services/led-strip-system-configurator"
  ],
  "note": ""
 },
 "tumi.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "kipling.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "skechers.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.ph.skechers.com/en/contact",
   "https://www.ph.skechers.com/"
  ],
  "note": "已读取官网 2 个页面，未检索到公开职能联系方式"
 },
 "drmartens.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.drmartens.com/?redirect=%2Fcontact",
   "https://www.drmartens.com/?redirect=%2Fcontact-us",
   "https://www.drmartens.com/?redirect=%2Fcontactus",
   "https://www.drmartens.com/?redirect=%2Fcontacts",
   "https://help.drmartens.com/s/write-to-us?language=en_GB",
   "https://www.drmartens.com/?redirect=%2Fen%2Fcontact-us",
   "https://www.drmartens.com/"
  ],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "intersport.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "dickssportinggoods.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "jdsports.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "rieker.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+497218200082",
    "src": "https://world.rieker.com/en/imprint",
    "kind": "text"
   },
   {
    "v": "+497218200083",
    "src": "https://world.rieker.com/en/imprint",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://world.rieker.com/en/contact",
   "https://world.rieker.com/en/contact/contact-form",
   "https://world.rieker.com/en/imprint",
   "https://world.rieker.com/en"
  ],
  "note": ""
 },
 "ecco.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4574911625",
    "src": "https://global.ecco.com/error404?item=%2fkontakt&user=extranet%5cAnonymous&site=global",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://global.ecco.com/error404?item=%2fkontakt&user=extranet%5cAnonymous&site=global",
   "https://global.ecco.com/kontakt.html",
   "https://global.ecco.com/kontakt.php",
   "https://global.ecco.com/"
  ],
  "note": ""
 },
 "garmin.com": {
  "dm": "garmin.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+639175800841",
    "src": "https://www.garmin.com/en-PH/support/service/",
    "kind": "text",
    "loc": "PH"
   },
   {
    "v": "+63472525468",
    "src": "https://www.garmin.com/en-PH/support/service/",
    "kind": "text",
    "loc": "PH"
   },
   {
    "v": "+639189638151",
    "src": "https://www.garmin.com/en-PH/support/service/",
    "kind": "text",
    "loc": "PH"
   },
   {
    "v": "+63362882709",
    "src": "https://www.garmin.com/en-PH/support/service/",
    "kind": "text",
    "loc": "PH"
   }
  ],
  "emails": [
   {
    "v": "service.ph@garmin.com",
    "src": "https://www.garmin.com/en-PH/company/contact/"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.garmin.com/js/preload-helper-4.12.0.js",
   "https://www.garmin.com/js/_plugin-vue_export-helper-4.12.0.js",
   "https://www.garmin.com/en-PH/support/software/marine/",
   "https://www.garmin.com/en-PH/support/service/",
   "https://www.garmin.com/en-PH/company/contact/",
   "https://www.garmin.com/en-PH/select-a-location/",
   "https://WWW.garmin.com/en-PH/"
  ],
  "note": ""
 },
 "gabor.de": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+498002667749",
    "src": "https://www.gabor.com/de_de",
    "kind": "tel"
   },
   {
    "v": "+498031801444",
    "src": "https://www.gabor.com/de_de",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "Joachim-Gabor-Platz 1 , 83024, Rosenheim, Bayern, DE",
    "src": "https://www.gabor.com/de_de",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.gabor.com/de_de/contact",
   "https://www.gabor.com/de_de/contact-us",
   "https://www.gabor.com/de_de/contactus",
   "https://www.gabor.com/de_de/contacts",
   "https://www.gabor.com/de_de/contact-us/",
   "https://www.gabor.com/de_de/en/contact",
   "https://www.gabor.com/de_de/en/contact-us",
   "https://www.gabor.com/de_de"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "samsonite.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.samsonite.com.ph/contact",
   "https://www.samsonite.com.ph/contact-us",
   "https://www.samsonite.com.ph/"
  ],
  "note": "已读取官网 3 个页面，未检索到公开职能联系方式"
 },
 "nestle.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "gymshark.com": {
  "dm": "gymshark.com",
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "support@gymshark.com",
    "src": "https://support.gymshark.com/en/articles/11186132-contact-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://support.gymshark.com/en/articles/11186132-contact-us",
   "https://us.checkout.gymshark.com/"
  ],
  "note": ""
 },
 "newbalance.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.newbalance.com/contact",
   "https://www.newbalance.com/contact-us",
   "https://www.newbalance.com/"
  ],
  "note": "已读取官网 3 个页面，未检索到公开职能联系方式"
 },
 "amersports.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.amersports.com/about-us/",
   "https://www.amersports.com/about-us/purpose-and-values/",
   "https://www.amersports.com/about-us/strategy/",
   "https://www.amersports.com/about-us/operations/",
   "https://www.amersports.com/about-us/history/",
   "https://www.amersports.com/careers/our-locations-globally/",
   "https://www.amersports.com/contacts/",
   "https://www.amersports.com/"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "danone.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+33144352020",
    "src": "https://www.danone.com/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "59-61 rue La Fayette, 75009, Paris, FR",
    "src": "https://www.danone.com/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.danone.com/group/about-us.html",
   "https://www.danone.com/group/about-us/our-history.html",
   "https://www.danone.com/group/about-us/our-mission.html",
   "https://www.danone.com/group/about-us/governance.html",
   "https://www.danone.com/group/about-us/facts-and-figures.html",
   "https://www.danone.com/group/about-us/our-culture.html",
   "https://www.danone.com/investors/shareholders/faq-and-contact.html",
   "https://www.danone.com/",
   "https://www.danone.com/at/en/group/about-us.html",
   "https://www.danone.com/ch/de/group/about-us.html",
   "https://www.danone.com/ch/en/group/about-us.html",
   "https://www.danone.com/de/en/group/about-us.html"
  ],
  "note": ""
 },
 "ferrero.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "212 222 3784",
    "src": "https://www.ferrero.com/int/en/locations",
    "kind": "text"
   },
   {
    "v": "+3902952561",
    "src": "https://www.ferrero.com/int/en/locations",
    "kind": "text"
   },
   {
    "v": "419 234 3300",
    "src": "https://www.ferrero.com/int/en/locations",
    "kind": "text"
   },
   {
    "v": "+85227221234",
    "src": "https://www.ferrero.com/int/en/locations",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.ferrero.com/int/en/about-us",
   "https://www.ferrero.com/int/en/about-us/a-story-of-a-family",
   "https://www.ferrero.com/int/en/about-us/quality-at-heart",
   "https://www.ferrero.com/int/en/about-us/our-people/core-values",
   "https://www.ferrero.com/int/en/about-us/our-people/leadership-team",
   "https://www.ferrero.com/int/en/about-us/key-figures",
   "https://www.ferrero.com/int/en/about-us/policies-positions",
   "https://www.ferrero.com/int/en/",
   "https://www.ferrero.com/int/en/about-us/ferrero-affiliated-companies",
   "https://www.ferrero.com/int/en/locations",
   "https://www.ferrero.com/int/en/about-us/our-people/ferrero-foundation",
   "https://www.ferrero.com/int/en/news-stories/media-contacts"
  ],
  "note": ""
 },
 "usfoods.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "lactalis.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.lactalis.com/fr/"
  ],
  "note": "已读取官网 1 个页面，未检索到公开职能联系方式"
 },
 "kraftheinzcompany.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.kraftheinzcompany.com/css/style.css",
   "https://www.kraftheinzcompany.com/index.html",
   "https://www.kraftheinzcompany.com/brands.html",
   "https://www.kraftheinzcompany.com/company.html",
   "https://www.kraftheinzcompany.com/sustainability/index.html",
   "https://www.kraftheinzcompany.com/purposevisionvalues.html",
   "https://www.kraftheinzcompany.com/ethics-compliance.html",
   "https://www.kraftheinzcompany.com/",
   "https://www.kraftheinzcompany.com/supplier-hub.html",
   "https://www.kraftheinzcompany.com/pressroom/downloads.html",
   "https://www.kraftheinzcompany.com/pressroom/mediacontacts.html",
   "https://www.kraftheinzcompany.com/contributions.html"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "cargill.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "tyson.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.tyson.com/contact-us",
   "https://www.tyson.com/contact",
   "https://www.tyson.com/contactus",
   "https://www.tyson.com/"
  ],
  "note": "已读取官网 4 个页面，未检索到公开职能联系方式"
 },
 "metroag.de": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "bidfood.co.uk": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+441494555900",
    "src": "https://www.bidfood.co.uk/blog/?blog-category=helping-your-business",
    "kind": "jsonld"
   },
   {
    "v": "+443703663000",
    "src": "https://www.bidfood.co.uk/blog/?blog-category=helping-your-business",
    "kind": "jsonld"
   },
   {
    "v": "01494555900",
    "src": "https://www.bidfood.co.uk/get-in-touch/",
    "kind": "tel"
   },
   {
    "v": "03703663000",
    "src": "https://www.bidfood.co.uk/get-in-touch/faqs/",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "814 Leigh Road, SL1 4BD, Slough, GB",
    "src": "https://www.bidfood.co.uk/blog/?blog-category=helping-your-business",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.bidfood.co.uk/blog/?blog-category=helping-your-business",
   "https://www.bidfood.co.uk/about-us/",
   "https://www.bidfood.co.uk/supporting-you-with-legislation/",
   "https://www.bidfood.co.uk/about-us/open-doors/",
   "https://www.bidfood.co.uk/get-in-touch/",
   "https://www.bidfood.co.uk/get-in-touch/faqs/",
   "https://www.bidfood.co.uk/get-in-touch/bidfood-companies/",
   "https://www.bidfood.co.uk/",
   "https://www.bidfood.co.uk/blog/?blog_category=helping-your-business"
  ],
  "note": ""
 },
 "lifefitness.com": {
  "dm": "lifefitness.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+902122133637",
    "src": "https://www.lifefitness.com/en-us/contact-sales",
    "kind": "text",
    "loc": "TR"
   },
   {
    "v": "+3256438555",
    "src": "https://www.lifefitness.com/en-us/contact-sales",
    "kind": "text",
    "loc": "BE"
   },
   {
    "v": "+9242111400500",
    "src": "https://www.lifefitness.com/en-us/contact-sales",
    "kind": "text",
    "loc": "PK"
   },
   {
    "v": "+8801912211233",
    "src": "https://www.lifefitness.com/en-us/contact-sales",
    "kind": "text",
    "loc": "BD"
   }
  ],
  "emails": [
   {
    "v": "vertrieb@lifefitness.com",
    "src": "https://www.lifefitness.com/en-us/contact-sales"
   },
   {
    "v": "sales.nl@lifefitness.com",
    "src": "https://www.lifefitness.com/en-us/contact-sales"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.lifefitness.com/en-us/contact-sales",
   "https://www.lifefitness.com/en-us/markets/uniformed-service",
   "https://www.lifefitness.com/en-us/customer-support/service",
   "https://www.lifefitness.com/en-us/customer-support/education-hub",
   "https://www.lifefitness.com/en-us/customer-support/education-hub/blog",
   "https://www.lifefitness.com/en-us/customer-support/education-hub/ebooks",
   "https://www.lifefitness.com/en-us/customer-support/education-hub/events"
  ],
  "note": ""
 },
 "almarai.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+966581760464",
    "src": "https://www.almarai.com/ar/food-service",
    "kind": "text"
   },
   {
    "v": "+966114536688",
    "src": "https://www.almarai.com/ar/contact-us",
    "kind": "text"
   },
   {
    "v": "+966114700005",
    "src": "https://www.almarai.com/ar/contact-us",
    "kind": "text"
   },
   {
    "v": "+97317789788",
    "src": "https://www.almarai.com/ar/contact-us/locations",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.almarai.com/ar/food-service",
   "https://www.almarai.com/ar/contact-us",
   "https://www.almarai.com/ar/contact-us/locations",
   "https://www.almarai.com/ar/contact",
   "https://www.almarai.com/ar/contactus",
   "https://www.almarai.com/ar/contacts",
   "https://www.almarai.com/ar/contact-us/",
   "https://www.almarai.com/ar",
   "https://www.almarai.com/en/food-service",
   "https://www.almarai.com/ar/food-service/premier-chef",
   "https://www.almarai.com/ar/food-service/bakemart",
   "https://www.almarai.com/en/contact-us"
  ],
  "note": ""
 },
 "kubota.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.kubota.com/products/materials/about.html",
   "https://www.kubota.com/contact/index.html",
   "https://www.kubota.com/contact/",
   "https://www.kubota.com/",
   "https://www.kubota.com/ir/news-support/news/data/nws20261005e.pdf"
  ],
  "note": "已读取官网 4 个页面，未检索到公开职能联系方式"
 },
 "agcocorp.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.agcocorp.com/us/en/home/brands-and-solutions/service-and-information.html",
   "https://www.agcocorp.com/us/en/home/about-us.html",
   "https://www.agcocorp.com/us/en/home/about-us/agco-history.html",
   "https://www.agcocorp.com/us/en/home/about-us/awards-and-recognition.html",
   "https://www.agcocorp.com/us/en/home/about-us/board-of-directors.html",
   "https://www.agcocorp.com/us/en/home/about-us/global-code-of-conduct.html",
   "https://www.agcocorp.com/us/en/home/about-us/global-reach.html",
   "https://www.agcocorp.com/us/en/home.html",
   "https://www.agcocorp.com/us/en/home/about-us/governance-committees-charters.html",
   "https://www.agcocorp.com/us/en/home/about-us/executive-leadership.html",
   "https://www.agcocorp.com/us/en/home/about-us/dealers.html",
   "https://www.agcocorp.com/us/en/home/about-us/farmercore.html"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "husqvarnagroup.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+46705146414",
    "src": "https://www.husqvarnagroup.com/en/investor-contact",
    "kind": "text"
   },
   {
    "v": "+4687389080",
    "src": "https://www.husqvarnagroup.com/en/media-contacts",
    "kind": "text"
   },
   {
    "v": "+46706786158",
    "src": "https://www.husqvarnagroup.com/en/media-contacts",
    "kind": "text"
   },
   {
    "v": "+46722140117",
    "src": "https://www.husqvarnagroup.com/en/media-contacts",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.husqvarnagroup.com/sites/husqvarna/themes/custom/husqvarna/css/service.css?tlwpiz",
   "https://www.husqvarnagroup.com/en/our-company",
   "https://www.husqvarnagroup.com/en/investor-contact",
   "https://www.husqvarnagroup.com/en/media-contacts",
   "https://www.husqvarnagroup.com/en/contacts",
   "https://www.husqvarnagroup.com/"
  ],
  "note": ""
 },
 "stihl.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4960713055358",
    "src": "https://www.stihl.com/en",
    "kind": "jsonld"
   }
  ],
  "emails": [
   {
    "v": "info@stihl.de",
    "src": "https://www.stihl.com/en/legal-notice"
   }
  ],
  "addr": [
   {
    "v": "Robert-Bosch-Straße 13, D-64807, Dieburg",
    "src": "https://www.stihl.com/en",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.stihl.com/en/service/local-websites",
   "https://www.stihl.com/en/service",
   "https://www.stihl.com/en/service/customer-information",
   "https://www.stihl.com/en/legal-notice",
   "https://www.stihl.com/en/service/customer-information/brand-and-product-piracy",
   "https://www.stihl.com/en"
  ],
  "note": ""
 },
 "yanmar.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "deere.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.deere.com/en-us/forms/cotton-demo-survey",
   "https://www.deere.com/en-us/"
  ],
  "note": "已读取官网 2 个页面，未检索到公开职能联系方式"
 },
 "petco.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "chewy.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "netafim.com": {
  "dm": "netafim.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+972733273000",
    "src": "https://www.netafim.com/en/greenhouse/contact-us-portal",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "contactus@netafim.com",
    "src": "https://www.netafim.com/en/greenhouse/contact-us-portal"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.netafim.com/en/netafim-services",
   "https://www.netafim.com/en/greenhouse/contact-us-portal",
   "https://www.netafim.com/en/digital-farming/growsphere-support",
   "https://www.netafim.com/en/netafim-irrigation-company-about-us",
   "https://www.netafim.com/en/netafim-irrigation-company-about-us/our-leadership",
   "https://www.netafim.com/en/netafim-irrigation-company-about-us/this-is-orbia",
   "https://www.netafim.com/en/netafim-irrigation-company-about-us/quality-policy",
   "https://www.netafim.com/"
  ],
  "note": ""
 },
 "amazone.de": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4954055010",
    "src": "https://amazone.de/de-de/unternehmen/unternehmens-news",
    "kind": "tel"
   },
   {
    "v": "+495405501147",
    "src": "https://amazone.de/de-de/unternehmen/unternehmens-news",
    "kind": "jsonld"
   },
   {
    "v": "+494408927",
    "src": "https://amazone.de/de-de/unternehmen/gruppe-standorte",
    "kind": "text"
   },
   {
    "v": "+3696566485",
    "src": "https://amazone.de/de-de/unternehmen/gruppe-standorte",
    "kind": "text"
   },
   {
    "v": "+49546877882300",
    "src": "https://amazone.de/de-de/unternehmen/gruppe-standorte",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "Am Amazonenwerk 9-13, 49205, D-49205 Hasbergen - Germany, DE",
    "src": "https://amazone.de/de-de/unternehmen/unternehmens-news",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://amazone.de/de-de/unternehmen/unternehmens-news",
   "https://amazone.de/de-de/unternehmen/nachhaltigkeit",
   "https://amazone.de/de-de/unternehmen/image-filme",
   "https://amazone.de/de-de/unternehmen/firmenhistorie",
   "https://amazone.de/de-de/unternehmen/zertifikate",
   "https://amazone.de/de-de/unternehmen/gruppe-standorte",
   "https://amazone.de/de-de/unternehmen/faq",
   "https://amazone.de/de-de",
   "https://amazone.de/de-de/service-support/fuer-landwirte-lohnunternehmer-und-kommunen/kundenservice/ansprechpartner",
   "https://amazone.de/de-de/unternehmen/kontaktformular",
   "https://amazone.de/de-de/impressum/impressum-86256",
   "https://amazone.de/de-de/unternehmen/datenschutz"
  ],
  "note": ""
 },
 "jollyes.co.uk": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "kvernelandgroup.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://ien.kvernelandgroup.com/"
  ],
  "note": "已读取官网 1 个页面，未检索到公开职能联系方式"
 },
 "ferplast.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+390445429111",
    "src": "https://www.ferplast.com/pages/contact-us",
    "kind": "jsonld"
   },
   {
    "v": "+39445429111",
    "src": "https://www.ferplast.com/pages/our-locations",
    "kind": "text"
   },
   {
    "v": "+39445429115",
    "src": "https://www.ferplast.com/pages/our-locations",
    "kind": "text"
   },
   {
    "v": "+421357902600",
    "src": "https://www.ferplast.com/pages/our-locations",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "Via I° Maggio 5, 36070, Castelgomberto, Vicenza, Italy",
    "src": "https://www.ferplast.com/pages/contact-us",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.ferplast.com/pages/contact-us",
   "https://www.ferplast.com/pages/our-locations",
   "https://www.ferplast.com/pages/faq-support",
   "https://www.ferplast.com/pages/information-about-back-in-stock-notification",
   "https://www.ferplast.com/"
  ],
  "note": ""
 },
 "kongcompany.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+13032162626",
    "src": "https://www.kongcompany.com/giftcertificates.php",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "16191 Table Mountain Parkway, 80403, Golden, CO, US",
    "src": "https://www.kongcompany.com/giftcertificates.php",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.kongcompany.com/product_images/favicon-96x96.png",
   "https://www.kongcompany.com/product_images/favicon.svg",
   "https://www.kongcompany.com/product_images/apple-touch-icon.png",
   "https://www.kongcompany.com/product_images/site.webmanifest",
   "https://www.kongcompany.com/giftcertificates.php",
   "https://www.kongcompany.com/cart.php",
   "https://www.kongcompany.com/",
   "https://www.kongcompany.com",
   "https://www.kongcompany.com/dog-toys/",
   "https://www.kongcompany.com/dog-toys/new-dog-toys/"
  ],
  "note": ""
 },
 "purina.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "petsuppliesplus.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "mars.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.mars.com/about",
   "https://www.mars.com/about/the-five-principles",
   "https://www.mars.com/about/mars-compass",
   "https://www.mars.com/about/mars-impact-fund",
   "https://www.mars.com/about/history",
   "https://www.mars.com/about/leadership",
   "https://www.mars.com/about/inclusion-and-diversity",
   "https://www.mars.com/",
   "https://www.mars.com/zh-cn/about",
   "https://www.mars.com/zh-tw/about",
   "https://www.mars.com/en-cz/about",
   "https://www.mars.com/cs-cz/about"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "lemken.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+49280281",
    "src": "https://lemken.com/en-en/services/contact",
    "kind": "text"
   },
   {
    "v": "+492802818871",
    "src": "https://lemken.com/en-en/company/career",
    "kind": "tel"
   },
   {
    "v": "+49280281530",
    "src": "https://lemken.com/en-en/company/career",
    "kind": "tel"
   },
   {
    "v": "+49280281649",
    "src": "https://lemken.com/en-en/company/career",
    "kind": "tel"
   },
   {
    "v": "+492802810",
    "src": "https://lemken.com/en-en/services/contact",
    "kind": "tel"
   },
   {
    "v": "+49280281262",
    "src": "https://lemken.com/en-en/services/contact",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@lemken.com",
    "src": "https://lemken.com/de-de/landtechnik-services/kontakt"
   }
  ],
  "addr": [],
  "pages": [
   "https://lemken.com/_assets/vite/assets/sticky-contact-CH-rqfMP.css",
   "https://lemken.com/en-en/services/contact",
   "https://lemken.com/en-en/company/career",
   "https://lemken.com/en-en/services/after-sales/spare-parts",
   "https://lemken.com/de-de/landtechnik-services/kontakt",
   "https://lemken.com/en-en/services/after-sales/customer-service",
   "https://lemken.com/en-en/services/agrotraining",
   "https://lemken.com/_assets/vite/assets/sticky-contact-BtUtChB2.css",
   "https://lemken.com/en-en/services/second-hand-implements",
   "https://lemken.com/en-en/services",
   "https://lemken.com/en-en/services/after-sales",
   "https://lemken.com/en-en/"
  ],
  "note": ""
 },
 "swarovski.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "tiffany.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "vitakraft.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+6562622216",
    "src": "https://www.vitakraft.com/asia/en/contact-us",
    "kind": "text"
   },
   {
    "v": "+6567752286",
    "src": "https://www.vitakraft.com/asia/en/contact-us",
    "kind": "text"
   },
   {
    "v": "+32498881191",
    "src": "https://www.vitakraft.com/asia/en/locations",
    "kind": "text"
   },
   {
    "v": "+4586720655",
    "src": "https://www.vitakraft.com/asia/en/locations",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "info@vitakraft.de",
    "src": "https://www.vitakraft.com/asia/en/locations"
   },
   {
    "v": "info@vitakraft.it",
    "src": "https://www.vitakraft.com/asia/en/locations"
   },
   {
    "v": "info@vitakraft.hr",
    "src": "https://www.vitakraft.com/asia/en/locations"
   },
   {
    "v": "info@vitakraft.nl",
    "src": "https://www.vitakraft.com/asia/en/locations"
   },
   {
    "v": "info@vitakraft.no",
    "src": "https://www.vitakraft.com/asia/en/locations"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.vitakraft.com/asia/en/about-us/latest-news",
   "https://www.vitakraft.com/asia/en/contact-us",
   "https://www.vitakraft.com/asia/en/locations",
   "https://www.vitakraft.com/asia/en/about-us",
   "https://www.vitakraft.com/asia/en/about-us/communication/vitakraft-unveils-comprehensive-brand-relaunch",
   "https://www.vitakraft.com/asia/en/about-us/communication/60-years-of-snacking-fun",
   "https://www.vitakraft.com/asia/en/about-us/communication/vitakraft-makes-the-vita-forest-grow",
   "https://www.vitakraft.com/asia/en/"
  ],
  "note": ""
 },
 "petsathome.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "hello@petsathome.co.uk",
    "src": "https://www.petsathome.com/support/pets-insurance"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.petsathome.com/product/listing/fish/pond?filters=product_benefits-Immunity+Support",
   "https://www.petsathome.com/support",
   "https://www.petsathome.com/pet-advice/Helping-pets-feel-safe-during-firework-season",
   "https://www.petsathome.com/",
   "https://www.petsathome.com/support/collection-and-delivery",
   "https://www.petsathome.com/support/refund-and-returns",
   "https://www.petsathome.com/support/subscriptions-and-repeat-orders",
   "https://www.petsathome.com/support/pets-insurance"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "signetjewelers.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "1-855-848-6388",
    "src": "https://www.signetjewelers.com/our-company/team-member-resources/default.aspx",
    "kind": "text"
   },
   {
    "v": "+4403716640300",
    "src": "https://www.signetjewelers.com/contact/default.aspx",
    "kind": "text"
   },
   {
    "v": "1-800-527-8029",
    "src": "https://www.signetjewelers.com/contact/default.aspx",
    "kind": "text"
   },
   {
    "v": "1-866-249-2593",
    "src": "https://www.signetjewelers.com/contact/default.aspx",
    "kind": "text"
   },
   {
    "v": "+443716640300",
    "src": "https://www.signetjewelers.com/contact/default.aspx",
    "kind": "text",
    "loc": "GB"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.signetjewelers.com/our-company/default.aspx",
   "https://www.signetjewelers.com/our-company/History/default.aspx",
   "https://www.signetjewelers.com/our-company/team-member-resources/default.aspx",
   "https://www.signetjewelers.com/our-company/jewelry-services/default.aspx",
   "https://www.signetjewelers.com/contact/default.aspx",
   "https://www.signetjewelers.com/newsroom/company-news/default.aspx",
   "https://signetjewelers.com/our-company/default.aspx",
   "https://signetjewelers.com/our-home/default.aspx"
  ],
  "note": ""
 },
 "trixie.de": {
  "dm": "trixie.de",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+4946382109100",
    "src": "https://www.trixie.de/de/unternehmen/aktuelles",
    "kind": "tel"
   },
   {
    "v": "+4946382109200",
    "src": "https://www.trixie.de/de/unternehmen/aktuelles",
    "kind": "tel"
   },
   {
    "v": "+4946382109500",
    "src": "https://www.trixie.de/de/unternehmen/aktuelles",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "vertrieb@trixie.de",
    "src": "https://www.trixie.de/de/unternehmen/aktuelles"
   },
   {
    "v": "kontakt@trixie.de",
    "src": "https://www.trixie.de/de/impressum"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.trixie.de/de/unternehmen/aktuelles",
   "https://www.trixie.de/de/kontakt",
   "https://www.trixie.de/de/unternehmen/aktuelles/neuer-strategischer-mehrheitsgesellschafter-fuer-trixie",
   "https://www.trixie.de/kontakt",
   "https://www.trixie.de/de/de/kontakt",
   "https://www.trixie.de/de/impressum",
   "https://www.trixie.de/de/"
  ],
  "note": ""
 },
 "ernestjones.co.uk": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "hsamuel.co.uk": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "christ.de": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "bulgari.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "fossil.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "chowtaifook.com": {
  "dm": "chowtaifook.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+85221383399",
    "src": "https://www.chowtaifook.com/zh-hk/customer-service/frequently-asked-questions",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "enquiry@chowtaifook.com",
    "src": "https://www.chowtaifook.com/zh-hk/eshop/contactus"
   },
   {
    "v": "order@e.chowtaifook.com",
    "src": "https://www.chowtaifook.com/zh-hk/customer-service/frequently-asked-questions"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.chowtaifook.com/zh-hk/house-of-ctf/about-chow-tai-fook",
   "https://www.chowtaifook.com/zh-hk/eshop/contactus",
   "https://www.chowtaifook.com/zh-hk/customer-service",
   "https://www.chowtaifook.com/zh-hk/customer-service/payment",
   "https://www.chowtaifook.com/zh-hk/customer-service/frequently-asked-questions",
   "https://www.chowtaifook.com/zh-hk/service-booking",
   "https://www.chowtaifook.com/zh-hk/customer-service/Jewellery-Club",
   "https://www.chowtaifook.com/zh-hk"
  ],
  "note": ""
 },
 "helzberg.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "1-800-435-9237",
    "src": "https://www.helzberg.com/jewelry-advice/all-about-lab-grown-diamonds.html",
    "kind": "text"
   },
   {
    "v": "18004359237",
    "src": "https://www.helzberg.com/contact-us.html",
    "kind": "tel"
   },
   {
    "v": "+18004359237",
    "src": "https://www.helzberg.com/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "1825 Swift St, 64116, North Kansas City, Missouri, United States",
    "src": "https://www.helzberg.com/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.helzberg.com/jewelry-advice/all-about-lab-grown-diamonds.html",
   "https://www.helzberg.com/jewelry-advice/all-about-natural-diamonds.html",
   "https://www.helzberg.com/jewelry-advice/all-about-moissanite.html",
   "https://www.helzberg.com/about-helzberg-diamonds.html",
   "https://www.helzberg.com/contact-us.html",
   "https://www.helzberg.com/"
  ],
  "note": ""
 },
 "danielwellington.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+46105517130",
    "src": "https://www.danielwellington.com/de-ch/policies/terms-of-service",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.danielwellington.com/policies/terms-of-service",
   "https://www.danielwellington.com/pages/contact-us",
   "https://www.danielwellington.com/pages/about-reviews",
   "https://www.danielwellington.com/",
   "https://www.danielwellington.com/en-th/policies/terms-of-service",
   "https://www.danielwellington.com/zh-th/policies/terms-of-service",
   "https://www.danielwellington.com/de-ch/policies/terms-of-service",
   "https://www.danielwellington.com/fr-ch/policies/terms-of-service"
  ],
  "note": ""
 },
 "bluenile.com": {
  "dm": "bluenile.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+17242041868",
    "src": "https://www.bluenile.com/services",
    "kind": "tel"
   },
   {
    "v": "18002422728",
    "src": "https://www.bluenile.com/services",
    "kind": "tel"
   },
   {
    "v": "+30824616",
    "src": "https://www.bluenile.com/services",
    "kind": "text",
    "loc": "GR"
   },
   {
    "v": "800440782",
    "src": "https://www.bluenile.com/contact-us",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "service@bluenile.com",
    "src": "https://www.bluenile.com/services"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.bluenile.com/services",
   "https://www.bluenile.com/contact-us",
   "https://www.bluenile.com/services/warranty",
   "https://www.bluenile.com/blue-nile-experience",
   "https://www.bluenile.com/contact-us/faq",
   "https://www.bluenile.com/services/free-returns",
   "https://www.bluenile.com/services/diamond-price-match",
   "https://www.bluenile.com/"
  ],
  "note": ""
 },
 "viking.de": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "lyreco.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "officedepot.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.officedepot.com/contact",
   "https://www.officedepot.com/contact-us",
   "https://www.officedepot.com/contactus",
   "https://www.officedepot.com/contacts",
   "https://www.officedepot.com/contact-us/",
   "https://www.officedepot.com/en/contact",
   "https://www.officedepot.com/en/contact-us",
   "https://www.officedepot.com/"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "thomassabo.com": {
  "dm": "thomassabo.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+4991239715",
    "src": "https://www.thomassabo.com/INT/en/imprint/ts-imprint.html",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "service@thomassabo.com",
    "src": "https://www.thomassabo.com/INT/en/contact-form/contact-form.html"
   },
   {
    "v": "press@thomassabo.com",
    "src": "https://www.thomassabo.com/INT/en/contact-form/contact-form.html"
   },
   {
    "v": "service-wholesale@thomassabo.com",
    "src": "https://www.thomassabo.com/INT/en/b2b-contact-form"
   },
   {
    "v": "info@thomassabo.com",
    "src": "https://www.thomassabo.com/INT/en/imprint/ts-imprint.html"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.thomassabo.com/INT/en/contact-form/contact-form.html",
   "https://www.thomassabo.com/INT/en/int-service-guides/int-service-guides.html",
   "https://www.thomassabo.com/INT/en/b2b-contact-form",
   "https://www.thomassabo.com/INT/en/imprint/ts-imprint.html",
   "https://www.thomassabo.com/INT/en/home"
  ],
  "note": ""
 },
 "avery.com": {
  "dm": "avery.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "(800) 462-8379",
    "src": "https://www.avery.com/help?utm_source=vanity&utm_campaign=contact",
    "kind": "text"
   },
   {
    "v": "+18004628379",
    "src": "https://www.avery.com/",
    "kind": "jsonld"
   }
  ],
  "emails": [
   {
    "v": "help@avery.com",
    "src": "https://www.avery.com/help?utm_source=vanity&utm_campaign=contact"
   }
  ],
  "addr": [
   {
    "v": "50 Pointe Drive, 92821, Brea, CA, US",
    "src": "https://www.avery.com/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.avery.com/blog/customer-spotlight-pacific-candle-company/",
   "https://www.avery.com/blog/customer-spotlight-alta-dena-candle-company/",
   "https://www.avery.com/help?utm_source=vanity&utm_campaign=contact",
   "https://www.avery.com/"
  ],
  "note": ""
 },
 "bicworld.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://corporate.bic.com/en-us/contact",
   "https://corporate.bic.com/en-us/contact-us",
   "https://corporate.bic.com/en-us"
  ],
  "note": "已读取官网 3 个页面，未检索到公开职能联系方式"
 },
 "herlitz.de": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+33231463737",
    "src": "https://www.herlitz.de/herlitzhp/Pulsar/ro.CMS.display.750./imprint",
    "kind": "text"
   },
   {
    "v": "+49332226",
    "src": "https://www.herlitz.de/herlitzhp/Pulsar/de.CMS.display.22./impressum",
    "kind": "text"
   },
   {
    "v": "+495116969",
    "src": "https://www.herlitz.de/herlitzhp/Pulsar/de.CMS.display.22./impressum",
    "kind": "text"
   },
   {
    "v": "+495116969212",
    "src": "https://www.herlitz.de/herlitzhp/Pulsar/de.CMS.display.22./impressum",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.herlitz.de/herlitzhp/Pulsar/de.CMS.display.22./impressum",
   "https://www.herlitz.de/herlitzhp/Pulsar/de.Core.displayContactForm.23.form.customerService./kontakt",
   "https://www.herlitz.de/herlitzhp/Pulsar/de.CMS.display.492./unternehmen",
   "https://www.herlitz.de/herlitzhp/Pulsar/de.CMS.display.1./herlitz",
   "https://www.herlitz.de/herlitzhp/Pulsar/ro.CMS.display.750./imprint",
   "https://www.herlitz.de/herlitzhp/Pulsar/en.CMS.display.552./imprint",
   "https://www.herlitz.de/herlitzhp/Pulsar/en.CMS.display.555./company"
  ],
  "note": ""
 },
 "esselte.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.esselte.com/en-gb/services/about-esselte",
   "https://www.esselte.com/en-gb/services/customer-support",
   "https://www.esselte.com/en-gb/services/newsletter",
   "https://www.esselte.com/en-gb/legal-notice",
   "https://www.esselte.com/en-gb/imprint",
   "https://www.esselte.com/en-gb/services/customer-support/packaging-recycling/packaging-recycling-guidance",
   "https://www.esselte.com/en-gb/change-country/",
   "https://www.esselte.com/nl-be/dealerinfo/about-esselte",
   "https://www.esselte.com/de-de/services/about-esselte",
   "https://www.esselte.com/de-at/services/about-esselte",
   "https://www.esselte.com/fr-be/distributeurs/about-esselte"
  ],
  "note": "已读取官网 11 个页面，未检索到公开职能联系方式"
 },
 "maped.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+33450272685",
    "src": "https://maped.com/legal-notices/",
    "kind": "text"
   },
   {
    "v": "+33144786365",
    "src": "https://maped.com/legal-notices/",
    "kind": "text"
   },
   {
    "v": "+41223084860",
    "src": "https://maped.com/legal-notices/",
    "kind": "text",
    "loc": "CH"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://maped.com/contact-us/",
   "https://maped.com/en/contact-us/",
   "https://maped.com/legal-notices/",
   "https://maped.com/"
  ],
  "note": "已读取官网 2 个页面，未检索到公开职能联系方式"
 },
 "accobrands.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "1-866-280-0246",
    "src": "https://www.accobrands.com/contact-us/",
    "kind": "text"
   },
   {
    "v": "1-800-541-0094",
    "src": "https://www.accobrands.com/contact-us/",
    "kind": "text"
   },
   {
    "v": "1-800-793-3523",
    "src": "https://www.accobrands.com/contact-us/",
    "kind": "text"
   },
   {
    "v": "1-800-648-6323",
    "src": "https://www.accobrands.com/contact-us/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.accobrands.com/our-company/",
   "https://www.accobrands.com/our-company/worldwide-locations/",
   "https://www.accobrands.com/our-company/our-leadership/",
   "https://www.accobrands.com/contact-us/",
   "https://www.accobrands.com/legal-notice/",
   "https://www.accobrands.com/"
  ],
  "note": ""
 },
 "fellowes.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.fellowes.com/?location=home",
   "https://www.fellowes.com/us/en/our-company/purpose/pg/earth",
   "https://www.fellowes.com/us/en/our-company/locations/pg/design-experience-center",
   "https://www.fellowes.com/us/en/our-company/overview/pg/family-heritage",
   "https://www.fellowes.com/us/en/our-company/purpose/pg/give",
   "https://www.fellowes.com/us/en",
   "https://www.fellowes.com/us/en/our-company/purpose"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "whirlpool.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "arcelik.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "staedtler.com": {
  "dm": "staedtler.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "4991193650",
    "src": "https://www.staedtler.com/intl/en/legal/imprint/",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info.de@staedtler.com",
    "src": "https://www.staedtler.com/intl/en/legal/imprint/"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.staedtler.com/intl/en/legal/imprint/",
   "https://www.staedtler.com/intl/en/company/about-staedtler/",
   "https://www.staedtler.com/intl/en/company/about-staedtler/sustainability-at-staedtler/",
   "https://www.staedtler.com/intl/en/company/about-staedtler/staedtler-worldwide/",
   "https://www.staedtler.com/intl/en/company/about-staedtler/history/",
   "https://www.staedtler.com/intl/en/company/about-staedtler/corporate-social-responsibility/world-kids-colouring-day/",
   "https://www.staedtler.com/intl/en/company/careers/",
   "https://www.staedtler.com/intl/en/"
  ],
  "note": ""
 },
 "panasonic.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "gorenje.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "miele.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+590690770461",
    "src": "https://www.miele.com/en/com/saint-martinsint-maarten-after-sales-service-4476.htm",
    "kind": "text"
   },
   {
    "v": "+17215560917",
    "src": "https://www.miele.com/en/com/saint-martinsint-maarten-after-sales-service-4476.htm",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "sales@miele.com.au",
    "src": "https://www.miele.com/en/com/contact-us-2073.htm"
   },
   {
    "v": "info@miele.at",
    "src": "https://www.miele.com/en/com/contact-us-2073.htm"
   },
   {
    "v": "info@miele.lv",
    "src": "https://www.miele.com/en/com/contact-us-2073.htm"
   },
   {
    "v": "info@miele.be",
    "src": "https://www.miele.com/en/com/contact-us-2073.htm"
   },
   {
    "v": "info@miele.cl",
    "src": "https://www.miele.com/en/com/contact-us-2073.htm"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.miele.com/en/com/saint-martinsint-maarten-after-sales-service-4476.htm",
   "https://www.miele.com/en/com/about-us-2065.htm",
   "https://www.miele.com/en/com/miele-service-2069.htm",
   "https://www.miele.com/en/com/contact-us-2073.htm",
   "https://www.miele.com/en/com/legal-notice-2075.htm",
   "https://www.miele.com/en/com/digital-services-act-7802.htm",
   "https://www.miele.com/en/com/index.htm"
  ],
  "note": ""
 },
 "bsh-group.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4989244133460",
    "src": "https://www.bsh-group.com/about-bsh/compliance-commitments",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "© 2026 BSH Hausgeräte GmbH A company of the Bosch Group",
    "src": "https://www.bsh-group.com/about-bsh/company-portrait",
    "kind": "tag"
   }
  ],
  "pages": [
   "https://www.bsh-group.com/about-bsh/company-portrait",
   "https://www.bsh-group.com/about-bsh/history-of-bsh",
   "https://www.bsh-group.com/about-bsh/bsh-worldwide",
   "https://www.bsh-group.com/about-bsh/compliance-commitments",
   "https://www.bsh-group.com/about-bsh/suppliers",
   "https://www.bsh-group.com/about-bsh/cooperation-platform",
   "https://www.bsh-group.com/products-brands/service-brands",
   "https://www.bsh-group.com/",
   "https://www.bsh-group.com/products-brands/customer-care",
   "https://www.bsh-group.com/legal-notice"
  ],
  "note": ""
 },
 "honeywell.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+17046276200",
    "src": "https://www.honeywell.com/us/en/company/about-us",
    "kind": "jsonld"
   },
   {
    "v": "+18005824263",
    "src": "https://www.honeywell.com/us/en/company/about-us",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "855 S. Mint Street, 28202, Charlotte, NC, US",
    "src": "https://www.honeywell.com/us/en/company/about-us",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.honeywell.com/us/en/company/about-us",
   "https://www.honeywell.com/us/en/company/leadership",
   "https://www.honeywell.com/us/en/company/partners",
   "https://www.honeywell.com/us/en/news/press-releases/2026/10/honeywell-technologies-helps-royal-caribbean-personalize-the-guest-experience-with-connected-cabin-automation-system",
   "https://www.honeywell.com/us/en/company/buildings",
   "https://www.honeywell.com/us/en/company/industrial",
   "https://www.honeywell.com/us/en/company/process",
   "https://www.honeywell.com/us/en",
   "https://www.honeywell.com/ca/en/company/about-us",
   "https://www.honeywell.com/ca/fr/company/about-us",
   "https://www.honeywell.com/in/en/company/about-us",
   "https://www.honeywell.com/us/en/news/press-releases/2026/10/honeywell-technologies-helps-hengyi-industries-brunei-facility-improve-efficiency-and-reliability-with-higher-value-petrochemicals-production",
   "https://www.honeywell.com/us/en/news/press-releases/2026/10/honeywell-technologies-to-help-gpic-build-new-aromatics-complex-in-bahrain"
  ],
  "note": ""
 },
 "bosch-home.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+498945903641",
    "src": "https://www.bosch-home.com/mt/en/services",
    "kind": "text"
   },
   {
    "v": "+41848888200",
    "src": "https://www.bosch-home.com/ch/de/services",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.bosch-home.com/service",
   "https://www.bosch-home.com/imprint/legal-notes",
   "https://www.bosch-home.com/imprint/data-protection-information",
   "https://www.bosch-home.com:443/contact-us",
   "https://www.bosch-home.com:443/contact-us/",
   "https://www.bosch-home.com:443/",
   "https://www.bosch-home.com/service/contacts",
   "https://www.bosch-home.com/de/de/services",
   "https://www.bosch-home.com/mt/en/services",
   "https://www.bosch-home.com/ch/de/services"
  ],
  "note": ""
 },
 "smeg.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+3905228211",
    "src": "https://www.smeg.com/company/sustainability",
    "kind": "tel"
   },
   {
    "v": "05221606010",
    "src": "https://www.smeg.com/company/sustainability",
    "kind": "tel"
   },
   {
    "v": "+390522821452",
    "src": "https://www.smeg.com/company/sustainability",
    "kind": "text"
   },
   {
    "v": "+3902982171",
    "src": "https://www.smeg.com/manufacturer-contacts",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "Via Leonardo da Vinci, 4, 42016, RE",
    "src": "https://www.smeg.com/company/sustainability",
    "kind": "jsonld"
   },
   {
    "v": "Dublin, Northern Ireland, IE",
    "src": "https://www.smeg.com/ie/contacts",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.smeg.com/company/sustainability",
   "https://www.smeg.com/contacts",
   "https://www.smeg.com/services/customer-service",
   "https://www.smeg.com/company/about-us",
   "https://www.smeg.com/company/history",
   "https://www.smeg.com/company/prizes-awards",
   "https://www.smeg.com/manufacturer-contacts",
   "https://www.smeg.com/",
   "https://www.smeg.com/in/company/sustainability",
   "https://www.smeg.com/ie/contacts",
   "https://www.smeg.com/no/support/kontakt",
   "https://www.smeg.com/ca-en/contacts"
  ],
  "note": ""
 },
 "faber-castell.com": {
  "dm": "faber-castell.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+499119965",
    "src": "https://www.faber-castell.com/service/press",
    "kind": "text"
   },
   {
    "v": "+4991199655856",
    "src": "https://www.faber-castell.com/legal/Legal-Notice",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "press-office@faber-castell.com",
    "src": "https://www.faber-castell.com/service/press"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.faber-castell.com/service/fake-shops-competition",
   "https://www.faber-castell.com/service/press",
   "https://www.faber-castell.com/service/customer-service",
   "https://www.faber-castell.com/service/media-database",
   "https://www.faber-castell.com/service/addresses-worldwide",
   "https://www.faber-castell.com/legal/Legal-Notice",
   "https://www.faber-castell.com/"
  ],
  "note": ""
 },
 "adt.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "haier-europe.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+390392086",
    "src": "https://www.haier-europe.com/it_IT/",
    "kind": "text"
   },
   {
    "v": "+390392086237",
    "src": "https://www.haier-europe.com/it_IT/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.haier-europe.com/it_IT/",
   "https://www.haier-europe.com/locale.html/contact-us",
   "https://www.haier-europe.com/locale.html"
  ],
  "note": ""
 },
 "axis.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+611300294747",
    "src": "https://www.axis.com/en-ph/support/2n-product-support",
    "kind": "text"
   },
   {
    "v": "+640800294747",
    "src": "https://www.axis.com/en-ph/support/2n-product-support",
    "kind": "text"
   },
   {
    "v": "+918041571222",
    "src": "https://www.axis.com/en-ph/support/2n-product-support",
    "kind": "text"
   },
   {
    "v": "800-444-2947",
    "src": "https://www.axis.com/en-ph/support/2n-product-support",
    "kind": "text"
   },
   {
    "v": "+64800294747",
    "src": "https://www.axis.com/en-ph/support/2n-product-support",
    "kind": "text",
    "loc": "NZ"
   }
  ],
  "emails": [
   {
    "v": "info-de@axis.com",
    "src": "https://light-building.messefrankfurt.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [
   {
    "v": "Grenden 1, 223 69, Lund, SE",
    "src": "https://www.axis.com/en-ph/solutions/managed-services",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.axis.com/en-ph/solutions/solutions-by-services",
   "https://www.axis.com/en-ph/solutions/managed-services",
   "https://www.axis.com/en-ph/solutions/professional-services",
   "https://www.axis.com/en-ph/support/tools",
   "https://www.axis.com/en-ph/support",
   "https://www.axis.com/en-ph/support/device-software",
   "https://www.axis.com/en-ph/forms/axis-os-notification-service",
   "https://www.axis.com/en-ph",
   "https://www.axis.com/solutions/solutions-by-services",
   "https://www.axis.com/en-ph/support/2n-product-support",
   "https://www.axis.com/en-ph/support/tools/axis-site-designer",
   "https://www.axis.com/en-ph/support/software"
  ],
  "note": ""
 },
 "vivint.com": {
  "dm": "vivint.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+18444818630",
    "src": "https://www.vivint.com/services",
    "kind": "tel"
   },
   {
    "v": "+18556166589",
    "src": "https://www.vivint.com/services",
    "kind": "jsonld"
   },
   {
    "v": "+18773571831",
    "src": "https://www.vivint.com/services",
    "kind": "text"
   },
   {
    "v": "844.395.9444",
    "src": "https://www.vivint.com/services",
    "kind": "text"
   }
  ],
  "emails": [
   {
    "v": "press@vivint.com",
    "src": "https://www.vivint.com/company/newsroom"
   }
  ],
  "addr": [
   {
    "v": "1550 Digital Dr 5th Floor, 84043, Lehi, UT, US",
    "src": "https://www.vivint.com/services",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.vivint.com/services",
   "https://www.vivint.com/legal/terms-of-services",
   "https://www.vivint.com/company/about-us",
   "https://www.vivint.com/locations",
   "https://www.vivint.com/company/newsroom",
   "https://www.vivint.com/company/careers",
   "https://www.vivint.com/company/gives-back",
   "https://www.vivint.com/"
  ],
  "note": ""
 },
 "allegion.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.allegion.com/corp/en/header/locations.html",
   "https://www.allegion.com/corp/en/header/contact-us.html",
   "https://www.allegion.com/corp/en/about.html",
   "https://www.allegion.com/corp/en/about/ESG.html",
   "https://www.allegion.com/corp/en/about/ESG/environmental.html",
   "https://www.allegion.com/corp/en/about/ESG/social.html",
   "https://www.allegion.com/corp/en/about/ESG/governance.html",
   "https://www.allegion.com/corp/en/index.html",
   "https://www.allegion.com/corp/en/about/leadership.html",
   "https://www.allegion.com/corp/en/about/annual-report.html",
   "https://www.allegion.com/corp/en/about/annual-report/ceo-letter.html",
   "https://www.allegion.com/corp/en/about/annual-report/year-in-review.html"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "nedap.com": {
  "dm": "nedap.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+3222572540",
    "src": "https://www.nedap.com/en/contact-us/offices",
    "kind": "text",
    "loc": "BE"
   },
   {
    "v": "+85231049930",
    "src": "https://www.nedap.com/en/contact-us/offices",
    "kind": "text",
    "loc": "HK"
   },
   {
    "v": "+862161561620",
    "src": "https://www.nedap.com/en/contact-us/offices",
    "kind": "text",
    "loc": "CN"
   },
   {
    "v": "+64278459004",
    "src": "https://www.nedap.com/en/contact-us/offices",
    "kind": "text",
    "loc": "NZ"
   }
  ],
  "emails": [
   {
    "v": "info-cn@nedap.com",
    "src": "https://www.nedap.com/en/contact-us/offices"
   },
   {
    "v": "info@nedap.com",
    "src": "https://www.nedap.com/en/contact-us/offices"
   },
   {
    "v": "info-be@nedap.com",
    "src": "https://www.nedap.com/en/contact-us/offices"
   },
   {
    "v": "info-uk@nedap.com",
    "src": "https://www.nedap.com/en/contact-us/offices"
   },
   {
    "v": "info-es@nedap.com",
    "src": "https://www.nedap.com/en/contact-us/offices"
   }
  ],
  "addr": [
   {
    "v": "Parallelweg 2, 7141 DC, Groenlo, NL",
    "src": "https://www.nedap.com/en",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.nedap.com/en/about-nedap",
   "https://www.nedap.com/en/contact-us",
   "https://www.nedap.com/en/contact-us/offices",
   "https://www.nedap.com/en/contact-us/media-press",
   "https://www.nedap.com/en/contact-us/support",
   "https://www.nedap.com/en/news/nedap-expands-presence-in-saudi-arabia-with-new-office",
   "https://www.nedap.com/en"
  ],
  "note": ""
 },
 "boschsecurity.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.boschbuildingtechnologies.com/lifesafetysystems/en/contact/",
   "https://www.boschbuildingtechnologies.com/lifesafetysystems/en/support/after-sales-services/",
   "https://www.boschbuildingtechnologies.com/lifesafetysystems/en/contact/confirmation-upgrade-alarm-communications-dealer/",
   "https://www.boschbuildingtechnologies.com/lifesafetysystems/en/contact/confirmation-download-white-paper/",
   "https://www.boschbuildingtechnologies.com/lifesafetysystems/en/contact/confirmation-technology-talk/",
   "https://www.boschbuildingtechnologies.com/lifesafetysystems/en/contact/webinar-confirmation/",
   "https://www.boschbuildingtechnologies.com/lifesafetysystems/en/contact/confirmation-download/",
   "https://www.boschbuildingtechnologies.com/lifesafetysystems/en/"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "thetorocompany.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.thetorocompany.com/contact",
   "https://www.thetorocompany.com/contact-us",
   "https://www.thetorocompany.com/"
  ],
  "note": "已读取官网 3 个页面，未检索到公开职能联系方式"
 },
 "hidglobal.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "enquiries-emea@hidglobal.com",
    "src": "https://intersecglobal.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "paxton-access.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "01273811011",
    "src": "https://www.paxton-access.com/paxton-joins-forces-with-skills-for-security-and-texecom-to-help-installers-navigate-martyn-law/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "Paxton House, BN1 9HU, Home Farm Road, , , East Sussex",
    "src": "https://www.paxton-access.com/paxton-joins-forces-with-skills-for-security-and-texecom-to-help-installers-navigate-martyn-law/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.paxton-access.com/paxton-joins-forces-with-skills-for-security-and-texecom-to-help-installers-navigate-martyn-law/",
   "https://www.paxton-access.com/about/",
   "https://www.paxton-access.com/about/careers/",
   "https://www.paxton-access.com/about/recognition/",
   "https://www.paxton-access.com/contact-us/",
   "https://www.paxton-access.com/about/compliance-policies/",
   "https://www.paxton-access.com/",
   "https://www.paxton-access.com/about/working-at-paxton/"
  ],
  "note": ""
 },
 "genetec.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [
   {
    "v": "support@genetec.com",
    "src": "https://intersecglobal.com",
    "via": "expo",
    "at": "2026-10-31"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.genetec.com/contact-us",
   "https://www.genetec.com/contact-us/",
   "https://www.genetec.com/de/kontakt",
   "https://www.genetec.com/"
  ],
  "note": "已读取官网 4 个页面，未检索到公开职能联系方式"
 },
 "johnsoncontrols.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "(888) 746-7539",
    "src": "https://www.johnsoncontrols.com/services-and-support/fire-maintenance-and-support",
    "kind": "text"
   },
   {
    "v": "800 746 7539",
    "src": "https://www.johnsoncontrols.com/services-and-support/fire-maintenance-and-support",
    "kind": "text"
   },
   {
    "v": "8662272750",
    "src": "https://www.johnsoncontrols.com/services-and-support",
    "kind": "tel"
   },
   {
    "v": "18002755676",
    "src": "https://www.johnsoncontrols.com/services-and-support",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.johnsoncontrols.com/contact-an-expert",
   "https://www.johnsoncontrols.com/fire-suppression/mechanical-fittings-and-supports",
   "https://www.johnsoncontrols.com/services-and-support/fire-maintenance-and-support",
   "https://www.johnsoncontrols.com/hvac-equipment/hvac-equipment-solutions-and-services",
   "https://www.johnsoncontrols.com/services-and-support",
   "https://www.johnsoncontrols.com/services-and-support/capital-funding-solutions",
   "https://www.johnsoncontrols.com/services-and-support/controls-services",
   "https://www.johnsoncontrols.com/",
   "https://www.johnsoncontrols.com/services-and-support/design-and-construction-solutions",
   "https://www.johnsoncontrols.com/services-and-support/operations-maintenance-and-repair-services",
   "https://www.johnsoncontrols.com/services-and-support/managed-services"
  ],
  "note": ""
 },
 "milestonesys.com": {
  "dm": "milestonesys.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+443330579149",
    "src": "https://www.milestonesys.com/company/about-us",
    "kind": "text",
    "loc": "GB"
   },
   {
    "v": "+4588300300",
    "src": "https://www.milestonesys.com/company/about-us",
    "kind": "text"
   },
   {
    "v": "+35924426172",
    "src": "https://www.milestonesys.com/company/about-us",
    "kind": "text",
    "loc": "BG"
   },
   {
    "v": "+33184021080",
    "src": "https://www.milestonesys.com/company/about-us",
    "kind": "text",
    "loc": "FR"
   }
  ],
  "emails": [
   {
    "v": "orders@milestonesys.com",
    "src": "https://www.milestonesys.com/contact-us"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.milestonesys.com/supported-devices",
   "https://www.milestonesys.com/company/about-us",
   "https://www.milestonesys.com/company/events",
   "https://www.milestonesys.com/support-resources",
   "https://www.milestonesys.com/contact-us",
   "https://www.milestonesys.com/contact-sales",
   "https://www.milestonesys.com/"
  ],
  "note": ""
 },
 "birkenstock.com": {
  "dm": "birkenstock.com",
  "at": "2026-10-21",
  "phones": [],
  "emails": [
   {
    "v": "customerservice.ph@birkenstock.com",
    "src": "https://www.birkenstock.com/ph/service-contact/",
    "loc": "PH"
   },
   {
    "v": "media@birkenstock.com",
    "src": "https://www.birkenstock.com/ph/journal/heritage/",
    "loc": "PH"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.birkenstock.com/ph/1774/about/",
   "https://www.birkenstock.com/ph/service-contact/",
   "https://www.birkenstock.com/ph/about-us/company/",
   "https://www.birkenstock.com/ph/journal/heritage/",
   "https://www.birkenstock.com/ph/about-us/brands/",
   "https://www.birkenstock.com/ph/about-us/responsibility/",
   "https://www.birkenstock.com/ph"
  ],
  "note": ""
 },
 "erco.com": {
  "dm": "erco.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+492351551",
    "src": "https://www.erco.com/en/erco-services-for-light-and-architecture/",
    "kind": "text"
   },
   {
    "v": "+492351551300",
    "src": "https://www.erco.com/en/erco-services-for-light-and-architecture/",
    "kind": "text"
   },
   {
    "v": "+4923515510",
    "src": "https://www.erco.com/en/contact/worldwide/",
    "kind": "tel"
   }
  ],
  "emails": [
   {
    "v": "info@erco.com",
    "src": "https://www.erco.com/en/erco-services-for-light-and-architecture/"
   }
  ],
  "addr": [
   {
    "v": "Brockhauser Weg 80-82, 58507, Lüdenscheid, Germany",
    "src": "https://www.erco.com/en/contact/worldwide/",
    "kind": "microdata"
   },
   {
    "v": "ERCO GmbH Brockhauser Weg 80-82 58507 Lüdenscheid Germany",
    "src": "https://www.erco.com/en/contact/worldwide/",
    "kind": "tag"
   }
  ],
  "pages": [
   "https://www.erco.com/en/service/events-6094/",
   "https://www.erco.com/en/erco-services-for-light-and-architecture/",
   "https://www.erco.com/en/about-erco/",
   "https://www.erco.com/en/about-erco-purchasing/",
   "https://www.erco.com/en/contact/worldwide/",
   "https://www.erco.com/en/legal-company-info/",
   "https://www.erco.com/en/contact/",
   "https://www.erco.com/en/"
  ],
  "note": ""
 },
 "paulmann.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://en.paulmann.com/"
  ],
  "note": "已读取官网 1 个页面，未检索到公开职能联系方式"
 },
 "footlocker.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "1.800.991.6815",
    "src": "https://www.footlocker.com/help/store-pickup",
    "kind": "text"
   },
   {
    "v": "800-991-6815",
    "src": "https://help.footlocker.com/hc/en-us/categories/360002182413-Ordering-and-Shipping",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.footlocker.com/help/store-pickup",
   "https://www.footlocker.com/contact",
   "https://www.footlocker.com/contact-us",
   "https://www.footlocker.com/contactus",
   "https://www.footlocker.com/contacts",
   "https://www.footlocker.com/contact-us/",
   "https://www.footlocker.com/en/contact",
   "https://www.footlocker.com/",
   "https://help.footlocker.com/hc/en-us/categories/360002182413-Ordering-and-Shipping",
   "https://www.footlocker.com/contact.html",
   "https://www.footlocker.com/contact-us.html",
   "https://www.footlocker.com/contactus.html"
  ],
  "note": ""
 },
 "mattel.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://about.mattel.com",
   "https://about.mattel.com/"
  ],
  "note": "已读取官网 2 个页面，未检索到公开职能联系方式"
 },
 "hardi-international.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://hardi.com/en?popup=1/contact",
   "https://hardi.com/en?popup=1/contact-us",
   "https://hardi.com/en?popup=1/contactus",
   "https://hardi.com/en?popup=1/contacts",
   "https://hardi.com/en?popup=1/contact-us/",
   "https://hardi.com/en?popup=1/en/contact",
   "https://hardi.com/en?popup=1/en/contact-us",
   "https://hardi.com/en?popup=1"
  ],
  "note": "已读取官网 8 个页面，未检索到公开职能联系方式"
 },
 "puma.com": {
  "dm": "puma.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+63180013220382",
    "src": "https://ph.puma.com/ph/en/home",
    "kind": "jsonld",
    "loc": "PH"
   }
  ],
  "emails": [
   {
    "v": "service@sea.puma.com",
    "src": "https://ph.puma.com/ph/en/home",
    "loc": "PH"
   }
  ],
  "addr": [
   {
    "v": "Ground Floor, BDO Equitable Tower, 8751 Paseo De Roxas, Makati City, 1227, Manila, Philippines",
    "src": "https://ph.puma.com/ph/en/home",
    "kind": "jsonld",
    "loc": "PH"
   },
   {
    "v": "PUMA WAY 1, 91074, Herzogenaurach, Germany",
    "src": "https://ph.puma.com/ph/en/home",
    "kind": "jsonld",
    "loc": "PH"
   }
  ],
  "pages": [
   "https://ph.puma.com/ph/en/home"
  ],
  "note": ""
 },
 "petsmart.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "888-839-9638",
    "src": "https://www.petsmart.com/help",
    "kind": "text"
   },
   {
    "v": "8888399638",
    "src": "https://www.petsmart.com/account/contact",
    "kind": "tel"
   },
   {
    "v": "18888399638",
    "src": "https://www.petsmart.com/help/returns-and-refunds-H0008a.html",
    "kind": "tel"
   },
   {
    "v": "+18888399638",
    "src": "https://www.petsmart.com/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "19601 N. 27th Avenue, 85027, Phoenix, AZ, US",
    "src": "https://www.petsmart.com/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.petsmart.com/help/returns-and-refunds-H0008b.html",
   "https://www.petsmart.com/help/shipping-and-delivery-H0007d.html",
   "https://www.petsmart.com/help/promotional-terms",
   "https://www.petsmart.com/help",
   "https://www.petsmart.com/account/contact",
   "https://www.petsmart.com/help/returns-and-refunds-H0008a.html",
   "https://www.petsmart.com/help/accessibility-statement.html",
   "https://www.petsmart.com/",
   "https://www.petsmart.com/help/payment-H0004b.html",
   "https://www.petsmart.com/help/payment-H0004c.html",
   "https://www.petsmart.com/help/your-order-H0003a.html",
   "https://www.petsmart.com/help/your-order-H0003b.html"
  ],
  "note": ""
 },
 "mondelez.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+18479434000",
    "src": "https://www.mondelezinternational.com/contact-us/index.html",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.mondelezinternational.com/contact-us/index.html",
   "https://www.mondelezinternational.com:443/contact-us/",
   "https://www.mondelezinternational.com:443/"
  ],
  "note": ""
 },
 "technogym.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.technogym.com/en-INT/contacts/",
   "https://www.technogym.com/en-INT/support/",
   "https://www.technogym.com/en-INT/",
   "https://www.technogym.com/ar-INT/support/",
   "https://www.technogym.com/ar-AE/support/"
  ],
  "note": "已读取官网 5 个页面，未检索到公开职能联系方式"
 },
 "zooplus.com": {
  "dm": "zooplus.com",
  "at": "2026-10-21",
  "phones": [
   {
    "v": "+441865951301",
    "src": "https://www.zooplus.com/info/about/shippingcosts",
    "kind": "text",
    "loc": "GB"
   },
   {
    "v": "+441234430366",
    "src": "https://www.zooplus.com/info/about/security",
    "kind": "text",
    "loc": "GB"
   },
   {
    "v": "+441865951303",
    "src": "https://www.zooplus.com/info/about/returns",
    "kind": "text",
    "loc": "GB"
   }
  ],
  "emails": [
   {
    "v": "service@zooplus.com",
    "src": "https://www.zooplus.com/info/about/returns"
   }
  ],
  "addr": [],
  "pages": [
   "https://www.zooplus.com/info/about/shippingcosts",
   "https://support.zooplus.com/en/support/home",
   "https://www.zooplus.com/info/about/security",
   "https://www.zooplus.com/info/about/subscription?utm-source=utm_source_banner&amp;analytics-id=qp85kbzn8noe-5l95fLKSsC9Mz8tuGj86LL",
   "https://www.zooplus.com/info/about/subscription",
   "https://www.zooplus.com/info/about/returns",
   "https://www.zooplus.com/info/about/zooplus",
   "https://www.zooplus.com/"
  ],
  "note": ""
 },
 "pandora.net": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "4103090200",
    "src": "https://stores.pandora.net/store-finder/contact/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://stores.pandora.net/store-finder/contact/",
   "https://stores.pandora.net/store-finder/contact-us/",
   "https://stores.pandora.net/store-finder/contactus/",
   "https://stores.pandora.net/store-finder/contacts/",
   "https://stores.pandora.net/store-finder/en/contact/",
   "https://stores.pandora.net/store-finder/en/contact-us/",
   "https://stores.pandora.net/store-finder"
  ],
  "note": ""
 },
 "fressnapf.de": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+4921514115760",
    "src": "https://www.fressnapf.de/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [
   {
    "v": "Westpreußenstr. 32 - 38, 47809, Krefeld, DE-NW, DE",
    "src": "https://www.fressnapf.de/",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.fressnapf.de/servicewelt/",
   "https://www.fressnapf.de/servicewelt/dr-fressnapf/",
   "https://www.fressnapf.de/servicewelt/apodiscounter-suche/",
   "https://www.fressnapf.de/servicewelt/tierversicherungen/",
   "https://www.fressnapf.de/servicewelt/salon/",
   "https://www.fressnapf.de/servicewelt/maerkte/",
   "https://www.fressnapf.de/"
  ],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "staples.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "+18883333199",
    "src": "https://www.staples.com/services/printing/custom-cards/holiday-cards/?utm_source=staples.com&amp;utm_medium=referral&amp;utm_campaign=navigation_pms&amp;utm_content=holiday-cards",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.staples.com/services/printing/custom-cards/holiday-cards/?utm_source=staples.com&amp;utm_medium=referral&amp;utm_campaign=navigation_pms&amp;utm_content=holiday-cards",
   "https://www.staples.com/services/printing/copies-documents-printing/?utm_source=staples.com&amp;utm_medium=referral&amp;utm_campaign=headernav_bottom_right&amp;utm_content=document-printing",
   "https://www.staples.com/services/printing/copies-documents-printing/?utm_source=staples.com&amp;utm_medium=referral&amp;utm_campaign=navigation_pms&amp;utm_content=document-printing",
   "https://www.staples.com/deals/all-services/BI3001123",
   "https://www.staples.com/services/printing/?utm_source=staples.com&amp;utm_medium=referral&amp;utm_campaign=navigation_products&amp;utm_content=product_navlink_main_pms",
   "https://www.staples.com/Office-Supplies/cat_SC1",
   "https://www.staples.com/",
   "https://www.staples.com/services/printing/_next/static/media/6fd9793a674db7b2-s.p.woff2",
   "https://www.staples.com/services/printing/_next/static/media/89d19bd912ba1bb4-s.p.woff2",
   "https://www.staples.com/services/printing/_next/static/media/ac46ec4176c2ede2-s.p.woff2",
   "https://www.staples.com/services/printing/_next/static/media/c20b75baac17c73a-s.p.woff2",
   "https://www.staples.com/services/printing/offers/print-coupons/?utm_source=staples.com&amp;utm_medium=referral&amp;utm_campaign=tophat&amp;utm_content=default-holiday",
   "https://www.staples.com/services/printing/custom-stationery?utm_source=staples.com&amp;utm_medium=referral&amp;utm_campaign=navigation_pms&amp;utm_content=envelopes"
  ],
  "note": ""
 },
 "lg.com": {
  "at": "2026-11-02",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.lg.com/_ncms/asia/packages/support-shared.e77e52d8b72c22280389.js",
   "https://www.lg.com/_ncms/asia/packages/ltr.53b99552df571c1c6a66.support-shared.css",
   "https://www.lg.com/ph/support/lg-thinq",
   "https://www.lg.com/ph/support",
   "https://www.lg.com/ph/support/warranty-terms",
   "https://www.lg.com/ph/support/product-support/product-registration",
   "https://www.lg.com/ph/support/product-support/manuals-software",
   "https://www.lg.com/ph/",
   "https://www.lg.com/ph/support/product-support/troubleshoot/",
   "https://www.lg.com/ph/support/product-support/repair-request/",
   "https://www.lg.com/ph/support/order-support/track-my-order/",
   "https://www.lg.com/ph/support/order-support/frequently-asked-questions/",
   "https://www.lg.com/ph/support/lg-thinq/",
   "https://www.lg.com/ph/support/",
   "https://www.lg.com/ph/support/warranty-terms/",
   "https://www.lg.com/ph/support/product-support/product-registration/",
   "https://www.lg.com/ph/support/product-support/manuals-software/"
  ],
  "note": "已读取官网 12 个页面，未检索到公开职能联系方式"
 },
 "samsung.com": {
  "at": "2026-11-02",
  "phones": [
   {
    "v": "0284222111",
    "src": "https://www.samsung.com/ph/support/",
    "kind": "tel"
   },
   {
    "v": "+63284222111",
    "src": "https://www.samsung.com/ph/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.samsung.com/ph/tvs/help-me-choose/",
   "https://www.samsung.com/ph/audio-devices/help-me-choose/",
   "https://www.samsung.com/ph/monitors/help-me-choose/",
   "https://www.samsung.com/ph/support/",
   "https://www.samsung.com/ph/support/user-manuals-and-guide/",
   "https://www.samsung.com/ph/offer/installation-services/",
   "https://www.samsung.com/ph/support/contact/",
   "https://www.samsung.com/ph/",
   "https://www.samsung.com/ph/tvs/help-me-choose",
   "https://www.samsung.com/ph/audio-devices/help-me-choose",
   "https://www.samsung.com/ph/monitors/help-me-choose",
   "https://www.samsung.com/ph/support",
   "https://www.samsung.com/ph/support/user-manuals-and-guide",
   "https://www.samsung.com/ph/offer/installation-services",
   "https://www.samsung.com/ph/support/contact"
  ],
  "note": ""
 }
};
window.FAL_L2_META = {
 "total": 398,
 "at": "2026-10-31",
 "withPhone": 209,
 "withEmail": 124,
 "withAddr": 62,
 "none": 164,
 "expoBackfill": 21,
 "method": "官方域名首页 → 发现 Contact/Kontakt/Impressum/About/Locations 页 → 原样提取 mailto: / tel: / JSON-LD / <address>；每条记录来源页面 URL；抓不到即记「未检索到公开准确信息」。部分职能邮箱回填自展会参展商公开名录（via=expo，src 为名录地址）。"
};
