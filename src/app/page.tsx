import { SiteShell } from "@/components/SiteShell";
import { Hero } from "@/components/Hero";
import { Shop } from "@/components/Shop";
import { Brands, Categories, Deals, Guides, TrustStrip } from "@/components/Sections";

export default function Home() {
  return (
    <SiteShell>
      <main id="top">
        <Shop />
        <Deals />
        <Categories />
        <Brands />
        <Guides />
        <Hero />
        <TrustStrip />
      </main>
    </SiteShell>
  );
}
