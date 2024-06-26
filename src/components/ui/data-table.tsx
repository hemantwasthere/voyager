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
import { Roboto_Mono } from "next/font/google";
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

export const roboto = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  isTransactionFilters?: boolean;
  setIsFilterApplied?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  isTransactionFilters = false,
  setIsFilterApplied,
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
      {isTransactionFilters && (
        <div className="overflow-x-auto mb-6">
          <div className="w-fit h-[33px] flex border border-[#4B4B4B]">
            <Button
              onClick={() => {
                table.getColumn("type")?.setFilterValue(""),
                  isTransactionFilters && setIsFilterApplied!(false);
              }}
              className={cn(
                "rounded-none hover:bg-[#383838] text-sm h-full border-r border-[#4B4B4B]",
                {
                  "bg-[#4B4B4B] hover:bg-[#4B4B4B]": !table
                    .getColumn("type")
                    ?.getFilterValue(),
                }
              )}
            >
              All
            </Button>
            <Button
              onClick={() => {
                table.getColumn("type")?.setFilterValue("declare"),
                  isTransactionFilters && setIsFilterApplied!(true);
              }}
              className={cn(
                "rounded-none hover:bg-[#383838] text-sm h-full border-r border-[#4B4B4B]",
                {
                  "bg-[#4B4B4B] hover:bg-[#4B4B4B]":
                    table.getColumn("type")?.getFilterValue() === "declare",
                }
              )}
            >
              declare
            </Button>
            <Button
              onClick={() => {
                table.getColumn("type")?.setFilterValue("_deploy"),
                  isTransactionFilters && setIsFilterApplied!(true);
              }}
              className={cn(
                "rounded-none hover:bg-[#383838] text-sm h-full border-r border-[#4B4B4B]",
                {
                  "bg-[#4B4B4B] hover:bg-[#4B4B4B]":
                    table.getColumn("type")?.getFilterValue() === "_deploy",
                }
              )}
            >
              deploy
            </Button>
            <Button
              onClick={() => {
                table.getColumn("type")?.setFilterValue("deploy_account"),
                  isTransactionFilters && setIsFilterApplied!(true);
              }}
              className={cn(
                "rounded-none hover:bg-[#383838] text-sm h-full border-r border-[#4B4B4B]",
                {
                  "bg-[#4B4B4B] hover:bg-[#4B4B4B]":
                    table.getColumn("type")?.getFilterValue() ===
                    "deploy_account",
                }
              )}
            >
              deploy_account
            </Button>
            <Button
              onClick={() => {
                table.getColumn("type")?.setFilterValue("invoke"),
                  isTransactionFilters && setIsFilterApplied!(true);
              }}
              className={cn(
                "rounded-none hover:bg-[#383838] text-sm h-full border-r border-[#4B4B4B]",
                {
                  "bg-[#4B4B4B] hover:bg-[#4B4B4B]":
                    table.getColumn("type")?.getFilterValue() === "invoke",
                }
              )}
            >
              invoke
            </Button>
            <Button
              onClick={() => {
                table.getColumn("type")?.setFilterValue("l1_handler"),
                  isTransactionFilters && setIsFilterApplied!(true);
              }}
              className={cn("rounded-none hover:bg-[#383838] text-sm h-full", {
                "bg-[#4B4B4B] hover:bg-[#4B4B4B]":
                  table.getColumn("type")?.getFilterValue() === "l1_handler",
              })}
            >
              l1_handler
            </Button>
          </div>
        </div>
      )}

      <div
        className={cn(
          roboto.className,
          "border-y border-[#4B4B4B] rounded-none"
        )}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-[#4B4B4B] hover:bg-[#4B4B4B]"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-[0.75rem] text-[#AAAAAA] h-[38px]"
                    >
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
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-[#4B4B4B] hover:bg-[#4B4B4B]"
                  // ref={flatData.length === i + 1 ? lastElement : null}
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
