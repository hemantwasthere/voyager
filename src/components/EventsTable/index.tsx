import { DataTable } from "../ui/data-table";
import { EventsColumn, columns } from "./columns";

interface EventsTableProps {
  data: any;
}

const EventsTable: React.FC<EventsTableProps> = ({ data }) => {
  return <DataTable searchKey="id" columns={columns} data={data} />;
};

export default EventsTable;
