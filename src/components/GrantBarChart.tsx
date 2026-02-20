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

interface Recipient {
  name: string;
  amount: number;
  category: string;
}

const COLORS: Record<string, string> = {
  Medicaid: "#dc2626",
  Education: "#2563eb",
  Transportation: "#059669",
  "Emergency Services": "#d97706",
  Other: "#6b7280",
};

function formatShortName(name: string): string {
  // Shorten long agency names
  return name
    .replace(/DEPARTMENT OF /gi, "Dept. ")
    .replace(/DEPARTMENT /gi, "Dept. ")
    .replace(/, CALIFORNIA/gi, " (CA)")
    .replace(/ CALIFORNIA/gi, " (CA)")
    .replace(/, NEW YORK/gi, " (NY)")
    .replace(/ NEW YORK/gi, " (NY)")
    .replace(/ TENNESSEE/gi, " (TN)")
    .replace(/ MISSO$/gi, " (MO)")
    .slice(0, 45);
}

function formatBillions(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(0)}M`;
  return `$${value.toLocaleString()}`;
}

export function GrantBarChart({ data }: { data: Recipient[] }) {
  const top20 = data.slice(0, 20).map((d) => ({
    ...d,
    shortName: formatShortName(d.name),
    amountB: d.amount / 1e9,
  }));

  return (
    <div className="w-full" style={{ height: top20.length * 36 + 40 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={top20} layout="vertical" margin={{ left: 200, right: 60, top: 5, bottom: 5 }}>
          <XAxis
            type="number"
            tickFormatter={(v: number) => `$${v.toFixed(0)}B`}
            fontSize={12}
          />
          <YAxis
            type="category"
            dataKey="shortName"
            width={195}
            fontSize={11}
            tick={{ fill: "#374151" }}
          />
          <Tooltip
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [formatBillions((value ?? 0) * 1e9), "Amount"]}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            labelFormatter={(label: any) => String(label)}
          />
          <Bar dataKey="amountB" radius={[0, 4, 4, 0]}>
            {top20.map((entry, index) => (
              <Cell key={index} fill={COLORS[entry.category] || COLORS.Other} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
