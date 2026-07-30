import type { ReactNode } from "react";

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function SectionHeader({
  icon,
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">

      <div className="flex items-center gap-3">

        <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
          {icon}
        </div>

        <div>

          <h2 className="text-xl font-semibold text-slate-900">
            {title}
          </h2>

          {subtitle && (
            <p className="text-sm text-slate-500 mt-1">
              {subtitle}
            </p>
          )}

        </div>

      </div>

      {action && <div>{action}</div>}

    </div>
  );
}