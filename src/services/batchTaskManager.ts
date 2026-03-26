import { generateImage } from "@/services/imageGeneration";
import { saveImage, readImage } from "@/services/fileStorageService";
import { useBatchTaskStore } from "@/stores/batchTaskStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { useCanvasStore } from "@/stores/canvasStore";
import { useFlowStore } from "@/stores/flowStore";
import type { BatchImageItem, BatchImageItemStatus, BatchImageNodeData, BatchImageTaskGroup } from "@/types";

type CreateBatchTaskGroupParams = {
  groupId: string;
  nodeId: string;
  canvasId: string;
  model: string;
  prompt: string;
  concurrency?: number;
  items?: BatchImageItem[];
  status?: BatchImageTaskGroup["status"];
};

type StartBatchTaskGroupParams = {
  model?: string;
  prompt?: string;
  items?: BatchImageItem[];
  aspectRatio?: unknown;
  imageSize?: unknown;
  negativePrompt?: string;
};

const TERMINAL_ITEM_STATUSES: ReadonlySet<BatchImageItemStatus> = new Set(["success", "error", "cancelled"]);
const TERMINAL_GROUP_STATUSES: ReadonlySet<BatchImageTaskGroup["status"]> = new Set(["completed", "cancelled"]);

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round(n)));
}

export class BatchTaskManager {
  private abortControllers = new Map<string, AbortController>();
  private stoppingGroups = new Set<string>();
  private runTokens = new Map<string, number>();

  private isTerminalItemStatus(status: BatchImageItemStatus): boolean {
    return TERMINAL_ITEM_STATUSES.has(status);
  }

  private isTerminalGroupStatus(status: BatchImageTaskGroup["status"]): boolean {
    return TERMINAL_GROUP_STATUSES.has(status);
  }

  private bumpRunToken(groupId: string): number {
    const next = (this.runTokens.get(groupId) ?? 0) + 1;
    this.runTokens.set(groupId, next);
    return next;
  }

  private isRunTokenActive(groupId: string, runToken: number): boolean {
    return this.runTokens.get(groupId) === runToken;
  }

  private canApplyItemPatch(item: BatchImageItem): boolean {
    return !this.isTerminalItemStatus(item.status);
  }

  private patchGroupWithGuard(
    groupId: string,
    patch: Partial<BatchImageTaskGroup>,
    options?: { runToken?: number }
  ): BatchImageTaskGroup | undefined {
    if (options?.runToken !== undefined && !this.isRunTokenActive(groupId, options.runToken)) {
      return undefined;
    }

    const store = useBatchTaskStore.getState();
    const current = store.getGroup(groupId);
    if (!current) return undefined;

    if (
      patch.status !== undefined &&
      this.isTerminalGroupStatus(current.status) &&
      patch.status !== current.status
    ) {
      return current;
    }

    const next: BatchImageTaskGroup = { ...current, ...patch };
    store.upsertGroup(next);
    return next;
  }

  private getLatestOutputPatch(items: BatchImageItem[]): Pick<BatchImageNodeData, "latestOutputImage" | "latestOutputImagePath"> {
    let latestSuccess: BatchImageItem | undefined;
    let latestTs = -1;

    for (const item of items) {
      const result = item.result;
      if (item.status !== "success" || !result) continue;
      if (!result.imagePath && !result.imageData) continue;

      const ts = result.completedAt ?? item.completedAt ?? 0;
      if (ts >= latestTs) {
        latestTs = ts;
        latestSuccess = item;
      }
    }

    const result = latestSuccess?.result;
    if (!result) {
      return {
        latestOutputImage: undefined,
        latestOutputImagePath: undefined,
      };
    }

    if (result.imagePath) {
      return {
        latestOutputImagePath: result.imagePath,
        latestOutputImage: undefined,
      };
    }

    return {
      latestOutputImagePath: undefined,
      latestOutputImage: result.imageData,
    };
  }

  createGroup(params: CreateBatchTaskGroupParams): BatchImageTaskGroup {
    const concurrency = clamp(params.concurrency ?? useSettingsStore.getState().settings.batch?.concurrency ?? 3, 1, 10);

    const group: BatchImageTaskGroup = {
      id: params.groupId,
      nodeId: params.nodeId,
      canvasId: params.canvasId,
      createdAt: Date.now(),
      status: params.status ?? "idle",
      model: params.model,
      prompt: params.prompt,
      concurrency,
      items: params.items ?? [],
    };

    useBatchTaskStore.getState().upsertGroup(group);
    return group;
  }

