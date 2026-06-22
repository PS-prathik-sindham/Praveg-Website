"use client";

// Figma "Main chat input" (node 207-528), controlled by the parent AgentChat.
//   phase "responding"/"" → resting box, gray placeholder, muted button, no glow
//   phase "typing"        → blue focus glow, value types out with a caret
//   phase "ready"         → full value shown, button live + "Click" tooltip
const PLACEHOLDER = "Ask anything about your connected data…";

// the layered blue glow from Figma (5 drop shadows, rgba(17,112,255))
const GLOW =
  "0 2px 5px rgba(17,112,255,0.31), 0 10px 10px rgba(17,112,255,0.27), 0 22px 13px rgba(17,112,255,0.16), 0 39px 16px rgba(17,112,255,0.05), 0 61px 17px rgba(17,112,255,0.01)";
const REST = "0 1px 2px rgba(20,40,90,0.06)";

export type InputPhase = "typing" | "ready" | "responding";

export default function ChatInput({
  value,
  phase,
  onSend,
}: {
  value: string;
  phase: InputPhase;
  onSend: () => void;
}) {
  const active = phase === "typing" || phase === "ready";
  const canSend = phase === "ready";

  return (
    <div
      className="flex flex-col gap-1.5 rounded-lg border bg-white p-3 transition-[box-shadow,border-color] duration-500 ease-out"
      style={{
        minHeight: 114,
        borderColor: active ? "#dbeafe" : "#e6e8ee",
        boxShadow: active ? GLOW : REST,
      }}
    >
      {/* text area (top-aligned, grows) */}
      <div className="flex-1 pb-[30px] text-[14px] leading-5">
        {value ? (
          <span className="text-[#030712]">
            {phase === "typing" ? (
              <>
                {value.slice(0, -1)}
                {/* key on length → the latest char remounts and eases in each tick */}
                <span key={value.length} className="type-char">
                  {value.slice(-1)}
                </span>
                <span className="ml-px inline-block h-[14px] w-[2px] translate-y-[2px] animate-pulse bg-[#246bfd] align-middle" />
              </>
            ) : (
              value
            )}
          </span>
        ) : (
          <span className="text-[#9aa3b2]">{PLACEHOLDER}</span>
        )}
      </div>

      {/* send button (bottom-right) */}
      <div className="flex justify-end">
        <div className="relative">
          {/* "Click" tooltip, shown once the question is filled and ready */}
          {canSend && (
            <div className="absolute -top-10 right-0 z-10 animate-bounce">
              <span className="block rounded-md bg-[#030712] px-2.5 py-1 text-[12px] font-medium text-white shadow-[0_6px_16px_-6px_rgba(20,40,90,0.5)]">
                Click
              </span>
              <span className="absolute right-3 top-full h-2 w-2 -translate-y-1 rotate-45 bg-[#030712]" />
            </div>
          )}
          <button
            type="button"
            aria-label="Send"
            onClick={canSend ? onSend : undefined}
            className={`transition-opacity duration-500 ${canSend ? "cursor-pointer" : "cursor-default"}`}
            style={{ opacity: active ? 1 : 0.55 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/agenticons/send.svg" alt="" className="h-9 w-9" />
          </button>
        </div>
      </div>
    </div>
  );
}
