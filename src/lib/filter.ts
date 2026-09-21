import { CATEGORIES, BRAND_FA, Product } from "./data";
import type { Filters } from "./store";

export function applyFilters(list: Product[], f: Filters): Product[] {
  const parent = f.cat ? CATEGORIES.find((c) => c.id === f.cat) : undefined;
  const catIds = f.cat ? (parent ? parent.children.map((c) => c.id) : [f.cat]) : null;
  const q = f.q.trim().toLowerCase();
  const r = list.filter(
    (p) =>
      (!catIds || catIds.includes(p.cat)) &&
      (!f.brands.length || f.brands.includes(p.brand)) &&
      (!f.colors.length || p.colors.some((c) => f.colors.includes(c))) &&
      p.price >= f.min && p.price <= f.max &&
      (!f.inStock || p.stock > 0) &&
      (!f.onSale || !!p.oldPrice) &&
      (!q || `${p.name} ${p.brand} ${BRAND_FA[p.brand] ?? ""}`.toLowerCase().includes(q)),
  );
  const off = (p: Product) => (p.oldPrice ? 1 - p.price / p.oldPrice : 0);
  switch (f.sort) {
    case "cheap": return r.sort((a, b) => a.price - b.price);
    case "expensive": return r.sort((a, b) => b.price - a.price);
    case "discount": return r.sort((a, b) => off(b) - off(a));
    case "new": return r.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    default: return r.sort((a, b) => b.sales - a.sales);
  }
}
