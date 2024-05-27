"use server";

import { Prisma } from "@prisma/client";

import { db } from "@/db";
import { PAGE_LIMIT } from "./constants";

export const addBlock = async (
  blockData: Prisma.BlockCreateInput,
  transactionData: Prisma.TransactionCreateInput[]
) => {
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

  await db.transaction.createMany({
    data: transactionData,
  });
};

export async function fetchAllTransactions(pageParam: number): Promise<{
  transactions: any;
  currentPage: number;
  nextPage: number | null;
}> {
  const transactions = await db.transaction.findMany({
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

export const getTransactionDataFromHash = async (txHash: string, data: any) => {
  const transactions = await db.transaction.findUnique({
    where: {
      txHash: txHash,
    },
  });

  if (!transactions) return null;

  await db.transaction.update({
    where: {
      txHash: txHash,
    },
    data: {
      actualFee: data?.actual_fee.amount,
      executionResources: [
        `${data?.execution_resources?.steps}` ?? "",
        `${data?.execution_resources?.pedersen_builtin_applications}` ?? "",
        `${data?.execution_resources?.range_check_builtin_applications}` ?? "",
        `${data?.execution_resources?.ec_op_builtin_applications}` ?? "",
      ],
      maxFee: "-",
      gasConsumed: "-",
    },
  });

  return transactions;
};
