import { Loader2 } from "lucide-react";

interface SpinnerLoadingProps {
  width?: number;
  height?: number;
  color?: string;
}

export const SpinnerLoading = ({
  width = 24,
  height = 24,
  color = "text-blue-500",
}: SpinnerLoadingProps) => {
  return (
    <div className="flex justify-center items-center">
      <Loader2
        className={`animate-spin ${color}`}
        width={width}
        height={height}
      />
    </div>
  );
};
