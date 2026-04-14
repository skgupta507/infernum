# 🔥 INFERNUM — Korean Drama Streaming Platform

> *"Born in darkness, stream the fire."*

INFERNUM is a premium Korean drama streaming platform rebuilt with a dark supernatural identity. Powered by Next.js 15, featuring a crimson/ember aesthetic, animated ash particles, and a cinematic UI designed to feel as intense as the dramas within.

---

## 🎨 Brand Identity

| Element | Value |
|---------|-------|
| **Name** | INFERNUM |
| **Tagline** | "Born in Darkness, Stream the Fire" |
| **Colors** | `#050000` (abyss black) + `#8B0000` (deep crimson) + `#FF4500` (ember) |
| **Typography** | Cinzel (headings, gothic serifs) + Crimson Pro (body, elegant) |
| **Theme** | Dark demon / fire / ash / shadow |
| **Creator** | Sunil |

### Slogans
- *"Born in Darkness, Stream the Fire"*
- *"Where Shadows Tell Stories"*
- *"Unleash the Drama Within"*
- *"Enter the Realm of Obsession"*
- *"Arise from the Shadows. Forged in Darkness by Sunil."*

---

## ⚙️ Dependency Upgrades

All dependencies upgraded to latest stable versions:

| Package | Old | New |
|---------|-----|-----|
| `next` | 14.2.5 | ^15.3.0 |
| `react` | ^18.3.1 | ^19.1.0 |
| `react-dom` | ^18.3.1 | ^19.1.0 |
| `drizzle-orm` | ^0.32.0 | ^0.41.0 |
| `drizzle-kit` | ^0.23.0 | ^0.30.4 |
| `next-auth` | 5.0.0-beta.19 | 5.0.0-beta.25 |
| `lucide-react` | ^0.412.0 | ^0.488.0 |
| `framer-motion` | ^11.3.8 | ^12.6.5 |
| `sonner` | ^1.5.0 | ^2.0.3 |
| `embla-carousel` | 8.1.7 | ^8.6.0 |
| `tailwind-merge` | ^2.4.0 | ^3.2.0 |

### Breaking Changes Fixed
- ✅ Next.js 15: `params` is now a `Promise` — all page components updated to `await params`
- ✅ React 19: updated all component patterns for compatibility
- ✅ Drizzle ORM: updated query patterns for new API
- ✅ Removed `next-pwa` (incompatible with Next.js 15), removed `@irsyadadl/paranoid`, `@loglib/tracker`, `@unkey/nextjs`

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── signin/          # Dark-themed sign in with crimson card
│   │   └── signout/         # Confirmation modal
│   ├── (marketing)/
│   │   └── page.tsx         # Landing page with hero + features
│   ├── (pages)/
│   │   ├── layout.tsx       # Ash background + header + footer
│   │   ├── home/            # Homepage with hero carousel + sections
│   │   ├── drama/[slug]/    # Drama detail with backdrop + episode grid
│   │   ├── watch/[slug]/    # Video player with cinematic controls
│   │   ├── search/          # Live search page
│   │   ├── popular/         # Infinite scroll popular grid
│   │   ├── about/           # Platform story + creator credit
│   │   ├── privacy/         # Privacy policy
│   │   └── terms/           # Terms & conditions
│   └── layout.tsx           # Root layout (dark-forced, Cinzel + Crimson Pro)
├── components/
│   ├── card.tsx             # Drama card with flame hover + play overlay
│   ├── layout/
│   │   ├── site-header.tsx  # Scroll-reactive navbar with glow logo
│   │   ├── site-footer.tsx  # Cinematic footer with Sunil signature
│   │   └── main-nav.tsx     # Active-state nav links
│   └── ui/
│       ├── ash-background.tsx   # Canvas ash particle animation
│       ├── section-heading.tsx  # Flame icon + cinzel heading
│       ├── button.tsx           # Crimson variants incl. "ember" pulse
│       ├── badge.tsx            # Genre/tag badges
│       ├── input.tsx            # Dark-bordered inputs
│       └── skeleton.tsx         # Crimson-tinted loading skeletons
├── styles/
│   └── globals.css          # Full INFERNUM theme: glow, ash, smoke, scrollbars
└── config/
    └── site.ts              # INFERNUM branding + nav config
```

---

## 🎨 Design System

### Color Palette
```css
--background:    #050000   /* Pure abyss */
--foreground:    #f2f2f2   /* Pale ash */
--primary:       #8B0000   /* Deep crimson */
--accent:        #a80000   /* Ember red */
--muted:         #1a0000   /* Shadow */
```

### CSS Utilities
| Class | Effect |
|-------|--------|
| `.glow-text` | Full crimson text glow |
| `.glow-text-subtle` | Soft red text shadow |
| `.glow-border` | Red glowing border |
| `.card-flame` | Flame overlay on hover |
| `.btn-glow` | Pulsing red button glow |
| `.infernal-divider` | Gradient red divider line |
| `.smoke-bg` | Smoke/ember background |
| `.vignette` | Cinematic edge darkening |

### Fonts
- **Cinzel** — All headings, navigation, UI labels. Gothic serif, Roman character. Conveys power.
- **Crimson Pro** — Body text, descriptions, subtitles. Elegant, readable, literary.

---

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Fill in: DATABASE_URL, AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, KV_*

# Run database migrations
pnpm db generate
pnpm db push   # or migrate

# Start development server
pnpm dev       # runs on :1999
```

---

## 🌐 Pages Overview

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero with Enter the Realm CTA |
| `/home` | Main app — hero carousel, watchlist, trending, recent |
| `/drama/[slug]` | Drama detail — backdrop, episodes, watchlist |
| `/watch/[slug]` | Video player — cinematic controls, progress tracking |
| `/search` | Full-text search with grid results |
| `/popular` | Popular dramas with infinite scroll |
| `/about` | Platform story + Sunil creator credit |
| `/privacy` | Privacy policy |
| `/terms` | Terms & conditions |
| `/signin` | OAuth sign in — crimson card |
| `/signout` | Sign out confirmation |

---

## ✨ Features

- 🔥 **Animated ash particles** — Canvas-based floating ash/ember background
- 🎬 **Cinematic hero carousel** — Full-width banner with gradient overlays
- 💀 **Flame card hover** — Cards glow red with play button overlay
- 🌑 **Scroll-reactive navbar** — Transparent → solid on scroll
- 📺 **Episode progress tracking** — Continue watching from where you left off
- ❤️ **Watchlist system** — Add/remove series with server actions
- 🔍 **Search** — Live search across the drama catalog
- 📱 **Fully responsive** — Mobile-first design
- 🌑 **Forced dark mode** — INFERNUM is always dark. Always.

---

## 🦶 Footer Signature

> *"Arise from the shadows. Forged in darkness by* ***SUNIL****."*

---

*INFERNUM — Where shadows tell stories.*
