/* ================= 真实企业名录（光学 / 战术装备）=================
   2026-10-20 v58：用户质疑「连最基本的搜索都做不到，给的网址根本连不上」。

   旧版问题（已推翻）：`genLeads()` 用 `PRE × suf` 确定性拼接公司名与域名，
   2026-10-20 实测 10/10 NXDOMAIN —— 全是编的。已改为本文件：**真实注册、真实可达的企业**。

   ⚠️ 本文件的数据是怎么来的（每条都可复核，脚本见 scripts/verify_real_domains.js）：
     ① 域名真实性：Google DNS-over-HTTPS 查询 A 记录，Status=0 才算「真实注册」；
     ② 可达性：curl 依次实测 https / https+www / http / http+www **四路**（跟随重定向），
        记录**真正打开的那条 URL** 与 HTTP 状态码 —— 因为不少站只开 http，或必须带 www，
        一律拼 `https://` 点开就是死链；
     ③ 官网标题：curl 抓首页 <title>，作为「命中依据」的一手出处；
     ④ 国家 / 品类 / 采购方类型：公开品牌归属，属行业常识，不涉及个人数据。
   ⚠️ 边界：
     · 只有 L1 公开信息（公司 / 官网 / 国家）。**没有任何 L2/L3 联系方式** —— 平台不抓取、不推断。
     · `need` 统一为「品类推断」模板（只两档：光学 / 战术），具体做什么看 `title`（官网原文标题）。
     · 「命中依据」不存中文长句，改由 `title` + `reach` 现场拼装 → 可翻译、可复核、可复跑。
     · `reach` 为实测状态：200/301 = 可打开；403/429 = 站点反爬（域名真实，需人工打开）；
       0 = 本机网络未连通（域名 DNS 仍真实，需人工核验）。
     · `url` = **实测真正能打开的那条 URL**（可能是 http:// 或带 www），点开就是能开，不是拼出来的。
   ⚠️ 2026-10-20 复核时剔除 / 修正的条目（诚实记录，不藏）：
     · 剔除 Direct Action：directaction.info 已被他人抢注，实测跳转到 unoffensiveanimal.is（无关站点），
       其余候选域名全部无响应 —— 无法确认真实官网就不进名单。
     · 修正 KITE OPTICS：kiteoptics.be 无 A 记录响应，改为 kiteoptics.com（实测 200）。
     · 识别并排除「网关拦截页」：本机 DNS 被劫持时 curl 会返回一个 200 的过滤页
       （1.1.1.2/urlfilter），这种 200 是假可达，一律判 0，不给使用者假链接。
   ⚠️ 不含中国同业厂商（维特 / 同类出口商）—— 那是竞争者，不是采购方。 */

