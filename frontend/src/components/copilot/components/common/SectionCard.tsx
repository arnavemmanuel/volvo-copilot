import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function SectionCard({
  title,
  subtitle,
  icon,
  action,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section
      className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              {icon}
            </div>
          )}

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-0.5 text-sm text-slate-500">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {action && action}
      </div>

      <div className="p-6">{children}</div>
    </section>
  );
}