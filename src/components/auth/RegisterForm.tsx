/** @format */

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import Link from "next/link";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>();
  const password = watch("password");

  const onSubmit = async (data: RegisterData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Erro ao criar conta.");
        return;
      }

      router.push("/login?registered=1");
    } catch {
      setError("Erro de ligação. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };

  const labelClass =
    "block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5";
  const inputClass =
    "w-full bg-[#0c0c0e] border border-white/10 rounded-lg text-zinc-100 px-4 py-3 text-sm outline-none transition-all placeholder:text-zinc-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate>
      <div>
        <label className={labelClass}>Nome completo</label>
        <input
          type="text"
          placeholder="João Silva"
          className={`${inputClass} ${errors.name ? "border-red-400" : ""}`}
          {...register("name", {
            required: "Nome obrigatório.",
            minLength: { value: 2, message: "Mínimo 2 caracteres." },
          })}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>E-mail</label>
        <input
          type="email"
          placeholder="joao@exemplo.com"
          className={`${inputClass} ${errors.email ? "border-red-400" : ""}`}
          {...register("email", {
            required: "E-mail obrigatório.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "E-mail inválido.",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Palavra-passe</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mínimo 6 caracteres"
            className={`${inputClass} pr-11 ${errors.password ? "border-red-400" : ""}`}
            {...register("password", {
              required: "Obrigatória.",
              minLength: { value: 6, message: "Mínimo 6 caracteres." },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors">
            {showPassword ?
              <EyeOff size={16} />
            : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Confirmar palavra-passe</label>
        <input
          type="password"
          placeholder="Repete a palavra-passe"
          className={`${inputClass} ${errors.confirmPassword ? "border-red-400" : ""}`}
          {...register("confirmPassword", {
            required: "Confirmação obrigatória.",
            validate: (v) =>
              v === password || "As palavras-passe não coincidem.",
          })}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full bg-emerald-400 text-zinc-900 font-bold rounded-lg py-3 text-sm
          hover:bg-emerald-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1">
        {loading ?
          <span className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
        : <>
            <UserPlus size={16} /> Criar conta
          </>
        }
      </button>

      <p className="text-center text-xs text-zinc-600">
        Já tens conta?{" "}
        <Link
          href="/login"
          className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
          Entrar
        </Link>
      </p>
    </form>
  );
}
