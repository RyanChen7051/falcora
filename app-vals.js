/* FALCORA 获客通AI — 演示数据值多语言字典
   行业 / 地区 / 角色等「数据值」按当前 UI 语言本地化（对照 FAL_DICT 的 UI 文案，
   这里是业务数据，独立于界面文案）。在 <head> 引入，保证页面内联脚本解析前即可用。
   10 语言顺序：zh / zh-Hant / en / es / ja / fr / de / ar / vi / hi
   （zh-Hant 繁體中文 由 OpenCC s2twp 从简体生成）
   window.__falVal(zh, lang?) 返回本地化值；lang 省略时取 UI 语言。
*/
(function () {
  var ORDER = ["zh", "zh-Hant", "en", "es", "ja", "fr", "de", "ar", "vi", "hi"];
  var V = {
    "工业设备": ["工业设备", "工業裝置", "Industrial Equipment", "Equipo industrial", "産業機器", "Équipement industriel", "Industrieausrüstung", "المعدات الصناعية", "Thiết bị công nghiệp", "औद्योगिक उपकरण"],
    "新能源": ["新能源", "新能源", "New Energy", "Energía nueva", "新エネルギー", "Nouvelle énergie", "Neue Energie", "الطاقة الجديدة", "Năng lượng mới", "नई ऊर्जा"],
    "电子制造": ["电子制造", "電子製造", "Electronics Manufacturing", "Fabricación electrónica", "電子製造", "Fabrication électronique", "Elektronikfertigung", "التصنيع الإلكتروني", "Sản xuất điện tử", "इलेक्ट्रॉनिक्स निर्माण"],
    "医疗器械": ["医疗器械", "醫療器械", "Medical Devices", "Dispositivos médicos", "医療機器", "Dispositifs médicaux", "Medizinprodukte", "الأجهزة الطبية", "Thiết bị y tế", "चिकित्सा उपकरण"],
    "建材": ["建材", "建材", "Building Materials", "Materiales de construcción", "建材", "Matériaux de construction", "Baumaterialien", "مواد البناء", "Vật liệu xây dựng", "निर्माण सामग्री"],
    "化工": ["化工", "化工", "Chemicals", "Productos químicos", "化学品", "Produits chimiques", "Chemikalien", "الكيماويات", "Hóa chất", "रसायन"],
    "汽车零部件": ["汽车零部件", "汽車零部件", "Auto Parts", "Autopartes", "自動車部品", "Pièces automobiles", "Autoteile", "قطع غيار السيارات", "Linh kiện ô tô", "ऑटो पार्ट्स"],
    "包装": ["包装", "包裝", "Packaging", "Embalaje", "包装", "Emballage", "Verpackung", "التغليف", "Bao bì", "पैकेजिंग"],
    "机械设备": ["机械设备", "機械裝置", "Machinery & Equipment", "Maquinaria", "機械設備", "Machines et équipements", "Maschinen und Anlagen", "الآلات والمعدات", "Máy móc và thiết bị", "मशीनरी और उपकरण"],
    "五金工具": ["五金工具", "五金工具", "Hardware & Tools", "Ferretería", "金物・工具", "Quincaillerie", "Eisenwaren und Werkzeuge", "الأدوات والعدد", "Phụ tùng và dụng cụ", "हार्डवेयर और औजार"],
    "纺织服装": ["纺织服装", "紡織服裝", "Textiles & Apparel", "Textiles y confección", "繊維・アパレル", "Textile et habillement", "Textil und Bekleidung", "المنسوجات والملابس", "Dệt may và may mặc", "वस्त्र और परिधान"],
    "消费电子": ["消费电子", "消費電子", "Consumer Electronics", "Electrónica de consumo", "消費者電子機器", "Électronique grand public", "Unterhaltungselektronik", "الإلكترونيات الاستهلاكية", "Điện tử tiêu dùng", "उपभोक्ता इलेक्ट्रॉनिक्स"],
    "家居日用": ["家居日用", "家居日用", "Home & Household", "Hogar y artículos diarios", "ホーム・日用品", "Maison et articles courants", "Haushalt und Alltag", "الأدوات المنزلية", "Đồ gia dụng", "घरेलू सामान"],
    "美妆个护": ["美妆个护", "美妝個護", "Beauty & Personal Care", "Belleza y cuidado personal", "ビューティー・パーソナルケア", "Beauté et soins personnels", "Schönheit und Körperpflege", "التجميل والعناية الشخصية", "Mỹ phẩm và chăm sóc cá nhân", "सौंदर्य और व्यक्तिगत देखभाल"],
    "食品饮料": ["食品饮料", "食品飲料", "Food & Beverage", "Alimentación y bebidas", "食品・飲料", "Alimentation et boissons", "Lebensmittel und Getränke", "الأغذية والمشروبات", "Thực phẩm và đồ uống", "खाद्य और पेय"],
    "玩具婴童": ["玩具婴童", "玩具嬰童", "Toys & Baby", "Juguetes y bebés", "おもちゃ・ベビー", "Jouets et puériculture", "Spielzeug und Baby", "ألعاب والأطفال", "Đồ chơi và em bé", "खिलौने और शिशु"],
    "运动户外": ["运动户外", "運動戶外", "Sports & Outdoor", "Deportes y aire libre", "スポーツ・アウトドア", "Sports et plein air", "Sport und Outdoor", "الرياضة والأنشطة الخارجية", "Thể thao và ngoài trời", "खेल और आउटडोर"],
    "AI/大数据": ["AI/大数据", "AI/大資料", "AI / Big Data", "IA / Big Data", "AI／ビッグデータ", "IA / Big Data", "KI / Big Data", "الذكاء الاصطناعي / البيانات الضخمة", "AI / Dữ liệu lớn", "AI / बिग डेटा"],
    "工业软件": ["工业软件", "工業軟體", "Industrial Software", "Software industrial", "産業ソフトウェア", "Logiciel industriel", "Industriesoftware", "البرمجيات الصناعية", "Phần mềm công nghiệp", "औद्योगिक सॉफ्टवेयर"],
    "嵌入式系统": ["嵌入式系统", "嵌入式系統", "Embedded Systems", "Sistemas embebidos", "組み込みシステム", "Systèmes embarqués", "Eingebettete Systeme", "الأنظمة المدمجة", "Hệ thống nhúng", "एम्बेडेड सिस्टम"],
    "游戏": ["游戏", "遊戲", "Games", "Juegos", "ゲーム", "Jeux", "Spiele", "الألعاب", "Trò chơi", "गेम्स"],
    "检测认证": ["检测认证", "檢測認證", "Testing & Certification", "Ensayo y certificación", "検査・認証", "Essais et certification", "Prüfung und Zertifizierung", "الاختبار والاعتماد", "Kiểm định và chứng nhận", "परीक्षण और प्रमाणन"],
    "物流仓储": ["物流仓储", "物流倉儲", "Logistics & Warehousing", "Logística y almacenamiento", "物流・倉庫", "Logistique et entrepôt", "Logistik und Lagerung", "الخدمات اللوجستية والتخزين", "Hậu cần và kho bãi", "रसद और गोदाम"],
    "营销咨询": ["营销咨询", "營銷諮詢", "Marketing Consulting", "Consultoría de marketing", "マーケティングコンサル", "Conseil en marketing", "Marketingberatung", "استشارات التسويق", "Tư vấn tiếp thị", "मार्केटिंग परामर्श"],
    "金融服务": ["金融服务", "金融服務", "Financial Services", "Servicios financieros", "金融サービス", "Services financiers", "Finanzdienstleistungen", "الخدمات المالية", "Dịch vụ tài chính", "वित्तीय सेवाएं"],
    "法律合规": ["法律合规", "法律合規", "Legal & Compliance", "Legal y cumplimiento", "法務・コンプライアンス", "Juridique et conformité", "Recht und Compliance", "القانونية والامتثال", "Pháp lý và tuân thủ", "कानूनी और अनुपालन"],
    "光伏": ["光伏", "光伏", "Photovoltaics", "Fotovoltaica", "光伏", "Photovoltaïque", "Photovoltaik", "الطاقة الشمسية الكهروضوئية", "Quang điện", "सौर ऊर्जा"],
    "储能": ["储能", "儲能", "Energy Storage", "Almacenamiento de energía", "蓄電", "Stockage d'énergie", "Energiespeicherung", "تخزين الطاقة", "Lưu trữ năng lượng", "ऊर्जा भंडारण"],
    "新材料": ["新材料", "新材料", "New Materials", "Nuevos materiales", "新素材", "Nouveaux matériaux", "Neue Materialien", "المواد الجديدة", "Vật liệu mới", "नई सामग्री"],
    "石油化工": ["石油化工", "石油化工", "Petrochemicals", "Petroquímica", "石油化学", "Pétrochimie", "Petrochemie", "البتروكيماويات", "Hóa dầu", "पेट्रोकेमिकल्स"],
    "制药": ["制药", "製藥", "Pharmaceuticals", "Farmacéuticos", "製薬", "Produits pharmaceutiques", "Pharmazeutika", "الأدوية", "Dược phẩm", "दवा"],
    "诊断试剂": ["诊断试剂", "診斷試劑", "Diagnostic Reagents", "Reactivos de diagnóstico", "診断試薬", "Réactifs de diagnostic", "Diagnostika", "كواشف التشخيص", "Thuốc chẩn đoán", "नैदानिक रसायन"],
    "医疗服务": ["医疗服务", "醫療服務", "Medical Services", "Servicios médicos", "医療サービス", "Services médicaux", "Medizinische Dienstleistungen", "الخدمات الطبية", "Dịch vụ y tế", "चिकित्सा सेवाएं"],
    "制造业": ["制造业", "製造業", "Manufacturing", "Manufactura", "製造業", "Fabrication", "Fertigung", "التصنيع", "Sản xuất", "विनिर्माण"],
    "消费品": ["消费品", "消費品", "Consumer Goods", "Bienes de consumo", "消費財", "Biens de consommation", "Konsumgüter", "السلع الاستهلاكية", "Hàng tiêu dùng", "उपभोक्ता वस्तुएं"],
    "科技/软件": ["科技/软件", "科技/軟體", "Tech / Software", "Tecnología / Software", "テクノロジー／ソフトウェア", "Technologie / Logiciel", "Technik / Software", "التقنية / البرمجيات", "Công nghệ / Phần mềm", "तकनीक / सॉफ्टवेयर"],
    "专业服务": ["专业服务", "專業服務", "Professional Services", "Servicios profesionales", "プロフェッショナルサービス", "Services professionnels", "Professionelle Dienstleistungen", "الخدمات المهنية", "Dịch vụ chuyên nghiệp", "पेशेवर सेवाएं"],
    "能源/材料": ["能源/材料", "能源/材料", "Energy / Materials", "Energía / Materiales", "エネルギー／素材", "Énergie / Matériaux", "Energie / Materialien", "الطاقة / المواد", "Năng lượng / Vật liệu", "ऊर्जा / सामग्री"],
    "医疗健康": ["医疗健康", "醫療健康", "Healthcare", "Salud", "ヘルスケア", "Santé", "Gesundheitswesen", "الرعاية الصحية", "Chăm sóc sức khỏe", "स्वास्थ्य सेवा"],
    "北美": ["北美", "北美", "North America", "Norteamérica", "北米", "Amérique du Nord", "Nordamerika", "أمريكا الشمالية", "Bắc Mỹ", "उत्तर अमेरिका"],
    "欧盟": ["欧盟", "歐盟", "European Union", "Unión Europea", "欧州連合", "Union européenne", "Europäische Union", "الاتحاد الأوروبي", "Liên minh Châu Âu", "यूरोपीय संघ"],
    "中东": ["中东", "中東", "Middle East", "Oriente Medio", "中東", "Moyen-Orient", "Naher Osten", "الشرق الأوسط", "Trung Đông", "मध्य पूर्व"],
    "东南亚": ["东南亚", "東南亞", "Southeast Asia", "Sudeste Asiático", "東南アジア", "Asie du Sud-Est", "Südostasien", "جنوب شرق آسيا", "Đông Nam Á", "दक्षिण पूर्व एशिया"],
    "拉美": ["拉美", "拉美", "Latin America", "América Latina", "ラテンアメリカ", "Amérique latine", "Lateinamerika", "أمريكا اللاتينية", "Mỹ Latinh", "लातिनी अमेरिका"],
    "非洲": ["非洲", "非洲", "Africa", "África", "アフリカ", "Afrique", "Afrika", "أفريقيا", "Châu Phi", "अफ्रीका"],
    "东亚": ["东亚", "東亞", "East Asia", "Asia Oriental", "東アジア", "Asie de l'Est", "Ostasien", "شرق آسيا", "Đông Á", "पूर्व एशिया"],
    "采购总监": ["采购总监", "採購總監", "Head of Procurement", "Director de Compras", "調達本部長", "Directeur des achats", "Einkaufsleiter", "مدير المشتريات", "Trưởng phòng Mua hàng", "खरीद प्रमुख"]
  };
  function idx(lang) { var i = ORDER.indexOf(lang); return i < 0 ? 0 : i; }
  window.__falVal = function (zh, lang) {
    lang = lang || (window.__falGetLang ? window.__falGetLang() : "zh");
    var m = V[zh];
    if (!m) return zh;
    return m[idx(lang)];
  };
  window.FALVALS = V;

  /* 多订阅者刷新钩子（与 app-i18n.js 共用同一数组）：页面可在语言切换时登记
     自己的重渲染回调。放在 head 最早注册，确保 body 中部的页面脚本也能安全登记。 */
  window.__falRefreshCbs = window.__falRefreshCbs || [];
  window.__falOnRefresh = function (fn) { if (typeof fn === "function") window.__falRefreshCbs.push(fn); };
})();

