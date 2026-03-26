import { Background, Controls, ReactFlow, type Edge, type Node, type NodeTypes } from "@xyflow/react";
import { useCallback, useMemo, useState, type MouseEvent, type TouchEvent } from "react";

import { TreeChatNode } from "@/components/tree/nodes/TreeChatNode";
import { TreeSystemNode } from "@/components/tree/nodes/TreeSystemNode";
import type { TreeFlowNodeData } from "@/components/tree/types";
import { generateTreeChat, resolveTreeModelRuntime, TreeRuntimeAdapterError } from "@/services/tree/treeRuntimeAdapter";
import { useTreeModelStore } from "@/stores/treeModelStore";
import { useTreeSessionStore } from "@/stores/treeSessionStore";
import type { TreeSession } from "@/types/tree";
import type { TreeModel } from "@/types/tree";

type TreeFlowNode = Node<TreeFlowNodeData>;

const nodeTypes: NodeTypes = {
  system: TreeSystemNode,
  chat: TreeChatNode,
};

interface TreeChatFlowProps {
  session: TreeSession;
  runtimeModel: TreeModel;
}

function buildFallbackLayout(session: TreeSession): Map<string, { x: number; y: number }> {
  const layout = new Map<string, { x: number; y: number }>();
  const depthCache = new Map<string, number>();
  const laneByDepth = new Map<number, number>();
  const nodeMap = new Map(session.nodes.map((node) => [node.id, node]));

  const resolveDepth = (nodeId: string): number => {
    const cached = depthCache.get(nodeId);
    if (cached !== undefined) {
      return cached;
    }

    let depth = 0;
    let currentNode = nodeMap.get(nodeId);
    let guard = 0;
    while (currentNode?.parentId && guard < 256) {
      depth += 1;
      currentNode = nodeMap.get(currentNode.parentId);
      guard += 1;
    }

    depthCache.set(nodeId, depth);
    return depth;
  };

  const sortedNodes = [...session.nodes].sort((a, b) => {
    if (a.createdAt === b.createdAt) {
      return a.id.localeCompare(b.id);
    }
    return a.createdAt.localeCompare(b.createdAt);
  });

  sortedNodes.forEach((node) => {
    const depth = resolveDepth(node.id);
    const lane = laneByDepth.get(depth) ?? 0;
    laneByDepth.set(depth, lane + 1);
    layout.set(node.id, {
      x: lane * 420,
      y: depth * 240,
    });
  });

  return layout;
}

