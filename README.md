# Chrome Exhentai Help

`exhentai.org` / `e-hentai.org` 批量下载与自动翻页插件。Chrome 扩展（Manifest V3），
**无构建系统、无第三方运行时依赖**。

- 版本：`manifest.json` 的 `version` 字段（唯一来源，当前 `1.0.2`）
- 加载方式：`chrome://extensions` → 开发者模式 → 加载已解压的扩展（选本目录）
- 发布方式：打包为 zip 后提交 Chrome 应用商店（本项目未接入自动发布）

## 文件结构

```
manifest.json      MV3 清单：权限、content script、background service worker
background.js      Service Worker：IndexedDB、路径清洗、下载去重、消息路由
contentScript.js   注入页面的全部业务逻辑（i18n / UI / 下载 / 翻页 / 批量选择）
styles.css         插件 UI 样式（类名统一以 eh- 前缀）
icons/             16/32/48/128 图标
AGENTS.md          AI 协作契约（铁律 / 门禁 / 红线）
AUDIT-SPEC.md      体检执行细则（只读扫描，级别定义）
BOOTSTRAP.md       规范初始化 / 升级流程
```

## 模块职责

### background.js（Service Worker，无 DOM）

| 模块 | 职责 |
|---|---|
| `DB` | IndexedDB 两个 store（`image_store` / `torrent_store`）的 `has/put/clear`；动作走白名单，防原型链属性被当方法调用 |
| 路径清洗 | `cleanSeg` / `bytesOf` / `sliceBytes` / `limited` / `cleanName` / `cleanSubpath`；**规则必须与 contentScript 逐字节一致** |
| `inFlight` | 同一「目标路径 + URL」只保留一个在途下载，防重复消耗配额与并发写同一文件 |
| 消息路由 | `PING` / `DOWNLOAD` / `DOWNLOAD_QUERY` / `DB`，全部做 payload 类型收敛 |

### contentScript.js（单文件 IIFE，按序分层）

| 区块 | 职责 |
|---|---|
| `I18N` / `i18n` | 中英双语字典，`t(key, params)` 做 `${}` 插值 |
| 通用工具 | `errText` 异常文本收敛、`clampInt` 范围夹紧、`logLine` 日志节点 |
| 路径清洗 | 与 background 同一套规则（由 `eh-audit3.mjs` 强制一致） |
| `Dom` | DOM 构造、带超时的页面抓取、blob 下载、数据库消息封装 |
| `sendMsg` | 消息重试（端口丢失 / SW 冷启动，退避 300/700/1500ms） |
| `sendDownload` | fire-and-forget 派发 + 轮询状态 + 落盘位置核对 |
| `Settings` | `chrome.storage.local` 持久化，读取时按默认值做类型收敛与范围夹紧 |
| `Speed` | 固定 size 并发池（永不 reject）、带退避的抓取重试 |
| `Modal` | 毛玻璃弹窗：可拖动、日志瀑布流（上限 200 条）、视口约束 |
| `ControlPanel` | 右下角面板：单击展开、双击回到顶部、移出 2s 自动最小化 |
| `AutoPager` | 列表 / 画廊 / 大图页无限滚动（防抖 + 节流 + 加载锁） |
| 下载核心 | 图片 / 种子 / 批量三条流程共用 `withRetry` + `finishDownload` + 失败报告 |
| 目录就绪闸门 | `withDirGate` / `dirPoison` / `recordLanded`，防文件散落到默认下载目录 |
| `BatchSelector` | 列表页整块热区勾选（覆盖五种列表样式与站点封面浮层） |
| `boot` | 各模块独立 `try/catch` 初始化，任一处失败不影响其余功能 |

## 依赖与通信

```
contentScript ──runtime.sendMessage──> background ──chrome.downloads──> 磁盘
                                            │
                                            └──indexedDB──> 跳过已下载记录
```

- 无外部网络依赖、无 npm 依赖、无 CDN 资源。
- 权限最小化：仅 `downloads` + `storage`，无 `host_permissions`；
  content script 限定两个域名，`web_accessible_resources` 只放行一个图标。
