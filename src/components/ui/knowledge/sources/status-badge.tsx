import { CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";
import { KnowledgeBaseStatus } from "@/lib/types/knowledge-base";
import { cn } from "@/lib/utils";

const CONFIG: Record<
  KnowledgeBaseStatus,
  { label: string; icon: React.ElementType; className: string; spin?: boolean }
> = {
  [KnowledgeBaseStatus.PROCESSED]: {
    label: "Ready",
    icon: CheckCircle2,
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
  },
  [KnowledgeBaseStatus.PENDING]: {
    label: "Pending",
    icon: Clock,
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900",
  },
  //   [KnowledgeBaseStatus.INDEXING]: {
  //     label: "Indexing",
  //     icon: Loader2,
  //     className:
  //       "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900",
  //     spin: true,
  //   },
  [KnowledgeBaseStatus.ERROR]: {
    label: "Failed",
    icon: XCircle,
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900",
  },
};

export function StatusBadge({
  status,
}: Readonly<{ status: KnowledgeBaseStatus }>) {
  const cfg = CONFIG[status];
  if (!cfg) return null;
  const { label, icon: Icon, className, spin } = cfg;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        className,
      )}
    >
      <Icon className={cn("h-3 w-3", spin && "animate-spin")} />
      {label}
    </span>
  );
}
