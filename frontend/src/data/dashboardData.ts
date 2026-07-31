export const dashboardStats = [
  {
    title: "Today's Meetings",
    value: 6,
    icon: "calendar",
  },
  {
    title: "Unread Emails",
    value: 18,
    icon: "mail",
  },
  {
    title: "Important Documents",
    value: 24,
    icon: "file",
  },
  {
    title: "Today's Priorities",
    value: 7,
    icon: "check",
  },
] as const;
export interface Activity {
  id: number;
  time: string;
  type: "email" | "meeting" | "news" | "action";
  title: string;
  description: string;
}

export const aiActivity = [
  {
    id: 1,
    time: "09:02",
    type: "email",
    title: "Supplier delay detected",
    description: "Review before the Steering Committee meeting.",
  },
  {
    id: 2,
    time: "09:08",
    type: "meeting",
    title: "Steering Committee",
    description: "Meeting begins in 90 minutes.",
  },
  {
    id: 3,
    time: "09:15",
    type: "news",
    title: "VIOLIN Summary Ready",
    description: "5 production updates summarized.",
  },
  {
    id: 4,
    time: "09:20",
    type: "action",
    title: "Largest Free Slot",
    description: "1:00 PM - 3:00 PM available for scheduling.",
  },
];