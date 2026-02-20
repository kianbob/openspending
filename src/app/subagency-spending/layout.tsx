import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sub-Agency Spending: Who REALLY Spends the Money — OpenSpending",
  description:
    "Most people think the Pentagon is the biggest spender. It's actually CMS — and most Americans have never heard of it. See how 100 sub-agencies spend trillions.",
  openGraph: {
    title:
      "Sub-Agency Spending: Who REALLY Spends the Money — OpenSpending",
    description:
      "Most people think the Pentagon is the biggest spender. It's actually CMS — and most Americans have never heard of it. See how 100 sub-agencies spend trillions.",
    url: "/subagency-spending",
  },
};

export default function SubAgencySpendingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
