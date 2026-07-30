import {
  Calendar,
  Clock,
  Users,
  MapPin,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useMeetings } from "../../hooks/useMeetings";
import SectionHeader from "../ai/SectionHeader";
import AIActionButton from "../ai/AIActionButton";

export default function MeetingsWidget() {
  const { meetings,nextMeeting, loading, error } = useMeetings();
  const navigate = useNavigate();

const upcomingMeetings = meetings
  .filter((m) => m.id !== nextMeeting?.id)
  .slice(0, 2);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">
          Loading today's meetings...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-6 text-red-600 shadow-sm">
        {error}
      </div>
    );
  }


  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionHeader
  icon={<Calendar className="h-5 w-5 text-blue-600" />}
  title="Today's Meetings"
  subtitle={`${meetings.length} meetings scheduled`}
  onAction={() => navigate("/meetings")}
/>

      {nextMeeting && (
        <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              NEXT MEETING
            </span>

            <span className="text-sm font-medium text-blue-700">
              {formatTime(nextMeeting.start)} –{" "}
              {formatTime(nextMeeting.end)}
            </span>
          </div>

          <h3 className="text-xl font-semibold text-slate-900">
            {nextMeeting.subject}
          </h3>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Starts today
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {nextMeeting.attendees.length} attendees
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {nextMeeting.location ?? "Online"}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <AIActionButton
              prompt={`Prepare me for the meeting "${nextMeeting.subject}".

Include:
• Meeting objective
• Suggested talking points
• Related emails
• Related VIOLIN updates
• Risks
• Follow-up actions`}
            >
              Prepare
            </AIActionButton>

            <Link
              to="/meetings"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Details
            </Link>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {upcomingMeetings.slice(1).map((meeting) => (
          <div
            key={meeting.id}
            className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {meeting.subject}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {formatTime(meeting.start)} –{" "}
                  {formatTime(meeting.end)}
                </p>
              </div>

              <AIActionButton
                prompt={`Prepare me for "${meeting.subject}"`}
              >
                Prepare
              </AIActionButton>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <button
  onClick={() =>
    window.open(
      "https://outlook.office.com/calendar/",
      "_blank"
    )
  }
  className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
>
  Open Full Calendar →
</button>
      </div>
    </section>
  );
}