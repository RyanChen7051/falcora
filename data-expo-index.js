/* ================= 全球展会名录索引（Expo Roster Index）=================
   用途：回答「哪个行业有哪些展会 / 该展会名录能否查到企业 / 能查到多少家」。

   为什么单独建这一层（2026-10-31）：
     全球 B2B 展会**跑在少数几家展览集团**上。Messe Frankfurt 一家就有 91 个展会、
     49907 家参展商，且其参展商搜索 API 是公开的。
     → 不要按「展会」写适配器，要按「展览集团/技术平台」写，一套吃一片。

   ⚠️ 定位铁律：参展商 = 供货方，**不是采购方**。
     它在本产品里的用途只有两个：
       ① 企业真实性证据（某公司确实在某年某展会设过展位 → 证明它在真实经营）
       ② 供应链/同行情报（找代理、比产品线）
     绝不进 data-real-companies.js（采购方池），否则搜买家会搜出同行。

   ⚠️ 合规：exhibitor.contacts（个人姓名+个人邮箱）在采集端已整段丢弃，属 L3。
     本文件与 data-expo-exhibitors.js 内**没有任何个人联系方式**。

   字段：id 展会ID / nm 名称 / fam 行业族 / n 家数 / tel 有电话 / mail 有邮箱 /
         web 有官网 / cc 主要来源国 / k 主要品类 / src 来源页
============================================================================ */

window.FAL_EXPO_META = {
 "at": "2026-10-31",
 "total": 49907,
 "events": 91,
 "withTel": 29898,
 "withEmail": 13884,
 "withWeb": 36898,
 "countries": 124,
 "topCountries": [
  [
   "CHN",
   21136
  ],
  [
   "DEU",
   4836
  ],
  [
   "JPN",
   3005
  ],
  [
   "IND",
   3000
  ],
  [
   "ITA",
   1852
  ],
  [
   "ARG",
   1442
  ],
  [
   "TUR",
   1308
  ],
  [
   "HKG",
   1216
  ],
  [
   "TWN",
   1066
  ],
  [
   "KOR",
   956
  ],
  [
   "GBR",
   860
  ],
  [
   "ARE",
   734
  ],
  [
   "FRA",
   708
  ],
  [
   "USA",
   675
  ],
  [
   "ESP",
   670
  ],
  [
   "NLD",
   600
  ],
  [
   "POL",
   562
  ],
  [
   "PAK",
   343
  ],
  [
   "BEL",
   321
  ],
  [
   "CHE",
   266
  ]
 ],
 "famCount": [
  [
   "汽配/汽车后市场",
   15855
  ],
  [
   "纺织/服装/家纺/纱线",
   7347
  ],
  [
   "家居/消费品/礼品",
   6551
  ],
  [
   "照明/建筑/卫浴",
   5238
  ],
  [
   "娱乐/灯光音响/乐器",
   3083
  ],
  [
   "美容/个护",
   2803
  ],
  [
   "工业自动化/电子/物流",
   2290
  ],
  [
   "制造/模具/金属加工",
   1306
  ],
  [
   "交通/两轮/航空/基建",
   1173
  ],
  [
   "食品/食品加工",
   1146
  ],
  [
   "宠物",
   911
  ],
  [
   "安防/消防",
   588
  ],
  [
   "矿业/环保/水处理",
   493
  ],
  [
   "印刷/广告/标识",
   359
  ],
  [
   "教育/母婴/儿童",
   328
  ],
  [
   "餐饮/酒店",
   174
  ],
  [
   "化工/制药/实验室",
   113
  ],
  [
   "清洁/冷链/卫生",
   76
  ],
  [
   "其他/未分类",
   73
  ]
 ],
 "source": "Messe Frankfurt 官方参展商搜索 API（api.messefrankfurt.com/exhibitor-service 2.1 public）",
 "compliance": "仅企业级字段；个人联系人（exhibitor.contacts）已在采集端整段丢弃，不落盘"
};

