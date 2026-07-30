import { askGemini } from "../../services/ai/geminiService.js";

import {
  ParsedMeetingRequest,
  SchedulerSuggestion,
} from "../types/schedulerTypes.js";

export class SchedulerParser {
  async parse(prompt: string): Promise<SchedulerSuggestion> {
    const reply = await askGemini({
      systemPrompt: `
You are an enterprise meeting scheduling assistant.

Extract meeting details from the user's request.

Return ONLY valid JSON.

Schema:

{
  "title": "",
  "durationMinutes": 30,
  "attendees": [],
  "preferredDate": "",
  "preferredTime": "morning",
  "locationType": "teams",
  "priority": "normal",
  "description": "",
  "attachments": [],
  "requiresApproval": true
}

Rules:

- Return ONLY JSON
- No markdown
- No explanations
- No code blocks
- Use "teams", "in-person", or "hybrid" for locationType
- Use "low", "normal", or "high" for priority
`,
      userPrompt: prompt,
    });

    console.log("\n========== SCHEDULER AI RESPONSE ==========");
    console.log(reply);
    console.log("==========================================\n");

    // AI failed or returned plain text instead of JSON
    if (!reply || !reply.trim().startsWith("{")) {
      return {
        success: false,
        meeting: null,
        warnings: [
          reply || "AI scheduling service is unavailable."
        ],
        suggestions: [
          "Please try again in a few minutes."
        ],
      };
    }

    try {
      const meeting = JSON.parse(reply) as ParsedMeetingRequest;
      const q = prompt.toLowerCase();
      console.log("Prompt:", q);

const exactTime = q.match(
  /\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/i
);
console.log("Prompt:", q);
console.log("Exact Time:", exactTime);

console.log("Exact Time Match:", exactTime);
  

// Date
if (q.includes("today")) {
  meeting.preferredDate = "Today";
} else if (q.includes("tomorrow")) {
  meeting.preferredDate = "Tomorrow";
} else {
  const day = q.match(
    /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/
  );

  if (day) {
    meeting.preferredDate =
      day[0].charAt(0).toUpperCase() + day[0].slice(1);
  }
}

// Normalize preferred time only if Gemini returned a day period.
// Keep exact times like "10:00 AM".

if (meeting.preferredTime) {

  const time = meeting.preferredTime.toLowerCase();

  if (
    time === "morning" ||
    time === "afternoon" ||
    time === "evening" ||
    time === "any"
  ) {
    meeting.preferredTime = time as any;
  }

  // Otherwise keep Gemini's exact time (e.g. 10:00 AM, 2:30 PM)

} else if (exactTime) {

  const hour = Number(exactTime[1]);
  const minute = exactTime[2] ?? "00";
  const period = exactTime[3].toUpperCase();

  meeting.preferredTime = `${hour}:${minute} ${period}` as any;

} else {

  meeting.preferredTime = "any";

}

// Duration
const duration = q.match(/(\d+)\s*(minute|min)/);

if (duration) {
  meeting.durationMinutes = Number(duration[1]);
}

      // Normalize location
      meeting.locationType =
        meeting.locationType?.toLowerCase() === "teams"
          ? "teams"
          : meeting.locationType?.toLowerCase() === "in person"
          ? "in-person"
          : meeting.locationType?.toLowerCase() === "hybrid"
          ? "hybrid"
          : "teams";

      // Normalize priority
      meeting.priority =
        meeting.priority?.toLowerCase() === "low"
          ? "low"
          : meeting.priority?.toLowerCase() === "high"
          ? "high"
          : "normal";

      // Default title
      if (!meeting.title || meeting.title.trim() === "") {
        meeting.title = "Untitled Meeting";
      }

      // Default duration
      if (!meeting.durationMinutes || meeting.durationMinutes <= 0) {
        meeting.durationMinutes = 30;
      }

      // Default attendees
      if (!meeting.attendees) {
        meeting.attendees = [];
      }

      // Default date
      if (!meeting.preferredDate) {
        meeting.preferredDate = "Today";
      }


      console.log("Parsed meeting:");
      console.log(JSON.stringify(meeting, null, 2));

      return {
        success: true,
        meeting,
        warnings: [],
        suggestions: [],
      };
    } catch (error) {
      console.error("Scheduler JSON Parse Error:", error);
      console.error("Raw AI Response:", reply);

      return {
        success: false,
        meeting: null,
        warnings: [
          "AI returned an invalid scheduling response."
        ],
        suggestions: [
          "Please try your request again."
        ],
      };
    }
  }
}

export const schedulerParser = new SchedulerParser();