import { memo, useCallback, useRef, useState } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { Wand2, Play, AlertCircle, Maximize2, AlertTriangle, CircleAlert } from "lucide-react";
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

interface OpenAIImageGeneratorNodeData {
  [key: string]: unknown;
  label: string;
  model: ModelType;
  aspectRatio: "1:1" | "16:9" | "9:16";
  quality: "standard" | "hd";
  style: "auto" | "vivid" | "natural";
  negativePrompt: string;
  status: "idle" | "loading" | "success" | "error";
  outputImage?: string;
  outputImagePath?: string;
  error?: string;
  errorDetails?: ErrorDetails;
}

type OpenAIImageGeneratorNode = Node<OpenAIImageGeneratorNodeData>;

const presetModels = [
  { value: "gpt-image-1", label: "GPT Image" },
  { value: "dall-e-3", label: "DALL-E 3" },
  { value: "z-image-turbo", label: "Z-Image Turbo" },
];

const aspectRatioOptions: Array<{ value: OpenAIImageGeneratorNodeData["aspectRatio"]; label: string }> = [
  { value: "1:1", label: "1:1" },
  { value: "16:9", label: "16:9" },
  { value: "9:16", label: "9:16" },
];

const qualityOptions: Array<{ value: OpenAIImageGeneratorNodeData["quality"]; label: string }> = [
  { value: "standard", label: "标准" },
  { value: "hd", label: "高清" },
];

const styleOptions: Array<{ value: OpenAIImageGeneratorNodeData["style"]; label: string }> = [
  { value: "auto", label: "自动" },
  { value: "vivid", label: "鲜艳" },
  { value: "natural", label: "自然" },
];

function OpenAIImageGeneratorBase({
  id,
  data,
  selected,
}: NodeProps<OpenAIImageGeneratorNode>) {
  const { updateNodeData, getConnectedInputDataAsync, getConnectedImagesWithInfo } = useFlowStore();
  const [showPreview, setShowPreview] = useState(false);
  const [showErrorDetail, setShowErrorDetail] = useState(false);

  const dots = useLoadingDots(data.status === "loading");

  const { isPromptConnected, hasEmptyImageInputs, emptyImageLabels } = useNodeConnectionStatus(id);

  const canvasIdRef = useRef<string | null>(null);

  const defaultModel: ModelType = "gpt-image-1";
  const model: ModelType = data.model || defaultModel;

  const quality = data.quality || "standard";
  const style = data.style || "auto";
  const negativePrompt = data.negativePrompt ?? "";

  const handleModelChange = (value: string) => {
    updateNodeData<OpenAIImageGeneratorNodeData>(id, { model: value });
  };

  const updateNodeDataWithCanvas = useCallback(
    (nodeId: string, nodeData: Partial<OpenAIImageGeneratorNodeData>) => {
      const { activeCanvasId } = useCanvasStore.getState();
      const targetCanvasId = canvasIdRef.current;

      updateNodeData<OpenAIImageGeneratorNodeData>(nodeId, nodeData);

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
          aspectRatio: data.aspectRatio,
          imageSize: quality === "hd" ? "4K" : undefined,
          negativePrompt: negativePrompt.trim() ? negativePrompt : undefined,
          style: style === "auto" ? undefined : style,
        },
        "openaiImageGenerator"
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
      updateNodeDataWithCanvas(id, { status: "error", error: "生成失败", errorDetails: undefined });
    }
  }, [
    data.aspectRatio,
    getConnectedImagesWithInfo,
    getConnectedInputDataAsync,
    id,
    model,
    negativePrompt,
    quality,
    style,
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
        <div className="sr-only">输入端口 - prompt</div>
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

        <div className="sr-only">输入端口 - image</div>
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

        <div className="sr-only">节点头部</div>
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-white" />
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

        <div className="sr-only">节点内容</div>
        <div className="p-2 space-y-2 nodrag">
          <ModelSelector
            value={model}
            options={presetModels}
            onChange={handleModelChange}
            variant="primary"
            allowCustom={true}
            modelCategory="imageGenerator"
          />

          <div className="sr-only">宽高比</div>
          <div>
            <label className="text-xs text-base-content/60 mb-0.5 block">宽高比</label>
            <div className="grid grid-cols-3 gap-1">
              {aspectRatioOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={
                    `btn btn-xs ` +
                    ((data.aspectRatio || "1:1") === opt.value
                      ? "btn-secondary"
                      : "btn-ghost bg-base-200")
                  }
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateNodeData<OpenAIImageGeneratorNodeData>(id, { aspectRatio: opt.value });
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sr-only">质量</div>
          <div>
            <label className="text-xs text-base-content/60 mb-0.5 block">质量</label>
            <div className="grid grid-cols-2 gap-1">
              {qualityOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={
                    `btn btn-xs ` + (quality === opt.value ? "btn-secondary" : "btn-ghost bg-base-200")
                  }
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateNodeData<OpenAIImageGeneratorNodeData>(id, { quality: opt.value });
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sr-only">风格</div>
          <div>
            <label className="text-xs text-base-content/60 mb-0.5 block">风格</label>
            <div className="grid grid-cols-3 gap-1">
              {styleOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={
                    `btn btn-xs ` + (style === opt.value ? "btn-secondary" : "btn-ghost bg-base-200")
                  }
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateNodeData<OpenAIImageGeneratorNodeData>(id, { style: opt.value });
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sr-only">负面提示词</div>
          <div>
            <label className="text-xs text-base-content/60 mb-0.5 block">负面提示词</label>
            <textarea
              className="textarea textarea-bordered textarea-xs w-full h-16 text-xs resize-none"
              placeholder="输入不想出现的内容..."
              value={negativePrompt}
              onPointerDown={(e) => e.stopPropagation()}
              onChange={(e) => {
                updateNodeData<OpenAIImageGeneratorNodeData>(id, { negativePrompt: e.target.value });
              }}
            />
          </div>

          <div className="sr-only">生成按钮</div>
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

          <div className="sr-only">错误信息</div>
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

          <div className="sr-only">预览图</div>
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

        <div className="sr-only">输出端口</div>
        <Handle
          type="source"
          position={Position.Right}
          id="output-image"
          className="!w-3 !h-3 !bg-sky-500 !border-2 !border-white"
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

export const OpenAIImageGeneratorNode = memo((props: NodeProps<OpenAIImageGeneratorNode>) => {
  return <OpenAIImageGeneratorBase {...props} />;
});

OpenAIImageGeneratorNode.displayName = "OpenAIImageGeneratorNode";
