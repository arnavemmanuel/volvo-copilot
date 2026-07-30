import { Calendar, Clock, MapPin, Users } from "lucide-react";
import type { Meeting } from "../../types/meeting";

interface Props {
  meeting: Meeting;
  onPrepare: () => void;
  onDetails: () => void;
}

export default function MeetingCard({ meeting, onPrepare, onDetails }: Props) {
  const start = new Date(meeting.start);
  const end = new Date(meeting.end);

  const startTime = start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = end.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const durationMinutes =
    Math.round((end.getTime() - start.getTime()) / 60000);

  const duration =
    durationMinutes >= 60
      ? `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`
      : `${durationMinutes}m`;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">
            {meeting.subject}
          </h3>

          <div className="flex flex-wrap gap-4 mt-3 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              {startTime} - {endTime}
            </div>

            <div className="flex items-center gap-1">
              <Calendar size={16} />
              {duration}
            </div>

            <div className="flex items-center gap-1">
              <Users size={16} />
              {meeting.attendees.length} attendees
            </div>

            <div className="flex items-center gap-1">
              <MapPin size={16} />
              {meeting.location || "Online"}
            </div>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            meeting.status === "ongoing"
              ? "bg-green-100 text-green-700"
              : meeting.status === "upcoming"
              ? "bg-blue-100 text-blue-700"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {meeting.status.toUpperCase()}
        </span>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={onPrepare}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Prepare
        </button>

        <button
    onClick={onDetails}
    className="border px-4 py-2 rounded-lg hover:bg-gray-50"
>
    Details
</button>
      </div>
    </div>
  );
}