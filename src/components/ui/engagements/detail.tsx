"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  User,
  Mail,
  Calendar,
  Hash,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { ConversationDetail, ConversationStatus } from "@/lib/types/engagement";

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

const AVATAR_PALETTES = [
  { bg: "bg-blue-100 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-300" },
  { bg: "bg-emerald-100 dark:bg-emerald-950", text: "text-emerald-700 dark:text-emerald-300" },
  { bg: "bg-violet-100 dark:bg-violet-950", text: "text-violet-700 dark:text-violet-300" },
  { bg: "bg-amber-100 dark:bg-amber-950", text: "text-amber-700 dark:text-amber-300" },
  { bg: "bg-rose-100 dark:bg-rose-950", text: "text-rose-700 dark:text-rose-300" },
  { bg: "bg-teal-100 dark:bg-teal-950", text: "text-teal-700 dark:text-teal-300" },
] as const;

function getInitials(name: string) {
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

function MetaItem({
  icon: Icon,
  label,
  value,
  mono,
}: Readonly<{
  icon: React.ElementType;
  label: string;
  value: string;
  mono?: boolean;
}>) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-muted-foreground flex items-center gap-1 text-xs uppercase tracking-wide">
        <Icon className="size-3" />
        {label}
      </span>
      <span
        className={cn(
          "text-foreground text-sm font-medium",
          mono && "font-mono",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function EngagementDetail({
  conversation,
}: Readonly<{
  conversation: ConversationDetail;
}>) {
  const palette = getPalette(conversation.customer_name);
  const status = STATUS_CONFIG[conversation.status] ?? STATUS_CONFIG.closed;
  const messages = conversation.messages ?? [];

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/app/engagements"
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to engagements
      </Link>

      <div className="bg-card border-border overflow-hidden rounded-2xl border">
        {/* Header */}
        <div className="border-border border-b p-6">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex size-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold",
                palette.bg,
                palette.text,
              )}
              aria-hidden
            >
              {getInitials(conversation.customer_name)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h1 className="text-foreground text-xl font-semibold">
                  {conversation.customer_name}
                </h1>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
                    status.className,
                  )}
                >
                  <span
                    className={cn("size-1.5 rounded-full", status.dot)}
                  />
                  {status.label}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                {conversation.customer_email}
              </p>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="border-border flex flex-wrap gap-x-8 gap-y-4 border-b px-6 py-4">
          <MetaItem
            icon={Hash}
            label="Conversation ID"
            value={conversation.id}
            mono
          />
          <MetaItem
            icon={Calendar}
            label="Started"
            value={format(new Date(conversation.started_at), "d MMM yyyy, HH:mm")}
          />
          <MetaItem
            icon={Mail}
            label="Email"
            value={conversation.customer_email}
          />
          {messages.length > 0 && (
            <MetaItem
              icon={MessageSquare}
              label="Messages"
              value={String(messages.length)}
            />
          )}
        </div>

        {/* Messages */}
        {messages.length > 0 ? (
          <div className="flex flex-col gap-4 p-6">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={cn("flex gap-3", isUser && "flex-row-reverse")}
                >
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center self-end rounded-full",
                      isUser
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground border-border border",
                    )}
                  >
                    {isUser ? (
                      <User className="size-4" />
                    ) : (
                      <Bot className="size-4" />
                    )}
                  </div>

                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      isUser
                        ? "bg-foreground text-background rounded-br-sm"
                        : "bg-muted text-foreground border-border rounded-bl-sm border",
                    )}
                  >
                    {msg.content}
                    <div
                      className={cn(
                        "mt-1 text-xs",
                        isUser
                          ? "text-background/60 text-right"
                          : "text-muted-foreground",
                      )}
                    >
                      {format(new Date(msg.created_at), "HH:mm")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-muted mb-3 flex size-12 items-center justify-center rounded-full">
              <MessageSquare className="text-muted-foreground size-5" />
            </div>
            <p className="text-foreground mb-1 text-sm font-medium">
              No messages available
            </p>
            <p className="text-muted-foreground max-w-xs text-xs">
              Message history isn&apos;t available for this conversation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
