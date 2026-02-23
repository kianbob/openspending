import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";
import recipients from "@/../public/data/top-grant-recipients.json";

export const metadata: Metadata = {
  title: "Top Federal Grant Recipients — Who Gets Billions? | OpenSpending",
  description:
    "California's Medicaid agency received $112B in federal grants. See the top 50 grant recipients and where federal aid actually flows.",
  openGraph: {
    title: "Top Federal Grant Recipients — Who Gets Billions? | OpenSpending",
    description:
      "California's Medicaid agency received $112B in federal grants. See the top 50 grant recipients.",
    url: "https://www.openspending.us/grants/recipients",
  },
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(/[\s]+/)
    .map((w) => (w.length > 2 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default function GrantRecipientsPage() {
  const sorted = [...(recipients as { name: string; amount: number }[])].sort(
    (a, b) => b.amount - a.amount
  );

  const totalAmount = sorted.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Grants", href: "/grants" }, { label: "Recipients" }]} />

      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3">
          Top Federal Grant Recipients
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          These {sorted.length} organizations received{" "}
          <span className="font-semibold text-indigo-700">
            {formatDollars(totalAmount)}
          </span>{" "}
          in federal grants. Most are state Medicaid and health agencies — the
          primary channel for federal healthcare funding.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                #
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Recipient
              </th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Total Grants
              </th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                % of Total
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 hover:bg-indigo-50/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-400 font-medium">
                  {i + 1}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/grants/recipients/${slugify(r.name)}`}
                    className="text-sm font-medium text-indigo-700 hover:text-indigo-900 hover:underline"
                  >
                    {toTitleCase(r.name)}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                  {formatDollars(r.amount)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 text-right">
                  {((r.amount / totalAmount) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <ShareButtons title="Top Federal Grant Recipients" url="https://www.openspending.us/grants/recipients" />
        <Link
          href="/grants"
          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
        >
          ← Back to Grants Overview
        </Link>
      </div>
    </div>
  );
}
