"use client";

import { Block } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getAllBlockTransactions } from "@/hooks/getAllBlockTransaction";
import { addBlock } from "@/server-actions";
import Client from "./client";

interface TransactionsTableProps {
  latestBlockNumber: number;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  latestBlockNumber,
}) => {
  const { data } = useQuery({
    queryKey: ["get-all-block-transactions"],
    queryFn: () => getAllBlockTransactions(latestBlockNumber),
    retry: true,
    retryDelay: 3000,
    refetchInterval: 5000,
  });

  const inputData: Block = {
    blockHash: data?.block_hash,
    blockNumber: data?.block_number,
    l1DaMode: data?.l1_da_mode,
    l1DataGasPrice: {
      priceInFri: data?.l1_data_gas_price?.price_in_fri,
      priceInWei: data?.l1_data_gas_price?.price_in_wei,
    },
    l1GasPrice: {
      priceInFri: data?.l1_gas_price?.price_in_fri,
      priceInWei: data?.l1_gas_price?.price_in_wei,
    },
    newRoot: data?.new_root,
    parentHash: data?.parent_hash,
    sequencerAddress: data?.sequencer_address,
    starknetVersion: data?.starknet_version,
    status: data?.status,
    allTransactions: data?.transactions.map((txn: any) => ({
      calldata: txn?.calldata,
      feeDataAvailabilityMode: txn?.fee_data_availability_mode,
      nonce: txn?.nonce,
      nonceDataAvailabilityMode: txn?.nonce_data_availability_mode,
      resourceBounds: {
        l1Gas: {
          maxAmount: txn?.resource_bounds?.l1_gas?.max_amount,
          maxPricePerUnit: txn?.resource_bounds?.l1_gas?.max_price_per_unit,
        },
        l2Gas: {
          maxAmount: txn?.resource_bounds?.l2_gas?.max_amount,
          maxPricePerUnit: txn?.resource_bounds?.l2_gas?.max_price_per_unit,
        },
        senderAddress: txn?.sender_address ?? "0xv1",
      },
      signatures: txn?.signature,
      tip: txn?.tip,
      txHash: txn?.transaction_hash,
      txType: txn?.type === "DEPLOY" ? "_DEPLOY" : txn?.type,
      transactionDetails: {
        blockNumber: data?.block_number,
        timestamp: data?.timestamp,
        actualFee: txn?.actual_fee ?? "0",
        maxFee: txn?.max_fee ?? "0",
        gasConsumed: txn?.gas_consumed ?? "0",
        senderAddress: txn?.sender_address ?? "0xv1",
      },
      developerInfo: {
        unixTimestamp: data?.timestamp,
        nonce: txn?.nonce ?? "nonce",
        position: txn?.position ?? 0,
        version: txn?.version ?? "1",
        executionResources: txn?.execution_resources ?? [],
        calldata: txn?.calldata,
        signatures: txn?.signature ?? [],
      },
      events: [
        {
          ID: txn?.events?.id ?? "1234_0_1",
          block: txn?.events?.block ?? 0,
          age: txn?.events?.age ?? 0,
        },
      ],
    })),
    timestamp: data?.timestamp,
  };

  const { mutate } = useMutation({
    mutationKey: ["add-block"],
    mutationFn: async () => {
      await addBlock(inputData);
    },
    retry: true,
    retryDelay: 3000,
  });

  useEffect(() => {
    if (data) {
      mutate();
      console.log("render");
    }
  }, [latestBlockNumber, data, mutate]);

  return <Client />;
};

export default TransactionsTable;
