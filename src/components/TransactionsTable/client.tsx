import { useQuery } from "@tanstack/react-query";

import { getAllBlockTransactions } from "@/hooks/getAllBlockTransaction";
import { timeElapsed } from "@/lib/utils";
import LoadingSkeleton from "../LoadingSkeleton";
import { DataTable } from "../ui/data-table";
import { TransactionColumn, columns } from "./columns";

interface ClientProps {
  latestBlockNumber: number;
}

const Client: React.FC<ClientProps> = ({ latestBlockNumber = "121212" }) => {
  // const { data, isPending, isError } = useQuery({
  //   queryKey: ["all-block-transactions", latestBlockNumber],
  //   queryFn: async () => {
  //     if (!latestBlockNumber) return;
  //     return await getAllBlockTransactions(latestBlockNumber);
  //   },
  // });

  // if (isPending) return <LoadingSkeleton />;

  // if (isError) return <div>Something went wrong</div>;

  // if (!data) return null;

  const data = {
    data: {
      result: {
        status: "ACCEPTED_ON_L2",
        transactions: [
          {
            id: "1",
            status: "ACCEPTED_ON_L2",
            transaction_hash: "0x123456789",
            type: "INVOKE",
            block: "123456789",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "2",
            status: "ACCEPTED_ON_L2",
            transaction_hash: "0x123456789",
            type: "DECLARE",
            block: "123456789",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "3",
            status: "ACCEPTED_ON_L2",
            transaction_hash: "0x123456789",
            type: "DEPLOY",
            block: "123456789",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "3",
            status: "ACCEPTED_ON_L2",
            transaction_hash: "0x123456789",
            type: "DEPLOY_ACCOUNT",
            block: "123456789",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "4",
            status: "REVERTED",
            transaction_hash: "0x123456789",
            type: "INVOKE",
            block: "123456789",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "5",
            status: "ACCEPTED_ON_L2",
            transaction_hash: "0x123456789",
            type: "L1_HANDLER",
            block: "123456789",
            version: "0x1",
            createdAt: "1716556803",
          },
        ],
        timestamp: "1716570873",
      },
    },
  };

  const formattedTransactions: TransactionColumn[] =
    data?.data?.result?.transactions.map((item: any) => ({
      id: item.transaction_hash as string,
      status: data?.data?.result?.status,
      hash: item.transaction_hash as string,
      type: item.type as string,
      block: latestBlockNumber as string,
      version: item.version as string,
      // createdAt: timeElapsed(data?.data?.result?.timestamp),
      createdAt: "2 hours ago",
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