  addItem(groupId: string, item: BatchImageItem): BatchImageTaskGroup | undefined {
    return this.addItems(groupId, [item]);
  }

  addItems(groupId: string, items: BatchImageItem[]): BatchImageTaskGroup | undefined {
    const store = useBatchTaskStore.getState();
    const group = store.getGroup(groupId);
    if (!group || items.length === 0) return group;

    store.addItems(groupId, items);
    return store.getGroup(groupId);
  }

  start(groupId: string, params: StartBatchTaskGroupParams = {}): void {
    const store = useBatchTaskStore.getState();
    const group = store.getGroup(groupId);
    if (!group) return;

    const nextItems = params.items ?? group.items;
    const nextModel = params.model ?? group.model;
    const nextPrompt = params.prompt ?? group.prompt;
    const nextConcurrency = clamp(group.concurrency, 1, 10);

    this.stoppingGroups.delete(groupId);
    const runToken = this.bumpRunToken(groupId);
    const runningGroup: BatchImageTaskGroup = {
      ...group,
      model: nextModel,
      prompt: nextPrompt,
      concurrency: nextConcurrency,
      status: "running",
      items: nextItems,
    };
    store.upsertGroup(runningGroup);

    void this.runQueue({
      groupId,
      nodeId: group.nodeId,
      canvasId: group.canvasId,
      model: nextModel,
      prompt: nextPrompt,
      items: nextItems,
      concurrency: nextConcurrency,
      aspectRatio: params.aspectRatio,
      imageSize: params.imageSize,
      negativePrompt: params.negativePrompt,
      runToken,
    });
  }

  getGroup(groupId: string): BatchImageTaskGroup | undefined {
    return useBatchTaskStore.getState().getGroup(groupId);
  }

  getItems(groupId: string): BatchImageItem[] {
    return useBatchTaskStore.getState().getItems(groupId);
  }

  getGroups(): BatchImageTaskGroup[] {
    return useBatchTaskStore.getState().groups;
  }

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
    this.createGroup({
      groupId: params.groupId,
      nodeId: params.nodeId,
      canvasId: params.canvasId,
      model: params.model,
      prompt: params.prompt,
      items: params.items,
      status: "idle",
    });

