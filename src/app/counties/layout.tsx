import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Federal Spending by County | OpenSpending",
  description:
    "See which U.S. counties get the most federal contract dollars. Searchable FY2025 data for every county in America.",
};

export default function CountiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
