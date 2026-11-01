/* ================= 行业协会名录索引（Association Roster Index）=================
   用途：让「查某国某行业的协会名录」变成**本地零延迟查表**，而不是每次现场去搜、去猜。

   为什么必须预建索引（2026-10-31 实测教训）：
     · 现场自动发现真实可用率仅 3/13 ≈ 23%，且会误判
     · THTMA 的名录**根本不在首页导航里**，现场发现会判「未发现」，但直接路径一次就中
     · ZVEI 的 /mitgliedschaft-anfragen 是「会员咨询」页，会被误当名录 → 灌假数据
   → 结论：**发现只在「扩表」时做一次，查询时一律走本索引。**

   ⚠️ 2026-10-31 第二个教训（比第一个更重要）：
     按「找名录页 → 数页面上有几个电话」的方法，会**严重低估 JS 渲染型名录**。
     VDMA 真实有 3,565 家（含电话/邮箱/网址），但 HTML 里只有 2 个电话 → 被判「信号不足」。
     它的数据在 Liferay portlet API 里（p_p_resource_id=getPage）。
   → 正确做法：**不猜页面结构，去找 API 端点**（scripts/assoc_api_probe.py）。
     协会建站系统就那么几种（Liferay / Next.js / Drupal / WordPress），每种都有固定 API 形态。
     实测 10 个协会站：API 探测命中 1/10，但那 1 个就带来 3,565 家。
   → 反过来说：**「可用率低」不等于「没数据」**，要看是「真没有」还是「没找对入口」。

   字段说明：
     id        唯一键
     cc        国家代码（TW/CN/DE/IT/US…）
     ind       行业关键词（中英混排，供快查匹配；不翻译、原样存）
     famId     对应产品 02 页的族（可为空）
     name      协会名称
     rosterUrl **已验证的名录页 URL**（不是首页）
     adapter   适配器名（对应 scripts/assoc_extract.py 里的函数名；空=尚未实现）
     status    verified 已验证可提取 / candidate 页存在但结构未通 / rejected 假阳性（禁再用）
     measured  实测产出（companies 家数 / withTel 含电话 / seconds 耗时 / at 日期）
     note      结构说明或拒绝原因

   ⚠️ 纪律：
     · 只有 status=verified 且 measured.companies>0 的，才允许对外声称「可提取 N 家」
     · rejected 条目保留在表内是**故意的**——防止以后重复踩坑
     · 本文件是索引，不含任何企业数据；企业数据在 data-assoc-members.js，每条带 src 可复核
============================================================================ */

