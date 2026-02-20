import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Pentagon's Blank Check — OpenSpending",
  description: "The DOD has never passed a full audit. $501B in spending, cost-plus contracts, and the revolving door between Pentagon and contractors.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
