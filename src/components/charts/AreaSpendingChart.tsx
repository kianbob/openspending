"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatDollars } from "@/lib/format";

interface YearData {
  fy: number;
  budget: number;
  obligated: number;
  outlays: number;
}

export function AreaSpendingChart({ data }: { data: YearData[] }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="fy" fontSize={12} tick={{ fill: "#6b7280" }} />
        <YAxis
          tickFormatter={(v) => formatDollars(v)}
          fontSize={12}
          tick={{ fill: "#6b7280" }}
        />
        <Tooltip
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any, name: any) => [
            formatDollars(Number(value) || 0),
            String(name).charAt(0).toUpperCase() + String(name).slice(1),
          ]}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        />
        <Area
          type="monotone"
          dataKey="budget"
          stroke="#4338ca"
          fill="#c7d2fe"
          strokeWidth={2}
          name="Budget Authority"
        />
        <Area
          type="monotone"
          dataKey="outlays"
          stroke="#dc2626"
          fill="#fecaca"
          strokeWidth={2}
          name="Outlays"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
