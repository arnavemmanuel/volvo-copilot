import { askGemini } from "../../ai/geminiService.js";
import type { CopilotResponse } from "../../copilotService.js";

export async function generalHandler(
  question: string
): Promise<CopilotResponse> {
  const response = await askGemini({
    systemPrompt: `
You are Executive Copilot for the Head of Volvo Digital Production.

Answer professionally and concisely.

If the user asks about Volvo internal information that you do not know,
say that you don't have access instead of making something up.
`,
    userPrompt: question,
  });

  return {
    message: response,
  };
}