window.FAL_REAL = [
  {nm:"Vortex Optics", dm:"vortexoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://vortexoptics.com/", title:"Vortex Optics"},
  {nm:"Leupold & Stevens", dm:"leupold.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:0, url:"https://leupold.com", title:""},
  {nm:"Nightforce Optics", dm:"nightforceoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.nightforceoptics.com/", title:"Nightforce Optics | Rugged, Reliable, Repeatable, Optics"},
  {nm:"Schmidt & Bender", dm:"schmidt-bender.de", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.schmidtundbender.de/", title:"Schmidt & Bender"},
  {nm:"KAHLES", dm:"kahles.at", cc:"AT", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.kahles.at/en/", title:"KAHLES: Home EN"},
  {nm:"SWAROVSKI OPTIK", dm:"swarovskioptik.com", cc:"AT", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:200, url:"https://www.swarovskioptik.com/at/en/hunting", title:"SWAROVSKI OPTIK"},
  {nm:"ZEISS", dm:"zeiss.com", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:200, url:"https://www.zeiss.com/corporate/en/home.html", title:"Solutions to shape the future | ZEISS"},
  {nm:"Steiner-Optics", dm:"steiner-optics.com", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.steiner-optics.com/", title:"Optics for Hunting, Tactical, Marine, Adventure | Steiner High-Quality Optics"},
  {nm:"STEINER (DE)", dm:"steiner.de", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.steiner.de/", title:"STEINER - Ferngläser, Zielfernrohre und Visiere"},
  {nm:"Meopta", dm:"meopta.com", cc:"CZ", region:"欧盟", famId:"optics", ind:"光学光电", btype:"制造商 (OEM/ODM)",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:200, url:"https://www.meopta.com/en/", title:"Home | Meopta :: Better view of the world"},
  {nm:"MARCH Scopes", dm:"marchscopes.com", cc:"JP", region:"东亚", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://marchscopes.com/", title:"MARCH Scopes Official Global Site"},
  {nm:"Sightron", dm:"sightron.com", cc:"JP", region:"东亚", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:0, url:"https://sightron.com", title:""},
  {nm:"Athlon Optics", dm:"athlonoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://athlonoptics.com/", title:"Home - Athlon Optics"},
  {nm:"Burris Optics", dm:"burrisoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.burrisoptics.com/", title:"Burris Optics | Burris Optics"},
  {nm:"Bushnell", dm:"bushnell.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:429, url:"https://bushnell.com/", title:""},
  {nm:"Trijicon", dm:"trijicon.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.trijicon.com/", title:"Innovative Rifle Scopes, Night Sights, Red Dots & Electro Optics | Trijicon®"},
  {nm:"Aimpoint", dm:"aimpoint.com", cc:"SE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄具", reach:403, url:"https://aimpoint.com/", title:""},
  {nm:"EOTech", dm:"eotechinc.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄具", reach:429, url:"https://eotechinc.com/", title:""},
  {nm:"Holosun Technologies", dm:"holosun.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄具", reach:200, url:"https://www.holosun.com/", title:"Holosun Technologies, Red Dot Sights, Lasers & Weaponlights"},
  {nm:"Primary Arms", dm:"primaryarms.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"分销商 / 代理",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.primaryarms.com/", title:"AR-15 Parts & Accessories | Firearms & Optics | Primary Arms"},
  {nm:"US Optics", dm:"usoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.usoptics.com/", title:"US Optics | Dynamic Targeting Solutions"},
  {nm:"Maven", dm:"mavenbuilt.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:429, url:"https://mavenbuilt.com/", title:""},
  {nm:"TRACT Optics", dm:"tractoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:403, url:"https://tractoptics.com/", title:""},
  {nm:"Riton Optics", dm:"ritonoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://ritonoptics.com/", title:"Riton Optics - See The Difference"},
  {nm:"Crimson Trace", dm:"crimsontrace.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄具", reach:200, url:"https://www.crimsontrace.com/", title:"Crimson Trace | Leaders in Firearms Optics"},
  {nm:"SIG SAUER", dm:"sigsauer.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄具", reach:403, url:"https://sigsauer.com/", title:""},
  {nm:"Hawke Optics", dm:"hawkeoptics.com", cc:"UK", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:403, url:"https://hawkeoptics.com/", title:""},
  {nm:"Element Optics", dm:"element-optics.com", cc:"UK", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://global.element-optics.com/", title:"Element Optics - Premium Quality Riflescopes & Optics"},
  {nm:"Delta Optical", dm:"deltaoptical.pl", cc:"PL", region:"欧盟", famId:"optics", ind:"光学光电", btype:"分销商 / 代理",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:200, url:"https://deltaoptical.pl/", title:"Największy sklep ze sprzętem obserwacyjnym w Polsce - Teleskopy, lornetki, mikroskopy, noktowizja, termowizja"},
  {nm:"DDoptics", dm:"ddoptics.de", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.ddoptics.de/", title:"Ferngläser, Zielfernrohre, Spektive & Wärmebildgeräte für Jagd & Natur | DDoptics"},
  {nm:"GPO (German Precision Optics)", dm:"gpo-usa.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://gpo-usa.com/", title:"GPO USA | High-Quality Optics & Riflescopes Made in USA"},
  {nm:"MINOX", dm:"minox.com", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:200, url:"https://www.minox.com/de/", title:"Entdecke die Welt der Jagdoptik"},
  {nm:"KITE OPTICS", dm:"kiteoptics.com", cc:"BE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:200, url:"https://kiteoptics.com/en/", title:"KITE OPTICS — Home of Belgian innovative optics"},
  {nm:"IOR (Industria Optica Romana)", dm:"ior.ro", cc:"RO", region:"欧盟", famId:"optics", ind:"光学光电", btype:"制造商 (OEM/ODM)",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:0, url:"https://ior.ro", title:""},
  {nm:"Tangent Theta", dm:"tangenttheta.com", cc:"CA", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:429, url:"https://armament.com/pages/about-tangent-theta", title:""},
  {nm:"Arken Optics", dm:"arkenoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:429, url:"https://arkenoptics.com/", title:""},
  {nm:"Swampfox Optics", dm:"swampfoxoptics.com", cc:"US", region:"北美", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.swampfoxoptics.com/", title:"Swampfox Tactical Optics: Clear, Precise, Tough"},
  {nm:"NOBLEX", dm:"noblex.de", cc:"DE", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"光学", reach:429, url:"https://noblex-e-optics.com/", title:""},
  {nm:"Konus", dm:"konus.com", cc:"IT", region:"欧盟", famId:"optics", ind:"光学光电", btype:"品牌商",
   need:"瞄准镜 / 光学组件采购（品类推断）", kw:"瞄准镜", reach:200, url:"https://www.konus.com/", title:"Konus - Ottiche Caccia, Tiro, Outdoor, Abbigliamento e Scienza"},
  {nm:"Magpul Industries", dm:"magpul.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://magpul.com/", title:"Magpul - High-Quality Firearms Accessories & Tactical Gear"},
  {nm:"5.11 Tactical", dm:"511tactical.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.511tactical.com/", title:"5.11 | Performance Apparel & Gear for Work, Training & Life"},
  {nm:"Blackhawk", dm:"blackhawk.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://blackhawk.com/", title:""},
  {nm:"Safariland", dm:"safariland.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://safariland.com/", title:""},
  {nm:"Crye Precision", dm:"cryeprecision.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.cryeprecision.com/", title:"Crye Precision"},
  {nm:"Blue Force Gear", dm:"blueforcegear.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://blueforcegear.com/", title:"Blue Force Gear - Made in the USA"},
  {nm:"High Speed Gear", dm:"highspeedgear.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://highspeedgear.com/", title:""},
  {nm:"Tactical Tailor", dm:"tacticaltailor.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://tacticaltailor.com/", title:"Tactical Tailor"},
  {nm:"Maxpedition", dm:"maxpedition.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://maxpedition.com/", title:""},
  {nm:"Vertx", dm:"vertx.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://vertx.com/", title:""},
  {nm:"Helikon-Tex", dm:"helikon-tex.com", cc:"PL", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://helikon-tex.com/en/", title:"Tactical, Military & Outdoor Gear – Official Online Store | Helikon-Tex"},
  {nm:"Clawgear", dm:"clawgear.com", cc:"AT", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.clawgear.com/", title:"Clawgear | Premium Military Equipment"},
  {nm:"UF PRO", dm:"ufpro.com", cc:"SI", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://ufpro.com/", title:"UF PRO | Tactical Gear for Professionals | ufpro.com"},
  {nm:"Lindnerhof", dm:"lindnerhof-taktik.de", cc:"DE", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://lindnerhof-taktik.de/", title:"Home | Lindnerhof"},
  {nm:"Tasmanian Tiger", dm:"tasmaniantiger.info", cc:"DE", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.tasmaniantiger.info/en/", title:"Tasmanian Tiger - Military & Police Equipment"},
  {nm:"Pentagon Tactical", dm:"pentagon-tactical.com", cc:"GR", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:403, url:"https://pentagon-tactical.com/", title:""},
  {nm:"Mechanix Wear", dm:"mechanix.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.mechanix.com/us-en/", title:"Work Gloves | Mechanix Wear"},
  {nm:"Wiley X", dm:"wileyx.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://wileyx.com/", title:""},
  {nm:"ESS Eye Pro", dm:"esseyepro.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://esseyepro.com/", title:"ESS Eye Pro - Ballistic Goggles - Ballistic Sunglasses - Military Eyewear - Eye Protection - Shooting Glasses | ESS EyeP"},
  {nm:"Sordin", dm:"sordin.se", cc:"SE", region:"欧盟", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://www.sordin.com/", title:""},
  {nm:"Gentex Corporation", dm:"gentexcorp.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"制造商 (OEM/ODM)",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.gentexcorp.com/", title:"Gentex Corporation | Advanced Personal Protection Solutions"},
  {nm:"Team Wendy", dm:"teamwendy.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.teamwendy.com/", title:"Superior helmet systems for those who risk their lives"},
  {nm:"Condor Outdoor", dm:"condoroutdoor.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://condoroutdoor.com/", title:""},
  {nm:"Esstac", dm:"esstac.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://esstac.com/", title:"Esstac"},
  {nm:"Velocity Systems", dm:"velocitysystems.net", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.velocitysystems.net/", title:""},
  {nm:"Eberlestock", dm:"eberlestock.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://eberlestock.com/", title:""},
  {nm:"Kifaru", dm:"kifaru.net", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:429, url:"https://kifaru.net/", title:""},
  {nm:"Mystery Ranch", dm:"mysteryranch.com", cc:"US", region:"北美", famId:"tactical", ind:"户外装备", btype:"品牌商",
   need:"战术装具 / 配件采购（品类推断）", kw:"战术装备", reach:200, url:"https://www.mysteryranch.com/", title:"MYSTERY RANCH Backpacks | Built for the Mission"}
];

/* 统计（供 UI 显示「名录规模」与可达性构成，不参与筛选）
   ⚠️ 三个数必须分开报：可打开 / 反爬 / 本机不通。
     合成一个「覆盖率 96%」就是糊弄 —— 反爬的站使用者点开是能看的，本机不通的才真需要人工。 */
window.FAL_REAL_META = (function () {
  const A = window.FAL_REAL || [];
  const cnt = function (f) { return A.filter(f).length; };
  return {
    total: A.length,
    verifiedAt: "2026-10-20",
    method: "DNS-over-HTTPS 查 A 记录 + curl 实测（https / www / http 四路）+ 抓首页 <title>",
    ok:      cnt(function (r) { return r.reach >= 200 && r.reach < 400; }),   /* 实测可打开 */
    block:   cnt(function (r) { return r.reach === 403 || r.reach === 429; }),/* 反爬，域名真实 */
    offline: cnt(function (r) { return !r.reach; }),                          /* 本机未连通 */
    titled:  cnt(function (r) { return !!r.title; })                          /* 有一手标题作依据 */
  };
})();

/* ================= 搜索索引（2026-10-20 v58）=================
   ⚠️ 为什么必须有：使用者不会按我们的字段名搜索。
     他会输「scope」「rifle scope」「瞄准镜」「vortex」「tactical」——
     旧版只匹配 6 个中文字段，输英文一律 0 结果，等于搜索不可用。
   这里给每条拼一段**中英双语可搜索文本**（`hay`）：
     品牌名 + 域名 + 官网标题 + 品类词 + 族级同义词（英文 + 中文）。
   族级同义词只描述「这个族是什么」，不涉及任何具体公司信息 —— 不是编造。 */
window.FAL_REAL_FAM_HAY = {
  optics: "optics optical scope riflescope rifle scope sight red dot reflex sight binocular spotting scope " +
          "rangefinder monocular lens prism night vision thermal imaging reticle coating precision optic " +
          "瞄准镜 瞄具 光学 光电 望远镜 观靶 测距 夜视 热成像 镜片 棱镜 分划板 镀膜 光学组件",
  tactical: "tactical gear equipment plate carrier vest holster backpack apparel uniform helmet glove belt " +
            "pouch sling magazine military police duty outdoor hunting shooting range load bearing " +
            "战术 战术装备 战术配件 装具 护具 背包 头盔 手套 腰带 携行 军警 警用 防护 迷彩 射击 靶场 狩猎 户外"
};
/* 国家名中英双语（搜索用）：使用者会输「德国」「Germany」「DE」——
   只存 cc 代码等于只能按代码搜，等于搜不到国家。 */
window.FAL_REAL_CC_NAME = {
  US: "美国 united states usa america", CA: "加拿大 canada",
  DE: "德国 germany", AT: "奥地利 austria", SE: "瑞典 sweden", PL: "波兰 poland",
  SI: "斯洛文尼亚 slovenia", BE: "比利时 belgium", CZ: "捷克 czech republic czechia",
  IT: "意大利 italy", RO: "罗马尼亚 romania", GR: "希腊 greece",
  UK: "英国 united kingdom britain england", JP: "日本 japan",
  NL: "荷兰 netherlands holland", FR: "法国 france"
};
(window.FAL_REAL || []).forEach(function (r) {
  r.hay = [r.nm, r.dm, r.title, r.kw, r.region, r.ind, r.btype, r.need,
           r.cc, window.FAL_REAL_CC_NAME[r.cc] || "",
           window.FAL_REAL_FAM_HAY[r.famId] || ""]
          .filter(Boolean).join(" ").toLowerCase();
});
