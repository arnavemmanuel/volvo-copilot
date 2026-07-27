import { getMeetings } from "../../meetingService.js";
import { getEmails } from "../../emailService.js";
import { getViolinNews } from "../../violinService.js";

import { findRelevantEmails } from "../retrieval/emailRetriever.js";
import { findRelevantViolinUpdates } from "../retrieval/violinRetriever.js";

import { buildExecutiveContext } from "./executiveContextBuilder.js";


export function buildMeetingPreparationContext(
  userPrompt: string
): string {
  const meetings = getMeetings();
  const emails = getEmails();
  const violin = getViolinNews();

  const q = userPrompt.toLowerCase();

  const meeting =
    meetings.find((m) =>
      q.includes(m.title.toLowerCase())
    ) ||
    meetings.find((m) =>
      m.title
        .toLowerCase()
        .split(" ")
        .some((word) => q.includes(word))
    ) ||
    meetings.find((m) => m.status === "ongoing") ||
    meetings[0];

  const relevantEmails = findRelevantEmails({
    userPrompt,
    meetingTitle: meeting?.title,
    emails,
    limit: 3,
  });

  const relevantViolin = findRelevantViolinUpdates({
    userPrompt,
    meetingTitle: meeting?.title,
    updates: violin.news,
    limit: 3,
  });

  const executiveContext = buildExecutiveContext({
    meeting,
    emails: relevantEmails,
    violin: relevantViolin,
  });

 

  return `
${executiveContext}


`;
}