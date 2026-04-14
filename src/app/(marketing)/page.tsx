import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Play, ChevronRight, Tv2, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function MarketingPage() {
  return (
    <div className="relative min-h-screen bg-[#050000] flex flex-col overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,rgba(100,0,0,0.2)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(139,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,0,0,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Nav */}
      <header className="relative z-10 container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-crimson-600" strokeWidth={1.5} />
          <span className="font-cinzel font-black text-lg tracking-[0.2em] text-white glow-text-subtle">
            INFERNUM
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/home"
            className="text-muted-foreground text-sm font-cinzel tracking-wider hover:text-white transition-colors"
          >
            Browse
          </Link>
          <Link
            href="/signin"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex items-center">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8 py-20">
            {/* Tag */}
            <div className="flex justify-center">
              <Badge variant="genre" className="px-4 py-1.5 text-xs tracking-[0.3em] animate-fade-up">
                <Flame className="w-3 h-3 mr-1.5 animate-flicker" />
                KOREAN DRAMA STREAMING
              </Badge>
            </div>

            {/* Title */}
            <div className="space-y-2" style={{ animationDelay: "0.1s" }}>
              <h1 className="font-cinzel font-black text-5xl lg:text-7xl xl:text-8xl text-white leading-[0.95] tracking-tight">
                <span className="block glow-text text-crimson-400">BORN IN</span>
                <span className="block text-white">DARKNESS,</span>
                <span className="block glow-text-subtle">STREAM THE FIRE</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="font-crimson text-lg lg:text-xl text-white/60 max-w-xl mx-auto leading-relaxed">
              Enter the realm where shadows tell stories. INFERNUM delivers the finest Korean dramas — 
              revenge, obsession, passion, betrayal — all in cinematic darkness.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/home"
                className={buttonVariants({ variant: "ember", size: "xl" })}
              >
                <Play className="w-5 h-5 fill-white" />
                Enter the Realm
              </Link>
              <Link
                href="/signin"
                className={buttonVariants({ variant: "outline", size: "xl" })}
              >
                Sign In
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Features row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-crimson-950/40">
              {[
                { icon: Tv2, title: "All K-Dramas", desc: "Thousands of titles from the shadows" },
                { icon: Zap, title: "HD Streaming", desc: "Cinematic quality, zero compromise" },
                { icon: Shield, title: "Free Access", desc: "No hidden fees. No chains." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center space-y-1">
                  <div className="flex justify-center mb-2">
                    <div className="w-8 h-8 rounded-sm border border-crimson-900/40 bg-crimson-950/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-crimson-500" strokeWidth={1.5} />
                    </div>
                  </div>
                  <p className="font-cinzel text-xs text-white tracking-wider">{title}</p>
                  <p className="text-xs text-muted-foreground font-crimson">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom quote */}
      <div className="relative z-10 container pb-8 text-center">
        <p className="font-cinzel text-xs tracking-[0.4em] text-crimson-700/60">
          WHERE SHADOWS TELL STORIES
        </p>
      </div>
    </div>
  );
}
