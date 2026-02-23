/** @format */

"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/candidates": "Candidatos",
};

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Gestão de Candidatos";

  const initials =
    session?.user?.name
      ?.split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";

  return (
    <header
      className="h-16 border-b border-white/[0.06] bg-[#0c0c0e]/80 backdrop-blur-sm
      flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
      <div>
        <h1 className="text-base font-bold text-zinc-100 leading-none">
          {title}
        </h1>
        <p className="text-xs text-zinc-600 mt-0.5">
          {new Date().toLocaleDateString("pt-AO", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10
          text-zinc-500 hover:text-zinc-200 hover:border-white/20 transition-all relative">
          <Bell size={16} />
        </button>

        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg bg-emerald-400/20 border border-emerald-400/20
            flex items-center justify-center text-emerald-300 text-xs font-bold">
            {initials}
          </div>
          {session?.user && (
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-zinc-200 leading-none">
                {session.user.name}
              </p>
              <p className="text-[10px] text-zinc-600 mt-0.5 capitalize">
                {session.user.role}
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
