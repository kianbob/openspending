"use client";

import { useState, useEffect } from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import states from "@/../public/data/spending-by-state.json";

const formatDollars = (n: number) => {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return `$${n.toLocaleString()}`;
};

const maxAmount = Math.max(...states.map((s) => s.amount));
const minAmount = Math.min(...states.map((s) => s.amount));

function interpolateColor(amount: number): string {
  const t = Math.log(amount - minAmount + 1) / Math.log(maxAmount - minAmount + 1);
  const r = Math.round(219 + (49 - 219) * t);
  const g = Math.round(234 + (46 - 234) * t);
  const b = Math.round(254 + (129 - 254) * t);
  return `rgb(${r},${g},${b})`;
}

const data = states.map((s) => ({
  name: s.code,
  fullName: s.name,
  size: s.amount,
  fill: interpolateColor(s.amount),
}));

interface ContentProps {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  size: number;
  fill: string;
}

const CustomContent = (props: ContentProps) => {
  const { x, y, width, height, name, size, fill } = props;
  if (width < 30 || height < 20) return null;
  const isDark = size > maxAmount * 0.15;
  const textColor = isDark ? "#fff" : "#1e1b4b";
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} stroke="#fff" strokeWidth={2} rx={4} />
      {width > 40 && height > 30 && (
        <>
          <text x={x + width / 2} y={y + height / 2 - 6} textAnchor="middle" fill={textColor} fontSize={width > 60 ? 13 : 10} fontWeight="bold">
            {name}
          </text>
          {width > 55 && height > 45 && (
            <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" fill={textColor} fontSize={9}>
              {formatDollars(size)}
            </text>
          )}
        </>
      )}
    </g>
  );
};

export default function StateHeatmap() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-[500px] bg-gray-50 rounded-xl animate-pulse" />;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <Treemap
        data={data}
        dataKey="size"
        nameKey="name"
        content={<CustomContent x={0} y={0} width={0} height={0} name="" size={0} fill="" />}
      >
        <Tooltip
          formatter={(value: unknown) => [formatDollars(Number(value)), "Spending"]}
          labelFormatter={(label: unknown) => {
            const labelStr = String(label);
            const s = states.find((st) => st.code === labelStr);
            return s ? s.name : labelStr;
          }}
        />
      </Treemap>
    </ResponsiveContainer>
  );
}
