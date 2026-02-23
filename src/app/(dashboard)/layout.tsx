/** @format */

"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Header } from "@/src/components/layout/Header";
import { SidebarProvider } from "@/src/components/layout/SidebarProvider";
import { Sidebar } from "@/src/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <div className="flex h-screen bg-[#0c0c0e] overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
