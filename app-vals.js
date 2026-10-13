/* FALCORA 获客通AI — 演示数据值多语言字典
   行业 / 地区 / 角色等「数据值」按当前 UI 语言本地化（对照 FAL_DICT 的 UI 文案，
   这里是业务数据，独立于界面文案）。在 <head> 引入，保证页面内联脚本解析前即可用。
   9 语言顺序：zh / en / es / ja / fr / de / ar / vi / hi
   window.__falVal(zh, lang?) 返回本地化值；lang 省略时取 UI 语言。
*/
(function () {
  var ORDER = ["zh", "en", "es", "ja", "fr", "de", "ar", "vi", "hi"];
  var V = {
    "工业设备": ["工业设备", "Industrial Equipment", "Equipo industrial", "産業機器", "Équipement industriel", "Industrieausrüstung", "المعدات الصناعية", "Thiết bị công nghiệp", "औद्योगिक उपकरण"],
    "新能源": ["新能源", "New Energy", "Energía nueva", "新エネルギー", "Nouvelle énergie", "Neue Energie", "الطاقة الجديدة", "Năng lượng mới", "नई ऊर्जा"],
    "电子制造": ["电子制造", "Electronics Manufacturing", "Fabricación electrónica", "電子製造", "Fabrication électronique", "Elektronikfertigung", "التصنيع الإلكتروني", "Sản xuất điện tử", "इलेक्ट्रॉनिक्स निर्माण"],
    "医疗器械": ["医疗器械", "Medical Devices", "Dispositivos médicos", "医療機器", "Dispositifs médicaux", "Medizinprodukte", "الأجهزة الطبية", "Thiết bị y tế", "चिकित्सा उपकरण"],
    "建材": ["建材", "Building Materials", "Materiales de construcción", "建材", "Matériaux de construction", "Baumaterialien", "مواد البناء", "Vật liệu xây dựng", "निर्माण सामग्री"],
    "化工": ["化工", "Chemicals", "Productos químicos", "化学品", "Produits chimiques", "Chemikalien", "الكيماويات", "Hóa chất", "रसायन"],
    "汽车零部件": ["汽车零部件", "Auto Parts", "Autopartes", "自動車部品", "Pièces automobiles", "Autoteile", "قطع غيار السيارات", "Linh kiện ô tô", "ऑटो पार्ट्स"],
    "包装": ["包装", "Packaging", "Embalaje", "包装", "Emballage", "Verpackung", "التغليف", "Bao bì", "पैकेजिंग"],
    "机械设备": ["机械设备", "Machinery & Equipment", "Maquinaria", "機械設備", "Machines et équipements", "Maschinen und Anlagen", "الآلات والمعدات", "Máy móc và thiết bị", "मशीनरी और उपकरण"],
    "五金工具": ["五金工具", "Hardware & Tools", "Ferretería", "金物・工具", "Quincaillerie", "Eisenwaren und Werkzeuge", "الأدوات والعدد", "Phụ tùng và dụng cụ", "हार्डवेयर और औजार"],
    "纺织服装": ["纺织服装", "Textiles & Apparel", "Textiles y confección", "繊維・アパレル", "Textile et habillement", "Textil und Bekleidung", "المنسوجات والملابس", "Dệt may và may mặc", "वस्त्र और परिधान"],
    "消费电子": ["消费电子", "Consumer Electronics", "Electrónica de consumo", "消費者電子機器", "Électronique grand public", "Unterhaltungselektronik", "الإلكترونيات الاستهلاكية", "Điện tử tiêu dùng", "उपभोक्ता इलेक्ट्रॉनिक्स"],
    "家居日用": ["家居日用", "Home & Household", "Hogar y artículos diarios", "ホーム・日用品", "Maison et articles courants", "Haushalt und Alltag", "الأدوات المنزلية", "Đồ gia dụng", "घरेलू सामान"],
    "美妆个护": ["美妆个护", "Beauty & Personal Care", "Belleza y cuidado personal", "ビューティー・パーソナルケア", "Beauté et soins personnels", "Schönheit und Körperpflege", "التجميل والعناية الشخصية", "Mỹ phẩm và chăm sóc cá nhân", "सौंदर्य और व्यक्तिगत देखभाल"],
    "食品饮料": ["食品饮料", "Food & Beverage", "Alimentación y bebidas", "食品・飲料", "Alimentation et boissons", "Lebensmittel und Getränke", "الأغذية والمشروبات", "Thực phẩm và đồ uống", "खाद्य और पेय"],
    "玩具婴童": ["玩具婴童", "Toys & Baby", "Juguetes y bebés", "おもちゃ・ベビー", "Jouets et puériculture", "Spielzeug und Baby", "ألعاب والأطفال", "Đồ chơi và em bé", "खिलौने और शिशु"],
    "运动户外": ["运动户外", "Sports & Outdoor", "Deportes y aire libre", "スポーツ・アウトドア", "Sports et plein air", "Sport und Outdoor", "الرياضة والأنشطة الخارجية", "Thể thao và ngoài trời", "खेल और आउटडोर"],
    "AI/大数据": ["AI/大数据", "AI / Big Data", "IA / Big Data", "AI／ビッグデータ", "IA / Big Data", "KI / Big Data", "الذكاء الاصطناعي / البيانات الضخمة", "AI / Dữ liệu lớn", "AI / बिग डेटा"],
    "工业软件": ["工业软件", "Industrial Software", "Software industrial", "産業ソフトウェア", "Logiciel industriel", "Industriesoftware", "البرمجيات الصناعية", "Phần mềm công nghiệp", "औद्योगिक सॉफ्टवेयर"],
    "嵌入式系统": ["嵌入式系统", "Embedded Systems", "Sistemas embebidos", "組み込みシステム", "Systèmes embarqués", "Eingebettete Systeme", "الأنظمة المدمجة", "Hệ thống nhúng", "एम्बेडेड सिस्टम"],
    "游戏": ["游戏", "Games", "Juegos", "ゲーム", "Jeux", "Spiele", "الألعاب", "Trò chơi", "गेम्स"],
    "检测认证": ["检测认证", "Testing & Certification", "Ensayo y certificación", "検査・認証", "Essais et certification", "Prüfung und Zertifizierung", "الاختبار والاعتماد", "Kiểm định và chứng nhận", "परीक्षण और प्रमाणन"],
    "物流仓储": ["物流仓储", "Logistics & Warehousing", "Logística y almacenamiento", "物流・倉庫", "Logistique et entrepôt", "Logistik und Lagerung", "الخدمات اللوجستية والتخزين", "Hậu cần và kho bãi", "रसद और गोदाम"],
    "营销咨询": ["营销咨询", "Marketing Consulting", "Consultoría de marketing", "マーケティングコンサル", "Conseil en marketing", "Marketingberatung", "استشارات التسويق", "Tư vấn tiếp thị", "मार्केटिंग परामर्श"],
    "金融服务": ["金融服务", "Financial Services", "Servicios financieros", "金融サービス", "Services financiers", "Finanzdienstleistungen", "الخدمات المالية", "Dịch vụ tài chính", "वित्तीय सेवाएं"],
    "法律合规": ["法律合规", "Legal & Compliance", "Legal y cumplimiento", "法務・コンプライアンス", "Juridique et conformité", "Recht und Compliance", "القانونية والامتثال", "Pháp lý và tuân thủ", "कानूनी और अनुपालन"],
    "光伏": ["光伏", "Photovoltaics", "Fotovoltaica", "光伏", "Photovoltaïque", "Photovoltaik", "الطاقة الشمسية الكهروضوئية", "Quang điện", "सौर ऊर्जा"],
    "储能": ["储能", "Energy Storage", "Almacenamiento de energía", "蓄電", "Stockage d'énergie", "Energiespeicherung", "تخزين الطاقة", "Lưu trữ năng lượng", "ऊर्जा भंडारण"],
    "新材料": ["新材料", "New Materials", "Nuevos materiales", "新素材", "Nouveaux matériaux", "Neue Materialien", "المواد الجديدة", "Vật liệu mới", "नई सामग्री"],
    "石油化工": ["石油化工", "Petrochemicals", "Petroquímica", "石油化学", "Pétrochimie", "Petrochemie", "البتروكيماويات", "Hóa dầu", "पेट्रोकेमिकल्स"],
    "制药": ["制药", "Pharmaceuticals", "Farmacéuticos", "製薬", "Produits pharmaceutiques", "Pharmazeutika", "الأدوية", "Dược phẩm", "दवा"],
    "诊断试剂": ["诊断试剂", "Diagnostic Reagents", "Reactivos de diagnóstico", "診断試薬", "Réactifs de diagnostic", "Diagnostika", "كواشف التشخيص", "Thuốc chẩn đoán", "नैदानिक रसायन"],
    "医疗服务": ["医疗服务", "Medical Services", "Servicios médicos", "医療サービス", "Services médicaux", "Medizinische Dienstleistungen", "الخدمات الطبية", "Dịch vụ y tế", "चिकित्सा सेवाएं"],
    "制造业": ["制造业", "Manufacturing", "Manufactura", "製造業", "Fabrication", "Fertigung", "التصنيع", "Sản xuất", "विनिर्माण"],
    "消费品": ["消费品", "Consumer Goods", "Bienes de consumo", "消費財", "Biens de consommation", "Konsumgüter", "السلع الاستهلاكية", "Hàng tiêu dùng", "उपभोक्ता वस्तुएं"],
    "科技/软件": ["科技/软件", "Tech / Software", "Tecnología / Software", "テクノロジー／ソフトウェア", "Technologie / Logiciel", "Technik / Software", "التقنية / البرمجيات", "Công nghệ / Phần mềm", "तकनीक / सॉफ्टवेयर"],
    "专业服务": ["专业服务", "Professional Services", "Servicios profesionales", "プロフェッショナルサービス", "Services professionnels", "Professionelle Dienstleistungen", "الخدمات المهنية", "Dịch vụ chuyên nghiệp", "पेशेवर सेवाएं"],
    "能源/材料": ["能源/材料", "Energy / Materials", "Energía / Materiales", "エネルギー／素材", "Énergie / Matériaux", "Energie / Materialien", "الطاقة / المواد", "Năng lượng / Vật liệu", "ऊर्जा / सामग्री"],
    "医疗健康": ["医疗健康", "Healthcare", "Salud", "ヘルスケア", "Santé", "Gesundheitswesen", "الرعاية الصحية", "Chăm sóc sức khỏe", "स्वास्थ्य सेवा"],
    "北美": ["北美", "North America", "Norteamérica", "北米", "Amérique du Nord", "Nordamerika", "أمريكا الشمالية", "Bắc Mỹ", "उत्तर अमेरिका"],
    "欧盟": ["欧盟", "European Union", "Unión Europea", "欧州連合", "Union européenne", "Europäische Union", "الاتحاد الأوروبي", "Liên minh Châu Âu", "यूरोपीय संघ"],
    "中东": ["中东", "Middle East", "Oriente Medio", "中東", "Moyen-Orient", "Naher Osten", "الشرق الأوسط", "Trung Đông", "मध्य पूर्व"],
    "东南亚": ["东南亚", "Southeast Asia", "Sudeste Asiático", "東南アジア", "Asie du Sud-Est", "Südostasien", "جنوب شرق آسيا", "Đông Nam Á", "दक्षिण पूर्व एशिया"],
    "拉美": ["拉美", "Latin America", "América Latina", "ラテンアメリカ", "Amérique latine", "Lateinamerika", "أمريكا اللاتينية", "Mỹ Latinh", "लातिनी अमेरिका"],
    "非洲": ["非洲", "Africa", "África", "アフリカ", "Afrique", "Afrika", "أفريقيا", "Châu Phi", "अफ्रीका"],
    "东亚": ["东亚", "East Asia", "Asia Oriental", "東アジア", "Asie de l'Est", "Ostasien", "شرق آسيا", "Đông Á", "पूर्व एशिया"],
    "采购总监": ["采购总监", "Head of Procurement", "Director de Compras", "調達本部長", "Directeur des achats", "Einkaufsleiter", "مدير المشتريات", "Trưởng phòng Mua hàng", "खरीद प्रमुख"]
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
