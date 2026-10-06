import Image from "next/image";
import ScrollFx from "@/components/ScrollFx";
import HeroMedia, { HeroLights } from "@/components/HeroMedia";
import Countdown from "@/components/Countdown";
import RsvpForm from "@/components/RsvpForm";
import AddToCalendar from "@/components/AddToCalendar";
import { AGENDA, TIMING, BRING, DISCLAIMER, ENGINE, EVENT, FAQ, FIT, JOSH, STEPS, SUNDAE_FACTS, WHO, WHY } from "@/content/event";

// Splits a headline into per-line spans for the GSAP line reveal. The accent line gets the
// brand's pink highlight under the text (never red text).
function Lines({ lines, className = "", accent }: { lines: string[]; className?: string; accent?: number }) {
  return (
    <span data-lines className={`block ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="-mb-[.14em] block overflow-hidden pb-[.14em]"><span className={`inline-block ${i === accent ? "hl" : ""}`}>{l}</span></span>
      ))}
    </span>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full bg-red ${className}`} aria-hidden>
      <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
    </span>
  );
}

const PRESS = [["drphil.svg", "Dr. Phil"], ["cnn.svg", "CNN"], ["fox.png", "Fox"], ["forbes.svg", "Forbes"], ["nbc.png", "NBC"], ["yahoo.svg", "Yahoo"]];

