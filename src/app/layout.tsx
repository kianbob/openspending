import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "OpenSpending | Follow the Money",
  description:
    "Track $11.2 trillion in federal spending. See which contractors, agencies, and states get your tax dollars — and how much is wasted.",
  metadataBase: new URL("https://www.openspending.us"),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "OpenSpending | Follow the Money",
    description:
      "Track $11.2 trillion in federal spending. See which contractors, agencies, and states get your tax dollars — and how much is wasted.",
    url: "https://www.openspending.us",
    siteName: "OpenSpending",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenSpending — Track $11.2 Trillion in Federal Spending",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenSpending | Follow the Money",
    description:
      "Track $11.2 trillion in federal spending. See which contractors, agencies, and states get your tax dollars — and how much is wasted.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PYL9GQH0LC" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-PYL9GQH0LC');` }} />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-white text-gray-900`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "OpenSpending",
              url: "https://www.openspending.us",
              description:
                "Independent, data-driven analysis of federal government spending",
              sameAs: ["https://twitter.com/TheDataProject0"],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "OpenSpending",
              url: "https://www.openspending.us",
              description: "Track $11.2 trillion in federal spending across 97 agencies, 50 states, and thousands of contractors. Independent data journalism built on USASpending.gov data.",
              publisher: { "@type": "Organization", name: "TheDataProject.ai", url: "https://thedataproject.ai" },
              potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://www.openspending.us/search?q={search_term_string}" }, "query-input": "required name=search_term_string" },
            }),
          }}
        />
        <Navigation />
        <main>{children}</main>
        <footer className="bg-gray-900 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div>
                <h4 className="font-semibold text-sm text-white uppercase tracking-wider">
                  Explore
                </h4>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/agencies" className="text-sm text-gray-400 hover:text-white transition-colors">All Agencies</Link>
                  <Link href="/contractors" className="text-sm text-gray-400 hover:text-white transition-colors">Contractors</Link>
                  <Link href="/states" className="text-sm text-gray-400 hover:text-white transition-colors">States</Link>
                  <Link href="/contracts" className="text-sm text-gray-400 hover:text-white transition-colors">Contracts</Link>
                  <Link href="/grants" className="text-sm text-gray-400 hover:text-white transition-colors">Grants</Link>
                  <Link href="/industries" className="text-sm text-gray-400 hover:text-white transition-colors">Industries</Link>
                  <Link href="/subagencies" className="text-sm text-gray-400 hover:text-white transition-colors">Sub-Agencies</Link>
                  <Link href="/what-they-buy" className="text-sm text-gray-400 hover:text-white transition-colors">What They Buy</Link>
                  <Link href="/local-spending" className="text-sm text-gray-400 hover:text-white transition-colors">Local Spending</Link>
                  <Link href="/counties" className="text-sm text-gray-400 hover:text-white transition-colors">Counties</Link>
                  <Link href="/international-spending" className="text-sm text-gray-400 hover:text-white transition-colors">Countries</Link>
                  <Link href="/products" className="text-sm text-gray-400 hover:text-white transition-colors">Products</Link>
                  <Link href="/grants/recipients" className="text-sm text-gray-400 hover:text-white transition-colors">Grant Recipients</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white uppercase tracking-wider">
                  Analysis
                </h4>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/trends" className="text-sm text-gray-400 hover:text-white transition-colors">Spending Trends</Link>
                  <Link href="/doge-reality" className="text-sm text-gray-400 hover:text-white transition-colors">DOGE Reality Check</Link>
                  <Link href="/spending-explosion" className="text-sm text-gray-400 hover:text-white transition-colors">Spending Explosion</Link>
                  <Link href="/your-tax-bill" className="text-sm text-gray-400 hover:text-white transition-colors">Your Tax Bill</Link>
                  <Link href="/global-comparison" className="text-sm text-gray-400 hover:text-white transition-colors">US vs The World</Link>
                  <Link href="/interest" className="text-sm text-gray-400 hover:text-white transition-colors">Interest Time Bomb</Link>
                  <Link href="/state-dependency" className="text-sm text-gray-400 hover:text-white transition-colors">State Dependency</Link>
                  <Link href="/covid" className="text-sm text-gray-400 hover:text-white transition-colors">COVID Spending</Link>
                  <Link href="/monthly-pulse" className="text-sm text-gray-400 hover:text-white transition-colors">Monthly Pulse</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white uppercase tracking-wider">
                  Investigations
                </h4>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/investigations" className="text-sm text-gray-400 hover:text-white transition-colors">All Investigations</Link>
                  <Link href="/spending-analysis" className="text-sm text-gray-400 hover:text-white transition-colors">Spending Analysis</Link>
                  <Link href="/pentagon-deep-dive" className="text-sm text-gray-400 hover:text-white transition-colors">Pentagon Deep Dive</Link>
                  <Link href="/healthcare-spending" className="text-sm text-gray-400 hover:text-white transition-colors">Healthcare Spending</Link>
                  <Link href="/contractor-monopoly" className="text-sm text-gray-400 hover:text-white transition-colors">Contractor Monopoly</Link>
                  <Link href="/foreign-aid-deep-dive" className="text-sm text-gray-400 hover:text-white transition-colors">Foreign Aid Deep Dive</Link>
                  <Link href="/welfare-queens" className="text-sm text-gray-400 hover:text-white transition-colors">Welfare Queens</Link>
                  <Link href="/no-bid" className="text-sm text-gray-400 hover:text-white transition-colors">No-Bid Nation</Link>
                  <Link href="/waste" className="text-sm text-gray-400 hover:text-white transition-colors">Waste &amp; Fraud</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white uppercase tracking-wider">
                  Tools
                </h4>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/tax-calculator" className="text-sm text-gray-400 hover:text-white transition-colors">Tax Calculator</Link>
                  <Link href="/compare" className="text-sm text-gray-400 hover:text-white transition-colors">Compare</Link>
                  <Link href="/search" className="text-sm text-gray-400 hover:text-white transition-colors">Search</Link>
                  <Link href="/downloads" className="text-sm text-gray-400 hover:text-white transition-colors">Downloads</Link>
                  <Link href="/shutdown-calculator" className="text-sm text-gray-400 hover:text-white transition-colors">Shutdown Calculator</Link>
                  <Link href="/spending-speed" className="text-sm text-gray-400 hover:text-white transition-colors">Spending Speed</Link>
                  <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="font-semibold text-sm text-white uppercase tracking-wider">
                Sister Sites
              </h4>
              <div className="mt-3 flex flex-wrap gap-4">
                <a href="https://www.openfeds.org" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  OpenFeds — Federal Workforce Tracker
                </a>
                <a href="https://www.openmedicare.us" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  OpenMedicare — Medicare Spending Tracker
                </a>
                <a href="https://www.openmedicaid.org" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  OpenMedicaid — Medicaid Spending Tracker
                </a>
                <a href="https://www.openlobby.us" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  OpenLobby — Federal Lobbying Tracker
                </a>
                <a href="https://www.vaccinewatch.org" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  VaccineWatch — Vaccine Safety Data
                </a>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
              Data from{" "}
              <a
                href="https://www.usaspending.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white underline"
              >
                USASpending.gov
              </a>
              {" "}&middot; Built by{" "}
              <a
                href="https://thedataproject.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white underline"
              >
                TheDataProject.ai
              </a>
              <br />
              <span className="text-gray-600">Data current through FY2025</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
