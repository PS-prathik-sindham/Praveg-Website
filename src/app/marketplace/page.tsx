"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import DatasetOverlay from "@/components/DatasetOverlay";
import ClosingBanner from "@/components/ClosingBanner";
import Footer from "@/components/Footer";

// ── Marketplace dataset cards (Figma node 147-364) ────────────────────────────
type Stat = { label: string; value: string };
interface Card {
  category: string;
  badge: string;
  title: string;
  desc: string;
  // left column [0,1], right column [2,3]
  stats: [Stat, Stat, Stat, Stat];
}

const CARDS: Card[] = [
  {
    category: "Sustainability",
    badge: "popular",
    title: "ESG Investment Trends",
    desc: "In-depth exploration of environment, social, and governance investment trends and their impact on financial performance.",
    stats: [
      { label: "Insights", value: "45+ funds" },
      { label: "Refresh", value: "Annual" },
      { label: "Coverage", value: "2021 to 2026" },
      { label: "Focus", value: "Long-term + Short-term" },
    ],
  },
  {
    category: "Asset Management",
    badge: "RELEVANT",
    title: "Global Asset Management Landscape",
    desc: "Exhaustive insights into asset management strategies, client demands, and market capital flows.",
    stats: [
      { label: "Data", value: "200+ managers" },
      { label: "Review", value: "Semiannual" },
      { label: "Coverage", value: "2019 to 2026" },
      { label: "Types", value: "Active + Passive" },
    ],
  },
  {
    category: "Investment Strategy",
    badge: "INSIGHTFUL",
    title: "Venture Capital Insights",
    desc: "Comprehensive report on venture capital trends, successful sectors, and investor behavior in the startup ecosystem.",
    stats: [
      { label: "Reports", value: "100+ firms" },
      { label: "Update", value: "Quarterly" },
      { label: "Coverage", value: "2022 to 2027" },
      { label: "Aspects", value: "Early-stage + Late-stage" },
    ],
  },
  {
    category: "Pension Funds",
    badge: "TRENDING",
    title: "Global Pension Fund Performance",
    desc: "Annual review of pension fund returns, investment strategies, and regulatory impacts across different regions.",
    stats: [
      { label: "Analysis", value: "50+ funds" },
      { label: "Refresh", value: "Yearly" },
      { label: "Coverage", value: "2020 to 2025" },
      { label: "Metrics", value: "Nominal + Real" },
    ],
  },
  {
    category: "Insurance",
    badge: "EMERGING",
    title: "Health Insurance Market Trends",
    desc: "Detailed analysis of market shifts, policy uptake, and consumer behavior in the health insurance sector.",
    stats: [
      { label: "Surveys", value: "30+ providers" },
      { label: "Update", value: "Biannual" },
      { label: "Coverage", value: "2021 to 2025" },
      { label: "Segments", value: "Public + Private" },
    ],
  },
  {
    category: "Reinsurance",
    badge: "POPULAR",
    title: "Lloyd's Syndicate Financials",
    desc: "Normalized annual report & accounts for Lloyd's syndicates, profit & loss, balance sheet, technical provisions and solvency. Every figure traced to its source page.",
    stats: [
      { label: "Records", value: "40+ carriers" },
      { label: "Refresh", value: "Quarterly" },
      { label: "Coverage", value: "2019 to 2026" },
      { label: "Fields", value: "Statutory + GAAP" },
    ],
  },
];

const TABS = ["Recommended", "Popular", "Newly added"];

// Each category keeps its own colour, simple, soft/muted tones (used on the
// card label and as a filter)
const CATEGORY_COLORS: Record<string, string> = {
  Sustainability: "#4a9d78",
  "Asset Management": "#5b86cf",
  "Investment Strategy": "#8b79c6",
  "Pension Funds": "#4ba0ad",
  Insurance: "#d18a5a",
  Reinsurance: "#c07d9c",
};
const CATEGORIES = Object.keys(CATEGORY_COLORS);

