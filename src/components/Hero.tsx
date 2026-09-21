"use client";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { catById } from "@/lib/data";
import { toFa } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import { Contours } from "./Contours";

const MAX_DEPTH = 40;
const TICKS = [0, 10, 20, 30, 40];

/** آیکون‌های خطی تکنیک — سبک هندسی، هم‌راستا با بافت سونار برند */
function IconSpin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IconCarp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3.5 12.5c3.2-4.2 7-6.2 11.2-5.4 2.4.5 4.3 1.8 5.8 3.6-1.5 1.9-3.4 3.2-5.8 3.7-4.2.8-8-.9-11.2-5.1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="15.2" cy="11.2" r="1" fill="currentColor" />
      <path d="M8.2 10.2c.9.6 1.5 1.5 1.5 2.5s-.6 1.9-1.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M19.8 9.6l1.8-2.2M19.8 14.8l1.8 2.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IconSurf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 16.5c2.2-2.4 4.4-3.6 6.6-3.6s4.4 1.2 6.6 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 19.2c1.6-1.6 3.2-2.4 4.8-2.4s3.2.8 4.8 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".7" />
      <path d="M14.5 4.5l.8 3.2 3.2.8-3.2.8-.8 3.2-.8-3.2-3.2-.8 3.2-.8.8-3.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function IconJig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3.5v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 7.7c2.8 2.6 3.6 6.2 1.8 9.2-.4.7-1.1 1.1-1.8 1.1s-1.4-.4-1.8-1.1c-1.8-3-1-6.6 1.8-9.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10.4 18.2v2.1a1.6 1.6 0 1 0 3.2-.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconTruck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3.5 15.5V7.8A1.8 1.8 0 0 1 5.3 6h8.4a1.8 1.8 0 0 1 1.8 1.8v7.7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15.5 10h3.1l2.4 2.6v2.9h-5.5V10Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="7.2" cy="16.8" r="1.7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="16.8" r="1.7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function IconShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3.5 5.5 6.2v5.1c0 4.1 2.7 7.1 6.5 8.2 3.8-1.1 6.5-4.1 6.5-8.2V6.2L12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.2 12.1 11 13.9l3.8-3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconReturn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7.2 8.2H4.5V5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 8.5a7.2 7.2 0 1 1 .6 6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 8.2v4.2l2.6 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconDepth({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.5" opacity=".45" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" opacity=".7" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <path d="M12 3.8v2.4M12 17.8v2.4M3.8 12h2.4M17.8 12h2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function JigLure() {
  return (
    <svg viewBox="0 0 32 76" className="h-14 w-7 drop-shadow-[0_0_12px_rgba(229,179,51,.5)]" fill="none" strokeLinecap="round" aria-hidden="true">
      <circle cx="16" cy="4" r="2.8" stroke="#fff" strokeWidth="1.5" />
      <path d="M16 7 C24 20 24 40 16 54 C8 40 8 20 16 7 Z" fill="#E5B333" />
      <path d="M16 12 C20 24 20 38 16 48" stroke="#fff" strokeOpacity=".55" strokeWidth="1.8" />
      <path d="M13 54 v10 a4 4 0 1 0 6 -1" stroke="#fff" strokeWidth="1.6" />
      <path d="M9 30 v22 a3 3 0 1 0 5 1" stroke="#fff" strokeWidth="1.4" strokeOpacity=".7" />
    </svg>
  );
}

const TECH: {
  id: string;
  label: string;
  depth: number;
  target: string;
  kit: string[];
  icon: (p: { className?: string }) => ReactNode;
}[] = [
  { id: "spin", label: "اسپین", depth: 5, target: "ماهیان شکارچی ساحلی و آب‌های شیرین", kit: ["rod-spin", "reel-spin", "line-braid"], icon: IconSpin },
  { id: "carp", label: "کپور", depth: 3, target: "کپور و ماهیان دریاچه‌ای", kit: ["rod-carp", "reel-spin", "hook-single"], icon: IconCarp },
  { id: "surf", label: "سرف‌کست", depth: 12, target: "ماهیان کف‌زی نزدیک ساحل", kit: ["rod-surf", "reel-sea", "hook-lead"], icon: IconSurf },
  { id: "jig", label: "جیگ", depth: 30, target: "ماهیان درشت آب‌های عمیق", kit: ["rod-jig", "reel-sea", "lure-jig"], icon: IconJig },
];

const TRUST = [
  { label: "ارسال", value: "پست و تیپاکس", icon: IconTruck },
  { label: "پرداخت", value: "درگاه امن", icon: IconShield },
  { label: "مرجوعی", value: "از پنل کاربری", icon: IconReturn },
];

