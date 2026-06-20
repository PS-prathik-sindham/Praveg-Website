"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ClosingBanner from "@/components/ClosingBanner";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import AnimatedCodeBlock, { type CodeLine } from "@/components/AnimatedCodeBlock";
import PdfViewer from "@/components/PdfViewer";

/* ──────────────────────────────────────────────────────────────────────────
   Data Operations as a Service  (Figma node 249-841)
   Built on the same skeleton as the Marketplace page: shared Navbar,
   ClosingBanner and footer, with the section patterns mirrored.
   ────────────────────────────────────────────────────────────────────────── */

// Small grey eyebrow pill used above most section headings
function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-block rounded-lg px-3 py-1.5 text-[12px] font-bold ${
        dark ? "bg-white/10 text-white/85" : "bg-[#f1f2f4] text-[#0b1430]"
      }`}
    >
      {children}
    </span>
  );
}

// Confidence badge colour ramp (matches the Figma red/amber/green chips)
function conf(p: number) {
  if (p >= 86) return { bg: "#dff3e6", fg: "#1aa06d" };
  if (p >= 70) return { bg: "#fdeccf", fg: "#c77d18" };
  return { bg: "#fde4e1", fg: "#d4503f" };
}
function ConfBadge({ p }: { p: number }) {
  const c = conf(p);
  return (
    <span
      className="rounded-md px-1.5 py-[3px] text-[10.5px] font-bold leading-none"
      style={{ background: c.bg, color: c.fg }}
    >
      {p}%
    </span>
  );
}

const ArrowOut = ({ className = "" }: { className?: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 8l8 8M16 16V8.5M16 16H8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Check = ({ className = "" }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Distinct line icons (18px, currentColor) for the feature/industry grids
const I = {
  sparkle: <path d="M12 3l2.2 5.6L20 10l-5.8 1.4L12 17l-2.2-5.6L4 10l5.8-1.4L12 3z" fill="currentColor" />,
  shield: <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />,
  layers: <><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></>,
  link: <path d="M9 15l6-6M8 12l-2 2a3 3 0 104 4l2-2M16 12l2-2a3 3 0 10-4-4l-2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  bolt: <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.7" /></>,
  building: <><rect x="5" y="3" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.7" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></>,
  doc: <><path d="M14 3v4a1 1 0 001 1h4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M6 21V5a2 2 0 012-2h6l5 5v13a2 2 0 01-2 2H8a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></>,
  grid: <><rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.7" /><rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.7" /><rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.7" /><rect x="14" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.7" /></>,
  disk: <><path d="M5 5a2 2 0 012-2h9l3 3v13a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M8 3v5h6V3M8 21v-6h8v6" stroke="currentColor" strokeWidth="1.6" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.7" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" /><path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>,
} as const;
const Icon = ({ d, className = "" }: { d: React.ReactNode; className?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className}>{d}</svg>
);

// ── Hero (249:842) ────────────────────────────────────────────────────────────
const HERO_FACTS = [
  { label: "Gross premiums written", meta: "USD m · p.18", value: "2,948.4", p: 75 },
  { label: "Profit before tax", meta: "USD m · p.18", value: "77.3", p: 88 },
  { label: "Total assets", meta: "USD m · p.18", value: "5,214.8", p: 92 },
  { label: "Investment income", meta: "USD m · p.18", value: "12.5", p: 64 },
];

function Hero() {
  return (
    <section className="flex flex-col items-center px-4 pt-14 text-center sm:pt-20">
      <h1 className="text-[40px] font-bold leading-[1.05] tracking-tight text-[#1c2433] sm:text-[58px] lg:text-[68px]">
        The data operation,
        <br />
        run by agents
        <br />
        <span className="text-brand">verified by people.</span>
      </h1>
      <p className="mt-6 max-w-[720px] text-[17px] font-medium leading-[1.5] text-[#606060] sm:text-[18px]">
        Data Operations as a Service turns raw documents, annual reports, regulatory filings,
        spreadsheets, into structured, quality-grade datasets. AI agents do the extraction. Humans
        verify every fact that matters. You get data you can sign off on.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <span className="rounded-md bg-[#0b1430] px-2.5 py-1 font-mono text-[12px] font-bold tracking-wide text-white">
          PROVEN ON
        </span>
        <span className="text-[18px] font-bold text-[#1c2433]">
          Lloyd&rsquo;s syndicate accounts
          <span className="mx-2 text-[#c2c9d4]">·</span>
          Bermuda regulatory returns
        </span>
      </div>

      {/* Review workspace card */}
      <div className="mt-10 w-full max-w-[560px] rounded-2xl bg-white p-5 text-left shadow-[0_24px_60px_-30px_rgba(20,40,90,0.3)] ring-1 ring-[#eef1f6]">
        <div className="flex items-center justify-between border-b border-[#f0f2f6] pb-3">
          <span className="flex items-center gap-2 text-[13px] font-bold text-[#1c2433]">
            <span className="h-2 w-2 rounded-full bg-brand" />
            Review workspace
          </span>
          <span className="text-[11px] text-[#6b7585]">122 facts</span>
        </div>
        <div className="divide-y divide-[#f3f5f9]">
          {HERO_FACTS.map((f) => (
            <div key={f.label} className="flex items-center justify-between py-3">
              <div>
                <p className="text-[12.5px] font-semibold text-[#1c2433]">{f.label}</p>
                <p className="text-[10px] text-[#9aa3b2]">{f.meta}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[14px] font-bold text-[#1c2433]">{f.value}</span>
                <ConfBadge p={f.p} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Sub-hero (249:1566) ───────────────────────────────────────────────────────
const OWN = ["Taxonomy & schema", "Extraction agents", "Review pod", "Provenance & delivery"];

function SubHero() {
  return (
    <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      <div>
        <Eyebrow>The Praveg suite</Eyebrow>
        <h2 className="mt-6 text-[34px] font-medium leading-[1.1] text-[#0b1430] sm:text-[40px]">
          Not software you operate. An outcome we deliver.
        </h2>
        <p className="mt-5 max-w-[460px] text-[16px] font-light leading-[1.55] text-[#606060]">
          Most tools hand you a model and wish you luck. Data Operations as a Service is the whole
          operation, people, agents and platform pointed at one job: producing the dataset you need,
          to a standard you can defend.
        </p>
      </div>

      <div className="bg-[#f6f8fc] p-8 sm:p-10">
        <p className="text-[16px] leading-[1.55] text-[#3d4757]">
          You bring the documents and the standard. We bring the agents that read them, the analysts
          who verify them, and the platform that proves it, handing back a living dataset, not a tool
          to babysit.
        </p>
        <p className="mt-8 text-[11px] font-bold tracking-widest text-[#9aa3b2]">WHAT WE OWN, END TO END</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {OWN.map((o) => (
            <span
              key={o}
              className="inline-flex items-center gap-2 rounded-lg bg-[#eef4ff] px-3.5 py-2.5 text-[12px] font-medium text-brand-700"
            >
              <Check className="text-brand-700" />
              {o}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why it works (249:1917) ─────────────────────────────────────────────────
const WHY = [
  { icon: I.sparkle, title: "AI agents do the heavy lifting", desc: "Purpose-built agents read documents end to end and structure them against your taxonomy, no templates, no brittle rules to maintain." },
  { icon: I.shield, title: "A human verifies what matters", desc: "Confidence-driven review puts an analyst on every fact that counts. We deliver accuracy a regulator, or your board, can sign off on." },
  { icon: I.layers, title: "Built on real domain taxonomies", desc: "Finance, insurance and regulatory schemas out of the box. Or we model yours in discovery and version it as standards evolve." },
  { icon: I.link, title: "Provenance on every fact", desc: "Every value traces back to a page, a snippet and a confidence score, with an immutable audit trail from ingest to publish." },
  { icon: I.bolt, title: "From backlog to throughput", desc: "Hundreds of documents processed in parallel. Weeks of manual keying compressed into days, without adding headcount." },
  { icon: I.lock, title: "Enterprise-grade governance", desc: "SOC 2 controls, role-based access, SSO and your choice of data residency, deployable inside your own environment." },
];

function WhySection() {
  return (
    <section className="mt-28 flex flex-col items-center text-center">
      <Eyebrow>Why it works</Eyebrow>
      <h2 className="mt-6 text-[34px] font-bold leading-[1.1] tracking-tight text-[#0b1430] sm:text-[46px]">
        Agents for scale. Humans for trust.
      </h2>
      <p className="mt-4 max-w-[600px] text-[18px] font-light text-[#606060] sm:text-[19px]">
        Six things have to be true to ship data you can defend. Data Operations as a Service is built
        around all six.
      </p>
      <div className="mt-12 grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
        {WHY.map((w) => (
          <div key={w.title} className="rounded-xl bg-[#f8faff] p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-brand ring-1 ring-[#e6eef9]">
              <Icon d={w.icon} />
            </span>
            <h3 className="mt-4 text-[18px] font-bold text-[#0b1430]">{w.title}</h3>
            <p className="mt-2 text-[14.5px] leading-[1.55] text-[#606060]">{w.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Pipeline / How it works (249:1130) ──────────────────────────────────────
type Stage = { name: string; desc: string; file: string; meta: string; checks: string[] };
const STAGES: Stage[] = [
  {
    name: "Ingest",
    desc: "Connectors and uploads pull in annual reports, regulatory filings, PDFs and spreadsheets, native or scanned.",
    file: "syndicate_report_2025.pdf",
    meta: "58 pages · native + scanned · 8.1 MB",
    checks: ["Native & scanned PDF (OCR)", "Excel · CSV ingestion", "Regulatory return formats", "Connectors & MCP sources"],
  },
  {
    name: "Agentic extraction",
    desc: "Purpose-built agents read every page and map content to your domain taxonomy, emitting normalized facts with a source page, snippet and confidence score.",
    file: "extracted_facts.json",
    meta: "122 facts · taxonomy mapped · scored",
    checks: ["Mapped to your taxonomy", "Source page + snippet per fact", "Model confidence on every value", "No brittle templates"],
  },
  {
    name: "Human in the loop",
    desc: "Analysts triage by confidence and verify each fact against the source. Accept, edit or flag, nothing publishes unverified.",
    file: "review_queue · 122 facts",
    meta: "confidence-ranked · side-by-side source",
    checks: ["Confidence-ranked review queue", "Accept, edit or flag", "Verified against source PDF", "Nothing publishes unverified"],
  },
  {
    name: "Quality-grade output",
    desc: "An approved dataset with full provenance and audit trail, delivered to Excel, an API, or straight into your warehouse.",
    file: "lloyds_syndicate_financials.xlsx",
    meta: "1,440 rows · 122 columns · 2.4 MB",
    checks: ["Excel (.xlsx) with one sheet per section", "CSV for the whole table", "Filtered or full-dataset exports", "Snapshot pinned to a dataset version"],
  },
];

// Turn a pipeline stage into animated code-block lines
function stageCode(s: Stage): CodeLine[] {
  return [
    { t: `$ praveg ${s.name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}`, c: "text-[#8cb2ff]" },
    { t: `↳ artifact  ${s.file}`, c: "text-white/75" },
    { t: `  ${s.meta}`, c: "text-white/40" },
    ...s.checks.map((c) => ({ t: `✓ ${c}`, c: "text-[#3ddc97]" })),
  ];
}

function PipelineSection() {
  const [active, setActive] = useState(STAGES.length - 1);
  const s = STAGES[active];
  return (
    <section className="mt-28">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="mt-6 max-w-[820px] text-[32px] font-medium leading-[1.1] text-brand-700 sm:text-[40px]">
        One pipeline, ingest to published dataset.
      </h2>
      <p className="mt-4 max-w-[760px] text-[20px] font-light leading-[1.4] text-[#606060] sm:text-[24px]">
        Every engagement runs the same four stages. Agents move fast and at scale; a human stands at
        the gate before anything is published.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_580px]">
        <div>
          {STAGES.map((item, i) => {
            const on = i === active;
            return (
              <button
                key={item.name}
                onClick={() => setActive(i)}
                className="flex w-full items-start justify-between border-b border-[#ececec] py-6 text-left"
              >
                <span className="max-w-[440px]">
                  <span
                    className="block text-[22px] font-semibold sm:text-[24px]"
                    style={{ color: on ? "#1b43fe" : "rgba(27,67,254,0.6)" }}
                  >
                    {item.name}
                  </span>
                  <span className="mt-1.5 block text-[15px] leading-[1.5] text-[#606060]">{item.desc}</span>
                </span>
                <ArrowOut className="mt-1 shrink-0" />
              </button>
            );
          })}
        </div>

        <div className="flex items-center bg-[#e4e7ee]/30 p-8">
          <AnimatedCodeBlock className="w-full" title={`${s.name.toLowerCase().replace(/[^a-z]+/g, "_")}.log`} lines={stageCode(s)} />
        </div>
      </div>
    </section>
  );
}

// ── Before → After (252:2269) ───────────────────────────────────────────────
// Structured dataset rendered as an animated code block (types out the JSON)
// Mirrors the lines visible on the Statement of profit or loss page of the PDF
const STRUCT_LINES: CodeLine[] = [
  { t: "{", c: "text-white/40" },
  { t: '  "GrossPremiumsWritten": 2,948.4,   // 75%', c: "text-[#9ecbff]" },
  { t: '  "EarnedPremiumNetReinsurance": 1,795.4,   // 75%', c: "text-[#9ecbff]" },
  { t: '  "InvestmentIncome": 12.5,   // 64%', c: "text-[#9ecbff]" },
  { t: '  "ProfitBeforeTax": 77.3   // 88%', c: "text-[#9ecbff]" },
  { t: "}", c: "text-white/40" },
];

function BeforeAfter() {
  return (
    <section className="-mx-6 mt-28 bg-[#f6f8fc] px-6 py-20">
      <div className="container-px flex flex-col items-center text-center">
        <Eyebrow>Before · After</Eyebrow>
        <h2 className="mt-6 text-[34px] font-bold leading-[1.1] tracking-tight text-[#0b1430] sm:text-[46px]">
          A 60-page PDF becomes a dataset.
        </h2>
        <p className="mt-4 max-w-[640px] text-[18px] font-light text-[#606060] sm:text-[19px]">
          Watch a line of an annual report become a normalized, traceable, confidence-scored fact.
        </p>

        <div className="mt-12 grid w-full max-w-[1040px] grid-cols-1 items-center gap-4 text-left lg:grid-cols-[1fr_auto_1fr]">
          {/* Raw source — PDF opens on the Statement of profit or loss, whose line
              items map directly to the structured facts on the right */}
          <PdfViewer src="/assets/annual-report.pdf" initialPage={6} height={460} />

          {/* Arrow */}
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-lg lg:rotate-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Structured dataset — animated code block (types out the JSON) */}
          <AnimatedCodeBlock
            title="structured_dataset.json"
            lines={STRUCT_LINES}
            minHeight={300}
            className="rounded-2xl shadow-[0_18px_50px_-24px_rgba(11,20,48,0.7)]"
          />
        </div>

        {/* Substantiates the three qualities promised in the subtext */}
        <div className="mt-10 grid w-full max-w-[1040px] grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {[
            { d: I.layers, t: "Normalized", s: "Mapped to a standard taxonomy and consistent units (USD m), so every report is comparable." },
            { d: I.link, t: "Traceable", s: "Every value links back to its source page and the exact snippet it was read from." },
            { d: I.shield, t: "Confidence-scored", s: "Each fact carries a model confidence score that drives human review before it publishes." },
          ].map((f) => (
            <div key={f.t} className="flex gap-3.5 rounded-xl bg-white p-5 ring-1 ring-[#eef1f6]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-brand">
                <Icon d={f.d} />
              </span>
              <div>
                <h3 className="text-[15px] font-bold text-[#0b1430]">{f.t}</h3>
                <p className="mt-1 text-[13px] leading-[1.5] text-[#606060]">{f.s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Review pod (252:2561) ────────────────────────────────────────────────────
type Fact = { label: string; status: "To verify" | "Accepted"; value: string; p: number };
const FACTS: Fact[] = [
  { label: "Gross premiums written", status: "To verify", value: "2,948.4", p: 75 },
  { label: "Earned premium, net of reinsurance", status: "To verify", value: "1,795.4", p: 75 },
  { label: "Profit before tax", status: "Accepted", value: "77.3", p: 88 },
  { label: "Investment income", status: "To verify", value: "12.5", p: 64 },
  { label: "Total assets", status: "Accepted", value: "5,214.8", p: 92 },
];

function ReviewPod() {
  const [sel, setSel] = useState(0);
  const f = FACTS[sel];
  return (
    <section className="mt-28">
      <Eyebrow>Human in the loop</Eyebrow>
      <h2 className="mt-6 max-w-[820px] text-[32px] font-bold leading-[1.1] text-brand-700 sm:text-[40px]">
        This is what the review pod actually does.
      </h2>
      <p className="mt-4 max-w-[760px] text-[20px] font-light leading-[1.4] text-[#606060] sm:text-[24px]">
        Pick a fact, check it against the source snippet, then accept, edit or flag it. Watch the
        dataset complete, nothing publishes until it does.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_560px]">
        {/* fact list */}
        <div>
          {FACTS.map((item, i) => {
            const on = i === sel;
            const accepted = item.status === "Accepted";
            return (
              <button
                key={item.label}
                onClick={() => setSel(i)}
                className="flex w-full items-center justify-between border-b border-[#ececec] py-5 text-left"
              >
                <span>
                  <span className="block text-[19px] font-semibold sm:text-[22px]" style={{ color: on ? "#1b43fe" : "#0b1430" }}>
                    {item.label}
                  </span>
                  <span className={`mt-1 block text-[15px] font-semibold ${accepted ? "text-[#1aa06d]" : "text-[#9aa3b2]"}`}>
                    {item.status}
                  </span>
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="font-mono text-[13.5px] font-bold text-[#1c2433]">{item.value}</span>
                  <ConfBadge p={item.p} />
                  <ArrowOut className="shrink-0 text-brand/70" />
                </span>
              </button>
            );
          })}
        </div>

        {/* detail panel, vertically centered in its gray panel */}
        <div className="flex items-center bg-[#e4e7ee]/30 p-8">
          {/* key={sel} remounts the card so the staggered reveal replays on each pick */}
          <div key={sel} className="w-full rounded-[18px] bg-white p-6 shadow-[0_8px_24px_-14px_rgba(20,40,90,0.15)]">
            <p className="reveal-up text-[10px] font-medium tracking-widest text-[#9aa3b2]" style={{ animationDelay: "0ms", animationDuration: "0.5s" }}>SELECTED FACT</p>
            <h3 className="reveal-up mt-1.5 text-[19px] font-bold text-[#0b1430]" style={{ animationDelay: "70ms", animationDuration: "0.5s" }}>{f.label}</h3>
            <div className="reveal-up mt-3 flex flex-wrap items-center gap-2" style={{ animationDelay: "140ms", animationDuration: "0.5s" }}>
              <span className="rounded-md bg-[#f1f4f9] px-2.5 py-1 text-[12px] font-medium text-[#3d4757]">USD m</span>
              <span className="rounded-md bg-[#f1f4f9] px-2.5 py-1 text-[12px] font-medium text-[#3d4757]">page 18</span>
              <span
                className="rounded-md px-2.5 py-1 text-[12px] font-semibold"
                style={{ background: f.status === "Accepted" ? "#dff3e6" : "#eef4ff", color: f.status === "Accepted" ? "#1aa06d" : "#1f50c4" }}
              >
                {f.status}
              </span>
              <ConfBadge p={f.p} />
            </div>

            <div className="reveal-up mt-5 rounded-xl bg-[#f8faff] p-4" style={{ animationDelay: "210ms", animationDuration: "0.5s" }}>
              <p className="text-[10px] font-medium tracking-widest text-[#9aa3b2]">SOURCE SNIPPET · p.18</p>
              <p className="mt-2 text-[14px] leading-[1.5] text-[#3d4757]">
                &ldquo;…{f.label} <span className="font-semibold text-[#0b1430]">{f.value}</span>…&rdquo;
              </p>
            </div>

            <div className="reveal-up mt-4" style={{ animationDelay: "280ms", animationDuration: "0.5s" }}>
              <p className="text-[10px] font-medium tracking-widest text-[#9aa3b2]">REVIEWED VALUE</p>
              <p className="mt-1 font-mono text-[15px] font-bold text-[#0b1430]">{f.value}</p>
            </div>

            <div className="reveal-up mt-5 flex items-center gap-2.5" style={{ animationDelay: "350ms", animationDuration: "0.5s" }}>
              <span className="flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[13px] font-semibold text-white">
                <Check /> Accept
              </span>
              <span className="rounded-full border border-[#e6e8ee] px-4 py-2 text-[13px] font-semibold text-[#3d4757]">Flag</span>
              <span className="rounded-full border border-[#e6e8ee] px-4 py-2 text-[13px] font-semibold text-[#3d4757]">Reset</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Proven in production (252:2890) ──────────────────────────────────────────
type Case = {
  label: string;
  title: string;
  sub: string;
  challenge: string;
  doaas: string;
  stats: { v: string; l: string }[];
  footer: string;
};
const CASES: Case[] = [
  {
    label: "INSURANCE · ANNUAL ACCOUNTS",
    title: "Lloyd's of London",
    sub: "Syndicate annual report & accounts",
    challenge: "Every syndicate files a 50 to 60 page annual report. Analysts re-keyed ~120 financial facts per report, per year, by hand, slow, costly and error-prone.",
    doaas: "Agents extract the full taxonomy from each report; high-confidence facts flow straight through, the rest land in a confidence-ranked review queue. Analysts verify against the source PDF, side by side.",
    stats: [
      { v: "12", l: "syndicates onboarded" },
      { v: "8", l: "reporting years" },
      { v: "120+", l: "facts per report" },
      { v: "99.6%", l: "field accuracy, verified" },
    ],
    footer: "Review time per report cut from ~3 days to under 4 hours.",
  },
  {
    label: "REINSURANCE · REGULATORY RETURNS",
    title: "Bermuda",
    sub: "Re/insurer statutory financial returns",
    challenge: "Carriers file statutory financial statements in differing formats. Comparing solvency and performance across the market meant painstaking manual normalization.",
    doaas: "A common taxonomy normalizes every carrier's return into one comparable dataset, statutory and GAAP figures reconciled, refreshed each reporting cycle.",
    stats: [
      { v: "40+", l: "carriers normalized" },
      { v: "1", l: "common taxonomy" },
      { v: "Quarterly", l: "refresh cadence" },
      { v: "100%", l: "provenance to source" },
    ],
    footer: "Cross-carrier comparison that used to take weeks now refreshes in a cycle.",
  },
];

function ProvenSection() {
  return (
    <section className="mt-28 flex flex-col items-center text-center">
      <Eyebrow>Proven in production</Eyebrow>
      <h2 className="mt-6 max-w-[760px] text-[34px] font-bold leading-[1.1] tracking-tight text-[#0b1430] sm:text-[46px]">
        Built on the hardest financial documents there are.
      </h2>
      <p className="mt-4 max-w-[680px] text-[18px] font-light text-[#606060] sm:text-[19px]">
        We didn&rsquo;t start with toy data. The pipeline was forged on regulated insurance reporting, where a wrong number has consequences.
      </p>

      <div className="mt-12 grid w-full grid-cols-1 gap-5 text-left lg:grid-cols-2">
        {CASES.map((c) => (
          <div key={c.title} className="flex flex-col rounded-2xl bg-white p-8 ring-1 ring-[#eef1f6]">
            <p className="text-[11px] font-bold tracking-widest text-brand">{c.label}</p>
            <h3 className="mt-3 text-[28px] font-bold text-[#0b1430]">{c.title}</h3>
            <p className="mt-1 text-[14.5px] text-[#606060]">{c.sub}</p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[10.5px] font-medium tracking-widest text-[#9aa3b2]">THE CHALLENGE</p>
                <p className="mt-2 text-[14.5px] leading-[1.5] text-[#3d4757]">{c.challenge}</p>
              </div>
              <div>
                <p className="text-[10.5px] font-medium tracking-widest text-brand">WITH DOaaS</p>
                <p className="mt-2 text-[14.5px] leading-[1.5] text-[#3d4757]">{c.doaas}</p>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-5 border-t border-[#eef1f6] pt-6 sm:grid-cols-4">
              {c.stats.map((s) => (
                <div key={s.l}>
                  <p className="text-[22px] font-bold text-[#0b1430]">{s.v}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-[#6b7585]">{s.l}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 flex items-center gap-2 text-[13.5px] font-semibold text-[#3d4757]">
              <Check className="shrink-0 text-[#1aa06d]" />
              {c.footer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Where it fits (252:3112) ─────────────────────────────────────────────────
const FITS = [
  { icon: I.building, title: "Insurance & reinsurance", desc: "Syndicate accounts, statutory returns, solvency data, treaty submissions." },
  { icon: I.doc, title: "Banking & capital markets", desc: "Annual reports, prospectuses, credit files and regulatory filings." },
  { icon: I.grid, title: "Regulators & supervisors", desc: "Normalize filings across entities into one comparable, defensible dataset." },
  { icon: I.disk, title: "Audit, tax & advisory", desc: "Digitize financial statements and working papers into structured facts." },
  { icon: I.eye, title: "ESG & disclosures", desc: "Pull metrics from sustainability and disclosure documents at scale." },
  { icon: I.clock, title: "Private markets", desc: "Fund reports, capital accounts and portfolio company financials." },
];

function FitsSection() {
  return (
    <section className="mt-28 flex flex-col items-center text-center">
      <Eyebrow>Where it fits</Eyebrow>
      <h2 className="mt-6 text-[34px] font-bold leading-[1.1] tracking-tight text-[#0b1430] sm:text-[46px]">
        Any industry buried in documents.
      </h2>
      <p className="mt-4 max-w-[640px] text-[18px] font-light text-[#606060] sm:text-[19px]">
        If your dataset lives inside PDFs and filings today, it can be a clean, governed table tomorrow.
      </p>
      <div className="mt-12 grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
        {FITS.map((f) => (
          <div key={f.title} className="flex gap-4 rounded-xl bg-[#f6f8fc] p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand ring-1 ring-[#e6eef9]">
              <Icon d={f.icon} />
            </span>
            <div>
              <h3 className="text-[16.5px] font-bold text-[#0b1430]">{f.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-[1.5] text-[#606060]">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Quality & governance (252:3319, dark) ────────────────────────────────────
const QUALITY = [
  { title: "Confidence on every fact", desc: "Each extracted value carries a model confidence score that drives review triage." },
  { title: "A human review gate", desc: "Nothing reaches the published dataset without passing analyst verification." },
  { title: "Source provenance", desc: "Every fact links to its page and the exact snippet it was read from." },
  { title: "Immutable audit log", desc: "Every edit, approval and publish event is recorded and attributable." },
  { title: "Versioned taxonomies", desc: "Schemas are versioned, so datasets stay comparable as standards change." },
  { title: "SOC 2 · RBAC · residency", desc: "Role-based access, SSO and your choice of data region, or your own VPC." },
];
const QUALITY_CHIPS = ["SOC 2", "RBAC · SSO", "Data residency", "Audit log"];

function QualitySection() {
  return (
    <section className="-mx-6 mt-28 bg-[#0b1430] px-6 py-20 text-white">
      <div className="container-px grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Eyebrow dark>Quality &amp; governance</Eyebrow>
          <h2 className="mt-6 text-[34px] font-medium leading-[1.1] sm:text-[42px]">
            Data you can put your name on.
          </h2>
          <p className="mt-5 max-w-[420px] text-[16px] font-light leading-[1.55] text-white/65">
            Speed is worthless if you can&rsquo;t trust the output. Every fact is scored, reviewed,
            traced to its source and logged so the dataset stands up to an auditor, a regulator, or
            your own risk team.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {QUALITY_CHIPS.map((c) => (
              <span key={c} className="rounded-full border border-white/12 bg-white/5 px-3.5 py-2 text-[12px] font-medium text-white/80">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {QUALITY.map((q) => (
            <div key={q.title} className="rounded-xl bg-white/[0.04] p-6 ring-1 ring-white/[0.06]">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-[#6db4f7]">
                <Check />
              </span>
              <h3 className="mt-4 text-[15.5px] font-bold">{q.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.55] text-white/55">{q.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Connected (252:3511) ─────────────────────────────────────────────────────
const FLOW = [
  { label: "Ingest", items: ["Native PDF", "Scanned PDF / OCR", "Excel · CSV", "Regulatory returns", "Data connectors", "MCP"], dark: false },
  { label: "Runs on Praveg", items: ["Extraction agents", "Data Connectors", "Data Sentinel", "MCPs", "Review workspace"], dark: true },
  { label: "Deliver to", items: ["Excel export", "REST API", "Snowflake · warehouse", "BI tools", "Webhook / push"], dark: false },
];

function ConnectedSection() {
  return (
    <section className="-mx-6 mt-28 bg-[#f6f8fc] px-6 py-20">
      <div className="container-px flex flex-col items-center text-center">
        <Eyebrow>Connected</Eyebrow>
        <h2 className="mt-6 text-[34px] font-extrabold leading-[1.05] tracking-tight text-[#0b1430] sm:text-[46px]">
          Plugs into how your data already moves.
        </h2>
        <p className="mt-4 max-w-[660px] text-[18px] font-light text-[#606060] sm:text-[19px]">
          DOaaS runs on the Praveg platform, agents, connectors and governance, and hands datasets
          off wherever you need them.
        </p>

        <div className="mt-12 grid w-full grid-cols-1 items-stretch gap-3 text-left lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {FLOW.map((col, i) => (
            <div key={col.label} className="contents">
              <div
                className={`rounded-2xl p-7 ${
                  col.dark ? "bg-[#0b1430] text-white" : "bg-white ring-1 ring-[#eef1f6]"
                }`}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand">{col.label}</p>
                <ul className="mt-4 space-y-3">
                  {col.items.map((it) => (
                    <li
                      key={it}
                      className={`flex items-center gap-2.5 text-[14px] font-medium ${col.dark ? "text-white/85" : "text-[#3d4757]"}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {i < FLOW.length - 1 && (
                <div className="flex items-center justify-center text-[#9aa3b2]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="rotate-90 lg:rotate-0">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Engagement model (252:3979) ──────────────────────────────────────────────
const STEPS = [
  { n: "01", title: "Discovery", desc: "We scope the documents, the taxonomy and the standard of accuracy you need." },
  { n: "02", title: "Taxonomy design", desc: "We map (or model) the schema your dataset will conform to, and version it." },
  { n: "03", title: "Pilot", desc: "Agents extract, the review pod verifies, you get a delivered dataset to judge." },
  { n: "04", title: "Production", desc: "We run it as a managed operation, or embed it in your stack, at full cadence." },
];
type EngPlan = { name: string; sub: string; desc: string; checks: string[]; cta: string; dark?: boolean; badge?: string };
const ENG_PLANS: EngPlan[] = [
  {
    name: "Pilot",
    sub: "Prove it on your data",
    desc: "A fixed-scope pilot on one of your document sets. Taxonomy, extraction, full human review and a delivered dataset, plus an outcome report.",
    checks: ["One document set", "Taxonomy mapping", "Full HITL review", "Delivered dataset + report"],
    cta: "Scope a pilot",
  },
  {
    name: "Managed Service",
    sub: "We run your data operation",
    desc: "An ongoing, fully-managed pipeline with a dedicated review pod and SLAs on turnaround and accuracy. You receive datasets; we run the operation.",
    checks: ["Dedicated review pod", "Accuracy & turnaround SLAs", "Monitored throughput", "Continuous taxonomy upkeep"],
    cta: "Talk to us",
    dark: true,
    badge: "MOST CHOSEN",
  },
  {
    name: "Embedded",
    sub: "Agents in your stack",
    desc: "Deploy the extraction agents and review workspace inside your own environment. Your team operates day to day; we support and tune.",
    checks: ["Runs in your VPC", "Your team operates", "Onboarding & training", "Priority support"],
    cta: "Explore embed",
  },
];

function EngagementSection() {
  return (
    <section className="mt-28 flex flex-col items-center text-center">
      <Eyebrow>Engagement model</Eyebrow>
      <h2 className="mt-6 max-w-[680px] text-[34px] font-bold leading-[1.1] tracking-tight text-[#0b1430] sm:text-[46px]">
        Start with a pilot. Scale to an operation.
      </h2>
      <p className="mt-4 max-w-[640px] text-[18px] font-light text-[#606060] sm:text-[19px]">
        We prove it on your data first. Then you choose how you want it run, by us, or inside your own
        environment.
      </p>

      {/* 4 steps */}
      <div className="mt-12 grid w-full grid-cols-1 gap-8 border-y border-[#eef1f6] py-8 text-left sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div key={s.n}>
            <p className="font-mono text-[13px] font-bold text-brand">{s.n}</p>
            <h3 className="mt-2 text-[16.5px] font-bold text-[#0b1430]">{s.title}</h3>
            <p className="mt-1.5 text-[13.5px] leading-[1.5] text-[#606060]">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* plans */}
      <div className="mt-12 grid w-full grid-cols-1 items-center gap-6 text-left lg:grid-cols-3">
        {ENG_PLANS.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-[26px] p-8 ${
              p.dark
                ? "bg-[#0b1430] text-white lg:scale-[1.02] lg:shadow-[0_30px_60px_-25px_rgba(11,20,48,0.6)]"
                : "border border-[#eef2f7] bg-white text-ink"
            }`}
          >
            {p.badge && (
              <span className="absolute right-6 top-6 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                {p.badge}
              </span>
            )}
            <h3 className={`text-[22px] font-bold ${p.dark ? "text-white" : "text-[#0b1430]"}`}>{p.name}</h3>
            <p className={`mt-1 text-[14.5px] font-semibold ${p.dark ? "text-[#6db4f7]" : "text-brand"}`}>{p.sub}</p>
            <p className={`mt-4 text-[14px] leading-[1.5] ${p.dark ? "text-white/65" : "text-[#606060]"}`}>{p.desc}</p>

            <div className={`my-6 h-px w-full ${p.dark ? "bg-white/12" : "bg-[#eff2f7]"}`} />

            <ul className="space-y-3">
              {p.checks.map((c) => (
                <li key={c} className={`flex items-center gap-2.5 text-[14px] ${p.dark ? "text-white/85" : "text-[#3d4757]"}`}>
                  <Check className="shrink-0 text-[#1aa06d]" />
                  {c}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`mt-8 flex items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold transition-colors ${
                p.dark ? "bg-[#2e66e6] text-white hover:bg-[#2459cf]" : "border border-[#e6e8ee] bg-white text-ink hover:bg-[#f8faff]"
              }`}
            >
              {p.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── FAQ (252:4509) ───────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How accurate is it, really?",
    a: "Every fact gets a model confidence score, and every fact that matters is verified by a human against the source. We report field-level accuracy and you sign off before anything publishes, so the number you ship is one you can defend.",
  },
  {
    q: "What documents can you handle?",
    a: "Native and scanned PDFs, Excel and CSV, and structured regulatory returns, from clean annual reports to messy multi-hundred-page filings. OCR handles the scanned ones; if a person can read it, our agents can extract it.",
  },
  {
    q: "Do you use our taxonomy or yours?",
    a: "Either. We ship domain taxonomies for finance, insurance and regulatory reporting out of the box, or we model yours during discovery and version it as your standards evolve.",
  },
  {
    q: "Where does our data live?",
    a: "Your choice. We support regional data residency and deployment inside your own VPC, with SOC 2 controls, role-based access and SSO, so your data stays where your policies require.",
  },
  {
    q: "How fast can we get started?",
    a: "A scoped pilot on one of your document sets typically runs in weeks, not months. Discovery and taxonomy design come first, then a delivered dataset you can judge before committing to production.",
  },
  {
    q: "How is this different from OCR or an LLM?",
    a: "OCR reads characters; an LLM guesses structure. We map every document to your taxonomy, attach a confidence score and source snippet to each fact, and put a human reviewer on everything that matters, so you get a defensible dataset, not a best-effort transcript.",
  },
];

function FaqSection() {
  // Uses the shared <Faq> design from the landing page; content is unchanged.
  return (
    <section className="-mx-6 mt-28 bg-surface px-6 py-24">
      <div className="container-px grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-[14px] font-bold text-brand">Questions</p>
          <h2 className="mt-4 font-poppins text-[34px] font-medium leading-[1.08] text-[#101010] sm:text-[40px]">
            The things buyers ask first.
          </h2>
        </div>
        <Faq items={FAQS} />
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DataOperationsPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Navbar />
      <div className="container-px mx-auto max-w-[1280px] py-4 sm:py-8">
        <Hero />
        <div className="mt-28">
          <SubHero />
        </div>
        <WhySection />
        <PipelineSection />
        <BeforeAfter />
        <ReviewPod />
        <ProvenSection />
        <FitsSection />
        <QualitySection />
        <ConnectedSection />
        <EngagementSection />
        <FaqSection />
      </div>
      <ClosingBanner />
      <Footer />
    </main>
  );
}