window.FAL_EXPO_EVENTS = [
{
"id": "AUTOMECHANIKASHANGHAI",
"nm": "Automechanika Shanghai 2026",
"fam": "汽配/汽车后市场",
"n": 6822,
"tel": 3650,
"mail": 900,
"web": 4928,
"cc": [
"CHN",
"KOR",
"TUR",
"MYS",
"THA",
"IND"
],
"k": [
"Parts & Components",
"Electrics & Electronics",
"Diagnostics & Repair",
"Accessories, Wheels& Customising"
],
"src": "https://automechanika-shanghai.hk.messefrankfurt.com"
},
{
"id": "AUTOMECHANIKA",
"nm": "Automechanika Frankfurt 2026",
"fam": "汽配/汽车后市场",
"n": 4040,
"tel": 2519,
"mail": 1658,
"web": 3299,
"cc": [
"CHN",
"DEU",
"TWN",
"ITA",
"TUR",
"POL"
],
"k": [
"Parts & Components",
"Diagnostics & Repair",
"Electrics & Electronics",
"Accessories, Wheels & Customizing"
],
"src": "https://automechanika.messefrankfurt.com"
},
{
"id": "AMBIENTE",
"nm": "Ambiente 2027",
"fam": "家居/消费品/礼品",
"n": 2947,
"tel": 2191,
"mail": 1024,
"web": 2481,
"cc": [
"IND",
"DEU",
"ITA",
"CHN",
"HKG",
"TUR"
],
"k": [
"Table & Table Select",
"Cook & Cut",
"Urban Gifts, Stationery & School",
"Clean Home & Storage Solutions"
],
"src": "https://ambiente.messefrankfurt.com"
},
{
"id": "HEIMTEXTIL",
"nm": "Heimtextil 2027",
"fam": "纺织/服装/家纺/纱线",
"n": 2267,
"tel": 1472,
"mail": 610,
"web": 1715,
"cc": [
"CHN",
"IND",
"PAK",
"TUR",
"DEU",
"ITA"
],
"k": [
"Bed, Bath & Living",
"Smart Bedding",
"Decorative & Furniture Fabrics",
"Window & Interior Decoration"
],
"src": "https://heimtextil.messefrankfurt.com"
},
{
"id": "LIGHTBUILDING",
"nm": "Light + Building 2026",
"fam": "照明/建筑/卫浴",
"n": 1850,
"tel": 1420,
"mail": 1010,
"web": 1729,
"cc": [
"CHN",
"DEU",
"ITA",
"HKG",
"TUR",
"POL"
],
"k": [
"Technical lighting and accessories",
"Decorative lighting and accessories",
"Electrical installation equipment / systems",
"Cable and leads / cable routing systems / distribu"
],
"src": "https://light-building.messefrankfurt.com"
},
{
"id": "GUANGZHOUINTERNATIONALLIGHTINGEXHIBITION",
"nm": "Guangzhou International Lighting Exhibition + Guangzhou Elec",
"fam": "照明/建筑/卫浴",
"n": 1700,
"tel": 1098,
"mail": 197,
"web": 1209,
"cc": [
"CHN",
"HKG",
"GBR",
"KOR",
"ARE",
"RUS"
],
"k": [
"Indoor Lighting: Luminaires / Light Sources / Ligh",
"Outdoor Lighting: Luminaires / Light Sources / Lig",
"LED manufacturing Technology",
"AI Lighting Supply Chain"
],
"src": "https://light.messefrankfurt.com.cn"
},
{
"id": "BEAUTYWORLDMIDDLEEAST",
"nm": "Beautyworld Dubai 2026",
"fam": "美容/个护",
"n": 1439,
"tel": 1013,
"mail": 290,
"web": 924,
"cc": [
"CHN",
"ARE",
"KOR",
"HKG",
"FRA",
"IND"
],
"k": [
"3 Cosmetics & Skincare",
"6 Supply Chain & Services",
"4 Finished Fragrance",
"5 Hair, Nails & Salon Supplies"
],
"src": "https://beautyworldme.com"
},
{
"id": "PROLIGHTSOUNDGUANGZHOU",
"nm": "Prolight + Sound Guangzhou 2026",
"fam": "娱乐/灯光音响/乐器",
"n": 1415,
"tel": 0,
"mail": 0,
"web": 1007,
"cc": [
"CHN",
"HKG",
"TWN",
"USA",
"AUS",
"DNK"
],
"k": [
"Business Natures",
"Professional Audio",
"Professional Lighting",
"Stage Equipment"
],
"src": "https://prolight-sound-guangzhou.hk.messefrankfurt.com"
},
{
"id": "TECHTEXTIL",
"nm": "Techtextil 2026",
"fam": "纺织/服装/家纺/纱线",
"n": 1400,
"tel": 1161,
"mail": 721,
"web": 1314,
"cc": [
"DEU",
"CHN",
"ITA",
"FRA",
"ESP",
"IND"
],
"k": [
"Textil Production Technology and Processes",
"Fibres and Yarns",
"Woven Fabrics, Laid Webs, Braidings, Knitted Fabri",
"Coated Textiles"
],
"src": "https://techtextil.com"
},
{
"id": "ISH",
"nm": "ISH 2027",
"fam": "照明/建筑/卫浴",
"n": 1274,
"tel": 993,
"mail": 721,
"web": 1123,
"cc": [
"DEU",
"ITA",
"TUR",
"ESP",
"POL",
"HKG"
],
"k": [
"Heat generation",
"Bathroom equipment",
"Pipes, pipe connectors, fittings",
"Ventilation technology"
],
"src": "https://ish.messefrankfurt.com"
},
{
"id": "MUSICCHINA",
"nm": "Music China 2026",
"fam": "娱乐/灯光音响/乐器",
"n": 1219,
"tel": 168,
"mail": 81,
"web": 199,
"cc": [
"CHN",
"ITA",
"DEU",
"JPN",
"HKG",
"GBR"
],
"k": [
"3 Stringed instruments",
"7 Electronic & electric instruments",
"1 Traditional instruments & Chinese instruments",
"9 Accessories & furniture"
],
"src": "https://musikmesse-china.com"
},
{
"id": "TOYHOBBYCHINA",
"nm": "Toy & Hobby China + Licensing China 2026",
"fam": "家居/消费品/礼品",
"n": 1118,
"tel": 580,
"mail": 34,
"web": 434,
"cc": [
"CHN",
"KOR",
"HKG",
"TWN",
"ITA",
"GBR"
],
"k": [
"2 Toys & Hobby",
"1 Licensing"
],
"src": "https://shenzhen-international-toy-and-hobby-fair.hk.messefrankfurt.com"
},
{
"id": "SPS",
"nm": "SPS - Smart Production Solutions 2026",
"fam": "工业自动化/电子/物流",
"n": 1090,
"tel": 728,
"mail": 756,
"web": 1057,
"cc": [
"DEU",
"CHN",
"ITA",
"CHE",
"AUT",
"NLD"
],
"k": [
"Drive systems and components",
"Sensor technology",
"Software & IT for manufacturing",
"Industrial communication"
],
"src": "https://sps.mesago.com"
},
{
"id": "IFFA",
"nm": "IFFA 2025",
"fam": "食品/食品加工",
"n": 1013,
"tel": 831,
"mail": 636,
"web": 963,
"cc": [
"DEU",
"ITA",
"ESP",
"NLD",
"CHN",
"POL"
],
"k": [
"Process technology for meat and alternative protei",
"Packaging technology",
"Spices, ingredients, additives, casings",
"Cleaning equipment, operational hygiene and safety"
],
"src": "https://iffa.com"
},
{
"id": "AUTOMAINTENANCEREPAIREXPO",
"nm": "AMR - Auto Maintenance & Repair Expo 2026",
"fam": "汽配/汽车后市场",
"n": 831,
"tel": 1,
"mail": 0,
"web": 0,
"cc": [
"CHN",
"KOR"
],
"k": [
"Diagnostics & Repair",
"Parts & Components",
"Electronics & Connectivity",
"Accessories & Customizing"
],
"src": "https://auto-maintenance.cn.messefrankfurt.com"
},
{
"id": "ACMAAUTOMECHANIKANEWDELHI",
"nm": "ACMA Automechanika New Delhi 2026",
"fam": "汽配/汽车后市场",
"n": 817,
"tel": 640,
"mail": 167,
"web": 533,
"cc": [
"IND",
"CHN",
"KOR",
"THA",
"DEU",
"HKG"
],
"k": [
"Parts & Components",
"Electrics & Electronics",
"Accessories & Customizing",
"Diagnostics & Repair"
],
"src": "https://acma-automechanika-newdelhi.in.messefrankfurt.com"
},
{
"id": "EUROBIKE",
"nm": "EUROBIKE 2026",
"fam": "交通/两轮/航空/基建",
"n": 776,
"tel": 479,
"mail": 247,
"web": 419,
"cc": [
"CHN",
"DEU",
"TWN",
"NLD",
"ITA",
"FRA"
],
"k": [
"Parts",
"Bicycles",
"Accessories",
"Clothing"
],
"src": "https://eurobike.com"
},
{
"id": "FORMNEXT",
"nm": "Formnext 2026",
"fam": "制造/模具/金属加工",
"n": 767,
"tel": 460,
"mail": 508,
"web": 747,
"cc": [
"DEU",
"CHN",
"USA",
"GBR",
"FRA",
"ESP"
],
"k": [
"Materials",
"Software and digitalization solutions",
"AM systems",
"Services"
],
"src": "https://formnext.mesago.com"
},
{
"id": "BEAUTYWORLDJAPANTOKYO",
"nm": "Beautyworld Japan Tokyo 2026",
"fam": "美容/个护",
"n": 728,
"tel": 670,
"mail": 255,
"web": 673,
"cc": [
"JPN",
"KOR",
"CHN",
"TWN",
"DEU",
"HKG"
],
"k": [
"Cosmetics for professional use",
"Cosmetics for consumers use",
"Nail & nail care products",
"Beauty equipment for professional use"
],
"src": "https://beautyworld-japan.jp.messefrankfurt.com"
},
{
"id": "INTERTEXTILESHANGHAIAPPARELFABRICSAUTUMN",
"nm": "Intertextile Shanghai Apparel Fabrics - Autumn Edition 2026",
"fam": "纺织/服装/家纺/纱线",
"n": 727,
"tel": 0,
"mail": 0,
"web": 399,
"cc": [
"CHN",
"HKG",
"ITA",
"KOR",
"JPN",
"TWN"
],
"k": [
"Business Nature",
"Apparel fabrics",
"Accessories",
"Business information"
],
"src": "https://intertextile-shanghai-apparel-fabrics-autumn.hk.messefrankfurt.com"
},
{
"id": "PCIMEUROPE",
"nm": "PCIM 2026",
"fam": "工业自动化/电子/物流",
"n": 665,
"tel": 473,
"mail": 397,
"web": 642,
"cc": [
"DEU",
"CHN",
"USA",
"TWN",
"GBR",
"ITA"
],
"k": [
"Power Semiconductors, Power Components, Power Modu",
"Passive Components",
"Thermal Management",
"Measurement and Test Tools and Quality Assurance"
],
"src": "https://pcim.mesago.com"
},
{
"id": "AUTOMECHANIKADUBAI",
"nm": "Automechanika Dubai 2026",
"fam": "汽配/汽车后市场",
"n": 639,
"tel": 465,
"mail": 159,
"web": 509,
"cc": [
"CHN",
"ARE",
"HKG",
"TWN",
"KOR",
"TUR"
],
"k": [
"10 Parts & Components",
"24 Tyres & Wheels",
"17 Oils, lubricants & fuels",
"14 Accessories & Customising"
],
"src": "https://automechanika-dubai.ae.messefrankfurt.com/dubai/en.html?utm_source=online&utm_medium=website&utm_campaign=am-global"
},
{
"id": "CHRISTMASWORLD",
"nm": "Christmasworld 2027",
"fam": "家居/消费品/礼品",
"n": 631,
"tel": 482,
"mail": 213,
"web": 513,
"cc": [
"DEU",
"CHN",
"HKG",
"NLD",
"IND",
"ITA"
],
"k": [
"Christmas & Seasonal decoration",
"Global Sourcing Christmasworld",
"Florists' requisites & Garden decoration",
"Ribbons & Wrapping"
],
"src": "https://christmasworld.messefrankfurt.com"
},
{
"id": "INAPAACEAUTOMECHANIKAMEXICOCITY",
"nm": "INA PAACE Automechanika Mexico City 2026",
"fam": "汽配/汽车后市场",
"n": 597,
"tel": 253,
"mail": 93,
"web": 391,
"cc": [
"CHN",
"MEX",
"TWN",
"USA",
"HKG",
"KOR"
],
"k": [
"Parts & Components\\ Partes y Componentes",
"Accessories & Customizing\\ Accesorios y Personaliz",
"Oils, Lubricants & Fuels\\ Aceites, Lubricantes y C",
"Diagnostics & Repair\\ Diagnóstico y Reparación"
],
"src": "https://paace-automechanika-mexico.us.messefrankfurt.com"
},
{
"id": "INTERTEXTILEPAVILIONSHENZHEN",
"nm": "Intertextile Shenzhen Apparel Fabrics 2026",
"fam": "纺织/服装/家纺/纱线",
"n": 555,
"tel": 0,
"mail": 0,
"web": 214,
"cc": [
"CHN",
"JPN",
"KOR",
"HKG",
"ITA"
],
"k": [
"Apparel fabrics"
],
"src": "https://intertextile-shenzhen.hk.messefrankfurt.com/shenzhen/en.html"
},
{
"id": "APPARELSOURCINGPARISAUTUMN",
"nm": "Apparel Sourcing Paris Autumn 2026",
"fam": "纺织/服装/家纺/纱线",
"n": 550,
"tel": 225,
"mail": 33,
"web": 258,
"cc": [
"CHN",
"IND",
"BGD",
"KGZ",
"TUR",
"PAK"
],
"k": [],
"src": "https://texworld-paris.fr.messefrankfurt.com"
},
{
"id": "NORDSTILWINTER",
"nm": "Nordstil Winter 2027",
"fam": "家居/消费品/礼品",
"n": 524,
"tel": 326,
"mail": 291,
"web": 495,
"cc": [
"DEU",
"DNK",
"NLD",
"AUT",
"SWE",
"FRA"
],
"k": [
"Gifts & Stationery",
"Home & Garden",
"Jewellery & Fashion",
"Kitchen & Gourmet"
],
"src": "https://nordstil.messefrankfurt.com"
},
{
"id": "INTERPETSASIAPACIFIC",
"nm": "Interpets Tokyo 2027",
"fam": "宠物",
"n": 519,
"tel": 490,
"mail": 125,
"web": 474,
"cc": [
"JPN",
"CHN",
"KOR",
"TWN",
"HKG",
"DEU"
],
"k": [
"Dog food & treats",
"Clothing, accessories & goods",
"Collars, harness & leashes",
"Grooming supplies"
],
"src": "https://interpets.jp.messefrankfurt.com"
},
{
"id": "ARMINERA",
"nm": "Arminera 2025",
"fam": "矿业/环保/水处理",
"n": 493,
"tel": 390,
"mail": 165,
"web": 376,
"cc": [
"ARG",
"CHL",
"PER",
"CAN",
"NLD",
"POL"
],
"k": [
"Machinery, tools and equipment",
"Industrial construction and assembly",
"Safety",
"Mining Exploration"
],
"src": "https://arminera.com.ar"
},
{
"id": "TEXWORLDPARISAUTUMN",
"nm": "Texworld Paris Autumn 2026",
"fam": "纺织/服装/家纺/纱线",
"n": 472,
"tel": 310,
"mail": 25,
"web": 241,
"cc": [
"CHN",
"TUR",
"KOR",
"IND",
"FRA",
"TWN"
],
"k": [],
"src": "https://texworld-paris.fr.messefrankfurt.com"
},
{
"id": "AUTOMECHANIKABUENOSAIRES",
"nm": "Automechanika Buenos Aires 2026",
"fam": "汽配/汽车后市场",
"n": 460,
"tel": 388,
"mail": 198,
"web": 405,
"cc": [
"ARG",
"CHN",
"BRA",
"TUR",
"POL",
"USA"
],
"k": [
"Parts & Components",
"Electronics & Systems",
"Accessories & Customizing",
"Repair & Maintenance"
],
"src": "https://automechanika.com.ar"
},
{
"id": "INTERSEC",
"nm": "Intersec Global 2027",
"fam": "安防/消防",
"n": 452,
"tel": 375,
"mail": 165,
"web": 396,
"cc": [
"ARE",
"DEU",
"GBR",
"USA",
"IND",
"TUR"
],
"k": [
"4 Fire, Rescue & Emergency Response",
"3 Surveillance & Physical Security",
"1 National Security & Law Enforcement",
"5 Safety & Wellbeing"
],
"src": "https://intersecglobal.com"
},
{
"id": "INTERIORLIFESTYLETOKYO",
"nm": "Interior Lifestyle Tokyo 2026",
"fam": "家居/消费品/礼品",
"n": 450,
"tel": 398,
"mail": 139,
"web": 430,
"cc": [
"JPN",
"GBR",
"HKG",
"TWN",
"KOR",
"CHN"
],
"k": [
"Tableware & Kitchenware",
"Gift item",
"Furniture (Home use）",
"Home accessories"
],
"src": "https://interiorlifestyle-tokyo.jp.messefrankfurt.com"
},
{
"id": "VIETNAMINTERNATIONALTRADEFAIRFORAPPARELTEXTILESTEXTILETECHNOLOGIES",
"nm": "Vietnam International Trade Fair for Apparel, Textiles & Tex",
"fam": "纺织/服装/家纺/纱线",
"n": 423,
"tel": 0,
"mail": 0,
"web": 270,
"cc": [
"CHN",
"VNM",
"IND",
"HKG",
"JPN",
"TWN"
],
"k": [
"Apparel",
"Apparel fabrics, accessories, yarn and fibres",
"Home textiles",
"Technical textiles, and nonwovens, textile process"
],
"src": "https://viatt.hk.messefrankfurt.com/hochiminhcity/en.html"
},
{
"id": "INTERPETSAICHI",
"nm": "Interpets Osaka 2026",
"fam": "宠物",
"n": 392,
"tel": 360,
"mail": 116,
"web": 356,
"cc": [
"JPN",
"CHN",
"KOR",
"TWN",
"USA",
"HKG"
],
"k": [
"Pet foods & treats",
"Fashion & accessory",
"Home",
"Healthcare & beauty"
],
"src": "https://interpets-osaka.jp.messefrankfurt.com"
},
{
"id": "PROLIGHTSOUND",
"nm": "Prolight + Sound 2025",
"fam": "娱乐/灯光音响/乐器",
"n": 338,
"tel": 246,
"mail": 222,
"web": 321,
"cc": [
"DEU",
"CHN",
"NLD",
"GBR",
"FRA",
"BEL"
],
"k": [
"ProLight",
"ProStage",
"ProAudio",
"ProEvent"
],
"src": "https://prolight-sound.com"
},
{
"id": "FORMNEXTASIASHENZHEN",
"nm": "Formnext Asia Shenzhen 2026",
"fam": "制造/模具/金属加工",
"n": 320,
"tel": 4,
"mail": 1,
"web": 264,
"cc": [
"CHN",
"USA",
"SGP",
"HKG",
"DEU",
"FRA"
],
"k": [
"3 Additive Manufacturing Materials",
"1 Solutions for Additive Manufacturing",
"5 Additive Manufacturing Accessories & Components",
"15 Pre-Processing and Post-Processing Techniques a"
],
"src": "https://www.formnext-shenzhen.com"
},
{
"id": "BEAUTYWORLDJAPANWEST",
"nm": "Beautyworld Osaka 2026",
"fam": "美容/个护",
"n": 319,
"tel": 306,
"mail": 109,
"web": 293,
"cc": [
"JPN",
"KOR",
"THA",
"HKG",
"IRL",
"TWN"
],
"k": [
"Cosmetics for professional use",
"Cosmetics for consumers use",
"Beauty equipment for professional use",
"Supplements / drinks / foods"
],
"src": "https://beautyworld-japan-osaka.jp.messefrankfurt.com"
},
{
"id": "CAPAS",
"nm": "CAPAS 2026",
"fam": "汽配/汽车后市场",
"n": 318,
"tel": 199,
"mail": 40,
"web": 224,
"cc": [
"CHN"
],
"k": [
"1 Parts & Components",
"3 Accessories & Customising",
"2 Electrics & Electronics",
"4 Diagnostics & Repair"
],
"src": "https://capas-chengdu.hk.messefrankfurt.com"
},
{
"id": "TEXCARE",
"nm": "Texcare International 2024",
"fam": "纺织/服装/家纺/纱线",
"n": 293,
"tel": 232,
"mail": 172,
"web": 272,
"cc": [
"DEU",
"ITA",
"NLD",
"USA",
"CHN",
"BEL"
],
"k": [
"Textiles and accessories",
"Machinery, systems and accessories for washing tex",
"Logistics and material flow",
"Information technology"
],
"src": "https://texcare.com"
},
{
"id": "AEROASIA",
"nm": "AERO Asia 2025",
"fam": "交通/两轮/航空/基建",
"n": 277,
"tel": 0,
"mail": 0,
"web": 99,
"cc": [
"CHN",
"USA",
"MLT",
"AUT",
"TUR",
"DEU"
],
"k": [
"Component and Material",
"Civil drone (UAS)",
"Engine, Propulsion System and Propeller",
"Other Services & Products"
],
"src": "https://aero-asia.com"
},
{
"id": "AUTOMECHANIKAHOCHIMINHCITY",
"nm": "Automechanika Ho Chi Minh City 2026",
"fam": "汽配/汽车后市场",
"n": 261,
"tel": 34,
"mail": 9,
"web": 157,
"cc": [
"CHN",
"VNM",
"TWN",
"MYS",
"KOR",
"ITA"
],
"k": [
"1 Parts & Components",
"5 Oils, Lubricants & Fuels",
"7 Car Wash, Care & Detailing",
"4 Diagnostics & Repair"
],
"src": "https://automechanika-hcmc.com"
},
{
"id": "AUTOMECHANIKAJAKARTA",
"nm": "Automechanika Jakarta 2026",
"fam": "汽配/汽车后市场",
"n": 242,
"tel": 121,
"mail": 33,
"web": 156,
"cc": [
"IDN",
"CHN",
"SGP",
"MYS",
"IND",
"TWN"
],
"k": [
"Parts & Components",
"Electrics & Electronics",
"Oils, Lubricants & Fuels",
"Diagnostics & Repair"
],
"src": "https://automechanika-jakarta.hk.messefrankfurt.com/jakarta/en.html"
},
{
"id": "AUTOMECHANIKAKUALALUMPUR",
"nm": "Automechanika Kuala Lumpur 2026",
"fam": "汽配/汽车后市场",
"n": 239,
"tel": 178,
"mail": 35,
"web": 198,
"cc": [
"CHN",
"MYS",
"TWN",
"SGP",
"THA",
"ARE"
],
"k": [
"1 Parts & Components",
"2 Electrics & Electronics",
"3 Accessories & Customising",
"5 Oils, Lubricants & Fuels"
],
"src": "https://automechanika-kualalumpur.hk.messefrankfurt.com"
},
{
"id": "NORDSTILSUMMER",
"nm": "Nordstil Sommer 2026",
"fam": "家居/消费品/礼品",
"n": 234,
"tel": 111,
"mail": 126,
"web": 212,
"cc": [
"DEU",
"NLD",
"DNK",
"SWE",
"ITA",
"AUT"
],
"k": [
"Finery & Gifts - Gifts and Stationery",
"Finery & Gifts - Jewellery and Fashion",
"Home & Ambience",
"Delights & Pleasures"
],
"src": "https://nordstil.messefrankfurt.com"
},
{
"id": "CREATIVEWORLD",
"nm": "Creativeworld 2027",
"fam": "家居/消费品/礼品",
"n": 232,
"tel": 162,
"mail": 102,
"web": 210,
"cc": [
"DEU",
"ITA",
"USA",
"FRA",
"GBR",
"NLD"
],
"k": [
"Graphic art, artist´s requisites",
"Hobby, arts & crafts",
"Handiwork & textile design",
"Graffiti & street art"
],
"src": "https://creativeworld.messefrankfurt.com"
},
{
"id": "CHILDEDUCAREJAPAN",
"nm": "Child Edu & Care Japan 2026",
"fam": "教育/母婴/儿童",
"n": 232,
"tel": 219,
"mail": 37,
"web": 229,
"cc": [
"JPN",
"KOR"
],
"k": [
"IT and ICT services",
"Educational materials, Training services",
"Furniture and Interior items",
"Indoor / Outdoor items and equipment"
],
"src": "https://hoikuhaku.jp.messefrankfurt.com/tokyo/en.html"
},
{
"id": "TECHTEXTILINDIA",
"nm": "Techtextil India 2025",
"fam": "纺织/服装/家纺/纱线",
"n": 200,
"tel": 64,
"mail": 34,
"web": 161,
"cc": [
"IND",
"CHN",
"DEU",
"USA",
"JPN",
"ITA"
],
"k": [
"Textile production technology and processes",
"Woven fabrics, laid webs, braidings, knitted fabri",
"Fibres and yarns",
"Research, development, education, consulting"
],
"src": "https://techtextil-india.in.messefrankfurt.com"
},
{
"id": "AUTOMECHANIKARIYADH",
"nm": "Automechanika Riyadh 2026",
"fam": "汽配/汽车后市场",
"n": 186,
"tel": 141,
"mail": 43,
"web": 150,
"cc": [
"SAU",
"HKG",
"ARE",
"IND",
"USA",
"TUR"
],
"k": [
"10 Parts & Components",
"14 Accessories & Customising",
"12 Electrics & Electronics",
"20 Car Wash, Care & Detailing"
],
"src": "https://automechanika-riyadh.ae.messefrankfurt.com/riyadh/en.html"
},
{
"id": "PCIMASIA",
"nm": "PCIM Asia Shenzhen 2026",
"fam": "工业自动化/电子/物流",
"n": 186,
"tel": 0,
"mail": 0,
"web": 132,
"cc": [
"CHN",
"KOR",
"HKG",
"JPN",
"USA",
"NLD"
],
"k": [
"1 Power semiconductors components and modules",
"11 Test & measurement",
"3 Passive components",
"7 Assemblies and subsystems"
],
"src": "https://pcimasia-expo.com"
},
{
"id": "THERMOTEC",
"nm": "Thermotec 2026",
"fam": "照明/建筑/卫浴",
"n": 185,
"tel": 181,
"mail": 51,
"web": 184,
"cc": [
"JPN",
"CHN",
"AUT",
"GBR",
"DEU",
"SGP"
],
"k": [
"Industrial furnaces",
"Instrumentation, control & transfer mechanisms",
"Environmental protection \n/ Carobn neutrality, dec",
"Refractories, heat-resisting steel"
],
"src": "https://thermotec-expo.com"
},
{
"id": "SPSSMARTPRODUCTIONSOLUTIONS",
"nm": "SPS – Smart Production Solutions Guangzhou 2026",
"fam": "工业自动化/电子/物流",
"n": 177,
"tel": 125,
"mail": 32,
"web": 144,
"cc": [
"CHN",
"TWN",
"KOR",
"RUS",
"JPN"
],
"k": [
"Sensor technology",
"Drive systems and components",
"Interface and interface technology",
"Control technology"
],
"src": "https://spsinchina.cn.messefrankfurt.com"
},
{
"id": "TEXPROCESS",
"nm": "Texprocess 2026",
"fam": "纺织/服装/家纺/纱线",
"n": 177,
"tel": 146,
"mail": 109,
"web": 164,
"cc": [
"DEU",
"ITA",
"CHN",
"TUR",
"TWN",
"GBR"
],
"k": [
"CMT (Cutting, Making, Trimming)",
"Sewing Technology and Materials",
"Embroidery Technology",
"CAD/CAM (2D/3D/4D)"
],
"src": "https://texprocess.com"
},
{
"id": "HOTELGA",
"nm": "Hotelga 2026",
"fam": "餐饮/酒店",
"n": 174,
"tel": 164,
"mail": 38,
"web": 112,
"cc": [
"ARG",
"USA",
"URY",
"CHN"
],
"k": [
"Beverages and infusions",
"Food and ingredients",
"Technology and systems",
"Decoration and lighting"
],
"src": "https://www.hotelga.com.ar"
},
{
"id": "EXPOFERRETERA",
"nm": "ExpoFerretera 2025",
"fam": "汽配/汽车后市场",
"n": 153,
"tel": 124,
"mail": 60,
"web": 125,
"cc": [
"ARG",
"CHN",
"BRA",
"DEU",
"COL",
"URY"
],
"k": [
"Machines. Tools and Equipment",
"General Hardware",
"Paint. Adhesives. Sealers and Chemicals",
"Safety"
],
"src": "https://expoferretera.com.ar"
},
{
"id": "BIELLIGHTBUILDINGBUENOSAIRES",
"nm": "BIEL Light + Building Buenos Aires 2025",
"fam": "照明/建筑/卫浴",
"n": 153,
"tel": 131,
"mail": 63,
"web": 133,
"cc": [
"ARG",
"CHN",
"BRA",
"USA",
"COL",
"HKG"
],
"k": [
"Lighting",
"Power generation, Transmition and Distribution",
"Electric Instalation",
"Single service performance"
],
"src": "https://biel-light-building.ar.messefrankfurt.com"
},
{
"id": "STATIONERYWRITESHOWPRESENTEDBYPAPERWORLD",
"nm": "Paperworld Mumbai 2026",
"fam": "家居/消费品/礼品",
"n": 151,
"tel": 91,
"mail": 28,
"web": 97,
"cc": [
"IND",
"CHN",
"TWN",
"GBR"
],
"k": [
"Writing Instruments",
"Office Supplies",
"School Supplies",
"Greeny Stationery"
],
"src": "https://paperworldmumbai.in.messefrankfurt.com/mumbai/en.html"
},
{
"id": "BEAUTYWORLDJAPANNAGOYA",
"nm": "Beautyworld Japan Nagoya 2026",
"fam": "美容/个护",
"n": 147,
"tel": 139,
"mail": 54,
"web": 127,
"cc": [
"JPN",
"CHN"
],
"k": [
"Cosmetics for professional use",
"Cosmetics for consumers use",
"Supplements / drinks / foods",
"Beauty equipment for professional use"
],
"src": "https://beautyworld-japan-nagoya.jp.messefrankfurt.com"
},
{
"id": "THEUKGARAGEANDBODYSHOPEVENT",
"nm": "The UK Garage & Bodyshop Event 2026",
"fam": "汽配/汽车后市场",
"n": 138,
"tel": 124,
"mail": 38,
"web": 100,
"cc": [
"GBR",
"NLD",
"USA",
"IRL",
"ITA"
],
"k": [
"Parts & Components",
"Diagnostics & Repair",
"Digital Solutions & Services",
"Body & Paint"
],
"src": "https://uk.messefrankfurt.com/london/en/UKGarageandBodyshopEvent.html"
},
{
"id": "TECNOFIDTA",
"nm": "Tecno Fidta 2026",
"fam": "食品/食品加工",
"n": 133,
"tel": 126,
"mail": 59,
"web": 116,
"cc": [
"ARG",
"BRA",
"URY",
"ESP",
"COL",
"USA"
],
"k": [
"Accessories and periferals",
"Processing",
"Services for the Industry",
"Additives"
],
"src": "https://tecnofidta.ar.messefrankfurt.com"
},
{
"id": "PAPERWORLDMIDDLEEAST",
"nm": "Paperworld Middle East 2026",
"fam": "家居/消费品/礼品",
"n": 128,
"tel": 94,
"mail": 22,
"web": 82,
"cc": [
"CHN",
"IND",
"HKG",
"ARE",
"EGY",
"MYS"
],
"k": [
"3 Stationery Supplies",
"2 Office Supplies",
"1 Paper & Paper Products",
"5 School Supplies"
],
"src": "https://paperworldme.com"
},
{
"id": "FOUNDRYTECHEXPO",
"nm": "Foundry Tech + Expo 2026",
"fam": "制造/模具/金属加工",
"n": 127,
"tel": 116,
"mail": 25,
"web": 123,
"cc": [
"JPN",
"CHN",
"TWN",
"KOR",
"HKG",
"IND"
],
"k": [
"Casting Manufaturer",
"Casting Machine Manufaturer/ Industrial furnaces",
"Raw Materials, Auxiliary materials, Molding Materi",
"ICT & Advanced digital transformation (DX) related"
],
"src": "https://foundrytechexpo.jp.messefrankfurt.com"
},
{
"id": "BEAUTYWORLDSAUDIARABIA",
"nm": "Beautyworld Riyadh 2026",
"fam": "美容/个护",
"n": 123,
"tel": 88,
"mail": 21,
"web": 66,
"cc": [
"SAU",
"HKG",
"ARE",
"CHN",
"TUR",
"FRA"
],
"k": [
"Supply Chain & Services",
"Cosmetics & Skincare",
"Hair, Nails & Salon Supplies",
"Personal Care & Hygiene"
],
"src": "https://beautyworld-riyadh.ksa.messefrankfurt.com/ksa/en.html"
},
{
"id": "INTERSECBUENOSAIRES",
"nm": "Intersec Buenos Aires 2026",
"fam": "安防/消防",
"n": 119,
"tel": 90,
"mail": 40,
"web": 84,
"cc": [
"ARG",
"CHN",
"USA",
"DEU"
],
"k": [
"Industrial safety and personal protection",
"Electronic Safety",
"Fire Detection",
"Domotic"
],
"src": "https://intersec.ar.messefrankfurt.com"
},
{
"id": "AUTOMECHANIKABIRMINGHAM",
"nm": "Automechanika Birmingham 2027",
"fam": "汽配/汽车后市场",
"n": 113,
"tel": 111,
"mail": 13,
"web": 62,
"cc": [
"GBR",
"NLD",
"POL",
"USA",
"IRL",
"LUX"
],
"k": [
"Diagnostics & Repair",
"Oils, lubricants & fuels"
],
"src": "https://automechanika-birmingham.uk.messefrankfurt.com/birmingham/en.html"
},
{
"id": "ACHEMAMIDDLEEAST",
"nm": "ACHEMA Middle East 2026",
"fam": "化工/制药/实验室",
"n": 113,
"tel": 74,
"mail": 30,
"web": 66,
"cc": [
"DEU",
"IND",
"SAU",
"ARE",
"FRA",
"ITA"
],
"k": [
"Industrial Engineering, Design & Infrastructure",
"Process Technology, Equipment & Solutions",
"Laboratory & Analytical Techniques"
],
"src": "https://www.achemame.com"
},
{
"id": "PROLIGHTSOUNDBANGKOK",
"nm": "Prolight + Sound Bangkok 2026",
"fam": "娱乐/灯光音响/乐器",
"n": 111,
"tel": 0,
"mail": 0,
"web": 64,
"cc": [
"CHN",
"THA",
"HKG",
"SGP",
"IND",
"CHE"
],
"k": [
"Professional Audio",
"Professional Lighting",
"Music & Related Equipment",
"Stage Equipment"
],
"src": "https://prolight-sound-bangkok.hk.messefrankfurt.com/bangkok/en.html"
},
{
"id": "MEDIAEXPOMUMBAI",
"nm": "Media Expo Mumbai 2026",
"fam": "印刷/广告/标识",
"n": 106,
"tel": 84,
"mail": 14,
"web": 61,
"cc": [
"IND",
"CHN",
"TWN"
],
"k": [
"Printing equipment",
"Sign substrates / equipment",
"Digital signage",
"Fabricating/ finishing & decorating machines & equ"
],
"src": "https://mediaexpo-mumbai.com"
},
{
"id": "PRINTEXPOCHENNAI",
"nm": "Print Expo Chennai 2026",
"fam": "印刷/广告/标识",
"n": 98,
"tel": 88,
"mail": 17,
"web": 41,
"cc": [
"IND"
],
"k": [
"Press (Printing Presses)",
"Offset Printing",
"Paper & Paper Packaging Products",
"Digital Printers"
],
"src": "https://www.printexpo.in/index.html"
},
{
"id": "MEDIAEXPODELHI",
"nm": "Media Expo Delhi 2026",
"fam": "印刷/广告/标识",
"n": 97,
"tel": 77,
"mail": 11,
"web": 37,
"cc": [
"IND",
"CHN",
"ITA"
],
"k": [
"Printing equipment",
"Sign substrates / equipment",
"Digital signage",
"Digital Printing"
],
"src": "https://mediaexpo-delhi.com"
},
{
"id": "LOGIMOTION",
"nm": "Logimotion 2024",
"fam": "工业自动化/电子/物流",
"n": 96,
"tel": 75,
"mail": 15,
"web": 64,
"cc": [
"ARE",
"CHN",
"ITA",
"DEU",
"IND",
"QAT"
],
"k": [
"1 Warehousing Solutions & Equipment",
"2 Freight, Cargo & Material Handling",
"4 Transportation & Mobility Solutions",
"3 Outsourcing & Third-Party Services"
],
"src": "https://www.logimotion.com"
},
{
"id": "BABYSTROLLERCHINA",
"nm": "Baby & Stroller China 2026",
"fam": "教育/母婴/儿童",
"n": 96,
"tel": 31,
"mail": 3,
"web": 36,
"cc": [
"CHN"
],
"k": [
"1 Strollers & Ride-ons",
"3 Home Living & Lifestyle for Baby & Kids",
"2 Mother & Baby Care Products",
"4 Baby and children fashion"
],
"src": "https://shenzhen-international-stroller-mother-and-baby-product-fair.hk.messefrankfurt.com"
},
{
"id": "EMITEX",
"nm": "Emitex 2025",
"fam": "纺织/服装/家纺/纱线",
"n": 95,
"tel": 83,
"mail": 28,
"web": 63,
"cc": [
"ARG",
"CHN",
"BRA",
"PER",
"HKG"
],
"k": [
"Fibers, Yarns and Fabrics",
"Machinery for digital printing and sublimation",
"Trims and accessories",
"Services for the apparel industry"
],
"src": "https://emitex.ar.messefrankfurt.com/buenosaires/es.html"
},
{
"id": "ASIAMOLDSELECT",
"nm": "Asiamold Select 2026",
"fam": "制造/模具/金属加工",
"n": 92,
"tel": 0,
"mail": 0,
"web": 0,
"cc": [
"CHN",
"TWN",
"KOR"
],
"k": [
"1 Moldmaking & tooling",
"3 Accessories",
"6 Materials",
"7 surface treament and coating"
],
"src": "https://asiamold-china.cn.messefrankfurt.com"
},
{
"id": "EMITEXSIMATEXCONFEMAQ",
"nm": "Emitex Simatex Confemaq 2026",
"fam": "纺织/服装/家纺/纱线",
"n": 81,
"tel": 61,
"mail": 24,
"web": 35,
"cc": [
"ARG",
"CHN",
"PER",
"BRA",
"ITA",
"CHL"
],
"k": [
"Fibers, Yarns and Fabrics",
"Trims and accessories",
"Services for the apparel industry",
"Machinery for apparel industry"
],
"src": "https://emitex.ar.messefrankfurt.com"
},
{
"id": "CLEANZONE",
"nm": "Cleanzone 2024",
"fam": "清洁/冷链/卫生",
"n": 76,
"tel": 59,
"mail": 50,
"web": 69,
"cc": [
"DEU",
"CHE",
"ITA",
"BEL",
"GBR",
"NLD"
],
"k": [
"Hygiene, Components, Microbiology",
"Building Technology, Construction, Material Delive",
"Architecture, Planning, Engineering",
"Transfer (inward), Equipment + Fixtures/Furnishing"
],
"src": "https://cleanzone.messefrankfurt.com"
},
{
"id": "DEXPERTY",
"nm": "Showroom 2020",
"fam": "其他/未分类",
"n": 72,
"tel": 1,
"mail": 2,
"web": 19,
"cc": [
"DEU",
"JPN",
"ARE",
"CHL",
"ITA",
"MYT"
],
"k": [
"Wall Decoration",
"Window & Interior Decoration",
"Beautiful Living"
],
"src": "https://dexperty.showroom.de"
},
{
"id": "PAPERWORLDCHINA",
"nm": "Paperworld China 2026",
"fam": "家居/消费品/礼品",
"n": 70,
"tel": 0,
"mail": 0,
"web": 33,
"cc": [
"CHN",
"JPN",
"TWN"
],
"k": [
"School supplies",
"Paper and printed products",
"Art supplies",
"Writing instruments"
],
"src": "https://www.paperworldchina.com"
},
{
"id": "YARNEXPOSHANGHAIAUTUMN",
"nm": "Yarn Expo Autumn 2026",
"fam": "纺织/服装/家纺/纱线",
"n": 68,
"tel": 0,
"mail": 0,
"web": 38,
"cc": [
"IND",
"UZB",
"HKG",
"PAK",
"VNM",
"IDN"
],
"k": [
"Business nature",
"Other fibres"
],
"src": "https://yarn-expo-autumn.hk.messefrankfurt.com"
},
{
"id": "MOTOBIKEISTANBUL",
"nm": "Motobike Istanbul 2026",
"fam": "交通/两轮/航空/基建",
"n": 66,
"tel": 57,
"mail": 20,
"web": 38,
"cc": [
"TUR",
"ESP",
"IDN",
"IND"
],
"k": [
"Motorcycle Types",
"Motorcycle Parts and Systems",
"Service Groups",
"Motorcycle Accessories"
],
"src": "https://motobike-istanbul.tr.messefrankfurt.com/istanbul/en.html"
},
{
"id": "PAPERWORLDDELHI",
"nm": "Paperworld Delhi 2026",
"fam": "家居/消费品/礼品",
"n": 66,
"tel": 57,
"mail": 12,
"web": 29,
"cc": [
"IND",
"TWN"
],
"k": [
"Creative Materials",
"Office Supplies",
"Paper & paper products",
"Back 2 School"
],
"src": "https://paperworldnewdelhi.in.messefrankfurt.com/newdelhi/en.html"
},
{
"id": "EMV",
"nm": "EMV 2027",
"fam": "工业自动化/电子/物流",
"n": 66,
"tel": 50,
"mail": 44,
"web": 66,
"cc": [
"DEU",
"CHN",
"ITA",
"FRA",
"USA",
"NLD"
],
"k": [
"Shielding",
"EMC Services",
"Antennas",
"Filters and Filter Components"
],
"src": "https://e-emv.com"
},
{
"id": "MEDIAEXPOCHENNAI",
"nm": "Media Expo Chennai 2026",
"fam": "印刷/广告/标识",
"n": 58,
"tel": 52,
"mail": 7,
"web": 22,
"cc": [
"IND"
],
"k": [
"Printing equipment",
"Sign substrates / equipment",
"Architectural hardware",
"Fabricating/ finishing & decorating machines & equ"
],
"src": "https://-"
},
{
"id": "TRANSPORTTRAFFICINFRATECHEXPO",
"nm": "Transport + Traffic Infratech Expo 2026",
"fam": "交通/两轮/航空/基建",
"n": 54,
"tel": 44,
"mail": 11,
"web": 39,
"cc": [
"IND",
"RUS"
],
"k": [
"Transport + Traffic Infratech Expo",
"Road Infratech Expo",
"Parking Infratech Expo"
],
"src": "https://trafficinfratechexpo.com"
},
{
"id": "LIGHTMIDDLEEAST",
"nm": "Light + Intelligent Building Middle East 2027",
"fam": "照明/建筑/卫浴",
"n": 47,
"tel": 40,
"mail": 15,
"web": 38,
"cc": [
"ARE",
"ITA",
"CHN",
"ESP",
"DEU",
"CZE"
],
"k": [
"6 Smart Home & Building Automation",
"2 Architectural Lighting and Accessories",
"3 Technical Lighting and Accessories",
"1 Decorative Lighting and Accessories"
],
"src": "https://light-intelligentbuildingme.com"
},
{
"id": "BEAUTYWORLDJAPANFUKUOKA",
"nm": "Beautyworld Fukuoka 2027",
"fam": "美容/个护",
"n": 47,
"tel": 47,
"mail": 9,
"web": 45,
"cc": [
"JPN"
],
"k": [
"Cosmetics for professional use",
"Cosmetics for consumers use",
"Supplements / drinks / foods",
"Hair & hair care products / Equipment"
],
"src": "https://beautyworld-japan-fukuoka.jp.messefrankfurt.com"
},
{
"id": "CINTETECHTEXTILCHINA",
"nm": "Cinte Techtextil China 2026",
"fam": "纺织/服装/家纺/纱线",
"n": 39,
"tel": 0,
"mail": 0,
"web": 31,
"cc": [
"CHN",
"DEU",
"IND",
"ITA",
"THA",
"JPN"
],
"k": [
"1 Textile production technology and processes",
"3 Nonwovens",
"11 Associations, publishers",
"7 Fibres and yarns"
],
"src": "https://techtextilchina.com"
},
{
"id": "LIGHTINTELLIGENTBUILDINGISTANBUL",
"nm": "Light + Intelligent Building Istanbul 2026",
"fam": "照明/建筑/卫浴",
"n": 29,
"tel": 25,
"mail": 14,
"web": 26,
"cc": [
"TUR",
"CHN",
"KOR",
"ITA",
"MYS",
"HKG"
],
"k": [
"Technical lighting and accessories",
"IT Security / IOT Security",
"Decorative lighting and accessories",
"Fixed installation electrical equipment"
],
"src": "https://light-building-istanbul.tr.messefrankfurt.com/istanbul/en.html"
},
{
"id": "INTERSECSHANGHAI",
"nm": "Intersec Shanghai 2026",
"fam": "安防/消防",
"n": 17,
"tel": 8,
"mail": 2,
"web": 8,
"cc": [
"CHN",
"TUR",
"ITA"
],
"k": [
"1 Public Premises",
"2 Workplace Premises"
],
"src": "https://www.intersec-shanghai.com"
},
{
"id": "SPSIPCDRIVESITALIA",
"nm": "SPS Italia 2027",
"fam": "工业自动化/电子/物流",
"n": 10,
"tel": 10,
"mail": 6,
"web": 10,
"cc": [
"ITA",
"NLD"
],
"k": [
"Sensor technology",
"Drive systems and components",
"IPCs",
"Additive Manufacturing technologies"
],
"src": "https://spsitalia.it.messefrankfurt.com/parma/it.html"
},
{
"id": "VALUEMILANSPRING",
"nm": "Val:ue Milan - Spring 2027",
"fam": "其他/未分类",
"n": 1,
"tel": 0,
"mail": 0,
"web": 0,
"cc": [
"ITA"
],
"k": [
"Apparel Fabrics"
],
"src": "https://www.valuemilan.com"
}
];

