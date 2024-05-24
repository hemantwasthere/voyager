import { Icons } from "../../Icons";
import { CellActionProps } from "../columns";

export const StatusCellAction: React.FC<CellActionProps> = ({ data }) => {
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
