"use client";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ColorId, MAX_PRICE, PRODUCTS } from "./data";

export type SortKey = "popular" | "new" | "cheap" | "expensive" | "discount";
export type Filters = {
  cat: string | null; brands: string[]; colors: ColorId[];
  min: number; max: number; inStock: boolean; onSale: boolean; q: string; sort: SortKey;
};
export const DEFAULT_FILTERS: Filters = {
  cat: null, brands: [], colors: [], min: 0, max: MAX_PRICE, inStock: false, onSale: false, q: "", sort: "popular",
};
export type Drawer = null | "menu" | "filters";
export type CartLine = { id: string; qty: number };

type Store = {
  filters: Filters;
  setFilters: (patch: Partial<Filters>) => void;
  resetFilters: () => void;
  /** فیلتر را با مقدار جدید جایگزین می‌کند و به بخش فروشگاه می‌رود */
  goShop: (patch?: Partial<Filters>) => void;
  cart: CartLine[]; cartCount: number; cartTotal: number;
  addToCart: (id: string) => void; setQty: (id: string, qty: number) => void;
  wish: string[]; toggleWish: (id: string) => void;
  drawer: Drawer; setDrawer: (d: Drawer) => void;
  toast: { key: number; text: string } | null;
};

const Ctx = createContext<Store | null>(null);
export const useStore = () => {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside <StoreProvider>");
  return s;
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setF] = useState<Filters>(DEFAULT_FILTERS);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wish, setWish] = useState<string[]>([]);
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [toast, setToast] = useState<Store["toast"]>(null);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("rz-cart") ?? "[]"));
      setWish(JSON.parse(localStorage.getItem("rz-wish") ?? "[]"));
    } catch {}
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem("rz-cart", JSON.stringify(cart));
      localStorage.setItem("rz-wish", JSON.stringify(wish));
    } catch {}
  }, [cart, wish]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const setFilters = useCallback((patch: Partial<Filters>) => setF((f) => ({ ...f, ...patch })), []);
  const resetFilters = useCallback(() => setF((f) => ({ ...DEFAULT_FILTERS, sort: f.sort })), []);
  const goShop = useCallback((patch: Partial<Filters> = {}) => {
    setF({ ...DEFAULT_FILTERS, ...patch });
    setDrawer(null);
    const scroll = () => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (pathname !== "/") {
      router.push("/#shop");
      setTimeout(scroll, 120);
    } else {
      setTimeout(scroll, 60);
    }
  }, [pathname, router]);

  const addToCart = useCallback((id: string) => {
    setCart((c) => (c.some((l) => l.id === id) ? c.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...c, { id, qty: 1 }]));
    setToast({ key: Date.now(), text: "به سبد خرید اضافه شد" });
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => (qty <= 0 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);
  const toggleWish = useCallback((id: string) => {
    setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  }, []);

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const cartTotal = cart.reduce((s, l) => s + l.qty * (PRODUCTS.find((p) => p.id === l.id)?.price ?? 0), 0);

  const value = useMemo<Store>(
    () => ({ filters, setFilters, resetFilters, goShop, cart, cartCount, cartTotal, addToCart, setQty, wish, toggleWish, drawer, setDrawer, toast }),
    [filters, setFilters, resetFilters, goShop, cart, cartCount, cartTotal, addToCart, setQty, wish, toggleWish, drawer, toast],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
