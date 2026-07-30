export interface AIDecision {
  useAI: boolean;
  reason: string;
}

const AI_KEYWORDS = [
  "summarize",
  "summary",
  "prioritize",
  "important",
  "urgent",
  "relevant",
  "focus",
  "recommend",
  "suggest",
  "analyze",
  "analysis",
  "prepare",
  "agenda",
  "action items",
  "rewrite",
  "draft",
  "explain",
  "compare",
  "risks",
  "insights",
];

export function shouldUseAI(userPrompt?: string): AIDecision {

  if (!userPrompt) {
    return {
      useAI: true,
      reason: "No prompt provided.",
    };
  }

  const prompt = userPrompt.toLowerCase();

  const needsAI = AI_KEYWORDS.some(keyword =>
    prompt.includes(keyword)
  );

  return {
    useAI: needsAI,
    reason: needsAI
      ? "Reasoning requested."
      : "Simple retrieval."
  };
}