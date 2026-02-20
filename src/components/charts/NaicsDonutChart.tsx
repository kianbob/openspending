"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatDollars } from "@/lib/format";

interface Sector {
  name: string;
  value: number;
}

const COLORS = [
  "#4f46e5", // indigo-600
  "#059669", // emerald-600
  "#d97706", // amber-600
  "#dc2626", // red-600
  "#7c3aed", // violet-600
  "#0891b2", // cyan-600
  "#ea580c", // orange-600
  "#6b7280", // gray-500
];

export function NaicsDonutChart({ sectors }: { sectors: Sector[] }) {
  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <Pie
            data={sectors}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={130}
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
          >
            {sectors.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any, _: any, entry: any) => [
              formatDollars(Number(value) || 0),
              entry.payload.name,
            ]}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-2 text-sm">
        {sectors.map((sector, i) => (
          <div key={sector.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-gray-600">
              {sector.name} — {formatDollars(sector.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
