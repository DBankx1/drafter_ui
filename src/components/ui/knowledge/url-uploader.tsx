"use client";

import { GlobeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import FileIcon from "@/components/ui/file-icon";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Progress } from "@/components/ui/progress";
import { uploadUrlKnowledgeBaseAction } from "@/lib/knowledge/actions";
import { toast } from "sonner";

export default function URLUploader() {
  const initialFormState = { label: "", url: "" };
  const [form, setForm] = useState(initialFormState);
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
      setForm(initialFormState);
    } else if (state.error) {
      toast.error(state.error, { position: "top-center", closeButton: true });
    }
  }, [state.success, state.error]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.currentTarget;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (name === "content") setClientError(null);
    },
    [],
  );

  async function handleTextUpload() {
    if (!form.url.trim()) {
      setClientError("URL cannot be empty.");
      return;
    } else {
      setClientError(null);
    }

    startTransition(async () => {
      const result = await uploadUrlKnowledgeBaseAction(
        { success: false },
        form.label,
        form.url.trim(),
      );
      setState(result);
    });
  }

  return (
    <div className="kb-anim border-primary/10 flex flex-col gap-3 overflow-hidden rounded-xl border bg-white p-5">
      <div className="mb-5 flex flex-row items-center gap-4">
        <FileIcon type="url" size={34} />
        <div>
          <p className="text-sm font-bold">Web URL</p>
          <p className="text-primary/40 text-xs">
            Website pages, portfolios, documentation
          </p>
        </div>
      </div>

      <div className="border-chart-2/50 bg-chart-2/10 text-chart-2 mb-2 rounded-xl border p-3 text-xs">
        Drafter will crawl the page and extract readable content. Best for
        public pages — login-protected pages cannot be indexed.
      </div>

      <input
        className="border-primary/10 mb-2 w-full rounded-lg border bg-white p-3 text-sm"
        placeholder="Label (e.g. Pricing page, Documentation, etc.)"
        value={form.label}
        name="label"
        onChange={handleChange}
      />

      <input
        className="border-primary/10 mb-2 w-full rounded-lg border bg-white p-3 text-sm"
        placeholder="https://yourcompany.com/services"
        value={form.url}
        name="url"
        onChange={handleChange}
      />

      {errorMessage && (
        <p className="text-destructive mb-4 text-xs">{errorMessage}</p>
      )}

      {isPending && (
        <div className="mb-4">
          <Progress className="h-1" value={66} />
          <p className="text-primary/40 mt-1 text-center text-xs">
            Saving & indexing...
          </p>
        </div>
      )}

      <Button
        disabled={isPending || !form.url.trim()}
        type="button"
        className="bg-chart-2 hover:bg-chart-3 w-full py-5 text-white hover:cursor-pointer"
        onClick={handleTextUpload}
      >
        {isPending ? (
          <>
            <Spinner data-icon="inline-start" />
            Indexing URL...
          </>
        ) : (
          <>
            <GlobeIcon />
            Index URL
          </>
        )}
      </Button>
    </div>
  );
}