    this.start(params.groupId, {
      model: params.model,
      prompt: params.prompt,
      items: params.items,
      aspectRatio: params.aspectRatio,
      imageSize: params.imageSize,
      negativePrompt: params.negativePrompt,
    });
  }

  stopGroup(groupId: string): void {
    this.stoppingGroups.add(groupId);
    this.bumpRunToken(groupId);

    for (const [key, ctrl] of this.abortControllers.entries()) {
      if (key.startsWith(`${groupId}:`)) {
        ctrl.abort();
        this.abortControllers.delete(key);
      }
    }

    const state = useBatchTaskStore.getState();
    const group = state.getGroup(groupId);
    if (!group) return;
    const now = Date.now();
    const cancelledItems = group.items.map((it) =>
      it.status === "pending" || it.status === "queued" || it.status === "running"
        ? { ...it, status: "cancelled" as const, completedAt: now, result: { error: "已取消" } }
        : it
    );
    this.patchGroupWithGuard(groupId, { status: "cancelled", items: cancelledItems });
    this.syncNodeData(group.canvasId, group.nodeId, {
      status: "cancelled",
      items: cancelledItems,
      ...this.getLatestOutputPatch(cancelledItems),
    });
  }

  stopItem(groupId: string, itemId: string): void {
    const key = `${groupId}:${itemId}`;
    const ctrl = this.abortControllers.get(key);
    if (ctrl) {
      ctrl.abort();
      this.abortControllers.delete(key);
    }

    const state = useBatchTaskStore.getState();
    const group = state.getGroup(groupId);
    if (!group) return;

    const items = group.items.map((it) =>
      it.id === itemId && (it.status === "queued" || it.status === "running" || it.status === "pending")
        ? { ...it, status: "cancelled" as const, completedAt: Date.now(), result: { error: "已取消" } }
        : it
    );
    this.patchGroupWithGuard(groupId, { items });
    this.syncNodeData(group.canvasId, group.nodeId, {
      items,
      ...this.getLatestOutputPatch(items),
    });
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
    runToken: number;
  }): Promise<void> {
    const { groupId, nodeId, canvasId } = params;
    const concurrency = clamp(params.concurrency, 1, 10);
    let index = 0;

    if (!this.isRunTokenActive(groupId, params.runToken)) {
      return;
    }

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
      while (
        index < initItems.length &&
        !this.stoppingGroups.has(groupId) &&
        this.isRunTokenActive(groupId, params.runToken)
      ) {
        const current = initItems[index++];
        if (current.status !== "queued") continue;

        if (this.stoppingGroups.has(groupId) || !this.isRunTokenActive(groupId, params.runToken)) {
          break;
        }

        const startedAt = Date.now();
        const started = this.updateItem(groupId, canvasId, nodeId, current.id, {
          status: "running" as const,
          startedAt,
        }, params.runToken);
        if (!started) {
          continue;
        }

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

        if (!this.isRunTokenActive(groupId, params.runToken)) {
          continue;
        }

        const stopped = this.stoppingGroups.has(groupId);
        const terminalStatus: BatchImageItemStatus = stopped
          ? result.status === "error"
            ? "error"
            : "cancelled"
          : result.status === "cancelled"
            ? "cancelled"
            : result.status === "error"
              ? "error"
              : "success";
        const terminalResult = stopped && result.status !== "error" ? { error: "已取消" } : result.result;

        this.updateItem(groupId, canvasId, nodeId, current.id, {
          status: terminalStatus,
          completedAt: Date.now(),
          result: terminalResult,
        }, params.runToken);
      }
    };

    await Promise.all(
      Array.from({ length: Math.min(concurrency, initItems.length) }, () => worker())
    );

    if (!this.isRunTokenActive(groupId, params.runToken)) {
      return;
    }

    const group = useBatchTaskStore.getState().getGroup(groupId);
    if (!group) return;

    const now = Date.now();
    const normalizedItems = this.stoppingGroups.has(groupId)
      ? group.items.map((item) =>
          item.status === "pending" || item.status === "queued" || item.status === "running"
            ? { ...item, status: "cancelled" as const, completedAt: item.completedAt ?? now, result: { error: "已取消" } }
            : item
        )
      : group.items;
    const anyQueued = normalizedItems.some((i) => i.status === "queued" || i.status === "running");
    const anyError = normalizedItems.some((i) => i.status === "error");
    const anySuccess = normalizedItems.some((i) => i.status === "success");
    const finalStatus = this.stoppingGroups.has(groupId)
      ? "cancelled"
      : anyQueued
        ? "running"
        : "completed";

    const finalGroup = this.patchGroupWithGuard(groupId, { status: finalStatus, items: normalizedItems }, { runToken: params.runToken });
    if (!finalGroup) {
      return;
    }
    this.syncNodeData(canvasId, nodeId, {
      status: this.stoppingGroups.has(groupId)
        ? "cancelled"
        : anyError && !anySuccess
          ? "error"
          : "success",
      items: finalGroup.items,
      ...this.getLatestOutputPatch(finalGroup.items),
    });

    if (finalStatus !== "running") {
      this.stoppingGroups.delete(groupId);
    }
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
    patch: Partial<BatchImageItem>,
    runToken?: number
  ): boolean {
    if (runToken !== undefined && !this.isRunTokenActive(groupId, runToken)) {
      return false;
    }

    const store = useBatchTaskStore.getState();
    const group = store.getGroup(groupId);
    if (!group) return false;

    let changed = false;
    const items = group.items.map((it) => {
      if (it.id !== itemId) return it;
      if (!this.canApplyItemPatch(it)) return it;
      changed = true;
      return { ...it, ...patch };
    });

    if (!changed) {
      return false;
    }

    this.patchGroupWithGuard(groupId, { items }, runToken === undefined ? undefined : { runToken });
    this.syncNodeData(canvasId, nodeId, {
      items,
      ...this.getLatestOutputPatch(items),
    });
    return true;
  }

  private syncGroupAndNode(
    groupId: string,
    canvasId: string,
    nodeId: string,
    params: { items: BatchImageItem[]; status: BatchImageNodeData["status"]; groupStatus: BatchImageTaskGroup["status"] }
  ) {
    this.patchGroupWithGuard(groupId, { items: params.items, status: params.groupStatus });
    this.syncNodeData(canvasId, nodeId, {
      items: params.items,
      status: params.status,
      ...this.getLatestOutputPatch(params.items),
    });
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
