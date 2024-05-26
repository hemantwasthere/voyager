import CustomTooltip from "@/components/CustomTooltip";
import { Icons } from "../../Icons";
import { TransactionsCellActionProps } from "../columns";

export const StatusCell: React.FC<TransactionsCellActionProps> = ({ data }) => {
  return (
    <div>
      {data.status === "ACCEPTED_ON_L2" ? (
        <CustomTooltip tooltipValue="Accepted on L2">
          <Icons.Accepted_On_L2 />
        </CustomTooltip>
      ) : (
        <CustomTooltip tooltipValue="Reverted">
          <Icons.Reverted />
        </CustomTooltip>
      )}
    </div>
  );
};
