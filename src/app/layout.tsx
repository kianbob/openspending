import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
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
  openGraph: {
    title: "OpenSpending — Follow the Money",
    description:
      "Track $11.2 trillion in federal spending. Contracts, grants, agencies, and where your tax dollars really go.",
    url: "https://openspending-app.vercel.app",
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

const navLinks = [
  { href: "/agencies", label: "Agencies" },
  { href: "/contractors", label: "Contractors" },
  { href: "/contracts", label: "Contracts" },
  { href: "/industries", label: "Industries" },
  { href: "/foreign-aid", label: "Foreign Aid" },
  { href: "/usaid", label: "USAID" },
  { href: "/covid", label: "COVID" },
  { href: "/trends", label: "Trends" },
  { href: "/states", label: "States" },
  { href: "/spending-analysis", label: "Analysis" },
  { href: "/about", label: "About" },
];

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
              url: "https://openspending-app.vercel.app",
              description:
                "Independent, data-driven analysis of federal government spending using USASpending.gov data.",
            }),
          }}
        />
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/"
                className="font-serif text-xl font-bold text-indigo-700 tracking-tight"
              >
                OpenSpending
              </Link>
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/search"
                  className="px-3 py-2 text-gray-600 hover:text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
                  aria-label="Search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Link>
              </div>
              <MobileMenu />
            </div>
          </div>
        </nav>
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
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white uppercase tracking-wider">
                  Editorial
                </h4>
                <div className="mt-3 flex flex-col gap-2">
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
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

const mobileNavSections = [
  {
    label: "DATA",
    links: [
      { href: "/agencies", label: "Agencies" },
      { href: "/contractors", label: "Contractors" },
      { href: "/contracts", label: "Contracts" },
      { href: "/industries", label: "Industries" },
      { href: "/states", label: "States" },
      { href: "/foreign-aid", label: "Foreign Aid" },
    ],
  },
  {
    label: "ANALYSIS",
    links: [
      { href: "/trends", label: "Trends" },
      { href: "/covid", label: "COVID" },
      { href: "/usaid", label: "USAID" },
      { href: "/compare", label: "Compare" },
    ],
  },
  {
    label: "EDITORIAL",
    links: [
      { href: "/spending-analysis", label: "Spending Analysis" },
      { href: "/top-10", label: "Top 10 Contractors" },
      { href: "/pentagon-spending", label: "Pentagon Spending" },
      { href: "/healthcare-spending", label: "Healthcare Spending" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/no-bid", label: "No-Bid Nation" },
      { href: "/waste", label: "Waste & Fraud" },
      { href: "/about", label: "About" },
    ],
  },
];

function MobileMenu() {
  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer p-2 text-gray-600 hover:text-indigo-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <Link
            href="/search"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </Link>
          <hr className="border-gray-200 my-1" />
          {mobileNavSections.map((section, i) => (
            <div key={section.label}>
              {i > 0 && <hr className="border-gray-200 my-1" />}
              <p className="px-4 pt-2 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                {section.label}
              </p>
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-1.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
