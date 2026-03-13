import { createPortal } from "react-dom";
import { useMemo, useState } from "react";
import { X, StopCircle, Trash2, ChevronRight, CircleCheck, CircleX, Loader2 } from "lucide-react";
import { useModal, getModalAnimationClasses } from "@/hooks/useModal";
import { useBatchTaskStore } from "@/stores/batchTaskStore";
import { batchTaskManager } from "@/services/batchTaskManager";
import type { BatchImageItem, BatchImageTaskGroup } from "@/types";

export function BatchTaskPanel() {
  const { isOpen, close, groups, clearCompleted } = useBatchTaskStore();
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  const sortedGroups = useMemo<BatchImageTaskGroup[]>(() => groups, [groups]);

  const { isVisible, isClosing, handleClose, handleBackdropClick } = useModal({
    isOpen,
    onClose: close,
  });
  const { backdropClasses, contentClasses } = getModalAnimationClasses(isVisible, isClosing);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className={`absolute inset-0 transition-all duration-200 ease-out ${backdropClasses}`}
        onClick={handleBackdropClick}
      />
      <div
        className={`relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden max-h-[90vh] flex flex-col transition-all duration-200 ease-out ${contentClasses}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-300">
          <h2 className="text-lg font-semibold">后台任务</h2>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={handleClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {sortedGroups.length === 0 ? (
            <div className="text-sm text-base-content/50">暂无任务</div>
          ) : (
            sortedGroups.map((g: BatchImageTaskGroup) => {
              const isExpanded = expanded.has(g.id);
              const total = g.items.length;
              const completed = g.items.filter((i: BatchImageItem) => i.status === "success").length;
              const failed = g.items.filter((i: BatchImageItem) => i.status === "error").length;
              const running = g.items.filter((i: BatchImageItem) => i.status === "running").length;
              return (
                <div key={g.id} className="border border-base-300 rounded-xl p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <button
                        className="flex items-center gap-2 text-left"
                        onClick={() => {
                          setExpanded((prev) => {
                            const next = new Set(prev);
                            if (next.has(g.id)) next.delete(g.id);
                            else next.add(g.id);
                            return next;
                          });
                        }}
                      >
                        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        <span className="font-medium truncate">{g.prompt || "(无提示词)"}</span>
                      </button>
                      <div className="text-xs text-base-content/50 mt-1">
                        {completed}/{total} 完成 · {failed} 失败 · {running} 运行中 · 并发 {g.concurrency}
                      </div>
                    </div>
                    <button
                      className="btn btn-ghost btn-sm"
                      title="停止"
                      onClick={() => batchTaskManager.stopGroup(g.id)}
                    >
                      <StopCircle className="w-4 h-4" />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 border-t border-base-300 pt-2 space-y-1">
                      {g.items.map((it: BatchImageItem) => {
                        const icon =
                          it.status === "running" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : it.status === "success" ? (
                            <CircleCheck className="w-4 h-4 text-success" />
                          ) : it.status === "error" ? (
                            <CircleX className="w-4 h-4 text-error" />
                          ) : null;
                        const name = it.fileName || it.id.slice(0, 8);
                        return (
                          <div key={it.id} className="flex items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-4 h-4 flex items-center justify-center">{icon}</div>
                              <span className="truncate">{name}</span>
                              <span className="text-base-content/40">{it.status}</span>
                            </div>
                            <button
                              className="btn btn-ghost btn-xs"
                              disabled={!(it.status === "running" || it.status === "queued" || it.status === "pending")}
                              onClick={() => batchTaskManager.stopItem(g.id, it.id)}
                            >
                              停止
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-base-300 bg-base-200/50">
          <button className="btn btn-ghost btn-sm gap-2" onClick={clearCompleted}>
            <Trash2 className="w-4 h-4" />
            清理已完成
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
