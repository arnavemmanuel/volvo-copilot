import { useEffect, useState } from "react";
import { getMeetingPreparation } from "../services/api";

export interface MeetingPrep {
  title: string;
  objective: string;
  attendees: string[];
  relatedEmails: string[];
  violinUpdates: string[];
  previousActions: string[];
  discussionPoints: string[];
  risks: string[];
}

export function useMeetingPrep() {
  const [meeting, setMeeting] = useState<MeetingPrep | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMeetingPreparation();
        setMeeting(data);
      } catch {
        setError("Failed to load meeting preparation.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    meeting,
    loading,
    error,
  };
}