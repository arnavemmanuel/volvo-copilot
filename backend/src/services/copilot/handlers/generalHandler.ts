import type { CopilotResponse } from "../../copilotService.js";

export async function generalHandler(): Promise<CopilotResponse> {
  return {
    message:
      "Hello! I'm your Executive Copilot. I can help you summarize meetings, review emails, prepare for meetings, provide executive briefs, analyze your calendar, and monitor VIOLIN updates. What would you like to do?",
  };
}