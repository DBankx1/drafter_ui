"use client";

import { Upload, Download, Plus, AlertCircle, Package } from "lucide-react";
import { useState } from "react";
import { ServiceCard } from "./service-card";
import ServiceFormModal from "./service-form-modal";
import type { ServiceConfig } from "@/lib/types/pricing";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PricingConfigProps {
  services: ServiceConfig[];
}

export default function PricingConfigPage({
  services,
}: Readonly<PricingConfigProps>) {
  const [pricingConfig, setPricingConfig] = useState({ services });
  const [editingService, setEditingService] = useState<ServiceConfig | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveService = (service: ServiceConfig) => {
    const isNew = !service.id;
    const updatedService = isNew
      ? { ...service, id: Date.now().toString() }
      : service;

    setPricingConfig((prev) => ({
      services: isNew
        ? [...prev.services, updatedService]
        : prev.services.map((s) =>
            s.id === updatedService.id ? updatedService : s,
          ),
    }));

    toast.success(
      isNew ? "Service added successfully" : "Service updated successfully",
    );
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = (id: string) => {
    setPricingConfig((prev) => ({
      services: prev.services.filter((s) => s.id !== id),
    }));
    toast.success("Service deleted successfully");
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(pricingConfig, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pricing-config.json";
    link.click();
    toast.success("Pricing configuration exported");
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const result = await file.text();
        const config = JSON.parse(result);
        setPricingConfig(config);
        toast.success("Pricing configuration imported successfully");
      } catch (error) {
        console.error("Failed to import configuration:", error);
        toast.error("Failed to import configuration");
      }
    }
  };

  return (
    <div>
      <div>
        <div className="mb-8">
          <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Pricing Configuration
              </h1>
              <p className="mt-1 text-gray-600">
                Manage your service pricing and options for your proposal
                generation
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <Upload className="h-4 w-4" />
                Import
                <Input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </Label>
              <Button
                onClick={handleExport}
                className="bg-secondary flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() => {
                  setEditingService(null);
                  setIsModalOpen(true);
                }}
                className="bg-primary flex items-center gap-2 rounded-lg font-medium text-white transition-colors hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Service
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <p className="text-sm text-blue-900">
                <strong>Agent Integration:</strong> These pricing configurations
                will be used by your agent assistant to generate accurate
                proposals based on customer requirements.
              </p>
            </div>
          </div>
        </div>

        {pricingConfig.services.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white py-16 text-center">
            <Package className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              No services yet
            </h3>
            <p className="mb-6 text-gray-600">
              Get started by adding your first service and pricing
            </p>
            <Button
              onClick={() => {
                setEditingService(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-lg font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              Add Your First Service
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricingConfig.services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onEdit={(s) => {
                  setEditingService(s);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteService}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <ServiceFormModal
          service={editingService}
          onSave={handleSaveService}
          onClose={() => {
            setIsModalOpen(false);
            setEditingService(null);
          }}
        />
      )}
    </div>
  );
}
