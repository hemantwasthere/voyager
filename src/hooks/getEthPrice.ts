import axios from "axios";

export const getEthPrice = async (): Promise<{
  price: number;
}> => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids: "ethereum",
        vs_currencies: "usd",
      },
    }
  );

  return new Promise((resolve) => {
    resolve({
      price: response?.data?.ethereum?.usd,
    });
  });
};
