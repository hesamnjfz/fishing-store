"use client";
import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

/** کشوی عمومی؛ side="start" یعنی از راست (RTL)، side="end" یعنی از چپ */
export function Drawer({ open, onClose, side, title, children, footer }: {
  open: boolean; onClose: () => void; side: "start" | "end"; title: string; children: ReactNode; footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  return (
    <div
      role="dialog" aria-modal="true" aria-label={title} aria-hidden={!open}
      className={cn("fixed inset-0 z-[60]", !open && "invisible pointer-events-none transition-[visibility] delay-300")}
    >
      <div onClick={onClose} className={cn("absolute inset-0 bg-ink/60 backdrop-blur-[2px] transition-opacity duration-300", open ? "opacity-100" : "opacity-0")} />
      <div
        className={cn(
          "absolute inset-y-0 flex w-[90vw] max-w-[24rem] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
          side === "start" ? "start-0" : "end-0",
          open ? "translate-x-0" : side === "start" ? "translate-x-full" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-ink-100 px-5">
          <h2 className="text-base font-black text-ink-900">{title}</h2>
          <button onClick={onClose} aria-label="بستن" className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink-100"><X className="h-5 w-5" /></button>
        </div>
        <div className="thin-scroll min-h-0 flex-1 overflow-y-auto">{children}</div>
        {footer && <div className="shrink-0 border-t border-ink-100 bg-white p-4">{footer}</div>}
      </div>
    </div>
  );
}
