import { Flame, Tv2, Eye, Shield } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind INFERNUM — forged in darkness by Sunil.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(100,0,0,0.2)_0%,transparent_70%)]" />
        <div className="relative z-10 container text-center space-y-6 max-w-3xl mx-auto">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-sm border border-crimson-800/50 bg-crimson-950/30 flex items-center justify-center shadow-glow">
              <Flame className="w-8 h-8 text-crimson-500 animate-flicker" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-cinzel font-black text-4xl lg:text-6xl text-white glow-text">
            ABOUT INFERNUM
          </h1>
          <p className="font-cinzel text-xs tracking-[0.4em] text-crimson-600">
            WHERE SHADOWS TELL STORIES
          </p>
        </div>
      </div>

      <div className="container max-w-3xl mx-auto px-4 pb-20 space-y-16">
        <div className="infernal-divider" />

        {/* Origin story */}
        <section className="space-y-6">
          <h2 className="font-cinzel text-2xl font-bold text-white glow-text-subtle">The Origin</h2>
          <div className="font-crimson text-base text-white/70 leading-relaxed space-y-4">
            <p>
              INFERNUM was not built — it was <em>summoned</em>. From the deepest conviction that Korean drama deserves 
              more than a plain white interface and a list of thumbnails, a vision emerged: a streaming experience as 
              dark, powerful, and emotionally consuming as the stories it carries.
            </p>
            <p>
              Korean drama is not passive entertainment. It is obsession. It is four AM, one more episode, 
              a storyline that possesses you. INFERNUM was designed to honor that. Every visual choice — 
              the crimson glow, the ash in the dark, the gothic typography — reflects the intensity of the 
              stories within.
            </p>
            <p>
              Born from the vision of <strong className="text-white font-semibold">Sunil</strong>, 
              built with Next.js and deployed into the void. This is not just a streaming site. This is a realm.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="space-y-6">
          <h2 className="font-cinzel text-2xl font-bold text-white glow-text-subtle">Our Creed</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Tv2,
                title: "Immersion First",
                desc: "Every design decision serves one purpose: pulling you deeper into the story. No distractions. No clutter. Just drama.",
              },
              {
                icon: Eye,
                title: "No Compromises",
                desc: "INFERNUM streams the finest K-dramas in the highest quality achievable. Because legends deserve legendary treatment.",
              },
              {
                icon: Shield,
                title: "Free Forever",
                desc: "Drama is for everyone. INFERNUM will never hide its content behind paywalls. The realm is open to all who dare enter.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="border border-crimson-900/30 rounded-sm p-5 bg-crimson-950/10 space-y-3 hover:border-crimson-800/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-sm border border-crimson-900/40 flex items-center justify-center bg-crimson-950/40">
                  <Icon className="w-4 h-4 text-crimson-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-cinzel text-sm text-white tracking-wider">{title}</h3>
                <p className="text-xs text-muted-foreground font-crimson leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Creator credit */}
        <section className="relative border border-crimson-900/40 rounded-sm p-8 bg-gradient-to-br from-crimson-950/20 to-black overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_100%,rgba(80,0,0,0.2)_0%,transparent_60%)]" />
          <div className="relative z-10 space-y-4">
            <p className="font-cinzel text-xs tracking-[0.3em] text-crimson-600 uppercase">Creator</p>
            <h3 className="font-cinzel text-3xl font-black text-white glow-text">SUNIL</h3>
            <p className="font-crimson text-base text-white/60 leading-relaxed max-w-lg">
              Developer, designer, and Korean drama devotee. Sunil built INFERNUM to prove that 
              a streaming platform can be as cinematic and emotionally resonant as the content it delivers. 
              Every pixel of this realm was placed with intention.
            </p>
            <p className="font-cinzel text-xs tracking-widest text-crimson-700 italic">
              "Arise from the shadows. Forged in darkness by Sunil."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
