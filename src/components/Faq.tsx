"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do we have to manage any infrastructure?",
    a: "No. Praveg.ai is a fully managed agentic platform — compute, orchestration, scaling and uptime are ours. You connect your data sources and start building agents; there is nothing to provision or operate.",
  },
  {
    q: "How does it connect to our data?",
    a: "Managed connectors and native MCP support reach your databases, warehouses, SaaS apps and files. You read in place, with the permissions you set — nothing to provision, nothing to maintain.",
  },
  {
    q: "What can the agents actually do?",
    a: "Agents retrieve, run SQL, execute code, build charts and call tools — composed visually or in code into workflows, from a quick Q&A bot to a full automated data-ops pipeline.",
  },
  {
    q: "How do you keep answers trustworthy?",
    a: "Every answer is grounded in your governed data and taxonomy, cited back to the source row, document and definition, and gated by the human review you configure.",
  },
  {
    q: "How is this different from a chatbot on our database?",
    a: "A chatbot answers from one source with no guarantees. Praveg.ai reasons across all your governed sources, enforces least-privilege access, and proves every fact with provenance and a full audit trail.",
  },
  {
    q: "Where does the Data Marketplace fit in?",
    a: "The Data Marketplace offers specialised, reviewed datasets you can connect in one click and plug straight into your agents and workflows — governed like everything else on the platform.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-t border-[#e6e8ee] last:border-b">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left"
            >
              <span className="text-[17px] font-semibold text-ink-2">{f.q}</span>
              <span
                className={`shrink-0 mt-0.5 flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                  isOpen ? "bg-brand text-white" : "bg-[#eaf0ff] text-brand"
                }`}
              >
                {isOpen ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 3v6M3 6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                )}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-[15px] leading-7 text-muted max-w-[760px]">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
