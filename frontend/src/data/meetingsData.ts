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

export interface FreeSlot {
  id: number;
  start: string;
  end: string;
  duration: string;
}

export const todayMeetings: Meeting[] = [
  {
    id: 1,
    title: "Digital Production Leadership Meeting",
    time: "09:00",
    duration: "60 min",
    attendees: 8,
    location: "Teams",
    priority: "high",
    status: "completed",
  },
  {
    id: 2,
    title: "Steering Committee",
    time: "11:00",
    duration: "90 min",
    attendees: 14,
    location: "Conference Room A",
    priority: "high",
    status: "ongoing",
  },
  {
    id: 3,
    title: "Plant Operations Review",
    time: "15:00",
    duration: "60 min",
    attendees: 6,
    location: "Teams",
    priority: "medium",
    status: "upcoming",
  },
];

export const freeSlots: FreeSlot[] = [
  {
    id: 1,
    start: "13:00",
    end: "15:00",
    duration: "2 hours",
  },
];