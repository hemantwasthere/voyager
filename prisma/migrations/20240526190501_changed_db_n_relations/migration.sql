-- CreateTable
CREATE TABLE "Blocks" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "blockHash" TEXT,
    "blockNumber" INTEGER,
    "l1DaMode" TEXT,
    "l1DataGasPriceInFri" TEXT,
    "l1DataGasPriceInWei" TEXT,
    "l1GasPriceInFri" TEXT,
    "l1GasPriceInWei" TEXT,
    "newRoot" TEXT,
    "parentHash" TEXT,
    "sequencerAddress" TEXT,
    "starknetVersion" TEXT,
    "status" TEXT,
    "timestamp" INTEGER,
    "blocksId" TEXT,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "feeDataAvailabilityMode" TEXT,
    "nonce" TEXT,
    "nonceDataAvailabilityMode" TEXT,
    "l1GasMaxAmount" TEXT,
    "l1GasMaxPricePerUnit" TEXT,
    "l2GasMaxAmount" TEXT,
    "l2GasMaxPricePerUnit" TEXT,
    "senderAddress" TEXT,
    "tip" TEXT,
    "txHash" TEXT,
    "txType" TEXT,
    "blockNumber" INTEGER,
    "timestamp" INTEGER,
    "actualFee" TEXT,
    "maxFee" TEXT,
    "gasConsumed" TEXT,
    "unixTimestamp" INTEGER,
    "position" INTEGER,
    "version" TEXT,
    "executionResources" TEXT[],
    "calldata" TEXT[],
    "signatures" TEXT[],
    "blockId" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "ID" TEXT,
    "block" INTEGER,
    "age" INTEGER,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blocksId_fkey" FOREIGN KEY ("blocksId") REFERENCES "Blocks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_id_fkey" FOREIGN KEY ("id") REFERENCES "Blocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_id_fkey" FOREIGN KEY ("id") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
