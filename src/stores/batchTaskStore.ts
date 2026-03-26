import { create } from "zustand";
import type { BatchImageItem, BatchImageItemStatus, BatchImageTaskGroup } from "@/types";

interface BatchTaskState {
  isOpen: boolean;
  groups: BatchImageTaskGroup[];
  open: () => void;
  close: () => void;
  getGroup: (groupId: string) => BatchImageTaskGroup | undefined;
  getItems: (groupId: string) => BatchImageItem[];
  upsertGroup: (group: BatchImageTaskGroup) => void;
  patchGroup: (groupId: string, patch: Partial<BatchImageTaskGroup>) => void;
  addItems: (groupId: string, items: BatchImageItem[]) => void;
  patchItem: (groupId: string, itemId: string, patch: Partial<BatchImageItem>) => void;
  updateItemStatus: (groupId: string, itemId: string, status: BatchImageItemStatus) => void;
  removeGroup: (groupId: string) => void;
  clearCompleted: () => void;
}

export const useBatchTaskStore = create<BatchTaskState>((set, get) => ({
  isOpen: false,
  groups: [],
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  getGroup: (groupId) => get().groups.find((g) => g.id === groupId),
  getItems: (groupId) => get().groups.find((g) => g.id === groupId)?.items ?? [],
  upsertGroup: (group) => {
    const existing = get().groups;
    const idx = existing.findIndex((g) => g.id === group.id);
    if (idx >= 0) {
      const next = [...existing];
      next[idx] = group;
      set({ groups: next });
    } else {
      set({ groups: [group, ...existing] });
    }
  },
  patchGroup: (groupId, patch) => {
    set((state) => ({
      groups: state.groups.map((g) => (g.id === groupId ? { ...g, ...patch } : g)),
    }));
  },
  addItems: (groupId, items) => {
    if (items.length === 0) return;
    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              items: [...g.items, ...items],
            }
          : g
      ),
    }));
  },
  patchItem: (groupId, itemId, patch) => {
    set((state) => ({
      groups: state.groups.map((g) =>
        g.id !== groupId
          ? g
          : {
              ...g,
              items: g.items.map((it) => (it.id === itemId ? { ...it, ...patch } : it)),
            }
      ),
    }));
  },
  updateItemStatus: (groupId, itemId, status) => {
    get().patchItem(groupId, itemId, { status });
  },
  removeGroup: (groupId) => set((state) => ({ groups: state.groups.filter((g) => g.id !== groupId) })),
  clearCompleted: () =>
    set((state) => ({
      groups: state.groups.filter((g) => g.status === "running" || g.status === "idle"),
    })),
}));
