import { X, Sparkles } from "lucide-react";
import { useCopilot } from "../../hooks/useCopilot";
import CopilotWorkspace from "./components/CopilotWorkspace";

export default function CopilotOverlay() {
  const { isOpen, closeCopilot } = useCopilot();

  if (!isOpen) return null;

  return (
    <div
      onClick={closeCopilot}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-[92vh] w-[90vw] max-w-[1750px] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.22)]"
      >
        {/* Header */}

        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100">
              <Sparkles className="h-4.5 w-4.5 text-blue-600" />
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold tracking-tight text-slate-900">
                Executive Copilot
              </h1>

              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                Digital Production AI
              </span>
            </div>
          </div>

          <button
            onClick={closeCopilot}
            className="rounded-lg p-2 transition-colors hover:bg-slate-100"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-hidden">
          <CopilotWorkspace />
        </div>
      </div>
    </div>
  );
}