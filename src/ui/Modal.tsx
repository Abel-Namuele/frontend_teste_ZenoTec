/** @format */

"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-labelledby="modal-title">
      <div
        className={`w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto
          bg-[#141416] border border-white/10 rounded-2xl shadow-lg animate-slide-up`}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-7 pt-6 gap-4">
          <h2 id="modal-title" className="text-lg font-bold text-zinc-100">
            {title}
          </h2>
          <button
            className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10
              rounded-md text-zinc-400 hover:text-zinc-200 hover:border-white/20 transition-all cursor-pointer"
            onClick={onClose}
            aria-label="Fechar">
            <X size={16} />
          </button>
        </div>
        <div className="px-7 py-6">{children}</div>
      </div>
    </div>
  );
}
