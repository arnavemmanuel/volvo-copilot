import { Sparkles } from "lucide-react";
import { useCopilot } from "../../hooks/useCopilot";

export default function CopilotLauncher() {
  const { openCopilot } = useCopilot();

  return (
    <button
      onClick={openCopilot}
      className="fixed bottom-8 right-8 z-40"
    >
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 shadow-lg">
          <Sparkles className="h-6 w-6 text-white" />
        </div>

        <div className="text-left">

          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            AI Assistant
          </p>

          <h3 className="text-base font-semibold text-slate-900">
            Executive Copilot
          </h3>

          <p className="text-sm text-slate-500">
            Ask anything
          </p>

        </div>

      </div>
    </button>
  );
}