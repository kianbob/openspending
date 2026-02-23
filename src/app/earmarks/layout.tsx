import { Metadata } from "next";

export const metadata: Metadata = {
  title: "$14.6B in Earmarks Are Back (FY2024) | OpenSpending",
  description: "Banned in 2011, back in 2021. Congress directed $14.6B across 8,000 earmarks in FY2024. Track every dollar of congressional pork.",
  openGraph: {
    title: "$14.6B in Earmarks Are Back (FY2024) | OpenSpending",
    description: "Banned in 2011, back in 2021. Congress directed $14.6B across 8,000 earmarks in FY2024. Track every dollar of pork.",
    url: "https://www.openspending.us/earmarks",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
