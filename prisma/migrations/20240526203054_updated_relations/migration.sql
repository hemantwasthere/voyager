/*
  Warnings:

  - You are about to drop the column `blocksId` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the `Blocks` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[blockNumber]` on the table `Block` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_blocksId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_id_fkey";

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "blocksId";

-- DropTable
DROP TABLE "Blocks";

-- CreateIndex
CREATE UNIQUE INDEX "Block_blockNumber_key" ON "Block"("blockNumber");
