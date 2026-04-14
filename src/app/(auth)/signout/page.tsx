import { buttonVariants } from "@/components/ui/button";
import { Flame, LogOut } from "lucide-react";
import Link from "next/link";
import { SignOutButtons } from "./buttons";

export default function SignOutPage() {
  return (
    <div className="relative min-h-screen bg-[#050000] flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(60,0,0,0.2)_0%,transparent_70%)]" />
      <div className="relative z-10 w-full max-w-sm mx-auto px-4">
        <div className="border border-crimson-900/40 rounded-sm bg-black/80 backdrop-blur-sm p-8 space-y-8 shadow-glow text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-sm border border-crimson-800/40 bg-crimson-950/30 flex items-center justify-center">
              <LogOut className="w-6 h-6 text-crimson-600" strokeWidth={1.5} />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="font-cinzel font-bold text-xl text-white">Leave the Realm?</h1>
            <p className="text-muted-foreground text-sm font-crimson">
              The shadows will await your return.
            </p>
          </div>
          <SignOutButtons />
          <Link href="/home" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Stay in the realm
          </Link>
        </div>
      </div>
    </div>
  );
}
