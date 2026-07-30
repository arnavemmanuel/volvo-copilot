import ExecutiveBrief from "./ExecutiveBrief";
import MeetingPrep from "./MeetingPrep";
import PriorityEmails from "./PriorityEmails";
import Operations from "./Operations";
import ChatMessages from "../ChatMessages";

export type WorkspaceView =
  | "brief"
  | "meeting"
  | "emails"
  | "operations"
  | "chat"
  | "loading";

interface WorkspaceContentProps {
  view: WorkspaceView;
  hasMessages: boolean;
}

export default function WorkspaceContent({
  view,
}: WorkspaceContentProps) {
  switch (view) {
    case "chat":
    case "loading":
      return <ChatMessages />;

    case "brief":
      return <ExecutiveBrief />;

    case "meeting":
      return <MeetingPrep />;

    case "emails":
      return <PriorityEmails />;

    case "operations":
      return <Operations />;

    default:
      return <ExecutiveBrief />;
  }
}