/*
  Warnings:

  - Added the required column `allTransactionsId` to the `Block` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_blockId_fkey";

-- AlterTable
ALTER TABLE "Block" ADD COLUMN     "allTransactionsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "allTransactionsId" TEXT;

-- CreateTable
CREATE TABLE "AllTransactions" (
    "id" TEXT NOT NULL,

    CONSTRAINT "AllTransactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_allTransactionsId_fkey" FOREIGN KEY ("allTransactionsId") REFERENCES "AllTransactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_allTransactionsId_fkey" FOREIGN KEY ("allTransactionsId") REFERENCES "AllTransactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
