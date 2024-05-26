import { Block } from "@prisma/client";

export const PAGE_LIMIT = 10;

export const DEMO_DATA: Block = {
  blockNumber: 622472,
  timestamp: 1710834752,
  status: "ACCEPTED_ON_L2",
  blockHash: "blockhash",
  l1DaMode: "l1DaMode",
  l1DataGasPrice: {
    priceInFri: "priceInFri",
    priceInWei: "priceInWei",
  },
  l1GasPrice: {
    priceInFri: "priceInFri",
    priceInWei: "priceInWei",
  },
  newRoot: "newRoot",
  parentHash: "parentHash",
  sequencerAddress: "sequencerAddress",
  starknetVersion: "starknetVersion",
  allTransactions: [
    {
      txHash:
        "0x7917478a07b70311084eca3a293c7fc9e40e4c87080045550e73f32ba6427c",
      txType: "INVOKE",
      calldata: [
        "0x03fdd791ed32e6b8f0ebce230fec395579904586a33a89655ef8d8ba10955dce",
        "0x29a1c927e5b1c000",
      ],
      feeDataAvailabilityMode: "feeDataAvailabilityMode",
      nonce: "35841",
      nonceDataAvailabilityMode: "nonceDataAvailabilityMode",
      resourceBounds: {
        l1Gas: {
          maxAmount: "0",
          maxPricePerUnit: "0",
        },
        l2Gas: {
          maxAmount: "0",
          maxPricePerUnit: "0",
        },
        senderAddress:
          "0x0213c67ed78bc280887234fe5ed5e77272465317978ae86c25a71531d9332a2d",
      },
      signatures: [
        "0x5cbfa3a230e3d2baa2db37bba2f7613d16aafdc617762fed10f58ece49ccc81",
        "0x2ddb7ebb0bf06950dc5f7973da3bc90254446cb9b8a8f102e9484e8317517bb",
      ],
      tip: "tip",
      transactionDetails: {
        actualFee: "0.000000809233700636",
        blockNumber: 622472,
        gasConsumed: "26",
        maxFee: "0.000128962017938065",
        senderAddress:
          "0x0213c67ed78bc280887234fe5ed5e77272465317978ae86c25a71531d9332a2d",
        timestamp: 1710834752,
      },
      developerInfo: {
        calldata: "calldata",
        executionResources: ["9624", "25", "286", "3"],
        nonce: "35841",
        position: 165,
        signatures: [
          "0x5cbfa3a230e3d2baa2db37bba2f7613d16aafdc617762fed10f58ece49ccc81",
          "0x2ddb7ebb0bf06950dc5f7973da3bc90254446cb9b8a8f102e9484e8317517bb",
        ],
        unixTimestamp: 1710834752,
        version: "1",
      },
      events: [
        {
          ID: "622472_165_0",
          age: 1710834752,
          block: 622472,
        },
      ],
    },
  ],
};
