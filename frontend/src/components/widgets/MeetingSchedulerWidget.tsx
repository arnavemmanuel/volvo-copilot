import { CalendarDays, Users, Sparkles } from "lucide-react";
import { useScheduler } from "../../hooks/useScheduler";

export default function MeetingSchedulerWidget() {
  const { meetings, loading, error } = useScheduler();

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        Loading AI Scheduler...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">
          AI Meeting Recommendations
        </h2>
      </div>

      <div className="space-y-5">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{meeting.title}</h3>

                <p className="text-sm text-gray-500">
                  {meeting.duration}
                </p>
              </div>

              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                {meeting.confidence}% Match
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-sm">
              <CalendarDays size={16} />
              {meeting.suggestedTime}
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm">
              <Users size={16} />
              {meeting.attendees.join(", ")}
            </div>

            <div className="mt-3 text-sm text-gray-600">
              💡 {meeting.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}