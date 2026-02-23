import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { SourceCitation } from "@/components/SourceCitation";
import { formatDollars, toTitleCase } from "@/lib/format";
import contractorsRaw from "@/../public/data/top-contractors-deduped.json";

export const metadata = {
  title: "Top 10 Government Contractors in 2025 | OpenSpending",
  description:
    "Lockheed Martin: $58.8B. The top 10 hold 23.5% of all federal contracts — nearly all defense. See who gets your money and how much.",
  keywords: "biggest government contractors, top government contractors 2025, who gets the most government contracts, federal contractors list",
  alternates: { canonical: "https://www.openspending.us/biggest-government-contractors-2025" },
  openGraph: {
    title: "Top 10 Government Contractors in 2025 | OpenSpending",
    description:
      "Lockheed Martin: $58.8B. The top 10 hold 23.5% of all federal contracts — nearly all defense. See who gets your money and how much.",
    url: "https://www.openspending.us/biggest-government-contractors-2025",
    type: "article",
  },
};

const contractors = contractorsRaw.slice(0, 10).map((c) => ({
  name: toTitleCase(c.name),
  amount: c.amount,
  pct: c.pctOfAllContracts,
  costPerTaxpayer: c.costPerTaxpayer,
  category: c.category,
}));

const top10Total = contractors.reduce((sum, c) => sum + c.amount, 0);
const top10Pct = contractors.reduce((sum, c) => sum + c.pct, 0);

const profiles: Record<string, { description: string; employees?: string; hq?: string }> = {
  "Lockheed Martin Corporation": {
    description: "The world's largest defense contractor. Makes the F-35 fighter jet, Hellfire missiles, and runs critical military satellite systems.",
    employees: "~122,000",
    hq: "Bethesda, MD",
  },
  "Optum Public Sector Solutions, Inc.": {
    description: "A UnitedHealth Group subsidiary managing government healthcare IT systems including Medicare and Medicaid claims processing.",
    employees: "Subsidiary",
    hq: "Eden Prairie, MN",
  },
  "Electric Boat Corporation": {
    description: "A General Dynamics subsidiary that builds nuclear submarines — Virginia-class and Columbia-class — for the U.S. Navy.",
    employees: "~18,000",
    hq: "Groton, CT",
  },
  "Raytheon Company": {
    description: "Now part of RTX Corporation. Builds Patriot missiles, Tomahawk cruise missiles, and advanced radar systems.",
    employees: "Subsidiary",
    hq: "Arlington, VA",
  },
  "The Boeing Company": {
    description: "Builds military aircraft (F/A-18, Apache helicopters, KC-46 tanker), satellites, and the Space Launch System.",
    employees: "~170,000",
    hq: "Arlington, VA",
  },
  "Triwest Healthcare Alliance Corp": {
    description: "Administers the TRICARE health program for military families in the western United States.",
    employees: "~4,500",
    hq: "Phoenix, AZ",
  },
  "Mckesson Corporation": {
    description: "One of the largest pharmaceutical distributors in the U.S. Distributes drugs and medical supplies to VA hospitals and military facilities.",
    employees: "~51,000",
    hq: "Irving, TX",
  },
  "Huntington Ingalls Incorporated": {
    description: "America's largest military shipbuilder. Builds aircraft carriers and amphibious assault ships at Newport News, VA.",
    employees: "~44,000",
    hq: "Newport News, VA",
  },
  "Amerisourcebergen Drug Corp": {
    description: "Now Cencora. Major pharmaceutical distributor supplying medications to federal healthcare facilities.",
    employees: "~46,000",
    hq: "Conshohocken, PA",
  },
  "Rtx Corporation": {
    description: "Parent company of Raytheon, Pratt & Whitney, and Collins Aerospace. The second-largest defense contractor by revenue.",
    employees: "~185,000",
    hq: "Arlington, VA",
  },
};

