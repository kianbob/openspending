import { Metadata } from "next";

export const metadata: Metadata = {
  title: "US vs The World: How American Spending Compares — OpenSpending",
  description: "How does American government spending compare to other nations? Defense, healthcare, and total spending side by side.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
