import { askGemini } from "../../ai/geminiService.js";
import { EXECUTIVE_SYSTEM_PROMPT } from "../../ai/systemPrompt.js";
import { buildMeetingPreparationContext } from "../context/meetingPreparationContext.js";
import { updateConversationContext } from "../context/conversationContext.js";

import type { CopilotResponse } from "../../copilotService.js";

export async function meetingPrepHandler(
  userPrompt: string
): Promise<CopilotResponse> {
  const context = buildMeetingPreparationContext(userPrompt);

  // Store conversation context for follow-up questions
  updateConversationContext({
    lastIntent: "meetingPrep",
    lastTopic: userPrompt,
    lastMeetingTitle: userPrompt,
  });

  const prompt = `
${context}

User Request:
${userPrompt}

You are preparing the executive to lead this meeting.

Your objective is to ensure they can make informed decisions immediately.

Do not simply summarize information.

Instead:

- Identify decisions that may be required.
- Connect emails with operational updates.
- Highlight dependencies.
- Explain potential business impact.
- Recommend talking points.
- Recommend follow-up questions.
`;

  const response = await askGemini({
    systemPrompt: EXECUTIVE_SYSTEM_PROMPT,
    userPrompt: prompt,
  });

  return {
    message: response,
  };
}