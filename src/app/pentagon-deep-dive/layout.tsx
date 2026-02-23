import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pentagon Budget: $886B and Zero Audits | OpenSpending",
  description: "The DOD failed 7 straight audits, spends more than the next 9 countries combined, and 5 contractors pocket $97B/year. Here are the receipts.",
  openGraph: {
    title: "Pentagon Budget: $886B and Zero Audits | OpenSpending",
    description: "The DOD failed 7 straight audits, spends more than the next 9 countries combined, and 5 contractors pocket $97B/year. Here are the receipts.",
    url: "https://www.openspending.us/pentagon-deep-dive",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
