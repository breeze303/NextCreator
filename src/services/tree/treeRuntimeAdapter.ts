import { generateLLMContentWithOptions } from "@/services/llmService";
import { resolveProviderRuntime } from "@/services/providerResolution";
import { useSettingsStore } from "@/stores/settingsStore";
import type { Provider, ProviderProtocol } from "@/types";
import type { TreeModel } from "@/types/tree";

export interface TreeChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export type TreeRuntimeErrorCode =
  | "MISSING_PROVIDER_MAPPING"
  | "PROVIDER_NOT_FOUND"
  | "MISSING_API_KEY"
  | "UNSUPPORTED_PROTOCOL"
  | "REQUEST_FAILED"
  | "REQUEST_CANCELLED";

export class TreeRuntimeAdapterError extends Error {
  constructor(
    public readonly code: TreeRuntimeErrorCode,
    message: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "TreeRuntimeAdapterError";
  }
}

const SUPPORTED_PROTOCOLS: ProviderProtocol[] = ["google", "openai", "openaiResponses", "claude"];

export interface TreeModelRuntime {
  provider: Provider;
  providerId: string;
  providerName: string;
  protocol: ProviderProtocol;
  modelName: string;
  defaultSystemPrompt?: string;
  defaultTemperature: number;
  defaultMaxTokens: number;
}

export interface GenerateTreeChatParams {
  messages: TreeChatMessage[];
  treeModel: TreeModel;
  temperature?: number;
  maxTokens?: number;
  signal?: AbortSignal;
  onChunk?: (chunk: string) => void;
}

function normalizeContent(content: string): string {
  return content.trim();
}

function toPrompt(messages: TreeChatMessage[]): { prompt: string; systemPrompt?: string } {
  const normalizedMessages = messages
    .map((message) => ({ ...message, content: normalizeContent(message.content) }))
    .filter((message) => message.content.length > 0);

  const systemPrompt = normalizedMessages
    .filter((message) => message.role === "system")
    .map((message) => message.content)
    .join("\n\n")
    .trim();

  const prompt = normalizedMessages
    .filter((message) => message.role !== "system")
    .map((message) => `${message.role === "user" ? "User" : "Assistant"}: ${message.content}`)
    .join("\n\n")
    .trim();

  return {
    prompt,
    systemPrompt: systemPrompt || undefined,
  };
}

export function resolveTreeModelRuntime(treeModel: TreeModel): TreeModelRuntime {
  const { settings } = useSettingsStore.getState();
  const providerId = treeModel.providerId || settings.nodeProviders.llmContent;

  if (!providerId) {
    throw new TreeRuntimeAdapterError(
      "MISSING_PROVIDER_MAPPING",
      "Tree 模式未找到可用供应商映射。请在供应商管理中为“LLM 内容生成”节点配置供应商，或为 Tree 模型指定 providerId。"
    );
  }

  const provider = settings.providers.find((item) => item.id === providerId);
  if (!provider) {
    throw new TreeRuntimeAdapterError(
      "PROVIDER_NOT_FOUND",
      `Tree 模式引用的供应商（${providerId}）不存在。请在供应商管理中重新绑定。`,
      { providerId }
    );
  }

  const resolvedProvider = resolveProviderRuntime(provider);

  if (!resolvedProvider.apiKey) {
    throw new TreeRuntimeAdapterError(
      "MISSING_API_KEY",
      `供应商“${resolvedProvider.name}”缺少 API Key。请在供应商管理中补全后重试。`,
      { providerId: resolvedProvider.id, providerName: resolvedProvider.name }
    );
  }

  if (!SUPPORTED_PROTOCOLS.includes(resolvedProvider.protocol)) {
    throw new TreeRuntimeAdapterError(
      "UNSUPPORTED_PROTOCOL",
      `Tree 运行时暂不支持协议“${resolvedProvider.protocol}”。请改用 OpenAI / OpenAI Responses / Claude / Google 协议。`,
      { providerId: resolvedProvider.id, protocol: resolvedProvider.protocol }
    );
  }

  return {
    provider: resolvedProvider,
    providerId: resolvedProvider.id,
    providerName: resolvedProvider.name,
    protocol: resolvedProvider.protocol,
    modelName: treeModel.modelName,
    defaultSystemPrompt: treeModel.defaultSystemPrompt,
    defaultTemperature: treeModel.temperature,
    defaultMaxTokens: treeModel.maxTokens,
  };
}

export async function generateTreeChat(params: GenerateTreeChatParams): Promise<string> {
  const { treeModel, messages, signal, onChunk } = params;
  const runtime = resolveTreeModelRuntime(treeModel);

  if (signal?.aborted) {
    throw new TreeRuntimeAdapterError("REQUEST_CANCELLED", "Tree 聊天请求已取消。", {
      providerId: runtime.providerId,
    });
  }

  const { prompt, systemPrompt } = toPrompt(messages);

  if (!prompt) {
    throw new TreeRuntimeAdapterError("REQUEST_FAILED", "Tree 聊天请求缺少有效消息内容。请先输入用户消息。");
  }

  const response = await generateLLMContentWithOptions(
    {
      model: runtime.modelName,
      prompt,
      systemPrompt: systemPrompt || runtime.defaultSystemPrompt,
      temperature: params.temperature ?? runtime.defaultTemperature,
      maxTokens: params.maxTokens ?? runtime.defaultMaxTokens,
    },
    {
      providerOverride: runtime.provider,
    }
  );

  if (signal?.aborted) {
    throw new TreeRuntimeAdapterError("REQUEST_CANCELLED", "Tree 聊天请求已取消。", {
      providerId: runtime.providerId,
    });
  }

  if (response.error) {
    throw new TreeRuntimeAdapterError("REQUEST_FAILED", `Tree 聊天请求失败：${response.error}`, {
      providerId: runtime.providerId,
      providerName: runtime.providerName,
      protocol: runtime.protocol,
      errorDetails: response.errorDetails,
    });
  }

  const content = response.content || "";
  if (content && onChunk) {
    onChunk(content);
  }

  return content;
}
