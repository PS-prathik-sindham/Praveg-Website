"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  className?: string;
  /** dim opacity for not-yet-revealed words */
  dim?: number;
  /** max blur (px) on hidden words */
  blur?: number;
};

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

/**
 * ScrollTextReveal — scroll-scrubbed text reveal.
 * Words brighten and sharpen one-by-one as the element scrolls up through
 * the viewport; reverses as you scroll back. Mirrors Framer's
 * "text-reveal-scroll-helper" effect. Respects prefers-reduced-motion.
 */
export default function ScrollTextReveal({
  text,
  className,
  dim = 0.14,
  blur = 4,
}: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const words = text.split(" ");

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      wordRefs.current.forEach((w) => {
        if (w) {
          w.style.opacity = "1";
          w.style.filter = "none";
        }
      });
      return;
    }

    const n = wordRefs.current.length;
    let ticking = false;

    const apply = () => {
      ticking = false;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9; // begins when top crosses 90% of viewport
      const end = vh * 0.4; // fully revealed once top reaches 40%
      const p = clamp((start - rect.top) / (start - end), 0, 1);
      const active = p * n;
      for (let i = 0; i < n; i++) {
        const w = wordRefs.current[i];
        if (!w) continue;
        const o = clamp(active - i, 0, 1);
        w.style.opacity = (dim + (1 - dim) * o).toFixed(3);
        w.style.filter = o >= 1 ? "none" : `blur(${((1 - o) * blur).toFixed(2)}px)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [dim, blur]);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            style={{
              display: "inline-block",
              opacity: dim,
              filter: `blur(${blur}px)`,
              willChange: "opacity, filter",
            }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
