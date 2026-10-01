import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { EVENT } from "@/content/event";

const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-barlow" });
const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], weight: ["300", "400", "600"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const title = "Private Dinner & Dialogue with Josh Stech — Sundae · Oct 8, Manhattan Beach";
const description =
  "Join Sundae Co-Founder & CEO Josh Stech and fellow LA real estate operators for dinner and a conversation about building a stronger acquisition business in a harder market. Thursday, Oct 8, 2026, 6 PM — The Courtyard at Shade Hotel, Manhattan Beach.";

export const metadata: Metadata = {
  metadataBase: new URL("https://site-sundae-event.vercel.app"),
  title, description,
  openGraph: { title, description, type: "website", siteName: "Sundae" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: false, follow: false }, // review build — remove when Sundae approves going public
};
export const viewport: Viewport = { themeColor: "#120d0f" };

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
  location: { "@type": "Place", name: EVENT.venue, address: { "@type": "PostalAddress", streetAddress: "1221 N Valley Dr", addressLocality: "Manhattan Beach", addressRegion: "CA", postalCode: "90266", addressCountry: "US" } },
  organizer: { "@type": "Organization", name: "Sundae", url: "https://sundae.com" },
  performer: { "@type": "Person", name: "Josh Stech", jobTitle: "Co-Founder & CEO, Sundae" },
  image: ["https://site-sundae-event.vercel.app/media/courtyard-twilight.jpg"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${fraunces.variable} ${inter.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
