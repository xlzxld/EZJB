(() => {
    "use strict";

    /* ===== IndexedDB：跳过已下载记录（image / torrent 两个 store） ===== */
    const DB = (() => {
        const DB_NAME = "exhentai_helper";
        const DB_VERSION = 1;
        const STORES = { image: "image_store", torrent: "torrent_store" };
        // 允许被消息层调用的动作白名单（防止原型链上的属性被当成方法调用）
        const ACTIONS = ["has", "put", "clear"];
        let connPromise = null;

        function open() {
            if (connPromise) return connPromise;
            connPromise = new Promise((resolve, reject) => {
                let req;
                try { req = indexedDB.open(DB_NAME, DB_VERSION); }
                catch (e) { reject(e); return; }
                req.onupgradeneeded = () => {
                    const db = req.result;
                    for (const alias of Object.keys(STORES)) {
                        const name = STORES[alias];
                        if (!db.objectStoreNames.contains(name)) db.createObjectStore(name, { keyPath: "id" });
                    }
                };
                req.onsuccess = () => {
                    const db = req.result;
                    // 连接被关闭 / 需要升级时丢弃缓存，下次调用自动重连
                    db.onversionchange = () => { db.close(); connPromise = null; };
                    db.onclose = () => { connPromise = null; };
                    resolve(db);
                };
                req.onerror = () => reject(req.error || new Error("IndexedDB 打开失败"));
                req.onblocked = () => reject(new Error("IndexedDB 被其他页面占用，请关闭其他标签页后重试"));
            }).catch((e) => { connPromise = null; throw e; });
            return connPromise;
        }

        function storeOf(alias, mode) {
            const name = STORES[alias];
            if (!name) return Promise.reject(new Error("未知 store: " + alias));
            return open().then((db) => {
                try { return db.transaction(name, mode || "readonly").objectStore(name); }
                catch (e) { connPromise = null; throw e; } // 连接已关闭（InvalidStateError）→ 下次重连
            });
        }

        // IDBRequest → Promise；统一收敛 onsuccess/onerror 与同步抛错
        function request(alias, mode, exec) {
            return storeOf(alias, mode).then((s) => new Promise((resolve, reject) => {
                let q;
                try { q = exec(s); } catch (e) { reject(e); return; }
                if (!q || typeof q.onsuccess === "undefined") { resolve(undefined); return; }
                q.onsuccess = () => resolve(q.result);
                q.onerror = () => reject(q.error || new Error("IndexedDB 操作失败"));
            }));
        }

        const validKey = (v) => (typeof v === "string" && v.length > 0) || (typeof v === "number" && isFinite(v));

        return {
            actions: ACTIONS,
            has(alias, id) {
                if (!validKey(id)) return Promise.resolve(false);
                return request(alias, "readonly", (s) => s.get(id)).then((r) => !!r);
            },
            put(alias, val) {
                if (!val || typeof val !== "object" || !validKey(val.id)) return Promise.reject(new Error("记录缺少 id"));
                return request(alias, "readwrite", (s) => s.put(val)).then(() => true);
            },
            clear(alias) {
                return request(alias, "readwrite", (s) => s.clear()).then(() => true);
            }
        };
    })();

    /* ===== 路径 / 文件名清洗 =====
       规则与 contentScript 里的 cleanSeg / limited 必须完全一致（含重复下划线折叠、
       尾部点、保留名、以及「按 UTF-8 字节截断」），否则同一份名字在两侧清洗结果不同，
       content 侧按 A 名字去校验落盘路径，实际却被洗成 B，会误报「未保存到目标文件夹」。 */
    const RESERVED_NAME = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\..*)?$/i;
    const SEG_MAX_BYTES = 150;  // 子目录名（与 contentScript 同值）
    const NAME_MAX_BYTES = 180; // 文件名（与 contentScript 同值）

    const cleanSeg = (v) => {
        let s = (v || "")
            .replace(/[\u0000-\u001f\u007f\s]+/g, "_")
            .replace(/[\\/:*?"<>|]/g, "_")
            .replace(/\.{2,}/g, ".")
            .replace(/^\.+/, "")
            .replace(/\.+$/, "") // 尾部点：Windows/Chrome 不接受以点结尾的目录名
            .replace(/_+/g, "_");
        if (RESERVED_NAME.test(s)) s += "_";
        return s;
    };

    // 按 UTF-8 字节截断：文件系统限制的是字节数（macOS APFS / ext4 均 255），
    // 按字符截断会让中文名字超标 → Chrome 判定路径不可写 → 静默回落到默认下载目录。
    const bytesOf = (s) => {
        const t = String(s || "");
        let n = 0;
        for (let i = 0; i < t.length; i++) {
            const c = t.charCodeAt(i);
            if (c < 0x80) n += 1;
            else if (c < 0x800) n += 2;
            else if (c >= 0xd800 && c <= 0xdbff && i + 1 < t.length) {
                const d = t.charCodeAt(i + 1);
                if (d >= 0xdc00 && d <= 0xdfff) { n += 4; i++; }
                else n += 3;
            }
            else n += 3;
        }
        return n;
    };
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
    // 截断后可能又露出尾部点，必须再清一次
    const limited = (s, maxBytes) => {
        const v = cleanSeg(sliceBytes(s, maxBytes || SEG_MAX_BYTES))
            .replace(/\.+$/, "").replace(/_+$/, "");
        return RESERVED_NAME.test(v) ? v + "_" : v;
    };

    // 文件名：彻底清洗非法字符（与 contentScript 的 fitFileName 保持同一套规则）
    const cleanName = (v) => limited(v, NAME_MAX_BYTES);

    // 子文件夹路径：保留 / 作为子目录分隔，仅清洗各级文件夹名
    const cleanSubpath = (v) => !v ? "" : String(v).replace(/\\/g, "/")
        .split("/")
        .map((seg) => limited(seg, SEG_MAX_BYTES))
        .filter(Boolean)
        .join("/");

    // 仅放行 Chrome downloads 支持的协议，避免把异常字符串丢给底层 API
    const SAFE_SCHEME = /^(https?|ftp|blob|data|filesystem|chrome-extension):/i;
    const isSafeUrl = (u) => {
        if (typeof u !== "string" || !u.trim()) return false;
        try { return SAFE_SCHEME.test(new URL(u.trim()).protocol); }
        catch (e) { return false; }
    };

    /* ===== 同一目标路径去重 =====
       content 侧有两层重试：sendMsg 的消息重试（端口丢失/超时）+ withRetry 的任务重试。
       一旦同一张图被派发两次，第二条 downloads.download 会发现目标路径已被前一条占用、
       无法验证可写 —— Chromium 随即静默改用默认下载目录（DownloadPathReservationTracker
       的 target_path_verified=false 分支）。表现就是「同一画廊里零星几张跑到文件夹外面，且偶发」。
       对策：对「同一目标路径 + 同一 URL」只保留一个在途下载，窗口内复用，陈旧则先撤销再重发。
       键里带上 url，保证不同图片永不互相顶掉。 */
    const inFlight = new Map();   // key -> { id, ts }
    const DEDUP_WINDOW = 90000;   // 复用窗口，覆盖消息重试与 retryDelay 的间隔
    const INFLIGHT_MAX = 500;     // 防止常驻 SW 内存泄漏

    function pruneInFlight() {
        const now = Date.now();
        for (const [k, v] of inFlight.entries()) {
            if (now - v.ts >= DEDUP_WINDOW || inFlight.size > INFLIGHT_MAX) {
                inFlight.delete(k);
            }
        }
    }

    function dropDownload(id, done) {
        try {
            chrome.downloads.cancel(id, () => {
                const _ = chrome.runtime.lastError;
                try {
                    chrome.downloads.erase({ id }, () => {
                        const __ = chrome.runtime.lastError;
                        done();
                    });
                } catch (e) { done(); }
            });
        } catch (e) { done(); }
    }

    function dispatchDownload(key, url, relPath) {
        // 顺序不能反：pruneInFlight() 会删掉所有超窗记录，必须先取出 rec 再清理。
        // 若先清理，下面「超窗 → 先撤销再重发」的分支永远进不去，dropDownload 沦为死代码。
        const rec = inFlight.get(key);
        pruneInFlight();
        return new Promise((resolve) => {
            const start = () => {
                chrome.downloads.download({ url, filename: relPath, saveAs: false, conflictAction: "overwrite" }, (id) => {
                    const le = chrome.runtime.lastError;
                    if (le) return resolve({ success: false, error: le.message });
                    inFlight.set(key, { id, ts: Date.now() });
                    resolve({ success: true, downloadId: id });
                });
            };
            if (!rec) return start();
            if (Date.now() - rec.ts >= DEDUP_WINDOW) {
                // 上一轮已超时/中断：先撤销并释放目标路径，再重发，避免新旧两条抢同一个路径
                inFlight.delete(key);
                return dropDownload(rec.id, start);
            }
            // 窗口内：若仍在下载中就直接复用，绝不向同一路径派发第二条
            chrome.downloads.search({ id: rec.id }, (items) => {
                const _ = chrome.runtime.lastError;
                const it = Array.isArray(items) ? items[0] : null;
                if (it && (it.state === "in_progress" || it.state === "paused")) {
                    return resolve({ success: true, downloadId: rec.id, dedup: true });
                }
                inFlight.delete(key); // 已结束（完成/中断）→ 清掉占位，可以重新下载
                start();
            });
        });
    }

    /* ===== 消息处理 ===== */
    // sendResponse 在端口已关闭时会抛错，统一兜底，避免异常冒泡到 onMessage
    const reply = (sendResponse, obj) => { try { sendResponse(obj); } catch (e) {} };
    // 消息体可能来自被篡改的页面，payload 一律做类型收敛
    const payloadOf = (msg) => (msg && msg.payload && typeof msg.payload === "object") ? msg.payload : {};

    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        const type = msg && typeof msg.type === "string" ? msg.type : "";
        const payload = payloadOf(msg);
        try {
            switch (type) {
                case "PING":
                    sendResponse({ success: true, pong: true });
                    return false;

                case "DOWNLOAD": {
                    // fire-and-forget：只调 chrome.downloads.download 拿 downloadId 立即返回。
                    // 不注册 onChanged listener —— 避免在 SW 等待下载完成（可能数秒~数十秒）期间
                    // 被回收导致 listener 丢失、回调永不触发、content 看到 port closed。
                    // 下载状态由 content 侧轮询 DOWNLOAD_QUERY 查询（每次查询是瞬时操作）。
                    const { url, filename, subpath } = payload;
                    if (!isSafeUrl(url)) { sendResponse({ success: false, error: "缺少或非法的 url" }); return false; }
                    const path = cleanSubpath(subpath);
                    const name = cleanName(filename) || "download"; // 清洗后为空时给兜底名，避免只写目录
                    const relPath = (path ? path + "/" : "") + name;
                    const key = relPath + "\n" + url.trim(); // 去重键必须带 url，避免不同图片互相顶掉
                    dispatchDownload(key, url.trim(), relPath)
                        .then((r) => reply(sendResponse, r))
                        .catch((e) => reply(sendResponse, { success: false, error: (e && e.message) || String(e) }));
                    return true; // 异步响应
                }

                case "DOWNLOAD_QUERY": {
                    // 查询单个下载项状态（chrome.downloads.search 是瞬时操作，SW 不会在此期间被回收）
                    const { id } = payload;
                    // id 缺失时 search 会退化成「查全部」，返回的是无关下载项 —— 必须先挡掉
                    if (typeof id !== "number" || !isFinite(id)) {
                        sendResponse({ state: "unknown", error: "缺少 downloadId" });
                        return false;
                    }
                    chrome.downloads.search({ id }, (items) => {
                        const le = chrome.runtime.lastError;
                        if (le) return reply(sendResponse, { state: "unknown", error: le.message });
                        const it = Array.isArray(items) ? items[0] : null;
                        if (!it) return reply(sendResponse, { state: "unknown" });
                        // filename = 绝对落盘路径，供 content 侧核对是否真的存进了目标子目录
                        reply(sendResponse, { state: it.state || "unknown", error: it.error || null, filename: it.filename || "" });
                    });
                    return true;
                }

                case "DB": {
                    const { store: st, action, data } = payload;
                    const fn = DB.actions.indexOf(action) >= 0 ? DB[action] : null;
                    if (typeof fn !== "function") { sendResponse({ success: false, error: "未知操作: " + action }); return false; }
                    fn(st, data)
                        .then((r) => reply(sendResponse, { success: true, data: r }))
                        .catch((e) => reply(sendResponse, { success: false, error: (e && e.message) || String(e) }));
                    return true;
                }

                default:
                    return false;
            }
        } catch (e) {
            // 任何同步异常都必须给出响应，否则 content 侧会一直重试到超时
            reply(sendResponse, { success: false, error: (e && e.message) || String(e) });
            return false;
        }
    });
})();
