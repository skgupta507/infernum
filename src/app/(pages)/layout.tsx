import { AshBackground } from "@/components/ui/ash-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { auth } from "@/lib/auth";

export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="relative flex min-h-screen flex-col bg-[#050000]">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(100,0,0,0.12)_0%,transparent_60%)]" />
      </div>

      <AshBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <SiteHeader sticky session={session} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
