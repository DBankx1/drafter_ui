"use client";

import { useCallback, useState } from "react";
import { DollarSign, Download, Package, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "./service-card";
import ServiceFormDialog from "./service-form-modal";
import type { ServiceConfig } from "@/lib/types/pricing";
import { toast } from "sonner";
import {
  CreateServiceConfigAction,
  DeleteServiceConfigAction,
  UpdateServiceConfigAction,
} from "@/lib/pricing/action";

interface PricingConfigProps {
  services: ServiceConfig[];
}

export default function PricingConfigPage({
  services,
}: Readonly<PricingConfigProps>) {
  const [serviceList, setServiceList] = useState(services);
  const [editingService, setEditingService] = useState<ServiceConfig | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleSave = useCallback(
    async (service: ServiceConfig): Promise<{ success: boolean; error?: string }> => {
      const isNew = !service.id;

      if (isNew) {
        const result = await CreateServiceConfigAction({ success: false }, service);
        if (result.success && result.data) {
          setServiceList((prev) => [...prev, result.data!]);
          toast.success("Service added", {
            position: "top-center",
            closeButton: true,
          });
          setIsDialogOpen(false);
          setEditingService(null);
          return { success: true };
        }
        return { success: false, error: result.error ?? "Failed to add service" };
      }

      const result = await UpdateServiceConfigAction(
        { success: false },
        service.id,
        service,
      );
      if (result.success) {
        setServiceList((prev) =>
          prev.map((s) => (s.id === service.id ? (result.data ?? service) : s)),
        );
        toast.success("Service updated", {
          position: "top-center",
          closeButton: true,
        });
        setIsDialogOpen(false);
        setEditingService(null);
        return { success: true };
      }
      return { success: false, error: result.error ?? "Failed to update service" };
    },
    [],
  );

  const handleDelete = useCallback(
    async (id: string): Promise<{ success: boolean; error?: string }> => {
      const result = await DeleteServiceConfigAction({ success: false }, id);
      if (result.success) {
        setServiceList((prev) => prev.filter((s) => s.id !== id));
        toast.success("Service deleted", {
          position: "top-center",
          closeButton: true,
        });
        return { success: true };
      }
      return { success: false, error: result.error ?? "Failed to delete service" };
    },
    [],
  );

  function handleExport() {
    const json = JSON.stringify({ services: serviceList }, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pricing-config.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Configuration exported", {
      position: "top-center",
      closeButton: true,
    });
  }

  function openAdd() {
    setEditingService(null);
    setIsDialogOpen(true);
  }

  function openEdit(service: ServiceConfig) {
    setEditingService(service);
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setEditingService(null);
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Page header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-card shadow-sm">
            <DollarSign className="size-5 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">
              Pricing Configuration
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Manage your service pricing for accurate proposal generation
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {serviceList.length > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium shadow-xs">
              {serviceList.length}{" "}
              {serviceList.length === 1 ? "service" : "services"}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={serviceList.length === 0}
          >
            <Download className="size-3.5" />
            Export
          </Button>
          <Button size="sm" onClick={openAdd}>
            <Plus className="size-3.5" />
            Add service
          </Button>
        </div>
      </div>

      {/* AI integration callout */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3.5 dark:border-sky-800 dark:bg-sky-950/30">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-sky-600 dark:text-sky-400" />
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-300">
          <strong className="font-semibold">AI Integration —</strong> These
          services are referenced by Drafter when generating proposals, enabling
          accurate, itemised pricing in every quote.
        </p>
      </div>

      {/* Service grid / empty state */}
      {serviceList.length === 0 ? (
        <EmptyState onAdd={openAdd} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {serviceList.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <ServiceFormDialog
        open={isDialogOpen}
        service={editingService}
        onSave={handleSave}
        onClose={closeDialog}
      />
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
      <div className="relative mb-5">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-dashed bg-muted/40">
          <Package className="size-7 text-muted-foreground/60" />
        </div>
        <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border bg-muted text-[9px] font-bold text-muted-foreground">
          0
        </span>
      </div>
      <h3 className="text-base font-semibold">No services yet</h3>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground">
        Add your first service to start generating accurate, itemised proposals
        for your clients.
      </p>
      <Button size="sm" className="mt-5" onClick={onAdd}>
        <Plus className="size-3.5" />
        Add your first service
      </Button>
    </div>
  );
}
