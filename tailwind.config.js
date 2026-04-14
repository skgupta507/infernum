/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        crimson: {
          50:  "#fff0f0",
          100: "#ffd6d6",
          200: "#ffadad",
          300: "#ff7070",
          400: "#ff3333",
          500: "#cc0000",
          600: "#990000",
          700: "#7a0000",
          800: "#5c0000",
          900: "#3d0000",
          950: "#200000",
        },
        ember: {
          DEFAULT: "#ff4500",
          dim: "#cc3700",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        mono: ["var(--font-mono)"],
        sans: ["var(--font-geist-sans)", "Crimson Pro", "Georgia", "serif"],
        heading: ["Cinzel", "var(--font-heading)", "serif"],
        cinzel: ["Cinzel", "serif"],
        crimson: ["Crimson Pro", "Georgia", "serif"],
      },
      backgroundImage: {
        "infernal-gradient": "linear-gradient(135deg, #050000 0%, #1a0000 50%, #050000 100%)",
        "crimson-glow": "radial-gradient(ellipse at center, rgba(139,0,0,0.4) 0%, transparent 70%)",
        "hero-vignette": "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(139,0,0,0.4)",
        "glow": "0 0 20px rgba(139,0,0,0.5), 0 0 40px rgba(100,0,0,0.2)",
        "glow-lg": "0 0 30px rgba(200,0,0,0.6), 0 0 60px rgba(139,0,0,0.3)",
        "card": "0 4px 20px rgba(0,0,0,0.8), 0 0 0 1px rgba(80,0,0,0.3)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.9), 0 0 0 1px rgba(139,0,0,0.5), 0 0 20px rgba(100,0,0,0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
          "75%": { opacity: "0.95" },
        },
        "ember-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.8" },
          "100%": { transform: "translateY(-60px) scale(0)", opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(139,0,0,0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(200,0,0,0.8), 0 0 40px rgba(139,0,0,0.4)" },
        },
        "border-flame": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "flicker": "flicker 3s ease-in-out infinite",
        "ember-rise": "ember-rise 2s ease-out forwards",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
