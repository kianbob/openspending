import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Spending Explosion: Federal Spending Grew 63% Since 2017 — OpenSpending",
  description: "Federal spending grew from $3.3 trillion to $5.3 trillion in 8 years. Which agencies drove the increase?",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