/* ---------------- 行业族中英同义词（搜索用）----------------
   为什么不逐词翻译 650 个品类词：那些是展会方自己的分类名（"Table & Table Select"、
   "Parts & Components\ Partes y Componentes"），逐词翻译既翻不准也没必要。
   中国厂商搜的是「家具」「灯」「汽车」，不是「Table & Table Select」。
   所以做**族级同义词**：一个中文词命中一个族 → 展开成该族全部展会。 */
window.FAL_EXPO_FAM_SYN = {
  "汽配/汽车后市场": ["汽车","汽配","零部件","汽车配件","汽保","钣金","轮胎","刹车","滤清器","火花塞","雨刷","车灯","后视镜","改装","底盘","变速箱","auto","automotive","automechanika","vehicle","car","repair","body","paint","wheel","tire","tyre","brake","filter","spark","wiper","headlight","mirror","tuning","parts","component","chassis","transmission"],
  "纺织/服装/家纺/纱线": ["纺织","服装","面料","家纺","布","纱","衣服","成衣","针织","梭织","牛仔","无纺布","蕾丝","刺绣","拉链","纽扣","毛巾","床品","窗帘","地毯","textile","fabric","apparel","garment","yarn","clothing","home textile","knit","woven","denim","nonwoven","lace","embroidery","zipper","button","towel","bedding","curtain","carpet"],
  "家居/消费品/礼品": ["家居","家具","消费品","礼品","文具","玩具","装饰","室内","沙发","床垫","橱柜","餐桌","餐具","厨具","收纳","香薰","蜡烛","圣诞","节庆","furniture","home","consumer","gift","stationery","toy","decor","interior","living","sofa","mattress","cabinet","table","kitchen","storage","candle","christmas","seasonal"],
  "照明/建筑/卫浴": ["照明","灯","灯具","建筑","卫浴","建材","灯泡","灯带","路灯","射灯","吊灯","水龙头","马桶","淋浴","瓷砖","门窗","电气","布线","lighting","light","building","bathroom","sanitary","construction","bulb","strip","street light","spot","chandelier","faucet","toilet","shower","tile","door","window","electrical","cable"],
  "娱乐/灯光音响/乐器": ["娱乐","音响","乐器","舞台","灯光音响","吉他","钢琴","鼓","麦克风","音箱","功放","调音台","music","audio","sound","instrument","stage","entertainment","prolight","guitar","piano","drum","microphone","speaker","amplifier","mixer"],
  "美容/个护": ["美容","化妆品","护肤","个护","香水","美甲","美发","沙龙","彩妆","面膜","beauty","cosmetic","skincare","personal care","fragrance","perfume","nail","hair","salon","makeup","mask"],
  "工业自动化/电子/物流": ["自动化","工业","物流","传感器","传动","工控","电机","变频器","伺服","液压","气动","阀门","泵","压缩机","继电器","plc","连接器","电阻","电容","电源","仓储","输送","automation","industrial","logistics","sensor","drive","process","motor","inverter","servo","hydraulic","pneumatic","valve","pump","compressor","relay","connector","resistor","capacitor","power supply","warehouse","conveyor"],
  "制造/模具/金属加工": ["制造","模具","金属","铸造","焊接","3d打印","增材","机械","轴承","齿轮","紧固件","螺丝","弹簧","铸件","锻件","冲压","机加工","钣金件","刀具","磨具","热处理","mold","metal","foundry","welding","additive","formnext","manufacturing","bearing","gear","fastener","screw","spring","casting","forging","stamping","machining","tool","abrasive","heat treatment"],
  "食品/食品加工": ["食品","肉类","烘焙","饮料","调味","香料","罐头","冷冻食品","屠宰","灌装","food","meat","bakery","beverage","spice","canning","frozen","slaughter","filling","packaging"],
  "交通/两轮/航空/基建": ["自行车","摩托","航空","飞机","两轮","电动车","滑板车","无人机","铁路","交通","基建","bike","bicycle","motorcycle","aviation","aerospace","eurobike","scooter","drone","rail","transport","infrastructure"],
  "宠物": ["宠物","猫","狗","宠物粮","宠物用品","牵引绳","猫砂","pet","dog","cat","pet food","pet supply","leash","litter"],
  "安防/消防": ["安防","消防","安全","监控","门禁","报警","灭火","防护","security","fire","safety","surveillance","access control","alarm","extinguisher","protection"],
  "矿业/环保/水处理": ["矿业","环保","水处理","回收","采矿","污水","废气","固废","mining","environment","water","waste","recycl","quarry","sewage","emission"],
  "印刷/广告/标识": ["印刷","广告","标识","喷绘","数码印刷","丝印","油墨","灯箱","print","sign","advertising","graphic","ink","digital print","screen print","light box"],
  "教育/母婴/儿童": ["教育","母婴","儿童","幼儿园","托育","婴儿","学生","校服","教具","education","child","baby","kids","school","kindergarten","nursery","infant","student","teaching aid"],
  "餐饮/酒店": ["餐饮","酒店","餐厅","咖啡","厨房设备","餐具","酒吧","hotel","restaurant","catering","coffee","foodservice","kitchen equipment","tableware","bar"],
  "化工/制药/实验室": ["化工","制药","实验室","试剂","分析仪器","生物","chem","pharma","lab","reagent","analytical","biotech"],
  "清洁/冷链/卫生": ["清洁","冷链","卫生","洗涤","消毒","无尘室","clean","laundry","hygiene","cold chain","disinfect","cleanroom"]
};