function DatasetCard({
  c,
  onClick,
  onBadgeClick,
  activeBadge,
}: {
  c: Card;
  onClick: () => void;
  onBadgeClick: (b: string) => void;
  activeBadge: string | null;
}) {
  const badgeActive = !!activeBadge && activeBadge.toLowerCase() === c.badge.toLowerCase();
  const Stat = ({ s }: { s: Stat }) => (
    <div>
      <p className="text-[12px] leading-4 text-[#6b7280]">{s.label}</p>
      <p className="mt-0.5 text-[13px] font-semibold leading-[18px] text-[#1c2737]">{s.value}</p>
    </div>
  );
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col gap-4 rounded-lg bg-[#f8faff] p-6 transition-shadow hover:shadow-[0_12px_28px_-14px_rgba(20,40,90,0.18)]"
    >
      {/* category + badge (badge = clickable filter) */}
      <div className="flex items-center gap-2.5">
        <span
          className="text-[11px] font-bold uppercase tracking-wide"
          style={{ color: CATEGORY_COLORS[c.category] ?? "#1f8a5b" }}
        >
          {c.category}
        </span>
        <button
          type="button"
          title={`Filter by ${c.badge}`}
          onClick={(e) => {
            e.stopPropagation();
            onBadgeClick(c.badge);
          }}
          className={`cursor-pointer rounded-full px-1.5 py-[3px] text-[10px] font-bold uppercase leading-none tracking-wide transition-all ${
            badgeActive
              ? "bg-[#246bfd] text-white ring-2 ring-[#246bfd]/25"
              : "bg-[#e6efff] text-[#246bfd] hover:brightness-95"
          }`}
        >
          {c.badge}
        </button>
      </div>

      {/* title + description */}
      <div className="space-y-1.5">
        <h3 className="text-[16px] font-medium leading-6 text-[#030712]">{c.title}</h3>
        <p className="line-clamp-2 text-[14px] leading-5 text-[#1f2937]">{c.desc}</p>
      </div>

      {/* metadata: two columns */}
      <div className="flex gap-3.5">
        <div className="flex flex-1 flex-col gap-2">
          <Stat s={c.stats[0]} />
          <Stat s={c.stats[1]} />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Stat s={c.stats[2]} />
          <Stat s={c.stats[3]} />
        </div>
      </div>
    </div>
  );
}

// ── "Access it however you work" (Figma 147-637) ──────────────────────────────
type Access = {
  name: string;
  sub: string;
  badge: string;
  desc: string;
  file: string;
  meta: string;
  checks: string[];
};
const ACCESS: Access[] = [
  {
    name: "Web Download",
    sub: "Point and click",
    badge: "Point & click",
    desc: "Browse, filter and export any dataset to Excel or CSV straight from your workspace, no engineering required.",
    file: "lloyds_syndicate_financials.xlsx",
    meta: "1,440 rows · 122 columns · 2.4 MB",
    checks: [
      "Excel (.xlsx) with one sheet per section",
      "CSV for the whole table",
      "Filtered or full-dataset exports",
      "Snapshot pinned to a dataset version",
    ],
  },
  {
    name: "Rest API",
    sub: "Programmatic",
    badge: "Programmatic",
    desc: "Query any dataset over a versioned REST endpoint, authenticate, filter and paginate straight from your services.",
    file: "GET /v1/datasets/lloyds_syndicate",
    meta: "JSON · cursor paging · 10k rows / page",
    checks: [
      "Versioned, stable endpoints",
      "Cursor + offset pagination",
      "Token-scoped access control",
      "OpenAPI schema included",
    ],
  },
  {
    name: "Warehouse Share",
    sub: "Zero copy",
    badge: "Zero copy",
    desc: "Mount any dataset directly into your warehouse with zero-copy shares, no pipelines, no duplication.",
    file: "SNOWFLAKE_SHARE :: PRAVEG_LLOYDS",
    meta: "Live share · governed · 0-copy",
    checks: [
      "Snowflake & BigQuery shares",
      "No data movement",
      "Auto-refreshed in place",
      "RBAC inherited from source",
    ],
  },
  {
    name: "BI Connectors",
    sub: "Dashboard",
    badge: "Dashboard",
    desc: "Connect datasets to your BI tools and build live dashboards on governed, always-refreshed data.",
    file: "lloyds_syndicate.pbix",
    meta: "Tableau · Power BI · Looker",
    checks: [
      "Native BI connectors",
      "Live or scheduled refresh",
      "Certified semantic models",
      "One-click publish",
    ],
  },
  {
    name: "Web download",
    sub: "Event Driven",
    badge: "Event Driven",
    desc: "Get notified the moment a dataset refreshes and stream new rows straight to your apps via webhooks.",
    file: "webhook → /events/lloyds",
    meta: "Push · JSON · at-least-once",
    checks: [
      "Webhooks on every refresh",
      "Streaming row deltas",
      "Retry & replay support",
      "Signed payloads",
    ],
  },
];

