import axios from "axios";

export const getTransactionData = async (txHash: string[]) => {
  return await axios.post(
    "https://free-rpc.nethermind.io/mainnet-juno",
    {
      jsonrpc: "2.0",
      method: "starknet_getTransactionReceipt",
      params: txHash,
      id: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
