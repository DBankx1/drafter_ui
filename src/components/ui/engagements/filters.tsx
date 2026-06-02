"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, ArrowDownUp, X } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "./date-range-picker";
import { useEngagements } from "./context";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function EngagementsFilters() {
  const { filters, total, setSearch, setDateRange, setSort, isLoading } =
    useEngagements();

  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 300);
  const prevSearchRef = useRef(filters.search);

  useEffect(() => {
    if (debouncedSearch !== prevSearchRef.current) {
      prevSearchRef.current = debouncedSearch;
      setSearch(debouncedSearch);
    }
  }, [debouncedSearch, setSearch]);

  const [dateRange, setDateRangeLocal] = useState<DateRange | undefined>(
    undefined,
  );

  const handleDateRange = useCallback(
    (range: DateRange | undefined) => {
      setDateRangeLocal(range);
      const from = range?.from?.toISOString() ?? "";
      const to = range?.to?.toISOString() ?? "";
      setDateRange(from, to);
    },
    [setDateRange],
  );

  const toggleSort = useCallback(() => {
    setSort(filters.sort === "desc" ? "asc" : "desc");
  }, [filters.sort, setSort]);

  const hasFilters = searchInput || dateRange;

  return (
    <div className="bg-card/80 border-border/50 supports-[backdrop-filter]:bg-card/60 sticky top-12 z-20 -mx-4 mb-4 border-b px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2" />
            <Input
              type="search"
              placeholder="Search by name or email…"
              className="h-8 pl-8 text-sm"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                className="text-muted-foreground hover:text-foreground absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs font-normal"
            onClick={toggleSort}
            title={
              filters.sort === "desc"
                ? "Sort: newest first"
                : "Sort: oldest first"
            }
          >
            <ArrowDownUp className="size-3.5" />
            <span className="hidden sm:inline">
              {filters.sort === "desc" ? "Newest" : "Oldest"}
            </span>
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <DateRangePicker value={dateRange} onChange={handleDateRange} />

          <div
            className={cn(
              "text-muted-foreground text-xs transition-opacity",
              isLoading ? "opacity-50" : "opacity-100",
            )}
          >
            {hasFilters ? (
              <span>
                <span className="text-foreground font-medium">{total}</span>{" "}
                result{total !== 1 ? "s" : ""}
              </span>
            ) : (
              <span>
                <span className="text-foreground font-medium">
                  {total.toLocaleString()}
                </span>{" "}
                total
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
