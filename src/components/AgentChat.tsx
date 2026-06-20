"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import ChatInput, { type InputPhase } from "./ChatInput";
import PegtopLoader from "./PegtopLoader";

// Self-contained interactive demo (no API): the input auto-types a question, a
// "Click" tooltip appears on the send button, and clicking it sends the message
// and streams the assistant reply. Then it auto-fills the next question, looping.
const QA: { q: string; a: string; pdf?: string }[] = [
  {
    q: "Are there any unexpected expenses that impacted our financial plan?",
    a: "The Indian electric two-wheeler (E2W) sector is currently navigating a period of profound structural transformation, characterized by aggressive consolidation among top-tier OEMs, the maturation of consumer preferences from “early adopter” enthusiasm to “mass market” pragmatism, and a regulatory landscape that is shifting from direct subsidy-driven growth to a phase of market-led sustainability. Within this volatile yet high-growth environment, Ather Energy stands at a critical inflection point as it approaches the fourth quarter of Fiscal Year 2026 (Q4 FY26).",
  },
  {
    q: "Using this information can you create an pdf report Q4 sales prediction strategy",
    a: "Done, I've compiled a Q4 FY26 sales-prediction report for the Indian E2W sector. It covers Ather's projected registrations, subsidy-adjusted pricing scenarios, and competitive share against TVS and Ola. The PDF is ready: 14 pages with charts and source citations.",
    pdf: "Q4 Sales Prediction",
  },
  {
    q: "How does our spending compare to last year's budget?",
    a: "Compared to FY25, operating spend is up 9.4%, driven mainly by R&D (+18%) and channel expansion. Marketing held roughly flat, while supply-chain costs fell 3.2% after the FAME-II adjustment was absorbed into OEM pricing.",
  },
];

const REACTIONS = ["r-like", "r-dislike", "r-copy", "r-share", "r-regen"];
const initialMessages = (): Msg[] => [
  { role: "user", text: QA[0].q },
  { role: "ai", text: QA[0].a, done: true },
];

type Msg = { role: "user" | "ai"; text: string; done?: boolean; pdf?: string };

export default function AgentChat() {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<InputPhase>("typing");
  const [qIndex, setQIndex] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: viewRef, inView } = useInView<HTMLDivElement>();

  // keep the thread scrolled to the latest content
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, input]);

  // auto-type the next question into the input — only once in view
  useEffect(() => {
    if (!inView) return;
    if (phase !== "typing") return;
    const q = QA[qIndex].q;
    if (input.length < q.length) {
      const t = setTimeout(() => setInput(q.slice(0, input.length + 1)), 26);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("ready"), 250);
    return () => clearTimeout(t);
  }, [phase, input, qIndex, inView]);

  // stream the assistant reply once a message has been sent
  useEffect(() => {
    if (phase !== "responding") return;
    const full = QA[qIndex].a;
    const last = messages[messages.length - 1];
    if (!last || last.role !== "ai") return;

    if (last.text.length < full.length) {
      const step = Math.min(3, full.length - last.text.length); // a few chars per tick
      const t = setTimeout(() => {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { ...copy[copy.length - 1], text: full.slice(0, last.text.length + step) };
          return copy;
        });
      }, 14);
      return () => clearTimeout(t);
    }

    // reply finished → mark done, then advance to the next question (loop)
    const t = setTimeout(() => {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { ...copy[copy.length - 1], done: true };
        return copy;
      });
      const t2 = setTimeout(() => {
        const next = qIndex + 1;
        if (next < QA.length) {
          setQIndex(next);
        } else {
          setQIndex(1);
          setMessages(initialMessages());
        }
        setInput("");
        setPhase("typing");
      }, 2000);
      return () => clearTimeout(t2);
    }, 300);
    return () => clearTimeout(t);
  }, [phase, messages, qIndex]);

  const handleSend = () => {
    if (phase !== "ready") return;
    setMessages((m) => [
      ...m,
      { role: "user", text: QA[qIndex].q },
      { role: "ai", text: "", pdf: QA[qIndex].pdf },
    ]);
    setInput("");
    setPhase("responding");
  };

  return (
    <div ref={viewRef} className="flex min-h-0 flex-1 flex-col">
      {/* conversation thread */}
      <div ref={scrollRef} className="flex-1 space-y-6 overflow-y-auto px-6 py-7 sm:px-8">
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[80%] rounded-md bg-[#eef5ff] px-3 py-2 text-[14px] leading-5 text-[#030712]">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={i}>
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/agenticons/ai-avatar.svg" alt="" className="h-6 w-6" />
                {!m.done && <PegtopLoader />}
              </div>
              <p className="mt-3 text-[14px] leading-[1.7] text-[#030712]">
                {m.text}
                {!m.done && (
                  <span className="ml-px inline-block h-[14px] w-[2px] translate-y-[2px] animate-pulse bg-[#246bfd] align-middle" />
                )}
              </p>
              {m.pdf && m.done && (
                <div className="mt-3 flex w-fit items-center gap-3 rounded-md border border-[#93c5fd]/30 bg-[#f8faff] py-1 pl-3 pr-1">
                  <span className="text-[14px] font-medium text-[#030712]">{m.pdf}</span>
                  <button className="rounded-md border border-[#e6eef9] bg-white px-4 py-1.5 text-[14px] text-[#030712] transition-colors hover:bg-[#f8faff]">
                    Open
                  </button>
                </div>
              )}
              {m.done && (
                <div className="mt-3 flex items-center gap-4">
                  {REACTIONS.map((r) => (
                    <span key={r} className="cursor-pointer opacity-60 hover:opacity-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/assets/agenticons/${r}.svg`} alt="" className="h-[18px] w-[18px]" />
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* input */}
      <div className="border-t border-[#eef0f3] p-4 sm:px-8 sm:py-6">
        <ChatInput value={input} phase={phase} onSend={handleSend} />
      </div>
    </div>
  );
}
