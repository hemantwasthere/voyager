"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { getLatestBlockNumber } from "@/hooks/getLatestBlockNumber";
// import { addBlock } from "@/server-actions";
import Client from "./client";

const TransactionsTable: React.FC = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["latest-block-number"],
    queryFn: getLatestBlockNumber,
  });

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

  // const { mutate, error } = useMutation({
  //   mutationKey: ["add-block"],
  //   mutationFn: async () => {
  //     await addBlock({
  //       blockNumber: data?.data.result?.block_number ?? 423434,
  //       timestamp: demo_data?.data?.result?.timestamp ?? "123456",
  //     });
  //   },
  // });

  // if (error) console.log(error, "errorr");

  // if (isPending) return <div>Loading block...</div>;

  // if (isError) return <div>Something went wrong</div>;

  return <Client latestBlockNumber={data?.data?.result ?? 622371} />;
};

export default TransactionsTable;
