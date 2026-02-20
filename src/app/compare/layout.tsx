import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Federal Spending | OpenSpending",
  description: "Compare federal agencies and contractors side-by-side. See budgets, spending trends, and key metrics in one view.",
  openGraph: {
    title: "Compare Federal Spending | OpenSpending",
    description: "Compare federal agencies and contractors side-by-side. See budgets, spending trends, and key metrics in one view.",
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
