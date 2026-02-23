/** @format */

import React from "react";

type Status = "pending" | "approved" | "rejected";

const statusConfig: Record<
  Status,
  { label: string; classes: string; dot: string }
> = {
  pending: {
    label: "Em análise",
    classes: "bg-yellow-400/10 text-yellow-300 border border-yellow-500/20",
    dot: "bg-yellow-300",
  },
  approved: {
    label: "Aprovado",
    classes: "bg-emerald-400/10 text-emerald-300 border border-emerald-500/20",
    dot: "bg-emerald-300",
  },
  rejected: {
    label: "Rejeitado",
    classes: "bg-red-400/10 text-red-400 border border-red-500/20",
    dot: "bg-red-400",
  },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status as Status] ?? {
    label: status,
    classes: "bg-white/5 text-zinc-400 border border-white/10",
    dot: "bg-zinc-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.72rem] font-semibold tracking-wider uppercase shrink-0 ${config.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      {config.label}
    </span>
  );
}
