import {
  Sparkles,
  Clock3,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface Props {
  totalEmails: number;
  criticalEmails: number;
  highPriorityEmails: number;
  aiDrafts: number;
}

export default function ExecutiveSummary({
  totalEmails,
  criticalEmails,
  highPriorityEmails,
  aiDrafts,
}: Props) {
  const estimatedReadTime = Math.max(
    3,
    Math.ceil(totalEmails * 0.5)
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Executive Summary
          </h2>

          <p className="text-sm text-slate-500">
            AI-generated overview of today's executive communications.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        <div className="rounded-xl bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 text-red-500" />

            <div>
              <p className="font-medium text-slate-900">
                Priority Inbox
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {criticalEmails} critical and {highPriorityEmails} high-priority
                emails require review before routine communications.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />

            <div>
              <p className="font-medium text-slate-900">
                AI Assistance
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {aiDrafts} draft replies are ready for review and can be used to
                accelerate responses.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <Clock3 className="mt-1 h-5 w-5 text-blue-600" />

            <div>
              <p className="font-medium text-slate-900">
                Estimated Reading Time
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Approximately {estimatedReadTime} minutes to review all unread
                 communications.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-1 h-5 w-5 text-violet-600" />

            <div>
              <p className="font-medium text-slate-900">
                AI Recommendation
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Begin with critical emails, review high-priority requests next,
                and use AI draft replies where appropriate to reduce response
                time.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}