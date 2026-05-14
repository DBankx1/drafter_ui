"use client";

import { Database } from "lucide-react";
import { useKnowledgeBase } from "./context";
import { KnowledgeBaseStatus } from "@/lib/types/knowledge-base";

export function KnowledgeBaseHeader() {
  const { sources } = useKnowledgeBase();

  const total = sources.length;
  const indexed = sources.filter(
    (s) => s.status === KnowledgeBaseStatus.PROCESSED,
  ).length;
  const pending = sources.filter(
    (s) => s.status === KnowledgeBaseStatus.PENDING,
  ).length;

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-card shadow-sm">
          <Database className="size-5 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold leading-tight">Knowledge Base</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Train Drafter AI with your company documents, text, and web pages
          </p>
        </div>
      </div>

      {total > 0 && (
        <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium shadow-xs">
            {total} {total === 1 ? "source" : "sources"}
          </span>
          {indexed > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {indexed} indexed
            </span>
          )}
          {pending > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
              <span className="size-1.5 animate-pulse rounded-full bg-amber-500" />
              {pending} processing
            </span>
          )}
        </div>
      )}
    </div>
  );
}
