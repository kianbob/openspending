import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Tax Bill: $33,135 Per Taxpayer (FY2025) | OpenSpending",
  description:
    "The government spent $33,135 per taxpayer in FY2025 — up 64% since 2017. See exactly where your share goes, from Social Security to debt interest.",
  openGraph: {
    title: "Your Tax Bill: $33,135 Per Taxpayer (FY2025) | OpenSpending",
    description:
      "The government spent $33,135 per taxpayer in FY2025 — up 64% since 2017. See exactly where your share goes.",
    url: "https://www.openspending.us/your-tax-bill",
  },
};

export default function YourTaxBillLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
