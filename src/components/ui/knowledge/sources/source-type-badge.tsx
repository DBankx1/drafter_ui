import { FileText, Globe, Type } from "lucide-react";
import { KnowledgeBaseType } from "@/lib/types/knowledge-base";
import { cn } from "@/lib/utils";

const CONFIG: Record<
  KnowledgeBaseType,
  { label: string; icon: React.ElementType; className: string }
> = {
  [KnowledgeBaseType.PDF]: {
    label: "PDF",
    icon: FileText,
    className:
      "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900",
  },
  [KnowledgeBaseType.TEXT]: {
    label: "Text",
    icon: Type,
    className:
      "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900",
  },
  [KnowledgeBaseType.URL]: {
    label: "URL",
    icon: Globe,
    className:
      "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
  },
};

export function SourceTypeBadge({
  type,
}: Readonly<{ type: KnowledgeBaseType }>) {
  const {
    label,
    icon: Icon,
    className,
  } = CONFIG[type] ?? CONFIG[KnowledgeBaseType.TEXT];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold tracking-wide",
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

// ─── Icon-only variant for mobile use ────────────────────────────────────────
export function SourceTypeIcon({
  type,
}: Readonly<{ type: KnowledgeBaseType }>) {
  const { icon: Icon, className } =
    CONFIG[type] ?? CONFIG[KnowledgeBaseType.TEXT];
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md border p-1.5",
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
    </span>
  );
}
