import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import MaskedTextReveal from "@/components/MaskedTextReveal";
import FlowDiagram from "@/components/FlowDiagram";
import AnimatedTerminal from "@/components/AnimatedTerminal";
import AiChatAnswer from "@/components/AiChatAnswer";
import CardStack from "@/components/CardStack";
import AgentChat from "@/components/AgentChat";
import ClosingBanner from "@/components/ClosingBanner";
import HeroShowcase from "@/components/HeroShowcase";

/* ---------- shared bits ---------- */

function Pill({
  children,
  variant = "light",
}: {
  children: React.ReactNode;
  variant?: "light" | "mono" | "bold";
}) {
  const styles = {
    light:
      "bg-[#f3f4f6] text-[#000] border border-[#e6e8ee] text-[12px] font-bold tracking-wide",
    mono: "bg-white text-[#101010] border border-[#e6e8ee] font-mono text-[12px] font-bold tracking-wider",
    bold: "bg-[#f3f4f6] text-[#000] border border-[#e6e8ee] text-[14px] font-bold",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M4 8h8M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const icons: Record<string, React.ReactNode> = {
  bolt: <path d="M13 2L4 13h6l-1 9 9-11h-6l1-9z" />,
  link: <path d="M9 12a3 3 0 0 0 3 3h3a3 3 0 0 0 0-6h-1M15 12a3 3 0 0 0-3-3H9a3 3 0 0 0 0 6h1" />,
  sparkles: (
    <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9L18 14z" />
  ),
  check: <path d="M5 12l4 4L19 6" />,
  shield: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />,
  grid: <path d="M4 4h7v7H4V4zM13 4h7v7h-7V4zM4 13h7v7H4v-7zM13 13h7v7h-7v-7z" />,
  doc: <path d="M7 3h7l5 5v13H7V3zM14 3v5h5" />,
  target: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />,
  building: <path d="M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M9 7h2M9 11h2M9 15h2M16 21v-9h3v9" />,
  scale: <path d="M12 3v18M5 8h14M7 8l-3 6h6l-3-6zM17 8l-3 6h6l-3-6z" />,
  chartbar: (
    <path d="M21 18.75H20.25V3.75C20.25 3.55109 20.171 3.36032 20.0303 3.21967C19.8897 3.07902 19.6989 3 19.5 3H14.25C14.0511 3 13.8603 3.07902 13.7197 3.21967C13.579 3.36032 13.5 3.55109 13.5 3.75V7.5H9C8.80109 7.5 8.61032 7.57902 8.46967 7.71967C8.32902 7.86032 8.25 8.05109 8.25 8.25V12H4.5C4.30109 12 4.11032 12.079 3.96967 12.2197C3.82902 12.3603 3.75 12.5511 3.75 12.75V18.75H3C2.80109 18.75 2.61032 18.829 2.46967 18.9697C2.32902 19.1103 2.25 19.3011 2.25 19.5C2.25 19.6989 2.32902 19.8897 2.46967 20.0303C2.61032 20.171 2.80109 20.25 3 20.25H21C21.1989 20.25 21.3897 20.171 21.5303 20.0303C21.671 19.8897 21.75 19.6989 21.75 19.5C21.75 19.3011 21.671 19.1103 21.5303 18.9697C21.3897 18.829 21.1989 18.75 21 18.75ZM15 4.5H18.75V18.75H15V4.5ZM9.75 9H13.5V18.75H9.75V9ZM5.25 13.5H8.25V18.75H5.25V13.5Z" />
  ),
};

const filledIcons = new Set(["chartbar"]);

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const filled = filledIcons.has(name);
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[name]}
    </svg>
  );
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24">
      <div className="container-px flex flex-col items-center text-center">
        <h1 className="font-poppins text-[44px] sm:text-[60px] lg:text-[72px] font-bold leading-[1.05] tracking-tight text-[#3a3a3a] max-w-[900px]">
          <MaskedTextReveal
            segments={[
              { text: "Data platform that acts and decides with" },
              { text: "superhuman precision.", className: "text-brand" },
            ]}
            stagger={0.05}
            duration={0.85}
            delay={0.6}
          />
        </h1>
        <p className="mt-6 max-w-[640px] text-[18px] font-medium leading-7 text-[#606060]">
          <MaskedTextReveal
            variant="fade"
            segments={[
              {
                text: "Connect private or public data sources. Set up a workflow once, and let agent swarms handle every step: pulling data, making judgement calls, sending emails, and syncing results back, all without leaving Praveg.",
              },
            ]}
            delay={1}
            stagger={0.022}
            duration={0.6}
          />
        </p>

        <div
          className="reveal-up mt-14 w-full max-w-[1120px]"
          style={{ animationDelay: "2s" }}
        >
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}

