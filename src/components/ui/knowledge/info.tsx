"use client";

import HintBox from "@/components/ui/hint-box";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export function KnowledgeBaseInfo() {
  const [hintOpen, setHintOpen] = useState(true);
  return (
    <div className="mb-7">
      <div className="mb-4 flex items-center gap-2">
        <p className="text-upper text-primary/50 text-xs font-bold tracking-wider uppercase">
          What is a Knowledge Base?
        </p>
        <button
          onClick={() => setHintOpen((o) => !o)}
          className="cursor-pointer rounded-full border bg-white p-0.5"
        >
          {hintOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>
      {hintOpen && (
        <div className="kb-anim border-primary/10 flex flex-col gap-3 overflow-hidden rounded-xl border bg-white p-5">
          <p className="text-primary/80 text-sm leading-[1.7]">
            A <strong className="text-[#0f172a]">knowledge base</strong> is a
            collection of information about your company that Drafter AI uses to
            write accurate, personalised proposals. The richer your knowledge
            base, the better your proposals.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <HintBox icon="📄" title="PDF documents">
              Upload company brochures, pricing sheets, service descriptions,
              case studies, or any business document in{" "}
              <strong>PDF format</strong> (max 20 MB per file).
            </HintBox>
            <HintBox icon="✏️" title="Text snippets">
              Paste short descriptions, taglines, team bios, mission statements,
              or any text you want Drafter to reference when writing proposals.
            </HintBox>
            <HintBox icon="🔗" title="URLs & web pages">
              Add links to your website, portfolio, or public pages. Drafter
              will crawl and index the content automatically.
            </HintBox>
          </div>
          <div className="rounded-xl border border-[#fde68a] bg-[#fefcef] px-6 py-4">
            <p className="text-xs leading-[1.6] text-[#92400e]">
              <strong>Tip:</strong> Start with an "About Us" PDF, a pricing
              document, and your website URL - that combination covers most
              proposal scenarios. You can add more sources at any time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
