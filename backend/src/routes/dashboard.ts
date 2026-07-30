import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    morningBrief: {
      greeting: "Good Morning 👋",
      subtitle: "Here's everything you need before the day begins.",

      meetings: 3,
      emails: 4,
      news: 5,

      recommendation:
        "Review the supplier delay email before the Steering Committee meeting. SAP deployment readiness should also be reviewed before noon.",
    },

    stats: [
      {
        title: "Today's Meetings",
        value: 3,
        icon: "calendar",
      },
      {
        title: "Unread Emails",
        value: 18,
        icon: "mail",
      },
      {
        title: "Important Documents",
        value: 24,
        icon: "file",
      },
      {
        title: "Today's Priorities",
        value: 7,
        icon: "check",
      },
    ],
  });
});

export default router;