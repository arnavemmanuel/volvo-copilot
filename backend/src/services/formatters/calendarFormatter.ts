export function formatCalendarSummary(calendar: any): string {
  return `
# 📅 Today's Calendar

## Today

- **Meetings:** ${calendar.today.meetings}
- **High Priority:** ${calendar.today.highPriority}
- **Meeting Hours:** ${calendar.today.totalMeetingHours}
- **Focus Time:** ${calendar.today.focusTime}
- **Conflicts:** ${calendar.today.conflicts}

### Recommendation
${calendar.today.recommendation}

---

## This Week

- **Meetings:** ${calendar.week.meetings}
- **Meeting Hours:** ${calendar.week.meetingHours}
- **Free Afternoons:** ${calendar.week.freeAfternoons}
- **Conflicts:** ${calendar.week.conflicts}

---

## This Year

- Governance Events: ${calendar.year.governanceEvents}
- Leadership Reviews: ${calendar.year.leadershipReviews}
- Planned Offsites: ${calendar.year.plannedOffsites}
`;
}