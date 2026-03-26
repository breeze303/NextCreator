import { createPortal } from "react-dom";
import { useMemo, useState } from "react";
import { X, StopCircle, Trash2, ChevronRight, CircleCheck, CircleX, Loader2 } from "lucide-react";
import { useModal, getModalAnimationClasses } from "@/hooks/useModal";
import { useBatchTaskStore } from "@/stores/batchTaskStore";
import { batchTaskManager } from "@/services/batchTaskManager";
import type { BatchImageItem, BatchImageTaskGroup } from "@/types";

export function BatchTaskPanel() {
  const isOpen = useBatchTaskStore((state) => state.isOpen);
  const close = useBatchTaskStore((state) => state.close);
  const clearCompleted = useBatchTaskStore((state) => state.clearCompleted);
  const groups = useBatchTaskStore((state) => state.groups);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  const groupIds = useMemo(() => groups.map((g) => g.id), [groups]);

  const sortedGroups = useMemo<BatchImageTaskGroup[]>(
    () =>
      groupIds
        .map((groupId) => batchTaskManager.getGroup(groupId))
        .filter((group): group is BatchImageTaskGroup => Boolean(group)),
    [groupIds]
  );

  const { isVisible, isClosing, handleClose, handleBackdropClick } = useModal({
    isOpen,
    onClose: close,
  });
  const { backdropClasses, contentClasses } = getModalAnimationClasses(isVisible, isClosing);

  const getItemErrorMessage = (item: BatchImageItem): string | null => {
    const error = item.result?.error?.trim();
    if (error) return error;

    const detailsMessage = item.result?.errorDetails?.message?.trim();
    if (detailsMessage) return detailsMessage;

    return null;
  };

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
              const groupItems = batchTaskManager.getItems(g.id);
              const total = groupItems.length;
              const completed = groupItems.filter((i: BatchImageItem) => i.status === "success").length;
              const failed = groupItems.filter((i: BatchImageItem) => i.status === "error").length;
              const running = groupItems.filter((i: BatchImageItem) => i.status === "running").length;
              const latestGroupError = groupItems.reduceRight<string | null>((acc, item) => {
                if (acc) return acc;
                if (item.status !== "error") return acc;
                return getItemErrorMessage(item);
              }, null);
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
                      {failed > 0 && (
                        <div className="text-xs text-error/80 mt-1 truncate" title={latestGroupError ?? "该组存在失败项，请展开查看具体错误"}>
                          最近错误：{latestGroupError ?? "该组存在失败项，请展开查看具体错误"}
                        </div>
                      )}
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
                      {groupItems.map((it: BatchImageItem) => {
                        const errorMessage = it.status === "error" ? getItemErrorMessage(it) : null;
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
                          <div key={it.id} className="flex items-start justify-between gap-2 text-xs">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-4 h-4 flex items-center justify-center">{icon}</div>
                                <span className="truncate">{name}</span>
                                <span className="text-base-content/40">{it.status}</span>
                              </div>
                              {it.status === "error" && (
                                <div className="pl-6 mt-1 text-error/90 truncate" title={errorMessage ?? "任务失败，未返回详细错误"}>
                                  错误：{errorMessage ?? "任务失败，未返回详细错误"}
                                </div>
                              )}
                            </div>
                            <button
                              className="btn btn-ghost btn-xs shrink-0"
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
