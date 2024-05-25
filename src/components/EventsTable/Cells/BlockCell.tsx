import Link from "next/link";

import CopyIcon from "@/components/Copy";
import { EventsCellActionProps } from "../columns";

const BlockCellAction: React.FC<EventsCellActionProps> = ({ data }) => {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`https://voyager.online/block/${data.block}`}
        className="text-sm text-[#8BA3DF] hover:text-[#BAD8FD]"
      >
        {data.block}
      </Link>
      <CopyIcon copyValue={data.block.toString()} />
    </div>
  );
};

export default BlockCellAction;
