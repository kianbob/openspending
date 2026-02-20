import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The $36 Trillion Debt Clock — OpenSpending",
  description: "Watch the national debt tick up in real time. $36 trillion and counting.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
