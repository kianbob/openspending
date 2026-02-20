import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Federal Spending by Country — OpenSpending",
  description:
    "Where U.S. tax dollars go internationally. Explore federal spending across 50 countries.",
};

export default function CountriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
