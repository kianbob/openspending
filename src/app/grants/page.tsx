import Link from "next/link";
import { SortableTable } from "@/components/SortableTable";
import { GrantBarChart } from "@/components/GrantBarChart";
import recipients from "@/../public/data/top-grant-recipients-detailed.json";

export const metadata = {
  title: "Federal Grants: $1.24T to States | OpenSpending",
  description:
    "Most federal \"grants\" are Medicaid transfers. California alone gets $112.5B. See the top 50 grant recipients for FY2025.",
  openGraph: {
    title: "Federal Grants: $1.24T to States | OpenSpending",
    description:
      "Most federal \"grants\" are Medicaid transfers. California alone gets $112.5B. See the top 50 grant recipients for FY2025.",
  },
};

function categorize(name: string): string {
  const n = name.toUpperCase();
  if (
    n.includes("MEDICAID") ||
    n.includes("HEALTH") ||
    n.includes("HUMAN SERVICES") ||
    n.includes("HUMAN SVC") ||
    n.includes("SOCIAL SERV") ||
    n.includes("SOCIAL & HEALTH") ||
    n.includes("MEDICAL ASSIST") ||
    n.includes("FAMILY") ||
    n.includes("TEMPORARY & DISABILITY") ||
    n.includes("COST CONTAINMENT")
  )
    return "Medicaid";
  if (n.includes("EDUCATION") || n.includes("EDUCATION")) return "Education";
  if (n.includes("TRANSPORT") || n.includes("RAILROAD")) return "Transportation";
  if (n.includes("EMERGENCY")) return "Emergency Services";
  return "Other";
}

const enriched = recipients.map((r) => ({
  ...r,
  category: categorize(r.name),
}));

const totalGrants = enriched.reduce((s, r) => s + r.amount, 0);

const categoryTotals = Object.entries(
  enriched.reduce(
    (acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + r.amount;
      return acc;
    },
    {} as Record<string, number>
  )
).sort((a, b) => b[1] - a[1]);

const categoryColors: Record<string, string> = {
  Medicaid: "bg-red-50 border-red-200 text-red-900",
  Education: "bg-blue-50 border-blue-200 text-blue-900",
  Transportation: "bg-emerald-50 border-emerald-200 text-emerald-900",
  "Emergency Services": "bg-amber-50 border-amber-200 text-amber-900",
  Other: "bg-gray-50 border-gray-200 text-gray-900",
};

const columns = [
  { key: "name", label: "Recipient", format: "text" as const },
  {
    key: "amount",
    label: "Amount",
    format: "dollars" as const,
    align: "right" as const,
  },
  { key: "category", label: "Category", format: "text" as const },
];

const tableData = enriched.map((r) => ({
  name: r.name,
  amount: r.amount,
  category: r.category,
}));

function formatB(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)} trillion`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)} billion`;
  return `$${(n / 1e6).toFixed(0)} million`;
}

export default function GrantsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        The Grant Machine: {formatB(totalGrants)} to States &amp; Organizations
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        Where federal grant money actually goes — and why most of it is
        Medicaid.
      </p>

      {/* Key insight */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">
        <p className="text-red-900 text-sm">
          <span className="font-bold">The big reveal:</span> Most federal
          &quot;grants&quot; are actually Medicaid transfers to states.
          California&apos;s Department of Health Care Services alone receives{" "}
          <span className="font-bold">$112.5 billion</span> — more than the
          entire budgets of most countries. The top 10 recipients are all state
          health agencies.
        </p>
      </div>

      {/* Category summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {categoryTotals.map(([cat, total]) => (
          <div
            key={cat}
            className={`border rounded-xl p-4 ${categoryColors[cat] || categoryColors.Other}`}
          >
            <div className="text-sm font-medium opacity-75">{cat}</div>
            <div className="text-2xl font-bold">{formatB(total)}</div>
            <div className="text-xs opacity-60">
              {enriched.filter((r) => r.category === cat).length} recipients ·{" "}
              {((total / totalGrants) * 100).toFixed(0)}% of total
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Top 20 Grant Recipients
      </h2>
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-10 overflow-x-auto">
        <GrantBarChart data={enriched} />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-8">
        {Object.entries({
          Medicaid: "#dc2626",
          Education: "#2563eb",
          Transportation: "#059669",
          "Emergency Services": "#d97706",
          Other: "#6b7280",
        }).map(([label, color]) => (
          <div key={label} className="flex items-center gap-2 text-sm text-gray-600">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
            {label}
          </div>
        ))}
      </div>

      {/* Table */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        All 50 Recipients
      </h2>
      <SortableTable
        columns={columns}
        data={tableData}
        defaultSortKey="amount"
        defaultSortDir="desc"
      />

      {/* Cross links */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            href: "/agencies",
            title: "Federal Agencies",
            desc: "See where grant money originates",
          },
          {
            href: "/healthcare-spending",
            title: "Healthcare Spending",
            desc: "The healthcare machine driving most grants",
          },
          {
            href: "/states",
            title: "Spending by State",
            desc: "Total federal dollars flowing to each state",
          },
          {
            href: "/state-dependency",
            title: "State Dependency",
            desc: "Which states take more than they give",
          },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="font-semibold text-gray-900">{link.title}</div>
            <div className="text-sm text-gray-500">{link.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
