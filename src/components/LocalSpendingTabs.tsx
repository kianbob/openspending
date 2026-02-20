"use client";

import { useState } from "react";
import { SortableTable } from "@/components/SortableTable";

interface CountyRow {
  [key: string]: unknown;
  name: string;
  amount: number;
  code: string;
}

interface DistrictRow {
  [key: string]: unknown;
  name: string;
  amount: number;
}

const countyColumns = [
  { key: "name", label: "County", format: "text" as const },
  { key: "code", label: "Code", format: "text" as const },
  { key: "amount", label: "Amount", format: "dollars" as const, align: "right" as const },
];

const districtColumns = [
  { key: "name", label: "District", format: "text" as const },
  { key: "amount", label: "Amount", format: "dollars" as const, align: "right" as const },
];

export function LocalSpendingTabs({
  counties,
  districts,
}: {
  counties: CountyRow[];
  districts: DistrictRow[];
}) {
  const [tab, setTab] = useState<"counties" | "districts">("counties");

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("counties")}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === "counties"
              ? "bg-indigo-600 text-white"
              : "bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50"
          }`}
        >
          Counties
        </button>
        <button
          onClick={() => setTab("districts")}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === "districts"
              ? "bg-indigo-600 text-white"
              : "bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50"
          }`}
        >
          Congressional Districts
        </button>
      </div>

      {tab === "counties" ? (
        <SortableTable
          columns={countyColumns}
          data={counties}
          defaultSortKey="amount"
        />
      ) : (
        <SortableTable
          columns={districtColumns}
          data={districts}
          defaultSortKey="amount"
        />
      )}
    </div>
  );
}
