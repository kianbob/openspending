"use client";
import dynamic from "next/dynamic";
const SpendingGrowthChart = dynamic(() => import("./SpendingGrowthChart"), { ssr: false });
export default function SpendingGrowthChartWrapper() {
  return <SpendingGrowthChart />;
}