function AccessSection() {
  const [active, setActive] = useState(0);
  const a = ACCESS[active];
  return (
    <section className="mt-24">
      <div className="max-w-[860px]">
        <h2 className="text-[32px] font-medium leading-[1.1] text-brand sm:text-[40px]">
          Access it however you work.
        </h2>
        <p className="mt-4 text-[20px] font-light leading-[1.4] text-[#606060] sm:text-[24px]">
          Point and click or programmatic, batch or live the same verified dataset, delivered into
          the tools your team already uses.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_625px]">
        {/* accordion list */}
        <div>
          {ACCESS.map((item, i) => {
            const on = i === active;
            return (
              <button
                key={item.name + i}
                onClick={() => setActive(i)}
                className="flex w-full items-start justify-between border-b border-[#ececec] py-6 text-left"
              >
                <span>
                  <span
                    className="block text-[22px] font-semibold sm:text-[24px]"
                    style={{ color: on ? "#1b43fe" : "rgba(27,67,254,0.6)" }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="mt-1 block text-[16px] font-semibold sm:text-[18px]"
                    style={{ color: on ? "#000000" : "rgba(0,0,0,0.7)" }}
                  >
                    {item.sub}
                  </span>
                </span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mt-1 shrink-0"
                  style={{ color: on ? "#1b43fe" : "rgba(27,67,254,0.6)" }}
                >
                  <path d="M8 8l8 8M16 16V8.5M16 16H8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            );
          })}
        </div>

        {/* detail panel */}
        <div className="rounded-lg bg-[#e4e7ee]/30 p-8">
          <div className="flex items-center gap-3">
            <h3 className="text-[22px] font-bold text-[#0e1726]">{a.name}</h3>
            <span className="rounded-lg bg-[#eef4ff] px-2.5 py-1 text-[12px] font-medium text-[#1f50c4]">
              {a.badge}
            </span>
          </div>
          <p className="mt-3 text-[15px] leading-[1.5] text-[#6b7585]">{a.desc}</p>

          <div className="mt-6 rounded-[18px] bg-white p-5 shadow-[0_8px_24px_-14px_rgba(20,40,90,0.15)]">
            {/* file row */}
            <div className="flex items-center gap-3 border-b border-[#f0f2f6] pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[#dcf5ea]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#1aa06d]">
                  <path d="M14 3v4a1 1 0 001 1h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 21V5a2 2 0 012-2h7l5 5v13a2 2 0 01-2 2H7a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[14px] font-bold text-[#0e1726]">{a.file}</span>
                <span className="mt-0.5 block text-[11px] text-[#6b7585]">{a.meta}</span>
              </span>
            </div>
            {/* checklist */}
            <ul className="mt-4 space-y-3">
              {a.checks.map((c) => (
                <li key={c} className="flex items-center gap-2.5 text-[14px] text-[#3d4757]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#1aa06d]">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Pricing (Figma 147-709) ───────────────────────────────────────────────────
type Plan = {
  label: string;
  name: string;
  price: string;
  desc: string;
  checks: string[];
  cta: string;
  dark?: boolean;
  popular?: boolean;
};
const PLANS: Plan[] = [
  {
    label: "Browse and sample",
    name: "Explorer",
    price: "Free",
    desc: "Explore the full catalog, preview every schema and pull sample rows. Perfect for evaluating fit.",
    checks: ["Full catalog access", "Schema & sample previews", "1 dataset export / month", "Community support"],
    cta: "Create free account",
  },
  {
    label: "Use the data",
    name: "Professional",
    price: "Per dataset",
    desc: "Full access to the datasets you need, Excel, API and SDK, with scheduled refreshes and version history.",
    checks: ["Full dataset downloads", "REST API + Python SDK", "Scheduled refresh & history", "Email support"],
    cta: "Get access",
    dark: true,
    popular: true,
  },
  {
    label: "Operationalize it",
    name: "Enterprise",
    price: "Custom",
    desc: "Every dataset, warehouse shares and webhooks, plus custom taxonomies commissioned through Data Operations as a Service.",
    checks: ["All datasets + custom builds", "Warehouse share & webhooks", "SSO, RBAC, data residency", "SLAs & dedicated support"],
    cta: "Talk to us",
  },
];

function PricingSection() {
  return (
    <section className="bg-[#fafafa] px-4 py-20 sm:px-6">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center text-center">
        <span className="rounded-lg bg-black px-3 py-1.5 text-[12px] font-medium text-white">
          The Praveg suite
        </span>
        <h2 className="mt-6 text-[32px] font-medium leading-[1.1] text-ink-2 sm:text-[40px]">
          Start free. Scale when you&rsquo;re ready
        </h2>
        <p className="mt-3 max-w-[560px] text-[16px] font-light leading-[1.45] text-[#606060]">
          Create an account to browse and sample every dataset. Upgrade only the datasets and access
          you actually need.
        </p>

        <div className="mt-12 grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-[26px] p-8 text-left ${
                p.dark
                  ? "bg-[#0e1726] text-white lg:scale-[1.02] lg:shadow-[0_30px_60px_-25px_rgba(14,23,38,0.6)]"
                  : "border border-[#eef2f7] bg-white text-ink"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[13px] font-semibold ${p.dark ? "text-[#6db4f7]" : "text-brand"}`}>
                  {p.label}
                </span>
                {p.popular && (
                  <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Popular
                  </span>
                )}
              </div>
              <h3 className={`mt-4 text-[18px] font-medium ${p.dark ? "text-white" : "text-ink-2"}`}>
                {p.name}
              </h3>
              <p className={`mt-1 text-[28px] font-bold ${p.dark ? "text-white" : "text-ink-2"}`}>
                {p.price}
              </p>
              <p className={`mt-4 text-[14px] leading-[1.5] ${p.dark ? "text-white/65" : "text-[#606060]"}`}>
                {p.desc}
              </p>

              <div className={`my-6 h-px w-full ${p.dark ? "bg-white/12" : "bg-[#eff2f7]"}`} />

              <ul className="space-y-3">
                {p.checks.map((c) => (
                  <li key={c} className={`flex items-center gap-2.5 text-[14px] ${p.dark ? "text-white/85" : "text-[#3d4757]"}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#1aa06d]">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {c}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 flex items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold transition-colors ${
                  p.dark
                    ? "bg-[#2e66e6] text-white hover:bg-[#2459cf]"
                    : "border border-[#e6e8ee] bg-white text-ink hover:bg-[#f8faff]"
                }`}
              >
                {p.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Closing banner + contact form (Figma 147-834) ─────────────────────────────
export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState(TABS[0]);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [catOpen, setCatOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const toggleBadge = (b: string) =>
    setActiveBadge((cur) => (cur && cur.toLowerCase() === b.toLowerCase() ? null : b));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CARDS.filter((c) => {
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q);
      const matchesBadge = !activeBadge || c.badge.toLowerCase() === activeBadge.toLowerCase();
      const matchesCategory = !activeCategory || c.category === activeCategory;
      return matchesQuery && matchesBadge && matchesCategory;
    });
  }, [query, activeBadge, activeCategory]);

  return (
    <main className="min-h-screen bg-white text-ink">
      <Navbar />

      <div className="container-px mx-auto max-w-[1280px] py-12 sm:py-16">
        {/* ── Heading section ── */}
        <section className="flex flex-col items-center text-center">
          <h1 className="font-poppins text-[40px] font-bold leading-[1.05] tracking-tight sm:text-[56px] lg:text-[72px]">
            <span className="text-[#454545]">Quality grade datasets</span>
            <br />
            <span className="text-[#0074e8]">ready to use.</span>
          </h1>
          <p className="mt-5 max-w-[780px] text-[18px] font-medium leading-[1.45] text-[#606060]">
            Browse the published output of our Data Operations pipeline, structured,
            confidence-scored and human-verified. Access it however you work: download, API,
            warehouse share, SDK and more.
          </p>
        </section>

        {/* ── Marketplace banner ── */}
        <section className="mt-12">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#eef5ff] to-white">
            {/* floating 3D dataset tiles (raster mockups from Figma) */}
            <Image
              src="/assets/marketplace/tiles-left.png"
              alt=""
              width={561}
              height={434}
              className="pointer-events-none absolute left-0 top-0 hidden h-full w-auto select-none object-contain object-left md:block"
            />
            <Image
              src="/assets/marketplace/tiles-right.png"
              alt=""
              width={561}
              height={431}
              className="pointer-events-none absolute right-0 top-0 hidden h-full w-auto select-none object-contain object-right md:block"
            />

            {/* centered title */}
            <div className="relative z-10 mx-auto flex max-w-[440px] flex-col items-center px-6 py-16 text-center">
              <h2 className="text-[32px] font-bold leading-[38px] tracking-tight text-[#030712]">
                Data Marketplace
              </h2>
              <p className="mt-3 text-[16px] leading-6 text-[#1f2937]">
                Every dataset here was produced by our pipeline and verified by analysts. Filter,
                preview the schema, then pick how you want to access it.
              </p>
            </div>
          </div>

          {/* ── Filter bar ── */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* search */}
            <div className="flex flex-1 items-center gap-1.5 rounded-md bg-[#f8faff] px-3 py-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#6b7280]">
                <path
                  d="M9.167 15.833a6.667 6.667 0 100-13.333 6.667 6.667 0 000 13.333zM17.5 17.5l-3.625-3.625"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent text-[14px] text-[#1f2937] outline-none placeholder:text-[#1f2937]/70"
              />
            </div>

            {/* options */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setCatOpen((o) => !o)}
                  className="flex items-center gap-1.5 rounded-lg border px-4 py-2 text-[14px] font-medium transition-colors"
                  style={
                    activeCategory
                      ? {
                          color: CATEGORY_COLORS[activeCategory],
                          borderColor: CATEGORY_COLORS[activeCategory],
                          backgroundColor: `${CATEGORY_COLORS[activeCategory]}14`,
                        }
                      : { borderColor: "#e6eef9", color: "#030712" }
                  }
                >
                  {activeCategory ?? "Category"}
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="opacity-60">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {catOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setCatOpen(false)} />
                    <div className="absolute left-0 z-20 mt-2 w-56 rounded-lg border border-[#e6e8ee] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(20,40,90,0.22)]">
                      <button
                        onClick={() => {
                          setActiveCategory(null);
                          setCatOpen(false);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] text-[#3d4757] hover:bg-[#f6f9ff]"
                      >
                        <span className="h-2 w-2 rounded-full border border-[#c2c9d4]" />
                        All categories
                      </button>
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveCategory(cat);
                            setCatOpen(false);
                          }}
                          className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] text-[#1f2937] hover:bg-[#f6f9ff] ${
                            activeCategory === cat ? "bg-[#f6f9ff] font-medium" : ""
                          }`}
                        >
                          <span className="h-2 w-2 rounded-full" style={{ background: CATEGORY_COLORS[cat] }} />
                          {cat}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-lg border px-4 py-2 text-[14px] transition-colors ${
                    tab === t
                      ? "border-brand bg-brand/5 text-brand"
                      : "border-[#e6eef9] bg-white text-[#030712] hover:bg-[#f8faff]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* active badge filter */}
          {activeBadge && (
            <div className="mt-4 flex items-center gap-2 text-[13px] text-[#6b7585]">
              <span>Filtered by</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6efff] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#246bfd]">
                {activeBadge}
                <button
                  type="button"
                  aria-label="Clear filter"
                  onClick={() => setActiveBadge(null)}
                  className="-mr-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-[#246bfd]/15"
                >
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                    <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </span>
            </div>
          )}

          {/* ── Cards grid ── */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <DatasetCard
                key={c.title}
                c={c}
                onClick={() => setActiveCard(c)}
                onBadgeClick={toggleBadge}
                activeBadge={activeBadge}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="mt-10 text-center text-[15px] text-[#6b7585]">
              No datasets match your filter.
            </p>
          )}
        </section>

        {/* ── Access methods ── */}
        <AccessSection />
      </div>

      {/* ── Pricing (full-bleed) ── */}
      <PricingSection />

      {/* ── Closing banner + contact form ── */}
      <ClosingBanner />

      {/* ── Footer (shared) ── */}
      <Footer />

      <DatasetOverlay card={activeCard} onClose={() => setActiveCard(null)} />
    </main>
  );
}
