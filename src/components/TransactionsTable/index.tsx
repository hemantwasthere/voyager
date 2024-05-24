"use client";

import { useQuery } from "@tanstack/react-query";

import { getLatestBlockNumber } from "@/hooks/getLatestBlockNumber";
import Client from "./client";

const TransactionsTable: React.FC = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["latest-block-number"],
    queryFn: getLatestBlockNumber,
  });

  // if (isPending) return <div>Loading...</div>;

  // if (isError) return <div>Something went wrong</div>;

  return <Client latestBlockNumber={data?.data.result} />;
};

export default TransactionsTable;
