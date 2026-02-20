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
import { formatDollars, toTitleCase } from "@/lib/format";

interface Contractor {
  name: string;
  amount: number;
}

export function AgencyContractorsChart({ data }: { data: Contractor[] }) {
  const chartData = data.slice(0, 10).map((c) => ({
    name: toTitleCase(c.name)
      .split(" ")
      .slice(0, 2)
      .join(" ")
      .replace(/,$/g, ""),
    fullName: toTitleCase(c.name),
    amount: c.amount,
  }));

  return (
    <ResponsiveContainer width="100%" height={Math.max(300, chartData.length * 40)}>
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
          width={140}
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
  );
}
