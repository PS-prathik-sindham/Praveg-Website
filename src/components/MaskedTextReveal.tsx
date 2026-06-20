"use client";

import { Fragment, useEffect, useRef, useState } from "react";

export type RevealSegment = {
  text: string;
  className?: string;
};

type Props = {
  segments: RevealSegment[];
  className?: string;
  /** "mask" = words rise from behind a clip (headline); "fade" = soft fade + rise + deblur (body) */
  variant?: "mask" | "fade";
  /** "mount" = animate on load; "inView" = animate when scrolled into view */
  trigger?: "mount" | "inView";
  /** seconds of delay added per word */
  stagger?: number;
  /** seconds each word takes to reveal */
  duration?: number;
  /** seconds before the first word starts */
  delay?: number;
};

/**
 * MaskedTextReveal, reveals text word-by-word with a staggered delay.
 * - variant "mask": each word rises up from behind a clipping mask.
 * - variant "fade": each word fades and rises into focus from a soft blur.
 * - trigger "mount": runs on load. "inView": runs when scrolled into view.
 * Respects prefers-reduced-motion.
 */
export default function MaskedTextReveal({
  segments,
  className,
  variant = "mask",
  trigger = "mount",
  stagger = 0.05,
  duration = 0.8,
  delay = 0.05,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [play, setPlay] = useState(trigger !== "inView");

  useEffect(() => {
    if (trigger !== "inView" || play) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setPlay(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPlay(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger, play]);

  const label = segments.map((s) => s.text).join(" ");
  const wordClass = variant === "fade" ? "mtr-word-fade" : "mtr-word";
  const innerClass = variant === "fade" ? "mtr-inner-fade" : "mtr-inner";
  const playState =
    trigger === "inView" ? (play ? "running" : "paused") : undefined;
  let word = 0;

  return (
    <span ref={ref} className={className} aria-label={label}>
      {segments.map((seg, si) => {
        const words = seg.text.split(" ");
        return (
          <span key={si} className={seg.className} aria-hidden="true">
            {words.map((w, wi) => {
              const i = word++;
              return (
                <Fragment key={wi}>
                  <span className={wordClass}>
                    <span
                      className={innerClass}
                      style={{
                        animationDelay: `${delay + i * stagger}s`,
                        animationDuration: `${duration}s`,
                        animationPlayState: playState,
                      }}
                    >
                      {w}
                    </span>
                  </span>
                  {wi < words.length - 1 ? " " : null}
                </Fragment>
              );
            })}
            {si < segments.length - 1 ? " " : null}
          </span>
        );
      })}
    </span>
  );
}
