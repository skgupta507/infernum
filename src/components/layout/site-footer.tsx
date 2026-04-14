import Link from "next/link";
import { Flame, Github, Twitter, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-crimson-950/60 bg-[#050000] relative overflow-hidden">
      {/* ambient glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson-700/60 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-crimson-950/20 blur-3xl pointer-events-none" />

      <div className="container py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-crimson-600" strokeWidth={1.5} />
              <span className="font-cinzel font-black text-lg tracking-[0.2em] text-white glow-text-subtle">
                INFERNUM
              </span>
            </div>
            <p className="text-muted-foreground text-sm font-crimson leading-relaxed max-w-xs">
              Where shadows tell stories. Stream the finest Korean dramas in the darkest corner of the web.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded border border-crimson-900/40 flex items-center justify-center text-muted-foreground hover:text-crimson-400 hover:border-crimson-700/60 hover:shadow-glow-sm transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-xs tracking-[0.3em] text-crimson-500 uppercase">Navigate</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/home" },
                { label: "Popular", href: "/popular" },
                { label: "Search", href: "/search" },
                { label: "Sign In", href: "/signin" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-crimson-400 transition-colors font-crimson"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-xs tracking-[0.3em] text-crimson-500 uppercase">Legal</h4>
            <ul className="space-y-2">
              {[
                { label: "About INFERNUM", href: "/about" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-crimson-400 transition-colors font-crimson"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="infernal-divider" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
          <p className="text-xs text-muted-foreground font-crimson">
            © {new Date().getFullYear()} INFERNUM. All rights reserved.
          </p>
          {/* Signature */}
          <p className="font-cinzel text-xs tracking-widest text-center">
            <span className="text-crimson-700">ARISE FROM THE SHADOWS.</span>{" "}
            <span className="text-crimson-500 animate-flicker">
              FORGED IN DARKNESS BY{" "}
              <span className="text-crimson-400 glow-text-subtle font-bold">SUNIL</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
