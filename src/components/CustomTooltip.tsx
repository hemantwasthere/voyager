import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CustomTooltipProps {
  tooltipValue: string;
  tooltipClassName?: string;
  children: React.ReactNode;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  tooltipValue,
  tooltipClassName,
  children,
}) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={cn(
            "bg-white font-normal text-black rounded-md px-2 text-xs py-1 bg-white/90",
            tooltipClassName
          )}
        >
          <TooltipArrow fill="white" />
          <p>{tooltipValue}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
