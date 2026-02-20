import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedPages } from "@/components/RelatedPages";
import { ShareButtons } from "@/components/ShareButtons";
import awards from "@/../public/data/top-awards.json";
import contractors from "@/../public/data/top-contractors.json";
import agencies from "@/../public/data/agencies.json";

type Award = {
  awardId: string;
  recipient: string;
  amount: number;
  agency: string;
  description: string;
  startDate: string;
};

function slugify(awardId: string): string {
  return awardId.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/, "");
}

function slugifyContractor(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "");
}

function formatDollars(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

function formatFullDollars(n: number): string {
  return `$${n.toLocaleString()}`;
}

function formatDate(d: string): string {
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const sortedAwards = [...(awards as Award[])].sort((a, b) => b.amount - a.amount);
const awardBySlug = new Map(sortedAwards.map((a) => [slugify(a.awardId), a]));
const rankMap = new Map(sortedAwards.map((a, i) => [a.awardId, i + 1]));

const contractorSlugs = new Set(
  (contractors as Array<{ name: string }>).map((c) => slugifyContractor(c.name))
);

const agencySlugMap = new Map(
  (agencies as Array<{ name: string; slug: string }>)
    .filter((a) => !!a.slug)
    .map((a) => [a.name, a.slug])
);

export function generateStaticParams() {
  return (awards as Award[]).map((a) => ({ slug: slugify(a.awardId) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const award = awardBySlug.get(slug);
  if (!award) return { title: "Contract Not Found — OpenSpending" };
  const title = award.description
    ? `${award.description.slice(0, 60)} — OpenSpending`
    : `Contract ${award.awardId} — OpenSpending`;
  return {
    title,
    description: `${formatDollars(award.amount)} contract awarded to ${award.recipient} by ${award.agency}. One of the 100 largest federal contracts.`,
    openGraph: {
      title,
      description: `${formatFullDollars(award.amount)} awarded to ${award.recipient}`,
      url: `https://www.openspending.us/contracts/${slug}`,
    },
  };
}

export default async function ContractDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const award = awardBySlug.get(slug);
  if (!award) notFound();

  const rank = rankMap.get(award.awardId)!;
  const recipientSlug = slugifyContractor(award.recipient);
  const hasContractorPage = contractorSlugs.has(recipientSlug);
  const agencySlug = agencySlugMap.get(award.agency);

  const heading = award.description
    ? award.description.length > 120
      ? award.description.slice(0, 120) + "…"
      : award.description
    : `Contract ${award.awardId}`;

  const stats = [
    { label: "Contract Amount", value: formatFullDollars(award.amount), accent: true },
    { label: "Recipient", value: award.recipient },
    { label: "Awarding Agency", value: award.agency },
    { label: "Start Date", value: formatDate(award.startDate) },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Contracts", href: "/contracts" },
          { label: award.awardId },
        ]}
      />

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-2">
        {heading}
      </h1>

      <p className="text-indigo-600 font-semibold text-sm mb-8">
        #{rank} of 100 largest federal contracts
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`rounded-xl border p-5 ${
              s.accent
                ? "bg-indigo-50 border-indigo-200"
                : "bg-white border-gray-200"
            }`}
          >
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
              {s.label}
            </p>
            <p
              className={`text-lg font-bold ${
                s.accent ? "text-indigo-700" : "text-gray-900"
              }`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Context */}
      <div className="prose prose-gray max-w-none mb-10">
        <h2 className="font-serif text-2xl font-bold">Context</h2>
        <p>
          This {formatDollars(award.amount)} contract was awarded to{" "}
          <strong>{award.recipient}</strong> by the{" "}
          <strong>{award.agency}</strong> starting{" "}
          {formatDate(award.startDate)}.{" "}
          {award.description && (
            <>It covers: {award.description.toLowerCase()}.</>
          )}
        </p>
      </div>

      {/* About Recipient */}
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
          About the Recipient
        </h2>
        {hasContractorPage ? (
          <p className="text-gray-700">
            <Link
              href={`/contractors/${recipientSlug}`}
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              {award.recipient}
            </Link>{" "}
            is one of the top federal contractors. View their full profile to see
            all contracts and spending trends.
          </p>
        ) : (
          <p className="text-gray-600">
            {award.recipient} received this contract. No detailed contractor profile is available yet.
          </p>
        )}
      </div>

      {/* About Agency */}
      <div className="mb-10">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
          About the Agency
        </h2>
        {agencySlug ? (
          <p className="text-gray-700">
            This contract was awarded by the{" "}
            <Link
              href={`/agencies/${agencySlug}`}
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              {award.agency}
            </Link>
            . View their full spending breakdown.
          </p>
        ) : (
          <p className="text-gray-600">
            This contract was awarded by the {award.agency}.
          </p>
        )}
      </div>

      <ShareButtons
        title={`${formatDollars(award.amount)} contract: ${heading}`}
        url={`https://www.openspending.us/contracts/${slug}`}
      />

      <RelatedPages items={[
        { href: "/contracts", title: "All Contracts", description: "Browse the 100 largest federal contracts." },
        { href: "/no-bid", title: "No-Bid Contracts", description: "Sole-source awards without competition." },
        { href: "/contractors", title: "Top Contractors", description: "Who captures the most federal dollars." },
        { href: "/agencies", title: "Federal Agencies", description: "Agency budgets and spending breakdowns." },
      ]} />
    </div>
  );
}
