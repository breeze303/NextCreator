import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { Plus, Settings } from "lucide-react";
import { useEffect, useState } from "react";

import type { TreeFlowNodeData } from "@/components/tree/types";

type TreeSystemFlowNode = Node<TreeFlowNodeData>;

export function TreeSystemNode({ data }: NodeProps<TreeSystemFlowNode>) {
  const [systemPrompt, setSystemPrompt] = useState(data.node.userMessage);

  useEffect(() => {
    setSystemPrompt(data.node.userMessage);
  }, [data.node.userMessage]);

  const saveSystemPrompt = () => {
    data.onEditNode?.(data.node.id, { userMessage: systemPrompt });
  };

  return (
    <div className="min-w-[320px] max-w-[420px] rounded-lg border border-base-300 bg-base-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-base-300 px-3 py-2 text-xs font-medium text-base-content/80">
        <div className="flex items-center gap-2">
          <Settings className="h-3.5 w-3.5" />
          系统节点
        </div>
        <button
          className="btn btn-ghost btn-xs nodrag nopan"
          data-testid={`tree-add-child-${data.node.id}`}
          onClick={() => data.onAddChildNode?.(data.node.id)}
          type="button"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="p-3 text-sm">
        <p className="mb-1 text-xs text-base-content/50">系统提示词</p>
        <textarea
          className="textarea textarea-bordered w-full min-h-24 text-sm nodrag nopan"
          data-testid={`tree-system-message-${data.node.id}`}
          onBlur={saveSystemPrompt}
          onChange={(event) => setSystemPrompt(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && event.ctrlKey) {
              saveSystemPrompt();
            }
          }}
          value={systemPrompt}
        />
      </div>

      <Handle className="!bg-base-content/40" position={Position.Bottom} type="source" />
    </div>
  );
}
