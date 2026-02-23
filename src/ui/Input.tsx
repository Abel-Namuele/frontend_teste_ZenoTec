/** @format */

import React from "react";

const baseInput = `
  w-full bg-[#141416] border border-white/10 rounded-md text-zinc-100
  px-3.5 py-2.5 text-sm font-sans outline-none transition-all duration-150
  placeholder:text-zinc-600
  focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20
`;

const errorInput = `border-red-400 focus:border-red-400 focus:ring-red-400/20`;

const labelClass = `block text-xs font-semibold text-zinc-500 tracking-wider uppercase mb-1.5`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={inputId} className={labelClass}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${baseInput} ${error ? errorInput : ""} ${className}`}
          {...props}
        />
        {error && <span className="mt-1 text-xs text-red-400">{error}</span>}
      </div>
    );
  },
);
Input.displayName = "Input";

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, children, className = "", ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={inputId} className={labelClass}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={`${baseInput} appearance-none cursor-pointer pr-9
            bg-[image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a7a85' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")]
            bg-no-repeat bg-[right_12px_center]
            ${error ? errorInput : ""} ${className}`}
          {...props}>
          {children}
        </select>
        {error && <span className="mt-1 text-xs text-red-400">{error}</span>}
      </div>
    );
  },
);
Select.displayName = "Select";

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={inputId} className={labelClass}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`${baseInput} resize-y min-h-[88px] ${error ? errorInput : ""} ${className}`}
          {...props}
        />
        {error && <span className="mt-1 text-xs text-red-400">{error}</span>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
