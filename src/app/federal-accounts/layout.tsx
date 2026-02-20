import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Where Your Money Actually Goes: Federal Accounts — OpenSpending",
  description:
    "Money doesn't flow to agencies — it flows to accounts. 4 federal accounts control $3.1 trillion in autopilot spending. Social Security, Medicare, and Medicaid trust funds dominate.",
  openGraph: {
    title: "Where Your Money Actually Goes: Federal Accounts",
    description:
      "4 federal accounts control $3.1 trillion. Money flows to accounts, not agencies.",
    url: "https://www.openspending.us/federal-accounts",
    siteName: "OpenSpending",
    type: "article",
    images: [
      {
        url: "https://www.openspending.us/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenSpending — Federal Spending Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Where Your Money Actually Goes: Federal Accounts",
    description:
      "4 federal accounts control $3.1 trillion. Money flows to accounts, not agencies.",
    images: ["https://www.openspending.us/og-image.png"],
  },
};

export default function FederalAccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
