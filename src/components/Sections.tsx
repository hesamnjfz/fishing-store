"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, BadgeCheck, Clock, Mail, MapPin, Phone, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { BRANDS, BRAND_FA, CATEGORIES, COLORS, PRODUCTS } from "@/lib/data";
import { toFa } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { ProductArt } from "./ProductArt";
import { ProductCard } from "./ProductCard";

export function TrustStrip() {
  const items = [
    { i: Truck, t: "ارسال با پست یا تیپاکس", d: "هزینه هر روش را پیش از پرداخت می‌بینید" },
    { i: ShieldCheck, t: "پرداخت امن آنلاین", d: "از طریق درگاه معتبر بانکی" },
    { i: BadgeCheck, t: "کالای اصل و با موجودی واقعی", d: "موجودی هر محصول به‌روز نمایش داده می‌شود" },
    { i: RotateCcw, t: "مرجوعی ساده", d: "ثبت درخواست عودت از پنل کاربری" },
  ];
  return (
    <section aria-label="مزایای خرید" className="border-b border-ink-100 bg-white">
      <div className="container-x grid grid-cols-2 gap-x-4 gap-y-5 py-6 lg:grid-cols-4 lg:divide-x lg:divide-x-reverse lg:divide-ink-100">
        {items.map(({ i: I, t, d }) => (
          <div key={t} className="flex items-start gap-3 lg:px-6 lg:first:ps-0">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600"><I className="h-5 w-5" /></span>
            <div><p className="text-sm font-black text-ink-900">{t}</p><p className="mt-0.5 hidden text-xs leading-5 text-ink-500 sm:block">{d}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Countdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => { const n = new Date(); const end = new Date(n); end.setHours(24, 0, 0, 0); setLeft(Math.floor((+end - +n) / 1000)); };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  const parts = left === null ? ["--", "--", "--"] : [Math.floor(left / 3600), Math.floor((left % 3600) / 60), left % 60].map((v) => toFa(String(v).padStart(2, "0")));
  return (
    <div className="flex items-center gap-2" dir="ltr" role="timer" aria-label="زمان باقی‌مانده تخفیف">
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="grid h-11 w-12 place-items-center rounded-lg bg-white/10 text-xl font-black tabular-nums">{p}</span>
          {i < 2 && <span className="text-ink-400">:</span>}
        </span>
      ))}
    </div>
  );
}

export function Deals() {
  const { goShop } = useStore();
  const deals = PRODUCTS.filter((p) => p.oldPrice && p.stock > 0);
  return (
    <section aria-labelledby="deals-title" className="bg-ink py-14 text-white sm:py-16">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-md bg-alert px-2.5 py-1 text-xs font-black"><Clock className="h-3.5 w-3.5" />تخفیف امروز</p>
            <h2 id="deals-title" className="mt-3 text-2xl font-black sm:text-3xl">پیشنهادهای ویژه با موجودی محدود</h2>
          </div>
          <div className="flex items-center gap-4"><span className="text-sm text-ink-300">پایان امروز:</span><Countdown /></div>
        </div>
        <div className="no-scrollbar -mx-4 mt-8 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {deals.map((p) => <ProductCard key={p.id} p={p} className="w-[15.5rem] shrink-0 snap-start sm:w-[17rem]" />)}
        </div>
        <button onClick={() => goShop({ onSale: true, sort: "discount" })} className="btn-ghost-dark mt-6">مشاهده همه کالاهای تخفیف‌دار<ArrowLeft className="h-4 w-4" /></button>
      </div>
    </section>
  );
}

const TILE = [
  "bg-brand-900 text-white sm:col-span-2 sm:row-span-2", "bg-ink-800 text-white", "bg-alert text-white",
  "bg-ink text-white", "bg-brand-800 text-white", "bg-ink-700 text-white", "bg-brand-950 text-white",
];
export function Categories() {
  const { goShop } = useStore();
  return (
    <section aria-labelledby="cats-title" className="py-14 sm:py-20">
      <div className="container-x">
        <h2 id="cats-title" className="section-title">خرید بر اساس نوع تجهیزات</h2>
        <div className="mt-8 grid auto-rows-[11.5rem] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {CATEGORIES.map((c, i) => {
            const count = PRODUCTS.filter((p) => c.children.some((x) => x.id === p.cat)).length;
            const big = i === 0;
            return (
              <button key={c.id} onClick={() => goShop({ cat: c.id })} className={cn("group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-5 text-start transition-transform hover:-translate-y-0.5 sm:p-6", TILE[i] ?? "bg-ink-800 text-white")}>
                <div>
                  <h3 className={cn("font-black", big ? "text-2xl sm:text-3xl" : "text-lg")}>{c.name}</h3>
                  <p className={cn("mt-1 text-sm opacity-75", !big && "hidden sm:block")}>{c.blurb}</p>
                </div>
                <span className="text-sm font-bold opacity-80">{toFa(count)} کالا</span>
                <ProductArt kind={c.art} color={big ? "#4D84F5" : COLORS[i % 2 ? "blue" : "black"].hex} className={cn("absolute -bottom-2 -end-3 opacity-90 transition-transform duration-500 group-hover:scale-105", big ? "h-56 w-72 sm:h-80 sm:w-96" : "h-28 w-36 sm:h-36 sm:w-44")} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Brands() {
  const { goShop } = useStore();
  return (
    <section id="brands" aria-labelledby="brands-title" className="scroll-mt-32 border-y border-ink-100 bg-white py-12">
      <div className="container-x">
        <h2 id="brands-title" className="text-lg font-black text-ink-900">برندهای موجود در فروشگاه</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {BRANDS.map((b) => (
            <li key={b}>
              <button onClick={() => goShop({ brands: [b] })} className="flex h-20 w-full flex-col items-center justify-center rounded-xl border border-ink-100 transition-colors hover:border-brand-500 hover:bg-brand-50">
                <span className="text-lg font-black tracking-tight text-ink-800" dir="ltr">{b}</span>
                <span className="text-xs text-ink-500">{BRAND_FA[b]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Guides() {
  const guides = [
    { t: "چطور قرقره مناسب چوب اسپین را انتخاب کنیم؟", d: "اندازه، نسبت دنده و ظرفیت نخ؛ سه معیاری که باید با هم بخوانند.", m: 6 },
    { t: "نخ بافته یا مونوفیلامنت؟ کدام برای شما مناسب‌تر است", d: "تفاوت حساسیت، کشسانی و دوام در شرایط مختلف آب.", m: 5 },
    { t: "ست شروع ماهیگیری از ساحل با چه بودجه‌ای", d: "فهرست حداقلی تجهیزات برای اولین سفر، بدون خرید اضافه.", m: 8 },
  ];
  return (
    <section id="guides" aria-labelledby="guides-title" className="scroll-mt-32 py-14 sm:py-20">
      <div className="container-x">
        <h2 id="guides-title" className="section-title">راهنمای خرید</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {guides.map((g) => (
            <a key={g.t} href="#" className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-6 transition-colors hover:border-brand-500">
              <span className="text-xs font-medium text-ink-500">{toFa(g.m)} دقیقه مطالعه</span>
              <h3 className="mt-3 text-lg font-black leading-8 text-ink-900 group-hover:text-brand-600">{g.t}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-600">{g.d}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-brand-600">خواندن مقاله<ArrowLeft className="h-4 w-4" /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols: [string, string[]][] = [
    ["فروشگاه", ["چوب ماهیگیری", "قرقره", "نخ و لیدر", "قلاب و ست‌کننده", "طعمه و لور"]],
    ["خدمات مشتریان", ["پیگیری سفارش", "روش‌های ارسال", "مرجوعی کالا", "سوالات متداول"]],
    ["رضایی", ["درباره ما", "تماس با ما", "قوانین و مقررات", "حریم خصوصی"]],
  ];
  return (
    <footer id="contact" className="scroll-mt-32 bg-ink text-ink-300">
      <div className="container-x grid gap-10 py-14 lg:grid-cols-[1.3fr_repeat(3,1fr)_1.1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-7">فروشگاه تخصصی تجهیزات ماهیگیری؛ از چوب و قرقره تا کوچک‌ترین لوازم جانبی، با مشاوره واقعی.</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold-400" /><span dir="ltr">{toFa("021-00000000")}</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold-400" /><span dir="ltr">info@rezayi-fishing.ir</span></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold-400" />نشانی فروشگاه (در فاز محتوا تکمیل می‌شود)</li>
          </ul>
        </div>
        {cols.map(([h, links]) => (
          <div key={h}>
            <h3 className="font-black text-white">{h}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">{links.map((l) => <li key={l}><a href="#" className="hover:text-white">{l}</a></li>)}</ul>
          </div>
        ))}
        <div>
          <h3 className="font-black text-white">نمادهای اعتماد</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {["نماد اینماد", "درگاه زرین‌پال"].map((l) => (
              <div key={l} className="grid h-24 place-items-center rounded-xl border border-dashed border-ink-600 p-2 text-center text-xs leading-5 text-ink-400">{l}<br />پس از اتصال</div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-ink-400">© {toFa(1405)} فروشگاه اینترنتی لوازم ماهیگیری رضایی. تمامی حقوق محفوظ است.</div>
    </footer>
  );
}
