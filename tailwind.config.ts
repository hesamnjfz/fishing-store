import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // آبی برند
        brand: {
          50: "#EEF4FF", 100: "#DCE8FF", 200: "#B9D0FF", 300: "#86AEFF", 400: "#4D84F5",
          500: "#1F5FE0", 600: "#1449BD", 700: "#123C96", 800: "#12336F", 900: "#0E2450", 950: "#071230",
        },
        // زرد تیره (فقط CTA و تاکید)
        gold: { 300: "#F2CB63", 400: "#E5B333", 500: "#D4A017", 600: "#B8860B", 700: "#8F6708" },
        // مشکی و خاکستری‌های سرد
        ink: {
          DEFAULT: "#090B0E", 900: "#090B0E", 800: "#14181D", 700: "#1F252C", 600: "#39424D",
          500: "#5B6673", 400: "#8792A0", 300: "#B4BCC7", 200: "#DDE2E8", 100: "#EDF0F4", 50: "#F5F7FA",
        },
        // قرمز (فقط هشدار، تخفیف، موجودی محدود)
        alert: { DEFAULT: "#D92D2D", 50: "#FDECEC", 600: "#B91F1F" },
      },
      fontFamily: {
        sans: ["Vazirmatn", "Tahoma", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
      },
      keyframes: {
        sway: { "0%,100%": { transform: "rotate(-5deg)" }, "50%": { transform: "rotate(5deg)" } },
        rise: { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "none" } },
        "splash-text": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "none" },
        },
        "splash-line": {
          from: { width: "0" },
          to: { width: "5rem" },
        },
      },
      animation: {
        sway: "sway 3.6s ease-in-out infinite",
        rise: "rise .35s ease-out both",
        "splash-text": "splash-text 0.7s cubic-bezier(.22,1,.36,1) both",
        "splash-line": "splash-line 0.75s 0.28s cubic-bezier(.22,1,.36,1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
