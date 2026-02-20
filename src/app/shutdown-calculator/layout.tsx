import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Shutdown Cost Calculator — OpenSpending",
  description: "Calculate the cost of a government shutdown. How much does each day cost taxpayers?",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
