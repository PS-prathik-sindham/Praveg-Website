import Logo from "./Logo";

// Global site footer — shared across all pages.
const COLS = [
  {
    title: "Platform",
    links: [
      { label: "The agentic platform", href: "/#platform" },
      { label: "How it works", href: "/#how" },
      { label: "Connectors & MCPs", href: "/#connect" },
      { label: "Security & governance", href: "/#security" },
    ],
  },
  {
    title: "The suite",
    links: [
      { label: "Data Operations", href: "/data-operations" },
      { label: "Data Marketplace", href: "/marketplace" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-darker py-16 text-white">
      <div className="container-px">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Logo size={35} />
              <span className="font-poppins text-[28px] font-medium">Praveg.ai</span>
            </div>
            <p className="mt-5 max-w-[340px] text-[13.5px] leading-6 text-white/55">
              The agentic data platform. Connect any source, build agents and
              workflows, and get answers you can trust, without the infrastructure.
            </p>
            <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] font-bold tracking-wide text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#27c281]" />
              SOC 2 · your region
            </span>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[14px] text-white/75 transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-[12.5px] text-white/45">© 2026 Praveg.ai · The agentic data platform</p>
          <p className="text-[11.5px] tracking-widest text-white/35">CONNECT · BUILD · INTERACT</p>
        </div>
      </div>
    </footer>
  );
}
