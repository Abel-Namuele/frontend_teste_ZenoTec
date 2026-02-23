/** @format */

"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  FileDown,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { dashboardApi, exportApi } from "@/src/lib/api";
import { StatsCard } from "@/src/components/dashboard/StatsCard";
import { StatusChart } from "@/src/components/dashboard/StatusChart";
import { DashboardStats } from "@/src/types/dashboard";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi
      .stats()
      .then((res) => setStats(res.data!))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleExport = async (type: "excel" | "pdf") => {
    const url = type === "excel" ? exportApi.excel() : exportApi.pdf();
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = type === "excel" ? "candidatos.xlsx" : "candidatos.pdf";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-[#141416] border border-white/10 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!stats)
    return <p className="text-zinc-500 text-sm">Erro ao carregar dados.</p>;

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total"
          value={stats.total}
          icon={Users}
          color="blue"
        />
        <StatsCard
          label="Em análise"
          value={stats.pending}
          icon={Clock}
          color="yellow"
        />
        <StatsCard
          label="Aprovados"
          value={stats.approved}
          icon={CheckCircle}
          color="emerald"
        />
        <StatsCard
          label="Rejeitados"
          value={stats.rejected}
          icon={XCircle}
          color="red"
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-zinc-200 mb-1">
            Distribuição por status
          </h3>
          <p className="text-xs text-zinc-600 mb-4">
            Visão geral de todos os candidatos
          </p>
          <StatusChart
            pending={stats.pending}
            approved={stats.approved}
            rejected={stats.rejected}
          />
        </div>

        {/* Top roles */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-zinc-200 mb-1">
            Vagas mais candidatadas
          </h3>
          <p className="text-xs text-zinc-600 mb-4">Top 5 posições</p>
          <div className="flex flex-col gap-3">
            {stats.topRoles.length === 0 && (
              <p className="text-xs text-zinc-600">Sem dados disponíveis.</p>
            )}
            {stats.topRoles.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-600 w-4">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-zinc-300 font-medium">
                      {r.role}
                    </span>
                    <span className="text-xs text-zinc-500">{r.count}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{
                        width: `${(r.count / (stats.topRoles[0]?.count || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Extra stats + Export */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-300 shrink-0">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Taxa de aprovação
            </p>
            <p className="text-2xl font-extrabold text-zinc-100 mt-0.5">
              {stats.approvalRate}
              <span className="text-sm text-zinc-500 ml-1 font-normal">%</span>
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-zinc-600">Últimos 7 dias</p>
            <p className="text-base font-bold text-emerald-300">
              +{stats.recentCount}
            </p>
          </div>
        </div>

        {/* Export buttons */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-zinc-200 mb-4">
            Exportar relatório
          </h3>
          <div className="flex gap-3">
            <button
              onClick={() => handleExport("excel")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-400/10 border border-emerald-400/20
                text-emerald-300 text-sm font-semibold rounded-lg hover:bg-emerald-400/20 transition-all">
              <FileDown size={15} /> Excel
            </button>
            <button
              onClick={() => handleExport("pdf")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-400/10 border border-blue-400/20
                text-blue-400 text-sm font-semibold rounded-lg hover:bg-blue-400/20 transition-all">
              <FileDown size={15} /> PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
