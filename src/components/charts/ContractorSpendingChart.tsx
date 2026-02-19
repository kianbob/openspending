"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatDollars } from "@/lib/format";

interface TrendDatum {
  fy: number;
  amount: number;
}

export function ContractorSpendingChart({ data }: { data: TrendDatum[] }) {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 10, right: 30, top: 10, bottom: 5 }}>
          <XAxis
            dataKey="fy"
            fontSize={12}
            tick={{ fill: "#6b7280" }}
            tickFormatter={(v) => `FY${v}`}
          />
          <YAxis
            tickFormatter={(v) => formatDollars(v)}
            fontSize={12}
            tick={{ fill: "#6b7280" }}
          />
          <Tooltip
            formatter={(value: number | undefined) => [formatDollars(Number(value) || 0), "Amount"]}
            labelFormatter={(label) => `FY${label}`}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ fill: "#6366f1", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
