"use client";

import { Globe, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCallback, useEffect, useState, useTransition } from "react";
import { uploadUrlKnowledgeBaseAction } from "@/lib/knowledge/actions";
import { toast } from "sonner";
import { useKnowledgeBase } from "@/components/ui/knowledge/context";
import { KnowledgeBaseStatus, KnowledgeBaseType } from "@/lib/types/knowledge-base";

const INITIAL_FORM = { label: "", url: "" };

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

export default function URLUploaderPanel() {
  const { addOptimistic, confirmAdd, rollbackAdd } = useKnowledgeBase();
  const [form, setForm] = useState(INITIAL_FORM);
  const [clientError, setClientError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{ success: boolean; error?: string }>({
    success: false,
  });

  const errorMessage = clientError ?? state.error;

  useEffect(() => {
    if (state.success) {
      toast.success("URL indexed successfully", {
        position: "top-center",
        closeButton: true,
      });
      setForm(INITIAL_FORM);
    } else if (state.error) {
      toast.error(state.error, { position: "top-center", closeButton: true });
    }
  }, [state.success, state.error]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (name === "url") setClientError(null);
    },
    [],
  );

  function handleUrlUpload() {
    if (!form.url.trim()) {
      setClientError("URL cannot be empty.");
      return;
    }

    try {
      new URL(form.url.trim());
    } catch {
      setClientError("Please enter a valid URL including https://");
      return;
    }

    setClientError(null);

    const label = form.label.trim() || form.url.trim();
    const url = form.url.trim();

    const tempId = crypto.randomUUID();
    addOptimistic(tempId, {
      id: tempId,
      business_id: "",
      source_type: KnowledgeBaseType.URL,
      status: KnowledgeBaseStatus.PENDING,
      source_reference: url,
      uploaded_at: new Date(),
      meta: null,
      name: label,
    });

    startTransition(async () => {
      const result = await uploadUrlKnowledgeBaseAction(
        { success: false },
        form.label,
        url,
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
      <div className="flex items-start gap-2.5 rounded-lg border border-sky-200 bg-sky-50 px-3.5 py-3 dark:border-sky-800 dark:bg-sky-950/30">
        <Info className="mt-0.5 size-3.5 shrink-0 text-sky-600 dark:text-sky-400" />
        <p className="text-xs leading-relaxed text-sky-700 dark:text-sky-400">
          Drafter will crawl and extract content from the page. Works best on
          public pages — login-protected content cannot be indexed.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Label{" "}
            <span className="font-normal text-muted-foreground/60">
              (optional)
            </span>
          </label>
          <Input
            placeholder="e.g. Services page, Documentation, Pricing"
            value={form.label}
            name="label"
            disabled={isPending}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            URL{" "}
            <span className="font-normal text-muted-foreground/60">
              (required)
            </span>
          </label>
          <Input
            placeholder="https://yourcompany.com/services"
            value={form.url}
            name="url"
            type="url"
            disabled={isPending}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleUrlUpload()}
          />
        </div>
      </div>

      {errorMessage && (
        <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">
          {errorMessage}
        </p>
      )}

      {isPending && (
        <IndeterminateProgress label="Crawling & indexing your page…" />
      )}

      <Button
        disabled={isPending || !form.url.trim()}
        type="button"
        onClick={handleUrlUpload}
        className="w-full"
      >
        {isPending ? (
          <>
            <Spinner />
            Indexing…
          </>
        ) : (
          <>
            <Globe className="size-4" />
            Index URL
          </>
        )}
      </Button>
    </div>
  );
}
