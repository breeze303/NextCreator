/**
 * Tauri Store 存储适配器
 * 用于 Zustand persist 中间件，使用 tauri-plugin-store
 */

// Store 实例缓存
let storeInstance: Awaited<ReturnType<typeof import("@tauri-apps/plugin-store").load>> | null = null;
// Store 初始化 Promise，避免重复初始化
let storeInitPromise: Promise<Awaited<ReturnType<typeof import("@tauri-apps/plugin-store").load>> | null> | null = null;

function getBrowserStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

async function getFallbackItem(key: string): Promise<string | null> {
  try {
    const storage = getBrowserStorage();
    if (!storage) return null;
    return storage.getItem(key);
  } catch (error) {
    console.error("Fallback storage getItem error:", error);
    return null;
  }
}

async function setFallbackItem(key: string, value: string): Promise<void> {
  try {
    const storage = getBrowserStorage();
    if (!storage) return;
    storage.setItem(key, value);
  } catch (error) {
    console.error("Fallback storage setItem error:", error);
  }
}

async function removeFallbackItem(key: string): Promise<void> {
  try {
    const storage = getBrowserStorage();
    if (!storage) return;
    storage.removeItem(key);
  } catch (error) {
    console.error("Fallback storage removeItem error:", error);
  }
}

// 获取或创建 Store 实例
async function getStore() {
  // 如果正在初始化中，等待完成
  if (storeInitPromise) {
    return storeInitPromise;
  }

  // 如果已经初始化完成，直接返回
  if (storeInstance) {
    return storeInstance;
  }

  // 开始初始化
  storeInitPromise = (async () => {
    try {
      const { load } = await import("@tauri-apps/plugin-store");
      storeInstance = await load("app-data.json", { autoSave: false, defaults: {} });
      return storeInstance;
    } catch (error) {
      console.error("Failed to initialize Tauri store:", error);
      storeInitPromise = null;
      return null;
    }
  })();

  return storeInitPromise;
}

// 获取数据
async function getItem(key: string): Promise<string | null> {
  try {
    const store = await getStore();
    if (store) {
      const value = await store.get<string>(key);
      return value ?? null;
    }
    return await getFallbackItem(key);
  } catch (error) {
    console.error("Storage getItem error:", error);
    return await getFallbackItem(key);
  }
}

// save 防抖：合并高频写入，避免频繁磁盘 I/O
let saveTimer: ReturnType<typeof setTimeout> | null = null;
let savePending = false;

function debouncedSave(store: NonNullable<Awaited<ReturnType<typeof getStore>>>) {
  savePending = true;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    if (savePending) {
      savePending = false;
      try {
        await store.save();
      } catch (error) {
        console.error("Storage save error:", error);
      }
    }
  }, 500);
}

// 立即刷盘：清除防抖计时器并同步写入磁盘
// 用于应用关闭前确保数据不丢失
async function flushSave() {
  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  if (savePending && storeInstance) {
    savePending = false;
    try {
      await storeInstance.save();
    } catch (error) {
      console.error("Storage flush save error:", error);
    }
  }
}

// 应用关闭前立即刷盘，防止防抖导致数据丢失
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    void flushSave();
  });
}

// 设置数据
async function setItem(key: string, value: string): Promise<void> {
  try {
    const store = await getStore();
    if (store) {
      await store.set(key, value);
      // 防抖写入磁盘，500ms 内多次 set 只触发一次 save
      debouncedSave(store);
      return;
    }
    await setFallbackItem(key, value);
  } catch (error) {
    console.error("Storage setItem error:", error);
    await setFallbackItem(key, value);
  }
}

// 删除数据
async function removeItem(key: string): Promise<void> {
  try {
    const store = await getStore();
    if (store) {
      await store.delete(key);
      await store.save();
      return;
    }
    await removeFallbackItem(key);
  } catch (error) {
    console.error("Storage removeItem error:", error);
    await removeFallbackItem(key);
  }
}

// 导出符合 Zustand StateStorage 接口的对象
export const tauriStorage = {
  getItem,
  setItem,
  removeItem,
};

// 导出 flushSave 供外部在关键时机（如画布切换前）调用
export { flushSave };
