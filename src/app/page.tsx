/** @format */

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  ChartNoAxesCombined,
  ShieldCheck,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0c0c0e] text-zinc-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.15),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.12),transparent_40%)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-300/20 bg-emerald-300/10 text-emerald-200 text-xs font-semibold tracking-wide">
            <Briefcase size={14} />
            RecrutaHub
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl">
            Plataforma para gerenciar candidatos com processo simples e visao
            clara.
          </h1>
          <p className="mt-5 text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Acompanhe candidaturas, filtre por status, exporte relatorios e
            mantenha o time de recrutamento alinhado em um painel unico.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-300 text-zinc-900 text-sm font-bold hover:bg-emerald-200 transition-colors">
              Fazer Login <ArrowRight size={16} />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 bg-white/5 text-zinc-100 text-sm font-semibold hover:bg-white/10 transition-colors">
              Criar Conta
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <article className="rounded-2xl border border-white/10 bg-[#141416] p-5">
              <div className="w-9 h-9 rounded-lg bg-emerald-300/10 border border-emerald-300/20 text-emerald-200 flex items-center justify-center">
                <ChartNoAxesCombined size={16} />
              </div>
              <h2 className="mt-4 text-sm font-bold">Dashboard de desempenho</h2>
              <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                Visualize total de candidatos, aprovados, rejeitados e
                tendencias.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-[#141416] p-5">
              <div className="w-9 h-9 rounded-lg bg-blue-300/10 border border-blue-300/20 text-blue-200 flex items-center justify-center">
                <Briefcase size={16} />
              </div>
              <h2 className="mt-4 text-sm font-bold">Fluxo de recrutamento</h2>
              <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                Centralize informacoes do candidato em um processo unico e
                padrao.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-[#141416] p-5">
              <div className="w-9 h-9 rounded-lg bg-amber-300/10 border border-amber-300/20 text-amber-200 flex items-center justify-center">
                <ShieldCheck size={16} />
              </div>
              <h2 className="mt-4 text-sm font-bold">Acesso protegido</h2>
              <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                Somente usuarios autenticados acessam as rotas internas do
                dashboard.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
