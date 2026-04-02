import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradientBorder?: boolean;
}

export function Card({ children, className = "", gradientBorder = false, ...props }: CardProps) {
  if (gradientBorder) {
    return (
      <div className={`relative rounded-xl bg-gradient-to-br from-orange-500/80 to-purple-400/30 p-[1px] ${className}`} {...props}>
        <div className="h-full w-full rounded-xl bg-zinc-900/90 backdrop-blur-xl p-3">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-white/5 bg-zinc-900/50 shadow-sm backdrop-blur-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
