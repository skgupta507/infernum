"use client";

import { MainNav } from "@/components/layout/main-nav";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Flame, LogOut, Search, Tv2, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";

interface SiteHeaderProps extends React.ComponentPropsWithoutRef<"header"> {
  sticky?: boolean;
  session?: {
    user?: { name?: string | null; email?: string | null; image?: string | null };
  } | null;
}

export function SiteHeader({ sticky = true, className, session }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "w-full transition-all duration-500 z-50",
        sticky && "sticky top-0",
        scrolled
          ? "bg-[#050000]/95 backdrop-blur-md border-b border-crimson-900/40 shadow-[0_4px_20px_rgba(139,0,0,0.15)]"
          : "bg-transparent",
        className,
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2 group">
          <Flame
            className="w-6 h-6 text-crimson-600 group-hover:text-crimson-400 transition-colors"
            strokeWidth={1.5}
          />
          <span className="font-cinzel font-black text-xl tracking-[0.2em] text-white glow-text-subtle group-hover:glow-text transition-all">
            INFERNUM
          </span>
        </Link>

        {/* Center Nav */}
        <MainNav items={siteConfig.mainNav} />

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <SearchBar />
          <UserNav session={session} />
        </div>
      </div>
    </header>
  );
}

function SearchBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {open ? (
        <form
          action="/search"
          className="flex items-center"
          onBlur={() => setOpen(false)}
        >
          <Input
            autoFocus
            name="q"
            placeholder="Search the abyss..."
            className="w-48 lg:w-64 bg-black/60 border-crimson-900/50 text-sm placeholder:text-muted-foreground focus:border-crimson-700 focus:ring-crimson-700/30 transition-all"
          />
        </form>
      ) : (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpen(true)}
          className="text-muted-foreground hover:text-crimson-400 hover:bg-crimson-950/50"
        >
          <Search className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

function UserNav({ session }: { session?: SiteHeaderProps["session"] }) {
  if (!session) {
    return (
      <Link href="/signin">
        <Button
          size="sm"
          className="bg-crimson-800 hover:bg-crimson-700 text-white border border-crimson-700/50 font-cinzel tracking-wider text-xs btn-glow"
        >
          ENTER
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full ring-1 ring-crimson-900/50 hover:ring-crimson-700">
          <Avatar className="w-8 h-8">
            <AvatarImage src={session.user?.image ?? ""} alt={session.user?.name ?? "User"} />
            <AvatarFallback className="bg-crimson-950 text-crimson-400 text-xs font-cinzel">
              {(session.user?.name ?? "?").slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52 bg-[#0a0000] border border-crimson-900/40 shadow-glow"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <p className="font-cinzel text-sm text-white">{session.user?.name}</p>
            <p className="text-xs text-muted-foreground">{session.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-crimson-950" />
        <DropdownMenuItem asChild>
          <Link href="/home" className="flex items-center gap-2 text-muted-foreground hover:text-crimson-400 cursor-pointer">
            <Tv2 className="w-4 h-4" />
            My Watchlist
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-crimson-950" />
        <DropdownMenuItem asChild>
          <Link href="/signout" className="flex items-center gap-2 text-muted-foreground hover:text-crimson-400 cursor-pointer">
            <LogOut className="w-4 h-4" />
            Leave the Realm
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
