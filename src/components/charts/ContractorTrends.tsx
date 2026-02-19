"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatDollars } from "@/lib/format";

interface ContractorTrend {
  name: string;
  years: Record<string, number | undefined>;
}

export function ContractorTrends({ data }: { data: ContractorTrend[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((contractor) => {
        const chartData = Object.entries(contractor.years)
          .filter((entry): entry is [string, number] => entry[1] != null)
          .map(([year, amount]) => ({ year, amount }))
          .sort((a, b) => a.year.localeCompare(b.year));

        const shortName = contractor.name
          .split(" ")
          .slice(0, 3)
          .join(" ")
          .replace(/,$/g, "");

        return (
          <div
            key={contractor.name}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">
              {shortName}
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              {chartData[0]?.year}–{chartData[chartData.length - 1]?.year}
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart
                data={chartData}
                margin={{ left: 5, right: 10, top: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="year"
                  fontSize={10}
                  tick={{ fill: "#9ca3af" }}
                />
                <YAxis
                  tickFormatter={(v) => formatDollars(v)}
                  fontSize={10}
                  tick={{ fill: "#9ca3af" }}
                  width={55}
                />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [
                    formatDollars(Number(value) || 0),
                    "Amount",
                  ]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#4338ca"
                  strokeWidth={2}
                  dot={{ fill: "#4338ca", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
}
