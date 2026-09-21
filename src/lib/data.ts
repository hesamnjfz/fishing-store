// داده‌های نمونه (Mock). تصاویر فقط از /public/1.png … /4.png

export type ColorId = "blue" | "black" | "gold" | "red" | "green" | "silver";
export const COLORS: Record<ColorId, { name: string; hex: string }> = {
  blue: { name: "آبی", hex: "#1F5FE0" },
  black: { name: "مشکی", hex: "#14181D" },
  gold: { name: "زرد", hex: "#D4A017" },
  red: { name: "قرمز", hex: "#D92D2D" },
  green: { name: "سبز", hex: "#2E9E5B" },
  silver: { name: "نقره‌ای", hex: "#A9B4C0" },
};

export type ArtKind = "rod" | "reel" | "line" | "lure" | "hook" | "box" | "optic" | "knife";

export type SubCategory = { id: string; name: string };
export type Category = { id: string; name: string; art: ArtKind; blurb: string; children: SubCategory[] };

export const CATEGORIES: Category[] = [
  {
    id: "hook", name: "قلاب ماهیگیری", art: "hook", blurb: "قلاب تک، دوخاره و تاکتیکال",
    children: [
      { id: "hook-single", name: "قلاب تک" },
      { id: "hook-assist", name: "اسیست و سنگین" },
    ],
  },
  {
    id: "rod", name: "چوب ماهیگیری", art: "rod", blurb: "چوب و ست قرقره اسپین",
    children: [
      { id: "rod-spin", name: "چوب اسپین" },
      { id: "rod-combo", name: "ست چوب و قرقره" },
    ],
  },
  {
    id: "hunt", name: "لوازم شکاری", art: "optic", blurb: "اسلحه و چراغ میدان",
    children: [
      { id: "hunt-rifle", name: "اسلحه شکاری" },
      { id: "hunt-light", name: "چراغ قوه" },
    ],
  },
];

export const catById = (id: string) =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES.flatMap((c) => c.children).find((c) => c.id === id);
export const parentOf = (id: string | null) =>
  id ? CATEGORIES.find((c) => c.id === id || c.children.some((ch) => ch.id === id)) : undefined;

export type Product = {
  id: string; name: string; brand: string; cat: string; art: ArtKind;
  image: string; blurb: string; desc: string;
  specs: { label: string; value: string }[];
  price: number; oldPrice?: number; colors: ColorId[]; stock: number;
  rating: number; reviews: number; sales: number; isNew?: boolean;
};

export const BRAND_FA: Record<string, string> = {
  Owner: "اونر", Gamakatsu: "گاماکاتسو", Mustad: "موستاد", VMC: "وی‌ام‌سی",
  Shimano: "شیمانو", Daiwa: "دایوا", Penn: "پن", Okuma: "اوکوما",
  Browning: "براونینگ", Remington: "رمینگتون", Benelli: "بنلی", Mossberg: "ماسبرگ",
  Fenix: "فینیکس", Nitecore: "نایت‌کور", Olight: "اُلایت", Streamlight: "استریم‌لایت",
  Beretta: "برتا",
};

export const MAX_PRICE = 15_000_000;
export const PRICE_STEP = 100_000;

/** فقط همین چهار فایل در public */
const IMG = {
  hook: "/1.png",
  gun: "/2.png",
  light: "/3.png",
  rod: "/4.png",
} as const;

