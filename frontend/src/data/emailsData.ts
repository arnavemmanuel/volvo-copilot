export interface Email {
  id: number;
  sender: string;
  subject: string;
  received: string;
  priority: "high" | "medium" | "low";
  category: "Action Required" | "Review" | "FYI";
  summary: string;
}

export const emailSummary = {
  urgent: 4,
  review: 7,
  information: 18,
};

export const priorityEmails: Email[] = [
  {
    id: 1,
    sender: "Plant Manager",
    subject: "Supplier Delay Impact",
    received: "08:20",
    priority: "high",
    category: "Action Required",
    summary:
      "Supplier shipment delayed by 24 hours. Decision required before noon.",
  },
  {
    id: 2,
    sender: "SAP Program",
    subject: "Go-live Readiness",
    received: "07:45",
    priority: "medium",
    category: "Review",
    summary:
      "Testing complete. Review deployment readiness report before steering committee.",
  },
  {
    id: 3,
    sender: "Finance",
    subject: "Budget Update",
    received: "Yesterday",
    priority: "low",
    category: "FYI",
    summary:
      "Monthly production budget remains within approved limits.",
  },
];