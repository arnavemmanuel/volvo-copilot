export interface ViolinNewsItem {
  id: number;
  title: string;
  category: string;
  priority: "Critical" | "High" | "Medium";
  summary: string;
  published: string;
}

export interface ViolinNewsResponse {
  summary: string;
  news: ViolinNewsItem[];
}

export function getViolinNews(): ViolinNewsResponse {
  return {
    summary:
      "7 important Digital Production updates today. Two require immediate executive attention.",

    news: [
      {
        id: 1,
        title: "SAP rollout delayed at Plant X",
        category: "Production",
        priority: "Critical",
        summary:
          "Deployment has been postponed due to unresolved integration issues.",
        published: "09:10 AM",
      },
      {
        id: 2,
        title: "Supplier escalation awaiting approval",
        category: "Supply Chain",
        priority: "Critical",
        summary:
          "Executive approval required before procurement can proceed.",
        published: "08:35 AM",
      },
      {
        id: 3,
        title: "MTM NG template v4.2 released",
        category: "Automation",
        priority: "High",
        summary:
          "New reusable scripts are now available for validation teams.",
        published: "Yesterday",
      },
      {
        id: 4,
        title: "Digital Production KPI report published",
        category: "Analytics",
        priority: "High",
        summary:
          "Weekly production metrics are available for leadership review.",
        published: "Yesterday",
      },
      {
        id: 5,
        title: "Cybersecurity awareness reminder",
        category: "IT",
        priority: "Medium",
        summary:
          "Mandatory security awareness campaign has begun.",
        published: "Today",
      }
    ]
  };
}