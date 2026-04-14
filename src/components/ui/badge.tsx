import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-cinzel tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-crimson-800/60 bg-crimson-950/60 text-crimson-400 hover:border-crimson-700",
        secondary:
          "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10",
        destructive:
          "border-destructive/30 bg-destructive/20 text-destructive",
        outline:
          "border-border text-foreground",
        genre:
          "border-crimson-900/50 bg-crimson-950/40 text-crimson-500 hover:bg-crimson-900/30 cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
