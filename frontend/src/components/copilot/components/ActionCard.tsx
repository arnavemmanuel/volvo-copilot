import {
  Mail,
  Calendar,
  FileText,
  Newspaper,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { CopilotAction } from "../../../context/CopilotContext";

interface ActionCardProps {
  action: CopilotAction;
}

export default function ActionCard({
  action,
}: ActionCardProps) {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (action.entity) {
      case "email":
        return (
          <Mail className="h-5 w-5 text-blue-600" />
        );

      case "meeting":
        return (
          <Calendar className="h-5 w-5 text-violet-600" />
        );

      case "document":
        return (
          <FileText className="h-5 w-5 text-emerald-600" />
        );

      case "violin":
        return (
          <Newspaper className="h-5 w-5 text-orange-600" />
        );

      default:
        return (
          <FileText className="h-5 w-5 text-slate-600" />
        );
    }
  };

  const getLabel = () => {
    switch (action.entity) {
      case "email":
        return "Email";

      case "meeting":
        return "Meeting";

      case "document":
        return "Document";

      case "violin":
        return "VIOLIN Update";

      default:
        return "Item";
    }
  };

  return (
    <button
      type="button"
      onClick={() => navigate(action.route)}
      className="group mt-4 w-full rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100">
            {getIcon()}
          </div>

          <div>

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {getLabel()}
            </p>

            <h4 className="mt-1 text-base font-semibold text-slate-900">
              {action.title}
            </h4>

            <p className="mt-1 text-sm text-slate-500">
              {action.subtitle}
            </p>

          </div>

        </div>

        <ChevronRight className="mt-1 h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />

      </div>
    </button>
  );
}