export interface Email {
  id: number;
  sender: string;
  recipients: string;
  subject: string;
  category: string;
  priority: "Critical" | "High" | "Medium";
  received: string;

  body: string;

  summary: string;
  draftReply: string;
}

export function getEmails(): Email[] {
  return [
    {
      id: 1,
      sender: "Plant Operations",
      recipients: "Executive Leadership Team",
      subject: "Supplier Escalation – Immediate Approval Required",
      category: "Supply Chain",
      priority: "Critical",
      received: "Today • 08:15 AM",

      body: `Dear Executive Leadership Team,

Our primary supplier has informed us of an unexpected logistics disruption that will delay delivery of critical components by approximately five days.

If no action is taken, production at Plant X may be affected beginning next week. The procurement team has identified an alternate supplier that can partially mitigate the impact, but executive approval is required before proceeding.

We recommend approving the contingency plan before today's operational review meeting so procurement activities can begin immediately.

Please let us know how you would like to proceed.

Kind regards,

Plant Operations
Volvo Digital Production`,

      summary:
        "A supplier delay may impact Plant X production next week. Executive approval is required today to proceed with an alternate sourcing plan and minimize production disruption.",

      draftReply: `Hi Team,

Thank you for bringing this to my attention.

Please proceed with the contingency sourcing plan while continuing to monitor supplier recovery timelines. Keep me informed of any significant changes that could further impact production.

Let's review the status during today's operations meeting.

Regards,
Executive Leadership`,
    },

    {
      id: 2,
      sender: "Digital Production",
      recipients: "Executive Leadership Team",
      subject: "Weekly Governance Review Package",
      category: "Governance",
      priority: "High",
      received: "Yesterday • 04:35 PM",

      body: `Dear Leadership Team,

Please find the governance review package for this week's Digital Production meeting.

The presentation includes:

• MTM NG rollout progress
• Test automation reusability metrics
• Current project risks
• Plant deployment updates
• Upcoming milestones

Kindly review the attached material before tomorrow's governance meeting so discussions can remain focused on key decisions.

Regards,

Digital Production Office`,

      summary:
        "The governance review presentation and supporting documents are ready. Reviewing them before tomorrow's meeting is recommended.",

      draftReply: `Hi Team,

Thanks for preparing the governance package.

I've received the documents and will review them ahead of tomorrow's meeting. Looking forward to discussing the current progress and next steps.

Regards,
Executive Leadership`,
    },

    {
      id: 3,
      sender: "Human Resources",
      recipients: "Executive Leadership Team",
      subject: "Annual Cybersecurity Awareness Training Reminder",
      category: "HR",
      priority: "Medium",
      received: "Today • 10:05 AM",

      body: `Hello,

This is a reminder that the annual Cybersecurity Awareness Training must be completed before the end of this month.

The training includes updated guidance on:

• Phishing prevention
• Secure handling of confidential information
• Password management
• AI security best practices

Completion is mandatory for all employees.

Thank you for your cooperation.

Human Resources`,

      summary:
        "Mandatory cybersecurity awareness training remains pending. Completion is required before the monthly deadline.",

      draftReply: `Hello,

Thank you for the reminder.

I will ensure the mandatory cybersecurity training is completed before the deadline.

Regards,
Executive Leadership`,
    },

    {
      id: 4,
      sender: "SAP Production Systems",
      recipients: "Executive Leadership Team",
      subject: "Production Monitoring Alert",
      category: "Manufacturing",
      priority: "Critical",
      received: "Today • 11:22 AM",

      body: `Dear Executive Leadership,

The production monitoring system has detected abnormal throughput on Assembly Line 4.

Initial investigation indicates a possible configuration issue following yesterday's deployment.

Engineering teams are currently assessing the situation.

A further update will be shared within the next hour.

Regards,

SAP Production Monitoring`,

      summary:
        "Assembly Line 4 has reported abnormal production throughput. Engineering teams are investigating the issue.",

      draftReply: `Team,

Thank you for the update.

Please prioritize identifying the root cause and provide an updated assessment as soon as possible. Notify me immediately if production targets are expected to be impacted.

Regards,
Executive Leadership`,
    },

    {
      id: 5,
      sender: "Finance",
      recipients: "Executive Leadership Team",
      subject: "Budget Approval Required for Q3 Automation Initiative",
      category: "Finance",
      priority: "High",
      received: "Yesterday • 01:15 PM",

      body: `Dear Executive Leadership,

The Q3 automation initiative has completed financial review and is ready for executive approval.

The proposal includes investments supporting:

• Test automation improvements
• Infrastructure modernization
• AI Copilot capabilities
• Digital Production efficiency initiatives

Your approval is requested before Friday to avoid procurement delays.

Regards,

Finance Department`,

      summary:
        "Finance is requesting executive approval for the Q3 automation investment package before Friday.",

      draftReply: `Hi Finance,

Thank you for sharing the proposal.

I'll review the budget package today and provide approval once the final investment details have been verified.

Regards,
Executive Leadership`,
    },
  ];
}