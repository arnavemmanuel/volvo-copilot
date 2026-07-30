import {
  Calendar,
  Mail,
  Factory,
  Lightbulb,
  Clock,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function ExecutiveBrief() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>
          <div className="flex items-center gap-2">

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              AI Generated
            </span>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Live
            </span>

          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Executive Brief
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Friday • July 24 • Digital Production Overview
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Good Afternoon
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Smrithi
          </h2>
        </div>

      </div>

      {/* Today's Focus */}

      <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg">

        <div className="flex items-center gap-3">

          <Sparkles className="h-6 w-6" />

          <h2 className="text-xl font-semibold">
            Today's Focus
          </h2>

        </div>

        <p className="mt-4 max-w-3xl text-blue-100 leading-7">
          Two leadership meetings are scheduled today. One production issue
          requires attention, and three high-priority emails should be reviewed
          before noon. AI recommends preparing leadership talking points before
          your first meeting.
        </p>

      </section>

      {/* Main Content */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left */}

        <div className="space-y-6 lg:col-span-2">

          {/* Meetings */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-100 p-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>

                <div>

                  <h2 className="font-semibold text-slate-900">
                    Meetings Today
                  </h2>

                  <p className="text-sm text-slate-500">
                    2 scheduled meetings
                  </p>

                </div>

              </div>

              <ArrowRight className="h-5 w-5 text-slate-400" />

            </div>

            <div className="space-y-3">

              <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-medium">Leadership Sync</p>
                  <p className="text-sm text-slate-500">
                    Digital Production
                  </p>
                </div>

                <span className="font-semibold text-blue-600">
                  10:00 AM
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-medium">Plant Review</p>
                  <p className="text-sm text-slate-500">
                    Manufacturing
                  </p>
                </div>

                <span className="font-semibold text-blue-600">
                  2:00 PM
                </span>
              </div>

            </div>

          </section>

          {/* Production */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="rounded-xl bg-blue-100 p-3">
                <Factory className="h-5 w-5 text-blue-600" />
              </div>

              <div>

                <h2 className="font-semibold">
                  Production Status
                </h2>

                <p className="text-sm text-slate-500">
                  Live plant overview
                </p>

              </div>

            </div>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-green-600" />
                <span>2 plants operating normally</span>
              </div>

              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <span>1 production issue requires attention</span>
              </div>

            </div>

          </section>

        </div>

        {/* Right Rail */}

        <div className="space-y-6">

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <Mail className="h-5 w-5 text-blue-600" />

              <h2 className="font-semibold">
                Priority Emails
              </h2>

            </div>

            <div className="space-y-3">

              <div className="rounded-xl bg-slate-50 p-3">
                SAP Escalation
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                Budget Approval
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                Plant Issue Update
              </div>

            </div>

          </section>

          <section className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg">

            <div className="mb-5 flex items-center gap-3">

              <Lightbulb className="h-5 w-5" />

              <h2 className="font-semibold">
                AI Recommendations
              </h2>

            </div>

            <ul className="space-y-3 text-sm text-slate-200">

              <li>✓ Prepare Leadership Sync talking points</li>

              <li>✓ Review SAP escalation before noon</li>

              <li>✓ Follow up on production alert</li>

              <li>✓ Generate VIOLIN summary</li>

            </ul>

          </section>

        </div>

      </div>

    </div>
  );
}