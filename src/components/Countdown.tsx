"use client";
import { useEffect, useState } from "react";
import { EVENT } from "@/content/event";

export default function Countdown() {
  const target = new Date(EVENT.startISO).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  if (now === null) return <div className="h-[88px]" />;
  const diff = Math.max(0, target - now);
  if (diff === 0) return <p className="display-b text-2xl text-ink">Tonight in the Courtyard</p>;
  const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
  const cells: [number, string][] = [[d, "Days"], [h, "Hours"], [m, "Minutes"], [s, "Seconds"]];
  return (
    <div className="grid grid-cols-4 gap-2 sm:flex sm:gap-3" role="timer" aria-label={`${d} days ${h} hours until the dinner`}>
      {cells.map(([v, l]) => (
        <div key={l} className="rounded-lg border border-gray bg-white px-2 py-2.5 text-center sm:min-w-[92px] sm:px-3">
          <div className="display-b text-[1.9rem] leading-none tabular-nums text-ink">{String(v).padStart(2, "0")}</div>
          <div className="mt-2 text-base leading-none text-ink">{l}</div>
        </div>
      ))}
    </div>
  );
}
