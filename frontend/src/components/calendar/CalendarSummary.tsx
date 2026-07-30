import {
  CalendarDays,
  Clock,
  AlertTriangle,
  Brain,
  CalendarPlus,
  Sparkles,
} from "lucide-react";

import { useCalendar } from "../../hooks/useCalendar";
import SectionHeader from "../ai/SectionHeader";
import AIActionButton from "../ai/AIActionButton";

export default function CalendarSummary() {
  const { data, loading, error } = useCalendar();

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">Loading calendar...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-6 text-red-600 shadow-sm">
        {error || "Unable to load calendar."}
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <SectionHeader
        icon={<CalendarDays className="h-5 w-5 text-indigo-600" />}
        title="Executive Calendar"
        subtitle="Today's schedule overview"
      />

      {/* KPI Cards */}

      <div className="grid grid-cols-2 gap-4">

        <StatCard
          icon={<CalendarDays className="h-5 w-5" />}
          title="Meetings"
          value={data.today.meetings}
        />

        <StatCard
          icon={<AlertTriangle className="h-5 w-5" />}
          title="Priority"
          value={data.today.highPriority}
        />

        <StatCard
          icon={<Clock className="h-5 w-5" />}
          title="Meeting Hours"
          value={data.today.totalMeetingHours}
        />

        <StatCard
          icon={<Brain className="h-5 w-5" />}
          title="Focus Time"
          value={data.today.focusTime}
        />

      </div>

      {/* AI Recommendation */}

      <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">

        <div className="mb-2 flex items-center gap-2 font-semibold text-indigo-700">
          <Sparkles className="h-4 w-4" />
          AI Schedule Insight
        </div>

        <p className="text-sm leading-6 text-slate-700">
          {data.today.recommendation}
        </p>

      </div>

      {/* Actions */}

      <div className="mt-5 flex flex-wrap gap-3">

        <AIActionButton
          prompt={`Review today's executive calendar.

Provide:
• Scheduling conflicts
• Suggested improvements
• Preparation priorities
• Free time available
• Recommended focus blocks`}
        >
          Optimize Schedule
        </AIActionButton>

        <AIActionButton
          prompt={`Find the best available meeting slot today considering existing meetings and focus time.`}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Find Meeting Slot
        </AIActionButton>

        <AIActionButton
          prompt={`Help me schedule a new meeting.

Based on today's calendar:

• Find the best available time
• Avoid scheduling conflicts
• Recommend the ideal meeting duration
• Suggest attendees if applicable
• Generate a professional meeting agenda
• Draft a calendar invitation
• Highlight any preparation required before the meeting.`}
          className="bg-violet-600 hover:bg-violet-700"
        >
          <CalendarPlus className="h-4 w-4" />
          Schedule Meeting
        </AIActionButton>

      </div>

      <div className="mt-5 text-right">

        <button
          onClick={() =>
            window.open(
              "https://outlook.office.com/calendar/",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          Open Calendar →
        </button>

      </div>

    </section>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

function StatCard({
  icon,
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:shadow-sm">

      <div className="mb-3 flex items-center text-indigo-600">
        {icon}
      </div>

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}