export default function Page() {
  return (
    <>
      <ScrollFx />
      {/* NAV */}
      <header data-nav className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-white transition-[border-color,box-shadow] duration-500 data-[solid=true]:border-gray data-[solid=true]:shadow-[0_8px_24px_-20px_rgba(74,74,74,.45)]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 md:px-8 md:py-4" aria-label="Main">
          <a href="#top" className="flex items-center py-2.5 pr-3" aria-label="Sundae — back to top">
            <Image src="/brand/sundae-wordmark-red.svg" alt="Sundae" width={99} height={28} priority className="h-[26px] w-auto md:h-[28px]" />
          </a>
          <div className="hidden items-center gap-8 text-base lg:flex">
            <a href="#evening" className="hover:text-blue">The evening</a>
            <a href="#host" className="hover:text-blue">Your host</a>
            <a href="#membership" className="hover:text-blue">Sundae Membership</a>
            <a href="#venue" className="hover:text-blue">Venue</a>
            <a href="#faq" className="hover:text-blue">FAQ</a>
          </div>
          <a href="#rsvp" className="btn btn-primary !px-5 !py-3 !text-base">Request your seat</a>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden bg-white" aria-labelledby="hero-title">
          <HeroLights className="absolute inset-x-0 top-[70px] h-[150px] md:top-[78px] md:h-[190px]" />
          <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-[200px] md:px-8 md:pb-24 md:pt-[250px]">
            <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
              <div>
                <p className="eyebrow"><span className="whitespace-nowrap">Sundae presents ·</span> <span className="whitespace-nowrap">Thursday, Oct. 8 ·</span> <span className="whitespace-nowrap">Manhattan Beach</span></p>
                <h1 id="hero-title" className="display bar mt-6 text-[clamp(2.6rem,5.4vw,4.75rem)]">
                  <Lines lines={["Private Dinner", "& Dialogue"]} />
                </h1>
                <p className="mt-5 text-[clamp(1.3rem,2vw,1.6rem)] leading-snug">for Los Angeles real estate operators</p>
                <p className="mt-5 max-w-xl text-lg leading-relaxed md:text-xl md:leading-relaxed">
                  Join Sundae co-founder and CEO <strong className="font-bold">Josh Stech</strong> and fellow LA-area investors for dinner and an honest conversation about building a stronger acquisition business in a harder market.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#rsvp" className="btn btn-primary">Request your seat →</a>
                  <a href="#evening" className="btn btn-secondary">See the evening</a>
                </div>
                <div className="mt-10 border-t border-gray pt-6">
                  <Countdown />
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-mist sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[1/1]">
                  <HeroMedia />
                </div>
                <p className="absolute -left-2 -top-5 -rotate-[4deg] rounded-[4px] bg-red px-4 py-2 text-[1.5rem] font-black leading-tight text-white shadow-[0_10px_24px_-14px_rgba(74,74,74,.6)] md:-left-5">Thursday, Oct. 8</p>
                <div className="absolute bottom-4 left-4 right-4 grid gap-2 sm:right-auto sm:max-w-[30rem] md:bottom-6 md:left-6 lg:max-w-[min(30rem,calc(100%-3rem))]">
                  <p className="w-fit rounded-[4px] bg-white px-3.5 py-2 text-lg font-bold leading-snug shadow-sm">{EVENT.timeLabel} · <span className="min-[360px]:whitespace-nowrap">{EVENT.venue}</span></p>
                  <p className="w-fit rounded-[4px] bg-white px-3.5 py-2 text-base font-bold leading-snug shadow-sm">{EVENT.address.split(", ")[0]}, <span className="min-[360px]:whitespace-nowrap">{EVENT.address.split(", ").slice(1).join(", ")}</span></p>
                  <p className="w-fit rounded-[4px] bg-white px-3.5 py-2 text-base font-bold leading-snug shadow-sm">Dinner and drinks served</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="overflow-hidden border-y border-gray bg-mist py-5" aria-hidden>
          <div className="marquee">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center gap-10 pr-10">
                {["Market trends", "Where the industry is heading", "A stronger acquisition business", "Dinner and drinks", "The Courtyard at Shade", "Thursday, Oct. 8 · 7 p.m.", "Seats limited"].map((t) => (
                  <span key={t} className="display flex items-center gap-10 whitespace-nowrap text-[1.4rem]">{t}<span className="h-2.5 w-2.5 rounded-full bg-red" /></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* THE EVENING */}
        <section id="evening" className="relative bg-white py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
            <div>
              <p className="eyebrow" data-reveal>The evening</p>
              <h2 className="display bar mt-5 text-[clamp(2.25rem,4.6vw,4rem)]"><Lines lines={["An honest", "conversation,", "over dinner."]} accent={2} /></h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed md:text-xl md:leading-relaxed" data-reveal>
                After a great dinner with Sacramento investors at Echo &amp; Rig, Sundae is bringing the conversation to Manhattan Beach. Seats are limited to keep it meaningful and interactive.
              </p>
              <ol className="mt-12 grid gap-0 border-t border-gray" data-stagger>
                {AGENDA.map((a, i) => (
                  <li key={a.k} className="grid grid-cols-[3.25rem_1fr] gap-4 border-b border-gray py-6">
                    <span className="display-b text-2xl">0{i + 1}</span>
                    <div><h3 className="display-b text-[1.6rem] md:text-[1.75rem]">{a.k}</h3><p className="mt-2 text-lg">{a.v}</p></div>
                  </li>
                ))}
              </ol>
              <div className="mt-12 rounded-xl bg-mist p-6 md:p-8" data-reveal>
                <p className="eyebrow">The timing · Thursday, Oct. 8</p>
                <dl className="mt-6 grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 text-lg">
                  {TIMING.map(([t, v]) => (
                    <div key={t} className="contents"><dt className="w-fit rounded-[4px] bg-blue px-3 py-1.5 text-lg font-bold leading-tight text-white">{t}</dt><dd className="text-lg md:text-xl">{v}</dd></div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="relative">
              <div className="sticky top-28">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl" data-reveal="scale">
                  <div className="absolute inset-[-12%]" data-parallax="8">
                    <Image src="/media/courtyard-table-night.jpg" alt="Candlelit dinner table under string lights in the Courtyard at Shade Hotel, Manhattan Beach" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 overflow-hidden rounded-lg bg-white shadow-[0_18px_40px_-24px_rgba(74,74,74,.6)] md:bottom-5 md:left-5 md:right-5">
                    {([["When", ["Thursday,", "Oct. 8 ·", "7 p.m."]], ["Where", ["The Courtyard at Shade"]], ["Included", ["Dinner and drinks"]], ["Seats", ["Limited ·", "by request"]]] as const).map(([k, v], i) => (
                      <div key={k} className={`p-4 md:p-5 ${i % 2 === 0 ? "border-r border-gray" : ""} ${i < 2 ? "border-b border-gray" : ""}`}><div className="eyebrow">{k}</div><div className="display-b mt-1.5 text-base leading-snug md:text-lg">{v.map((seg, j) => <span key={j}>{j > 0 && " "}<span className={v.length > 1 ? "whitespace-nowrap" : ""}>{seg}</span></span>)}</div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOST */}
        <section id="host" className="relative overflow-hidden bg-mist py-24 md:py-32">
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 mx-auto w-full max-w-md lg:order-1" data-reveal="left">
              <div className="absolute left-1/2 top-[8%] aspect-square w-[88%] -translate-x-1/2 rounded-full bg-slate" aria-hidden />
              <div className="dots absolute -right-2 top-0 h-[104px] w-[104px] md:-right-6" aria-hidden />
              <div className="absolute -left-3 bottom-28 h-24 w-24 rounded-[4px] rounded-tr-[2.5rem] bg-red md:-left-8" aria-hidden />
              <Image src="/media/josh-stech.png" alt="Josh Stech, co-founder and CEO of Sundae" width={430} height={570} className="relative z-10 mx-auto h-auto w-full" />
              <div className="absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-mist" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="eyebrow" data-reveal>Your host</p>
              <h2 className="display bar mt-5 text-[clamp(2.75rem,6vw,5rem)]"><Lines lines={["Josh", "Stech"]} /></h2>
              <p className="mt-4 text-[1.4rem] leading-snug md:text-2xl" data-reveal>Co-founder and CEO of Sundae</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed md:text-xl md:leading-relaxed" data-reveal>{JOSH.bio}</p>
              <div className="mt-10 grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-x-10 lg:grid-cols-1 xl:grid-cols-[auto_1fr]" data-stagger>
                {JOSH.facts.map((f) => (
                  <div key={f.v} className="grid gap-y-2 border-t-[3px] border-red pt-4 sm:col-span-2 sm:grid-cols-subgrid sm:items-baseline lg:col-span-1 lg:grid-cols-1 xl:col-span-2 xl:grid-cols-subgrid"><div className="display whitespace-nowrap text-[2.1rem] font-black leading-tight">{f.v}</div><p className="text-lg leading-relaxed">{f.k}</p></div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative mx-auto mt-20 max-w-7xl px-4 md:px-8">
            <div className="card grid items-stretch overflow-hidden md:grid-cols-[1.1fr_1fr]" data-reveal>
              <div className="relative aspect-square md:aspect-auto md:h-full md:min-h-[400px]">
                <Image src="/media/sacramento-dinner.jpg" alt="Josh Stech presenting 'Today's Outlook' to investors at Sundae's Sacramento dinner at Echo & Rig" fill sizes="(max-width:768px) 100vw, 55vw" className="object-cover" />
              </div>
              <div className="self-center p-6 sm:p-7 md:p-12">
                <p className="eyebrow">Last stop: Sacramento</p>
                <h3 className="display mt-4 text-[2.25rem] md:text-[3rem]">&ldquo;Today&apos;s Outlook&rdquo;</h3>
                <p className="mt-5 text-lg leading-relaxed">At Echo &amp; Rig in Sacramento, Josh walked investors through the market data shaping acquisitions right now — then opened the floor. Manhattan Beach gets the LA edition.</p>
                <a href="#rsvp" className="btn btn-primary mt-8 max-sm:w-full max-sm:whitespace-normal max-sm:px-4 max-sm:text-center">Save a seat for the LA edition →</a>
              </div>
            </div>
          </div>
        </section>

        {/* WHO */}
        <section className="bg-white py-24 md:py-32" aria-labelledby="who-title">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="who-title" className="display bar text-[clamp(2.25rem,4.6vw,4rem)]"><Lines lines={["Who this dinner", "is for"]} accent={1} /></h2>
              <p className="max-w-md text-lg leading-relaxed" data-reveal>Every request is reviewed so the room is full of people you&apos;ll want to know.</p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
              {WHO.map(([t, d]) => (
                <div key={t} className="card p-7 transition-transform duration-500 hover:-translate-y-1">
                  <Check className="h-11 w-11" />
                  <h3 className="display-b mt-6 text-[1.5rem]">{t}</h3>
                  <p className="mt-2 text-lg">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SUNDAE — the page's one blue feature band */}
        <section className="relative overflow-hidden bg-blue py-24 text-white md:py-32" aria-labelledby="sundae-title">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <div>
                <p className="eyebrow" data-reveal>About Sundae</p>
                <h2 id="sundae-title" className="display bar bar-white mt-5 text-[clamp(2.1rem,3.9vw,3.5rem)]"><Lines lines={["When investors", "compete,", "homeowners win."]} /></h2>
                <p className="mt-7 max-w-xl text-lg leading-relaxed md:text-xl md:leading-relaxed" data-reveal>
                  Sundae is the marketplace connecting home sellers with a large network of local investors. Homeowners sell as-is with zero fees to Sundae; investors get off-market opportunities they can&apos;t find anywhere else. Sundae does the work of finding sellers — TV, radio, search and direct mail — so operators don&apos;t have to.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" data-stagger>
                {SUNDAE_FACTS.map((f) => (
                  <div key={f.k} className="rounded-xl bg-white p-6 text-ink md:p-8 lg:p-6 xl:p-8">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      {f.pre && <><span className="text-lg font-bold">{f.pre}</span>{" "}</>}
                      <span className="display text-[clamp(2.4rem,4.4vw,3.6rem)] font-black leading-none lg:text-[clamp(2.25rem,calc(6.2vw-1.6rem),3.4rem)]" data-count={f.n} data-prefix={f.prefix || ""} data-suffix={f.suffix || ""}>{f.v}</span>
                      {f.unit && <>{" "}<span className="text-lg font-bold">{f.unit}</span></>}
                    </div>
                    <div className="mt-4 h-[4px] w-12 bg-red" data-grow />
                    <p className="mt-3 text-lg leading-relaxed">{f.k}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-white/40 pt-10" data-reveal>
              <span className="eyebrow">As seen on</span>
              {PRESS.map(([f, n]) => (
                <Image key={f} src={`/press/${f}`} alt={n} width={110} height={36} className={`${f === "drphil.svg" ? "h-10" : "h-7"} w-auto [filter:brightness(0)_invert(1)]`} />
              ))}
            </div>
          </div>
        </section>

        {/* MEMBERSHIP — pinned engine */}
        <section id="membership" data-engine className="relative overflow-hidden bg-white lg:h-screen" aria-labelledby="mem-title">
          <div className="relative mx-auto grid h-full max-w-7xl gap-12 px-4 py-24 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16 lg:py-0 lg:pt-16">
            <div>
              <p className="eyebrow">Sundae Membership</p>
              <h2 id="mem-title" className="display bar mt-5 text-[clamp(2.5rem,5vw,4.5rem)]">Stop building.<br /><span className="mt-3 inline-block rounded-[4px] bg-red px-3 pb-1.5 font-bold text-white">Start scaling.</span></h2>
              <p className="mt-6 text-[1.4rem] leading-snug md:text-2xl">Add a zero to your real estate business.</p>
              <p className="mt-5 max-w-lg text-lg leading-relaxed">Led by co-founder and CEO Josh Stech, Sundae Membership helps experienced real estate operators leverage a proven system purpose-built for acquisition, conversion and maximizing profit.</p>
              <div className="mt-8 hidden gap-3 lg:flex" data-engine-dots aria-hidden>
                {ENGINE.map((_, i) => <span key={i} data-engine-dot={i} className={`h-2 w-16 rounded-full ${i === 0 ? "bg-red" : "bg-slate"}`} />)}
              </div>
            </div>
            <div className="relative grid gap-5 lg:block lg:h-[580px]">
              {ENGINE.map((e, i) => (
                <article key={e.t} data-engine-card className="card overflow-hidden lg:absolute lg:inset-0" style={{ zIndex: i + 1 }}>
                  <div className="relative h-56 border-b border-gray bg-mist lg:h-[330px]">
                    <Image src={e.img} alt={`${e.t} — Sundae Membership`} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-contain p-4" />
                  </div>
                  <div className="p-7 md:p-9">
                    <p className="eyebrow">The Sundae Engine · 0{i + 1}</p>
                    <h3 className="display-b mt-3 text-[2rem] md:text-[2.4rem]">{e.t}</h3>
                    <p className="mt-3 max-w-lg text-lg">{e.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-mist py-24 md:py-32" aria-labelledby="together-title">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <p className="eyebrow" data-reveal>Better together</p>
            <h2 id="together-title" className="display bar mt-5 max-w-4xl text-[clamp(1.5rem,calc(8.8vw-0.3rem),2.6rem)] sm:text-[clamp(2.1rem,4.2vw,3.75rem)]"><Lines lines={["You know your market.", "We bring the systems", "to help you scale it."]} accent={2} /></h2>
            <div className="mt-14 grid gap-5 md:grid-cols-3" data-stagger>
              {([["You bring", BRING.you, "card"], ["Sundae brings", BRING.sundae, "card"], ["Together", BRING.together, "rounded-xl bg-blue text-white"]] as const).map(([h, items, c]) => (
                <div key={h} className={`relative overflow-hidden p-8 ${c}`}>
                  {h === "Sundae brings" && <span className="absolute inset-x-0 top-0 h-1 bg-red" aria-hidden />}
                  <p className="eyebrow">{h}</p>
                  <ul className="mt-6 grid gap-3">{items.map((x) => <li key={x} className={`display border-b pb-3 text-[1.6rem] ${h === "Together" ? "border-white/40" : "border-gray"}`}>{x}</li>)}</ul>
                </div>
              ))}
            </div>

            <div className="mt-24 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
              <div>
                <p className="eyebrow" data-reveal>Why operators choose Sundae</p>
                <h3 className="display mt-5 text-[clamp(2rem,3.6vw,3.1rem)]"><Lines lines={["A national brand", "behind your", "local business."]} accent={2} /></h3>
                <p className="mt-6 max-w-md text-lg leading-relaxed" data-reveal>Sundae&apos;s brand is built on doing right by homeowners — a different reputation than most off-market buyers. Members operate with that trust behind them.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2" data-stagger>
                {WHY.map((w, i) => (
                  <div key={w.t} className={`card p-7 ${i === WHY.length - 1 ? "sm:col-span-2" : ""}`}>
                    <h4 className="display-b text-[1.35rem]">{w.t}</h4><p className="mt-2 text-lg leading-relaxed">{w.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-24 grid gap-6 lg:grid-cols-2">
              <div className="card flex flex-col p-8 md:p-10" data-reveal="left">
                <p className="eyebrow">Is Sundae Membership right for you?</p>
                <ul className="mt-4 grid flex-1 divide-y divide-gray lg:auto-rows-fr">
                  {FIT.map((f) => (
                    <li key={f} className="flex items-center gap-3.5 py-4 text-lg"><Check className="h-7 w-7" />{f}</li>
                  ))}
                </ul>
              </div>
              <div className="card p-8 md:p-10" data-reveal="right">
                <p className="eyebrow">How membership works</p>
                <ol className="mt-7 grid gap-6">
                  {STEPS.map((s, i) => (
                    <li key={s.t} className="grid grid-cols-[3rem_1fr] gap-4">
                      <span className="display-b grid h-12 w-12 place-items-center rounded-full bg-blue text-[1.35rem] text-white">{i + 1}</span>
                      <div><h4 className="display-b text-[1.35rem]">{s.t}</h4><p className="mt-1 text-lg">{s.d}</p></div>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 border-t border-gray pt-6 text-lg">Territories are limited. Start the conversation at dinner — or <a className="link" href={EVENT.introCallUrl} target="_blank" rel="noopener">schedule an intro call</a>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* VENUE */}
        <section id="venue" className="relative overflow-hidden bg-white py-24 md:py-32" aria-labelledby="venue-title">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <p className="eyebrow" data-reveal>The venue</p>
                <h2 id="venue-title" className="display bar mt-5 text-[clamp(2.25rem,4.6vw,4rem)]"><Lines lines={["The Courtyard", "at Shade Hotel"]} accent={1} /></h2>
              </div>
              <p className="max-w-lg text-lg leading-relaxed md:text-xl md:leading-relaxed" data-reveal>The open-air heart of Shade Manhattan Beach — glowing with soft bistro lighting by night, a living wall at one end, steps from the beach.</p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2" data-stagger>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[520px]">
                <div className="absolute inset-[-10%]" data-parallax="6"><Image src="/media/courtyard-twilight.jpg" alt="The Courtyard at Shade Hotel at twilight, tables under string lights" fill sizes="(max-width:768px) 100vw, 66vw" className="object-cover" /></div>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl md:aspect-auto">
                <Image src="/media/courtyard-long-tables.jpg" alt="Long dinner tables set in the Courtyard in front of the living wall" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl md:aspect-auto">
                <Image src="/media/courtyard-night-peek.jpg" alt="A candlelit dinner in the Courtyard at night, seen through the curtains" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
              </div>
            </div>
            <div className="mt-10 grid gap-8 rounded-xl bg-mist p-6 md:p-8 xl:grid-cols-[1fr_auto] xl:items-center">
              <div className="grid gap-6 sm:grid-cols-[1.45fr_1fr_1fr]">
                <div><p className="eyebrow">Address</p><p className="mt-2 text-lg">{EVENT.address.split(", ")[0]},<br /><span className="whitespace-nowrap">{EVENT.address.split(", ").slice(1).join(", ")}</span></p><a className="link mt-1 inline-block text-lg" href={EVENT.mapsUrl} target="_blank" rel="noopener">Get directions →</a></div>
                <div><p className="eyebrow">Parking</p><p className="mt-2 text-balance text-lg">Valet available at Shade Hotel</p></div>
                <div><p className="eyebrow">Hotel</p><p className="mt-2 text-lg"><a href="tel:+13105464995" className="link whitespace-nowrap">{EVENT.venuePhone}</a></p></div>
              </div>
              <AddToCalendar />
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section id="rsvp" className="relative overflow-hidden bg-mist py-24 md:py-32" aria-labelledby="rsvp-title">
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow" data-reveal>Request your seat</p>
              <h2 id="rsvp-title" className="display bar mt-5 text-[clamp(2.4rem,3.9vw,3.5rem)]"><Lines lines={["Join us in", "the Courtyard."]} accent={1} /></h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed md:text-xl md:leading-relaxed" data-reveal>Seats are limited to keep the conversation meaningful and interactive. Submit your request and our team will follow up with attendance confirmation and event details.</p>
              <dl className="mt-10 grid gap-0 overflow-hidden rounded-xl border border-gray bg-white text-lg" data-reveal>
                <div className="flex justify-between gap-4 border-b border-gray px-5 py-4"><dt className="font-bold">When</dt><dd className="text-right">{EVENT.dateLabel} · {EVENT.timeLabel}</dd></div>
                <div className="flex justify-between gap-4 border-b border-gray px-5 py-4"><dt className="font-bold">Where</dt><dd className="text-right">{EVENT.venue}, Manhattan Beach</dd></div>
                <div className="flex justify-between gap-4 border-b border-gray px-5 py-4"><dt className="font-bold">Host</dt><dd className="text-right">Josh Stech, co-founder and CEO</dd></div>
                <div className="flex justify-between gap-4 px-5 py-4"><dt className="font-bold">Cost</dt><dd className="text-right">Complimentary · dinner and drinks served</dd></div>
              </dl>
            </div>
            <div data-reveal="right" className="min-w-0"><RsvpForm /></div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white py-24 md:py-32" aria-labelledby="faq-title">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <h2 id="faq-title" className="display bar self-start text-[clamp(2.4rem,4.6vw,4rem)]"><Lines lines={["Good", "questions"]} accent={1} /></h2>
            <div className="divide-y divide-gray border-y border-gray">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-bold leading-snug">
                    {f.q}<span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-blue text-2xl font-normal leading-none text-blue transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray bg-mist pb-28 pt-16 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-8 border-b border-gray pb-10">
            <div className="p-3 pl-0"><Image src="/brand/sundae-wordmark-red.svg" alt="Sundae" width={106} height={30} className="h-[30px] w-auto" /></div>
            <div className="flex flex-wrap gap-x-7 gap-y-3 text-base">
              <a href="https://sundae.com/" target="_blank" rel="noopener" className="hover:text-blue hover:underline">sundae.com</a>
              <a href="https://sundae.com/membership/" target="_blank" rel="noopener" className="hover:text-blue hover:underline">Sundae Membership</a>
              <a href="https://marketplace.sundae.com/" target="_blank" rel="noopener" className="hover:text-blue hover:underline">Sundae Marketplace</a>
              <a href="https://www.instagram.com/sundaehq/" target="_blank" rel="noopener" className="hover:text-blue hover:underline">Instagram</a>
              <a href="https://www.facebook.com/SundaeHQ" target="_blank" rel="noopener" className="hover:text-blue hover:underline">Facebook</a>
            </div>
            <a href="#rsvp" className="btn btn-primary">Request your seat</a>
          </div>
          <p className="mt-8 max-w-4xl text-base leading-relaxed">{DISCLAIMER} Venue photography © Shade Hotels. Courtyard motion footage is AI-animated from Shade Hotel&apos;s own photography.</p>
          <p className="mt-3 text-base">© 2026 Sundae, Inc.</p>
        </div>
      </footer>

      {/* mobile sticky CTA */}
      <a href="#rsvp" data-sticky-cta className="btn btn-primary fixed bottom-4 left-4 right-4 z-40 justify-center md:hidden">Request your seat · Oct. 8</a>
    </>
  );
}
