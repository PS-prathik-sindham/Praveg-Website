"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

// Figma "AI Ready Data" dataset detail overlay
// (Praveg.ai-application file, nodes 3859-21091 / 3861-21313 / 3864-4850)
const TABS = ["Overview", "Usecase", "Sample data", "Configuration"] as const;
type Tab = (typeof TABS)[number];

const CONFIG_STEPS = [
  "Get a free API Key by following this",
  "Install the dataset with the key.",
  "Integrate the dataset into your AI assistant or RAG pipeline",
];

type Sample = { name: string; date: string; size: string };
type DomainContent = { usecases: [string, string][]; sample: Sample[] };

// Domain-specific Usecase bullets + Sample-data rows, keyed by the card's category.
const CONTENT: Record<string, DomainContent> = {
  Sustainability: {
    usecases: [
      ["ESG Screening", "Rank funds and issuers on environmental, social, and governance scores for portfolio screening"],
      ["Climate Risk Analysis", "Assess carbon exposure and transition risk across holdings using emissions disclosures"],
      ["Impact Reporting", "Generate auditable sustainability reports from standardized ESG metrics"],
      ["Greenwashing Detection", "Compare stated ESG commitments against disclosed performance to flag inconsistencies"],
    ],
    sample: [
      { name: "iShares Global Clean Energy", date: "5 Oct 2025", size: "3.1 MB" },
      { name: "Nordea Global Climate Fund", date: "2 Oct 2025", size: "2.4 MB" },
      { name: "BlackRock ESG Aware", date: "28 Sep 2025", size: "4.0 MB" },
      { name: "Parnassus Core Equity", date: "21 Sep 2025", size: "1.8 MB" },
      { name: "Brookfield Renewable", date: "14 Sep 2025", size: "2.9 MB" },
    ],
  },
  "Asset Management": {
    usecases: [
      ["Manager Benchmarking", "Compare AUM, fee structures, and flows across global asset managers"],
      ["Product Strategy", "Identify whitespace in active versus passive product line-ups"],
      ["Flow Analysis", "Track net inflows and outflows by asset class and region"],
      ["Competitive Intelligence", "Monitor mandate wins and strategic shifts across managers"],
    ],
    sample: [
      { name: "BlackRock Inc.", date: "6 Oct 2025", size: "5.2 MB" },
      { name: "Vanguard Group", date: "3 Oct 2025", size: "4.7 MB" },
      { name: "Fidelity Investments", date: "30 Sep 2025", size: "3.6 MB" },
      { name: "State Street Global", date: "24 Sep 2025", size: "2.8 MB" },
      { name: "Amundi Asset Mgmt", date: "18 Sep 2025", size: "2.2 MB" },
    ],
  },
  "Investment Strategy": {
    usecases: [
      ["Deal Sourcing", "Surface emerging startups and sectors attracting venture capital"],
      ["Stage Analysis", "Compare early-stage versus late-stage funding dynamics across cohorts"],
      ["Sector Trends", "Track which verticals are gaining investor momentum"],
      ["Investor Mapping", "Profile active VC firms and their portfolio behavior"],
    ],
    sample: [
      { name: "Sequoia Capital", date: "5 Oct 2025", size: "2.7 MB" },
      { name: "Andreessen Horowitz", date: "1 Oct 2025", size: "3.3 MB" },
      { name: "Accel Partners", date: "27 Sep 2025", size: "2.1 MB" },
      { name: "Y Combinator", date: "20 Sep 2025", size: "4.4 MB" },
      { name: "Tiger Global Mgmt", date: "13 Sep 2025", size: "1.9 MB" },
    ],
  },
  "Pension Funds": {
    usecases: [
      ["Returns Benchmarking", "Compare nominal and real returns across global pension schemes"],
      ["Allocation Analysis", "Study asset allocation shifts and their impact on funding ratios"],
      ["Regulatory Tracking", "Monitor regulatory impacts on pension obligations by region"],
      ["Liability Modeling", "Stress-test funding levels against multiple return scenarios"],
    ],
    sample: [
      { name: "CalPERS", date: "6 Oct 2025", size: "4.1 MB" },
      { name: "Norway GPFG", date: "2 Oct 2025", size: "5.0 MB" },
      { name: "ABP Netherlands", date: "29 Sep 2025", size: "3.2 MB" },
      { name: "Canada CPPIB", date: "23 Sep 2025", size: "2.6 MB" },
      { name: "Japan GPIF", date: "16 Sep 2025", size: "4.8 MB" },
    ],
  },
  Insurance: {
    usecases: [
      ["Policy Uptake Analysis", "Track adoption of health plans across demographics and regions"],
      ["Pricing Trends", "Analyze premium movements and underwriting shifts over time"],
      ["Consumer Behavior", "Understand switching, claims, and satisfaction patterns"],
      ["Public vs Private", "Compare segment dynamics across public and private coverage"],
    ],
    sample: [
      { name: "UnitedHealth Group", date: "5 Oct 2025", size: "3.9 MB" },
      { name: "Cigna Healthcare", date: "1 Oct 2025", size: "2.5 MB" },
      { name: "Aetna (CVS Health)", date: "26 Sep 2025", size: "3.0 MB" },
      { name: "Bupa Global", date: "19 Sep 2025", size: "2.3 MB" },
      { name: "AXA Health", date: "12 Sep 2025", size: "2.8 MB" },
    ],
  },
  Reinsurance: {
    usecases: [
      ["Solvency Analysis", "Assess balance-sheet strength and technical provisions across syndicates"],
      ["P&L Benchmarking", "Compare underwriting profit and combined ratios across carriers"],
      ["Reserve Adequacy", "Evaluate reserving practices against statutory and GAAP bases"],
      ["Carrier Comparison", "Profile syndicate performance across renewal cycles"],
    ],
    sample: [
      { name: "Beazley Syndicate 2623", date: "6 Oct 2025", size: "3.4 MB" },
      { name: "Hiscox Syndicate 33", date: "2 Oct 2025", size: "2.9 MB" },
      { name: "Catlin Syndicate 2003", date: "28 Sep 2025", size: "2.1 MB" },
      { name: "Brit Syndicate 2987", date: "22 Sep 2025", size: "1.7 MB" },
      { name: "MS Amlin 2001", date: "15 Sep 2025", size: "3.6 MB" },
    ],
  },
};

