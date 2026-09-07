(() => {
    "use strict";

    /* =====================================================================
     * i18n
     * =================================================================== */
    const I18N = {
        zh: {
            appName: "ExHentai 助手",
            batchOn: "批量下载", batchHint: "开：列表页显示画廊勾选框",
            infiniteOn: "无限滚动", infiniteHint: "开：列表/画廊/大图页自动加载下一页",
            batchBarTitle: "批量下载", selectAll: "全选", clearSel: "清除",
            downloadTorrentShort: "下载种子", downloadImageShort: "下载图片",
            selected: "已选", galleries: "个画廊", noSelection: "请先勾选画廊",
            batchGalleryProgress: "批量图片下载进度",
            start: "开始", cancel: "取消", pause: "⏸ 暂停", resume: "▶ 继续", abort: "⏹ 中止",
            downloadConfig: "下载配置", keepName: "保留原图名", keepNameHint: "编号_原图名；关闭则仅编号",
            maxConcurrency: "并发数", retryCount: "重试次数",
            downloadPath: "下载子文件夹", dirPlaceholder: "如 exhentai 或 manga/2024；留空存到默认目录",
            dirTip: "相对浏览器默认下载目录的子文件夹；留空则存到默认目录",
            clearSkipRecord: "清除跳过记录", clearSkipOk: "已清除跳过记录，下次将完整下载", clearSkipFail: "清除失败",
            skipDownloaded: "跳过已下载", allTorrents: "下载本页全部种子", allImages: "下载所有图片",
            preparing: "准备中...", collecting: "正在收集 ${total} 页缩略图链接...",
            collectDone: "共收集到 ${count} 张图片",
            doneOk: "全部下载完成！", donePartial: "下载完成，共 ${n} 个失败（见下方报告）",
            aborted: "任务已被手动中止", paused: "任务已暂停", resumed: "任务已继续",
            failureReport: "失败报告", retryAllFailed: "重试全部失败项", retrying: "重试中",
            retryAllOk: "重试全部完成，无剩余失败项！",
            exportReport: "导出报告(.txt)", copyReport: "复制报告", reportCopied: "报告已复制到剪贴板",
            skipRecord: "[跳过已记录] ${name}", skipShort: "[跳过] ${name}",
            downloadFail: "下载失败：${name} - ${err}",
            torrentProgress: "种子下载进度", torrentDone: "种子下载完成",
            loadNext: "加载下一页", loadMore: "滚动加载更多", loadAllDone: "已加载全部",
            loadFail: "加载失败，滚动重试",
            pageOf: "已显示第 ${cur} / ${tot} 页 · 滚动加载更多",
            pageAll: "已显示全部 ${tot} 页",
            loadingPage: "正在加载第 ${cur} / ${tot} 页..."
        },
        en: {
            appName: "ExHentai Helper",
            batchOn: "Batch", batchHint: "ON: show gallery checkboxes on list",
            infiniteOn: "Infinite Scroll", infiniteHint: "ON: auto-load next page on list/gallery/image view",
            batchBarTitle: "Batch Download", selectAll: "All", clearSel: "Clear",
            downloadTorrentShort: "Torrent", downloadImageShort: "Images",
            selected: "Selected", galleries: "galleries", noSelection: "Select galleries first",
            batchGalleryProgress: "Batch image download",
            start: "Start", cancel: "Cancel", pause: "⏸ Pause", resume: "▶ Resume", abort: "⏹ Abort",
            downloadConfig: "Download Config", keepName: "Keep original name", keepNameHint: "seq_name; off = seq only",
            maxConcurrency: "Concurrency", retryCount: "Retries",
            downloadPath: "Download subfolder", dirPlaceholder: "e.g. exhentai or manga/2024; empty=default",
            dirTip: "Subfolder under browser default download dir; empty = default dir",
            clearSkipRecord: "Clear skip records", clearSkipOk: "Skip records cleared, will re-download", clearSkipFail: "Clear failed",
            skipDownloaded: "Skip downloaded", allTorrents: "Download all torrents", allImages: "Download all images",
            preparing: "Preparing...", collecting: "Collecting ${total} thumbnail pages...",
            collectDone: "Collected ${count} images",
            doneOk: "All downloads complete!", donePartial: "Done, ${n} failed (see report below)",
            aborted: "Task aborted by user", paused: "Task paused", resumed: "Task resumed",
            failureReport: "Failure Report", retryAllFailed: "Retry all failed", retrying: "Retrying",
            retryAllOk: "All retries done, no failures left!",
            exportReport: "Export report (.txt)", copyReport: "Copy report", reportCopied: "Report copied to clipboard",
            skipRecord: "[skipped] ${name}", skipShort: "[skipped] ${name}",
            downloadFail: "Download failed: ${name} - ${err}",
            torrentProgress: "Torrent progress", torrentDone: "Torrents done",
            loadNext: "Load next page", loadMore: "Scroll for more", loadAllDone: "All loaded",
            loadFail: "Load failed, scroll to retry",
            pageOf: "Showing page ${cur} / ${tot} · scroll for more",
            pageAll: "All ${tot} pages shown",
            loadingPage: "Loading page ${cur} / ${tot}..."
        }
    };
    const i18n = new class {
        constructor() { this.lang = (navigator.language || "zh").includes("zh") ? "zh" : "en"; }
        t(key, params = {}) {
            const s = I18N[this.lang]?.[key] || I18N.zh[key] || key;
            return s.replace(/\$\{([^}]+)\}/g, (_, k) => (params[k.trim()] !== undefined ? params[k.trim()] : _));
        }
    }();

    /* =====================================================================
     * DOM / 网络工具
     * =================================================================== */
    const cleanSeg = (s) => String(s || "")
        .replace(/[\u0000-\u001f\u007f\s]+/g, "_")
        .replace(/[\\/:*?"<>|]/g, "_")
        .replace(/\.{2,}/g, ".")
        .replace(/^\.+/, "")
        .replace(/_+/g, "_");
    const Dom = {
        sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
        jitter: () => Math.floor(Math.random() * 400),
        sanitizePath: (s) => cleanSeg(s).slice(0, 120) || "Gallery",
        sanitizeSubpath: (p) => (p || "").replace(/\\/g, "/").split("/").map((s) => cleanSeg(s).slice(0, 80)).filter(Boolean).join("/"),
        el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; },
        async fetchPageContent(url) {
            if (!url) return document;
            const res = await fetch(url, { credentials: "include" });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const doc = document.implementation.createHTMLDocument("");
            doc.documentElement.innerHTML = await res.text();
            return doc;
        },
        downloadViaLink(blobOrUrl, name) {
            const a = document.createElement("a");
            a.download = name || "";
            a.href = (blobOrUrl instanceof Blob) ? URL.createObjectURL(blobOrUrl) : blobOrUrl;
            document.body.appendChild(a); a.click(); a.remove();
            if (blobOrUrl instanceof Blob) setTimeout(() => URL.revokeObjectURL(a.href), 4000);
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
            if (!chrome.runtime?.id) return resolve({ success: false, error: "插件未运行，请刷新页面" });
            let done = false;
            const finish = (v) => { if (!done) { done = true; clearTimeout(timer); resolve(v); } };
            const timer = setTimeout(() => finish({ success: false, error: "消息超时" }), timeout || 15000);
            const fire = (n) => {
                const retryOr = (err) => {
                    if (n < 3) setTimeout(() => fire(n + 1), [300, 700, 1500][n] || 1500);
                    else finish({ success: false, error: err });
                };
                try {
                    chrome.runtime.sendMessage({ type, payload }, (res) => {
                        if (done) return;
                        const le = chrome.runtime.lastError;
                        if (le) return retryOr(le.message);
                        finish(res || { success: false, error: "无响应" });
                    });
                } catch (e) { retryOr(e.message); }
            };
            fire(0);
        });
    }

    /* 下载：fire-and-forget 派发 + 轮询查询状态
       background 只瞬时派发下载拿 downloadId（不等完成），
       content 侧轮询 chrome.downloads.search 查状态——每次查询都是瞬时操作，
       SW 即使在两次轮询间被回收，下次查询也会自动唤醒。 */
    async function sendDownload({ url, filename, subpath }) {
        const res = await sendMsg("DOWNLOAD", { url, filename, subpath });
        if (!res.success) return res;
        const start = Date.now();
        while (Date.now() - start < 180000) { // 3 分钟超时
            await Dom.sleep(800);
            const st = await sendMsg("DOWNLOAD_QUERY", { id: res.downloadId }, 8000);
            if (st.state === "complete") return { success: true };
            if (st.state === "interrupted") return { success: false, error: st.error || "下载中断" };
        }
        return { success: false, error: "下载超时" };
    }

    function toast(msg, ms) {
        let el = document.getElementById("eh-toast");
        if (!el) { el = Dom.el("div", "eh-glass eh-toast"); el.id = "eh-toast"; document.body.appendChild(el); }
        el.textContent = msg;
        el.style.opacity = "1";
        clearTimeout(el._t);
        el._t = setTimeout(() => { el.style.opacity = "0"; }, ms || 2200);
    }

    /* =====================================================================
     * 设置（chrome.storage.local 持久化）
     * =================================================================== */
    const Settings = {
        defaults: { paginationOn: true, batchOn: false, downloadSubpath: "", keepOriginalName: true, skipDownloaded: false, concurrency: 6, retryCount: 3, retryDelay: 800 },
        cache: null,
        async load() {
            this.cache = { ...this.defaults };
            try {
                const stored = await new Promise((r) => chrome.storage.local.get("settings", (s) => r(s.settings || null)));
                if (stored) this.cache = { ...this.defaults, ...stored };
            } catch (e) {}
            return this.cache;
        },
        get(k) { return this.cache ? this.cache[k] : this.defaults[k]; },
        async set(k, v) {
            this.cache = this.cache || { ...this.defaults };
            this.cache[k] = v;
            try { await new Promise((r) => chrome.storage.local.set({ settings: this.cache }, r)); } catch (e) {}
        }
    };

    /* =====================================================================
     * 速度 / 并发控制（反爬：合理并发 + 随机延时）
     * =================================================================== */
    const Speed = {
        async runWithConcurrency(tasks, limit, fn) {
            const results = []; const exec = new Set();
            for (const task of tasks) {
                const p = Promise.resolve().then(() => fn(task));
                results.push(p); exec.add(p);
                p.finally(() => exec.delete(p));
                if (exec.size >= limit) await Promise.race(exec);
            }
            return Promise.all(results);
        },
        async fetchWithRetry(url) {
            const retry = Settings.get("retryCount");
            let lastErr;
            for (let i = 0; i <= retry; i++) {
                try { return await Dom.fetchPageContent(url); }
                catch (e) { lastErr = e; if (i < retry) await Dom.sleep(Settings.get("retryDelay") * (i + 1) + Dom.jitter()); }
            }
            throw lastErr;
        }
    };

    /* =====================================================================
     * 弹窗管理器（毛玻璃 + 可拖动 + 视口约束）
     * =================================================================== */
    const Modal = new class {
        constructor() { this.popup = null; }
        open(opts) {
            this.close();
            const overlay = Dom.el("div"); overlay.id = "eh-overlay";
            const body = Dom.el("div", "eh-glass"); body.id = "eh-popup";
            const handle = Dom.el("div", "eh-drag-handle");
            const close = Dom.el("div", "eh-close", "&times;");
            close.title = i18n.t("cancel");
            close.onclick = () => this.close();
            body.appendChild(handle); body.appendChild(close);

            if (opts.title) body.appendChild(Dom.el("h3", "eh-title", opts.title));

            const content = Dom.el("div", "eh-content");
            if (typeof opts.content === "string") content.innerHTML = opts.content;
            else if (opts.content) content.appendChild(opts.content);
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
                nodes.forEach((n) => content.appendChild(typeof n === "string" ? Dom.el("div", null, n) : n));
                while (content.children.length > LOG_MAX) content.removeChild(content.firstChild);
                if (atBottom) setTimeout(() => { content.scrollTop = content.scrollHeight; }, 0);
                clampToViewport();
            };

            if (opts.footer && opts.footer.length) {
                const footer = Dom.el("div", "eh-footer");
                opts.footer.forEach((f) => footer.appendChild(f));
                body.appendChild(footer);
            }

            overlay.appendChild(body);
            document.body.appendChild(overlay);
            this.popup = { overlay, body, content, onClose: opts.onClose || null, aborted: false };
            this.popup.appendContent = content.appendContent;

            requestAnimationFrame(() => {
                const w = body.offsetWidth, h = body.offsetHeight;
                let left = Math.max(10, (window.innerWidth - w) / 2);
                let top = Math.max(10, (window.innerHeight - h) / 2 - 40);
                const saved = Settings.get("popupPos");
                if (saved && isFinite(saved.x) && isFinite(saved.y)) { left = saved.x; top = saved.y; }
                left = Math.max(4, Math.min(left, window.innerWidth - w - 4));
                top = Math.max(4, Math.min(top, window.innerHeight - h - 4));
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
                const nx = Math.max(4, Math.min(ox + (e.clientX - sx), window.innerWidth - body.offsetWidth - 4));
                const ny = Math.max(4, Math.min(oy + (e.clientY - sy), window.innerHeight - body.offsetHeight - 4));
                body.style.left = nx + "px";
                body.style.top = ny + "px";
            };
            const up = () => {
                if (dragging) Settings.set("popupPos", { x: parseFloat(body.style.left), y: parseFloat(body.style.top) });
                dragging = false;
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
            if (this._unbindDrag) { this._unbindDrag(); this._unbindDrag = null; }
            if (this.popup.onClose) { try { this.popup.onClose(); } catch (e) {} }
            this.popup.aborted = true;
            if (this.popup.overlay && document.body.contains(this.popup.overlay)) document.body.removeChild(this.popup.overlay);
            this.popup = null;
        }
        get content() { return this.popup ? this.popup.content : null; }
    };

    /* =====================================================================
     * 右下角浮动控制面板
     * =================================================================== */
    const ControlPanel = new class {
        init() {
            if (document.getElementById("eh-control-panel")) return;
            const panel = Dom.el("div", "eh-glass"); panel.id = "eh-control-panel";
            panel.appendChild(Dom.el("div", "eh-cp-title", `<span class="eh-cp-dot"></span>${i18n.t("appName")}`));
            panel.appendChild(this._row(i18n.t("infiniteOn"), i18n.t("infiniteHint"), "eh-sw-infinite", Settings.get("paginationOn"), (v) => {
                Settings.set("paginationOn", v); AutoPager.enabled = v;
            }));
            panel.appendChild(this._row(i18n.t("batchOn"), i18n.t("batchHint"), "eh-sw-batch", Settings.get("batchOn"), (v) => {
                Settings.set("batchOn", v); BatchSelector.init();
            }));
            document.body.appendChild(panel);
        }
        _row(label, hint, id, checked, onChange) {
            const row = Dom.el("div", "eh-cp-row");
            const left = Dom.el("div");
            left.appendChild(Dom.el("div", "eh-cp-label", label));
            left.appendChild(Dom.el("div", "eh-cp-hint", hint));
            const sw = Dom.el("label", "eh-switch");
            const input = Dom.el("input"); input.type = "checkbox"; input.id = id; input.checked = checked;
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
    const AutoPager = new class {
        constructor() { this.attached = false; this.enabled = false; this.status = "pending"; this.previewStyleInserted = false; }
        init() {
            this.enabled = Settings.get("paginationOn");
            if (this.attached) return;
            this.attached = true;
            const path = location.pathname;
            window.addEventListener("scroll", () => {
                if (!this.enabled || this.status === "loading" || this.status === "non") return;
                requestAnimationFrame(() => {
                    if (this.status === "loading" || this.status === "non") return;
                    if (/^\/g\//.test(path)) this._gallery();
                    else if (/^\/s\//.test(path)) this._image();
                    else this._home();
                });
            });
        }
        _msg(anchor, text) {
            let e = document.querySelector("#eh-page-message");
            if (!e) { e = document.createElement("p"); e.id = "eh-page-message"; e.style.textAlign = "center"; e.style.padding = "10px"; if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(e, anchor); }
            e.textContent = text; return e;
        }
        // 通用翻页：fetch 下一页 → 用新 nav 替换旧 nav（按元素位置取，语义与原版一致）→ 按 href 去重 append
        async _paginate({ getNav, getDocNav, getNext, container }) {
            if (this.status === "loading") return;
            const nav = getNav();
            const msg = this._msg(nav, i18n.t("loadNext"));
            const next = getNext();
            if (!next) { this.status = "non"; msg.textContent = i18n.t("loadAllDone"); return; }
            this.status = "loading"; msg.textContent = `${i18n.t("loadNext")}...`;
            try {
                const doc = await Dom.fetchPageContent(next);
                const newNav = getDocNav(doc);
                const oldNav = getNav();
                if (newNav && oldNav) oldNav.innerHTML = newNav.innerHTML;
                const cur = document.querySelector(container);
                const items = doc.querySelector(container);
                if (cur && items) {
                    const seen = new Set([...cur.querySelectorAll("a")].map((a) => a.href));
                    const frag = document.createDocumentFragment();
                    [...items.children].forEach((el) => {
                        const a = el.querySelector("a") || el;
                        if (a && a.href && !seen.has(a.href)) { frag.appendChild(el); seen.add(a.href); }
                    });
                    cur.appendChild(frag);
                }
                this.status = "pending"; msg.textContent = i18n.t("loadMore");
            } catch (e) { this.status = "error"; msg.textContent = i18n.t("loadFail"); }
        }
        _home() {
            this._paginate({
                getNav: () => document.querySelectorAll(".searchnav")[1],
                getDocNav: (doc) => doc.querySelectorAll(".searchnav")[1],
                getNext: () => document.querySelector("#dnext")?.href,
                container: ".itg"
            });
        }
        _gallery() {
            this._paginate({
                getNav: () => document.querySelector(".ptb"),
                getDocNav: (doc) => doc.querySelector(".ptb"),
                getNext: () => document.querySelector(".ptb")?.querySelector("td:last-child a")?.href,
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
                msg.textContent = i18n.t("pageAll", { tot: st.tot || st.cur });
                return;
            }
            this.status = "loading";
            msg.textContent = i18n.t("loadingPage", { cur: st.cur + 1, tot: st.tot || "?" });
            (async () => {
                try {
                    const url = st.next;
                    const doc = await Dom.fetchPageContent(url);
                    // 状态先行：新「下一页」的页码必须严格大于刚抓取页的页码，否则判定为末页。
                    // 页码不前进 = 原地打转，立即终止 —— 结构上杜绝同一张图无限重复。
                    const cpage = parseInt((new URL(url, location.href).pathname.match(/-(\d+)$/) || [])[1], 10) || st.cur;
                    const nnext = [...doc.querySelectorAll(".sn #next")].map((a) => a.href).find((h) => h) || null;
                    const npage = nnext ? parseInt((new URL(nnext, location.href).pathname.match(/-(\d+)$/) || [])[1], 10) : NaN;
                    st.cur = cpage;
                    st.next = nnext && !isNaN(npage) && npage > cpage ? nnext : null;
                    try { this._appendImagePage(doc, url); } catch (e) {}
                    if (!this.previewStyleInserted) { const s = document.createElement("style"); s.textContent = "#i3 > div {color:#222;}"; document.head.appendChild(s); this.previewStyleInserted = true; }
                    this.status = st.next ? "pending" : "non";
                    msg.textContent = st.next ? i18n.t("pageOf", { cur: st.cur, tot: st.tot || "?" }) : i18n.t("pageAll", { tot: st.tot || st.cur });
                } catch (e) { this.status = "error"; msg.textContent = i18n.t("loadFail"); }
            })();
        }
        _validNext(next, cur) {
            if (!next) return false;
            const p = parseInt((new URL(next, location.href).pathname.match(/-(\d+)$/) || [])[1], 10);
            return !isNaN(p) && p > cur;
        }
        // 追加大图页：图片后跟该页自带的导航（其 prev/next 天然以该页为基准）。
        // 每张图 + 自己的导航一一对应，点哪张图，上一张/下一张就以它为参照。
        _appendImagePage(doc, curUrl) {
            const i3 = document.querySelector("#i3");
            const nd = doc.querySelector("#i3");
            if (!i3 || !nd) return;
            // 同图防线：待追加页的图片若已在当前页存在，说明翻页链异常，不追加
            const norm = (u) => { try { return new URL(u, location.href).href; } catch (e) { return u; } };
            const ndSrc = nd.querySelector("#img")?.src;
            if (ndSrc && [...i3.querySelectorAll("#img")].some((im) => norm(im.src) === norm(ndSrc))) return;
            i3.appendChild(nd.firstChild);
            i3.appendChild(nd.querySelector(".sn")?.nextElementSibling || nd.children[1]);
            const sns = doc.querySelectorAll(".sn");
            const lastSn = sns[sns.length - 1];
            const ownNav = lastSn?.cloneNode(true);
            if (ownNav) {
                // 克隆导航里除 prev/next 外的控件（如全屏切换）带全局 onclick，重复控件会误触全局状态，去掉
                ownNav.querySelectorAll("[onclick]").forEach((e) => { if (e.id !== "prev" && e.id !== "next") e.removeAttribute("onclick"); });
                i3.appendChild(ownNav);
            }
            // 该页图片点击 → 严格以该页为基准的下一张（优先该页自带 #next，异常时按 URL 页码 +1 兜底）
            const imgs = i3.querySelectorAll("#img");
            const img = imgs[imgs.length - 1];
            const cpage = parseInt((new URL(curUrl, location.href).pathname.match(/-(\d+)$/) || [])[1], 10) || 1;
            let nextUrl = lastSn?.querySelector("#next")?.href || null;
            const npage = nextUrl ? parseInt((new URL(nextUrl, location.href).pathname.match(/-(\d+)$/) || [])[1], 10) : NaN;
            if (!nextUrl || isNaN(npage) || npage <= cpage) {
                nextUrl = new URL(curUrl, location.href).pathname.replace(/^(.*-)(\d+)$/, (_, a, n) => a + (parseInt(n, 10) + 1));
            }
            if (img && nextUrl) {
                // 移除图片可能存在的「按全局 #next 跳转」的内联处理，改为强制以本页为基准跳转
                img.onclick = null;
                img.removeAttribute("onclick");
                img.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); location.href = nextUrl; }, true);
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
            if (!seen.has(e.link)) { seen.add(e.link); result.push(e.link); }
        }
        return result;
    }

    // 打开带暂停/中止按钮的下载弹窗（图片/种子/批量三处共用）
    function openDownloadModal(title) {
        const pauseBtn = Dom.el("button", "eh-dl-pause", i18n.t("pause"));
        const abortBtn = Dom.el("button", "eh-dl-abort", i18n.t("abort"));
        const modal = Modal.open({
            title, content: `<div><b>${i18n.t("preparing")}</b></div>`, footer: [pauseBtn, abortBtn],
            onClose: () => { ctrl.status = "aborted"; }
        });
        const ctrl = { status: "running" };
        pauseBtn.onclick = () => {
            if (ctrl.status === "running") { ctrl.status = "paused"; pauseBtn.textContent = i18n.t("resume"); pauseBtn.style.background = "var(--eh-success)"; modal.appendContent(`<b style="color:var(--eh-warn)">[${i18n.t("paused")}]</b>`); }
            else if (ctrl.status === "paused") { ctrl.status = "running"; pauseBtn.textContent = i18n.t("pause"); pauseBtn.style.background = "var(--eh-warn)"; modal.appendContent(`<b style="color:var(--eh-success)">[${i18n.t("resumed")}]</b>`); }
        };
        abortBtn.onclick = () => { ctrl.status = "aborted"; modal.aborted = true; modal.appendContent(`<b style="color:var(--eh-danger)">[${i18n.t("aborted")}]</b>`); pauseBtn.disabled = true; abortBtn.disabled = true; };
        modal.ctrl = ctrl;
        return modal;
    }

    // 重试骨架：暂停等待 / aborted / 重试退避 / 失败日志
    // tryOnce 返回 true=成功；字符串=失败原因（参与重试）；抛异常同失败
    async function withRetry(ctrl, modal, label, tryOnce) {
        while (ctrl.status === "paused") await Dom.sleep(400);
        if (ctrl.status === "aborted") return false;
        const retry = Settings.get("retryCount");
        let lastErr;
        for (let attempt = 0; attempt <= retry; attempt++) {
            try {
                const r = await tryOnce();
                if (r === true) return true;
                lastErr = r || "下载失败";
            } catch (e) { lastErr = e.message; }
            if (attempt < retry) await Dom.sleep(Settings.get("retryDelay") * (attempt + 1) + Dom.jitter());
        }
        modal.appendContent(`<small class="eh-log-fail">${i18n.t("downloadFail", { name: label, err: lastErr })}</small>`);
        return false;
    }

    async function gatherImageLinks(galleryBase, firstDoc, log, ctrl) {
        const nav = firstDoc.querySelector(".ptt");
        const entries = [];
        const addFrom = (d, pageIdx) => d.querySelectorAll("#gdt a").forEach((a, elIdx) => { if (a.href) entries.push({ link: a.href, pageIdx, elIdx }); });
        if (!nav) { addFrom(firstDoc, 0); return dedupeOrdered(entries); }
        const total = parseInt([...nav.querySelectorAll("td")].slice(-2)[0]?.textContent || "1", 10);
        log(i18n.t("collecting", { total }));
        await Speed.runWithConcurrency([...Array(total).keys()], Settings.get("concurrency"), async (i) => {
            if (ctrl.status === "aborted") return;
            const doc = i === 0 ? firstDoc : await Speed.fetchWithRetry(`${galleryBase}?p=${i}`);
            addFrom(doc, i);
            await Dom.sleep(Dom.jitter());
        });
        return ctrl.status === "aborted" ? [] : dedupeOrdered(entries);
    }

    function buildFailureReport(failed) {
        const lines = failed.map((f) => `${f.name}\t${f.url}\t${f.error}`);
        return `ExHentai 下载失败报告\n生成时间: ${new Date().toLocaleString()}\n共 ${failed.length} 项\n\n` + lines.join("\n");
    }

    function showReport(modal, failed) {
        const wrap = Dom.el("div", "eh-report");
        wrap.appendChild(Dom.el("div", "eh-report-title", `${i18n.t("failureReport")} (${failed.length})`));
        const ul = Dom.el("ul");
        failed.slice(0, 200).forEach((f) => { const li = Dom.el("li", null, `${f.name} — ${f.url}<br>↳ ${f.error}`); ul.appendChild(li); });
        wrap.appendChild(ul);
        const actions = Dom.el("div", "eh-report-actions");
        const exp = Dom.el("button", "eh-btn eh-btn--ghost", i18n.t("exportReport"));
        exp.onclick = () => Dom.downloadViaLink(new Blob([buildFailureReport(failed)], { type: "text/plain" }), "exhentai_failure_report.txt");
        const copy = Dom.el("button", "eh-btn eh-btn--ghost", i18n.t("copyReport"));
        copy.onclick = () => { navigator.clipboard?.writeText(buildFailureReport(failed)); Modal.content && Modal.content.appendContent(`<small class="eh-log-ok">${i18n.t("reportCopied")}</small>`); };
        actions.append(exp, copy);
        wrap.appendChild(actions);
        modal.appendContent(wrap);
    }

    function injectRetryAll(modal, failed, ctrl, retryOne) {
        const btn = Dom.el("button", "eh-btn eh-dl-abort", i18n.t("retryAllFailed"));
        btn.style.marginTop = "8px";
        btn.onclick = async () => {
            if (failed.length === 0 || btn.disabled) return;
            btn.disabled = true;
            btn.textContent = `${i18n.t("retrying")} (${failed.length})`;
            modal.appendContent(`<b style="color:var(--eh-accent)">${i18n.t("retrying")} ${failed.length} ${i18n.t("failureReport")}</b>`);
            for (const f of [...failed]) {
                if (ctrl.status === "aborted") break;
                let ok = false;
                try { ok = await retryOne(f); } catch (e) { ok = false; }
                if (ok) { const i = failed.indexOf(f); if (i >= 0) failed.splice(i, 1); }
            }
            modal.body.querySelector(".eh-report")?.remove();
            if (failed.length === 0) { modal.appendContent(`<b class="eh-log-ok">${i18n.t("retryAllOk")}</b>`); btn.remove(); }
            else { modal.appendContent(`<b class="eh-log-fail">${i18n.t("donePartial", { n: failed.length })}</b>`); showReport(modal, failed); btn.textContent = `${i18n.t("retryAllFailed")} (${failed.length})`; btn.disabled = false; }
        };
        modal.appendContent(btn);
    }

    // 统一收尾：汇总失败并展示报告 + 重试按钮
    function finishDownload(modal, ctrl, failed, sharedFailed, retryOne) {
        if (ctrl.status === "aborted") return;
        if (failed.length === 0) {
            if (!sharedFailed) modal.appendContent(`<br><b class="eh-log-ok">${i18n.t("doneOk")}</b>`);
            return;
        }
        if (sharedFailed) {
            failed.forEach((f) => sharedFailed.push(f));
            modal.appendContent(`<b class="eh-log-fail">${i18n.t("donePartial", { n: failed.length })}</b>`);
        } else {
            modal.appendContent(`<br><b class="eh-log-fail">${i18n.t("donePartial", { n: failed.length })}</b>`);
            showReport(modal, failed);
            injectRetryAll(modal, failed, ctrl, retryOne);
        }
    }

    /* 单张图片下载 */
    async function downloadSingleImage(link, index, padLen, opts, ctrl, modal, subpath) {
        const seq = String(index + 1).padStart(padLen, "0");
        return withRetry(ctrl, modal, seq, async () => {
            const id = new URL(link).pathname.replace("/s/", "").replace(/\//g, "-");
            if (opts.skipDownloaded && await Dom.useDatabase({ store: "image", action: "has", data: id })) {
                modal.appendContent(`<small class="eh-log-skip">${i18n.t("skipRecord", { name: seq })}</small>`); return true;
            }
            const page = await Speed.fetchWithRetry(link);
            const title = Dom.sanitizePath((Array.from(page.querySelectorAll("#i2 > div")).pop()?.textContent || "Image").split("::")[0]);
            const imgUrl = page.querySelector("#img")?.src;
            if (!imgUrl) throw new Error("无法解析图片地址");
            const ext = (imgUrl.split("?")[0].split(".").pop() || "jpg").slice(0, 5);
            const filename = Dom.sanitizePath(`${opts.keepOriginalName ? seq + "_" + title : seq}.${ext}`);
            const res = await sendDownload({ url: imgUrl, filename, subpath });
            if (res && res.success) {
                modal.appendContent(`<small class="eh-log-ok">[✓] ${filename}</small>`);
                if (opts.skipDownloaded) await Dom.useDatabase({ store: "image", action: "put", data: { id, name: filename, link } });
                return true;
            }
            return res?.error || "下载失败";
        });
    }

    // 子路径 = [用户自定义子路径] + [画廊名]，Chrome 会自动创建不存在的子目录
    function buildSubpath(galleryName) {
        return [Dom.sanitizeSubpath(Settings.get("downloadSubpath")), Dom.sanitizePath(galleryName)].filter(Boolean).join("/");
    }

    // 从任意画廊 URL 取 base（origin + pathname，去掉 ?p=N 等参数）
    function galleryBaseFromUrl(u) {
        try { const url = new URL(u); return url.origin + url.pathname; }
        catch (e) { return location.origin + location.pathname; }
    }

    async function runImageDownload(galleryBase, opts, existingModal, sharedFailed) {
        const firstDoc = await Speed.fetchWithRetry(galleryBase);
        const galleryName = firstDoc.querySelector("#gn")?.textContent || "Gallery";
        const modal = existingModal || openDownloadModal(`${i18n.t("allImages")}：${galleryName}`);
        const ctrl = modal.ctrl;
        const subpath = buildSubpath(galleryName);

        const links = await gatherImageLinks(galleryBase, firstDoc, (m) => modal.appendContent(`<small class="eh-log-skip">${m}</small>`), ctrl);
        if (ctrl.status === "aborted") return;
        modal.appendContent(`<small class="eh-log-ok">${i18n.t("collectDone", { count: links.length })}</small>`);
        const padLen = String(links.length).length;
        const failed = [];

        await Speed.runWithConcurrency(links.map((link, index) => ({ link, index })), Settings.get("concurrency"), async (task) => {
            const ok = await downloadSingleImage(task.link, task.index, padLen, opts, ctrl, modal, subpath);
            if (!ok && ctrl.status !== "aborted") failed.push({ name: String(task.index + 1).padStart(padLen, "0"), url: task.link, index: task.index, padLen, subpath, error: "见上方日志" });
        });

        finishDownload(modal, ctrl, failed, sharedFailed, (f) => downloadSingleImage(f.url, f.index, f.padLen, opts, ctrl, modal, f.subpath));
    }

    /* =====================================================================
     * 种子下载核心
     * =================================================================== */
    function extractLatestTorrent(doc) {
        const forms = doc.querySelectorAll("form");
        let best = { date: 0, torrentUrl: "", fileName: "" };
        forms.forEach((f) => {
            const dateTxt = f.querySelector("td > span:last-child")?.textContent;
            const d = dateTxt ? new Date(dateTxt).getTime() : 0;
            const a = f.querySelector("a");
            if (a && best.date < d) best = { date: d, torrentUrl: a.href, fileName: a.textContent.replace(/[\\/:*?"<>|]/g, "_") + ".torrent" };
        });
        return best;
    }

    async function runTorrentDownload(items, opts, title) {
        const modal = openDownloadModal(title || i18n.t("torrentProgress"));
        const ctrl = modal.ctrl;
        const subpath = Dom.sanitizeSubpath(Settings.get("downloadSubpath"));
        const padLen = String(items.length).length;
        const failed = [];

        const downloadOne = (item, idx) => withRetry(ctrl, modal, item.name, async () => {
            const doc = await Speed.fetchWithRetry(item.torrentPageUrl);
            const tor = extractLatestTorrent(doc);
            if (!tor.torrentUrl) throw new Error("no torrent");
            if (opts.skipDownloaded && await Dom.useDatabase({ store: "torrent", action: "has", data: item.id })) {
                modal.appendContent(`<small class="eh-log-skip">${i18n.t("skipShort", { name: item.name })}</small>`); return true;
            }
            const seq = String(idx + 1).padStart(padLen, "0");
            const filename = Dom.sanitizePath(opts.keepOriginalName ? `${seq}_${tor.fileName}` : `${seq}.torrent`);
            const res = await sendDownload({ url: tor.torrentUrl, filename, subpath });
            if (res && res.success) {
                modal.appendContent(`<small class="eh-log-ok">[✓] ${filename}</small>`);
                if (opts.skipDownloaded) await Dom.useDatabase({ store: "torrent", action: "put", data: { id: item.id, name: item.name } });
                return true;
            }
            return res?.error || "下载失败";
        });

        await Speed.runWithConcurrency(items.map((it, i) => [it, i]), Settings.get("concurrency"), async ([it, i]) => {
            const ok = await downloadOne(it, i);
            if (!ok && ctrl.status !== "aborted") failed.push({ name: it.name, url: it.torrentPageUrl, error: "见上方日志" });
        });

        finishDownload(modal, ctrl, failed, null, (f) => {
            const i = items.findIndex((x) => x.torrentPageUrl === f.url);
            return downloadOne(items[i], i);
        });
    }

    /* =====================================================================
     * 配置弹窗
     * =================================================================== */
    function buildConfigModal(onStart, cfgTitle) {
        const wrap = Dom.el("div");
        wrap.innerHTML = `
            <div class="eh-field"><label class="eh-check"><input type="checkbox" id="cfg-keep" ${Settings.get("keepOriginalName") ? "checked" : ""}> ${i18n.t("keepName")}</label> <small style="color:var(--eh-text-soft)">${i18n.t("keepNameHint")}</small></div>
            <div class="eh-field"><label class="eh-check"><input type="checkbox" id="cfg-skip" ${Settings.get("skipDownloaded") ? "checked" : ""}> ${i18n.t("skipDownloaded")}</label> <small style="color:var(--eh-text-soft)">取消勾选将完整重新下载，同名文件直接覆盖</small></div>
            <div class="eh-field"><span>${i18n.t("maxConcurrency")}</span><input class="eh-input" id="cfg-conc" type="number" min="1" max="8" value="${Settings.get("concurrency")}" style="width:60px"></div>
            <div class="eh-field"><span>${i18n.t("retryCount")}</span><input class="eh-input" id="cfg-retry" type="number" min="0" max="10" value="${Settings.get("retryCount")}" style="width:60px"></div>
            <div class="eh-field"><span>${i18n.t("downloadPath")}</span></div>
            <div class="eh-field"><input class="eh-input" id="cfg-dir" placeholder="${i18n.t("dirPlaceholder")}" value="${Settings.get("downloadSubpath") || ""}" style="width:280px"> <button type="button" class="eh-btn eh-btn--ghost" id="cfg-clear" style="padding:6px 14px">${i18n.t("clearSkipRecord")}</button></div>
            <div class="eh-field"><small style="color:var(--eh-text-soft)">${i18n.t("dirTip")}</small></div>
        `;
        const start = Dom.el("button", "eh-btn", i18n.t("start"));
        const cancel = Dom.el("button", "eh-btn eh-btn--ghost", i18n.t("cancel"));
        Modal.open({ title: cfgTitle || i18n.t("downloadConfig"), content: wrap, footer: [start, cancel] });
        cancel.onclick = () => Modal.close();

        // 所有配置项改动即时保存（取消/关闭也不丢）
        const numField = (sel, key, min, max, dflt) => {
            const el = wrap.querySelector(sel);
            el.addEventListener("change", () => {
                const v = Math.max(min, Math.min(max, parseInt(el.value, 10) || dflt));
                el.value = v;
                Settings.set(key, v);
            });
        };
        numField("#cfg-conc", "concurrency", 1, 8, 6);
        numField("#cfg-retry", "retryCount", 0, 10, 0);
        wrap.querySelector("#cfg-keep").addEventListener("change", (e) => Settings.set("keepOriginalName", e.target.checked));
        wrap.querySelector("#cfg-skip").addEventListener("change", (e) => Settings.set("skipDownloaded", e.target.checked));
        wrap.querySelector("#cfg-dir").addEventListener("change", (e) => Settings.set("downloadSubpath", e.target.value.trim()));

        wrap.querySelector("#cfg-clear").onclick = async () => {
            const ok = await Dom.useDatabase({ store: "image", action: "clear" });
            const ok2 = await Dom.useDatabase({ store: "torrent", action: "clear" });
            toast(ok && ok2 ? i18n.t("clearSkipOk") : i18n.t("clearSkipFail"));
        };

        start.onclick = () => {
            Modal.close();
            onStart({
                keepOriginalName: wrap.querySelector("#cfg-keep").checked,
                skipDownloaded: wrap.querySelector("#cfg-skip").checked
            });
        };
    }

    /* =====================================================================
     * 画廊页 / 列表页 入口按钮
     * =================================================================== */
    function injectGalleryImageButton() {
        const gdt = document.querySelector("#gdt");
        if (!gdt || document.getElementById("eh-gallery-actions")) return;
        const wrap = Dom.el("div", "eh-center-bar"); wrap.id = "eh-gallery-actions";
        const btn = Dom.el("button", "eh-glass-btn", i18n.t("allImages"));
        btn.onclick = () => buildConfigModal((opts) => {
            // 不复用当前页 DOM：总从第一页 (?p=0) 开始收集，保证顺序从第一页第一张图开始
            runImageDownload(galleryBaseFromUrl(location.href), opts);
        }, i18n.t("allImages"));
        wrap.appendChild(btn);
        const ptt = document.querySelector(".ptt");
        if (ptt && ptt.parentNode) ptt.parentNode.insertBefore(wrap, ptt);
        else gdt.parentNode.insertBefore(wrap, gdt);
    }

    function listGalleryTorrentItems() {
        const table = document.querySelector(".itg");
        if (!table) return [];
        return [...table.querySelectorAll(".glink")].map((gl) => {
            const row = gl.closest("tr") || gl.closest("div") || gl.parentElement;
            const galleryUrl = gl.parentElement?.href || gl.closest("a")?.href || "";
            const torrentPageUrl = row.querySelector(".gldown > a")?.href || "";
            const id = (galleryUrl.match(/([0-9a-zA-Z]+)-([0-9a-zA-Z]+)/) || [])[0] || galleryUrl;
            return { id, name: gl.textContent.trim(), galleryUrl, torrentPageUrl };
        }).filter((it) => it.torrentPageUrl);
    }

    function injectListTorrentButton() {
        const table = document.querySelector(".itg");
        if (!table) return;
        const btn = Dom.el("input", "eh-native-btn"); btn.type = "button"; btn.value = i18n.t("allTorrents");
        btn.onclick = () => buildConfigModal((opts) => {
            runTorrentDownload(listGalleryTorrentItems(), opts, i18n.t("torrentProgress"));
        }, i18n.t("allTorrents"));
        table.parentNode.insertBefore(btn, table);
    }

    /* =====================================================================
     * 批量选择（列表页）
     * =================================================================== */
    function normalizeGalleryUrl(u) {
        try { const url = new URL(u); url.search = ""; return url.href.replace(/\/+$/, ""); }
        catch (e) { return u; }
    }

    const BatchSelector = new class {
        init() {
            document.querySelectorAll(".eh-g-selected").forEach((e) => e.classList.remove("eh-g-selected"));
            document.querySelectorAll(".eh-batch-bar, .eh-g-overlay").forEach((e) => e.remove());
            if (!Settings.get("batchOn")) return;
            const table = document.querySelector(".itg");
            if (!table) return;

            const selection = new Map();
            const meta = new Map();
            const glinks = [...table.querySelectorAll(".glink")];
            if (glinks.length === 0) return;

            const bar = Dom.el("div", "eh-batch-bar eh-glass");
            const title = Dom.el("strong", null, i18n.t("batchBarTitle"));
            const count = Dom.el("span", "eh-batch-count", `${i18n.t("selected")}: 0 ${i18n.t("galleries")}`);
            const sep = Dom.el("span", "eh-batch-sep");
            const all = Dom.el("button", "eh-btn eh-btn--ghost", i18n.t("selectAll"));
            const clear = Dom.el("button", "eh-btn eh-btn--ghost", i18n.t("clearSel"));
            const dlTor = Dom.el("button", "eh-btn", i18n.t("downloadTorrentShort"));
            const dlImg = Dom.el("button", "eh-btn", i18n.t("downloadImageShort"));
            const updateCount = () => { count.textContent = `${i18n.t("selected")}: ${selection.size} ${i18n.t("galleries")}`; };
            const toggle = (m) => {
                if (selection.has(m.id)) { selection.delete(m.id); m.row.classList.remove("eh-g-selected"); m.overlay.classList.remove("eh-g-active"); }
                else { selection.set(m.id, m); m.row.classList.add("eh-g-selected"); m.overlay.classList.add("eh-g-active"); }
            };

            glinks.forEach((gl) => {
                const row = gl.closest("td") || gl.closest("tr") || gl.closest("div") || gl.parentElement;
                if (!row) return;
                const galleryUrl = gl.parentElement?.href || gl.closest("a")?.href || "";
                const m = {
                    id: normalizeGalleryUrl(galleryUrl),
                    name: gl.textContent.trim(),
                    galleryUrl,
                    torrentPageUrl: row.querySelector(".gldown > a")?.href || "",
                    row
                };
                meta.set(gl, m);
                row.style.position = "relative";
                const overlay = Dom.el("div", "eh-g-overlay");
                overlay.dataset.gid = m.id;
                overlay.title = i18n.t("batchBarTitle");
                overlay.appendChild(Dom.el("div", "eh-g-checkmark", "✓"));
                overlay.onclick = (e) => { e.preventDefault(); e.stopPropagation(); toggle(m); updateCount(); };
                m.overlay = overlay;
                row.appendChild(overlay);
            });

            all.onclick = () => {
                meta.forEach((m) => {
                    if (!selection.has(m.id)) selection.set(m.id, m);
                    m.row.classList.add("eh-g-selected");
                    m.overlay.classList.add("eh-g-active");
                });
                updateCount();
            };
            clear.onclick = () => {
                selection.clear();
                document.querySelectorAll(".eh-g-selected").forEach((e) => e.classList.remove("eh-g-selected"));
                document.querySelectorAll(".eh-g-active").forEach((e) => e.classList.remove("eh-g-active"));
                updateCount();
            };
            dlTor.onclick = () => {
                if (selection.size === 0) return alert(i18n.t("noSelection"));
                const items = [...selection.values()].filter((m) => m.torrentPageUrl);
                buildConfigModal((opts) => runTorrentDownload(items, opts, i18n.t("torrentProgress")), i18n.t("downloadTorrentShort"));
            };
            dlImg.onclick = () => {
                if (selection.size === 0) return alert(i18n.t("noSelection"));
                buildConfigModal((opts) => runGalleriesImageDownload([...selection.values()], opts), i18n.t("batchGalleryProgress"));
            };

            bar.append(title, count, sep, all, clear, sep.cloneNode(), dlTor, dlImg);
            table.parentNode.insertBefore(bar, table);
        }
    };

    async function runGalleriesImageDownload(items, opts) {
        const modal = openDownloadModal(i18n.t("batchGalleryProgress"));
        const ctrl = modal.ctrl;
        const sharedFailed = [];
        for (const it of items) {
            if (ctrl.status === "aborted") return;
            modal.appendContent(`<b style="color:var(--eh-accent)">▸ ${it.name}</b>`);
            try { await runImageDownload(galleryBaseFromUrl(it.galleryUrl), opts, modal, sharedFailed); }
            catch (e) { modal.appendContent(`<small class="eh-log-fail">${it.name}: ${e.message}</small>`); }
        }
        if (ctrl.status === "aborted") return;
        if (sharedFailed.length === 0) { modal.appendContent(`<b class="eh-log-ok">${i18n.t("doneOk")}</b>`); return; }
        modal.appendContent(`<b class="eh-log-fail">${i18n.t("donePartial", { n: sharedFailed.length })}</b>`);
        showReport(modal, sharedFailed);
        injectRetryAll(modal, sharedFailed, ctrl, (f) => {
            if (ctrl.status === "aborted") return false;
            // 直接重试单张失败图片，不重跑整个画廊；subpath 带画廊名保证存到正确目录
            return downloadSingleImage(f.url, f.index, f.padLen, opts, ctrl, modal, f.subpath);
        });
    }

    /* =====================================================================
     * 启动
     * =================================================================== */
    async function boot() {
        await Settings.load();
        ControlPanel.init();
        AutoPager.init();
        if (document.querySelector("#gdt")) injectGalleryImageButton();
        if (document.querySelector(".itg")) BatchSelector.init();
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
})();
