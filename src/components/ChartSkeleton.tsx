export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div
      className="bg-gray-100 rounded-xl animate-pulse"
      style={{ height }}
    />
  );
}
