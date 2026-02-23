/** @format */

import React from "react";
import { LoginForm } from "@/src/components/auth/LoginForm";
import { Briefcase } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0e] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
            <Briefcase size={22} className="text-emerald-300" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-extrabold text-zinc-100 tracking-tight">
              RecrutaHub
            </h1>
            <p className="text-xs text-zinc-600 mt-1">Acede à tua conta</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-7 shadow-xl">
          <h2 className="text-base font-bold text-zinc-200 mb-6">
            Iniciar sessão
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
