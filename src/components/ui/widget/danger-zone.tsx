"use client";

import { useTransition } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { deleteWidgetAction } from "@/lib/widget/actions";
import { useWidget } from "./context";

export function DangerZone() {
  const { savedWidget, setSavedWidget } = useWidget();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteWidgetAction({ success: false });
      if (result.success) {
        setSavedWidget(null);
        toast.success("Widget deleted successfully", {
          position: "top-center",
          closeButton: true,
        });
      } else {
        toast.error(result.error ?? "Failed to delete widget", {
          position: "top-center",
          closeButton: true,
        });
      }
    });
  }

  if (!savedWidget) return null;

  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-destructive/25 bg-destructive/5 p-5 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-destructive" />
          <p className="text-sm font-medium">Danger zone</p>
        </div>
        <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground">
          Permanently delete this widget configuration. This cannot be undone
          and will remove the widget from all pages it&apos;s embedded on.
        </p>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" disabled={isPending}>
            {isPending ? (
              <Spinner className="mr-1.5 size-3.5" />
            ) : (
              <Trash2 className="mr-1.5 size-3.5" />
            )}
            Delete widget
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete widget settings?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your widget configuration. The chat
              widget will stop appearing on your website immediately. You can
              always create a new one.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              Yes, delete widget
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
