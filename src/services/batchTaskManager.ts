import { generateImage } from "@/services/imageGeneration";
import { saveImage, readImage } from "@/services/fileStorageService";
import { useBatchTaskStore } from "@/stores/batchTaskStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { useCanvasStore } from "@/stores/canvasStore";
import { useFlowStore } from "@/stores/flowStore";
import type { BatchImageItem, BatchImageItemStatus, BatchImageNodeData, BatchImageTaskGroup } from "@/types";

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round(n)));
}

export class BatchTaskManager {
  private abortControllers = new Map<string, AbortController>();
  private stoppingGroups = new Set<string>();

  startGroup(params: {
    groupId: string;
    nodeId: string;
    canvasId: string;
    model: string;
    prompt: string;
    items: BatchImageItem[];
    aspectRatio?: unknown;
    imageSize?: unknown;
    negativePrompt?: string;
  }): void {
    const { groupId } = params;
    this.stoppingGroups.delete(groupId);
    const concurrency = clamp(useSettingsStore.getState().settings.batch?.concurrency ?? 3, 1, 10);

    const group: BatchImageTaskGroup = {
      id: groupId,
      nodeId: params.nodeId,
      canvasId: params.canvasId,
      createdAt: Date.now(),
      status: "running",
      model: params.model,
      prompt: params.prompt,
      concurrency,
      items: params.items,
    };
    useBatchTaskStore.getState().upsertGroup(group);

    void this.runQueue({ ...params, concurrency });
  }

  stopGroup(groupId: string): void {
    this.stoppingGroups.add(groupId);
    for (const [key, ctrl] of this.abortControllers.entries()) {
      if (key.startsWith(`${groupId}:`)) {
        ctrl.abort();
        this.abortControllers.delete(key);
      }
    }

    const state = useBatchTaskStore.getState();
    const group = state.groups.find((g) => g.id === groupId);
    if (!group) return;
    const cancelledItems = group.items.map((it) =>
      it.status === "pending" || it.status === "queued"
        ? { ...it, status: "cancelled" as const, completedAt: Date.now() }
        : it
    );
    state.upsertGroup({ ...group, status: "cancelled", items: cancelledItems });
    this.syncNodeData(group.canvasId, group.nodeId, { status: "cancelled", items: cancelledItems });
  }

  stopItem(groupId: string, itemId: string): void {
    const key = `${groupId}:${itemId}`;
    const ctrl = this.abortControllers.get(key);
    if (ctrl) {
      ctrl.abort();
      this.abortControllers.delete(key);
    }

    const state = useBatchTaskStore.getState();
    const group = state.groups.find((g) => g.id === groupId);
    if (!group) return;

    const items = group.items.map((it) =>
      it.id === itemId && (it.status === "queued" || it.status === "running" || it.status === "pending")
        ? { ...it, status: "cancelled" as const, completedAt: Date.now(), result: { error: "已取消" } }
        : it
    );
    state.upsertGroup({ ...group, items });
    this.syncNodeData(group.canvasId, group.nodeId, { items });
  }

  private async runQueue(params: {
    groupId: string;
    nodeId: string;
    canvasId: string;
    model: string;
    prompt: string;
    items: BatchImageItem[];
    concurrency: number;
    aspectRatio?: unknown;
    imageSize?: unknown;
    negativePrompt?: string;
  }): Promise<void> {
    const { groupId, nodeId, canvasId } = params;
    const concurrency = clamp(params.concurrency, 1, 10);
    let index = 0;

    const initItems = params.items.map((it) =>
      it.status === "success"
        ? it
        : {
            ...it,
            status: "queued" as const,
            result: undefined,
            startedAt: undefined,
            completedAt: undefined,
          }
    );
    this.syncGroupAndNode(groupId, canvasId, nodeId, {
      items: initItems,
      status: "loading",
      groupStatus: "running",
    });

    const worker = async () => {
      while (index < initItems.length && !this.stoppingGroups.has(groupId)) {
        const current = initItems[index++];
        if (current.status !== "queued") continue;

        const startedAt = Date.now();
        this.updateItem(groupId, canvasId, nodeId, current.id, {
          status: "running" as const,
          startedAt,
        });

        const key = `${groupId}:${current.id}`;
        const controller = new AbortController();
        this.abortControllers.set(key, controller);

        const result = await this.runSingle({
          canvasId,
          nodeId,
          item: current,
          model: params.model,
          prompt: params.prompt,
          aspectRatio: params.aspectRatio,
          imageSize: params.imageSize,
          negativePrompt: params.negativePrompt,
          signal: controller.signal,
        });

        this.abortControllers.delete(key);

        const terminalStatus: BatchImageItemStatus =
          result.status === "cancelled" ? "cancelled" : result.status === "error" ? "error" : "success";

        this.updateItem(groupId, canvasId, nodeId, current.id, {
          status: terminalStatus,
          completedAt: Date.now(),
          result: result.result,
        });
      }
    };

    await Promise.all(
      Array.from({ length: Math.min(concurrency, initItems.length) }, () => worker())
    );

    const group = useBatchTaskStore.getState().groups.find((g) => g.id === groupId);
    if (!group) return;
    const anyQueued = group.items.some((i) => i.status === "queued" || i.status === "running");
    const anyError = group.items.some((i) => i.status === "error");
    const anySuccess = group.items.some((i) => i.status === "success");
    const finalStatus = this.stoppingGroups.has(groupId)
      ? "cancelled"
      : anyQueued
        ? "running"
        : "completed";

    useBatchTaskStore.getState().upsertGroup({ ...group, status: finalStatus });
    this.syncNodeData(canvasId, nodeId, {
      status: this.stoppingGroups.has(groupId)
        ? "cancelled"
        : anyError && !anySuccess
          ? "error"
          : "success",
    });
  }

