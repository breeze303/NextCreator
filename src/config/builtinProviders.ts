import type { ProviderProtocol } from "@/types";

export type BuiltinProviderId = "siliconflow";

export interface BuiltinProviderSecrets {
  protocol: ProviderProtocol;
  baseUrl: string;
  apiKey: string;
  displayName: string;
}

export const BUILTIN_PROVIDERS: Record<BuiltinProviderId, BuiltinProviderSecrets> = {
  siliconflow: {
    protocol: "openai", //模型提供商api格式
    baseUrl: "", //模型提供商api地址
    apiKey: "",  //模型提供商api key
    displayName: "测试", //模型提供商名称
  },
};

export function getBuiltinProvider(id: string): BuiltinProviderSecrets | undefined {
  if (id === "siliconflow") return BUILTIN_PROVIDERS.siliconflow;
  return undefined;
}
