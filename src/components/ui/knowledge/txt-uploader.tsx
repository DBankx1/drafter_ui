"use client";

import FileIcon from "@/components/ui/file-icon";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Progress } from "@/components/ui/progress";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { uploadTextKnowledgeBaseAction } from "@/lib/knowledge/actions";

export default function TXTUploader() {
  const initialFormState = { label: "", content: "" };
  const [form, setForm] = useState(initialFormState);
  const [isPending, startTransition] = useTransition();
  const [clientError, setClientError] = useState<string | null>(null);
  const [state, setState] = useState<{ success: boolean; error?: string }>({
    success: false,
  });
  const errorMessage = clientError ?? state.error;

  useEffect(() => {
    if (state.success) {
      toast.success("Text uploaded & indexed", {
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
    if (!form.content.trim()) {
      setClientError("Text content cannot be empty.");
      return;
    } else {
      setClientError(null);
    }
    const label =
      form.label.trim() ||
      `Text snippet — ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    // do something with the text snippet (e.g. send to server, update state, etc.)
    startTransition(async () => {
      const result = await uploadTextKnowledgeBaseAction(
        { success: false },
        label,
        form.content,
      );
      setState(result);
    });
  }

  return (
    <div className="kb-anim border-primary/10 flex flex-col gap-3 overflow-hidden rounded-xl border bg-white p-5">
      <div className="mb-5 flex flex-row items-center gap-4">
        <FileIcon type="text" size={34} />
        <div>
          <p className="text-sm font-bold">Text Snippet</p>
          <p className="text-primary/40 text-xs">
            Bios, taglines, descriptions
          </p>
        </div>
      </div>

      <input
        className="border-primary/10 mb-2 w-full rounded-lg border bg-white p-3 text-sm"
        placeholder="Label (e.g. Mission Statement)"
        value={form.label}
        name="label"
        onChange={handleChange}
      />
      <textarea
        className="border-primary/10 mb-2 w-full rounded-lg border bg-white p-3 text-sm"
        placeholder="Paste your text here…"
        name="content"
        value={form.content}
        onChange={handleChange}
        rows={4}
        style={{ resize: "vertical", marginBottom: isPending ? 0 : 12 }}
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
        disabled={isPending || !form.content.trim()}
        type="button"
        className="w-full bg-[#1d4ed8] py-5 text-white hover:cursor-pointer hover:bg-[#1e40af]"
        onClick={handleTextUpload}
      >
        {isPending ? (
          <>
            <Spinner data-icon="inline-start" />
            Uploading Text...
          </>
        ) : (
          <>
            <PlusIcon />
            Upload Text
          </>
        )}
      </Button>
    </div>
  );
}
