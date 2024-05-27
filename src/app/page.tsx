"use client";

import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import TransactionsTable from "@/components/TransactionsTable";
import { getLatestBlockNumber } from "@/hooks/getLatestBlockNumber";

const Home: NextPage = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["latest-block-number"],
    queryFn: getLatestBlockNumber,
    retry: true,
    retryDelay: 3000,
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });

  if (isPending) return <LoadingSkeleton />;

  if (isError) return <div>Something went wrong</div>;

  return (
    <>
      <h1 className="text-2xl text-white font-normal align-baseline">
        Transactions
      </h1>
      <p className="mt-2 text-sm font-light text-[#cacaca] leading-[1.4]">
        A list of transactions on starknet
      </p>

      <div className="mt-8">
        <TransactionsTable latestBlockNumber={data?.data?.result} />
      </div>
    </>
  );
};

export default Home;
