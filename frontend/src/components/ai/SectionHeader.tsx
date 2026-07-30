import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type SectionHeaderProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function SectionHeader({
  icon,
  title,
  subtitle,
  actionLabel = "View All",
  onAction,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
          {icon}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {title}
          </h2>

          <p className="text-sm text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>

      {onAction && (
        <button
          onClick={onAction}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}