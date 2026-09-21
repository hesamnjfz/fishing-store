"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** اسپلش ۲٫۵ثانیه‌ای؛ سایت پشت‌صحنه همزمان لود می‌شود */
export function Splash() {
  const [phase, setPhase] = useState<"enter" | "leave" | "gone">("enter");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // اسکرول قفل؛ رندر و لود صفحه پشت اسپلش ادامه دارد
    document.documentElement.style.overflow = "hidden";

    if (reduce) {
      const t = window.setTimeout(() => {
        setPhase("gone");
        document.documentElement.style.overflow = "";
      }, 400);
      return () => {
        window.clearTimeout(t);
        document.documentElement.style.overflow = "";
      };
    }

    const tLeave = window.setTimeout(() => setPhase("leave"), 1600);
    const tGone = window.setTimeout(() => {
      setPhase("gone");
      document.documentElement.style.overflow = "";
    }, 2500);

    return () => {
      window.clearTimeout(tLeave);
      window.clearTimeout(tGone);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  const leaving = phase === "leave";

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn("fixed inset-0 z-[100] overflow-hidden", leaving && "pointer-events-none")}
    >
      <div
        className={cn(
          "absolute inset-0 bg-[#061428] transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)]",
          leaving && "-translate-y-full",
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_42%,rgba(31,95,224,.28),transparent_68%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-brand-400/50 to-transparent" />
      </div>

      <div
        className={cn(
          "relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
          leaving && "-translate-y-8 scale-95 opacity-0",
        )}
      >
        <p
          className="animate-splash-text font-display text-[0.65rem] font-semibold uppercase tracking-[0.55em] text-brand-300/90 sm:text-xs"
          dir="ltr"
          style={{ animationDelay: "0ms" }}
        >
          Fishing & Hunting
        </p>

        <h1
          className="mt-5 animate-splash-text font-display text-[1.55rem] font-semibold leading-tight tracking-[0.12em] text-white sm:text-4xl md:text-5xl md:tracking-[0.16em]"
          dir="ltr"
          style={{ animationDelay: "120ms" }}
        >
          REZAYI FISHING STORE
        </h1>

        <span
          className="mt-8 h-px w-0 animate-splash-line bg-gradient-to-r from-transparent via-brand-400 to-transparent"
        />

        <div
          className="mt-10 flex animate-splash-text flex-col items-center gap-3"
          style={{ animationDelay: "380ms" }}
        >
          <div
            className="h-9 w-9 animate-spin rounded-full border-[3px] border-white/15 border-t-brand-400"
            aria-hidden="true"
          />
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-white/40" dir="ltr">
            Loading
          </span>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 h-1/3 bg-gradient-to-t from-[#061428] to-transparent transition-opacity duration-500",
          leaving ? "opacity-0" : "opacity-100",
        )}
      />
    </div>
  );
}
