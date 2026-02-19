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

interface StateContractorsChartProps {
  data: { name: string; amount: number }[];
}

export function StateContractorsChart({ data }: StateContractorsChartProps) {
  const filtered = data.filter((d) => d.name !== "MULTIPLE RECIPIENTS");
  const top5 = filtered.slice(0, 5);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={top5}
          layout="vertical"
          margin={{ left: 10, right: 30, top: 5, bottom: 5 }}
        >
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [formatDollars(Number(value) || 0), "Amount"]}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
            {top5.map((_, index) => (
              <Cell
                key={index}
                fill="#6366f1"
                fillOpacity={1 - index * 0.05}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
