"use client";

import { WithErrorImage } from "@/components/modified-image";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Data;
  aspectRatio?: "portrait" | "square";
  width: number;
  height: number;
  progress?: number;
  prefetch?: boolean;
}

type Data = {
  title: string;
  image: string;
  slug?: string;
  link?: string;
  description: string;
};

export function Card({
  data,
  progress,
  aspectRatio = "portrait",
  width,
  height,
  className,
  prefetch = true,
  ...props
}: CardProps) {
  const href = data.slug ? `/drama/${data.slug}` : data.link ?? "#";
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn("space-y-2 group", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-sm transition-all duration-300",
          "shadow-card hover:shadow-card-hover",
          "border border-crimson-950/40 hover:border-crimson-800/50",
        )}
      >
        <Link href={href} prefetch={prefetch}>
          <WithErrorImage
            src={data.image}
            alt={data.title}
            width={width}
            height={height}
            errorText={data.title}
            priority
            className={cn(
              "h-full w-full object-cover transition-all duration-500",
              "group-hover:scale-105 group-hover:brightness-75",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
            )}
          />

          {/* Gradient overlay always present */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* Crimson glow on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-crimson-950/70 via-transparent to-transparent transition-opacity duration-300",
              hovered ? "opacity-100" : "opacity-0",
            )}
          />

          {/* Play button */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-300",
              hovered ? "opacity-100 scale-100" : "opacity-0 scale-75",
            )}
          >
            <div className="w-12 h-12 rounded-full bg-crimson-800/90 border border-crimson-600/60 flex items-center justify-center shadow-glow">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* Title overlay on hover */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-2 transition-all duration-300",
              hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            )}
          >
            <p className="font-cinzel text-xs text-white leading-tight line-clamp-2 glow-text-subtle">
              {data.title}
            </p>
          </div>
        </Link>

        {progress ? (
          <Progress
            value={progress}
            className="absolute bottom-0 left-0 h-0.5 bg-crimson-950 [&>div]:bg-crimson-500"
          />
        ) : null}
      </div>

      <div className="space-y-0.5 text-sm px-0.5">
        <h3 className="line-clamp-2 font-medium text-white/90 text-xs leading-snug group-hover:text-crimson-300 transition-colors">
          {data.title}
        </h3>
        {data.description && (
          <p className="text-muted-foreground text-xs">{data.description}</p>
        )}
      </div>
    </div>
  );
}
