import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pentagon Budget: $886B Base + $87.6B Supplemental | OpenSpending",
  description: "The DOD's $886B base budget plus an $87.6B supplemental request for Iran war costs and readiness. Failed 7 straight audits. 5 contractors pocket $97B/year. Full breakdown.",
  openGraph: {
    title: "Pentagon Budget: $886B Base + $87.6B Supplemental | OpenSpending",
    description: "The DOD's $886B base budget plus $87.6B supplemental. Failed 7 straight audits, outspends next 9 countries combined. Full receipts.",
    url: "https://www.openspending.us/pentagon-deep-dive",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
