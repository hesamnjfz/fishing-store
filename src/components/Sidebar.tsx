"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Filter, Headset, Search, SlidersHorizontal, Tag } from "lucide-react";
import { BRANDS, BRAND_FA, CATEGORIES, COLORS, ColorId, MAX_PRICE, PRICE_STEP, PRODUCTS, parentOf } from "@/lib/data";
import { fmt, toFa } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import { ProductArt } from "./ProductArt";

function Section({
  title,
  badge,
  defaultOpen = true,
  icon,
  children,
}: {
  title: string;
  badge?: number;
  defaultOpen?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group border-t border-ink-100 first:border-t-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-3.5 text-[0.92rem] font-black text-ink-900">
        <span className="flex min-w-0 items-center gap-2">
          {icon && <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">{icon}</span>}
          <span className="truncate">{title}</span>
          {!!badge && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1.5 text-[0.65rem] font-bold text-white">
              {toFa(badge)}
            </span>
          )}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-ink-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}

const countIn = (ids: string[]) => PRODUCTS.filter((p) => ids.includes(p.cat)).length;

function CategoryTree() {
  const { filters, setFilters } = useStore();
  const [open, setOpen] = useState<string | null>(parentOf(filters.cat)?.id ?? "rod");
  useEffect(() => {
    const id = parentOf(filters.cat)?.id;
    if (id) setOpen(id);
  }, [filters.cat]);

  const row = (active: boolean) =>
    cn(
      "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-start text-sm transition-colors",
      active
        ? "bg-brand-50 font-bold text-brand-700 shadow-[inset_-3px_0_0_theme(colors.brand.500)]"
        : "text-ink-700 hover:bg-ink-50",
    );

  return (
    <ul className="space-y-0.5">
      <li>
        <button onClick={() => setFilters({ cat: null })} className={row(filters.cat === null)} aria-current={filters.cat === null || undefined}>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-ink-100 text-[0.65rem] font-black text-ink-500">همه</span>
          همه محصولات
          <span className="ms-auto text-xs tabular-nums text-ink-400">{toFa(PRODUCTS.length)}</span>
        </button>
      </li>
      {CATEGORIES.map((c) => {
        const expanded = open === c.id;
        const active = filters.cat === c.id;
        return (
          <li key={c.id}>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => { setFilters({ cat: c.id }); setOpen(c.id); }}
                className={cn(row(active), "flex-1")}
                aria-current={active || undefined}
              >
                <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-lg", active ? "bg-brand-100" : "bg-ink-50")}>
                  <ProductArt kind={c.art} color={active ? "#1F5FE0" : "#5B6673"} className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1 truncate">{c.name}</span>
                <span className="text-xs tabular-nums text-ink-400">{toFa(countIn(c.children.map((x) => x.id)))}</span>
              </button>
              <button
                onClick={() => setOpen(expanded ? null : c.id)}
                aria-expanded={expanded}
                aria-label={`زیردسته‌های ${c.name}`}
                className="grid h-9 w-8 shrink-0 place-items-center rounded-lg text-ink-400 hover:bg-ink-50 hover:text-ink-700"
              >
                <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
              </button>
            </div>
            {expanded && (
              <ul className="my-1 ms-4 space-y-0.5 border-s border-ink-200 ps-2.5">
                {c.children.map((ch) => {
                  const a = filters.cat === ch.id;
                  return (
                    <li key={ch.id}>
                      <button
                        onClick={() => setFilters({ cat: ch.id })}
                        aria-current={a || undefined}
                        className={cn(
                          "flex w-full items-center rounded-lg px-2.5 py-1.5 text-start text-[0.82rem] transition-colors",
                          a ? "bg-brand-50 font-bold text-brand-700" : "text-ink-600 hover:bg-ink-50 hover:text-ink-900",
                        )}
                      >
                        {ch.name}
                        <span className="ms-auto text-xs tabular-nums text-ink-400">{toFa(countIn([ch.id]))}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function PriceRange() {
  const { filters, setFilters } = useStore();
  const { min, max } = filters;
  const pct = (v: number) => (v / MAX_PRICE) * 100;
  return (
    <div>
      <div className="range-dual relative mx-1 h-6">
        <div className="absolute inset-x-0 top-[10px] h-1.5 rounded-full bg-ink-100" />
        <div
          className="absolute top-[10px] h-1.5 rounded-full bg-brand-500"
          style={{ insetInlineStart: `${pct(min)}%`, width: `${pct(max) - pct(min)}%` }}
        />
        <input type="range" min={0} max={MAX_PRICE} step={PRICE_STEP} value={min} aria-label="حداقل قیمت" onChange={(e) => setFilters({ min: Math.min(+e.target.value, max - PRICE_STEP) })} />
        <input type="range" min={0} max={MAX_PRICE} step={PRICE_STEP} value={max} aria-label="حداکثر قیمت" onChange={(e) => setFilters({ max: Math.max(+e.target.value, min + PRICE_STEP) })} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        {([["از", min], ["تا", max]] as const).map(([l, v]) => (
          <div key={l} className="rounded-xl border border-ink-100 bg-ink-50/80 px-3 py-2.5">
            <span className="text-ink-500">{l}</span>
            <div className="mt-0.5 text-sm font-black tabular-nums text-ink-900">
              {fmt(+v)} <span className="text-[0.68rem] font-medium text-ink-500">تومان</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandList() {
  const { filters, setFilters } = useStore();
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);
  const list = useMemo(() => BRANDS.filter((b) => `${b} ${BRAND_FA[b]}`.toLowerCase().includes(q.trim().toLowerCase())), [q]);
  const shown = all || q ? list : list.slice(0, 6);
  const toggle = (b: string) =>
    setFilters({ brands: filters.brands.includes(b) ? filters.brands.filter((x) => x !== b) : [...filters.brands, b] });

  return (
    <div>
      <label className="relative block">
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجوی برند"
          aria-label="جستجوی برند"
          className="h-10 w-full rounded-xl bg-ink-50 ps-9 pe-3 text-sm outline-none ring-1 ring-ink-100 placeholder:text-ink-400 focus:bg-white focus:ring-2 focus:ring-brand-500"
        />
      </label>
      <ul className="mt-2 space-y-0.5">
        {shown.map((b) => {
          const on = filters.brands.includes(b);
          return (
            <li key={b}>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-sm hover:bg-ink-50">
                <input type="checkbox" checked={on} onChange={() => toggle(b)} className="peer sr-only" />
                <span
                  className={cn(
                    "grid h-[1.15rem] w-[1.15rem] shrink-0 place-items-center rounded-[5px] border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500",
                    on ? "border-brand-600 bg-brand-600" : "border-ink-300 bg-white",
                  )}
                >
                  {on && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                </span>
                <span className={cn("flex-1", on && "font-bold text-ink-900")}>{BRAND_FA[b]}</span>
                <span className="text-xs text-ink-400" dir="ltr">{b}</span>
              </label>
            </li>
          );
        })}
        {shown.length === 0 && <li className="px-2 py-3 text-sm text-ink-500">برندی با این نام پیدا نشد.</li>}
      </ul>
      {!q && list.length > 6 && (
        <button onClick={() => setAll((v) => !v)} className="mt-1.5 px-2 text-sm font-bold text-brand-600 hover:underline">
          {all ? "نمایش کمتر" : `نمایش همه برندها (${toFa(list.length)})`}
        </button>
      )}
    </div>
  );
}

function Swatches() {
  const { filters, setFilters } = useStore();
  return (
    <div className="flex flex-wrap gap-2.5">
      {(Object.keys(COLORS) as ColorId[]).map((c) => {
        const on = filters.colors.includes(c);
        return (
          <button
            key={c}
            onClick={() => setFilters({ colors: on ? filters.colors.filter((x) => x !== c) : [...filters.colors, c] })}
            aria-pressed={on}
            aria-label={COLORS[c].name}
            title={COLORS[c].name}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full ring-offset-2 transition",
              on ? "ring-2 ring-brand-500" : "ring-1 ring-ink-200 hover:ring-ink-400",
            )}
            style={{ background: COLORS[c].hex }}
          >
            {on && <Check className={cn("h-4 w-4", c === "silver" || c === "gold" ? "text-ink-900" : "text-white")} strokeWidth={3} />}
          </button>
        );
      })}
    </div>
  );
}

function Switch({ label, hint, on, onChange }: { label: string; hint?: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button role="switch" aria-checked={on} onClick={() => onChange(!on)} className="flex w-full items-center justify-between gap-3 rounded-xl px-1 py-2.5 text-start hover:bg-ink-50">
      <span>
        <span className="block text-sm font-medium text-ink-800">{label}</span>
        {hint && <span className="text-xs text-ink-500">{hint}</span>}
      </span>
      <span className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", on ? "bg-brand-600" : "bg-ink-200")}>
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[inset-inline-start,inset-inline-end]"
          style={on ? { insetInlineEnd: "0.125rem", insetInlineStart: "auto" } : { insetInlineStart: "0.125rem", insetInlineEnd: "auto" }}
        />
      </span>
    </button>
  );
}

export function activeFilterCount(f: ReturnType<typeof useStore>["filters"]) {
  return (f.cat ? 1 : 0) + f.brands.length + f.colors.length + (f.min > 0 || f.max < MAX_PRICE ? 1 : 0) + (f.inStock ? 1 : 0) + (f.onSale ? 1 : 0);
}

export function SidebarPanel() {
  const { filters, setFilters } = useStore();
  return (
    <div>
      <Section title="دسته‌بندی" icon={<Filter className="h-3.5 w-3.5" />}>
        <CategoryTree />
      </Section>
      <Section title="محدوده قیمت" badge={filters.min > 0 || filters.max < MAX_PRICE ? 1 : 0} icon={<SlidersHorizontal className="h-3.5 w-3.5" />}>
        <PriceRange />
      </Section>
      <Section title="برند" badge={filters.brands.length} icon={<Tag className="h-3.5 w-3.5" />}>
        <BrandList />
      </Section>
      <Section title="رنگ" badge={filters.colors.length}>
        <Swatches />
      </Section>
      <Section title="موجودی و تخفیف">
        <Switch label="فقط کالاهای موجود" on={filters.inStock} onChange={(v) => setFilters({ inStock: v })} />
        <Switch label="فقط کالاهای تخفیف‌دار" on={filters.onSale} onChange={(v) => setFilters({ onSale: v })} />
      </Section>
    </div>
  );
}

/** ساید‌بار دسکتاپ: چسبیده (sticky) و با اسکرول داخلی */
export function Sidebar() {
  const { filters, resetFilters } = useStore();
  const n = activeFilterCount(filters);
  return (
    <aside aria-label="فیلتر و دسته‌بندی" className="hidden lg:block">
      <div className="thin-scroll sticky top-[7rem] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-ink-100 bg-white shadow-[0_8px_30px_-20px_rgba(9,11,14,.35)]">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-ink-100 bg-white/95 px-4 py-3.5 backdrop-blur">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <SlidersHorizontal className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-black text-ink-900">فیلتر و دسته‌بندی</h2>
              <p className="text-[0.68rem] text-ink-400">{n > 0 ? `${toFa(n)} فیلتر فعال` : "بدون فیلتر فعال"}</p>
            </div>
          </div>
          {n > 0 && (
            <button onClick={resetFilters} className="rounded-lg px-2 py-1 text-xs font-bold text-alert hover:bg-alert-50">
              پاک کردن
            </button>
          )}
        </div>
        <div className="px-4"><SidebarPanel /></div>
        <div className="m-3 mt-0 overflow-hidden rounded-xl bg-gradient-to-br from-brand-950 via-brand-900 to-ink p-4 text-white">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-alert">
              <Headset className="h-4 w-4" />
            </span>
            <div className="min-w-0 text-xs leading-6">
              <p className="text-sm font-black">در انتخاب مطمئن نیستید؟</p>
              <p className="mt-0.5 text-ink-300">با کارشناس ما درباره ست ماهیگیری یا تجهیزات شکاری مشورت کنید.</p>
              <a href="tel:02100000000" dir="ltr" className="mt-2 inline-flex text-start text-sm font-black text-alert hover:text-alert-600">
                {toFa("021-00000000")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
