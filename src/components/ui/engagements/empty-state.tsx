"use client";

import { MessageSquareDashed, SearchX } from "lucide-react";
import { useEngagements } from "./context";

export function EngagementsEmptyState() {
  const { filters } = useEngagements();
  const hasFilters = filters.search || filters.dateFrom || filters.dateTo;

  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-muted mb-4 flex size-14 items-center justify-center rounded-full">
          <SearchX className="text-muted-foreground size-7" />
        </div>
        <h3 className="text-foreground mb-1.5 text-base font-medium">
          No results found
        </h3>
        <p className="text-muted-foreground max-w-xs text-sm">
          No conversations match your current filters. Try adjusting the search
          or date range.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-muted mb-4 flex size-14 items-center justify-center rounded-full">
        <MessageSquareDashed className="text-muted-foreground size-7" />
      </div>
      <h3 className="text-foreground mb-1.5 text-base font-medium">
        No conversations yet
      </h3>
      <p className="text-muted-foreground max-w-xs text-sm">
        Once visitors start chatting with your widget, their conversations will
        appear here.
      </p>
    </div>
  );
}
