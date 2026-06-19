import Logo from "./Logo";

// Fully coded browser-window product mockup (no raster image).
const sidebarIcons = [
  "M3 12l9-9 9 9M5 10v10h14V10",
  "M4 6h16M4 12h16M4 18h10",
  "M12 3a9 9 0 100 18 9 9 0 000-18zM12 8v4l3 2",
  "M4 5h16v14H4zM4 9h16",
  "M12 2l2.4 7.4H22l-6 4.3 2.3 7.3L12 16l-6.3 5 2.3-7.3-6-4.3h7.6z",
  "M6 2h9l3 3v17H6zM14 2v4h4",
];

export default function HeroMockup() {
  return (
    <div className="mt-14 w-full max-w-[1120px] overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(20,40,90,0.25)] ring-1 ring-black/5">
      {/* browser chrome */}
      <div className="flex items-center gap-4 border-b border-[#eceef2] bg-[#f6f7f9] px-4 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex w-full max-w-[280px] items-center justify-center gap-2 rounded-md bg-white px-3 py-1.5 text-[12px] text-[#6b7585] ring-1 ring-[#e6e8ee]">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 018 0v3" />
          </svg>
          Praveg.ai
        </div>
        <span className="text-lg leading-none text-[#aab2bf]">⌕</span>
      </div>

      {/* body */}
      <div className="flex" style={{ minHeight: 440 }}>
        {/* sidebar */}
        <div className="flex w-[64px] shrink-0 flex-col items-center gap-5 border-r border-[#eef0f3] bg-white py-5">
          <Logo size={26} />
          <div className="mt-1 flex flex-col gap-4">
            {sidebarIcons.map((d, i) => (
              <span
                key={i}
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  i === 0 ? "bg-brand/10 text-brand" : "text-[#9aa3b2]"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d={d} />
                </svg>
              </span>
            ))}
          </div>
          <div className="mt-auto h-8 w-8 rounded-full bg-gradient-to-br from-[#6db4f7] to-[#2f86ec]" />
        </div>

        {/* main canvas */}
        <div
          className="relative flex flex-1 flex-col items-center justify-center px-6"
          style={{
            background: "linear-gradient(180deg,#cfe0f5 0%,#dce8f7 35%,#eef3fb 70%,#ffffff 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
            <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="absolute bottom-0 h-full w-full">
              <path d="M0 200 L0 120 L120 60 L230 130 L330 70 L450 140 L600 80 L600 200 Z" fill="#b9cfe9" opacity="0.6" />
              <path d="M0 200 L0 150 L150 100 L280 160 L400 110 L520 165 L600 130 L600 200 Z" fill="#a6c2e3" opacity="0.7" />
            </svg>
          </div>

          <div className="relative z-10 w-full max-w-[460px] rounded-2xl bg-white/90 p-7 text-center shadow-[0_20px_50px_-18px_rgba(20,40,90,0.25)] ring-1 ring-white/60 backdrop-blur">
            <div className="flex justify-center">
              <Logo size={34} />
            </div>
            <h3 className="mt-4 text-[18px] font-semibold text-brand">
              Welcome to Business Development Consultant
            </h3>
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#e6e8ee] bg-white px-3 py-2.5 text-left">
              <span className="flex-1 text-[12.5px] text-[#9aa3b2]">
                Ask anything about your pipeline, accounts or research…
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
