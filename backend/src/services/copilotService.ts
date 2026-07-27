import { intentRouter } from "./copilot/intentRouter.js";

export interface CopilotResponse {
  message: string;
}

export async function askCopilot(
  question: string
): Promise<CopilotResponse> {
  return await intentRouter(question);
}