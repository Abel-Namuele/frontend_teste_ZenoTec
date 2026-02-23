/** @format */

import React from "react";

interface StatusChartProps {
  pending: number;
  approved: number;
  rejected: number;
}

export function StatusChart({
  pending,
  approved,
  rejected,
}: StatusChartProps) {
  const total = pending + approved + rejected;

  const rows = [
    {
      label: "Em analise",
      value: pending,
      bar: "bg-amber-400",
      text: "text-amber-300",
    },
    {
      label: "Aprovados",
      value: approved,
      bar: "bg-emerald-400",
      text: "text-emerald-300",
    },
    {
      label: "Rejeitados",
      value: rejected,
      bar: "bg-red-400",
      text: "text-red-300",
    },
  ];

  if (total === 0) {
    return <p className="text-xs text-zinc-600">Sem dados para exibir.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row) => {
        const percentage = Math.round((row.value / total) * 100);
        return (
          <div key={row.label}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-zinc-300">{row.label}</span>
              <span className={row.text}>
                {row.value} ({percentage}%)
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${row.bar}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
