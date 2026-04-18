"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  sorting: SortingState;
  onSortingChange: (
    updater: SortingState | ((prev: SortingState) => SortingState),
  ) => void;
  columnFilters: ColumnFiltersState;
  onColumnFiltersChange: (
    updater:
      | ColumnFiltersState
      | ((prev: ColumnFiltersState) => ColumnFiltersState),
  ) => void;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  emptyState?: ReactNode;
}

export function DataTable<TData>({
  columns,
  data,
  sorting,
  onSortingChange,
  columnFilters,
  onColumnFiltersChange,
  globalFilter,
  onGlobalFilterChange,
  emptyState,
}: Readonly<DataTableProps<TData>>) {
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange,
    onColumnFiltersChange,
    onGlobalFilterChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="border-border dark:bg-background overflow-hidden border bg-white">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="bg-muted/30 hover:bg-muted/30">
              {hg.headers.map((header) => {
                const metaClass = (
                  header.column.columnDef.meta as { className?: string }
                )?.className;
                return (
                  <TableHead
                    key={header.id}
                    className={cn("h-10 px-4 first:pl-5 last:pr-5", metaClass)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                className="group hover:bg-muted/30 border-border/60 transition-colors duration-100"
              >
                {row.getVisibleCells().map((cell) => {
                  const metaClass = (
                    cell.column.columnDef.meta as { className?: string }
                  )?.className;
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "px-4 py-3.5 align-middle first:pl-5 last:pr-5",
                        metaClass,
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="p-0">
                {emptyState}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
