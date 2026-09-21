import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { ProductDetail } from "@/components/ProductDetail";
import { PRODUCTS, productById } from "@/lib/data";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = productById(id);
  if (!p) notFound();
  return (
    <SiteShell>
      <ProductDetail p={p} />
    </SiteShell>
  );
}
