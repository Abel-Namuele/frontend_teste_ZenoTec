/** @format */

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color?: "blue" | "yellow" | "emerald" | "red";
}

const colorClasses = {
  blue: {
    wrap: "bg-blue-400/10 border-blue-400/20 text-blue-300",
    icon: "text-blue-300",
  },
  yellow: {
    wrap: "bg-amber-400/10 border-amber-400/20 text-amber-300",
    icon: "text-amber-300",
  },
  emerald: {
    wrap: "bg-emerald-400/10 border-emerald-400/20 text-emerald-300",
    icon: "text-emerald-300",
  },
  red: {
    wrap: "bg-red-400/10 border-red-400/20 text-red-300",
    icon: "text-red-300",
  },
};

export function StatsCard({
  label,
  value,
  icon: Icon,
  color = "blue",
}: StatsCardProps) {
  const tone = colorClasses[color];

  return (
    <article className="bg-[#141416] border border-white/10 rounded-2xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-2xl font-extrabold text-zinc-100 mt-1">{value}</p>
        </div>
        <div
          className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${tone.wrap}`}>
          <Icon size={18} className={tone.icon} />
        </div>
      </div>
    </article>
  );
}
