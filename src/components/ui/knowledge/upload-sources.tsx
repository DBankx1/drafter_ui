"use client";

import { useState } from "react";
import { FileText, Globe, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import PDFUploaderPanel from "./pdf-uploader";
import TextUploaderPanel from "./txt-uploader";
import URLUploaderPanel from "./url-uploader";

type SourceTab = "pdf" | "text" | "url";

const TABS: {
  id: SourceTab;
  label: string;
  shortLabel: string;
  description: string;
  Icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    id: "pdf",
    label: "PDF Document",
    shortLabel: "PDF",
    description: "Brochures, pricing sheets",
    Icon: FileText,
    iconBg: "bg-red-50 dark:bg-red-950/30",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    id: "text",
    label: "Text Snippet",
    shortLabel: "Text",
    description: "Bios, taglines, FAQs",
    Icon: Type,
    iconBg: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "url",
    label: "Web URL",
    shortLabel: "URL",
    description: "Website pages, docs",
    Icon: Globe,
    iconBg: "bg-emerald-50 dark:bg-emerald-950/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

export default function KnowledgeBaseUploadSources() {
  const [active, setActive] = useState<SourceTab>("pdf");

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-3">
        <p className="shrink-0 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Add a source
        </p>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {/* ── Tab selector ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 border-b">
          {TABS.map((tab, i) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={cn(
                  "group flex flex-col gap-2 px-3 py-4 text-left transition-colors sm:px-5",
                  "border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/50",
                  isActive
                    ? "border-b-foreground bg-muted/30"
                    : "border-b-transparent hover:bg-muted/20",
                  i > 0 && "border-l",
                )}
              >
                <div
                  className={cn(
                    "flex size-7 items-center justify-center rounded-lg",
                    tab.iconBg,
                  )}
                >
                  <tab.Icon className={cn("size-3.5", tab.iconColor)} />
                </div>
                <div>
                  <p
                    className={cn(
                      "text-xs font-semibold leading-tight transition-colors sm:text-sm",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                  </p>
                  <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">
                    {tab.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Panels — all mounted, toggled via CSS to preserve state ──────── */}
        <div className="p-5">
          <div className={active === "pdf" ? "block" : "hidden"}>
            <PDFUploaderPanel />
          </div>
          <div className={active === "text" ? "block" : "hidden"}>
            <TextUploaderPanel />
          </div>
          <div className={active === "url" ? "block" : "hidden"}>
            <URLUploaderPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