/* 关键词 → 命中的行业族数组（中英皆可）。空数组 = 不是行业词，按公司名/品类直搜。 */
window.FAL_EXPO_FAMOF = function (kw) {
  var q = (kw || "").toLowerCase().trim();
  if (q.length < 1) return [];
  var out = [], S = window.FAL_EXPO_FAM_SYN;
  for (var f in S) {
    if (!S.hasOwnProperty(f)) continue;
    for (var i = 0; i < S[f].length; i++) {
      var w = S[f][i].toLowerCase();
      if (q.indexOf(w) >= 0 || w.indexOf(q) === 0) { out.push(f); break; }
    }
  }
  return out;
};

/* ---------------- 展览集团 / 技术平台层 ----------------
   为什么要这一层：全球 B2B 展会跑在少数几家集团上，按「平台」接一套就能吃一片。
   状态只写实测结论，未实测的一律 untested，绝不假装能接。 */
window.FAL_EXPO_PLATFORMS = [
  { id: "messefrankfurt", nm: "Messe Frankfurt（法兰克福展览集团）",
    scope: "德国/全球", api: "公开 REST（api.messefrankfurt.com · exhibitor-service 2.1 · Header: Apikey）",
    status: "verified", nEv: 91, nCo: 49907,
    note: "本文件数据全部来自此平台。87 个展会含汽配/纺织/消费品/照明/食品/美容/3D打印/自动化/安防/环保。" },
  { id: "deutschemesee", nm: "Deutsche Messe（汉诺威展览）",
    scope: "德国", api: "未找到参展商接口；/api/places/* 仅地址联想",
    status: "probed-failed", nEv: 0, nCo: 0,
    note: "Hannover Messe 参展商页为 JS 渲染，HTML 无数据；仅发现地图位置接口。需再挖 bundle。" },
  { id: "mapyourshow", nm: "MapYourShow（美国展会系统，数百个展会用）",
    scope: "美国/全球", api: "未找到；页面 JS 渲染，列表页 374KB 无实体数据",
    status: "probed-failed", nEv: 0, nCo: 0,
    note: "AHR Expo / PACK EXPO 均跑在此平台。<show>.mapyourshow.com/8_0/ 形态确认，API 端点待挖。" },
  { id: "taitra", nm: "TAITRA 外贸协会（COMPUTEX / Taipei Cycle / Food Taipei）",
    scope: "台湾", api: "无全量列表，仅关键词搜索页 /en/index/full-search.html?type=exhibitor",
    status: "not-batchable", nEv: 0, nCo: 0,
    note: "结构上不支持「列全量」，只能按关键词逐条搜。若要做，需先有目标公司名单反向查。" },
  { id: "untested", nm: "待探（未实测，不承诺）",
    scope: "全球", api: "—", status: "untested", nEv: 0, nCo: 0,
    note: "RX(Reed) / Informa Markets / Comexposium / Hyve / HKTDC / Messe Düsseldorf / Koelnmesse / NürnbergMesse / Messe München / Fiera Milano。" }
];

window.FAL_EXPO_FIND = function (kw, cc) {
  var q = (kw || "").toLowerCase().trim();
  var out = window.FAL_EXPO_EVENTS.filter(function (e) {
    if (cc && e.cc.indexOf(cc) < 0) return false;
    if (!q) return true;
    var hay = (e.id + " " + e.nm + " " + e.fam + " " + (e.k || []).join(" ")).toLowerCase();
    return hay.indexOf(q) >= 0;
  });
  return out.sort(function (a, b) { return b.n - a.n; });
};
