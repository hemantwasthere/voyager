"use server";

import { Block, Transaction } from "@prisma/client";

import { db } from "@/db";
import { PAGE_LIMIT } from "./constants";

export const addBlock = async (blockData: Block) => {
  const existingBlock = await db.allBlocks.findFirst({
    where: {
      blocks: {
        some: {
          blockNumber: blockData.blockNumber,
        },
      },
    },
  });

  if (existingBlock) {
    return;
  }

  await db.allBlocks.createMany({
    data: {
      blocks: blockData,
    },
  });
};

export async function fetchAllTransactions(pageParam: number): Promise<{
  transactions: any;
  currentPage: number;
  nextPage: number | null;
}> {
  const allBlocks = await db.allBlocks.findMany({
    include: {
      blocks: true,
    },
    orderBy: {
      blocks: {
        _count: "asc",
      },
    },
  });

  // Extract transactions from all blocks
  const allTransactions = allBlocks
    .flatMap((block) => block.blocks.flatMap((b) => b.allTransactions))
    .reverse();

  return new Promise((resolve) => {
    resolve({
      transactions: allTransactions.slice(
        pageParam * PAGE_LIMIT,
        (pageParam + 1) * PAGE_LIMIT
      ),
      currentPage: pageParam,
      nextPage:
        allTransactions.length > (pageParam + 1) * PAGE_LIMIT
          ? pageParam + 1
          : null,
    });
  });
}

export const getTransactionDataFromHash = async (txHash: string) => {
  // Fetch all blocks containing transactions
  const blocks = await db.allBlocks.findMany({
    select: {
      blocks: {
        select: {
          allTransactions: true,
        },
      },
    },
  });

  // Traverse through the blocks to find the transaction with the given txHash
  for (const blockWrapper of blocks) {
    for (const block of blockWrapper.blocks) {
      let transaction = block.allTransactions.find(
        (tx: any) => tx.txHash === txHash
      );
      if (transaction) {
        return new Promise((resolve) => {
          resolve({
            result: transaction,
          });
        });
      }
    }
  }

  return new Promise((resolve) => {
    resolve({
      result: null,
    });
  });
};
