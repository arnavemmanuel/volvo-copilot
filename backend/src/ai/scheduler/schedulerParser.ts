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

- No markdown
- No explanation
- No code block
- JSON only
`,
      userPrompt: prompt,
    });

    console.log("\n========== SCHEDULER AI RESPONSE ==========");
    console.log(reply);
    console.log("==========================================\n");

    try {
      const meeting = JSON.parse(reply) as ParsedMeetingRequest;
      if ("error" in meeting) {
  return {
    success: false,
    meeting: null,
    warnings: [
      "AI scheduling service is temporarily unavailable."
    ],
    suggestions: [
      "Please try again in a few minutes."
    ],
  };
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

// Default title if Gemini leaves it blank
if (!meeting.title || meeting.title.trim().length === 0) {
  meeting.title = "Untitled Meeting";
}

      console.log("Parsed meeting:", meeting);

      return {
        success: true,
        meeting,
        warnings: [],
        suggestions: [],
      };
    } catch (error) {
      console.error("Scheduler JSON Parse Error:", error);

      return {
        success: false,
        meeting: null,
        warnings: [
          "Unable to understand the scheduling request."
        ],
        suggestions: [
          "Try including attendees, duration and date."
        ],
      };
    }
  }
}

export const schedulerParser = new SchedulerParser();