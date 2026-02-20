import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Congressional Earmarks Tracker: $14.6B in FY2024 — OpenSpending",
  description: "Track $14.6 billion in congressional earmarks for FY2024. See which members of Congress directed the most spending and where the money went.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
