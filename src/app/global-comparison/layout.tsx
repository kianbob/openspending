import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "US vs The World: How American Spending Compares — OpenSpending",
  description:
    "The US spends 24.2% of GDP — lowest among developed nations. But we spend more on healthcare per person than any country and more on defense than the next 9 combined.",
  openGraph: {
    title:
      "US vs The World: How American Spending Compares — OpenSpending",
    description:
      "The US spends 24.2% of GDP — lowest among developed nations. But we spend more on healthcare per person than any country and more on defense than the next 9 combined.",
    url: "/global-comparison",
  },
};

export default function GlobalComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
