import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import agencies from "@/../public/data/agency-report-cards.json";

export const metadata = {
  title: "Federal Agency Report Cards: A to F Grades | OpenSpending",
  description:
    "The Pentagon has never passed an audit. NASA got 8 straight A's. We graded 24 agencies on growth, audits, and accountability.",
  openGraph: {
    title: "Federal Agency Report Cards: A to F Grades | OpenSpending",
    description:
      "The Pentagon has never passed an audit. NASA got 8 straight A's. We graded 24 agencies on growth, audits, and accountability.",
    url: "https://www.openspending.us/report-cards",
  },
};

const gradeColors: Record<string, { bg: string; text: string; border: string }> = {
  A: { bg: "bg-green-50", text: "text-green-700", border: "border-green-300" },
  B: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-300" },
  C: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-300" },
  D: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-300" },
  F: { bg: "bg-red-50", text: "text-red-700", border: "border-red-300" },
};

function fmt(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return `$${n.toLocaleString()}`;
}

export default function ReportCardsPage() {
  const passed = agencies.filter((a) => a.audit_passed === true).length;
  const failed = agencies.filter((a) => a.audit_passed === false).length;
  const withGrowth = agencies.filter((a) => a.growth_pct !== null);
  const avgGrowth =
    withGrowth.length > 0
      ? (withGrowth.reduce((s, a) => s + (a.growth_pct ?? 0), 0) / withGrowth.length).toFixed(1)
      : "N/A";

  const gradeGroups = ["A", "B", "C", "D", "F"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Analysis" }, { label: "Agency Report Cards" }]} />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          Federal Agency Report Cards
        </h1>
        <ShareButtons
          title="Federal Agency Report Cards — OpenSpending"
          url="https://www.openspending.us/report-cards"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published: February 2025</p>
      <p className="text-gray-500 text-lg mb-10">
        We graded 24 major agencies on growth, audit compliance, and financial accountability.
      </p>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-green-700">{passed}</div>
          <div className="text-sm text-green-600 mt-1">Agencies Passed Audit</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-red-700">{failed}</div>
          <div className="text-sm text-red-600 mt-1">Agencies Failed Audit</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-gray-700">{avgGrowth}%</div>
          <div className="text-sm text-gray-600 mt-1">Average Budget Growth</div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-10">
        <p className="text-lg font-semibold text-amber-900 mb-2">Key Finding</p>
        <p className="text-amber-800">
          The Department of Defense received an <strong>F</strong> — it has{" "}
          <em>never</em> passed a financial audit while spending $1.4 trillion per year.
          Meanwhile, the Department of the Treasury earned an <strong>A</strong> with 10
          consecutive clean audits. NASA also earned an A with 8 straight clean audits on a
          fraction of the budget.
        </p>
      </div>

      {/* Agency Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
        {agencies
          .sort((a, b) => {
            const order = { A: 0, B: 1, C: 2, D: 3, F: 4 };
            const diff = (order[a.grade as keyof typeof order] ?? 5) - (order[b.grade as keyof typeof order] ?? 5);
            return diff !== 0 ? diff : b.budget - a.budget;
          })
          .map((agency) => {
            const colors = gradeColors[agency.grade] || gradeColors.C;
            return (
              <Link
                key={agency.code}
                href={`/agencies/${agency.slug}`}
                className={`${colors.bg} border ${colors.border} rounded-xl p-4 hover:shadow-md transition-shadow block`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight pr-2">
                    {agency.name}
                  </h3>
                  <span className={`text-2xl font-black ${colors.text} shrink-0`}>
                    {agency.grade}
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Budget: {fmt(agency.budget)}</div>
                  {agency.growth_pct !== null && (
                    <div>
                      Growth:{" "}
                      <span className={agency.growth_pct > 50 ? "text-red-600 font-medium" : ""}>
                        {agency.growth_pct > 0 ? "+" : ""}
                        {agency.growth_pct}%
                      </span>
                    </div>
                  )}
                  <div>
                    Audit:{" "}
                    {agency.audit_passed === true
                      ? "✅ Passed"
                      : agency.audit_passed === false
                        ? "❌ Failed"
                        : "⚪ N/A"}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>

      {/* Grade Distribution */}
      <div className="mb-12">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Grade Distribution</h2>
        <div className="flex flex-wrap gap-3">
          {gradeGroups.map((grade) => {
            const count = agencies.filter((a) => a.grade === grade).length;
            const colors = gradeColors[grade];
            return (
              <div
                key={grade}
                className={`${colors.bg} border ${colors.border} rounded-lg px-5 py-3 text-center`}
              >
                <div className={`text-2xl font-black ${colors.text}`}>{grade}</div>
                <div className="text-sm text-gray-600">
                  {count} {count === 1 ? "agency" : "agencies"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Methodology */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Methodology</h2>
        <p className="text-gray-700 mb-3">
          Each agency was scored on a 100-point scale based on three factors:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>
            <strong>Audit compliance (40%):</strong> Whether the agency received a clean financial
            audit opinion from its Inspector General, plus consecutive audit streak.
          </li>
          <li>
            <strong>Budget growth (30%):</strong> Year-over-year spending growth compared to
            inflation. Agencies growing faster than inflation are penalized.
          </li>
          <li>
            <strong>Financial accountability (30%):</strong> Improper payment rates, GAO high-risk
            list status, and overall fiscal management.
          </li>
        </ul>
        <p className="text-gray-700">
          <strong>Grades:</strong> A = 85-100 | B = 75-84 | C = 65-74 | D = 55-64 | F = Below 55
        </p>
      </div>

      {/* Editorial */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-10">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
          The Bottom Line: No Audit, No Increase
        </h2>
        <p className="text-gray-700 mb-3">
          Here&apos;s a simple proposition: if an agency can&apos;t tell you where the money went,
          it shouldn&apos;t get more money. The Department of Defense has failed every single audit
          since audits became mandatory — seven consecutive failures — while receiving budget
          increases every year. The Department of Homeland Security has <em>never</em> received a
          clean opinion.
        </p>
        <p className="text-gray-700 mb-3">
          In what universe does a private company get to double its budget after admitting it
          can&apos;t account for the first half? Only in Washington. The audit requirement exists for
          a reason — financial transparency is the bare minimum of accountability.
        </p>
        <p className="text-gray-700">
          Congress should condition budget increases on clean audit opinions. It&apos;s not radical
          — it&apos;s basic accounting. Until agencies demonstrate they can manage what they have,
          giving them more is irresponsible.
        </p>
      </div>

      {/* Cross Links */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Related</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { href: "/agencies", label: "All Agencies", desc: "97 federal agency profiles" },
            { href: "/pentagon-deep-dive", label: "Pentagon Deep Dive", desc: "The Pentagon's blank check" },
            { href: "/waste", label: "Waste & Fraud", desc: "$233-521B lost annually" },
            { href: "/efficiency", label: "Government Efficiency", desc: "Accountability tracker" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="font-medium text-blue-600">{link.label}</div>
              <div className="text-xs text-gray-500 mt-1">{link.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
