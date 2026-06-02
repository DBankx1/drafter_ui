"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useTransition,
} from "react";
import { fetchConversationsAction } from "@/lib/engagements/actions";
import type {
  Conversation,
  ConversationsPage,
  GetConversationsParams,
} from "@/lib/types/engagement";

const PAGE_SIZE = 20;

interface Filters {
  search: string;
  dateFrom: string;
  dateTo: string;
  sort: "asc" | "desc";
}

interface EngagementsContextValue {
  conversations: Conversation[];
  total: number;
  thisWeekTotal: number;
  hasMore: boolean;
  isLoading: boolean;
  filters: Filters;
  setSearch: (value: string) => void;
  setDateRange: (from: string, to: string) => void;
  setSort: (sort: "asc" | "desc") => void;
  loadMore: () => void;
}

const EngagementsContext = createContext<EngagementsContextValue | null>(null);

export function EngagementsProvider({
  initialPage,
  thisWeekTotal,
  children,
}: {
  initialPage: ConversationsPage;
  thisWeekTotal: number;
  children: React.ReactNode;
}) {
  const [conversations, setConversations] = useState<Conversation[]>(
    initialPage.items,
  );
  const [total, setTotal] = useState(initialPage.total);
  const [hasMore, setHasMore] = useState(initialPage.has_more);
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState<Filters>({
    search: "",
    dateFrom: "",
    dateTo: "",
    sort: "desc",
  });

  const nextCursorRef = useRef<string | null>(initialPage.next_cursor);
  const filtersRef = useRef<Filters>(filters);
  filtersRef.current = filters;

  const fetchPage = useCallback(
    (params: GetConversationsParams, append: boolean) => {
      startTransition(async () => {
        const result = await fetchConversationsAction(params);
        if (result.data) {
          const page = result.data;
          setConversations((prev) =>
            append ? [...prev, ...page.items] : page.items,
          );
          setTotal(page.total);
          setHasMore(page.has_more);
          nextCursorRef.current = page.next_cursor;
        }
      });
    },
    [],
  );

  const resetAndFetch = useCallback(
    (newFilters: Filters) => {
      nextCursorRef.current = null;
      fetchPage(
        {
          limit: PAGE_SIZE,
          sort: newFilters.sort,
          search: newFilters.search || undefined,
          started_at_from: newFilters.dateFrom || undefined,
          started_at_to: newFilters.dateTo || undefined,
        },
        false,
      );
    },
    [fetchPage],
  );

  const setSearch = useCallback(
    (value: string) => {
      const next = { ...filtersRef.current, search: value };
      setFilters(next);
      resetAndFetch(next);
    },
    [resetAndFetch],
  );

  const setDateRange = useCallback(
    (from: string, to: string) => {
      const next = { ...filtersRef.current, dateFrom: from, dateTo: to };
      setFilters(next);
      resetAndFetch(next);
    },
    [resetAndFetch],
  );

  const setSort = useCallback(
    (sort: "asc" | "desc") => {
      const next = { ...filtersRef.current, sort };
      setFilters(next);
      resetAndFetch(next);
    },
    [resetAndFetch],
  );

  const loadMore = useCallback(() => {
    if (!hasMore || isPending || !nextCursorRef.current) return;
    const f = filtersRef.current;
    fetchPage(
      {
        cursor: nextCursorRef.current,
        limit: PAGE_SIZE,
        sort: f.sort,
        search: f.search || undefined,
        started_at_from: f.dateFrom || undefined,
        started_at_to: f.dateTo || undefined,
      },
      true,
    );
  }, [hasMore, isPending, fetchPage]);

  return (
    <EngagementsContext.Provider
      value={{
        conversations,
        total,
        thisWeekTotal,
        hasMore,
        isLoading: isPending,
        filters,
        setSearch,
        setDateRange,
        setSort,
        loadMore,
      }}
    >
      {children}
    </EngagementsContext.Provider>
  );
}

export function useEngagements() {
  const ctx = useContext(EngagementsContext);
  if (!ctx)
    throw new Error("useEngagements must be used within EngagementsProvider");
  return ctx;
}
