"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const StringLights = dynamic(() => import("./three/StringLights"), { ssr: false, loading: () => null });

// AI-animated B-roll made from Shade Hotel's own Courtyard photo (poster = the real frame).
export default function HeroMedia() {
  const [src, setSrc] = useState<string | null>(null);
  const [webgl, setWebgl] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setSrc(window.innerWidth < 768 ? "/media/courtyard-hero-vertical.mp4" : "/media/courtyard-hero.mp4");
    try { const c = document.createElement("canvas"); setWebgl(!!(c.getContext("webgl2") || c.getContext("webgl"))); } catch { setWebgl(false); }
  }, []);
  return (
    <div className="absolute inset-0" aria-hidden>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/media/courtyard-hero-poster.jpg)" }} />
      {src && (
        <video ref={ref} className="absolute inset-0 h-full w-full object-cover" src={src} poster="/media/courtyard-hero-poster.jpg" autoPlay muted loop playsInline preload="auto" />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(18,13,15,.35),rgba(18,13,15,.9)_75%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/30" />
      {webgl && <StringLights />}
    </div>
  );
}
