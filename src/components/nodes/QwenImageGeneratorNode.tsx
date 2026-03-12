import { memo, useCallback, useRef, useState } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { Sparkles, Play, AlertCircle, Maximize2, AlertTriangle, CircleAlert } from "lucide-react";
import { useFlowStore } from "@/stores/flowStore";
import { useCanvasStore } from "@/stores/canvasStore";
import { generateImage } from "@/services/imageGeneration";
import { getImageUrl, saveImage, type InputImageInfo } from "@/services/fileStorageService";
import { ErrorDetailModal } from "@/components/ui/ErrorDetailModal";
import { ImagePreviewModal } from "@/components/ui/ImagePreviewModal";
import { ModelSelector } from "@/components/ui/ModelSelector";
import { useLoadingDots } from "@/hooks/useLoadingDots";
import { useNodeConnectionStatus } from "@/hooks/useNodeConnectionStatus";
import type { ErrorDetails, ImageInputNodeData, ModelType } from "@/types";

interface QwenImageGeneratorNodeData {
  [key: string]: unknown;
  label: string;
  model: ModelType;
  aspectRatio: "1:1" | "16:9" | "9:16";
  imageSize: "1328x1328" | "1664x928" | "928x1664";
  numInferenceSteps: number;
  cfg: number;
  negativePrompt: string;
  status: "idle" | "loading" | "success" | "error";
  outputImage?: string;
  outputImagePath?: string;
  error?: string;
  errorDetails?: ErrorDetails;
}

type QwenImageGeneratorNode = Node<QwenImageGeneratorNodeData>;

const presetModels = [
  { value: "Qwen/Qwen-Image", label: "Qwen-Image" },
  { value: "Qwen/Qwen-Image-Edit-2509", label: "Qwen-Image-Edit-2509" },
  { value: "Qwen/Qwen-Image-Edit", label: "Qwen-Image-Edit" },
];

const aspectRatioOptions: Array<{ value: QwenImageGeneratorNodeData["aspectRatio"]; label: string }> = [
  { value: "1:1", label: "1:1" },
  { value: "16:9", label: "16:9" },
  { value: "9:16", label: "9:16" },
];

const sizeByAspectRatio: Record<QwenImageGeneratorNodeData["aspectRatio"], QwenImageGeneratorNodeData["imageSize"]> = {
  "1:1": "1328x1328",
  "16:9": "1664x928",
  "9:16": "928x1664",
};

