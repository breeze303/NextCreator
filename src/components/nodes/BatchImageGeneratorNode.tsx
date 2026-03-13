import { memo, useCallback, useMemo, useRef, useState } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import {
  Images,
  Play,
  StopCircle,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useFlowStore } from "@/stores/flowStore";
import { useCanvasStore } from "@/stores/canvasStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { saveImage } from "@/services/fileStorageService";
import { batchTaskManager } from "@/services/batchTaskManager";
import { ModelSelector } from "@/components/ui/ModelSelector";
import { useLoadingDots } from "@/hooks/useLoadingDots";
import { ErrorDetailModal } from "@/components/ui/ErrorDetailModal";
import { ImagePreviewModal } from "@/components/ui/ImagePreviewModal";
import type {
  BatchImageNodeData,
  BatchImageItem,
  ErrorDetails,
  ModelType,
} from "@/types";

type BatchImageGeneratorNode = Node<BatchImageNodeData>;

const presetModels = [
  { value: "Qwen/Qwen-Image-Edit-2509", label: "Qwen-Image-Edit-2509" },
  { value: "gpt-image-1", label: "GPT Image" },
  { value: "dall-e-3", label: "DALL·E 3" },
];

function createId(): string {
  return globalThis.crypto.randomUUID();
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function BatchImageGeneratorBase({ id, data, selected }: NodeProps<BatchImageGeneratorNode>) {
  const { updateNodeData } = useFlowStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());
  const isStoppingRef = useRef(false);

  const [previewItemId, setPreviewItemId] = useState<string | null>(null);
  const [showErrorDetail, setShowErrorDetail] = useState<{
    error: string;
    details?: ErrorDetails;
  } | null>(null);

  const status = data.status || "idle";
  const dots = useLoadingDots(status === "loading");

  const defaultModel: ModelType = "Qwen/Qwen-Image-Edit-2509";
  const model: ModelType = (data.model || defaultModel).trim();
  const prompt = data.prompt ?? "";
  const items = data.items || [];

  const concurrency = useSettingsStore((s) => s.settings.batch?.concurrency ?? 3);

  const counts = useMemo(() => {
    const total = items.length;
    const running = items.filter((i) => i.status === "running").length;
    const completed = items.filter((i) => i.status === "success").length;
    const failed = items.filter((i) => i.status === "error").length;
    const cancelled = items.filter((i) => i.status === "cancelled").length;
    const pending = items.filter((i) => i.status === "pending" || i.status === "queued").length;
    return { total, running, completed, failed, cancelled, pending };
  }, [items]);

  const updateNode = useCallback(
    (patch: Partial<BatchImageNodeData>) => {
      updateNodeData<BatchImageNodeData>(id, {
        ...patch,
        totalCount: counts.total,
        runningCount: counts.running,
        completedCount: counts.completed,
        failedCount: counts.failed,
      });
    },
    [counts.completed, counts.failed, counts.running, counts.total, id, updateNodeData]
  );

  const handleModelChange = (value: string) => {
    const normalized = value.trim();
    if (!normalized) return;
    updateNode({ model: normalized });
  };

  const handlePromptChange = (value: string) => {
    updateNode({ prompt: value });
  };

  const handleAddFiles = useCallback(async (files: FileList) => {
    const { activeCanvasId } = useCanvasStore.getState();

    const newItems: BatchImageItem[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const reader = new FileReader();
      const base64: string = await new Promise((resolve, reject) => {
        reader.onerror = () => reject(new Error("读取图片失败"));
        reader.onload = () => {
          const result = String(reader.result || "");
          const b64 = result.includes(",") ? result.split(",")[1] : result;
          resolve(b64);
        };
        reader.readAsDataURL(file);
      });

      let sourceImagePath: string | undefined;
      let sourceImageData: string | undefined;
      if (activeCanvasId) {
        try {
          const info = await saveImage(base64, activeCanvasId, id, undefined, undefined, "input");
          sourceImagePath = info.path;
        } catch {
          sourceImageData = base64;
        }
      } else {
        sourceImageData = base64;
      }

      newItems.push({
        id: createId(),
        fileName: file.name,
        sourceImageData,
        sourceImagePath,
        status: "pending",
      });
    }

    updateNode({
      items: [...items, ...newItems],
    });
  }, [id, items, updateNode]);

  const handleClearAll = useCallback(() => {
    if (status === "loading") return;
    updateNode({
      items: [],
      status: "idle",
      error: undefined,
      errorDetails: undefined,
      latestOutputImage: undefined,
      latestOutputImagePath: undefined,
    });
  }, [status, updateNode]);

  const handleStop = useCallback(() => {
    isStoppingRef.current = true;
    for (const [, ctrl] of abortControllersRef.current.entries()) {
      ctrl.abort();
    }
    abortControllersRef.current.clear();

    const next = items.map((it) => {
      if (it.status === "pending" || it.status === "queued") {
        return { ...it, status: "cancelled" as const, completedAt: Date.now() };
      }
      return it;
    });
    updateNode({ items: next, status: "cancelled" });
  }, [items, updateNode]);

  const handleRun = useCallback(async () => {
    if (status === "loading") return;
    isStoppingRef.current = false;

    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      updateNode({ status: "error", error: "请输入提示词", errorDetails: undefined });
      return;
    }
    if (items.length === 0) {
      updateNode({ status: "error", error: "请导入图片", errorDetails: undefined });
      return;
    }

    const { activeCanvasId } = useCanvasStore.getState();
    const canvasId = activeCanvasId;
    if (!canvasId) {
      updateNode({ status: "error", error: "请先创建/选择画布" });
      return;
    }

    const groupId = globalThis.crypto.randomUUID();
    updateNode({ groupId, status: "loading", error: undefined, errorDetails: undefined });
    batchTaskManager.startGroup({
      groupId,
      nodeId: id,
      canvasId,
      model,
      prompt: trimmedPrompt,
      items,
      aspectRatio: data.aspectRatio,
      imageSize: data.imageSize,
      negativePrompt: data.negativePrompt,
    });
  }, [id, items, model, prompt, status, updateNode, data.aspectRatio, data.imageSize, data.negativePrompt]);

  const previewItem = useMemo(() => {
    if (!previewItemId) return undefined;
    return items.find((i) => i.id === previewItemId);
  }, [items, previewItemId]);

  const previewPath = previewItem?.result?.imagePath;
  const previewData = previewItem?.result?.imageData;

  return (
    <>
      <div
        className={
          `w-[280px] rounded-xl bg-base-100 shadow-lg border-2 transition-all ` +
          (selected ? "border-primary shadow-primary/20" : "border-base-300")
        }
      >
        <Handle
          type="target"
          position={Position.Left}
          id="input-prompt"
          style={{ top: "30%" }}
          className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white"
        />

        <Handle
          type="source"
          position={Position.Right}
          id="output-image"
          className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white"
        />

        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Images className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">{data.label}</span>
          </div>
          <div className="text-xs text-white/80">
            {counts.completed}/{counts.total}
          </div>
        </div>

        <div className="p-2 space-y-2 nodrag">
          <ModelSelector
            value={model}
            options={presetModels}
            onChange={handleModelChange}
            variant="primary"
            allowCustom={true}
            modelCategory="imageGenerator"
          />

          <textarea
            className="textarea textarea-bordered textarea-sm w-full h-24 text-sm resize-none"
            placeholder="输入批量提示词..."
            value={prompt}
            onPointerDown={(e) => e.stopPropagation()}
            onChange={(e) => handlePromptChange(e.target.value)}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                void handleAddFiles(e.target.files);
                e.target.value = "";
              }
            }}
          />

          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-outline flex-1 gap-2"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              disabled={status === "loading"}
            >
              <Upload className="w-4 h-4" />
              导入图片
            </button>
            <button
              className="btn btn-sm btn-ghost gap-2"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleClearAll();
              }}
              disabled={status === "loading" || items.length === 0}
              title="清空"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              className={
                `btn btn-sm flex-1 gap-2 ` +
                (status === "loading" ? "btn-disabled" : "btn-secondary")
              }
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                void handleRun();
              }}
              disabled={status === "loading"}
            >
              <Play className="w-4 h-4" />
              {status === "loading" ? `运行中${dots}` : "开始"}
            </button>
            <button
              className="btn btn-sm btn-outline gap-2"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleStop();
              }}
              disabled={status !== "loading"}
              title="停止"
            >
              <StopCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-base-content/60">
            并发：{clamp(concurrency, 1, 10)}（设置中可修改）
          </div>

          {data.error && (
            <div
              className="flex items-start gap-2 text-error text-xs bg-error/10 p-2 rounded cursor-pointer"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setShowErrorDetail({ error: data.error || "执行错误", details: data.errorDetails })}
            >
              <AlertCircle className="w-3 h-3 mt-0.5" />
              <span className="break-all">{data.error}</span>
            </div>
          )}

          <div className="max-h-44 overflow-auto border border-base-300 rounded-lg">
            {items.length === 0 ? (
              <div className="p-3 text-xs text-base-content/50">尚未导入图片</div>
            ) : (
              <div className="divide-y divide-base-300">
                {items.map((it) => {
                  const icon =
                    it.status === "success" ? (
                      <CheckCircle className="w-3.5 h-3.5 text-success" />
                    ) : it.status === "error" ? (
                      <XCircle className="w-3.5 h-3.5 text-error" />
                    ) : it.status === "running" ? (
                      <span className="loading loading-spinner loading-xs" />
                    ) : (
                      <span className="w-3.5 h-3.5" />
                    );
                  return (
                    <div
                      key={it.id}
                      className="flex items-center justify-between gap-2 px-2 py-1.5 text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {icon}
                        <span className="truncate">{it.fileName || it.id.slice(0, 6)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {it.result?.imagePath || it.result?.imageData ? (
                          <button
                            className="btn btn-ghost btn-xs"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewItemId(it.id);
                            }}
                          >
                            预览
                          </button>
                        ) : null}
                        {it.result?.error ? (
                          <button
                            className="btn btn-ghost btn-xs text-error"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowErrorDetail({ error: it.result?.error || "执行错误", details: it.result?.errorDetails });
                            }}
                          >
                            错误
                          </button>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {showErrorDetail && (
        <ErrorDetailModal
          title="执行错误"
          error={showErrorDetail.error}
          errorDetails={showErrorDetail.details}
          onClose={() => setShowErrorDetail(null)}
        />
      )}

      {previewItemId && (previewData || previewPath) && (
        <ImagePreviewModal
          imageData={previewData}
          imagePath={previewPath}
          onClose={() => setPreviewItemId(null)}
          fileName={previewItem?.fileName}
        />
      )}
    </>
  );
}

export const BatchImageGeneratorNode = memo((props: NodeProps<BatchImageGeneratorNode>) => {
  return <BatchImageGeneratorBase {...props} />;
});

BatchImageGeneratorNode.displayName = "BatchImageGeneratorNode";
