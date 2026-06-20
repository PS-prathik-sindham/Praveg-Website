"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

// Animated terminal: types each line out, then loops (blinking cursor).
const LINES: { t: string; c: string }[] = [
  { t: "$ praveg run weekly-revenue-brief", c: "text-[#8cb2ff]" },
  { t: "↳ retrieve   finance_marts          ✓ ok", c: "text-white/75" },
  { t: "↳ run-sql    gwp_by_region          ✓ ok", c: "text-white/75" },
  { t: "↳ chart      auto-select            ✓ ok", c: "text-white/75" },
  { t: "↳ publish    weekly · slack         ✓ ok", c: "text-white/75" },
  { t: "✔ brief published → #revenue", c: "text-[#3ddc97]" },
];

export default function AnimatedTerminal() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!inView) return; // wait until the terminal scrolls into view
    let timer: ReturnType<typeof setTimeout>;
    if (line >= LINES.length) {
      timer = setTimeout(() => {
        setLine(0);
        setChars(0);
      }, 2600);
    } else if (chars < LINES[line].t.length) {
      timer = setTimeout(() => setChars((c) => c + 1), 26);
    } else {
      timer = setTimeout(() => {
        setLine((l) => l + 1);
        setChars(0);
      }, 320);
    }
    return () => clearTimeout(timer);
  }, [line, chars, inView]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-[372px] overflow-hidden rounded-2xl bg-[#090d17] font-mono shadow-[0_30px_60px_-20px_rgba(10,20,50,0.5)]">
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[12px] text-white/45">praveg, workflow</span>
      </div>

      {/* body */}
      <div className="min-h-[176px] p-5 text-[13px] leading-[1.95]">
        {LINES.slice(0, line).map((l, i) => (
          <div key={i} className={`whitespace-pre ${l.c}`}>
            {l.t}
          </div>
        ))}
        {line < LINES.length && (
          <div className={`whitespace-pre ${LINES[line].c}`}>
            {LINES[line].t.slice(0, chars)}
            <span className="ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] animate-pulse bg-[#3ddc97]" />
          </div>
        )}
      </div>
    </div>
  );
}
