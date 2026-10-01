"use client";
import { useEffect, useMemo, useState } from "react";
import AddToCalendar from "./AddToCalendar";

const ROLES = ["Owner / Founder", "Acquisitions lead", "Partner / Investor", "Agent / Team lead", "Other"];
const MODELS = ["Wholesale", "Fix & flip", "Buy & hold", "Agent / Team", "Lending", "Other"];
const DEALS = ["0", "1–5", "6–12", "13–24", "25+"];
const SPEND = ["Under $2k", "$2k–$5k", "$5k–$15k", "$15k+"];
const TIMELINE = ["Now", "3–6 months", "6–12 months", "Just exploring"];

type State = {
  firstName: string; lastName: string; email: string; phone: string; company: string; role: string; models: string[];
  markets: string; deals: string; spend: string; timeline: string; guest: string; challenge: string; consentSms: boolean; consentEmail: boolean; website: string;
};
const init: State = { firstName: "", lastName: "", email: "", phone: "", company: "", role: "", models: [], markets: "Los Angeles County", deals: "", spend: "", timeline: "", guest: "", challenge: "", consentSms: false, consentEmail: false, website: "" };

function Choice({ options, value, onPick, multi }: { options: string[]; value: string | string[]; onPick: (v: string) => void; multi?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2" role={multi ? "group" : "radiogroup"}>
      {options.map((o) => {
        const on = multi ? (value as string[]).includes(o) : value === o;
        return (
          <button type="button" key={o} className="chip" data-on={on} aria-pressed={on} onClick={() => onPick(o)}>{o}</button>
        );
      })}
    </div>
  );
}

