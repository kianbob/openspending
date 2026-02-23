import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Where Do YOUR Tax Dollars Go? Calculator | OpenSpending',
  description:
    'Enter your salary and see the exact dollar amount you pay to Lockheed Martin, the Pentagon, and 10+ federal agencies. The breakdown will surprise you.',
  openGraph: {
    title: 'Where Do YOUR Tax Dollars Go? Calculator | OpenSpending',
    description:
      'Enter your salary and see the exact dollar amount you pay to Lockheed Martin, the Pentagon, and 10+ federal agencies. The breakdown will surprise you.',
    url: 'https://www.openspending.us/tax-calculator',
  },
};

export default function TaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
