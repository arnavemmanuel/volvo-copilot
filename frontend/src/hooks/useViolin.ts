import { useEffect, useState } from "react";
import { getViolinNews } from "../services/api";

export interface ViolinNewsItem {
  id: number;
  title: string;
  category: string;
  priority: "Critical" | "High" | "Medium";
  summary: string;
  published: string;

  readTime: string;
  content: string;
  relatedSystems: string[];
  affectedPlants: string[];
}

export interface ViolinNewsResponse {
  summary: string;
  news: ViolinNewsItem[];
}

export function useViolin() {
  const [data, setData] = useState<ViolinNewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        const result = await getViolinNews();
        setData(result);
      } catch {
        setError("Unable to load VIOLIN news.");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return {
    data,
    loading,
    error,
  };
}