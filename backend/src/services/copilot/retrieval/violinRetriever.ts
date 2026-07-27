import type { ViolinNewsItem } from "../../violinService.js";

interface RetrieveViolinOptions {
  userPrompt: string;
  meetingTitle?: string;
  updates: ViolinNewsItem[];
  limit?: number;
}

export function findRelevantViolinUpdates({
  userPrompt,
  meetingTitle,
  updates,
  limit = 3,
}: RetrieveViolinOptions): ViolinNewsItem[] {
  const searchText =
    `${userPrompt} ${meetingTitle ?? ""}`.toLowerCase();

  return updates
    .map((update) => ({
      update,
      score: scoreUpdate(update, searchText),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.update);
}

function scoreUpdate(
  update: ViolinNewsItem,
  searchText: string
): number {
  let score = 0;

  const keywords = searchText
    .split(/\s+/)
    .filter((word) => word.length > 2);

  for (const keyword of keywords) {
    if (update.title.toLowerCase().includes(keyword))
      score += 5;

    if (update.summary.toLowerCase().includes(keyword))
      score += 3;

    if (update.category.toLowerCase().includes(keyword))
      score += 2;
  }

  switch (update.priority) {
    case "Critical":
      score += 8;
      break;

    case "High":
      score += 5;
      break;

    case "Medium":
      score += 2;
      break;
  }

  return score;
}