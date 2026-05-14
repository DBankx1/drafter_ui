"use client";

import { UploadCloud, X } from "lucide-react";
import { IconFileTypePdf } from "@tabler/icons-react";
import Dropzone from "react-dropzone";
import { Button } from "@/components/ui/button";
import { useState, useTransition, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { uploadPDFKnowledgeBaseAction } from "@/lib/knowledge/actions";
import { toast } from "sonner";
import { useKnowledgeBase } from "@/components/ui/knowledge/context";
import { KnowledgeBaseStatus, KnowledgeBaseType } from "@/lib/types/knowledge-base";
import { cn } from "@/lib/utils";

const MAX_SIZE = 10 * 1024 * 1024;

function IndeterminateProgress({ label }: { label: string }) {
  return (
    <div className="space-y-1.5">
      <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="absolute inset-y-0 w-2/5 rounded-full bg-primary/70"
          style={{ animation: "indeterminate 1.8s cubic-bezier(0.4,0,0.2,1) infinite" }}
        />
      </div>
      <p className="text-center text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default function PDFUploaderPanel() {
  const { addOptimistic, confirmAdd, rollbackAdd } = useKnowledgeBase();
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{ success: boolean; error?: string }>({
    success: false,
  });
  const [clientError, setClientError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const errorMessage = clientError ?? state.error;

  useEffect(() => {
    if (state.success) {
      toast.success("PDF uploaded & indexed", {
        position: "top-center",
        closeButton: true,
      });
      setSelectedFile(null);
    } else if (state.error) {
      toast.error(state.error, { position: "top-center", closeButton: true });
    }
  }, [state.success, state.error]);

  function handleUpload() {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    const tempId = crypto.randomUUID();
    addOptimistic(tempId, {
      id: tempId,
      business_id: "",
      source_type: KnowledgeBaseType.PDF,
      status: KnowledgeBaseStatus.PENDING,
      source_reference: selectedFile.name,
      uploaded_at: new Date(),
      meta: null,
      name: selectedFile.name,
      size_bytes: selectedFile.size,
    });

    startTransition(async () => {
      const result = await uploadPDFKnowledgeBaseAction(
        { success: false },
        formData,
      );
      if (result.success && result.data) {
        confirmAdd(tempId, result.data);
      } else {
        rollbackAdd(tempId);
      }
      setState(result);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Dropzone
        accept={{ "application/pdf": [".pdf"] }}
        multiple={false}
        maxSize={MAX_SIZE}
        disabled={isPending}
        onDrop={(accepted, rejected) => {
          if (rejected.length > 0) {
            setClientError("Please upload a valid PDF under 10 MB.");
            setSelectedFile(null);
            return;
          }
          if (accepted.length > 0) {
            setClientError(null);
            setSelectedFile(accepted[0] as File);
          }
        }}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {selectedFile ? (
              <div className="flex items-center justify-between rounded-lg border border-dashed bg-muted/30 p-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-red-50 dark:bg-red-950/30">
                    <IconFileTypePdf className="size-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  disabled={isPending}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  "flex cursor-pointer flex-col items-center gap-2.5 rounded-lg border-2 border-dashed py-8 text-center transition-colors",
                  isDragActive
                    ? "border-ring bg-accent/40"
                    : "border-border hover:border-ring hover:bg-accent/20",
                )}
              >
                <div className="flex size-10 items-center justify-center rounded-xl border bg-background shadow-xs">
                  <UploadCloud className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {isDragActive
                      ? "Drop your PDF here"
                      : "Click to upload or drag & drop"}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    PDF only · Max 10 MB
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>

      {errorMessage && (
        <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">
          {errorMessage}
        </p>
      )}

      {isPending && (
        <IndeterminateProgress label="Uploading & indexing your PDF…" />
      )}

      <Button
        disabled={isPending || !selectedFile}
        type="button"
        onClick={handleUpload}
        className="w-full"
      >
        {isPending ? (
          <>
            <Spinner />
            Uploading…
          </>
        ) : (
          <>
            <UploadCloud className="size-4" />
            Upload PDF
          </>
        )}
      </Button>
    </div>
  );
}
