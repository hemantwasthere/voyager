"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { NextPage } from "next";
import { Roboto_Mono } from "next/font/google";
import Link from "next/link";

import CopyIcon from "@/components/Copy";
import CustomTooltip from "@/components/CustomTooltip";
import EventsTable from "@/components/EventsTable";
import { EventsColumn } from "@/components/EventsTable/columns";
import { Icons } from "@/components/Icons";
import TxPageLoadingSkeleton from "@/components/TxPageLoadingSkeleton";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEthPrice } from "@/hooks/getEthPrice";
import { getTransactionReceipt } from "@/hooks/getTransactionData";
import { cn, formatTimestamp, timeSince } from "@/lib/utils";
import { getTransactionDataFromHash } from "@/server-actions";

const roboto = Roboto_Mono({
  subsets: ["latin"],
});

interface PageProps {
  params: {
    txHash: string;
  };
}

const Page: NextPage<PageProps> = ({ params }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["all-block-transactions"],
    queryFn: async () => {
      if (!params.txHash) return;
      return await getTransactionReceipt([params.txHash]);
    },
  });

  const {
    data: transactionDataFromDb,
    isPending: isPending2,
    isError: isError2,
  } = useQuery({
    queryKey: ["get-transaction-data-from-hash"],
    queryFn: async () => {
      if (!params.txHash) return;
      return await getTransactionDataFromHash(params.txHash);
    },
  });

  const { data: ethPrice } = useQuery({
    queryKey: ["get-eth-price"],
    queryFn: async () => {
      return await getEthPrice();
    },
  });

  if (isPending || isPending2) return <TxPageLoadingSkeleton />;

  if (isError) return <div>Failed to fetch transaction data from api</div>;

  if (isError2) return <div>Failed to fetch transaction data from db</div>;

  if (!transactionDataFromDb) return null;

  // transactionDataFromDb.events = data?.result?.events?.map(
  //   (event: any) => ({
  //     id: event?.id ?? "id",
  //     block: transactionDataFromDb?.result?.transactionDetails?.blockNumber,
  //     createdAt: event?.timestamp ?? "timestamp",
  //   })
  // );

  if (transactionDataFromDb.executionResources) {
    transactionDataFromDb.executionResources[0] =
      data?.result?.execution_resources?.steps;

    transactionDataFromDb.executionResources[1] =
      data?.result?.execution_resources?.pedersen_builtin_applications;

    transactionDataFromDb.executionResources[2] =
      data?.result?.execution_resources?.range_check_builtin_applications;

    transactionDataFromDb.executionResources[3] =
      data?.result?.execution_resources?.ec_op_builtin_applications;
  }

  const formattedEventData: EventsColumn[] = data?.result?.events?.map(
    (event: any, index: any) => ({
      id: `${transactionDataFromDb?.blockNumber}_${
        transactionDataFromDb?.position
      }_${data?.result?.events?.length - index - 1}`,
      block: transactionDataFromDb?.blockNumber,
      createdAt: timeSince(transactionDataFromDb?.timestamp!),
    })
  );

  // const formattedEventData: EventsColumn[] = [
  //   {
  //     id: "622371_21_3",
  //     block: 622371,
  //     createdAt: timeSince(1637069048),
  //   },
  //   {
  //     id: "622371_21_2",
  //     block: 622371,
  //     createdAt: timeSince(1637069048),
  //   },
  //   {
  //     id: "622371_21_1",
  //     block: 622371,
  //     createdAt: timeSince(1637069048),
  //   },
  //   {
  //     id: "622371_21_0",
  //     block: 622371,
  //     createdAt: timeSince(1637069048),
  //   },
  // ];

  return (
    <>
      <h1 className="text-2xl text-white font-normal align-baseline mb-8">
        Transactions
      </h1>

      <Label className="text-[#cacaca] text-[12px]">HASH</Label>
      <p className="mt-4 text-base font-light text-white leading-[1.4] break-all flex items-center gap-2">
        {params.txHash}
        <CopyIcon copyValue={params.txHash} className="w-5 h-5" />
      </p>

      <div className="flex mt-6">
        <div className="w-1/2 md:w-1/4 flex flex-col gap-4 md:gap-1">
          <p className="text-[12px] text-[#cacaca] flex items-center gap-1">
            TYPE <Icons.InfoIcon tooltipValue="Transaction type" />
          </p>
          <div className="text-[12px] font-[300] py-0.5 px-[10px] border border-[#2E4C3C] bg-[#202E26] text-[#83F3BB] rounded-sm w-fit">
            {transactionDataFromDb?.txType}
          </div>
        </div>

        <div className="w-1/2 md:w-1/4 flex flex-col gap-4 md:gap-1">
          <p className="text-[12px] text-[#cacaca]">TIMESTAMP</p>
          <p className="text-base text-white flex gap-1.5 items-center">
            {formatTimestamp(transactionDataFromDb?.unixTimestamp!).slice(
              0,
              11
            )}
            <span className="text-[12px] text-[#cacaca]">
              {formatTimestamp(transactionDataFromDb?.unixTimestamp!).slice(11)}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-[#cacaca] text-[12px] mb-8">STATUS</p>

        <div className="flex justify-start items-center">
          <div className="rounded-full border border-transparent bg-[#107D49] text-white py-[6px] pl-3 px-3.5 flex items-center gap-1 w-fit text-[11px]">
            <Check className="h-3.5 w-3.5" strokeWidth="3" />
            Received
          </div>
          <div className="h-0.5 w-6 bg-[#107D49]" />
          <div className="rounded-full border border-transparent bg-[#107D49] text-white py-[6px] pl-3 px-3.5 flex items-center gap-1 w-fit text-[11px]">
            <Check className="h-3.5 w-3.5" strokeWidth="3" />
            Accepted on L2
          </div>
          <div className="h-0.5 w-6 bg-[#4B4B4B]" />
          <div className="rounded-full bg-transparent border border-[#4B4B4B] text-[#808080] p-[2px] flex items-center gap-1 w-fit text-[11px] cursor-pointer group hover:py-[6px] hover:pr-3.5 hover:pl-1.5">
            <div className="w-7 h-7 border-2 rounded-full border-[#4B4B4B] border-t-[#BFBFBF] animate-spin group-hover:hidden" />
            <Loader2 className="h-5 w-5 animate-spin text-[#BFBFBF] hidden group-hover:flex" />
            <p className="group-hover:flex hidden">Accepted on L1</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="overview">
          <TabsList className="bg-transparent space-x-4">
            <TabsTrigger
              value="overview"
              className="px-0 w-fit bg-transparent border-b-2 rounded-none border-transparent text-[#AAAAAA] data-[state=active]:border-b-[#B56749] data-[state=active]:bg-transparent data-[state=active]:text-white h-12 focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-b-[#B56749] hover:border-opacity-30"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="px-0 w-[5.8rem] bg-transparent border-b-2 rounded-none border-transparent text-[#AAAAAA] data-[state=active]:border-b-[#B56749] data-[state=active]:bg-transparent data-[state=active]:text-white h-12 focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-b-[#B56749] hover:border-opacity-30 flex items-center gap-2.5"
            >
              Events
              <span className="bg-[#121212] text-[#AAAAAA] w-6 h-6 rounded-full text-[12px] flex items-center justify-center">
                {data?.result?.events?.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div>
              <h3 className="text-2xl text-white font-normal align-baseline mb-4">
                Transaction Details
              </h3>

              <div className="text-[12px] flex gap-4 md:gap-0 flex-col items-start">
                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon tooltipValue="Unique number of the block in which the transaction is processed" />
                    BLOCK NUMBER:
                  </div>
                  <div className="flex-1 w-full py-2 border-b border-b-[#383838]">
                    <CustomTooltip tooltipValue="622371">
                      <Link
                        // href={`https://voyager.online/block/${data?.result?.block_number}`}
                        href={`https://voyager.online/block/622371`}
                        target="_blank"
                        className="flex-1 w-fit items-center text-sm text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer"
                      >
                        {transactionDataFromDb?.blockNumber}
                      </Link>
                    </CustomTooltip>
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon tooltipValue="Time at which the transaction was processed" />
                    TIMESTAMP:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] text-sm  text-white">
                    {timeSince(transactionDataFromDb?.unixTimestamp!)} ({" "}
                    {formatTimestamp(transactionDataFromDb?.unixTimestamp!)} )
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon tooltipValue="Actual fee paid for executing the transaction" />
                    ACTUAL FEE:
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row gap-2 md:items-center py-2 border-b border-b-[#383838] text-sm">
                    <span>
                      {Number(transactionDataFromDb?.actualFee) /
                        Number(1000000000000000000)}
                    </span>{" "}
                    <CustomTooltip tooltipValue="Ether">
                      <Link
                        href="https://voyager.online/token/0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
                        className="text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer"
                      >
                        ETH
                      </Link>
                    </CustomTooltip>
                    <CopyIcon copyValue="0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7" />
                    {!ethPrice?.price
                      ? "..."
                      : `($${(
                          ethPrice?.price *
                          (Number(transactionDataFromDb?.actualFee) /
                            Number(1000000000000000000))
                        ).toFixed(6)})`}
                    {/* ($0.015512) */}
                    <div className="flex items-center gap-0.5">
                      to:
                      <CustomTooltip tooltipValue="0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8">
                        <Link
                          href="https://voyager.online/contract/0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8"
                          className="text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer mr-1"
                        >
                          StarkWare: Sequencer
                        </Link>
                      </CustomTooltip>
                      <CopyIcon copyValue="0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8" />
                    </div>
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon tooltipValue="Max fee set when submitting the transaction" />
                    MAX FEE:
                  </div>
                  <div className="flex-1 flex gap-2 flex-col md:flex-row md:items-center py-2 border-b border-b-[#383838] text-sm">
                    <span>{transactionDataFromDb?.maxFee}</span>{" "}
                    <CustomTooltip tooltipValue="Ether">
                      <Link
                        href={`https://voyager.online/token/0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7`}
                        className="text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer"
                      >
                        ETH
                      </Link>
                    </CustomTooltip>
                    <CopyIcon copyValue="0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7" />
                    {!ethPrice?.price
                      ? "..."
                      : `($${(
                          ethPrice?.price *
                          (Number(transactionDataFromDb?.maxFee) /
                            Number(1000000000000000000))
                        ).toFixed(6)})`}
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon tooltipValue="Gas consumed for the transaction execution" />
                    GAS CONSUMED:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] text-sm">
                    {/* {
                      data?.result?.execution_resources?.data_availability
                        ?.l1_data_gas
                    } */}
                    {transactionDataFromDb?.gasConsumed}
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row h-full md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon tooltipValue="Sending party of the transaction" />
                    SENDER ADDRESS:
                  </div>
                  <div className="flex-1 flex items-center gap-1 w-full py-2 border-b border-b-[#383838]">
                    <CustomTooltip tooltipValue="0x0039a73ab43012ff25cf715a462b6061f211088625a71e2a8d819ba260eca700">
                      <Link
                        href={`https://voyager.online/contract/${transactionDataFromDb?.senderAddress}`}
                        className="w-fit text-sm text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer break-all"
                      >
                        {transactionDataFromDb?.senderAddress}
                      </Link>
                    </CustomTooltip>
                    <CopyIcon
                      copyValue={transactionDataFromDb?.senderAddress ?? ""}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl text-white font-normal align-baseline mb-4">
                Developer Info
              </h3>

              <div className="text-[12px] flex gap-4 md:gap-0 flex-col items-start">
                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon tooltipValue="Unix timestamp at which the transaction was processed" />
                    UNIX TIMESTAMP:
                  </div>
                  <div className="flex-1 flex items-center gap-3 py-2 border-b border-b-[#383838] text-sm">
                    {transactionDataFromDb?.unixTimestamp}
                    <CopyIcon
                      copyValue={
                        transactionDataFromDb?.unixTimestamp?.toString() ?? ""
                      }
                    />
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon tooltipValue="Nonce of the transaction" />
                    NONCE:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] text-sm">
                    {transactionDataFromDb?.nonce ?? "-"}
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon tooltipValue="Index of the transaction within the block" />
                    POSITION:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] text-sm">
                    {transactionDataFromDb?.position ?? "-"}
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon tooltipValue="Version of the transaction" />
                    VERSION:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] text-sm">
                    1
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-full w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon tooltipValue="Resources utilized to execute the transaction" />
                    EXECUTION RESOURCES:
                  </div>
                  <div className="flex-1 items-center py-1 border-b border-b-[#383838] text-sm">
                    <div className="flex items-center text-[12px] font-[300] px-[10px] border border-[#2E4C3C] bg-[#202E26] text-[#83F3BB] rounded-sm w-fit">
                      {transactionDataFromDb?.executionResources[0]} STEPS
                    </div>
                    <div className="flex items-center flex-wrap gap-3 mt-1">
                      <div className="flex items-center text-[12px] font-[300] px-[10px] border border-[#583F2A] bg-[#3A2A1C] text-[#FEC898] rounded-sm w-fit">
                        {transactionDataFromDb?.executionResources[1]}{" "}
                        PEDERSEN_BUILTIN{" "}
                      </div>
                      <div className="flex items-center text-[12px] font-[300] px-[10px] border border-[#583F2A] bg-[#3A2A1C] text-[#FEC898] rounded-sm w-fit">
                        {transactionDataFromDb?.executionResources[2]}{" "}
                        RANGE_CHECK_BUILTIN
                      </div>
                      <div className="flex items-center text-[12px] font-[300] px-[10px] border border-[#583F2A] bg-[#3A2A1C] text-[#FEC898] rounded-sm w-fit">
                        {transactionDataFromDb?.executionResources[3]}{" "}
                        EC_OP_BUILTIN
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex md:items-start gap-2 flex-col md:flex-row md:h-full w-full md:mt-3">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 mt-1">
                    <Icons.InfoIcon tooltipValue="Calldata that was sent in the transaction" />
                    CALLDATA:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] h-full">
                    <div className="overflow-x-auto">
                      <Tabs defaultValue="calls">
                        <TabsList className="bg-transparent border border-[#4B4B4B] h-full p-0 rounded-none">
                          <TabsTrigger
                            value="calls"
                            className="w-[4rem] h-[1.8rem] font-normal rounded-none bg-transparent text-white text-[12px] hover:bg-[#383838] data-[state=active]:text-white data-[state=active]:bg-[#4B4B4B] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-opacity-30"
                          >
                            Calls
                          </TabsTrigger>
                          <TabsTrigger
                            value="transactions"
                            className="w-[6.5rem] h-[1.8rem] font-normal px-4 rounded-none bg-transparent text-white text-[12px] hover:bg-[#383838] data-[state=active]:text-white data-[state=active]:bg-[#4B4B4B] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-opacity-30"
                          >
                            Transaction
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent
                          value="calls"
                          className="mt-2 w-full h-full bg-[#252525] py-3.5 px-5 overflow-x-auto"
                        >
                          <div
                            className={cn(
                              roboto.className,
                              "text-white text-sm tracking-wider flex items-center gap-2"
                            )}
                          >
                            <span className="text-[#BF43CA]">transfer </span>
                            <CopyIcon copyValue="transfer" /> ({" "}
                            <span className="text-[#B91C1B] text-nowrap">
                              {" "}
                              recipient, amount
                            </span>
                            )<span className="text-[#4D4DD4]">→</span>
                            0x83af...d12e
                            <CopyIcon copyValue="transfer" />
                          </div>

                          <div className="mt-5 flex items-center gap-2 text-sm">
                            Address:
                            <div className="flex items-center gap-0.5">
                              <CustomTooltip tooltipValue="0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8">
                                <Link
                                  href="https://voyager.online/contract/0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8"
                                  className="text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer mr-0.5"
                                >
                                  StarkGate: ETH Token
                                </Link>
                              </CustomTooltip>
                              <CopyIcon copyValue="0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8" />
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-5">
                            <Tabs defaultValue="hex">
                              <TabsList className="bg-[#1B1B1B] border border-[#4B4B4B] h-full p-0 rounded-none">
                                <TabsTrigger
                                  value="hex"
                                  className="w-[3.5rem] h-[1.8rem] font-normal rounded-none bg-transparent text-white text-[12px] border-r border-r-[#4B4B4B] hover:bg-[#383838] data-[state=active]:text-white data-[state=active]:bg-[#4B4B4B] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-opacity-30"
                                >
                                  Hex
                                </TabsTrigger>
                                <TabsTrigger
                                  value="dec"
                                  className="w-[3.5rem] h-[1.8rem] font-normal px-4 rounded-none bg-transparent text-white text-[12px] border-r border-r-[#4B4B4B] hover:bg-[#383838] data-[state=active]:text-white data-[state=active]:bg-[#4B4B4B] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-opacity-30"
                                >
                                  Dec
                                </TabsTrigger>
                                <TabsTrigger
                                  value="text"
                                  className="w-[3.5rem] h-[1.8rem] font-normal px-4 rounded-none bg-transparent text-white text-[12px] hover:bg-[#383838] data-[state=active]:text-white data-[state=active]:bg-[#4B4B4B] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-opacity-30"
                                >
                                  Text
                                </TabsTrigger>
                              </TabsList>

                              <TabsContent value="hex"></TabsContent>
                              <TabsContent value="dec"></TabsContent>
                              <TabsContent value="text"></TabsContent>
                            </Tabs>
                            <Tabs defaultValue="decoded">
                              <TabsList className="bg-[#1B1B1B] border border-[#4B4B4B] h-full p-0 rounded-none">
                                <TabsTrigger
                                  value="decoded"
                                  className="w-[5rem] h-[1.8rem] font-normal rounded-none bg-transparent text-white text-[12px] border-r border-r-[#4B4B4B] hover:bg-[#383838] data-[state=active]:text-white data-[state=active]:bg-[#4B4B4B] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-opacity-30"
                                >
                                  Decoded
                                </TabsTrigger>
                                <TabsTrigger
                                  value="raw"
                                  className="w-[3.5rem] h-[1.8rem] font-normal px-4 rounded-none bg-transparent text-white text-[12px] hover:bg-[#383838] data-[state=active]:text-white data-[state=active]:bg-[#4B4B4B] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-opacity-30"
                                >
                                  Raw
                                </TabsTrigger>
                              </TabsList>

                              <TabsContent value="decoded"></TabsContent>
                              <TabsContent value="raw"></TabsContent>
                            </Tabs>
                          </div>
                        </TabsContent>

                        <TabsContent
                          value="transactions"
                          className="mt-2 w-full h-full bg-[#252525] py-3.5 px-5 overflow-x-auto"
                        >
                          <div
                            className={cn(
                              roboto.className,
                              "text-white text-sm tracking-wider flex items-center gap-2"
                            )}
                          >
                            <span className="text-[#BF43CA]">__execute__ </span>
                            <CopyIcon copyValue="__execute__" /> ({" "}
                            <span className="text-[#B91C1B]"> calls</span>)
                            <span className="text-[#4D4DD4]">→</span>
                            0x83af...d12e
                            <CopyIcon copyValue="__execute__" />
                          </div>

                          <div className="mt-5 flex items-center gap-2 text-sm">
                            Address:
                            <div className="flex items-center gap-0.5">
                              <CustomTooltip tooltipValue="0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8">
                                <Link
                                  href="https://voyager.online/contract/0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8"
                                  className="text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer mr-0.5"
                                >
                                  Argent
                                </Link>
                              </CustomTooltip>
                              <CopyIcon copyValue="0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8" />
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-5">
                            <Tabs defaultValue="hex">
                              <TabsList className="bg-[#1B1B1B] border border-[#4B4B4B] h-full p-0 rounded-none">
                                <TabsTrigger
                                  value="hex"
                                  className="w-[3.5rem] h-[1.8rem] font-normal rounded-none bg-transparent text-white text-[12px] border-r border-r-[#4B4B4B] hover:bg-[#383838] data-[state=active]:text-white data-[state=active]:bg-[#4B4B4B] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-opacity-30"
                                >
                                  Hex
                                </TabsTrigger>
                                <TabsTrigger
                                  value="dec"
                                  className="w-[3.5rem] h-[1.8rem] font-normal px-4 rounded-none bg-transparent text-white text-[12px] border-r border-r-[#4B4B4B] hover:bg-[#383838] data-[state=active]:text-white data-[state=active]:bg-[#4B4B4B] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-opacity-30"
                                >
                                  Dec
                                </TabsTrigger>
                                <TabsTrigger
                                  value="text"
                                  className="w-[3.5rem] h-[1.8rem] font-normal px-4 rounded-none bg-transparent text-white text-[12px] hover:bg-[#383838] data-[state=active]:text-white data-[state=active]:bg-[#4B4B4B] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-opacity-30"
                                >
                                  Text
                                </TabsTrigger>
                              </TabsList>

                              <TabsContent value="hex"></TabsContent>
                              <TabsContent value="dec"></TabsContent>
                              <TabsContent value="text"></TabsContent>
                            </Tabs>
                            <Tabs defaultValue="decoded">
                              <TabsList className="bg-[#1B1B1B] border border-[#4B4B4B] h-full p-0 rounded-none">
                                <TabsTrigger
                                  value="decoded"
                                  className="w-[5rem] h-[1.8rem] font-normal rounded-none bg-transparent text-white text-[12px] border-r border-r-[#4B4B4B] hover:bg-[#383838] data-[state=active]:text-white data-[state=active]:bg-[#4B4B4B] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-opacity-30"
                                >
                                  Decoded
                                </TabsTrigger>
                                <TabsTrigger
                                  value="raw"
                                  className="w-[3.5rem] h-[1.8rem] font-normal px-4 rounded-none bg-transparent text-white text-[12px] hover:bg-[#383838] data-[state=active]:text-white data-[state=active]:bg-[#4B4B4B] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-opacity-30"
                                >
                                  Raw
                                </TabsTrigger>
                              </TabsList>

                              <TabsContent value="decoded"></TabsContent>
                              <TabsContent value="raw"></TabsContent>
                            </Tabs>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>

                {transactionDataFromDb?.signatures[0] && (
                  <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                    <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                      <Icons.InfoIcon tooltipValue="Signature(s) of the transaction" />
                      SIGNATURE(S):
                    </div>
                    <div className="flex-1 flex items-center gap-1 md:gap-0 justify-between py-2 border-b border-b-[#383838] text-sm text-[#F5AB35] break-all hover:bg-[#383838] px-2">
                      {transactionDataFromDb?.signatures[0]}
                      <CopyIcon
                        copyValue={transactionDataFromDb?.signatures[0]}
                      />
                    </div>
                  </div>
                )}

                {transactionDataFromDb?.signatures &&
                  transactionDataFromDb?.signatures.length > 1 &&
                  transactionDataFromDb?.signatures.slice(1).map((sign, i) => (
                    <div
                      key={i}
                      className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full"
                    >
                      <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5" />
                      <div className="flex-1 flex items-center gap-1 md:gap-0 justify-between py-2 border-b border-b-[#383838] text-sm text-[#F5AB35] break-all hover:bg-[#383838] px-2">
                        {sign}
                        <CopyIcon copyValue={sign} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-8">
            <EventsTable data={formattedEventData} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
