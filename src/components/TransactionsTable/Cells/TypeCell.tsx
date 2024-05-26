import { Icons } from "../../Icons";
import { TransactionsCellActionProps } from "../columns";

export const TypeCell: React.FC<TransactionsCellActionProps> = ({ data }) => {
  if (data.type === "INVOKE") {
    return (
      <div className="text-sm font-[300] py-0.5 px-[10px] border border-[#2E4C3C] bg-[#202E26] text-[#83F3BB] rounded-sm w-fit">
        {data.type}
      </div>
    );
  }

  if (data.type === "DECLARE") {
    return (
      <div className="text-sm font-[300] py-0.5 px-[10px] border border-[#6A7C08] bg-[#202E26] text-[#FEFFB5] rounded-sm w-fit">
        {data.type}
      </div>
    );
  }

  if (data.type === "_DEPLOY") {
    return (
      <div className="text-sm font-[300] py-0.5 px-[10px] border border-[#3C4F6E] bg-[#223555] text-[#D2E4FF] rounded-sm w-fit">
        DEPLOY
      </div>
    );
  }

  if (data.type === "DEPLOY_ACCOUNT") {
    return (
      <div className="text-sm font-[300] py-0.5 px-[10px] border border-[#3C4F6E] bg-[#223555] text-[#D2E4FF] rounded-sm w-fit">
        {data.type}
      </div>
    );
  }

  if (data.type === "L1_HANDLER") {
    return (
      <div className="text-sm font-[300] py-0.5 px-[10px] border border-[#5E5E5E] bg-[#383838] text-[#FFFFFF] rounded-sm w-fit">
        {data.type}
      </div>
    );
  }

  return <div>{data.type}</div>;
};
