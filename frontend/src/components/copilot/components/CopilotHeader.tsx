import {
  Sparkles,
  CheckCircle2,
  Cpu,
  Activity,
} from "lucide-react";

export default function CopilotHeader() {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-5">

      <div className="flex items-start justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 shadow-lg shadow-blue-500/20">

            <Sparkles className="h-7 w-7 text-white" />

          </div>

          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-xl font-semibold text-slate-900">
                Executive Copilot
              </h2>

              <div className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                BETA
              </div>

            </div>

            <p className="mt-1 text-sm text-slate-500">
              AI Assistant for Digital Production
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">

              <div className="flex items-center gap-1.5">

                <Cpu className="h-3.5 w-3.5" />

                Gemini 2.5 Flash

              </div>

              <div className="flex items-center gap-1.5">

                <Activity className="h-3.5 w-3.5 text-emerald-600" />

                Live Context Enabled

              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">

          <div className="flex items-center gap-2">

            <CheckCircle2 className="h-5 w-5 text-emerald-600" />

            <div>

              <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                Status
              </p>

              <p className="text-sm font-semibold text-emerald-700">
                AI Ready
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}