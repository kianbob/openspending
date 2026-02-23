"use client";

import { useState, useEffect } from "react";
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
  valueFormat,
}: {
  data: BarDatum[];
  height?: number;
  color?: string;
  labelWidth?: number;
  formatValue?: never;
  valueFormat?: "dollars" | "ratio";
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const fmt = valueFormat === "ratio" ? (v: number) => `$${v.toFixed(2)}` : formatDollars;

  if (!mounted) {
    return <div style={{ width: "100%", height }} />;
  }

  return (
    <div style={{ width: "100%", minWidth: 300, height }} role="img" aria-label="Horizontal bar chart of federal spending data">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
          <XAxis
            type="number"
            tickFormatter={(v) => fmt(v)}
            fontSize={12}
            tick={{ fill: "#6b7280" }}
            domain={[0, "dataMax"]}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={labelWidth}
            fontSize={11}
            tick={{ fill: "#374151" }}
          />
          <Tooltip
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [fmt(Number(value) || 0), "Amount"]}
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
    </div>
  );
}
