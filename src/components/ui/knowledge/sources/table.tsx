"use client";

import { useCallback, useMemo, useState } from "react";
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { Search, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type KnowledgeBase,
  type KnowledgeBaseActions,
  KnowledgeBaseType,
} from "@/types/knowledge-base";
import { buildColumns } from "./columns";
import { DataTable } from "./data-table";
import { EmptyState } from "./empty-state";

// ─── Filter pill config ───────────────────────────────────────────────────────

const TYPE_FILTERS: { label: string; value: KnowledgeBaseType | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "PDF", value: KnowledgeBaseType.PDF },
  { label: "Text", value: KnowledgeBaseType.TEXT },
  { label: "URL", value: KnowledgeBaseType.URL },
];

// ─── Footer summary ───────────────────────────────────────────────────────────

function FooterSummary({ data }: Readonly<{ data: KnowledgeBase[] }>) {
  const counts = useMemo(
    () =>
      data.reduce(
        (acc, item) => {
          acc[item.source_type] = (acc[item.source_type] ?? 0) + 1;
          return acc;
        },
        {} as Record<KnowledgeBaseType, number>,
      ),
    [data],
  );

  const parts = Object.entries(counts)
    .filter(([, n]) => n > 0)
    .map(
      ([type, n]) =>
        `${n} ${type === "URL" ? "URL" : type.charAt(0) + type.slice(1).toLowerCase()}${n > 1 && type !== "URL" ? "s" : ""}`,
    );

  return (
    <div className="text-muted-foreground flex items-center gap-2 text-xs">
      {parts.length > 0 ? <span>{parts.join(" · ")}</span> : null}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export interface KnowledgeBaseTableProps extends KnowledgeBaseActions {
  data: KnowledgeBase[];
  /** Show an "Add source" button in the header. Pass handler to enable it. */
  onAddSource?: () => void;
  /** Loading skeleton rows */
  isLoading?: boolean;
  className?: string;
}

export function KnowledgeBaseTable({
  data,
  onView,
  onDelete,
  onDownload,
  onAddSource,
  className,
}: Readonly<KnowledgeBaseTableProps>) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "uploaded_at", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [activeTypeFilter, setActiveTypeFilter] = useState<
    KnowledgeBaseType | "ALL"
  >("ALL");

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleTypeFilter = useCallback((value: KnowledgeBaseType | "ALL") => {
    setActiveTypeFilter(value);
    setColumnFilters(value === "ALL" ? [] : [{ id: "source_type", value }]);
  }, []);

  const handleClearFilters = useCallback(() => {
    setGlobalFilter("");
    setActiveTypeFilter("ALL");
    setColumnFilters([]);
  }, []);

  // ── Columns (memoised - only rebuilt when action refs change) ──────────────
  const actions: KnowledgeBaseActions = useMemo(
    () => ({ onView, onDelete, onDownload }),
    [onView, onDelete, onDownload],
  );
  const columns = useMemo(() => buildColumns(actions), [actions]);

  // ── Derived state ──────────────────────────────────────────────────────────
  const isFiltered = globalFilter.length > 0 || activeTypeFilter !== "ALL";
  const totalIndexed = data.length;
  const allIndexed = data.every(
    (d) => d.status === "PROCESSED" || d.status === "ERROR",
  );

  return (
    <div
      className={cn(
        "border-border dark:bg-background flex flex-col gap-0 overflow-hidden rounded-2xl border bg-white shadow-sm",
        className,
      )}
    >
      {/* ── Header bar ──────────────────────────────────────────────────────── */}
      <div className="border-border bg-muted/20 flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-3.5">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
          <Input
            placeholder="Search sources…"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="bg-background border-border/70 focus-visible:ring-ring h-9 pl-9 text-sm focus-visible:ring-1"
          />
        </div>

        {/* Type filter pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {TYPE_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handleTypeFilter(value)}
              className={cn(
                "h-8 rounded-full px-3.5 text-xs font-semibold tracking-wide transition-all duration-150",
                activeTypeFilter === value
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              )}
            >
              {label}
              {value !== "ALL" && (
                <span
                  className={cn(
                    "ml-1.5 tabular-nums",
                    activeTypeFilter === value ? "opacity-70" : "opacity-50",
                  )}
                >
                  {data.filter((d) => d.source_type === value).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Add source CTA */}
        {onAddSource && (
          <Button
            size="sm"
            className="h-8 shrink-0 gap-1.5 text-xs"
            onClick={onAddSource}
          >
            <Upload className="h-3 w-3" />
            Add source
          </Button>
        )}
      </div>

      {/* ── Table ───────────────────────────────────────────────────────────── */}
      <DataTable
        columns={columns}
        data={data}
        sorting={sorting}
        onSortingChange={setSorting}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        emptyState={
          <EmptyState
            isFiltered={isFiltered}
            onClearFilters={isFiltered ? handleClearFilters : undefined}
            onAddSource={!isFiltered ? onAddSource : undefined}
          />
        }
      />

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      {totalIndexed > 0 && (
        <div className="border-border bg-muted/10 flex items-center justify-between border-t px-5 py-3">
          <FooterSummary data={data} />
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                allIndexed ? "bg-emerald-500" : "animate-pulse bg-amber-400",
              )}
            />
            {allIndexed
              ? "All sources indexed and ready"
              : "Indexing in progress…"}
          </div>
        </div>
      )}
    </div>
  );
}
