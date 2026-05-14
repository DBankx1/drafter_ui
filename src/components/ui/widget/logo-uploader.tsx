"use client";

import { useState } from "react";
import { CloudUpload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface LogoUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export function LogoUploader({ value, onChange }: LogoUploaderProps) {
  const [urlInput, setUrlInput] = useState(value || "");
  const [isDragOver, setIsDragOver] = useState(false);

  function applyUrl() {
    onChange(urlInput.trim());
  }

  function readFileAsDataUrl(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
      setUrlInput(result);
    };
    reader.readAsDataURL(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) readFileAsDataUrl(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) readFileAsDataUrl(file);
  }

  return (
    <div className="flex flex-col gap-3">
      {value && (
        <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-2.5">
          <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Widget logo"
              className="size-full object-contain p-1"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Logo set</p>
            <p className="text-xs text-muted-foreground truncate">
              {value.startsWith("data:") ? "Uploaded file" : value}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => {
              onChange("");
              setUrlInput("");
            }}
            className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
          >
            <X className="size-3.5" />
          </Button>
        </div>
      )}

      <Tabs defaultValue="url">
        <TabsList className="w-full">
          <TabsTrigger value="url" className="flex-1">
            Paste URL
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex-1">
            Upload file
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="mt-2">
          <div className="flex gap-2">
            <Input
              placeholder="https://your-domain.com/logo.png"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyUrl()}
            />
            <Button type="button" variant="outline" onClick={applyUrl}>
              Apply
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="mt-2">
          <label
            className={cn(
              "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-5 text-center transition-colors",
              isDragOver
                ? "border-ring bg-accent/40"
                : "border-border hover:border-ring hover:bg-accent/20",
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            <CloudUpload className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drop image here or{" "}
              <span className="font-medium text-foreground">click to browse</span>
            </p>
            <p className="text-xs text-muted-foreground/70">
              PNG, JPG, SVG — up to 2 MB
            </p>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
        </TabsContent>
      </Tabs>
    </div>
  );
}
