"use client";

import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname();

  if (!items?.length) return null;

  return (
    <nav className="hidden md:flex items-center gap-1">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-4 py-2 font-cinzel text-xs tracking-[0.2em] uppercase transition-all rounded-sm",
              active
                ? "text-crimson-400 bg-crimson-950/60 glow-text-subtle"
                : "text-muted-foreground hover:text-white hover:bg-white/5",
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
