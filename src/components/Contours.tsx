/** خطوط هم‌عمق (نقشه عمق‌سنجی) به‌صورت رویه‌ای؛ بافت بصری اصلی برند. */
function blob(cx: number, cy: number, r: number, seed: number) {
  const pts: string[] = [];
  for (let a = 0; a < 360; a += 6) {
    const t = (a * Math.PI) / 180;
    const k = 1 + 0.14 * Math.sin(3 * t + seed) + 0.08 * Math.sin(5 * t + seed * 1.7) + 0.05 * Math.sin(2 * t + seed * 0.6);
    pts.push(`${(cx + Math.cos(t) * r * k * 1.5).toFixed(1)} ${(cy + Math.sin(t) * r * k).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}

const CLUSTERS = [
  { cx: 1120, cy: 300, from: 40, to: 400, step: 40, seed: 1 },
  { cx: 220, cy: 600, from: 30, to: 270, step: 40, seed: 2.4 },
];

export function Contours({ className, stroke = "#4D84F5", opacity = 0.18 }: { className?: string; stroke?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true" className={className}>
      {CLUSTERS.flatMap((c) =>
        Array.from({ length: Math.floor((c.to - c.from) / c.step) + 1 }, (_, i) => c.from + i * c.step).map((r) => (
          <path key={`${c.cx}-${r}`} d={blob(c.cx, c.cy, r, c.seed)} stroke={stroke} strokeOpacity={opacity} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        )),
      )}
    </svg>
  );
}
