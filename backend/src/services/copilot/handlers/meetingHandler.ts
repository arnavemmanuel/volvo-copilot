import { askGemini } from "../../ai/geminiService.js";
import { shouldUseAI } from "../../ai/decision/shouldUseAI.js";
import { getMeetings } from "../../meetingService.js";
import { getMeetings as getCalendarMeetings } from "../../calendarService.js";
import { updateConversationContext } from "../context/conversationContext.js";

import type { CopilotResponse } from "../../copilotService.js";

export async function meetingHandler(
  userPrompt: string = ""
): Promise<CopilotResponse> {
  const meetings = getMeetings();
  const calendarMeetings = getCalendarMeetings();

  // Store first meeting for follow-up edits
  if (calendarMeetings.length > 0) {
    const meeting = calendarMeetings[0];

    updateConversationContext({
      lastIntent: "meeting_edit",
      lastMeeting: {
        id: meeting.id,
        title: meeting.title,
        durationMinutes: meeting.durationMinutes,
        attendees: meeting.attendees,
        preferredDate: meeting.preferredDate,
        preferredTime: meeting.preferredTime,
        locationType: meeting.locationType,
      },
    });
  }

  const decision = shouldUseAI(userPrompt);

  // -----------------------------
  // Retrieval (No AI)
  // -----------------------------
  if (!decision.useAI) {
    return {
      message: `# 📅 Today's Meetings

${meetings
  .map(
    (meeting) => `
## ${meeting.title}

**Time:** ${meeting.time}

**Duration:** ${meeting.duration}

**Location:** ${meeting.location}

**Attendees:** ${meeting.attendees}

**Priority:** ${meeting.priority}

**Status:** ${meeting.status}

---
`
  )
  .join("\n")}
`,
      actions: meetings.slice(0, 4).map((meeting, index) => ({
        id: meeting.id ?? `meeting-${index}`,
        entity: "meeting",
        title: meeting.title,
        subtitle: `${meeting.time} • ${meeting.location}`,
        route: "/meetings",
      })),
    };
  }

  // -----------------------------
  // AI Summary
  // -----------------------------
  const prompt = `
User Request

${userPrompt || "Summarize today's meetings"}

Meetings

${JSON.stringify(meetings, null, 2)}
`;

  const reply = await askGemini({
    systemPrompt: `
You are the Executive Assistant for the Head of Digital Production.

Summarize today's meetings.

Include:
- Executive Summary
- Important Meetings
- Scheduling Risks
- Recommendations
- Preparation Tips

Return GitHub Markdown.
`,
    userPrompt: prompt,
  });

  return {
    message: reply,
    actions: meetings.slice(0, 4).map((meeting, index) => ({
      id: meeting.id ?? `meeting-${index}`,
      entity: "meeting",
      title: meeting.title,
      subtitle: `${meeting.time} • ${meeting.location}`,
      route: "/meetings",
    })),
  };
}