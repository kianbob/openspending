import { SortableTable } from "@/components/SortableTable";
import agencies from "@/../public/data/agencies.json";

export const metadata = {
  title: "Federal Agencies — OpenSpending",
  description: "All 97 federal agencies ranked by budget authority, obligations, and outlays.",
};

const columns = [
  { key: "name", label: "Agency", format: "text" as const },
  { key: "abbreviation", label: "Abbr", format: "text" as const },
  { key: "budgetAuthority", label: "Budget Authority", format: "dollars" as const, align: "right" as const },
  { key: "obligated", label: "Obligated", format: "dollars" as const, align: "right" as const },
  { key: "outlays", label: "Outlays", format: "dollars" as const, align: "right" as const },
  { key: "pctOfTotal", label: "% of Total", format: "percent" as const, align: "right" as const },
];

const tableData = agencies.map((a) => ({
  name: a.name,
  abbreviation: a.abbreviation,
  budgetAuthority: a.budgetAuthority,
  obligated: a.obligated,
  outlays: a.outlays,
  pctOfTotal: a.pctOfTotal,
}));

export default function AgenciesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Federal Agencies
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        All {agencies.length} federal agencies, ranked by budget authority. Sort
        by any column. Search by name or abbreviation.
      </p>
      <SortableTable
        columns={columns}
        data={tableData}
        defaultSortKey="budgetAuthority"
      />
    </div>
  );
}
