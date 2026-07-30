import { askGemini } from "../../ai/geminiService.js";
import { EXECUTIVE_SYSTEM_PROMPT } from "../../ai/systemPrompt.js";
import { buildMeetingPreparationContext } from "../context/meetingPreparationContext.js";
import { updateConversationContext } from "../context/conversationContext.js";

import type { CopilotResponse } from "../../copilotService.js";

export async function meetingPrepHandler(
  userPrompt: string
): Promise<CopilotResponse> {

  const context = buildMeetingPreparationContext(userPrompt);

  updateConversationContext({
    lastIntent: "meeting_prep",
    lastTopic: userPrompt,
    lastMeetingTitle: userPrompt,
  });

  const prompt = `
${context}

User Request:
${userPrompt}

Prepare the executive for this meeting.

Include:

- Executive Summary
- Meeting Objective
- Key Decisions Required
- Risks & Dependencies
- Relevant Emails
- Relevant VIOLIN Updates
- Talking Points
- Questions to Ask
- Recommended Next Actions

Return GitHub Markdown.
`;

  const reply = await askGemini({
    systemPrompt: EXECUTIVE_SYSTEM_PROMPT,
    userPrompt: prompt,
  });

  return {
    message: reply,
  };
}