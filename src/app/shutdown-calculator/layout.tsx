import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Government Shutdown Cost Calculator — OpenSpending",
  description:
    "Calculate the real cost of a government shutdown — $400M per day in direct costs, 800,000 workers furloughed, and billions in economic damage.",
  openGraph: {
    title:
      "Government Shutdown Cost Calculator — OpenSpending",
    description:
      "Calculate the real cost of a government shutdown — $400M per day in direct costs, 800,000 workers furloughed, and billions in economic damage.",
    url: "/shutdown-calculator",
  },
};

export default function ShutdownCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
