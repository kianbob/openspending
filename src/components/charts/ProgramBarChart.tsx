"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Link from "next/link";

interface Program {
  name: string;
  amount: number;
  rank: number;
  slug: string;
}

function formatBillions(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(0)}M`;
  return `$${value.toLocaleString()}`;
}

function shortName(name: string): string {
  return name.length > 35 ? name.slice(0, 32) + "…" : name;
}

const COLORS = [
  "#4f46e5", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe",
  "#4f46e5", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe",
  "#4f46e5", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe",
  "#4f46e5", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe",
];

export function ProgramBarChart({ data }: { data: Program[] }) {
  const chartData = data.slice(0, 20).map((d) => ({
    ...d,
    shortName: shortName(d.name),
  }));

  return (
    <div className="w-full h-[600px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 200, right: 40, top: 10, bottom: 10 }}>
          <XAxis type="number" tickFormatter={formatBillions} />
          <YAxis
            type="category"
            dataKey="shortName"
            width={190}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number | undefined) => [formatBillions(value ?? 0), "Amount"]}
            labelFormatter={(label: any) => label}
          />
          <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={i === 0 ? "#dc2626" : COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
