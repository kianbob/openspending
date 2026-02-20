import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedPages } from "@/components/RelatedPages";
import { ShareButtons } from "@/components/ShareButtons";
import { BudgetFunctionLineChart } from "@/components/charts/BudgetFunctionLineChart";
import { formatDollars, formatDollarsLong } from "@/lib/format";
import budgetFunctions from "@/../public/data/budget-functions.json";

type BudgetFunction = (typeof budgetFunctions)[number];

const byCode = new Map(budgetFunctions.map((f) => [f.code, f]));
const sorted = [...budgetFunctions].sort(
  (a, b) => b.years.fy2025 - a.years.fy2025
);

const descriptions: Record<string, string> = {
  "570":
    "Medicare covers health insurance for Americans 65 and older and certain disabled individuals. It's the largest single budget function, driven by an aging population and rising healthcare costs. Hospital Insurance (Part A) and Supplementary Medical Insurance (Parts B & D) make up the bulk of spending.",
  "650":
    "Social Security provides retirement, survivor, and disability benefits to over 70 million Americans. As the baby boom generation retires and cost-of-living adjustments increase, this mandatory program continues its steady upward trajectory.",
  "050":
    "National Defense encompasses the Department of Defense, nuclear weapons programs, and defense-related activities. Spending includes military personnel, operations & maintenance, procurement, and research & development across all service branches.",
  "900":
    "Net Interest represents the federal government's cost of servicing the national debt. With debt levels exceeding $36 trillion and interest rates rising from historic lows, this category has exploded — growing 166% since 2017, faster than any other major function.",
  "550":
    "Health covers Medicaid, the Children's Health Insurance Program (CHIP), and other federal health programs excluding Medicare. Medicaid alone serves over 90 million Americans and accounts for the majority of spending in this function.",
  "600":
    "Income Security includes unemployment compensation, food & nutrition assistance (SNAP), Supplemental Security Income, the Earned Income Tax Credit, and housing assistance. This function spiked dramatically during COVID-19 due to expanded unemployment benefits and stimulus payments.",
  "800":
    "General Government covers the legislative branch, tax collection (IRS), financial management, and other central fiscal operations. This function also includes items like interest on tax refunds and undistributed offsetting receipts.",
  "700":
    "Veterans Benefits and Services funds the Department of Veterans Affairs, including healthcare, disability compensation, education (GI Bill), and housing programs for over 18 million veterans. Growth has been driven by expanded PACT Act toxic exposure benefits.",
  "500":
    "Education, Training, Employment, and Social Services covers student financial aid, K-12 education programs, job training, and social services. COVID-era relief significantly boosted this category, though spending has since moderated.",
  "400":
    "Transportation funds highways, transit, aviation, railroads, and maritime programs. The Infrastructure Investment and Jobs Act (2021) provided significant new funding, boosting this function well above historical levels.",
  "300":
    "Natural Resources and Environment covers pollution control, water resources, conservation, land management, and recreational resources. Increased funding for climate-related programs and infrastructure resilience has driven recent growth.",
  "750":
    "Administration of Justice includes federal law enforcement (FBI, DEA, ATF), the federal judiciary, federal prisons, immigration enforcement, and border security. ICE and CBP operations account for a growing share.",
  "450":
    "Community and Regional Development funds disaster relief (FEMA), community development block grants, and area/regional development programs. Natural disaster frequency and severity have driven significant spending increases.",
  "370":
    "Commerce and Housing Credit covers the mortgage credit programs (FHA, Ginnie Mae), the Postal Service, and deposit insurance. COVID-era Small Business Administration lending caused the massive 2021 spike.",
  "350":
    "Agriculture includes farm income stabilization programs, crop insurance, and agricultural research. Trade disruptions and commodity price fluctuations have driven significant growth, with farm subsidies expanding considerably.",
  "150":
    "International Affairs covers foreign economic and military aid, the State Department, and international financial programs. This function has declined as foreign aid budgets face political pressure, falling 38% since 2017.",
  "270":
    "Energy covers energy supply, conservation, emergency preparedness, and energy information programs. The Inflation Reduction Act and Infrastructure Investment and Jobs Act have dramatically increased clean energy spending.",
  "250":
    "General Science, Space, and Technology primarily funds NASA and the National Science Foundation. Steady but moderate growth reflects bipartisan support for space exploration and basic research.",
};

const yearKeys = ["fy2017", "fy2019", "fy2021", "fy2023", "fy2025"] as const;
const yearLabels = ["FY2017", "FY2019", "FY2021", "FY2023", "FY2025"];

