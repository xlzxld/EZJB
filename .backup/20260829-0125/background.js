(() => {
    "use strict";

    /* ===== IndexedDB：跳过已下载记录（image / torrent 两个 store） ===== */
    const DB = (() => {
        const STORES = { image: "image_store", torrent: "torrent_store" };
        let conn = null;
        function open() {
            return new Promise((resolve, reject) => {
                if (conn) return resolve(conn);
                const req = indexedDB.open("exhentai_helper", 1);
                req.onupgradeneeded = (e) => {
                    const db = e.target.result;
                    if (!db.objectStoreNames.contains(STORES.image)) db.createObjectStore(STORES.image, { keyPath: "id" });
                    if (!db.objectStoreNames.contains(STORES.torrent)) db.createObjectStore(STORES.torrent, { keyPath: "id" });
                };
                req.onsuccess = (e) => { conn = e.target.result; resolve(conn); };
                req.onerror = (e) => reject(e.target.error);
            });
        }
        function store(name, mode) {
            return open().then(db => db.transaction(STORES[name], mode || "readonly").objectStore(STORES[name]));
        }
        return {
            has(name, id) {
                return store(name).then(s => new Promise((res, rej) => {
                    const q = s.get(id);
                    q.onsuccess = () => res(!!q.result);
                    q.onerror = () => rej(q.error);
                }));
            },
            put(name, val) {
                return store(name, "readwrite").then(s => new Promise((res, rej) => {
                    const q = s.put(val);
                    q.onsuccess = () => res(true);
                    q.onerror = () => rej(q.error);
                }));
            },
            clear(name) {
                return store(name, "readwrite").then(s => new Promise((res, rej) => {
                    const q = s.clear();
                    q.onsuccess = () => res(true);
                    q.onerror = () => rej(q.error);
                }));
            }
        };
    })();

    /* ===== 路径 / 文件名清洗 ===== */
    // 文件名：彻底清洗非法字符
    const cleanName = (v) => (v || "")
        .replace(/[\u0000-\u001f\u007f\s]+/g, "_")
        .replace(/[\\/:*?"<>|]/g, "_")
        .replace(/\.{2,}/g, ".")
        .replace(/^\.+/, "")
        .slice(0, 160);

    // 子文件夹路径：保留 / 作为子目录分隔，仅清洗各级文件夹名
    const cleanSubpath = (v) => {
        if (!v) return "";
        return v.replace(/\\/g, "/").split("/").map(seg => seg
            .replace(/[\u0000-\u001f\u007f\s]+/g, "_")
            .replace(/[\\/:*?"<>|]/g, "_")
            .replace(/\.{2,}/g, ".")
            .replace(/^\.+/, "")
            .slice(0, 80)
        ).filter(Boolean).join("/");
    };

    /* ===== 消息处理 ===== */
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        switch (msg.type) {
            case "PING":
                sendResponse({ success: true, pong: true });
                return false;

            case "DOWNLOAD": {
                // fire-and-forget：只调 chrome.downloads.download 拿 downloadId 立即返回。
                // 不注册 onChanged listener —— 避免在 SW 等待下载完成（可能数秒~数十秒）期间
                // 被回收导致 listener 丢失、回调永不触发、content 看到 port closed。
                // 下载状态由 content 侧轮询 DOWNLOAD_QUERY 查询（每次查询是瞬时操作）。
                const { url, filename, subpath } = msg.payload;
                if (!url) { sendResponse({ success: false, error: "缺少 url" }); return false; }
                const path = cleanSubpath(subpath);
                const full = (path ? path + "/" : "") + cleanName(filename);
                chrome.downloads.download({ url, filename: full, saveAs: false, conflictAction: "overwrite" }, (id) => {
                    if (chrome.runtime.lastError) return sendResponse({ success: false, error: chrome.runtime.lastError.message });
                    sendResponse({ success: true, downloadId: id });
                });
                return true; // 异步响应
            }

            case "DOWNLOAD_QUERY": {
                // 查询单个下载项状态（chrome.downloads.search 是瞬时操作，SW 不会在此期间被回收）
                const { id } = msg.payload;
                chrome.downloads.search({ id }, (items) => {
                    const it = items && items[0];
                    if (!it) return sendResponse({ state: "unknown" });
                    sendResponse({ state: it.state, error: it.error || null });
                });
                return true;
            }

            case "DB": {
                const { store: st, action, data } = msg.payload;
                const fn = DB[action];
                if (typeof fn !== "function") { sendResponse({ success: false, error: "未知操作: " + action }); return false; }
                fn(st, data)
                    .then(r => sendResponse({ success: true, data: r }))
                    .catch(e => sendResponse({ success: false, error: (e && e.message) || String(e) }));
                return true;
            }

            default:
                return false;
        }
    });
})();
