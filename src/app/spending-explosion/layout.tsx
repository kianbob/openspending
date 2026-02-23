import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Federal Spending Up 63% Since 2017 | OpenSpending",
  description: "From $3.3T to $5.3T in 8 years — COVID spending never came back down. See which agencies drove the $2 trillion increase.",
  openGraph: {
    title: "Federal Spending Up 63% Since 2017 | OpenSpending",
    description: "From $3.3T to $5.3T in 8 years — COVID spending never came back down. See which agencies drove the $2 trillion increase.",
    url: "https://www.openspending.us/spending-explosion",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
