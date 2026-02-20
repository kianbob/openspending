import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Federal Spending | OpenSpending",
  description: "Search across federal agencies, contractors, states, and industries to explore government spending data.",
  openGraph: {
    title: "Search Federal Spending | OpenSpending",
    description: "Search across federal agencies, contractors, states, and industries to explore government spending data.",
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
