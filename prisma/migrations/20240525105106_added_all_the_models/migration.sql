-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "txType" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "transactionDetailsId" TEXT NOT NULL,
    "developerInfoId" TEXT NOT NULL,
    "blockId" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionDetails" (
    "id" TEXT NOT NULL,
    "blockNumber" INTEGER NOT NULL,
    "timestamp" TEXT NOT NULL,
    "actualFee" TEXT NOT NULL,
    "maxFee" TEXT NOT NULL,
    "gasConsumed" TEXT NOT NULL,
    "senderAddress" TEXT NOT NULL,

    CONSTRAINT "TransactionDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeveloperInfo" (
    "id" TEXT NOT NULL,
    "unixTimestamp" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "version" TEXT NOT NULL,
    "executionResources" TEXT[],
    "calldata" TEXT NOT NULL,
    "signatures" TEXT[],

    CONSTRAINT "DeveloperInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "ID" TEXT NOT NULL,
    "block" INTEGER NOT NULL,
    "age" TEXT NOT NULL,
    "transactionId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "blockNumber" INTEGER NOT NULL,
    "timestamp" TEXT NOT NULL,
    "allBlocksId" TEXT,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllBlocks" (
    "id" TEXT NOT NULL,

    CONSTRAINT "AllBlocks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionDetailsId_fkey" FOREIGN KEY ("transactionDetailsId") REFERENCES "TransactionDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_developerInfoId_fkey" FOREIGN KEY ("developerInfoId") REFERENCES "DeveloperInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_allBlocksId_fkey" FOREIGN KEY ("allBlocksId") REFERENCES "AllBlocks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
