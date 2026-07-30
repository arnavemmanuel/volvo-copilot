import { useEffect, useState } from "react";
import { getEmails } from "../services/api";

export interface Email {
  id: number;
  sender: string;
  subject: string;
  category: string;
  priority: "Critical" | "High" | "Medium";

  summary: string;
  suggestedAction: string;
  draftReply: string;

  body: string;        // NEW
  recipients: string;  // NEW
  received: string;
}

export function useEmails() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEmails() {
      try {
        const data: Email[] = await getEmails();
        setEmails(data);
      } catch {
        setError("Failed to load emails");
      } finally {
        setLoading(false);
      }
    }

    fetchEmails();
  }, []);

  return {
    emails,
    loading,
    error,
  };
}