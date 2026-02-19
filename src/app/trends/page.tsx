import { ContractTrendsAreaChart } from "@/components/charts/ContractTrendsAreaChart";
import { AgencyComparisonLineChart } from "@/components/charts/AgencyComparisonLineChart";
import { formatDollars } from "@/lib/format";
import Link from "next/link";
import contractTrends from "@/../public/data/yearly-contract-trends.json";
import agencyTrends from "@/../public/data/agency-trends.json";

type AgencyTrends = Record<
  string,
  { abbr: string; years: { fy: number; budget: number; obligated: number; outlays: number }[] }
>;

const trends = agencyTrends as AgencyTrends;

// Prepare contract area chart data
const contractData = contractTrends.map((y) => ({
  fy: y.fy,
  totalContracts: y.totalContracts,
}));

// Prepare multi-agency budget comparison (exclude FY2026 partial data)
const comparisonAgencies = ["DOD", "HHS", "USAID", "VA", "Treasury"];
const fyRange = trends["DOD"]?.years
  .filter((y) => y.fy <= 2025)
  .map((y) => y.fy) ?? [];

const comparisonData = fyRange.map((fy) => {
  const row: { fy: number; [key: string]: number } = { fy };
  for (const agency of comparisonAgencies) {
    const yearData = trends[agency]?.years.find((y) => y.fy === fy);
    if (yearData) row[agency] = yearData.budget;
  }
  return row;
});

// Key stats
const fy2017Contracts = contractTrends[0].totalContracts;
const fy2025Contracts = contractTrends[contractTrends.length - 1].totalContracts;
const contractGrowthPct = Math.round(
  ((fy2025Contracts - fy2017Contracts) / fy2017Contracts) * 100
);

const usaidData = trends["USAID"]?.years.filter((y) => y.fy <= 2025) ?? [];
const usaid2017 = usaidData.find((y) => y.fy === 2017)?.budget ?? 0;
const usaidPeak = usaidData.reduce(
  (max, y) => (y.budget > max.budget ? y : max),
  usaidData[0]
);

// COVID spike: FY2020 was the big jump in contracts
const fy2019 = contractTrends.find((y) => y.fy === 2019)?.totalContracts ?? 0;
const fy2020 = contractTrends.find((y) => y.fy === 2020)?.totalContracts ?? 0;
const covidSpikePct = Math.round(((fy2020 - fy2019) / fy2019) * 100);

export default function TrendsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-indigo-200 font-medium text-sm uppercase tracking-widest mb-4">
            Historical Analysis
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4">
            Federal Spending Over Time
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Nine years of contract and budget data reveal a government that keeps
            growing — with COVID as the accelerant and no sign of slowing down.
          </p>
        </div>
      </section>

      {/* Key Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Contract Spending Growth",
              value: `+${contractGrowthPct}%`,
              sub: `FY2017 → FY2025`,
            },
            {
              label: "FY2020 COVID Spike",
              value: `+${covidSpikePct}%`,
              sub: "Year-over-year jump in contracts",
            },
            {
              label: "USAID Peak Budget",
              value: formatDollars(usaidPeak.budget),
              sub: `FY${usaidPeak.fy} — up from ${formatDollars(usaid2017)}`,
            },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
            >
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {card.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contract Spending Over Time */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Total Contract Spending: FY2017–FY2025
        </h2>
        <p className="text-gray-500 mb-8">
          Federal contract spending has grown from {formatDollars(fy2017Contracts)}{" "}
          to {formatDollars(fy2025Contracts)} — a {contractGrowthPct}% increase in
          nine years.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <ContractTrendsAreaChart data={contractData} />
        </div>
      </section>

      {/* Insight Callouts */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Key Trends
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-2xl font-bold text-red-600 mb-2">
                FY2020: The COVID Spike
              </div>
              <p className="text-gray-600 text-sm">
                Contract spending surged {covidSpikePct}% in a single year as the
                government scrambled to respond to the pandemic. HHS and VA saw
                the biggest jumps. Much of this emergency spending bypassed
                normal competitive bidding.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-2xl font-bold text-amber-600 mb-2">
                USAID: Unchecked Growth
              </div>
              <p className="text-gray-600 text-sm">
                USAID&apos;s budget nearly doubled from {formatDollars(usaid2017)}{" "}
                (FY2017) to {formatDollars(usaidPeak.budget)} (FY{usaidPeak.fy}).
                That kind of growth — with minimal public scrutiny — is exactly
                what DOGE was created to address.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                No Sign of Slowing Down
              </div>
              <p className="text-gray-600 text-sm">
                Even after the COVID emergency ended, contract spending didn&apos;t
                return to pre-pandemic levels. FY2025 hit a new high of{" "}
                {formatDollars(fy2025Contracts)}. The ratchet effect in action —
                emergency spending becomes the new baseline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Budget Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Agency Budget Trajectories
        </h2>
        <p className="text-gray-500 mb-8">
          Budget authority for major agencies over time. DOD and HHS dwarf
          everything else — but watch the growth rates.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <AgencyComparisonLineChart
            data={comparisonData}
            agencies={comparisonAgencies}
          />
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Note: FY2026 excluded (partial year data). Budget authority shown.
        </p>
      </section>

      {/* Related Pages */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Dig Deeper
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                href: "/usaid",
                title: "The USAID Story",
                desc: "A deep dive into the agency whose budget tripled — and is now being gutted.",
              },
              {
                href: "/covid",
                title: "COVID Spending",
                desc: "$1.46 trillion in pandemic-related contracts and grants. Where did it all go?",
              },
              {
                href: "/agencies",
                title: "All Agencies",
                desc: "97 agencies, $11.2 trillion. Explore budget authority, obligations, and outlays.",
              },
            ].map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-2">
                  {cta.title}
                </h3>
                <p className="text-sm text-gray-500">{cta.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
