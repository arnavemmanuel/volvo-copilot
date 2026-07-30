import type { ReactNode } from "react";

interface ExecutiveWorkspaceProps {
  dashboard: ReactNode;
  copilot: ReactNode;
}

export default function ExecutiveWorkspace({
  dashboard,
  copilot,
}: ExecutiveWorkspaceProps) {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px] items-start">

      {/* Dashboard */}
      <main className="min-w-0">
        {dashboard}
      </main>

      {/* Executive Copilot */}
      <aside className="hidden xl:block">
        <div className="sticky top-6 h-[calc(100vh-48px)]">
          {copilot}
        </div>
      </aside>

    </div>
  );
}