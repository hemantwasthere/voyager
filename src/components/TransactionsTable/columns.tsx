import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";
import CopyIcon from "../Copy";
import { HashCell } from "./Cells/HashCell";
import { StatusCell } from "./Cells/StatusCell";
import { TypeCell } from "./Cells/TypeCell";

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
    cell: ({ row }) => <StatusCell data={row.original} />,
  },
  {
    id: "hash",
    accessorKey: "hash",
    header: "HASH",
    cell: ({ row }) => <HashCell data={row.original} />,
  },
  {
    accessorKey: "type",
    header: "TYPE",
    cell: ({ row }) => <TypeCell data={row.original} />,
  },
  {
    accessorKey: "block",
    header: "BLOCK",
    cell: ({ row }) => (
      <Link
        href={`https://voyager.online/block/${row.original.block.toString()}`}
        className="flex items-center gap-2"
      >
        <p className="cursor-pointer text-sm text-[#8BA3DF] hover:text-[#BAD8FD]">
          {row.original.block}
        </p>
        <CopyIcon copyValue={row.original.block.toString()} />
      </Link>
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
