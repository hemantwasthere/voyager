import CustomTooltip from "@/components/CustomTooltip";
import { Icons } from "../../Icons";
import { TransactionsCellActionProps } from "../columns";

export const StatusCell: React.FC<TransactionsCellActionProps> = ({ data }) => {
  return data.status === "ACCEPTED_ON_L2" ? (
    <CustomTooltip tooltipValue="Accepted on L2">
      <div className="w-fit cursor-pointer">
        <Icons.Accepted_On_L2 />
      </div>
    </CustomTooltip>
  ) : (
    <CustomTooltip tooltipValue="Reverted">
      <div className="w-fit cursor-pointer">
        <Icons.Reverted />
      </div>
    </CustomTooltip>
  );
};