- 唯一跨上下文重复代码是「路径清洗」（SW 与 content 是隔离上下文，无法共享模块），
  由 `eh-audit3.mjs` 逐字节比对两侧规则。

## 关键设计（改前必读）

1. **按 UTF-8 字节截断路径**：文件系统限制的是字节数（255），按字符截断会让中文标题超标，
   Chromium 判定路径不可写后**静默改用默认下载目录**。上限 `SEG_MAX_BYTES=150` /
   `NAME_MAX_BYTES=180`，两侧必须同值。
2. **下载派发去重**：键 = `目标相对路径 + "\n" + url`（必须带 url）。窗口 90s，
   窗口内复用；已结束则重发；陈旧先 `cancel` + `erase` 再重发（顺序不能反）。
3. **目录就绪闸门**：每个子目录首个下载先单独跑完并核对落盘位置，没进目标目录即判定
   该目录不可用，**剩余任务全部跳过**（只损失 1 个文件）。重试也必须过闸门。
4. **双击判定**：单击必须延迟 `CP_DBLCLICK_MS=250` 再展开，否则第二次点击落不到图标上。

## 本地验证（无构建系统，用等价门禁）

门禁脚本存放在 `~/.workbuddy/binaries/node/workspace/`（不在仓库内，jsdom 依赖装在该目录）。

```bash
# 1. 构建等价（语法检查）
node --check background.js
node --check contentScript.js

# 2. 静态检查
cd ~/.workbuddy/binaries/node/workspace
node eh-audit.mjs  "/Users/xlz/Documents/E站脚本"   # CSS 类引用 / i18n 键 / 调试残留 / 版本号
node eh-audit2.mjs "/Users/xlz/Documents/E站脚本"   # 死代码 / 健壮性断言
node eh-audit3.mjs "/Users/xlz/Documents/E站脚本"   # content 与 background 清洗规则一致性

# 3. 测试（分三批；一次跑全套会超 120s 被 SIGKILL）
P="/Users/xlz/Documents/E站脚本"
for f in eh-smoke.mjs eh-smoke2.mjs eh-smoke3.mjs eh-smoke4.mjs eh-smoke5.mjs eh-smoke6.mjs \
         eh-smoke7.mjs eh-smoke8.mjs eh-smoke9.mjs eh-smoke10.mjs eh-smoke11.mjs eh-smoke12.mjs; do
  node "$f" "$P/contentScript.js" || exit 1
done
for f in eh-smoke13.mjs eh-smoke14.mjs eh-smoke16.mjs eh-smoke17.mjs eh-smoke18.mjs eh-smoke19.mjs; do
  node "$f" "$P/contentScript.js" || exit 1
done
node eh-smoke15.mjs "$P"   # 注意：参数是项目目录，不是 contentScript 路径
```

关键回归套件对应关系：

| 改动点 | 必跑 |
|---|---|
| 字节截断 / `safeExt` / `fitFileName` / `checkLanded` | `eh-smoke14.mjs` |
| background 下载去重与淘汰顺序 | `eh-smoke15.mjs` |
| 目录就绪闸门（单元） | `eh-smoke16.mjs` |
| 目录不可用刹车的端到端（含重试刹车） | `eh-smoke17.mjs` |
| 结构性失败 `retryable:false` | `eh-smoke18.mjs` |
| 停靠图标单击展开 / 双击置顶 | `eh-smoke19.mjs` |

## 已知取舍（刻意保留，勿当缺陷改）

- 「中止」只停派发新任务，不撤销已进浏览器的下载、不中断在途 fetch。
- 失败报告 `error` 列是「见上方日志」占位，不为此加错误回传通道。
- 路径只限单级 150 字节，不设总长度上限（Windows MAX_PATH 场景接受）。
- 「清除跳过记录」不加二次确认（项目刻意避免阻塞式对话框）。
- `background.js` 的错误文案不本地化（SW 无 i18n 环境）。
- 工具栏图标点击无响应（`action` 无 popup 也无 `onClicked`）。
