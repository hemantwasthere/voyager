"use client";

import { Copy } from "lucide-react";
import { Roboto } from "next/font/google";
import { useState } from "react";

import { cn } from "@/lib/utils";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const CopyIcon = ({
  className,
  copyValue,
}: {
  className?: string;
  copyValue: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className={cn(roboto.className, "relative cursor-pointer")}>
      <Copy
        onClick={handleCopy}
        className={cn(
          className,
          "h-3.5 w-3.5 text-[#7E7E7E] hover:text-[#999898]"
        )}
      />
      {copied && (
        <p className="absolute text-sm left-6 -top-1 px-1 bg-[#1B1B1B] text-white rounded-sm break-normal flex items-center gap-1 border border-[#4B4B4B]">
          Copied <span>!</span>
        </p>
      )}
    </div>
  );
};

export default CopyIcon;
