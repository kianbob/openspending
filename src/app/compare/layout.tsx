import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Agencies & Contractors — OpenSpending",
  description: "Compare federal agencies and contractors side-by-side. See budgets, spending trends, and key metrics in one view.",
  openGraph: {
    title: "Compare Agencies & Contractors — OpenSpending",
    description: "Compare federal agencies and contractors side-by-side. See budgets, spending trends, and key metrics in one view.",
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
