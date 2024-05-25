import Link from "next/link";

import { EventsCellActionProps } from "../columns";

const IdCellAction: React.FC<EventsCellActionProps> = ({ data }) => {
  return (
    <Link
      href={`https://voyager.online/event/${data.id}`}
      className="text-sm text-[#8BA3DF] hover:text-[#BAD8FD]"
    >
      {data.id}
    </Link>
  );
};

export default IdCellAction;
