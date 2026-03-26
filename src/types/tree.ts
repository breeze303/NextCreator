export interface TreeModel {
  id: string;
  name: string;
  providerId?: string;
  baseUrl: string;
  apiKey: string;
  modelName: string;
  defaultSystemPrompt: string;
  maxTokens: number;
  temperature: number;
}

export interface TreeNodePosition {
  x: number;
  y: number;
}

export interface TreeChatNode {
  id: string;
  parentId: string | null;
  type: "system" | "chat";
  userMessage: string;
  assistantMessage: string;
  modelId: string;
  temperature: number;
  maxTokens: number;
  createdAt: string;
  isStreaming?: boolean;
  error?: string;
  position?: TreeNodePosition;
}

export interface TreeSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  nodes: TreeChatNode[];
}
