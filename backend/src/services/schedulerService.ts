export interface SuggestedMeeting {
  id: number;
  title: string;
  duration: string;
  attendees: string[];
  suggestedTime: string;
  confidence: number;
  reason: string;
}

export function getSuggestedMeetings(): SuggestedMeeting[] {
  return [
    {
      id: 1,
      title: "SAP Deployment Review",
      duration: "45 min",
      attendees: [
        "Head of Digital Production",
        "SAP Lead",
        "Plant Manager",
      ],
      suggestedTime: "Tuesday • 2:00 PM – 2:45 PM",
      confidence: 96,
      reason:
        "All attendees available, no calendar conflicts, preserves morning focus time.",
    },
    {
      id: 2,
      title: "MTM NG Process Review",
      duration: "30 min",
      attendees: [
        "Automation Team",
        "Quality Lead",
      ],
      suggestedTime: "Wednesday • 11:00 AM – 11:30 AM",
      confidence: 91,
      reason:
        "Minimal overlap with governance meetings and highest participant availability.",
    },
    {
      id: 3,
      title: "Executive Weekly Sync",
      duration: "60 min",
      attendees: [
        "Leadership Team",
      ],
      suggestedTime: "Friday • 3:00 PM – 4:00 PM",
      confidence: 88,
      reason:
        "Afternoon slot avoids operational peak hours and leaves buffer before end of week.",
    },
  ];
}

export function getAlternativeMeetings(
  excludeId: number
): SuggestedMeeting[] {
  return getSuggestedMeetings().filter(
    (meeting) => meeting.id !== excludeId
  );
}