/* ==========================================================================
   决策链角色归槽（② ⑤ 共用，2026-10-19）
   —— 职称是自由文本，必须归到固定四槽才能算「缺谁」。规则只放这一份，
      避免 ②（录入时提示缺口）与 ⑤（深挖时展示缺口）两处正则漂移。
   —— 顺序即优先级：Director / VP / Head of 先判决策者，再判技术、采购。
      例如 "Head of Procurement" → 决策者（他能拍板采购），"Procurement Manager" → 守门人。
   ========================================================================== */
(function () {
  var RULES = [
    /* ⚠️ 2026-10-19 补：原正则只认缩写 "ceo"，匹配不到最常见的全称
       "Chief Executive Officer" → 决策链覆盖永远少一槽。补 chief executive / co-founder。
       顺序即优先级，改动任一条都必须同步 ⑤ 页的兜底副本（ROLE_RULES）。 */
    { r: "决策者", re: /(ceo|chief executive|\bcto\b|\bcoo\b|\bcfo\b|\bcio\b|president|owner|founder|co-founder|managing director|general manager|vice president|\bvp\b|head of|director|geschäftsführer|总经理|总裁|董事长|创始人|合伙人|负责人)/i },
    { r: "影响者", re: /(engineer|technical|technolog|quality|\bqa\b|\bqc\b|r&d|technisch|技术|质量|研发|工程|工艺)/i },
    { r: "守门人", re: /(procurement|purchas|buyer|sourcing|supply chain|admin|assistant|采购|行政|助理|供应链)/i },
    { r: "使用者", re: /(operator|production|install|service|maintenance|sales|使用|操作|生产|安装|售后|销售)/i }
  ];
  window.__falRoleOrder = ["决策者", "影响者", "使用者", "守门人"];
  window.__falRoleOf = function (title) {
    var t = String(title || "");
    for (var i = 0; i < RULES.length; i++) { if (RULES[i].re.test(t)) return RULES[i].r; }
    return null;
  };
})();

