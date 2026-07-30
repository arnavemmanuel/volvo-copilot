export interface Attendee {
  id: string;
  name: string;
  email: string;
  role?: string;
  required: boolean;
  responseStatus?: "accepted" | "tentative" | "declined" | "none";
}

export interface Meeting {
  id: string;
  subject: string;
  start: string;
  end: string;

  location?: string;

  isOnline: boolean;

  teamsLink?: string;

  attendees: Attendee[];

  agenda?: string;

  description?: string;

  status: "upcoming" | "ongoing" | "completed";
}