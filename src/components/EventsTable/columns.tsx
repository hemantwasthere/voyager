import { ColumnDef } from "@tanstack/react-table";

import BlockCellAction from "./Cells/BlockCell";
import IdCellAction from "./Cells/IdCell";

export type EventsColumn = {
  id: string;
  block: number;
  createdAt: string;
};

export interface EventsCellActionProps {
  data: EventsColumn;
}

export const columns: ColumnDef<EventsColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <IdCellAction data={row.original} />,
  },
  {
    id: "block",
    accessorKey: "block",
    header: "Block",
    cell: ({ row }) => <BlockCellAction data={row.original} />,
  },
  {
    accessorKey: "createdAt",
    header: "AGE",
    cell: ({ row }) => (
      <p className="text-sm text-white text-nowrap">{row.original.createdAt}</p>
    ),
  },
];
