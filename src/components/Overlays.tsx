"use client";
import { useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Check } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { toFa } from "@/lib/format";
import { applyFilters } from "@/lib/filter";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import { Drawer } from "./Drawer";
import { ProductArt } from "./ProductArt";
import { SidebarPanel } from "./Sidebar";

function MenuDrawer() {
  const { drawer, setDrawer, goShop } = useStore();
  return (
    <Drawer open={drawer === "menu"} onClose={() => setDrawer(null)} side="start" title="دسته‌بندی محصولات">
      <ul className="p-3">
        {CATEGORIES.map((c) => (
          <li key={c.id} className="border-b border-ink-100 last:border-0">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center gap-3 rounded-lg px-2 py-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-50"><ProductArt kind={c.art} color="#1F5FE0" className="h-7 w-7" /></span>
                <span className="flex-1 font-black text-ink-900">{c.name}</span>
                <ChevronLeft className="h-4 w-4 text-ink-400 transition-transform group-open:-rotate-90" />
              </summary>
              <ul className="mb-3 me-3 ms-7 space-y-1 border-s border-ink-200 ps-3">
                <li><button onClick={() => goShop({ cat: c.id })} className="w-full py-1.5 text-start text-sm font-black text-brand-600">همه {c.name}</button></li>
                {c.children.map((ch) => <li key={ch.id}><button onClick={() => goShop({ cat: ch.id })} className="w-full py-1.5 text-start text-sm font-bold text-ink-600">{ch.name}</button></li>)}
              </ul>
            </details>
          </li>
        ))}
      </ul>
      <div className="space-y-1 border-t border-ink-100 p-3 text-sm font-bold">
        <button onClick={() => goShop({ onSale: true })} className="block w-full rounded-lg px-3 py-2.5 text-start font-black text-alert hover:bg-alert-50">تخفیف‌ها</button>
        {[["#brands", "برندها"], ["#guides", "راهنمای خرید"], ["#contact", "تماس با ما"]].map(([h, l]) => (
          <a key={h} href={h} onClick={() => setDrawer(null)} className="block rounded-lg px-3 py-2.5 hover:bg-ink-50">{l}</a>
        ))}
      </div>
    </Drawer>
  );
}

function FiltersDrawer() {
  const { drawer, setDrawer, filters, resetFilters } = useStore();
  const count = useMemo(() => applyFilters(PRODUCTS, filters).length, [filters]);
  return (
    <Drawer
      open={drawer === "filters"} onClose={() => setDrawer(null)} side="start" title="فیلتر و دسته‌بندی"
      footer={
        <div className="flex gap-2">
          <button onClick={resetFilters} className="btn-outline !px-4">پاک کردن</button>
          <button onClick={() => setDrawer(null)} className="btn-brand flex-1">نمایش {toFa(count)} کالا</button>
        </div>
      }
    >
      <div className="px-5 pb-4"><SidebarPanel /></div>
    </Drawer>
  );
}

function Toast() {
  const { toast } = useStore();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-[70] flex justify-center px-4 lg:bottom-6">
      {toast && (
        <div key={toast.key} className="pointer-events-auto flex animate-rise items-center gap-3 rounded-xl bg-ink-900 py-2.5 pe-2.5 ps-4 text-sm font-bold text-white shadow-2xl">
          <Check className="h-4 w-4 text-brand-300" />{toast.text}
          <Link href="/cart" className="rounded-lg bg-white/10 px-3 py-1.5 font-black hover:bg-white/20">مشاهده سبد</Link>
        </div>
      )}
    </div>
  );
}

function NavIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden="true"
      className="block h-5 w-5 shrink-0 bg-ink-700"
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

function BottomNav() {
  const { setDrawer, cartCount } = useStore();
  const item = "flex flex-col items-center justify-center gap-0.5 py-2 text-[0.68rem] font-black text-ink-600";
  return (
    <nav aria-label="ناوبری موبایل" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-ink-100 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      <Link href="/" className={item} aria-label="صفحه اصلی">
        <NavIcon src="/icons/home.png" />
        خانه
      </Link>
      <button onClick={() => setDrawer("menu")} className={item} aria-label="دسته‌بندی محصولات">
        <NavIcon src="/icons/categories.png" />
        دسته‌ها
      </button>
      <Link href="/cart" className={cn(item, "relative")} aria-label="سبد خرید">
        <NavIcon src="/icons/cart.png" />
        سبد
        {!!cartCount && (
          <span className="absolute end-[calc(50%-1.4rem)] top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand-600 px-1 text-[0.6rem] font-black text-white">
            {toFa(cartCount)}
          </span>
        )}
      </Link>
      <button className={item} aria-label="حساب کاربری">
        <NavIcon src="/icons/user.png" />
        حساب
      </button>
    </nav>
  );
}

export function Overlays() {
  return (<><MenuDrawer /><FiltersDrawer /><Toast /><BottomNav /></>);
}
