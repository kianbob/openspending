import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spending by President: Obama vs Trump vs Biden | OpenSpending",
  description: "Neither party is fiscally conservative. Biden's avg spending is 82% higher than Obama's. Compare budgets and deficits by president.",
  openGraph: {
    title: "Spending by President: Obama vs Trump vs Biden | OpenSpending",
    description: "Neither party is fiscally conservative. Biden's avg spending is 82% higher than Obama's. Compare budgets and deficits.",
    url: "https://www.openspending.us/presidents",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
