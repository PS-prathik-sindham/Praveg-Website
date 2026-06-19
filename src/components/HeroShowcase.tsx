"use client";

import { useEffect, useRef, useState } from "react";

// Exact Figma hero "Chat" collage (node 5537-698): the real exported panel
// assets composed at their precise positions over the mountain background.
// The 1440×1080 design is rendered at native size and scaled to fit the width.
type Panel = { src: string; left: number; top: number; width: number; height: number };
const PANELS: Panel[] = [
  { src: "browser", left: 333.6, top: 285.1, width: 772.8, height: 517.5 },
  { src: "note", left: 446, top: 48, width: 548, height: 239 },
  { src: "history", left: 68, top: 182, width: 240, height: 291 },
  { src: "share", left: 1092, top: 158, width: 300, height: 393 },
  { src: "aicard", left: 464, top: 828, width: 512, height: 172 },
  { src: "docleft", left: 48, top: 563, width: 264, height: 403 },
  { src: "docright", left: 1128, top: 563, width: 264, height: 403 },
];

export default function HeroShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / 1440);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-2xl"
      style={scale ? { height: scale * 1080 } : { aspectRatio: "1440 / 1080" }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: 1440, height: 1080, transform: `scale(${scale || 0.0001})` }}
      >
        {/* mountain background (exact Figma fill) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/hero/bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" />

        {/* exact panel assets at their Figma positions */}
        {PANELS.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p.src}
            src={`/assets/hero/${p.src}.png`}
            alt=""
            className="absolute"
            style={{ left: p.left, top: p.top, width: p.width, height: p.height }}
          />
        ))}
      </div>
    </div>
  );
}
