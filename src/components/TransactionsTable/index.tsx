"use client";

import { Prisma } from "@prisma/client";
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
  });

  const blockData: Prisma.BlockCreateInput = {
    blockHash: data?.block_hash,
    blockNumber: data?.block_number,
    l1DaMode: data?.l1_da_mode,
    l1DataGasPriceInFri: data?.l1_data_gas_price?.price_in_fri,
    l1DataGasPriceInWei: data?.l1_data_gas_price?.price_in_wei,
    l1GasPriceInFri: data?.l1_gas_price?.price_in_fri,
    l1GasPriceInWei: data?.l1_gas_price?.price_in_wei,
    newRoot: data?.new_root,
    parentHash: data?.parent_hash,
    sequencerAddress: data?.sequencer_address,
    starknetVersion: data?.starknet_version,
    status: data?.status,
    timestamp: data?.timestamp,
    transactions: data?.transactions.map(
      (txn: any) =>
        ({
          calldata: txn?.calldata,
          feeDataAvailabilityMode: txn?.fee_data_availability_mode,
          nonce: txn?.nonce,
          nonceDataAvailabilityMode: txn?.nonce_data_availability_mode,
          l1GasMaxAmount: txn?.resource_bounds?.l1_gas?.max_amount,
          l1GasMaxPricePerUnit:
            txn?.resource_bounds?.l1_gas?.max_price_per_unit,
          l2GasMaxAmount: txn?.resource_bounds?.l2_gas?.max_amount,
          l2GasMaxPricePerUnit:
            txn?.resource_bounds?.l2_gas?.max_price_per_unit,
          senderAddress: txn?.sender_address,
          signatures: txn?.signatures,
          tip: txn?.tip,
          txHash: txn?.tx_hash,
          txType: txn?.type === "DEPLOY" ? "_DEPLOY" : txn?.type,
          version: txn?.version,
          blockNumber: data?.block_number,
          timestamp: data?.timestamp,
          unixTimestamp: data?.timestamp,
        } as Prisma.TransactionCreateInput)
    ),
  };

  const { mutate } = useMutation({
    mutationKey: ["add-block"],
    mutationFn: async () => {
      blockData && (await addBlock(blockData));
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

  return <Client blockNumber={latestBlockNumber} />;
};

export default TransactionsTable;
