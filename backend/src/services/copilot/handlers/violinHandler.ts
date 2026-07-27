import { askGemini } from "../../ai/geminiService.js";
import { getViolinNews } from "../../violinService.js";
import type { CopilotResponse } from "../../copilotService.js";

export async function violinHandler(): Promise<CopilotResponse> {
  const violin = getViolinNews();

  const reply = await askGemini({
    systemPrompt: `
You are an executive assistant.

Summarize the important VIOLIN updates.

Prioritize critical items first.

Keep it concise.
`,
    userPrompt: JSON.stringify(violin, null, 2),
  });

  return {
    message: reply,
  };
}