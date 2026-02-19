"use client";

import { useState } from "react";

const YEARS = ["FY2025", "FY2024", "FY2023", "FY2022", "FY2021", "FY2020"];

export function FiscalYearSelector() {
  const [selected, setSelected] = useState("FY2025");

  return (
    <div className="inline-flex items-center gap-2">
      <label
        htmlFor="fy-select"
        className="text-sm font-medium text-gray-500"
      >
        Fiscal Year
      </label>
      <select
        id="fy-select"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
      >
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
