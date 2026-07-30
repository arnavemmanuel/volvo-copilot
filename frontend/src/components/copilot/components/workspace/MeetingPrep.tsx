import {
  CalendarDays,
  Users,
  ClipboardList,
 MessageSquare,
  AlertTriangle,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function MeetingPrep() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-2">

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              AI Generated
            </span>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Ready
            </span>

          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Meeting Preparation
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Everything you need before your next leadership meeting.
          </p>

        </div>

      </div>

      {/* Upcoming Meeting */}

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-100 p-3">
              <CalendarDays className="h-5 w-5 text-blue-600" />
            </div>

            <div>

              <h2 className="font-semibold text-slate-900">
                Leadership Sync
              </h2>

              <p className="text-sm text-slate-500">
                Today • 10:00 AM • 60 minutes
              </p>

            </div>

          </div>

          <ArrowRight className="h-5 w-5 text-slate-400" />

        </div>

        <div className="p-6">

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Attendees */}

            <div>

              <div className="mb-3 flex items-center gap-2">

                <Users className="h-5 w-5 text-blue-600" />

                <h3 className="font-semibold">
                  Attendees
                </h3>

              </div>

              <ul className="space-y-2 text-sm text-slate-600">

                <li>• Head of Digital Production</li>
                <li>• Plant Operations Lead</li>
                <li>• Automation Manager</li>
                <li>• Solution Architect</li>

              </ul>

            </div>

            {/* Agenda */}

            <div>

              <div className="mb-3 flex items-center gap-2">

                <ClipboardList className="h-5 w-5 text-blue-600" />

                <h3 className="font-semibold">
                  Agenda
                </h3>

              </div>

              <ul className="space-y-2 text-sm text-slate-600">

                <li>• Production performance review</li>
                <li>• MTM NG rollout status</li>
                <li>• Automation updates</li>
                <li>• Upcoming milestones</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Talking Points */}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center gap-2">

            <MessageSquare className="h-5 w-5 text-blue-600" />

            <h2 className="font-semibold">
              AI Talking Points
            </h2>

          </div>

          <ul className="space-y-3 text-sm text-slate-600">

            <li>✓ Highlight successful automation reuse.</li>

            <li>✓ Mention production stability improvements.</li>

            <li>✓ Present current deployment progress.</li>

            <li>✓ Discuss upcoming rollout timeline.</li>

          </ul>

        </section>

        {/* Risks */}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center gap-2">

            <AlertTriangle className="h-5 w-5 text-amber-500" />

            <h2 className="font-semibold">
              Risks to Address
            </h2>

          </div>

          <ul className="space-y-3 text-sm text-slate-600">

            <li>• One production issue still under review.</li>

            <li>• SAP escalation awaiting response.</li>

            <li>• Deployment approval pending.</li>

          </ul>

        </section>

      </div>

      {/* Related Emails */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <Mail className="h-5 w-5 text-blue-600" />

          <h2 className="font-semibold">
            Related Emails
          </h2>

        </div>

        <div className="space-y-3">

          <div className="rounded-xl bg-slate-50 p-4">
            SAP Escalation – Requires discussion during meeting.
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            Budget Approval – Status update requested.
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            Production Incident – Include latest mitigation plan.
          </div>

        </div>

      </section>

    </div>
  );
}