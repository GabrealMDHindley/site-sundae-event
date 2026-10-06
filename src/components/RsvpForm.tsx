"use client";
import { useEffect, useMemo, useState } from "react";
import AddToCalendar from "./AddToCalendar";

const ROLES = ["Owner / Founder", "Acquisitions lead", "Partner / Investor", "Agent / Team lead", "Other"];
const MODELS = ["Wholesale", "Fix & flip", "Buy & hold", "Agent / Team", "Lending", "Other"];
const DEALS = ["0", "1–5", "6–12", "13–24", "25+"];
const SPEND = ["Under $2k", "$2k–$5k", "$5k–$15k", "$15k+"];
const TIMELINE = ["Now", "3–6 months", "6–12 months", "Just exploring"];
// AP-style display labels. The option values above are what the API scores and the CRM receives,
// so they never change; only the chip text a guest reads does.
const LABEL: Record<string, string> = {
  "Fix & flip": "Fix and flip", "Buy & hold": "Buy and hold",
  "1–5": "1-5", "6–12": "6-12", "13–24": "13-24",
  "Under $2k": "Under $2,000", "$2k–$5k": "$2,000-$5,000", "$5k–$15k": "$5,000-$15,000", "$15k+": "$15,000+",
  "3–6 months": "3-6 months", "6–12 months": "6-12 months",
};

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
          <button type="button" key={o} className="chip" data-on={on} aria-pressed={on} onClick={() => onPick(o)}>{LABEL[o] ?? o}</button>
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
      <div className="card p-7 md:p-10" role="status">
        <p className="eyebrow">Request received</p>
        <h3 className="display bar mt-4 text-[2.25rem] md:text-[3rem]">Thank you, {s.firstName}.</h3>
        {done.routed === "google-form" && done.confirmUrl ? (
          <>
            <p className="mt-5 max-w-xl">One last step: confirm on Sundae&apos;s guest list. Your name, company and phone are already filled in — it takes 10 seconds.</p>
            <a className="btn btn-primary mt-6" href={done.confirmUrl} target="_blank" rel="noopener">Confirm on the guest list →</a>
          </>
        ) : (
          <p className="mt-5 max-w-xl">Seats are limited, so the Sundae team reviews every request. You&apos;ll hear from us by text or email with your confirmation and table details.</p>
        )}
        <div className="mt-8 border-t border-gray pt-6">
          <p className="text-lg font-bold">Thursday, Oct. 8 · 7 p.m.</p>
          <p className="text-lg">The Courtyard at Shade Hotel, Manhattan Beach</p>
          <AddToCalendar className="mt-4" />
        </div>
      </div>
    );
  }

  return (
    <form className="card p-5 sm:p-6 md:p-10" onSubmit={(e) => { e.preventDefault(); if (step < 2) { if (valid[step]) setStep(step + 1); } else submit(); }} noValidate>
      <div className="mb-8 flex items-center gap-3" role="group" aria-label={`Step ${["one", "two", "three"][step]} of three`}>
        {steps.map((l, i) => (
          <div key={l} className="flex flex-1 items-center gap-3">
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-base font-bold ${i <= step ? "bg-blue text-white" : "border border-ink bg-white text-ink"}`}>{i + 1}</span>
            <span className={`hidden text-base sm:block ${i === step ? "font-bold" : ""}`}>{l}</span>
            {i < 2 && <span className={`h-[2px] flex-1 ${i < step ? "bg-blue" : "bg-gray"}`} />}
          </div>
        ))}
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" value={s.website} onChange={(e) => set("website", e.target.value)} aria-hidden />

      {step === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-base font-bold">First name<input className="field" autoComplete="given-name" value={s.firstName} onChange={(e) => set("firstName", e.target.value)} required /></label>
          <label className="grid gap-2 text-base font-bold">Last name<input className="field" autoComplete="family-name" value={s.lastName} onChange={(e) => set("lastName", e.target.value)} required /></label>
          <label className="grid gap-2 text-base font-bold">Email<input className="field" type="email" autoComplete="email" value={s.email} onChange={(e) => set("email", e.target.value)} required /></label>
          <label className="grid gap-2 text-base font-bold">Mobile phone<input className="field" type="tel" autoComplete="tel" value={s.phone} onChange={(e) => set("phone", e.target.value)} required /></label>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-base font-bold">Company / entity name<input className="field" autoComplete="organization" value={s.company} onChange={(e) => set("company", e.target.value)} required /></label>
            <label className="grid gap-2 text-base font-bold">Markets you buy in<input className="field" value={s.markets} onChange={(e) => set("markets", e.target.value)} /></label>
          </div>
          <fieldset className="grid gap-3"><legend className="mb-2 text-base font-bold">Your role</legend><Choice options={ROLES} value={s.role} onPick={(v) => set("role", v)} /></fieldset>
          <fieldset className="grid gap-3"><legend className="mb-2 text-base font-bold">Your model (pick all that apply)</legend><Choice multi options={MODELS} value={s.models} onPick={(v) => set("models", s.models.includes(v) ? s.models.filter((m) => m !== v) : [...s.models, v])} /></fieldset>
          <fieldset className="grid gap-3"><legend className="mb-2 text-base font-bold">Deals closed in the last 12 months</legend><Choice options={DEALS} value={s.deals} onPick={(v) => set("deals", v)} /></fieldset>
          <fieldset className="grid gap-3"><legend className="mb-2 text-base font-bold">Monthly acquisition marketing spend</legend><Choice options={SPEND} value={s.spend} onPick={(v) => set("spend", v)} /></fieldset>
          <fieldset className="grid gap-3"><legend className="mb-2 text-base font-bold">When are you looking to scale?</legend><Choice options={TIMELINE} value={s.timeline} onPick={(v) => set("timeline", v)} /></fieldset>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-5">
          <label className="grid gap-2 text-base font-bold">Bringing a business partner? (name — optional)<input className="field" value={s.guest} onChange={(e) => set("guest", e.target.value)} /></label>
          <label className="grid gap-2 text-base font-bold">What&apos;s your biggest acquisition challenge right now? (optional)<textarea className="field min-h-[96px]" value={s.challenge} onChange={(e) => set("challenge", e.target.value)} /></label>
          <label className="flex items-start gap-3 text-base"><input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-blue" checked={s.consentSms} onChange={(e) => set("consentSms", e.target.checked)} /><span>Text me about this event (confirmation, reminders, details) from Sundae. Message frequency varies; msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of attending.</span></label>
          <label className="flex items-start gap-3 text-base"><input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-blue" checked={s.consentEmail} onChange={(e) => set("consentEmail", e.target.checked)} /><span>Email me about future Sundae operator dinners and Sundae Membership. Unsubscribe anytime.</span></label>
          <p className="text-base">By requesting a seat you agree to Sundae&apos;s <a className="link" href="https://sundae.com/terms-of-service/" target="_blank" rel="noopener">Terms</a> and <a className="link" href="https://sundae.com/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a>.</p>
        </div>
      )}

      {err && <p className="mt-6 rounded-lg border-l-4 border-red bg-pink px-4 py-3 text-base text-ink" role="alert">{err}</p>}
      {/* phones: the row wraps instead of widening the card; the primary button takes the rest of the row */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? <button type="button" className="btn btn-secondary max-sm:px-4" onClick={() => setStep(step - 1)}>← Back</button> : <span className="text-base max-sm:basis-full">Takes about 60 seconds.</span>}
        <button type="submit" className="btn btn-primary max-sm:grow max-sm:px-4" disabled={!valid[step] || busy}>
          {step < 2 ? "Continue →" : busy ? "Sending…" : "Request my seat →"}
        </button>
      </div>
    </form>
  );
}