function clampNumber(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function QwenImageGeneratorBase({
  id,
  data,
  selected,
}: NodeProps<QwenImageGeneratorNode>) {
  const { updateNodeData, getConnectedInputDataAsync, getConnectedImagesWithInfo } = useFlowStore();
  const [showPreview, setShowPreview] = useState(false);
  const [showErrorDetail, setShowErrorDetail] = useState(false);

  const dots = useLoadingDots(data.status === "loading");

  const { isPromptConnected, hasEmptyImageInputs, emptyImageLabels } = useNodeConnectionStatus(id);

  const canvasIdRef = useRef<string | null>(null);

  const defaultModel: ModelType = "Qwen/Qwen-Image";
  const model: ModelType = data.model || defaultModel;

  const aspectRatio = data.aspectRatio || "1:1";
  const imageSize = data.imageSize || sizeByAspectRatio[aspectRatio];
  const negativePrompt = data.negativePrompt ?? "";
  const numInferenceSteps = clampNumber(data.numInferenceSteps ?? 20, 1, 100);
  const cfg = clampNumber(data.cfg ?? 4, 0.1, 20);

  const handleModelChange = (value: string) => {
    updateNodeData<QwenImageGeneratorNodeData>(id, { model: value });
  };

  const updateNodeDataWithCanvas = useCallback(
    (nodeId: string, nodeData: Partial<QwenImageGeneratorNodeData>) => {
      const { activeCanvasId } = useCanvasStore.getState();
      const targetCanvasId = canvasIdRef.current;

      updateNodeData<QwenImageGeneratorNodeData>(nodeId, nodeData);

      if (targetCanvasId && targetCanvasId !== activeCanvasId) {
        const canvasStore = useCanvasStore.getState();
        const canvas = canvasStore.canvases.find((c) => c.id === targetCanvasId);

        if (canvas) {
          const updatedNodes = canvas.nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: { ...node.data, ...nodeData } };
            }
            return node;
          });

          useCanvasStore.setState((state) => ({
            canvases: state.canvases.map((c) =>
              c.id === targetCanvasId
                ? { ...c, nodes: updatedNodes, updatedAt: Date.now() }
                : c
            ),
          }));
        }
      }
    },
    [updateNodeData]
  );

  const handleGenerate = useCallback(async () => {
    const { prompt, images } = await getConnectedInputDataAsync(id);
    const { activeCanvasId } = useCanvasStore.getState();
    canvasIdRef.current = activeCanvasId;

    if (!prompt) {
      updateNodeDataWithCanvas(id, {
        status: "error",
        error: "请连接提示词节点",
        errorDetails: undefined,
      });
      return;
    }

    updateNodeDataWithCanvas(id, { status: "loading", error: undefined, errorDetails: undefined });

    try {
      const response = await generateImage(
        {
          prompt,
          model,
          inputImages: images.length > 0 ? images : undefined,
          aspectRatio,
          imageSize,
          negativePrompt: negativePrompt.trim() ? negativePrompt : undefined,
          steps: numInferenceSteps,
          guidanceScale: cfg,
        },
        "qwenImageGenerator"
      );

      if (response.imageData) {
        if (activeCanvasId) {
          try {
            const connectedImages = getConnectedImagesWithInfo(id);
            const inputImagesMetadata: InputImageInfo[] = [];

            for (const img of connectedImages) {
              let imagePath = img.imagePath;
              if (!imagePath && img.imageData) {
                try {
                  const inputImageInfo = await saveImage(
                    img.imageData,
                    activeCanvasId,
                    img.id,
                    undefined,
                    undefined,
                    "input"
                  );
                  imagePath = inputImageInfo.path;
                  updateNodeData<ImageInputNodeData>(img.id, { imagePath: inputImageInfo.path });
                } catch (err) {
                  console.warn("保存输入图片失败:", err);
                }
              }
              if (imagePath) {
                inputImagesMetadata.push({ path: imagePath, label: img.fileName || "输入图片" });
              }
            }

            const imageInfo = await saveImage(
              response.imageData,
              activeCanvasId,
              id,
              prompt,
              inputImagesMetadata.length > 0 ? inputImagesMetadata : undefined,
              "generated"
            );

            updateNodeDataWithCanvas(id, {
              status: "success",
              outputImage: undefined,
              outputImagePath: imageInfo.path,
              error: undefined,
              errorDetails: undefined,
            });
          } catch (saveError) {
            console.warn("文件保存失败，回退到 base64 存储:", saveError);
            updateNodeDataWithCanvas(id, {
              status: "success",
              outputImage: response.imageData,
              outputImagePath: undefined,
              error: undefined,
              errorDetails: undefined,
            });
          }
        } else {
          updateNodeDataWithCanvas(id, {
            status: "success",
            outputImage: response.imageData,
            outputImagePath: undefined,
            error: undefined,
            errorDetails: undefined,
          });
        }
      } else if (response.error) {
        updateNodeDataWithCanvas(id, {
          status: "error",
          error: response.error,
          errorDetails: response.errorDetails,
        });
      } else {
        updateNodeDataWithCanvas(id, {
          status: "error",
          error: "未返回图片数据",
          errorDetails: undefined,
        });
      }
    } catch {
      updateNodeDataWithCanvas(id, {
        status: "error",
        error: "生成失败",
        errorDetails: undefined,
      });
    }
  }, [
    aspectRatio,
    cfg,
    getConnectedImagesWithInfo,
    getConnectedInputDataAsync,
    id,
    imageSize,
    model,
    negativePrompt,
    numInferenceSteps,
    updateNodeData,
    updateNodeDataWithCanvas,
  ]);

  return (
    <>
      <div
        className={
          `w-[220px] rounded-xl bg-base-100 shadow-lg border-2 transition-all ` +
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
        <div
          className="absolute -left-9 text-[10px] text-base-content/50"
          style={{ top: "30%", transform: "translateY(-100%)" }}
        >
          提示词
        </div>

        <Handle
          type="target"
          position={Position.Left}
          id="input-image"
          style={{ top: "70%" }}
          className="!w-3 !h-3 !bg-green-500 !border-2 !border-white"
        />
        <div
          className="absolute -left-9 text-[10px] text-base-content/50"
          style={{ top: "70%", transform: "translateY(-100%)" }}
        >
          参考图
        </div>

        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">{data.label}</span>
          </div>
          <div className="flex items-center gap-1">
            {!isPromptConnected && (
              <div className="tooltip tooltip-left" data-tip="请连接提示词节点">
                <CircleAlert className="w-4 h-4 text-white/80" />
              </div>
            )}
            {isPromptConnected && hasEmptyImageInputs && (
              <div
                className="tooltip tooltip-left"
                data-tip={`图片输入为空: ${emptyImageLabels.join(", ")}`}
              >
                <AlertTriangle className="w-4 h-4 text-yellow-300" />
              </div>
            )}
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

          <div>
            <label className="text-xs text-base-content/60 mb-0.5 block">宽高比</label>
            <div className="grid grid-cols-3 gap-1">
              {aspectRatioOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={
                    `btn btn-xs ` +
                    (aspectRatio === opt.value ? "btn-secondary" : "btn-ghost bg-base-200")
                  }
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextAspect = opt.value;
                    updateNodeData<QwenImageGeneratorNodeData>(id, {
                      aspectRatio: nextAspect,
                      imageSize: sizeByAspectRatio[nextAspect],
                    });
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-base-content/60 mb-0.5 block">分辨率</label>
            <div className="text-xs text-base-content/70 bg-base-200 rounded px-2 py-1">
              {imageSize}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-base-content/60 mb-0.5 block">步数</label>
              <input
                type="number"
                className="input input-bordered input-xs w-full"
                value={numInferenceSteps}
                min={1}
                max={100}
                onPointerDown={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const v = clampNumber(Number(e.target.value), 1, 100);
                  updateNodeData<QwenImageGeneratorNodeData>(id, { numInferenceSteps: v });
                }}
              />
            </div>
            <div>
              <label className="text-xs text-base-content/60 mb-0.5 block">CFG</label>
              <input
                type="number"
                className="input input-bordered input-xs w-full"
                value={cfg}
                min={0.1}
                max={20}
                step={0.1}
                onPointerDown={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const v = clampNumber(Number(e.target.value), 0.1, 20);
                  updateNodeData<QwenImageGeneratorNodeData>(id, { cfg: v });
                }}
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-base-content/60 mb-0.5 block">负面提示词</label>
            <textarea
              className="textarea textarea-bordered textarea-xs w-full h-16 text-xs resize-none"
              placeholder="输入不想出现的内容..."
              value={negativePrompt}
              onPointerDown={(e) => e.stopPropagation()}
              onChange={(e) => {
                updateNodeData<QwenImageGeneratorNodeData>(id, { negativePrompt: e.target.value });
              }}
            />
          </div>

          <button
            className={
              `btn btn-sm w-full gap-2 ` +
              (data.status === "loading" || !isPromptConnected ? "btn-disabled" : "btn-secondary")
            }
            onClick={handleGenerate}
            onPointerDown={(e) => e.stopPropagation()}
            disabled={data.status === "loading" || !isPromptConnected}
          >
            {data.status === "loading" ? (
              <span>生成中{dots}</span>
            ) : !isPromptConnected ? (
              <span className="text-base-content/50">待连接提示词</span>
            ) : (
              <>
                <Play className="w-4 h-4" />
                生成图片
              </>
            )}
          </button>

          {data.status === "error" && data.error && (
            <div
              className="flex items-start gap-2 text-error text-xs bg-error/10 p-2 rounded cursor-pointer hover:bg-error/20 transition-colors"
              onClick={() => setShowErrorDetail(true)}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-3 break-all">{data.error}</span>
            </div>
          )}

          {(data.outputImage || data.outputImagePath) && (
            <div
              className="relative group cursor-pointer"
              onClick={() => setShowPreview(true)}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="w-full h-[120px] overflow-hidden rounded-lg bg-base-200">
                <img
                  src={
                    data.outputImagePath
                      ? getImageUrl(data.outputImagePath)
                      : `data:image/png;base64,${data.outputImage}`
                  }
                  alt="Generated"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <Maximize2 className="w-6 h-6 text-white" />
              </div>
            </div>
          )}
        </div>

        <Handle
          type="source"
          position={Position.Right}
          id="output-image"
          className="!w-3 !h-3 !bg-amber-500 !border-2 !border-white"
        />
      </div>

      {showPreview && (data.outputImage || data.outputImagePath) && (
        <ImagePreviewModal
          imageData={data.outputImage}
          imagePath={data.outputImagePath}
          onClose={() => setShowPreview(false)}
        />
      )}

      {showErrorDetail && data.error && (
        <ErrorDetailModal
          error={data.error}
          errorDetails={data.errorDetails}
          title="执行错误"
          onClose={() => setShowErrorDetail(false)}
        />
      )}
    </>
  );
}

export const QwenImageGeneratorNode = memo((props: NodeProps<QwenImageGeneratorNode>) => {
  return <QwenImageGeneratorBase {...props} />;
});

QwenImageGeneratorNode.displayName = "QwenImageGeneratorNode";
