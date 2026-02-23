"use client";
import dynamic from "next/dynamic";
const StateHeatmap = dynamic(() => import("./StateHeatmap"), { ssr: false });
export default function StateHeatmapWrapper() {
  return <StateHeatmap />;
}
