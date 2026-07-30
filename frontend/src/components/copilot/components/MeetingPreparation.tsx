import {
  Calendar,
  Users,
  TriangleAlert,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

export default function MeetingPreparation() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          AI Generated
        </span>

        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          Meeting Preparation
        </h1>

        <p className="mt-2 text-slate-500">
          Leadership Sync • Today • 10:00 AM
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <section className="rounded-2xl border border-slate-200 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <h2 className="font-semibold">Agenda</h2>
          </div>

          <ul className="space-y-2 text-slate-600">
            <li>Production status review</li>
            <li>Plant automation updates</li>
            <li>Open escalations</li>
            <li>Next sprint planning</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h2 className="font-semibold">Attendees</h2>
          </div>

          <ul className="space-y-2 text-slate-600">
            <li>Digital Production Head</li>
            <li>Plant Managers</li>
            <li>Automation Team</li>
            <li>Quality Lead</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 p-6">
          <div className="mb-4 flex items-center gap-2">
            <TriangleAlert className="h-5 w-5 text-orange-500" />
            <h2 className="font-semibold">Risks</h2>
          </div>

          <ul className="space-y-2 text-slate-600">
            <li>Delayed MTM template rollout</li>
            <li>Pending production validation</li>
            <li>Outstanding SAP issue</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 p-6">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-green-600" />
            <h2 className="font-semibold">Suggested Talking Points</h2>
          </div>

          <ul className="space-y-2 text-slate-600">
            <li>Highlight automation progress</li>
            <li>Discuss script reusability</li>
            <li>Review upcoming milestones</li>
            <li>Address open blockers</li>
          </ul>
        </section>

      </div>

      <div className="mt-8 rounded-2xl bg-blue-600 p-6 text-white">
        <div className="mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6" />
          <h2 className="text-xl font-semibold">
            AI Recommendation
          </h2>
        </div>

        <p>
          Start the meeting with automation achievements before discussing
          current blockers. This provides positive context before reviewing
          outstanding issues.
        </p>
      </div>
    </div>
  );
}