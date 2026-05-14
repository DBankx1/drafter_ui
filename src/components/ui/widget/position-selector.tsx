"use client";

import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { WidgetPosition } from "@/lib/types/widget";

const POSITIONS: {
  value: WidgetPosition;
  label: string;
  Icon: React.ElementType;
}[] = [
  { value: "top_left", label: "Top left", Icon: ArrowUpLeft },
  { value: "top_right", label: "Top right", Icon: ArrowUpRight },
  { value: "bottom_left", label: "Bottom left", Icon: ArrowDownLeft },
  { value: "bottom_right", label: "Bottom right", Icon: ArrowDownRight },
];

interface PositionSelectorProps {
  value: WidgetPosition;
  onChange: (position: WidgetPosition) => void;
}

export function PositionSelector({ value, onChange }: PositionSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {POSITIONS.map(({ value: pos, label, Icon }) => (
        <button
          key={pos}
          type="button"
          onClick={() => onChange(pos)}
          className={cn(
            "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
            value === pos
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground hover:border-ring hover:bg-accent hover:text-foreground",
          )}
        >
          <Icon className="size-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
