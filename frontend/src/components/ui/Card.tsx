import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        p-6
        transition-all
        duration-200
        hover:shadow-md
        ${className}
      `}
    >
      {children}
    </div>
  );
}