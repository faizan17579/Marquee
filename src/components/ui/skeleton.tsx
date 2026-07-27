import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn("skeleton rounded-xl", className)} {...props} />
  );
}

export { Skeleton };
