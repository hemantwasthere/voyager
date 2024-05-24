"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  });

  return (
    <div>
      <div className="w-full mb-4 flex flex-wrap gap-3">
        <Button
          onClick={() => table.getColumn("type")?.setFilterValue("")}
          className={cn({
            "bg-stone-400": !table.getColumn("type")?.getFilterValue(),
          })}
        >
          all
        </Button>
        <Button
          onClick={() => table.getColumn("type")?.setFilterValue("declare")}
          className={cn({
            "bg-stone-400":
              table.getColumn("type")?.getFilterValue() === "declare",
          })}
        >
          declare
        </Button>
        <Button
          onClick={() => table.getColumn("type")?.setFilterValue("deploy")}
          className={cn({
            "bg-stone-400":
              table.getColumn("type")?.getFilterValue() === "deploy",
          })}
        >
          deploy
        </Button>
        <Button
          onClick={() =>
            table.getColumn("type")?.setFilterValue("deploy_account")
          }
          className={cn({
            "bg-stone-400":
              table.getColumn("type")?.getFilterValue() === "deploy_account",
          })}
        >
          deploy_account
        </Button>
        <Button
          onClick={() => table.getColumn("type")?.setFilterValue("invoke")}
          className={cn({
            "bg-stone-400":
              table.getColumn("type")?.getFilterValue() === "invoke",
          })}
        >
          invoke
        </Button>
        <Button
          onClick={() => table.getColumn("type")?.setFilterValue("l1_handler")}
          className={cn({
            "bg-stone-400":
              table.getColumn("type")?.getFilterValue() === "l1_handler",
          })}
        >
          l1_handler
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
}
