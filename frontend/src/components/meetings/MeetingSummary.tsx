import {
  CalendarDays,
  Clock,
  Timer,
  ArrowRight,
} from "lucide-react";
import { useMeetings } from "../../hooks/useMeetings";

export default function MeetingSummary() {
  const { meetings, nextMeeting } = useMeetings();

  const totalMeetings = meetings.length;

  const totalMinutes = meetings.reduce((total, meeting) => {
    const start = new Date(meeting.start);
    const end = new Date(meeting.end);

    return (
      total +
      Math.round((end.getTime() - start.getTime()) / 60000)
    );
  }, 0);

  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const totalMeetingTime =
    remainingMinutes === 0
      ? `${totalHours}h`
      : `${totalHours}h ${remainingMinutes}m`;

  const firstMeeting =
    meetings.length > 0
      ? new Date(meetings[0].start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--";

  const lastMeeting =
    meetings.length > 0
      ? new Date(
          meetings[meetings.length - 1].start
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--";


  

  const sortedMeetings = [...meetings].sort(
  (a, b) =>
    new Date(a.start).getTime() -
    new Date(b.start).getTime()
);

let largestGapMinutes = 0;

for (let i = 0; i < sortedMeetings.length - 1; i++) {
  const currentEnd = new Date(sortedMeetings[i].end).getTime();
  const nextStart = new Date(sortedMeetings[i + 1].start).getTime();

  const gap = Math.round((nextStart - currentEnd) / 60000);

  if (gap > largestGapMinutes) {
    largestGapMinutes = gap;
  }
}

const freeTime =
  largestGapMinutes >= 60
    ? `${Math.floor(largestGapMinutes / 60)}h ${
        largestGapMinutes % 60
      }m`
    : `${largestGapMinutes}m`;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Today's Overview
      </h2>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <SummaryItem
          icon={<CalendarDays size={20} />}
          title="Meetings Today"
          value={String(totalMeetings)}
        />

        <SummaryItem
          icon={<Clock size={20} />}
          title="Meeting Time"
          value={totalMeetingTime}
        />

        <SummaryItem
          icon={<ArrowRight size={20} />}
          title="Next Meeting"
          value={nextMeeting?.subject ?? "--"}
        />

        <SummaryItem
  icon={<Timer size={20} />}
  title="Free Time"
  value={freeTime}
/>

        <SummaryItem
          icon={<Clock size={20} />}
          title="First Meeting"
          value={firstMeeting}
        />

        <SummaryItem
          icon={<Clock size={20} />}
          title="Last Meeting"
          value={lastMeeting}
        />
      </div>
    </div>
  );
}

interface SummaryProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function SummaryItem({
  icon,
  title,
  value,
}: SummaryProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <p className="text-lg font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}