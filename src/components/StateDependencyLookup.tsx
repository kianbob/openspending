'use client';

import { useState } from 'react';

interface StateRow {
  state: string;
  name: string;
  received: number;
  paid: number;
  ratio: number;
  net: number;
  net_per_capita: number;
}

function formatDollarsShort(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return `$${n.toLocaleString()}`;
}

export function StateDependencyLookup({ states }: { states: StateRow[] }) {
  const [query, setQuery] = useState('');

  const match = query.length >= 2
    ? states.find(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.state.toLowerCase() === query.toLowerCase()
      )
    : null;

  return (
    <div>
      <input
        type="text"
        placeholder="Type a state name (e.g. Texas, NJ)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-gray-900"
      />
      {match && (
        <div className="mt-4 bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-xl font-bold text-gray-900">{match.name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
            <div>
              <p className="text-xs text-gray-500">Ratio</p>
              <p className={`text-lg font-bold ${match.ratio > 1 ? 'text-red-600' : 'text-green-600'}`}>
                ${match.ratio.toFixed(2)}
              </p>
              <p className="text-xs text-gray-400">per $1 paid</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Received</p>
              <p className="text-lg font-bold text-gray-900">{formatDollarsShort(match.received)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Taxes Paid</p>
              <p className="text-lg font-bold text-gray-900">{formatDollarsShort(match.paid)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Net Balance</p>
              <p className={`text-lg font-bold ${match.net > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {match.net > 0 ? '+' : ''}{formatDollarsShort(match.net)}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            {match.name} {match.ratio > 1
              ? `receives $${match.ratio.toFixed(2)} for every $1 it sends to Washington — a net taker.`
              : `gets back only $${match.ratio.toFixed(2)} for every $1 it sends to Washington — a net donor.`}
          </p>
        </div>
      )}
      {query.length >= 2 && !match && (
        <p className="mt-3 text-sm text-gray-500">No state found matching &ldquo;{query}&rdquo;</p>
      )}
    </div>
  );
}