export default function BiggestContractorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Investigations", href: "/investigations" }, { label: "Biggest Government Contractors 2025" }]} />

      <div className="flex items-center justify-between mt-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          The 10 Companies That Get the Most Government Money in 2025
        </h1>
        <ShareButtons title="The 10 Companies That Get the Most Government Money in 2025" />
      </div>

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        In FY2025, the federal government awarded hundreds of billions in contracts. But the money is
        remarkably concentrated: just <strong>10 companies</strong> received{" "}
        <strong>{formatDollars(top10Total)}</strong> — <strong>{top10Pct.toFixed(1)}%</strong> of all
        federal contracts. Here&apos;s who they are and what they do with your money.
      </p>

      {/* The Top 10 Table */}
      <div className="bg-gray-50 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Top 10</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2 font-semibold text-gray-900">#</th>
                <th className="text-left py-2 font-semibold text-gray-900">Company</th>
                <th className="text-right py-2 font-semibold text-gray-900">Contract Value</th>
                <th className="text-right py-2 font-semibold text-gray-900">% of All Contracts</th>
                <th className="text-right py-2 font-semibold text-gray-900">Cost/Taxpayer</th>
                <th className="text-left py-2 font-semibold text-gray-900">Sector</th>
              </tr>
            </thead>
            <tbody>
              {contractors.map((c, i) => (
                <tr key={c.name} className="border-b border-gray-200 hover:bg-indigo-50">
                  <td className="py-3 text-gray-500">{i + 1}</td>
                  <td className="py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="text-right py-3 font-mono text-gray-900">{formatDollars(c.amount)}</td>
                  <td className="text-right py-3 text-gray-600">{c.pct.toFixed(1)}%</td>
                  <td className="text-right py-3 text-gray-600">${c.costPerTaxpayer.toFixed(0)}</td>
                  <td className="py-3 text-gray-500">{c.category}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-400 font-bold">
                <td className="py-3"></td>
                <td className="py-3 text-gray-900">Total (Top 10)</td>
                <td className="text-right py-3 font-mono text-gray-900">{formatDollars(top10Total)}</td>
                <td className="text-right py-3 text-gray-900">{top10Pct.toFixed(1)}%</td>
                <td className="text-right py-3 text-gray-900">
                  ${contractors.reduce((s, c) => s + c.costPerTaxpayer, 0).toFixed(0)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Contractor Profiles */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Who Are These Companies?</h2>
        <div className="space-y-6">
          {contractors.map((c, i) => {
            const profile = profiles[c.name];
            return (
              <div key={c.name} className="border-l-4 border-indigo-500 pl-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    {i + 1}. {c.name}
                  </h3>
                  <span className="text-lg font-mono font-bold text-indigo-600">{formatDollars(c.amount)}</span>
                </div>
                {profile && (
                  <>
                    <p className="text-gray-700 mt-1">{profile.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {profile.hq && <>HQ: {profile.hq}</>}
                      {profile.employees && <> · Employees: {profile.employees}</>}
                      {" · "}Cost to you: ${c.costPerTaxpayer.toFixed(0)}/year
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* The Concentration Problem */}
      <div className="bg-amber-50 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">The Concentration Problem</h2>
        <p className="text-gray-800 leading-relaxed mb-3">
          When 10 companies hold nearly a quarter of all federal contracts, that&apos;s not a free market —
          it&apos;s an oligopoly funded by taxpayers. These companies have massive lobbying operations,
          employ former Pentagon officials, and enjoy contracts that renew year after year with limited
          competition.
        </p>
        <p className="text-gray-800 leading-relaxed">
          The revolving door between the Pentagon and defense contractors is well-documented. A 2021 study
          found that 80% of retiring three- and four-star generals went to work for defense contractors
          or consultants. When the people writing the requirements are the same people bidding on the
          contracts, taxpayers lose.
        </p>
      </div>

      {/* The Defense Dominance */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">It&apos;s (Almost) All Defense</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Of the top 10 contractors, the majority are defense companies or serve military healthcare needs.
          Lockheed Martin alone receives more than the entire budgets of the Department of Education,
          the EPA, and NASA <em>combined</em>. The question isn&apos;t whether national defense matters —
          it does. The question is whether this level of concentration, with this little oversight, is
          serving taxpayers or shareholders.
        </p>
        <p className="text-gray-700 leading-relaxed">
          For the full picture, see the{" "}
          <Link href="/contractor-monopoly" className="text-indigo-600 hover:underline">Contractor Monopoly analysis</Link> or
          explore all <Link href="/contractors" className="text-indigo-600 hover:underline">federal contractors</Link>.
        </p>
      </div>

      {/* Related */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/contractors" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">All Federal Contractors</p>
            <p className="text-sm text-gray-600 mt-1">Browse every company that receives federal contracts</p>
          </Link>
          <Link href="/contractor-monopoly" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">The Contractor Monopoly</p>
            <p className="text-sm text-gray-600 mt-1">How 10 companies control 64% of all federal contract dollars</p>
          </Link>
          <Link href="/top-10" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">Top 10 Interactive</p>
            <p className="text-sm text-gray-600 mt-1">Deep dive into the companies that run the government</p>
          </Link>
          <Link href="/no-bid" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
            <p className="font-bold text-gray-900">No-Bid Nation</p>
            <p className="text-sm text-gray-600 mt-1">$74B in contracts awarded without competition</p>
          </Link>
        </div>
      </div>

      <SourceCitation />
    </div>
  );
}