export default function RsvpForm() {
  const [s, setS] = useState<State>(init);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState<null | { routed: string; confirmUrl?: string }>(null);
  const [utm, setUtm] = useState<Record<string, string>>({});
  useEffect(() => {
    const p = new URLSearchParams(window.location.search); const u: Record<string, string> = {};
    p.forEach((v, k) => { if (k.startsWith("utm_")) u[k] = v; });
    if (document.referrer) u.referrer = document.referrer;
    setUtm(u);
  }, []);
  const set = <K extends keyof State>(k: K, v: State[K]) => setS((x) => ({ ...x, [k]: v }));
  const steps = ["You", "Your business", "Confirm"];
  const valid = useMemo(() => [
    !!(s.firstName && s.lastName && /^\S+@\S+\.\S+$/.test(s.email) && s.phone.replace(/\D/g, "").length >= 10),
    !!(s.company && s.role && s.models.length && s.deals && s.spend && s.timeline),
    true,
  ], [s]);

  async function submit() {
    setBusy(true); setErr("");
    try {
      const res = await fetch("/api/rsvp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...s, utm }) });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || "Something went wrong.");
      setDone(j);
    } catch (e) { setErr(e instanceof Error ? e.message : "Something went wrong. Please try again."); }
    finally { setBusy(false); }
  }

  if (done) {
    return (
      <div className="card p-8 md:p-10" role="status">
        <p className="kicker">Request received</p>
        <h3 className="display mt-3 text-5xl">Thank you, {s.firstName}.</h3>
        {done.routed === "google-form" && done.confirmUrl ? (
          <>
            <p className="mt-4 max-w-xl text-muted">One last step: confirm on Sundae&apos;s guest list. Your name, company and phone are already filled in — it takes ten seconds.</p>
            <a className="btn btn-red mt-6" href={done.confirmUrl} target="_blank" rel="noopener">Confirm on the guest list →</a>
          </>
        ) : (
          <p className="mt-4 max-w-xl text-muted">Seats are limited, so the Sundae team reviews every request. You&apos;ll hear from us by text or email with your confirmation and table details.</p>
        )}
        <div className="mt-8 border-t hairline pt-6">
          <p className="text-sm text-muted">Thursday, October 8 · 7:00 PM · The Courtyard at Shade Hotel, Manhattan Beach</p>
          <AddToCalendar className="mt-4" />
        </div>
      </div>
    );
  }

  return (
    <form className="card p-6 md:p-10" onSubmit={(e) => { e.preventDefault(); if (step < 2) { if (valid[step]) setStep(step + 1); } else submit(); }} noValidate>
      <div className="mb-8 flex items-center gap-3" aria-label={`Step ${step + 1} of 3`}>
        {steps.map((l, i) => (
          <div key={l} className="flex flex-1 items-center gap-3">
            <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold ${i <= step ? "bg-red text-white" : "border border-white/20 text-muted"}`}>{i + 1}</span>
            <span className={`hidden text-sm sm:block ${i === step ? "text-cream" : "text-muted"}`}>{l}</span>
            {i < 2 && <span className="h-px flex-1 bg-white/15" />}
          </div>
        ))}
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" value={s.website} onChange={(e) => set("website", e.target.value)} aria-hidden />

      {step === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-muted">First name<input className="field" autoComplete="given-name" value={s.firstName} onChange={(e) => set("firstName", e.target.value)} required /></label>
          <label className="grid gap-2 text-sm text-muted">Last name<input className="field" autoComplete="family-name" value={s.lastName} onChange={(e) => set("lastName", e.target.value)} required /></label>
          <label className="grid gap-2 text-sm text-muted">Email<input className="field" type="email" autoComplete="email" value={s.email} onChange={(e) => set("email", e.target.value)} required /></label>
          <label className="grid gap-2 text-sm text-muted">Mobile phone<input className="field" type="tel" autoComplete="tel" value={s.phone} onChange={(e) => set("phone", e.target.value)} required /></label>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-muted">Company / entity name<input className="field" autoComplete="organization" value={s.company} onChange={(e) => set("company", e.target.value)} required /></label>
            <label className="grid gap-2 text-sm text-muted">Markets you buy in<input className="field" value={s.markets} onChange={(e) => set("markets", e.target.value)} /></label>
          </div>
          <fieldset className="grid gap-3"><legend className="mb-2 text-sm text-muted">Your role</legend><Choice options={ROLES} value={s.role} onPick={(v) => set("role", v)} /></fieldset>
          <fieldset className="grid gap-3"><legend className="mb-2 text-sm text-muted">Your model (pick all that apply)</legend><Choice multi options={MODELS} value={s.models} onPick={(v) => set("models", s.models.includes(v) ? s.models.filter((m) => m !== v) : [...s.models, v])} /></fieldset>
          <fieldset className="grid gap-3"><legend className="mb-2 text-sm text-muted">Deals closed in the last 12 months</legend><Choice options={DEALS} value={s.deals} onPick={(v) => set("deals", v)} /></fieldset>
          <fieldset className="grid gap-3"><legend className="mb-2 text-sm text-muted">Monthly acquisition marketing spend</legend><Choice options={SPEND} value={s.spend} onPick={(v) => set("spend", v)} /></fieldset>
          <fieldset className="grid gap-3"><legend className="mb-2 text-sm text-muted">When are you looking to scale?</legend><Choice options={TIMELINE} value={s.timeline} onPick={(v) => set("timeline", v)} /></fieldset>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm text-muted">Bringing a business partner? (name — optional)<input className="field" value={s.guest} onChange={(e) => set("guest", e.target.value)} /></label>
          <label className="grid gap-2 text-sm text-muted">What&apos;s your biggest acquisition challenge right now? (optional)<textarea className="field min-h-[96px]" value={s.challenge} onChange={(e) => set("challenge", e.target.value)} /></label>
          <label className="flex items-start gap-3 text-sm text-muted"><input type="checkbox" className="mt-1 h-4 w-4 accent-[#db3d55]" checked={s.consentSms} onChange={(e) => set("consentSms", e.target.checked)} /><span>Text me about this event (confirmation, reminders, details) from Sundae. Message frequency varies; msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of attending.</span></label>
          <label className="flex items-start gap-3 text-sm text-muted"><input type="checkbox" className="mt-1 h-4 w-4 accent-[#db3d55]" checked={s.consentEmail} onChange={(e) => set("consentEmail", e.target.checked)} /><span>Email me about future Sundae operator dinners and Sundae Membership. Unsubscribe anytime.</span></label>
          <p className="text-xs text-dim">By requesting a seat you agree to Sundae&apos;s <a className="underline" href="https://sundae.com/terms-of-service/" target="_blank" rel="noopener">Terms</a> and <a className="underline" href="https://sundae.com/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a>.</p>
        </div>
      )}

      {err && <p className="mt-6 text-sm text-red" role="alert">{err}</p>}
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>← Back</button> : <span className="text-xs text-dim">Takes about 60 seconds.</span>}
        <button type="submit" className="btn btn-red disabled:opacity-50" disabled={!valid[step] || busy}>
          {step < 2 ? "Continue →" : busy ? "Sending…" : "Request my seat →"}
        </button>
      </div>
    </form>
  );
}
