import Link from "next/link";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  link?: string,
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  link = "",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-[#1C1C1F] text-zinc-50 hover:bg-zinc-700/90 shadow-sm",
    secondary: "bg-orange-500 text-white hover:bg-orange-600 shadow-sm",
    ghost: "hover:bg-zinc-800 hover:text-zinc-50 text-zinc-400",
  };

  const sizes = {
    sm: "h-8 px-4 text-xs",
    md: "h-10 px-8 py-2 text-sm",
    lg: "h-11 px-8 py-2 text-base",
  };

  return (
    <Link href={link}>
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
        >
        
        {children}
      </button>
      </Link>
  );
}
