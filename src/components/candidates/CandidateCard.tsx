/** @format */

"use client";
import { Candidate } from "@/src/types/candidate";
import { StatusBadge } from "@/src/ui/Badge";
import { Button } from "@/src/ui/Button";
import {
  Pencil,
  Trash2,
  Linkedin,
  Mail,
  Phone,
  Briefcase,
  Award,
} from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  onEdit: (candidate: Candidate) => void;
  onDelete: (id: string, name: string) => void;
}

export function CandidateCard({
  candidate,
  onEdit,
  onDelete,
}: CandidateCardProps) {
  const initials = candidate.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <article
      className="flex flex-col gap-3.5 p-5 bg-[#141416] border border-white/10 rounded-2xl
      transition-all duration-150 hover:border-white/20 hover:shadow-card group">
      {/* Top row */}
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 flex items-center justify-center shrink-0
          bg-emerald-400/10 border border-emerald-400/20 rounded-xl
          text-emerald-300 font-extrabold text-sm tracking-tight">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-zinc-100 truncate">
            {candidate.name}
          </h3>
          <p className="flex items-center gap-1 text-xs text-zinc-500 mt-0.5 truncate">
            <Briefcase size={11} /> {candidate.role}
          </p>
        </div>
        <StatusBadge status={candidate.status} />
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-3.5 border-t border-white/[0.06]">
        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Mail size={11} />
          <a
            href={`mailto:${candidate.email}`}
            className="text-blue-400 hover:text-emerald-300 transition-colors">
            {candidate.email}
          </a>
        </span>
        {candidate.phone && (
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Phone size={11} /> {candidate.phone}
          </span>
        )}
        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Award size={11} />
          {candidate.experience_years}{" "}
          {candidate.experience_years === 1 ? "ano" : "anos"} de exp.
        </span>
        {candidate.linkedin && (
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Linkedin size={11} />
            <a
              href={candidate.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-emerald-300 transition-colors">
              LinkedIn
            </a>
          </span>
        )}
      </div>

      {/* Skills */}
      {candidate.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {candidate.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-0.5 bg-white/5 border border-white/10
              text-zinc-400 rounded-full text-xs font-medium">
              {skill}
            </span>
          ))}
          {candidate.skills.length > 5 && (
            <span
              className="px-2.5 py-0.5 bg-white/5 border border-white/10
              text-zinc-600 rounded-full text-xs font-mono">
              +{candidate.skills.length - 5}
            </span>
          )}
        </div>
      )}

      {/* Notes */}
      {candidate.notes && (
        <p
          className="text-xs text-zinc-500 leading-relaxed bg-white/[0.03]
          border-l-2 border-white/10 rounded-sm px-3 py-2.5 line-clamp-2">
          {candidate.notes}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3.5 border-t border-white/[0.06] gap-2">
        <time className="text-xs text-zinc-600 font-mono">
          {new Date(candidate.created_at).toLocaleDateString("pt-AO", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </time>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" onClick={() => onEdit(candidate)}>
            <Pencil size={13} /> Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(candidate.id, candidate.name)}>
            <Trash2 size={13} /> Eliminar
          </Button>
        </div>
      </div>
    </article>
  );
}
