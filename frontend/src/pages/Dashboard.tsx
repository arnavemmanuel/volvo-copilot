import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";

import DashboardHero from "../components/DashboardHero";
import StatsCard from "../components/StatsCard";
import MeetingsWidget from "../components/widgets/MeetingsWidget";
import PriorityEmails from "../components/widgets/PriorityEmails";
import CalendarSummary from "../components/calendar/CalendarSummary";
import ViolinNewsWidget from "../components/widgets/ViolinNewsWidget";

import PageLoader from "../components/ui/PageLoader";
import { useDashboard } from "../hooks/useDashboard";
import { CopilotContext } from "../context/CopilotContext";

export default function Dashboard() {
  const { data, loading, error } = useDashboard();

  const navigate = useNavigate();
  const copilot = useContext(CopilotContext);

  if (!copilot) {
    throw new Error("CopilotContext not found.");
  }

  if (loading) return <PageLoader />;

  if (error || !data) {
    return (
      <Layout>
        <div className="text-red-600">
          {error || "Unable to load dashboard."}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">

        <DashboardHero />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.stats.map((stat) => {
            let onClick: (() => void) | undefined;

            switch (stat.title) {
              case "Today's Meetings":
                onClick = () => navigate("/meetings");
                break;

              case "Unread Emails":
                onClick = () => navigate("/emails");
                break;

              case "Important Documents":
                onClick = () => navigate("/documents");
                break;

              case "Today's Priorities":
                onClick = () =>
                  copilot.sendPrompt(
                    "Generate my executive priorities for today based on my meetings, unread emails, important documents, and any critical operational updates. Organize them in order of importance and present them as a concise executive task list."
                  );
                break;

              default:
                onClick = undefined;
            }

            return (
              <StatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={
                  stat.icon as
                    | "calendar"
                    | "mail"
                    | "file"
                    | "check"
                }
                onClick={onClick}
              />
            );
          })}
        </div>

        <MeetingsWidget />

        <PriorityEmails />

        <CalendarSummary />

        <ViolinNewsWidget />

      </div>
    </Layout>
  );
}