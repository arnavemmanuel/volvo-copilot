import InfoSection from "./InfoSection";
import type { Meeting } from "../../types/meeting";

interface Props {
  open: boolean;
  meeting: Meeting | null;
  onClose: () => void;
}

export default function MeetingPreparationPanel({
  open,
  meeting,
  onClose,
}: Props) {
  if (!open || !meeting) return null;

  const start = new Date(meeting.start);
  const end = new Date(meeting.end);

  const durationMinutes = Math.round(
    (end.getTime() - start.getTime()) / 60000
  );

  const duration =
    durationMinutes >= 60
      ? `${Math.floor(durationMinutes / 60)}h ${
          durationMinutes % 60
        }m`
      : `${durationMinutes}m`;

  const meetingInfo = [
    `Duration: ${duration}`,
    `Status: ${
      meeting.status.charAt(0).toUpperCase() +
      meeting.status.slice(1)
    }`,
    `Meeting Type: ${
      meeting.isOnline ? "Online Meeting" : "In-person Meeting"
    }`,
    `Location: ${meeting.location ?? "Online"}`,
  ];

  const attendees = meeting.attendees.map((attendee) => {
    if (attendee.role) {
      return `${attendee.name} (${attendee.role})`;
    }

    return attendee.name;
  });

  const agenda = meeting.agenda
    ? meeting.agenda
        .split("\n")
        .filter((item) => item.trim().length > 0)
    : ["Agenda not available."];

  const documents = [
    "Meeting Deck",
    "Previous Meeting Notes",
    "Supporting Documents",
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="flex-1 bg-black/40"
        onClick={onClose}
      />

      <div className="w-[500px] bg-gray-50 h-screen overflow-y-auto shadow-2xl">
        <div className="sticky top-0 flex items-start justify-between border-b bg-white p-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {meeting.subject}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {start.toLocaleDateString([], {
                weekday: "long",
              })}
              {" • "}
              {start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" – "}
              {end.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              📍 {meeting.location ?? "Online"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 transition hover:text-slate-900"
          >
            ×
          </button>
        </div>

        <div className="space-y-5 p-6">
          <InfoSection
            title="Meeting Information"
            items={meetingInfo}
          />

          <InfoSection
            title="Attendees"
            items={attendees}
          />

          <InfoSection
            title="Agenda"
            items={agenda}
          />

          <InfoSection
            title="Related Documents"
            items={documents}
          />
        </div>
      </div>
    </div>
  );
}