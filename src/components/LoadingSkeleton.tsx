import { Skeleton } from "./ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="w-full">
      <Skeleton className="h-12 w-full rounded-tl-md rounded-tr-md border border-mainBg" />
      <div className="flex flex-col w-full rounded-bl-md rounded-br-md border-x border-b border-mainBg">
        <Skeleton className="h-[52px] border-b border-mainBg" />
        <Skeleton className="h-[52px] border-b border-mainBg" />
        <Skeleton className="h-[52px] border-b border-mainBg" />
        <Skeleton className="h-[52px] border-b border-mainBg" />
        <Skeleton className="h-[52px] rounded-bl-md rounded-br-md" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
