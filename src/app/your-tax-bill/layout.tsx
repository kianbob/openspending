import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Tax Bill: $33,135 Per Taxpayer in FY2025 — OpenSpending",
  description:
    "Every American taxpayer funded $33,135 in federal spending in FY2025. See where your money goes — from Social Security to defense to interest on the debt.",
  openGraph: {
    title: "Your Tax Bill: $33,135 Per Taxpayer in FY2025 — OpenSpending",
    description:
      "Every American taxpayer funded $33,135 in federal spending in FY2025. See where your money goes.",
    url: "/your-tax-bill",
  },
};

export default function YourTaxBillLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
