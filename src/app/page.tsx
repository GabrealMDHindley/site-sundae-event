import Image from "next/image";
import ScrollFx from "@/components/ScrollFx";
import HeroMedia from "@/components/HeroMedia";
import Countdown from "@/components/Countdown";
import RsvpForm from "@/components/RsvpForm";
import AddToCalendar from "@/components/AddToCalendar";
import { AGENDA, TIMING, BRING, DISCLAIMER, ENGINE, EVENT, FAQ, FIT, JOSH, STEPS, SUNDAE_FACTS, WHO, WHY } from "@/content/event";

function Lines({ lines, className = "", accent }: { lines: string[]; className?: string; accent?: number }) {
  return (
    <span data-lines className={`block ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[.04em]"><span className={`inline-block ${i === accent ? "text-red" : ""}`}>{l}</span></span>
      ))}
    </span>
  );
}

const PRESS = [["drphil.svg", "Dr. Phil"], ["cnn.svg", "CNN"], ["fox.png", "Fox"], ["forbes.svg", "Forbes"], ["nbc.png", "NBC"], ["yahoo.svg", "Yahoo"]];

export default function Page() {
  return (
    <>
      <ScrollFx />
      {/* NAV */}
      <header data-nav className="fixed inset-x-0 top-0 z-50 transition-colors duration-500 data-[solid=true]:bg-ink/80 data-[solid=true]:backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8" aria-label="Main">
          <a href="#top" className="flex items-center gap-3" aria-label="Sundae — back to top">
            <Image src="/brand/sundae-wordmark-white.svg" alt="Sundae" width={110} height={31} priority />
          </a>
          <div className="hidden items-center gap-8 text-sm text-muted lg:flex">
            <a href="#evening" className="hover:text-cream">The evening</a>
            <a href="#host" className="hover:text-cream">Your host</a>
            <a href="#membership" className="hover:text-cream">Sundae Membership</a>
            <a href="#venue" className="hover:text-cream">Venue</a>
            <a href="#faq" className="hover:text-cream">FAQ</a>
          </div>
          <a href="#rsvp" className="btn btn-red !px-5 !py-3 text-sm">Request your seat</a>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="grain relative flex min-h-[100svh] items-end overflow-hidden" aria-labelledby="hero-title">
          <HeroMedia />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-32 md:px-8 md:pb-20">
            <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="kicker">Sundae presents · Thursday, October 8 · Manhattan Beach</p>
                <h1 id="hero-title" className="display mt-5 text-[clamp(3.2rem,8.2vw,7.6rem)]">
                  <Lines lines={["Private Dinner", "& Dialogue"]} accent={1} />
                </h1>
                <p className="serif-i mt-4 text-[clamp(1.35rem,2.6vw,2.2rem)] text-gold-soft">for Los Angeles real estate operators</p>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                  Join Sundae Co-Founder &amp; CEO <strong className="text-cream">Josh Stech</strong> and fellow LA-area investors for dinner and an honest conversation about building a stronger acquisition business in a harder market.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#rsvp" className="btn btn-red">Request your seat →</a>
                  <a href="#evening" className="btn btn-ghost">See the evening</a>
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:items-end">
                <Countdown />
                <div className="text-sm text-muted lg:text-right">
                  <div className="display text-2xl text-cream">{EVENT.timeLabel} · {EVENT.venue}</div>
                  <div>{EVENT.address} · Dinner &amp; drinks served</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="overflow-hidden border-y hairline bg-ink-2 py-5" aria-hidden>
          <div className="marquee">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center gap-10 pr-10">
                {["Market trends", "Where the industry is heading", "A stronger acquisition business", "Dinner & drinks", "The Courtyard at Shade", "Thursday · Oct 8 · 7 PM", "Seats limited"].map((t) => (
                  <span key={t} className="display flex items-center gap-10 text-2xl text-cream/80">{t}<span className="h-2 w-2 rounded-full bg-red" /></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* THE EVENING */}
        <section id="evening" className="relative py-24 md:py-36">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="kicker" data-reveal>The evening</p>
              <h2 className="display mt-4 text-[clamp(2.8rem,6vw,5.6rem)]"><Lines lines={["An honest", "conversation,", "over dinner."]} accent={2} /></h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted" data-reveal>
                After a great dinner with Sacramento investors at Echo &amp; Rig, Sundae is bringing the conversation to Manhattan Beach. Seats are limited to keep it meaningful and interactive.
              </p>
              <ol className="mt-12 grid gap-0 border-t hairline" data-stagger>
                {AGENDA.map((a, i) => (
                  <li key={a.k} className="grid grid-cols-[3.2rem_1fr] gap-4 border-b hairline py-6">
                    <span className="display text-2xl text-gold">0{i + 1}</span>
                    <div><h3 className="display text-3xl">{a.k}</h3><p className="mt-2 text-muted">{a.v}</p></div>
                  </li>
                ))}
              </ol>
              <div className="mt-12" data-reveal>
                <p className="kicker">The timing · Thursday, October 8</p>
                <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-lg">
                  {TIMING.map(([t, v]) => (
                    <div key={t} className="contents"><dt className="display text-2xl text-gold">{t}</dt><dd className="self-center text-cream">{v}</dd></div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="relative">
              <div className="sticky top-28">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]" data-reveal="scale">
                  <div className="absolute inset-[-12%]" data-parallax="8">
                    <Image src="/media/courtyard-table-night.jpg" alt="Candlelit dinner table under string lights in the Courtyard at Shade Hotel, Manhattan Beach" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-px bg-white/10 text-sm">
                    {[["When", "Thu, Oct 8 · 7:00 PM"], ["Where", "The Courtyard at Shade"], ["Included", "Dinner & drinks"], ["Seats", "Limited · by request"]].map(([k, v]) => (
                      <div key={k} className="bg-ink/85 p-4 backdrop-blur"><div className="kicker !text-[.62rem] !text-muted">{k}</div><div className="display mt-1 text-xl">{v}</div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOST */}
        <section id="host" className="relative overflow-hidden bg-ink-2 py-24 md:py-36">
          <div className="pointer-events-none absolute -right-40 top-10 h-[620px] w-[620px] rounded-full bg-red/35 blur-[120px]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
            <div className="relative order-2 mx-auto w-full max-w-md lg:order-1" data-reveal="left">
              <Image src="/media/josh-stech.png" alt="Josh Stech, Co-Founder and CEO of Sundae" width={430} height={570} className="relative z-10 mx-auto h-auto w-full" />
              <div className="absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-ink-2" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="kicker" data-reveal>Your host</p>
              <h2 className="display mt-4 text-[clamp(3.2rem,8vw,7rem)]"><Lines lines={["Josh", "Stech"]} /></h2>
              <p className="serif-i mt-3 text-2xl text-gold-soft" data-reveal>Co-Founder &amp; CEO, Sundae</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted" data-reveal>{JOSH.bio}</p>
              <div className="mt-10 grid gap-6 sm:grid-cols-3" data-stagger>
                {JOSH.facts.map((f) => (
                  <div key={f.v} className="border-t border-red/60 pt-4"><div className="display text-4xl text-gold">{f.v}</div><p className="mt-2 text-sm leading-relaxed text-muted">{f.k}</p></div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative mx-auto mt-20 max-w-7xl px-5 md:px-8">
            <div className="grid items-center gap-8 overflow-hidden rounded-[1.6rem] border hairline bg-ink md:grid-cols-[1.1fr_1fr]" data-reveal>
              <div className="relative aspect-square md:aspect-auto md:h-full md:min-h-[380px]">
                <Image src="/media/sacramento-dinner.jpg" alt="Josh Stech presenting 'Today's Outlook' to investors at Sundae's Sacramento dinner at Echo & Rig" fill sizes="(max-width:768px) 100vw, 55vw" className="object-cover" />
              </div>
              <div className="p-8 md:p-12">
                <p className="kicker">Last stop: Sacramento</p>
                <h3 className="display mt-3 text-5xl">&ldquo;Today&apos;s Outlook&rdquo;</h3>
                <p className="mt-4 text-muted">At Echo &amp; Rig in Sacramento, Josh walked investors through the market data shaping acquisitions right now — then opened the floor. Manhattan Beach gets the LA edition.</p>
                <a href="#rsvp" className="btn btn-red mt-8">Save a seat for the LA edition →</a>
              </div>
            </div>
          </div>
        </section>

        {/* WHO */}
        <section className="py-24 md:py-32" aria-labelledby="who-title">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="who-title" className="display text-[clamp(2.6rem,5.5vw,5rem)]"><Lines lines={["Who this dinner", "is for"]} accent={1} /></h2>
              <p className="max-w-md text-muted" data-reveal>Every request is reviewed so the room is full of people you&apos;ll want to know.</p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
              {WHO.map(([t, d], i) => (
                <div key={t} className="card group relative overflow-hidden p-7 transition-transform duration-500 hover:-translate-y-1">
                  <span className="display absolute -right-2 -top-6 text-[7rem] text-white/[.04]">0{i + 1}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-red/90 text-white" aria-hidden>✓</span>
                  <h3 className="display mt-6 text-3xl">{t}</h3>
                  <p className="mt-2 text-muted">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SUNDAE */}
        <section className="relative overflow-hidden border-y hairline bg-ink-2 py-24 md:py-32" aria-labelledby="sundae-title">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="kicker" data-reveal>About Sundae</p>
                <h2 id="sundae-title" className="display mt-4 text-[clamp(2.6rem,5.5vw,5rem)]"><Lines lines={["When investors", "compete,", "homeowners win."]} accent={2} /></h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted" data-reveal>
                  Sundae is the marketplace connecting home sellers with a large network of local investors. Homeowners sell as-is with zero fees to Sundae; investors get off-market opportunities they can&apos;t find anywhere else. Sundae does the work of finding sellers — TV, radio, search and direct mail — so operators don&apos;t have to.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.4rem] bg-white/10" data-stagger>
                {SUNDAE_FACTS.map((f) => (
                  <div key={f.k} className="bg-ink-2 p-7 md:p-9">
                    <div className="display text-[clamp(2.6rem,5vw,4.2rem)] text-gold" data-count={f.n} data-prefix={f.prefix || ""} data-suffix={f.suffix || ""}>{f.v}</div>
                    <div className="mt-3 h-[3px] w-12 bg-red" data-grow />
                    <p className="mt-3 text-sm leading-relaxed text-muted">{f.k}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-6 border-t hairline pt-10" data-reveal>
              <span className="kicker !text-muted">As seen on</span>
              {PRESS.map(([f, n]) => (
                <Image key={f} src={`/press/${f}`} alt={n} width={110} height={36} className="h-7 w-auto opacity-60 [filter:brightness(0)_invert(1)]" />
              ))}
            </div>
          </div>
        </section>

        {/* MEMBERSHIP — pinned engine */}
        <section id="membership" data-engine className="relative overflow-hidden bg-ink lg:h-screen" aria-labelledby="mem-title">
          <div className="pointer-events-none absolute -left-40 top-1/3 h-[540px] w-[540px] rounded-full bg-red/25 blur-[120px]" />
          <div className="relative mx-auto grid h-full max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:py-0">
            <div>
              <p className="kicker">Sundae Membership</p>
              <h2 id="mem-title" className="display mt-4 text-[clamp(3rem,7vw,6.4rem)]">Stop building.<br /><span className="text-red">Start scaling.</span></h2>
              <p className="serif-i mt-5 text-2xl text-gold-soft">Add a zero to your real estate business.</p>
              <p className="mt-5 max-w-lg text-muted">Led by Co-founder &amp; CEO Josh Stech, Sundae Membership helps experienced real estate operators leverage a proven system purpose-built for acquisition, conversion, and maximizing profit.</p>
              <div className="mt-8 hidden gap-3 lg:flex" aria-hidden>
                {ENGINE.map((_, i) => <span key={i} data-engine-dot={i} className="h-1.5 w-16 rounded-full bg-red opacity-25" />)}
              </div>
            </div>
            <div className="relative grid gap-5 lg:block lg:h-[560px]">
              {ENGINE.map((e, i) => (
                <article key={e.t} data-engine-card className="card overflow-hidden lg:absolute lg:inset-0" style={{ zIndex: i + 1 }}>
                  <div className="relative h-56 bg-[#f6f3ef] lg:h-[330px]">
                    <Image src={e.img} alt={`${e.t} — Sundae Membership`} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-contain p-4" />
                  </div>
                  <div className="p-7 md:p-9">
                    <p className="kicker">The Sundae Engine · 0{i + 1}</p>
                    <h3 className="display mt-3 text-4xl md:text-5xl">{e.t}</h3>
                    <p className="mt-3 max-w-lg text-muted">{e.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-ink py-24 md:py-32" aria-labelledby="together-title">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="kicker" data-reveal>Better together</p>
            <h2 id="together-title" className="display mt-4 max-w-4xl text-[clamp(2.4rem,5vw,4.6rem)]"><Lines lines={["You know your market.", "We bring the systems", "to help you scale it."]} accent={2} /></h2>
            <div className="mt-14 grid gap-4 md:grid-cols-3" data-stagger>
              {[["You bring", BRING.you, "text-gold"], ["Sundae brings", BRING.sundae, "text-red"], ["Together", BRING.together, "text-cream"]].map(([h, items, c]) => (
                <div key={h as string} className="card p-8">
                  <p className={`kicker ${c}`}>{h as string}</p>
                  <ul className="mt-6 grid gap-3">{(items as string[]).map((x) => <li key={x} className="display border-b hairline pb-3 text-3xl">{x}</li>)}</ul>
                </div>
              ))}
            </div>

            <div className="mt-24 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="kicker" data-reveal>Why operators choose Sundae</p>
                <h3 className="display mt-4 text-[clamp(2.2rem,4vw,3.6rem)]"><Lines lines={["A national brand", "behind your", "local business."]} accent={2} /></h3>
                <p className="mt-5 max-w-md text-muted" data-reveal>Sundae&apos;s brand is built on doing right by homeowners — a different reputation than most off-market buyers. Members operate with that trust behind them.</p>
              </div>
              <div className="grid gap-px overflow-hidden rounded-[1.4rem] bg-white/10 sm:grid-cols-2" data-stagger>
                {WHY.map((w, i) => (
                  <div key={w.t} className={`bg-ink-2 p-7 ${i === WHY.length - 1 ? "sm:col-span-2" : ""}`}>
                    <h4 className="display text-2xl">{w.t}</h4><p className="mt-2 text-sm text-muted">{w.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-24 grid gap-6 lg:grid-cols-2">
              <div className="card p-8 md:p-10" data-reveal="left">
                <p className="kicker">Is Sundae Membership right for you?</p>
                <ul className="mt-6 grid gap-4">
                  {FIT.map((f) => (
                    <li key={f} className="flex gap-3 text-lg"><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red text-xs text-white" aria-hidden>✓</span>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="card p-8 md:p-10" data-reveal="right">
                <p className="kicker">How membership works</p>
                <ol className="mt-6 grid gap-6">
                  {STEPS.map((s, i) => (
                    <li key={s.t} className="grid grid-cols-[3rem_1fr] gap-4">
                      <span className="display grid h-12 w-12 place-items-center rounded-full border border-gold/50 text-2xl text-gold">{i + 1}</span>
                      <div><h4 className="display text-2xl">{s.t}</h4><p className="mt-1 text-muted">{s.d}</p></div>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 border-t hairline pt-6 text-sm text-muted">Territories are limited. Start the conversation at dinner — or <a className="text-gold underline underline-offset-4" href={EVENT.introCallUrl} target="_blank" rel="noopener">schedule an intro call</a>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* VENUE */}
        <section id="venue" className="relative overflow-hidden border-t hairline bg-ink-2 py-24 md:py-32" aria-labelledby="venue-title">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <p className="kicker" data-reveal>The venue</p>
                <h2 id="venue-title" className="display mt-4 text-[clamp(2.8rem,6vw,5.6rem)]"><Lines lines={["The Courtyard", "at Shade Hotel"]} accent={1} /></h2>
              </div>
              <p className="max-w-lg text-lg text-muted" data-reveal>The open-air heart of Shade Manhattan Beach — glowing with soft bistro lighting by night, a living wall at one end, steps from the beach.</p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2" data-stagger>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[520px]">
                <div className="absolute inset-[-10%]" data-parallax="6"><Image src="/media/courtyard-twilight.jpg" alt="The Courtyard at Shade Hotel at twilight, tables under string lights" fill sizes="(max-width:768px) 100vw, 66vw" className="object-cover" /></div>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] md:aspect-auto">
                <Image src="/media/courtyard-long-tables.jpg" alt="Long dinner tables set in the Courtyard in front of the living wall" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] md:aspect-auto">
                <Image src="/media/courtyard-night-peek.jpg" alt="A candlelit dinner in the Courtyard at night, seen through the curtains" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div className="grid gap-6 sm:grid-cols-3">
                <div><p className="kicker !text-muted">Address</p><p className="mt-2 text-lg">{EVENT.address}</p><a className="mt-1 inline-block text-sm text-gold underline underline-offset-4" href={EVENT.mapsUrl} target="_blank" rel="noopener">Get directions →</a></div>
                <div><p className="kicker !text-muted">Parking</p><p className="mt-2 text-lg">Valet available at Shade Hotel</p></div>
                <div><p className="kicker !text-muted">Hotel</p><p className="mt-2 text-lg"><a href="tel:+13105464995" className="hover:text-gold">{EVENT.venuePhone}</a></p></div>
              </div>
              <AddToCalendar />
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section id="rsvp" className="relative overflow-hidden py-24 md:py-36" aria-labelledby="rsvp-title">
          <div className="absolute inset-0 opacity-40"><Image src="/media/courtyard-hero-poster.jpg" alt="" fill sizes="100vw" className="object-cover" /></div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/90 to-ink" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="kicker" data-reveal>Request your seat</p>
              <h2 id="rsvp-title" className="display mt-4 text-[clamp(3rem,7vw,6rem)]"><Lines lines={["Join us in", "the Courtyard."]} accent={1} /></h2>
              <p className="mt-6 max-w-md text-lg text-muted" data-reveal>Seats are limited to keep the conversation meaningful and interactive. Submit your request and our team will follow up with attendance confirmation and event details.</p>
              <dl className="mt-10 grid gap-4 border-t hairline pt-8 text-sm" data-reveal>
                <div className="flex justify-between gap-4"><dt className="text-muted">When</dt><dd className="text-right">{EVENT.dateLabel} · {EVENT.timeLabel}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted">Where</dt><dd className="text-right">{EVENT.venue}, Manhattan Beach</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted">Host</dt><dd className="text-right">Josh Stech, Co-Founder &amp; CEO</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted">Cost</dt><dd className="text-right">Complimentary · dinner &amp; drinks served</dd></div>
              </dl>
            </div>
            <div data-reveal="right"><RsvpForm /></div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t hairline bg-ink-2 py-24 md:py-32" aria-labelledby="faq-title">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[.8fr_1.2fr]">
            <h2 id="faq-title" className="display text-[clamp(2.6rem,5vw,4.6rem)]"><Lines lines={["Good", "questions"]} accent={1} /></h2>
            <div className="divide-y divide-white/10 border-y hairline">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-medium">
                    {f.q}<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-gold transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-8 border-b hairline pb-10">
            <Image src="/brand/sundae-wordmark-white.svg" alt="Sundae" width={130} height={37} />
            <div className="flex flex-wrap gap-6 text-sm text-muted">
              <a href="https://sundae.com/" target="_blank" rel="noopener" className="hover:text-cream">sundae.com</a>
              <a href="https://sundae.com/membership/" target="_blank" rel="noopener" className="hover:text-cream">Sundae Membership</a>
              <a href="https://marketplace.sundae.com/" target="_blank" rel="noopener" className="hover:text-cream">Sundae Marketplace</a>
              <a href="https://www.instagram.com/sundaehq/" target="_blank" rel="noopener" className="hover:text-cream">Instagram</a>
              <a href="https://www.facebook.com/SundaeHQ" target="_blank" rel="noopener" className="hover:text-cream">Facebook</a>
            </div>
            <a href="#rsvp" className="btn btn-red">Request your seat</a>
          </div>
          <p className="mt-8 max-w-4xl text-xs leading-relaxed text-dim">{DISCLAIMER} Venue photography © Shade Hotels. Courtyard motion footage is AI-animated from Shade Hotel&apos;s own photography.</p>
          <p className="mt-3 text-xs text-dim">© 2026 Sundae, Inc.</p>
        </div>
      </footer>

      {/* mobile sticky CTA */}
      <a href="#rsvp" className="btn btn-red fixed bottom-4 left-4 right-4 z-40 justify-center md:hidden">Request your seat · Oct 8</a>
    </>
  );
}
