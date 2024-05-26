"use server";

import { Prisma } from "@prisma/client";

import { db } from "@/db";
import { PAGE_LIMIT } from "./constants";

export const addBlock = async (blockData: Prisma.BlockCreateInput) => {
  const existingBlock = await db.block.findUnique({
    where: {
      blockNumber: blockData.blockNumber!,
    },
  });

  if (existingBlock) {
    return;
  }

  await db.block.create({
    data: blockData,
  });
};

export async function fetchAllTransactions(
  blockNumber: number,
  pageParam: number
): Promise<{
  transactions: any;
  currentPage: number;
  nextPage: number | null;
}> {
  const transactions = await db.transaction.findMany({
    where: {
      blockNumber: blockNumber,
    },
    orderBy: {
      timestamp: "desc",
    },
  });

  return new Promise((resolve) => {
    resolve({
      transactions: transactions.slice(
        pageParam * PAGE_LIMIT,
        (pageParam + 1) * PAGE_LIMIT
      ),
      currentPage: pageParam,
      nextPage:
        transactions.length > (pageParam + 1) * PAGE_LIMIT
          ? pageParam + 1
          : null,
    });
  });
}

export const getTransactionDataFromHash = async (txHash: string) => {
  const transactions = await db.transaction.findUnique({
    where: {
      txHash: txHash,
    },
  });

  if (!transactions) return null;

  return transactions;
};
