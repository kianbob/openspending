"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import rawData from "@/../public/data/spending-growth.json";

const formatDollars = (n: number) => {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  return `$${n.toLocaleString()}`;
};

const data = rawData.map((d: { fy: number; total: number; growth_pct?: number }) => ({
  fy: `FY${d.fy}`,
  total: d.total,
  growth_pct: d.growth_pct ?? 0,
}));

export default function SpendingGrowthChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-[400px] bg-gray-50 rounded-xl animate-pulse" />;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 30, right: 20, bottom: 5, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="fy" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(v: number) => formatDollars(v)} tick={{ fontSize: 11 }} width={70} />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Tooltip formatter={(value: any) => [formatDollars(value), "Total Spending"]} />
        <Bar dataKey="total" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.growth_pct < 0 ? "#dc2626" : "#4f46e5"} />
          ))}
          <LabelList
            dataKey="growth_pct"
            position="top"
            formatter={(v: unknown) => { const n = Number(v); return n ? `${n > 0 ? "+" : ""}${n}%` : ""; }}
            style={{ fontSize: 10, fill: "#6b7280" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
