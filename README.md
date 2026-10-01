# site-sundae-event

One-page RSVP funnel for **Sundae's Private Dinner & Dialogue** with Josh Stech —
Thursday, Oct 8, 2026, 6 PM, The Courtyard at Shade Hotel, Manhattan Beach.

- Next.js 16 (App Router) · Tailwind v4 · React Three Fiber (3D string lights) · GSAP ScrollTrigger + Lenis
- Content: `src/content/event.ts` (every fact sourced from sundae.com, Sundae's flyer/RSVP form, Shade Hotel)
- RSVP: `src/app/api/rsvp/route.ts`
  - Set **`RSVP_WEBHOOK_URL`** in Vercel (GoHighLevel / SHAI inbound webhook) → every RSVP posts there as JSON
    with a fit score (`fit: A|B|C`) and tags (`evt:la-1008`, `fit:*`, `src:*`).
  - Not set → the guest is handed to Sundae's existing Google Form with name/company/phone pre-filled.
- `robots: noindex` while in review — remove in `src/app/layout.tsx` to go public.

Built by the Universal Business Studio (clients/sundae).
