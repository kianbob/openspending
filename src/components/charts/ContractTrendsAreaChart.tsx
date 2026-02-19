"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { formatDollars } from "@/lib/format";

interface YearData {
  fy: number;
  totalContracts: number;
}

export function ContractTrendsAreaChart({
  data,
  height = 350,
  showCovidLine = true,
}: {
  data: YearData[];
  height?: number;
  showCovidLine?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
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
          formatter={(value: any) => [
            formatDollars(Number(value) || 0),
            "Total Contracts",
          ]}
          labelFormatter={(label) => `FY${label}`}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        />
        {showCovidLine && (
          <ReferenceLine
            x={2020}
            stroke="#dc2626"
            strokeDasharray="4 4"
            label={{
              value: "COVID",
              position: "top",
              fill: "#dc2626",
              fontSize: 11,
            }}
          />
        )}
        <Area
          type="monotone"
          dataKey="totalContracts"
          stroke="#4338ca"
          fill="#c7d2fe"
          strokeWidth={2}
          name="Total Contracts"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
