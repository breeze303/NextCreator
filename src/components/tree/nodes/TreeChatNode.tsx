import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import type { TreeFlowNodeData } from "@/components/tree/types";

type TreeChatFlowNode = Node<TreeFlowNodeData>;

export function TreeChatNode({ data }: NodeProps<TreeChatFlowNode>) {
  const [userMessage, setUserMessage] = useState(data.node.userMessage);
  const [assistantMessage, setAssistantMessage] = useState(data.node.assistantMessage);

  useEffect(() => {
    setUserMessage(data.node.userMessage);
  }, [data.node.userMessage]);

  useEffect(() => {
    setAssistantMessage(data.node.assistantMessage);
  }, [data.node.assistantMessage]);

  const saveUserMessage = () => {
    data.onEditNode?.(data.node.id, { userMessage });
  };

  const saveAssistantMessage = () => {
    data.onEditNode?.(data.node.id, { assistantMessage });
  };

  return (
    <div className="min-w-[320px] max-w-[420px] rounded-lg border border-base-300 bg-base-100 shadow-sm overflow-hidden">
      <Handle className="!bg-base-content/40" position={Position.Top} type="target" />

      <div className="flex items-center justify-between gap-2 border-b border-base-300 px-3 py-2 text-xs font-medium text-base-content/80">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-3.5 w-3.5" />
          对话节点
        </div>
        <div className="flex items-center gap-1">
          <button
            className="btn btn-ghost btn-xs nodrag nopan"
            data-testid={`tree-add-child-${data.node.id}`}
            onClick={() => data.onAddChildNode?.(data.node.id)}
            type="button"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            className="btn btn-ghost btn-xs text-error nodrag nopan"
            data-testid={`tree-delete-node-${data.node.id}`}
            onClick={() => data.onDeleteNode?.(data.node.id)}
            type="button"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-3 p-3 text-sm">
        <div>
          <p className="mb-1 text-xs text-base-content/50">用户消息</p>
          <textarea
            className="textarea textarea-bordered w-full min-h-20 text-sm nodrag nopan"
            data-testid={`tree-user-message-${data.node.id}`}
            onBlur={saveUserMessage}
            onChange={(event) => setUserMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.ctrlKey) {
                saveUserMessage();
              }
            }}
            value={userMessage}
          />
        </div>

        <div>
          <p className="mb-1 text-xs text-base-content/50">AI 回复</p>
          <textarea
            className="textarea textarea-bordered w-full min-h-24 text-sm nodrag nopan"
            data-testid={`tree-assistant-message-${data.node.id}`}
            onBlur={saveAssistantMessage}
            onChange={(event) => setAssistantMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.ctrlKey) {
                saveAssistantMessage();
              }
            }}
            value={assistantMessage}
          />
        </div>
      </div>

      <Handle className="!bg-base-content/40" position={Position.Bottom} type="source" />
    </div>
  );
}
