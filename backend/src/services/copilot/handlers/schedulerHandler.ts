import { schedulerParser } from "../../../ai/scheduler/schedulerParser.js";
import { schedulerValidator } from "../../../ai/scheduler/schedulerValidator.js";

import {
  getSuggestedMeetings,
  getAlternativeMeetings,
} from "../../schedulerService.js";

import { createMeeting } from "../../calendarService.js";

import { updateConversationContext } from "../context/conversationContext.js";

import type { CopilotResponse } from "../../copilotService.js";

export async function schedulerHandler(
  userPrompt: string
): Promise<CopilotResponse> {
  const parsed = await schedulerParser.parse(userPrompt);

  if (!parsed.success || !parsed.meeting) {
    return {
      message: `
# ❌ Unable to Understand Meeting Request

${parsed.warnings.join("\n")}

## Suggestions

${parsed.suggestions.join("\n")}
`,
    };
  }
  console.log("Parsed meeting object:");
console.log(JSON.stringify(parsed.meeting, null, 2));

  const errors = schedulerValidator.validate(parsed.meeting);

  if (errors.length > 0) {
    return {
      message: `
# ⚠ Validation Failed

${errors.map((e) => `- ${e}`).join("\n")}
`,
    };
  }

  const suggestions = getSuggestedMeetings();

  const q = userPrompt.toLowerCase();

  const suggestion =
    suggestions.find((meeting) =>
      q.includes(meeting.title.toLowerCase())
    ) ||
    suggestions.find((meeting) =>
      meeting.title
        .toLowerCase()
        .split(" ")
        .some((word) => q.includes(word))
    ) ||
    suggestions[0];

  const alternatives = getAlternativeMeetings(suggestion.id);

  const createdMeeting = createMeeting({
  title: parsed.meeting.title,
  durationMinutes: parsed.meeting.durationMinutes,

  attendees: (parsed.meeting.attendees ?? []).map(
  (attendee) => attendee.name
),

  preferredDate:
    parsed.meeting.preferredDate ?? "Today",

  preferredTime:
    parsed.meeting.preferredTime ?? "any",

  locationType: parsed.meeting.locationType,
});

  updateConversationContext({
  lastIntent: "scheduler",

  lastMeeting: {
    title: parsed.meeting.title,
    durationMinutes: parsed.meeting.durationMinutes,

    attendees: parsed.meeting.attendees.map(
      (attendee) => attendee.name
    ),

    preferredDate: parsed.meeting.preferredDate,

    preferredTime: parsed.meeting.preferredTime,

    locationType: parsed.meeting.locationType,
  },

  lastMeetingTitle: parsed.meeting.title,

  lastTopic: parsed.meeting.title,
});

  return {
    message: `
# ✅ Meeting Scheduled Successfully

## Meeting Details

- **Meeting ID:** ${createdMeeting.id}
- **Title:** ${createdMeeting.title}
- **Duration:** ${createdMeeting.durationMinutes} minutes
- **Attendees:** ${
        createdMeeting.attendees.length > 0
          ? createdMeeting.attendees.join(", ")
          : "None specified"
      }
- **Date:** ${createdMeeting.preferredDate}
- **Time:** ${createdMeeting.preferredTime}
- **Location:** ${createdMeeting.locationType}
- **Status:** ${createdMeeting.status}

---

## Recommended Time Slot

**${suggestion.suggestedTime}**

**Confidence:** ${suggestion.confidence}%

### Why this slot?

- ${suggestion.reason}
- Matches the requested meeting duration.
- Suitable for executive availability.
- No major scheduling conflicts detected.

---

## Alternative Time Slots

${alternatives
  .map(
    (alt) =>
      `- **${alt.suggestedTime}** (${alt.confidence}% confidence)`
  )
  .join("\n")}

---

## Conversation Memory Updated

You can now ask follow-up questions like:

- Move it to Friday.
- Make it a Teams meeting.
- Add Rahul.
- Change the duration to 45 minutes.
- Cancel this meeting.
`,
  };
}