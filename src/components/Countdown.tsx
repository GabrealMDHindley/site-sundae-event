"use client";
import { useEffect, useState } from "react";
import { EVENT } from "@/content/event";

export default function Countdown() {
  const target = new Date(EVENT.startISO).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  if (now === null) return <div className="h-[86px]" />;
  const diff = Math.max(0, target - now);
  if (diff === 0) return <p className="display text-2xl text-gold">Tonight in the Courtyard</p>;
  const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
  const cells: [number, string][] = [[d, "Days"], [h, "Hours"], [m, "Min"], [s, "Sec"]];
  return (
    <div className="flex gap-2" role="timer" aria-label={`${d} days ${h} hours until the dinner`}>
      {cells.map(([v, l]) => (
        <div key={l} className="min-w-[64px] rounded-xl border border-white/15 bg-ink/60 px-3 py-2 text-center backdrop-blur">
          <div className="display text-3xl tabular-nums">{String(v).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase tracking-[.2em] text-muted">{l}</div>
        </div>
      ))}
    </div>
  );
}
