"use client";

import { useState, useEffect, useRef } from "react";

const PER_SECOND = 169013;
const PER_MINUTE = 10140791;
const PER_HOUR = 608447489;
const PER_DAY = 14602739726;

function formatMoney(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(3)} trillion`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(3)} billion`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)} million`;
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function formatCounter(n: number): string {
  return "$" + Math.floor(n).toLocaleString("en-US");
}

export function SpendingCounter() {
  const [spent, setSpent] = useState<number | null>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const baseRef = useRef<number>(0);

  useEffect(() => {
    // Calculate spending since midnight ET (approximate using local time of server render)
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(0, 0, 0, 0);
    const secondsSinceMidnight = (now.getTime() - midnight.getTime()) / 1000;
    const initialSpent = secondsSinceMidnight * PER_SECOND;

    baseRef.current = initialSpent;
    startRef.current = performance.now();
    setSpent(initialSpent);

    function tick() {
      const elapsed = (performance.now() - startRef.current) / 1000;
      setSpent(baseRef.current + elapsed * PER_SECOND);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center mb-10">
      <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">
        Spent by the U.S. Government Today
      </p>
      <div className="text-4xl md:text-6xl font-mono font-bold text-green-400 tabular-nums min-h-[1.2em]">
        {spent !== null ? formatCounter(spent) : "Loading..."}
      </div>
      <p className="text-gray-500 text-sm mt-3">
        Live counter based on FY2025 spending of $5.33 trillion/year
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: "Per Second", value: formatMoney(PER_SECOND) },
          { label: "Per Minute", value: formatMoney(PER_MINUTE) },
          { label: "Per Hour", value: formatMoney(PER_HOUR) },
          { label: "Per Day", value: formatMoney(PER_DAY) },
        ].map((s) => (
          <div key={s.label}>
            <div className="text-xl md:text-2xl font-bold text-white">
              {s.value}
            </div>
            <div className="text-gray-500 text-xs">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
