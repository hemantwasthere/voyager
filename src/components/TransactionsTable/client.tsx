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

const Client: React.FC<ClientProps> = ({ latestBlockNumber }) => {
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
    // if (data) {
    //   setTimestamp(data?.pages[0].timestamp);
    // }
    setTimestamp("1637091683");
  }, [fetchNextPage, inView, data]);

  // if (isPending) return <LoadingSkeleton />;

  // if (isError) return <div>Something went wrong</div>;

  const demo_data = {
    data: {
      result: {
        status: "ACCEPTED_ON_L2",
        transactions: [
          {
            id: "1",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x697f855111c4b8c6ccb628e0e9e07023ef0fdbfcd30b74350ec1de94a52ec52",
            type: "INVOKE",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "2",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x7e147692abbea30028dcf9cb793b5579a55eeffc8af814f697b4918707421d7",
            type: "DECLARE",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "3",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x3ea11b0a174f55679f690eeb8393846724a349467d9331f2f4422914b38b297",
            type: "DEPLOY",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "4",
            status: "REVERTED",
            transaction_hash:
              "0x5ebc9b8a0f4a875f39fc8115aaff31e17f5cdd5b2c35c6ba1d3f7a3bc0fa486",
            type: "INVOKE",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "5",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x445a5528ca4ef3d395be5745f6ee0735d3f6654f3c1506dadeef196b9b82072",
            type: "L1_HANDLER",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },

          {
            id: "6",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x697f855111c4b8c6ccb628e0e9e07023ef0fdbfcd30b74350ec1de94a52ec52",
            type: "INVOKE",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "7",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x7e147692abbea30028dcf9cb793b5579a55eeffc8af814f697b4918707421d7",
            type: "DECLARE",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "8",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x3ea11b0a174f55679f690eeb8393846724a349467d9331f2f4422914b38b297",
            type: "DEPLOY",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "9",
            status: "REVERTED",
            transaction_hash:
              "0x5ebc9b8a0f4a875f39fc8115aaff31e17f5cdd5b2c35c6ba1d3f7a3bc0fa486",
            type: "INVOKE",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "10",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x445a5528ca4ef3d395be5745f6ee0735d3f6654f3c1506dadeef196b9b82072",
            type: "L1_HANDLER",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },

          {
            id: "11",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x697f855111c4b8c6ccb628e0e9e07023ef0fdbfcd30b74350ec1de94a52ec52",
            type: "INVOKE",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "12",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x7e147692abbea30028dcf9cb793b5579a55eeffc8af814f697b4918707421d7",
            type: "DECLARE",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "13",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x3ea11b0a174f55679f690eeb8393846724a349467d9331f2f4422914b38b297",
            type: "DEPLOY",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "14",
            status: "REVERTED",
            transaction_hash:
              "0x5ebc9b8a0f4a875f39fc8115aaff31e17f5cdd5b2c35c6ba1d3f7a3bc0fa486",
            type: "INVOKE",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "15",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x445a5528ca4ef3d395be5745f6ee0735d3f6654f3c1506dadeef196b9b82072",
            type: "L1_HANDLER",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },

          {
            id: "16",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x697f855111c4b8c6ccb628e0e9e07023ef0fdbfcd30b74350ec1de94a52ec52",
            type: "INVOKE",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "17",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x7e147692abbea30028dcf9cb793b5579a55eeffc8af814f697b4918707421d7",
            type: "DECLARE",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "18",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x3ea11b0a174f55679f690eeb8393846724a349467d9331f2f4422914b38b297",
            type: "DEPLOY",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "19",
            status: "REVERTED",
            transaction_hash:
              "0x5ebc9b8a0f4a875f39fc8115aaff31e17f5cdd5b2c35c6ba1d3f7a3bc0fa486",
            type: "INVOKE",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
          {
            id: "20",
            status: "ACCEPTED_ON_L2",
            transaction_hash:
              "0x445a5528ca4ef3d395be5745f6ee0735d3f6654f3c1506dadeef196b9b82072",
            type: "L1_HANDLER",
            block: "622371",
            version: "0x1",
            createdAt: "1716556803",
          },
        ],
        timestamp: "1637069048",
      },
    },
  };

  const formattedTransactions: TransactionColumn[] =
    demo_data?.data?.result?.transactions.map((item: any) => ({
      id: item.transaction_hash as string,
      status: demo_data?.data?.result?.status,
      hash: item.transaction_hash as string,
      type: item.type as string,
      block: latestBlockNumber,
      version: item.version as string,
      createdAt: timeSince(demo_data?.data?.result?.timestamp),
    }));

  // const pageTransactions = data?.pages.map((page) => {
  //   const formattedTransactions: TransactionColumn[] = page.transactions.map(
  //     (item) => ({
  //       id: item.transaction_hash as string,
  //       status: page.status,
  //       hash: item.transaction_hash as string,
  //       type: item.type as string,
  //       block: latestBlockNumber,
  //       version: item.version as string,
  //       createdAt: timeSince(page.timestamp),
  //     })
  //   );

  //   return formattedTransactions;
  // });

  return (
    <>
      <DataTable
        isTransactionFilters
        searchKey="hash"
        columns={columns}
        // data={
        //   pageTransactions?.reduce(
        //     (acc, curr) => [...acc, ...curr],
        //     [] as TransactionColumn[]
        //   ) ?? []
        // }
        data={formattedTransactions}
      />
      <div ref={ref}>
        {/* {isFetchingNextPage && "Fetching more transactions..."} */}
      </div>
    </>
  );
};

export default Client;
