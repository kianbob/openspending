import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Federal Spending by Country | OpenSpending",
  description:
    "Billions in U.S. tax dollars flow overseas every year. See which 50+ countries receive the most federal spending in FY2025.",
};

export default function CountriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
