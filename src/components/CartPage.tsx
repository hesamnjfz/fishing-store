"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { BRAND_FA, PRODUCTS } from "@/lib/data";
import { fmt, toFa } from "@/lib/format";
import { useStore } from "@/lib/store";

export function CartPage() {
  const { cart, setQty, cartTotal, cartCount, goShop } = useStore();
  const lines = cart.map((l) => ({ ...l, p: PRODUCTS.find((p) => p.id === l.id)! })).filter((l) => l.p);

  return (
    <main className="min-h-[70vh] bg-ink-50 text-ink-900">
      <div className="container-x py-8 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-600" dir="ltr">Shopping Cart</p>
            <h1 className="mt-1 text-2xl font-black text-ink-900 sm:text-3xl">سبد خرید</h1>
            <p className="mt-1 text-sm font-bold text-ink-500">
              {cartCount ? `${toFa(cartCount)} کالا` : "سبد خالی است"}
            </p>
          </div>
          <Link href="/#shop" className="inline-flex items-center gap-2 text-sm font-black text-brand-600 hover:text-brand-500">
            ادامه خرید
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {lines.length === 0 ? (
          <div className="mt-10 grid place-items-center rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-20 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <ShoppingBag className="h-7 w-7" />
            </span>
            <p className="mt-5 text-xl font-black text-ink-900">سبد خرید شما خالی است</p>
            <p className="mt-1 max-w-sm text-sm font-bold text-ink-500">محصولات را ببینید و مورد نظرتان را اضافه کنید.</p>
            <button onClick={() => goShop()} className="btn-brand mt-6">مشاهده محصولات</button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <ul className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
              {lines.map(({ p, qty }) => (
                <li key={p.id} className="flex gap-4 border-b border-ink-100 p-4 last:border-b-0 sm:p-5">
                  <span className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-ink-100 sm:h-28 sm:w-32">
                    <Image src={p.image} alt={p.name} fill className="object-contain" sizes="128px" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-xs font-bold text-ink-400" dir="ltr">{p.brand} · {BRAND_FA[p.brand]}</p>
                    <Link href={`/product/${p.id}`} className="mt-0.5 line-clamp-2 text-sm font-black leading-6 text-ink-900 hover:text-brand-600 sm:text-base">{p.name}</Link>
                    <p className="mt-1 text-sm font-black tabular-nums text-ink-700">{fmt(p.price)} <span className="text-xs font-bold text-ink-400">تومان</span></p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                      <div className="flex items-center rounded-xl bg-ink-50 ring-1 ring-ink-200">
                        <button onClick={() => setQty(p.id, qty + 1)} aria-label="افزایش تعداد" className="grid h-10 w-10 place-items-center text-ink-700 hover:text-brand-600">
                          <Plus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-black tabular-nums">{toFa(qty)}</span>
                        <button
                          onClick={() => setQty(p.id, qty - 1)}
                          aria-label={qty === 1 ? "حذف از سبد" : "کاهش تعداد"}
                          className="grid h-10 w-10 place-items-center text-ink-700 hover:text-alert"
                        >
                          {qty === 1 ? <Trash2 className="h-4 w-4 text-alert" /> : <Minus className="h-4 w-4" />}
                        </button>
                      </div>
                      <span className="text-base font-black tabular-nums text-ink-900">{fmt(p.price * qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="rounded-2xl border border-ink-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-sm font-black uppercase tracking-[0.15em] text-ink-400" dir="ltr">Order Summary</h2>
              <div className="mt-4 space-y-3 text-sm font-bold">
                <div className="flex items-center justify-between text-ink-600">
                  <span>جمع کالاها</span>
                  <span className="tabular-nums text-ink-900">{fmt(cartTotal)} تومان</span>
                </div>
                <div className="flex items-center justify-between text-ink-600">
                  <span>هزینه ارسال</span>
                  <span className="text-xs font-bold text-ink-400">در تسویه</span>
                </div>
              </div>
              <div className="mt-4 border-t border-ink-100 pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-black text-ink-900">مبلغ قابل پرداخت</span>
                  <span className="text-xl font-black tabular-nums text-ink-900">{fmt(cartTotal)} <span className="text-xs font-bold text-ink-500">تومان</span></span>
                </div>
                <p className="mt-2 text-xs font-bold leading-5 text-ink-500">
                  هزینه ارسال در مرحله تسویه‌حساب، بر اساس روش انتخابی (پست یا تیپاکس) محاسبه می‌شود.
                </p>
                <button className="btn-brand mt-5 w-full !py-3.5 !text-base">ادامه و تسویه‌حساب</button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
