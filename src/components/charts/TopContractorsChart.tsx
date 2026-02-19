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

interface Contractor {
  name: string;
  amount: number;
}

export function TopContractorsChart({ data }: { data: Contractor[] }) {
  const chartData = data.map((c) => ({
    name: c.name
      .split(" ")
      .slice(0, 2)
      .join(" ")
      .replace(/,$/g, ""),
    fullName: c.name,
    amount: c.amount,
  }));

  return (
    <div role="img" aria-label="Bar chart showing top federal contractors by spending amount">
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
        <XAxis
          type="number"
          tickFormatter={(v) => formatDollars(v)}
          fontSize={12}
          tick={{ fill: "#6b7280" }}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={130}
          fontSize={11}
          tick={{ fill: "#374151" }}
        />
        <Tooltip
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any) => [formatDollars(Number(value) || 0), "Amount"]}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          labelFormatter={(label: any, payload: any) =>
            payload?.[0]?.payload?.fullName || label
          }
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        />
        <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
          {chartData.map((_, index) => (
            <Cell
              key={index}
              fill={index === 0 ? "#4338ca" : "#6366f1"}
              fillOpacity={1 - index * 0.06}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}
