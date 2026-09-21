import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="flex flex-col items-center text-center leading-none"
      aria-label="Rezayi Fishing Store — صفحه اصلی"
      dir="ltr"
    >
      <span className={`font-display text-lg font-semibold tracking-[0.08em] sm:text-xl ${light ? "text-white" : "text-ink-900"}`}>
        REZAYI
      </span>
      <span className={`mt-1 text-[0.58rem] font-black uppercase tracking-[0.14em] ${light ? "text-ink-300" : "text-ink-500"}`}>
        Fishing & Hunting
      </span>
    </Link>
  );
}
