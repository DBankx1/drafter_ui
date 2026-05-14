"use client";

import { cn } from "@/lib/utils";

const COLOR_PRESETS = [
  "#1A1A2E",
  "#16213E",
  "#0F3460",
  "#533483",
  "#E94560",
  "#FF6B47",
  "#F5A623",
  "#2ECC71",
  "#1ABC9C",
  "#3498DB",
  "#9B59B6",
  "#E74C3C",
  "#2C3E50",
  "#F39C12",
  "#27AE60",
  "#8E44AD",
];

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const hexWithoutHash = value.replace("#", "").toUpperCase();

  function handleHexInput(raw: string) {
    const cleaned = raw.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
    if (cleaned.length === 6) onChange(`#${cleaned}`);
  }

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>

      <div className="flex items-center gap-2">
        <div
          className="relative size-10 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 border-background shadow ring-1 ring-border transition-transform hover:scale-105"
          style={{ background: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer border-0 opacity-0"
          />
        </div>
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">
            #
          </span>
          <input
            type="text"
            value={hexWithoutHash}
            maxLength={6}
            onChange={(e) => handleHexInput(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-transparent pl-7 pr-3 font-mono text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30"
          />
        </div>
      </div>

      <div className="grid grid-cols-8 gap-1">
        {COLOR_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            title={preset}
            onClick={() => onChange(preset)}
            style={{ background: preset }}
            className={cn(
              "aspect-square w-full rounded-md border-2 border-transparent transition-transform hover:scale-110",
              value.toUpperCase() === preset.toUpperCase() &&
                "scale-110 border-foreground",
            )}
          />
        ))}
      </div>
    </div>
  );
}
