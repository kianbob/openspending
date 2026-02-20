import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The $36 Trillion Debt Clock — OpenSpending",
  description:
    "The national debt hit $36.2 trillion — $108,060 per citizen. Interest payments now exceed the defense budget. See how we got here.",
  openGraph: {
    title: "The $36 Trillion Debt Clock — OpenSpending",
    description:
      "The national debt hit $36.2 trillion — $108,060 per citizen. Interest payments now exceed the defense budget. See how we got here.",
    url: "/national-debt",
  },
};

export default function NationalDebtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
