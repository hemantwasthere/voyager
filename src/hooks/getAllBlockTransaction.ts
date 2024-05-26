import { Block } from "@prisma/client";
import axios from "axios";

export const getAllBlockTransactions = async (blockNumber: number) => {
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
        "x-apikey": process.env.RPC_VOYAGER_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return data?.data?.result;
};
