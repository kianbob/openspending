"use client";

import { HorizontalBarChart } from "./HorizontalBarChart";

interface BarDatum {
  name: string;
  amount: number;
}

export function SubAgencyBarChart({ data }: { data: BarDatum[] }) {
  return (
    <HorizontalBarChart
      data={data}
      height={700}
      color="#6366f1"
      labelWidth={200}
    />
  );
}