export function generateStaticParams() {
  return budgetFunctions.map((f) => ({ code: f.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const fn = byCode.get(code);
  if (!fn) return { title: "Not Found — OpenSpending" };
  return {
    title: `${fn.name} — Federal Budget Function — OpenSpending`,
    description: `${fn.name}: ${formatDollars(fn.years.fy2025)} in FY2025, ranked #${fn.rank} of 18 budget functions. ${fn.growth_pct >= 0 ? "+" : ""}${fn.growth_pct.toFixed(0)}% growth since 2017.`,
    openGraph: {
      title: `${fn.name} — Federal Budget Function — OpenSpending`,
      description: `${fn.name}: ${formatDollars(fn.years.fy2025)} in FY2025. See historical spending trends.`,
    },
  };
}

export default async function BudgetFunctionDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const fn = byCode.get(code);
  if (!fn) notFound();

  const chartData = yearKeys.map((k, i) => ({
    year: yearLabels[i],
    amount: fn.years[k],
  }));

  const rankIndex = sorted.findIndex((f) => f.code === fn.code);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Budget Functions", href: "/budget-functions" },
          { label: fn.name },
        ]}
      />

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        {fn.name}
      </h1>

      {/* Big stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">FY2025 Spending</p>
          <p className="text-3xl font-bold text-indigo-600">
            {formatDollars(fn.years.fy2025)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">Rank</p>
          <p className="text-3xl font-bold text-gray-900">
            #{fn.rank} <span className="text-base font-normal text-gray-500">of 18</span>
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">Growth Since 2017</p>
          <p
            className={`text-3xl font-bold ${
              fn.growth_pct >= 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {fn.growth_pct >= 0 ? "+" : ""}
            {fn.growth_pct.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Line chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Spending Over Time: FY2017 → FY2025
        </h2>
        <BudgetFunctionLineChart data={chartData} />
      </div>

      {/* Year-over-year table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10 overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Year-over-Year Spending
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 pr-4 text-gray-600 font-medium">
                Fiscal Year
              </th>
              <th className="text-right py-2 pr-4 text-gray-600 font-medium">
                Amount
              </th>
              <th className="text-right py-2 text-gray-600 font-medium">
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {yearKeys.map((k, i) => {
              const amount = fn.years[k];
              const prev = i > 0 ? fn.years[yearKeys[i - 1]] : null;
              const change = prev ? ((amount - prev) / prev) * 100 : null;
              return (
                <tr key={k} className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-800">{yearLabels[i]}</td>
                  <td className="py-2 pr-4 text-right text-gray-800">
                    {formatDollarsLong(amount)}
                  </td>
                  <td className="py-2 text-right">
                    {change !== null ? (
                      <span
                        className={
                          change >= 0 ? "text-red-600" : "text-green-600"
                        }
                      >
                        {change >= 0 ? "+" : ""}
                        {change.toFixed(1)}%
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Context */}
      <div className="bg-gray-50 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          What This Covers
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {descriptions[fn.code] ||
            `${fn.name} is one of 18 major budget functions in the federal budget. In FY2025, it accounts for ${formatDollars(fn.years.fy2025)} in federal spending.`}
        </p>
      </div>

      {/* Rank among all 18 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          How This Category Ranks
        </h2>
        <div className="space-y-2">
          {sorted.map((f, i) => (
            <div
              key={f.code}
              className={`flex items-center justify-between py-1.5 px-3 rounded ${
                f.code === fn.code
                  ? "bg-indigo-50 border border-indigo-200"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 w-6">#{i + 1}</span>
                {f.code === fn.code ? (
                  <span className="font-semibold text-indigo-700">
                    {f.name}
                  </span>
                ) : (
                  <Link
                    href={`/budget-functions/${f.code}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {f.name}
                  </Link>
                )}
              </div>
              <span className="text-sm text-gray-600">
                {formatDollars(f.years.fy2025)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <RelatedPages items={[
        { href: "/budget-functions", title: "All Budget Functions", description: "Compare all federal budget functions by spending." },
        { href: "/spending-explosion", title: "Spending Explosion", description: "How federal spending has grown dramatically since 2017." },
        { href: "/your-tax-bill", title: "Your Tax Bill", description: "See exactly where your federal tax dollars go." },
        { href: "/interest", title: "Interest Time Bomb", description: "The growing cost of servicing the national debt." },
      ]} />

      <ShareButtons title={`${fn.name} — Federal Budget Function — OpenSpending`} />
    </div>
  );
}
