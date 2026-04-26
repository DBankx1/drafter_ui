"use client";

import {
  KnowledgeBaseType,
  type KnowledgeBase,
} from "@/lib/types/knowledge-base";
import { KnowledgeBaseTable } from "@/components/ui/knowledge/sources/table";
import {
  deleteKnowledgeBaseAction,
  viewKnowledgeBaseAction,
} from "@/lib/knowledge/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

export default function KnowledgeBaseSources({
  kbList,
}: Readonly<{ kbList: KnowledgeBase[] }>) {
  const [kbSources, setKbSources] = useState<KnowledgeBase[]>(kbList);
  const [textPreview, setTextPreview] = useState<{
    name: string;
    content: string;
  } | null>(null);

  const viewKnowledgeBase = async (item: KnowledgeBase) => {
    switch (item.source_type) {
      case KnowledgeBaseType.PDF: {
        const pdfUrl = await viewKnowledgeBaseAction(item.source_reference);
        window.open(pdfUrl, "_blank");
        break;
      }
      case KnowledgeBaseType.TEXT:
        setTextPreview({ name: item.name, content: item.source_reference });
        break;
      case KnowledgeBaseType.URL:
        window.open(item.source_reference, "_blank");
        break;
      default:
        console.warn("Unknown knowledge base type:", item.source_type);
    }
  };

  const downloadKnowledgeBase = async (item: KnowledgeBase) => {
    if (item.source_type === KnowledgeBaseType.PDF) {
      const pdfUrl = await viewKnowledgeBaseAction(item.source_reference, {
        download: true,
      });
      window.open(pdfUrl, "_blank");
    } else {
      console.warn(
        "Download not supported for knowledge base type:",
        item.source_type,
      );
    }
  };

  const deleteKnowledgeBase = async (item: KnowledgeBase) => {
    const result = await deleteKnowledgeBaseAction(item.id);
    if (result.success) {
      setKbSources((prev) => prev.filter((kb) => kb.id !== item.id));
      toast.success("Knowledge base deleted", {
        position: "top-center",
        closeButton: true,
      });
    } else {
      toast.error(result.error ?? "Failed to delete knowledge base", {
        position: "top-center",
        closeButton: true,
      });
    }
  };

  return (
    <div>
      <p className="text-upper text-primary/50 text-xs font-bold tracking-wider uppercase">
        Your Knowledge Sources
      </p>
      <KnowledgeBaseTable
        className="mt-4"
        data={kbSources}
        onView={viewKnowledgeBase}
        onDownload={downloadKnowledgeBase}
        onDelete={deleteKnowledgeBase}
        onAddSource={() => console.log(true)}
      />
      <Dialog
        open={!!textPreview}
        onOpenChange={(open) => !open && setTextPreview(null)}
      >
        <DialogContent className="w-full max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-blue-200 bg-blue-50">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-base leading-tight">
                  {textPreview?.name}
                </DialogTitle>
                <DialogDescription className="mt-0.5 text-xs">
                  Text source preview
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <ScrollArea className="border-border bg-muted/30 h-[60vh] w-full rounded-lg border p-4">
            <pre className="text-foreground/80 font-mono text-sm leading-relaxed break-words whitespace-pre-wrap">
              {textPreview?.content}
            </pre>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
