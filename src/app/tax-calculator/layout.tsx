import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Tax Dollars — Tax Calculator | OpenSpending',
  description:
    'Enter your income and see exactly where the federal government spends your tax dollars. Interactive breakdown of Social Security, Defense, Medicare, and more.',
  openGraph: {
    title: 'Your Tax Dollars — Where Does Your Money Go?',
    description:
      'Enter your income and see exactly where the federal government spends your tax dollars.',
    url: '/tax-calculator',
  },
};

export default function TaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
