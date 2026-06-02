"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { cn } from "@/lib/utils";
import type { Conversation, ConversationStatus } from "@/lib/types/engagement";

const AVATAR_PALETTES = [
  { bg: "bg-blue-100 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-300" },
  { bg: "bg-emerald-100 dark:bg-emerald-950", text: "text-emerald-700 dark:text-emerald-300" },
  { bg: "bg-violet-100 dark:bg-violet-950", text: "text-violet-700 dark:text-violet-300" },
  { bg: "bg-amber-100 dark:bg-amber-950", text: "text-amber-700 dark:text-amber-300" },
  { bg: "bg-rose-100 dark:bg-rose-950", text: "text-rose-700 dark:text-rose-300" },
  { bg: "bg-teal-100 dark:bg-teal-950", text: "text-teal-700 dark:text-teal-300" },
  { bg: "bg-orange-100 dark:bg-orange-950", text: "text-orange-700 dark:text-orange-300" },
  { bg: "bg-indigo-100 dark:bg-indigo-950", text: "text-indigo-700 dark:text-indigo-300" },
] as const;

const STATUS_CONFIG: Record<
  ConversationStatus,
  { label: string; dot: string; className: string }
> = {
  active: {
    label: "Active",
    dot: "bg-emerald-500",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  },
  idle: {
    label: "Idle",
    dot: "bg-amber-500",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  closed: {
    label: "Closed",
    dot: "bg-slate-400",
    className:
      "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700",
  },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getPalette(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + (ch.codePointAt(0) ?? 0)) % AVATAR_PALETTES.length;
  return AVATAR_PALETTES[hash] ?? AVATAR_PALETTES[0];
}

function formatTime(iso: string): string {
  try {
    return formatDistanceToNowStrict(new Date(iso), { addSuffix: true });
  } catch {
    return "—";
  }
}

export function EngagementCard({ conversation }: Readonly<{ conversation: Conversation }>) {
  const palette = getPalette(conversation.customer_name);
  const status = STATUS_CONFIG[conversation.status] ?? STATUS_CONFIG.closed;

  return (
    <Link
      href={`/app/engagements/${conversation.id}`}
      className="bg-card border-border hover:border-border/80 group flex items-center gap-4 rounded-xl border p-4 transition-all duration-150 hover:-translate-y-px hover:shadow-sm active:translate-y-0 active:scale-[0.998]"
    >
      <div
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
          palette.bg,
          palette.text,
        )}
        aria-hidden
      >
        {getInitials(conversation.customer_name)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-start justify-between gap-3">
          <span className="text-foreground truncate text-sm font-medium">
            {conversation.customer_name}
          </span>
          <span className="text-muted-foreground shrink-0 text-xs">
            {formatTime(conversation.started_at)}
          </span>
        </div>

        <p className="text-muted-foreground mb-2 truncate text-xs">
          {conversation.customer_email}
        </p>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium",
              status.className,
            )}
          >
            <span className={cn("size-1.5 rounded-full", status.dot)} />
            {status.label}
          </span>
          <span className="text-muted-foreground font-mono text-xs">
            #{conversation.id.slice(-8)}
          </span>
        </div>
      </div>

      <ChevronRight className="text-muted-foreground/50 group-hover:text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
