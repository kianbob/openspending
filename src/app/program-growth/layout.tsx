import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "The Entitlement Explosion: Programs That Grew 100%+ — OpenSpending",
  description:
    "23 federal programs tracked from FY2019 to FY2025. Disaster grants grew 299%, VA disability doubled, and Social Security added $492B. See which programs are growing on autopilot.",
  openGraph: {
    title:
      "The Entitlement Explosion: Programs That Grew 100%+ — OpenSpending",
    description:
      "23 federal programs tracked from FY2019 to FY2025. Disaster grants grew 299%, VA disability doubled, and Social Security added $492B. See which programs are growing on autopilot.",
    url: "/program-growth",
  },
};

export default function ProgramGrowthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
