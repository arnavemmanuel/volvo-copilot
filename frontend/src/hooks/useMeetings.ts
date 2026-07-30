import { useEffect, useState } from "react";
import { getTodaysMeetings } from "../services/meetingService";
import type { Meeting } from "../types/meeting";

export function useMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTodaysMeetings();

        const sortedMeetings = [...data].sort(
          (a, b) =>
            new Date(a.start).getTime() -
            new Date(b.start).getTime()
        );

        setMeetings(sortedMeetings);
      } catch {
        setError("Failed to load meetings.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const now = new Date();

  const ongoingMeeting =
    meetings.find((meeting) => {
      const start = new Date(meeting.start);
      const end = new Date(meeting.end);

      return now >= start && now <= end;
    }) ?? null;

  const upcomingMeeting =
    meetings.find(
      (meeting) => new Date(meeting.start) > now
    ) ?? null;

  const nextMeeting =
    ongoingMeeting ??
    upcomingMeeting ??
    meetings[meetings.length - 1] ??
    null;

  return {
    meetings,
    nextMeeting,
    loading,
    error,
  };
}