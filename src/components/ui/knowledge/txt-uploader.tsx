"use client";

import { Plus } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { uploadTextKnowledgeBaseAction } from "@/lib/knowledge/actions";
import { useKnowledgeBase } from "@/components/ui/knowledge/context";
import { KnowledgeBaseStatus, KnowledgeBaseType } from "@/lib/types/knowledge-base";

const INITIAL_FORM = { label: "", content: "" };
const MAX_CONTENT = 10_000;

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

export default function TextUploaderPanel() {
  const { addOptimistic, confirmAdd, rollbackAdd } = useKnowledgeBase();
  const [form, setForm] = useState(INITIAL_FORM);
  const [isPending, startTransition] = useTransition();
  const [clientError, setClientError] = useState<string | null>(null);
  const [state, setState] = useState<{ success: boolean; error?: string }>({
    success: false,
  });

  const errorMessage = clientError ?? state.error;
  const charCount = form.content.length;

  useEffect(() => {
    if (state.success) {
      toast.success("Text uploaded & indexed", {
        position: "top-center",
        closeButton: true,
      });
      setForm(INITIAL_FORM);
    } else if (state.error) {
      toast.error(state.error, { position: "top-center", closeButton: true });
    }
  }, [state.success, state.error]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.currentTarget;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (name === "content") setClientError(null);
    },
    [],
  );

  function handleTextUpload() {
    if (!form.content.trim()) {
      setClientError("Text content cannot be empty.");
      return;
    }
    setClientError(null);

    const label =
      form.label.trim() ||
      `Text snippet — ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

    const tempId = crypto.randomUUID();
    addOptimistic(tempId, {
      id: tempId,
      business_id: "",
      source_type: KnowledgeBaseType.TEXT,
      status: KnowledgeBaseStatus.PENDING,
      source_reference: form.content,
      uploaded_at: new Date(),
      meta: null,
      name: label,
      size_bytes: new Blob([form.content]).size,
    });

    startTransition(async () => {
      const result = await uploadTextKnowledgeBaseAction(
        { success: false },
        label,
        form.content,
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
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Label{" "}
            <span className="font-normal text-muted-foreground/60">
              (optional)
            </span>
          </label>
          <Input
            placeholder="e.g. Mission Statement, About Us"
            value={form.label}
            name="label"
            disabled={isPending}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Content{" "}
            <span className="font-normal text-muted-foreground/60">
              (required)
            </span>
          </label>
          <Textarea
            placeholder="Paste your text here — company overview, service descriptions, team bios, FAQs…"
            name="content"
            value={form.content}
            onChange={handleChange}
            disabled={isPending}
            maxLength={MAX_CONTENT}
            rows={6}
            className="resize-none"
          />
          <p className="mt-1.5 text-right text-xs text-muted-foreground">
            <span
              className={
                charCount > MAX_CONTENT * 0.9 ? "text-amber-600" : ""
              }
            >
              {charCount.toLocaleString()}
            </span>
            /{MAX_CONTENT.toLocaleString()}
          </p>
        </div>
      </div>

      {errorMessage && (
        <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">
          {errorMessage}
        </p>
      )}

      {isPending && <IndeterminateProgress label="Saving & indexing your text…" />}

      <Button
        disabled={isPending || !form.content.trim()}
        type="button"
        onClick={handleTextUpload}
        className="w-full"
      >
        {isPending ? (
          <>
            <Spinner />
            Uploading…
          </>
        ) : (
          <>
            <Plus className="size-4" />
            Upload Text
          </>
        )}
      </Button>
    </div>
  );
}
