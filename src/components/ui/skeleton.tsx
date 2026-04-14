import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-crimson-950/40 border border-crimson-950/30",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
