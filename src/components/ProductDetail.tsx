"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Minus, Plus, Star, Truck } from "lucide-react";
import { BRAND_FA, COLORS, PRODUCTS, Product, catById } from "@/lib/data";
import { discountPct, fmt, fmtUsd, toFa } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import { ProductImage } from "./ProductImage";
import { ProductCard } from "./ProductCard";
import { BookmarkIcon } from "./BookmarkIcon";

export function ProductDetail({ p }: { p: Product }) {
  const { addToCart, wish, toggleWish, cart, setQty } = useStore();
  const liked = wish.includes(p.id);
  const out = p.stock === 0;
  const low = p.stock > 0 && p.stock <= 5;
  const line = cart.find((l) => l.id === p.id);
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 3);

  return (
    <main className="min-h-[70vh] bg-ink-50 text-ink-900">
      <div className="container-x py-6 sm:py-10">
        <Link
          href="/#shop"
          aria-label="بازگشت به فروشگاه"
          className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-ink-100"
        >
          <Image
            src="/icons/back.png"
            alt=""
            width={28}
            height={28}
            className="-scale-x-100"
            aria-hidden
          />
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-100 bg-white lg:aspect-square">
            <ProductImage src={p.image} alt={p.name} className="absolute inset-0 h-full w-full" priority />
            <div className="absolute start-3 top-3 z-10 flex flex-col gap-1.5">
              {p.oldPrice && !out && (
                <span className="rounded-md bg-alert px-2.5 py-1 text-xs font-black text-white">{toFa(discountPct(p.price, p.oldPrice))}٪ تخفیف</span>
              )}
              {p.isNew && !out && (
                <span className="rounded-md bg-brand-700 px-2.5 py-1 text-xs font-black text-white">تازه</span>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-600" dir="ltr">{p.brand}</p>
            <h1 className="mt-2 text-2xl font-black leading-snug text-ink-900 sm:text-3xl">{p.name}</h1>
            <p className="mt-1 text-sm font-bold text-ink-500">{BRAND_FA[p.brand]} · {catById(p.cat)?.name}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-black">
              <span className="inline-flex items-center gap-1.5 text-ink-800">
                <Star className="h-4 w-4 fill-alert stroke-alert" />
                {toFa(p.rating)}
                <span className="font-bold text-ink-400">({toFa(p.reviews)} نظر)</span>
              </span>
              <span className="text-ink-300">|</span>
              <span className="text-ink-500">{toFa(p.sales)} فروش</span>
            </div>

            <p className="mt-5 text-sm font-bold leading-7 text-ink-600">{p.desc}</p>

            <div className="mt-6 flex items-center gap-2" aria-label="رنگ‌های موجود">
              {p.colors.map((c) => (
                <span key={c} title={COLORS[c].name} className="h-8 w-8 rounded-full ring-2 ring-ink-200 ring-offset-2 ring-offset-ink-50" style={{ background: COLORS[c].hex }} />
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {p.specs.map((s) => (
                <div key={s.label} className="rounded-xl border border-ink-100 bg-white px-3 py-3 shadow-sm">
                  <dt className="text-[0.65rem] font-bold text-ink-400">{s.label}</dt>
                  <dd className="mt-1 text-sm font-black text-ink-900">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-4 shadow-sm sm:p-5">
              <div className="text-center sm:text-start">
                <div className="font-display text-2xl font-semibold tabular-nums tracking-wide text-ink-900" dir="ltr">{fmtUsd(p.price)}</div>
                <div className="mt-1 text-lg font-black tabular-nums text-ink-700">{fmt(p.price)} <span className="text-sm font-bold text-ink-500">تومان</span></div>
                <div className="mt-1 text-xs font-black">
                  {out && <span className="text-ink-400">ناموجود</span>}
                  {low && <span className="text-alert">فقط {toFa(p.stock)} عدد در انبار</span>}
                  {!out && !low && <span className="text-brand-600">موجود در انبار</span>}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                {line ? (
                  <div className="flex items-center rounded-xl bg-ink-50 ring-1 ring-ink-200">
                    <button type="button" onClick={() => setQty(p.id, line.qty + 1)} aria-label="افزایش" className="grid h-12 w-12 place-items-center text-ink-700 hover:text-brand-600"><Plus className="h-4 w-4" /></button>
                    <span className="w-10 text-center font-black tabular-nums">{toFa(line.qty)}</span>
                    <button type="button" onClick={() => setQty(p.id, line.qty - 1)} aria-label="کاهش" className="grid h-12 w-12 place-items-center text-ink-700 hover:text-alert"><Minus className="h-4 w-4" /></button>
                  </div>
                ) : (
                  <button type="button" onClick={() => addToCart(p.id)} disabled={out} className="btn-brand w-full !py-3.5 !text-base sm:w-auto sm:min-w-[14rem]">
                    {out ? "به من خبر بده" : <><Plus className="h-5 w-5" />افزودن به سبد</>}
                  </button>
                )}
                <Link href="/cart" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-alert/50 bg-alert-50 px-5 py-3.5 text-sm font-black text-alert transition hover:bg-alert hover:text-white sm:w-auto">
                  سبد خرید
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>

              <p className="mt-4 flex items-start justify-center gap-2 text-center text-xs font-bold leading-5 text-ink-500 sm:justify-start sm:text-start">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                هزینه ارسال در تسویه‌حساب بر اساس پست یا تیپاکس محاسبه می‌شود.
              </p>

              <div className="mt-4 flex justify-center border-t border-ink-100 pt-4 sm:justify-end">
                <button
                  type="button"
                  onClick={() => toggleWish(p.id)}
                  aria-pressed={liked}
                  aria-label={liked ? "حذف از ذخیره شده‌ها" : "افزودن به ذخیره شده‌ها"}
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-xl border transition",
                    liked ? "border-alert bg-alert-50 text-alert" : "border-ink-200 text-ink-600 hover:border-ink-400 hover:text-ink-900",
                  )}
                >
                  <BookmarkIcon className="h-5 w-5" active={liked} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-14 border-t border-ink-100 pt-10">
            <h2 className="text-xl font-black text-ink-900">محصولات مرتبط</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {related.map((r) => <ProductCard key={r.id} p={r} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
