import Link from "next/link";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";
import { SortableTable } from "@/components/SortableTable";
import { formatDollars } from "@/lib/format";
import allCountries from "@/../public/data/international-spending.json";

export const metadata = {
  title: "Where US Dollars Go Abroad — OpenSpending",
  description:
    "Most international federal spending is defense, not aid. Japan and Germany cost more than direct aid to most countries. See where $87B+ goes abroad.",
  openGraph: {
    title: "Where US Dollars Go Abroad — OpenSpending",
    description:
      "Most international federal spending is defense, not aid. Japan and Germany cost more than direct aid to most countries. See where $87B+ goes abroad.",
  },
};

function titleCase(str: string): string {
  return str
    .split(/([,]\s*)/)
    .map((segment) =>
      segment.includes(",")
        ? segment
        : segment
            .split(/\s+/)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ")
    )
    .join("");
}

// --- Category classification ---

const MILITARY: Set<string> = new Set([
  "JAPAN", "GERMANY", "KOREA, SOUTH", "KUWAIT", "QATAR", "BAHRAIN", "DJIBOUTI",
  "DIEGO GARCIA", "CUBA", "SPAIN", "ITALY", "GREECE", "PORTUGAL", "TURKEY",
  "ICELAND", "GREENLAND", "SINGAPORE", "AUSTRALIA", "BELGIUM", "NORWAY",
  "UNITED KINGDOM", "NETHERLANDS", "HONDURAS", "PHILIPPINES",
  "BRITISH INDIAN OCEAN TERRITORY",
]);

const AID: Set<string> = new Set([
  "UKRAINE", "KENYA", "IRAQ", "HAITI", "ETHIOPIA", "TANZANIA", "UGANDA",
  "NIGERIA", "EL SALVADOR", "ZAMBIA", "SOUTH SUDAN", "SOMALIA", "SUDAN",
  "GHANA", "MALAWI", "CONGO (KINSHASA)", "AFGHANISTAN", "JORDAN", "EGYPT",
  "LEBANON", "COLOMBIA", "SOUTH AFRICA", "GAZA STRIP", "WEST BANK", "RWANDA",
  "BENIN", "VIETNAM", "SIERRA LEONE", "SENEGAL", "COTE D'IVOIRE", "BANGLADESH",
  "PAKISTAN", "GUATEMALA", "MOLDOVA", "GEORGIA", "LAOS", "MADAGASCAR", "PERU",
  "ECUADOR", "DOMINICAN REPUBLIC", "COSTA RICA", "PANAMA", "MOROCCO", "LESOTHO",
  "SOLOMON ISLANDS",
]);

const TRADE: Set<string> = new Set([
  "CANADA", "SWITZERLAND", "MEXICO", "ISRAEL", "SWEDEN", "FRANCE", "DENMARK",
  "AUSTRIA", "UNITED ARAB EMIRATES", "THAILAND", "ARGENTINA", "INDIA",
  "NEW ZEALAND", "HONG KONG", "TAIWAN", "ROMANIA", "HUNGARY", "BRAZIL",
  "CHILE", "MALAYSIA", "CZECH REPUBLIC", "RUSSIA", "IRELAND", "BAHAMAS, THE",
  "SYRIA", "POLAND", "SAUDI ARABIA", "ANTARCTICA",
]);

function getCategory(name: string): string {
  if (MILITARY.has(name)) return "Military Presence";
  if (AID.has(name)) return "Aid & Development";
  if (TRADE.has(name)) return "Trade & Allies";
  return "Other";
}

// --- Data preparation ---

const countries = allCountries.filter(
  (c): c is { name: string; amount: number; code: string } =>
    c.name != null && c.name !== "UNITED STATES"
);

const top20 = countries.slice(0, 20).map((c) => ({
  name: titleCase(c.name),
  amount: c.amount,
}));

const militaryTotal = countries
  .filter((c) => MILITARY.has(c.name))
  .reduce((sum, c) => sum + c.amount, 0);
const aidTotal = countries
  .filter((c) => AID.has(c.name))
  .reduce((sum, c) => sum + c.amount, 0);
const tradeTotal = countries
  .filter((c) => TRADE.has(c.name))
  .reduce((sum, c) => sum + c.amount, 0);

const columns = [
  { key: "name", label: "Country", format: "text" as const },
  { key: "code", label: "Code", format: "text" as const },
  { key: "category", label: "Category", format: "text" as const },
  {
    key: "amount",
    label: "Amount",
    format: "dollars" as const,
    align: "right" as const,
  },
];

const tableData = countries.map((c) => ({
  name: titleCase(c.name),
  code: c.code,
  category: getCategory(c.name),
  amount: c.amount,
}));

export default function InternationalSpendingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">
        Where US Dollars Go Abroad
      </h1>
      <p className="text-sm text-gray-500 mb-2">Updated: May 2025</p>
      <p className="text-gray-500 text-lg mb-8">
        Of $5.33 trillion in federal spending, $5.24T (98.4%) stays in the US.
        Here is where the remaining 1.6% goes.
      </p>

      {/* Editorial Intro */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-red-900 mb-2">
          Defense, Not Aid
        </h2>
        <p className="text-red-800">
          Most international spending is actually defense — our military bases in
          Japan and Germany cost more than direct aid to most countries. When
          politicians debate &ldquo;foreign aid,&rdquo; they rarely mention the{" "}
          <span className="font-bold">$5.1B flowing to Japan</span> for military
          bases. The real story of international spending is about projecting
          American power, not charity.
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Spending by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Military Presence</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatDollars(militaryTotal)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Bases in Japan, Germany, Korea, Kuwait &amp; more
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Aid &amp; Development</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatDollars(aidTotal)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Ukraine, Kenya, Iraq, Haiti, Ethiopia &amp; more
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Trade &amp; Allies</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatDollars(tradeTotal)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Canada, Switzerland, Mexico, Israel &amp; more
            </p>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Top 20 Countries by Federal Spending
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <HorizontalBarChart
            data={top20}
            height={650}
            color="#4338ca"
            labelWidth={140}
          />
        </div>
      </div>

      {/* Full Table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        All Countries
      </h2>
      <SortableTable
        columns={columns}
        data={tableData}
        defaultSortKey="amount"
      />

      {/* Cross-links */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/usaid"
          className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 hover:bg-indigo-100 transition-colors"
        >
          <p className="font-bold text-indigo-900">USAID Deep Dive</p>
          <p className="text-indigo-800 text-sm">
            The 100 largest USAID grants and the budget explosion.
          </p>
        </Link>
        <Link
          href="/foreign-aid"
          className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 hover:bg-indigo-100 transition-colors"
        >
          <p className="font-bold text-indigo-900">Foreign Aid</p>
          <p className="text-indigo-800 text-sm">
            Where U.S. tax dollars go abroad — the original dataset.
          </p>
        </Link>
        <Link
          href="/pentagon-spending"
          className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 hover:bg-indigo-100 transition-colors"
        >
          <p className="font-bold text-indigo-900">Pentagon Spending</p>
          <p className="text-indigo-800 text-sm">
            The defense budget deep dive — where most international dollars go.
          </p>
        </Link>
      </div>
    </div>
  );
}