function Platform() {
  const cards = ["Zero infrastructure", "Connectors & MCPs", "Agent builder", "Governed by default"];
  return (
    <section id="platform" className="bg-white py-24">
      <div className="container-px grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-[40px] font-bold leading-[1.1] text-ink sm:text-[50px]">
            The whole platform. None of the plumbing
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {cards.map((c) => (
              <div
                key={c}
                className="relative flex min-h-[120px] flex-col justify-between border border-[#e6e8ee] p-5"
              >
                <span className="text-[22px] leading-7 text-[#0a1f3e]">{c}</span>
                <Arrow className="absolute bottom-4 right-4 h-4 w-4 text-brand" />
              </div>
            ))}
          </div>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-manrope text-[14px] font-bold text-white transition-colors hover:bg-[#1b5ce0]"
          >
            Get a quote
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M5 5h6v6M11 5L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="flex flex-col">
          <p className="mb-5 text-[14px] font-bold tracking-wider text-ink">
            WHAT WE RUN, SO YOU DON&apos;T
          </p>
          <div className="space-y-4">
            <div className="bg-[#f5f6f8] p-7 text-[18px] leading-7 text-ink">
              Most teams spend months wiring up infrastructure before they get a
              single answer. Praveg.ai is the agentic platform, connectors, agents,
              workflows and governance, delivered as a service, so you start with
              the problem, not the pipes.
            </div>
            <div className="bg-[#f5f6f8] p-7 text-[18px] leading-7 text-ink">
              You bring your data sources and your questions. We bring the connectors
              that reach them, the agents that reason over them, the workflows that
              automate the work, and the governance that proves it, running as a
              managed service, not a stack to babysit.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section
      id="how"
      className="relative overflow-hidden pt-12 pb-16"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #eaf1ff 45%, #dbe7ff 100%)" }}
    >
      <div className="container-px flex flex-col items-center text-center">
        <Pill variant="mono">The Problem</Pill>
        <h2 className="mt-6 max-w-[820px] text-[34px] font-medium leading-[1.05] text-brand sm:text-[40px]">
          Data lives everywhere, but it doesn&apos;t flow anywhere
        </h2>
        <p className="mt-5 max-w-[640px] text-[18px] font-light leading-[1.4] text-[#303030]">
          Your information is scattered across filings, policies, ledgers, contracts,
          and spreadsheets. AI pilots fix isolated pieces but leave the flow broken.
          You need a unified layer that governs the entire journey from collection to
          insight.
        </p>
        <FlowDiagram className="-mt-16 w-full max-w-[1000px]" />
      </div>
    </section>
  );
}

function StepPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-8 py-2.5 text-[15px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.55)]"
      style={{ background: "linear-gradient(180deg,#5b9bf5 0%,#2f6fe6 55%,#2456d6 100%)" }}
    >
      {children}
    </span>
  );
}

function ConnectIllustration() {
  // Honeycomb cluster (3-4-3) of brand-logo hexagon badges, matching Figma 147:2169.
  const cells = [
    { n: "aws", l: 12.7, t: 0 }, { n: "snowflake", l: 37.6, t: 0 }, { n: "azure", l: 62.4, t: 0 },
    { n: "salesforce", l: 0, t: 33.1 }, { n: "s3", l: 24.9, t: 33.1 }, { n: "postgresql", l: 49.7, t: 33.1 }, { n: "dynamics", l: 74.6, t: 33.1 },
    { n: "googleads", l: 12.7, t: 66.2 }, { n: "slack", l: 37.6, t: 66.2 }, { n: "notion", l: 62.4, t: 66.2 },
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="relative w-[210px]" style={{ aspectRatio: "181 / 136" }}>
        {cells.map((c, i) => (
          <Image
            key={c.n}
            src={`/assets/cluster/${c.n}.png`}
            alt=""
            width={184}
            height={184}
            className="float-badge absolute"
            style={{
              left: `${c.l}%`,
              top: `${c.t}%`,
              width: "25.4%",
              animationDelay: `${-(i * 0.45).toFixed(2)}s`,
              animationDuration: `${(3 + (i % 3) * 0.8).toFixed(2)}s`,
            }}
          />
        ))}
      </div>
      <StepPill>Connect</StepPill>
    </div>
  );
}

