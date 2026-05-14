"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const HINT_ITEMS = [
  {
    icon: "📄",
    title: "PDF documents",
    description:
      "Upload company brochures, pricing sheets, service descriptions, or case studies. Max 10 MB per file.",
  },
  {
    icon: "✏️",
    title: "Text snippets",
    description:
      "Paste bios, taglines, mission statements, or any text you want Drafter to reference when writing proposals.",
  },
  {
    icon: "🔗",
    title: "URLs & web pages",
    description:
      "Add links to your website or portfolio. Drafter crawls and indexes the content automatically.",
  },
];

export function KnowledgeBaseInfo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <HelpCircle className="size-3.5" />
        <span className="font-medium">What is a knowledge base?</span>
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="mt-3 overflow-hidden rounded-xl border bg-card p-5">
          <p className="mb-4 text-sm leading-relaxed text-foreground/80">
            A <strong className="text-foreground">knowledge base</strong> is a
            collection of information about your company that Drafter AI uses to
            write accurate, personalised proposals. The richer it is, the better
            your proposals.
          </p>

          <div className="mb-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {HINT_ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex gap-3 rounded-lg border bg-muted/30 p-3.5"
              >
                <span className="mt-0.5 shrink-0 text-base">{item.icon}</span>
                <div>
                  <p className="mb-1 text-xs font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/30">
            <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-300">
              <strong>Tip:</strong> Start with an &ldquo;About Us&rdquo; PDF, a
              pricing document, and your website URL — that combination covers
              most proposal scenarios.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
