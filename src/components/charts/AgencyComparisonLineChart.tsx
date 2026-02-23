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
  Legend,
} from "recharts";
import { formatDollars } from "@/lib/format";

interface ChartRow {
  fy: number;
  [key: string]: number;
}

const COLORS: Record<string, string> = {
  DOD: "#4338ca",
  HHS: "#dc2626",
  USAID: "#d97706",
  VA: "#059669",
  Treasury: "#7c3aed",
};

export function AgencyComparisonLineChart({
  data,
  agencies,
}: {
  data: ChartRow[];
  agencies: string[];
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div style={{ height: 400 }} />;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ left: 10, right: 30, top: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any, name: any) => [
            formatDollars(Number(value) || 0),
            String(name),
          ]}
          labelFormatter={(label) => `FY${label}`}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        />
        <Legend />
        {agencies.map((agency) => (
          <Line
            key={agency}
            type="monotone"
            dataKey={agency}
            stroke={COLORS[agency] || "#6366f1"}
            strokeWidth={2}
            dot={{ r: 3 }}
            name={agency}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
