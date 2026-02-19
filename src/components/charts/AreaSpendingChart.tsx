"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
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
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="line"
          wrapperStyle={{ fontSize: "13px" }}
        />
        <Area
          type="monotone"
          dataKey="budget"
          stroke="#4f46e5"
          fill="#e0e7ff"
          fillOpacity={0.3}
          strokeWidth={2}
          name="Budget Authority"
        />
        <Area
          type="monotone"
          dataKey="obligated"
          stroke="#059669"
          fill="#d1fae5"
          fillOpacity={0.3}
          strokeWidth={2}
          name="Obligated"
        />
        <Area
          type="monotone"
          dataKey="outlays"
          stroke="#f59e0b"
          fill="#fef3c7"
          fillOpacity={0.3}
          strokeWidth={2}
          name="Outlays"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
