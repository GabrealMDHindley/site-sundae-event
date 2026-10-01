import { NextResponse } from "next/server";
import { EVENT } from "@/content/event";

export const runtime = "nodejs";

type Rsvp = {
  firstName: string; lastName: string; email: string; phone: string; company: string;
  role: string; models: string[]; markets: string; deals: string; spend: string; timeline: string;
  guest?: string; challenge?: string; consentSms?: boolean; consentEmail?: boolean;
  utm?: Record<string, string>;
};

const clean = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Fit scoring mirrors the seat-approval bar in the campaign plan (plan 01 §1).
function score(r: Rsvp) {
  let s = 0;
  if (/owner|founder|principal|acquisition/i.test(r.role)) s += 2;
  if (["6–12", "13–24", "25+"].includes(r.deals)) s += 2;
  else if (r.deals === "1–5") s += 1;
  if (["$5k–$15k", "$15k+"].includes(r.spend)) s += 1;
  if (["Now", "3–6 months", "6–12 months"].includes(r.timeline)) s += 1;
  if (r.models.some((m) => /wholesal|flip|buy/i.test(m))) s += 1;
  return { points: s, fit: s >= 5 ? "A" : s >= 3 ? "B" : "C" };
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 }); }
  if (clean(body.website)) return NextResponse.json({ ok: true, routed: "ignored" }); // honeypot

  const r: Rsvp = {
    firstName: clean(body.firstName, 80), lastName: clean(body.lastName, 80), email: clean(body.email, 160),
    phone: clean(body.phone, 40), company: clean(body.company, 160), role: clean(body.role, 80),
    models: Array.isArray(body.models) ? body.models.map((m) => clean(m, 40)).filter(Boolean).slice(0, 8) : [],
    markets: clean(body.markets, 200), deals: clean(body.deals, 20), spend: clean(body.spend, 20),
    timeline: clean(body.timeline, 40), guest: clean(body.guest, 120), challenge: clean(body.challenge, 1000),
    consentSms: body.consentSms === true, consentEmail: body.consentEmail === true,
    utm: typeof body.utm === "object" && body.utm ? Object.fromEntries(Object.entries(body.utm as Record<string, unknown>).map(([k, v]) => [k.slice(0, 40), clean(v, 120)])) : {},
  };
  const missing = (["firstName", "lastName", "email", "phone", "company"] as const).filter((k) => !r[k]);
  if (missing.length || !/^\S+@\S+\.\S+$/.test(r.email)) {
    return NextResponse.json({ ok: false, error: "Please complete your name, email, phone and company." }, { status: 422 });
  }
  const fit = score(r);
  const payload = {
    event: "Sundae Private Dinner & Dialogue — Manhattan Beach, Oct 8 2026",
    submittedAt: new Date().toISOString(),
    ...r, name: `${r.firstName} ${r.lastName}`, fit: fit.fit, fitPoints: fit.points,
    tags: ["evt:la-1008", `fit:${fit.fit.toLowerCase()}`, ...(r.utm?.utm_source ? [`src:${r.utm.utm_source}`] : [])],
  };

  const webhook = process.env.RSVP_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) return NextResponse.json({ ok: true, routed: "crm" });
      console.error("RSVP webhook failed", res.status);
    } catch (e) {
      console.error("RSVP webhook error", e);
    }
  }
  // No CRM webhook configured (or it failed): log it, then hand the guest to Sundae's
  // existing RSVP Google Form with their answers pre-filled so no request is lost.
  console.log("RSVP", JSON.stringify(payload));
  const f = EVENT.googleFormFields;
  const qs = new URLSearchParams({ usp: "pp_url", [f.name]: payload.name, [f.entity]: r.company, [f.phone]: r.phone });
  return NextResponse.json({ ok: true, routed: "google-form", confirmUrl: `${EVENT.googleFormUrl}?${qs.toString()}` });
}