function LaunchIllustration() {
  // Card-stack of message pills (Figma 203:521) cycling Agent details / Connect / Publish.
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <CardStack />
    </div>
  );
}

function Steps() {
  const cards = [
    { Illo: ConnectIllustration, title: "Start with anything", desc: "Add Data Connector to make it easy to bring in data." },
    { Illo: LaunchIllustration, title: "Launch agents", desc: "Create a new Agent and integrate it with the Intelligence framework." },
    { Illo: AiChatAnswer, title: "Take action", desc: "Ask your question. Agents return answers, charts, reports and insights." },
  ];
  return (
    <section className="bg-surface py-24">
      <div className="container-px flex flex-col items-center text-center">
        <h2 className="text-[34px] font-medium leading-[1.05] text-brand sm:text-[40px]">
          Instant Insights in 3 steps
        </h2>
        <p className="mt-4 max-w-[460px] text-[18px] text-[#282828]">
          The easiest way to get AI Intelligence you can trust, explain, and control.
        </p>

        <div className="mt-14 grid w-full max-w-[1120px] grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group rounded-2xl border border-[#eef0f4] bg-white p-4 text-left shadow-[0_10px_30px_-12px_rgba(20,40,90,0.12)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_24px_55px_-18px_rgba(20,40,90,0.28)]"
            >
              <div className="rounded-xl bg-[#f5f8fc] p-4" style={{ aspectRatio: "328 / 220" }}>
                <c.Illo />
              </div>
              <h3 className="mt-5 px-1 text-[24px] font-medium text-[#b0b8c1] transition-colors duration-300 group-hover:text-brand">
                {c.title}
              </h3>
              <p className="mt-1.5 px-1 pb-1 text-[16px] leading-6 text-[#1f2937]">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Connect() {
  return (
    <section className="bg-white py-24">
      <div className="container-px flex flex-col items-center text-center">
        <Pill variant="light">
          <span className="font-bold">Connect</span>
          <span className="text-[#9aa1ad]">Step 01</span>
        </Pill>
        <h2 className="mt-6 max-w-[760px] text-[34px] font-normal leading-[1.05] text-brand sm:text-[40px]">
          Reach every source without building a single pipeline.
        </h2>
        <p className="mt-5 max-w-[620px] text-[16px] font-light leading-[1.35] text-[#202020]">
          Managed connectors and native MCP support pull your databases, warehouses,
          SaaS apps and files into one governed fabric. Read in place, with the
          permissions you set, nothing to provision, nothing to maintain.
        </p>
        <ConnectorsGrid />
      </div>
    </section>
  );
}

function ConnectorsGrid() {
  const cols: { title: string; items: { label: string; logo: string }[] }[] = [
    {
      title: "Databases",
      items: [
        { label: "PostgreSQL", logo: "postgresql" },
        { label: "MySQL", logo: "mysql" },
        { label: "MongoDB", logo: "mongodb" },
        { label: "SQL Server", logo: "sqlserver" },
      ],
    },
    {
      title: "Warehouses",
      items: [
        { label: "Snowflake", logo: "snowflake" },
        { label: "BigQuery", logo: "bigquery" },
        { label: "Databricks", logo: "databricks" },
        { label: "Redshift", logo: "redshift" },
      ],
    },
    {
      title: "Files & storage",
      items: [
        { label: "S3  GCS", logo: "s3" },
        { label: "SharePoint", logo: "sharepoint" },
        { label: "Google Drive", logo: "googledrive" },
        { label: "PDF  Excel", logo: "pdfexcel" },
      ],
    },
    {
      title: "MCP servers",
      items: [
        { label: "Internal MCP", logo: "mcp1" },
        { label: "Tooling MCP", logo: "mcp2" },
        { label: "Partner MCP", logo: "mcp3" },
        { label: "Custom MCP", logo: "mcp4" },
      ],
    },
  ];
  return (
    <div className="mt-14 grid w-full max-w-[1180px] grid-cols-2 gap-x-8 gap-y-10 text-left md:grid-cols-4">
      {cols.map((col) => (
        <div key={col.title}>
          <p className="mb-4 text-[14px] font-normal text-[#3d4757]">{col.title}</p>
          <ul className="overflow-hidden border border-[#ecf0f5] divide-y divide-[#ecf0f5]">
            {col.items.map((it) => (
              <li key={it.label} className="flex items-center gap-3 px-4 py-3.5">
                <Image
                  src={`/assets/logos/${it.logo}.png`}
                  alt={it.label}
                  width={144}
                  height={144}
                  className="h-6 w-6 object-contain"
                />
                <span className="text-[14px] text-[#18202f]">{it.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Build() {
  const features = [
    {
      t: "Compose from building blocks",
      d: "Retrieval, SQL, code, charting and tool calling steps wired together visually or in code. No framework to learn.",
    },
    {
      t: "Workflows that run themselves",
      d: "Schedule them, trigger them on events, or hand them to agents, they run start to finish without a babysitter.",
    },
    {
      t: "Grounded in your taxonomy",
      d: "Agents answer against your schema and definitions, not the open web, so a metric means the same thing every time.",
    },
    {
      t: "Guardrails on every action",
      d: "Scoped permissions, approval gates and full audit trails. Agents only touch the data and tools you allow.",
    },
  ];
  return (
    <section className="bg-white py-24">
      <div className="container-px">
        <Pill variant="light">
          <span className="font-bold">Build</span>
          <span className="text-[#9aa1ad]">Step 02</span>
        </Pill>
        <h2 className="mt-6 max-w-[760px] text-[34px] font-medium leading-[1.05] text-[#101010] sm:text-[40px]">
          From a quick question to a full data-ops pipeline.
        </h2>
        <p className="mt-5 max-w-[620px] text-[22px] font-light leading-[1.3] text-[#606060]">
          An agent is only as good as the data it can access. Connect to your internal
          silos and external sources in minutes to build a comprehensive, governed
          knowledge base.
        </p>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2">
          <div>
            {features.map((f) => (
              <div key={f.t} className="border-b border-[#ececec] py-6 first:pt-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-[24px] font-semibold leading-tight text-brand-700">
                    {f.t}
                  </h3>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-[#101010]">
                    <path d="M5 5h6v6M11 5L5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="mt-2 max-w-[400px] text-[18px] font-semibold leading-[1.3] text-black/80">
                  {f.d}
                </p>
              </div>
            ))}
          </div>
          <div className="flex h-full items-center justify-center bg-[#f5f6f8] p-8">
            <AnimatedTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowCard() {
  const steps = [
    { n: 1, t: "Retrieve", s: "finance_marts", badge: "#2f6fe6", check: true },
    { n: 2, t: "Run SQL", s: "gwp_by_region", badge: "#2f6fe6", check: true },
    { n: 3, t: "Chart", s: "auto-select", badge: "#1faa5a", check: true },
    { n: 4, t: "Publish", s: "weekly · Slack", badge: "#252c3b", check: false },
  ];
  return (
    <div className="flex aspect-[534/426] w-full max-w-[534px] flex-col bg-[#090d17] p-[26px] shadow-[0_30px_60px_-20px_rgba(10,20,50,0.5)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand/20 text-[#8cb2ff]">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-[15px] font-bold text-white">Weekly revenue brief</span>
        </div>
        <span className="text-[11px] text-[#8cb2ff]">workflow · v3</span>
      </div>
      <div className="mt-5 flex flex-1 flex-col gap-3.5">
        {steps.map((st) => (
          <div
            key={st.n}
            className="flex flex-1 items-center justify-between border border-white/10 bg-white/5 px-4"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[13px] font-extrabold text-white"
                style={{ backgroundColor: st.badge }}
              >
                {st.n}
              </span>
              <div className="leading-tight">
                <div className="text-[13.5px] font-semibold text-white">{st.t}</div>
                <div className="text-[10.5px] text-white/45">{st.s}</div>
              </div>
            </div>
            {st.check && (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#3ddc97]" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Team() {
  const cards = [
    { icon: "sparkles", t: "Ask in plain language", d: "No SQL, no dashboards to hunt through. Type a question, get a grounded answer." },
    { icon: "chartbar", t: "Charts on demand", d: "Agents pick the right visualization and build it from live data instantly." },
    { icon: "doc", t: "Reports & briefings", d: "Recurring narratives and board-ready reports, generated and delivered automatically." },
    { icon: "target", t: "Cited every time", d: "Every figure links back to the source row, document and definition behind it." },
  ];
  return (
    <section className="bg-white py-24">
      <div className="container-px flex flex-col items-center text-center">
        <Pill variant="bold">For everyone, not just analysts</Pill>
        <h2 className="mt-6 max-w-[760px] text-[40px] font-bold leading-[1.05] text-ink-2 sm:text-[48px]">
          Answers your whole team can ask for.
        </h2>
        <p className="mt-5 max-w-[620px] text-[16px] font-light leading-[1.35] text-[#202020]">
          No SQL, no dashboard archaeology. People ask in plain language and get back
          exactly what they need grounded in governed data.
        </p>
        <div className="mt-14 grid w-full grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.t} className="rounded-2xl bg-[#f6f8fc] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                <Icon name={c.icon} />
              </div>
              <h3 className="mt-5 text-[16px] font-bold text-ink-2">{c.t}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-muted">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentChatPanel() {
  const I = (name: string, cls = "h-[18px] w-[18px]") => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/assets/agenticons/${name}.svg`} alt="" className={cls} />
  );
  // node 207-848, each icon SVG is the full 40×40 tile (active = blue #EEF5FF, rest #F8FAFF)
  const sidebarTop = ["s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7"];
  const sidebarBottom = ["sb1", "sb2"];
  return (
    <div className="mt-12 w-full max-w-[1080px] overflow-hidden rounded-2xl border border-[#e6e8ee] bg-white text-left shadow-[0_30px_70px_-25px_rgba(20,40,90,0.22)]">
      <div className="flex" style={{ height: 660 }}>
        {/* sidebar (Figma node 207-848) */}
        <div className="hidden w-[72px] shrink-0 flex-col items-center gap-2.5 border-r border-[#eef0f3] bg-white px-4 py-6 sm:flex">
          {sidebarTop.map((n) => (
            <span key={n}>{I(n, "h-10 w-10")}</span>
          ))}
          <div className="mt-auto flex flex-col items-center gap-2.5">
            {sidebarBottom.map((n) => (
              <span key={n}>{I(n, "h-10 w-10")}</span>
            ))}
          </div>
        </div>

        {/* main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* breadcrumb header (Figma node 207-557) */}
          <div className="flex items-center justify-between gap-2 border-b border-[#e5e7eb] px-6 py-2.5">
            <div className="flex items-center gap-2 text-[14px]">
              <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[#f3f4f6]">
                {I("back", "h-[18px] w-[18px]")}
              </button>
              <span className="text-[#152156]/60">Agents</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#9ca3af]">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-medium text-[#1f2937]">Business Development Consultant</span>
            </div>
            <div className="flex items-center gap-1.5">
              {["h1", "h2", "h3"].map((n) => (
                <button key={n} className="flex h-7 w-7 items-center justify-center rounded hover:bg-[#f3f4f6]">
                  {I(n, "h-6 w-6")}
                </button>
              ))}
            </div>
          </div>

          {/* interactive conversation + input */}
          <AgentChat />
        </div>
      </div>
    </div>
  );
}

function Interact() {
  return (
    <section id="interact" className="bg-white py-24">
      <div className="container-px flex flex-col items-center text-center">
        <Pill variant="light">
          <span className="font-bold">Interact</span>
          <span className="text-[#9aa1ad]">Step 03</span>
          <span className="font-bold text-brand">Try it</span>
        </Pill>
        <h2 className="mt-6 max-w-[760px] text-[34px] font-medium leading-[1.05] text-[#101010] sm:text-[40px]">
          This is what your team actually does. Ask.
        </h2>
        <p className="mt-5 max-w-[680px] text-[16px] font-light leading-[1.35] text-[#202020]">
          Pick a question. Watch an agent reach your connected sources, reason over
          governed data, and hand back an answer, with the chart and the citation.
        </p>

        <AgentChatPanel />
      </div>
    </section>
  );
}

function Suite() {
  const products = [
    {
      tag: "MANAGED DATA OPS",
      icon: "doc",
      t: "Data Operations as a Service",
      d: "Turn raw documents, annual reports, filings, spreadsheets, into structured, quality-grade datasets. Agents extract; people verify every fact that matters.",
      bullets: ["Agentic extraction", "Human-in-the-loop review", "Full provenance & audit"],
    },
    {
      tag: "REVIEWED DATASETS",
      icon: "grid",
      t: "Data Marketplace",
      d: "Discover and connect specialised, reviewed datasets, published, governed and ready to plug straight into your agents and workflows.",
      bullets: ["Curated & reviewed", "Connect in one click", "Governed distribution"],
    },
  ];
  return (
    <section id="suite" className="bg-surface py-24">
      <div className="container-px flex flex-col items-center text-center">
        <Pill variant="light">The Praveg suite</Pill>
        <h2 className="mt-6 max-w-[760px] text-[34px] font-medium leading-[1.05] text-[#101010] sm:text-[40px]">
          One platform. A growing suite of products.
        </h2>
        <p className="mt-5 max-w-[660px] text-[16px] font-light leading-[1.35] text-[#202020]">
          Praveg.ai is the foundation. On top of it sit focused products, managed
          data operations, a marketplace of reviewed datasets, and more on the way, all sharing the same connectors, agents and governance.
        </p>
        <div className="mt-14 grid w-full max-w-[760px] grid-cols-1 gap-6 text-left md:grid-cols-2">
          {products.map((p) => (
            <div key={p.t} className="rounded-2xl border border-[#e6e8ee] bg-white p-8 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
                <Icon name={p.icon} />
              </div>
              <p className="mt-6 text-[10.5px] font-bold tracking-widest text-brand">{p.tag}</p>
              <h3 className="mt-2 text-[23px] font-bold text-ink-2">{p.t}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-muted">{p.d}</p>
              <ul className="mt-5 space-y-2.5">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[13.5px] text-[#3d4757]">
                    <span className="text-brand">
                      <Check />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand">
                Explore <Arrow className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const cards = [
    { icon: "bolt", t: "No infrastructure to run", d: "We take the platform off your plate, compute, orchestration, scaling and uptime. You point it at your data and start building." },
    { icon: "link", t: "Connect to anything", d: "Managed connectors and native MCP support reach databases, warehouses, SaaS apps and files, without brittle pipelines to maintain." },
    { icon: "sparkles", t: "Agents built your way", d: "Compose agents and chain them into workflows, visually or in code, from a quick Q&A bot to a full automated data-ops pipeline." },
    { icon: "check", t: "Humans where it counts", d: "Confidence-driven review and approval gates keep a person on every decision that matters, so output is something you can defend." },
    { icon: "shield", t: "Governed by default", d: "SOC 2 controls, RBAC, SSO and your choice of data residency, with provenance and an immutable audit trail on every fact." },
    { icon: "grid", t: "A marketplace of trusted data", d: "Tap specialised, reviewed datasets from the Data Marketplace and plug them straight into your agents and workflows." },
  ];
  return (
    <section className="bg-white py-24">
      <div className="container-px flex flex-col items-center text-center">
        <Pill variant="light">Why Praveg.ai</Pill>
        <h2 className="mt-6 max-w-[760px] text-[34px] font-medium leading-[1.05] text-[#101010] sm:text-[40px]">
          Built to be trusted at enterprise scale.
        </h2>
        <p className="mt-5 max-w-[660px] text-[16px] font-light leading-[1.35] text-[#202020]">
          Speed is easy. Speed you can defend is the hard part. Praveg.ai is engineered
          for both.
        </p>
        <div className="mt-14 grid w-full grid-cols-1 gap-5 text-left md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div key={c.t} className="rounded-2xl border border-[#e6e8ee] p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef3ff] text-brand">
                <Icon name={c.icon} />
              </div>
              <h3 className="mt-5 text-[18px] font-bold text-ink-2">{c.t}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Security() {
  const chips = ["SOC 2", "RBAC · SSO", "Data residency", "Deploy in your VPC"];
  const cards = [
    { t: "Provenance on every fact", d: "Every value links to its source row, document, page and the definition behind it." },
    { t: "Human approval gates", d: "Nothing critical publishes without passing the review and sign-off you configure." },
    { t: "Scoped agent permissions", d: "Agents only reach the data and tools you grant, least privilege, enforced." },
    { t: "Immutable audit log", d: "Every query, edit, approval and publish event is recorded and attributable." },
    { t: "Your data, your region", d: "Choice of data residency, or deploy the platform inside your own VPC." },
    { t: "SOC 2 · RBAC · SSO", d: "Enterprise access controls and single sign-on across the whole platform." },
  ];
  return (
    <section id="security" className="bg-dark py-24">
      <div className="container-px grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-[12px] font-bold tracking-widest text-[#8cb2ff]">
            SECURITY &amp; GOVERNANCE
          </p>
          <h2 className="mt-5 text-[36px] font-bold leading-[1.07] text-white sm:text-[42px]">
            Agents you can hand the keys to.
          </h2>
          <p className="mt-5 max-w-[440px] text-[17px] leading-7 text-white/75">
            Autonomy without control is a liability. Every agent runs inside
            least-privilege permissions, every answer is traceable to source, and
            every action is logged, so the platform stands up to your risk team, an
            auditor and a regulator.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] font-medium text-white"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/20 text-[#8cb2ff]">
                <Check />
              </div>
              <h3 className="mt-4 text-[15.5px] font-bold text-white">{c.t}</h3>
              <p className="mt-2 text-[13px] leading-5 text-white/60">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const cards = [
    { icon: "building", t: "Financial services", d: "Risk, finance and reporting teams turning filings and ledgers into answers on demand." },
    { icon: "shield", t: "Insurance & reinsurance", d: "Syndicate accounts, statutory returns and treaty data, normalized and queryable." },
    { icon: "scale", t: "Regulators & supervisors", d: "Compare filings across entities in one governed, defensible dataset." },
    { icon: "doc", t: "Healthcare & life sciences", d: "Pull structure from clinical, regulatory and operational documents at scale." },
    { icon: "grid", t: "Public sector", d: "Make decades of records searchable and answerable for the teams that need them." },
    { icon: "target", t: "Private markets", d: "Fund reports, capital accounts and portfolio financials in one connected view." },
  ];
  return (
    <section className="bg-surface-blue py-24">
      <div className="container-px flex flex-col items-center text-center">
        <Pill variant="light">Where it fits</Pill>
        <h2 className="mt-6 text-[34px] font-medium leading-[1.05] text-[#101010] sm:text-[40px]">
          Any team buried in data.
        </h2>
        <p className="mt-5 max-w-[600px] text-[16px] font-light leading-[1.35] text-[#202020]">
          If the answer lives across systems and documents today, it can be a question
          your team just asks tomorrow.
        </p>
        <div className="mt-12 grid w-full grid-cols-1 gap-5 text-left md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div key={c.t} className="rounded-2xl border border-[#e6e8ee] bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef3ff] text-brand">
                  <Icon name={c.icon} className="h-4 w-4" />
                </div>
                <h3 className="text-[16.5px] font-bold text-ink-2">{c.t}</h3>
              </div>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-muted">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-surface py-24">
      <div className="container-px grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-[14px] font-bold text-brand">Questions</p>
          <h2 className="mt-4 font-poppins text-[34px] font-medium leading-[1.08] text-[#101010] sm:text-[40px]">
            What teams ask before they start.
          </h2>
        </div>
        <Faq />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Platform />
      <Problem />
      <Steps />
      <Connect />
      <Build />
      <Team />
      <Interact />
      <Suite />
      <Why />
      <Security />
      <UseCases />
      <FaqSection />
      <ClosingBanner />
      <Footer />
    </main>
  );
}
