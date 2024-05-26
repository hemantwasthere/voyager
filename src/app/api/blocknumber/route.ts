import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiUrl = "https://rpc.nethermind.io/sepolia-juno";

  const data = await axios.post(
    apiUrl,
    {
      jsonrpc: "2.0",
      method: "starknet_blockNumber",
      params: [],
      id: 0,
    },
    {
      headers: {
        "x-apikey": "bzCf3PLRG64UIamVhYQsohyYP0pEDlV4bci5oys4RAPZy9S5",
        "Content-Type": "application/json",
      },
    }
  );

  return NextResponse.json({ status: data.status, data });
}
