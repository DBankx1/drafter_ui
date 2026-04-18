"use client";

import FileIcon from "@/components/ui/file-icon";
import { UploadIcon, XIcon } from "lucide-react";
import Dropzone from "react-dropzone";
import { Button } from "@/components/ui/button";
import { useState, useTransition, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Progress } from "@/components/ui/progress";
import { uploadPDFKnowledgeBaseAction } from "@/lib/knowledge/actions";
import { toast } from "sonner";
import { IconFileTypePdf } from "@tabler/icons-react";

export default function PDFUploader() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{ success: boolean; error?: string }>({
    success: false,
  });
  const [clientError, setClientError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const MAX_SIZE = 10 * 1024 * 1024;
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

  const handleUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    startTransition(async () => {
      const result = await uploadPDFKnowledgeBaseAction(
        { success: false },
        formData,
      );
      setState(result);
    });
  };

  return (
    <div className="kb-anim border-primary/10 flex flex-col gap-3 overflow-hidden rounded-xl border bg-white p-5">
      <div className="mb-5 flex flex-row items-center gap-4">
        <FileIcon type="pdf" size={34} />
        <div>
          <p className="text-sm font-bold">PDF Document</p>
          <p className="text-primary/40 text-xs">
            Brochures, pricing, services
          </p>
        </div>
      </div>

      <Dropzone
        accept={{ "application/pdf": [".pdf"] }}
        multiple={false}
        maxSize={MAX_SIZE}
        onDrop={(acceptedFiles, fileRejections) => {
          if (fileRejections.length > 0) {
            setClientError("Please upload a valid PDF under 10 MB.");
            setSelectedFile(null);
            return;
          }
          if (acceptedFiles.length > 0) {
            setClientError(null);
            setSelectedFile(acceptedFiles[0] as File);
          }
        }}
      >
        {({ getRootProps, getInputProps, isDragActive }: any) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {selectedFile ? (
              <div className="flex flex-row items-center justify-between rounded-lg border border-dashed p-2">
                <div className="flex flex-row items-center gap-2">
                  <IconFileTypePdf className="h-6 w-6" />
                  <p className="text-sm">{selectedFile.name}</p>
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="bg-primary hover:bg-destructive cursor-pointer rounded-full p-2"
                  type="button"
                >
                  <XIcon />
                </Button>
              </div>
            ) : (
              <div
                className={`mb-4 flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed px-3 py-6 ${
                  isDragActive
                    ? "border-[#38bdf8] bg-[#f0f9ff]"
                    : "border-primary/20 bg-transparent"
                }`}
              >
                <UploadIcon className="h-6 w-6" />
                <p className="text-primary/80 text-sm">
                  <strong>Click to upload</strong> or drag &amp; drop
                </p>
                <p className="text-primary/40 text-xs">PDF only · Max 10 MB</p>
              </div>
            )}
          </div>
        )}
      </Dropzone>

      {errorMessage && (
        <p className="text-destructive mb-4 text-xs">{errorMessage}</p>
      )}

      {isPending && (
        <div className="mb-4">
          <Progress className="h-1" value={66} />
          <p className="text-primary/40 mt-1 text-center text-xs">
            Uploading & indexing...
          </p>
        </div>
      )}

      <Button
        disabled={isPending || !selectedFile}
        type="button"
        onClick={handleUpload}
        className="w-full py-5 hover:cursor-pointer"
      >
        {isPending ? (
          <>
            <Spinner data-icon="inline-start" />
            Uploading PDF...
          </>
        ) : (
          <>
            <UploadIcon />
            Upload PDF
          </>
        )}
      </Button>
    </div>
  );
}
