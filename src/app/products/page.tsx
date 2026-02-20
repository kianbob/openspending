import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { formatDollars } from "@/lib/format";
import products from "@/../public/data/product-service-codes.json";

type PSC = { name: string; code: string; amount: number };

const data = (products as PSC[]).map((p, i) => ({ ...p, rank: i + 1 }));

export const metadata: Metadata = {
  title: "Products & Services — Federal Spending by Category | OpenSpending",
  description:
    "Explore the top 100 federal product and service categories by spending, from aircraft and healthcare to IT services and construction.",
};

export default function ProductsListingPage() {
  const totalSpending = data.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Products & Services" }]} />

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-2">
        Products &amp; Services
      </h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        The top 100 federal product and service categories account for{" "}
        <strong>{formatDollars(totalSpending)}</strong> in government spending.
        Click any row to explore details.
      </p>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-600">#</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Code</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Product / Service</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr
                key={p.code}
                className="border-b border-gray-100 hover:bg-indigo-50 transition-colors"
              >
                <td className="px-4 py-3 text-gray-500">{p.rank}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.code}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/products/${p.code}`}
                    className="text-indigo-700 hover:text-indigo-900 font-medium hover:underline"
                  >
                    {p.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">
                  {formatDollars(p.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
