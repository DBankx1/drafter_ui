"use client";

import { createContext, useContext, useState } from "react";
import type { KnowledgeBase } from "@/lib/types/knowledge-base";

interface KnowledgeBaseContextValue {
  sources: KnowledgeBase[];
  addOptimistic: (tempId: string, item: KnowledgeBase) => void;
  confirmAdd: (tempId: string, realItem: KnowledgeBase) => void;
  rollbackAdd: (tempId: string) => void;
  removeSource: (id: string) => void;
}

const KnowledgeBaseContext = createContext<KnowledgeBaseContextValue | null>(
  null,
);

export function KnowledgeBaseProvider({
  initialSources,
  children,
}: {
  initialSources: KnowledgeBase[];
  children: React.ReactNode;
}) {
  const [sources, setSources] = useState<KnowledgeBase[]>(initialSources);

  function addOptimistic(tempId: string, item: KnowledgeBase) {
    setSources((prev) => [{ ...item, id: tempId }, ...prev]);
  }

  function confirmAdd(tempId: string, realItem: KnowledgeBase) {
    setSources((prev) => prev.map((s) => (s.id === tempId ? realItem : s)));
  }

  function rollbackAdd(tempId: string) {
    setSources((prev) => prev.filter((s) => s.id !== tempId));
  }

  function removeSource(id: string) {
    setSources((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <KnowledgeBaseContext.Provider
      value={{ sources, addOptimistic, confirmAdd, rollbackAdd, removeSource }}
    >
      {children}
    </KnowledgeBaseContext.Provider>
  );
}

export function useKnowledgeBase() {
  const ctx = useContext(KnowledgeBaseContext);
  if (!ctx)
    throw new Error(
      "useKnowledgeBase must be used within KnowledgeBaseProvider",
    );
  return ctx;
}
