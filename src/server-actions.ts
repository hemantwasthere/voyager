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

  console.log(allBlocks);

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
