import Image from "next/image";
import { cn } from "@/lib/cn";

/** فقط تصاویر محلی public — پس‌زمینه مشکی استودیویی */
export function ProductImage({
  src,
  alt,
  className,
  priority,
  fill = true,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-white", className)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
        className="object-contain p-1 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}
