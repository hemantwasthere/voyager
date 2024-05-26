import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "./ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <>
      {" "}
      <h1 className="text-2xl text-white font-normal align-baseline">
        Transactions
      </h1>
      <p className="mt-2 text-sm font-light text-[#cacaca] leading-[1.4]">
        A list of transactions on starknet
      </p>
      <div className="overflow-x-auto mb-6 mt-8">
        <div className="w-[500px] h-[33px] flex border border-[#4B4B4B]">
          {[...Array(5)].map((item) => (
            <div
              className="w-full h-full rounded-none text-sm border-r border-[#4B4B4B] last:border-r-[0px] p-1 flx items-center justify-center"
              key={item}
            >
              <Skeleton className="w-full h-full bg-[#5E5E5E] rounded-none" />
            </div>
          ))}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-[#4B4B4B] border-t hover:bg-[#4B4B4B]">
            <TableHead className="text-[0.75rem] text-[#AAAAAA] h-[38px]">
              STATUS
            </TableHead>
            <TableHead className="text-[0.75rem] text-[#AAAAAA] h-[38px]">
              HASH
            </TableHead>
            <TableHead className="text-[0.75rem] text-[#AAAAAA] h-[38px]">
              TYPE
            </TableHead>
            <TableHead className="text-[0.75rem] text-[#AAAAAA] h-[38px]">
              BLOCK
            </TableHead>
            <TableHead className="text-[0.75rem] text-[#AAAAAA] h-[38px]">
              AGE
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="border-b border-[#4B4B4B]">
          {[...Array(10)].map((row) => (
            <TableRow
              key={row}
              className="border-[#4B4B4B] hover:bg-[#4B4B4B]"
              // ref={flatData.length === i + 1 ? lastElement : null}
            >
              {[...Array(5)].map((cell) => (
                <TableCell key={cell}>
                  <Skeleton className="bg-[#5E5E5E] w-full h-4 rounded-sm" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default LoadingSkeleton;
