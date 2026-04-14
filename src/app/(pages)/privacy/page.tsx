import { Metadata } from "next";
import { Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "INFERNUM Privacy Policy — how we handle your data in the dark.",
};

const sections = [
  {
    title: "Data We Collect",
    content: `When you create an account or use INFERNUM, we may collect:
    
• Account information: your name and email address (via Google OAuth)
• Usage data: dramas you watch, watchlist contents, episode progress
• Technical data: IP address, browser type, device type, and cookies
• Activity logs: pages visited, features used, and session duration

We do not collect payment information as INFERNUM is free to use.`,
  },
  {
    title: "How We Use Your Data",
    content: `Your information is used solely to:

• Maintain your account and authenticate your identity
• Save your watchlist and episode progress across devices
• Improve the platform experience based on aggregate usage patterns
• Send critical service notifications (not marketing emails)

We do not sell, trade, or rent your personal information to third parties.`,
  },
  {
    title: "Cookies",
    content: `INFERNUM uses essential cookies to:

• Keep you signed in across sessions
• Remember your watchlist and viewing preferences
• Maintain session security

You may disable cookies in your browser settings. Doing so may limit some functionality, including staying signed in.`,
  },
  {
    title: "Third-Party Services",
    content: `INFERNUM integrates with the following third-party services:

• Google OAuth — for authentication (subject to Google's Privacy Policy)
• Vercel — for hosting and analytics (subject to Vercel's Privacy Policy)
• DramaCool API — for drama metadata and streaming sources

We are not responsible for the privacy practices of these third-party services.`,
  },
  {
    title: "Data Retention",
    content: `We retain your data for as long as your account is active. You may request deletion of your account and all associated data by contacting us. Upon deletion, your watchlist, progress, and account information will be permanently removed within 30 days.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to:

• Access the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your account and data
• Object to processing of your data
• Data portability where technically feasible

To exercise any of these rights, please contact us directly.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy periodically. When we do, we will revise the date at the top of this page. Continued use of INFERNUM after changes constitutes acceptance of the revised policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen">
      <div className="container max-w-3xl mx-auto px-4 py-16 space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-crimson-600" strokeWidth={1.5} />
            <span className="font-cinzel text-xs tracking-[0.3em] text-crimson-600 uppercase">Legal</span>
          </div>
          <h1 className="font-cinzel font-black text-4xl text-white glow-text-subtle">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm font-crimson">
            Last updated: January 2025
          </p>
          <p className="font-crimson text-base text-white/60 leading-relaxed">
            INFERNUM is committed to protecting your privacy. This policy explains what data we collect, 
            how we use it, and your rights as a user of our platform.
          </p>
        </div>

        <div className="infernal-divider" />

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <section key={i} className="space-y-3">
              <h2 className="font-cinzel text-lg font-bold text-white">
                {i + 1}. {section.title}
              </h2>
              <div className="font-crimson text-sm text-white/65 leading-relaxed whitespace-pre-line pl-4 border-l border-crimson-900/30">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="infernal-divider" />

        <p className="font-crimson text-xs text-muted-foreground text-center">
          INFERNUM — Forged in darkness by Sunil. All rights reserved.
        </p>
      </div>
    </div>
  );
}
