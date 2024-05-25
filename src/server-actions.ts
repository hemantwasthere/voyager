// "use server";

// import { Block, Transaction } from "@prisma/client";

// import { db } from "@/db";

// export const addBlock = async (blockNumber: number, timestamp: string) => {
//   // await db.allBlocks.create({
//   //   data: {
//   //     blocks: {
//   //       create: {
//   //         blockNumber: blockData.blockNumber,
//   //         timestamp: blockData.timestamp,
//   //         allTransactions: blockData.allTransactions,
//   //       },
//   //     },
//   //   },
//   // });
//   await db.block.create({
//     data: {
//       blockNumber: blockNumber,
//       timestamp: timestamp,
//     },
//   });
// };

// export const addTransaction = async (transactionData: any, blockId: string) => {
//   await db.allTransactions.create({
//     data: {
//       transactions: transactionData.transactionHash,
//       type: transactionData.type,
//       status: transactionData.status,
//       blockId: blockId,
//     },
//   });
// };
