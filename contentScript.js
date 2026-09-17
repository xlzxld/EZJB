(() => {
    "use strict";

    /* =====================================================================
     * i18n
     * =================================================================== */
    const I18N = {
        zh: {
            appName: "ExHentai 助手",
            cpDockHint: "点击展开面板 · 双击回到页面顶部",
            batchOn: "批量下载", batchHint: "开：列表页点击条目即可勾选",
            infiniteOn: "无限滚动", infiniteHint: "开：列表/画廊/大图页自动加载下一页",
            batchBarTitle: "批量下载", selectAll: "全选", invertSel: "反选", clearSel: "清除",
            selectHint: "点击卡片任意位置勾选/取消；点击缩略图照常打开画廊",
            downloadTorrentShort: "下载种子", downloadImageShort: "下载图片",
            selected: "已选", galleries: "个画廊", noSelection: "请先勾选画廊",
            noTorrent: "勾选的画廊都没有种子", noGallery: "勾选的画廊都没有可下载的地址",
            batchGalleryProgress: "批量图片下载进度",
            start: "开始", cancel: "取消", pause: "⏸ 暂停", resume: "▶ 继续", abort: "⏹ 中止",
            downloadConfig: "下载配置", keepName: "保留原图名", keepNameHint: "编号_原图名；关闭则仅编号",
            maxConcurrency: "并发数", retryCount: "重试次数",
            downloadPath: "下载子文件夹", dirPlaceholder: "如 exhentai 或 manga/2024；留空存到默认目录",
            dirTip: "相对浏览器默认下载目录的子文件夹；留空则存到默认目录",
            clearSkipRecord: "清除跳过记录", clearSkipOk: "已清除跳过记录，下次将完整下载", clearSkipFail: "清除失败",
            skipDownloaded: "跳过已下载", allImages: "下载所有图片",
            preparing: "准备中...", collecting: "正在收集 ${total} 页缩略图链接...",
            collectDone: "共收集到 ${count} 张图片", noImages: "未收集到任何图片链接，已中止",
            doneOk: "全部下载完成！", donePartial: "下载完成，共 ${n} 个失败（见下方报告）",
            aborted: "任务已被手动中止", paused: "任务已暂停", resumed: "任务已继续",
            failureReport: "失败报告", retryAllFailed: "重试全部失败项", retrying: "重试中",
            retryAllOk: "重试全部完成，无剩余失败项！",
            exportReport: "导出报告(.txt)", copyReport: "复制报告", reportCopied: "报告已复制到剪贴板", copyFail: "复制失败",
            skipRecord: "[跳过已记录] ${name}", skipShort: "[跳过] ${name}",
            downloadFail: "下载失败：${name} - ${err}",
            downloadMisplaced: "[!] ${name} 未保存到目标文件夹，实际位置：${path}",
            dirUnusable: "[!] 目标文件夹不可用：首个文件没能进去（实际落在 ${path}）。已跳过本画廊剩余任务，避免整批文件都散落到默认目录。请检查 Chrome 默认下载目录的写入权限，或换一个下载子目录。",
            dirUnusableShort: "目标文件夹不可用，已跳过（详见日志开头的提示）",
            torrentProgress: "种子下载进度",
            loadNext: "加载下一页", loadMore: "滚动加载更多", loadAllDone: "已加载全部",
            loadFail: "加载失败，滚动重试",
            pageOf: "已显示第 ${cur} / ${tot} 页 · 滚动加载更多",
            pageAll: "已显示全部 ${tot} 页",
            loadingPage: "正在加载第 ${cur} / ${tot} 页...",
            openGalleryFail: "画廊打开失败：${err}", pageCollectFail: "第 ${n} 页收集失败：${err}",
            /* ---- 以下为原先硬编码在逻辑里的用户可见文案（补齐 en 侧，避免英文界面夹中文） ---- */
            logAbove: "见上方日志",
            pageGapWarn: "[!] 注意：第 ${pages} 页缩略图收集失败，部分图片未加入下载列表",
            pageGapName: "${name}（缩略图缺失）",
            pageGapError: "第 ${pages} 页缩略图收集失败",
            skipHint: "取消勾选将完整重新下载，同名文件直接覆盖",
            reportTitle: "ExHentai 下载失败报告",
            reportTime: "生成时间: ${time}",
            reportTotal: "共 ${n} 项",
            noImageUrl: "无法解析图片地址",
            badImageUrl: "非法的图片页地址",
            quotaExceeded: "配额超限 (509 Bandwidth Limit Exceeded)",
            noGalleryBase: "缺少画廊地址",
            noTorrentLink: "未找到种子链接",
            downloadFailed: "下载失败",
            downloadTimeout: "下载超时",
            downloadInterrupted: "下载中断",
            taskAborted: "任务已中止",
            extNotRunning: "插件未运行，请刷新页面",
            msgTimeout: "消息超时",
            msgFailed: "消息失败",
            noResponse: "无响应",
            dispatchFailed: "下载派发失败",
            dispatchNoId: "下载派发异常：缺少 downloadId",
            missingUrl: "缺少 URL",
            requestFailed: "请求失败",
            unknownError: "未知错误"
        },
        en: {
            appName: "ExHentai Helper",
            cpDockHint: "Click to expand · double-click to scroll to top",
            batchOn: "Batch", batchHint: "ON: click list items to select galleries",
            infiniteOn: "Infinite Scroll", infiniteHint: "ON: auto-load next page on list/gallery/image view",
            batchBarTitle: "Batch Download", selectAll: "All", invertSel: "Invert", clearSel: "Clear",
            selectHint: "Click anywhere on the card to toggle selection; the thumbnail still opens the gallery",
            downloadTorrentShort: "Torrent", downloadImageShort: "Images",
            selected: "Selected", galleries: "galleries", noSelection: "Select galleries first",
            noTorrent: "None of the selected galleries have torrents", noGallery: "None of the selected galleries have a downloadable link",
            batchGalleryProgress: "Batch image download",
            start: "Start", cancel: "Cancel", pause: "⏸ Pause", resume: "▶ Resume", abort: "⏹ Abort",
            downloadConfig: "Download Config", keepName: "Keep original name", keepNameHint: "seq_name; off = seq only",
            maxConcurrency: "Concurrency", retryCount: "Retries",
            downloadPath: "Download subfolder", dirPlaceholder: "e.g. exhentai or manga/2024; empty=default",
            dirTip: "Subfolder under browser default download dir; empty = default dir",
            clearSkipRecord: "Clear skip records", clearSkipOk: "Skip records cleared, will re-download", clearSkipFail: "Clear failed",
            skipDownloaded: "Skip downloaded", allImages: "Download all images",
            preparing: "Preparing...", collecting: "Collecting ${total} thumbnail pages...",
            collectDone: "Collected ${count} images", noImages: "No image links collected, aborted",
            doneOk: "All downloads complete!", donePartial: "Done, ${n} failed (see report below)",
            aborted: "Task aborted by user", paused: "Task paused", resumed: "Task resumed",
            failureReport: "Failure Report", retryAllFailed: "Retry all failed", retrying: "Retrying",
            retryAllOk: "All retries done, no failures left!",
            exportReport: "Export report (.txt)", copyReport: "Copy report", reportCopied: "Report copied to clipboard", copyFail: "Copy failed",
            skipRecord: "[skipped] ${name}", skipShort: "[skipped] ${name}",
            downloadFail: "Download failed: ${name} - ${err}",
            downloadMisplaced: "[!] ${name} was not saved into the target folder, actual location: ${path}",
            dirUnusable: "[!] Target folder unusable: the first file did not land in it (actual path ${path}). Remaining items in this gallery were skipped to avoid scattering the whole batch into the default download directory. Check write permission on Chrome's default download folder, or pick a different subfolder.",
            dirUnusableShort: "Target folder unusable, skipped (see the warning at the top of the log)",
            torrentProgress: "Torrent progress",
            loadNext: "Load next page", loadMore: "Scroll for more", loadAllDone: "All loaded",
            loadFail: "Load failed, scroll to retry",
            pageOf: "Showing page ${cur} / ${tot} · scroll for more",
            pageAll: "All ${tot} pages shown",
            loadingPage: "Loading page ${cur} / ${tot}...",
            openGalleryFail: "Failed to open gallery: ${err}", pageCollectFail: "Page ${n} collect failed: ${err}",
            logAbove: "see log above",
            pageGapWarn: "[!] Warning: thumbnail pages ${pages} failed to load, some images are not in the queue",
            pageGapName: "${name} (thumbnail pages missing)",
            pageGapError: "thumbnail pages ${pages} failed to load",
            skipHint: "Uncheck to re-download everything; same-named files are overwritten",
            reportTitle: "ExHentai download failure report",
            reportTime: "Generated: ${time}",
            reportTotal: "${n} item(s) in total",
            noImageUrl: "Cannot resolve the image URL",
            badImageUrl: "Invalid image page URL",
            quotaExceeded: "Quota exceeded (509 Bandwidth Limit Exceeded)",
            noGalleryBase: "Missing gallery URL",
            noTorrentLink: "No torrent link found",
            downloadFailed: "Download failed",
            downloadTimeout: "Download timed out",
            downloadInterrupted: "Download interrupted",
            taskAborted: "Task aborted",
            extNotRunning: "Extension is not running, please reload the page",
            msgTimeout: "Message timed out",
            msgFailed: "Message failed",
            noResponse: "No response",
            dispatchFailed: "Failed to dispatch the download",
            dispatchNoId: "Download dispatch error: missing downloadId",
            missingUrl: "Missing URL",
            requestFailed: "Request failed",
            unknownError: "Unknown error"
        }
    };
    const i18n = {
        lang: String(navigator.language || "zh").toLowerCase().indexOf("zh") === 0 ? "zh" : "en",
        t(key, params) {
            const dict = I18N[this.lang] || I18N.zh;
            const s = (dict && dict[key]) || (I18N.zh && I18N.zh[key]) || key;
            const p = params || {};
            return String(s).replace(/\$\{([^}]+)\}/g, (raw, k) => {
                const v = p[String(k).trim()];
                return (v === undefined || v === null) ? raw : String(v);
            });
        }
    };

    /* =====================================================================
     * 通用工具
     * =================================================================== */
    // 异常对象不可信（可能是字符串 / null / Error），统一提取可读文本
    const errText = (e) => {
        const fallback = i18n.t("unknownError");
        if (e === null || e === undefined) return fallback;
        if (typeof e === "string") return e || fallback;
        const m = e.message || e.error;
        return (typeof m === "string" && m) ? m : String(e);
    };
    // 整数收敛：非数字 → 默认值；越界 → 夹到边界
    const clampInt = (v, min, max, dflt) => {
        const n = parseInt(v, 10);
        return isFinite(n) ? Math.max(min, Math.min(max, n)) : dflt;
    };
    // 只用于拼接进 innerHTML 的固定文案；页面内容一律走 textContent
    const logLine = (cls, text) => {
        const e = Dom.el("small", cls);
        e.textContent = text;
        return e;
    };

    // Windows 保留设备名：单独拿它当目录/文件名会被系统拒绝（含带扩展名）
    const RESERVED_NAME = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\..*)?$/i;
    // 单个路径分量的字节上限（文件系统硬限 255，留余量给 .crdownload 等后缀）
    const SEG_MAX_BYTES = 150;  // 子目录名
    const NAME_MAX_BYTES = 180; // 文件名（含扩展名）

    const cleanSeg = (s) => {
        let v = String(s || "")
            .replace(/[\u0000-\u001f\u007f\s]+/g, "_")
            .replace(/[\\/:*?"<>|]/g, "_")
            .replace(/\.{2,}/g, ".")
            .replace(/^\.+/, "")
            .replace(/\.+$/, "") // 尾部点：Windows/Chrome 不接受以点结尾的目录名
            .replace(/_+/g, "_");
        if (RESERVED_NAME.test(v)) v += "_";
        return v;
    };
    /* ===== 按 UTF-8 字节截断 =====
       文件系统对「单个路径分量」的限制是字节数（macOS APFS / Linux ext4 均 255 字节），
       而 String.slice 按 UTF-16 码元截断：一个 120 字符的中文标题实际是 360 字节，
       远超上限。超限时 Chrome 判定目标路径不可写，会静默改用默认下载目录
       （DownloadPathReservationTracker：requested_target_path 不可写 → 换父目录），
       表现就是「只有部分图片跑到画廊文件夹外面」。因此一律按字节截断。
       留 70+ 字节余量给 Chrome 的 .crdownload 临时后缀与转义。 */
    const bytesOf = (s) => {
        const t = String(s || "");
        let n = 0;
        for (let i = 0; i < t.length; i++) {
            const c = t.charCodeAt(i);
            if (c < 0x80) n += 1;
            else if (c < 0x800) n += 2;
            else if (c >= 0xd800 && c <= 0xdbff && i + 1 < t.length) {
                const d = t.charCodeAt(i + 1);
                if (d >= 0xdc00 && d <= 0xdfff) { n += 4; i++; } // 代理对 = 1 个字符 4 字节
                else n += 3;
            }
            else n += 3;
        }
        return n;
    };
    // 按字节截断，且不把多字节字符切一半（代理对整体保留/整体丢弃）
    const sliceBytes = (s, max) => {
        const t = String(s || "");
        if (bytesOf(t) <= max) return t;
        let n = 0, out = "";
        for (let i = 0; i < t.length; i++) {
            const c = t.charCodeAt(i);
            const d = i + 1 < t.length ? t.charCodeAt(i + 1) : 0;
            const pair = (c >= 0xd800 && c <= 0xdbff && d >= 0xdc00 && d <= 0xdfff);
            const w = pair ? 4 : (c < 0x80 ? 1 : (c < 0x800 ? 2 : 3));
            if (n + w > max) break;
            n += w;
            out += pair ? t.slice(i, i + 2) : t[i];
            if (pair) i++;
        }
        return out;
    };
    // 截断后可能又露出尾部点（第 N 位正好是点），必须再清一次；
    // 上限（字节）需与 background.js 的 limited() 保持一致，否则二次截断会重新制造非法名
    const limited = (s, maxBytes) => {
        const v = cleanSeg(sliceBytes(s, maxBytes || SEG_MAX_BYTES))
            .replace(/\.+$/, "").replace(/_+$/, "");
        return RESERVED_NAME.test(v) ? v + "_" : v;
    };

    /* ===== 文件名组装 =====
       只接受字母数字 1~8 位扩展名。原写法 split(".").pop() 在 URL 没有扩展名时，
       会把 "org/xxx/1234-5" 这类片段当成扩展名，其中的 "/" 会把文件名污染成多级路径。 */
    const safeExt = (u) => {
        const last = String(u || "").split(/[?#]/)[0].split("/").pop() || "";
        const m = /\.([A-Za-z0-9]{1,8})$/.exec(last); // 8 位够覆盖 .torrent/.jpeg/.webp
        if (m) return m[1].toLowerCase();
        // 调用方也可能直接传裸扩展名（"torrent" / "jpg"），同样放行
        return /^[A-Za-z0-9]{1,8}$/.test(last) ? last.toLowerCase() : "jpg";
    };
    // 保证 文件名主体 + "." + 扩展名 的字节数不超限，超长时逐级降级到 fallback
    const fitFileName = (base, ext, fallback) => {
        const e = safeExt(ext);
        // 原标题常常自带扩展名（E 站 #i2 里显示的常是「01.png」或「xxx.jpg」，但实际下载可能被服务端转成了 webp 或其它格式），
        // 彻底剥离任何已有图片/同类扩展名，防止拼出 01_01.png.webp 或 xxx.jpg.jpg
        const strip = (v) => {
            let s = String(v || "");
            const extRegex = new RegExp(`\\.(${e}|jpe?g|png|webp|gif|bmp|avif|jfif|tiff?)$`, "i");
            while (extRegex.test(s)) {
                s = s.replace(extRegex, "");
            }
            return s;
        };
        const room = Math.max(8, NAME_MAX_BYTES - e.length - 1);
        const b = limited(strip(String(base || "")), room)
            || limited(strip(String(fallback || "")), room)
            || "image";
        return b + "." + e;
    };

    /* =====================================================================
     * DOM / 网络工具
     * =================================================================== */
    // 单次页面抓取超时（ms）。原先只作为 fetchPageContent 的形参默认值存在，
    // 调用方从不传参 → 实际取值被埋在表达式里，这里提到显式常量。
    const FETCH_TIMEOUT_MS = 30000;
    const Dom = {
        sleep: (ms) => new Promise((r) => setTimeout(r, Math.max(0, ms || 0))),
        jitter: () => Math.floor(Math.random() * 400),
        sanitizePath: (s) => limited(s, SEG_MAX_BYTES) || "Gallery",
        sanitizeSubpath: (p) => String(p || "").replace(/\\/g, "/").split("/").map((s) => limited(s, SEG_MAX_BYTES)).filter(Boolean).join("/"),
        el(tag, cls, html) {
            const e = document.createElement(tag);
            if (cls) e.className = cls;
            if (html != null && html !== "") e.innerHTML = html;
            return e;
        },
        async fetchPageContent(url, timeoutMs) {
            if (!url) return document;
            const ctrl = typeof AbortController === "function" ? new AbortController() : null;
            const timer = setTimeout(() => { if (ctrl) ctrl.abort(); }, clampInt(timeoutMs, 1000, 120000, FETCH_TIMEOUT_MS));
            try {
                const res = await fetch(url, Object.assign({ credentials: "include" }, ctrl ? { signal: ctrl.signal } : null));
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const doc = document.implementation.createHTMLDocument("");
                doc.documentElement.innerHTML = await res.text();
                return doc;
            } finally {
                clearTimeout(timer); // 无论成功失败都释放定时器，避免悬挂的 fetch 一直占用连接
            }
        },
        downloadViaLink(blobOrUrl, name) {
            const isBlob = (typeof Blob !== "undefined") && (blobOrUrl instanceof Blob);
            const a = document.createElement("a");
            a.download = name || "";
            a.href = isBlob ? URL.createObjectURL(blobOrUrl) : blobOrUrl;
            const href = a.href;
            document.body.appendChild(a);
            a.click();
            a.remove();
            if (isBlob) setTimeout(() => {
                try { URL.revokeObjectURL(href); }
                catch (e) { console.warn("[ExHentai Help] 释放 blob URL 失败:", errText(e)); }
            }, 4000);
        },
        // IndexedDB 操作（has / put / clear）
        async useDatabase(payload) {
            const res = await sendMsg("DB", payload);
            return res && res.success ? res.data : false;
        }
    };

    /* =====================================================================
     * 消息通信（SW 冷启动 port closed 时自动重试唤醒）
     * =================================================================== */
    function sendMsg(type, payload, timeout) {
        return new Promise((resolve) => {
            if (!chrome.runtime || !chrome.runtime.id) return resolve({ success: false, error: i18n.t("extNotRunning") });
            let done = false;
            let timer = 0;
            const finish = (v) => { if (done) return; done = true; clearTimeout(timer); resolve(v); };
            timer = setTimeout(() => finish({ success: false, error: i18n.t("msgTimeout") }), clampInt(timeout, 1000, 120000, 15000));
            const fire = (n) => {
                const retryOr = (err) => {
                    if (done) return;
                    // 退避重试 3 次（300 / 700 / 1500ms）后仍失败才放弃
                    if (n < 3) setTimeout(() => fire(n + 1), [300, 700, 1500][n] || 1500);
                    else finish({ success: false, error: errText(err) || i18n.t("msgFailed") });
                };
                try {
                    chrome.runtime.sendMessage({ type, payload }, (res) => {
                        if (done) return;
                        const le = chrome.runtime.lastError;
                        if (le) return retryOr(le.message);
                        finish(res || { success: false, error: i18n.t("noResponse") });
                    });
                } catch (e) { retryOr(e); }
            };
            fire(0);
        });
    }

    /* 下载：fire-and-forget 派发 + 轮询查询状态
       background 只瞬时派发下载拿 downloadId（不等完成），
       content 侧轮询 chrome.downloads.search 查状态——每次查询都是瞬时操作，
       SW 即使在两次轮询间被回收，下次查询也会自动唤醒。 */
    // Chrome 在判定目标路径不可写时，会把文件静默回落到默认下载目录
    // （Chromium DownloadPathReservationTracker：requested_target_path 不可写 → 换父目录）。
    // 因此下载完成后必须核对真实落盘路径是否仍在目标子目录内。
    function checkLanded(absPath, subpath) {
        const want = String(subpath || "").replace(/\\/g, "/").split("/").filter(Boolean);
        if (!absPath || !want.length) return ""; // 无子目录要求时不校验
        const got = String(absPath).replace(/\\/g, "/").split("/").filter(Boolean);
        const from = got.length - 1 - want.length; // 文件名占最后一位，目录在其前
        if (from < 0) return String(absPath);
        for (let i = 0; i < want.length; i++) {
            if (got[from + i] !== want[i]) return String(absPath);
        }
        return "";
    }

    async function sendDownload({ url, filename, subpath }, ctrl) {
        if (ctrl && ctrl.status === "aborted") return { success: false, error: i18n.t("taskAborted") };
        const res = await sendMsg("DOWNLOAD", { url, filename, subpath });
        if (!res || !res.success) return res || { success: false, error: i18n.t("dispatchFailed") };
        const id = res.downloadId;
        if (typeof id !== "number" || !isFinite(id)) return { success: false, error: i18n.t("dispatchNoId") };
        const start = Date.now();
        let queryErrors = 0;
        while (Date.now() - start < 180000) { // 3 分钟超时
            if (ctrl && ctrl.status === "aborted") return { success: false, error: i18n.t("taskAborted") };
            await Dom.sleep(800);
            if (ctrl && ctrl.status === "aborted") return { success: false, error: i18n.t("taskAborted") };
            const st = await sendMsg("DOWNLOAD_QUERY", { id }, 8000);
            if (st && st.state) {
                queryErrors = 0;
                if (st.state === "complete") {
                    // 下到了目标目录之外：不算失败（文件确实拿到了），但要显式提示真实位置
                    const misplaced = checkLanded(st.filename, subpath);
                    return misplaced ? { success: true, misplaced } : { success: true };
                }
                if (st.state === "interrupted") return { success: false, error: st.error || i18n.t("downloadInterrupted") };
            } else if (++queryErrors >= 5) {
                // 连续 5 次查不到状态（SW 始终不可用）→ 提前放弃，结果与原逻辑（等到 3 分钟超时）一致
                return { success: false, error: i18n.t("downloadTimeout") };
            }
        }
        return { success: false, error: i18n.t("downloadTimeout") };
    }

    function toast(msg, ms) {
        if (!document.body) return;
        let el = document.getElementById("eh-toast");
        if (!el) {
            el = Dom.el("div", "eh-glass eh-toast");
            el.id = "eh-toast";
            document.body.appendChild(el);
        }
        el.textContent = msg == null ? "" : String(msg);
        el.style.opacity = "1";
        clearTimeout(el._t);
        el._t = setTimeout(() => { el.style.opacity = "0"; }, clampInt(ms, 200, 60000, 2200));
    }

    /* =====================================================================
     * 设置（chrome.storage.local 持久化）
     * =================================================================== */
    const Settings = {
        defaults: { paginationOn: true, batchOn: false, downloadSubpath: "", keepOriginalName: true, skipDownloaded: false, concurrency: 6, retryCount: 3, retryDelay: 800 },
        ranges: { concurrency: [1, 8], retryCount: [0, 10], retryDelay: [0, 60000] },
        cache: null,
        // 存储可能被手改 / 跨版本残留脏数据，读取时按默认值做类型收敛与范围夹紧
        normalize(raw) {
            const out = Object.assign({}, this.defaults);
            if (raw && typeof raw === "object") {
                for (const k of Object.keys(raw)) {
                    if (Object.prototype.hasOwnProperty.call(this.defaults, k)) continue; // 已知键走下面的强校验
                    out[k] = raw[k]; // 未知键（如 popupPos）原样保留
                }
            }
            for (const k of Object.keys(this.defaults)) {
                const dflt = this.defaults[k];
                const v = raw && typeof raw === "object" ? raw[k] : undefined;
                if (v === undefined || v === null) continue;
                if (typeof dflt === "boolean") out[k] = !!v;
                else if (typeof dflt === "number") {
                    const n = Number(v);
                    const r = this.ranges[k];
                    out[k] = isFinite(n) ? (r ? Math.max(r[0], Math.min(r[1], n)) : n) : dflt;
                } else if (typeof dflt === "string") out[k] = typeof v === "string" ? v : String(v);
            }
            return out;
        },
        async load() {
            this.cache = this.normalize(null);
            try {
                const stored = await new Promise((resolve) => {
                    try {
                        chrome.storage.local.get("settings", (s) => resolve(s && s.settings));
                    } catch (e) {
                        // 扩展上下文失效时 chrome.storage 会同步抛错：回落默认值，但要说清原因
                        console.warn("[ExHentai Help] 读取设置失败（扩展上下文可能已失效），本次使用默认值:", errText(e));
                        resolve(null);
                    }
                });
                this.cache = this.normalize(stored);
            } catch (e) {
                console.warn("[ExHentai Help] 读取设置失败，本次使用默认值:", errText(e));
            }
            return this.cache;
        },
        get(k) { return this.cache ? this.cache[k] : this.defaults[k]; },
        async set(k, v) {
            this.cache = this.cache || this.normalize(null);
            this.cache[k] = v;
            try {
                await new Promise((resolve) => {
                    try { chrome.storage.local.set({ settings: this.cache }, resolve); }
                    catch (e) {
                        console.warn("[ExHentai Help] 保存设置失败（仅内存生效，刷新后丢失）:", errText(e));
                        resolve();
                    }
                });
            } catch (e) {
                console.warn("[ExHentai Help] 保存设置失败（仅内存生效，刷新后丢失）:", errText(e));
            }
        }
    };

    /* =====================================================================
     * 速度 / 并发控制（反爬：合理并发 + 随机延时）
     * =================================================================== */
    const Speed = {
        // 固定 size 的工作池：永不 reject（单个任务失败不会打断/丢弃其余任务，也不会产生未处理的 rejection）
        async runWithConcurrency(tasks, limit, fn) {
            const list = Array.from(tasks || []);
            const results = new Array(list.length);
            if (!list.length || typeof fn !== "function") return results;
            const size = Math.max(1, Math.min(64, Number(limit) || 1));
            let cursor = 0;
            const worker = async () => {
                while (cursor < list.length) {
                    const i = cursor++;
                    try { results[i] = await fn(list[i]); }
                    catch (e) { results[i] = undefined; } // 任务自身负责记录失败，这里只保证池子不停摆
                }
            };
            const pool = [];
            for (let i = 0; i < Math.min(size, list.length); i++) pool.push(worker());
            await Promise.all(pool);
            return results;
        },
        async fetchWithRetry(url, timeoutMs) {
            if (!url) throw new Error(i18n.t("missingUrl"));
            const retry = clampInt(Settings.get("retryCount"), 0, 10, 3);
            // retryDelay 若被脏数据写成非数字会得到 NaN → 退避变成 0ms 空转，这里收敛一次
            const delay = clampInt(Settings.get("retryDelay"), 0, 60000, Settings.defaults.retryDelay);
            let lastErr;
            for (let i = 0; i <= retry; i++) {
                try { return await Dom.fetchPageContent(url, timeoutMs || FETCH_TIMEOUT_MS); }
                catch (e) { lastErr = e; if (i < retry) await Dom.sleep(delay * (i + 1) + Dom.jitter()); }
            }
            throw lastErr || new Error(i18n.t("requestFailed"));
        }
    };

    /* =====================================================================
     * 弹窗管理器（毛玻璃 + 可拖动 + 视口约束）
     * =================================================================== */
    const Modal = new class {
        constructor() { this.popup = null; }
        open(opts) {
            const o = opts || {};
            this.close();
            const overlay = Dom.el("div"); overlay.id = "eh-overlay";
            const body = Dom.el("div", "eh-glass"); body.id = "eh-popup";
            const handle = Dom.el("div", "eh-drag-handle");
            const close = Dom.el("div", "eh-close", "&times;");
            close.title = i18n.t("cancel");
            close.onclick = () => this.close();
            body.appendChild(handle); body.appendChild(close);

            let titleEl = null;
            if (o.title) {
                // 标题可能包含画廊名（页面内容），用 textContent 而非 innerHTML
                const h = Dom.el("h3", "eh-title");
                h.textContent = o.title;
                body.appendChild(h);
                titleEl = h;
            }
            // 标题旁的实时计数徽标（批量下载：当前序号/总数），默认隐藏，由 setCounter 控制
            const counter = Dom.el("span", "eh-dl-count");
            counter.style.display = "none";
            (titleEl || body).appendChild(counter);

            const content = Dom.el("div", "eh-content");
            if (typeof o.content === "string") content.innerHTML = o.content;
            else if (o.content) content.appendChild(o.content);
            body.appendChild(content);

            // 瀑布流 append（限 200 条防 DOM 膨胀）+ 视口底部约束
            const LOG_MAX = 200;
            const clampToViewport = () => {
                if (!body.style.top) return; // 等初始居中定位后再约束
                const maxTop = Math.max(4, window.innerHeight - body.offsetHeight - 4);
                const curTop = parseFloat(body.style.top);
                if (!isNaN(curTop)) {
                    if (curTop > maxTop) body.style.top = maxTop + "px";
                    if (curTop < 4) body.style.top = "4px";
                }
            };
            content.appendContent = (...nodes) => {
                const atBottom = content.scrollHeight - content.clientHeight <= content.scrollTop + 20;
                nodes.forEach((n) => {
                    if (n === null || n === undefined) return;
                    content.appendChild(typeof n === "string" ? Dom.el("div", null, n) : n);
                });
                while (content.children.length > LOG_MAX) content.removeChild(content.firstChild);
                if (atBottom) setTimeout(() => { content.scrollTop = content.scrollHeight; }, 0);
                clampToViewport();
            };

            if (o.footer && o.footer.length) {
                const footer = Dom.el("div", "eh-footer");
                o.footer.forEach((f) => footer.appendChild(f));
                body.appendChild(footer);
            }

            overlay.appendChild(body);
            // body 缺失时（极端情况）弹窗对象仍完整可用，调用方无需判空
            if (document.body) document.body.appendChild(overlay);
            this.popup = { overlay, body, content, onClose: o.onClose || null, aborted: false };
            this.popup.appendContent = content.appendContent;
            // 传空字符串即隐藏（批量任务开始/切换时更新，中断或完成时隐藏）
            this.popup.setCounter = (text) => {
                counter.textContent = text ? String(text) : "";
                counter.style.display = text ? "inline-block" : "none";
            };

            requestAnimationFrame(() => {
                const w = body.offsetWidth, h = body.offsetHeight;
                let left = Math.max(10, (window.innerWidth - w) / 2);
                let top = Math.max(10, (window.innerHeight - h) / 2 - 40);
                const saved = Settings.get("popupPos");
                if (saved && typeof saved === "object" && isFinite(saved.x) && isFinite(saved.y)) { left = saved.x; top = saved.y; }
                left = Math.max(4, Math.min(left, Math.max(4, window.innerWidth - w - 4)));
                top = Math.max(4, Math.min(top, Math.max(4, window.innerHeight - h - 4)));
                body.style.left = left + "px";
                body.style.top = top + "px";
                body.style.transform = "none";
            });

            this._bindDrag(handle, body);
            return this.popup;
        }
        _bindDrag(handle, body) {
            let sx = 0, sy = 0, ox = 0, oy = 0, dragging = false;
            const down = (e) => {
                dragging = true;
                const rect = body.getBoundingClientRect();
                body.style.transform = "none";
                body.style.left = rect.left + "px";
                body.style.top = rect.top + "px";
                sx = e.clientX; sy = e.clientY; ox = rect.left; oy = rect.top;
                e.preventDefault();
            };
            const move = (e) => {
                if (!dragging) return;
                const maxX = Math.max(4, window.innerWidth - body.offsetWidth - 4);
                const maxY = Math.max(4, window.innerHeight - body.offsetHeight - 4);
                body.style.left = Math.max(4, Math.min(ox + (e.clientX - sx), maxX)) + "px";
                body.style.top = Math.max(4, Math.min(oy + (e.clientY - sy), maxY)) + "px";
            };
            const up = () => {
                if (!dragging) return;
                dragging = false;
                const x = parseFloat(body.style.left), y = parseFloat(body.style.top);
                if (isFinite(x) && isFinite(y)) Settings.set("popupPos", { x, y });
            };
            this._unbindDrag = () => {
                handle.removeEventListener("mousedown", down);
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            };
            handle.addEventListener("mousedown", down);
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        }
        close() {
            if (!this.popup) return;
            const popup = this.popup;
            this.popup = null; // 先摘引用，onClose 里若再触发 close 也不会递归
            if (this._unbindDrag) { this._unbindDrag(); this._unbindDrag = null; }
            popup.aborted = true;
            // onClose 由调用方提供，抛错不能阻断关闭流程本身的收尾
            if (popup.onClose) {
                try { popup.onClose(); }
                catch (e) { console.warn("[ExHentai Help] 弹窗关闭回调抛错:", errText(e)); }
            }
            if (popup.overlay && popup.overlay.parentNode) popup.overlay.parentNode.removeChild(popup.overlay);
        }
    };

    /* =====================================================================
     * 右下角浮动控制面板
     * =================================================================== */
    // 鼠标移出面板后延迟多久自动最小化
    const CP_AUTO_MIN_MS = 2000;
    // 双击判定窗口：单击先等这么久，期间若再来一次点击就判为双击（回到顶部）
    const CP_DBLCLICK_MS = 250;

    // 平滑置顶：优先 scrollTo({behavior:"smooth"})，环境不支持时退回直接赋值 scrollTop
    function smoothToTop(el) {
        if (!el) return;
        if (typeof el.scrollTo === "function") {
            try { el.scrollTo({ top: 0, left: 0, behavior: "smooth" }); return; }
            catch (e) { console.warn("[ExHentai Help] 平滑置顶失败，改为直接置顶:", errText(e)); }
        }
        try { el.scrollTop = 0; }
        catch (e2) { console.warn("[ExHentai Help] 置顶失败:", errText(e2)); }
    }
    // 回到页面顶部：列表页可能是内部容器滚动，容器与文档都要归零
    function scrollPageToTop() {
        const docEl = document.scrollingElement || document.documentElement;
        const sc = AutoPager._scrollerEl();
        smoothToTop(sc || docEl);
        if (sc) smoothToTop(docEl); // 容器滚动时文档本身也可能带偏移
    }

    const ControlPanel = new class {
        constructor() { this.panel = null; this.dock = null; this._timer = 0; this._min = false; this._clickTimer = 0; }
        init() {
            if (!document.body || document.getElementById("eh-control-panel")) return;
            const panel = Dom.el("div", "eh-glass"); panel.id = "eh-control-panel";
            panel.appendChild(Dom.el("div", "eh-cp-title", `<span class="eh-cp-dot"></span>${i18n.t("appName")}`));
            panel.appendChild(this._row(i18n.t("infiniteOn"), i18n.t("infiniteHint"), "eh-sw-infinite", Settings.get("paginationOn"), (v) => {
                Settings.set("paginationOn", v); AutoPager.enabled = v;
            }));
            panel.appendChild(this._row(i18n.t("batchOn"), i18n.t("batchHint"), "eh-sw-batch", Settings.get("batchOn"), (v) => {
                Settings.set("batchOn", v); BatchSelector.init();
            }));

            // 最小化后停靠在右侧的图标：与面板右下角对齐，垂直位置不变
            const dock = Dom.el("div", "eh-glass"); dock.id = "eh-cp-dock";
            dock.title = i18n.t("cpDockHint");
            const img = document.createElement("img");
            img.alt = "";
            img.src = this._iconUrl();
            dock.appendChild(img);

            document.body.append(panel, dock);
            this.panel = panel;
            this.dock = dock;

            // 以 :hover 为准，避免 mouseenter/mouseleave 顺序异常导致的抖动与重复触发
            const hovering = () => (this.panel && this.panel.matches(":hover")) || (this.dock && this.dock.matches(":hover"));
            const schedule = () => {
                clearTimeout(this._timer);
                if (hovering()) return;
                this._timer = setTimeout(() => { if (!hovering()) this.setMin(true); }, CP_AUTO_MIN_MS);
            };
            panel.addEventListener("mouseenter", () => clearTimeout(this._timer));
            panel.addEventListener("mouseleave", schedule);
            dock.addEventListener("mouseenter", () => clearTimeout(this._timer));
            dock.addEventListener("mouseleave", schedule);
            // 单击展开、双击回到顶部：双击必然先派发一次 click，所以单击要延迟一个判定窗口再展开，
            // 否则第一次点击就展开 → 图标立刻隐藏（pointer-events:none）→ 第二次点不到图标，双击永远触发不了
            dock.addEventListener("click", () => {
                if (this._clickTimer) { // 判定窗口内的第二次点击 = 双击
                    clearTimeout(this._clickTimer);
                    this._clickTimer = 0;
                    this.setMin(false);
                    scrollPageToTop();
                    schedule();
                    return;
                }
                this._clickTimer = setTimeout(() => {
                    this._clickTimer = 0;
                    this.setMin(false);
                    schedule(); // 展开后重新计时：鼠标没停在面板上就 2 秒后自动收起
                }, CP_DBLCLICK_MS);
            });
            this.setMin(false);
            schedule(); // 初始展开，2 秒内无交互则自动收起
        }
        _iconUrl() {
            try { if (chrome.runtime && chrome.runtime.getURL) return chrome.runtime.getURL("icons/icon_128.png"); }
            catch (e) { /* 非扩展环境回落相对路径 */ }
            return "icons/icon_128.png";
        }
        // 最小化状态完全由本模块内部维护
        setMin(min) {
            clearTimeout(this._timer);
            this._min = !!min;
            if (!this.panel || !this.dock) return;
            this.panel.classList.toggle("eh-cp-min", this._min);
            this.dock.classList.toggle("eh-cp-dock-show", this._min);
        }
        _row(label, hint, id, checked, onChange) {
            const row = Dom.el("div", "eh-cp-row");
            const left = Dom.el("div");
            left.appendChild(Dom.el("div", "eh-cp-label", label));
            left.appendChild(Dom.el("div", "eh-cp-hint", hint));
            const sw = Dom.el("label", "eh-switch");
            const input = Dom.el("input"); input.type = "checkbox"; input.id = id; input.checked = !!checked;
            input.addEventListener("change", () => onChange(input.checked));
            sw.appendChild(input);
            sw.appendChild(Dom.el("span", "eh-slider"));
            row.appendChild(left); row.appendChild(sw);
            return row;
        }
    };

    /* =====================================================================
     * 无限滚动自动翻页
     * =================================================================== */
    // 从 /s/<token>/<gid>-<n> 之类的 URL 里取页码
    function pageNoOf(url, dflt) {
        try {
            const p = parseInt((new URL(url, location.href).pathname.match(/-(\d+)$/) || [])[1], 10);
            return isFinite(p) ? p : dflt;
        } catch (e) { return dflt; }
    }

    // 触发阈值：滚过可滚动距离的 75% 才允许加载；或距底部不足 600px（内容不足一屏时也能触发）
    const AP_TRIGGER_RATIO = 0.75;
    const AP_NEAR_BOTTOM_PX = 600;
    const AP_DEBOUNCE_MS = 120;  // 防抖：滚动停下后再判定，避免滚动过程中反复计算
    const AP_THROTTLE_MS = 400;  // 节流：两次加载之间的最小间隔

    const AutoPager = new class {
        constructor() {
            this.attached = false; this.enabled = false; this.status = "pending";
            this.previewStyleInserted = false;
            this._raf = 0; this._scrollTimer = 0; this._lastLoadAt = 0;
            this._scroller = undefined; // undefined=尚未探测；null=文档滚动；element=内部滚动容器
            this._img = null; // 大图页状态，进入 /s/ 页时懒初始化
        }
        init() {
            this.enabled = Settings.get("paginationOn");
            if (this.attached) return;
            this.attached = true;
            const path = location.pathname;
            // 捕获阶段监听 window：元素上的 scroll 不冒泡，但会经过 window 的捕获阶段，
            // 因此无论是整页滚动还是内部列表容器滚动都能收到，且只需挂一个监听。
            window.addEventListener("scroll", () => {
                if (!this.enabled || this.status === "loading" || this.status === "non") return;
                clearTimeout(this._scrollTimer);
                this._scrollTimer = setTimeout(() => {
                    if (this._raf) return; // 同一帧内只调度一次，避免回调堆积
                    this._raf = requestAnimationFrame(() => { this._raf = 0; this._maybeLoad(path); });
                }, AP_DEBOUNCE_MS);
            }, { passive: true, capture: true });
            // 窗口尺寸变化后重新探测滚动容器（可能从文档滚动切换为内部容器滚动）
            window.addEventListener("resize", () => { this._scroller = undefined; }, { passive: true });
        }
        // 当前页的内容容器（列表页 .itg / 画廊页 #gdt / 大图页 #i3）
        _containerEl() {
            const p = location.pathname;
            if (/^\/g\//.test(p)) return document.querySelector("#gdt");
            if (/^\/s\//.test(p)) return document.querySelector("#i3");
            return document.querySelector(".itg");
        }
        // 找出真正发生滚动的元素：从内容容器往上找第一个可滚动的祖先，找不到则用文档滚动
        _findScroller() {
            let n = this._containerEl();
            while (n && n !== document.body && n !== document.documentElement) {
                if (n.scrollHeight > n.clientHeight + 8) {
                    const oy = getComputedStyle(n).overflowY;
                    if (oy === "auto" || oy === "scroll" || oy === "overlay") return n;
                }
                n = n.parentElement;
            }
            return null;
        }
        _scrollerEl() {
            if (this._scroller === undefined) this._scroller = this._findScroller();
            else if (this._scroller && !document.contains(this._scroller)) this._scroller = this._findScroller();
            return this._scroller;
        }
        // 是否已接近底部：以「已滚动距离 / 可滚动总距离」为准，容器与文档两种情形分别计算
        _nearBottom() {
            const sc = this._scrollerEl();
            if (sc) {
                const max = sc.scrollHeight - sc.clientHeight;
                if (max <= 8) return true; // 容器不可滚动 → 视为已在底部
                return (sc.scrollTop / max >= AP_TRIGGER_RATIO) || (max - sc.scrollTop <= AP_NEAR_BOTTOM_PX);
            }
            const doc = document.documentElement;
            const se = document.scrollingElement || doc;
            const top = se.scrollTop || window.scrollY || 0;
            const max = doc.scrollHeight - window.innerHeight;
            if (max <= 8) return true; // 页面不足一屏 → 无法靠滚动位置判断，允许触发
            return (top / max >= AP_TRIGGER_RATIO) || (max - top <= AP_NEAR_BOTTOM_PX);
        }
        // 统一的触发入口：加载锁（status）+ 节流（最小间隔）+ 近底部判定，一次只加载一页
        _maybeLoad(path) {
            if (!this.enabled || this.status === "loading" || this.status === "non") return;
            const now = Date.now();
            if (now - this._lastLoadAt < AP_THROTTLE_MS) return;
            if (!this._nearBottom()) return;
            this._lastLoadAt = now;
            if (/^\/g\//.test(path)) this._gallery();
            else if (/^\/s\//.test(path)) this._image();
            else this._home();
        }
        _msg(anchor, text) {
            let e = document.querySelector("#eh-page-message");
            if (!e) {
                e = document.createElement("p");
                e.id = "eh-page-message";
                e.style.textAlign = "center";
                e.style.padding = "10px";
                // 原实现在 anchor 缺失时创建了游离节点（提示永远看不见），这里兜底挂到页面上
                if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(e, anchor);
                else if (document.body) document.body.appendChild(e);
                else return null;
            }
            e.textContent = text;
            return e;
        }
        // 通用翻页：fetch 下一页 → 用新 nav 替换旧 nav（按元素位置取，语义与原版一致）→ 按 href 去重 append
        async _paginate({ getNav, getDocNav, getNext, container }) {
            if (this.status === "loading") return;
            const nav = getNav();
            const msg = this._msg(nav, i18n.t("loadNext"));
            const next = getNext(nav);
            if (!next) { this.status = "non"; if (msg) msg.textContent = i18n.t("loadAllDone"); return; }
            this.status = "loading";
            if (msg) msg.textContent = `${i18n.t("loadNext")}...`;
            try {
                const doc = await Dom.fetchPageContent(next);
                const newNav = getDocNav(doc);
                const oldNav = getNav();
                if (newNav && oldNav) oldNav.innerHTML = newNav.innerHTML;
                const cur = document.querySelector(container);
                const items = doc && doc.querySelector(container);
                if (cur && items) {
                    // 精确按画廊或条目本身的唯一 URL 去重，禁止使用整行的首个任意 <a>（防止同一上传者/分类的画廊被误删）
                    const itemKey = (el) => {
                        const g = el.querySelector(".glink")?.closest("a")
                            || el.querySelector("a[href*='/g/']")
                            || el.querySelector("a[href*='/s/']");
                        if (g && g.href) return g.href;
                        const anyA = el.querySelector("a") || el;
                        return anyA.href || "";
                    };
                    const seen = new Set([...cur.children].map(itemKey).filter(Boolean));
                    const frag = document.createDocumentFragment();
                    [...items.children].forEach((el) => {
                        const k = itemKey(el);
                        if (!k || !seen.has(k)) {
                            frag.appendChild(el);
                            if (k) seen.add(k);
                        }
                    });
                    cur.appendChild(frag);
                    // 新卡片补挂批量勾选框（保留已选状态），否则新加载的画廊选不上
                    if (Settings.get("batchOn")) BatchSelector.refresh();
                }
                this.status = "pending";
                if (msg) msg.textContent = i18n.t("loadMore");
            } catch (e) { this.status = "error"; if (msg) msg.textContent = i18n.t("loadFail"); }
        }
        _home() {
            this._paginate({
                getNav: () => document.querySelectorAll(".searchnav")[1] || document.querySelector(".searchnav"),
                getDocNav: (doc) => doc.querySelectorAll(".searchnav")[1] || doc.querySelector(".searchnav"),
                getNext: (nav) => (nav || document.querySelectorAll(".searchnav")[1])?.querySelector("#dnext")?.href,
                container: ".itg"
            });
        }
        _gallery() {
            this._paginate({
                getNav: () => document.querySelector(".ptb"),
                getDocNav: (doc) => doc.querySelector(".ptb"),
                getNext: (nav) => (nav || document.querySelector(".ptb"))?.querySelector("td:last-child a")?.href,
                container: "#gdt"
            });
        }
        _image() {
            if (this.status === "loading") return;
            const navs = document.querySelectorAll(".sn");
            if (navs.length < 2) return;
            // 懒初始化：以进入页面那张图为基准；共享导航永不替换，始终对应初始页
            if (!this._img) {
                const bottomNav = navs[1];
                const spans = [...bottomNav.querySelectorAll("span")].map((s) => s.textContent.trim());
                const cur = parseInt((location.pathname.match(/-(\d+)$/) || [])[1], 10) || 1;
                const next = bottomNav.querySelector("#next")?.href || null;
                this._img = { bottomNav, cur, tot: parseInt(spans[1], 10) || 0, next: this._validNext(next, cur) ? next : null };
            }
            const st = this._img;
            const msg = this._msg(st.bottomNav, i18n.t("loadNext"));
            if (!st.next) {
                this.status = "non";
                if (msg) msg.textContent = i18n.t("pageAll", { tot: st.tot || st.cur });
                return;
            }
            this.status = "loading";
            if (msg) msg.textContent = i18n.t("loadingPage", { cur: st.cur + 1, tot: st.tot || "?" });
            (async () => {
                try {
                    const url = st.next;
                    const doc = await Dom.fetchPageContent(url);
                    // 状态先行：新「下一页」的页码必须严格大于刚抓取页的页码，否则判定为末页。
                    // 页码不前进 = 原地打转，立即终止 —— 结构上杜绝同一张图无限重复。
                    const cpage = pageNoOf(url, st.cur);
                    const nnext = [...doc.querySelectorAll(".sn #next")].map((a) => a.href).find((h) => h) || null;
                    const npage = nnext ? pageNoOf(nnext, NaN) : NaN;
                    st.cur = cpage;
                    st.next = nnext && !isNaN(npage) && npage > cpage ? nnext : null;
                    // 追加失败不能影响翻页状态机，但必须留下可排查的上下文
                    try { this._appendImagePage(doc, url); }
                    catch (e) { console.warn("[ExHentai Help] 追加大图页失败:", errText(e), url); }
                    if (!this.previewStyleInserted) { const s = document.createElement("style"); s.textContent = "#i3 > div {color:#222;}"; document.head.appendChild(s); this.previewStyleInserted = true; }
                    this.status = st.next ? "pending" : "non";
                    if (msg) msg.textContent = st.next ? i18n.t("pageOf", { cur: st.cur, tot: st.tot || "?" }) : i18n.t("pageAll", { tot: st.tot || st.cur });
                } catch (e) { this.status = "error"; if (msg) msg.textContent = i18n.t("loadFail"); }
            })();
        }
        _validNext(next, cur) {
            if (!next) return false;
            const p = pageNoOf(next, NaN);
            return !isNaN(p) && p > cur;
        }
        // 追加大图页：图片后跟该页自带的导航（其 prev/next 天然以该页为基准）。
        // 每张图 + 自己的导航一一对应，点哪张图，上一张/下一张就以它为参照。
        _appendImagePage(doc, curUrl) {
            const i3 = document.querySelector("#i3");
            const nd = doc && doc.querySelector("#i3");
            if (!i3 || !nd) return;
            const newImg = nd.querySelector("#img");
            if (!newImg) return;
            // 同图防线：待追加页的图片若已在当前页存在，说明翻页链异常，不追加
            const norm = (u) => { try { return new URL(u, location.href).href; } catch (e) { return u; } };
            const ndSrc = newImg.src;
            if (ndSrc && [...i3.querySelectorAll("#img")].some((im) => norm(im.src) === norm(ndSrc))) return;

            // 准确定位 newImg 在 nd 内部的顶层子容器并移入 i3（避免被 whitespace text node 或索引移位影响）
            let wrapper = newImg;
            while (wrapper.parentElement && wrapper.parentElement !== nd) {
                wrapper = wrapper.parentElement;
            }
            i3.appendChild(wrapper);

            // 克隆该页自带的底部导航挂在图片后
            const sns = doc.querySelectorAll(".sn");
            const lastSn = sns.length ? sns[sns.length - 1] : null;
            const ownNav = lastSn ? lastSn.cloneNode(true) : null;
            if (ownNav) {
                // 克隆导航里除 prev/next 外的控件（如全屏切换）带全局 onclick，重复控件会误触全局状态，去掉
                ownNav.querySelectorAll("[onclick]").forEach((e) => {
                    if (e.id !== "prev" && e.id !== "next") e.removeAttribute("onclick");
                });
                i3.appendChild(ownNav);
            }

            // 该页图片点击 → 严格以该页为基准的下一张（优先该页自带 #next，异常时按 URL 页码 +1 兜底）
            const cpage = pageNoOf(curUrl, 1);
            let nextUrl = lastSn ? (lastSn.querySelector("#next")?.href || null) : null;
            const npage = nextUrl ? pageNoOf(nextUrl, NaN) : NaN;
            if (!nextUrl || isNaN(npage) || npage <= cpage) {
                nextUrl = new URL(curUrl, location.href).pathname.replace(/^(.*-)(\d+)$/, (_, a, n) => a + (parseInt(n, 10) + 1));
            }
            if (nextUrl) {
                // 移除图片可能存在的「按全局 #next 跳转」的内联处理，改为强制以本页为基准跳转
                newImg.onclick = null;
                newImg.removeAttribute("onclick");
                newImg.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    location.href = nextUrl;
                }, true);
            }
        }
    };

    /* =====================================================================
     * 下载核心（通用骨架）
     * =================================================================== */
    function dedupeOrdered(entries) {
        const seen = new Set();
        const result = [];
        for (const e of entries.sort((a, b) => a.pageIdx - b.pageIdx || a.elIdx - b.elIdx)) {
            if (e && e.link && !seen.has(e.link)) { seen.add(e.link); result.push(e.link); }
        }
        return result;
    }

    // 打开带暂停/中止按钮的下载弹窗（图片/种子/批量三处共用）
    function openDownloadModal(title) {
        const ctrl = { status: "running" }; // 先建 ctrl：onClose 回调会在 open 期间/之后引用它
        const pauseBtn = Dom.el("button", "eh-dl-pause", i18n.t("pause"));
        const abortBtn = Dom.el("button", "eh-dl-abort", i18n.t("abort"));
        const box = Dom.el("div");
        box.appendChild(Dom.el("b", null, i18n.t("preparing")));
        const modal = Modal.open({
            title, content: box, footer: [pauseBtn, abortBtn],
            onClose: () => { ctrl.status = "aborted"; }
        });
        pauseBtn.onclick = () => {
            if (ctrl.status === "running") {
                ctrl.status = "paused";
                pauseBtn.textContent = i18n.t("resume");
                pauseBtn.style.background = "var(--eh-success)";
                modal.appendContent(`<b style="color:var(--eh-warn)">[${i18n.t("paused")}]</b>`);
            } else if (ctrl.status === "paused") {
                ctrl.status = "running";
                pauseBtn.textContent = i18n.t("pause");
                pauseBtn.style.background = "var(--eh-warn)";
                modal.appendContent(`<b style="color:var(--eh-success)">[${i18n.t("resumed")}]</b>`);
            }
        };
        abortBtn.onclick = () => {
            ctrl.status = "aborted";
            modal.aborted = true;
            modal.appendContent(`<b style="color:var(--eh-danger)">[${i18n.t("aborted")}]</b>`);
            pauseBtn.disabled = true;
            abortBtn.disabled = true;
        };
        modal.ctrl = ctrl;
        return modal;
    }

    // 重试骨架：暂停等待 / aborted / 重试退避 / 失败日志
    // tryOnce 返回 true=成功；字符串=失败原因（参与重试）；抛异常同失败
    async function withRetry(ctrl, modal, label, tryOnce) {
        while (ctrl.status === "paused") await Dom.sleep(400);
        if (ctrl.status === "aborted") return false;
        const retry = clampInt(Settings.get("retryCount"), 0, 10, 3);
        let lastErr;
        for (let attempt = 0; attempt <= retry; attempt++) {
            try {
                const r = await tryOnce();
                if (r === true) return true;
                lastErr = r || i18n.t("downloadFailed");
            } catch (e) { lastErr = errText(e); }
            // 中止后立刻退出，否则「已中止」还会继续重试并发起下载
            if (ctrl.status === "aborted") return false;
            if (attempt < retry) {
                await Dom.sleep(Settings.get("retryDelay") * (attempt + 1) + Dom.jitter());
                while (ctrl.status === "paused") await Dom.sleep(400);
                if (ctrl.status === "aborted") return false;
            }
        }
        if (modal && modal.appendContent) modal.appendContent(logLine("eh-log-fail", i18n.t("downloadFail", { name: label, err: lastErr })));
        return false;
    }

    async function gatherImageLinks(galleryBase, firstDoc, log, ctrl) {
        const nav = firstDoc ? firstDoc.querySelector(".ptt") : null;
        const entries = [];
        const addFrom = (d, pageIdx) => {
            if (!d) return;
            d.querySelectorAll("#gdt a").forEach((a, elIdx) => { if (a.href) entries.push({ link: a.href, pageIdx, elIdx }); });
        };
        const say = (m) => { if (typeof log === "function") log(m); };
        if (!nav) { addFrom(firstDoc, 0); return dedupeOrdered(entries); }
        // 总页数解析失败 → 按 1 页处理（NaN 会让 Array(NaN) 直接抛 RangeError，整个下载静默中断）
        const total = parseInt([...nav.querySelectorAll("td")].slice(-2)[0]?.textContent || "1", 10) || 1;
        say(i18n.t("collecting", { total }));
        if (total <= 1) { addFrom(firstDoc, 0); return dedupeOrdered(entries); }
        const failedPages = [];
        await Speed.runWithConcurrency([...Array(Math.min(total, 10000)).keys()], Settings.get("concurrency"), async (i) => {
            if (ctrl.status === "aborted") return;
            try {
                // 第 0 页复用已抓到的首页，其余按 ?p=N 抓取；单页失败只记录，不拖垮整体收集
                addFrom(i === 0 ? firstDoc : await Speed.fetchWithRetry(`${galleryBase}?p=${i}`), i);
            } catch (e) {
                failedPages.push(i + 1);
                say(i18n.t("pageCollectFail", { n: i + 1, err: errText(e) }));
            }
            await Dom.sleep(Dom.jitter());
        });
        const finalLinks = ctrl.status === "aborted" ? [] : dedupeOrdered(entries);
        if (failedPages.length > 0) finalLinks.failedPages = failedPages;
        return finalLinks;
    }

    function buildFailureReport(failed) {
        const list = Array.isArray(failed) ? failed : [];
        const lines = list.map((f) => `${f.name}\t${f.url}\t${f.error}`);
        const head = [
            i18n.t("reportTitle"),
            i18n.t("reportTime", { time: new Date().toLocaleString() }),
            i18n.t("reportTotal", { n: list.length })
        ].join("\n");
        return head + "\n\n" + lines.join("\n");
    }

    // 失败报告（复制/导出/重试）：整块渲染在日志末尾。
    // 先移除旧块再重新追加，保证它永远是 content 的最后一个子节点 —— 不会随日志增长而上移。
    function showReport(modal, failed, onRetry) {
        const list = Array.isArray(failed) ? failed : [];
        const old = modal.body ? modal.body.querySelector(".eh-report") : null;
        if (old) old.remove();
        const wrap = Dom.el("div", "eh-report");
        wrap.appendChild(Dom.el("div", "eh-report-title", `${i18n.t("failureReport")} (${list.length})`));
        const ul = Dom.el("ul");
        list.slice(0, 200).forEach((f) => {
            const li = Dom.el("li");
            li.appendChild(document.createTextNode(`${f.name} — ${f.url}`));
            li.appendChild(document.createElement("br"));
            li.appendChild(document.createTextNode("↳ " + f.error));
            ul.appendChild(li);
        });
        wrap.appendChild(ul);
        const actions = Dom.el("div", "eh-report-actions");
        const exp = Dom.el("button", "eh-btn eh-btn--ghost", i18n.t("exportReport"));
        exp.onclick = () => {
            try {
                Dom.downloadViaLink(new Blob(["\uFEFF" + buildFailureReport(list)], { type: "text/plain;charset=utf-8" }), "exhentai_failure_report.txt");
            } catch (e) { toast(errText(e)); }
        };
        const copy = Dom.el("button", "eh-btn eh-btn--ghost", i18n.t("copyReport"));
        copy.onclick = () => {
            const text = buildFailureReport(list);
            const ok = () => modal.appendContent(logLine("eh-log-ok", i18n.t("reportCopied")));
            const fail = () => modal.appendContent(logLine("eh-log-fail", i18n.t("copyFail")));
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fail);
                else fail();
            } catch (e) { fail(); }
        };
        actions.append(exp, copy);
        wrap.appendChild(actions);
        // 重试按钮作为报告块的一部分，固定在复制/导出下方（即报告底部）
        if (typeof onRetry === "function") {
            // 结构性失败（整页缩略图丢失、残留的目录不可用条目）重试单张必然失败，
            // 不能计入按钮条数，否则「重试全部失败项 (N)」里有几项注定原地打转
            const nRetry = list.filter((f) => f.retryable !== false).length;
            const rb = Dom.el("button", "eh-btn eh-dl-abort eh-report-retry", `${i18n.t("retryAllFailed")} (${nRetry})`);
            rb.disabled = nRetry === 0;
            rb.onclick = () => onRetry();
            wrap.appendChild(rb);
        }
        modal.appendContent(wrap);
    }

    // 重试入口：整块报告（含重试按钮）在重试前移除、结束后整体重绘，始终位于底部
    function injectRetryAll(modal, failed, ctrl, retryOne) {
        const list = Array.isArray(failed) ? failed : [];
        if (list.length === 0) return;
        const runRetry = async () => {
            // 先摘掉整块报告：重试期间产生的新日志都排在它后面，结束后再整体重绘到末尾
            const old = modal.body ? modal.body.querySelector(".eh-report") : null;
            if (old) old.remove();
            const todo = list.filter((f) => f.retryable !== false);
            if (!todo.length) return; // 只剩结构性失败，重试单张没有意义
            // 重试同样先探测一次目标目录：否则目录仍不可用时，一次「重试全部」
            // 会把整批文件全撒进默认下载目录 —— 正是目录闸门要防的事
            resetDirGate();
            modal.appendContent(`<b style="color:var(--eh-accent)">${i18n.t("retrying")} ${todo.length} ${i18n.t("failureReport")}</b>`);
            for (const f of todo) {
                if (ctrl.status === "aborted") break;
                let ok = false;
                try { ok = await retryOne(f); } catch (e) { ok = false; }
                // 必须严格判 true：retryOne 还可能返回 DIR_SKIP（目录不可用）等真值对象
                if (ok === true) { const i = list.indexOf(f); if (i >= 0) list.splice(i, 1); }
            }
            if (list.length === 0) modal.appendContent(`<b class="eh-log-ok">${i18n.t("retryAllOk")}</b>`);
            else {
                modal.appendContent(`<b class="eh-log-fail">${i18n.t("donePartial", { n: list.length })}</b>`);
                showReport(modal, list, runRetry);
            }
        };
        showReport(modal, list, runRetry);
    }

    // 统一收尾：汇总失败并展示报告 + 重试按钮
    function finishDownload(modal, ctrl, failed, sharedFailed, retryOne) {
        if (ctrl.status === "aborted") return;
        const list = Array.isArray(failed) ? failed : [];
        if (list.length === 0) {
            if (!sharedFailed) modal.appendContent(`<br><b class="eh-log-ok">${i18n.t("doneOk")}</b>`);
            return;
        }
        if (sharedFailed) {
            list.forEach((f) => sharedFailed.push(f));
            modal.appendContent(`<b class="eh-log-fail">${i18n.t("donePartial", { n: list.length })}</b>`);
        } else {
            modal.appendContent(`<br><b class="eh-log-fail">${i18n.t("donePartial", { n: list.length })}</b>`);
            injectRetryAll(modal, list, ctrl, retryOne); // 报告 + 底部重试按钮，一次整体渲染
        }
    }

    /* 单张图片下载 */
    async function downloadSingleImage(link, index, padLen, opts, ctrl, modal, subpath) {
        const o = opts || {};
        const width = Math.max(1, parseInt(padLen, 10) || 1);
        const seq = String((parseInt(index, 10) || 0) + 1).padStart(width, "0");
        return withRetry(ctrl, modal, seq, async () => {
            let id;
            try { id = new URL(link).pathname.replace("/s/", "").replace(/\//g, "-"); }
            catch (e) { throw new Error(`${i18n.t("badImageUrl")}: ${errText(e)}`); }
            if (o.skipDownloaded && await Dom.useDatabase({ store: "image", action: "has", data: id })) {
                modal.appendContent(logLine("eh-log-skip", i18n.t("skipRecord", { name: seq })));
                return true;
            }
            const page = await Speed.fetchWithRetry(link);
            const rawTitle = ((Array.from(page.querySelectorAll("#i2 > div")).pop()?.textContent || "Image").split("::")[0]).trim() || "Image";
            const title = Dom.sanitizePath(rawTitle.replace(/\.(jpe?g|png|webp|gif|bmp|avif|jfif|tiff?)$/i, "")) || "Image";
            const imgUrl = page.querySelector("#img")?.src;
            if (!imgUrl) throw new Error(i18n.t("noImageUrl"));
            if (/509\.gif/i.test(imgUrl) || /509\s+bandwidth\s+limit/i.test(page.body?.textContent || "")) {
                throw new Error(i18n.t("quotaExceeded"));
            }
            const ext = safeExt(imgUrl);
            const filename = fitFileName(o.keepOriginalName ? `${seq}_${title}` : seq, ext, seq);
            const res = await sendDownload({ url: imgUrl, filename, subpath }, ctrl);
            if (res && res.success) {
                recordLanded(subpath, res.misplaced); // 供目录闸门判定目标目录是否真的可用
                if (res.misplaced) modal.appendContent(logLine("eh-log-warn", i18n.t("downloadMisplaced", { name: filename, path: res.misplaced })));
                else modal.appendContent(`<small class="eh-log-ok">[✓] ${filename}</small>`);
                if (o.skipDownloaded) await Dom.useDatabase({ store: "image", action: "put", data: { id, name: filename, link } });
                return true;
            }
            return (res && res.error) || i18n.t("downloadFailed");
        });
    }

    // 子路径 = [用户自定义子路径] + [画廊名]
    function buildSubpath(galleryName) {
        return [Dom.sanitizeSubpath(Settings.get("downloadSubpath")), Dom.sanitizePath(galleryName)].filter(Boolean).join("/");
    }

    /* ===== 目录就绪闸门 =====
       Chromium 对「目标目录不存在」的下载走的是：先建目录，再 PathIsWritable 校验；
       任一步失败就静默改用 DIR_USER_DOCUMENTS，文件因此掉到画廊文件夹外面。
       目录创建是有条件的（并发下谁负责建、建没建成都不确定），
       所以每个子目录的**首个下载先单独跑完**，把目录坐实之后再放开并发。

       首个下载跑完会顺带核对落盘位置：如果它也没进目标目录，说明这个目录整体不可用
       （写入权限 / macOS 隐私授权 / 跨卷 / 名称非法等）。这时把目录标记为不可用，
       停止本批剩余任务 —— 只损失 1 个文件，而不是把几百张全撒进默认下载目录。
       只在子目录非空时生效（留空 = 存默认目录，本来就不用建目录）。 */
    const dirReady = new Set();    // 子目录 -> 首个下载已跑完
    const dirFirst = new Map();    // 子目录 -> 首个下载的 Promise
    const dirPoison = new Map();   // 子目录 -> 首个文件实际落盘路径（非空即判定不可用）
    const landedAt = new Map();    // 子目录 -> 最近一次下载的实际落盘路径（"" 表示正常）
    // 目录不可用时任务既不下载也不算失败，用这个哨兵跟「真失败」区分开
    const DIR_SKIP = { dirSkipped: true };

    // 每批（每个画廊 / 每次种子批量）开始前清空，保证新一批会重新探测目录
    function resetDirGate() {
        dirReady.clear();
        dirFirst.clear();
        dirPoison.clear();
        landedAt.clear();
    }
    // 下载任务回调：记录本次下载真正落到哪里（"" = 落在目标目录内）
    function recordLanded(subpath, absPath) {
        landedAt.set(String(subpath || ""), String(absPath || ""));
    }

    async function withDirGate(subpath, task, onPoison) {
        const key = String(subpath || "");
        if (!key) return task();                 // 无子目录要求 → 不闸门
        if (dirPoison.has(key)) return DIR_SKIP; // 目录已判不可用 → 直接跳过，不再制造散落文件
        if (dirReady.has(key)) return task();
        let p = dirFirst.get(key);
        if (!p) {
            p = (async () => {
                try { return await task(); }
                finally {
                    dirReady.add(key);           // 失败也要放行，否则整批卡死
                    const got = landedAt.get(key);
                    if (got) {                   // 首个文件就没进目标目录 → 判定目录不可用
                        dirPoison.set(key, got);
                        if (typeof onPoison === "function") onPoison(got);
                    }
                }
            })();
            dirFirst.set(key, p);
            return p;
        }
        await p;                                 // 其余任务只等首个完成，之后各自并发
        if (dirPoison.has(key)) return DIR_SKIP;
        return task();
    }

    // 从任意画廊 URL 取 base（origin + pathname，去掉 ?p=N 等参数）；非法输入返回空串，由调用方跳过
    function galleryBaseFromUrl(u) {
        try { const url = new URL(u); return url.origin + url.pathname; }
        catch (e) { return ""; }
    }

    async function runImageDownload(galleryBase, opts, existingModal, sharedFailed) {
        if (!galleryBase) throw new Error(i18n.t("noGalleryBase"));
        const modal0 = existingModal || null;
        let firstDoc;
        try {
            firstDoc = await Speed.fetchWithRetry(galleryBase);
        } catch (e) {
            // 批量模式下由外层统一记录（带上画廊名），这里只处理单画廊场景，避免重复日志
            if (!modal0) toast(i18n.t("openGalleryFail", { err: errText(e) }));
            throw e;
        }
        const galleryName = firstDoc.querySelector("#gn")?.textContent || "Gallery";
        const modal = modal0 || openDownloadModal(`${i18n.t("allImages")}：${galleryName}`);
        const ctrl = modal.ctrl;
        const subpath = buildSubpath(galleryName);
        resetDirGate(); // 每个画廊重新探测一次目标目录（批量模式是串行的，不会互相干扰）
        const onDirPoison = (p) => modal.appendContent(logLine("eh-log-warn", i18n.t("dirUnusable", { path: p })));

        const links = await gatherImageLinks(galleryBase, firstDoc, (m) => modal.appendContent(logLine("eh-log-skip", m)), ctrl);
        if (ctrl.status === "aborted") return;
        if (links.length === 0) {
            // 收集不到任何链接时原逻辑会显示「全部下载完成」，这里改为明确提示并中止
            modal.appendContent(logLine("eh-log-fail", i18n.t("noImages")));
            return;
        }
        modal.appendContent(logLine("eh-log-ok", i18n.t("collectDone", { count: links.length })));
        const padLen = String(links.length).length;
        const failed = [];
        const itemLabel = (idx) => {
            const seq = String(idx + 1).padStart(padLen, "0");
            return sharedFailed ? `[${galleryName}] ${seq}` : seq;
        };

        if (links.failedPages && links.failedPages.length) {
            const pages = links.failedPages.join(", ");
            modal.appendContent(logLine("eh-log-warn", i18n.t("pageGapWarn", { pages })));
            // 这一条是「整页缩略图没抓到」的结构性缺失：它没有单张图片地址，
            // 重试时只会拿画廊地址当图片页抓 → 必然失败。标记为不可重试，
            // 但仍留在报告里，避免「失败 0」把丢页说成全部成功。
            failed.push({
                name: i18n.t("pageGapName", { name: galleryName }),
                url: galleryBase,
                index: 0,
                padLen,
                subpath,
                retryable: false,
                error: i18n.t("pageGapError", { pages })
            });
        }

        await Speed.runWithConcurrency(links.map((link, index) => ({ link, index })), Settings.get("concurrency"), async (t) => {
            let r = false;
            try { r = await withDirGate(subpath, () => downloadSingleImage(t.link, t.index, padLen, opts, ctrl, modal, subpath), onDirPoison); }
            catch (e) { r = false; }
            // 目标目录不可用：统一提示已在日志里；这里仍计入失败列表，
            // 否则「失败 0 → 全部下载完成」会和「其实只下了 1 张」自相矛盾，而且重试按钮必须存在
            if (r === DIR_SKIP) {
                if (ctrl.status !== "aborted") failed.push({ name: itemLabel(t.index), url: t.link, index: t.index, padLen, subpath, error: i18n.t("dirUnusableShort") });
                return;
            }
            if (!r && ctrl.status !== "aborted") failed.push({ name: itemLabel(t.index), url: t.link, index: t.index, padLen, subpath, error: i18n.t("logAbove") });
        });

        // 重试同样过目录闸门：目录仍不可用时只探测 1 张就刹车，
        // 不会因为一次「重试全部」把整批文件撒进默认下载目录
        finishDownload(modal, ctrl, failed, sharedFailed, (f) => withDirGate(
            f.subpath || subpath,
            () => downloadSingleImage(f.url, f.index, f.padLen, opts, ctrl, modal, f.subpath),
            onDirPoison
        ));
    }

    /* =====================================================================
     * 种子下载核心
     * =================================================================== */
    // 取「最新」种子：按日期最大的那条；全部日期都无法解析时退回第一条可用链接
    function extractLatestTorrent(doc, baseUrl) {
        const forms = doc ? doc.querySelectorAll("form") : [];
        let best = { date: 0, torrentUrl: "", fileName: "" };
        let fallback = null;
        forms.forEach((f) => {
            const a = f.querySelector("a");
            if (!a) return;
            const href = a.getAttribute("href");
            let url = a.href;
            try { if (baseUrl) url = new URL(href || a.href, baseUrl).href; } catch (e) { /* 保持原值 */ }
            const name = (a.textContent || "").trim().replace(/[\\/:*?"<>|]/g, "_") || "torrent";
            const fileName = name.slice(0, 120) + ".torrent";
            if (!fallback) fallback = { date: 0, torrentUrl: url, fileName };
            const dateTxt = f.querySelector("td > span:last-child")?.textContent;
            const d = dateTxt ? new Date(dateTxt).getTime() : NaN;
            if (isFinite(d) && best.date < d) best = { date: d, torrentUrl: url, fileName };
        });
        return best.torrentUrl ? best : (fallback || best);
    }

    async function runTorrentDownload(items, opts, title) {
        const all = Array.isArray(items) ? items : [];
        const list = all.filter((it) => it && it.torrentPageUrl);
        // 区分两种空结果：一个都没勾 vs 勾了但都没有种子（原提示语对后者是错的）
        if (!all.length) { toast(i18n.t("noSelection")); return; }
        if (!list.length) { toast(i18n.t("noTorrent")); return; }
        const modal = openDownloadModal(title || i18n.t("torrentProgress"));
        const ctrl = modal.ctrl;
        const subpath = Dom.sanitizeSubpath(Settings.get("downloadSubpath"));
        resetDirGate();
        const onDirPoison = (p) => modal.appendContent(logLine("eh-log-warn", i18n.t("dirUnusable", { path: p })));
        const padLen = String(list.length).length;
        const failed = [];

        const downloadOne = (item, idx) => withRetry(ctrl, modal, item.name, async () => {
            // 跳过判定先于抓取（与图片流程一致）：已下载过的条目不必再请求种子页
            if (opts.skipDownloaded && await Dom.useDatabase({ store: "torrent", action: "has", data: item.id })) {
                modal.appendContent(logLine("eh-log-skip", i18n.t("skipShort", { name: item.name })));
                return true;
            }
            const doc = await Speed.fetchWithRetry(item.torrentPageUrl);
            const tor = extractLatestTorrent(doc, item.torrentPageUrl);
            if (!tor.torrentUrl) throw new Error(i18n.t("noTorrentLink"));
            const seq = String(idx + 1).padStart(padLen, "0");
            const nm = String(tor.fileName || "").replace(/\.torrent$/i, "");
            const filename = fitFileName(opts.keepOriginalName ? `${seq}_${nm}` : seq, "torrent", seq);
            const res = await sendDownload({ url: tor.torrentUrl, filename, subpath }, ctrl);
            if (res && res.success) {
                recordLanded(subpath, res.misplaced); // 供目录闸门判定目标目录是否真的可用
                if (res.misplaced) modal.appendContent(logLine("eh-log-warn", i18n.t("downloadMisplaced", { name: filename, path: res.misplaced })));
                else modal.appendContent(`<small class="eh-log-ok">[✓] ${filename}</small>`);
                if (opts.skipDownloaded) await Dom.useDatabase({ store: "torrent", action: "put", data: { id: item.id, name: item.name } });
                return true;
            }
            return (res && res.error) || i18n.t("downloadFailed");
        });

        await Speed.runWithConcurrency(list.map((it, i) => ({ it, i })), Settings.get("concurrency"), async ({ it, i }) => {
            const r = await withDirGate(subpath, () => downloadOne(it, i), onDirPoison);
            if (r === DIR_SKIP) {
                if (ctrl.status !== "aborted") failed.push({ name: it.name, url: it.torrentPageUrl, error: i18n.t("dirUnusableShort") });
                return;
            }
            if (!r && ctrl.status !== "aborted") failed.push({ name: it.name, url: it.torrentPageUrl, error: i18n.t("logAbove") });
        });

        // 重试同样过目录闸门（与图片流程一致），避免一次「重试全部」把整批文件撒出去
        finishDownload(modal, ctrl, failed, null, (f) => {
            const i = list.findIndex((x) => x.torrentPageUrl === f.url);
            if (i < 0) return false;
            return withDirGate(subpath, () => downloadOne(list[i], i), onDirPoison);
        });
    }

    /* =====================================================================
     * 配置弹窗
     * =================================================================== */
    function buildConfigModal(onStart, cfgTitle) {
        const wrap = Dom.el("div");
        wrap.innerHTML = `
            <div class="eh-field"><label class="eh-check"><input type="checkbox" id="cfg-keep" ${Settings.get("keepOriginalName") ? "checked" : ""}> ${i18n.t("keepName")}</label> <small style="color:var(--eh-text-soft)">${i18n.t("keepNameHint")}</small></div>
            <div class="eh-field"><label class="eh-check"><input type="checkbox" id="cfg-skip" ${Settings.get("skipDownloaded") ? "checked" : ""}> ${i18n.t("skipDownloaded")}</label> <small style="color:var(--eh-text-soft)">${i18n.t("skipHint")}</small></div>
            <div class="eh-field"><span>${i18n.t("maxConcurrency")}</span><input class="eh-input" id="cfg-conc" type="number" min="1" max="8" value="${Settings.get("concurrency")}" style="width:60px"></div>
            <div class="eh-field"><span>${i18n.t("retryCount")}</span><input class="eh-input" id="cfg-retry" type="number" min="0" max="10" value="${Settings.get("retryCount")}" style="width:60px"></div>
            <div class="eh-field"><span>${i18n.t("downloadPath")}</span></div>
            <div class="eh-field"><input class="eh-input" id="cfg-dir" placeholder="${i18n.t("dirPlaceholder")}" style="width:280px"> <button type="button" class="eh-btn eh-btn--ghost" id="cfg-clear" style="padding:6px 14px">${i18n.t("clearSkipRecord")}</button></div>
            <div class="eh-field"><small style="color:var(--eh-text-soft)">${i18n.t("dirTip")}</small></div>
        `;
        // 已保存的子目录是用户输入，用 value 赋值而不是拼进 innerHTML（避免引号/标签破坏结构）
        const dirInput = wrap.querySelector("#cfg-dir");
        if (dirInput) dirInput.value = Settings.get("downloadSubpath") || "";

        const start = Dom.el("button", "eh-btn", i18n.t("start"));
        const cancel = Dom.el("button", "eh-btn eh-btn--ghost", i18n.t("cancel"));
        Modal.open({ title: cfgTitle || i18n.t("downloadConfig"), content: wrap, footer: [start, cancel] });
        cancel.onclick = () => Modal.close();

        const pick = (sel) => wrap.querySelector(sel);
        const on = (sel, evt, fn) => { const el = pick(sel); if (el) el.addEventListener(evt, fn); return el; };

        // 所有配置项改动即时保存（取消/关闭也不丢）
        const numField = (sel, key, min, max, dflt) => on(sel, "change", () => {
            const el = pick(sel);
            if (!el) return;
            const v = clampInt(el.value, min, max, dflt);
            el.value = v;
            Settings.set(key, v);
        });
        // 兜底默认值与 Settings.defaults 保持一致，避免清空输入框后被静默改成 0
        numField("#cfg-conc", "concurrency", 1, 8, Settings.defaults.concurrency);
        numField("#cfg-retry", "retryCount", 0, 10, Settings.defaults.retryCount);
        on("#cfg-keep", "change", (e) => Settings.set("keepOriginalName", e.target.checked));
        on("#cfg-skip", "change", (e) => Settings.set("skipDownloaded", e.target.checked));
        on("#cfg-dir", "change", (e) => Settings.set("downloadSubpath", String(e.target.value || "").trim()));

        on("#cfg-clear", "click", async () => {
            const ok = await Dom.useDatabase({ store: "image", action: "clear" });
            const ok2 = await Dom.useDatabase({ store: "torrent", action: "clear" });
            toast(ok && ok2 ? i18n.t("clearSkipOk") : i18n.t("clearSkipFail"));
        });

        start.onclick = () => {
            // 同步输入框最新值，避免未触发 change 事件导致改动丢失
            const concEl = pick("#cfg-conc");
            if (concEl) Settings.set("concurrency", clampInt(concEl.value, 1, 8, Settings.defaults.concurrency));
            const retryEl = pick("#cfg-retry");
            if (retryEl) Settings.set("retryCount", clampInt(retryEl.value, 0, 10, Settings.defaults.retryCount));
            const dirEl = pick("#cfg-dir");
            if (dirEl) Settings.set("downloadSubpath", String(dirEl.value || "").trim());

            Modal.close();
            if (typeof onStart !== "function") return;
            const keep = pick("#cfg-keep"), skip = pick("#cfg-skip");
            // 统一兜底：各入口的下载流程都是异步的，漏掉 catch 会变成
            // 「点了开始但什么都没发生」的未处理 rejection
            try {
                const ret = onStart({
                    keepOriginalName: keep ? !!keep.checked : Settings.get("keepOriginalName"),
                    skipDownloaded: skip ? !!skip.checked : Settings.get("skipDownloaded")
                });
                if (ret && typeof ret.catch === "function") ret.catch((e) => toast(errText(e)));
            } catch (e) { toast(errText(e)); }
        };
    }

    /* =====================================================================
     * 画廊页 / 列表页 入口按钮
     * =================================================================== */
    function injectGalleryImageButton() {
        const gdt = document.querySelector("#gdt");
        if (!gdt || !gdt.parentNode || document.getElementById("eh-gallery-actions")) return;
        const wrap = Dom.el("div", "eh-center-bar"); wrap.id = "eh-gallery-actions";
        const btn = Dom.el("button", "eh-glass-btn", i18n.t("allImages"));
        btn.onclick = () => buildConfigModal((opts) => {
            // 不复用当前页 DOM：总从第一页 (?p=0) 开始收集，保证顺序从第一页第一张图开始
            runImageDownload(galleryBaseFromUrl(location.href), opts).catch((e) => toast(errText(e)));
        }, i18n.t("allImages"));
        wrap.appendChild(btn);
        const ptt = document.querySelector(".ptt");
        if (ptt && ptt.parentNode) ptt.parentNode.insertBefore(wrap, ptt);
        else gdt.parentNode.insertBefore(wrap, gdt);
    }

    /* =====================================================================
     * 批量选择（列表页）
     * =================================================================== */
    function normalizeGalleryUrl(u) {
        try { const url = new URL(u); url.search = ""; return url.href.replace(/\/+$/, ""); }
        catch (e) { return ""; }
    }

    // 画廊页地址形如 /g/618395/0f1a2b3c（用于把「标题链接」和种子/标签/上传者链接区分开）
    function isGalleryHref(href) {
        try { return /\/g\/\d+\/[0-9a-z]+/i.test(new URL(href, location.href).pathname); }
        catch (e) { return false; }
    }

    // 我们注入的 UI（id 或 class 以 eh- 开头）——浮在列表上方的弹窗/面板要放行，不能被勾选抢走点击
    function isOwnUi(el) {
        for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
            if (/^eh-/.test(n.id || "")) return true;
            if (typeof n.className === "string" &&
                n.className.split(/\s+/).some((c) => /^eh-/.test(c))) return true;
        }
        return false;
    }

    // 站点浮在条目上的「封面预览」：脱离文档流 + 带图片（img 或背景图）
    function isHoverPane(el) {
        if (!el || el.nodeType !== 1) return false;
        const cs = getComputedStyle(el);
        const floating = cs.position === "absolute" || cs.position === "fixed";
        if (!floating) return false;
        return !!el.querySelector("img") || (cs.backgroundImage && cs.backgroundImage !== "none");
    }

    const BatchSelector = new class {
        constructor() { this.sel = new Map(); this.ui = null; }

        // 勾选框挂在哪个元素上：表格型列表（Minimal / Minimal+ / Compact / Extended）取标题单元格，
        // 网格型列表（Thumbnail）取 .itg 的直接子块 —— 五种列表样式都能贴住条目卡片
        _rowOf(gl, container) {
            const td = gl.closest("td");
            if (td) return td;
            let n = gl;
            while (n && n.parentElement && n.parentElement !== container) n = n.parentElement;
            return (n && n !== container) ? n : (gl.closest("div") || gl.parentElement);
        }

        // 点击兜底（捕获阶段，挂在 document 上）。
        // 光靠勾选层的 z-index 不够：两种 mini 列表（Minimal / Minimal+）没有封面缩略图，
        // 站点会在 hover 时弹出一块封面预览浮层压在行上方，浮层上的图片往往还带画廊链接，
        // 于是手快时点的是勾选层（能选上），手慢时浮层已经弹出来、点下去就进了画廊。
        // 这里不再依赖「谁盖在上面」，而是判断「落点是不是在某个批量条目上」：
        //   1. 命中被提层的缩略图 → 放行，照常打开画廊
        //   2. 落点在条目内部（标题链接、空白区都算）→ 勾选
        //   3. 落点在盖住条目的浮层上 → 用命中测试往下找勾选层，找到就勾选
        //   4. 非画廊链接（种子 / 标签 / 上传者 / 分类）一律放行
        _onDocClick(e) {
            const ui = this.ui;
            if (!ui || !ui.items || !ui.items.length) return;
            const t = e.target;
            if (!t || t.nodeType !== 1 || typeof t.closest !== "function") return;
            if (t.closest(".eh-g-lifted")) return; // 缩略图：点图打开画廊

            let m = ui.items.find((it) => it.hi && it.hi.contains(t));
            if (!m && typeof document.elementsFromPoint === "function") {
                const stack = document.elementsFromPoint(e.clientX, e.clientY);
                const idx = stack.findIndex((el) => el.classList && el.classList.contains("eh-g-overlay"));
                if (idx < 0) return;
                const above = stack.slice(0, idx); // 盖在勾选层之上的东西
                if (above.some((el) => el.closest && el.closest(".eh-g-lifted"))) return; // 缩略图
                if (above.some(isOwnUi)) return;                                          // 我们自己的弹窗/面板
                if (!above.some(isHoverPane)) return;                                     // 只接管站点封面浮层
                m = ui.items.find((it) => it.overlay === stack[idx]);
            }
            if (!m) return;

            const a = t.closest("a");
            if (a && a.href && !isGalleryHref(a.href)) return; // 种子 / 标签 / 上传者等
            e.preventDefault();
            e.stopPropagation();
            ui.toggle(m);
        }

        destroy() {
            if (this._docClick) { document.removeEventListener("click", this._docClick, true); this._docClick = null; }
            document.querySelectorAll(".eh-g-selected").forEach((e) => e.classList.remove("eh-g-selected"));
            document.querySelectorAll(".eh-batch-bar, .eh-g-overlay").forEach((e) => e.remove());
            document.querySelectorAll("[data-eh-bound]").forEach((e) => e.removeAttribute("data-eh-bound"));
            // 还原被提层的缩略图：否则关掉批量模式后，站点的图片会永久留着我们写进去的
            // inline z-index / position（attach 是覆盖式写入，不还原就等于污染页面样式）
            document.querySelectorAll(".eh-g-lifted").forEach((e) => {
                e.classList.remove("eh-g-lifted");
                e.style.zIndex = "";
                e.style.position = "";
            });
            this.ui = null;
        }

        init() {
            this.destroy();
            this.sel = new Map();
            if (!Settings.get("batchOn")) return;
            const table = document.querySelector(".itg");
            if (!table || !table.parentNode) return;
            if (table.querySelectorAll(".glink").length === 0) return;

            const sel = this.sel;
            const items = [];
            const bar = Dom.el("div", "eh-batch-bar eh-glass");
            const count = Dom.el("span", "eh-batch-count");
            const sep = () => Dom.el("span", "eh-batch-sep");
            const mkBtn = (text, ghost) => Dom.el("button", ghost ? "eh-btn eh-btn--ghost" : "eh-btn", text);
            const all = mkBtn(i18n.t("selectAll"), true);
            const invert = mkBtn(i18n.t("invertSel"), true);
            const clear = mkBtn(i18n.t("clearSel"), true);
            const dlTor = mkBtn(i18n.t("downloadTorrentShort"), false);
            const dlImg = mkBtn(i18n.t("downloadImageShort"), false);

            // 已选数量实时刷新；数量为 0 时禁用下载按钮，避免空点
            const updateCount = () => {
                count.textContent = `${i18n.t("selected")}: ${sel.size} ${i18n.t("galleries")}`;
                dlTor.disabled = sel.size === 0;
                dlImg.disabled = sel.size === 0;
            };
            const sync = (m) => {
                const on = sel.has(m.id);
                if (m.hi) m.hi.classList.toggle("eh-g-selected", on);
                m.overlay.classList.toggle("eh-g-active", on);
            };
            const set = (m, on) => { if (on) sel.set(m.id, m); else sel.delete(m.id); sync(m); };

            // 只给未挂过的行补挂勾选框，便于无限滚动追加新卡片后复用（保留已选状态）
            const attach = () => {
                table.querySelectorAll(".glink").forEach((gl, i) => {
                    const row = this._rowOf(gl, table);
                    if (!row || row.dataset.ehBound) return;
                    row.dataset.ehBound = "1";
                    const hi = gl.closest("tr") || row; // 高亮整行，勾选框只占角落
                    const galleryUrl = gl.parentElement?.href || gl.closest("a")?.href || "";
                    const m = {
                        // 取不到画廊链接时用行序号兜底，避免多个空 id 互相覆盖成同一项
                        id: normalizeGalleryUrl(galleryUrl) || `row-${i}`,
                        name: gl.textContent.trim(),
                        galleryUrl,
                        // .gldown 在同行其它单元格里，必须从整行（tr/条目块）查找
                        torrentPageUrl: hi.querySelector(".gldown > a")?.href || "",
                        row, hi, overlay: null
                    };
                    row.style.position = "relative";
                    // 勾选层只负责视觉反馈（hover 淡蓝底 / 选中深蓝底）与命中测试，
                    // 点击统一交给 _onDocClick 处理，避免被站点浮层抢走
                    const overlay = Dom.el("div", "eh-g-overlay");
                    overlay.dataset.gid = m.id;
                    overlay.title = i18n.t("selectHint");
                    m.overlay = overlay;
                    row.appendChild(overlay);
                    // 缩略图提升层级压在勾选层之上：点图照常打开画廊，不算勾选。
                    // 以 hi（整行）为范围查找，表格型列表的缩略图在同行其它单元格里也能覆盖到
                    (hi || row).querySelectorAll("img").forEach((img) => {
                        const lift = (el) => {
                            if (!el) return;
                            el.style.position = "relative";
                            el.style.zIndex = "31";
                            el.classList.add("eh-g-lifted"); // _onDocClick 据此放行
                        };
                        lift(img);
                        const a = img.closest("a");
                        // 只提升「纯缩略图」链接；若该链接同时包着标题，则只提升图片本身
                        if (a && !a.querySelector(".glink")) lift(a);
                    });
                    items.push(m);
                    sync(m);
                });
            };
            attach();

            all.onclick = () => { items.forEach((m) => set(m, true)); updateCount(); };
            invert.onclick = () => { items.forEach((m) => set(m, !sel.has(m.id))); updateCount(); };
            clear.onclick = () => { items.forEach((m) => set(m, false)); updateCount(); };
            // 过滤交给各自的 runner 内部做：它们才知道「没勾」和「勾了但没资源」的区别，
            // 在这里先过滤会让空集合的原因丢失，提示语只能一律说成「请先勾选画廊」
            dlTor.onclick = () => {
                // 与其余提示保持一致用 toast，alert 会阻塞页面
                const picked = [...sel.values()];
                if (!picked.length) return toast(i18n.t("noSelection"));
                buildConfigModal((opts) => runTorrentDownload(picked, opts, i18n.t("torrentProgress")), i18n.t("downloadTorrentShort"));
            };
            dlImg.onclick = () => {
                const picked = [...sel.values()];
                if (!picked.length) return toast(i18n.t("noSelection"));
                buildConfigModal((opts) => runGalleriesImageDownload(picked, opts), i18n.t("batchGalleryProgress"));
            };

            bar.append(Dom.el("strong", null, i18n.t("batchBarTitle")), count, sep(), all, invert, clear, sep(), dlTor, dlImg);
            table.parentNode.insertBefore(bar, table);
            updateCount();
            // 捕获阶段优先于站点自身的链接跳转与浮层，保证「点在条目上就是勾选」
            const toggle = (m) => { set(m, !sel.has(m.id)); updateCount(); };
            this.ui = { table, bar, attach, updateCount, items, toggle };
            this._docClick = (e) => this._onDocClick(e);
            document.addEventListener("click", this._docClick, true);
        }

        // 无限滚动追加新卡片后补挂勾选框（保留已选状态）
        refresh() {
            if (!Settings.get("batchOn")) return;
            if (!this.ui || !document.contains(this.ui.bar)) { this.init(); return; }
            this.ui.attach();
            this.ui.updateCount();
        }
    };

    async function runGalleriesImageDownload(items, opts) {
        const all = Array.isArray(items) ? items : [];
        // 无画廊地址的条目无法下载，直接过滤（否则会误用当前页地址重复下载同一画廊）
        const list = all.filter((it) => it && it.galleryUrl);
        if (!all.length) { toast(i18n.t("noSelection")); return; }
        if (!list.length) { toast(i18n.t("noGallery")); return; }
        const modal = openDownloadModal(i18n.t("batchGalleryProgress"));
        const ctrl = modal.ctrl;
        const sharedFailed = [];
        // 标题旁显示「当前第几个画廊 / 共几个」，随切换实时更新
        const setCounter = (text) => { if (modal.setCounter) modal.setCounter(text); };
        for (let i = 0; i < list.length; i++) {
            const it = list[i];
            if (ctrl.status === "aborted") break;
            setCounter(`${i + 1}/${list.length}`);
            const head = Dom.el("b");
            head.style.color = "var(--eh-accent)";
            head.textContent = `▸ ${it.name}`;
            modal.appendContent(head);
            try { await runImageDownload(galleryBaseFromUrl(it.galleryUrl), opts, modal, sharedFailed); }
            catch (e) { modal.appendContent(logLine("eh-log-fail", `${it.name}: ${errText(e)}`)); }
        }
        setCounter(""); // 完成或中断后隐藏计数
        if (ctrl.status === "aborted") return;
        if (sharedFailed.length === 0) { modal.appendContent(`<b class="eh-log-ok">${i18n.t("doneOk")}</b>`); return; }
        modal.appendContent(`<b class="eh-log-fail">${i18n.t("donePartial", { n: sharedFailed.length })}</b>`);
        injectRetryAll(modal, sharedFailed, ctrl, (f) => {
            if (ctrl.status === "aborted") return false;
            // 直接重试单张失败图片，不重跑整个画廊；subpath 带画廊名保证存到正确目录。
            // 仍过目录闸门：多个画廊各自探测一次，目录不可用就只多花 1 张
            return withDirGate(
                f.subpath,
                () => downloadSingleImage(f.url, f.index, f.padLen, opts, ctrl, modal, f.subpath),
                (p) => modal.appendContent(logLine("eh-log-warn", i18n.t("dirUnusable", { path: p })))
            );
        });
    }

    /* =====================================================================
     * 启动
     * =================================================================== */
    // 各模块独立 try/catch：任一处注入失败不影响其余功能
    function safeInit(label, fn) {
        try { fn(); } catch (e) { console.warn("[ExHentai Help] " + label + " 初始化失败:", e); }
    }

    async function boot() {
        try { await Settings.load(); } catch (e) { /* 已回落默认值 */ }
        safeInit("控制面板", () => ControlPanel.init());
        safeInit("自动翻页", () => AutoPager.init());
        safeInit("画廊图片按钮", () => { if (document.querySelector("#gdt")) injectGalleryImageButton(); });
        safeInit("批量选择", () => { if (document.querySelector(".itg")) BatchSelector.init(); });
    }

    const startBoot = () => { boot().catch((e) => console.warn("[ExHentai Help] 启动失败:", e)); };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", startBoot, { once: true });
    else startBoot();
})();
