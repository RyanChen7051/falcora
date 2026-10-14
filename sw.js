/* FALCORA 获客通AI — Service Worker v34
   · HTML / 导航：网络优先（在线时永远取最新），离线回退缓存
   · 静态资源：缓存优先 + 后台更新（stale-while-revalidate，兜底防「改了没生效」）
   · 支持页面主动发 SKIP_WAITING 立即切换新版本
   · v23：**「加入管线」升级为跨页商机状态**（原设计只是内存 Set，刷新即丢、④ 页看不到）。
         · ② 页新增 `falcora_pipeline_v1`（按域名索引）。⚠️ **只存业务主体标识**
           （公司名 / 域名 / 区域 / 行业 / 采购方类型 / 需求品类 / 命中关键词 / 来源 / 时间戳），
           **绝不存任何 L3 个人联系方式** —— 那些仍只在 `falcora_contacts_v1` 里、只由使用者自备。
         · ② 页 `state.added` 由 `loadPipe()` 初始化 → **刷新后「已加入」不再丢**；
           「加入管线」与名片建档两条路径都会写入。
         · ④ 页 `COS` 拆成 `COS_BASE`（5 家演示）+ `pipeCustomers()`（读同一键），
           `COS = COS_BASE.concat(pipeCustomers())` → 在 ② 点过「加入管线」的公司，
           切到 ④ 直接可选、可直接出开发信。只并入「已加入」的，不是整个线索池。
         ⚠️ 修两个由此暴露的真问题：
           (a) 管线来的公司**没有岗位字段** → 原先会生成「Dear ,」这种破损称呼。
               修法：`whoRaw = o.person || raw.role || "采购负责人"` 中性职能称呼兜底
               （② 池只收录采购方，称呼其采购职能属合理推断，也不是把个人信息冒认成已核实数据）。
           (b) ④ 页 `V` 表只收了 3 个行业，② 新增的品类族名（光学光电 / 五金工具 / 化工材料…）
               原样以中文落进英文草稿。修法：`V` 表 11 → **26 条**（补 10 行业 + 4 区域 + 1 岗位）。
         · `app-panel.js`：标题是「中文主标 + 英文副标」的双语 lockup，英文界面下会重复成
           「Notifications / Notifications」→ 加 `html[data-lang="en"] .fd-h small{display:none}`。
           用 CSS + `data-lang`（app-i18n.js 会维护）而非 JS 判断，切语言自动生效。
   · v24：② 全球线索获取新增**「管线管理面板」（管线 CRUD）**——用户 2026-10-13 明确授权：
         要「可点选、可编辑、能新增、能编辑，对的就需要能删减、修正」。
         ⚠️ 风险管理评估结论：**旧版「只能加不能删」本身就是最大风险**（不可逆、随时间累积脏数据）。
           判定为「必要，执行」。新增/编辑风险可控（表单只暴露 L1/L2 字段、绝无 L3 输入框）；
           删除/清空走 `window.confirm` 二次确认。
         · 工具栏「管理管线」入口（带实时计数 badge）→ 管理 modal：列表 + 勾选 + 新增 + 编辑 + 删除 + 批量删除 + 清空。
         · 新增/编辑 modal：公司名 / 官网域名（索引键·编辑时锁死）/ 区域 / 行业 / 采购方类型 / 需求品类 / 关键词 / 来源。
           **全部 L1/L2，无 L3 字段**；默认来源「手动新增」（展示时本地化）。
         · 数据层 `upsertPipe / removePipe / clearPipe` + 列表渲染 `renderPipeList` + 多订阅者刷新钩子；
           删除/清空后漏斗 `fn3` 与 ④ 页 COS 实时同步（实测确认）。
         · i18n：本次新增 35 条字典（管理面板全部 UI + 来源默认值 + 计数单位），9 语言全量回填；
           **行内「编辑/删除」按钮、编辑表单标题、计数单位「家」、来源默认值** 均改为走 `T()/Tv()`，
           英文界面下管线面板零残留中文（CDP 端到端 28/28 验证通过）。
         · 附带修：`renderPipeList` 计数单位 `家` 原硬编码未翻译 → 改为 `Tv("{n} 家", {n})`。
   · v25：④ 获客执行页新增「管理管线」入口（按钮深链到 `02_全球线索获取.html#pipe`，自动打开 02 的管线管理面板）。
         复用同一套 L1/L2-only CRUD，不重复代码、不引入 L3 字段；② 页监听 `location.hash`，`#pipe` 时自动 `openPipe()`。
         ②/④ 页静态文件有改动 → 升 CACHE 版本确保发版后用户拿到新文件。
   · v34：**驾驶舱 KPI 反虚报（六项全部改实时统计）** —— 用户 2026-10-14：「检查这排数字的真实性，不要虚报」。
         审计结论：原 KPI 是 index.html 里的**字面量常量**（今日新线索 326 / 已锁定客户 1,842 / 覆盖国家 76 /
         本周拦截风险 47 / 节省尽调工时 312 / 沟通率 34.1%），与系统真实状态严重不符——② 页演示池实际 16 家、
         ③ 页尽调档案实际 2 份、管线默认 0 家，「节省尽调工时」在产品里根本没有对应功能，
         连「较上周 +18.4%」也是写死的（系统无历史库，算不出来）。② 页 changelog 里早就立过
         「不编造『312 家 / 47 家』这类数字」的铁律，KPI 排是同一组数字的漏网之鱼。
         · **新建 `app-stats.js`**（跨页统计 registry，键 `falcora_stats_v1`）：数据持有页 `set(命名空间, {...})`、
           阅读页 `get(命名空间)`；**未上报过的命名空间返回 null，绝不回退预设数字**。9 页 `<head>` 接入。
         · ② 页上报**当前范围池**（不是静态演示池全集）：`scope/mode/n/countries/regions/regionList`，
           签名不变不写盘，`render()` 末尾挂钩（切范围/筛选/名片建档实时同步）。
         · ③ 页 `reportDD()`：建档 +1 即重报。
         · KPI 六项口径（全部可验）：线索池企业/覆盖国家 ← ② 上报实数；已锁定客户 ← 本页地图 clients；
           尽调档案 ← ③ 上报实数；加入管线 ← `falcora_pipeline_v1`；沟通率 ← `falcora_seq_v1` 已标记客户数 ÷ 加入管线，
           分母 0 → **诚实空态「尚未统计」**（不编造百分比）。去掉全部同比 delta。
         · **AI 洞察横幅四态**（原写死「3 个高匹配度市场尚未被覆盖 / 预计释放 1,200 条优质线索」——
           与演示池实际覆盖 7 个区域矛盾，且档案未填时说「基于您的行业画像」也是假的）：
           档案未填 / ② 未打开 / 池为空 / 有数据（按 ① 目标区域 vs 池实际区域算真实缺口），CTA 按态跳转。
         · `index.html` 删死代码（`.delta`/`.spark`/`kpiT0`），字典 **1960 → 1986 条**（第 26 批 +26）。
   · v33：**驾驶舱 KPI 新增第 6 张「管线启动沟通率」** —— 用户 2026-10-14：「@截图 这个地方帮我增加一个看版，
         显示『加入管线及与客户启动沟通』的转化率。」（截图标记的是 KPI 网格第 6 个空位）
         · 卡片口径：**转化率 = 与客户启动沟通家数 ÷ 加入管线家数**（演示数据 214 / 628 = **34.1%**，较上周 +3.6pt）。
           卡面同时显示主数字 34.1% 与副文案 `214/628`（比值是**独立节点**，不与中文拼串，
           否则反查字典落空会在英文界面残留中文）。卡片 `title` 另给口径说明，走字典翻译。
         · `.kpis` 由 `repeat(5,1fr)` 改 **`repeat(6,1fr)`**，并加 `@media (max-width:1480px)` 回落到 3 列
           —— 6 列时英文标签（Countries/regions covered）会换行、单卡过窄；`.kpi .sub` 加 `flex-wrap:wrap` 兜底。
         · ⚠️ **KPI 原用 `.toLocaleString()` 无参格式**（跟随浏览器 locale，不跟随界面语言）→ 改为
           **`Intl.NumberFormat(locale())`**，并注册 `__falOnRefresh` 在切语言时重绘数字。
           顺带说明：原 `fmt` 字段是死代码（从未被渲染使用），本次一并移除。
         · `index.html`、`app-i18n-dict.js` 为静态文件 → 升 CACHE 版本。
   · v32：**侧栏「每日汇率」组件** —— 用户 2026-10-14：「帮我在主导航上方加入一排每日最新国际汇率，
         基础汇率是人民币，换算币种包含 美金、欧元、日币、韩元、台币、泰铢、印度卢比、英镑…等主要货币。
         每天早上北京时间 8 点整，自动更新最新汇率。」
         · 新增 `app-fx.js`（独立脚本，9 页在 `app-i18n.js` 之后引入）。注入到 `.sidebar` 里
           **第一个 `.nav-label`（主导航）之前** → 视觉位置＝主导航上方。
         · 基准 1 CNY；默认 8 币（USD/EUR/JPY/KRW/TWD/THB/INR/GBP，即用户列举顺序），
           「展开全部」追加 HKD/SGD/AUD/CAD/MYR/VND/IDR/PHP。
         · 三源顺序回退：`cdn.jsdelivr.net/@fawazahmed0/currency-api` → `latest.currency-api.pages.dev`
           → `open.er-api.com/v6/latest/CNY`；全失败退回 `localStorage 'falcora_fx_v1'` 并**明标「离线缓存」**。
         · 「早上 8 点自动更新」= **到点即刷 + 打开即补**（纯前端无 cron）：页面开着到北京 08:00 自行拉取；
           关着则下次打开若发现上次更新早于最近一次 08:00 立刻补拉；后台切回前台也补拉。
           北京 08:00 = UTC 00:00，故用 `Date.UTC` 直接算，不引时区库。
         · 币种名称与数字格式走 **Intl.DisplayNames / Intl.NumberFormat**（不进字典，避免逐语言维护 20+ 币种名）；
           界面文案（每日汇率/基准/更新/展开/参考汇率…）仍走字典。
         · `app-design.css` 升 **?v=3**：新增 `@media (min-width:861px){.sidebar{overflow-y:auto}}`
           —— 侧栏多了汇率块后，矮屏需可滚动，保证用户卡与导航项不被裁掉。
         · 9 页 `<link href="app-design.css?v=2">` 全部升 `?v=3`；`PRECACHE` 增列 `./app-fx.js` 并同步 `?v=3`。
   · v31：**08 页补齐 10 语言字典**（v30 建页时只做了中文与繁体兜底，其它 8 语言会残留中文）。
         · `app-i18n-dict.js` 新增 **162 条**（161 条页内文案 + 1 条页标题），每条 9 语言；
           zh-Hant 仍由 OpenCC `s2twp` 自动生成。字典总量 1784 → **1946 条**。
         · 覆盖：五组输入标签 / 单位（件、/件、整批、本币）/ 公式名与说明 / 速查表表头与 26 条解释 /
           符号表 30 项 / 右栏报价阶梯与盈利体检 / 口径提示 5 条 / 页脚免责声明。
         · ⚠️ **`<code>` 块不参与翻译**（i18n 引擎 SKIP_TAGS 含 CODE）—— 原「外贸企业退税」公式里
           `Refund = 含税采购价 ÷ …` 的中文会被跳过、在英文界面残留。改为符号 `C_incl`，
           并在符号表补 `C_incl / r_vat_out / r_refund / F_freight` 四项，公式本体保持纯符号。
         · 静态文件有改动 → 升 CACHE 版本，确保访客拿到新字典。
   · v30：**新增第 9 页「成本与报价测算」** —— 用户 2026-10-14：「帮我设计一套公式，专门计算各种成本、报价、
         利润、毛利率、关税……并帮我加到系统里，放在『账号与成员』这个按钮的下方。」
         · 新页 `08_成本与报价测算.html`：26 条公式分五组 —— ① 单位成本（料工费→完全成本）
           ② 出口费用与贸易术语阶梯（EXW→FOB→CFR→CIF→DDP）③ 关税与进口税费（完税价→关税→VAT）
           ④ 利润/毛利率/加成率/目标价反推/盈亏平衡 ⑤ 汇率损益/佣金/底价/议价空间/出口退税。
         · 全部实时联动计算；右侧「报价阶梯」+「盈利体检」；页尾「公式速查表」含符号表与 26 条表达式。
         · `app-nav.js` 新增 `injectCalc()`，在「账号与成员」**下方**注入入口（两处都 insertBefore(.side-foot)，
           先插 07 再插 08 即为期望顺序）。
         · 输入存本机 `falcora_calc_v1`；提供「填入示例数据」「清空」两个显式按钮，
           **不预置任何默认值**（沿用「绝不把预设内容放进使用者输入框」铁律）。
         · 静态文件有改动 → 升 CACHE 版本；`PRECACHE` 增列 `./08_成本与报价测算.html`。
   · v29：**新增第 10 种语言「繁體中文（zh-Hant）」** —— 用户 2026-10-14：「系统帮我多加一个语言：繁体中文。」
         · 主字典 `app-i18n-dict.js` 1831 条每条追加 zh-Hant 值（OpenCC `s2twp` 生成），`FAL_ORDER` 加 `"zh-Hant"`。
         · `app-vals.js`：`ORDER` 加 `zh-Hant`，47 条业务数据值（行业 / 区域 / 角色）同步补齐第 2 位。
         · 新增 `app-i18n-zht.js` —— **繁体兜底转换器**。主字典只收「静态界面文案」，页面上还有一批
           **运行时拼接**的中文（① 页战略分析结论、② 页联系人占位符、⑤ 页下拉选项、`__falVal` 拼串等），
           整句不在字典里、反查不到，会残留简体。兜底器按「词组优先 → 单字兜底 → 回修表」转换，
           表以 OpenCC s2twp 为参照、用本 App 全部源码语料标定，在 2146 段真实渲染文本上校验
           2143/2146 完全一致（余 3 处为台湾用字偏好差异：準入 / 帳號）。
         · `app-i18n.js` 抽出 `resolve(key, entry, lang)`：仅当语言为 `zh-Hant` 且字典未命中时才走兜底，
           其它语言行为完全不变（未命中即回退中文原文，与既有版本一致）。
         · 8 个页面 `<head>` 在 `app-i18n-dict.js` 与 `app-i18n.js` 之间插入 `<script src="app-i18n-zht.js">`。
         · 静态文件有改动 → 升 CACHE 版本；`PRECACHE` 增列 `./app-i18n-zht.js`。
   · v28：**直立屏（手机）顶栏修复 + CSS 缓存失效修正** —— 用户 2026-10-14：「手机版的直立式界面没改」。
         · 真因：`app-nav.js` 注入的 `.back-btn/.home-btn` 带 `min-width:88px`，设计系统只改了高/圆角、
           没覆盖 min-width → 手机端「上一页/首页」变成 88px 宽的空白大按钮，顶栏控件换行错乱，看着像「没改」。
           修法：设计系统基类 `.topbar .back-btn/.home-btn` 加 `min-width:0`；直立屏媒体查询把顶栏重排为三行
           （① 标题整行 ② 控件整行 `flex-wrap:nowrap;overflow-x:auto` 横向滚动 ③ 搜索整行）。
         · ⚠️ **CSS 缓存失效修正**：此前页面 `<link href="app-design.css?v=1">` 与 SW `PRECACHE './app-design.css'`
           **URL 不一致** → 预缓存作废、且 `?v=1` 不变导致改 CSS 后访客拿到旧版。改为两边统一 `app-design.css?v=2`，
           今后每次改 CSS **必须同时**：① 8 页 link 的 `?v=N` 递增 ② SW PRECACHE 同步 ③ 升 CACHE 版本。
   · v27：**设计系统 v1（克制专业 SaaS 风）** —— 用户 2026-10-14：「这个排版很丑，你就不能好好设计一下吗」。
         新增 `app-design.css`（设计令牌 + 组件样式），8 个页面 `<head>` 均在页内 `<style>` 之后 `<link>` 引入
         （后载入 = cascade 压过页内同名规则），并加入 PRECACHE。
         要点：4 级字号阶 24/20/15.5/13.5；8px 间距阶 4-8-12-16-24-32；
         金色收敛为「主操作 + 关键计量」（卡头图标默认改 cyan 玻璃）；卡面改更亮玻璃 + 细描边真正浮起；
         topbar 控件统一 36 高 / 10 圆角；副标题关键项 cyan 高亮；hero 加 FALCORA 蛛网细线装饰。
         ⚠️ 直立屏媒体查询在 app-design.css 与 app-nav.js 内联 `<style>` 各有一份（内联那份防闪烁、外链那份为规范源）。
   · v26：直立屏 / 窄屏（≤860px）布局修复 —— 用户 2026-10-14：「直立屏状况下，铃铛跟小齿轮跑到右侧画面以外」。
         · 根因：① 顶栏控件（上一页·首页·铃铛·齿轮·演示标）在窄屏一行排不下 → 溢出右侧视口；
           ② `.content` 是 flex column，`.card` 作为 flex item 默认 `min-width:auto`=min-content，
              内部多列网格（sggrid/ctgrid/ctrow）把 min-content 撑到 ~400px → 卡片拒绝收缩、横向溢出 ~414–428px。
         · 修法（全局注入 `<style>`，一次修全 8 页）：
           顶栏 `flex-wrap:wrap` + 按钮只留图标（`.back-btn span/.home-btn span{display:none}`）+ `.pill{display:none}`；
           侧栏折叠到顶部整宽（`.app{flex-direction:column}` + `.sidebar{width:100%}`）；
           `.layout` 单列（`.layout{grid-template-columns:1fr}`）；
           **关键**：给 content、layout、card、sidebar 的直接子项全部设 `min-width:0` 解除自动最小宽，
           并让内部两列网格（sggrid/ctgrid/ctrow）在手机屏堆叠为单列。
         · CDP 端到端验证（390×844，SW 禁用确保拿到新文件）：8/8 页 `scrollWidth=390=innerWidth`、零横向溢出，
           铃铛/齿轮/顶栏 `.top-right` 均在视口内（right=376 ≤ 390）。
   · v22：② 全球线索获取**按 ① 战略档案收敛**（用户 2026-10-13：「输入光学瞄准镜，却出现了医疗行业」）。
         ⚠️ 旧版 ② 页**完全不读战略档案**——不碰 localStorage、`LEADS` 写死 16 条跨品类演示数据，
            `ind` 里医疗器械 / 化工 / 建材 / 汽车零部件混在一起，与用户填的主营品类无关。
         新增数据层：14 个品类族 `FAM`（每族含行业 / 粗类目 / 公司后缀 / 关键词 / 目标市场 / 4 条采购方画像）
           + 30 个公司名前缀 `PRE` + 8 个区域 `REGMAP`；`matchFamilies()` 按「关键词 + 产品类目 + 行业」
           加权打分（2 / 3 / 4 分），**只保留与最高分 ≥70% 的族** —— 否则填「光学瞄准镜」会连带出
           「五金工具」「建材」（它们只是共享「五金/工具」这个粗类目）；`"其他"` 是兜底类目，
           不参与匹配，避免填「其他」就命中一堆无关族。
         `genLeads()` 每族出「4 条采购方画像 × 2 个目标市场 = 8 条」，最多取 2 族；
         确定性哈希保证刷新后域名与公司名不变（否则「加入管线」的记录会错位）。
         三态：`empty`（无档案 → 不生成任何线索 + 引导态）/ `nocover`（未覆盖 → 明说未覆盖，不塞无关行业）
           / `profile`（命中 → 只出相关品类）。范围条 `#scopeBar` 明示当前范围，可一键切「全部演示池」。
         行业下拉从**当前池实际出现的行业**动态生成；洞察正文**不再编造「312 家 / 47 家」**这类数字。
         ⚠️ 修掉自己的拼串铁律违规：范围条 / 引导态 / 洞察原先写成「中文 + <b>变量</b> + 中文」，
           `<b>` 会把整句切成多个文本节点，反查字典永远匹配不上 → 改为**整句作 key + {kw}/{fams}/{rg}/{n}
           占位符**，`T()` 取译文后由 `Tv()` 替换成高亮片段。字典 1585 → 1746 条。
   · v21：右上角「铃铛 + 齿轮」从纯装饰做成真的（用户 2026-10-13：「两个都做成真的」）。
         新增 app-panel.js —— 右侧抽屉式双面板：
         · 铃铛 = 通知中心，5 类通知 + 未读数字角标。**只有从本机数据推导出来的才标「来自本机数据」**，
           其余（触达待办 / 数据源更新 / 点数不足）一律标「演示」—— 原型无后端、无推送通道，
           不假装已接入服务端推送。
         · 齿轮 = 设置，按「用户此刻想干什么」分四组（不按系统模块）：
           我的企业（档案完成度 / 发信署名 / 席位）、使用偏好（语言 / 时区 / 5 类通知开关）、
           套餐与用量（**整组明标演示值**，无后端计费）、数据与关于（本机数据清单 / 导出 / 清空 / 合规）。
         02–07 页顶栏原先只有一个「⚙」字符图标，现统一补铃铛并换成 SVG。
         ⚠️ 通知文案用「整句作 key + {n}/{kw} 占位符」而非拆 span（拆了整串就查不到字典）；
            因该写法是 T() 预翻译后插入 DOM，故注册 __falOnRefresh 在切语言时重绘面板，
            否则 applyText 会把外文当 __src、切回中文时残留。window.confirm 的文案不在 DOM 里，
            必须手动过 __falT（含 {name} 占位符，翻译后再替换）。字典 1478 → 1585 条。
   · v20：8 个页面 `<head>` 统一加 `<meta name="robots" content="noindex,nofollow">` ——
         应用原型含定价与路线图，不应被搜索引擎收录（配合仓库根目录 robots.txt 的 Disallow: /）。
   · v19：驾驶舱「套餐与价格」新增「席位」定义说明块（用户 2026-10-13 问「席位是什么意思」）；
         旗舰版 CTA「联系顾问」改为打开顾问联系弹窗（Ryan Chen · 电话 / 邮箱 / WhatsApp · WeChat，
         每行带复制按钮 + tel: / mailto: / wa.me 直达）；另三档 CTA 补轻提示
         （此前点了完全没反应）。字典 1463 → 1478 条。
   · v18：把「更新」按钮从「无条件刷新」改为「先探测可达性、连不上不刷新只提示」——
         用户按「更新」跳到 12803 无效地址错误页，根因是**旧分享链接已 400 失效**
         （本平台每次发布都会换链接）。新增 probe() 4.5s 超时探测 + #falNotice 提示条。字典 1455 → 1463 条。
   · v16：把计数与日期类「中文+数字」拼接串拆开（② 的「共 N 家」「N 唯一 · M 重复」
         「N 条」；③ 的「N/N 项已核对 / 名单已覆盖」），⑤ 页的日期 / 星期 / 相对时间
         改由 Intl 按当前界面语言生成，不再依赖字典。字典 1437 → 1455 条。
   · v15：补字典（② 验证去重 / 名片建档 77 条；③ 尽调工作台 + ⑦ 账号成员 81 条；
         驾驶舱能力面板与时机卡 129 条）。字典 1148 → 1437 条。
   · v14：把产品文档「3.2 能力覆盖矩阵」的 11 项能力落到界面——驾驶舱新增
         「平台能力覆盖」面板（每项标 已就绪 / 部分就绪 / 待接数据源 + 模块入口）
         与「套餐与价格」区块（免费 / ¥999 / ¥2,999 / 旗舰定制）；⑤ 客户深挖新增
         「触达时机 · 何时发」；⑥ 转化率升级新增「全球触达时机矩阵」。
   · v13：更新链路加固（用户 2026-10-13：「所有更新改动都在按下『更新』按钮后启动」）
         ⚠️ 线上静态资源**没有 Cache-Control，只有 last-modified** → 浏览器走启发式缓存
         （≈ 文件年龄 10%，本次实测约 2.4 小时）。旧写法 `cache.addAll(PRECACHE)` 用的是默认
         cache 模式，**可能把 HTTP 缓存里的旧 app-nav.js / 旧字典预热进新版本的缓存**，
         结果「升了 CACHE 版本却还是旧文件」。改为**逐条 `fetch(url,{cache:'reload'})`**
         强制走网络；单条失败不影响整体 install。
         ⚠️ 静态资源从「纯缓存优先」改为「缓存优先 + 后台 revalidate」：即使某次漏升版，
         下一次加载也会在后台悄悄换成新文件，把「改了没生效」压到最低。
   · v12：① 战略档案的分析生成器**彻底去掉兜底预设**——未填的产品定位 / 主流价格区间 /
         替代品描述不再被替换成「中端主流」「价位 95」「威胁等级 35」；竞品各维度强弱
         不再用名称哈希伪评分，未接数据源前一律「—」；未覆盖区域机会评分加「演示值」标注。
         修掉由此产生的破损文案（「用  定位的」「贴近行业均价」）。
   · v11：顶栏回退按钮可见文案由「返回」改为「上一页」（用户 2026-10-13 的叫法），
         并给「上一页 / 首页」设 min-width:88px 居中，两按钮等宽成对。字典 1148 条。
   · v10：④ 页模板去掉「企业名紧贴句末句号」的写法（企业名常以 Ltd. 结尾，会产生
         「Ltd..」叠标点），改用「—」「，」「 regarding …」等接续结构；企业名留空时
         用该语言的中性自称兜底；mailto 组装拆出可测的 mailtoHref()。
   · v9：④ 页开发信不再写死「FALCORA Team」署名——正文自报家门改用
         ① 战略档案里的企业名称；新增「发信设置」卡片（企业名 / 发件人 / 职位 /
         电话 / 网址 / 部门邮箱 / 补充 / 中英双语开关 / 发件邮箱 / 收件邮箱）；
         新增可独立编辑的「签名档」区块；「用邮件客户端打开」走 mailto: 手动发送。
         字典扩至 1147 条。
   · v8：字典追加 07 页提示条 10 条（1122 条）。注意 v7 曾在本轮编辑中途被浏览器装载，
         缓存里可能留有旧字典，故再升一版强制重取。
   · v7：① 战略档案清空所有预设内容（表单不再预填/预勾选，首屏不再自动出分析，
         新增「清空档案」）；② 线索池 16 家全部具备 L2 职能联系方式，
         L3 补录表单不再用演示值预填；新增 07 账号与成员管理页（界面骨架）；
         侧栏由 app-nav.js 统一注入「账号与成员」入口；字典扩至 1112 条。
         升版强制刷新旧缓存。 */
