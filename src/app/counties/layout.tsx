import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Federal Spending by County — OpenSpending",
  description:
    "Explore federal spending flowing to counties across America.",
};

export default function CountiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
