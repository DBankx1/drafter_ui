"use client";

import { MessageSquare, Activity, CalendarDays } from "lucide-react";
import { useEngagements } from "./context";
import { Skeleton } from "@/components/ui/skeleton";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub: string;
}) {
  return (
    <div className="bg-card border-border rounded-xl border p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="bg-muted flex size-8 items-center justify-center rounded-lg">
          <Icon className="text-muted-foreground size-4" />
        </div>
        <span className="text-muted-foreground text-xs font-medium">
          {label}
        </span>
      </div>
      <div className="text-foreground text-2xl font-semibold leading-none">
        {value}
      </div>
      <div className="text-muted-foreground mt-1.5 text-xs">{sub}</div>
    </div>
  );
}

export function EngagementsStats() {
  const { total, thisWeekTotal } = useEngagements();

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      <StatCard
        icon={MessageSquare}
        label="Total conversations"
        value={total.toLocaleString()}
        sub="all time"
      />
      <StatCard
        icon={Activity}
        label="Active sessions"
        value="—"
        sub="live now"
      />
      <StatCard
        icon={CalendarDays}
        label="This week"
        value={thisWeekTotal.toLocaleString()}
        sub="new conversations"
      />
    </div>
  );
}

export function EngagementsStatsSkeleton() {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-card border-border rounded-xl border p-4">
          <div className="mb-3 flex items-center gap-2">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="h-3 w-28" />
          </div>
          <Skeleton className="h-7 w-16" />
          <Skeleton className="mt-1.5 h-3 w-20" />
        </div>
      ))}
    </div>
  );
}
