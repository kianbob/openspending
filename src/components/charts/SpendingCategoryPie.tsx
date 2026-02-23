"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const CATEGORIES = [
  { name: "Healthcare (HHS)", value: 2024, color: "#4f46e5" },
  { name: "Social Security", value: 1635, color: "#7c3aed" },
  { name: "Interest on Debt", value: 900, color: "#dc2626" },
  { name: "Defense", value: 501, color: "#059669" },
  { name: "Veterans Affairs", value: 288, color: "#d97706" },
  { name: "Other", value: 987, color: "#6b7280" },
];

const total = CATEGORIES.reduce((sum, c) => sum + c.value, 0);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderLabel = (props: any) => {
  const { name, value, x, y, midAngle } = props;
  const pct = ((value / total) * 100).toFixed(1);
  const anchor = midAngle > 180 ? "end" : "start";
  return (
    <text x={x} y={y} textAnchor={anchor} fill="#374151" fontSize={11}>
      {`${name} (${pct}%)`}
    </text>
  );
};

export default function SpendingCategoryPie() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-[400px] bg-gray-50 rounded-xl animate-pulse" />;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={CATEGORIES}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          label={renderLabel}
          labelLine={{ stroke: "#9ca3af" }}
        >
          {CATEGORIES.map((c, i) => (
            <Cell key={i} fill={c.color} />
          ))}
        </Pie>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Tooltip formatter={(value: any) => [`$${value}B`, "Spending"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
