"use client";
import { useMemo } from "react";
import Image from "next/image";
import { ChevronDown, PackageSearch, SlidersHorizontal, X } from "lucide-react";
import { BRAND_FA, COLORS, MAX_PRICE, PRODUCTS, catById } from "@/lib/data";
import { fmt, toFa } from "@/lib/format";
import { applyFilters } from "@/lib/filter";
import { SortKey, useStore } from "@/lib/store";
import { ProductCard } from "./ProductCard";
import { SearchBox } from "./SearchBox";
import { Sidebar, activeFilterCount } from "./Sidebar";

const SORTS: [SortKey, string][] = [
  ["popular", "پرفروش"],
  ["new", "جدید"],
  ["cheap", "ارزان"],
  ["expensive", "گران"],
  ["discount", "تخفیف"],
];

export function Shop() {
  const { filters, setFilters, resetFilters, setDrawer } = useStore();
  const results = useMemo(() => applyFilters(PRODUCTS, filters), [filters]);
  const n = activeFilterCount(filters);
  const title = filters.q ? `نتایج «${filters.q}»` : filters.cat ? catById(filters.cat)?.name : "همه محصولات";

  const chips: { key: string; label: string; clear: () => void }[] = [];
  if (filters.cat) chips.push({ key: "cat", label: catById(filters.cat)?.name ?? "", clear: () => setFilters({ cat: null }) });
  filters.brands.forEach((b) => chips.push({ key: b, label: BRAND_FA[b], clear: () => setFilters({ brands: filters.brands.filter((x) => x !== b) }) }));
  filters.colors.forEach((c) => chips.push({ key: c, label: COLORS[c].name, clear: () => setFilters({ colors: filters.colors.filter((x) => x !== c) }) }));
  if (filters.min > 0 || filters.max < MAX_PRICE) chips.push({ key: "price", label: `${fmt(filters.min)} – ${fmt(filters.max)}`, clear: () => setFilters({ min: 0, max: MAX_PRICE }) });
  if (filters.inStock) chips.push({ key: "stock", label: "موجود", clear: () => setFilters({ inStock: false }) });
  if (filters.onSale) chips.push({ key: "sale", label: "تخفیف‌دار", clear: () => setFilters({ onSale: false }) });
  if (filters.q) chips.push({ key: "q", label: filters.q, clear: () => setFilters({ q: "" }) });

  return (
    <section id="shop" aria-labelledby="shop-title" className="scroll-mt-32 bg-ink-50 py-8 text-ink-900 sm:py-10">
      <div className="container-x">
        <h2 id="shop-title" className="sr-only">فروشگاه</h2>
        <div className="mx-auto max-w-xl">
          <SearchBox variant="shop" />
        </div>

        <div className="mt-6 lg:mt-8 lg:grid lg:grid-cols-[18.5rem_minmax(0,1fr)] lg:gap-7">
          <Sidebar />

          <div id="shop-results" className="min-w-0 scroll-mt-36">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-200/80 pb-3">
              {/* در RTL اولین آیتم سمت راست است */}
              <div className="-space-x-3 space-x-reverse flex items-center sm:-space-x-4">
                <div className="relative h-12 w-20 shrink-0 overflow-hidden sm:h-14 sm:w-24">
                  <Image
                    src="/logo.png"
                    alt="رضایی"
                    fill
                    className="scale-125 object-contain object-center"
                    sizes="96px"
                    priority
                  />
                </div>
                <div className="relative h-12 w-20 shrink-0 overflow-hidden sm:h-14 sm:w-24">
                  <Image
                    src="/logo2.png"
                    alt="رضایی"
                    fill
                    className="scale-125 object-contain object-center"
                    sizes="96px"
                    priority
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDrawer("filters")}
                  className="shadow-btn relative lg:hidden"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  فیلتر
                  {n > 0 && (
                    <span className="ms-0.5 grid h-4 min-w-4 place-items-center rounded bg-white/20 px-1 text-[0.65rem] font-bold leading-none">
                      {toFa(n)}
                    </span>
                  )}
                </button>

                <label className="relative inline-flex items-center">
                  <span className="sr-only">مرتب‌سازی</span>
                  <select
                    value={filters.sort}
                    onChange={(e) => setFilters({ sort: e.target.value as SortKey })}
                    className="shadow-btn appearance-none pe-8 ps-3"
                  >
                    {SORTS.map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute end-2.5 h-3.5 w-3.5 text-white" aria-hidden />
                </label>
              </div>
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-base font-semibold tracking-tight text-ink-900 sm:text-lg">
                {title}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-ink-500" aria-live="polite">
                {toFa(results.length)} کالا
              </p>
            </div>

            {chips.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {chips.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={c.clear}
                    className="inline-flex items-center gap-1 rounded-md bg-white py-1 pe-1.5 ps-2.5 text-[0.7rem] font-semibold text-ink-700 ring-1 ring-ink-200 transition hover:bg-ink-50 hover:text-ink-900"
                  >
                    {c.label}
                    <X className="h-3 w-3 text-ink-400" aria-hidden />
                    <span className="sr-only">حذف</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ms-1 text-[0.7rem] font-semibold text-ink-500 underline-offset-2 transition hover:text-alert hover:underline"
                >
                  پاک کردن
                </button>
              </div>
            )}

            {results.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                {results.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            ) : (
              <div className="mt-5 grid place-items-center rounded-2xl border border-dashed border-ink-200 bg-white/60 px-6 py-16 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink-100">
                  <PackageSearch className="h-5 w-5 text-ink-400" />
                </span>
                <p className="mt-4 text-base font-semibold text-ink-900">نتیجه‌ای یافت نشد</p>
                <p className="mt-1 max-w-xs text-sm font-medium text-ink-500">فیلترها را کم کنید یا عبارت جستجو را تغییر دهید.</p>
                <button type="button" onClick={resetFilters} className="btn-brand mt-5">
                  پاک کردن فیلترها
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
