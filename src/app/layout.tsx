import type { Metadata, Viewport } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { Splash } from "@/components/Splash";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "رضایی | لوازم ماهیگیری و شکاری",
  description: "فروشگاه تخصصی تجهیزات ماهیگیری و شکاری؛ چوب، قرقره، دوربین، چاقو و لوازم میدان با موجودی واقعی و ارسال به سراسر ایران.",
};
export const viewport: Viewport = { themeColor: "#061428", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={cinzel.variable}>
      <body className="pb-16 font-sans lg:pb-0">
        <StoreProvider>
          <Splash />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
