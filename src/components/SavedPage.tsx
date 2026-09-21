"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { toFa } from "@/lib/format";
import { useStore } from "@/lib/store";
import { ProductCard } from "./ProductCard";
import { BookmarkIcon } from "./BookmarkIcon";

export function SavedPage() {
  const { wish, goShop } = useStore();
  const items = wish.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <main className="min-h-[70vh] bg-ink-50 text-ink-900">
      <div className="container-x py-8 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-600" dir="ltr">Saved</p>
            <h1 className="mt-1 text-2xl font-black text-ink-900 sm:text-3xl">ذخیره شده‌ها</h1>
            <p className="mt-1 text-sm font-bold text-ink-500">
              {items.length ? `${toFa(items.length)} کالا` : "هنوز چیزی ذخیره نکرده‌اید"}
            </p>
          </div>
          <Link href="/#shop" className="inline-flex items-center gap-2 text-sm font-black text-brand-600 hover:text-brand-500">
            ادامه خرید
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 grid place-items-center rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-20 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <BookmarkIcon className="h-7 w-7 text-brand-600" />
            </span>
            <p className="mt-5 text-xl font-black text-ink-900">لیست ذخیره شده‌ها خالی است</p>
            <p className="mt-1 max-w-sm text-sm font-bold text-ink-500">
              محصولات را از صفحه جزئیات به ذخیره شده‌ها اضافه کنید.
            </p>
            <button type="button" onClick={() => goShop()} className="btn-brand mt-6">
              مشاهده محصولات
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => p && <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </main>
  );
}
