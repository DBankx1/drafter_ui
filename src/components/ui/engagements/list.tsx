"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useEngagements } from "./context";
import { EngagementCard } from "./card";
import { EngagementCardSkeletonList } from "./card-skeleton";
import { EngagementsEmptyState } from "./empty-state";

export function EngagementsList() {
  const { conversations, hasMore, isLoading, loadMore } = useEngagements();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  if (!isLoading && conversations.length === 0) {
    return <EngagementsEmptyState />;
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        {conversations.map((conversation) => (
          <EngagementCard key={conversation.id} conversation={conversation} />
        ))}

        {isLoading && conversations.length === 0 && (
          <EngagementCardSkeletonList />
        )}
      </div>

      <div ref={sentinelRef} className="h-4" />

      {isLoading && conversations.length > 0 && (
        <div className="flex items-center justify-center gap-2 py-6">
          <Loader2 className="text-muted-foreground size-4 animate-spin" />
          <span className="text-muted-foreground text-sm">
            Loading more…
          </span>
        </div>
      )}

      {!hasMore && conversations.length > 0 && (
        <p className="text-muted-foreground py-6 text-center text-xs">
          All conversations loaded
        </p>
      )}
    </div>
  );
}
