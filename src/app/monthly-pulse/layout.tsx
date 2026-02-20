import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monthly Spending Pulse: $167K Per Second — OpenSpending",
  description:
    "Track federal spending month by month. $5.3 trillion per year means $167,000 spent every second. See how contracts, grants, and direct payments surge and dip throughout the year.",
  openGraph: {
    title: "Monthly Spending Pulse: $167K Per Second — OpenSpending",
    description:
      "Track federal spending month by month. $5.3 trillion per year means $167,000 spent every second. See how contracts, grants, and direct payments surge and dip throughout the year.",
    url: "/monthly-pulse",
  },
};

export default function MonthlyPulseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
