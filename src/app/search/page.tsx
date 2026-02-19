"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatDollars } from "@/lib/format";
import agencies from "@/../public/data/agencies.json";
import contractorDetails from "@/../public/data/contractor-details.json";
import stateDetails from "@/../public/data/state-details.json";
import industries from "@/../public/data/top-industries.json";

interface SearchResult {
  category: "agency" | "contractor" | "state" | "industry";
  name: string;
  amount: number;
  href: string;
  sub?: string;
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const a of agencies) {
    results.push({
      category: "agency",
      name: a.name,
      amount: a.budgetAuthority,
      href: `/agencies/${a.slug}`,
      sub: a.abbreviation,
    });
  }

  for (const [slug, c] of Object.entries(
    contractorDetails as Record<string, { name: string; slug: string; totalAmount: number }>
  )) {
    results.push({
      category: "contractor",
      name: c.name,
      amount: c.totalAmount,
      href: `/contractors/${slug}`,
    });
  }

  for (const [, s] of Object.entries(
    stateDetails as Record<string, { name: string; slug: string; totalAmount: number; code: string }>
  )) {
    results.push({
      category: "state",
      name: s.name,
      amount: s.totalAmount,
      href: `/states/${s.slug}`,
      sub: s.code,
    });
  }

  for (const ind of industries) {
    results.push({
      category: "industry",
      name: ind.name,
      amount: ind.amount,
      href: `/industries`,
    });
  }

  return results;
}

const categoryLabel: Record<string, string> = {
  agency: "Agency",
  contractor: "Contractor",
  state: "State",
  industry: "Industry",
};

const categoryColor: Record<string, string> = {
  agency: "bg-indigo-100 text-indigo-700",
  contractor: "bg-emerald-100 text-emerald-700",
  state: "bg-sky-100 text-sky-700",
  industry: "bg-amber-100 text-amber-700",
};

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const index = useMemo(() => buildIndex(), []);

  const filtered = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return index.filter((r) => r.name.toLowerCase().includes(q));
  }, [query, index]);

  const grouped = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    for (const r of filtered) {
      if (!groups[r.category]) groups[r.category] = [];
      groups[r.category].push(r);
    }
    return groups;
  }, [filtered]);

  const categoryOrder = ["agency", "contractor", "state", "industry"] as const;
  const totalResults = filtered.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Search
      </h1>

      <form action="/search" method="GET" className="mb-8">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search agencies, contractors, states, industries..."
            className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
            autoFocus
          />
        </div>
      </form>

      {query.length >= 2 && totalResults === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-5xl mb-4">?</p>
          <p className="text-lg text-gray-600">
            No results found for &ldquo;{query}&rdquo;
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Try a different search term — you can search by agency name,
            contractor, state, or industry.
          </p>
        </div>
      )}

      {query.length > 0 && query.length < 2 && (
        <p className="text-sm text-gray-400">
          Type at least 2 characters to search.
        </p>
      )}

      {totalResults > 0 && (
        <p className="text-sm text-gray-500 mb-6">
          {totalResults} result{totalResults !== 1 ? "s" : ""} for &ldquo;
          {query}&rdquo;
        </p>
      )}

      {categoryOrder.map((cat) => {
        const items = grouped[cat];
        if (!items || items.length === 0) return null;
        return (
          <div key={cat} className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${categoryColor[cat]}`}
              >
                {categoryLabel[cat]}
              </span>
              <span className="text-sm text-gray-400 font-normal">
                {items.length} result{items.length !== 1 ? "s" : ""}
              </span>
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
              {items.map((r, i) => (
                <Link
                  key={`${r.category}-${i}`}
                  href={r.href}
                  className="flex items-center justify-between px-4 py-3 hover:bg-indigo-50 transition-colors"
                >
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-gray-900 truncate block">
                      {r.name}
                    </span>
                    {r.sub && (
                      <span className="text-xs text-gray-400">{r.sub}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 font-medium ml-4 whitespace-nowrap">
                    {formatDollars(r.amount)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {!query && (
        <div className="py-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Lockheed Martin",
              "Department of Defense",
              "California",
              "Raytheon",
              "Texas",
              "NASA",
            ].map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-indigo-300 hover:text-indigo-700 transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Search across agencies, contractors, states, and industries.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Search
          </h1>
          <div className="h-14 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
