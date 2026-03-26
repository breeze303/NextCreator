import { useEffect, useMemo, useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { Bot, FolderOpen, GitBranch, Pencil, Plus, Settings2, Sparkles, Trash2, X } from "lucide-react";

import { TreeChatFlow } from "@/components/tree/TreeChatFlow";
import { useSettingsStore } from "@/stores/settingsStore";
import { useTreeModelStore } from "@/stores/treeModelStore";
import { useTreeSessionStore } from "@/stores/treeSessionStore";
import type { TreeModel, TreeSession } from "@/types/tree";

const FALLBACK_RUNTIME_MODEL: TreeModel = {
  id: "tree-host-runtime-fallback-model",
  name: "Tree Host Runtime",
  baseUrl: "",
  apiKey: "",
  modelName: "gpt-4o-mini",
  defaultSystemPrompt: "你是 Tree 工作区中的助手，请给出简洁且有帮助的回答。",
  maxTokens: 512,
  temperature: 0.7,
};

function createInitialSession(seedModelId: string, title: string): TreeSession {
  const sessionId = crypto.randomUUID();
  const systemNodeId = crypto.randomUUID();
  const chatNodeId = crypto.randomUUID();
  const now = new Date().toISOString();

  return {
    id: sessionId,
    title,
    createdAt: now,
    updatedAt: now,
    nodes: [
      {
        id: systemNodeId,
        parentId: null,
        type: "system",
        userMessage: "你是 Tree 工作区中的助手，请根据上下文给出清晰回应。",
        assistantMessage: "",
        modelId: seedModelId,
        temperature: 0.7,
        maxTokens: 1024,
        createdAt: now,
        position: { x: 40, y: 40 },
      },
      {
        id: chatNodeId,
        parentId: systemNodeId,
        type: "chat",
        userMessage: "Tree 工作区已挂载到 NextCreator 主区域。",
        assistantMessage: "当前为 host 托管的 Tree 工作区外壳，可渲染真实会话图谱。",
        modelId: seedModelId,
        temperature: 0.7,
        maxTokens: 1024,
        createdAt: now,
        position: { x: 80, y: 280 },
      },
    ],
  };
}

function createModelDraft(): TreeModel {
  return {
    id: crypto.randomUUID(),
    name: "新模型",
    providerId: undefined,
    baseUrl: "https://api.openai.com/v1",
    apiKey: "",
    modelName: "gpt-4o-mini",
    defaultSystemPrompt: "你是 Tree 工作区中的助手，请给出简洁且有帮助的回答。",
    maxTokens: 1024,
    temperature: 0.7,
  };
}

function formatSessionTime(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "未知时间";
  }
  return date.toLocaleString("zh-CN", {
    hour12: false,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TreeWorkspace() {
  const hostProviders = useSettingsStore((state) => state.settings.providers);
  const hostDefaultProviderId = useSettingsStore((state) => state.settings.nodeProviders.llmContent);
  const sessions = useTreeSessionStore((state) => state.sessions);
  const currentSessionId = useTreeSessionStore((state) => state.currentSessionId);
  const setCurrentSessionId = useTreeSessionStore((state) => state.setCurrentSessionId);
  const createSession = useTreeSessionStore((state) => state.createSession);
  const updateSession = useTreeSessionStore((state) => state.updateSession);
  const deleteSession = useTreeSessionStore((state) => state.deleteSession);

  const models = useTreeModelStore((state) => state.models);
  const defaultModelId = useTreeModelStore((state) => state.defaultModelId);
  const hasHydratedModels = useTreeModelStore((state) => state._hasHydrated);
  const setDefaultModelId = useTreeModelStore((state) => state.setDefaultModelId);
  const createModel = useTreeModelStore((state) => state.createModel);
  const updateModel = useTreeModelStore((state) => state.updateModel);
  const deleteModel = useTreeModelStore((state) => state.deleteModel);

  const [sessionSearch, setSessionSearch] = useState("");
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingSessionTitle, setEditingSessionTitle] = useState("");
  const [isModelManagerOpen, setIsModelManagerOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<TreeModel | null>(null);

  const sortedSessions = useMemo(
    () => [...sessions].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [sessions]
  );
  const filteredSessions = useMemo(() => {
    const keyword = sessionSearch.trim().toLowerCase();
    if (!keyword) {
      return sortedSessions;
    }
    return sortedSessions.filter((session) => session.title.toLowerCase().includes(keyword));
  }, [sessionSearch, sortedSessions]);

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === currentSessionId) ?? null,
    [currentSessionId, sessions]
  );

  const activeRuntimeModel = useMemo(() => {
    const selectedModel = models.find((model) => model.id === defaultModelId) ?? models[0];
    return selectedModel ?? FALLBACK_RUNTIME_MODEL;
  }, [defaultModelId, models]);

  useEffect(() => {
    if (!currentSessionId && sessions.length > 0) {
      setCurrentSessionId(sessions[0].id);
    }
  }, [currentSessionId, sessions, setCurrentSessionId]);

  useEffect(() => {
    if (models.length === 0) {
      return;
    }

    const defaultExists = defaultModelId ? models.some((model) => model.id === defaultModelId) : false;
    if (!defaultExists) {
      setDefaultModelId(models[0].id);
    }
  }, [defaultModelId, models, setDefaultModelId]);

  const createSessionTitle = () => {
    const prefix = "Tree 会话";
    const existingTitles = new Set(sessions.map((session) => session.title));
    let counter = sessions.length + 1;
    let candidate = `${prefix} ${counter}`;
    while (existingTitles.has(candidate)) {
      counter += 1;
      candidate = `${prefix} ${counter}`;
    }
    return candidate;
  };

  const handleCreateSession = () => {
    const session = createInitialSession(activeRuntimeModel.id, createSessionTitle());
    createSession(session);
    setEditingSessionId(session.id);
    setEditingSessionTitle(session.title);
  };

  const handleStartEditSession = (session: TreeSession) => {
    setEditingSessionId(session.id);
    setEditingSessionTitle(session.title);
  };

  const handleSaveSessionTitle = (session: TreeSession) => {
    const title = editingSessionTitle.trim();
    if (!title) {
      setEditingSessionTitle(session.title);
      setEditingSessionId(null);
      return;
    }

    updateSession({
      ...session,
      title,
    });
    setEditingSessionId(null);
  };

  const handleDeleteSession = (sessionId: string) => {
    deleteSession(sessionId);
    if (editingSessionId === sessionId) {
      setEditingSessionId(null);
      setEditingSessionTitle("");
    }
  };

  const handleCreateModel = () => {
    if (!hasHydratedModels) {
      return;
    }
    setEditingModel({
      ...createModelDraft(),
      providerId: hostDefaultProviderId ?? hostProviders[0]?.id,
    });
  };

  const handleSaveModel = (event?: React.FormEvent) => {
    event?.preventDefault();

    if (!hasHydratedModels) {
      return;
    }

    if (!editingModel) {
      return;
    }

    const sanitizedModel: TreeModel = {
      ...editingModel,
      name: editingModel.name.trim() || "未命名模型",
      modelName: editingModel.modelName.trim() || FALLBACK_RUNTIME_MODEL.modelName,
      baseUrl: editingModel.baseUrl.trim(),
      apiKey: editingModel.apiKey.trim(),
      defaultSystemPrompt: editingModel.defaultSystemPrompt.trim() || FALLBACK_RUNTIME_MODEL.defaultSystemPrompt,
      maxTokens: Number.isFinite(editingModel.maxTokens) ? Math.max(1, editingModel.maxTokens) : 1,
      temperature: Number.isFinite(editingModel.temperature) ? Math.max(0, Math.min(2, editingModel.temperature)) : 0.7,
    };

    const latestState = useTreeModelStore.getState();
    const existed = latestState.models.some((model) => model.id === sanitizedModel.id);
    if (existed) {
      updateModel(sanitizedModel);
    } else {
      createModel(sanitizedModel);
      setDefaultModelId(sanitizedModel.id);
    }

    if (!latestState.defaultModelId || !latestState.models.some((model) => model.id === latestState.defaultModelId)) {
      setDefaultModelId(sanitizedModel.id);
    }

    setEditingModel(null);
  };

  const handleDeleteModel = (modelId: string) => {
    deleteModel(modelId);
    if (editingModel?.id === modelId) {
      setEditingModel(null);
    }
  };

  return (
    <section className="flex-1 h-full bg-base-100">
      <div className="h-full p-3">
        <div className="h-full rounded-xl border border-base-300 bg-base-200/30 overflow-hidden flex min-w-0">
          <aside className="w-72 min-w-72 border-r border-base-300 bg-base-100 flex flex-col">
            <div className="px-4 py-3 border-b border-base-300">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-primary" />
                Tree 会话
              </h2>
              <p className="mt-1 text-xs text-base-content/60">创建、搜索并打开 Tree 工作区中的独立会话。</p>
            </div>

            <div className="px-3 pt-3 pb-2 border-b border-base-300 space-y-2">
              <input
                className="input input-bordered input-sm w-full"
                placeholder="搜索会话"
                value={sessionSearch}
                onChange={(event) => setSessionSearch(event.target.value)}
                type="text"
              />
              <button className="btn btn-primary btn-sm w-full" onClick={handleCreateSession} type="button">
                <Plus className="w-4 h-4" />
                新建 Tree 会话
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto px-2 py-2 space-y-1">
              {filteredSessions.length === 0 ? (
                <p className="text-xs text-base-content/60 px-2 py-3">{sessionSearch ? "没有匹配会话" : "暂无会话"}</p>
              ) : (
                filteredSessions.map((session) => {
                  const isActive = session.id === currentSessionId;
                  const isEditing = session.id === editingSessionId;

                  return (
                    <div
                      className={`rounded-lg border px-2 py-2 group ${
                        isActive ? "border-primary/40 bg-primary/5" : "border-transparent hover:border-base-300 hover:bg-base-200/50"
                      }`}
                      key={session.id}
                    >
                      {isEditing ? (
                        <input
                          autoFocus
                          className="input input-bordered input-xs w-full"
                          onBlur={() => handleSaveSessionTitle(session)}
                          onChange={(event) => setEditingSessionTitle(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleSaveSessionTitle(session);
                            }
                            if (event.key === "Escape") {
                              setEditingSessionId(null);
                              setEditingSessionTitle(session.title);
                            }
                          }}
                          type="text"
                          value={editingSessionTitle}
                        />
                      ) : (
                        <button
                          className="w-full text-left"
                          onClick={() => setCurrentSessionId(session.id)}
                          type="button"
                        >
                          <p className="text-sm font-medium truncate">{session.title}</p>
                          <p className="text-[11px] text-base-content/60 mt-0.5">更新于 {formatSessionTime(session.updatedAt)}</p>
                        </button>
                      )}

                      <div className="mt-2 flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => setCurrentSessionId(session.id)}
                          type="button"
                        >
                          <FolderOpen className="w-3 h-3" />
                          打开
                        </button>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => handleStartEditSession(session)}
                          type="button"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                        <button
                          className="btn btn-ghost btn-xs text-error"
                          onClick={() => handleDeleteSession(session.id)}
                          type="button"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </aside>

          <div className="flex-1 min-w-0 flex flex-col relative">
            <div className="border-b border-base-300 px-4 py-3 bg-base-100/80">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-primary" />
                    Tree 工作区
                  </h2>
                  <p className="mt-1 text-xs text-base-content/60 leading-relaxed">
                    当前区域由 NextCreator host 托管，支持会话切换与模型管理。
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="badge badge-ghost gap-1">
                    <Sparkles className="w-3 h-3" />
                    会话 {sessions.length}
                  </span>
                  <span className="badge badge-ghost gap-1">
                    <Bot className="w-3 h-3" />
                    模型 {models.length}
                  </span>
                  <select
                    className="select select-bordered select-xs min-w-40"
                    disabled={models.length === 0 || !hasHydratedModels}
                    onChange={(event) => setDefaultModelId(event.target.value || null)}
                    value={defaultModelId ?? ""}
                  >
                    {!hasHydratedModels ? <option value="">模型加载中...</option> : null}
                    {hasHydratedModels && models.length === 0 ? <option value="">暂无可选模型</option> : null}
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.modelName})
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-outline btn-xs" onClick={() => setIsModelManagerOpen(true)} type="button">
                    <Settings2 className="w-3 h-3" />
                    模型管理
                  </button>
                  <span className="badge badge-outline">运行模型 {activeRuntimeModel.modelName}</span>
                </div>
              </div>
            </div>

            {activeSession ? (
              <div className="flex-1 min-h-0">
                <ReactFlowProvider>
                  <TreeChatFlow runtimeModel={activeRuntimeModel} session={activeSession} />
                </ReactFlowProvider>
              </div>
            ) : (
              <div className="flex-1 min-h-0 flex items-center justify-center p-6">
                <div className="max-w-md w-full rounded-xl border border-base-300 bg-base-100 px-5 py-6 text-center">
                  <div className="mx-auto mb-3 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold">Tree 工作区已就绪</h3>
                  <p className="mt-2 text-xs text-base-content/60 leading-relaxed">
                    当前没有可展示的 Tree 会话。先创建一个会话，即可在主区域加载真实 Tree 图谱表面。
                  </p>
                  <button className="btn btn-primary btn-sm mt-4" onClick={handleCreateSession} type="button">
                    创建 Tree 会话
                  </button>
                </div>
              </div>
            )}

            {isModelManagerOpen ? (
              <div className="absolute inset-0 bg-base-100/75 backdrop-blur-[1px] flex justify-end p-3">
                <div className="w-full max-w-3xl h-full rounded-xl border border-base-300 bg-base-100 shadow-lg flex flex-col overflow-hidden">
                  <div className="px-4 py-3 border-b border-base-300 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold">Tree 模型管理</h3>
                      <p className="text-xs text-base-content/60 mt-1">仅作用于 Tree 工作区，不影响 host 全局供应商设置。</p>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={() => setIsModelManagerOpen(false)} type="button">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1 min-h-0 grid grid-cols-[18rem_minmax(0,1fr)] overflow-hidden">
                    <div className="w-72 min-w-72 border-r border-base-300 p-3 overflow-y-auto shrink-0 relative z-10">
                      <button
                        className="btn btn-sm btn-primary w-full mb-3"
                        disabled={!hasHydratedModels}
                        onClick={handleCreateModel}
                        type="button"
                      >
                        <Plus className="w-4 h-4" />
                        添加模型
                      </button>
                      <div className="space-y-1">
                        {!hasHydratedModels ? (
                          <p className="text-xs text-base-content/60 px-2 py-3">模型加载中...</p>
                        ) : models.length === 0 ? (
                          <p className="text-xs text-base-content/60 px-2 py-3">暂无模型，先添加一个。</p>
                        ) : (
                          models.map((model) => {
                            const isSelected = editingModel?.id === model.id;
                            return (
                              <div
                                className={`rounded-md px-2 py-2 border ${
                                  isSelected ? "border-primary/40 bg-primary/5" : "border-transparent hover:border-base-300"
                                }`}
                                key={model.id}
                              >
                                <button
                                  className="w-full text-left"
                                  onClick={() => setEditingModel({ ...model })}
                                  type="button"
                                >
                                  <p className="text-sm truncate">{model.name}</p>
                                  <p className="text-[11px] text-base-content/60 truncate">{model.modelName}</p>
                                </button>
                                <div className="mt-2 flex items-center gap-1">
                                  <button
                                    className={`btn btn-xs ${defaultModelId === model.id ? "btn-primary" : "btn-ghost"}`}
                                    onClick={() => setDefaultModelId(model.id)}
                                    type="button"
                                  >
                                    默认
                                  </button>
                                  <button
                                    className="btn btn-ghost btn-xs text-error"
                                    onClick={() => handleDeleteModel(model.id)}
                                    type="button"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    <div className="min-w-0 p-4 overflow-y-auto relative z-20">
                      {editingModel ? (
                        <form className="space-y-3" onSubmit={handleSaveModel}>
                          <div className="grid grid-cols-2 gap-3">
                            <label className="form-control">
                              <span className="label-text text-xs">模型名称</span>
                                <input
                                  className="input input-bordered input-sm"
                                  onChange={(event) =>
                                    setEditingModel((prev) => (prev ? { ...prev, name: event.target.value } : prev))
                                  }
                                  type="text"
                                  value={editingModel.name}
                                />
                            </label>
                          <label className="form-control">
                            <span className="label-text text-xs">模型标识</span>
                                <input
                                  className="input input-bordered input-sm"
                                  onChange={(event) =>
                                    setEditingModel((prev) => (prev ? { ...prev, modelName: event.target.value } : prev))
                                  }
                                  type="text"
                                  value={editingModel.modelName}
                              />
                            </label>
                          </div>

                          <label className="form-control">
                            <span className="label-text text-xs">运行时供应商</span>
                            <select
                              className="select select-bordered select-sm"
                              onChange={(event) =>
                                setEditingModel((prev) => (prev ? { ...prev, providerId: event.target.value || undefined } : prev))
                              }
                              value={editingModel.providerId ?? ""}
                            >
                              <option value="">使用全局 LLM 内容生成映射</option>
                              {hostProviders.map((provider) => (
                                <option key={provider.id} value={provider.id}>
                                  {provider.name}
                                </option>
                              ))}
                            </select>
                            <span className="label-text-alt text-[11px] text-base-content/60">
                              Tree 运行时将优先使用这里绑定的供应商；未设置时回退到宿主的“LLM 内容生成”默认映射。
                            </span>
                          </label>

                          <label className="form-control">
                            <span className="label-text text-xs">默认系统提示词</span>
                            <textarea
                              className="textarea textarea-bordered h-28"
                              onChange={(event) =>
                                setEditingModel((prev) => (prev ? { ...prev, defaultSystemPrompt: event.target.value } : prev))
                              }
                              value={editingModel.defaultSystemPrompt}
                            />
                          </label>

                          <div className="grid grid-cols-2 gap-3">
                            <label className="form-control">
                              <span className="label-text text-xs">温度 (0-2)</span>
                              <input
                                className="input input-bordered input-sm"
                                max={2}
                                min={0}
                                onChange={(event) =>
                                  setEditingModel((prev) =>
                                    prev ? { ...prev, temperature: Number.parseFloat(event.target.value) || 0 } : prev
                                  )
                                }
                                step={0.1}
                                type="number"
                                value={editingModel.temperature}
                              />
                            </label>
                            <label className="form-control">
                              <span className="label-text text-xs">最大 Token</span>
                              <input
                                className="input input-bordered input-sm"
                                min={1}
                                onChange={(event) =>
                                  setEditingModel((prev) =>
                                    prev ? { ...prev, maxTokens: Number.parseInt(event.target.value, 10) || 1 } : prev
                                  )
                                }
                                step={1}
                                type="number"
                                value={editingModel.maxTokens}
                              />
                            </label>
                          </div>

                          <div className="flex justify-end gap-2 border-t border-base-300 pt-3">
                            <button className="btn btn-ghost btn-sm" onClick={() => setEditingModel(null)} type="button">
                              取消
                            </button>
                            <button className="btn btn-primary btn-sm" disabled={!hasHydratedModels} type="submit">
                              保存模型
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="h-full flex items-center justify-center text-center">
                          <div>
                            <p className="text-sm">选择左侧模型进行编辑，或添加新模型。</p>
                            <p className="text-xs text-base-content/60 mt-1">保存后可直接在 Tree 工作区顶部切换默认模型。</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
