/* FALCORA 获客通AI — Service Worker v26
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
const CACHE = 'falcora-v26';
const PRECACHE = [
  './',
  './index.html',
  './01_战略_企业战略档案.html',
  './02_全球线索获取.html',
  './03_客户尽调与风险核查.html',
  './04_获客执行与内容.html',
  './05_客户深挖.html',
  './06_转化率升级.html',
  './07_账号与成员管理.html',
  './mapdata.js',
  './app-update.js',
  './app-nav.js',
  './app-panel.js',
  './app-i18n-dict.js',
  './app-i18n.js',
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
