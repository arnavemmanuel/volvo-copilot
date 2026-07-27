import { askGemini } from "../../ai/geminiService.js";
import { getMeetings } from "../../meetingService.js";
import type { CopilotResponse } from "../../copilotService.js";

export async function meetingHandler(): Promise<CopilotResponse> {
  const meetings = getMeetings();

  const prompt = `
Today's Meetings:

${JSON.stringify(meetings, null, 2)}
`;

  const reply = await askGemini({
    systemPrompt: `
You are an executive assistant.

Summarize today's meetings professionally.

Include:
- Overall schedule
- High priority meetings
- Recommendations
- Any risks

Keep it concise (under 200 words).
`,
    userPrompt: prompt,
  });

  return {
    message: reply,
  };
}