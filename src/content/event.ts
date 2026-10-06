// Every fact here is sourced: sundae.com (membership, leadership, FAQ, disclosures),
// Sundae's October 2026 dinner flyer + LinkedIn post + RSVP Google Form, and Shade Hotel's site.
// See clients/sundae/intake.md in the studio repo.

export const EVENT = {
  name: "Private Dinner & Dialogue",
  audience: "for Los Angeles real estate operators",
  host: "Josh Stech",
  hostTitle: "Co-founder and CEO, Sundae",
  dateLabel: "Thursday, Oct. 8, 2026",
  timeLabel: "7 p.m.",
  startISO: "2026-10-08T19:00:00-07:00",
  endISO: "2026-10-08T21:15:00-07:00",
  venue: "The Courtyard at Shade Hotel",
  address: "1221 N. Valley Drive, Manhattan Beach, CA 90266",
  venuePhone: "310-546-4995",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shade+Hotel+Manhattan+Beach+1221+N+Valley+Dr",
  googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf_Jok7JqPMSwvAwcz7nBbc5SsneB7QCKcuAf6mjHRlvYKPBg/viewform",
  googleFormFields: { name: "entry.1833881284", entity: "entry.1878309074", phone: "entry.2144827569" },
  introCallUrl: "https://calendly.com/vwhite-sundae/connect",
};

export const AGENDA = [
  { k: "Market trends", v: "Josh's read on what the data says about acquisitions in Los Angeles right now." },
  { k: "Where the industry is heading", v: "Lead costs, conversion, dispositions and capital — and what operators are changing." },
  { k: "A stronger acquisition business", v: "How to build one in a harder market, straight from operators in the room." },
  { k: "Great food and drinks", v: "Dinner in the open-air Courtyard at Shade, under the string lights." },
];

// The event itinerary — the timing for the invitation (Sundae, 2026-10-01)
export const TIMING = [
  ["7 p.m.", "Cocktails and Passed Hors d'Oeuvres"],
  ["7:35 p.m.", "Josh's Presentation"],
  ["8 p.m.", "Dinner"],
  ["10:30 p.m. +", "Optional After Party"],
];

export const WHO = [
  ["Wholesalers", "closing deals every month"],
  ["Fix-and-flip operators", "running acquisitions, rehab and resale"],
  ["Acquisition-led investors", "and the team leads who run their pipelines"],
  ["Operators ready to scale", "in the next six to 12 months"],
];

export const JOSH = {
  bio: "Josh Stech is CEO and co-founder of Sundae, a marketplace that connects home sellers directly with property investors. He started Sundae to help homeowners get a better outcome when selling off-market — a business that wins by doing the right thing for the seller.",
  facts: [
    { v: "1,200+", k: "transactions executed as co-founder and CFO of Purpose Built Investments, across three funds buying, renovating and selling houses" },
    { v: "Five years", k: "as founding partner and senior vice president of sales at LendingHome, as it scaled to 350 employees and $150 million in venture funding" },
    { v: "Stanford", k: "B.A. in economics with honors, B.A. in Spanish, M.A. in Latin American studies" },
  ],
};

export const SUNDAE_FACTS = [
  { v: "20,000+", n: 20000, suffix: "+", k: "property investors on the Sundae Marketplace" },
  // AP money: "$100 million+" — the figure counts up, the unit word sits beside it
  { v: "$100", n: 100, prefix: "$", unit: "million+", k: "invested in marketing to reach homeowners since 2018" },
  { v: "8,000+", n: 8000, suffix: "+", k: "sellers the team has helped get offers" },
  { v: "22+", n: 22, suffix: "+", pre: "An average of", k: "offers when a seller lists on the marketplace" },
];

export const ENGINE = [
  { t: "Generate more leads", d: "Build a stronger acquisition engine with proven marketing, smarter targeting and data-driven optimization.", img: "/media/engine-leads.png" },
  { t: "Close more deals", d: "Convert more opportunities through faster response, automated follow-up and proven sales workflows.", img: "/media/engine-close.png" },
  { t: "Maximize profit", d: "Create more value from every opportunity with buyer reach, capital solutions and shared operating expertise.", img: "/media/engine-marketplace.png" },
];

export const BRING = {
  you: ["Local expertise", "Relationships", "Leadership", "Execution"],
  sundae: ["Marketing", "Technology", "Automation", "Capital", "Buyer reach"],
  together: ["More deals", "Better conversion", "Higher profit", "Less complexity"],
};

export const WHY = [
  { t: "$100 million+ in marketing investment", d: "Reaching homeowners since 2018." },
  { t: "National brand", d: "Built to earn homeowner trust — as seen on Dr. Phil, Fox, NBC and more." },
  { t: "End-to-end technology", d: "Purpose-built systems from lead to transaction." },
  { t: "Capital and buyer reach", d: "More ways to maximize every opportunity, including 20,000+ marketplace investors." },
  { t: "Operator community", d: "Shared expertise and ongoing optimization with operators in other markets." },
];

export const FIT = [
  "Proven real estate operating experience",
  "Ready to scale without building every system yourself",
  "Focused on long-term business growth",
  "Committed to continuous improvement",
  "Value collaboration and shared learning",
  "Capacity to convert new opportunities into profitable deals",
];

export const STEPS = [
  { t: "Start with a conversation", d: "Tell us about your business, market, operating history and growth goals." },
  { t: "Confirm mutual fit", d: "We'll evaluate qualifications, territory availability and where Sundae can create the most leverage." },
  { t: "Build your growth plan", d: "Align on the systems, support and priorities that will help you acquire, convert and maximize more effectively." },
];

export const FAQ = [
  { q: "What does it cost to attend?", a: "Nothing. Dinner and drinks are on Sundae. Seats are limited to keep the conversation meaningful, so every request is reviewed and confirmed by our team." },
  { q: "Who should request a seat?", a: "Active Los Angeles-area operators — wholesalers, fix-and-flip operators, acquisition-led investors and team leads. If you're newer to investing, request a seat anyway and we'll make sure you're on the list for the right event." },
  { q: "Is this a sales presentation?", a: "It's a dinner and a dialogue: Josh's market outlook and an open conversation between operators. If you want to learn more about Sundae Membership afterward, you can book a one-on-one conversation with our team — no pressure, no contracts at the event." },
  { q: "Can I bring a business partner?", a: "Yes — note their name in your request. Each guest is confirmed individually so we can plan the tables." },
  { q: "Where do I park?", a: "Shade Hotel offers valet parking. Ask the front desk to point you to the Courtyard — it's the open-air heart of the hotel." },
  { q: "What is Sundae Membership?", a: "A program for experienced real estate operators that pairs your local expertise with Sundae's marketing, technology, automation, capital and buyer reach. Territories are limited; availability is discussed one-on-one." },
  { q: "Will the evening be photographed?", a: "Yes, the dinner will be photographed and filmed for Sundae. If you'd prefer not to appear, just let us know at check-in." },
];

export const DISCLAIMER =
  "This page is not an offer to sell a franchise or business opportunity. Any such offer is made only by a Franchise Disclosure Document where required by law. No earnings or financial-performance representations are made. Sundae Funding, Inc. dba Sundae · CA DRE #02088298.";
