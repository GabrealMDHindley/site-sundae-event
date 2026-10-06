import type { Metadata, Viewport } from "next";
import { Merriweather, Lato } from "next/font/google";
import "./globals.css";
import { EVENT } from "@/content/event";

// Sundae brand faces: Merriweather for headlines and callouts, Lato for everything else.
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-merriweather", display: "swap" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-lato", display: "swap" });

const title = "Private Dinner & Dialogue with Josh Stech — Sundae · Oct. 8, Manhattan Beach";
const description =
  "Join Sundae co-founder and CEO Josh Stech and fellow Los Angeles real estate operators for dinner and a conversation about building a stronger acquisition business in a harder market. Thursday, Oct. 8, 2026, at 7 p.m. — The Courtyard at Shade Hotel, Manhattan Beach, California.";

export const metadata: Metadata = {
  metadataBase: new URL("https://site-sundae-event.vercel.app"),
  title, description,
  openGraph: { title, description, type: "website", siteName: "Sundae" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: false, follow: false }, // review build — remove when Sundae approves going public
};
export const viewport: Viewport = { themeColor: "#ffffff" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Private Dinner & Dialogue for Los Angeles Real Estate Operators",
  description,
  startDate: EVENT.startISO,
  endDate: EVENT.endISO,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  isAccessibleForFree: true,
  location: { "@type": "Place", name: EVENT.venue, address: { "@type": "PostalAddress", streetAddress: "1221 N. Valley Drive", addressLocality: "Manhattan Beach", addressRegion: "CA", postalCode: "90266", addressCountry: "US" } },
  organizer: { "@type": "Organization", name: "Sundae", url: "https://sundae.com" },
  performer: { "@type": "Person", name: "Josh Stech", jobTitle: "Co-founder and CEO, Sundae" },
  image: ["https://site-sundae-event.vercel.app/media/courtyard-twilight.jpg"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${merriweather.variable} ${lato.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
