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

export function getMeetingPreparation(): MeetingPrep {
  return {
    title: "SAP Deployment Review",

    objective:
      "Review SAP rollout progress, validate MTM NG automation status, and approve deployment timeline.",

    attendees: [
      "Head of Digital Production",
      "SAP Lead",
      "Automation Lead",
      "Plant Manager"
    ],

    relatedEmails: [
      "SAP deployment status update",
      "Automation validation completed",
      "Plant readiness confirmation"
    ],

    violinUpdates: [
      "MTM NG template v4 released",
      "Automation framework enhancements available"
    ],

    previousActions: [
      "Finalize automation scripts",
      "Complete UAT",
      "Prepare rollout checklist"
    ],

    discussionPoints: [
      "Production readiness",
      "Risk mitigation",
      "Go-live approval",
      "Training completion"
    ],

    risks: [
      "Outstanding SAP transport approvals",
      "Delayed plant validation",
      "Automation coverage gaps"
    ]
  };
}