"use client";

import type { ServiceConfig } from "@/lib/types/pricing";
import { X, Plus, Save } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Textarea } from "@/components/ui/textarea";

interface ServiceFormModalProps {
  service: ServiceConfig | null;
  onSave: (service: ServiceConfig) => void;
  onClose: () => void;
}

export default function ServiceFormModal({
  service,
  onSave,
  onClose,
}: Readonly<ServiceFormModalProps>) {
  const [formData, setFormData] = useState(
    service ||
      ({
        id: "",
        name: "",
        description: "",
        pricing_type: "fixed",
        base_price: 0,
        options: [],
      } as ServiceConfig),
  );

  const [newOption, setNewOption] = useState({ name: "", price: 0 });

  const handleSubmit = () => {
    if (formData.name && formData.base_price > 0) {
      onSave(formData);
    }
  };

  const addOption = () => {
    if (newOption.name && newOption.price > 0) {
      setFormData({
        ...formData,
        options: [...formData.options, newOption],
      });
      setNewOption({ name: "", price: 0 });
    }
  };

  const removeOption = (idx: number) => {
    setFormData({
      ...formData,
      options: formData.options.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {service ? "Edit Service" : "Add New Service"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Service Name *
              </Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Website Development"
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the service"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block text-sm font-medium text-gray-700">
                  Pricing Type *
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      pricing_type: value as ServiceConfig["pricing_type"],
                    })
                  }
                  value={formData.pricing_type}
                >
                  <SelectTrigger className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select pricing type" />
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

              <div>
                <Label className="mb-2 block text-sm font-medium text-gray-700">
                  Base Price ($) *
                </Label>
                <Input
                  type="number"
                  value={formData.base_price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      base_price: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Add-on Options
            </h3>

            <div className="mb-4 flex gap-2">
              <Input
                type="text"
                placeholder="Option name"
                value={newOption.name}
                onChange={(e) =>
                  setNewOption({ ...newOption, name: e.target.value })
                }
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
              <Input
                type="number"
                placeholder="Price"
                value={newOption.price || ""}
                onChange={(e) =>
                  setNewOption({
                    ...newOption,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-32 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
              <Button
                onClick={addOption}
                className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            {formData.options.length > 0 && (
              <div className="space-y-2">
                {formData.options.map((option, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2"
                  >
                    <span className="text-sm text-gray-700">{option.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-gray-900">
                        ${option.price.toLocaleString()}
                      </span>
                      <Button
                        onClick={() => removeOption(idx)}
                        className="bg-background hover:bg-background text-red-600 hover:cursor-pointer hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 border-t border-gray-200 pt-6">
            <Button
              onClick={onClose}
              className="bg-background flex-1 rounded-lg border border-gray-300 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-primary flex flex-1 items-center justify-center gap-2 rounded-lg font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              {service ? "Update Service" : "Add Service"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
