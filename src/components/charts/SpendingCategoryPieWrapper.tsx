"use client";
import dynamic from "next/dynamic";
const SpendingCategoryPie = dynamic(() => import("./SpendingCategoryPie"), { ssr: false });
export default function SpendingCategoryPieWrapper() {
  return <SpendingCategoryPie />;
}
