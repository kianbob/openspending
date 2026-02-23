import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { formatDollars } from "@/lib/format";
import recipients from "@/../public/data/top-grant-recipients-detailed.json";

type Recipient = { name: string; amount: number };

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "");
}

function titleCase(str: string): string {
  const lower = [
    "a", "an", "the", "and", "but", "or", "for", "nor", "of", "at", "by", "in", "to",
  ];
  return str
    .split(/\s+/)
    .map((w, i) => {
      const lw = w.toLowerCase();
      if (i === 0 || !lower.includes(lw))
        return lw.charAt(0).toUpperCase() + lw.slice(1);
      return lw;
    })
    .join(" ");
}

const data = (recipients as Recipient[]).map((r, i) => ({
  ...r,
  slug: slugify(r.name),
  rank: i + 1,
  displayName: titleCase(r.name),
}));

function findBySlug(slug: string) {
  return data.find((r) => r.slug === slug);
}

export function generateStaticParams() {
  return data.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = findBySlug(slug);
  if (!r) return { title: "Grant Recipient Not Found — OpenSpending" };
  const title = `${r.displayName} | Federal Grant Recipient | OpenSpending`;
  const description = `${formatDollars(r.amount)} in federal grants to ${r.displayName} — ranked #${r.rank} of top 50 recipients. Follow the money.`;
  return { title, description, openGraph: { title, description } };
}

export default async function GrantRecipientPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = findBySlug(slug);
  if (!r) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: "Grants", href: "/grants" },
          { label: r.displayName },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">
          {r.displayName}
        </h1>
        <ShareButtons
          title={`${r.displayName} — ${formatDollars(r.amount)} in federal grants`}
          url={`https://www.openspending.us/grants/recipients/${r.slug}`}
        />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 mb-1">Total Grants Received</p>
          <p className="text-2xl md:text-3xl font-bold text-indigo-700">
            {formatDollars(r.amount)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 mb-1">Rank</p>
          <p className="text-2xl md:text-3xl font-bold text-indigo-700">
            #{r.rank} <span className="text-base font-normal text-gray-400">of 50</span>
          </p>
        </div>
      </div>

      {/* Context */}
      <section className="prose prose-gray max-w-none mb-10">
        <h2>About This Recipient</h2>
        <p>
          <strong>{r.displayName}</strong> is one of the top 50 recipients of
          federal grant funding, receiving a total of{" "}
          <strong>{formatDollars(r.amount)}</strong> in grants from the U.S.
          government. Federal grants fund a wide range of programs including
          Medicaid, education, transportation, emergency management, and social
          services. These funds are distributed to state agencies, local
          governments, and organizations to carry out federally-supported
          programs.
        </p>
      </section>

      {/* Related Links */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/grants"
            className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition"
          >
            <p className="font-medium text-indigo-700">All Grants</p>
            <p className="text-sm text-gray-500">$1.24T to states &amp; organizations</p>
          </Link>
          <Link
            href="/agencies"
            className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition"
          >
            <p className="font-medium text-indigo-700">Agencies</p>
            <p className="text-sm text-gray-500">Federal agency profiles</p>
          </Link>
          <Link
            href="/states"
            className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition"
          >
            <p className="font-medium text-indigo-700">States</p>
            <p className="text-sm text-gray-500">Spending by state</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