window.FAL_ASSOC = [
  /* ---------------- 已验证可提取 ---------------- */
  {
    id: "tw-thtma",
    cc: "TW", country: "台湾",
    ind: ["手工具", "五金", "hardware", "hand tools", "工具", "扳手", "套筒", "气动工具"],
    famId: "hardware",
    name: "台湾手工具工业同业公会 THTMA",
    rosterUrl: "https://www.taiwanhandtools.com.tw/html/company.php",
    adapter: "thtma",
    status: "verified",
    measured: { companies: 181, withTel: 181, withWeb: 164, seconds: 14.1, at: "2026-10-31" },
    note: "按 Cat=XX 两字母产品分类切分（无分页），需 BFS 遍历分类；字段：名称/地址/电话/产品类别/网址/详情页。一页即全字段，是最理想形态。"
  },

  /* ---------------- 名录页存在，但结构未通（需写适配器） ---------------- */
  {
    id: "de-vdma",
    cc: "DE", country: "德国",
    ind: ["机械", "机械设备", "machinery", "machine tools", "装备制造", "工业设备"],
    famId: "machinery",
    name: "德国机械设备制造业联合会 VDMA",
    rosterUrl: "https://www.vdma.eu/de/mitglieder",
    adapter: "vdma",
    status: "verified",
    measured: { companies: 3565, withTel: 3531, withEmail: 3003, withWeb: 3503, seconds: 879.8, at: "2026-10-31" },
    note: "**单会 3,565 家，是目前最大的数据源（THTMA 的 20 倍）。** 关键：首页只有 2 个电话（JS 渲染），数据在 Liferay portlet API：p_p_resource_id=getPage 返回 {publicUserList:\"<json>\"}；分页 _<portlet>_page 是 1-based，delta 无效固定 10 条/页 → 必须翻 357 页。字段 companyName/address/plz/city/country/phoneNum/email/webAddr 全结构化。已按 L3 铁律剔除德国手机号(+49 15x/16x/17x)与非职能邮箱。"
  },
  {
    id: "us-nlbmda",
    cc: "US", country: "美国",
    ind: ["建材", "木材", "building materials", "lumber", "经销商", "dealer"],
    famId: "building",
    name: "美国木材建材经销商协会 NLBMDA",
    rosterUrl: "https://www.dealer.org/manufacturers-services-directory",
    adapter: "",
    status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "页面可达且电话密度达标（13 条），但该页是**制造商/服务商（准会员）目录**，不是经销商名录。用途需人工确认后再定归属。"
  },
  {
    id: "it-federlegno",
    cc: "IT", country: "意大利",
    ind: ["家具", "furniture", "木业", "木制品", "家居"],
    famId: "furniture",
    name: "意大利木业家具联合会 FederlegnoArredo",
    rosterUrl: "https://www.federlegnoarredo.it/associati-federlegnoarredo",
    adapter: "",
    status: "rejected",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "拒绝原因（2026-10-31 实测）：Next.js 站点，__NEXT_DATA__ 里只有 news(48)/events(9)/contacts(4)，**没有任何会员企业列表**；下属 17 个协会页（/associazioni/assarredo 等）同样只有协会自己的 4 个联系人。它是伞形组织，会员名录不公开。可留作候选池（17 协会 + 31 联合会路径），但不产企业数据。"
  },
  {
    id: "tw-tmba",
    cc: "TW", country: "台湾",
    ind: ["工具机", "机床", "machine tools", "零组件", "机械"],
    famId: "machinery",
    name: "台湾工具机暨零组件工业同业公会 TMBA",
    rosterUrl: "https://www.tmba.org.tw/zh-TW/member-search",
    adapter: "",
    status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "存在 member-search 页，但首轮抓取电话 1 条、邮箱 11 条 → 疑为 JS 渲染或需查询条件。需浏览器通道确认。"
  },
  {
    id: "tw-eesma",
    cc: "TW", country: "台湾",
    ind: ["电子电机", "electronics", "电机", "电子零组件"],
    famId: "electronics",
    name: "台湾科技产业园区电机电子工业同业公会 EESMA",
    rosterUrl: "https://www.eesma.org.tw/廠商資料查詢",
    adapter: "",
    status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "有明确的「廠商資料查詢」入口（非招募页，已排除误判），但首轮抓取 0 信号 → 疑为 JS 渲染，需浏览器通道。"
  },
  {
    id: "tw-tba",
    cc: "TW", country: "台湾",
    ind: ["自行车", "bicycle", "单车", "零配件", "cycling"],
    famId: "sports",
    name: "台湾自行车输出业同业公会 TBA",
    rosterUrl: "https://www.tba-cycling.org/",
    adapter: "",
    status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "官网可达，但会员资料疑在「會員專區」需登录 → 可能无法公开提取。需人工确认是否有公开名录。"
  },
  {
    id: "us-ahfa",
    cc: "US", country: "美国",
    ind: ["家居", "家具", "home furnishings", "furniture"],
    famId: "furniture",
    name: "美国家居家具联盟 AHFA",
    rosterUrl: "https://www.ahfa.us/",
    adapter: "",
    status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "仅见会员权益/入会页，未见公开会员名录。暂列 candidate，优先度低。"
  },

  /* ---------------- 假阳性：永久拒绝（保留以防重复踩坑） ---------------- */
  {
    id: "de-zvei",
    cc: "DE", country: "德国",
    ind: ["电气", "电子", "electrical", "electronics"],
    famId: "electronics",
    name: "德国电气电子行业协会 ZVEI",
    rosterUrl: "",
    adapter: "",
    status: "rejected",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "拒绝原因：自动发现命中的 /verband/mitgliedschaft/mitgliedschaft-anfragen 是「会员咨询/申请」页，不是会员名录。若误采会产出整批假数据。"
  },
  {
    id: "tw-teema",
    cc: "TW", country: "台湾",
    ind: ["电子电机", "electronics", "电机电子"],
    famId: "electronics",
    name: "台湾区电机电子工业同业公会 TEEMA",
    rosterUrl: "",
    adapter: "",
    status: "rejected",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "拒绝原因：命中的 /joinus/memberservice.html 是入会服务页。该会官方称会员 4,000 余家，但名录未见公开入口（可能在会员专区）。"
  },
  {
    id: "it-anima",
    cc: "IT", country: "意大利",
    ind: ["机械", "machinery", "自动化"],
    famId: "machinery",
    name: "意大利机械工业联合会 ANIMA",
    rosterUrl: "",
    adapter: "",
    status: "rejected",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "拒绝原因：首页不可达（首轮 status=0），无法验证。非假阳性而是不可用，标记为 rejected 以免重复尝试。"
  },

  /* ================= 全球商会 / 协会（2026-10-31 全球 28 站实测）=================
     实测结论（必须记住）：全球自动发现可用率仅 3/28 = 11%，低于台湾的 23%。
     原因：商会（Chamber，地域性）与行业协会（Association，行业性）是两种组织——
       · 行业协会：名录公开率高（公开名录就是它给会员的价值）
       · 商会：名录多属会员权益，普遍不公开，首页只有「加入会员」
     → 全球扩张应**优先行业协会**，商会只作发现候选池，不作数据源。 */

  /* ---------- 伞形组织：只用于「发现候选」，不产企业数据 ---------- */
  {
    id: "global-icc-wcf", cc: "GLOBAL", country: "全球",
    ind: ["商会联盟", "chamber network", "世界商会"],
    famId: "",
    name: "ICC 世界商会联盟 WCF",
    rosterUrl: "", adapter: "", status: "rejected",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "拒绝作数据源：官方称覆盖 100+ 国家、3,000+ 商会，但页面只有入会/会员权益，无企业名录。**价值在「候选清单」而非数据**。"
  },
  {
    id: "eu-eurochambres", cc: "EU", country: "欧洲",
    ind: ["商会联盟", "chamber network", "欧洲商会"],
    famId: "",
    name: "Eurochambres 欧洲商会联盟",
    rosterUrl: "", adapter: "", status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "代表约 2,000 万家企业，但未见公开会员名录。可尝试从其成员列表拿到各国商会入口，再逐国测。"
  },

  /* ---------- 各国商会：多为会员权益，名录不公开 ---------- */
  {
    id: "jp-jcci", cc: "JP", country: "日本",
    ind: ["商会", "chamber of commerce", "商工会议所", "中小企业"],
    famId: "",
    name: "JCCI 日本商工会议所（下辖 515 地方所）",
    rosterUrl: "https://www.jcci.or.jp/", adapter: "", status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "下辖 515 个地方商工会议所、会员约 138 万（第三方资料，未逐条核实）。全国站无名录；**地方所（如东京商工会议所）可能各自公开名簿**，需逐个测。"
  },
  {
    id: "de-dihk", cc: "DE", country: "德国",
    ind: ["商会", "IHK", "chamber of commerce", "工商大会"],
    famId: "",
    name: "DIHK 德国工商大会（下辖 79 个 IHK）",
    rosterUrl: "https://www.dihk.de/", adapter: "", status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "全国站信号弱（电话 2 / 邮箱 10）。德国 IHK 是公法团体，会员强制入会，**部分 IHK 公开会员目录**，需逐所测（79 个）。"
  },
  {
    id: "ca-chamber", cc: "CA", country: "加拿大",
    ind: ["商会", "chamber of commerce"],
    famId: "",
    name: "Canadian Chamber 加拿大商会",
    rosterUrl: "https://www.chamber.ca/", adapter: "", status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "首轮抓到邮箱 57 条（全场最高），电话仅 1 条 → **疑似「企业名录索引」而非联系页**，值得优先写二级抓取适配器。"
  },
  {
    id: "ae-dubai", cc: "AE", country: "阿联酋",
    ind: ["商会", "chamber of commerce", "迪拜", "中东"],
    famId: "",
    name: "Dubai Chamber 迪拜商会",
    rosterUrl: "https://www.dubaichamber.com/", adapter: "", status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "抓到电话 6 条，但该会会员达数十万级，页面应为查询入口而非全量名录。需确认是否有公开可枚举的目录。"
  },
  {
    id: "it-unioncamere", cc: "IT", country: "意大利",
    ind: ["商会", "camera di commercio", "chamber of commerce"],
    famId: "",
    name: "Unioncamere 意大利商会联盟",
    rosterUrl: "https://www.unioncamere.gov.it/", adapter: "", status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "信号弱（电话 2 / 邮箱 2）。意大利企业注册数据主要在 Registro Imprese（部分收费），商会名录公开度有限。"
  },
  {
    id: "in-ficci", cc: "IN", country: "印度",
    ind: ["商会", "industry federation", "印度"],
    famId: "",
    name: "FICCI 印度工业联合会",
    rosterUrl: "https://www.ficci.in/", adapter: "", status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "信号弱（电话 3 / 邮箱 2），需确认是否有公开会员目录。"
  },
  {
    id: "th-thaichamber", cc: "TH", country: "泰国",
    ind: ["商会", "chamber of commerce", "泰国"],
    famId: "",
    name: "Thai Chamber 泰国总商会",
    rosterUrl: "https://www.thaichamber.org/", adapter: "", status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "信号弱（电话 4 / 邮箱 1），需人工确认。"
  },
  {
    id: "es-camara", cc: "ES", country: "西班牙",
    ind: ["商会", "cámara de comercio", "chamber of commerce"],
    famId: "",
    name: "Cámara de España 西班牙商会",
    rosterUrl: "https://www.camara.es/", adapter: "", status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "信号弱（电话 1 / 邮箱 1）。"
  },

  /* ---------- 全球：确认为假阳性（招募页） ---------- */
  {
    id: "uk-bcc", cc: "UK", country: "英国",
    ind: ["商会", "chamber of commerce"],
    famId: "",
    name: "British Chambers 英国商会联盟",
    rosterUrl: "", adapter: "", status: "rejected",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "拒绝原因：命中的是 /join-the-chamber-network/member-benefits/（入会权益页）。"
  },
  {
    id: "za-sacci", cc: "ZA", country: "南非",
    ind: ["商会", "chamber of commerce"],
    famId: "",
    name: "SACCI 南非工商会",
    rosterUrl: "", adapter: "", status: "rejected",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "拒绝原因：命中的是 /membership/（入会页）。"
  },
  {
    id: "au-acci", cc: "AU", country: "澳大利亚",
    ind: ["商会", "chamber of commerce"],
    famId: "",
    name: "ACCI 澳大利亚工商会",
    rosterUrl: "", adapter: "", status: "rejected",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "拒绝原因：命中的是 /Membership/Membership.aspx（入会页）。"
  },

  /* ---------- 全球：首页不可达，暂列拒绝以免重复尝试 ---------- */
  {
    id: "kr-kcci", cc: "KR", country: "韩国",
    ind: ["商会", "chamber of commerce", "韩国"],
    famId: "",
    name: "KCCI 大韩商工会议所",
    rosterUrl: "", adapter: "", status: "rejected",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "拒绝原因：首页不可达（status=0），无法验证。可能是域名变更或本机网络限制，需人工复核后再决定是否恢复。"
  },
  {
    id: "in-cii", cc: "IN", country: "印度",
    ind: ["商会", "industry confederation"],
    famId: "",
    name: "CII 印度工业联合会",
    rosterUrl: "", adapter: "", status: "rejected",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "拒绝原因：首页不可达（status=0）。同上，需人工复核。"
  },
  {
    id: "fr-cci", cc: "FR", country: "法国",
    ind: ["商会", "chambre de commerce"],
    famId: "",
    name: "CCI France 法国工商会",
    rosterUrl: "", adapter: "", status: "rejected",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "拒绝原因：首页不可达（status=0）。同上，需人工复核。"
  },

  /* ---------- 全球：未发现名录入口（需换入口或走地方分会） ---------- */
  {
    id: "tr-tobb", cc: "TR", country: "土耳其",
    ind: ["商会联盟", "chamber network", "土耳其"],
    famId: "",
    name: "TOBB 土耳其商会联盟（下辖 365 商会）",
    rosterUrl: "", adapter: "", status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "全国站无名录入口。但下辖 365 个商会，**应逐个测地方商会**；土耳其商会名录公开度可能较高，优先度中上。"
  },
  {
    id: "vn-vcci", cc: "VN", country: "越南",
    ind: ["商会", "chamber of commerce", "越南"],
    famId: "",
    name: "VCCI 越南工商会",
    rosterUrl: "", adapter: "", status: "candidate",
    measured: { companies: 0, withTel: 0, withWeb: 0, seconds: 0, at: "2026-10-31" },
    note: "未发现名录入口。越南是中国产业转移重点地区，值得人工深挖。"
  },

  /* ================= 2026-11-01 全球扩源实测（新增已验证源）================= */
  {
    id: "cn-cnita", cc: "CN", country: "中国",
    ind: ["产业用纺织品", "非织造", "nonwoven", "technical textiles", "土工布", "纺织", "textile"],
    famId: "textile",
    name: "中国产业用纺织品行业协会 CNITA",
    rosterUrl: "https://www.cnita.org.cn/english/Membership/OurMembers",
    adapter: "cnita",
    status: "verified",
    measured: { companies: 29, withTel: 0, withEmail: 0, withWeb: 0, seconds: 0, at: "2026-11-01" },
    note: "2026-11-01 实测：英文站 OurMembers 页每会员一个 <table>，一行 [公司名, 入会日期]，共 29 家。**页面仅公司名+日期，无公开电话/邮箱/网址** → 联系方式诚实留空，绝不编。"
  }
];

