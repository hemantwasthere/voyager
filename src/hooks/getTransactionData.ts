import axios from "axios";

export const getTransactionReceipt = async (
  txHash: string[]
): Promise<{
  result: any;
}> => {
  const data = await axios.post(
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

  return new Promise((resolve) => {
    resolve({
      result: data?.data?.result,
    });
  });
};
