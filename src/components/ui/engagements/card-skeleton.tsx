import { Skeleton } from "@/components/ui/skeleton";

export function EngagementCardSkeleton() {
  return (
    <div className="bg-card border-border flex items-center gap-4 rounded-xl border p-4">
      <Skeleton className="size-11 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-16 shrink-0" />
        </div>
        <Skeleton className="h-3 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="size-4 shrink-0" />
    </div>
  );
}

export function EngagementCardSkeletonList({ count = 8 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <EngagementCardSkeleton key={i} />
      ))}
    </div>
  );
}
