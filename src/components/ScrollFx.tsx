"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// One place for all scroll choreography: smooth scrolling (Lenis) + data-attribute driven
// GSAP effects. Everything is skipped under prefers-reduced-motion — content stays visible.
export default function ScrollFx() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);
    let lenis: Lenis | null = null;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.09 });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }
    // in-page anchors through Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href")!);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.4 });
      else (el as HTMLElement).scrollIntoView({ behavior: "auto" });
    };
    document.addEventListener("click", onClick);

    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const kind = el.dataset.reveal;
        const from = kind === "left" ? { x: -48, opacity: 0 } : kind === "right" ? { x: 48, opacity: 0 } : kind === "scale" ? { scale: 0.94, opacity: 0 } : { y: 44, opacity: 0 };
        gsap.fromTo(el, from, { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.05, ease: "power3.out", delay: Number(el.dataset.delay || 0), scrollTrigger: { trigger: el, start: "top 86%" } });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((wrap) => {
        gsap.fromTo(wrap.children, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: wrap, start: "top 82%" } });
      });
      gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) => {
        const spans = el.querySelectorAll(":scope > span > span");
        gsap.fromTo(spans, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = Number(el.dataset.parallax || 12);
        gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: el.parentElement!, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const n = Number(el.dataset.count), pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
        const o = { v: 0 };
        gsap.to(o, { v: n, duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" }, onUpdate: () => { el.textContent = pre + Math.round(o.v).toLocaleString("en-US") + suf; } });
      });
      gsap.utils.toArray<HTMLElement>("[data-grow]").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      // membership: pinned sequence that lights up each engine pillar in turn (desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const sec = document.querySelector<HTMLElement>("section[data-engine]"); // three.js also stamps data-engine on its canvas
        if (!sec) return;
        const cards = sec.querySelectorAll<HTMLElement>("[data-engine-card]");
        const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: "top top", end: "+=" + cards.length * 520, pin: true, scrub: 0.6 } });
        cards.forEach((c, i) => {
          // only the next card waits peeking under the active one; later cards (higher z-index) stay
          // hidden until their turn, so the preview is always in order
          if (i > 1) tl.fromTo(c, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12, immediateRender: true });
          if (i > 0) tl.fromTo(c, { yPercent: 105 }, { yPercent: 0, duration: 1, ease: "power2.out" });
          // progress pills: slate when waiting, Sundae red for the card on screen
          tl.to(sec.querySelectorAll(`[data-engine-dot]`), { backgroundColor: "#c9d2e0", duration: 0.2 }, "<").to(sec.querySelector(`[data-engine-dot="${i}"]`), { backgroundColor: "#db3d55", duration: 0.2 }, "<");
        });
      });
    });
    // mobile sticky CTA: hide it while the RSVP section is on screen so it never covers the form's buttons
    const cta = document.querySelector<HTMLElement>("[data-sticky-cta]");
    const rsvp = document.getElementById("rsvp");
    const io = cta && rsvp ? new IntersectionObserver(([e]) => cta.setAttribute("data-hidden", String(e.isIntersecting))) : null;
    if (io && rsvp) io.observe(rsvp);
    const nav = document.querySelector<HTMLElement>("[data-nav]");
    const onScroll = () => nav?.setAttribute("data-solid", String(window.scrollY > 40));
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => { ctx.revert(); io?.disconnect(); lenis?.destroy(); document.removeEventListener("click", onClick); window.removeEventListener("scroll", onScroll); };
  }, []);
  return null;
}
