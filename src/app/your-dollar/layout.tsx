import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Where Does $1 of Federal Spending Go? | OpenSpending",
  description: "18 cents to Medicare, 12 cents to debt interest, 11 cents to defense. See every cent of your tax dollar broken down with interactive charts.",
  openGraph: {
    title: "Where Does $1 of Federal Spending Go? | OpenSpending",
    description: "18 cents to Medicare, 12 cents to debt interest, 11 cents to defense. See every cent of your tax dollar broken down.",
    url: "https://www.openspending.us/your-dollar",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
