import { createJSONStorage } from "zustand/middleware";
import type { StateStorage } from "zustand/middleware";
import { tauriStorage } from "@/utils/tauriStorage";

export const TREE_PERSISTENCE_KEYS = {
  sessions: "next-creator-tree-sessions",
  models: "next-creator-tree-models",
} as const;

const treeSafeStorage: StateStorage = {
  getItem: async (name) => {
    const rawValue = await tauriStorage.getItem(name);
    if (rawValue === null) {
      return null;
    }

    try {
      JSON.parse(rawValue);
      return rawValue;
    } catch (error) {
      console.warn(`[tree:persistence] Corrupted persisted data cleared for key: ${name}`, error);
      await tauriStorage.removeItem(name);
      return null;
    }
  },
  setItem: (name, value) => tauriStorage.setItem(name, value),
  removeItem: (name) => tauriStorage.removeItem(name),
};

export const createTreePersistStorage = () => createJSONStorage(() => treeSafeStorage);
