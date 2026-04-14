import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "INFERNUM",
  description:
    "Born in darkness, forged in fire. INFERNUM is the premier destination for Korean drama — where obsession becomes ritual and every story burns eternal. Stream the shadows. Feel the flame.",
  url: "https://infernum.vercel.app",
  links: {
    twitter: "https://twitter.com/sunilbuilds",
    github: "https://github.com/sunilbuilds",
  },
  mainNav: [
    {
      title: "home",
      href: "/home",
    },
    {
      title: "popular",
      href: "/popular",
    },
    {
      title: "genres",
      href: "/genres",
    },
  ],
};

export const placeholderImage = (str: string) => {
  return `https://placehold.co/400x600/0a0000/8B0000?font=montserrat&text=${encodeURI(str)}`;
};
