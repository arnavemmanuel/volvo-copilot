import { useEffect, useState } from "react";
import { getDashboardData } from "../services/api";

export interface DashboardData {
  morningBrief: {
    greeting: string;
    subtitle: string;
    meetings: number;
    emails: number;
    news: number;
    recommendation: string;
  };

  stats: {
    title: string;
    value: number;
    icon: string;
  }[];
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardData()
      .then((response) => setData(response))
      .catch(() => setError("Unable to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  return {
    data,
    loading,
    error,
  };
}