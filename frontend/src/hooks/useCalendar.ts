import { useEffect, useState } from "react";
import { getCalendarSummary } from "../services/api";

export interface CalendarSummary {
  today: {
    meetings: number;
    highPriority: number;
    totalMeetingHours: string;
    focusTime: string;
    conflicts: number;
    recommendation: string;
  };

  week: {
    meetings: number;
    meetingHours: string;
    freeAfternoons: number;
    conflicts: number;
  };

  year: {
    governanceEvents: number;
    leadershipReviews: number;
    plannedOffsites: number;
  };
}

export function useCalendar() {
  const [data, setData] = useState<CalendarSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCalendar() {
      try {
        const result: CalendarSummary = await getCalendarSummary();
        setData(result);
      } catch {
        setError("Failed to load calendar summary.");
      } finally {
        setLoading(false);
      }
    }

    fetchCalendar();
  }, []);

  return {
    data,
    loading,
    error,
  };
}