import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface QuickActionCardProps {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
}

export default function QuickActionCard({
  icon,
  title,
  onClick,
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        group
        flex
        h-10
        shrink-0
        items-center
        gap-2.5
        rounded-full
        border
        border-slate-200
        bg-white
        px-4
        text-sm
        font-medium
        text-slate-700
        transition-all
        duration-200
        hover:border-blue-300
        hover:bg-blue-50
        hover:text-blue-700
        hover:shadow-sm
      "
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-blue-600 transition-colors group-hover:bg-blue-100">
        {icon}
      </div>

      <span className="whitespace-nowrap">
        {title}
      </span>

      <ChevronRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
    </button>
  );
}