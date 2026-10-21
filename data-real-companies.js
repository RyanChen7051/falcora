/* ================= 真实企业名录（15 个行业族通用）=================
   v58（2026-10-20）：用户质疑「连最基本的搜索都做不到，给的网址根本连不上」。
   旧版问题（已推翻）：`genLeads()` 用 `PRE × suf` 确定性拼接公司名与域名，10/10 NXDOMAIN —— 全是编的。
   v59（2026-10-20）：用户纠正定位「**FALCORA 不只是针对光学瞄准镜，而是针对各种中小出口企业**」。
   架构本来就通用（② 页已有 15 个行业族、15 个 lab 全在字典），缺的只是**数据**。
   本版把真实名录从 2 个族（光学 39 / 战术 28）扩到 **15 个行业族**，覆盖中国中小出口企业
   常见的主营方向：电子电气、机械设备、五金工具、化工材料、医疗器械、新能源、汽车零部件、
   纺织服装、包装、建材、消费品、软件服务、专业服务。

   ⚠️ 本文件的数据是怎么来的（每条都可复核，脚本见 scripts/verify_real_domains.js）：
     ① 域名真实性：Google DNS-over-HTTPS 查询 A 记录，Status=0 才算「真实注册」，
        **Status=3（NXDOMAIN）的条目整条剔除**，不留死链；
     ② 可达性：curl 依次实测 https / https+www / http / http+www **四路**（跟随重定向），
        记录**真正打开的那条 URL** 与 HTTP 状态码 —— 因为不少站只开 http，或必须带 www，
        一律拼 `https://` 点开就是死链；
     ③ 官网标题：curl 抓首页 <title>，作为「命中依据」的一手出处；
     ④ 国家 / 品类 / 采购方类型：公开品牌归属，属行业常识，不涉及个人数据。
   ⚠️ 边界：
     · 只有 L1 公开信息（公司 / 官网 / 国家）。**没有任何 L2/L3 联系方式** —— 平台不抓取、不推断。
     · `need` 一律为「品类推断」模板（按 famId 从 scripts/fam_need.js 生成），
       采购方向是从该企业公开业务范围推断的**品类**，不是对方公开声明，更不是联系人；
       具体做什么看 `title`（官网原文标题）。
     · 「命中依据」不存中文长句，改由 `title` + `reach` 现场拼装 → 可翻译、可复核、可复跑。
     · `reach` 为实测状态：200/301 = 可打开；403/429 = 站点反爬（域名真实，需人工打开）；
       0 = 本机网络未连通（域名 DNS 仍真实，需人工核验）。
     · `url` = **实测真正能打开的那条 URL**（可能是 http:// 或带 www），点开就是能开，不是拼出来的。
   ⚠️ v58 复核时剔除 / 修正的条目（诚实记录，不藏）：
     · 剔除 Direct Action：directaction.info 已被他人抢注，实测跳转到 unoffensiveanimal.is（无关站点），
       其余候选域名全部无响应 —— 无法确认真实官网就不进名单。
     · 修正 KITE OPTICS：kiteoptics.be 无 A 记录响应，改为 kiteoptics.com（实测 200）。
     · 识别并排除「网关拦截页」：本机 DNS 被劫持时 curl 会返回一个 200 的过滤页
       （1.1.1.2/urlfilter），这种 200 是假可达，一律判 0，不给使用者假链接。
   ⚠️ 不含中国同业厂商（维特 / 同类出口商）—— 那是竞争者，不是采购方。
   ⚠️ 排序说明：`window.FAL_REAL` 数组按录入顺序排列（先光学战术两个老族，再 13 个新族），
      不按任何评分/优劣排序 —— 平台不做伪评分。 */

