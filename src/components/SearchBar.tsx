"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDollars } from "@/lib/format";
import agencySpending from "@/../public/data/agency-spending.json";
import contractors from "@/../public/data/top-contractors-deduped.json";
import industries from "@/../public/data/top-industries.json";

interface SearchResult {
  type: "agency" | "contractor" | "industry";
  name: string;
  amount: number;
  href: string;
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const a of agencySpending) {
    const slug = a.slug;
    if (!slug) continue;
    results.push({
      type: "agency",
      name: a.name,
      amount: (a.contracts || 0) + ("grants" in a ? (a.grants ?? 0) : 0),
      href: `/agencies/${slug}`,
    });
  }

  for (const c of contractors) {
    results.push({
      type: "contractor",
      name: c.name,
      amount: c.amount,
      href: "/contractors",
    });
  }

  for (const ind of industries) {
    results.push({
      type: "industry",
      name: ind.name,
      amount: ind.amount,
      href: "/industries",
    });
  }

  return results;
}

const typeLabel: Record<string, string> = {
  agency: "Agency",
  contractor: "Contractor",
  industry: "Industry",
};

const typeColor: Record<string, string> = {
  agency: "bg-indigo-100 text-indigo-700",
  contractor: "bg-emerald-100 text-emerald-700",
  industry: "bg-amber-100 text-amber-700",
};

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const index = useMemo(() => buildIndex(), []);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return index
      .filter((r) => r.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, index]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      setOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search agencies, contractors, industries..."
          aria-label="Search federal spending data"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </form>
      {open && results.length > 0 && (
        <div className="absolute z-50 top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
          {results.map((r, i) => (
            <Link
              key={`${r.type}-${i}`}
              href={r.href}
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${typeColor[r.type]}`}
                >
                  {typeLabel[r.type]}
                </span>
                <span className="text-sm text-gray-900 truncate">
                  {r.name}
                </span>
              </div>
              <span className="text-sm text-gray-500 font-medium ml-3 whitespace-nowrap">
                {formatDollars(r.amount)}
              </span>
            </Link>
          ))}
        </div>
      )}
      {open && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-sm text-gray-500 text-center">
          No results found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
