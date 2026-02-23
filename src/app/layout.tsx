/** @format */

import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gestão de Candidatos",
  description: "Plataforma de gestão e acompanhamento de candidaturas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${syne.variable} ${dmMono.variable}`}>
      <body className="antialiased bg-[#0c0c0e] text-zinc-100 font-sans">
        {children}
      </body>
    </html>
  );
}
