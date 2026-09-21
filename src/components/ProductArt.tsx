import type { ArtKind } from "@/lib/data";

const INK = "#090B0E";
const GOLD = "#D4A017";

/** تصویرسازی برداری موقت محصولات؛ در فاز ۲ با تصاویر واقعی (S3) جایگزین می‌شود. */
export function ProductArt({ kind, color = "#1F5FE0", className }: { kind: ArtKind; color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {kind === "rod" && (
        <>
          <path d="M26 142 L64 110" stroke={color} strokeWidth="10" />
          <path d="M64 110 L178 18" stroke={INK} strokeWidth="4" />
          <path d="M120 64 L178 18" stroke={INK} strokeWidth="2.5" />
          <rect x="62" y="98" width="18" height="9" rx="3" transform="rotate(-39 71 102)" fill={GOLD} />
          {[[88, 89], [112, 68], [136, 49], [158, 32]].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="3.4" stroke={INK} strokeWidth="1.6" />
          ))}
          <path d="M178 18 C190 50 186 86 178 112" stroke={INK} strokeWidth="1.2" opacity=".45" />
          <path d="M178 112 v8 a5 5 0 1 1 -5 -5" stroke={INK} strokeWidth="1.8" />
        </>
      )}
      {kind === "reel" && (
        <>
          <circle cx="100" cy="66" r="40" fill={color} />
          <circle cx="100" cy="66" r="27" stroke="#fff" strokeOpacity=".55" strokeWidth="3" />
          <circle cx="100" cy="66" r="9" fill={INK} />
          <path d="M100 106 v20" stroke={INK} strokeWidth="10" />
          <rect x="66" y="124" width="68" height="10" rx="5" fill={INK} />
          <path d="M140 66 h32" stroke={INK} strokeWidth="4" />
          <circle cx="176" cy="66" r="9" fill={GOLD} />
          <path d="M60 40 C70 26 84 20 100 20" stroke={INK} strokeWidth="3" />
        </>
      )}
      {kind === "line" && (
        <>
          <ellipse cx="100" cy="112" rx="54" ry="15" fill={color} />
          <rect x="46" y="44" width="108" height="68" fill={color} />
          <ellipse cx="100" cy="44" rx="54" ry="15" fill="#fff" fillOpacity=".3" />
          <ellipse cx="100" cy="44" rx="54" ry="15" stroke={INK} strokeWidth="2.5" />
          <path d="M46 44 v68 M154 44 v68" stroke={INK} strokeWidth="2.5" />
          {[62, 76, 90, 104].map((y) => (
            <path key={y} d={`M48 ${y} Q100 ${y + 12} 152 ${y}`} stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
          ))}
          <circle cx="100" cy="44" r="7" fill={INK} />
        </>
      )}
      {kind === "lure" && (
        <>
          <path d="M34 80 C58 42 128 38 162 72 C130 108 58 112 34 80 Z" fill={color} />
          <path d="M162 72 L190 52 L190 94 Z" fill={color} fillOpacity=".85" />
          <path d="M58 58 C90 48 120 52 146 66" stroke="#fff" strokeOpacity=".5" strokeWidth="3" />
          <circle cx="60" cy="76" r="6" fill="#fff" />
          <circle cx="59" cy="76" r="2.6" fill={INK} />
          <path d="M78 62 C74 80 76 92 82 104" stroke={INK} strokeOpacity=".35" strokeWidth="2" />
          <path d="M92 102 v12 a6 6 0 0 0 12 0 l-3 -4" stroke={INK} strokeWidth="2.4" />
          <path d="M132 98 v12 a6 6 0 0 0 12 0 l-3 -4" stroke={INK} strokeWidth="2.4" />
          <path d="M34 80 h-8" stroke={INK} strokeWidth="2.4" />
          <circle cx="22" cy="80" r="4" stroke={INK} strokeWidth="2" />
        </>
      )}
      {kind === "hook" && (
        <>
          <circle cx="106" cy="26" r="9" stroke={INK} strokeWidth="4" />
          <path d="M106 35 V100 a30 30 0 1 1 -52 -18 l8 -12" stroke={color} strokeWidth="9" />
          <path d="M62 70 l12 6" stroke={color} strokeWidth="6" />
          <path d="M128 64 v30" stroke={INK} strokeWidth="1.5" opacity=".3" />
        </>
      )}
      {kind === "box" && (
        <>
          <rect x="34" y="42" width="132" height="84" rx="10" fill={color} />
          <rect x="34" y="42" width="132" height="84" rx="10" stroke={INK} strokeWidth="3" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={44 + i * 30} y="54" width="24" height="26" rx="4" fill="#fff" fillOpacity=".4" />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={44 + i * 30} y="88" width="24" height="26" rx="4" fill="#fff" fillOpacity=".4" />
          ))}
          <rect x="88" y="34" width="24" height="12" rx="4" fill={GOLD} />
        </>
      )}
      {kind === "optic" && (
        <>
          <rect x="28" y="58" width="52" height="36" rx="8" fill={color} />
          <rect x="120" y="58" width="52" height="36" rx="8" fill={color} />
          <path d="M80 76 h40" stroke={INK} strokeWidth="6" />
          <circle cx="54" cy="76" r="12" stroke="#fff" strokeOpacity=".5" strokeWidth="3" />
          <circle cx="146" cy="76" r="12" stroke="#fff" strokeOpacity=".5" strokeWidth="3" />
          <path d="M54 42 v12 M146 42 v12" stroke={INK} strokeWidth="4" />
        </>
      )}
      {kind === "knife" && (
        <>
          <path d="M40 110 L120 40 L138 52 L58 122 Z" fill={color} />
          <path d="M58 122 L48 132 L36 120 L46 110" fill={INK} />
          <rect x="112" y="36" width="56" height="14" rx="4" transform="rotate(-40 140 43)" fill={GOLD} />
          <path d="M120 40 L138 52" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}
