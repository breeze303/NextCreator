export interface TreeFlowNodeData {
  [key: string]: unknown;
  node: {
    id: string;
    parentId: string | null;
    type: "system" | "chat";
    userMessage: string;
    assistantMessage: string;
    error?: string;
    isStreaming?: boolean;
  };
  onEditNode?: (nodeId: string, payload: { userMessage?: string; assistantMessage?: string }) => void;
  onAddChildNode?: (parentId: string) => void;
  onDeleteNode?: (nodeId: string) => void;
  onRunNode?: (nodeId: string) => void;
}
