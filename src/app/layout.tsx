import { Analytics } from "@/components/analytics";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { fontHeading, fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#050000",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s • ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Korean Drama",
    "K-Drama Streaming",
    "INFERNUM",
    "Watch K-Drama",
    "Korean Series",
    "Dark Drama",
    "Revenge Drama",
    "Thriller",
  ],
  authors: [{ name: "Sunil" }],
  creator: "Sunil",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          fontSans.variable,
          fontMono.variable,
          fontHeading.variable,
          "min-h-screen bg-[#050000] font-crimson antialiased",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          {children}
          <TailwindIndicator />
          <Analytics />
          <Toaster
            toastOptions={{
              style: {
                background: '#0a0000',
                border: '1px solid rgba(139,0,0,0.4)',
                color: '#f5f5f5',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
