import type { Provider } from "@/types";
import { getBuiltinProvider } from "@/config/builtinProviders";

export function isBuiltinProvider(provider: Provider): boolean {
  return !!provider.builtinId;
}

export function resolveProviderRuntime(provider: Provider): Provider {
  if (!provider.builtinId) return provider;
  const builtin = getBuiltinProvider(provider.builtinId);
  if (!builtin) return provider;
  return {
    ...provider,
    protocol: builtin.protocol,
    baseUrl: builtin.baseUrl,
    apiKey: builtin.apiKey,
    name: provider.name || builtin.displayName,
  };
}

export function getProviderBaseUrlDisplay(provider: Provider): string {
  return provider.builtinId ? "内置配置（已隐藏）" : provider.baseUrl;
}
