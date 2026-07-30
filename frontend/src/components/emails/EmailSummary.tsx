import { Mail, AlertTriangle, Eye } from "lucide-react";
import type { Email } from "../../hooks/useEmails";
import type { ReactNode } from "react";

interface Props {
  emails: Email[];
}

export default function EmailSummary({ emails }: Props) {
  const urgent = emails.filter((e) => e.priority === "Critical").length;
  const review = emails.filter((e) => e.priority === "High").length;
  const information = emails.filter((e) => e.priority === "Medium").length;

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-5">
        Executive Email Brief
      </h2>

      <div className="grid md:grid-cols-3 gap-5">
        <SummaryCard
          icon={<AlertTriangle size={22} />}
          title="Urgent"
          value={urgent}
          color="bg-red-100 text-red-700"
        />

        <SummaryCard
          icon={<Mail size={22} />}
          title="Need Review"
          value={review}
          color="bg-yellow-100 text-yellow-700"
        />

        <SummaryCard
          icon={<Eye size={22} />}
          title="FYI"
          value={information}
          color="bg-green-100 text-green-700"
        />
      </div>
    </div>
  );
}

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  value: number;
  color: string;
}

function SummaryCard({
  icon,
  title,
  value,
  color,
}: SummaryCardProps) {
  return (
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>

      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}