"use client";

import { memo, useState, useTransition } from "react";
import { Edit2, Trash2 } from "lucide-react";
import type { ServiceConfig, PricingType } from "@/lib/types/pricing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const PRICING_TYPE_CONFIG: Record<
  PricingType,
  { label: string; priceLabel: string; badgeClass: string }
> = {
  fixed: {
    label: "Fixed Price",
    priceLabel: "Starting from",
    badgeClass:
      "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-400 dark:border-violet-800",
  },
  hourly: {
    label: "Hourly Rate",
    priceLabel: "Per hour",
    badgeClass:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
  },
  tiered: {
    label: "Tiered Pricing",
    priceLabel: "Starting from",
    badgeClass:
      "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-800",
  },
};

interface ServiceCardProps {
  service: ServiceConfig;
  onEdit: (service: ServiceConfig) => void;
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
}

export const ServiceCard = memo(function ServiceCard({
  service,
  onEdit,
  onDelete,
}: ServiceCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isPending, startTransition] = useTransition();
  const config = PRICING_TYPE_CONFIG[service.pricing_type] ?? PRICING_TYPE_CONFIG.fixed;

  function handleConfirmDelete() {
    startTransition(async () => {
      const result = await onDelete(service.id);
      if (!result.success) {
        toast.error(result.error ?? "Failed to delete service", {
          position: "top-center",
          closeButton: true,
        });
      }
      setConfirmDelete(false);
    });
  }

  return (
    <>
      <div className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md">
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-3 p-5">
          <div className="min-w-0 flex-1">
            <span
              className={cn(
                "mb-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide",
                config.badgeClass,
              )}
            >
              {config.label}
            </span>
            <h3 className="truncate text-sm font-semibold leading-snug">
              {service.name}
            </h3>
            {service.description && (
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            )}
          </div>

          {/* Action buttons — always visible on mobile, hover-revealed on desktop */}
          <div className="flex shrink-0 gap-0.5 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              className="size-7 text-muted-foreground hover:text-foreground"
              onClick={() => onEdit(service)}
              aria-label="Edit service"
            >
              <Edit2 className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 text-muted-foreground hover:text-destructive"
              onClick={() => setConfirmDelete(true)}
              disabled={isPending}
              aria-label="Delete service"
            >
              {isPending ? (
                <Spinner className="size-3.5" />
              ) : (
                <Trash2 className="size-3.5" />
              )}
            </Button>
          </div>
        </div>

        {/* ── Base price ─────────────────────────────────────────────────────── */}
        <div className="border-t px-5 py-4">
          <p className="mb-0.5 text-[11px] text-muted-foreground">
            {config.priceLabel}
          </p>
          <p className="text-2xl font-bold tabular-nums tracking-tight">
            ${service.base_price.toLocaleString()}
            {service.pricing_type === "hourly" && (
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                /hr
              </span>
            )}
          </p>
        </div>

        {/* ── Add-ons ────────────────────────────────────────────────────────── */}
        {service.options.length > 0 && (
          <div className="flex-1 border-t bg-muted/20 px-5 py-4">
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Add-ons ({service.options.length})
            </p>
            <div className="space-y-1.5">
              {service.options.map((option, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="truncate text-xs text-muted-foreground">
                    {option.name}
                  </span>
                  <span className="shrink-0 text-xs font-semibold tabular-nums">
                    +${option.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete service?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong className="text-foreground">
                &ldquo;{service.name}&rdquo;
              </strong>{" "}
              will be permanently removed from your pricing configuration. Any
              proposals referencing this service may be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner className="size-3.5" /> Deleting…
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});
