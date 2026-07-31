import { askGemini } from "../../ai/geminiService.js";
import { shouldUseAI } from "../../ai/decision/shouldUseAI.js";
import { getViolinNews } from "../../violinService.js";
import type { CopilotResponse } from "../../copilotService.js";

export async function violinHandler(
  userPrompt: string = ""
): Promise<CopilotResponse> {

  const violin = getViolinNews();

  const decision = shouldUseAI(userPrompt);

  // ---------------------------------
  // Retrieval (NO AI)
  // ---------------------------------

  if (!decision.useAI) {

    return {
      message: `# 📰 VIOLIN Updates

${violin.news
  .map(
    (item) => `
## ${item.title}

**Priority:** ${item.priority}

**Category:** ${item.category}

**Published:** ${item.published}

${item.summary}

---
`
  )
  .join("\n")}
`,
      actions: violin.news.slice(0, 4).map((item, index) => ({
        id: String(item.id) ?? `violin-${index}`,
        type: "violin",
        title: item.title,
        subtitle: `${item.priority} • ${item.category}`,
        route: "/documents",
      })),
    };

  }

  // ---------------------------------
  // AI Intelligence
  // ---------------------------------

  const prompt = `
User Request

${userPrompt}

VIOLIN Updates

${JSON.stringify(violin, null, 2)}
`;

  const reply = await askGemini({

    systemPrompt: `
You are the Executive Assistant for the Head of Digital Production.

Your responsibilities:

- Prioritize important updates.
- Highlight executive risks.
- Explain business impact.
- Recommend actions.

Return GitHub Markdown.

Format:

# 📰 Executive VIOLIN Brief

## 🔴 Critical

## 🟠 High Priority

## 🟢 Other Updates

## ✅ Recommended Actions
`,

    userPrompt: prompt,

  });

  return {
    message: reply,
    actions: violin.news.slice(0, 4).map((item, index) => ({
      id: String(item.id) ?? `violin-${index}`,
      type: "violin",
      title: item.title,
      subtitle: `${item.priority} • ${item.category}`,
      route: "/documents",
    })),
  };

}
