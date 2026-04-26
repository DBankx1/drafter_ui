"use client";

import { Edit2, Trash2, DollarSign, Tag } from "lucide-react";
import type { ServiceConfig } from "@/lib/types/pricing";
import { PRICING_TYPE_LABELS } from "@/lib/types/pricing";
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
import { useState } from "react";

interface ServiceCardProps {
  service: ServiceConfig;
  onEdit: (service: ServiceConfig) => void;
  onDelete: (serviceId: string) => void;
}

export function ServiceCard({
  service,
  onEdit,
  onDelete,
}: Readonly<ServiceCardProps>) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              {service.name}
            </h3>
            {service.description && (
              <p className="text-sm text-gray-600">{service.description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(service)}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
              aria-label="Edit service"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Delete service"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span className="text-2xl font-bold text-gray-900">
              ${service.base_price.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
            <Tag className="h-3 w-3 text-gray-600" />
            <span className="text-xs font-medium text-gray-700">
              {PRICING_TYPE_LABELS[service.pricing_type]}
            </span>
          </div>
        </div>

        {service.options.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <p className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">
              Add-ons
            </p>
            <div className="space-y-2">
              {service.options.map((option, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-700">{option.name}</span>
                  <span className="font-semibold text-gray-900">
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
            <AlertDialogTitle>Delete Configuration?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong className="text-foreground">
                &ldquo;{service.name}&rdquo;
              </strong>{" "}
              will be permanently removed from your knowledge base. This cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                onDelete(service.id);
                setConfirmDelete(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
