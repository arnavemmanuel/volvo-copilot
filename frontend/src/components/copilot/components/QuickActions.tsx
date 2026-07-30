import {
  Calendar,
  Factory,
  FileText,
  Mail,
} from "lucide-react";

import QuickActionCard from "./QuickActionCard";

interface QuickActionsProps {
  onAction: (prompt: string) => void;
}

export default function QuickActions({
  onAction,
}: QuickActionsProps) {
  return (
    <section className="shrink-0 border-b border-slate-200 bg-white px-4 py-2">
      <div className="flex items-center gap-2 overflow-x-auto">
        <QuickActionCard
          icon={<Calendar className="h-4 w-4" />}
          title="Prepare Meeting"
          onClick={() =>
            onAction(
              "Prepare me for my next meeting. Include agenda, attendees, talking points, risks and suggested questions."
            )
          }
        />

        <QuickActionCard
          icon={<Mail className="h-4 w-4" />}
          title="Priority Emails"
          onClick={() =>
            onAction(
              "Summarize my priority emails and identify any actions required."
            )
          }
        />

        <QuickActionCard
          icon={<Factory className="h-4 w-4" />}
          title="Operations"
          onClick={() =>
            onAction(
              "Summarize today's production updates and highlight any issues requiring attention."
            )
          }
        />

        <QuickActionCard
          icon={<FileText className="h-4 w-4" />}
          title="Executive Brief"
          onClick={() =>
            onAction(
              "Generate today's executive brief including calendar, emails, VIOLIN updates and production overview."
            )
          }
        />
      </div>
    </section>
  );
}