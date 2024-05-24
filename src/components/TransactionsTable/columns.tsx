import { ColumnDef } from "@tanstack/react-table";

import { HashCellAction } from "./CellActions/HashCellAction";
import { StatusCellAction } from "./CellActions/StatusCellAction";
import { TypeCellAction } from "./CellActions/TypeCellAction";

export type TransactionColumn = {
  id: string;
  status: string;
  hash: string;
  type: string;
  block: string;
  version: string;
  createdAt: string;
};

export interface CellActionProps {
  data: TransactionColumn;
}

export const columns: ColumnDef<TransactionColumn>[] = [
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => <StatusCellAction data={row.original} />,
  },
  {
    id: "hash",
    accessorKey: "hash",
    header: "HASH",
    cell: ({ row }) => <HashCellAction data={row.original} />,
  },
  {
    accessorKey: "type",
    header: "TYPE",
    cell: ({ row }) => <TypeCellAction data={row.original} />,
  },
  {
    accessorKey: "block",
    header: "BLOCK",
  },
  {
    accessorKey: "createdAt",
    header: "AGE",
  },
];
