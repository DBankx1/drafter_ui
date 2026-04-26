"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  KnowledgeBase,
  KnowledgeBaseActions,
  KnowledgeBaseStatus,
  KnowledgeBaseType,
} from "@/lib/types/knowledge-base";
import { KnowledgeBaseRowActions } from "./row-actions";
import { SourceTypeBadge } from "./source-type-badge";
import { StatusBadge } from "./status-badge";
import { formatBytes, formatDate } from "./utils";

// ─── HOW TO ADD A NEW COLUMN ─────────────────────────────────────────────────
// 1. Add your field to the KnowledgeBase interface in types/knowledge-base.ts
// 2. Add a new ColumnDef entry below, following the same pattern
// 3. Control visibility via the `meta.visible` flag (shown on desktop only by default)
// ─────────────────────────────────────────────────────────────────────────────

export function buildColumns(
  actions: KnowledgeBaseActions,
): ColumnDef<KnowledgeBase>[] {
  return [
    // ── Name ─────────────────────────────────────────────────────────────────
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground -ml-3 h-8 text-xs font-semibold tracking-widest uppercase"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex min-w-0 flex-col gap-1">
            <span className="truncate text-sm leading-tight font-medium">
              {item.name}
            </span>
            {item.tag && (
              <span className="border-border/60 bg-muted/50 text-muted-foreground inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[10px] font-medium">
                {item.tag}
              </span>
            )}
          </div>
        );
      },
      enableSorting: true,
      enableGlobalFilter: true,
    },

    // ── Type ──────────────────────────────────────────────────────────────────
    {
      accessorKey: "source_type",
      header: () => (
        <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
          Type
        </span>
      ),
      cell: ({ getValue }) => (
        <SourceTypeBadge type={getValue() as KnowledgeBaseType} />
      ),
      enableSorting: false,
      enableGlobalFilter: false,
      meta: { className: "hidden sm:table-cell" },
    },

    // ── Size ──────────────────────────────────────────────────────────────────
    {
      accessorKey: "kb_size",
      header: () => (
        <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
          Size
        </span>
      ),
      cell: ({ getValue }) => {
        const bytes = getValue() as number;
        return (
          <span className="text-muted-foreground text-sm tabular-nums">
            {bytes > 0 ? formatBytes(bytes) : "—"}
          </span>
        );
      },
      enableSorting: true,
      meta: { className: "hidden md:table-cell" },
    },

    // ── Status ────────────────────────────────────────────────────────────────
    {
      accessorKey: "status",
      header: () => (
        <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
          Status
        </span>
      ),
      cell: ({ getValue }) => (
        <StatusBadge status={getValue() as KnowledgeBaseStatus} />
      ),
      enableSorting: false,
      meta: { className: "hidden sm:table-cell" },
    },

    // ── Added ─────────────────────────────────────────────────────────────────
    {
      accessorKey: "uploaded_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground -ml-3 h-8 text-xs font-semibold tracking-widest uppercase"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Added
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      ),
      cell: ({ getValue }) => (
        <span className="text-muted-foreground text-sm whitespace-nowrap tabular-nums">
          {formatDate(getValue() as Date)}
        </span>
      ),
      sortingFn: "datetime",
      meta: { className: "hidden lg:table-cell" },
    },

    // ── Actions ───────────────────────────────────────────────────────────────
    {
      id: "actions",
      header: () => null,
      cell: ({ row }) => (
        <KnowledgeBaseRowActions item={row.original} actions={actions} />
      ),
      enableSorting: false,
      enableGlobalFilter: false,
      meta: { className: "w-px" },
    },
  ];
}
