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

export function getViolinNews(): ViolinNewsResponse {
  return {
    summary:
      "7 important Digital Production updates today. Two require immediate executive attention.",

    news: [
      {
        id: 1,
        title: "SAP Rollout Delayed at Plant X",
        category: "Production",
        priority: "Critical",
        summary:
          "Deployment has been postponed due to unresolved integration issues.",
        published: "29 Jul 2026",
        readTime: "4 min read",

        relatedSystems: [
          "SAP",
          "MES",
          "MTM NG"
        ],

        affectedPlants: [
          "Plant X",
          "Ghent"
        ],

        content: `Production Overview

The planned SAP rollout at Plant X has been postponed following final integration validation.

Engineering teams identified synchronization issues between SAP and the Manufacturing Execution System that could impact production scheduling if deployment proceeds.

Key Findings

• Integration validation failed during final testing.
• Deployment has been temporarily paused.
• Production schedules remain unaffected while rollback procedures stay active.

Business Impact

The rollout is expected to be delayed by approximately one week while engineering completes remediation and validation activities.

Recommended Actions

• Complete remaining integration tests.
• Review deployment readiness.
• Validate rollback procedures.
• Communicate the revised rollout schedule to stakeholders.`
      },

      {
        id: 2,
        title: "Supplier Escalation Awaiting Approval",
        category: "Supply Chain",
        priority: "Critical",
        summary:
          "Executive approval required before procurement can proceed.",
        published: "29 Jul 2026",
        readTime: "3 min read",

        relatedSystems: [
          "Procurement",
          "SAP"
        ],

        affectedPlants: [
          "Bangalore"
        ],

        content: `Executive approval is required before procurement activities can continue.

The supplier has requested immediate confirmation to avoid delays in component deliveries.

Business Impact

Failure to approve within the required timeframe could affect scheduled production activities next week.

Recommended Actions

• Review supplier request.
• Approve procurement.
• Notify purchasing teams.`
      },

      {
        id: 3,
        title: "MTM NG Template v4.2 Released",
        category: "Automation",
        priority: "High",
        summary:
          "New reusable scripts are now available for validation teams.",
        published: "28 Jul 2026",
        readTime: "5 min read",

        relatedSystems: [
          "MTM NG",
          "Automation"
        ],

        affectedPlants: [
          "All Plants"
        ],

        content: `The MTM NG Template version 4.2 has been released.

The release introduces improvements in reusable validation scripts, execution performance and reporting.

Validation teams should migrate to the latest version after completing regression testing.

Recommended Actions

• Review release notes.
• Schedule migration.
• Validate existing automation assets.`
      },

      {
        id: 4,
        title: "Digital Production KPI Report Published",
        category: "Analytics",
        priority: "High",
        summary:
          "Weekly production metrics are available for leadership review.",
        published: "28 Jul 2026",
        readTime: "4 min read",

        relatedSystems: [
          "Power BI"
        ],

        affectedPlants: [
          "Global"
        ],

        content: `Weekly Digital Production KPIs are now available.

Highlights include improvements in automation coverage, execution success rates and production efficiency.

Leaders are encouraged to review performance trends before the monthly operations meeting.`
      },

      {
        id: 5,
        title: "Cybersecurity Awareness Reminder",
        category: "IT",
        priority: "Medium",
        summary:
          "Mandatory security awareness campaign has begun.",
        published: "Today",
        readTime: "2 min read",

        relatedSystems: [
          "CyberArk",
          "Microsoft Entra"
        ],

        affectedPlants: [
          "All Employees"
        ],

        content: `The annual cybersecurity awareness campaign has started.

Employees are required to complete the mandatory training module before the end of the month.

Topics include phishing, password security and privileged access management.`
      }
    ]
  };
}