export function TreeChatFlow({ session, runtimeModel }: TreeChatFlowProps) {
  const addNodeToSession = useTreeSessionStore((state) => state.addNodeToSession);
  const updateNodeInSession = useTreeSessionStore((state) => state.updateNodeInSession);
  const deleteNodeFromSession = useTreeSessionStore((state) => state.deleteNodeFromSession);
  const models = useTreeModelStore((state) => state.models);
  const defaultModelId = useTreeModelStore((state) => state.defaultModelId);

  const [runtimeOutput, setRuntimeOutput] = useState<string>("");
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const nodeMap = useMemo(() => new Map(session.nodes.map((node) => [node.id, node])), [session.nodes]);

  const resolveModelForNode = useCallback(
    (modelId?: string) => {
      return models.find((model) => model.id === modelId)
        ?? models.find((model) => model.id === defaultModelId)
        ?? runtimeModel;
    },
    [defaultModelId, models, runtimeModel]
  );

  const buildMessagesForNode = useCallback(
    (nodeId: string) => {
      const chain: TreeSession["nodes"] = [];
      let cursor = nodeMap.get(nodeId);
      let guard = 0;

      while (cursor && guard < 256) {
        chain.unshift(cursor);
        cursor = cursor.parentId ? nodeMap.get(cursor.parentId) : undefined;
        guard += 1;
      }

      const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [];
      chain.forEach((node, index) => {
        if (node.type === "system") {
          if (node.userMessage.trim()) {
            messages.push({ role: "system", content: node.userMessage });
          }
          return;
        }

        if (node.userMessage.trim()) {
          messages.push({ role: "user", content: node.userMessage });
        }

        const isTarget = index === chain.length - 1;
        if (!isTarget && node.assistantMessage.trim()) {
          messages.push({ role: "assistant", content: node.assistantMessage });
        }
      });

      return messages;
    },
    [nodeMap]
  );

  const fallbackLayout = useMemo(() => buildFallbackLayout(session), [session]);
  const handleEditNode = useCallback(
    (nodeId: string, payload: { userMessage?: string; assistantMessage?: string }) => {
      const targetNode = session.nodes.find((node) => node.id === nodeId);
      if (!targetNode) {
        return;
      }

      updateNodeInSession(session.id, {
        ...targetNode,
        userMessage: payload.userMessage ?? targetNode.userMessage,
        assistantMessage: payload.assistantMessage ?? targetNode.assistantMessage,
      });
    },
    [session, updateNodeInSession]
  );

  const handleAddChildNode = useCallback(
    (parentId: string) => {
      const parentNode = session.nodes.find((node) => node.id === parentId);
      if (!parentNode) {
        return;
      }

      const siblingCount = session.nodes.filter((node) => node.parentId === parentId).length;
      const parentPosition = parentNode.position ?? fallbackLayout.get(parentId) ?? { x: 0, y: 0 };
      const now = new Date().toISOString();

      addNodeToSession(session.id, {
        id: crypto.randomUUID(),
        parentId,
        type: "chat",
        userMessage: "",
        assistantMessage: "",
        modelId: parentNode.modelId,
        temperature: parentNode.temperature,
        maxTokens: parentNode.maxTokens,
        createdAt: now,
        position: {
          x: parentPosition.x + siblingCount * 80,
          y: parentPosition.y + 260,
        },
      });
    },
    [addNodeToSession, fallbackLayout, session]
  );

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      const targetNode = session.nodes.find((node) => node.id === nodeId);
      if (!targetNode || targetNode.type === "system") {
        return;
      }
      deleteNodeFromSession(session.id, nodeId);
    },
    [deleteNodeFromSession, session]
  );

  const handleNodeDragStop = useCallback(
    (_event: MouseEvent | TouchEvent, node: Node<TreeFlowNodeData>) => {
      const targetNode = session.nodes.find((item) => item.id === node.id);
      if (!targetNode) {
        return;
      }

      updateNodeInSession(session.id, {
        ...targetNode,
        position: {
          x: node.position.x,
          y: node.position.y,
        },
      });
    },
    [session, updateNodeInSession]
  );

  const handleRunNode = useCallback(
    async (nodeId: string) => {
      const targetNode = session.nodes.find((node) => node.id === nodeId);
      if (!targetNode || targetNode.type !== "chat") {
        return;
      }

      const runtime = resolveModelForNode(targetNode.modelId);
      const messages = buildMessagesForNode(nodeId);

      if (!messages.some((message) => message.role === "user" && message.content.trim())) {
        updateNodeInSession(session.id, {
          ...targetNode,
          error: "请先输入用户消息。",
        });
        return;
      }

      setIsRunning(true);
      setRuntimeError(null);
      setRuntimeOutput("");
      updateNodeInSession(session.id, {
        ...targetNode,
        isStreaming: true,
        error: undefined,
      });

      try {
        const content = await generateTreeChat({
          treeModel: runtime,
          messages,
          temperature: targetNode.temperature,
          maxTokens: targetNode.maxTokens,
        });

        updateNodeInSession(session.id, {
          ...targetNode,
          assistantMessage: content || targetNode.assistantMessage,
          isStreaming: false,
          error: undefined,
        });
        setRuntimeOutput(content || "请求完成，但未返回文本内容。");
      } catch (error) {
        const message = error instanceof TreeRuntimeAdapterError ? error.message : error instanceof Error ? error.message : "未知错误";
        updateNodeInSession(session.id, {
          ...targetNode,
          isStreaming: false,
          error: message,
        });
        setRuntimeError(message);
      } finally {
        setIsRunning(false);
      }
    },
    [buildMessagesForNode, resolveModelForNode, session, updateNodeInSession]
  );

  const flowNodes = useMemo<TreeFlowNode[]>(
    () =>
      session.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position ?? fallbackLayout.get(node.id) ?? { x: 0, y: 0 },
        data: {
          node: {
            id: node.id,
            parentId: node.parentId,
            type: node.type,
            userMessage: node.userMessage,
            assistantMessage: node.assistantMessage,
            error: node.error,
            isStreaming: node.isStreaming,
          },
          onEditNode: handleEditNode,
          onAddChildNode: handleAddChildNode,
          onDeleteNode: handleDeleteNode,
          onRunNode: handleRunNode,
        },
      })),
    [fallbackLayout, handleAddChildNode, handleDeleteNode, handleEditNode, handleRunNode, session]
  );

  const flowEdges = useMemo<Edge[]>(
    () =>
      session.nodes
        .filter((node) => node.parentId)
        .map((node) => ({
          id: `e-${node.parentId}-${node.id}`,
          source: node.parentId as string,
          target: node.id,
          type: "smoothstep",
        })),
    [session]
  );

  let runtimeSummary = "运行时未就绪：未知错误";
  try {
    const runtime = resolveTreeModelRuntime(runtimeModel);
    runtimeSummary = `已解析到供应商：${runtime.providerName}（${runtime.protocol}）`;
  } catch (error) {
    if (error instanceof TreeRuntimeAdapterError) {
      runtimeSummary = `运行时未就绪：${error.message}`;
    }
  }

  const handleRunAdapterSmoke = async () => {
    setIsRunning(true);
    setRuntimeError(null);
    setRuntimeOutput("");

    try {
      const content = await generateTreeChat({
        treeModel: runtimeModel,
        messages: session.nodes
          .slice()
          .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
          .flatMap((node) => {
            if (node.type === "system") {
              return node.userMessage.trim() ? [{ role: "system" as const, content: node.userMessage }] : [];
            }
            const result: Array<{ role: "system" | "user" | "assistant"; content: string }> = [];
            if (node.userMessage.trim()) result.push({ role: "user", content: node.userMessage });
            if (node.assistantMessage.trim()) result.push({ role: "assistant", content: node.assistantMessage });
            return result;
          }),
      });
      setRuntimeOutput(content || "请求完成，但未返回文本内容。");
    } catch (error) {
      if (error instanceof TreeRuntimeAdapterError) {
        setRuntimeError(`${error.code}: ${error.message}`);
      } else {
        const message = error instanceof Error ? error.message : "未知错误";
        setRuntimeError(`REQUEST_FAILED: ${message}`);
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="pointer-events-none px-4 pt-3 pb-2 border-b border-base-300 text-xs text-base-content/70">
        <p>{runtimeSummary}</p>
        <button
          className="pointer-events-auto btn btn-xs btn-primary mt-2"
          disabled={isRunning}
          onClick={handleRunAdapterSmoke}
          type="button"
        >
          {isRunning ? "执行中..." : "运行当前树"}
        </button>
        {runtimeError ? <p className="mt-2 text-error">{runtimeError}</p> : null}
        {runtimeOutput ? <p className="mt-2 text-success whitespace-pre-wrap">{runtimeOutput}</p> : null}
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <ReactFlow<TreeFlowNode>
          nodes={flowNodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          nodesDraggable
          nodesConnectable={false}
          elementsSelectable
          onNodeDragStop={handleNodeDragStop}
          panOnDrag
          zoomOnScroll
          minZoom={0.4}
          maxZoom={1.5}
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { stroke: "#9ca3af", strokeWidth: 1.5 },
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={20} size={1} color="#d1d5db" />
          <Controls className="!bg-base-100 !border-base-300 !shadow-md" showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}
