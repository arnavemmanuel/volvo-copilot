import {
  Mail,
  AlertTriangle,
  FileText,
  CheckCircle2,
} from "lucide-react";

export type EmailFilter =
  | "all"
  | "critical"
  | "high"
  | "drafts";

interface Props {
  totalEmails: number;
  criticalEmails: number;
  highPriorityEmails: number;
  aiDrafts: number;

  filter: EmailFilter;
  onFilterChange: (filter: EmailFilter) => void;
}

export default function EmailFilters({
  totalEmails,
  criticalEmails,
  highPriorityEmails,
  aiDrafts,
  filter,
  onFilterChange,
}: Props) {
  const cards = [
    {
      id: "all" as EmailFilter,
      title: "Unread",
      value: totalEmails,
      icon: Mail,
      iconColor: "text-blue-600",
    },
    {
      id: "critical" as EmailFilter,
      title: "Critical",
      value: criticalEmails,
      icon: AlertTriangle,
      iconColor: "text-red-500",
    },
    {
      id: "high" as EmailFilter,
      title: "High Priority",
      value: highPriorityEmails,
      icon: FileText,
      iconColor: "text-orange-500",
    },
    {
      id: "drafts" as EmailFilter,
      title: "AI Drafts",
      value: aiDrafts,
      icon: CheckCircle2,
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const active = filter === card.id;

        return (
          <button
            key={card.id}
            onClick={() => onFilterChange(card.id)}
            className={`rounded-2xl border p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
              active
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <Icon className={`mb-3 h-6 w-6 ${card.iconColor}`} />

            <p className="text-3xl font-bold text-slate-900">
              {card.value}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {card.title}
            </p>
          </button>
        );
      })}
    </div>
  );
}