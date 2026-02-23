import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Downloads | OpenSpending",
  description: "Download raw federal spending datasets as JSON. Sourced from USASpending.gov — free for research, journalism, and analysis.",
  openGraph: {
    title: "Data Downloads | OpenSpending",
    description: "Download raw federal spending datasets as JSON. Sourced from USASpending.gov — free for research, journalism, and analysis.",
  },
};

const dataFiles = [
  {
    filename: "stats.json",
    description:
      "Summary statistics — $11.2T budget, $779B contracts, $1.24T grants, 97 agencies",
  },
  {
    filename: "agencies.json",
    description:
      "97 federal agencies with budget authority, obligations, and outlays",
  },
  {
    filename: "agency-spending.json",
    description: "41 agencies with contracts vs grants breakdown",
  },
  {
    filename: "agency-trends.json",
    description: "18 major agencies budget trends FY2017–2026",
  },
  {
    filename: "agency-contractors.json",
    description: "Top contractors per agency",
  },
  {
    filename: "top-contractors.json",
    description: "Top 50 federal contractors FY2025",
  },
  {
    filename: "top-contractors-deduped.json",
    description: "Top contractors with subsidiaries merged",
  },
  {
    filename: "contractor-trends.json",
    description: "18 contractors with multi-year spending trends",
  },
  {
    filename: "top-awards.json",
    description: "100 largest individual federal contracts",
  },
  {
    filename: "top-grant-recipients.json",
    description: "Top 50 grant recipients FY2025",
  },
  {
    filename: "top-industries.json",
    description: "Top 50 NAICS industries by contract spending",
  },
  {
    filename: "no-bid-contracts.json",
    description: "50 largest sole-source (no-bid) contracts",
  },
  {
    filename: "covid-spending.json",
    description: "$1.46T in COVID emergency spending",
  },
  {
    filename: "usaid-deep-dive.json",
    description: "USAID spending analysis — budget tripled from $15B to $50B",
  },
  {
    filename: "spending-by-state.json",
    description: "Federal contract spending by state and territory",
  },
  {
    filename: "spending-by-country.json",
    description: "Top 50 countries receiving federal spending",
  },
  {
    filename: "yearly-contract-trends.json",
    description: "Yearly contract spending trends across fiscal years",
  },
  {
    filename: "county-spending.json",
    description: "Federal spending by county — top 100 counties",
  },
  {
    filename: "product-service-codes.json",
    description: "Top 100 product/service codes by contract spending",
  },
  {
    filename: "subagencies.json",
    description: "100 federal sub-agencies with spending data",
  },
  {
    filename: "industry-details.json",
    description: "50 industries by NAICS code with contract spending",
  },
];

export default function DownloadsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Data Downloads
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        Raw federal spending datasets, ready to analyze. All files are JSON
        format.
      </p>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
        <p className="text-indigo-900 font-medium">
          All data sourced from{" "}
          <a
            href="https://www.usaspending.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-indigo-700"
          >
            USASpending.gov
          </a>
          . Free to use for research, journalism, or any purpose. If you build
          something with this data,{" "}
          <Link href="/about" className="underline hover:text-indigo-700">
            let us know
          </Link>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataFiles.map((file) => (
          <a
            key={file.filename}
            href={`/data/${file.filename}`}
            download
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-mono text-sm font-semibold text-indigo-700 group-hover:text-indigo-800 truncate">
                  {file.filename}
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {file.description}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          {dataFiles.length} datasets available &middot; JSON format &middot;
          FY2025 data
        </p>
        <Link
          href="/about"
          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
        >
          Learn about our methodology &rarr;
        </Link>
      </div>
    </div>
  );
}
