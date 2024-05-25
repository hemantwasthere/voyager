"use client";

import { useRouter } from "next/navigation";

import CopyIcon from "@/components/Copy";
import { cn } from "@/lib/utils";
import { TransactionsCellActionProps } from "../columns";

export const HashCellAction: React.FC<TransactionsCellActionProps> = ({
  data,
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <p
        className={cn("text-sm text-[#8BA3DF] hover:text-[#BAD8FD]", {
          "cursor-pointer":
            data.type === "INVOKE" &&
            data.version === "0x1" &&
            data.status === "ACCEPTED_ON_L2",
        })}
        onClick={() => {
          if (
            data.type === "INVOKE" &&
            data.version === "0x1" &&
            data.status === "ACCEPTED_ON_L2"
          )
            router.push(`/tx/${data.hash}`);
        }}
      >
        {data.hash.slice(0, 6) + "..." + data.hash.slice(6, 10)}
      </p>
      <CopyIcon copyValue={data.hash} />
    </div>
  );
};
