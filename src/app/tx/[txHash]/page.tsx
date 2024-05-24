"use client";

import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";

import { getTransactionData } from "@/hooks/getTransactionData";

interface PageProps {
  params: {
    txHash: string;
  };
}

const Page: NextPage<PageProps> = ({ params }) => {
  const { data } = useQuery({
    queryKey: ["all-block-transactions"],
    queryFn: async () => {
      if (!params.txHash) return;
      return await getTransactionData([params.txHash]);
    },
  });

  console.log(data);

  return (
    <>
      <h1 className="text-2xl text-white font-normal align-baseline">
        Transactions
      </h1>
      <p className="mt-2 text-sm font-light text-[#cacaca] leading-[1.4]">
        {params.txHash}
      </p>

      <div className="mt-8">another</div>
    </>
  );
};

export default Page;
