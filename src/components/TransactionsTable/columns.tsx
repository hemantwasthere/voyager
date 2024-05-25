import { ColumnDef } from "@tanstack/react-table";

import CopyIcon from "../Copy";
import { HashCellAction } from "./CellActions/HashCellAction";
import { StatusCellAction } from "./CellActions/StatusCellAction";
import { TypeCellAction } from "./CellActions/TypeCellAction";

export type TransactionColumn = {
  id: string;
  status: string;
  hash: string;
  type: string;
  block: number;
  version: string;
  createdAt: string;
};

export interface TransactionsCellActionProps {
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
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <p className="cursor-pointer text-sm text-[#8BA3DF] hover:text-[#BAD8FD]">
          {row.original.block}
        </p>
        <CopyIcon copyValue={row.original.block.toString()} />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "AGE",
    cell: ({ row }) => (
      <p className="text-sm text-white text-nowrap">{row.original.createdAt}</p>
    ),
  },
];
