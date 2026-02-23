import { Metadata } from "next";

export const metadata: Metadata = {
  title: "4 Accounts Control $3.1 Trillion | OpenSpending",
  description:
    "Just 4 federal accounts control $3.1T in autopilot spending — no annual vote required. See where the money actually flows.",
  openGraph: {
    title: "4 Accounts Control $3.1 Trillion | OpenSpending",
    description:
      "Just 4 federal accounts control $3.1T in autopilot spending — no annual vote required. See where the money actually flows.",
    url: "https://www.openspending.us/federal-accounts",
    siteName: "OpenSpending",
    type: "article",
    images: [
      {
        url: "https://www.openspending.us/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenSpending | Federal Spending Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "4 Accounts Control $3.1 Trillion | OpenSpending",
    description:
      "Just 4 federal accounts control $3.1T in autopilot spending — no annual vote required. See where the money actually flows.",
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