  private async runSingle(params: {
    canvasId: string;
    nodeId: string;
    item: BatchImageItem;
    model: string;
    prompt: string;
    aspectRatio?: unknown;
    imageSize?: unknown;
    negativePrompt?: string;
    signal: AbortSignal;
  }): Promise<{ status: "success" | "error" | "cancelled"; result: BatchImageItem["result"] } > {
    try {
      const base64 = params.item.sourceImagePath
        ? await readImage(params.item.sourceImagePath)
        : params.item.sourceImageData;

      const response = await generateImage(
        {
          prompt: params.prompt,
          model: params.model,
          inputImages: base64 ? [base64] : undefined,
          aspectRatio: params.aspectRatio as never,
          imageSize: params.imageSize as never,
          negativePrompt: params.negativePrompt || undefined,
        },
        "batchImageGenerator",
        params.signal
      );

      if (params.signal.aborted) {
        return { status: "cancelled", result: { error: "已取消" } };
      }

      if (response.error) {
        return { status: "error", result: { error: response.error, errorDetails: response.errorDetails } };
      }
      if (!response.imageData) {
        return { status: "error", result: { error: "未返回图片数据" } };
      }

      try {
        const saved = await saveImage(response.imageData, params.canvasId, params.nodeId, params.prompt, undefined, "generated");
        return { status: "success", result: { imagePath: saved.path, completedAt: Date.now() } };
      } catch {
        return { status: "success", result: { imageData: response.imageData, completedAt: Date.now() } };
      }
    } catch (e) {
      if (params.signal.aborted) {
        return { status: "cancelled", result: { error: "已取消" } };
      }
      return { status: "error", result: { error: e instanceof Error ? e.message : "生成失败" } };
    }
  }

  private updateItem(
    groupId: string,
    canvasId: string,
    nodeId: string,
    itemId: string,
    patch: Partial<BatchImageItem>
  ) {
    const store = useBatchTaskStore.getState();
    const group = store.groups.find((g) => g.id === groupId);
    if (!group) return;
    const items = group.items.map((it) => (it.id === itemId ? { ...it, ...patch } : it));
    store.upsertGroup({ ...group, items });
    this.syncNodeData(canvasId, nodeId, { items });
  }

  private syncGroupAndNode(
    groupId: string,
    canvasId: string,
    nodeId: string,
    params: { items: BatchImageItem[]; status: BatchImageNodeData["status"]; groupStatus: BatchImageTaskGroup["status"] }
  ) {
    const store = useBatchTaskStore.getState();
    const group = store.groups.find((g) => g.id === groupId);
    if (group) {
      store.upsertGroup({ ...group, items: params.items, status: params.groupStatus });
    }
    this.syncNodeData(canvasId, nodeId, { items: params.items, status: params.status });
  }

  private syncNodeData(canvasId: string, nodeId: string, patch: Partial<BatchImageNodeData>) {
    const { activeCanvasId } = useCanvasStore.getState();
    const { updateNodeData } = useFlowStore.getState();

    if (activeCanvasId === canvasId) {
      updateNodeData<BatchImageNodeData>(nodeId, patch);
    }

    const canvasStore = useCanvasStore.getState();
    const canvas = canvasStore.canvases.find((c) => c.id === canvasId);
    if (!canvas) return;
    const updatedNodes = canvas.nodes.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, ...patch } } : n));
    useCanvasStore.setState((state) => ({
      canvases: state.canvases.map((c) => (c.id === canvasId ? { ...c, nodes: updatedNodes, updatedAt: Date.now() } : c)),
    }));
  }
}

export const batchTaskManager = new BatchTaskManager();
