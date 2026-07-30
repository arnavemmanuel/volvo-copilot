import {
  getMeetings as getCalendarMeetings,
} from "./calendarService.js";

export interface Meeting {
  id: number;
  title: string;
  time: string;
  duration: string;
  attendees: number;
  location: string;
  priority: "high" | "medium" | "low";
  status: "upcoming" | "ongoing" | "completed";
}
function getMeetingStatus(
  meetingTime: string,
  durationMinutes: number
): "completed" | "ongoing" | "upcoming" {
  const now = new Date();

  const [hours, minutes] = meetingTime.split(":").map(Number);

  const start = new Date(now);
  start.setHours(hours, minutes, 0, 0);

  const end = new Date(start);
  end.setMinutes(end.getMinutes() + durationMinutes);

  if (now < start) {
    return "upcoming";
  }

  if (now >= start && now <= end) {
    return "ongoing";
  }

  return "completed";
}
export function getMeetings(): Meeting[] {
  const meetings = getCalendarMeetings();

  return meetings
    .filter((meeting) => meeting.status === "Scheduled")
    .map((meeting, index) => ({
      id: meeting.id,
      title: meeting.title,
      time: meeting.preferredTime,
      duration: `${meeting.durationMinutes} min`,
      attendees: meeting.attendees.length,
      location: meeting.locationType,

      // Temporary values until Microsoft Graph provides richer metadata
      priority:
        index === 0
          ? "high"
          : index === 1
          ? "medium"
          : "low",

      status: getMeetingStatus(
  meeting.preferredTime,
  meeting.durationMinutes
),
    }));
}