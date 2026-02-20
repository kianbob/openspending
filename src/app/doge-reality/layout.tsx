import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "The DOGE Reality Check: Spending Increased $390B Despite Cuts — OpenSpending",
  description:
    "DOGE promised $2 trillion in savings. Federal spending increased $390 billion. The data tells the real story.",
  openGraph: {
    title:
      "The DOGE Reality Check: Spending Increased $390B Despite Cuts — OpenSpending",
    description:
      "DOGE promised $2 trillion in savings. Federal spending increased $390 billion. The data tells the real story.",
    url: "/doge-reality",
  },
};

export default function DogeRealityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
