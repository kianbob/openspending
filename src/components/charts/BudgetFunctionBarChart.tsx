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
import { formatDollars } from "@/lib/format";

interface BarDatum {
  name: string;
  amount: number;
}

export function BudgetFunctionBarChart({ data }: { data: BarDatum[] }) {
  return (
    <div style={{ width: "100%", height: 600 }} role="img" aria-label="Horizontal bar chart of federal budget functions by FY2025 spending">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
          <XAxis
            type="number"
            tickFormatter={(v) => formatDollars(v)}
            fontSize={12}
            tick={{ fill: "#6b7280" }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={180}
            fontSize={11}
            tick={{ fill: "#374151" }}
          />
          <Tooltip
            formatter={(value: number | undefined) => [formatDollars(value ?? 0), "FY2025"]}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
            {data.map((_, index) => (
              <Cell
                key={index}
                fill="#6366f1"
                fillOpacity={1 - index * 0.03}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
