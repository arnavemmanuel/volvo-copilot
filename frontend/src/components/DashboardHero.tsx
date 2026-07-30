import { CalendarDays, Sparkles } from "lucide-react";

export default function DashboardHero() {
  const today = new Date();

  const date = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-start justify-between gap-8">
        {/* Left */}
        <div>
          <div className="mb-3 flex items-center gap-2 text-blue-600">
            <Sparkles className="h-5 w-5" />

            <span className="text-sm font-semibold uppercase tracking-wider">
              Executive Dashboard
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Today's Focus
          </h1>

          <div className="mt-3 flex items-center gap-2 text-slate-500">
            <CalendarDays className="h-5 w-5" />

            <span>{date}</span>
          </div>
        </div>

        {/* Right */}
        <div className="max-w-md rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            AI INSIGHT
          </p>

          <p className="text-base leading-7 text-slate-700">
            You have{" "}
            <span className="font-semibold text-slate-900">
              8 meetings
            </span>
            ,{" "}
            <span className="font-semibold text-slate-900">
              14 priority emails
            </span>
            ,{" "}
            <span className="font-semibold text-slate-900">
              3 operational updates
            </span>{" "}
            and{" "}
            <span className="font-semibold text-slate-900">
              2 pending approvals
            </span>
            . Executive Copilot recommends preparing for today's leadership discussions first.
          </p>
        </div>
      </div>
    </section>
  );
}