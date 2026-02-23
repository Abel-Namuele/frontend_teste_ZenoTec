/** @format */

"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";

interface LoginData {
  email: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    setError("");

    try {
      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") ||
        "/dashboard";

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      if (!result || result.error) {
        setError("E-mail ou palavra-passe incorretos.");
        return;
      }

      router.replace(result.url || callbackUrl);
      router.refresh();
    } catch {
      setError("Erro de ligacao. Tenta novamente.");
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
      className="flex flex-col gap-5"
      noValidate>
      <div>
        <label className={labelClass}>E-mail</label>
        <input
          type="email"
          placeholder="joao@exemplo.com"
          className={`${inputClass} ${errors.email ? "border-red-400" : ""}`}
          {...register("email", {
            required: "E-mail obrigatorio.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "E-mail invalido.",
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
            placeholder="********"
            className={`${inputClass} pr-11 ${errors.password ? "border-red-400" : ""}`}
            {...register("password", {
              required: "Palavra-passe obrigatoria.",
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors">
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
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
        className="flex items-center justify-center gap-2 w-full bg-emerald-400 text-zinc-900 font-bold rounded-lg py-3 text-sm hover:bg-emerald-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1">
        {loading ? (
          <span className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <LogIn size={16} /> Entrar
          </>
        )}
      </button>

      <p className="text-center text-xs text-zinc-600">
        Nao tens conta?{" "}
        <Link
          href="/register"
          className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
          Criar conta
        </Link>
      </p>
    </form>
  );
}
