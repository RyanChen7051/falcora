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
window.FAL_L2 = {
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
    "kind": "text"
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
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.schmidtundbender.de/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "steiner-optics.com": {
  "dm": "steiner-optics.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+18885506255",
    "src": "https://www.steiner-optics.com/support",
    "kind": "tel"
   },
   {
    "v": "+490921787915",
    "src": "https://www.steiner-optics.com/support",
    "kind": "tel"
   },
   {
    "v": "+19374262341",
    "src": "https://www.steiner-optics.com/support",
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
   "https://www.steiner-optics.com/"
  ],
  "note": ""
 },
 "zeiss.com": {
  "dm": "zeiss.com",
  "at": "2026-10-20",
  "phones": [
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
   "https://www.zeiss.com/corporate/en/home.html",
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
  "dm": "marchscopes.com",
  "at": "2026-10-20",
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
   "https://marchscopes.com/"
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
  "dm": "burrisoptics.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+18884400244",
    "src": "https://www.burrisoptics.com/support/customer-service",
    "kind": "tel"
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
   "https://www.burrisoptics.com/"
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
  "dm": "steiner.de",
  "at": "2026-10-20",
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
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.steiner.de/footer/service/katalog",
   "https://www.steiner.de/footer/service/service-welt",
   "https://www.steiner.de/footer/service/reparatur-ersatzteilservice",
   "https://www.steiner.de/footer/service/produktgarantie",
   "https://www.steiner.de/footer/service/optiklexikon",
   "https://www.steiner.de/footer/service/faq",
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
    "kind": "text"
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
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "primaryarms.com": {
  "dm": "primaryarms.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "deltaoptical.pl": {
  "dm": "deltaoptical.pl",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
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
    "v": "+49037157383010",
    "src": "https://www.ddoptics.de/jobs/stellenangebot-technik-service/",
    "kind": "tel"
   },
   {
    "v": "+4937157383010",
    "src": "https://www.ddoptics.de/service/",
    "kind": "tel"
   },
   {
    "v": "+490351417223099",
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
    "v": "+32050692319",
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
  "dm": "magpul.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "511tactical.com": {
  "dm": "511tactical.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "konus.com": {
  "dm": "konus.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+390456767670",
    "src": "https://www.konus.com/",
    "kind": "tel"
   },
   {
    "v": "+13058847618",
    "src": "https://www.konus.com/",
    "kind": "tel"
   },
   {
    "v": "393274066621",
    "src": "https://www.konus.com/",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.konus.com/"
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
  "dm": "helikon-tex.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "cryeprecision.com": {
  "dm": "cryeprecision.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.cryeprecision.com/support",
   "https://www.cryeprecision.com/contact",
   "https://www.cryeprecision.com/contact",
   "https://www.cryeprecision.com/en/contact",
   "https://www.cryeprecision.com/en/contact-us",
   "https://www.cryeprecision.com/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
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
  "dm": "lindnerhof-taktik.de",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+498042503900",
    "src": "https://lindnerhof-taktik.de/newsroom/company-news",
    "kind": "tel"
   },
   {
    "v": "+123123456789",
    "src": "https://lindnerhof-taktik.de/newsroom/company-news",
    "kind": "text"
   },
   {
    "v": "+490804250390",
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
   "https://lindnerhof-taktik.de/about-us",
   "https://lindnerhof-taktik.de/legal-notice",
   "https://lindnerhof-taktik.de/"
  ],
  "note": ""
 },
 "tasmaniantiger.info": {
  "dm": "tasmaniantiger.info",
  "at": "2026-10-20",
  "phones": [],
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
  "dm": "mechanix.com",
  "at": "2026-10-20",
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
  "dm": "esseyepro.com",
  "at": "2026-10-20",
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
   "https://esseyepro.com/"
  ],
  "note": ""
 },
 "esstac.com": {
  "dm": "esstac.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://esstac.com/contact-us/",
   "https://esstac.com/support/",
   "https://esstac.com/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "mysteryranch.com": {
  "dm": "mysteryranch.com",
  "at": "2026-10-20",
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
   "https://www.mysteryranch.com/contact",
   "https://www.mysteryranch.com/contactus",
   "https://www.mysteryranch.com/en/contact",
   "https://www.mysteryranch.com/en/contact-us",
   "https://www.mysteryranch.com/"
  ],
  "note": ""
 },
 "velocitysystems.net": {
  "dm": "velocitysystems.net",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "logitech.com": {
  "dm": "logitech.com",
  "at": "2026-10-20",
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
   "https://www.logitech.com/en-us/change-location"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
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
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "philips.com": {
  "dm": "philips.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.philips.com/a-w/about",
   "https://www.philips.com.cn/healthcare/service-categories",
   "https://www.philips.com/a-w/about/news-and-insights.html",
   "https://www.philips.com/a-w/about/innovation.html",
   "https://www.philips.com/a-w/about/sustainability.html",
   "https://www.philips.com.ph/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "bose.com": {
  "dm": "bose.com",
  "at": "2026-10-20",
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
   "https://www.bose.com/home"
  ],
  "note": ""
 },
 "gentexcorp.com": {
  "dm": "gentexcorp.com",
  "at": "2026-10-20",
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
   "https://www.gentexcorp.com/about-us",
   "https://www.gentexcorp.com/contact/",
   "https://www.gentexcorp.com/news/ops-core-secures-order-supporting-canadian-army",
   "https://www.gentexcorp.com/"
  ],
  "note": ""
 },
 "legrand.com": {
  "dm": "legrand.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "0800414243",
    "src": "https://www.legrand.com/en/investors-and-shareholders/shareholders-corner/contact-us",
    "kind": "tel"
   },
   {
    "v": "+330149725353",
    "src": "https://www.legrand.com/en/investors-and-shareholders/contact-us",
    "kind": "text"
   },
   {
    "v": "+330555067015",
    "src": "https://www.legrand.com/en/investors-and-shareholders/contact-us",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.legrand.com/en/investors-and-shareholders/shareholders-corner/contact-us",
   "https://www.legrand.com/en/investors-and-shareholders/contact-us",
   "https://www.legrand.com/en/contact",
   "https://www.legrand.com/en"
  ],
  "note": ""
 },
 "belkin.com": {
  "dm": "belkin.com",
  "at": "2026-10-20",
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
   "https://www.belkin.com/p/usb-c-to-hdmi-adapter-supports-dolby-vision/F2CU038dsWHTAPL.html",
   "https://www.belkin.com/p/7-outlet-home%2Foffice-surge-protector-6-cord/BE107200-06.html",
   "https://www.belkin.com/p/12-outlet-home%2Foffice-surge-protector-with-8-foot-cord/SRA009p12tt8.html",
   "https://www.belkin.com/p/6-outlet-home%2Foffice-surge-protector-rotating-plug-8-cord/BE106000-08R.html",
   "https://www.belkin.com/company/blog/docking-stations-to-power-your-apple-m4-macbook-pro/",
   "https://www.belkin.com/company/blog/belkin-enterprise-environments/",
   "https://www.belkin.com/"
  ],
  "note": ""
 },
 "schurter.com": {
  "dm": "schurter.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.schurter.com/en/markets/automotive/emc-measurement-service",
   "https://www.schurter.com/en/info-center/help-center",
   "https://www.schurter.com/en/info-center/support-tools",
   "https://www.schurter.com/en/info-center/support-tools/cross-reference",
   "https://www.schurter.com/en/info-center/support-tools/cad-drawings",
   "https://www.schurter.com/en/info-center/support-tools/track-and-trace",
   "https://www.schurter.com/en"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "wago.com": {
  "dm": "wago.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+495718870",
    "src": "https://www.wago.com/global/country-selection",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.wago.com/global/country-selection"
  ],
  "note": ""
 },
 "skf.com": {
  "dm": "skf.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "harman.com": {
  "dm": "harman.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "(800) 645-7484",
    "src": "https://www.harman.com/contact-us",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.harman.com/contact-us",
   "https://www.harman.com/contact",
   "https://www.harman.com/contactus",
   "https://www.harman.com/"
  ],
  "note": ""
 },
 "nsk.com": {
  "dm": "nsk.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.nsk.com/products/ball-bearings/angular-contact-ball-bearings/",
   "https://www.nsk.com/products/super-precision-bearings/precision-angular-contact-bearings/",
   "https://www.nsk.com/products/super-precision-bearings/ball-screw-support-bearings/",
   "https://www.nsk.com/industries/office-equipment/",
   "https://www.nsk.com/company/",
   "https://www.nsk.com/company/about-us/",
   "https://www.nsk.com/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "festo.com": {
  "dm": "festo.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+490711347",
    "src": "https://corp.festo.com/en/imprint/index.html",
    "kind": "text"
   },
   {
    "v": "+4907113472144",
    "src": "https://corp.festo.com/en/imprint/index.html",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://festo.com/contact",
   "https://festo.com/kontakt",
   "https://festo.com/impressum",
   "https://festo.com/imprint",
   "https://festo.com/",
   "https://corp.festo.com/en/imprint/index.html",
   "https://festo.com/contact-us",
   "https://festo.com/contactus",
   "https://festo.com/en/contact",
   "https://festo.com/en/contact-us"
  ],
  "note": ""
 },
 "dmgmori.com": {
  "dm": "dmgmori.com",
  "at": "2026-10-20",
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
   "https://cn.dmgmori.com.cn/?redirect=i/en/contact",
   "https://cn.dmgmori.com.cn/?redirect=i/en/contact-us",
   "https://cn.dmgmori.com.cn/?redirect=i/kontakt",
   "https://cn.dmgmori.com.cn/?redirect=i"
  ],
  "note": ""
 },
 "habasit.com": {
  "dm": "habasit.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://habasit.com/en/Contact-us",
   "https://habasit.com/en/About-us",
   "https://habasit.com/en/About-us/Who-we-are",
   "https://habasit.com/en/About-us/Our-history",
   "https://habasit.com/en/About-us/Sustainability",
   "https://habasit.com/en/About-us/Quality",
   "https://habasit.com/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "kaeser.com": {
  "dm": "kaeser.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+499561640124",
    "src": "https://www.kaeser.com/int-en/services/kaeser-report",
    "kind": "tel"
   },
   {
    "v": "+4909561640124",
    "src": "https://www.kaeser.com/int-en/services/kaeser-report",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.kaeser.com/int-en/services",
   "https://www.kaeser.com/int-en/company",
   "https://www.kaeser.com/int-en/services/contact",
   "https://www.kaeser.com/int-en/services/kaeser-report",
   "https://www.kaeser.com/int-en/services/whitepaper",
   "https://www.kaeser.com/int-en/services/analysis-and-advice",
   "https://www.kaeser.com/int-en"
  ],
  "note": ""
 },
 "cuidevices.com": {
  "dm": "cuidevices.com",
  "at": "2026-10-20",
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
  "dm": "atlascopco.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.atlascopco.com/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "makita.com": {
  "dm": "makita.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://makita.com/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "hilti.com": {
  "dm": "hilti.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "18008798000",
    "src": "https://www.hilti.com/content/resources/tool-support/local/tool-repair",
    "kind": "jsonld"
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
   "https://www.hilti.com/content/resources/tool-support/local/tool-repair",
   "https://www.hilti.com/content/company/press-releases",
   "https://www.hilti.com/content/company/about-hilti",
   "https://www.hilti.com/content/hilti/W1/US/en/company/company/about-hilti/sustainability.html",
   "https://www.hilti.com/content/hilti/W1/US/en/support/support/ad-rental-locations.html",
   "https://www.hilti.com/content/hilti/W1/US/en/support/support/help-center.html",
   "https://www.hilti.com/"
  ],
  "note": ""
 },
 "wirtgen.de": {
  "dm": "wirtgen.de",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.wirtgen-group.com/wirtgen/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "tracopower.com": {
  "dm": "tracopower.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+8601063322248",
    "src": "https://www.tracopower.com/int/contact",
    "kind": "text"
   },
   {
    "v": "+8602161677266",
    "src": "https://www.tracopower.com/int/contact",
    "kind": "text"
   },
   {
    "v": "+8675523676366",
    "src": "https://www.tracopower.com/int/contact",
    "kind": "text"
   },
   {
    "v": "+86075523676367",
    "src": "https://www.tracopower.com/int/contact",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.tracopower.com/int/contact",
   "https://www.tracopower.com/int/about-traco-power-1",
   "https://www.tracopower.com/int/locations",
   "https://www.tracopower.com/int/contact/europe",
   "https://www.tracopower.com/int/contact/americas",
   "https://www.tracopower.com/int/contact/asia-pacific",
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
  "dm": "fischer.de",
  "at": "2026-10-20",
  "phones": [
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
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.fischer.de/de-de/project-business/planer-ingenieure?utm_source=google&utm_medium=banner&utm_campaign=fixperience",
   "https://www.fischer.de/de-de/service/academy",
   "https://www.fischer.de/de-de/kontakt",
   "https://www.fischer.de/de-de/service/newsletter",
   "https://www.fischer.de/de-de/service/handel/haendlersuche",
   "https://www.fischer.de/de-de/service/infos-und-updates/informationsmaterial",
   "https://www.fischer.de/de-de"
  ],
  "note": ""
 },
 "strongtie.com": {
  "dm": "strongtie.com",
  "at": "2026-10-20",
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
    "kind": "text"
   },
   {
    "v": "+33251284478",
    "src": "https://www.strongtie.com/about/locations",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.strongtie.com/contact",
   "https://www.strongtie.com/about",
   "https://www.strongtie.com/",
   "https://www.strongtie.com/about/locations",
   "https://www.strongtie.com/solutions/software/professional-services",
   "https://www.strongtie.com/about/upcoming-shows-and-events",
   "https://www.strongtie.com/about/missionvisionvalues"
  ],
  "note": ""
 },
 "wera.de": {
  "dm": "wera.de",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+49002024045",
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
  "dm": "irwin.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.irwintools.com/contact",
   "https://www.irwintools.com/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "basf.com": {
  "dm": "basf.com",
  "at": "2026-10-20",
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
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.basf.com/ph/en/legal/contact",
   "https://www.basf.com/global/en/who-we-are/organization/group-companies/BASF_Renewable-Energy-GmbH/company",
   "https://www.basf.com/ph/en/who-we-are/sites-and-contacts",
   "https://www.basf.com/ph/en"
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
  "dm": "wacker.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.wacker.com/contact",
   "https://www.wacker.com/contact-us",
   "https://www.wacker.com/contactus",
   "https://www.wacker.com/en/contact",
   "https://www.wacker.com/en/contact-us",
   "https://www.wacker.com/kontakt",
   "https://www.wacker.com/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "arkema.com": {
  "dm": "arkema.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "eastman.com": {
  "dm": "eastman.com",
  "at": "2026-10-20",
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
   "https://www.eastman.com/en"
  ],
  "note": ""
 },
 "evonik.com": {
  "dm": "evonik.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [
   {
    "v": "Opernplatz 1, 45128, Essen, DE",
    "src": "https://www.evonik.com/en.html",
    "kind": "jsonld"
   }
  ],
  "pages": [
   "https://www.evonik.com/en/company/about-evonik.html",
   "https://www.evonik.com/en/company/purpose.html",
   "https://www.evonik.com/en/company/Innovation.html",
   "https://www.evonik.com/en/company/aerospace-and-defense.html",
   "https://www.evonik.com/en/company/circular-economy.html",
   "https://www.evonik.com/en.html"
  ],
  "note": ""
 },
 "mcgc.com": {
  "dm": "mcgc.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "dic-global.com": {
  "dm": "dic-global.com",
  "at": "2026-10-20",
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
   "https://www.dic-global.com:443/ap/"
  ],
  "note": ""
 },
 "ascendmaterials.com": {
  "dm": "ascendmaterials.com",
  "at": "2026-10-20",
  "phones": [],
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
   "https://www.ascendmaterials.com/"
  ],
  "note": ""
 },
 "kuraray.com": {
  "dm": "kuraray.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.kuraray.com/global-en/company/overview",
   "https://www.kuraray.com/global-en/company/philosophy",
   "https://www.kuraray.com/global-en/company/directors/",
   "https://www.kuraray.com/global-en/company/organization/",
   "https://www.kuraray.com/global-en/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "siemens-healthineers.com": {
  "dm": "siemens-healthineers.com",
  "at": "2026-10-20",
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
   "https://www.siemens-healthineers.com/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "gehealthcare.com": {
  "dm": "gehealthcare.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "1-800-437-1171",
    "src": "https://www.gehealthcare.com/en-us/services",
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
   "https://www.gehealthcare.com/en-us"
  ],
  "note": ""
 },
 "medtronic.com": {
  "dm": "medtronic.com",
  "at": "2026-10-20",
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
   "https://www.medtronic.com/",
   "https://global.medtronic.com/xg-en/about/hong-kong.html",
   "https://global.medtronic.com/xg-en/about/taiwan.html",
   "https://www.medtronic.com/cn-zh/your-health/patient-services.html",
   "https://www.medtronic.com/cn-zh/our-company.html",
   "https://www.medtronic.com/cn-zh/our-company/key-facts.html",
   "https://www.medtronic.com/cn-zh/our-company/leadership.html"
  ],
  "note": ""
 },
 "baxter.com": {
  "dm": "baxter.com",
  "at": "2026-10-20",
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
   "https://www.baxter.com/"
  ],
  "note": ""
 },
 "zimmerbiomet.com": {
  "dm": "zimmerbiomet.com",
  "at": "2026-10-20",
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
   "https://www.zimmerbiomet.com/en"
  ],
  "note": ""
 },
 "stryker.com": {
  "dm": "stryker.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "269 385 2600",
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
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.stryker.com/us/en/about/contact.html",
   "https://www.stryker.com/contact",
   "https://www.stryker.com/contact-us",
   "https://www.stryker.com/"
  ],
  "note": ""
 },
 "wiha.com": {
  "dm": "wiha.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "bessey.com": {
  "dm": "bessey.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "浏览器未能打开官网"
 },
 "hartmann.info": {
  "dm": "hartmann.info",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.hartmann.info/contact",
   "https://www.hartmann.info/contact-us",
   "https://www.hartmann.info/contactus",
   "https://www.hartmann.info/en/contact",
   "https://www.hartmann.info/kontakt",
   "https://www.hartmann.info/impressum",
   "https://www.hartmann.info/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "sma.de": {
  "dm": "sma.de",
  "at": "2026-10-20",
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
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.sma.de/service/downloads",
   "https://www.sma.de/kontakt/kontakt",
   "https://www.sma.de/kontakt/service-kontakte",
   "https://www.sma.de/kontakt/fachhandwerkersuche",
   "https://www.sma.de/kontakt/handelspartner",
   "https://www.sma.de/unternehmen/ueber-sma",
   "https://www.sma.de/"
  ],
  "note": ""
 },
 "enphase.com": {
  "dm": "enphase.com",
  "at": "2026-10-20",
  "phones": [
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
  "emails": [],
  "addr": [],
  "pages": [
   "https://enphase.com/en-ph/support/homeowners",
   "https://enphase.com/en-ph/support",
   "https://enphase.com/en-ph/contact-us",
   "https://enphase.com/about-us",
   "https://enphase.com/en-ph/company/sustainability",
   "https://enphase.com/en-ph/contact-us",
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
  "dm": "lohmann-rauscher.com",
  "at": "2026-10-20",
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
   "https://www.lohmann-rauscher.com/en/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "bbraun.com": {
  "dm": "bbraun.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+12025550123",
    "src": "https://www.bbraun.com/en/patient-care/services/care-and-dialysis-centers.html",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.bbraun.com/en/patient-care/services.html",
   "https://www.bbraun.com/en/patient-care/services/home-care.html",
   "https://www.bbraun.com/en/patient-care/services/hip-knee-and-spine-surgery.html",
   "https://www.bbraun.com/en/patient-care/services/care-and-dialysis-centers.html",
   "https://www.bbraun.com/en/patient-care/services/infection-in-hospital.html",
   "https://www.bbraun.com/en.html"
  ],
  "note": ""
 },
 "sonnen.de": {
  "dm": "sonnen.de",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+490830492933400",
    "src": "https://www.sonnen.de/impressum",
    "kind": "text"
   },
   {
    "v": "+490830492933401",
    "src": "https://www.sonnen.de/impressum",
    "kind": "text"
   },
   {
    "v": "+49830492933400",
    "src": "https://www.sonnen.de/",
    "kind": "jsonld"
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
  "dm": "victronenergy.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.victronenergy.com/support",
   "https://www.victronenergy.com/support/warranty-and-repairs",
   "https://www.victronenergy.com/support-and-downloads/software",
   "https://www.victronenergy.com/support-and-downloads/manuals",
   "https://www.victronenergy.com/support-and-downloads/datasheets",
   "https://www.victronenergy.com/support-and-downloads/technical-information",
   "https://www.victronenergy.com/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "ibc-solar.com": {
  "dm": "ibc-solar.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.ibc-solar.com/corporate/contact",
   "https://www.ibc-solar.com/contact",
   "https://www.ibc-solar.com/contact-us",
   "https://www.ibc-solar.com/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
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
  "dm": "bosch.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+4971140040990",
    "src": "https://www.bosch.com/contact/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.bosch.com/contact/",
   "https://www.bosch.com/products-and-services/",
   "https://www.bosch.com/products-and-services/mobility/",
   "https://www.bosch.com/products-and-services/at-home/",
   "https://www.bosch.com/products-and-services/industry-and-trades/",
   "https://www.bosch.com/company/",
   "https://www.bosch.com/"
  ],
  "note": ""
 },
 "krannich.com": {
  "dm": "krannich.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "浏览器未能打开官网"
 },
 "zf.com": {
  "dm": "zf.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.zf.com/mobile/en/products/products_services.html",
   "https://www.zf.com/mobile/en/company/divisions_business_units/div_aftermarket/div_aftermarket.html",
   "https://www.zf.com/mobile/en/company/divisions_business_units/research_development/open_source/stories/open_vehicle_diagnostics.html",
   "https://www.zf.com/mobile/en/company/divisions_business_units/research_development/stories/gollewski_interview.html",
   "https://www.zf.com/mobile/en/company/corporate_governance/compliance_the_right_way/compliance_index.html?pageLink=acc_117341_0",
   "https://www.zf.com/mobile/en/company/corporate_governance/compliance_the_right_way/compliance_index.html?pageLink=acc_117341_1",
   "https://www.zf.com/mobile/en/homepage/homepage.html"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "valeo.com": {
  "dm": "valeo.com",
  "at": "2026-10-20",
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
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.valeo.com/en/valeo-service/",
   "https://www.valeo.com/en/valeo-answer-software-services/",
   "https://www.valeo.com/en/calendar-and-contacts/",
   "https://www.valeo.com/en/calendar-media-contacts/",
   "https://www.valeo.com/en/catalogue/cda/tech-services/",
   "https://www.valeo.com/en/contact/",
   "https://www.valeo.com/en/"
  ],
  "note": ""
 },
 "continental.com": {
  "dm": "continental.com",
  "at": "2026-10-20",
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
   "https://www.continental.com/en/"
  ],
  "note": ""
 },
 "segen.co.uk": {
  "dm": "segen.co.uk",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+443309000141",
    "src": "https://www.segen.co.uk/contact-us/open-an-account/",
    "kind": "tel"
   },
   {
    "v": "+4403309000141",
    "src": "https://www.segen.co.uk/contact-us/open-an-account/",
    "kind": "tel"
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
  "note": ""
 },
 "magna.com": {
  "dm": "magna.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.magna.com/company/company-information",
   "https://www.magna.com/company/company-information",
   "https://www.magna.com/company/company-information/magna-groups",
   "https://www.magna.com/company/company-information/facts-history",
   "https://www.magna.com/company/company-information/customers",
   "https://www.magna.com/company/company-information/industry-events",
   "https://www.magna.com/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "aptiv.com": {
  "dm": "aptiv.com",
  "at": "2026-10-20",
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
   "https://www.aptiv.com/",
   "https://www.aptiv.com/en/contact-us",
   "https://win.aptiv.com/support/connect-with-an-engineer"
  ],
  "note": ""
 },
 "hella.com": {
  "dm": "hella.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+492941381600",
    "src": "https://www.hella.com/en/Company/Purchasing-253/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.hella.com/en/Company-226/",
   "https://www.hella.com/en/Company/Governance-257/",
   "https://www.hella.com/en/Company/Compliance-258/",
   "https://www.hella.com/en/Company/Sustainability-252/",
   "https://www.hella.com/en/Company/Purchasing-253/",
   "https://www.hella.com/en/Company/Quality-2425/",
   "https://www.hella.com/en/"
  ],
  "note": ""
 },
 "aisin.com": {
  "dm": "aisin.com",
  "at": "2026-10-20",
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
   "https://aisin.com/en/"
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
    "v": "+410272056080",
    "src": "https://studer-innotec.com/support/",
    "kind": "tel"
   },
   {
    "v": "+41272056080",
    "src": "https://studer-innotec.com/contact/",
    "kind": "tel"
   },
   {
    "v": "+9108026715771",
    "src": "https://studer-innotec.com/contact/",
    "kind": "tel"
   },
   {
    "v": "+919731333711",
    "src": "https://studer-innotec.com/contact/",
    "kind": "tel"
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
  "dm": "brembo.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.brembo.com/en/contactus",
   "https://www.brembogroup.com/en",
   "https://www.brembo.com/en/news-archive/6-things-no-one-ever-told-you-about-nascar-cup-series-brakes",
   "https://www.brembo.com/en/news-archive/brembo-for-the-best-moto-company",
   "https://www.brembo.com/en"
  ],
  "note": "已读取官网 5 个页面，未检索到公开职能联系方式"
 },
 "c-and-a.com": {
  "dm": "c-and-a.com",
  "at": "2026-10-20",
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
   "https://www.c-and-a.com/eu/en/shop?showCountrySelector=true"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "vfc.com": {
  "dm": "vfc.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
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
   "https://vfc.com/"
  ],
  "note": ""
 },
 "pvh.com": {
  "dm": "pvh.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.pvh.com/company",
   "https://www.pvh.com/company/leadership",
   "https://www.pvh.com/company/we-are-pvh",
   "https://www.pvh.com/company/archives",
   "https://www.pvh.com:443/"
  ],
  "note": "已读取官网 5 个页面，未检索到公开职能联系方式"
 },
 "hugoboss.com": {
  "dm": "hugoboss.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+6563475959",
    "src": "https://www.hugoboss.com/ph/en/contactus",
    "kind": "text"
   },
   {
    "v": "+65063475959",
    "src": "https://www.hugoboss.com/ph/en/contactus",
    "kind": "text"
   },
   {
    "v": "+4907123940",
    "src": "https://www.hugoboss.com/ph/en/home",
    "kind": "jsonld"
   }
  ],
  "emails": [
   {
    "v": "info@hugoboss.com",
    "src": "https://www.hugoboss.com/ph/en/home"
   }
  ],
  "addr": [
   {
    "v": "Holy-Allee 3, 72555, Metzingen, BW, DE",
    "src": "https://www.hugoboss.com/ph/en/home",
    "kind": "jsonld"
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
  "dm": "next.co.uk",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "03337778000",
    "src": "https://www.next.co.uk/help",
    "kind": "tel"
   },
   {
    "v": "03337778999",
    "src": "https://www.next.co.uk/help",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.next.co.uk/help",
   "https://www.next.co.uk/contact",
   "https://www.next.co.uk/contact-us",
   "https://www.next.co.uk/contactus",
   "https://www.next.co.uk/en/contact",
   "https://www.next.co.uk/en/contact-us",
   "https://www.next.co.uk/"
  ],
  "note": ""
 },
 "inditex.com": {
  "dm": "inditex.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+34981185400",
    "src": "https://www.inditex.cn/itxcomweb/ph/en/info/contact-us",
    "kind": "text"
   },
   {
    "v": "+34981334900",
    "src": "https://www.inditex.cn/itxcomweb/ph/en/info/contact-us",
    "kind": "text"
   },
   {
    "v": "+34937667699",
    "src": "https://www.inditex.cn/itxcomweb/ph/en/info/contact-us",
    "kind": "text"
   },
   {
    "v": "+34937667698",
    "src": "https://www.inditex.cn/itxcomweb/ph/en/info/contact-us",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.inditex.cn/itxcomweb/ph/en/info/contact-us",
   "https://www.inditex.cn/itxcomweb/ph/en/press/news-detail/87cfe8fb-6995-4e5d-bb7b-1b35d79f10e2/inditex-contributes-5-billion-colombian-pesos-to-the-red-cross-to-support-people-affected-by-the-earthquake-in-colombia",
   "https://www.inditex.cn/itxcomweb/ph/en/press/news-detail/36da65f2-795e-43cd-95b9-748f77bad23a/inditex-commits-65-million-to-conservation-international-over-three-years-to-support-the-protection-of-the-amazon-rainforest",
   "https://www.inditex.cn/itxcomweb/es/en/home",
   "https://www.inditex.cn/itxcomweb/es/en/home",
   "https://www.inditex.cn/itxcomweb/es/en/home",
   "https://www.inditex.cn/itxcomweb/ph/en/home"
  ],
  "note": ""
 },
 "memodo.de": {
  "dm": "memodo.de",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+49089904101500",
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
  "note": ""
 },
 "fastretailing.com": {
  "dm": "fastretailing.com",
  "at": "2026-10-20",
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
   "https://www.fastretailing.com/eng/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "zalando.com": {
  "dm": "zalando.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://zalando.com/contact",
   "https://zalando.com/contact-us",
   "https://zalando.com/contactus",
   "https://zalando.com/en/contact",
   "https://zalando.com/en/contact-us",
   "https://zalando.com/kontakt",
   "https://zalando.com/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "levistrauss.com": {
  "dm": "levistrauss.com",
  "at": "2026-10-20",
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
  "note": ""
 },
 "dssmith.com": {
  "dm": "dssmith.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.dssmith.com/get-in-touch",
   "https://www.dssmith.com/company",
   "https://www.dssmith.com/company/who-we-are",
   "https://www.dssmith.com/company/our-innovation",
   "https://www.dssmith.com/company/our-innovation/supply-chain-challenges",
   "https://www.dssmith.com/company/suppliers",
   "https://www.dssmith.com/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "mondigroup.com": {
  "dm": "mondigroup.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "002431790130",
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
   "https://www.mondigroup.com/"
  ],
  "note": ""
 },
 "amcor.com": {
  "dm": "amcor.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+410443161717",
    "src": "https://www.amcor.com/contact-us",
    "kind": "text"
   },
   {
    "v": "+14136842463",
    "src": "https://www.amcor.com/about/overview/innovation",
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
   "https://www.amcor.com/"
  ],
  "note": ""
 },
 "huhtamaki.com": {
  "dm": "huhtamaki.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+3580106867000",
    "src": "https://www.huhtamaki.com/en/about/contact-us/",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.huhtamaki.com/en/foodservice/products/paper-hot-cups-and-lids/",
   "https://www.huhtamaki.com/en-gb/foodservice-uk/",
   "https://www.huhtamaki.com/en/foodservice/categories/food-to-go/",
   "https://www.huhtamaki.com/en/about/",
   "https://www.huhtamaki.com/en/about/contact-us/",
   "https://www.huhtamaki.com/en/foodservice/",
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
  "dm": "gerresheimer.com",
  "at": "2026-10-20",
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
   "https://www.gerresheimer.com/en"
  ],
  "note": ""
 },
 "otto.de": {
  "dm": "otto.de",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.otto.de/service/",
   "https://www.otto.de/service/agb/",
   "https://www.otto.de/service/datenschutz/",
   "https://www.otto.de/service/impressum/",
   "https://www.otto.de/service/ottoversprechen/",
   "https://www.otto.de/chat/assets/nucleus.cassandra.AuthenticationTokenService.module.YLd6r-51.js",
   "https://www.otto.de/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "sidel.com": {
  "dm": "sidel.com",
  "at": "2026-10-20",
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
   "https://www.sidel.com/en"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "grohe.com": {
  "dm": "grohe.com",
  "at": "2026-10-20",
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
   "https://www.grohe.com/en-GB"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
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
  "dm": "dormakaba.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+41448189011",
    "src": "https://www.dormakaba.com/cn-zh",
    "kind": "jsonld"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.dormakaba.com/cn-zh/about",
   "https://www.dormakaba.com/cn-zh/offering/vertical-markets/office",
   "https://www.dormakaba.com/cn-zh/general-contact-form",
   "https://www.dormakaba.com/cn-zh/legal-notice",
   "https://www.dormakaba.com/cn-zh"
  ],
  "note": ""
 },
 "assaabloy.com": {
  "dm": "assaabloy.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+63285646615",
    "src": "https://www.assaabloy.com/ph/en/contact-us",
    "kind": "text"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.assaabloy.com/ph/en/contact-us",
   "https://www.assaabloy.com/ph/en/about-us",
   "https://www.assaabloy.com/ph/en/solutions/products/electronic-access-control/cliq-locking-system-ikon/cliq-go/cylinder-cliq-go/special-cylinder-cliq-go/locking-cylinder-cliq-go-nc31-service-cliqgo",
   "https://www.assaabloy.com/ph/en/solutions/products/electronic-access-control/cliq-locking-system-ikon/cliq-go/cylinder-cliq-go/special-cylinder-cliq-go/locking-cylinder-cliq-go-n702-service-cliqgo",
   "https://www.assaabloy.com/ph/en/solutions/products/electronic-access-control/cliq-locking-system-ikon/cliq-go/cylinder-cliq-go/furniture-lock-cliq-go/furniture-lock-cliq-go-n577-aus-4-service-cliqgo",
   "https://www.assaabloy.com/ph/en/stories/blogs/what-covid-19-taught-us-about-the-design-of-health-facilities-for-better-patient-experience",
   "https://www.assaabloy.com/ph/en",
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
  "dm": "rockwool.com",
  "at": "2026-10-20",
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
   "https://www.rockwool.com/group/"
  ],
  "note": ""
 },
 "beiersdorf.com": {
  "dm": "beiersdorf.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.beiersdorf.com/meta-pages/contact/contact-form",
   "https://www.beiersdorf.com/meta-pages/imprint",
   "https://www.beiersdorf.com/about-us",
   "https://www.beiersdorf.com/about-us/our-profile/strategy",
   "https://www.beiersdorf.com/about-us/our-profile/our-purpose",
   "https://www.beiersdorf.com/about-us/our-profile/our-core-values",
   "https://www.beiersdorf.com/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "pg.com": {
  "dm": "pg.com",
  "at": "2026-10-20",
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
   "https://us.pg.com/contact-us/",
   "https://us.pg.com/locations/",
   "https://us.pg.com/talk-about-bias/",
   "https://us.pg.com/"
  ],
  "note": ""
 },
 "loreal.com": {
  "dm": "loreal.com",
  "at": "2026-10-20",
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
   "https://www.loreal.com/en/"
  ],
  "note": ""
 },
 "hoermann.de": {
  "dm": "hoermann.de",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+490523161669",
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
  "dm": "smurfitwestrock.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "2627076247",
    "src": "https://www.smurfitwestrock.com/locations",
    "kind": "tel"
   },
   {
    "v": "+19042775827",
    "src": "https://www.smurfitwestrock.com/locations",
    "kind": "tel"
   },
   {
    "v": "+16083393371",
    "src": "https://www.smurfitwestrock.com/locations",
    "kind": "tel"
   },
   {
    "v": "+19075622267",
    "src": "https://www.smurfitwestrock.com/locations",
    "kind": "tel"
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
   "https://www.smurfitwestrock.com/"
  ],
  "note": ""
 },
 "henkel.com": {
  "dm": "henkel.com",
  "at": "2026-10-20",
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
   "https://www.henkel.com/",
   "https://www.henkel.com/company/henkel-brand-design",
   "https://www.henkel.com/company/downloads-and-publications",
   "https://www.henkel.com/company/locations"
  ],
  "note": ""
 },
 "3ds.com": {
  "dm": "3ds.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+330161626162",
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
   "https://www.3ds.com/core-static/ds-contact-form.DnmQ2TPI.css",
   "https://www.3ds.com/about/corporate-responsibility/impact-report",
   "https://www.3ds.com/about/company/what-is-dassault-systemes",
   "https://www.3ds.com/about/company/dassault-systemes-in-peoples-lives",
   "https://www.3ds.com/support/",
   "https://www.3ds.com/about/company/contact-information",
   "https://www.3ds.com/"
  ],
  "note": ""
 },
 "odoo.com": {
  "dm": "odoo.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+3222903490",
    "src": "https://www.odoo.com/app/helpdesk",
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
   "https://www.odoo.com/services/partners",
   "https://www.odoo.com/"
  ],
  "note": ""
 },
 "ikea.com": {
  "dm": "ikea.com",
  "at": "2026-10-20",
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
   "https://www.ikea.com/"
  ],
  "note": ""
 },
 "ptc.com": {
  "dm": "ptc.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
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
   "https://www.ptc.com/en"
  ],
  "note": ""
 },
 "sgs.com": {
  "dm": "sgs.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+864000996058",
    "src": "https://www.sgs.com/en/contact",
    "kind": "tel"
   }
  ],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.sgsgroup.com.cn/en-cn",
   "https://www.sgs.com/en/contact",
   "https://www.sgs.com/en/contact-us",
   "https://www.sgs.com/en/contactus",
   "https://www.sgs.com/en/en/contact",
   "https://www.sgs.com/en/en/contact-us",
   "https://www.sgs.com/en/kontakt",
   "https://www.sgs.com/en"
  ],
  "note": ""
 },
 "tuv.com": {
  "dm": "tuv.com",
  "at": "2026-10-20",
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
   "https://www.tuv.com/philippines/en/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "essity.com": {
  "dm": "essity.com",
  "at": "2026-10-20",
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
   "https://www.essity.com/"
  ],
  "note": ""
 },
 "bureauveritas.com": {
  "dm": "bureauveritas.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://group.bureauveritas.com:443/contact-form",
   "https://group.bureauveritas.com:443/sustainability/carbon-climate/aitrack/about-aitrack",
   "https://group.bureauveritas.com/my-fuel-consumption-new-application-help-shipowners-comply-new-regulations-energy-efficiency",
   "https://group.bureauveritas.com/bureau-veritas-schutter-group-introduce-rapid-aflatoxin-testing-services-agricultural-industry",
   "https://group.bureauveritas.com/bureau-veritas-consumer-products-services-supports-world-environment-day-2017",
   "https://group.bureauveritas.com/bureau-veritas-consumer-products-services-obtains-nabl-status-india",
   "https://group.bureauveritas.com:443/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "reckitt.com": {
  "dm": "reckitt.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+4401753506800",
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
   "https://www.reckitt.com/"
  ],
  "note": ""
 },
 "atlassian.com": {
  "dm": "atlassian.com",
  "at": "2026-10-20",
  "phones": [
   {
    "v": "+14157011110",
    "src": "https://www.atlassian.com/",
    "kind": "jsonld"
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
   "https://www.atlassian.com/software/jira/service-management",
   "https://www.atlassian.com/collections/service",
   "https://www.atlassian.com/software/customer-service-management",
   "https://www.atlassian.com/blog/company-news/ai-sdlc",
   "https://www.atlassian.com/industries/professional-services",
   "https://www.atlassian.com/company/contact/general-inquiries",
   "https://www.atlassian.com/"
  ],
  "note": ""
 },
 "ul.com": {
  "dm": "ul.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.ul.com/services/clean-and-sustainable-mobility",
   "https://www.ul.com/services/vehicle-safety-and-quality",
   "https://www.ul.com/industries/building-technologies-and-construction/building-envelope-services",
   "https://www.ul.com/services/building-infrastructure-safety-and-performance",
   "https://www.ul.com/services/safer-building-products-and-systems",
   "https://www.ul.com/services/effective-utility-management-and-optimization",
   "https://www.ul.com/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "intertek.com": {
  "dm": "intertek.com",
  "at": "2026-10-20",
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
   "https://www.intertek.com/"
  ],
  "note": ""
 },
 "expeditors.com": {
  "dm": "expeditors.com",
  "at": "2026-10-20",
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
   "https://www.expeditors.com/",
   "https://www.expeditors.com/locations/",
   "https://www.expeditors.com/contact/",
   "https://www.expeditors.com/capabilities/consultancy-managed-services/"
  ],
  "note": "未检索到公开准确信息"
 },
 "dsv.com": {
  "dm": "dsv.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
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
   "https://www.dsv.com/en"
  ],
  "note": ""
 },
 "dbschenker.com": {
  "dm": "dbschenker.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.dsv.com/en"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "scg.com": {
  "dm": "scg.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
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
  "dm": "kuehne-nagel.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.kuehne-nagel.com/cn/services/sea-freight",
   "https://www.kuehne-nagel.com/cn/services/air-freight",
   "https://www.kuehne-nagel.com/cn/services/road-transport-asia",
   "https://www.kuehne-nagel.com/cn/services/warehousing",
   "https://www.kuehne-nagel.com/cn/services/customs-clearance",
   "https://www.kuehne-nagel.com/cn/services/cargo-insurance",
   "https://www.kuehne-nagel.com/cn"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "courts.com.sg": {
  "dm": "courts.com.sg",
  "at": "2026-10-20",
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
   "https://www.courts.com.sg/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "indorama.com": {
  "dm": "indorama.com",
  "at": "2026-10-20",
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
   "https://www.indorama.com/about-us",
   "https://www.indorama.com/about-us/history",
   "https://www.indorama.com/about-us/the-indorama-compass",
   "https://www.indorama.com/about-us/leadership",
   "https://www.indorama.com/about-us/global-footprint",
   "https://www.indorama.com/about-us/group-policies",
   "https://www.indorama.com/"
  ],
  "note": ""
 },
 "falabella.com": {
  "dm": "falabella.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "harveynorman.com.au": {
  "dm": "harveynorman.com.au",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.harveynorman.com.au/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "shoprite.co.za": {
  "dm": "shoprite.co.za",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [],
  "note": "官网反爬或网络拦截，未能自动读取，需人工打开官网联系页核验"
 },
 "reece.com.au": {
  "dm": "reece.com.au",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.reece.com.au/"
  ],
  "note": "浏览器渲染后仍未检索到公开职能联系方式"
 },
 "dekra.com": {
  "dm": "dekra.com",
  "at": "2026-10-20",
  "phones": [],
  "emails": [],
  "addr": [],
  "pages": [
   "https://www.dekra.com/en/contact-dekra/",
   "https://www.dekra.com/en/all-services/",
   "https://www.dekra.com/en/certification-of-services-and-processes/",
   "https://www.dekra.com/en/about-dekra-audit/",
   "https://www.dekra.com/en/contact-dekra-audit/",
   "https://www.dekra.com/en/vehicle-appraisal-services/",
   "https://www.dekra.com/en/home/"
  ],
  "note": "已读取官网 7 个页面，未检索到公开职能联系方式"
 },
 "alfuttaim.com": {
  "dm": "alfuttaim.com",
  "at": "2026-10-20",
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
   "https://www.alfuttaim.com/en/divisions/financial-services/",
   "https://www.alfuttaim.com/en/about-us/",
   "https://www.alfuttaim.com/en/"
  ],
  "note": ""
 },
 "majidalfuttaim.com": {
  "dm": "majidalfuttaim.com",
  "at": "2026-10-20",
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
   "https://www.majidalfuttaim.com/en/sustainability-contact-us",
   "https://www.majidalfuttaim.com/ar/sustainability-contact-us",
   "https://www.majidalfuttaim.com/en/customer-contact",
   "https://www.majidalfuttaim.com/en/contact-us",
   "https://www.majidalfuttaim.com/"
  ],
  "note": ""
 }
};
window.FAL_L2_META = {
 "total": 169,
 "at": "2026-10-20",
 "concurrency": 5,
 "withPhone": 99,
 "withEmail": 37,
 "withAddr": 29,
 "none": 58,
 "method": "官方域名首页 → 发现 Contact/Kontakt/Impressum/About/Locations 页 → 原样提取 mailto: / tel: / JSON-LD / <address>；每条记录来源页面 URL；抓不到即记「未检索到公开准确信息」",
 "deep": {
  "browserRounds": 4,
  "lastBrowserGain": 14
 },
 "cleaned": {
  "at": "2026-10-20",
  "dropped": 19,
  "deduped": 7
 }
};
