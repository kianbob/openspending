import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Which States Are Federal Welfare Queens? — OpenSpending",
  description: "For every $1 in federal taxes, West Virginia gets $4.22 back. See which states are donors and which are takers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
