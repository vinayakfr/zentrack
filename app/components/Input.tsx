import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && <label className="text-sm text-zinc-300 ml-1">{label}</label>}
        <input
          ref={ref}
          className={`flex h-11 w-full rounded-lg bg-zinc-900/50 px-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 border border-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
