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

export function HorizontalBarChart({
  data,
  height = 500,
  color = "#6366f1",
  labelWidth = 150,
}: {
  data: BarDatum[];
  height?: number;
  color?: string;
  labelWidth?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
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
          width={labelWidth}
          fontSize={11}
          tick={{ fill: "#374151" }}
        />
        <Tooltip
          formatter={(value: number) => [formatDollars(value), "Amount"]}
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
              fill={color}
              fillOpacity={1 - index * 0.03}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
