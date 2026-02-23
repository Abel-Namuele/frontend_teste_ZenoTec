/** @format */

"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarProvider";
import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Briefcase,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/candidates", label: "Candidatos", icon: Users },
];

export function Sidebar() {
  const { collapsed, toggle } = useSidebar();
  const pathname = usePathname();

  return (
    <aside
      className={`
      relative flex flex-col h-screen bg-[#0f0f11] border-r border-white/[0.06]
      transition-all duration-300 ease-in-out shrink-0
      ${collapsed ? "w-16" : "w-60"}
    `}>
      {/* Logo */}
      <div
        className={`flex items-center h-16 border-b border-white/[0.06] px-4 ${collapsed ? "justify-center" : "gap-3"}`}>
        <div className="w-8 h-8 rounded-lg bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
          <Briefcase size={16} className="text-emerald-300" />
        </div>
        {!collapsed && (
          <span className="font-extrabold text-sm text-zinc-100 tracking-tight leading-tight">
            RecrutaHub
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm font-medium
                transition-all duration-150 group relative
                ${
                  active ?
                    "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20"
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
                }
                ${collapsed ? "justify-center" : ""}
              `}
              title={collapsed ? label : undefined}>
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
              {collapsed && (
                <div
                  className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-zinc-200 text-xs rounded-md
                  opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-white/10">
                  {label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-white/[0.06]">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className={`
            flex items-center gap-3 w-full rounded-lg px-2.5 py-2.5 text-sm font-medium
            text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-all border border-transparent
            ${collapsed ? "justify-center" : ""}
          `}
          title={collapsed ? "Terminar sessão" : undefined}>
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Terminar sessão</span>}
        </button>
      </div>

      {/* Toggle button */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-[#1a1a1d] border border-white/10
          rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-200
          hover:border-white/20 transition-all z-10 cursor-pointer"
        aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}>
        {collapsed ?
          <ChevronRight size={12} />
        : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
