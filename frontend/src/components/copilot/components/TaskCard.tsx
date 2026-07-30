import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface TaskCardProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  active?: boolean;
  onClick?: () => void;
}

export default function TaskCard({
  icon,
  title,
  subtitle,
  active = false,
  onClick,
}: TaskCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-3
        py-3
        text-left
        transition-all
        duration-200
        ${
          active
            ? "bg-blue-50 border border-blue-200 shadow-sm"
            : "hover:bg-slate-50"
        }
      `}
    >
      <div
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          ${
            active
              ? "bg-blue-100 text-blue-700"
              : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
          }
        `}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-slate-900">
          {title}
        </div>

        {subtitle && (
          <div className="truncate text-xs text-slate-500">
            {subtitle}
          </div>
        )}
      </div>

      <ChevronRight
        size={16}
        className={`
          transition-all
          ${
            active
              ? "text-blue-500"
              : "text-slate-300 group-hover:text-slate-500"
          }
        `}
      />
    </button>
  );
}