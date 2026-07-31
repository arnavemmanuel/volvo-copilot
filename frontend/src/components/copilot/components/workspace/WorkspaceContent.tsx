import ExecutiveBrief from "./ExecutiveBrief";
import MeetingPrep from "./MeetingPrep";
import PriorityEmails from "./PriorityEmails";
import Operations from "./Operations";
import ChatMessages from "../ChatMessages";
import SearchResults from "./SearchResults";

export type WorkspaceView =
  | "brief"
  | "meeting"
  | "emails"
  | "operations"
  | "chat"
  | "search"
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

    case "search":
      return <SearchResults />;

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