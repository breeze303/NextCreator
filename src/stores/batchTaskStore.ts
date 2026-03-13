import { create } from "zustand";
import type { BatchImageTaskGroup, BatchImageItemStatus } from "@/types";

interface BatchTaskState {
  isOpen: boolean;
  groups: BatchImageTaskGroup[];
  open: () => void;
  close: () => void;
  upsertGroup: (group: BatchImageTaskGroup) => void;
  updateItemStatus: (groupId: string, itemId: string, status: BatchImageItemStatus) => void;
  removeGroup: (groupId: string) => void;
  clearCompleted: () => void;
}

export const useBatchTaskStore = create<BatchTaskState>((set, get) => ({
  isOpen: false,
  groups: [],
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
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
  updateItemStatus: (groupId, itemId, status) => {
    set((state) => ({
      groups: state.groups.map((g) =>
        g.id !== groupId
          ? g
          : {
              ...g,
              items: g.items.map((it) => (it.id === itemId ? { ...it, status } : it)),
            }
      ),
    }));
  },
  removeGroup: (groupId) => set((state) => ({ groups: state.groups.filter((g) => g.id !== groupId) })),
  clearCompleted: () =>
    set((state) => ({
      groups: state.groups.filter((g) => g.status === "running" || g.status === "idle"),
    })),
}));
