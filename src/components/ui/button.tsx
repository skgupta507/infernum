import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-cinzel tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-crimson-600 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-crimson-800 text-white border border-crimson-700/50 hover:bg-crimson-700 hover:border-crimson-600 shadow-glow-sm hover:shadow-glow",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-crimson-900/60 bg-transparent text-foreground hover:border-crimson-700/80 hover:bg-crimson-950/50 hover:text-crimson-400",
        secondary:
          "bg-secondary text-secondary-foreground border border-white/5 hover:bg-secondary/80 hover:border-white/10",
        ghost:
          "text-muted-foreground hover:text-white hover:bg-white/5",
        link: "text-crimson-400 underline-offset-4 hover:underline hover:text-crimson-300",
        ember:
          "bg-gradient-to-r from-crimson-800 to-crimson-700 text-white border border-crimson-600/40 hover:from-crimson-700 hover:to-crimson-600 shadow-glow btn-glow",
      },
      size: {
        default: "h-9 px-5 py-2",
        sm: "h-8 rounded-sm px-3 text-xs",
        lg: "h-11 rounded-sm px-8 text-base",
        xl: "h-14 rounded-sm px-10 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
