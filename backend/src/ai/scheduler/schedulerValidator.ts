// backend/ai/scheduler/schedulerValidator.ts

import {
  ParsedMeetingRequest,
} from "../types/schedulerTypes";

export class SchedulerValidator {
  validate(meeting: ParsedMeetingRequest): string[] {
    const errors: string[] = [];

    if (!meeting.title || meeting.title.trim().length === 0) {
      errors.push("Meeting title is required.");
    }

    if (meeting.durationMinutes <= 0) {
      errors.push("Meeting duration must be greater than zero.");
    }

    if (meeting.durationMinutes > 480) {
      errors.push("Meeting duration cannot exceed 8 hours.");
    }

    if (
      meeting.preferredTime &&
      !["morning", "afternoon", "evening", "any"].includes(
        meeting.preferredTime
      )
    ) {
      errors.push("Invalid preferred time.");
    }

    if (
      !["teams", "in-person", "hybrid"].includes(meeting.locationType)
    ) {
      errors.push("Invalid meeting location type.");
    }

    if (
      !["low", "normal", "high"].includes(meeting.priority)
    ) {
      errors.push("Invalid meeting priority.");
    }

    return errors;
  }
}

export const schedulerValidator = new SchedulerValidator();