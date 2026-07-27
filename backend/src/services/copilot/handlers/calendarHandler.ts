import { askGemini } from "../../ai/geminiService.js";
import { getCalendarSummary } from "../../calendarService.js";
import type { CopilotResponse } from "../../copilotService.js";

export async function calendarHandler(): Promise<CopilotResponse> {
  const calendar = getCalendarSummary();

  const reply = await askGemini({
    systemPrompt: `
You are an executive calendar assistant.

Summarize today's calendar and provide recommendations.

Keep it concise.
`,
    userPrompt: JSON.stringify(calendar, null, 2),
  });

  return {
    message: reply,
  };
}