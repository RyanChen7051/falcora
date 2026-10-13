/* FALCORA 获客通AI — Service Worker v20
   · HTML / 导航：网络优先（在线时永远取最新），离线回退缓存
   · 静态资源：缓存优先 + 后台更新（stale-while-revalidate，兜底防「改了没生效」）
   · 支持页面主动发 SKIP_WAITING 立即切换新版本
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
const CACHE = 'falcora-v20';
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
