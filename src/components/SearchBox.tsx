"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, X } from "lucide-react";
import { BRAND_FA, CATEGORIES, PRODUCTS } from "@/lib/data";
import { fmt, toFa } from "@/lib/format";
import { useStore } from "@/lib/store";
import { ProductArt } from "./ProductArt";
import { cn } from "@/lib/cn";

type Variant = "nav" | "shop";

export function SearchBox({ className, variant = "nav" }: { className?: string; variant?: Variant }) {
  const { filters, goShop, setFilters } = useStore();
  const router = useRouter();
  const [q, setQ] = useState(variant === "shop" ? filters.q : "");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const shop = variant === "shop";

  useEffect(() => {
    if (shop) setQ(filters.q);
  }, [filters.q, shop]);

  const term = q.trim().toLowerCase();
  const prods = useMemo(
    () => (term ? PRODUCTS.filter((p) => `${p.name} ${p.brand} ${BRAND_FA[p.brand]}`.toLowerCase().includes(term)).slice(0, shop ? 5 : 4) : []),
    [term, shop],
  );
  const cats = useMemo(() => (term ? CATEGORIES.filter((c) => c.name.includes(term)).slice(0, 3) : []), [term]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const submit = () => {
    setOpen(false);
    if (shop) {
      setFilters({ q: q.trim() });
      document.getElementById("shop-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      goShop({ q: q.trim() });
    }
  };

  const clear = () => {
    setQ("");
    setOpen(false);
    if (shop) setFilters({ q: "" });
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <form
        role="search"
        onSubmit={(e) => { e.preventDefault(); submit(); }}
        className={cn(
          "relative flex items-center bg-white transition-all duration-300",
          shop
            ? "h-12 rounded-full border-2 border-transparent shadow-md focus-within:border-brand-500"
            : "h-11 rounded-xl bg-ink-50 ring-1 ring-ink-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-500",
        )}
      >
        <button
          type="submit"
          aria-label="جستجو"
          className={cn(
            "grid shrink-0 place-items-center text-ink-500 transition hover:text-brand-600",
            shop ? "h-12 w-12" : "h-11 w-11",
          )}
        >
          <Search className={cn(shop ? "h-5 w-5" : "h-[1.15rem] w-[1.15rem]")} />
        </button>
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          placeholder={shop ? "جستجو…" : "جستجوی چوب، قرقره، لور، برند…"}
          aria-label="جستجوی محصولات"
          autoComplete="off"
          className={cn(
            "h-full min-w-0 flex-1 bg-transparent text-sm font-bold text-ink-800 outline-none placeholder:font-medium placeholder:text-ink-400 focus-visible:outline-none",
            shop ? "pe-2" : "pe-2",
          )}
        />
        {q ? (
          <button
            type="button"
            onClick={clear}
            aria-label="پاک کردن جستجو"
            className={cn(
              "grid shrink-0 place-items-center text-ink-500 transition hover:text-ink-800",
              shop ? "me-2 h-9 w-9 rounded-full hover:bg-ink-100" : "me-1.5 h-8 w-8 rounded-lg hover:bg-ink-100",
            )}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </form>

      {open && term && (
        <div className={cn(
          "absolute inset-x-0 z-50 overflow-hidden border bg-white shadow-[0_24px_50px_-20px_rgba(9,11,14,.4)]",
          shop ? "top-[calc(100%+0.5rem)] rounded-2xl border-ink-100" : "top-[calc(100%+0.5rem)] rounded-2xl border-ink-100",
        )}>
          {cats.length > 0 && (
            <div className="border-b border-ink-100 p-2">
              <p className="px-3 py-1.5 text-[0.7rem] font-bold text-ink-400">دسته‌بندی‌ها</p>
              {cats.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setOpen(false); goShop({ cat: c.id }); }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-brand-50"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink-50">
                    <ProductArt kind={c.art} color="#1F5FE0" className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1 text-start">
                    <span className="block font-black text-ink-900">{c.name}</span>
                    <span className="text-xs font-bold text-ink-500">{c.blurb}</span>
                  </span>
                  <ArrowLeft className="h-4 w-4 text-ink-300" />
                </button>
              ))}
            </div>
          )}
          <div className="p-2">
            {prods.length === 0 && cats.length === 0 && (
              <p className="px-3 py-5 text-center text-sm font-bold text-ink-500">
                محصولی با «{q}» پیدا نشد.
                <span className="mt-1 block text-xs">نام برند یا نوع کالا را امتحان کنید.</span>
              </p>
            )}
            {prods.length > 0 && <p className="px-3 py-1.5 text-[0.7rem] font-bold text-ink-400">محصولات</p>}
            {prods.map((p) => (
              <button
                key={p.id}
                onClick={() => { setOpen(false); router.push(`/product/${p.id}`); }}
                className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-start hover:bg-ink-50"
              >
                <span className="relative h-12 w-14 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-ink-100">
                  <Image src={p.image} alt="" fill className="object-contain" sizes="56px" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-black text-ink-900">{p.name}</span>
                  <span className="text-xs font-bold text-ink-500">{BRAND_FA[p.brand]}</span>
                </span>
                <span className="text-sm font-black tabular-nums text-ink-900">{fmt(p.price)}</span>
              </button>
            ))}
          </div>
          {(prods.length > 0 || cats.length > 0) && (
            <button onClick={submit} className="flex w-full items-center justify-between border-t border-ink-100 bg-ink-50/80 px-4 py-3.5 text-sm font-black text-brand-600 hover:bg-brand-50">
              <span>مشاهده همه نتایج «{q}»</span>
              <span className="text-xs font-bold text-ink-400">{toFa(prods.length)}+ کالا</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