/** ۱۶ آگهی — هر دسته ۴ تا، چیدمان درهم‌آمیخته */
export const PRODUCTS: Product[] = [
  {
    id: "p1", name: "چوب اسپین Black Carbon 2.1m", brand: "Shimano", cat: "rod-spin", art: "rod",
    image: IMG.rod, blurb: "کربن سبک، اکشن سریع",
    desc: "چوب اسپین کربنی با قرقره هماهنگ؛ مناسب لور متوسط و ماهیان شکارچی در آب شیرین.",
    specs: [{ label: "طول", value: "۲.۱ متر" }, { label: "پاور", value: "M" }, { label: "بخش", value: "۲ تکه" }, { label: "نوع", value: "اسپین" }],
    price: 8_900_000, oldPrice: 10_200_000, colors: ["black", "red"], stock: 7, rating: 4.8, reviews: 64, sales: 410, isNew: true,
  },
  {
    id: "p2", name: "قلاب تاکتیکال Pro Cut 3/0", brand: "Owner", cat: "hook-single", art: "hook",
    image: IMG.hook, blurb: "نوک تیز، فولاد سخت",
    desc: "قلاب تک با پوشش ضدزنگ و نقطه نفوذ بالا؛ مناسب لور نرم و ریگ‌های سنگین.",
    specs: [{ label: "سایز", value: "۳/۰" }, { label: "تعداد", value: "۱۰ عدد" }, { label: "جنس", value: "فولاد" }, { label: "خاره", value: "دوتایی" }],
    price: 480_000, colors: ["black", "silver"], stock: 55, rating: 4.6, reviews: 112, sales: 980,
  },
  {
    id: "p3", name: "چراغ قوه X800 Tactical", brand: "Fenix", cat: "hunt-light", art: "optic",
    image: IMG.light, blurb: "تاکتیکال، برد بالا",
    desc: "چراغ قوه تاکتیکال با بدنه آلومینیومی، گیره کمربند و خروجی نور قوی برای میدان و کمپ.",
    specs: [{ label: "مدل", value: "X800" }, { label: "لومن", value: "۲۰۰۰+" }, { label: "ضدآب", value: "IPX8" }, { label: "شارژ", value: "USB-C" }],
    price: 3_950_000, colors: ["black", "red"], stock: 22, rating: 4.7, reviews: 89, sales: 520, isNew: true,
  },
  {
    id: "p4", name: "تفنگ شکاری 12GA Tactical", brand: "Browning", cat: "hunt-rifle", art: "optic",
    image: IMG.gun, blurb: "۱۲ گیج، ریل اپتیک",
    desc: "اسلحه شکاری تاکتیکال ۱۲ گیج با قنداق قابل تنظیم، ریل پیکاتینی و کمپنساتور دهانه.",
    specs: [{ label: "کالیبر", value: "12 GA" }, { label: "ظرفیت", value: "۵+۱" }, { label: "ریل", value: "Picatinny" }, { label: "وزن", value: "۳.۴ کیلو" }],
    price: 14_200_000, oldPrice: 15_000_000, colors: ["black"], stock: 4, rating: 4.9, reviews: 31, sales: 120,
  },
  {
    id: "p5", name: "قلاب سنگین Offset 5/0", brand: "Gamakatsu", cat: "hook-assist", art: "hook",
    image: IMG.hook, blurb: "برای لور و جیگ سنگین",
    desc: "قلاب افست با مقاومت کششی بالا؛ ایده‌آل برای لور نرم بزرگ و ماهیان قوی.",
    specs: [{ label: "سایز", value: "۵/۰" }, { label: "تعداد", value: "۸ عدد" }, { label: "پوشش", value: "مات" }, { label: "کاربرد", value: "افست" }],
    price: 620_000, oldPrice: 740_000, colors: ["black"], stock: 40, rating: 4.5, reviews: 76, sales: 640,
  },
  {
    id: "p6", name: "ست چوب و قرقره Black Combo", brand: "Daiwa", cat: "rod-combo", art: "rod",
    image: IMG.rod, blurb: "ست آماده اسپین",
    desc: "ست کامل چوب و قرقره مشکی با رینگ‌های قرمز؛ آماده استفاده برای مبتدی تا نیمه‌حرفه‌ای.",
    specs: [{ label: "طول", value: "۲.۴ متر" }, { label: "قرقره", value: "۴۰۰۰" }, { label: "بخش", value: "۲ تکه" }, { label: "رنگ", value: "مشکی/قرمز" }],
    price: 11_500_000, colors: ["black", "red"], stock: 9, rating: 4.8, reviews: 54, sales: 290,
  },
  {
    id: "p7", name: "تفنگ شکاری Field Pro 12GA", brand: "Benelli", cat: "hunt-rifle", art: "optic",
    image: IMG.gun, blurb: "میدان و شکار پرنده",
    desc: "مدل میدان با تعادل خوب، قنداق ارگونومیک و ایمنی قرمز مشخص؛ مناسب شکار و تمرین.",
    specs: [{ label: "کالیبر", value: "12 GA" }, { label: "لوله", value: "۲۸ اینچ" }, { label: "قنداق", value: "قابل تنظیم" }, { label: "ایمنی", value: "دستی" }],
    price: 13_100_000, colors: ["black"], stock: 5, rating: 4.7, reviews: 22, sales: 95, isNew: true,
  },
  {
    id: "p8", name: "چراغ قوه Patrol X800", brand: "Nitecore", cat: "hunt-light", art: "optic",
    image: IMG.light, blurb: "ضدضربه، گیره کمربند",
    desc: "نسخه گشت و میدان با خنک‌کننده سر، دکمه قرمز و بدنه آج‌دار برای گرفتن مطمئن.",
    specs: [{ label: "مدل", value: "X800" }, { label: "برد", value: "۳۵۰ م" }, { label: "باتری", value: "قابل شارژ" }, { label: "وزن", value: "۱۸۰ گرم" }],
    price: 3_450_000, oldPrice: 3_990_000, colors: ["black", "red"], stock: 18, rating: 4.6, reviews: 71, sales: 440,
  },
  {
    id: "p9", name: "چوب کست Black Series MH", brand: "Penn", cat: "rod-spin", art: "rod",
    image: IMG.rod, blurb: "پاور MH، پرتاب دور",
    desc: "چوب قدرتی برای لور سنگین و سرف سبک؛ دسته ارگونومیک و رینگ‌های مقاوم.",
    specs: [{ label: "طول", value: "۲.۷ متر" }, { label: "پاور", value: "MH" }, { label: "اکشن", value: "Fast" }, { label: "بخش", value: "۲ تکه" }],
    price: 7_600_000, colors: ["black", "red"], stock: 11, rating: 4.5, reviews: 48, sales: 310,
  },
  {
    id: "p10", name: "تفنگ شکاری Classic Rail 12GA", brand: "Beretta", cat: "hunt-rifle", art: "optic",
    image: IMG.gun, blurb: "۱۲ گیج، ریل اپتیک",
    desc: "اسلحه شکاری ۱۲ گیج با ریل بالایی و تعادل مناسب برای شکار و تمرین میدان.",
    specs: [{ label: "کالیبر", value: "12 GA" }, { label: "ظرفیت", value: "۴+۱" }, { label: "ریل", value: "Picatinny" }, { label: "وزن", value: "۳.۳ کیلو" }],
    price: 12_400_000, colors: ["black"], stock: 8, rating: 4.6, reviews: 38, sales: 1100,
  },
  {
    id: "p11", name: "چراغ قوه Camp X800 Mini", brand: "Olight", cat: "hunt-light", art: "optic",
    image: IMG.light, blurb: "جمع‌وجور برای کمپ",
    desc: "نسخه جمع‌وجور همان سری X800؛ مناسب کوله‌پشتی، کمپ شبانه و ردیابی کوتاه.",
    specs: [{ label: "مدل", value: "X800 Mini" }, { label: "لومن", value: "۱۲۰۰" }, { label: "ضدآب", value: "IPX7" }, { label: "حالت", value: "۳ سطح" }],
    price: 2_850_000, colors: ["black"], stock: 28, rating: 4.5, reviews: 60, sales: 380,
  },
  {
    id: "p12", name: "تفنگ شکاری Tactical Rail 12GA", brand: "Mossberg", cat: "hunt-rifle", art: "optic",
    image: IMG.gun, blurb: "ریل کامل، قنداق اسکلتی",
    desc: "مدل ریل‌دار با قنداق اسکلتی و پد لگدگیر؛ آماده نصب دوربین و لوازم جانبی.",
    specs: [{ label: "کالیبر", value: "12 GA" }, { label: "ریل", value: "کامل" }, { label: "قنداق", value: "اسکلتی" }, { label: "دهانه", value: "پورت‌دار" }],
    price: 12_800_000, oldPrice: 13_900_000, colors: ["black"], stock: 3, rating: 4.8, reviews: 19, sales: 80,
  },
  {
    id: "p13", name: "قلاب وی‌ام‌سی Predator 4/0", brand: "VMC", cat: "hook-assist", art: "hook",
    image: IMG.hook, blurb: "شکارچی آب شیرین",
    desc: "قلاب قدرتی برای گونه‌های شکارچی؛ لبه تیز کارخانه‌ای و مقاومت خمش بالا.",
    specs: [{ label: "سایز", value: "۴/۰" }, { label: "تعداد", value: "۹ عدد" }, { label: "پوشش", value: "مشکی" }, { label: "کاربرد", value: "پرادیتور" }],
    price: 540_000, colors: ["black"], stock: 36, rating: 4.7, reviews: 58, sales: 520, isNew: true,
  },
  {
    id: "p14", name: "چوب اسپین Okuma Shadow 2.13", brand: "Okuma", cat: "rod-spin", art: "rod",
    image: IMG.rod, blurb: "سبک و حساس",
    desc: "چوب اسپین متعادل با حساسیت نوک بالا؛ مناسب باس و ماهیان ساحلی سبک.",
    specs: [{ label: "طول", value: "۲.۱۳ متر" }, { label: "پاور", value: "ML" }, { label: "بخش", value: "۲ تکه" }, { label: "نوع", value: "اسپین" }],
    price: 6_400_000, oldPrice: 7_100_000, colors: ["black", "red"], stock: 14, rating: 4.6, reviews: 41, sales: 260,
  },
  {
    id: "p15", name: "چراغ قوه Stream X800 Duty", brand: "Streamlight", cat: "hunt-light", art: "optic",
    image: IMG.light, blurb: "ماموریت و بقا",
    desc: "نسخه دیوتی با حلقه قرمز کنترل و بدنه ضدضربه؛ مناسب شکار شبانه و امداد.",
    specs: [{ label: "مدل", value: "X800 Duty" }, { label: "برد", value: "۴۰۰ م" }, { label: "بدنه", value: "آلومینیوم" }, { label: "گیره", value: "دارد" }],
    price: 4_200_000, colors: ["black", "red"], stock: 12, rating: 4.8, reviews: 44, sales: 210,
  },
  {
    id: "p16", name: "تفنگ شکاری Remington Tac-12", brand: "Remington", cat: "hunt-rifle", art: "optic",
    image: IMG.gun, blurb: "تاکتیکال شکاری",
    desc: "مدل تاکتیکال با ایمنی مشخص، ریل بالایی و تعادل مناسب برای شکار میان‌برد.",
    specs: [{ label: "کالیبر", value: "12 GA" }, { label: "ظرفیت", value: "۴+۱" }, { label: "لوله", value: "۱۸.۵ اینچ" }, { label: "وزن", value: "۳.۲ کیلو" }],
    price: 11_900_000, colors: ["black"], stock: 6, rating: 4.6, reviews: 27, sales: 140,
  },
];

export const BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);
