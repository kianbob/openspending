import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Where Does $1 of Federal Spending Go? — OpenSpending",
  description: "See exactly how each dollar of federal spending is divided across defense, healthcare, Social Security, interest, and more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
