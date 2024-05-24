import axios from "axios";

export const getLatestBlockNumber = async () => {
  return await axios.post(
    "https://free-rpc.nethermind.io/mainnet-juno",
    {
      jsonrpc: "2.0",
      method: "starknet_blockNumber",
      params: [],
      id: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
