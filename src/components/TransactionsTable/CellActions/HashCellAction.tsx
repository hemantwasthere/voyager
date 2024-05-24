import { CellActionProps } from "../columns";

export const HashCellAction: React.FC<CellActionProps> = ({ data }) => {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
  };

  return <div>{data.hash.slice(0, 6) + "..." + data.hash.slice(6, 10)}</div>;
};
