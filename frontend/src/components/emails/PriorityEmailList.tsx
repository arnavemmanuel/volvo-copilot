import type { Email } from "../../hooks/useEmails";
import PriorityEmailCard from "./PriorityEmailCard";

interface Props {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
}

export default function PriorityEmailList({
  emails,
  onSelectEmail,
}: Props) {
  if (emails.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        No emails match the selected filter.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {emails.map((email) => (
        <PriorityEmailCard
          key={email.id}
          email={email}
          onClick={() => onSelectEmail(email)}
        />
      ))}
    </div>
  );
}