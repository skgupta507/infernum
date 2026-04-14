import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-sm border border-crimson-900/40 bg-black/60 px-3 py-1 text-sm text-foreground shadow-sm transition-all",
        "placeholder:text-muted-foreground/50",
        "focus-visible:outline-none focus-visible:border-crimson-700/70 focus-visible:ring-1 focus-visible:ring-crimson-700/30",
        "hover:border-crimson-900/60",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
