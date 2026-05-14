"use client";

import { useTransition } from "react";
import { Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { createWidgetAction, updateWidgetAction } from "@/lib/widget/actions";
import { BrandingCard } from "./branding-card";
import { BehaviourCard } from "./behaviour-card";
import { AdvancedCard } from "./advanced-card";
import { DangerZone } from "./danger-zone";
import { LivePreview } from "./live-preview";
import { useWidget } from "./context";

export function WidgetSettingsForm() {
  const { draft, savedWidget, isDirty, discard, setSavedWidget } = useWidget();
  const [isSaving, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      const action = savedWidget ? updateWidgetAction : createWidgetAction;
      const result = await action({ success: false }, draft);

      if (result.success && result.data) {
        setSavedWidget(result.data);
        toast.success(savedWidget ? "Widget updated" : "Widget created", {
          position: "top-center",
          closeButton: true,
        });
      } else {
        toast.error(result.error ?? "Failed to save widget", {
          position: "top-center",
          closeButton: true,
        });
      }
    });
  }

  return (
    <div>
      <div className="bg-background/95 sticky top-0 z-10 -mx-2 mb-6 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 backdrop-blur-sm md:-mx-4">
        <div>
          <h1 className="text-base font-semibold">Widget configuration</h1>
          <p className="text-muted-foreground text-xs">
            Customise your embedded AI chat widget
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isDirty && (
            <span className="hidden items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700 sm:flex dark:bg-amber-950 dark:text-amber-400">
              <span className="size-1.5 animate-pulse rounded-full bg-amber-500" />
              Unsaved changes
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={discard}
            disabled={!isDirty || isSaving}
          >
            <RotateCcw className="size-3.5" />
            Discard
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!isDirty || isSaving}
          >
            {isSaving ? (
              <>
                <Spinner />
                Saving...
              </>
            ) : (
              <>
                <Check className="size-3.5" />
                Save changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Two-column layout: form cards + live preview */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-4">
          <BrandingCard />
          <BehaviourCard />
          <AdvancedCard />
          <DangerZone />
        </div>
        <LivePreview />
      </div>
    </div>
  );
}
