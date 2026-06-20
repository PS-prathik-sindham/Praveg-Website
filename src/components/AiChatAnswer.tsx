"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import PegtopLoader from "./PegtopLoader";

const ANSWER =
  "I've completed your research. Feel free to ask me follow-up questions or request changes.";

type Phase = "thinking" | "typing" | "done";

export default function AiChatAnswer() {
  const [phase, setPhase] = useState<Phase>("thinking");
  const [n, setN] = useState(0);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "thinking") {
      t = setTimeout(() => {
        setN(0);
        setPhase("typing");
      }, 950);
    } else if (phase === "typing") {
      if (n < ANSWER.length) {
        t = setTimeout(() => setN((c) => c + 1), 22);
      } else {
        t = setTimeout(() => setPhase("done"), 280);
      }
    } else {
      t = setTimeout(() => setPhase("thinking"), 2800);
    }
    return () => clearTimeout(t);
  }, [phase, n]);

  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-2">
      {/* AI avatar + label */}
      <div className="flex items-center gap-2.5">
        <Logo size={22} />
        <span className="text-[12px] font-semibold text-[#6b7585]">Praveg AI</span>
      </div>

      {/* answer area */}
      <div className="min-h-[62px] text-left">
        {phase === "thinking" ? (
          <PegtopLoader />
        ) : (
          <p className="text-[13.5px] leading-[1.5] text-[#030712]">
            {ANSWER.slice(0, n)}
            {phase === "typing" && (
              <span className="ml-0.5 inline-block h-[14px] w-[2px] translate-y-[2px] animate-pulse bg-[#246bfd] align-middle" />
            )}
          </p>
        )}
      </div>

      {/* result row, slides in once the answer finishes */}
      <div
        className={`flex items-center justify-between rounded-xl border border-[#dbe6fb] bg-[#f8faff] py-1.5 pl-3.5 pr-1.5 transition-all duration-300 ease-out ${
          phase === "done"
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <span className="text-[13.5px] font-bold text-[#030712]">Q4 Sales Prediction</span>
        <span className="rounded-lg border border-[#e6e8ee] bg-white px-3.5 py-1.5 text-[13px] text-[#030712]">
          Open
        </span>
      </div>
    </div>
  );
}
