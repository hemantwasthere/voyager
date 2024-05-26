"use server";

import { Block } from "@prisma/client";

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
  });

  // Extract transactions from all blocks
  const allTransactions = allBlocks.flatMap((block) =>
    block.blocks.flatMap((b) => b.allTransactions)
  );

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
  const transactionData = await db.allBlocks.findFirst({
    where: {
      blocks: {
        some: {
          allTransactions: {
            some: {
              txHash: txHash,
            },
          },
        },
      },
    },
    select: {
      blocks: {
        select: {
          blockHash: true,
          blockNumber: true,
          timestamp: true,
          allTransactions: {
            where: {
              txHash: txHash,
            },
            select: {
              txHash: true,
              txType: true,
              calldata: true,
              feeDataAvailabilityMode: true,
              nonce: true,
              nonceDataAvailabilityMode: true,
              tip: true,
              transactionDetails: {
                select: {
                  blockNumber: true,
                  timestamp: true,
                  actualFee: true,
                  maxFee: true,
                  gasConsumed: true,
                  senderAddress: true,
                },
              },
              developerInfo: {
                select: {
                  unixTimestamp: true,
                  nonce: true,
                  position: true,
                  version: true,
                  executionResources: true,
                  calldata: true,
                  signatures: true,
                },
              },
              events: {
                select: {
                  ID: true,
                  block: true,
                  age: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!transactionData) {
    return new Promise((resolve) => {
      resolve({
        result: null,
      });
    });
  }

  return new Promise((resolve) => {
    resolve({
      result: transactionData,
    });
  });
};
