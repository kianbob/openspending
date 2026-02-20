import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Federal Dependency by State: Who Takes More Than They Give? — OpenSpending",
  description:
    "For every $1 in federal taxes, West Virginia gets $4.22 back. New Jersey gets $0.71. See which states are donors and which are takers.",
  keywords: "federal spending by state dependency, donor states taker states, federal tax balance by state",
  openGraph: {
    title: "Federal Dependency by State: Who Takes More Than They Give?",
    description:
      "For every $1 in federal taxes, West Virginia gets $4.22 back. New Jersey gets $0.71.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
