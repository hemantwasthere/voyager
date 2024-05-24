import { useQuery } from "@tanstack/react-query";

import { getAllBlockTransactions } from "@/hooks/getAllBlockTransaction";
import { timeElapsed } from "@/lib/utils";
import { DataTable } from "../ui/data-table";
import { TransactionColumn, columns } from "./columns";

interface ClientProps {
  latestBlockNumber: number;
  isPending: boolean;
}

const Client: React.FC<ClientProps> = ({ latestBlockNumber, isPending }) => {
  const { data } = useQuery({
    queryKey: ["all-block-transactions", latestBlockNumber],
    queryFn: async () => {
      if (!latestBlockNumber) return;
      return await getAllBlockTransactions(latestBlockNumber);
    },
  });

  if (!data) return null;

  const formattedTransactions: TransactionColumn[] =
    data?.data?.result?.transactions.map((item: any) => ({
      id: item.transaction_hash,
      status: data?.data?.result?.status,
      hash: item.transaction_hash,
      type: item.type,
      block: latestBlockNumber,
      createdAt: timeElapsed(data?.data?.result?.timestamp),
    }));

  return (
    <DataTable
      searchKey="hash"
      columns={columns}
      data={formattedTransactions}
    />
  );
};

export default Client;
