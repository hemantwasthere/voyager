"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { NextPage } from "next";

import CopyIcon from "@/components/Copy";
import { Icons } from "@/components/Icons";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTransactionData } from "@/hooks/getTransactionData";
import Link from "next/link";

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
      return await getTransactionData([params.txHash]);
    },
  });

  // if (isPending) return <div>Loading...</div>;

  // if (isError) return <div>Something went wrong</div>;

  return (
    <>
      <h1 className="text-2xl text-white font-normal align-baseline mb-8">
        Transactions
      </h1>

      <Label className="text-[#cacaca] text-[12px]">HASH</Label>
      <p className="mt-4 text-base font-light text-white leading-[1.4] break-all">
        {params.txHash}
      </p>

      <div className="flex mt-6">
        <div className="w-1/2 flex flex-col gap-4">
          <p className="text-[12px] text-[#cacaca] flex items-center gap-1">
            TYPE <Icons.InfoIcon />
          </p>
          <div className="text-sm font-[300] py-0.5 px-[10px] border border-[#2E4C3C] bg-[#202E26] text-[#83F3BB] rounded-sm w-fit">
            {/* {data?.data?.result?.type} */}
            INVOKE
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-4">
          <p className="text-[12px] text-[#cacaca]">TIMESTAMP</p>
          <p className="text-sm text-white flex gap-3 items-center">
            {/* {format(data?.data?.result?.timestamp, "yyyy-MM-dd HH:mm:ss")} */}
            May 24 2024
            <span className="text-[12px] text-[#cacaca]">18:50:03</span>
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
          <div className="rounded-full bg-transparent border border-[#4B4B4B] text-[#808080] p-[6px] flex items-center gap-1 w-fit text-[11px] cursor-pointer group hover:py-[6px] hover:pr-3.5">
            <div className="w-5 h-5 border-2 rounded-full border-[#4B4B4B] border-t-[#BFBFBF] animate-spin group-hover:hidden" />
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
              className="px-0 w-fit bg-transparent border-b-2 rounded-none border-transparent text-[#AAAAAA] data-[state=active]:border-b-[#B56749] data-[state=active]:bg-transparent data-[state=active]:text-white h-12 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="px-0 w-[4.5rem] bg-transparent border-b-2 rounded-none border-transparent text-[#AAAAAA] data-[state=active]:border-b-[#B56749] data-[state=active]:bg-transparent data-[state=active]:text-white h-12 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              Events
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
                    <Icons.InfoIcon />
                    BLOCK NUMBER:
                  </div>
                  <div className="flex-1 w-full py-2 border-b border-b-[#383838]">
                    <Link
                      href={`https://voyager.online/block/${643343}`}
                      target="_blank"
                      className="flex-1 w-fit items-center text-sm text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer"
                    >
                      643343
                    </Link>
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon />
                    TIMESTAMP:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] text-sm  text-white">
                    3 hours ago ( May 24 2024 18:50:03 )
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon />
                    ACTUAL FEE:
                  </div>
                  <div className="flex-1 flex gap-2 items-center py-2 border-b border-b-[#383838] text-sm">
                    <span>0.000000889855373816</span>{" "}
                    <Link
                      href={`https://voyager.online/token/0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7`}
                      className="text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer"
                    >
                      ETH
                    </Link>
                    <CopyIcon copyValue="something" />
                    ($0.00332)
                    <div className="flex items-center gap-0.5">
                      to:
                      <Link
                        href={`https://voyager.online/contract/0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8`}
                        className="text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer mr-1"
                      >
                        StarkWare: Sequencer
                      </Link>
                      <CopyIcon copyValue="something" />
                    </div>
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon />
                    MAX FEE:
                  </div>
                  <div className="flex-1 flex gap-2 items-center py-2 border-b border-b-[#383838] text-sm">
                    <span>0.000002315296879761</span>{" "}
                    <Link
                      href={`https://voyager.online/token/0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7`}
                      className="text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer"
                    >
                      ETH
                    </Link>
                    <CopyIcon copyValue="something" />
                    ($0.008626)
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon />
                    GAS CONSUMED:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] text-sm">
                    85
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row h-full md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon />
                    SENDER ADDRESS:
                  </div>
                  <div className="flex-1 flex items-center gap-1 w-full py-2 border-b border-b-[#383838]">
                    <Link
                      href={`https://voyager.online/contract/0x043fd981c7740e48b6feda1fd42c09b2b8e50b71ff3c29acf9328884b3ba023d`}
                      className="w-fit text-sm text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer break-all "
                    >
                      0x07f438bc613360e100abfcb90726dbe2e22266494c487a31c208c8fcf4fdb8ee
                    </Link>
                    <CopyIcon copyValue="0x07f438bc613360e100abfcb90726dbe2e22266494c487a31c208c8fcf4fdb8ee" />
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
                    <Icons.InfoIcon />
                    UNIX TIMESTAMP:
                  </div>
                  <div className="flex-1 flex items-center gap-3 py-2 border-b border-b-[#383838] text-sm">
                    1716556803
                    <CopyIcon copyValue="1716556803" />
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon />
                    NONCE:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] text-sm">
                    -
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon />
                    POSITION:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] text-sm">
                    154
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon />
                    VERSION:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] text-sm">
                    3
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon />
                    L1 TXN HASH:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] text-sm">
                    Pending
                  </div>
                </div>

                {/* <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon />
                    EXECUTION RESOURCES:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] text-sm text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer break-all">
                    0x07f438bc613360e100abfcb90726dbe2e22266494c487a31c208c8fcf4fdb8ee
                  </div>
                </div> */}

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon />
                    SELECTOR:
                  </div>
                  <div className="flex-1 items-center py-2 border-b border-b-[#383838] text-sm text-[#8BA3DF] hover:text-[#BAD8FD] cursor-pointer">
                    -
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <Icons.InfoIcon />
                    SIGNATURE(S):
                  </div>
                  <div className="flex-1 flex items-center gap-1 md:gap-0 justify-between py-2 border-b border-b-[#383838] text-sm text-[#F5AB35] break-all hover:bg-[#383838] px-2">
                    0x4ecb9e28b81f6601dae53de21b9f247cc5eb060e580defe8ad8ce59e2d2020d
                    <CopyIcon copyValue="0x4ecb9e28b81f6601dae53de21b9f247cc5eb060e580defe8ad8ce59e2d2020d" />
                  </div>
                </div>

                <div className="flex md:items-center gap-2 flex-col md:flex-row md:h-[37px] w-full">
                  <div className="flex items-center gap-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5" />
                  <div className="flex-1 flex items-center gap-1 md:gap-0 justify-between py-2 border-b border-b-[#383838] text-sm text-[#F5AB35] break-all hover:bg-[#383838] px-2">
                    0x4ecb9e28b81f6601dae53de21b9f247cc5eb060e580defe8ad8ce59e2d2020d
                    <CopyIcon copyValue="0x4ecb9e28b81f6601dae53de21b9f247cc5eb060e580defe8ad8ce59e2d2020d" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="events" className="mt-8">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
