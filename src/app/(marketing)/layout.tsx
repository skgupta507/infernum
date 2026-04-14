import { AshBackground } from "@/components/ui/ash-background";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <AshBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
