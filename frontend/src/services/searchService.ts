import { priorityEmails } from "../data/emailsData";
import { todayMeetings } from "../data/meetingsData";
import { dashboardStats } from "../data/dashboardData";

export interface SearchResult {
  emails: typeof priorityEmails;
  meetings: typeof todayMeetings;
  dashboard: Array<(typeof dashboardStats)[number]>;
}

function contains(text: string, words: string[]) {
  const value = text.toLowerCase();

  return words.some((word) => value.includes(word));
}

export function searchEverything(query: string): SearchResult {
  const words = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const emails = priorityEmails.filter((email) =>
    contains(
      `${email.sender} ${email.subject} ${email.summary} ${email.category}`,
      words
    )
  );

  const meetings = todayMeetings.filter((meeting) =>
    contains(`${meeting.title} ${meeting.location}`, words)
  );

  const dashboard = dashboardStats.filter((stat) =>
    contains(stat.title, words)
  );

  return {
    emails,
    meetings,
    dashboard,
  };
}

/* -------------------------------------------------------------------------- */
/*                                Suggestions                                 */
/* -------------------------------------------------------------------------- */

function extractWords(text: string): string[] {
  return text
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length >= 3);
}

export function getSearchSuggestions(query: string): string[] {
  if (!query.trim()) return [];

  const search = query.toLowerCase();

  const words = new Set<string>();

  priorityEmails.forEach((email) => {
    extractWords(
      `${email.sender} ${email.subject} ${email.summary} ${email.category}`
    ).forEach((word) => words.add(word));
  });

  todayMeetings.forEach((meeting) => {
    extractWords(`${meeting.title} ${meeting.location}`).forEach((word) =>
      words.add(word)
    );
  });

  dashboardStats.forEach((stat) => {
    extractWords(stat.title).forEach((word) => words.add(word));
  });

  return [...words]
    .filter((word) => word.toLowerCase().includes(search))
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 8);
}