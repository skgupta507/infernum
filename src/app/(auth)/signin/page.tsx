import { buttonVariants } from "@/components/ui/button";
import { Flame, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { UserAuthForm } from "./user-auth-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Enter the realm. Sign in to INFERNUM.",
};

export default function SignInPage() {
  return (
    <div className="relative min-h-screen bg-[#050000] flex items-center justify-center overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(80,0,0,0.15)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,0,0,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Back link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back
        </Link>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-4">
        <div className="border border-crimson-900/40 rounded-sm bg-black/80 backdrop-blur-sm p-8 space-y-8 shadow-glow-lg">
          {/* Logo */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-sm border border-crimson-800/50 bg-crimson-950/40 flex items-center justify-center">
                <Flame className="w-6 h-6 text-crimson-500 animate-flicker" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h1 className="font-cinzel font-black text-2xl text-white tracking-[0.15em] glow-text-subtle">
                INFERNUM
              </h1>
              <p className="text-muted-foreground text-xs font-cinzel tracking-widest mt-1">
                ENTER THE REALM
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <UserAuthForm />
          </div>

          {/* Terms note */}
          <p className="text-center text-xs text-muted-foreground font-crimson leading-relaxed">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-crimson-600 hover:text-crimson-400 underline underline-offset-2 transition-colors">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-crimson-600 hover:text-crimson-400 underline underline-offset-2 transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
