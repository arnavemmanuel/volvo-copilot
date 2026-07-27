import type { Email } from "../../emailService.js";

interface RetrieveEmailOptions {
  userPrompt: string;
  meetingTitle?: string;
  emails: Email[];
  limit?: number;
}

export function findRelevantEmails({
  userPrompt,
  meetingTitle,
  emails,
  limit = 3,
}: RetrieveEmailOptions): Email[] {
  const searchText =
    `${userPrompt} ${meetingTitle ?? ""}`.toLowerCase();

  return emails
    .map((email) => ({
      email,
      score: scoreEmail(email, searchText),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.email);
}

function scoreEmail(
  email: Email,
  searchText: string
): number {
  let score = 0;

  const keywords = searchText
    .split(/\s+/)
    .filter((word) => word.length > 2);

  for (const keyword of keywords) {
    if (email.subject.toLowerCase().includes(keyword))
      score += 5;

    if (email.summary.toLowerCase().includes(keyword))
      score += 3;

    if (email.sender.toLowerCase().includes(keyword))
      score += 2;

    if (email.category.toLowerCase().includes(keyword))
      score += 2;
  }

  switch (email.priority) {
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