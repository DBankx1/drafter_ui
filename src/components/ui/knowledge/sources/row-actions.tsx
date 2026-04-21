"use client";

import { memo, useState } from "react";
import { Download, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  KnowledgeBaseType,
  type KnowledgeBase,
  type KnowledgeBaseActions,
} from "@/types/knowledge-base";

interface Props {
  item: KnowledgeBase;
  actions: KnowledgeBaseActions;
}

export const KnowledgeBaseRowActions = memo(function KnowledgeBaseRowActions({
  item,
  actions,
}: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      {/* ── Desktop: inline action buttons ─────────────────────────────────── */}
      <div className="hidden items-center justify-end gap-1.5 sm:flex">
        {actions.onView && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 cursor-pointer gap-1.5 text-xs font-medium"
            onClick={() => actions.onView!(item)}
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
        )}
        {actions.onDownload && item.source_type === KnowledgeBaseType.PDF && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 cursor-pointer gap-1.5 text-xs font-medium"
            onClick={() => actions.onDownload!(item)}
          >
            <Download className="h-3 w-3" />
            Download
          </Button>
        )}
        {actions.onDelete && (
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 hover:border-destructive/40 h-7 cursor-pointer gap-1.5 text-xs font-medium"
            onClick={() => setConfirmDelete(true)}
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </Button>
        )}
      </div>

      {/* ── Mobile: dropdown menu ───────────────────────────────────────────── */}
      <div className="flex sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {actions.onView && (
              <DropdownMenuItem onClick={() => actions.onView!(item)}>
                <Eye className="mr-2 h-3.5 w-3.5" />
                View
              </DropdownMenuItem>
            )}
            {actions.onDownload &&
              item.source_type === KnowledgeBaseType.PDF && (
                <DropdownMenuItem onClick={() => actions.onDownload!(item)}>
                  <Download className="mr-2 h-3.5 w-3.5" />
                  Download
                </DropdownMenuItem>
              )}
            {(actions.onView || actions.onDownload) && actions.onDelete && (
              <DropdownMenuSeparator />
            )}
            {actions.onDelete && (
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ── Delete confirmation dialog ──────────────────────────────────────── */}
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete source?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong className="text-foreground">
                &ldquo;{item.name}&rdquo;
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
                actions.onDelete!(item);
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
});
