import axios from "axios";

import { PAGE_LIMIT } from "@/constants";

export const getAllBlockTransactions = async (
  blockNumber: number,
  pageParam: number
): Promise<{
  transactions: any[];
  status: string;
  timestamp: string;
  currentPage: number;
  nextPage: number | null;
}> => {
  const data = await axios.post(
    "https://free-rpc.nethermind.io/mainnet-juno",
    {
      jsonrpc: "2.0",
      method: "starknet_getBlockWithTxs",
      params: [
        {
          block_number: blockNumber,
        },
      ],
      id: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return new Promise((resolve) => {
    resolve({
      transactions: data?.data?.result?.transactions?.slice(
        pageParam,
        pageParam + PAGE_LIMIT
      ),
      status: data?.data?.result?.status,
      timestamp: data?.data?.result?.timestamp,
      currentPage: pageParam,
      nextPage:
        pageParam + PAGE_LIMIT < data?.data?.result?.transactions?.length
          ? pageParam + PAGE_LIMIT
          : null,
    });
  });
};
