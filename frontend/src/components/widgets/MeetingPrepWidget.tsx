import {
  Users,
  Mail,
  Newspaper,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

import { useMeetingPrep } from "../../hooks/useMeetingPrep";

function Section({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 font-semibold">
        {icon}
        {title}
      </div>

      <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function MeetingPrepWidget() {
  const { meeting, loading, error } = useMeetingPrep();

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        Loading AI Meeting Preparation...
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold">{meeting.title}</h2>
        <p className="text-gray-600 mt-2">{meeting.objective}</p>
      </div>

      <Section
        icon={<Users size={18} />}
        title="Attendees"
        items={meeting.attendees}
      />

      <Section
        icon={<Mail size={18} />}
        title="Relevant Emails"
        items={meeting.relatedEmails}
      />

      <Section
        icon={<Newspaper size={18} />}
        title="Related VIOLIN Updates"
        items={meeting.violinUpdates}
      />

      <Section
        icon={<CheckCircle size={18} />}
        title="Previous Action Items"
        items={meeting.previousActions}
      />

      <Section
        icon={<MessageSquare size={18} />}
        title="Suggested Discussion Points"
        items={meeting.discussionPoints}
      />

      <Section
        icon={<AlertTriangle size={18} />}
        title="Risks"
        items={meeting.risks}
      />
    </div>
  );
}