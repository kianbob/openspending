import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Industry Winners & Losers: How COVID Reshaped Government Contracting — OpenSpending",
  description:
    "COVID reshaped federal contracting. Healthcare insurance contracts tripled while computer manufacturing fell 28%. See which industries won and lost since 2020.",
  openGraph: {
    title:
      "Industry Winners & Losers: How COVID Reshaped Government Contracting — OpenSpending",
    description:
      "COVID reshaped federal contracting. Healthcare insurance contracts tripled while computer manufacturing fell 28%. See which industries won and lost since 2020.",
    url: "/industry-trends",
  },
};

export default function IndustryTrendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
