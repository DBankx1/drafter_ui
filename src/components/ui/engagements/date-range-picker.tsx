"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarDays, X } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const label = React.useMemo(() => {
    if (value?.from && value?.to) {
      return `${format(value.from, "d MMM")} – ${format(value.to, "d MMM yyyy")}`;
    }
    if (value?.from) {
      return `From ${format(value.from, "d MMM yyyy")}`;
    }
    return null;
  }, [value]);

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange(undefined);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-1.5 text-xs font-normal",
            label
              ? "border-primary/40 bg-primary/5 text-foreground"
              : "text-muted-foreground",
            className,
          )}
        >
          <CalendarDays className="size-3.5 shrink-0" />
          <span>{label ?? "Date range"}</span>
          {label && (
            <span
              role="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground ml-0.5 flex items-center"
              aria-label="Clear date range"
            >
              <X className="size-3" />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