/* ---------------- 快查：本地零延迟，不联网 ----------------
   匹配规则：行业词（中英，包含匹配）+ 国家（代码/中文名，可选）
   排序：verified 优先 → measured.companies 降序 → candidate → rejected 置底
   返回：数组，每项含 match 字段说明命中原因，便于前端展示「为什么推荐这个」。 */
window.FAL_ASSOC_FIND = function (kw, cc) {
  kw = String(kw || "").toLowerCase().trim();
  cc = String(cc || "").toUpperCase().trim();
  var rank = { verified: 0, candidate: 1, rejected: 2 };
  var out = [];
  (window.FAL_ASSOC || []).forEach(function (a) {
    if (cc && a.cc !== cc && a.country !== cc) return;
    var hits = [];
    (a.ind || []).forEach(function (t) {
      if (kw && String(t).toLowerCase().indexOf(kw) >= 0) hits.push(t);
    });
    if (kw && a.name && a.name.toLowerCase().indexOf(kw) >= 0) hits.push("名称");
    if (kw && !hits.length) return;
    out.push({
      id: a.id, name: a.name, cc: a.cc, country: a.country,
      status: a.status, adapter: a.adapter, rosterUrl: a.rosterUrl,
      companies: (a.measured && a.measured.companies) || 0,
      match: hits.length ? hits.join("/") : "全部"
    });
  });
  out.sort(function (x, y) {
    var d = (rank[x.status] || 9) - (rank[y.status] || 9);
    if (d) return d;
    return y.companies - x.companies;
  });
  return out;
};

/* ---------------- 汇总（给 UI 直接显示，避免各页各算一套） ---------------- */
window.FAL_ASSOC_META = (function () {
  var A = window.FAL_ASSOC || [];
  var v = A.filter(function (a) { return a.status === "verified"; });
  return {
    total: A.length,
    verified: v.length,
    candidate: A.filter(function (a) { return a.status === "candidate"; }).length,
    rejected: A.filter(function (a) { return a.status === "rejected"; }).length,
    countries: Array.from(new Set(A.map(function (a) { return a.cc; }))).sort(),
    verifiedCompanies: v.reduce(function (s, a) { return s + ((a.measured && a.measured.companies) || 0); }, 0),
    at: "2026-10-31"
  };
})();
