import Link from "next/link";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { LocalSpendingTabs } from "@/components/LocalSpendingTabs";
import { formatDollars } from "@/lib/format";
import allCounties from "@/../public/data/county-spending.json";
import allDistricts from "@/../public/data/district-spending.json";

export const metadata = {
  title: "Follow the Money: County & District Spending — OpenSpending",
  description:
    "Federal spending flows into every county and congressional district in America. See which counties and districts receive the most federal contract dollars.",
  openGraph: {
    title: "Follow the Money: County & District Spending — OpenSpending",
    description:
      "Federal spending flows into every county and congressional district in America. See which counties and districts receive the most federal contract dollars.",
  },
};

function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const counties = (allCounties as { name: string | null; amount: number; code: string | null }[])
  .filter((c): c is { name: string; amount: number; code: string } => c.name !== null)
  .map((c) => ({
    name: titleCase(c.name),
    amount: c.amount,
    code: c.code,
  }));

const districts = (allDistricts as { name: string; amount: number }[]).map((d) => ({
  name: d.name,
  amount: d.amount,
}));

const top10Counties = counties.slice(0, 10);
const top10Districts = districts.slice(0, 10);
const top20CountiesChart = counties.slice(0, 20).map((c) => ({
  name: c.name,
  amount: c.amount,
}));

export default function LocalSpendingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">
        Follow the Money: County &amp; District Spending
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        Where federal dollars land — by county and congressional district.
      </p>

      {/* Editorial Intro */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-green-900 mb-2">
          Your Backyard, Their Budget
        </h2>
        <p className="text-green-800">
          Federal spending isn&apos;t just a DC thing — it flows into every county in
          America. Your congressperson&apos;s district receives billions in federal
          contracts and grants. The question is: who benefits, and is the money
          well spent?
        </p>
      </div>

      {/* Top 10 Counties */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 10 Counties by Federal Spending
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {top10Counties.map((c) => (
            <div
              key={c.name + c.code}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
            >
              <p className="text-sm font-medium text-gray-700 truncate">
                {c.name}
              </p>
              <p className="text-lg font-bold text-indigo-700 mt-1">
                {formatDollars(c.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Top 10 Districts */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 10 Congressional Districts by Federal Spending
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {top10Districts.map((d) => (
            <div
              key={d.name}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
            >
              <p className="text-sm font-medium text-gray-700 truncate">
                {d.name}
              </p>
              <p className="text-lg font-bold text-indigo-700 mt-1">
                {formatDollars(d.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Switcher - Counties / Districts Tables */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Full Spending Tables
        </h2>
        <LocalSpendingTabs counties={counties} districts={districts} />
      </div>

      {/* Bar Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 20 Counties by Federal Spending
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart
            data={top20CountiesChart}
            height={650}
            color="#4338ca"
            labelWidth={160}
          />
        </div>
      </div>

      {/* Cross-links */}
      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        <Link
          href="/states"
          className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 hover:bg-indigo-100 transition-colors block"
        >
          <p className="font-bold text-indigo-900">State Spending</p>
          <p className="text-indigo-800 text-sm">
            See how federal contract dollars flow to each state.
          </p>
        </Link>
        <Link
          href="/state-dependency"
          className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 hover:bg-indigo-100 transition-colors block"
        >
          <p className="font-bold text-indigo-900">State Dependency</p>
          <p className="text-indigo-800 text-sm">
            Which states are donors and which are takers?
          </p>
        </Link>
      </div>
    </div>
  );
}
