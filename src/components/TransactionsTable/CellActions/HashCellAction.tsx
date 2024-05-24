"use client";

import { useRouter } from "next/navigation";

import { CellActionProps } from "../columns";

export const HashCellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  return (
    <p
      className="cursor-pointer"
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
  );
};
