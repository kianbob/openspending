import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Federal Spending Up 63% Since 2017 | OpenSpending",
  description: "Federal spending surged from $3.3T to $5.3T in 8 years — COVID spending never came back down. Now projected at $7.7T for FY2026. See which agencies drove the explosion.",
  openGraph: {
    title: "Federal Spending Up 63% Since 2017 | OpenSpending",
    description: "Federal spending surged from $3.3T to $5.3T in 8 years — COVID spending never came back down. Now projected at $7.7T for FY2026.",
    url: "https://www.openspending.us/spending-explosion",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
