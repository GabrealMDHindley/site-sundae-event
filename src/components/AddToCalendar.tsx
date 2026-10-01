"use client";
import { EVENT } from "@/content/event";

const fmt = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export default function AddToCalendar({ className = "" }: { className?: string }) {
  const g = new URL("https://calendar.google.com/calendar/render");
  g.searchParams.set("action", "TEMPLATE");
  g.searchParams.set("text", "Sundae — Private Dinner & Dialogue with Josh Stech");
  g.searchParams.set("dates", `${fmt(EVENT.startISO)}/${fmt(EVENT.endISO)}`);
  g.searchParams.set("location", `${EVENT.venue}, ${EVENT.address}`);
  g.searchParams.set("details", "Private dinner for LA real estate operators. Seats are confirmed by the Sundae team.");
  const ics = () => {
    const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Sundae//Dinner//EN", "BEGIN:VEVENT", `UID:sundae-la-1008@sundae.com`, `DTSTAMP:${fmt(new Date().toISOString())}`,
      `DTSTART:${fmt(EVENT.startISO)}`, `DTEND:${fmt(EVENT.endISO)}`, "SUMMARY:Sundae — Private Dinner & Dialogue with Josh Stech",
      `LOCATION:${EVENT.venue}\\, ${EVENT.address.replace(/,/g, "\\,")}`, "DESCRIPTION:Private dinner for LA real estate operators.", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([body], { type: "text/calendar" }));
    const a = document.createElement("a"); a.href = url; a.download = "sundae-dinner-oct-8.ics"; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a className="btn btn-ghost" href={g.toString()} target="_blank" rel="noopener">Add to Google Calendar</a>
      <button type="button" className="btn btn-ghost" onClick={ics}>Download .ics</button>
    </div>
  );
}
