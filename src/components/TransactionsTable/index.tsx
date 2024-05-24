"use client";

import { useQuery } from "@tanstack/react-query";

import { getLatestBlockNumber } from "@/hooks/getLatestBlockNumber";
import Client from "./client";

const TransactionsTable: React.FC = () => {
  const { data, isPending } = useQuery({
    queryKey: ["latest-block-number"],
    queryFn: getLatestBlockNumber,
  });

  return <Client latestBlockNumber={data?.data.result} isPending={isPending} />;
};

export default TransactionsTable;
