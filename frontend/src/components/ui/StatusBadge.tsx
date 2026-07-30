import type { ReactNode } from "react";

interface StatusBadgeProps {
  variant:
    | "critical"
    | "high"
    | "medium"
    | "low"
    | "success"
    | "active"
    | "next"
    | "info";

  children: ReactNode;
}

export default function StatusBadge({
  variant,
  children,
}: StatusBadgeProps) {
  const variants = {
    critical: "bg-red-100 text-red-700",
    high: "bg-orange-100 text-orange-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-green-100 text-green-700",
    success: "bg-emerald-100 text-emerald-700",
    active: "bg-blue-100 text-blue-700",
    next: "bg-indigo-100 text-indigo-700",
    info: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}