import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { getAllBlockTransactions } from "@/hooks/getAllBlockTransaction";
import { timeSince } from "@/lib/utils";
import { useTransactionStore } from "@/store/TransactionStore";
import LoadingSkeleton from "../LoadingSkeleton";
import { DataTable } from "../ui/data-table";
import { TransactionColumn, columns } from "./columns";

interface ClientProps {
  latestBlockNumber: number;
}

const Client: React.FC<ClientProps> = ({ latestBlockNumber = 123434 }) => {
  const [setTimestamp] = useTransactionStore((state) => [state.setTimestamp]);

  const { ref, inView } = useInView();

  const { data, isPending, isError, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["get-all-block-transactions"],
      queryFn: ({ pageParam }) =>
        getAllBlockTransactions(latestBlockNumber, pageParam as number),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    if (data) {
      setTimestamp(data?.pages[0].timestamp);
    }
    // setTimestamp("1637091683");
  }, [fetchNextPage, inView, data]);

  if (isPending) return <LoadingSkeleton />;

  if (isError) return <div>Something went wrong</div>;

  const demo_data = {
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
        timestamp: "1637069048",
      },
    },
  };

  // const formattedTransactions: TransactionColumn[] =
  //   demo_data?.data?.result?.transactions.map((item: any) => ({
  //     id: item.transaction_hash as string,
  //     status: demo_data?.data?.result?.status,
  //     hash: item.transaction_hash as string,
  //     type: item.type as string,
  //     block: latestBlockNumber,
  //     version: item.version as string,
  //     createdAt: timeSince(demo_data?.data?.result?.timestamp),
  //   }));

  const pageTransactions = data?.pages.map((page) => {
    const formattedTransactions: TransactionColumn[] = page.transactions.map(
      (item) => ({
        id: item.transaction_hash as string,
        status: page.status,
        hash: item.transaction_hash as string,
        type: item.type as string,
        block: latestBlockNumber,
        version: item.version as string,
        createdAt: timeSince(page.timestamp),
      })
    );

    return formattedTransactions;
  });

  return (
    <>
      <DataTable
        isTransactionFilters
        searchKey="hash"
        columns={columns}
        data={
          pageTransactions?.reduce(
            (acc, curr) => [...acc, ...curr],
            [] as TransactionColumn[]
          ) ?? []
        }
        // data={formattedTransactions}
      />
      <div ref={ref}>
        {isFetchingNextPage && "Fetching more transactions..."}
      </div>
    </>
  );
};

export default Client;
