const FA = "۰۱۲۳۴۵۶۷۸۹";
export const toFa = (v: number | string) => String(v).replace(/\d/g, (d) => FA[+d]);
/** عدد با جداکننده هزارگان و ارقام فارسی */
export const fmt = (n: number) => toFa(Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "٬"));
export const discountPct = (price: number, old: number) => Math.round((1 - price / old) * 100);

/** نرخ نمایشی دلار→تومان (بعداً از تنظیمات ادمین/API) */
export const USD_TOMAN = 230_000;

/** قیمت دلاری از تومان — فرمت غربی مثل $41.23 */
export const fmtUsd = (toman: number) =>
  (toman / USD_TOMAN).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

