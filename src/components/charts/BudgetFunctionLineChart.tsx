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

interface DataPoint {
  year: string;
  amount: number;
}

export function BudgetFunctionLineChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#6b7280" }} />
        <YAxis
          tickFormatter={(v: number) => formatDollars(v)}
          tick={{ fontSize: 12, fill: "#6b7280" }}
          width={80}
        />
        <Tooltip
          formatter={(value: number | undefined) => [formatDollars(value ?? 0), "Spending"]}
          labelFormatter={(label) => String(label)}
        />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#6366f1"
          strokeWidth={2.5}
          dot={{ r: 5, fill: "#6366f1" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
