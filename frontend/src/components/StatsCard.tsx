import {
  Calendar,
  Mail,
  FileText,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";

type Props = {
  title: string;
  value: number;
  icon: "calendar" | "mail" | "file" | "check";
  onClick?: () => void;
};

export default function StatsCard({
  title,
  value,
  icon,
  onClick,
}: Props) {
  const icons = {
    calendar: {
      icon: <Calendar className="w-6 h-6" />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    mail: {
      icon: <Mail className="w-6 h-6" />,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    file: {
      icon: <FileText className="w-6 h-6" />,
      bg: "bg-violet-100",
      text: "text-violet-600",
    },
    check: {
      icon: <CheckCircle className="w-6 h-6" />,
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
  };

  const current = icons[icon];

  return (
    <button
      onClick={onClick}
      className="group w-full rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${current.bg} ${current.text}`}
        >
          {current.icon}
        </div>

        <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
          <ArrowUpRight className="h-3 w-3" />
          Open
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          {value}
        </h2>
      </div>
    </button>
  );
}