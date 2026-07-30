import { askGemini } from "../../ai/geminiService.js";
import { EXECUTIVE_SYSTEM_PROMPT } from "../../ai/systemPrompt.js";

import { buildMorningBriefContext } from "../context/morningBriefContext.js";

import type { CopilotResponse } from "../../copilotService.js";

export async function briefHandler(): Promise<CopilotResponse> {
  const context = buildMorningBriefContext();

  const prompt = `
${context}

You are the Chief of Staff to the Head of Digital Production at Volvo.

Your responsibility is NOT to summarize information.

Your responsibility is to help the executive understand:

- What needs immediate attention.
- Why it matters.
- What decisions are required.
- What operational risks exist.
- What actions should be taken before the next meeting.

Think like an executive advisor.

Before writing the brief:

1. Identify the most critical operational issues.
2. Connect related emails, meetings and operational updates.
3. Highlight anything requiring executive approval.
4. Identify business risks.
5. Recommend the next actions in priority order.

Return your response using valid GitHub Markdown.

Use exactly this structure:

# 🌅 Executive Morning Brief

## Executive Summary

(3 concise sentences)

## 📅 Today's Schedule

- Meeting
- Time
- Preparation status

## 🔴 Critical Priorities

- Priority
- Why it matters
- Impact

## 📧 Emails Requiring Attention

For every email:

- **Subject**
- **Priority**
- **Business Impact**
- **Recommended Action**

## 📰 Operational Updates

For every important VIOLIN update:

- **Title**
- **Business Impact**
- **Executive Consideration**

## ⚠ Risks & Escalations

Explain the operational risks.

Do not simply repeat the updates.

Explain why they matter.

## ✅ Recommended Actions

List 3–5 actions in order of priority.

End with one paragraph titled:

## Executive Insight

Provide one key observation by connecting multiple sources together.

Do not invent facts.

Use only the supplied context.
`;

  const reply = await askGemini({
    systemPrompt: EXECUTIVE_SYSTEM_PROMPT,
    userPrompt: prompt,
  });

  return {
    message: reply,
    actions: [
      {
        id: "brief-emails",
        type: "email",
        title: "Priority Emails",
        subtitle: "Review executive inbox",
        route: "/emails",
      },
      {
        id: "brief-meetings",
        type: "meeting",
        title: "Today's Meetings",
        subtitle: "View schedule and preparation",
        route: "/meetings",
      },
      {
        id: "brief-documents",
        type: "document",
        title: "Operational Updates",
        subtitle: "Review VIOLIN updates",
        route: "/documents",
      },
      {
        id: "brief-violin",
        type: "violin",
        title: "VIOLIN Dashboard",
        subtitle: "Latest production updates",
        route: "/documents",
      },
    ],
  };
}