import Link from "next/link";
import { formatDollars } from "@/lib/format";
import industries from "@/../public/data/industry-details.json";
import type { Metadata } from "next";

type Industry = {
  code: string;
  name: string;
  slug: string;
  amount: number;
  rank: number;
  pctOfTotal: number;
};

const allIndustries = industries as Industry[];
const bySlug = Object.fromEntries(allIndustries.map((i) => [i.slug, i]));
// Also index by code for fallback
const byCode = Object.fromEntries(allIndustries.map((i) => [i.code, i]));

const editorialCallouts: Record<string, string> = {
  "336411": "Aircraft manufacturing is dominated by defense giants like Lockheed Martin and Boeing, producing fighter jets, transport aircraft, and helicopters for the military. The federal government is by far the largest customer for military aircraft, making this the #1 industry for contract spending.",
  "541330": "Engineering services firms design everything from military bases to bridges. Federal agencies rely heavily on private engineering contractors for infrastructure, weapons systems design, and environmental remediation projects.",
  "524114": "Health insurance carriers receive massive federal payments through TRICARE (military health), Medicare Advantage, and the Federal Employees Health Benefits Program. Optum, Humana, and other insurers process billions in government-funded healthcare.",
  "541715": "R&D contractors conduct cutting-edge research for the Department of Defense, NASA, and the Department of Energy. From advanced materials to biodefense, the federal government funds research it considers too risky or strategic for the private sector alone.",
  "336611": "Shipbuilding is essentially a government-funded industry — the U.S. Navy is the primary customer. Companies like Huntington Ingalls and General Dynamics build aircraft carriers, submarines, and destroyers that cost billions each.",
  "561210": "Facilities support services companies manage and maintain federal buildings, military bases, and government installations worldwide. This includes everything from janitorial services to complex base operations support.",
  "336414": "Guided missile and space vehicle manufacturing covers ICBMs, missile defense systems, and space launch vehicles. Companies like Raytheon, Lockheed Martin, and Northrop Grumman dominate this highly classified sector.",
  "541512": "Computer systems design firms build and maintain the IT infrastructure that runs the federal government. From cybersecurity to cloud migration, these contractors are essential to modernizing aging government technology.",
  "236220": "Commercial and institutional building construction covers military barracks, VA hospitals, federal courthouses, and embassy construction. The Army Corps of Engineers and GSA are major clients.",
  "541519": "Other computer services is a catch-all for IT support, help desks, and technology consulting. The federal government's massive and often outdated IT infrastructure requires constant contractor support.",
};

export function generateStaticParams() {
  return allIndustries.map((i) => ({ code: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const industry = bySlug[code] || byCode[code];
  if (!industry) return { title: "Industry Not Found — OpenSpending" };
  return {
    title: `${industry.name} — Federal Spending by Industry — OpenSpending`,
    description: `The federal government spent ${formatDollars(industry.amount)} on ${industry.name} (NAICS ${industry.code}), ranking #${industry.rank} among all industries.`,
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const industry = bySlug[code] || byCode[code];

  if (!industry) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Industry Not Found</h1>
        <p className="mt-4">
          <Link href="/industries" className="text-indigo-600 hover:underline">
            ← Back to All Industries
          </Link>
        </p>
      </main>
    );
  }

  const callout = editorialCallouts[industry.code];

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <Link
        href="/industries"
        className="text-indigo-600 hover:underline text-sm"
      >
        ← All Industries
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mt-4 font-serif">
        {industry.name}
      </h1>
      <p className="text-gray-500 mt-2">
        NAICS {industry.code} · Rank #{industry.rank} · {industry.pctOfTotal}%
        of federal contracts
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white border rounded-lg p-6 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Total Contract Value
          </p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {formatDollars(industry.amount)}
          </p>
        </div>
        <div className="bg-white border rounded-lg p-6 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            National Rank
          </p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            #{industry.rank}
          </p>
        </div>
        <div className="bg-white border rounded-lg p-6 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            % of Total
          </p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {industry.pctOfTotal}%
          </p>
        </div>
      </div>

      {/* Editorial Callout */}
      {callout && (
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h2 className="font-semibold text-lg mb-2">
            Why Does This Industry Get Federal Money?
          </h2>
          <p className="text-gray-700">{callout}</p>
        </div>
      )}

      {/* Explore More */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Explore More</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/industries"
            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition"
          >
            All Industries
          </Link>
          <Link
            href="/contractors"
            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition"
          >
            Top Contractors
          </Link>
          <Link
            href="/agencies"
            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition"
          >
            Federal Agencies
          </Link>
        </div>
      </div>
    </main>
  );
}
