export interface Email {
  id: number;
  sender: string;
  subject: string;
  category: string;
  priority: "Critical" | "High" | "Medium";
  summary: string;
  suggestedAction: string;
  draftReply: string;
  received: string;
}

export function getEmails(): Email[] {
  return [
    {
      id: 1,
      sender: "Plant Operations",
      subject: "Supplier Escalation - Immediate Approval Required",
      category: "Supply Chain",
      priority: "Critical",
      summary:
        "Supplier has reported a five-day delivery delay affecting Plant X production.",
      suggestedAction:
        "Review and approve the supplier escalation immediately.",
      draftReply:
        "Thanks for the update. Please proceed with the escalation while keeping me informed of any further delays.",
      received: "08:15 AM",
    },
    {
      id: 2,
      sender: "Digital Production",
      subject: "Weekly Governance Review",
      category: "Governance",
      priority: "High",
      summary:
        "Agenda and supporting documents for this week's governance review are ready.",
      suggestedAction:
        "Review the agenda before tomorrow's governance meeting.",
      draftReply:
        "Received. I'll review the agenda and come prepared for tomorrow's discussion.",
      received: "Yesterday",
    },
    {
      id: 3,
      sender: "HR",
      subject: "Mandatory Cybersecurity Awareness",
      category: "HR",
      priority: "Medium",
      summary:
        "Reminder regarding completion of the annual cybersecurity awareness training.",
      suggestedAction:
        "Complete the mandatory training before the deadline.",
      draftReply:
        "Thank you for the reminder. I will complete the training before the deadline.",
      received: "Today",
    },
  ];
}