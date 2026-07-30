import {
  Mail,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function PriorityEmails() {
  const emails = [
    {
      subject: "SAP Escalation",
      sender: "Plant Operations",
      priority: "High",
      summary:
        "Production issue affecting scheduled deployment. Immediate executive visibility recommended.",
      action: "Review escalation and approve mitigation plan.",
      deadline: "Today • 11:30 AM",
      status: "Action Required",
    },
    {
      subject: "Budget Approval",
      sender: "Finance",
      priority: "Medium",
      summary:
        "Approval required for next automation rollout milestone.",
      action: "Approve budget before next steering meeting.",
      deadline: "Tomorrow",
      status: "Pending",
    },
    {
      subject: "Production Issue Update",
      sender: "Ghent Plant",
      priority: "Medium",
      summary:
        "Incident has been contained. Root cause investigation is in progress.",
      action: "Review latest plant report.",
      deadline: "End of Day",
      status: "Monitoring",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-2">

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              AI Prioritized
            </span>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              3 Important Emails
            </span>

          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Priority Emails
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            AI has ranked today's emails based on urgency and business impact.
          </p>

        </div>

      </div>

      {emails.map((email) => (
        <section
          key={email.subject}
          className="rounded-3xl border border-slate-200 bg-white shadow-sm"
        >

          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-blue-100 p-3">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>

              <div>

                <h2 className="font-semibold text-slate-900">
                  {email.subject}
                </h2>

                <p className="text-sm text-slate-500">
                  {email.sender}
                </p>

              </div>

            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                email.priority === "High"
                  ? "bg-red-100 text-red-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {email.priority}
            </span>

          </div>

          <div className="space-y-6 p-6">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <Sparkles className="h-5 w-5 text-blue-600" />

                <h3 className="font-semibold">
                  AI Summary
                </h3>

              </div>

              <p className="text-sm leading-7 text-slate-600">
                {email.summary}
              </p>

            </div>

            <div className="grid gap-6 lg:grid-cols-3">

              <div>

                <div className="mb-2 flex items-center gap-2">

                  <CheckCircle2 className="h-5 w-5 text-green-600" />

                  <h3 className="font-semibold">
                    Recommended Action
                  </h3>

                </div>

                <p className="text-sm text-slate-600">
                  {email.action}
                </p>

              </div>

              <div>

                <div className="mb-2 flex items-center gap-2">

                  <Clock3 className="h-5 w-5 text-blue-600" />

                  <h3 className="font-semibold">
                    Deadline
                  </h3>

                </div>

                <p className="text-sm text-slate-600">
                  {email.deadline}
                </p>

              </div>

              <div>

                <div className="mb-2 flex items-center gap-2">

                  <AlertCircle className="h-5 w-5 text-amber-500" />

                  <h3 className="font-semibold">
                    Status
                  </h3>

                </div>

                <p className="text-sm text-slate-600">
                  {email.status}
                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
                Generate Reply
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Open Email
                <ArrowUpRight className="h-4 w-4" />
              </button>

            </div>

          </div>

        </section>
      ))}

    </div>
  );
}