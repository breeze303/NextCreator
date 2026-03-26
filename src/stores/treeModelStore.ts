import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TreeModel } from "@/types/tree";
import { createTreePersistStorage, TREE_PERSISTENCE_KEYS } from "@/services/tree/treePersistence";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTreeModel(value: unknown): value is TreeModel {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.baseUrl === "string" &&
    typeof value.apiKey === "string" &&
    typeof value.modelName === "string" &&
    typeof value.defaultSystemPrompt === "string" &&
    typeof value.maxTokens === "number" &&
    typeof value.temperature === "number"
  );
}

interface TreeModelStore {
  models: TreeModel[];
  defaultModelId: string | null;
  _hasHydrated: boolean;

  setModels: (models: TreeModel[]) => void;
  setDefaultModelId: (id: string | null) => void;
  createModel: (model: TreeModel) => void;
  updateModel: (model: TreeModel) => void;
  deleteModel: (id: string) => void;
}

export const useTreeModelStore = create<TreeModelStore>()(
  persist(
    (set) => ({
      models: [],
      defaultModelId: null,
      _hasHydrated: false,

      setModels: (models) => {
        set({
          models,
          defaultModelId: models.length > 0 ? models[0].id : null,
        });
      },

      setDefaultModelId: (id) => {
        set({ defaultModelId: id });
      },

      createModel: (model) => {
        set((state) => {
          const nextModels = [...state.models, model];
          return {
            models: nextModels,
            defaultModelId: state.defaultModelId ?? model.id,
          };
        });
      },

      updateModel: (model) => {
        set((state) => ({
          models: state.models.map((item) => (item.id === model.id ? model : item)),
        }));
      },

      deleteModel: (id) => {
        set((state) => {
          const nextModels = state.models.filter((model) => model.id !== id);
          const nextDefaultModelId =
            state.defaultModelId === id ? (nextModels.length > 0 ? nextModels[0].id : null) : state.defaultModelId;

          return {
            models: nextModels,
            defaultModelId: nextDefaultModelId,
          };
        });
      },
    }),
    {
      name: TREE_PERSISTENCE_KEYS.models,
      storage: createTreePersistStorage(),
      merge: (persistedState, currentState) => {
        const safeModels =
          isObject(persistedState) && Array.isArray(persistedState.models)
            ? persistedState.models.filter((model) => isTreeModel(model))
            : [];

        const candidateDefaultModelId =
          isObject(persistedState) &&
          (typeof persistedState.defaultModelId === "string" || persistedState.defaultModelId === null)
            ? persistedState.defaultModelId
            : null;

        const safeDefaultModelId =
          candidateDefaultModelId !== null && safeModels.some((model) => model.id === candidateDefaultModelId)
            ? candidateDefaultModelId
            : safeModels[0]?.id ?? null;

        return {
          ...currentState,
          models: safeModels,
          defaultModelId: safeDefaultModelId,
        };
      },
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.error("Tree model store hydration failed:", error);
        }
        useTreeModelStore.setState({ _hasHydrated: true });
      },
      partialize: (state) => ({
        models: state.models,
        defaultModelId: state.defaultModelId,
      }),
    }
  )
);
