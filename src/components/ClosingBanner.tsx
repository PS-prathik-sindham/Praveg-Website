"use client";

import { useState } from "react";

// Shared closing banner + contact form (Figma node 147-834).
// Submits to /api/contact, which forwards to a Microsoft Power Automate flow
// that writes a row to Excel and emails the sales inbox.
const FIELDS = [
  { label: "Name", name: "firstName", type: "text", required: true },
  { label: "Last Name", name: "lastName", type: "text", required: false },
  { label: "Phone No", name: "phone", type: "tel", required: false },
  { label: "Role", name: "role", type: "text", required: false },
  { label: "Company", name: "company", type: "text", required: false },
  { label: "Country", name: "country", type: "text", required: false },
  { label: "Company Email", name: "email", type: "email", required: true },
  { label: "Subject", name: "subject", type: "text", required: false },
] as const;

type Status = "idle" | "sending" | "done" | "error";

export default function ClosingBanner() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (name: string, value: string) => setForm((f) => ({ ...f, [name]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      setForm({});
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "rounded border border-[#e6e8ee] bg-white px-3.5 py-2.5 text-[14px] text-ink outline-none placeholder:text-[#9aa3b2] focus:border-brand";

  return (
    <section id="contact" className="bg-[#010510] px-4 py-16 sm:px-6">
      <div
        className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 overflow-hidden rounded-[20px] bg-[#0753ed] bg-cover bg-center p-10 sm:p-14 lg:grid-cols-2"
        style={{ backgroundImage: "url('/assets/marketplace/banner-bg.png')" }}
      >
        <h2 className="font-poppins text-[40px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[56px]">
          BUILT FOR TRUST
          <br />
          READY TO SCALE
        </h2>

        {status === "done" ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-lg bg-white p-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dff3e6] text-[#1aa06d]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 className="mt-4 text-[20px] font-bold text-ink-2">Thanks — we&rsquo;ve got it.</h3>
            <p className="mt-2 text-[14px] text-[#606060]">
              Our team will reach out to you shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-5 text-[13px] font-semibold text-brand hover:underline"
            >
              Submit another response
            </button>
          </div>
        ) : (
          <form className="rounded-lg bg-white p-6 sm:p-8" onSubmit={handleSubmit}>
            <p className="text-[15px] font-medium text-ink-2">
              Fill out the form below, and our Sales team will reach out soon.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <input
                  key={f.name}
                  name={f.name}
                  type={f.type}
                  required={f.required}
                  value={form[f.name] ?? ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  placeholder={f.required ? `${f.label} *` : f.label}
                  className={inputCls}
                />
              ))}
            </div>
            <textarea
              name="message"
              value={form.message ?? ""}
              onChange={(e) => set("message", e.target.value)}
              placeholder="What can we help you with?"
              rows={3}
              className={`mt-3 w-full resize-none ${inputCls}`}
            />
            {/* honeypot — bots fill this, humans never see it */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              value={form.company_website ?? ""}
              onChange={(e) => set("company_website", e.target.value)}
              className="hidden"
              aria-hidden="true"
            />
            {status === "error" && (
              <p className="mt-3 text-[13px] font-medium text-[#d4503f]">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-gradient-to-r from-[#0052d4] to-[#6fb1fc] px-10 py-2.5 text-[14px] font-semibold text-white transition-opacity disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
