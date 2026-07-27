export interface CalendarMeeting {
  id: number;
  title: string;
  durationMinutes: number;
  attendees: string[];
  preferredDate: string;
  preferredTime: string;
  locationType: string;
  status: "Scheduled" | "Cancelled";
}

let meetings: CalendarMeeting[] = [
  {
    id: 1,
    title: "Digital Production Leadership Meeting",
    durationMinutes: 60,
    attendees: [
      "Head of Digital Production",
      "Manufacturing Lead",
      "Automation Lead",
      "SAP Lead",
      "Plant Manager",
      "Quality Lead",
      "Engineering Manager",
      "PMO",
    ],
    preferredDate: "Today",
    preferredTime: "09:00",
    locationType: "Teams",
    status: "Scheduled",
  },
  {
    id: 2,
    title: "Steering Committee",
    durationMinutes: 90,
    attendees: [
      "Leadership Team",
      "Program Manager",
      "Finance",
      "Operations",
    ],
    preferredDate: "Today",
    preferredTime: "11:00",
    locationType: "Conference Room A",
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Plant Operations Review",
    durationMinutes: 60,
    attendees: [
      "Plant Manager",
      "Operations Lead",
      "Automation Team",
      "Quality Lead",
      "Production Engineer",
      "SAP Lead",
    ],
    preferredDate: "Today",
    preferredTime: "15:00",
    locationType: "Teams",
    status: "Scheduled",
  },
];


let nextMeetingId = 4;

export function createMeeting(
  meeting: Omit<CalendarMeeting, "id" | "status">
): CalendarMeeting {
  const createdMeeting: CalendarMeeting = {
    id: nextMeetingId++,
    ...meeting,
    status: "Scheduled",
  };

  meetings.push(createdMeeting);

  return createdMeeting;
}

export function getMeetings(): CalendarMeeting[] {
  return meetings;
}

export function findMeetingByTitle(
  title: string
): CalendarMeeting | undefined {
  return meetings.find(
    (meeting) =>
      meeting.title.toLowerCase() === title.toLowerCase()
  );
}

export function updateMeeting(
  id: number,
  updates: Partial<Omit<CalendarMeeting, "id">>
): CalendarMeeting | null {
  const meeting = meetings.find((m) => m.id === id);

  if (!meeting) {
    return null;
  }

  Object.assign(meeting, updates);

  return meeting;
}

export function cancelMeeting(id: number): boolean {
  const meeting = meetings.find((m) => m.id === id);

  if (!meeting) {
    return false;
  }

  meeting.status = "Cancelled";

  return true;
}
export function deleteMeeting(id: number): boolean {
  const index = meetings.findIndex((m) => m.id === id);

  if (index === -1) {
    return false;
  }

  meetings.splice(index, 1);

  return true;
}

export function getCalendarSummary() {
  const scheduledMeetings = meetings.filter(
    (meeting) => meeting.status === "Scheduled"
  );

  const meetingHours = scheduledMeetings.reduce(
    (total, meeting) => total + meeting.durationMinutes,
    0
  );

  return {
    today: {
      meetings: scheduledMeetings.length,
      highPriority: 2,
      totalMeetingHours: `${(meetingHours / 60).toFixed(1)}h`,
      focusTime: "2.5h",
      conflicts: 0,
      recommendation:
        scheduledMeetings.length > 5
          ? "Your calendar is heavily booked today. Consider moving low-priority meetings to preserve focus time."
          : "Your schedule is balanced with sufficient focus time available.",
    },

    week: {
      meetings: scheduledMeetings.length + 6,
      meetingHours: `${((meetingHours + 360) / 60).toFixed(1)}h`,
      freeAfternoons: 2,
      conflicts: 1,
    },

    year: {
      governanceEvents: 42,
      leadershipReviews: 18,
      plannedOffsites: 4,
    },
  };
}

