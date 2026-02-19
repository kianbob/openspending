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
};

const navLinks = [
  { href: "/agencies", label: "Agencies" },
  { href: "/contractors", label: "Contractors" },
  { href: "/contracts", label: "Contracts" },
  { href: "/industries", label: "Industries" },
  { href: "/grants", label: "Grants" },
  { href: "/foreign-aid", label: "Foreign Aid" },
  { href: "/states", label: "States" },
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
              </div>
              <MobileMenu />
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-gray-200 bg-gray-50 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  OpenSpending
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Your tax dollars, tracked. Independent analysis of federal
                  spending data.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900 uppercase tracking-wider">
                  Explore
                </h4>
                <div className="mt-2 flex flex-col gap-1">
                  {navLinks.slice(0, 4).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-indigo-700"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900 uppercase tracking-wider">
                  Data Source
                </h4>
                <p className="mt-2 text-sm text-gray-500">
                  All data sourced from{" "}
                  <a
                    href="https://www.usaspending.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 underline"
                  >
                    USASpending.gov
                  </a>
                  , the official source for federal spending data. FY2025.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
              Built by TheDataProject.ai &middot; Data from USASpending.gov
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

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
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
}
