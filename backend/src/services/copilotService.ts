import { intentRouter } from "./copilot/intentRouter.js";

export interface CopilotAction {
  id: string;
  type: "email" | "meeting" | "document" | "violin";
  title: string;
  subtitle: string;
  route: string;
}

export interface CopilotResponse {
  message: string;
  actions?: CopilotAction[];
}

export async function askCopilot(
  question: string
): Promise<CopilotResponse> {
  return await intentRouter(question);
}