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

interface AgencyDatum {
  name: string;
  amount: number;
}

export function ContractorAgenciesChart({ data }: { data: AgencyDatum[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const top = data.slice(0, 10);

  if (top.length <= 1) {
    const item = top[0];
    return item ? (
      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-6">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">Primary Agency</p>
          <p className="text-lg font-bold text-gray-900 mt-1">{item.name}</p>
        </div>
        <p className="text-2xl font-bold text-indigo-600">{formatDollars(item.amount)}</p>
      </div>
    ) : null;
  }

  if (!mounted) {
    return <div style={{ width: "100%", height: Math.max(300, top.length * 45) }} />;
  }

  const height = Math.max(300, top.length * 45);

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={top}
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
            width={160}
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
            {top.map((_, index) => (
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
