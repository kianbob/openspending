import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Which States Mooch the Most Federal Money? | OpenSpending",
  description: "West Virginia gets $4.22 for every $1 it sends to Washington. New Jersey gets $0.71. See which states are takers and which are donors.",
  openGraph: {
    title: "Which States Mooch the Most Federal Money? | OpenSpending",
    description: "West Virginia gets $4.22 for every $1 it sends to Washington. New Jersey gets $0.71.",
    url: "https://www.openspending.us/welfare-queens",
  },
  twitter: {
    card: "summary_large_image",
    title: "Which States Mooch the Most Federal Money? | OpenSpending",
    description: "West Virginia gets $4.22 for every $1 it sends to Washington. New Jersey gets $0.71.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