const FALLBACK: DomainContent = CONTENT["Investment Strategy"];

export type OverlayCard = {
  title: string;
  desc: string;
  category: string;
  badge: string;
  stats: { label: string; value: string }[];
};

function TabContent({ tab, card }: { tab: Tab; card: OverlayCard }) {
  if (tab === "Overview") {
    return (
      <div className="space-y-4 text-[14px] leading-[1.6] text-[#3d4757]">
        <p>{card.desc}</p>
        <p>
          This dataset is produced by our Data Operations pipeline and verified by analysts, delivered in an LLM-friendly, confidence-scored format that&rsquo;s fully governed and
          ready to plug straight into your agents, RAG pipelines, and analytics workflows.
        </p>
      </div>
    );
  }
  const content = CONTENT[card.category] ?? FALLBACK;

  if (tab === "Usecase") {
    return (
      <div>
        <p className="text-[14px] font-semibold text-[#030712]">Example customer use-cases include:</p>
        <ul className="mt-4 space-y-3">
          {content.usecases.map(([t, d]) => (
            <li key={t} className="flex gap-2.5 text-[14px] leading-[1.5] text-[#3d4757]">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#4b5563]" />
              <span>
                <span className="font-semibold text-[#030712]">{t}</span> to {d}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (tab === "Sample data") {
    return (
      <div className="overflow-hidden rounded-lg border border-[#e5e7eb]">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="text-[#4b5563]">
              {["Name", "Date Detected", "Size", "Status", "Action"].map((h, i) => (
                <th key={h} className={`px-4 py-3 font-medium ${i === 4 ? "text-right" : ""}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.sample.map((r, i) => (
              <tr key={i} className="border-t border-[#eef0f3] text-[#030712]">
                <td className="px-4 py-3.5">{r.name}</td>
                <td className="px-4 py-3.5">{r.date}</td>
                <td className="px-4 py-3.5">{r.size}</td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-[#f3f4f6] px-2 py-1 text-[12px] font-medium text-[#4b5563]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#9aa3b2]" />
                    Not connected
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <button className="rounded-md border border-[#cdddff] bg-[#eef4ff] px-3 py-1 text-[12px] font-medium text-[#1d55f3] transition-colors hover:bg-[#e0ebff]">
                    Connect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  // Configuration
  return (
    <div>
      <p className="text-[14px] font-semibold text-[#030712]">Usage Instructions</p>
      <ul className="mt-4 space-y-3">
        {CONFIG_STEPS.map((s) => (
          <li key={s} className="flex gap-2.5 text-[14px] leading-[1.5] text-[#3d4757]">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#4b5563]" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DatasetOverlay({
  card,
  onClose,
}: {
  card: OverlayCard | null;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("Overview");

  useEffect(() => {
    if (!card) return;
    setTab("Overview");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [card, onClose]);

  if (!card) return null;

  // Details rows derived from the clicked card
  const details: [string, string, boolean?][] = [
    ["Last updated", "Dec 04"],
    ["Pricing", "Free"],
    ["Access", "Instantly available"],
    ["Categories", card.category, true],
    ["Visibility", "Public"],
    ...card.stats.map((s): [string, string, boolean?] => [s.label, s.value]),
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-[1132px] flex-col overflow-hidden rounded-xl bg-white shadow-[0_40px_90px_-30px_rgba(20,40,90,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-[#eef0f3] px-6 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Back"
              className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[#f3f4f6]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#030712]">
                <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-[16px] font-medium text-[#030712]">{card.title}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-10 w-10 items-center justify-center rounded bg-[#246bfd]/30 transition-colors hover:bg-[#246bfd]/40"
          >
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path
                d="M8.00239 7.2661L12.2384 3.0321L13.4764 4.2691L9.23939 8.5031L13.4724 12.7351L12.2344 13.9721L8.00239 9.7411L3.76639 13.9771L2.52839 12.7401L6.76539 8.5031L2.52539 4.2641L3.76239 3.0271L8.00239 7.2671V7.2661Z"
                fill="#533AFD"
              />
            </svg>
          </button>
        </div>

        {/* body */}
        <div className="grid flex-1 grid-cols-1 gap-8 overflow-y-auto p-6 lg:grid-cols-[1fr_360px]">
          {/* left */}
          <div className="min-w-0">
            <h2 className="text-[16px] font-medium text-[#030712]">{card.title}</h2>
            <div className="mt-2 flex items-center gap-2">
              <Logo size={20} />
              <span className="text-[14px] text-[#030712]">Praveg.ai</span>
            </div>

            {/* tabs */}
            <div className="mt-5 flex gap-1 border-b border-[#e5e7eb]">
              {TABS.map((t) => {
                const on = t === tab;
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`-mb-px border-b-2 px-3 py-2 text-[14px] transition-colors ${
                      on
                        ? "border-[#246bfd] text-[#1d55f3]"
                        : "border-transparent text-[#030712] hover:text-[#1d55f3]"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <TabContent tab={tab} card={card} />
            </div>
          </div>

          {/* right sidebar */}
          <div className="space-y-6">
            {/* details */}
            <div className="rounded-lg border border-[#e5e7eb] p-6">
              <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-3">
                <span className="text-[18px] font-medium text-[#030712]">Details</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#4b5563]">
                  <path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <dl className="mt-3 space-y-2">
                {details.map(([label, value, link]) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <dt className="shrink-0 text-[14px] text-[#4b5563]">{label}</dt>
                    <dd className={`text-right text-[14px] ${link ? "text-[#1d55f3]" : "text-[#030712]"}`}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* about the provider */}
            <div>
              <h3 className="text-[18px] font-medium text-[#030712]">About the Provider</h3>
              <div className="mt-3 flex items-center gap-2">
                <Logo size={20} />
                <span className="text-[14px] text-[#030712]">Praveg.ai</span>
              </div>
              <div className="mt-3 space-y-3 text-[14px] leading-[1.55] text-[#1f2937]">
                <p>
                  Praveg AI provides a governed, end-to-end view of how enterprises source, process,
                  and activate information. Our AI Trust Layer unifies external data, internal
                  knowledge, and modular AI agents into a single, auditable system that enables
                  organizations to make decisions with confidence.
                </p>
                <p>
                  Built for sectors where precision and compliance are critical, Praveg AI ensures
                  every insight is explainable, traceable, and secure. We help enterprises transform
                  fragmented data into proprietary intelligence, governed by design and ready to
                  scale.
                </p>
              </div>
              <div className="mt-3 flex flex-col gap-1.5">
                <a href="#" className="text-[14px] text-[#1d55f3] hover:underline">Website</a>
                <a href="#" className="text-[14px] text-[#1d55f3] hover:underline">Support</a>
              </div>
            </div>

            {/* product link */}
            <div>
              <h3 className="text-[18px] font-medium text-[#030712]">Product Link</h3>
              <div className="mt-3 flex flex-col gap-1.5">
                {["Documentation", "Terms of service", "Privacy policy"].map((l) => (
                  <a key={l} href="#" className="text-[14px] text-[#1d55f3] hover:underline">
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
