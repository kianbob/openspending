import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DOGE Claimed $55B Saved. Spending Rose $390B. | OpenSpending",
  description: "DOGE promised $2 trillion in savings, delivered $55B in claims — while federal spending surged $392B. The numbers expose the gap between rhetoric and reality.",
  openGraph: {
    title: "DOGE Claimed $55B Saved. Spending Rose $390B. | OpenSpending",
    description: "DOGE promised $2 trillion in savings, delivered $55B in claims — while federal spending surged $392B.",
    url: "https://www.openspending.us/doge-reality",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOGE Claimed $55B Saved. Spending Rose $390B. | OpenSpending",
    description: "DOGE promised $2 trillion in savings, delivered $55B in claims — while federal spending surged $392B.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
