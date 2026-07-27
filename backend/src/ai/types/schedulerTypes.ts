// backend/ai/types/SchedulerTypes.ts

export type MeetingPriority = "low" | "normal" | "high";

export type MeetingLocationType = "teams" | "in-person" | "hybrid";

export type TimePreference =
  | "morning"
  | "afternoon"
  | "evening"
  | "any";

export interface MeetingAttendee {
  name: string;
  email?: string;
  required: boolean;
}

export interface MeetingAttachment {
  name: string;
  url?: string;
}

export interface SchedulerRequest {
  prompt: string;
}

export interface ParsedMeetingRequest {
  title: string;

  durationMinutes: number;

  attendees: MeetingAttendee[];

  preferredDate?: string;

  preferredTime?: TimePreference;

  locationType: MeetingLocationType;

  priority: MeetingPriority;

  description?: string;

  attachments: MeetingAttachment[];

  requiresApproval: boolean;
}

export interface SchedulerSuggestion {
  success: boolean;

  meeting: ParsedMeetingRequest;

  warnings: string[];

  suggestions: string[];
}