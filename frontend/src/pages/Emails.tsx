import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCopilot } from "../hooks/useCopilot";

import Layout from "../components/Layout";
import EmailToolbar from "../components/emails/EmailToolbar";
import EmailFilters, {
  type EmailFilter,
} from "../components/emails/EmailFilters";
import ExecutiveSummary from "../components/emails/ExecutiveSummary";
import PriorityEmailList from "../components/emails/PriorityEmailList";
import EmailModal from "../components/emails/EmailModal";

import PageLoader from "../components/ui/PageLoader";
import { useEmails, type Email } from "../hooks/useEmails";

export default function Emails() {
  const { emails, loading, error } = useEmails();
  const { sendPrompt } = useCopilot();
  const location = useLocation();

  const [filter, setFilter] = useState<EmailFilter>("all");
  const [selectedEmail, setSelectedEmail] =
    useState<Email | null>(null);
  const [drawerOpen, setDrawerOpen] =
    useState(false);

  useEffect(() => {
  if (loading || emails.length === 0) return;

  const state = location.state as
    | { openEmailId?: number }
    | undefined;

  if (!state?.openEmailId) return;

  const email = emails.find(
    (e) => e.id === state.openEmailId
  );

  if (!email) return;

  requestAnimationFrame(() => {
    setSelectedEmail(email);
    setDrawerOpen(true);

    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  });
}, [loading, emails, location]);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <Layout>
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
          {error}
        </div>
      </Layout>
    );
  }

  const totalEmails = emails.length;

  const criticalEmails = emails.filter(
    (email) => email.priority === "Critical"
  ).length;

  const highPriorityEmails = emails.filter(
    (email) =>
      email.priority === "Critical" ||
      email.priority === "High"
  ).length;

  const aiDrafts = emails.filter(
    (email) => email.draftReply.trim().length > 0
  ).length;

  const filteredEmails = emails.filter((email) => {
    switch (filter) {
      case "critical":
        return email.priority === "Critical";

      case "high":
        return (
          email.priority === "Critical" ||
          email.priority === "High"
        );

      case "drafts":
        return email.draftReply.trim().length > 0;

      default:
        return true;
    }
  });

  return (
    <Layout>
      <div className="space-y-8">

        <EmailToolbar />

        <EmailFilters
          totalEmails={totalEmails}
          criticalEmails={criticalEmails}
          highPriorityEmails={highPriorityEmails}
          aiDrafts={aiDrafts}
          filter={filter}
          onFilterChange={setFilter}
        />

        <ExecutiveSummary
          totalEmails={totalEmails}
          criticalEmails={criticalEmails}
          highPriorityEmails={highPriorityEmails}
          aiDrafts={aiDrafts}
        />

        <PriorityEmailList
          emails={filteredEmails}
          onSelectEmail={(email) => {
            setSelectedEmail(email);
            setDrawerOpen(true);
          }}
        />

        <EmailModal
          open={drawerOpen}
          email={selectedEmail}
          emails={filteredEmails}
          onClose={() => setDrawerOpen(false)}
          onSelectEmail={setSelectedEmail}
          onSummary={() => {
            if (!selectedEmail) return;

            sendPrompt(`
Summarize this executive email.

Subject:
${selectedEmail.subject}

From:
${selectedEmail.sender}

To:
${selectedEmail.recipients}

Body:
${selectedEmail.body}
            `);
          }}
          onDraft={() => {
            if (!selectedEmail) return;

            sendPrompt(`
Write a professional reply to this email.

Subject:
${selectedEmail.subject}

From:
${selectedEmail.sender}

To:
${selectedEmail.recipients}

Body:
${selectedEmail.body}
            `);
          }}
        />

      </div>
    </Layout>
  );
}