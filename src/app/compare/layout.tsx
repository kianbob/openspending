import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Federal Spending | OpenSpending",
  description: "Compare any two agencies, contractors, or states side by side. Budgets, trends, and spending breakdowns in one view.",
  openGraph: {
    title: "Compare Federal Spending | OpenSpending",
    description: "Compare any two agencies, contractors, or states side by side. Budgets, trends, and spending breakdowns in one view.",
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
