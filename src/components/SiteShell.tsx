import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Sections";
import { Overlays } from "./Overlays";

/** اسکلت مشترک صفحات فروشگاه */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Overlays />
    </>
  );
}
