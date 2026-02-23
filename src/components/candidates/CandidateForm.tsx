/** @format */

"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { X, Plus } from "lucide-react";
import { Button } from "@/src/ui/Button";
import { Input, Select, Textarea } from "@/src/ui/Input";
import { candidatesApi } from "@/src/lib/api";
import { Candidate, CandidateFormData } from "@/src/types/candidate";

interface CandidateFormProps {
  candidate?: Candidate;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CandidateForm({
  candidate,
  onSuccess,
  onCancel,
}: CandidateFormProps) {
  const isEditing = Boolean(candidate);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(candidate?.skills || []);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CandidateFormData>({
    defaultValues:
      candidate ?
        {
          name: candidate.name,
          email: candidate.email,
          phone: candidate.phone || "",
          role: candidate.role,
          experience_years: candidate.experience_years,
          linkedin: candidate.linkedin || "",
          status: candidate.status,
          notes: candidate.notes || "",
        }
      : { status: "pending", experience_years: 0 },
  });

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) setSkills((prev) => [...prev, s]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) =>
    setSkills((prev) => prev.filter((s) => s !== skill));

  const onSubmit = async (data: CandidateFormData) => {
    setLoading(true);
    setServerError("");
    try {
      const payload = { ...data, skills };
      if (isEditing && candidate) {
        await candidatesApi.update(candidate.id, payload);
      } else {
        await candidatesApi.create(payload);
      }
      onSuccess();
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <Input
          label="Nome completo"
          placeholder="Ex: João Silva"
          error={errors.name?.message}
          {...register("name", {
            required: "Nome é obrigatório.",
            minLength: { value: 2, message: "Mínimo 2 caracteres." },
          })}
        />
        <Input
          label="E-mail"
          type="email"
          placeholder="joao@exemplo.com"
          error={errors.email?.message}
          {...register("email", {
            required: "E-mail é obrigatório.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "E-mail inválido.",
            },
          })}
        />
        <Input
          label="Telefone"
          placeholder="+244 923 000 000"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Vaga pretendida"
          placeholder="Ex: Desenvolvedor Frontend"
          error={errors.role?.message}
          {...register("role", { required: "Vaga é obrigatória." })}
        />
        <Input
          label="Anos de experiência"
          type="number"
          min={0}
          max={60}
          error={errors.experience_years?.message}
          {...register("experience_years", {
            valueAsNumber: true,
            min: { value: 0, message: "Mínimo 0." },
          })}
        />
        <Select
          label="Status"
          error={errors.status?.message}
          {...register("status")}>
          <option value="pending">Em análise</option>
          <option value="approved">Aprovado</option>
          <option value="rejected">Rejeitado</option>
        </Select>
      </div>

      <Input
        label="LinkedIn (opcional)"
        placeholder="https://linkedin.com/in/usuario"
        error={errors.linkedin?.message}
        {...register("linkedin", {
          pattern: { value: /^https?:\/\/.+/, message: "URL inválida." },
        })}
      />

      {/* Skills */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">
          Competências
        </span>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 bg-[#141416] border border-white/10 rounded-md text-zinc-100
              px-3.5 py-2.5 text-sm outline-none transition-all
              placeholder:text-zinc-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            placeholder="Ex: React, TypeScript, Node.js"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={addSkill}>
            <Plus size={14} /> Adicionar
          </Button>
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5
                bg-emerald-400/10 text-emerald-300 border border-emerald-400/20
                rounded-full px-3 py-1 text-xs font-medium">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="opacity-60 hover:opacity-100 transition-opacity flex items-center"
                  aria-label={`Remover ${skill}`}>
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <Textarea
        label="Notas (opcional)"
        placeholder="Observações sobre o candidato..."
        rows={3}
        {...register("notes")}
      />

      {serverError && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-md px-3.5 py-2.5">
          {serverError}
        </p>
      )}

      <div className="flex justify-end gap-2.5 pt-1">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>
          {isEditing ? "Guardar alterações" : "Cadastrar candidato"}
        </Button>
      </div>
    </form>
  );
}
