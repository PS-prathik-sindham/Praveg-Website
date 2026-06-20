import { NextResponse } from "next/server";

// Receives a contact-form submission and forwards it to a Microsoft Power
// Automate flow (set CONTACT_WEBHOOK_URL) that adds a row to Excel and emails
// the sales inbox. Keeps the flow URL server-side (never exposed to the browser).
export const runtime = "nodejs";

const NOTIFY_EMAIL = "prathik.sindham@productsquads.co";

export async function POST(req: Request) {
  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // honeypot: bots fill a hidden field — silently accept and drop
  if (data.company_website) return NextResponse.json({ ok: true });

  if (!data.email || !data.firstName) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const payload = {
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    phone: data.phone ?? "",
    role: data.role ?? "",
    company: data.company ?? "",
    country: data.country ?? "",
    email: data.email ?? "",
    subject: data.subject ?? "",
    message: data.message ?? "",
    notifyEmail: NOTIFY_EMAIL,
    submittedAt: new Date().toISOString(),
    source: "praveg.ai contact form",
  };

  let delivered = false;

  // FormSubmit requires a browser-style Referer/Origin — forward the caller's.
  const origin =
    req.headers.get("origin") || req.headers.get("referer") || "http://localhost:3000";

  // 1) Email via FormSubmit (no account needed; emails NOTIFY_EMAIL).
  try {
    const fs = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: origin,
      },
      body: JSON.stringify({
        Name: `${payload.firstName} ${payload.lastName}`.trim(),
        Email: payload.email,
        Phone: payload.phone,
        Role: payload.role,
        Company: payload.company,
        Country: payload.country,
        Subject: payload.subject,
        Message: payload.message,
        Submitted: payload.submittedAt,
        _subject: `New Praveg.ai contact: ${payload.firstName || "Lead"}${payload.company ? " – " + payload.company : ""}`,
        _template: "table",
        _captcha: "false",
      }),
    });
    const body = (await fs.json().catch(() => ({}))) as { success?: string; message?: string };
    // success:"true" = delivered; "needs Activation" = accepted but awaiting the
    // one-time activation click — treat both as accepted for the user.
    if (body.success === "true" || /activat/i.test(body.message ?? "")) {
      delivered = true;
      if (body.success !== "true") console.warn("[contact] FormSubmit awaiting activation");
    } else {
      console.error("[contact] FormSubmit:", body.message ?? fs.status);
    }
  } catch (e) {
    console.error("[contact] FormSubmit failed:", e);
  }

  // 2) Optional: forward to a Power Automate flow that adds a row to Excel.
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) delivered = true;
      else console.error("[contact] Excel webhook responded", res.status);
    } catch (e) {
      console.error("[contact] Excel webhook failed:", e);
    }
  }

  if (!delivered) {
    console.warn("[contact] no destination delivered. Submission:", payload);
    return NextResponse.json({ error: "Failed to deliver" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
