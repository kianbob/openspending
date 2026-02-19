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
  title: "OpenSpending — Follow the Money",
  description:
    "Track $11.2 trillion in federal spending. Contracts, grants, agencies, and where your tax dollars really go.",
  metadataBase: new URL("https://openspending-app.vercel.app"),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "OpenSpending — Follow the Money",
    description:
      "Track $11.2 trillion in federal spending. Contracts, grants, agencies, and where your tax dollars really go.",
    url: "https://openspending.info",
    siteName: "OpenSpending",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenSpending — Follow the Money",
    description:
      "Track $11.2 trillion in federal spending. Contracts, grants, agencies, and where your tax dollars really go.",
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
              url: "https://openspending.info",
              description:
                "Independent, data-driven analysis of federal government spending using USASpending.gov data.",
            }),
          }}
        />
        <Navigation />
        <main>{children}</main>
        <footer className="bg-gray-900 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="col-span-2 md:col-span-1">
                <h3 className="font-serif text-lg font-bold text-white">
                  OpenSpending
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Your tax dollars, tracked. Independent analysis of federal
                  spending data.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white uppercase tracking-wider">
                  Data
                </h4>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/contractors" className="text-sm text-gray-400 hover:text-white transition-colors">Contractors</Link>
                  <Link href="/agencies" className="text-sm text-gray-400 hover:text-white transition-colors">Agencies</Link>
                  <Link href="/contracts" className="text-sm text-gray-400 hover:text-white transition-colors">Contracts</Link>
                  <Link href="/industries" className="text-sm text-gray-400 hover:text-white transition-colors">Industries</Link>
                  <Link href="/states" className="text-sm text-gray-400 hover:text-white transition-colors">States</Link>
                  <Link href="/foreign-aid" className="text-sm text-gray-400 hover:text-white transition-colors">Foreign Aid</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white uppercase tracking-wider">
                  Analysis
                </h4>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/trends" className="text-sm text-gray-400 hover:text-white transition-colors">Trends</Link>
                  <Link href="/covid" className="text-sm text-gray-400 hover:text-white transition-colors">COVID Spending</Link>
                  <Link href="/usaid" className="text-sm text-gray-400 hover:text-white transition-colors">USAID Deep Dive</Link>
                  <Link href="/compare" className="text-sm text-gray-400 hover:text-white transition-colors">Compare</Link>
                  <Link href="/efficiency" className="text-sm text-gray-400 hover:text-white transition-colors">Government Efficiency</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white uppercase tracking-wider">
                  Editorial
                </h4>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/investigations" className="text-sm text-gray-400 hover:text-white transition-colors">All Investigations</Link>
                  <Link href="/spending-analysis" className="text-sm text-gray-400 hover:text-white transition-colors">Spending Analysis</Link>
                  <Link href="/top-10" className="text-sm text-gray-400 hover:text-white transition-colors">Top 10 Contractors</Link>
                  <Link href="/pentagon-spending" className="text-sm text-gray-400 hover:text-white transition-colors">Pentagon Spending</Link>
                  <Link href="/healthcare-spending" className="text-sm text-gray-400 hover:text-white transition-colors">Healthcare Spending</Link>
                  <Link href="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</Link>
                  <Link href="/no-bid" className="text-sm text-gray-400 hover:text-white transition-colors">No-Bid Nation</Link>
                  <Link href="/waste" className="text-sm text-gray-400 hover:text-white transition-colors">Waste &amp; Fraud</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white uppercase tracking-wider">
                  About
                </h4>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link>
                  <Link href="/downloads" className="text-sm text-gray-400 hover:text-white transition-colors">Data Downloads</Link>
                </div>
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
