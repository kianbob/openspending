import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Where Does Foreign Aid Actually Go? — OpenSpending",
  description: "An investigation into U.S. foreign aid — which countries get the most, what categories dominate, and whether it's working.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
