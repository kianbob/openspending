"use client";

import { useState, useEffect } from "react";
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
  fy: number;
  actual?: number | null;
  projected?: number | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tooltipFormatter: any = (value: any, name: any) => [
  formatDollars(Number(value) || 0),
  name === "actual" ? "Actual" : "CBO Projection",
];

export function InterestLineChart({ data }: { data: DataPoint[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div style={{ width: "100%", height: 350 }} />;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="fy" tick={{ fontSize: 12, fill: "#6b7280" }} />
        <YAxis
          tickFormatter={(v: number) => formatDollars(v)}
          tick={{ fontSize: 12, fill: "#6b7280" }}
          width={80}
        />
        <Tooltip
          formatter={tooltipFormatter}
          labelFormatter={((label: number) => `FY${label}`) as any}
        />
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#dc2626"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "#dc2626" }}
          connectNulls={false}
        />
        <Line
          type="monotone"
          dataKey="projected"
          stroke="#dc2626"
          strokeWidth={2.5}
          strokeDasharray="8 4"
          dot={{ r: 4, fill: "#fff", stroke: "#dc2626", strokeWidth: 2 }}
          connectNulls={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
