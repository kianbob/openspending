import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Red States vs Blue States: Who Takes More? | OpenSpending",
  description:
    "West Virginia gets $4.22 per $1 in taxes paid. New Jersey gets $0.71. The data reveals which states are takers and which fund everyone else.",
  keywords: "federal spending by state dependency, donor states taker states, federal tax balance by state",
  openGraph: {
    title: "Red States vs Blue States: Who Takes More? | OpenSpending",
    description:
      "West Virginia gets $4.22 per $1 in taxes paid. New Jersey gets $0.71. See the full state-by-state breakdown.",
    url: "https://www.openspending.us/state-dependency",
  },
  twitter: {
    card: "summary_large_image",
    title: "Red States vs Blue States: Who Takes More? | OpenSpending",
    description:
      "West Virginia gets $4.22 per $1 in taxes paid. New Jersey gets $0.71. See the full state-by-state breakdown.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
