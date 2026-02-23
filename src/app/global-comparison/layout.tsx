import { Metadata } from "next";

export const metadata: Metadata = {
  title: "US vs the World: Federal Spending Compared | OpenSpending",
  description: "The US spends more on defense than the next 9 countries combined and more per person on healthcare than anyone. See the data.",
  openGraph: {
    title: "US vs the World: Federal Spending Compared | OpenSpending",
    description: "The US spends more on defense than the next 9 countries combined and more per person on healthcare than anyone.",
    url: "https://www.openspending.us/global-comparison",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
