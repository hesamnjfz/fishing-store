"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LayoutGrid, ShoppingBag, User } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { toFa } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { ProductArt } from "./ProductArt";
import { SearchBox } from "./SearchBox";
import { BookmarkIcon } from "./BookmarkIcon";

function IconBtn({ label, count, href, children }: { label: string; count?: number; href?: string; children: React.ReactNode }) {
  const className = "relative grid h-11 w-11 place-items-center rounded-full text-ink-800 transition-colors hover:bg-ink-100";
  const badge = !!count && (
    <span className="absolute end-0.5 top-0.5 grid h-[1.15rem] min-w-[1.15rem] place-items-center rounded-full bg-brand-600 px-1 text-[0.65rem] font-black text-white">{toFa(count)}</span>
  );
  if (href) {
    return <Link href={href} aria-label={label} className={className}>{children}{badge}</Link>;
  }
  return <button aria-label={label} className={className}>{children}{badge}</button>;
}

function MegaMenu() {
  const { goShop } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, []);
  const go = (cat: string | null) => { setOpen(false); goShop({ cat }); };

  return (
    <div ref={ref}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="true" className={cn("flex h-11 items-center gap-2 rounded-lg px-3 text-sm font-black transition-colors", open ? "bg-brand-600 text-white" : "text-ink-900 hover:bg-ink-100")}>
        <LayoutGrid className="h-[1.1rem] w-[1.1rem]" />دسته‌بندی محصولات<ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-ink-100 bg-white shadow-[0_24px_40px_-20px_rgba(9,11,14,.35)]">
          <div className="container-x grid grid-cols-3 gap-x-8 gap-y-8 py-8 xl:grid-cols-6">
            {CATEGORIES.map((c) => (
              <div key={c.id}>
                <button onClick={() => go(c.id)} className="group flex items-center gap-3 text-start">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink-50 group-hover:bg-brand-50"><ProductArt kind={c.art} color="#1F5FE0" className="h-8 w-8" /></span>
                  <span className="font-black text-ink-900 group-hover:text-brand-600">{c.name}</span>
                </button>
                <ul className="mt-3 space-y-0.5 border-s border-ink-200 ps-3 ms-5">
                  {c.children.map((ch) => (
                    <li key={ch.id}><button onClick={() => go(ch.id)} className="w-full py-1 text-start text-sm font-bold text-ink-600 hover:text-brand-600">{ch.name}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { cartCount, wish, setDrawer, goShop } = useStore();
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-ink-50/95 backdrop-blur-md">
      <div className="relative">
        <div className="container-x grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="flex items-center justify-self-start gap-2">
            <button
              onClick={() => setDrawer("menu")}
              aria-label="باز کردن منو"
              className="grid h-11 w-11 place-items-center rounded-full text-ink-900 hover:bg-ink-100 lg:hidden"
            >
              <span
                aria-hidden="true"
                className="block h-6 w-6 bg-ink-900"
                style={{
                  maskImage: "url(/icons/menu.png)",
                  WebkitMaskImage: "url(/icons/menu.png)",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
            </button>
            <SearchBox variant="nav" className="hidden max-w-md lg:block xl:max-w-xl" />
          </div>

          <Logo />

          <div className="flex items-center justify-self-end gap-0.5">
            <button className="hidden h-11 items-center gap-2 rounded-xl px-3 text-sm font-black text-ink-900 hover:bg-ink-100 lg:flex">
              <User className="h-5 w-5" />ورود / ثبت‌نام
            </button>

            {/* دسکتاپ: ذخیره شده‌ها */}
            <span className="hidden lg:block">
              <IconBtn label="ذخیره شده‌ها" count={wish.length} href="/saved">
                <BookmarkIcon className="h-[1.35rem] w-[1.35rem]" />
              </IconBtn>
            </span>

            {/* موبایل: ذخیره شده‌ها به‌جای سبد */}
            <Link
              href="/saved"
              aria-label="ذخیره شده‌ها"
              className="relative flex min-w-[3.5rem] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 text-ink-800 transition-colors hover:bg-ink-100 lg:hidden"
            >
              <span className="relative grid h-6 w-6 place-items-center">
                <BookmarkIcon className="h-5 w-5" />
                {wish.length > 0 && (
                  <span className="absolute -end-1.5 -top-1 grid h-[1.05rem] min-w-[1.05rem] place-items-center rounded-full bg-brand-600 px-0.5 text-[0.6rem] font-black text-white">
                    {toFa(wish.length)}
                  </span>
                )}
              </span>
              <span className="text-[0.58rem] font-black leading-none text-ink-700">ذخیره شده‌ها</span>
            </Link>

            {/* سبد فقط دسکتاپ (موبایل در نوار پایین) */}
            <span className="hidden lg:block">
              <IconBtn label="سبد خرید" count={cartCount} href="/cart">
                <ShoppingBag className="h-[1.35rem] w-[1.35rem]" />
              </IconBtn>
            </span>
          </div>
        </div>

        <nav aria-label="ناوبری اصلی" className="hidden border-t border-ink-100 lg:block">
          <div className="container-x flex h-12 items-center gap-1">
            <MegaMenu />
            <button onClick={() => goShop({ onSale: true })} className="rounded-lg px-3 py-2 text-sm font-black text-alert hover:bg-alert-50">تخفیف‌ها</button>
            <button onClick={() => goShop({ sort: "new" })} className="rounded-lg px-3 py-2 text-sm font-black text-ink-900 hover:bg-ink-100">تازه‌ها</button>
            <a href="/#brands" className="rounded-lg px-3 py-2 text-sm font-black text-ink-900 hover:bg-ink-100">برندها</a>
            <a href="/#guides" className="rounded-lg px-3 py-2 text-sm font-black text-ink-900 hover:bg-ink-100">راهنمای خرید</a>
            <a href="/#contact" className="rounded-lg px-3 py-2 text-sm font-black text-ink-900 hover:bg-ink-100">تماس با ما</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
