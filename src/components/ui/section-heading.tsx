import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  slogan?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, slogan, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-4", className)}>
      <div className="flex items-center gap-2 mb-1">
        <Flame className="w-4 h-4 text-crimson-600" strokeWidth={1.5} />
        <h2 className="font-cinzel font-bold text-xl text-white tracking-wide glow-text-subtle">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-muted-foreground text-sm font-crimson pl-6">{subtitle}</p>
      )}
      {slogan && (
        <p className="text-crimson-600/70 text-xs font-cinzel tracking-widest italic pl-6 mt-0.5">
          "{slogan}"
        </p>
      )}
    </div>
  );
}
