import { askGemini } from "../../ai/geminiService.js";
import { getCalendarSummary } from "../../calendarService.js";
import { shouldUseAI } from "../../ai/decision/shouldUseAI.js";
import type { CopilotResponse } from "../../copilotService.js";
import { formatCalendarSummary } from "../../formatters/calendarFormatter.js";

export async function calendarHandler(
  userPrompt: string
): Promise<CopilotResponse> {

  const calendar = getCalendarSummary();

  const decision = shouldUseAI(userPrompt);

  if (!decision.useAI) {

    return {
    message: formatCalendarSummary(calendar),
};

  }

  const reply = await askGemini({
    systemPrompt: `
You are an executive calendar assistant.

If the user asks about availability:

- Identify available meeting slots.
- Recommend the best slot.
- Mention any conflicts.

If the user asks for a calendar summary:

- Summarize today's meetings.
- Highlight important meetings.
- Mention scheduling conflicts.

Return concise GitHub Markdown.
`,
    userPrompt: JSON.stringify(calendar, null, 2),
  });

  return {
    message: reply,
  };
}