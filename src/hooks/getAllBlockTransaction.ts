import axios from "axios";

export const getAllBlockTransactions = async (blockNumber: number) => {
  return await axios.post(
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
};
