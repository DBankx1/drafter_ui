"use client";

import { useEffect, useState, useTransition } from "react";
import { Plus, X, Save } from "lucide-react";
import type { ServiceConfig } from "@/lib/types/pricing";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Spinner } from "@/components/ui/spinner";

const EMPTY_FORM: ServiceConfig = {
  id: "",
  name: "",
  description: "",
  pricing_type: "fixed",
  base_price: 0,
  options: [],
};

interface ServiceFormDialogProps {
  open: boolean;
  service: ServiceConfig | null;
  onSave: (service: ServiceConfig) => Promise<{ success: boolean; error?: string }>;
  onClose: () => void;
}

export default function ServiceFormDialog({
  open,
  service,
  onSave,
  onClose,
}: Readonly<ServiceFormDialogProps>) {
  const [formData, setFormData] = useState<ServiceConfig>(service ?? EMPTY_FORM);
  const [newOption, setNewOption] = useState({ name: "", price: 0 });
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Reset form whenever the dialog opens or the target service changes
  useEffect(() => {
    if (open) {
      setFormData(service ?? { ...EMPTY_FORM });
      setFormError(null);
      setNewOption({ name: "", price: 0 });
    }
  }, [open, service]);

  function handleSubmit() {
    if (!formData.name.trim()) {
      setFormError("Service name is required.");
      return;
    }
    if (formData.base_price <= 0) {
      setFormError("Base price must be greater than zero.");
      return;
    }
    setFormError(null);

    startTransition(async () => {
      const result = await onSave(formData);
      if (!result.success) {
        setFormError(result.error ?? "Failed to save. Please try again.");
      }
      // Parent calls onClose() on success after updating state
    });
  }

  function addOption() {
    if (!newOption.name.trim() || newOption.price <= 0) return;
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { ...newOption }],
    }));
    setNewOption({ name: "", price: 0 });
  }

  function removeOption(idx: number) {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== idx),
    }));
  }

  function handleOpenChange(o: boolean) {
    if (!o && !isPending) onClose();
  }

  const isEdit = Boolean(service?.id);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit service" : "Add new service"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the pricing and details for this service."
              : "Add a service to your pricing configuration for accurate proposal generation."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Service name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="svc-name">
              Service name{" "}
              <span className="text-destructive" aria-hidden>
                *
              </span>
            </Label>
            <Input
              id="svc-name"
              placeholder="e.g. Website Development"
              value={formData.name}
              disabled={isPending}
              onChange={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="svc-desc">
              Description{" "}
              <span className="text-xs font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Textarea
              id="svc-desc"
              placeholder="Brief description of this service…"
              value={formData.description ?? ""}
              disabled={isPending}
              onChange={(e) =>
                setFormData((p) => ({ ...p, description: e.target.value }))
              }
              rows={2}
              className="resize-none"
            />
          </div>

          {/* Pricing type + base price */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="svc-type">
                Pricing type{" "}
                <span className="text-destructive" aria-hidden>
                  *
                </span>
              </Label>
              <Select
                value={formData.pricing_type}
                disabled={isPending}
                onValueChange={(v) =>
                  setFormData((p) => ({
                    ...p,
                    pricing_type: v as ServiceConfig["pricing_type"],
                  }))
                }
              >
                <SelectTrigger id="svc-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                    <SelectItem value="tiered">Tiered Pricing</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="svc-price">
                Base price ($){" "}
                <span className="text-destructive" aria-hidden>
                  *
                </span>
              </Label>
              <Input
                id="svc-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.base_price || ""}
                disabled={isPending}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    base_price: parseFloat(e.target.value) || 0,
                  }))
                }
              />
            </div>
          </div>

          {/* Add-ons */}
          <div className="flex flex-col gap-3 border-t pt-4">
            <div>
              <p className="text-sm font-medium">Add-on options</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Optional line items the AI can include in proposals.
              </p>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Option name"
                value={newOption.name}
                disabled={isPending}
                onChange={(e) =>
                  setNewOption((p) => ({ ...p, name: e.target.value }))
                }
                onKeyDown={(e) => e.key === "Enter" && addOption()}
                className="flex-1"
              />
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  placeholder="0"
                  min="0"
                  step="0.01"
                  value={newOption.price || ""}
                  disabled={isPending}
                  onChange={(e) =>
                    setNewOption((p) => ({
                      ...p,
                      price: parseFloat(e.target.value) || 0,
                    }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && addOption()}
                  className="w-24 pl-6"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={
                  !newOption.name.trim() || newOption.price <= 0 || isPending
                }
                onClick={addOption}
                className="shrink-0"
              >
                <Plus className="size-4" />
              </Button>
            </div>

            {formData.options.length > 0 && (
              <div className="space-y-1.5 rounded-lg border bg-muted/20 p-2">
                {formData.options.map((option, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-md bg-background px-3 py-2 shadow-xs"
                  >
                    <span className="text-sm">{option.name}</span>
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-semibold tabular-nums">
                        +${option.price.toLocaleString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        disabled={isPending}
                        onClick={() => removeOption(idx)}
                        className="size-6 text-muted-foreground hover:text-destructive"
                      >
                        <X className="size-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inline form error */}
          {formError && (
            <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">
              {formError}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => !isPending && onClose()}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? (
              <>
                <Spinner />
                Saving…
              </>
            ) : (
              <>
                <Save className="size-4" />
                {isEdit ? "Update service" : "Add service"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
