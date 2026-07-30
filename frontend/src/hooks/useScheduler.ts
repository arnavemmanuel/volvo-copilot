import { useEffect, useState } from "react";

export interface SuggestedMeeting {
  id: number;
  title: string;
  duration: string;
  attendees: string[];
  suggestedTime: string;
  confidence: number;
  reason: string;
}

const API_BASE_URL = "http://localhost:5000";

export function useScheduler() {
  const [meetings, setMeetings] = useState<SuggestedMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchScheduler() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/scheduler`);

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setMeetings(data);
      } catch {
        setError("Failed to load AI meeting suggestions.");
      } finally {
        setLoading(false);
      }
    }

    fetchScheduler();
  }, []);

  return {
    meetings,
    loading,
    error,
  };
}