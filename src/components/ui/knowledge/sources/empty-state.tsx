import { BookOpen, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  isFiltered?: boolean;
  onClearFilters?: () => void;
  onAddSource?: () => void;
}

export function EmptyState({
  isFiltered = false,
  onClearFilters,
  onAddSource,
}: Readonly<EmptyStateProps>) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
      {/* Icon container */}
      <div className="relative mb-6">
        <div className="border-border bg-muted/40 flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed">
          <BookOpen className="text-muted-foreground/60 h-7 w-7" />
        </div>
        {/* Decorative dots */}
        <span className="bg-muted border-border text-muted-foreground absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full border text-[8px] font-bold">
          0
        </span>
      </div>

      {isFiltered ? (
        <>
          <h3 className="text-foreground text-base font-semibold">
            No matching sources
          </h3>
          <p className="text-muted-foreground mt-1.5 max-w-xs text-sm leading-relaxed">
            No sources match your current search or filter. Try adjusting your
            query.
          </p>
          {onClearFilters && (
            <Button
              variant="outline"
              size="sm"
              className="mt-5"
              onClick={onClearFilters}
            >
              Clear filters
            </Button>
          )}
        </>
      ) : (
        <>
          <h3 className="text-foreground text-base font-semibold">
            No sources yet
          </h3>
          <p className="text-muted-foreground mt-1.5 max-w-xs text-sm leading-relaxed">
            Add PDFs, text files, or URLs to build your knowledge base and start
            answering questions.
          </p>
          {onAddSource && (
            <Button size="sm" className="mt-5 gap-2" onClick={onAddSource}>
              <Upload className="h-3.5 w-3.5" />
              Add your first source
            </Button>
          )}
        </>
      )}
    </div>
  );
}
