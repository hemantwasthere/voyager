import { Icons } from "../../Icons";
import { CellActionProps } from "../columns";

export const TypeCellAction: React.FC<CellActionProps> = ({ data }) => {
  return <div>{data.type}</div>;
};