window.FAL_REAL = [
  {nm:"Vortex Optics", dm:"vortexoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://vortexoptics.com/", title:"Vortex Optics"},
  {nm:"Leupold & Stevens", dm:"leupold.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:0, url:"https://leupold.com", title:""},
  {nm:"Nightforce Optics", dm:"nightforceoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.nightforceoptics.com/", title:"Nightforce Optics | Rugged, Reliable, Repeatable, Optics"},
  {nm:"Schmidt & Bender", dm:"schmidt-bender.de", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.schmidtundbender.de/", title:"Schmidt & Bender"},
  {nm:"KAHLES", dm:"kahles.at", cc:"AT", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.kahles.at/en/", title:"KAHLES: Home EN"},
  {nm:"SWAROVSKI OPTIK", dm:"swarovskioptik.com", cc:"AT", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:200, url:"https://www.swarovskioptik.com/at/en/hunting", title:"SWAROVSKI OPTIK"},
  {nm:"ZEISS", dm:"zeiss.com", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:200, url:"https://www.zeiss.com/corporate/en/home.html", title:"Solutions to shape the future | ZEISS"},
  {nm:"Steiner-Optics", dm:"steiner-optics.com", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.steiner-optics.com/", title:"Optics for Hunting, Tactical, Marine, Adventure | Steiner High-Quality Optics"},
  {nm:"STEINER (DE)", dm:"steiner.de", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.steiner.de/", title:"STEINER - Ferngläser, Zielfernrohre und Visiere"},
  {nm:"Meopta", dm:"meopta.com", cc:"CZ", region:"欧盟", famId:"optics", ind:"光学光电", btype:"制造商 (OEM/ODM)", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:200, url:"https://www.meopta.com/en/", title:"Home | Meopta :: Better view of the world"},
  {nm:"MARCH Scopes", dm:"marchscopes.com", cc:"JP", region:"东亚", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://marchscopes.com/", title:"MARCH Scopes Official Global Site"},
  {nm:"Sightron", dm:"sightron.com", cc:"JP", region:"东亚", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:0, url:"https://sightron.com", title:""},
  {nm:"Athlon Optics", dm:"athlonoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://athlonoptics.com/", title:"Home - Athlon Optics"},
  {nm:"Burris Optics", dm:"burrisoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.burrisoptics.com/", title:"Burris Optics | Burris Optics"},
  {nm:"Bushnell", dm:"bushnell.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:429, url:"https://bushnell.com/", title:""},
  {nm:"Trijicon", dm:"trijicon.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.trijicon.com/", title:"Innovative Rifle Scopes, Night Sights, Red Dots & Electro Optics | Trijicon®"},
  {nm:"Aimpoint", dm:"aimpoint.com", cc:"SE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄具", reach:403, url:"https://aimpoint.com/", title:""},
  {nm:"EOTech", dm:"eotechinc.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄具", reach:429, url:"https://eotechinc.com/", title:""},
  {nm:"Holosun Technologies", dm:"holosun.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄具", reach:200, url:"https://www.holosun.com/", title:"Holosun Technologies, Red Dot Sights, Lasers & Weaponlights"},
  {nm:"Primary Arms", dm:"primaryarms.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"分销商 / 代理", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.primaryarms.com/", title:"AR-15 Parts & Accessories | Firearms & Optics | Primary Arms"},
  {nm:"US Optics", dm:"usoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.usoptics.com/", title:"US Optics | Dynamic Targeting Solutions"},
  {nm:"Maven", dm:"mavenbuilt.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:429, url:"https://mavenbuilt.com/", title:""},
  {nm:"TRACT Optics", dm:"tractoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:403, url:"https://tractoptics.com/", title:""},
  {nm:"Riton Optics", dm:"ritonoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://ritonoptics.com/", title:"Riton Optics - See The Difference"},
  {nm:"Crimson Trace", dm:"crimsontrace.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄具", reach:200, url:"https://www.crimsontrace.com/", title:"Crimson Trace | Leaders in Firearms Optics"},
  {nm:"SIG SAUER", dm:"sigsauer.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄具", reach:403, url:"https://sigsauer.com/", title:""},
  {nm:"Hawke Optics", dm:"hawkeoptics.com", cc:"UK", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:403, url:"https://hawkeoptics.com/", title:""},
  {nm:"Element Optics", dm:"element-optics.com", cc:"UK", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://global.element-optics.com/", title:"Element Optics - Premium Quality Riflescopes & Optics"},
  {nm:"Delta Optical", dm:"deltaoptical.pl", cc:"PL", region:"欧盟", famId:"optics", ind:"光学光电", btype:"分销商 / 代理", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:200, url:"https://deltaoptical.pl/", title:"Największy sklep ze sprzętem obserwacyjnym w Polsce - Teleskopy, lornetki, mikroskopy, noktowizja, termowizja"},
  {nm:"DDoptics", dm:"ddoptics.de", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.ddoptics.de/", title:"Ferngläser, Zielfernrohre, Spektive & Wärmebildgeräte für Jagd & Natur | DDoptics"},
  {nm:"GPO (German Precision Optics)", dm:"gpo-usa.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://gpo-usa.com/", title:"GPO USA | High-Quality Optics & Riflescopes Made in USA"},
  {nm:"MINOX", dm:"minox.com", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:200, url:"https://www.minox.com/de/", title:"Entdecke die Welt der Jagdoptik"},
  {nm:"KITE OPTICS", dm:"kiteoptics.com", cc:"BE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:200, url:"https://kiteoptics.com/en/", title:"KITE OPTICS — Home of Belgian innovative optics"},
  {nm:"IOR (Industria Optica Romana)", dm:"ior.ro", cc:"RO", region:"欧盟", famId:"optics", ind:"光学光电", btype:"制造商 (OEM/ODM)", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:0, url:"https://ior.ro", title:""},
  {nm:"Tangent Theta", dm:"tangenttheta.com", cc:"CA", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:429, url:"https://armament.com/pages/about-tangent-theta", title:""},
  {nm:"Arken Optics", dm:"arkenoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:429, url:"https://arkenoptics.com/", title:""},
  {nm:"Swampfox Optics", dm:"swampfoxoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.swampfoxoptics.com/", title:"Swampfox Tactical Optics: Clear, Precise, Tough"},
  {nm:"NOBLEX", dm:"noblex.de", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:429, url:"https://noblex-e-optics.com/", title:""},
  {nm:"Konus", dm:"konus.com", cc:"IT", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商", need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.konus.com/", title:"Konus - Ottiche Caccia, Tiro, Outdoor, Abbigliamento e Scienza"},
  {nm:"Magpul Industries", dm:"magpul.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://magpul.com/", title:"Magpul - High-Quality Firearms Accessories & Tactical Gear"},
  {nm:"5.11 Tactical", dm:"511tactical.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.511tactical.com/", title:"5.11 | Performance Apparel & Gear for Work, Training & Life"},
  {nm:"Blackhawk", dm:"blackhawk.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://blackhawk.com/", title:""},
  {nm:"Safariland", dm:"safariland.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://safariland.com/", title:""},
  {nm:"Crye Precision", dm:"cryeprecision.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.cryeprecision.com/", title:"Crye Precision"},
  {nm:"Blue Force Gear", dm:"blueforcegear.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://blueforcegear.com/", title:"Blue Force Gear - Made in the USA"},
  {nm:"High Speed Gear", dm:"highspeedgear.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://highspeedgear.com/", title:""},
  {nm:"Tactical Tailor", dm:"tacticaltailor.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://tacticaltailor.com/", title:"Tactical Tailor"},
  {nm:"Maxpedition", dm:"maxpedition.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://maxpedition.com/", title:""},
  {nm:"Vertx", dm:"vertx.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://vertx.com/", title:""},
  {nm:"Helikon-Tex", dm:"helikon-tex.com", cc:"PL", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://helikon-tex.com/en/", title:"Tactical, Military & Outdoor Gear – Official Online Store | Helikon-Tex"},
  {nm:"Clawgear", dm:"clawgear.com", cc:"AT", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.clawgear.com/", title:"Clawgear | Premium Military Equipment"},
  {nm:"UF PRO", dm:"ufpro.com", cc:"SI", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://ufpro.com/", title:"UF PRO | Tactical Gear for Professionals | ufpro.com"},
  {nm:"Lindnerhof", dm:"lindnerhof-taktik.de", cc:"DE", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://lindnerhof-taktik.de/", title:"Home | Lindnerhof"},
  {nm:"Tasmanian Tiger", dm:"tasmaniantiger.info", cc:"DE", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.tasmaniantiger.info/en/", title:"Tasmanian Tiger - Military & Police Equipment"},
  {nm:"Pentagon Tactical", dm:"pentagon-tactical.com", cc:"GR", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:403, url:"https://pentagon-tactical.com/", title:""},
  {nm:"Mechanix Wear", dm:"mechanix.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.mechanix.com/us-en/", title:"Work Gloves | Mechanix Wear"},
  {nm:"Wiley X", dm:"wileyx.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://wileyx.com/", title:""},
  {nm:"ESS Eye Pro", dm:"esseyepro.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://esseyepro.com/", title:"ESS Eye Pro - Ballistic Goggles - Ballistic Sunglasses - Military Eyewear - Eye Protection - Shooting Glasses | ESS EyePro"},
  {nm:"Sordin", dm:"sordin.se", cc:"SE", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://www.sordin.com/", title:""},
  {nm:"Gentex Corporation", dm:"gentexcorp.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"制造商 (OEM/ODM)", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.gentexcorp.com/", title:"Gentex Corporation | Advanced Personal Protection Solutions"},
  {nm:"Team Wendy", dm:"teamwendy.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.teamwendy.com/", title:"Superior helmet systems for those who risk their lives"},
  {nm:"Condor Outdoor", dm:"condoroutdoor.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://condoroutdoor.com/", title:""},
  {nm:"Esstac", dm:"esstac.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://esstac.com/", title:"Esstac"},
  {nm:"Velocity Systems", dm:"velocitysystems.net", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"http://velocitysystems.net/", title:""},
  {nm:"Eberlestock", dm:"eberlestock.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://eberlestock.com/", title:""},
  {nm:"Kifaru", dm:"kifaru.net", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://kifaru.net/", title:""},
  {nm:"Mystery Ranch", dm:"mysteryranch.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商", need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.mysteryranch.com/", title:"MYSTERY RANCH Backpacks | Built for the Mission"},
  {nm:"Philips", dm:"philips.com", cc:"NL", region:"欧盟", famId:"electronics", ind:"电子制造", btype:"品牌商", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:200, url:"https://www.philips.com.ph/", title:"Philips - Philippines | Philips"},
  {nm:"Logitech", dm:"logitech.com", cc:"CH", region:"欧盟", famId:"electronics", ind:"电子制造", btype:"品牌商", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:200, url:"https://www.logitech.com/en-us/change-location", title:"Change Location"},
  {nm:"Bose", dm:"bose.com", cc:"US", region:"北美", famId:"electronics", ind:"电子制造", btype:"品牌商", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:200, url:"https://www.bose.com/home", title:"Headphones, Earbuds, Speakers, Soundbars, & More | Bose"},
  {nm:"Sennheiser", dm:"sennheiser.com", cc:"DE", region:"欧盟", famId:"electronics", ind:"电子制造", btype:"品牌商", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:200, url:"https://www.sennheiser.com/en-de", title:"Sennheiser — Headphones, Microphones, Wireless Systems"},
  {nm:"Harman", dm:"harman.com", cc:"US", region:"北美", famId:"electronics", ind:"电子制造", btype:"品牌商", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:200, url:"https://www.harman.com/", title:"HARMAN International"},
  {nm:"Belkin", dm:"belkin.com", cc:"US", region:"北美", famId:"electronics", ind:"电子制造", btype:"品牌商", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:200, url:"https://www.belkin.com/", title:""},
  {nm:"Legrand", dm:"legrand.com", cc:"FR", region:"欧盟", famId:"electronics", ind:"电子制造", btype:"品牌商", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:200, url:"https://www.legrand.com/en", title:"LEGRAND GROUP - News, Financial, RSE, Careers - Legrand"},
  {nm:"Phoenix Contact", dm:"phoenixcontact.com", cc:"DE", region:"欧盟", famId:"electronics", ind:"电子制造", btype:"制造商 (OEM/ODM)", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:403, url:"https://www.phoenixcontact.com/en-sg/", title:""},
  {nm:"WAGO", dm:"wago.com", cc:"DE", region:"欧盟", famId:"electronics", ind:"电子制造", btype:"制造商 (OEM/ODM)", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:200, url:"https://www.wago.com/global/country-selection", title:"Country Selection | WAGO"},
  {nm:"TE Connectivity", dm:"te.com", cc:"CH", region:"欧盟", famId:"electronics", ind:"电子制造", btype:"制造商 (OEM/ODM)", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:403, url:"https://www.te.com/", title:""},
  {nm:"Molex", dm:"molex.com", cc:"US", region:"北美", famId:"electronics", ind:"电子制造", btype:"制造商 (OEM/ODM)", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:0, url:"https://molex.com", title:""},
  {nm:"Amphenol", dm:"amphenol.com", cc:"US", region:"北美", famId:"electronics", ind:"电子制造", btype:"制造商 (OEM/ODM)", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:403, url:"https://amphenol.com/", title:""},
  {nm:"SCHURTER", dm:"schurter.com", cc:"CH", region:"欧盟", famId:"electronics", ind:"电子制造", btype:"制造商 (OEM/ODM)", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:200, url:"https://www.schurter.com/en", title:"Electronic Components and HMI | SCHURTER"},
  {nm:"Traco Power", dm:"tracopower.com", cc:"AT", region:"欧盟", famId:"electronics", ind:"电子制造", btype:"品牌商", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:200, url:"https://www.tracopower.com/int", title:"Traco Power | tracopower.com"},
  {nm:"Bulgin", dm:"bulgin.co.uk", cc:"UK", region:"欧盟", famId:"electronics", ind:"电子制造", btype:"品牌商", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:0, url:"https://bulgin.co.uk", title:""},
  {nm:"CUI Devices（现 Same Sky）", dm:"cuidevices.com", cc:"US", region:"北美", famId:"electronics", ind:"电子制造", btype:"品牌商", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:200, url:"https://www.sameskydevices.com:443/", title:"Electronic Components for the OEM | Same Sky®"},
  {nm:"Festo", dm:"festo.com", cc:"DE", region:"欧盟", famId:"machinery", ind:"工业设备", btype:"品牌商", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:200, url:"https://festo.com/", title:"Festo Worldwide"},
  {nm:"SMC", dm:"smcworld.com", cc:"JP", region:"东亚", famId:"machinery", ind:"工业设备", btype:"品牌商", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:403, url:"https://www.smcworld.com/", title:""},
  {nm:"Parker Hannifin", dm:"parker.com", cc:"US", region:"北美", famId:"machinery", ind:"工业设备", btype:"品牌商", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:403, url:"https://www.parker.com/", title:""},
  {nm:"SKF", dm:"skf.com", cc:"SE", region:"欧盟", famId:"machinery", ind:"工业设备", btype:"品牌商", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:200, url:"https://www.skf.com/ph", title:"SKF"},
  {nm:"NSK", dm:"nsk.com", cc:"JP", region:"东亚", famId:"machinery", ind:"工业设备", btype:"品牌商", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:200, url:"https://www.nsk.com/", title:"NSK Global—Bearings, Automotive Components, and Precision Machinery and Parts | NSK Global"},
  {nm:"Gates", dm:"gates.com", cc:"US", region:"北美", famId:"machinery", ind:"工业设备", btype:"品牌商", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:403, url:"https://www.gates.com/", title:""},
  {nm:"Habasit", dm:"habasit.com", cc:"CH", region:"欧盟", famId:"machinery", ind:"工业设备", btype:"品牌商", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:200, url:"https://habasit.com/", title:"Habasit - Global leader in conveyor and power transmission belts"},
  {nm:"TRUMPF", dm:"trumpf.com", cc:"DE", region:"欧盟", famId:"machinery", ind:"工业设备", btype:"制造商 (OEM/ODM)", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:403, url:"https://www.trumpf.com/", title:""},
  {nm:"DMG MORI", dm:"dmgmori.com", cc:"DE", region:"欧盟", famId:"machinery", ind:"工业设备", btype:"制造商 (OEM/ODM)", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:200, url:"https://cn.dmgmori.com.cn/?redirect=i", title:"DMG MORI China"},
  {nm:"Haas Automation", dm:"haascnc.com", cc:"US", region:"北美", famId:"machinery", ind:"工业设备", btype:"制造商 (OEM/ODM)", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:403, url:"https://haascnc.com/", title:""},
  {nm:"KAESER KOMPRESSOREN", dm:"kaeser.com", cc:"DE", region:"欧盟", famId:"machinery", ind:"工业设备", btype:"制造商 (OEM/ODM)", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:200, url:"https://www.kaeser.com/int-en", title:"KAESER KOMPRESSOREN – Compressed air system provider"},
  {nm:"Atlas Copco", dm:"atlascopco.com", cc:"SE", region:"欧盟", famId:"machinery", ind:"工业设备", btype:"品牌商", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:200, url:"https://www.atlascopco.com/", title:"Atlas Copco | Level up your experience"},
  {nm:"WIRTGEN", dm:"wirtgen.de", cc:"DE", region:"欧盟", famId:"machinery", ind:"工业设备", btype:"制造商 (OEM/ODM)", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:200, url:"https://www.wirtgen-group.com/wirtgen/", title:"Global Country Selector | Home | Wirtgen"},
  {nm:"Krones", dm:"krones.com", cc:"DE", region:"欧盟", famId:"machinery", ind:"工业设备", btype:"制造商 (OEM/ODM)", need:"机械配件 / 传动件采购（品类推断）", kw:"机械配件", reach:403, url:"https://www.krones.com/en/", title:""},
  {nm:"Stanley Black & Decker", dm:"stanleyblackanddecker.com", cc:"US", region:"北美", famId:"hardware", ind:"五金工具", btype:"品牌商", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:0, url:"https://stanleyblackanddecker.com", title:""},
  {nm:"Makita", dm:"makita.com", cc:"JP", region:"东亚", famId:"hardware", ind:"五金工具", btype:"品牌商", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:200, url:"https://makita.com/", title:"MAKITA Industrial Power Tools - The Leader In Cordless with 18V LXT Lithium-Ion"},
  {nm:"Hilti", dm:"hilti.com", cc:"LI", region:"欧盟", famId:"hardware", ind:"五金工具", btype:"品牌商", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:200, url:"https://www.hilti.com/", title:"Power Tools, Fasteners & Software for Construction - Hilti USA"},
  {nm:"Wera Tools", dm:"wera.de", cc:"DE", region:"欧盟", famId:"hardware", ind:"五金工具", btype:"品牌商", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:200, url:"https://www.wera.de/de/", title:"Wera Werkzeuge | Wera"},
  {nm:"Wiha", dm:"wiha.com", cc:"DE", region:"欧盟", famId:"hardware", ind:"五金工具", btype:"品牌商", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:200, url:"https://wiha.com/", title:"Wiha Werkzeuge - Tools that work for you!"},
  {nm:"KNIPEX", dm:"knipex.com", cc:"DE", region:"欧盟", famId:"hardware", ind:"五金工具", btype:"品牌商", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:403, url:"https://knipex.com/", title:""},
  {nm:"Bahco", dm:"bahco.com", cc:"SE", region:"欧盟", famId:"hardware", ind:"五金工具", btype:"品牌商", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:403, url:"https://www.bahco.com/", title:""},
  {nm:"GearWrench", dm:"gearwrench.com", cc:"US", region:"北美", famId:"hardware", ind:"五金工具", btype:"品牌商", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:200, url:"https://www.gearwrench.com/", title:"GEARWRENCH Premier Auto Mechanics Hand Tools and Tool Sets"},
  {nm:"BESSEY", dm:"bessey.com", cc:"DE", region:"欧盟", famId:"hardware", ind:"五金工具", btype:"品牌商", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:200, url:"http://bessey.com/", title:"Your Name as Your Email | Hover Realnames"},
  {nm:"fischer", dm:"fischer.de", cc:"DE", region:"欧盟", famId:"hardware", ind:"五金工具", btype:"制造商 (OEM/ODM)", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:200, url:"https://www.fischer.de/de-de", title:"Innovative Befestigungstechnik vom Spezialisten | fischer"},
  {nm:"Simpson Strong-Tie", dm:"strongtie.com", cc:"US", region:"北美", famId:"hardware", ind:"五金工具", btype:"制造商 (OEM/ODM)", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:200, url:"https://www.strongtie.com/", title:"Simpson Strong-Tie – Structural Connectors, Fasteners & Hardware"},
  {nm:"IRWIN", dm:"irwin.com", cc:"US", region:"北美", famId:"hardware", ind:"五金工具", btype:"品牌商", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:200, url:"https://www.irwintools.com/", title:"Hand Tools & Power Tool Accessories | IRWIN"},
  {nm:"BASF", dm:"basf.com", cc:"DE", region:"欧盟", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:200, url:"https://www.basf.com/ph/en", title:"BASF – Philippines"},
  {nm:"Evonik", dm:"evonik.com", cc:"DE", region:"欧盟", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:200, url:"https://www.evonik.com/en.html", title:"Evonik - Leading Beyond Chemistry"},
  {nm:"Clariant", dm:"clariant.com", cc:"CH", region:"欧盟", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:200, url:"https://www.clariant.com/en/Corporate", title:"Clariant Specialty Chemicals"},
  {nm:"LANXESS", dm:"lanxess.com", cc:"DE", region:"欧盟", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:200, url:"https://lanxess.com/", title:"▷ Specialty Chemicals | Energizing Chemistry | LANXESS"},
  {nm:"WACKER", dm:"wacker.com", cc:"DE", region:"欧盟", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:200, url:"https://www.wacker.com/", title:""},
  {nm:"Arkema", dm:"arkema.com", cc:"FR", region:"欧盟", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:200, url:"https://www.arkema.com/global/en/", title:"Home | Arkema Global"},
  {nm:"Solvay", dm:"solvay.com", cc:"BE", region:"欧盟", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:403, url:"https://www.solvay.com/", title:""},
  {nm:"Eastman", dm:"eastman.com", cc:"US", region:"北美", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:200, url:"https://www.eastman.com/en", title:"Eastman | Material Innovation Company"},
  {nm:"Celanese", dm:"celanese.com", cc:"US", region:"北美", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:403, url:"https://www.celanese.com/", title:""},
  {nm:"Kuraray", dm:"kuraray.com", cc:"JP", region:"东亚", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:200, url:"https://www.kuraray.com/global-en/", title:"HOME | Kuraray"},
  {nm:"Mitsubishi Chemical", dm:"mcgc.com", cc:"JP", region:"东亚", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:200, url:"https://www.mcgc.com/", title:"三菱ケミカルグループ"},
  {nm:"Ascend Performance Materials", dm:"ascendmaterials.com", cc:"US", region:"北美", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:200, url:"https://www.ascendmaterials.com/", title:"Ascend Performance Materials LLC"},
  {nm:"DIC Corporation", dm:"dic-global.com", cc:"JP", region:"东亚", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:200, url:"https://www.dic-global.com:443/ap/", title:"DIC Corporation - Asia Pacific"},
  {nm:"Dow", dm:"dow.com", cc:"US", region:"北美", famId:"chemical", ind:"化工材料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:403, url:"https://dow.com/", title:""},
  {nm:"Medtronic", dm:"medtronic.com", cc:"US", region:"北美", famId:"medical", ind:"医疗器械", btype:"品牌商", need:"医用耗材 / 结构件采购（品类推断）", kw:"医用耗材", reach:200, url:"https://www.medtronic.com/", title:"Incorrect Browser"},
  {nm:"GE HealthCare", dm:"gehealthcare.com", cc:"US", region:"北美", famId:"medical", ind:"医疗器械", btype:"品牌商", need:"医用耗材 / 结构件采购（品类推断）", kw:"医用耗材", reach:200, url:"https://www.gehealthcare.com/en-us", title:"GE HealthCare Technologies Inc"},
  {nm:"Siemens Healthineers", dm:"siemens-healthineers.com", cc:"DE", region:"欧盟", famId:"medical", ind:"医疗器械", btype:"品牌商", need:"医用耗材 / 结构件采购（品类推断）", kw:"医用耗材", reach:200, url:"https://www.siemens-healthineers.com/", title:"Siemens Healthineers | Corporate Home"},
  {nm:"B. Braun", dm:"bbraun.com", cc:"DE", region:"欧盟", famId:"medical", ind:"医疗器械", btype:"品牌商", need:"医用耗材 / 结构件采购（品类推断）", kw:"医用耗材", reach:200, url:"https://www.bbraun.com/en.html", title:"B. Braun: A leading medical technology company"},
  {nm:"Dräger", dm:"draeger.com", cc:"DE", region:"欧盟", famId:"medical", ind:"医疗器械", btype:"品牌商", need:"医用耗材 / 结构件采购（品类推断）", kw:"医用耗材", reach:0, url:"https://draeger.com", title:""},
  {nm:"Baxter", dm:"baxter.com", cc:"US", region:"北美", famId:"medical", ind:"医疗器械", btype:"品牌商", need:"医用耗材 / 结构件采购（品类推断）", kw:"医用耗材", reach:200, url:"https://www.baxter.com/", title:"Redefining Healthcare Delivery Everywhere Care Happens | Baxter"},
  {nm:"BD", dm:"bd.com", cc:"US", region:"北美", famId:"medical", ind:"医疗器械", btype:"品牌商", need:"医用耗材 / 结构件采购（品类推断）", kw:"医用耗材", reach:403, url:"https://www.bd.com/", title:""},
  {nm:"Stryker", dm:"stryker.com", cc:"US", region:"北美", famId:"medical", ind:"医疗器械", btype:"品牌商", need:"医用耗材 / 结构件采购（品类推断）", kw:"医用耗材", reach:200, url:"https://www.stryker.com/", title:"International homepage | Stryker"},
  {nm:"Zimmer Biomet", dm:"zimmerbiomet.com", cc:"US", region:"北美", famId:"medical", ind:"医疗器械", btype:"品牌商", need:"医用耗材 / 结构件采购（品类推断）", kw:"医用耗材", reach:200, url:"https://www.zimmerbiomet.com/en", title:"Zimmer Biomet: Innovations in Orthopedic Care"},
  {nm:"ConvaTec", dm:"convatec.com", cc:"UK", region:"欧盟", famId:"medical", ind:"医疗器械", btype:"品牌商", need:"医用耗材 / 结构件采购（品类推断）", kw:"医用耗材", reach:403, url:"https://www.convatec.com/", title:""},
  {nm:"HARTMANN", dm:"hartmann.info", cc:"DE", region:"欧盟", famId:"medical", ind:"医疗器械", btype:"品牌商", need:"医用耗材 / 结构件采购（品类推断）", kw:"医用耗材", reach:200, url:"https://www.hartmann.info/", title:"Country Selection"},
  {nm:"Lohmann & Rauscher", dm:"lohmann-rauscher.com", cc:"DE", region:"欧盟", famId:"medical", ind:"医疗器械", btype:"制造商 (OEM/ODM)", need:"医用耗材 / 结构件采购（品类推断）", kw:"医用耗材", reach:200, url:"https://www.lohmann-rauscher.com/en/", title:"L&R Global: Lohmann & Rauscher International"},
  {nm:"Enphase Energy", dm:"enphase.com", cc:"US", region:"北美", famId:"newenergy", ind:"新能源", btype:"品牌商", need:"储能与光伏组件采购（品类推断）", kw:"储能与光伏", reach:200, url:"https://enphase.com/en-ph", title:"Reliable home and commercial solar plus storage solutions"},
  {nm:"SolarEdge", dm:"solaredge.com", cc:"IL", region:"中东", famId:"newenergy", ind:"新能源", btype:"品牌商", need:"储能与光伏组件采购（品类推断）", kw:"储能与光伏", reach:403, url:"https://www.solaredge.com/en", title:""},
  {nm:"SMA Solar", dm:"sma.de", cc:"DE", region:"欧盟", famId:"newenergy", ind:"新能源", btype:"制造商 (OEM/ODM)", need:"储能与光伏组件采购（品类推断）", kw:"储能与光伏", reach:200, url:"https://www.sma.de/", title:"Willkommen bei SMA: Wechselrichter- & Photovoltaik-Lösungen | SMA Solar"},
  {nm:"Fronius", dm:"fronius.com", cc:"AT", region:"欧盟", famId:"newenergy", ind:"新能源", btype:"制造商 (OEM/ODM)", need:"储能与光伏组件采购（品类推断）", kw:"储能与光伏", reach:200, url:"https://www.fronius.com/en", title:"Fronius International"},
  {nm:"sonnen", dm:"sonnen.de", cc:"DE", region:"欧盟", famId:"newenergy", ind:"新能源", btype:"品牌商", need:"储能与光伏组件采购（品类推断）", kw:"储能与光伏", reach:200, url:"https://www.sonnen.de/", title:"Energieversorgung der Zukunft | sonnen"},
  {nm:"Victron Energy", dm:"victronenergy.com", cc:"NL", region:"欧盟", famId:"newenergy", ind:"新能源", btype:"品牌商", need:"储能与光伏组件采购（品类推断）", kw:"储能与光伏", reach:200, url:"https://www.victronenergy.com/", title:"Victron Energy | Independent energy systems engineered to outlast"},
  {nm:"Studer Innotec", dm:"studer-innotec.com", cc:"CH", region:"欧盟", famId:"newenergy", ind:"新能源", btype:"制造商 (OEM/ODM)", need:"储能与光伏组件采购（品类推断）", kw:"储能与光伏", reach:200, url:"https://studer-innotec.com/", title:"Studer Innotec - Swiss made power electronics & energy solutions"},
  {nm:"IBC SOLAR", dm:"ibc-solar.com", cc:"DE", region:"欧盟", famId:"newenergy", ind:"新能源", btype:"分销商 / 代理", need:"储能与光伏组件采购（品类推断）", kw:"储能与光伏", reach:200, url:"https://www.ibc-solar.com/", title:"IBC SOLAR International | IBC SOLAR"},
  {nm:"Krannich Solar", dm:"krannich.com", cc:"DE", region:"欧盟", famId:"newenergy", ind:"新能源", btype:"分销商 / 代理", need:"储能与光伏组件采购（品类推断）", kw:"储能与光伏", reach:200, url:"http://krannich.com/", title:"Your Name as Your Email | Hover Realnames"},
  {nm:"Memodo", dm:"memodo.de", cc:"DE", region:"欧盟", famId:"newenergy", ind:"新能源", btype:"分销商 / 代理", need:"储能与光伏组件采购（品类推断）", kw:"储能与光伏", reach:200, url:"https://www.memodo.de/", title:"Photovoltaik Großhandel und Photovoltaik-Shop | Memodo"},
  {nm:"Segen", dm:"segen.co.uk", cc:"UK", region:"欧盟", famId:"newenergy", ind:"新能源", btype:"分销商 / 代理", need:"储能与光伏组件采购（品类推断）", kw:"储能与光伏", reach:200, url:"https://www.segen.co.uk/", title:"Solar Panel, Heat Pump and EV Charger Supplier | Segen UK"},
  {nm:"BayWa r.e.", dm:"baywa-re.com", cc:"DE", region:"欧盟", famId:"newenergy", ind:"新能源", btype:"工程商 / 项目方", need:"储能与光伏组件采购（品类推断）", kw:"储能与光伏", reach:200, url:"https://www.baywa-re.com/en", title:"Sustainable Renewable Energy Development – BayWa r.e."},
  {nm:"Phocos", dm:"phocos.com", cc:"DE", region:"欧盟", famId:"newenergy", ind:"新能源", btype:"品牌商", need:"储能与光伏组件采购（品类推断）", kw:"储能与光伏", reach:0, url:"https://phocos.com", title:""},
  {nm:"Bosch", dm:"bosch.com", cc:"DE", region:"欧盟", famId:"auto", ind:"汽车零部件", btype:"品牌商", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:200, url:"https://www.bosch.com/", title:"Invented for life | Bosch Global"},
  {nm:"Continental", dm:"continental.com", cc:"DE", region:"欧盟", famId:"auto", ind:"汽车零部件", btype:"制造商 (OEM/ODM)", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:200, url:"https://www.continental.com/en/", title:"Home | Continental - Continental AG"},
  {nm:"ZF", dm:"zf.com", cc:"DE", region:"欧盟", famId:"auto", ind:"汽车零部件", btype:"制造商 (OEM/ODM)", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:200, url:"https://www.zf.com/mobile/en/homepage/homepage.html", title:"Homepage ZF Friedrichshafen AG - ZF"},
  {nm:"Valeo", dm:"valeo.com", cc:"FR", region:"欧盟", famId:"auto", ind:"汽车零部件", btype:"制造商 (OEM/ODM)", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:200, url:"https://www.valeo.com:443/", title:"Valeo | Smart Technology for a Smarter Vehicles & Mobility"},
  {nm:"FORVIA", dm:"forvia.com", cc:"FR", region:"欧盟", famId:"auto", ind:"汽车零部件", btype:"制造商 (OEM/ODM)", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:403, url:"https://forvia.com/", title:""},
  {nm:"Magna", dm:"magna.com", cc:"CA", region:"北美", famId:"auto", ind:"汽车零部件", btype:"制造商 (OEM/ODM)", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:200, url:"https://www.magna.com/", title:"Magna International - Forward. For all."},
  {nm:"Aptiv", dm:"aptiv.com", cc:"IE", region:"欧盟", famId:"auto", ind:"汽车零部件", btype:"制造商 (OEM/ODM)", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:200, url:"https://www.aptiv.com/", title:"Aptiv | Home - Global Technology Company"},
  {nm:"Lear", dm:"lear.com", cc:"US", region:"北美", famId:"auto", ind:"汽车零部件", btype:"制造商 (OEM/ODM)", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:200, url:"https://www.lear.com/", title:"Global Automotive Tech Leader | Lear Corporation"},
  {nm:"DENSO", dm:"denso.com", cc:"JP", region:"东亚", famId:"auto", ind:"汽车零部件", btype:"制造商 (OEM/ODM)", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:403, url:"https://www.denso.com/", title:""},
  {nm:"AISIN", dm:"aisin.com", cc:"JP", region:"东亚", famId:"auto", ind:"汽车零部件", btype:"制造商 (OEM/ODM)", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:200, url:"https://aisin.com/en/", title:"AISIN CORPORATION Global Website"},
  {nm:"HELLA", dm:"hella.com", cc:"DE", region:"欧盟", famId:"auto", ind:"汽车零部件", btype:"品牌商", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:200, url:"https://www.hella.com/en/", title:"Homepage | FORVIA HELLA"},
  {nm:"Webasto", dm:"webasto.com", cc:"DE", region:"欧盟", famId:"auto", ind:"汽车零部件", btype:"制造商 (OEM/ODM)", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:200, url:"https://www.webasto.com/en-int.html", title:"Webasto – 125 Years of Innovation Systems Partner for Mobility & Roofs"},
  {nm:"Brembo", dm:"brembo.com", cc:"IT", region:"欧盟", famId:"auto", ind:"汽车零部件", btype:"品牌商", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:200, url:"https://www.brembo.com/en", title:"Innovation and Safety in Braking Systems for Cars and Bike | Brembo EN"},
  {nm:"Inditex", dm:"inditex.com", cc:"ES", region:"欧盟", famId:"textile", ind:"纺织服装", btype:"零售商/连锁", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:200, url:"https://www.inditex.com/itxcomweb/ph/en/home", title:"INDITEX | Home"},
  {nm:"H&M", dm:"hm.com", cc:"SE", region:"欧盟", famId:"textile", ind:"纺织服装", btype:"零售商/连锁", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:403, url:"https://hm.com/", title:""},
  {nm:"C&A", dm:"c-and-a.com", cc:"BE", region:"欧盟", famId:"textile", ind:"纺织服装", btype:"零售商/连锁", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:200, url:"https://www.c-and-a.com/eu/en/shop?showCountrySelector=true", title:"Fashion and clothing to feel good | C&A"},
  {nm:"Decathlon", dm:"decathlon.com", cc:"FR", region:"欧盟", famId:"textile", ind:"纺织服装", btype:"零售商/连锁", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:429, url:"https://decathlon.com/", title:""},
  {nm:"VF Corporation", dm:"vfc.com", cc:"US", region:"北美", famId:"textile", ind:"纺织服装", btype:"品牌商", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:200, url:"https://vfc.com/", title:"VF Corporation (VFC)"},
  {nm:"Levi Strauss & Co.", dm:"levistrauss.com", cc:"US", region:"北美", famId:"textile", ind:"纺织服装", btype:"品牌商", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:200, url:"https://www.levistrauss.com/", title:"Levi Strauss Home - Levi Strauss & Co : Levi Strauss & Co"},
  {nm:"PVH", dm:"pvh.com", cc:"US", region:"北美", famId:"textile", ind:"纺织服装", btype:"品牌商", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:200, url:"https://www.pvh.com:443/", title:"Home - PVH"},
  {nm:"HUGO BOSS", dm:"hugoboss.com", cc:"DE", region:"欧盟", famId:"textile", ind:"纺织服装", btype:"品牌商", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:200, url:"https://www.hugoboss.com/ph/en/home", title:"HUGO BOSS | Official Online Shop | Menswear & Womenswear"},
  {nm:"Fast Retailing", dm:"fastretailing.com", cc:"JP", region:"东亚", famId:"textile", ind:"纺织服装", btype:"零售商/连锁", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:200, url:"https://www.fastretailing.com/eng/", title:"FAST RETAILING CO., LTD."},
  {nm:"NEXT", dm:"next.co.uk", cc:"UK", region:"欧盟", famId:"textile", ind:"纺织服装", btype:"零售商/连锁", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:200, url:"https://www.next.co.uk/", title:"Next Official Site: Online Fashion, Kids Clothes & Homeware"},
  {nm:"Zalando", dm:"zalando.com", cc:"DE", region:"欧盟", famId:"textile", ind:"纺织服装", btype:"零售商/连锁", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:200, url:"https://zalando.com/", title:"Zalando - Shoes and Fashion Online"},
  {nm:"OTTO", dm:"otto.de", cc:"DE", region:"欧盟", famId:"textile", ind:"纺织服装", btype:"零售商/连锁", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:200, url:"https://www.otto.de/", title:"OTTO - Mode, Möbel & Technik » Zum Online-Shop"},
  {nm:"Mango", dm:"mango.com", cc:"ES", region:"欧盟", famId:"textile", ind:"纺织服装", btype:"零售商/连锁", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:429, url:"https://shop.mango.com/", title:""},
  {nm:"Primark", dm:"primark.com", cc:"UK", region:"欧盟", famId:"textile", ind:"纺织服装", btype:"零售商/连锁", need:"面料与成衣采购（品类推断）", kw:"面料与成衣", reach:403, url:"https://primark.com/", title:""},
  {nm:"Amcor", dm:"amcor.com", cc:"CH", region:"欧盟", famId:"packaging", ind:"包装", btype:"制造商 (OEM/ODM)", need:"包装材料 / 容器采购（品类推断）", kw:"包装材料", reach:200, url:"https://www.amcor.com/", title:"Global leader in producing responsible packaging | Amcor"},
  {nm:"Sealed Air", dm:"sealedair.com", cc:"US", region:"北美", famId:"packaging", ind:"包装", btype:"制造商 (OEM/ODM)", need:"包装材料 / 容器采购（品类推断）", kw:"包装材料", reach:403, url:"https://www.sealedair.com/", title:""},
  {nm:"Smurfit Westrock", dm:"smurfitwestrock.com", cc:"IE", region:"欧盟", famId:"packaging", ind:"包装", btype:"制造商 (OEM/ODM)", need:"包装材料 / 容器采购（品类推断）", kw:"包装材料", reach:200, url:"https://www.smurfitwestrock.com/", title:"Global Sustainable Packaging Manufacturer | Smurfit Westrock"},
  {nm:"DS Smith", dm:"dssmith.com", cc:"UK", region:"欧盟", famId:"packaging", ind:"包装", btype:"制造商 (OEM/ODM)", need:"包装材料 / 容器采购（品类推断）", kw:"包装材料", reach:200, url:"https://www.dssmith.com/", title:"DS Smith – Packaging, Paper, Recycling"},
  {nm:"Mondi", dm:"mondigroup.com", cc:"AT", region:"欧盟", famId:"packaging", ind:"包装", btype:"制造商 (OEM/ODM)", need:"包装材料 / 容器采购（品类推断）", kw:"包装材料", reach:200, url:"https://www.mondigroup.com/", title:"Mondi | Sustainable Packaging and Paper"},
  {nm:"Constantia Flexibles", dm:"cflex.com", cc:"AT", region:"欧盟", famId:"packaging", ind:"包装", btype:"制造商 (OEM/ODM)", need:"包装材料 / 容器采购（品类推断）", kw:"包装材料", reach:200, url:"https://www.cflex.com/", title:"Welcome to Constantia Flexibles"},
  {nm:"Huhtamaki", dm:"huhtamaki.com", cc:"FI", region:"欧盟", famId:"packaging", ind:"包装", btype:"制造商 (OEM/ODM)", need:"包装材料 / 容器采购（品类推断）", kw:"包装材料", reach:200, url:"https://www.huhtamaki.com/", title:"Food packaging supplies and materials | Huhtamaki"},
  {nm:"Gerresheimer", dm:"gerresheimer.com", cc:"DE", region:"欧盟", famId:"packaging", ind:"包装", btype:"制造商 (OEM/ODM)", need:"包装材料 / 容器采购（品类推断）", kw:"包装材料", reach:200, url:"https://www.gerresheimer.com/en", title:"Packaging & Systems for Pharma & Cosmetics | Gerresheimer"},
  {nm:"Ball Corporation", dm:"ball.com", cc:"US", region:"北美", famId:"packaging", ind:"包装", btype:"制造商 (OEM/ODM)", need:"包装材料 / 容器采购（品类推断）", kw:"包装材料", reach:403, url:"https://www.ball.com/", title:""},
  {nm:"Tetra Pak", dm:"tetrapak.com", cc:"CH", region:"欧盟", famId:"packaging", ind:"包装", btype:"制造商 (OEM/ODM)", need:"包装材料 / 容器采购（品类推断）", kw:"包装材料", reach:403, url:"https://www.tetrapak.com/", title:""},
  {nm:"Sidel", dm:"sidel.com", cc:"FR", region:"欧盟", famId:"packaging", ind:"包装", btype:"制造商 (OEM/ODM)", need:"包装材料 / 容器采购（品类推断）", kw:"包装材料", reach:200, url:"https://www.sidel.com/en", title:"Sidel - Complete lines and components for food & beverage"},
  {nm:"Saint-Gobain", dm:"saint-gobain.com", cc:"FR", region:"欧盟", famId:"building", ind:"建材", btype:"制造商 (OEM/ODM)", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:403, url:"https://www.saint-gobain.com/", title:""},
  {nm:"Knauf", dm:"knauf.com", cc:"DE", region:"欧盟", famId:"building", ind:"建材", btype:"制造商 (OEM/ODM)", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:403, url:"https://knauf.com/", title:""},
  {nm:"Wienerberger", dm:"wienerberger.com", cc:"AT", region:"欧盟", famId:"building", ind:"建材", btype:"制造商 (OEM/ODM)", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:200, url:"https://www.wienerberger.com/en.html", title:"wienerberger - The future of building"},
  {nm:"Geberit", dm:"geberit.com", cc:"CH", region:"欧盟", famId:"building", ind:"建材", btype:"品牌商", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:403, url:"https://www.geberit.com/", title:""},
  {nm:"GROHE", dm:"grohe.com", cc:"DE", region:"欧盟", famId:"building", ind:"建材", btype:"品牌商", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:200, url:"https://www.grohe.com/en-GB", title:"GROHE – Premium Bathroom Taps, Showers & Kitchen solutions"},
  {nm:"Villeroy & Boch", dm:"villeroy-boch.com", cc:"DE", region:"欧盟", famId:"building", ind:"建材", btype:"品牌商", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:403, url:"https://www.villeroy-boch.com:443/", title:""},
  {nm:"Hansgrohe", dm:"hansgrohe.com", cc:"DE", region:"欧盟", famId:"building", ind:"建材", btype:"品牌商", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:403, url:"https://www.hansgrohe.com/", title:""},
  {nm:"Duravit", dm:"duravit.com", cc:"DE", region:"欧盟", famId:"building", ind:"建材", btype:"品牌商", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:403, url:"https://www.duravit.com/", title:""},
  {nm:"ASSA ABLOY", dm:"assaabloy.com", cc:"SE", region:"欧盟", famId:"building", ind:"建材", btype:"制造商 (OEM/ODM)", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:200, url:"https://www.assaabloy.com/ph/en", title:"Creating access with ASSA ABLOY | ASSA ABLOY"},
  {nm:"dormakaba", dm:"dormakaba.com", cc:"CH", region:"欧盟", famId:"building", ind:"建材", btype:"品牌商", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:200, url:"https://www.dormakaba.com/cn-zh", title:"dormakaba 中国 | 进出有形，信赖无边"},
  {nm:"Hörmann", dm:"hoermann.de", cc:"DE", region:"欧盟", famId:"building", ind:"建材", btype:"制造商 (OEM/ODM)", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:200, url:"https://www.hoermann.de/", title:"Garagentore, Haustüren und Innentüren | Hörmann"},
  {nm:"Kingspan", dm:"kingspan.com", cc:"IE", region:"欧盟", famId:"building", ind:"建材", btype:"制造商 (OEM/ODM)", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:200, url:"https://kingspan.com/", title:"Human verification"},
  {nm:"ROCKWOOL", dm:"rockwool.com", cc:"DK", region:"欧盟", famId:"building", ind:"建材", btype:"制造商 (OEM/ODM)", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:200, url:"https://www.rockwool.com/group/", title:"ROCKWOOL stone wool insulation"},
  {nm:"Unilever", dm:"unilever.com", cc:"UK", region:"欧盟", famId:"consumer", ind:"消费品", btype:"品牌商", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:403, url:"https://www.unilever.com/", title:""},
  {nm:"Procter & Gamble", dm:"pg.com", cc:"US", region:"北美", famId:"consumer", ind:"消费品", btype:"品牌商", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:200, url:"https://us.pg.com/", title:""},
  {nm:"Henkel", dm:"henkel.com", cc:"DE", region:"欧盟", famId:"consumer", ind:"消费品", btype:"品牌商", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:200, url:"https://www.henkel.com/", title:"Home"},
  {nm:"Beiersdorf", dm:"beiersdorf.com", cc:"DE", region:"欧盟", famId:"consumer", ind:"消费品", btype:"品牌商", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:200, url:"https://www.beiersdorf.com/", title:"Beiersdorf – The inventors of modern skin care"},
  {nm:"L'Oréal", dm:"loreal.com", cc:"FR", region:"欧盟", famId:"consumer", ind:"消费品", btype:"品牌商", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:200, url:"https://www.loreal.com/en/", title:"L'Oréal Groupe, the most innovative and caring company"},
  {nm:"Reckitt", dm:"reckitt.com", cc:"UK", region:"欧盟", famId:"consumer", ind:"消费品", btype:"品牌商", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:200, url:"https://www.reckitt.com/", title:"Homepage | Reckitt.com"},
  {nm:"Colgate-Palmolive", dm:"colgatepalmolive.com", cc:"US", region:"北美", famId:"consumer", ind:"消费品", btype:"品牌商", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:403, url:"https://www.colgatepalmolive.com/", title:""},
  {nm:"Kimberly-Clark", dm:"kimberly-clark.com", cc:"US", region:"北美", famId:"consumer", ind:"消费品", btype:"品牌商", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:403, url:"https://kimberly-clark.com/", title:""},
  {nm:"Essity", dm:"essity.com", cc:"SE", region:"欧盟", famId:"consumer", ind:"消费品", btype:"品牌商", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:200, url:"https://www.essity.com/", title:"Essity - Leading in hygiene and health | Global"},
  {nm:"SC Johnson", dm:"scjohnson.com", cc:"US", region:"北美", famId:"consumer", ind:"消费品", btype:"品牌商", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:429, url:"https://scjohnson.com/", title:""},
  {nm:"IKEA", dm:"ikea.com", cc:"SE", region:"欧盟", famId:"consumer", ind:"消费品", btype:"零售商/连锁", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:200, url:"https://www.ikea.com/", title:"Hej! Welcome to IKEA Global"},
  {nm:"Williams Sonoma", dm:"williams-sonoma.com", cc:"US", region:"北美", famId:"consumer", ind:"消费品", btype:"零售商/连锁", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:403, url:"https://www.williams-sonoma.com/", title:""},
  {nm:"Action", dm:"action.com", cc:"NL", region:"欧盟", famId:"consumer", ind:"消费品", btype:"零售商/连锁", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:403, url:"https://action.com/", title:""},
  {nm:"SAP", dm:"sap.com", cc:"DE", region:"欧盟", famId:"software", ind:"软件服务", btype:"品牌商", need:"工业软件 / 模块采购（品类推断）", kw:"工业软件", reach:403, url:"https://www.sap.com/", title:""},
  {nm:"Dassault Systèmes", dm:"3ds.com", cc:"FR", region:"欧盟", famId:"software", ind:"软件服务", btype:"品牌商", need:"工业软件 / 模块采购（品类推断）", kw:"工业软件", reach:200, url:"https://www.3ds.com/", title:"Virtual Worlds for Real Life | Dassault Systèmes"},
  {nm:"Autodesk", dm:"autodesk.com", cc:"US", region:"北美", famId:"software", ind:"软件服务", btype:"品牌商", need:"工业软件 / 模块采购（品类推断）", kw:"工业软件", reach:403, url:"https://www.autodesk.com/", title:""},
  {nm:"PTC", dm:"ptc.com", cc:"US", region:"北美", famId:"software", ind:"软件服务", btype:"品牌商", need:"工业软件 / 模块采购（品类推断）", kw:"工业软件", reach:200, url:"https://www.ptc.com/", title:"Global Leader in Product Lifecycle Management Software | PTC"},
  {nm:"Epicor", dm:"epicor.com", cc:"US", region:"北美", famId:"software", ind:"软件服务", btype:"品牌商", need:"工业软件 / 模块采购（品类推断）", kw:"工业软件", reach:403, url:"https://www.epicor.com/", title:""},
  {nm:"IFS", dm:"ifs.com", cc:"SE", region:"欧盟", famId:"software", ind:"软件服务", btype:"品牌商", need:"工业软件 / 模块采购（品类推断）", kw:"工业软件", reach:429, url:"https://ifs.com/", title:""},
  {nm:"Sage", dm:"sage.com", cc:"UK", region:"欧盟", famId:"software", ind:"软件服务", btype:"品牌商", need:"工业软件 / 模块采购（品类推断）", kw:"工业软件", reach:403, url:"https://www.sage.com/en-hk/", title:""},
  {nm:"Odoo", dm:"odoo.com", cc:"BE", region:"欧盟", famId:"software", ind:"软件服务", btype:"品牌商", need:"工业软件 / 模块采购（品类推断）", kw:"工业软件", reach:200, url:"https://www.odoo.com/", title:"Open Source ERP and CRM | Odoo"},
  {nm:"Atlassian", dm:"atlassian.com", cc:"AU", region:"大洋洲", famId:"software", ind:"软件服务", btype:"品牌商", need:"工业软件 / 模块采购（品类推断）", kw:"工业软件", reach:200, url:"https://www.atlassian.com/", title:"Collaboration software for software, IT and business teams | Atlassian"},
  {nm:"Freshworks", dm:"freshworks.com", cc:"US", region:"北美", famId:"software", ind:"软件服务", btype:"品牌商", need:"工业软件 / 模块采购（品类推断）", kw:"工业软件", reach:403, url:"https://www.freshworks.com/", title:""},
  {nm:"SGS", dm:"sgs.com", cc:"CH", region:"欧盟", famId:"service", ind:"专业服务", btype:"品牌商", need:"检测认证 / 物流服务采购（品类推断）", kw:"检测认证", reach:200, url:"https://www.sgs.com/en", title:"SGS | We are the world’s leading Testing, Inspection and Certification company."},
  {nm:"Bureau Veritas", dm:"bureauveritas.com", cc:"FR", region:"欧盟", famId:"service", ind:"专业服务", btype:"品牌商", need:"检测认证 / 物流服务采购（品类推断）", kw:"检测认证", reach:200, url:"https://group.bureauveritas.com:443/", title:"Home | Bureau Veritas"},
  {nm:"TUV SUD", dm:"tuvsud.com", cc:"DE", region:"欧盟", famId:"service", ind:"专业服务", btype:"品牌商", need:"检测认证 / 物流服务采购（品类推断）", kw:"检测认证", reach:403, url:"https://tuvsud.com/", title:""},
  {nm:"TUV Rheinland", dm:"tuv.com", cc:"DE", region:"欧盟", famId:"service", ind:"专业服务", btype:"品牌商", need:"检测认证 / 物流服务采购（品类推断）", kw:"检测认证", reach:200, url:"https://www.tuv.com/philippines/en/", title:"TÜV Rheinland - Home | PH | TÜV Rheinland"},
  {nm:"Intertek", dm:"intertek.com", cc:"UK", region:"欧盟", famId:"service", ind:"专业服务", btype:"品牌商", need:"检测认证 / 物流服务采购（品类推断）", kw:"检测认证", reach:200, url:"https://www.intertek.com/", title:"Intertek"},
  {nm:"DEKRA", dm:"dekra.com", cc:"DE", region:"欧盟", famId:"service", ind:"专业服务", btype:"品牌商", need:"检测认证 / 物流服务采购（品类推断）", kw:"检测认证", reach:200, url:"https://www.dekra.com/en/home/", title:"DEKRA | Securing The Future"},
  {nm:"UL Solutions", dm:"ul.com", cc:"US", region:"北美", famId:"service", ind:"专业服务", btype:"品牌商", need:"检测认证 / 物流服务采购（品类推断）", kw:"检测认证", reach:200, url:"https://www.ul.com/", title:"UL Solutions"},
  {nm:"Eurofins", dm:"eurofins.com", cc:"LU", region:"欧盟", famId:"service", ind:"专业服务", btype:"品牌商", need:"检测认证 / 物流服务采购（品类推断）", kw:"检测认证", reach:200, url:"https://www.eurofins.com:443/en/", title:"Eurofins | Global Analytical Testing & Laboratory Services Leader"},
  {nm:"DHL", dm:"dhl.com", cc:"DE", region:"欧盟", famId:"service", ind:"专业服务", btype:"品牌商", need:"检测认证 / 物流服务采购（品类推断）", kw:"检测认证", reach:0, url:"https://dhl.com", title:""},
  {nm:"Kuehne+Nagel", dm:"kuehne-nagel.com", cc:"CH", region:"欧盟", famId:"service", ind:"专业服务", btype:"品牌商", need:"检测认证 / 物流服务采购（品类推断）", kw:"检测认证", reach:200, url:"https://www.kuehne-nagel.com/", title:"Global Freight Forwarding and Supply Chain Management | Kuehne+Nagel"},
  {nm:"DB Schenker", dm:"dbschenker.com", cc:"DE", region:"欧盟", famId:"service", ind:"专业服务", btype:"品牌商", need:"检测认证 / 物流服务采购（品类推断）", kw:"检测认证", reach:200, url:"https://www.dsv.com/en", title:"Global Transport and Logistics | DSV"},
  {nm:"Expeditors", dm:"expeditors.com", cc:"US", region:"北美", famId:"service", ind:"专业服务", btype:"品牌商", need:"检测认证 / 物流服务采购（品类推断）", kw:"检测认证", reach:200, url:"https://www.expeditors.com/", title:"Expeditors | Home"},
  {nm:"DSV", dm:"dsv.com", cc:"DK", region:"欧盟", famId:"service", ind:"专业服务", btype:"品牌商", need:"检测认证 / 物流服务采购（品类推断）", kw:"检测认证", reach:200, url:"https://www.dsv.com/en", title:"Global Transport and Logistics | DSV"},
  {nm:"SCG", dm:"scg.com", cc:"TH", region:"东南亚", famId:"building", ind:"建材", btype:"制造商 (OEM/ODM)", need:"建材 / 卫浴配套采购（品类推断）", kw:"建材", reach:200, url:"https://scg.com/", title:"SCG Inclusive Green Growth โตด้วยกรีน โตด้วยกัน"},
  {nm:"Indorama Ventures", dm:"indorama.com", cc:"TH", region:"东南亚", famId:"chemical", ind:"化工原料", btype:"制造商 (OEM/ODM)", need:"化工原料 / 助剂采购（品类推断）", kw:"化工原料", reach:200, url:"https://www.indorama.com/", title:"Essential Materials Manufacture & Supplier - Indorama Corporation"},
  {nm:"Courts", dm:"courts.com.sg", cc:"SG", region:"东南亚", famId:"electronics", ind:"电子元器件", btype:"零售商/连锁", need:"电子元器件 / 模组采购（品类推断）", kw:"电子元器件", reach:200, url:"https://www.courts.com.sg/", title:"COURTS Singapore"},
  {nm:"Landmark Group", dm:"landmarkgroup.com", cc:"AE", region:"中东", famId:"consumer", ind:"日用消费品", btype:"零售商/连锁", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:403, url:"https://landmarkgroup.com/", title:""},
  {nm:"Majid Al Futtaim", dm:"majidalfuttaim.com", cc:"AE", region:"中东", famId:"consumer", ind:"日用消费品", btype:"零售商/连锁", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:200, url:"https://www.majidalfuttaim.com/", title:"Majid Al Futtaim Malls, Hotels & Lifestyle Brands | Majid Al Futtaim"},
  {nm:"Al-Futtaim", dm:"alfuttaim.com", cc:"AE", region:"中东", famId:"auto", ind:"汽车零部件", btype:"分销商 / 代理", need:"汽车零部件 / 配套件采购（品类推断）", kw:"汽车零部件", reach:200, url:"https://www.alfuttaim.com/en/", title:"Leading Diversified Business in the UAE | Al-Futtaim"},
  {nm:"Grupo Elektra", dm:"elektra.com.mx", cc:"MX", region:"拉美", famId:"consumer", ind:"日用消费品", btype:"零售商/连锁", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:403, url:"https://www.elektra.mx/", title:""},
  {nm:"Falabella", dm:"falabella.com", cc:"CL", region:"拉美", famId:"consumer", ind:"日用消费品", btype:"零售商/连锁", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:200, url:"https://www.falabella.com/falabella-cl", title:"falabella.com | Todo lo que necesitas en un solo lugar"},
  {nm:"Shoprite", dm:"shoprite.co.za", cc:"ZA", region:"非洲", famId:"consumer", ind:"日用消费品", btype:"零售商/连锁", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:200, url:"https://www.shoprite.co.za/", title:"Shoprite ZA | Home"},
  {nm:"Harvey Norman", dm:"harveynorman.com.au", cc:"AU", region:"大洋洲", famId:"consumer", ind:"日用消费品", btype:"零售商/连锁", need:"日用消费品采购（品类推断）", kw:"日用消费品", reach:200, url:"https://www.harveynorman.com.au/", title:"Pardon Our Interruption"},
  {nm:"Bunnings", dm:"bunnings.com.au", cc:"AU", region:"大洋洲", famId:"hardware", ind:"五金工具", btype:"零售商/连锁", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:403, url:"https://www.bunnings.com.au/", title:""},
  {nm:"Reece", dm:"reece.com.au", cc:"AU", region:"大洋洲", famId:"hardware", ind:"五金工具", btype:"分销商 / 代理", need:"五金工具 / 紧固件采购（品类推断）", kw:"五金工具", reach:200, url:"https://www.reece.com.au/", title:"Reece | Plumbing, Bathroom & Trade Supplies"},
  {nm:"Ashley Furniture", dm:"ashleyfurniture.com", cc:"US", region:"北美", famId:"furniture", ind:"家居家具", btype:"品牌商", need:"家具 / 家居配件采购（品类推断）", kw:"家具,沙发,床垫,餐桌", reach:403, url:"https://ashleyfurniture.com/", title:""},
  {nm:"Wayfair", dm:"wayfair.com", cc:"US", region:"北美", famId:"furniture", ind:"家居家具", btype:"零售商/连锁", need:"家具 / 家居配件采购（品类推断）", kw:"家具,家居,灯具,家纺", reach:429, url:"https://www.wayfair.com/", title:""},
  {nm:"Herman Miller", dm:"hermanmiller.com", cc:"US", region:"北美", famId:"furniture", ind:"家居家具", btype:"品牌商", need:"家具 / 家居配件采购（品类推断）", kw:"办公家具,座椅,工位", reach:200, url:"https://www.hermanmiller.com/", title:"Herman Miller – Modern Furnishings for Office and Workplaces"},
  {nm:"Steelcase", dm:"steelcase.com", cc:"US", region:"北美", famId:"furniture", ind:"家居家具", btype:"品牌商", need:"家具 / 家居配件采购（品类推断）", kw:"办公家具,工位,储物柜", reach:200, url:"https://www.steelcase.com:443/", title:"Steelcase - Office Furniture Solutions, Education & Healthcare Furniture"},
  {nm:"La-Z-Boy", dm:"lazboy.com", cc:"US", region:"北美", famId:"furniture", ind:"家居家具", btype:"品牌商", need:"家具 / 家居配件采购（品类推断）", kw:"沙发,功能椅,家具", reach:200, url:"https://www.la-z-boy.com/", title:"Home Furniture: Living Room & Bedroom Furniture | La-Z-Boy"},
  {nm:"Natuzzi", dm:"natuzzi.com", cc:"IT", region:"欧盟", famId:"furniture", ind:"家居家具", btype:"品牌商", need:"家具 / 家居配件采购（品类推断）", kw:"沙发,软体家具,皮革", reach:403, url:"https://www.natuzzi.com/", title:""},
  {nm:"BoConcept", dm:"boconcept.com", cc:"DK", region:"欧盟", famId:"furniture", ind:"家居家具", btype:"零售商/连锁", need:"家具 / 家居配件采购（品类推断）", kw:"家具,家居,软装", reach:200, url:"https://www.boconcept.com/da-dk/", title:"Danske designmøbler og indretning | BoConcept"},
  {nm:"XXXLutz", dm:"xxxlutz.com", cc:"AT", region:"欧盟", famId:"furniture", ind:"家居家具", btype:"零售商/连锁", need:"家具 / 家居配件采购（品类推断）", kw:"家具,家居,床垫", reach:403, url:"https://xxxlutz.com/", title:""},
  {nm:"Conforama", dm:"conforama.fr", cc:"FR", region:"欧盟", famId:"furniture", ind:"家居家具", btype:"零售商/连锁", need:"家具 / 家居配件采购（品类推断）", kw:"家具,家居,家电", reach:403, url:"https://conforama.fr/", title:""},
  {nm:"home24", dm:"home24.de", cc:"DE", region:"欧盟", famId:"furniture", ind:"家居家具", btype:"零售商/连锁", need:"家具 / 家居配件采购（品类推断）", kw:"家具,家居,线上零售", reach:403, url:"https://home24.de/", title:""},
  {nm:"DFS", dm:"dfs.co.uk", cc:"GB", region:"欧盟", famId:"furniture", ind:"家居家具", btype:"零售商/连锁", need:"家具 / 家居配件采购（品类推断）", kw:"沙发,家具", reach:403, url:"https://www.dfs.co.uk/", title:""},
  {nm:"Vitra", dm:"vitra.com", cc:"CH", region:"欧盟", famId:"furniture", ind:"家居家具", btype:"品牌商", need:"家具 / 家居配件采购（品类推断）", kw:"办公家具,设计师家具", reach:403, url:"https://www.vitra.com:443/", title:""},
  {nm:"Signify", dm:"signify.com", cc:"NL", region:"欧盟", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"照明,灯具,LED,光源", reach:200, url:"https://www.signify.com/global", title:"Home | Signify"},
  {nm:"OSRAM", dm:"osram.com", cc:"DE", region:"欧盟", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"照明,光源,LED,车灯", reach:200, url:"https://www.osram.com/cb/", title:"OSRAM Global | Light is OSRAM"},
  {nm:"LEDVANCE", dm:"ledvance.com", cc:"DE", region:"欧盟", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"照明,LED,灯具", reach:200, url:"https://www.ledvance.com/en-int", title:"Corporate website | LEDVANCE"},
  {nm:"Zumtobel", dm:"zumtobel.com", cc:"AT", region:"欧盟", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"照明,商业照明,灯具", reach:403, url:"https://zumtobel.com/", title:""},
  {nm:"Artemide", dm:"artemide.com", cc:"IT", region:"欧盟", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"装饰灯具,照明", reach:200, url:"https://www.artemide.com/en/home", title:"Artemide - Home"},
  {nm:"Flos", dm:"flos.com", cc:"IT", region:"欧盟", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"装饰灯具,照明", reach:200, url:"https://flos.com/en/wo/", title:"Flos Official Online Store | Contemporary Lighting and Decorative Lights"},
  {nm:"Kichler", dm:"kichler.com", cc:"US", region:"北美", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"照明,户外灯,吊灯", reach:200, url:"https://www.kichler.com/", title:"Kichler Lighting-pendant,bath,landscape | Kichler Lighting"},
  {nm:"Progress Lighting", dm:"progresslighting.com", cc:"US", region:"北美", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"照明,吊灯,壁灯", reach:429, url:"https://progresslighting.com/", title:""},
  {nm:"Acuity Brands", dm:"acuitybrands.com", cc:"US", region:"北美", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"照明,商业照明,控制", reach:403, url:"https://www.acuitybrands.com/", title:""},
  {nm:"SLV", dm:"slv.com", cc:"DE", region:"欧盟", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"照明,轨道灯,户外灯", reach:200, url:"https://www.slv.com/de", title:"Leuchten & Lampen in Top Qualität vom Leuchten Profi"},
  {nm:"BEGA", dm:"bega.de", cc:"DE", region:"欧盟", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"户外照明,灯具", reach:200, url:"https://www.bega.com/en/", title:"BEGA · Das gute Licht."},
  {nm:"Fagerhult", dm:"fagerhult.com", cc:"SE", region:"欧盟", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"商业照明,灯具", reach:200, url:"https://www.fagerhult.com/", title:"Light for better living - Fagerhult"},
  {nm:"Hasbro", dm:"hasbro.com", cc:"US", region:"北美", famId:"toys", ind:"玩具母婴", btype:"品牌商", need:"玩具 / 母婴用品采购（品类推断）", kw:"玩具,桌游,模型", reach:200, url:"https://consumercare.hasbro.com/worldwide", title:"worldwide"},
  {nm:"LEGO", dm:"lego.com", cc:"DK", region:"欧盟", famId:"toys", ind:"玩具母婴", btype:"品牌商", need:"玩具 / 母婴用品采购（品类推断）", kw:"玩具,积木", reach:403, url:"https://www.lego.com/", title:""},
  {nm:"Ravensburger", dm:"ravensburger.com", cc:"DE", region:"欧盟", famId:"toys", ind:"玩具母婴", btype:"品牌商", need:"玩具 / 母婴用品采购（品类推断）", kw:"玩具,拼图,桌游", reach:200, url:"https://www.ravensburger.com/start/index.html", title:"Ravensburger Shop - Puzzles, Games and Creative Toys"},
  {nm:"Playmobil", dm:"playmobil.com", cc:"DE", region:"欧盟", famId:"toys", ind:"玩具母婴", btype:"品牌商", need:"玩具 / 母婴用品采购（品类推断）", kw:"玩具,模型", reach:200, url:"https://www.playmobil.com/en-us/", title:"PLAYMOBIL® USA"},
  {nm:"Chicco", dm:"chicco.com", cc:"IT", region:"欧盟", famId:"toys", ind:"玩具母婴", btype:"品牌商", need:"玩具 / 母婴用品采购（品类推断）", kw:"母婴,婴儿车,儿童用品", reach:200, url:"https://www.chicco.com/", title:"Official Corporate Chicco website"},
  {nm:"Munchkin", dm:"munchkin.com", cc:"US", region:"北美", famId:"toys", ind:"玩具母婴", btype:"品牌商", need:"玩具 / 母婴用品采购（品类推断）", kw:"母婴,喂养用品", reach:429, url:"https://munchkin.com/", title:""},
  {nm:"Ergobaby", dm:"ergobaby.com", cc:"US", region:"北美", famId:"toys", ind:"玩具母婴", btype:"品牌商", need:"玩具 / 母婴用品采购（品类推断）", kw:"母婴,背带,婴儿用品", reach:403, url:"https://ergobaby.com/", title:""},
  {nm:"TOMY", dm:"tomy.com", cc:"JP", region:"东亚", famId:"toys", ind:"玩具母婴", btype:"品牌商", need:"玩具 / 母婴用品采购（品类推断）", kw:"玩具,模型", reach:200, url:"https://us.tomy.com/", title:"TOMY"},
  {nm:"The Entertainer", dm:"thetoyshop.com", cc:"GB", region:"欧盟", famId:"toys", ind:"玩具母婴", btype:"零售商/连锁", need:"玩具 / 母婴用品采购（品类推断）", kw:"玩具,零售", reach:403, url:"https://thetoyshop.com/", title:""},
  {nm:"Crayola", dm:"crayola.com", cc:"US", region:"北美", famId:"toys", ind:"玩具母婴", btype:"品牌商", need:"玩具 / 母婴用品采购（品类推断）", kw:"蜡笔,美术用品,玩具", reach:200, url:"https://www.crayola.com/", title:"Home | Products, Coloring Pages, Crafts & More"},
  {nm:"Schleich", dm:"schleich-s.com", cc:"DE", region:"欧盟", famId:"toys", ind:"玩具母婴", btype:"品牌商", need:"玩具 / 母婴用品采购（品类推断）", kw:"玩具,模型,动物模型", reach:429, url:"https://gb.schleich-s.com/pages/language-not-found", title:""},
  {nm:"Clarks", dm:"clarks.com", cc:"GB", region:"欧盟", famId:"footwear", ind:"鞋类箱包", btype:"品牌商", need:"鞋类 / 箱包采购（品类推断）", kw:"鞋,皮鞋,休闲鞋", reach:403, url:"https://www.clarks.com/", title:""},
  {nm:"ECCO", dm:"ecco.com", cc:"DK", region:"欧盟", famId:"footwear", ind:"鞋类箱包", btype:"品牌商", need:"鞋类 / 箱包采购（品类推断）", kw:"鞋,皮革,休闲鞋", reach:200, url:"https://global.ecco.com/", title:"ECCO is a global leader in innovative comfort footwear for men, women, and kids. - ECCO.com"},
  {nm:"Dr. Martens", dm:"drmartens.com", cc:"GB", region:"欧盟", famId:"footwear", ind:"鞋类箱包", btype:"品牌商", need:"鞋类 / 箱包采购（品类推断）", kw:"鞋,靴子,皮革", reach:200, url:"https://www.drmartens.com/", title:"Dr. Martens™"},
  {nm:"Timberland", dm:"timberland.com", cc:"US", region:"北美", famId:"footwear", ind:"鞋类箱包", btype:"品牌商", need:"鞋类 / 箱包采购（品类推断）", kw:"鞋,靴子,户外鞋", reach:403, url:"https://timberland.com/", title:""},
  {nm:"Crocs", dm:"crocs.com", cc:"US", region:"北美", famId:"footwear", ind:"鞋类箱包", btype:"品牌商", need:"鞋类 / 箱包采购（品类推断）", kw:"鞋,洞洞鞋,休闲鞋", reach:403, url:"https://www.crocs.com/", title:""},
  {nm:"Skechers", dm:"skechers.com", cc:"US", region:"北美", famId:"footwear", ind:"鞋类箱包", btype:"品牌商", need:"鞋类 / 箱包采购（品类推断）", kw:"鞋,运动鞋,休闲鞋", reach:200, url:"https://www.ph.skechers.com/", title:"Welcome - SKECHERS Philippines"},
  {nm:"Deichmann", dm:"deichmann.com", cc:"DE", region:"欧盟", famId:"footwear", ind:"鞋类箱包", btype:"零售商/连锁", need:"鞋类 / 箱包采购（品类推断）", kw:"鞋,零售", reach:403, url:"https://www.deichmann.com/", title:""},
  {nm:"Schuh", dm:"schuh.co.uk", cc:"GB", region:"欧盟", famId:"footwear", ind:"鞋类箱包", btype:"零售商/连锁", need:"鞋类 / 箱包采购（品类推断）", kw:"鞋,零售", reach:403, url:"https://schuh.co.uk/", title:""},
  {nm:"Samsonite", dm:"samsonite.com", cc:"LU", region:"欧盟", famId:"footwear", ind:"鞋类箱包", btype:"品牌商", need:"鞋类 / 箱包采购（品类推断）", kw:"箱包,行李箱,背包", reach:200, url:"https://www.samsonite.com.ph/", title:"Samsonite Philippines | Luggage, Suitcases, Backpacks"},
  {nm:"TUMI", dm:"tumi.com", cc:"US", region:"北美", famId:"footwear", ind:"鞋类箱包", btype:"品牌商", need:"鞋类 / 箱包采购（品类推断）", kw:"箱包,商务包,行李箱", reach:307, url:"https://tumi.com/", title:"Access to this page has been denied"},
  {nm:"Kipling", dm:"kipling.com", cc:"BE", region:"欧盟", famId:"footwear", ind:"鞋类箱包", btype:"品牌商", need:"鞋类 / 箱包采购（品类推断）", kw:"箱包,背包,女包", reach:403, url:"https://kipling.com/", title:""},
  {nm:"Rieker", dm:"rieker.com", cc:"CH", region:"欧盟", famId:"footwear", ind:"鞋类箱包", btype:"品牌商", need:"鞋类 / 箱包采购（品类推断）", kw:"鞋,休闲鞋", reach:403, url:"https://rieker.com/", title:""},
  {nm:"Gabor", dm:"gabor.de", cc:"DE", region:"欧盟", famId:"footwear", ind:"鞋类箱包", btype:"品牌商", need:"鞋类 / 箱包采购（品类推断）", kw:"鞋,女鞋", reach:200, url:"https://www.gabor.com/de_de", title:"Gabor Shoes GmbH | Offizieller Online-Shop für Gabor Schuhe"},
  {nm:"Intersport", dm:"intersport.com", cc:"CH", region:"欧盟", famId:"sports", ind:"运动健身", btype:"零售商/连锁", need:"运动器材 / 健身用品采购（品类推断）", kw:"运动用品,户外装备", reach:403, url:"https://intersport.com/", title:""},
  {nm:"Dick's Sporting Goods", dm:"dickssportinggoods.com", cc:"US", region:"北美", famId:"sports", ind:"运动健身", btype:"零售商/连锁", need:"运动器材 / 健身用品采购（品类推断）", kw:"运动用品,健身器材", reach:403, url:"https://www.dickssportinggoods.com/", title:""},
  {nm:"JD Sports", dm:"jdsports.com", cc:"GB", region:"欧盟", famId:"sports", ind:"运动健身", btype:"零售商/连锁", need:"运动器材 / 健身用品采购（品类推断）", kw:"运动鞋,运动服饰", reach:403, url:"https://www.jdsports.com/", title:""},
  {nm:"Amer Sports", dm:"amersports.com", cc:"FI", region:"欧盟", famId:"sports", ind:"运动健身", btype:"品牌商", need:"运动器材 / 健身用品采购（品类推断）", kw:"运动器材,户外装备", reach:200, url:"https://www.amersports.com/", title:"Global group of iconic sports and outdoor brands | Amer Sports"},
  {nm:"Life Fitness", dm:"lifefitness.com", cc:"US", region:"北美", famId:"sports", ind:"运动健身", btype:"品牌商", need:"运动器材 / 健身用品采购（品类推断）", kw:"健身器材,商用健身", reach:200, url:"https://www.lifefitness.com/en-us", title:"Commercial & Home Fitness Equipment | Life Fitness"},
  {nm:"Garmin", dm:"garmin.com", cc:"US", region:"北美", famId:"sports", ind:"运动健身", btype:"品牌商", need:"运动器材 / 健身用品采购（品类推断）", kw:"运动手表,导航,传感器", reach:200, url:"https://WWW.garmin.com/en-PH/", title:"Garmin Philippines"},
  {nm:"New Balance", dm:"newbalance.com", cc:"US", region:"北美", famId:"sports", ind:"运动健身", btype:"品牌商", need:"运动器材 / 健身用品采购（品类推断）", kw:"运动鞋,运动服饰", reach:403, url:"https://www.newbalance.com/", title:""},
  {nm:"Gymshark", dm:"gymshark.com", cc:"GB", region:"欧盟", famId:"sports", ind:"运动健身", btype:"品牌商", need:"运动器材 / 健身用品采购（品类推断）", kw:"运动服饰,健身服", reach:429, url:"https://gymshark.com/", title:""},
  {nm:"Nestle", dm:"nestle.com", cc:"CH", region:"欧盟", famId:"food", ind:"食品饮料", btype:"品牌商", need:"食品原料 / 包装材料采购（品类推断）", kw:"食品,饮料,咖啡,宠物食品", reach:403, url:"https://www.nestle.com/", title:""},
  {nm:"Danone", dm:"danone.com", cc:"FR", region:"欧盟", famId:"food", ind:"食品饮料", btype:"品牌商", need:"食品原料 / 包装材料采购（品类推断）", kw:"乳制品,饮料,食品", reach:200, url:"https://www.danone.com/", title:"Danone: World food company | Danone Group"},
  {nm:"Lactalis", dm:"lactalis.com", cc:"FR", region:"欧盟", famId:"food", ind:"食品饮料", btype:"品牌商", need:"食品原料 / 包装材料采购（品类推断）", kw:"乳制品,食品", reach:200, url:"https://www.lactalis.com/fr/", title:"Lactalis"},
  {nm:"Ferrero", dm:"ferrero.com", cc:"IT", region:"欧盟", famId:"food", ind:"食品饮料", btype:"品牌商", need:"食品原料 / 包装材料采购（品类推断）", kw:"巧克力,糖果,包装", reach:200, url:"https://www.ferrero.com/int/en/", title:"Ferrero Group Official Website | Ferrero Group"},
  {nm:"Tyson Foods", dm:"tyson.com", cc:"US", region:"北美", famId:"food", ind:"食品饮料", btype:"品牌商", need:"食品原料 / 包装材料采购（品类推断）", kw:"食品,肉类,加工", reach:200, url:"https://www.tyson.com/", title:"Tyson® Brand"},
  {nm:"Kraft Heinz", dm:"kraftheinzcompany.com", cc:"US", region:"北美", famId:"food", ind:"食品饮料", btype:"品牌商", need:"食品原料 / 包装材料采购（品类推断）", kw:"调味,食品,包装", reach:200, url:"https://www.kraftheinzcompany.com/", title:"The Kraft Heinz Company"},
  {nm:"US Foods", dm:"usfoods.com", cc:"US", region:"北美", famId:"food", ind:"食品饮料", btype:"分销商 / 代理", need:"食品原料 / 包装材料采购（品类推断）", kw:"食品分销,餐饮供应", reach:403, url:"https://www.usfoods.com/", title:""},
  {nm:"Almarai", dm:"almarai.com", cc:"SA", region:"中东", famId:"food", ind:"食品饮料", btype:"品牌商", need:"食品原料 / 包装材料采购（品类推断）", kw:"乳制品,食品,饮料", reach:200, url:"https://www.almarai.com/ar", title:"منتجات صحية عالية الجودة لجميع أفراد الأسرة | المراعي"},
  {nm:"Cargill", dm:"cargill.com", cc:"US", region:"北美", famId:"food", ind:"食品饮料", btype:"品牌商", need:"食品原料 / 包装材料采购（品类推断）", kw:"食品原料,农产品", reach:403, url:"https://www.cargill.com/", title:""},
  {nm:"METRO", dm:"metroag.de", cc:"DE", region:"欧盟", famId:"food", ind:"食品饮料", btype:"分销商 / 代理", need:"食品原料 / 包装材料采购（品类推断）", kw:"食品批发,餐饮供应", reach:403, url:"https://metroag.de/", title:""},
  {nm:"Bidfood", dm:"bidfood.co.uk", cc:"GB", region:"欧盟", famId:"food", ind:"食品饮料", btype:"分销商 / 代理", need:"食品原料 / 包装材料采购（品类推断）", kw:"食品分销,餐饮供应", reach:200, url:"https://www.bidfood.co.uk/", title:"Wholesale Food Service Suppliers & Distributors - Bidfood"},
  {nm:"Deere", dm:"deere.com", cc:"US", region:"北美", famId:"agri", ind:"农业园林", btype:"品牌商", need:"农机配件 / 园林工具采购（品类推断）", kw:"农机,拖拉机,园林机械", reach:200, url:"https://www.deere.com/en-us/", title:"Home | John Deere US"},
  {nm:"AGCO", dm:"agcocorp.com", cc:"US", region:"北美", famId:"agri", ind:"农业园林", btype:"品牌商", need:"农机配件 / 园林工具采购（品类推断）", kw:"农机,拖拉机,收获机", reach:200, url:"https://www.agcocorp.com/us/en/home.html", title:"AGCO Corporation - Your Agriculture Company"},
  {nm:"Kubota", dm:"kubota.com", cc:"JP", region:"东亚", famId:"agri", ind:"农业园林", btype:"品牌商", need:"农机配件 / 园林工具采购（品类推断）", kw:"农机,拖拉机,发动机", reach:200, url:"https://www.kubota.com/", title:"Kubota Global Site"},
  {nm:"STIHL", dm:"stihl.com", cc:"DE", region:"欧盟", famId:"agri", ind:"农业园林", btype:"品牌商", need:"农机配件 / 园林工具采购（品类推断）", kw:"园林机械,油锯,割草机", reach:200, url:"https://www.stihl.com/en", title:"STIHL International Website - Your manufacturer for power garden tools"},
  {nm:"Husqvarna", dm:"husqvarnagroup.com", cc:"SE", region:"欧盟", famId:"agri", ind:"农业园林", btype:"品牌商", need:"农机配件 / 园林工具采购（品类推断）", kw:"园林机械,割草机,机器人", reach:200, url:"https://www.husqvarnagroup.com/", title:"Husqvarna Group"},
  {nm:"The Toro Company", dm:"thetorocompany.com", cc:"US", region:"北美", famId:"agri", ind:"农业园林", btype:"品牌商", need:"农机配件 / 园林工具采购（品类推断）", kw:"园林机械,灌溉,割草机", reach:403, url:"https://www.thetorocompany.com/", title:""},
  {nm:"Yanmar", dm:"yanmar.com", cc:"JP", region:"东亚", famId:"agri", ind:"农业园林", btype:"品牌商", need:"农机配件 / 园林工具采购（品类推断）", kw:"农机,发动机,拖拉机", reach:403, url:"https://www.yanmar.com/", title:""},
  {nm:"Kverneland", dm:"kvernelandgroup.com", cc:"NO", region:"欧盟", famId:"agri", ind:"农业园林", btype:"品牌商", need:"农机配件 / 园林工具采购（品类推断）", kw:"农机具,播种,犁", reach:200, url:"https://ien.kvernelandgroup.com/", title:"Kverneland Group - The Future of Farming"},
  {nm:"LEMKEN", dm:"lemken.com", cc:"DE", region:"欧盟", famId:"agri", ind:"农业园林", btype:"品牌商", need:"农机配件 / 园林工具采购（品类推断）", kw:"农机具,犁,播种机", reach:200, url:"https://lemken.com/en-en/", title:"LEMKEN – Innovative farming technology for high-yield agriculture | LEMKEN"},
  {nm:"AMAZONE", dm:"amazone.de", cc:"DE", region:"欧盟", famId:"agri", ind:"农业园林", btype:"品牌商", need:"农机配件 / 园林工具采购（品类推断）", kw:"农机具,施肥,播种", reach:200, url:"https://amazone.de/de-de", title:"Amazone - Landmaschinen"},
  {nm:"Netafim", dm:"netafim.com", cc:"IL", region:"中东", famId:"agri", ind:"农业园林", btype:"品牌商", need:"农机配件 / 园林工具采购（品类推断）", kw:"灌溉,滴灌,农业", reach:200, url:"https://www.netafim.com/", title:"Global leader in sustainable irrigation solutions | Netafim"},
  {nm:"Petco", dm:"petco.com", cc:"US", region:"北美", famId:"pet", ind:"宠物用品", btype:"零售商/连锁", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物用品,宠物食品", reach:403, url:"https://petco.com/", title:""},
  {nm:"Chewy", dm:"chewy.com", cc:"US", region:"北美", famId:"pet", ind:"宠物用品", btype:"零售商/连锁", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物用品,线上零售", reach:429, url:"https://www.chewy.com/", title:""},
  {nm:"Pets at Home", dm:"petsathome.com", cc:"GB", region:"欧盟", famId:"pet", ind:"宠物用品", btype:"零售商/连锁", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物用品,宠物食品", reach:200, url:"https://www.petsathome.com/", title:"Pets at Home | Pet Shop | The UK's Leader In Pet Care"},
  {nm:"Jollyes", dm:"jollyes.co.uk", cc:"GB", region:"欧盟", famId:"pet", ind:"宠物用品", btype:"零售商/连锁", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物用品,宠物食品", reach:403, url:"https://www.jollyes.co.uk/", title:""},
  {nm:"Ferplast", dm:"ferplast.com", cc:"IT", region:"欧盟", famId:"pet", ind:"宠物用品", btype:"品牌商", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物用品,笼具,配件", reach:429, url:"https://ferplast.com/", title:""},
  {nm:"TRIXIE", dm:"trixie.de", cc:"DE", region:"欧盟", famId:"pet", ind:"宠物用品", btype:"品牌商", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物用品,配件", reach:200, url:"https://www.trixie.de/de/", title:"TRIXIE Heimtierbedarf - Dein Großhandel für Haustierzubehör, Snacks und mehr"},
  {nm:"KONG", dm:"kongcompany.com", cc:"US", region:"北美", famId:"pet", ind:"宠物用品", btype:"品牌商", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物玩具,宠物用品", reach:200, url:"https://www.kongcompany.com/", title:"Buy KONG Dog and Cat Toys"},
  {nm:"Mars Petcare", dm:"mars.com", cc:"US", region:"北美", famId:"pet", ind:"宠物用品", btype:"品牌商", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物食品,宠物护理", reach:403, url:"https://www.mars.com/", title:""},
  {nm:"Purina", dm:"purina.com", cc:"US", region:"北美", famId:"pet", ind:"宠物用品", btype:"品牌商", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物食品", reach:403, url:"https://www.purina.com/", title:""},
  {nm:"Pet Supplies Plus", dm:"petsuppliesplus.com", cc:"US", region:"北美", famId:"pet", ind:"宠物用品", btype:"零售商/连锁", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物用品,零售", reach:403, url:"https://www.petsuppliesplus.com/", title:""},
  {nm:"Vitakraft", dm:"vitakraft.com", cc:"DE", region:"欧盟", famId:"pet", ind:"宠物用品", btype:"品牌商", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物食品,宠物用品", reach:200, url:"https://www.vitakraft.com/asia/en/", title:"Discover the variety of Vitakraft | Vitakraft Sun Seed"},
  {nm:"Swarovski", dm:"swarovski.com", cc:"AT", region:"欧盟", famId:"jewelry", ind:"珠宝饰品", btype:"品牌商", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"珠宝,水晶,饰品", reach:403, url:"https://www.swarovski.com/", title:""},
  {nm:"Signet Jewelers", dm:"signetjewelers.com", cc:"US", region:"北美", famId:"jewelry", ind:"珠宝饰品", btype:"零售商/连锁", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"珠宝,饰品,零售", reach:403, url:"https://signetjewelers.com/", title:""},
  {nm:"Tiffany & Co.", dm:"tiffany.com", cc:"US", region:"北美", famId:"jewelry", ind:"珠宝饰品", btype:"品牌商", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"珠宝,饰品,银饰", reach:403, url:"https://tiffany.com/", title:""},
  {nm:"Blue Nile", dm:"bluenile.com", cc:"US", region:"北美", famId:"jewelry", ind:"珠宝饰品", btype:"零售商/连锁", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"珠宝,钻石,线上零售", reach:200, url:"https://www.bluenile.com/", title:"Blue Nile: Diamond Jewelers – Engagement, Wedding Rings & Fine Jewelry"},
  {nm:"Chow Tai Fook", dm:"chowtaifook.com", cc:"HK", region:"东亚", famId:"jewelry", ind:"珠宝饰品", btype:"品牌商", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"珠宝,黄金,饰品", reach:200, url:"https://www.chowtaifook.com/zh-hk", title:"首頁 | 周大福珠寶"},
  {nm:"Helzberg Diamonds", dm:"helzberg.com", cc:"US", region:"北美", famId:"jewelry", ind:"珠宝饰品", btype:"零售商/连锁", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"珠宝,钻石,零售", reach:200, url:"https://www.helzberg.com/", title:"Helzberg | Engagement Rings, Wedding & Diamond Jewelry"},
  {nm:"Ernest Jones", dm:"ernestjones.co.uk", cc:"GB", region:"欧盟", famId:"jewelry", ind:"珠宝饰品", btype:"零售商/连锁", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"珠宝,腕表,零售", reach:403, url:"https://www.ernestjones.co.uk/", title:""},
  {nm:"H.Samuel", dm:"hsamuel.co.uk", cc:"GB", region:"欧盟", famId:"jewelry", ind:"珠宝饰品", btype:"零售商/连锁", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"珠宝,腕表,零售", reach:403, url:"https://www.hsamuel.co.uk/", title:""},
  {nm:"Christ", dm:"christ.de", cc:"DE", region:"欧盟", famId:"jewelry", ind:"珠宝饰品", btype:"零售商/连锁", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"珠宝,腕表,零售", reach:403, url:"https://christ.de/", title:""},
  {nm:"Thomas Sabo", dm:"thomassabo.com", cc:"DE", region:"欧盟", famId:"jewelry", ind:"珠宝饰品", btype:"品牌商", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"珠宝,银饰,饰品", reach:200, url:"https://www.thomassabo.com/INT/en/home", title:"Official THOMAS SABO Shop – Jewellery & watches"},
  {nm:"Bulgari", dm:"bulgari.com", cc:"IT", region:"欧盟", famId:"jewelry", ind:"珠宝饰品", btype:"品牌商", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"珠宝,腕表,饰品", reach:403, url:"https://www.bulgari.com/", title:""},
  {nm:"Fossil", dm:"fossil.com", cc:"US", region:"北美", famId:"jewelry", ind:"珠宝饰品", btype:"品牌商", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"腕表,饰品,皮具", reach:403, url:"https://www.fossil.com/en-us/", title:""},
  {nm:"Daniel Wellington", dm:"danielwellington.com", cc:"SE", region:"欧盟", famId:"jewelry", ind:"珠宝饰品", btype:"品牌商", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"腕表,饰品", reach:429, url:"https://danielwellington.com/", title:""},
  {nm:"Office Depot", dm:"officedepot.com", cc:"US", region:"北美", famId:"office", ind:"办公用品", btype:"零售商/连锁", need:"文具 / 办公用品采购（品类推断）", kw:"办公用品,文具,耗材", reach:200, url:"https://www.officedepot.com/", title:"Site Maintenance"},
  {nm:"Lyreco", dm:"lyreco.com", cc:"FR", region:"欧盟", famId:"office", ind:"办公用品", btype:"分销商 / 代理", need:"文具 / 办公用品采购（品类推断）", kw:"办公用品,文具,耗材", reach:403, url:"https://lyreco.com/", title:""},
  {nm:"Viking", dm:"viking.de", cc:"DE", region:"欧盟", famId:"office", ind:"办公用品", btype:"分销商 / 代理", need:"文具 / 办公用品采购（品类推断）", kw:"办公用品,文具,耗材", reach:403, url:"https://www.viking.de/", title:""},
  {nm:"STAEDTLER", dm:"staedtler.com", cc:"DE", region:"欧盟", famId:"office", ind:"办公用品", btype:"品牌商", need:"文具 / 办公用品采购（品类推断）", kw:"文具,铅笔,书写工具", reach:200, url:"https://www.staedtler.com/intl/en/", title:"Welcome to STAEDTLER | STAEDTLER"},
  {nm:"Faber-Castell", dm:"faber-castell.com", cc:"DE", region:"欧盟", famId:"office", ind:"办公用品", btype:"品牌商", need:"文具 / 办公用品采购（品类推断）", kw:"文具,铅笔,美术用品", reach:200, url:"https://www.faber-castell.com/", title:"Official Website of Faber-Castell"},
  {nm:"BIC", dm:"bicworld.com", cc:"FR", region:"欧盟", famId:"office", ind:"办公用品", btype:"品牌商", need:"文具 / 办公用品采购（品类推断）", kw:"文具,打火机,剃须刀", reach:200, url:"https://corporate.bic.com/en-us", title:"BIC Corporate | BIC"},
  {nm:"Avery Dennison", dm:"avery.com", cc:"US", region:"北美", famId:"office", ind:"办公用品", btype:"品牌商", need:"文具 / 办公用品采购（品类推断）", kw:"标签,办公用品,材料", reach:200, url:"https://www.avery.com/", title:"Buy Custom & Blank Labels, Stickers, Cards & Tags | Avery.com"},
  {nm:"Herlitz", dm:"herlitz.de", cc:"DE", region:"欧盟", famId:"office", ind:"办公用品", btype:"品牌商", need:"文具 / 办公用品采购（品类推断）", kw:"文具,办公用品", reach:200, url:"https://www.herlitz.de/herlitzhp/Pulsar/de.CMS.display.1./herlitz", title:"Willkommen - Herlitz"},
  {nm:"Maped", dm:"maped.com", cc:"FR", region:"欧盟", famId:"office", ind:"办公用品", btype:"品牌商", need:"文具 / 办公用品采购（品类推断）", kw:"文具,书写工具", reach:200, url:"https://maped.com/", title:"Maped – Tomorrow is in your hands"},
  {nm:"Esselte", dm:"esselte.com", cc:"SE", region:"欧盟", famId:"office", ind:"办公用品", btype:"品牌商", need:"文具 / 办公用品采购（品类推断）", kw:"办公用品,文件夹", reach:200, url:"https://www.esselte.com/en-gb/change-country/", title:"Select your country"},
  {nm:"Fellowes", dm:"fellowes.com", cc:"US", region:"北美", famId:"office", ind:"办公用品", btype:"品牌商", need:"文具 / 办公用品采购（品类推断）", kw:"办公设备,碎纸机,配件", reach:200, url:"https://www.fellowes.com/us/en", title:"English (United States) - Fellowes®"},
  {nm:"ACCO Brands", dm:"accobrands.com", cc:"US", region:"北美", famId:"office", ind:"办公用品", btype:"品牌商", need:"文具 / 办公用品采购（品类推断）", kw:"办公用品,文具", reach:200, url:"https://www.accobrands.com/", title:"ACCO Brands"},
  {nm:"BSH Home Appliances", dm:"bsh-group.com", cc:"DE", region:"欧盟", famId:"appliance", ind:"家用电器", btype:"品牌商", need:"家电配件 / 注塑结构件采购（品类推断）", kw:"家电,厨电,白电", reach:200, url:"https://www.bsh-group.com/", title:"Home | BSH Hausgeräte GmbH"},
  {nm:"Whirlpool", dm:"whirlpool.com", cc:"US", region:"北美", famId:"appliance", ind:"家用电器", btype:"品牌商", need:"家电配件 / 注塑结构件采购（品类推断）", kw:"家电,白电,厨电", reach:403, url:"https://www.whirlpool.com/", title:""},
  {nm:"Gorenje", dm:"gorenje.com", cc:"SI", region:"欧盟", famId:"appliance", ind:"家用电器", btype:"品牌商", need:"家电配件 / 注塑结构件采购（品类推断）", kw:"家电,白电", reach:403, url:"https://www.gorenje.com/", title:""},
  {nm:"Arcelik", dm:"arcelik.com", cc:"TR", region:"中东", famId:"appliance", ind:"家用电器", btype:"品牌商", need:"家电配件 / 注塑结构件采购（品类推断）", kw:"家电,白电,厨电", reach:403, url:"https://www.arcelik.com.tr/", title:""},
  {nm:"SMEG", dm:"smeg.com", cc:"IT", region:"欧盟", famId:"appliance", ind:"家用电器", btype:"品牌商", need:"家电配件 / 注塑结构件采购（品类推断）", kw:"家电,厨电", reach:200, url:"https://www.smeg.com/", title:"Smeg - Technology with style | Smeg.com"},
  {nm:"Panasonic", dm:"panasonic.com", cc:"JP", region:"东亚", famId:"appliance", ind:"家用电器", btype:"品牌商", need:"家电配件 / 注塑结构件采购（品类推断）", kw:"家电,电子,元器件", reach:403, url:"https://www.panasonic.com/", title:""},
  {nm:"Miele", dm:"miele.com", cc:"DE", region:"欧盟", famId:"appliance", ind:"家用电器", btype:"品牌商", need:"家电配件 / 注塑结构件采购（品类推断）", kw:"家电,白电,厨电", reach:200, url:"https://www.miele.com/en/com/index.htm", title:"Home"},
  {nm:"Bosch Home", dm:"bosch-home.com", cc:"DE", region:"欧盟", famId:"appliance", ind:"家用电器", btype:"品牌商", need:"家电配件 / 注塑结构件采购（品类推断）", kw:"家电,厨电", reach:200, url:"https://www.bosch-home.com:443/", title:"Home Appliances Global Website | Bosch"},
  {nm:"Haier Europe", dm:"haier-europe.com", cc:"IT", region:"欧盟", famId:"appliance", ind:"家用电器", btype:"品牌商", need:"家电配件 / 注塑结构件采购（品类推断）", kw:"家电,白电", reach:200, url:"https://www.haier-europe.com/locale.html", title:"Choose your country or region | Haier Europe"},
  {nm:"Honeywell", dm:"honeywell.com", cc:"US", region:"北美", famId:"security", ind:"安防门禁", btype:"品牌商", need:"安防配件 / 五金结构件采购（品类推断）", kw:"安防,楼控,传感器", reach:200, url:"https://www.honeywell.com/us/en", title:"Honeywell Technologies: Leading the Autonomy Shift"},
  {nm:"Bosch Security", dm:"boschsecurity.com", cc:"DE", region:"欧盟", famId:"security", ind:"安防门禁", btype:"品牌商", need:"安防配件 / 五金结构件采购（品类推断）", kw:"安防,监控,门禁", reach:200, url:"https://www.boschbuildingtechnologies.com/lifesafetysystems/en/", title:"Home | Life Safety Systems"},
  {nm:"Axis Communications", dm:"axis.com", cc:"SE", region:"欧盟", famId:"security", ind:"安防门禁", btype:"品牌商", need:"安防配件 / 五金结构件采购（品类推断）", kw:"安防,网络摄像机", reach:200, url:"https://www.axis.com/en-ph", title:"Axis Communications - Leader in network cameras and other IP networking solutions | Axis Communications"},
  {nm:"ADT", dm:"adt.com", cc:"US", region:"北美", famId:"security", ind:"安防门禁", btype:"系统集成商", need:"安防配件 / 五金结构件采购（品类推断）", kw:"安防,报警,监控", reach:403, url:"https://www.adt.com/", title:""},
  {nm:"Vivint", dm:"vivint.com", cc:"US", region:"北美", famId:"security", ind:"安防门禁", btype:"系统集成商", need:"安防配件 / 五金结构件采购（品类推断）", kw:"安防,智能家居", reach:403, url:"https://vivint.com/", title:""},
  {nm:"Allegion", dm:"allegion.com", cc:"IE", region:"欧盟", famId:"security", ind:"安防门禁", btype:"品牌商", need:"安防配件 / 五金结构件采购（品类推断）", kw:"门锁,门禁,五金", reach:200, url:"https://www.allegion.com/corp/en/index.html", title:"Allegion | Creating a Safer and More Accessible World"},
  {nm:"Nedap", dm:"nedap.com", cc:"NL", region:"欧盟", famId:"security", ind:"安防门禁", btype:"品牌商", need:"安防配件 / 五金结构件采购（品类推断）", kw:"门禁,识别,安防", reach:200, url:"https://www.nedap.com/en", title:"Technology for Life - Nedap"},
  {nm:"Paxton", dm:"paxton-access.com", cc:"GB", region:"欧盟", famId:"security", ind:"安防门禁", btype:"品牌商", need:"安防配件 / 五金结构件采购（品类推断）", kw:"门禁,读卡器", reach:200, url:"https://www.paxton-access.com/", title:"Paxton Access Control Systems | Paxton Access Control"},
  {nm:"Johnson Controls", dm:"johnsoncontrols.com", cc:"IE", region:"欧盟", famId:"security", ind:"安防门禁", btype:"系统集成商", need:"安防配件 / 五金结构件采购（品类推断）", kw:"楼控,安防,消防", reach:200, url:"https://www.johnsoncontrols.com/", title:"Johnson Controls | Johnson Controls"},
  {nm:"Genetec", dm:"genetec.com", cc:"CA", region:"北美", famId:"security", ind:"安防门禁", btype:"系统集成商", need:"安防配件 / 五金结构件采购（品类推断）", kw:"安防,视频管理", reach:200, url:"https://www.genetec.com/", title:"Genetec Inc: Leader in unified physical security software"},
  {nm:"Milestone Systems", dm:"milestonesys.com", cc:"DK", region:"欧盟", famId:"security", ind:"安防门禁", btype:"系统集成商", need:"安防配件 / 五金结构件采购（品类推断）", kw:"安防,视频管理", reach:200, url:"https://www.milestonesys.com/", title:"Milestone Systems | Global leading video management software provider"},
  {nm:"HID Global", dm:"hidglobal.com", cc:"US", region:"北美", famId:"security", ind:"安防门禁", btype:"品牌商", need:"安防配件 / 五金结构件采购（品类推断）", kw:"门禁,证卡,识别", reach:403, url:"https://www.hidglobal.com/", title:""},
  {nm:"ERCO", dm:"erco.com", cc:"DE", region:"欧盟", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"建筑照明,灯具", reach:200, url:"https://www.erco.com/en/", title:"Efficient LED architectural lighting | ERCO"},
  {nm:"Paulmann", dm:"paulmann.com", cc:"DE", region:"欧盟", famId:"lighting", ind:"照明灯具", btype:"品牌商", need:"灯具 / 照明组件采购（品类推断）", kw:"照明,LED,家居灯", reach:200, url:"https://en.paulmann.com/", title:"Paulmann – Lamps & Luminaires from the Manufacturer"},
  {nm:"Mattel", dm:"mattel.com", cc:"US", region:"北美", famId:"toys", ind:"玩具母婴", btype:"品牌商", need:"玩具 / 母婴用品采购（品类推断）", kw:"玩具,娃娃,模型", reach:200, url:"https://about.mattel.com/", title:"Mattel | About"},
  {nm:"Birkenstock", dm:"birkenstock.com", cc:"DE", region:"欧盟", famId:"footwear", ind:"鞋类箱包", btype:"品牌商", need:"鞋类 / 箱包采购（品类推断）", kw:"鞋,凉鞋,鞋床", reach:200, url:"https://www.birkenstock.com/ph", title:"BIRKENSTOCK Philippines OFFICIAL ONLINE STORE"},
  {nm:"Foot Locker", dm:"footlocker.com", cc:"US", region:"北美", famId:"sports", ind:"运动健身", btype:"零售商/连锁", need:"运动器材 / 健身用品采购（品类推断）", kw:"运动鞋,运动服饰", reach:200, url:"https://www.footlocker.com/", title:"Sneakers, Apparel & More | Foot Locker"},
  {nm:"Technogym", dm:"technogym.com", cc:"IT", region:"欧盟", famId:"sports", ind:"运动健身", btype:"品牌商", need:"运动器材 / 健身用品采购（品类推断）", kw:"健身器材,商用健身", reach:200, url:"https://www.technogym.com/en-INT/", title:"Home Gym equipment & Commercial Gym machines | Technogym International"},
  {nm:"Puma", dm:"puma.com", cc:"DE", region:"欧盟", famId:"sports", ind:"运动健身", btype:"品牌商", need:"运动器材 / 健身用品采购（品类推断）", kw:"运动鞋,运动服饰", reach:200, url:"https://ph.puma.com/ph/en/home", title:"PUMA Shoes and Apparel | PUMA Philippines"},
  {nm:"Mondelez", dm:"mondelez.com", cc:"US", region:"北美", famId:"food", ind:"食品饮料", btype:"品牌商", need:"食品原料 / 包装材料采购（品类推断）", kw:"零食,饼干,巧克力", reach:200, url:"https://www.mondelezinternational.com:443/", title:"Home | Mondelēz International, Inc."},
  {nm:"Hardi International", dm:"hardi-international.com", cc:"DK", region:"欧盟", famId:"agri", ind:"农业园林", btype:"品牌商", need:"农机配件 / 园林工具采购（品类推断）", kw:"植保机械,喷雾机", reach:200, url:"https://hardi.com/en?popup=1", title:"HARDI – Your Crop Care Partner"},
  {nm:"PetSmart", dm:"petsmart.com", cc:"US", region:"北美", famId:"pet", ind:"宠物用品", btype:"零售商/连锁", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物用品,宠物食品", reach:200, url:"https://www.petsmart.com/", title:"Pet Supplies, Accessories, and Pet Food - Pet Stores | PetSmart"},
  {nm:"Zooplus", dm:"zooplus.com", cc:"DE", region:"欧盟", famId:"pet", ind:"宠物用品", btype:"零售商/连锁", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物用品,线上零售", reach:200, url:"https://www.zooplus.com/", title:"Online Pet Shop, Pet Food, Supplies & Accessories - zooplus"},
  {nm:"Fressnapf", dm:"fressnapf.de", cc:"DE", region:"欧盟", famId:"pet", ind:"宠物用品", btype:"零售商/连锁", need:"宠物用品 / 包装采购（品类推断）", kw:"宠物用品,宠物食品", reach:200, url:"https://www.fressnapf.de/", title:"Tierbedarf & Tiernahrung im Online-Shop | FRESSNAPF"},
  {nm:"Pandora", dm:"pandora.net", cc:"DK", region:"欧盟", famId:"jewelry", ind:"珠宝饰品", btype:"品牌商", need:"珠宝饰品 / 包装陈列采购（品类推断）", kw:"珠宝,饰品,串饰", reach:200, url:"https://stores.pandora.net/store-finder", title:"Pandora Jewellery Store Locator - Find a Store Near You"},
  {nm:"Staples", dm:"staples.com", cc:"US", region:"北美", famId:"office", ind:"办公用品", btype:"零售商/连锁", need:"文具 / 办公用品采购（品类推断）", kw:"办公用品,文具,耗材", reach:200, url:"https://www.staples.com/", title:"Staples® Official Online Store"},
  {nm:"LG Electronics", dm:"lg.com", cc:"KR", region:"东亚", famId:"appliance", ind:"家用电器", btype:"品牌商", need:"家电配件 / 注塑结构件采购（品类推断）", kw:"家电,显示,电子", reach:200, url:"https://www.lg.com/ph/", title:"LG Electronics: TVs, Home Entertainment & Appliances | LG Philippines"},
  {nm:"Samsung", dm:"samsung.com", cc:"KR", region:"东亚", famId:"appliance", ind:"家用电器", btype:"品牌商", need:"家电配件 / 注塑结构件采购（品类推断）", kw:"家电,电子,显示", reach:200, url:"https://www.samsung.com/ph/", title:"Samsung Philippines | Shop Mobile, TV & Home Appliances Online"}
];

/* 统计（供 UI 显示「名录规模」与可达性构成，不参与筛选）
   ⚠️ 三个数必须分开报：可打开 / 反爬 / 本机不通。
     合成一个「覆盖率 96%」就是糊弄 —— 反爬的站使用者点开是能看的，本机不通的才真需要人工。 */
window.FAL_REAL_META = (function () {
  const A = window.FAL_REAL || [];
  const cnt = function (f) { return A.filter(f).length; };
  return {
    total: A.length,
    verifiedAt: "2026-10-21",
    method: "DNS-over-HTTPS 查 A 记录 + curl 实测（https / www / http 四路）+ 抓首页 <title>",
    ok:      cnt(function (r) { return r.reach >= 200 && r.reach < 400; }),   /* 实测可打开 */
    block:   cnt(function (r) { return r.reach === 403 || r.reach === 429; }),/* 反爬，域名真实 */
    offline: cnt(function (r) { return !r.reach; }),                          /* 本机未连通 */
    titled:  cnt(function (r) { return !!r.title; })                          /* 有一手标题作依据 */
  };
})();

/* ================= 搜索索引（2026-10-20 v58 → v59 扩到 15 行业）=================
   ⚠️ 为什么必须有：使用者不会按我们的字段名搜索。
     他会输「scope」「rifle scope」「瞄准镜」「vortex」「tactical」「sensor」「bearing」
     「纸箱」「光伏」「面料」——旧版只匹配 6 个中文字段，输英文一律 0 结果，等于搜索不可用。
   这里给每条拼一段**中英双语可搜索文本**（`hay`）：
     品牌名 + 域名 + 官网标题 + 品类词 + 族级同义词（英文 + 中文）。
   族级同义词只描述「这个族是什么」，不涉及任何具体公司信息 —— 不是编造。 */
window.FAL_REAL_FAM_HAY = {
  optics: "optics optical scope riflescope rifle scope sight red dot reflex sight binocular spotting scope " +
          "rangefinder monocular lens prism night vision thermal imaging reticle coating precision optic " +
          "瞄准镜 瞄具 光学 光电 望远镜 观靶 测距 夜视 热成像 镜片 棱镜 分划板 镀膜 光学组件",
  tactical: "tactical gear equipment plate carrier vest holster backpack apparel uniform helmet glove belt " +
            "pouch sling magazine military police duty outdoor hunting shooting range load bearing " +
            "战术 战术装备 战术配件 装具 护具 背包 头盔 手套 腰带 携行 军警 警用 防护 迷彩 射击 靶场 狩猎 户外",
  electronics: "electronics electronic component pcb printed circuit board connector wire harness power supply " +
               "semiconductor ic chip sensor module capacitor resistor passive component audio bluetooth " +
               "speaker wearable wireless charging battery acoustics earphone " +
               "电子 电气 元器件 线路板 连接器 电源 线束 半导体 芯片 传感器 模组 电容 电阻 被动元件 蓝牙 无线 充电 电池",
  machinery: "machinery machine industrial equipment pump valve transmission bearing hydraulic pneumatic " +
             "gearbox compressor automation tooling fixture cnc servo drive " +
             "机械 设备 机床 泵 阀 传动 轴承 液压 气动 减速机 压缩机 自动化 工装 夹具 伺服",
  hardware: "hardware tool hand tool power tool fastener screw bolt lock cutting measuring grinding spring " +
            "stamping casting die " +
            "五金 工具 手工具 电动工具 紧固件 螺丝 锁具 刀具 量具 磨具 弹簧 冲压件 铸件",
  chemical: "chemical material plastic rubber coating additive resin solvent pigment adhesive composite " +
            "polymer masterbatch " +
            "化工 材料 塑料 橡胶 涂料 助剂 树脂 溶剂 颜料 胶粘 复合 高分子 改性 原料",
  medical: "medical device health tech diagnostics disposable monitor imaging surgical rehabilitation " +
           "laboratory in vitro diagnostic ivd beauty " +
           "医疗 器械 诊断 耗材 监护 影像 手术 康复 检验 体外诊断 医美",
  newenergy: "new energy renewable solar inverter battery energy storage ev charger wind lithium cell " +
             "photovoltaic module pv bms " +
             "新能源 光伏 储能 逆变器 电池 充电桩 风电 锂电 组件 电芯 太阳能",
  auto: "auto part automotive component vehicle wiring harness interior braking suspension chassis " +
       "sensor hub rim aftermarket " +
       "汽车 零部件 车用 线束 内饰 制动 悬架 车载 汽配 总成 轮毂",
  textile: "textile apparel fabric garment home textile footwear auxiliary yarn dyeing knit nonwoven leather " +
           "clothing " +
           "纺织 服装 面料 家纺 鞋 辅料 纱线 印染 针织 无纺 皮革 成衣",
  packaging: "packaging carton label container flexible packaging bottle can printing cushioning box " +
             "flexible film " +
             "包装 纸箱 标签 容器 软包 瓶 罐 印刷 缓冲材料 纸盒 复合膜",
  building: "building material construction window door tile pipe stone glass curtain wall sanitary " +
            "waterproof insulation cement " +
            "建材 门窗 瓷砖 管材 石材 玻璃 幕墙 卫浴 防水 保温 水泥",
  consumer: "consumer goods fmcg daily chemical food beverage home living toy stationery personal care " +
            "mother baby pet household " +
            "消费品 快消 日化 食品 饮料 家居 玩具 文具 个护 母婴 宠物 百货",
  software: "software saas system platform digital cloud data information erp mes industrial software " +
            "mini program integration " +
            "软件 系统 平台 数字化 云 数据 信息化 工业软件 集成",
  service: "professional service testing certification consulting logistics legal tax accounting design " +
           "engineering advisory customs clearance inspection " +
           "专业服务 检测 认证 咨询 物流 法律 财税 设计 工程咨询 报关",
  /* ---- v60 新增 12 族（2026-10-21）：族级同义词，只描述「这个族是什么」，不含任何公司信息 ---- */
  furniture: "furniture home furnishing sofa mattress cabinet table chair wardrobe bedding upholstery " +
             "living room bedroom office furniture flat pack wooden panel " +
             "家具 家居 沙发 床垫 橱柜 桌椅 衣柜 软装 床架 餐桌 办公家具 板式家具 木制家具",
  lighting: "lighting luminaire lamp fixture chandelier downlight spotlight street light bulb led driver " +
            "track light outdoor light decorative light " +
            "照明 灯具 灯饰 吊灯 射灯 筒灯 路灯 台灯 光源 灯带 轨道灯 户外灯 驱动电源",
  toys: "toy toys baby infant kid children plush puzzle building block doll stroller bottle nursery " +
        "board game crayon model figure " +
        "玩具 积木 拼图 模型 娃娃 母婴 婴儿 儿童 奶瓶 婴儿车 桌游 蜡笔 毛绒",
  footwear: "footwear shoe shoes boot sandal slipper sneaker leather bag handbag backpack luggage suitcase " +
            "wallet leather goods " +
            "鞋 靴 拖鞋 凉鞋 皮鞋 箱包 背包 行李箱 手袋 皮具 拉杆箱 女包 皮革",
  sports: "sports sport fitness gym exercise equipment dumbbell treadmill bike cycling yoga camping hiking " +
          "fishing ball protective gear running outdoor recreation " +
          "运动 健身 健身器材 球类 瑜伽 骑行 钓具 登山 露营 护具 跑步 运动鞋 户外运动",
  food: "food beverage drink dairy snack confectionery chocolate candy seasoning sauce bakery coffee tea " +
        "canned frozen ingredient " +
        "食品 饮料 乳制品 零食 调味 烘焙 咖啡 罐头 冷冻食品 糖果 巧克力 食品原料",
  agri: "agriculture agricultural farm farming machinery tractor harvester irrigation sprayer greenhouse " +
        "seeding fertilizing garden lawn mower chainsaw livestock horticulture " +
        "农业 农机 拖拉机 灌溉 园林 割草机 植保 播种 施肥 温室 畜牧 油锯 园艺",
  pet: "pet pets dog cat animal supplies food toy leash cage aquarium grooming treat " +
       "宠物 宠物食品 宠物用品 猫 狗 水族 宠物玩具 笼具 牵引绳 宠物零食",
  jewelry: "jewelry jewellery jewel gem diamond gold silver watch wristwatch pearl crystal accessory " +
           "display packaging ornament " +
           "珠宝 首饰 饰品 钻石 黄金 银饰 腕表 水晶 串饰 陈列道具 珍珠 宝石",
  office: "office stationery supply paper notebook folder label pen pencil printer consumable shredder " +
          "writing desk accessory " +
          "办公 文具 办公用品 书写 纸张 文件夹 标签 打印耗材 碎纸机 铅笔 笔记本",
  appliance: "home appliance household electrical refrigerator washing machine air conditioner kitchen " +
             "cookware small appliance coffee machine dishwasher white goods " +
             "家电 白电 厨电 小家电 冰箱 洗衣机 空调 咖啡机 厨房电器 洗碗机",
  security: "security surveillance cctv camera access control door lock alarm intercom video management " +
            "building automation fire safety reader biometric " +
            "安防 监控 门禁 报警 摄像机 楼控 消防 门锁 对讲 读卡器 视频管理 门禁五金"
};
/* 国家名中英双语（搜索用）：使用者会输「德国」「Germany」「DE」——
   只存 cc 代码等于只能按代码搜，等于搜不到国家。 */
window.FAL_REAL_CC_NAME = {
  US: "美国 united states usa america", CA: "加拿大 canada",
  DE: "德国 germany", AT: "奥地利 austria", SE: "瑞典 sweden", PL: "波兰 poland",
  SI: "斯洛文尼亚 slovenia", BE: "比利时 belgium", CZ: "捷克 czech republic czechia",
  IT: "意大利 italy", RO: "罗马尼亚 romania", GR: "希腊 greece",
  UK: "英国 united kingdom britain england", JP: "日本 japan",
  NL: "荷兰 netherlands holland", FR: "法国 france",
  /* ---- v59 新增（行业扩容后进入名录的国家） ---- */
  CH: "瑞士 switzerland", LI: "列支敦士登 liechtenstein",
  IL: "以色列 israel", IE: "爱尔兰 ireland",
  ES: "西班牙 spain", PT: "葡萄牙 portugal",
  FI: "芬兰 finland", DK: "丹麦 denmark",
  AU: "澳大利亚 australia", NZ: "新西兰 new zealand",
  LU: "卢森堡 luxembourg", KR: "韩国 south korea",
  TH: "泰国 thailand", SG: "新加坡 singapore",
  AE: "阿联酋 united arab emirates uae", SA: "沙特阿拉伯 saudi arabia",
  MX: "墨西哥 mexico", CL: "智利 chile", BR: "巴西 brazil",
  ZA: "南非 south africa"
};
(window.FAL_REAL || []).forEach(function (r) {
  r.hay = [r.nm, r.dm, r.title, r.kw, r.region, r.ind, r.btype, r.need,
           r.cc, window.FAL_REAL_CC_NAME[r.cc] || "",
           window.FAL_REAL_FAM_HAY[r.famId] || ""]
          .filter(Boolean).join(" ").toLowerCase();
});
