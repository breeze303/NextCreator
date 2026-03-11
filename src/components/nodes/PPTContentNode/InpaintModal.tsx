/**
 * 局部重绘 Modal
 * 负责收集蒙版 + 描述，提交后立即关闭，实际生成由父组件后台完成
 */

import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Paintbrush,
  Eraser,
  Undo2,
  Trash2,
  Minus,
  Plus,
  Wand2,
  CheckCircle,
} from "lucide-react";
import { getImageUrl, readImage } from "@/services/fileStorageService";

interface InpaintModalProps {
  imageData?: string;
  imagePath?: string;
  pageTitle?: string;
  onSubmit: (maskBase64: string, prompt: string, originalBase64: string) => void;
  onClose: () => void;
}

export function InpaintModal({
  imageData,
  imagePath,
  pageTitle,
  onSubmit,
  onClose,
}: InpaintModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [brushSize, setBrushSize] = useState(30);
  const [isEraser, setIsEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasMask, setHasMask] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [originalBase64, setOriginalBase64] = useState<string | null>(null);

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const undoStackRef = useRef<ImageData[]>([]);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const displayScaleRef = useRef(1);

  const imageUrl = imagePath
    ? getImageUrl(imagePath)
    : imageData
    ? `data:image/png;base64,${imageData}`
    : "";

  // 进入动画
  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  // 加载原始图片 base64（用于提交给父组件）
  useEffect(() => {
    async function load() {
      if (imageData) {
        setOriginalBase64(imageData);
      } else if (imagePath) {
        try {
          const data = await readImage(imagePath);
          setOriginalBase64(data);
        } catch (e) {
          console.error("[InpaintModal] 读取图片失败", e);
        }
      }
    }
    load();
  }, [imageData, imagePath]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setIsVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handleClose]);

  // ── Canvas 初始化 ───────────────────────────────────────
  const setupCanvases = useCallback((img: HTMLImageElement) => {
    const container = canvasContainerRef.current;
    const bgCanvas = bgCanvasRef.current;
    const drawCanvas = drawCanvasRef.current;
    if (!container || !bgCanvas || !drawCanvas) return;

    const natW = img.naturalWidth;
    const natH = img.naturalHeight;
    const maxW = window.innerWidth - 120;
    const maxH = window.innerHeight - 220;
    const scale = Math.min(maxW / natW, maxH / natH, 1);
    displayScaleRef.current = scale;

    const displayW = Math.round(natW * scale);
    const displayH = Math.round(natH * scale);

    bgCanvas.width = natW;
    bgCanvas.height = natH;
    drawCanvas.width = natW;
    drawCanvas.height = natH;

    bgCanvas.style.width = `${displayW}px`;
    bgCanvas.style.height = `${displayH}px`;
    drawCanvas.style.width = `${displayW}px`;
    drawCanvas.style.height = `${displayH}px`;
    container.style.width = `${displayW}px`;
    container.style.height = `${displayH}px`;

    const bgCtx = bgCanvas.getContext("2d")!;
    bgCtx.drawImage(img, 0, 0, natW, natH);
  }, []);

  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setupCanvases(img);
    img.src = imageUrl;
  }, [imageUrl, setupCanvases]);

  // ── 撤销 ───────────────────────────────────────────────
  const pushUndo = useCallback(() => {
    const drawCanvas = drawCanvasRef.current;
    if (!drawCanvas) return;
    const ctx = drawCanvas.getContext("2d")!;
    const data = ctx.getImageData(0, 0, drawCanvas.width, drawCanvas.height);
    const stack = undoStackRef.current;
    if (stack.length >= 20) stack.shift();
    stack.push(data);
  }, []);

  const handleUndo = useCallback(() => {
    const stack = undoStackRef.current;
    if (stack.length <= 0) return;
    stack.pop();
    const drawCanvas = drawCanvasRef.current;
    if (!drawCanvas) return;
    const ctx = drawCanvas.getContext("2d")!;
    if (stack.length > 0) {
      ctx.putImageData(stack[stack.length - 1], 0, 0);
    } else {
      ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    }
    setHasMask(stack.length > 0);
  }, []);

  const handleClear = useCallback(() => {
    const drawCanvas = drawCanvasRef.current;
    if (!drawCanvas) return;
    drawCanvas.getContext("2d")!.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    undoStackRef.current = [];
    setHasMask(false);
  }, []);

  // ── 绘制 ───────────────────────────────────────────────
  const getCanvasPoint = useCallback((e: React.PointerEvent) => {
    const drawCanvas = drawCanvasRef.current;
    if (!drawCanvas) return { x: 0, y: 0 };
    const rect = drawCanvas.getBoundingClientRect();
    const scale = displayScaleRef.current;
    return {
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    };
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDrawing(true);
      const point = getCanvasPoint(e);
      lastPointRef.current = point;

      const drawCanvas = drawCanvasRef.current;
      if (!drawCanvas) return;
      const ctx = drawCanvas.getContext("2d")!;

      ctx.beginPath();
      ctx.arc(point.x, point.y, brushSize / displayScaleRef.current / 2, 0, Math.PI * 2);
      if (isEraser) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,1)";
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(255, 80, 80, 0.55)";
      }
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      drawCanvas.setPointerCapture(e.pointerId);
    },
    [brushSize, isEraser, getCanvasPoint]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDrawing) return;
      const point = getCanvasPoint(e);
      const last = lastPointRef.current;
      if (!last) return;

      const drawCanvas = drawCanvasRef.current;
      if (!drawCanvas) return;
      const ctx = drawCanvas.getContext("2d")!;

      if (isEraser) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(0,0,0,1)";
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = "rgba(255, 80, 80, 0.55)";
      }
      ctx.lineWidth = brushSize / displayScaleRef.current;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      ctx.globalCompositeOperation = "source-over";
      lastPointRef.current = point;
    },
    [isDrawing, brushSize, isEraser, getCanvasPoint]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPointRef.current = null;
    pushUndo();
    setHasMask(true);
  }, [isDrawing, pushUndo]);

  // ── 提交 ───────────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    if (!originalBase64 || !hasMask || !prompt.trim()) return;

    const drawCanvas = drawCanvasRef.current;
    if (!drawCanvas) return;
    const maskBase64 = drawCanvas.toDataURL("image/png").split(",")[1];

    onSubmit(maskBase64, prompt.trim(), originalBase64);
    setSubmitted(true);
    // 1.2s 后自动关闭
    setTimeout(handleClose, 1200);
  }, [originalBase64, hasMask, prompt, onSubmit, handleClose]);

  const canSubmit = hasMask && prompt.trim().length > 0 && !!originalBase64 && !submitted;
  const adjustBrushSize = (delta: number) =>
    setBrushSize((s) => Math.max(5, Math.min(100, s + delta)));

  return createPortal(
    <div
      className={`
        fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3
        transition-all duration-200 ease-out
        ${isVisible && !isClosing ? "bg-black/88" : "bg-black/0"}
      `}
      onClick={handleClose}
    >
      {/* 顶部工具栏 */}
      <div
        className={`
          flex items-center gap-2
          bg-base-100/95 backdrop-blur-sm shadow-xl rounded-xl px-4 py-2.5
          transition-all duration-200 ease-out
          ${isVisible && !isClosing ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-r border-base-300 pr-3">
          <Wand2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-base-content">
            {pageTitle ? `AI 局部重绘 · ${pageTitle}` : "AI 局部重绘"}
          </span>
        </div>

        {/* 画笔/橡皮 */}
        <div className="flex items-center gap-1 border-r border-base-300 pr-3">
          <button
            className={`btn btn-sm btn-circle ${!isEraser ? "btn-error" : "btn-ghost"}`}
            onClick={() => setIsEraser(false)}
            title="画笔"
            disabled={submitted}
          >
            <Paintbrush className="w-4 h-4" />
          </button>
          <button
            className={`btn btn-sm btn-circle ${isEraser ? "btn-warning" : "btn-ghost"}`}
            onClick={() => setIsEraser(true)}
            title="橡皮擦"
            disabled={submitted}
          >
            <Eraser className="w-4 h-4" />
          </button>
        </div>

        {/* 画笔大小 */}
        <div className="flex items-center gap-2 border-r border-base-300 pr-3">
          <button
            className="btn btn-xs btn-ghost btn-circle"
            onClick={() => adjustBrushSize(-5)}
            disabled={submitted}
          >
            <Minus className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-1.5 min-w-[72px] justify-center">
            <div
              className="rounded-full bg-error/60 flex-shrink-0"
              style={{
                width: `${Math.max(4, brushSize * 0.36)}px`,
                height: `${Math.max(4, brushSize * 0.36)}px`,
              }}
            />
            <span className="text-xs text-base-content/70 min-w-[24px] text-center">
              {brushSize}
            </span>
          </div>
          <button
            className="btn btn-xs btn-ghost btn-circle"
            onClick={() => adjustBrushSize(5)}
            disabled={submitted}
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* 撤销/清除 */}
        <div className="flex items-center gap-1 border-r border-base-300 pr-3">
          <button
            className="btn btn-sm btn-ghost gap-1"
            onClick={handleUndo}
            disabled={submitted}
          >
            <Undo2 className="w-4 h-4" />
            <span className="text-xs">撤销</span>
          </button>
          <button
            className="btn btn-sm btn-ghost gap-1"
            onClick={handleClear}
            disabled={submitted}
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-xs">清除</span>
          </button>
        </div>

        <button className="btn btn-sm btn-ghost btn-circle" onClick={handleClose}>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas 区域 */}
      <div
        ref={canvasContainerRef}
        className={`
          relative rounded-xl overflow-hidden shadow-2xl
          transition-all duration-200 ease-out
          ${isVisible && !isClosing ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          ${submitted ? "opacity-60" : ""}
        `}
        onClick={(e) => e.stopPropagation()}
        style={{ cursor: submitted ? "default" : "crosshair" }}
      >
        <canvas ref={bgCanvasRef} className="absolute inset-0 rounded-xl" />
        <canvas
          ref={drawCanvasRef}
          className="absolute inset-0 rounded-xl"
          onPointerDown={submitted ? undefined : handlePointerDown}
          onPointerMove={submitted ? undefined : handlePointerMove}
          onPointerUp={submitted ? undefined : handlePointerUp}
          onPointerLeave={submitted ? undefined : handlePointerUp}
        />
        <div className="absolute inset-0 rounded-xl -z-10 bg-base-300" />
      </div>

      {/* 底部操作区 */}
      <div
        className={`
          flex items-center gap-3
          bg-base-100/95 backdrop-blur-sm shadow-xl rounded-xl px-4 py-3
          transition-all duration-200 ease-out
          ${isVisible && !isClosing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
        style={{ minWidth: "480px", maxWidth: "800px", width: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        {!submitted ? (
          <>
            <input
              type="text"
              className="input input-bordered input-sm flex-1 text-sm"
              placeholder={
                hasMask
                  ? "描述修改内容，例如：将背景改为蓝天白云"
                  : "先在图片上涂抹要修改的区域..."
              }
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canSubmit) handleSubmit();
              }}
            />

            {/* 步骤指示 */}
            <div className="flex items-center gap-1.5 text-xs text-base-content/40 flex-shrink-0">
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  hasMask ? "bg-success text-success-content" : "bg-base-300"
                }`}
              >
                1
              </span>
              <span className={hasMask ? "text-success" : ""}>涂抹</span>
              <span>→</span>
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  prompt.trim() ? "bg-success text-success-content" : "bg-base-300"
                }`}
              >
                2
              </span>
              <span className={prompt.trim() ? "text-success" : ""}>描述</span>
              <span>→</span>
              <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                3
              </span>
              <span className="text-primary">提交</span>
            </div>

            <button
              className={`btn btn-primary btn-sm gap-1.5 flex-shrink-0 ${!canSubmit ? "btn-disabled" : ""}`}
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              <Wand2 className="w-4 h-4" />
              提交重绘
            </button>
          </>
        ) : (
          /* 已提交状态 */
          <div className="flex items-center gap-2 w-full">
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-base-content">已提交后台处理</p>
              <p className="text-xs text-base-content/50">
                可以关闭此窗口继续操作，重绘完成后缩略图会自动更新
              </p>
            </div>
          </div>
        )}
      </div>

      {!submitted && (
        <div
          className={`
            text-white/50 text-xs
            ${isVisible && !isClosing ? "opacity-100" : "opacity-0"}
          `}
        >
          在图片上涂抹标记需要修改的区域 · 按 ESC 关闭
        </div>
      )}
    </div>,
    document.body
  );
}
