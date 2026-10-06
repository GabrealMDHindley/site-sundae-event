"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const StringLights = dynamic(() => import("./three/StringLights"), { ssr: false, loading: () => null });

// AI-animated B-roll made from Shade Hotel's own Courtyard photo (poster = the real frame).
// Shown as a clean framed photo: no dark wash over the footage; text lives in white boxes beside or over it.
export default function HeroMedia() {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setSrc(window.innerWidth < 768 ? "/media/courtyard-hero-vertical.mp4" : "/media/courtyard-hero.mp4");
  }, []);
  return (
    <div className="absolute inset-0" aria-hidden>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/media/courtyard-hero-poster.jpg)" }} />
      {src && (
        <video className="absolute inset-0 h-full w-full object-cover" src={src} poster="/media/courtyard-hero-poster.jpg" autoPlay muted loop playsInline preload="auto" />
      )}
    </div>
  );
}

// The Courtyard's bistro string lights, recolored into the Sundae palette and hung across the white hero.
export function HeroLights({ className = "" }: { className?: string }) {
  const [webgl, setWebgl] = useState(false);
  useEffect(() => {
    try { const c = document.createElement("canvas"); setWebgl(!!(c.getContext("webgl2") || c.getContext("webgl"))); } catch { setWebgl(false); }
  }, []);
  return <div className={`pointer-events-none ${className}`} aria-hidden>{webgl && <StringLights />}</div>;
}
