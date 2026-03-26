import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TreeChatNode, TreeSession } from "@/types/tree";
import { createTreePersistStorage, TREE_PERSISTENCE_KEYS } from "@/services/tree/treePersistence";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTreeChatNode(value: unknown): value is TreeChatNode {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    (typeof value.parentId === "string" || value.parentId === null) &&
    (value.type === "system" || value.type === "chat") &&
    typeof value.userMessage === "string" &&
    typeof value.assistantMessage === "string" &&
    typeof value.modelId === "string" &&
    typeof value.temperature === "number" &&
    typeof value.maxTokens === "number" &&
    typeof value.createdAt === "string"
  );
}

function isTreeSession(value: unknown): value is TreeSession {
  if (!isObject(value) || !Array.isArray(value.nodes)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string" &&
    value.nodes.every((node) => isTreeChatNode(node))
  );
}

interface TreeSessionStore {
  sessions: TreeSession[];
  currentSessionId: string | null;

  setSessions: (sessions: TreeSession[]) => void;
  setCurrentSessionId: (id: string | null) => void;
  createSession: (session: TreeSession) => void;
  updateSession: (session: TreeSession) => void;
  deleteSession: (id: string) => void;
  addNodeToSession: (sessionId: string, node: TreeChatNode) => void;
  updateNodeInSession: (sessionId: string, node: TreeChatNode) => void;
  deleteNodeFromSession: (sessionId: string, nodeId: string) => void;
}

export const useTreeSessionStore = create<TreeSessionStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,

      setSessions: (sessions) => {
        set({ sessions });
      },

      setCurrentSessionId: (id) => {
        set({ currentSessionId: id });
      },

      createSession: (session) => {
        set((state) => ({
          sessions: [...state.sessions, session],
          currentSessionId: session.id,
        }));
      },

      updateSession: (session) => {
        const updatedSession = {
          ...session,
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          sessions: state.sessions.map((item) => (item.id === session.id ? updatedSession : item)),
        }));
      },

      deleteSession: (id) => {
        set((state) => {
          const nextSessions = state.sessions.filter((session) => session.id !== id);
          const nextCurrentSessionId =
            state.currentSessionId === id ? (nextSessions.length > 0 ? nextSessions[0].id : null) : state.currentSessionId;

          return {
            sessions: nextSessions,
            currentSessionId: nextCurrentSessionId,
          };
        });
      },

      addNodeToSession: (sessionId, node) => {
        const session = get().sessions.find((item) => item.id === sessionId);
        if (!session) {
          return;
        }

        const updatedSession: TreeSession = {
          ...session,
          nodes: [...session.nodes, node],
          updatedAt: new Date().toISOString(),
        };

        get().updateSession(updatedSession);
      },

      updateNodeInSession: (sessionId, node) => {
        const session = get().sessions.find((item) => item.id === sessionId);
        if (!session) {
          return;
        }

        const updatedSession: TreeSession = {
          ...session,
          nodes: session.nodes.map((sessionNode) => (sessionNode.id === node.id ? node : sessionNode)),
          updatedAt: new Date().toISOString(),
        };

        get().updateSession(updatedSession);
      },

      deleteNodeFromSession: (sessionId, nodeId) => {
        const session = get().sessions.find((item) => item.id === sessionId);
        if (!session) {
          return;
        }

        const nodesToRemove = new Set<string>();

        const collectNodesToRemove = (id: string) => {
          nodesToRemove.add(id);
          session.nodes.filter((node) => node.parentId === id).forEach((child) => collectNodesToRemove(child.id));
        };

        collectNodesToRemove(nodeId);

        const updatedSession: TreeSession = {
          ...session,
          nodes: session.nodes.filter((node) => !nodesToRemove.has(node.id)),
          updatedAt: new Date().toISOString(),
        };

        get().updateSession(updatedSession);
      },
    }),
    {
      name: TREE_PERSISTENCE_KEYS.sessions,
      storage: createTreePersistStorage(),
      merge: (persistedState, currentState) => {
        const safeSessions =
          isObject(persistedState) && Array.isArray(persistedState.sessions)
            ? persistedState.sessions.filter((session) => isTreeSession(session))
            : [];

        return {
          ...currentState,
          sessions: safeSessions,
        };
      },
      partialize: (state) => ({
        sessions: state.sessions,
      }),
    }
  )
);
