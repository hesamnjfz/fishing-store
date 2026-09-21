import { cn } from "@/lib/cn";

/** آیکون بوکمارک از PNG با ماسک رنگی */
export function BookmarkIcon({
  className,
  active,
}: {
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block shrink-0 bg-current",
        active ? "text-alert" : "text-ink-700",
        className ?? "h-5 w-5",
      )}
      style={{
        maskImage: "url(/icons/bookmark.png)",
        WebkitMaskImage: "url(/icons/bookmark.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
