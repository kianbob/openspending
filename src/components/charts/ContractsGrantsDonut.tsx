"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatDollars } from "@/lib/format";

interface Props {
  contracts: number;
  grants: number;
}

const COLORS = ["#4f46e5", "#059669"]; // indigo-600, emerald-600

export function ContractsGrantsDonut({ contracts, grants }: Props) {
  if (contracts <= 0 || grants <= 0) return null;

  const data = [
    { name: "Contracts", value: contracts },
    { name: "Grants", value: grants },
  ];

  const total = contracts + grants;

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => formatDollars(Number(value) || 0)}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex gap-6 mt-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
          <span className="text-gray-600">
            Contracts {((contracts / total) * 100).toFixed(0)}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
          <span className="text-gray-600">
            Grants {((grants / total) * 100).toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
}
