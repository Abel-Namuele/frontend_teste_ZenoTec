/** @format */

"use client";
import React, { useState, useEffect, useCallback } from "react";

import {
  UserPlus,
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { CandidateCard } from "@/src/components/candidates/CandidateCard";
import { CandidateForm } from "@/src/components/candidates/CandidateForm";
import { candidatesApi } from "@/src/lib/api";
import { Candidate } from "@/src/types/candidate";
import { Button } from "@/src/ui/Button";
import { Modal } from "@/src/ui/Modal";

type ModalMode = "create" | "edit" | null;

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<
    Candidate | undefined
  >();
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await candidatesApi.list({
        page,
        search,
        status: statusFilter,
        limit: 9,
      });
      setCandidates((res.data as unknown as Candidate[]) || []);
      if (res.pagination) {
        setTotalPages(res.pagination.totalPages);
        setTotal(res.pagination.total);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar candidatos.",
      );
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    const t = setTimeout(fetchCandidates, 300);
    return () => clearTimeout(t);
  }, [fetchCandidates]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };
  const openCreate = () => {
    setSelectedCandidate(undefined);
    setModalMode("create");
  };
  const openEdit = (c: Candidate) => {
    setSelectedCandidate(c);
    setModalMode("edit");
  };
  const closeModal = () => {
    setModalMode(null);
    setSelectedCandidate(undefined);
  };
  const handleFormSuccess = () => {
    closeModal();
    fetchCandidates();
  };
  const handleDeleteRequest = (id: string, name: string) =>
    setDeleteConfirm({ id, name });
  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    try {
      await candidatesApi.remove(deleteConfirm.id);
      setDeleteConfirm(null);
      fetchCandidates();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Erro ao eliminar.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2.5 flex-1 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none"
            />
            <input
              type="search"
              className="w-full bg-[#141416] border border-white/10 rounded-md text-zinc-100 pl-9 pr-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-zinc-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
              placeholder="Pesquisar por nome, e-mail ou vaga..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <select
            className="bg-[#141416] border border-white/10 rounded-md text-zinc-100 px-3.5 py-2.5 text-sm outline-none cursor-pointer focus:border-emerald-400 appearance-none pr-8"
            value={statusFilter}
            onChange={handleStatusChange}>
            <option value="">Todos os status</option>
            <option value="pending">Em análise</option>
            <option value="approved">Aprovados</option>
            <option value="rejected">Rejeitados</option>
          </select>
          <button
            className="w-10 h-10 flex items-center justify-center bg-[#141416] border border-white/10 rounded-md text-zinc-500 hover:text-zinc-200 hover:border-white/20 transition-all cursor-pointer"
            onClick={fetchCandidates}
            aria-label="Actualizar">
            <RefreshCw size={14} />
          </button>
        </div>
        <Button onClick={openCreate}>
          <UserPlus size={15} /> Novo candidato
        </Button>
      </div>

      <p className="text-xs text-zinc-600 font-mono -mt-3">
        {loading ?
          "A carregar..."
        : `${total} ${total === 1 ? "candidato" : "candidatos"} encontrado${total === 1 ? "" : "s"}`
        }
      </p>

      {error && (
        <div className="flex items-center justify-between gap-4 bg-red-400/10 border border-red-400/20 rounded-xl px-5 py-4 text-red-400 text-sm">
          <p>{error}</p>
          <Button variant="secondary" size="sm" onClick={fetchCandidates}>
            Tentar novamente
          </Button>
        </div>
      )}

      {!error && loading && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-60 bg-[#141416] border border-white/10 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {!error && !loading && candidates.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <UserPlus size={48} className="text-zinc-700 mb-2" />
          <h3 className="text-base font-bold text-zinc-300">
            Nenhum candidato encontrado
          </h3>
          <p className="text-sm text-zinc-500 max-w-xs">
            {search || statusFilter ?
              "Tenta ajustar os filtros."
            : "Adiciona o primeiro candidato."}
          </p>
          {!search && !statusFilter && (
            <Button onClick={openCreate} className="mt-2">
              <UserPlus size={15} /> Adicionar candidato
            </Button>
          )}
        </div>
      )}

      {!error && !loading && candidates.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {candidates.map((c) => (
            <CandidateCard
              key={c.id}
              candidate={c}
              onEdit={openEdit}
              onDelete={handleDeleteRequest}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            className="w-9 h-9 flex items-center justify-center bg-[#141416] border border-white/10 rounded-md text-zinc-500 hover:text-zinc-200 hover:border-white/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}>
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-zinc-500 font-mono">
            Página <strong className="text-zinc-200">{page}</strong> de{" "}
            <strong className="text-zinc-200">{totalPages}</strong>
          </span>
          <button
            className="w-9 h-9 flex items-center justify-center bg-[#141416] border border-white/10 rounded-md text-zinc-500 hover:text-zinc-200 hover:border-white/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <Modal
        isOpen={modalMode !== null}
        onClose={closeModal}
        title={modalMode === "edit" ? "Editar candidato" : "Novo candidato"}
        size="lg">
        <CandidateForm
          candidate={selectedCandidate}
          onSuccess={handleFormSuccess}
          onCancel={closeModal}
        />
      </Modal>

      <Modal
        isOpen={Boolean(deleteConfirm)}
        onClose={() => setDeleteConfirm(null)}
        title="Confirmar eliminação"
        size="sm">
        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
          Tens a certeza que pretendes eliminar{" "}
          <strong className="text-zinc-100">{deleteConfirm?.name}</strong>? Esta
          acção é irreversível.
        </p>
        <div className="flex justify-end gap-2.5">
          <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
