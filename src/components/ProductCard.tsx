import Link from "next/link";
import { Product } from "@/lib/data";
import { fmt, fmtUsd } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ProductImage } from "./ProductImage";

/** کارت مینیمال: تصویر + نام + توضیح کوتاه + قیمت؛ کل کارت لینک */
export function ProductCard({ p, className }: { p: Product; className?: string }) {
  const out = p.stock === 0;

  return (
    <article className={cn("group", className)}>
      <Link
        href={`/product/${p.id}`}
        className="flex h-full flex-col rounded-2xl bg-white text-center outline-none transition duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50"
      >
        <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-white">
          <ProductImage
            src={p.image}
            alt={p.name}
            className="absolute inset-0 h-full w-full p-5 sm:p-6"
          />
          {out && (
            <span className="absolute inset-x-0 bottom-0 bg-ink-900/70 py-1.5 text-[0.65rem] font-bold tracking-wide text-white">
              ناموجود
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col px-3 pb-5 pt-3 sm:px-4 sm:pt-4">
          <p className="text-[0.7rem] font-black tracking-[0.04em] text-ink-800" dir="ltr">
            {p.brand}
          </p>

          <h3 className="mt-1.5 line-clamp-2 text-[0.9rem] font-bold leading-6 text-ink-700 sm:text-[0.95rem]">
            {p.name}
          </h3>

          <div className={cn("mt-auto pt-3", out && "opacity-50")}>
            <p className="font-display text-base font-bold tabular-nums tracking-wide text-ink-900 sm:text-lg" dir="ltr">
              {fmtUsd(p.price)}
            </p>
            <p className="mt-0.5 text-sm font-bold tabular-nums text-ink-700">
              {fmt(p.price)} تومان
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
