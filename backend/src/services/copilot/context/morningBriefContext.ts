import { getCalendarSummary } from "../../calendarService.js";
import { getMeetings } from "../../meetingService.js";
import { getEmails } from "../../emailService.js";
import { getViolinNews } from "../../violinService.js";

import { buildExecutiveContext } from "./executiveContextBuilder.js";


export function buildMorningBriefContext(): string {
  const calendar = getCalendarSummary();
  const meetings = getMeetings();
  const emails = getEmails();
  const violin = getViolinNews();

  const todaysMeetings = meetings.slice(0, 3);

  const criticalEmails = emails
    .filter(
      (email) =>
        email.priority === "Critical" ||
        email.priority === "High"
    )
    .slice(0, 3);

  const criticalViolin = violin.news
    .filter(
      (item) =>
        item.priority === "Critical" ||
        item.priority === "High"
    )
    .slice(0, 3);

  const executiveContext = buildExecutiveContext({
    meeting: todaysMeetings,
    emails: criticalEmails,
    violin: criticalViolin,
  });

  const executiveInsights = buildExecutiveInsights(
    criticalEmails,
    criticalViolin
  );

  return `
========== EXECUTIVE MORNING BRIEF ==========

CALENDAR

${JSON.stringify(calendar, null, 2)}

${executiveContext}

${executiveInsights}
`;
}