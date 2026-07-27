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

      status:
        index === 0
          ? "completed"
          : index === 1
          ? "ongoing"
          : "upcoming",
    }));
}