/* ==========================================================================
   国旗 / 国家名（② ⑤ 共用，2026-10-21 v61）
   —— 起因（用户 2026-10-21）：「每一个客户的国旗下面最好标上国家名」。
      只有一面旗，非该国的使用者认不出是哪国；旗下面补一行国名才真的可读。
   —— 为什么用 Intl 而不是字典：
      国名是**数据值**不是界面文案，39 个国家 × 10 语言 = 390 条字典，维护必漏；
      `Intl.DisplayNames` 原生给出全部语言的规范国名（含繁體「美國」、阿语「الولايات المتحدة」），
      且随浏览器语言数据自动更新。字典里没有的国名一旦漏翻，英文界面就会残留中文。
   —— 为什么旗帜也在这里算：
      旧版 `CC_FLAG` 只硬写了 16 个国家，而真实名录覆盖 39 国 → 一半企业显示白旗 🏳。
      旗帜 emoji 本身就是「ISO 3166-1 alpha-2 → 两个区域指示符」的确定性映射，
      任何合法两字母码都能算出来，不需要逐国维护。
   ========================================================================== */
(function () {
  /* 非标准但常见的写法 → ISO 码（英国在数据里同时出现 UK / GB） */
  var ALIAS = { UK: "GB", EL: "GR", AN: "NL", XK: "XK" };
  function ccNorm(cc) {
    cc = String(cc || "").trim().toUpperCase();
    if (ALIAS[cc]) cc = ALIAS[cc];
    return /^[A-Z]{2}$/.test(cc) ? cc : "";
  }
  /* ISO 码 → 旗帜 emoji（🏳 表示国家未知，绝不乱猜） */
  window.__falFlagOf = function (cc) {
    var c = ccNorm(cc);
    if (!c) return "🏳";
    return String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65, 0x1F1E6 + c.charCodeAt(1) - 65);
  };
  /* 旗帜 emoji → ISO 码（管线记录只存了 flag，没有 cc；反推回来才能取国名） */
  window.__falCCof = function (flag) {
    var cp = Array.from(String(flag || ""));
    if (cp.length < 2) return "";
    var a = cp[0].codePointAt(0), b = cp[1].codePointAt(0);
    if (a < 0x1F1E6 || a > 0x1F1FF || b < 0x1F1E6 || b > 0x1F1FF) return "";
    return String.fromCharCode(65 + a - 0x1F1E6, 65 + b - 0x1F1E6);
  };
  var L2L = { zh: "zh-CN", "zh-Hant": "zh-TW", en: "en-US", es: "es-ES", ja: "ja-JP",
    fr: "fr-FR", de: "de-DE", ar: "ar-EG", vi: "vi-VN", hi: "hi-IN" };
  /* 兜底国名（仅用于 Intl.DisplayNames 不可用的极老浏览器）；以简体为准，
     其它语言走 Intl，不在这里堆 10 份。 */
  var FALLBACK = { US: "美国", CA: "加拿大", MX: "墨西哥", BR: "巴西", CL: "智利", AR: "阿根廷",
    GB: "英国", IE: "爱尔兰", DE: "德国", AT: "奥地利", CH: "瑞士", FR: "法国", IT: "意大利",
    ES: "西班牙", PT: "葡萄牙", NL: "荷兰", BE: "比利时", LU: "卢森堡", DK: "丹麦", SE: "瑞典",
    NO: "挪威", FI: "芬兰", PL: "波兰", CZ: "捷克", SK: "斯洛伐克", HU: "匈牙利", RO: "罗马尼亚",
    SI: "斯洛文尼亚", GR: "希腊", TR: "土耳其", IL: "以色列", AE: "阿联酋", SA: "沙特阿拉伯",
    ZA: "南非", JP: "日本", KR: "韩国", CN: "中国", HK: "中国香港", TW: "中国台湾", SG: "新加坡",
    TH: "泰国", VN: "越南", MY: "马来西亚", ID: "印度尼西亚", PH: "菲律宾", IN: "印度",
    AU: "澳大利亚", NZ: "新西兰", LI: "列支敦士登", RU: "俄罗斯", UA: "乌克兰" };
  var DN = {};
  function dnOf(loc) {
    if (DN[loc] !== undefined) return DN[loc];
    try { DN[loc] = new Intl.DisplayNames([loc], { type: "region" }); }
    catch (e) { DN[loc] = null; }
    return DN[loc];
  }
  /* 入参可以是 ISO 码、旗帜 emoji 或空；返回当前界面语言下的国名，未知则 "" */
  window.__falCountry = function (ccOrFlag, lang) {
    var cc = ccNorm(ccOrFlag) || window.__falCCof(ccOrFlag);
    if (!cc) return "";
    lang = lang || (window.__falGetLang ? window.__falGetLang() : "zh");
    var dn = dnOf(L2L[lang] || lang);
    if (dn) {
      try {
        var n = dn.of(cc);
        if (n && n !== cc) return n;
      } catch (e) { /* 非法码落到兜底表 */ }
    }
    return FALLBACK[cc] || cc;
  };
})();