const CACHE = 'falcora-v34';
const PRECACHE = [
  './',
  './app-design.css?v=3',
  './index.html',
  './01_战略_企业战略档案.html',
  './02_全球线索获取.html',
  './03_客户尽调与风险核查.html',
  './04_获客执行与内容.html',
  './05_客户深挖.html',
  './06_转化率升级.html',
  './07_账号与成员管理.html',
  './08_成本与报价测算.html',
  './mapdata.js',
  './app-update.js',
  './app-nav.js',
  './app-panel.js',
  './app-i18n-dict.js',
  './app-i18n-zht.js',
  './app-i18n.js',
  './app-fx.js',
  './app-stats.js',
  './app-vals.js',
  './manifest.webmanifest',
  './assets/logo.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-maskable-512.png',
  './assets/apple-touch-icon.png',
  './assets/favicon.ico'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(PRECACHE.map((u) =>
        /* ⚠️ 必须 cache:'reload' 强制走网络。线上静态资源只有 last-modified、没有
           Cache-Control，浏览器会启发式缓存约 2.4 小时；用默认 cache 模式预热，
           会把 HTTP 缓存里的**旧** app-nav.js / 旧字典存进新版本缓存，
           表现为「CACHE 版本升了却还是旧文件」。单条失败不阻断整体 install。 */
        fetch(new Request(u, { cache: 'reload' }))
          .then((resp) => (resp && resp.ok ? c.put(u, resp) : undefined))
          .catch(() => {})
      )))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 页面点「更新」→ 通知本 SW 立即接管 */
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

function isHTML(req) {
  return req.mode === 'navigate' || ((req.headers.get('accept') || '').includes('text/html'));
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || !req.url.startsWith('http')) return;

  if (isHTML(req)) {
    // 网络优先：保证在线时总是拿到最新页面
    e.respondWith(
      fetch(req, { cache: 'no-store' })
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return resp;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // 静态资源：缓存优先 + 后台更新（stale-while-revalidate）
  // 兜底：即使某次忘了升 CACHE 版本，下一次加载也会在后台把新文件换进来。
  e.respondWith(
    caches.match(req).then((cached) => {
      const net = fetch(new Request(req, { cache: 'no-cache' }))
        .then((resp) => {
          if (resp && resp.ok) {
            const copy = resp.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return resp;
        })
        .catch(() => undefined);
      return cached || net;
    })
  );
});
