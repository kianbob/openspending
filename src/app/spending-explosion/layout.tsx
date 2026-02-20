import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "The Spending Explosion: Federal Spending Grew 63% Since 2017 — OpenSpending",
  description:
    "Federal spending surged from $3.3 trillion to $5.3 trillion since 2017 — a 63% increase. See which agencies grew fastest and where your money is going.",
  openGraph: {
    title:
      "The Spending Explosion: Federal Spending Grew 63% Since 2017 — OpenSpending",
    description:
      "Federal spending surged from $3.3 trillion to $5.3 trillion since 2017 — a 63% increase. See which agencies grew fastest and where your money is going.",
    url: "/spending-explosion",
  },
};

export default function SpendingExplosionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
