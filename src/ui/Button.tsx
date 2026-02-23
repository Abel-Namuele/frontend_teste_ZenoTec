/** @format */

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  primary:
    "bg-emerald-300 text-zinc-900 border border-emerald-300 hover:bg-emerald-400 hover:border-emerald-400 hover:-translate-y-px hover:shadow-accent",
  secondary:
    "bg-white/5 text-zinc-100 border border-white/10 hover:border-white/20 hover:bg-white/10",
  danger:
    "bg-red-400/10 text-red-400 border border-red-400/20 hover:bg-red-400/20",
  ghost:
    "bg-transparent text-zinc-400 border border-transparent hover:bg-white/5 hover:text-zinc-200",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-semibold font-sans
        rounded-md border transition-all duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}>
      {loading && (
        <span
          className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin"
          aria-hidden
        />
      )}
      {children}
    </button>
  );
}