export function Hero() {
  const { goShop } = useStore();
  const [t, setT] = useState(TECH[0]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const y = (d: number) => (d / MAX_DEPTH) * 100;

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_70%_at_15%_100%,theme(colors.brand.900)/80,transparent_68%),radial-gradient(42%_50%_at_90%_0%,theme(colors.brand.800)/35,transparent_65%)]" />
      <Contours className="absolute inset-0 -z-10 h-full w-full opacity-90" />
      {/* خط تاکید برند در لبه بالا */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-brand-400/50 to-transparent" aria-hidden="true" />

      <div className="container-x grid gap-7 py-8 sm:py-10 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-10 lg:py-12">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-brand-300">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-brand-500/15 ring-1 ring-brand-400/30">
              <IconDepth className="h-3.5 w-3.5" />
            </span>
            فروشگاه تخصصی ماهیگیری و شکاری
          </p>

          <h1 className="mt-3 text-[1.85rem] font-black leading-[1.3] sm:text-[2.35rem] lg:text-[2.75rem] lg:leading-[1.25]">
            تجهیزات حرفه‌ای،
            <br />
            <span className="text-brand-200">برای صید و شکار</span>
          </h1>

          <p className="mt-3.5 max-w-lg text-sm leading-7 text-ink-300 sm:text-[0.95rem] sm:leading-7">
            لوازم ماهیگیری و شکاری از برندهای معتبر — موجودی واقعی انبار و ارسال به سراسر ایران.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button onClick={() => goShop()} className="btn-brand !px-5 !py-2.5 !text-sm">
              مشاهده محصولات
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button onClick={() => goShop({ onSale: true })} className="btn-ghost-dark !border-alert/50 !px-5 !py-2.5 !text-sm hover:!border-alert hover:!bg-alert/15">
              تخفیف‌های فعال
            </button>
          </div>

          <dl className="mt-6 grid max-w-md grid-cols-3 gap-2.5 sm:gap-3">
            {TRUST.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-2.5 sm:px-3">
                <dt className="flex items-center gap-1.5 text-[0.65rem] font-medium text-ink-400 sm:text-xs">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brand-500/15 text-brand-300">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {label}
                </dt>
                <dd className="mt-1.5 text-[0.7rem] font-bold leading-5 text-white sm:text-xs">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* پنل سونار: عمق بر اساس تکنیک */}
        <div className="relative h-[26rem] overflow-hidden rounded-2xl border border-brand-500/35 bg-gradient-to-b from-brand-900/80 via-brand-950 to-ink shadow-[0_24px_60px_-28px_rgba(31,95,224,.55)] sm:h-[28rem]">
          <Contours className="absolute inset-0 h-full w-full opacity-60" opacity={0.26} />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,theme(colors.brand.500)/18,transparent_55%)]" aria-hidden="true" />

          <div role="tablist" aria-label="نوع ماهیگیری" className="absolute inset-x-2.5 top-2.5 z-10 grid grid-cols-4 gap-1 rounded-xl bg-ink/55 p-1 ring-1 ring-white/10 backdrop-blur-md">
            {TECH.map((x) => {
              const Icon = x.icon;
              const on = t.id === x.id;
              return (
                <button
                  key={x.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setT(x)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-[0.68rem] font-bold transition-colors sm:text-xs",
                    on ? "bg-brand-500 text-white shadow-sm shadow-brand-900/40" : "text-ink-300 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <Icon className={cn("h-4 w-4", on ? "text-gold-300" : "text-brand-300")} />
                  {x.label}
                </button>
              );
            })}
          </div>

          <div className="absolute inset-x-0 bottom-36 top-[4.25rem]">
            <svg className="absolute inset-x-0 top-0 h-2.5 w-full text-brand-400/80" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path d="M0 6 Q25 0 50 6 T100 6 T150 6 T200 6 T250 6 T300 6 T350 6 T400 6" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
            {TICKS.map((d) => (
              <div key={d} className="absolute inset-x-0 flex items-center gap-2 px-3.5" style={{ top: `${y(d)}%` }}>
                <span className="w-8 -translate-y-1/2 text-[0.62rem] font-medium tabular-nums text-ink-400">
                  {d === 0 ? "سطح" : `${toFa(d)}م`}
                </span>
                <span className="h-px flex-1 -translate-y-1/2 bg-gradient-to-l from-transparent via-white/12 to-brand-400/25" />
              </div>
            ))}
            {/* مختصات فیزیکی نمودار عمق — نباید با RTL جابه‌جا شوند */}
            {[[22, 18], [70, 36], [48, 62]].map(([l, tp]) => (
              <svg
                key={`${l}${tp}`}
                viewBox="0 0 24 10"
                className="absolute h-2.5 w-5 text-brand-300/60"
                style={{ left: `${l}%`, top: `${tp}%` }}
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 9 Q12 -4 23 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ))}

            <div
              className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
              style={{ left: "58%", height: ready ? `${y(t.depth)}%` : "0%", transition: "height 1.5s cubic-bezier(.2,.8,.2,1)" }}
            >
              <span className="w-px flex-1 bg-gradient-to-b from-white/80 via-brand-200/70 to-gold-400/80" />
              <span className="absolute top-full origin-top animate-sway">
                <JigLure />
              </span>
            </div>
          </div>

          <div className="absolute inset-x-2.5 bottom-2.5 rounded-xl border border-brand-400/20 bg-ink/70 p-3.5 backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.65rem] font-medium text-ink-400">عمق پیشنهادی · {t.label}</p>
                <p className="mt-0.5 text-2xl font-black tabular-nums text-gold-400">
                  {toFa(t.depth)} <span className="text-sm font-bold text-gold-500/90">متر</span>
                </p>
              </div>
              <p className="flex max-w-[11.5rem] items-start gap-1.5 pt-0.5 text-start text-[0.7rem] leading-5 text-ink-300">
                <IconDepth className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-300" />
                {t.target}
              </p>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {t.kit.map((id) => (
                <button
                  key={id}
                  onClick={() => goShop({ cat: id })}
                  className="rounded-lg bg-brand-500/20 px-2.5 py-1 text-[0.68rem] font-bold text-brand-100 ring-1 ring-brand-400/25 transition-colors hover:bg-brand-500 hover:text-white hover:ring-brand-400"
                >
                  {catById(id)?.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
