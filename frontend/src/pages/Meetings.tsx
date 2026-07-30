import Layout from "../components/Layout";
import MeetingSummary from "../components/meetings/MeetingSummary";
import MeetingsTimeline from "../components/meetings/MeetingsTimeline";
import PageLoader from "../components/ui/PageLoader";
import { useCopilot } from "../hooks/useCopilot";
import { useMeetings } from "../hooks/useMeetings";
import {
  Users,
  Mail,
  FileText,
  Clock,
  ExternalLink
} from "lucide-react";

export default function Meetings() {
  const { nextMeeting, loading, error } = useMeetings();
   const { sendPrompt } = useCopilot();

  if (loading) {
    return <PageLoader />;
  }

  if (error || !nextMeeting) {
    return (
      <Layout>
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
          {error || "No meetings available."}
        </div>
      </Layout>
    );
  }

  const start = new Date(nextMeeting.start);
  const end = new Date(nextMeeting.end);

 

  const meetingDate = start.toLocaleDateString([], {
    weekday: "long",
  });

  const startTime = start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = end.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const durationMinutes = Math.round(
    (end.getTime() - start.getTime()) / 60000
  );

  const duration =
    durationMinutes >= 60
      ? `${Math.floor(durationMinutes / 60)}h ${
          durationMinutes % 60
        }m`
      : `${durationMinutes}m`;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                  Upcoming Meeting
                </p>

                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                  {nextMeeting.subject}
                </h1>

                <p className="mt-2 text-slate-500">
                  {meetingDate} • {startTime} – {endTime}
                </p>

                {nextMeeting.location && (
                  <p className="mt-1 text-sm text-slate-500">
                    📍 {nextMeeting.location}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
  onClick={() => {
    const attendeeList = nextMeeting.attendees
      .map((a) => a.name)
      .join(", ");

    sendPrompt(`
Prepare me for this executive meeting.

Meeting:
${nextMeeting.subject}

Time:
${startTime} - ${endTime}

Location:
${nextMeeting.location ?? "Online"}

Attendees:
${attendeeList}

Agenda:
${nextMeeting.agenda ?? "No agenda provided."}

Description:
${nextMeeting.description ?? "No additional description."}

Provide:

• Executive summary

• Key talking points

• Risks to be aware of

• Important questions I should ask

• Decisions likely required

• Recommended preparation before the meeting
    `);
  }}
  className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
>
  Prepare
</button>

                {nextMeeting.teamsLink && (
                  <a
  href={nextMeeting.teamsLink}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 rounded-xl border border-blue-200 px-5 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
>
  Open Teams
  <ExternalLink size={16} />
</a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 p-5">
                <Users className="mb-3 h-6 w-6 text-blue-600" />

                <p className="text-2xl font-bold">
                  {nextMeeting.attendees.length}
                </p>

                <p className="text-sm text-slate-500">
                  Attendees
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <Mail className="mb-3 h-6 w-6 text-blue-600" />

                <p className="text-2xl font-bold">
                  5
                </p>

                <p className="text-sm text-slate-500">
                  Related Emails
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <FileText className="mb-3 h-6 w-6 text-blue-600" />

                <p className="text-2xl font-bold">
                  3
                </p>

                <p className="text-sm text-slate-500">
                  Documents
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <Clock className="mb-3 h-6 w-6 text-blue-600" />

                <p className="text-2xl font-bold">
                  {duration}
                </p>

                <p className="text-sm text-slate-500">
                  Duration
                </p>
              </div>
            </div>
          </div>
        </div>

        <MeetingSummary />

        <MeetingsTimeline />
      </div>
    </Layout>
  );
}