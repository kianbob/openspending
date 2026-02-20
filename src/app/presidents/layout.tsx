import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presidential Spending: Obama vs Trump vs Biden — OpenSpending",
  description: "Compare federal spending under Obama, Trump, and Biden. See how budgets, deficits, and contractor spending changed across administrations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
