import { Transaction } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { DEMO_DATA } from "@/constants";
import { timeSince } from "@/lib/utils";
import { fetchAllTransactions } from "@/server-actions";
import { DataTable } from "../ui/data-table";
import { TransactionColumn, columns } from "./columns";

const Client: React.FC = () => {
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const { ref, inView } = useInView();

  const {
    data: allTransactions,
    isFetchingNextPage,
    fetchNextPage,
    isPending,
    isError,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["get-transactions-from-db"],
    queryFn: ({ pageParam }) => fetchAllTransactions(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    retry: true,
    retryDelay: 5000,
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  if (isPending) return <div>Fetching transactions...</div>;

  if (isError) return <div>Something went wrong</div>;

  if (!allTransactions) return null;

  const transactions: TransactionColumn[][] = allTransactions?.pages?.map(
    (page) => {
      return page.transactions.map((txn: Transaction) => ({
        id: txn.txHash!,
        status: DEMO_DATA.status!,
        hash: txn.txHash!,
        type: txn.txType!,
        block: txn.transactionDetails?.blockNumber!,
        version: txn.developerInfo?.version!,
        createdAt: timeSince(Number(txn.transactionDetails?.timestamp)),
      }));
    }
  )!;

  return (
    <>
      <DataTable
        isTransactionFilters
        searchKey="hash"
        columns={columns}
        data={
          transactions?.reduce(
            (acc, curr) => [...acc, ...curr],
            [] as TransactionColumn[]
          ) ?? []
        }
        setIsFilterApplied={setIsFilterApplied}
      />

      <div ref={ref} className="w-full">
        {isFetchingNextPage && !isFilterApplied && (
          <div className="mt-3 w-full flex items-center justify-center gap-3 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading more transactions...
          </div>
        )}
      </div>

      {!hasNextPage && (
        <div className="mt-3 w-full flex items-center justify-center gap-3 text-sm">
          No more transactions to load.
        </div>
      )}
    </>
  );
};

export default Client;
