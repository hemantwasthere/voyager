import { Icons } from "../../Icons";
import { TransactionsCellActionProps } from "../columns";

export const StatusCell: React.FC<TransactionsCellActionProps> = ({ data }) => {
  return (
    <div>
      {data.status === "ACCEPTED_ON_L2" ? (
        <Icons.Accepted_On_L2 />
      ) : (
        <Icons.Reverted />
      )}
    </div>
  );
};
