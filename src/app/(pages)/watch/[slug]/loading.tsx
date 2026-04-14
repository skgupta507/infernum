import { Flame } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050000]">
      <div className="text-center space-y-4">
        <Flame
          className="w-10 h-10 text-crimson-700 animate-flicker mx-auto"
          strokeWidth={1.5}
        />
        <p className="font-cinzel text-xs tracking-[0.3em] text-muted-foreground">
          SUMMONING THE STREAM…
        </p>
      </div>
    </div>
  );
}
