import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foreign Aid Deep Dive: Where $50B Goes | OpenSpending",
  description: "One DC firm you've never heard of holds a $6.7B contract. USAID surged 44% then crashed 49%. See which countries get your money — and who profits.",
  openGraph: {
    title: "Foreign Aid Deep Dive: Where $50B Goes | OpenSpending",
    description: "One DC firm you've never heard of holds a $6.7B contract. USAID surged 44% then crashed 49%. See which countries get your money — and who profits.",
    url: "https://www.openspending.us/foreign-aid-deep-dive",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
