import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type WorkspaceView =
  | "brief"
  | "meeting"
  | "emails"
  | "operations"
  | "chat"
  | "search"
  | "loading";

export interface ActivityItem {
  id: string;
  title: string;
  view: WorkspaceView;
  timestamp: string;
}

interface WorkspaceContextType {
  view: WorkspaceView;
  setView: (view: WorkspaceView) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  activities: ActivityItem[];

  addActivity: (
    title: string,
    view: WorkspaceView
  ) => void;
}

const WorkspaceContext =
  createContext<WorkspaceContextType | undefined>(
    undefined
  );

export function WorkspaceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [view, setView] =
    useState<WorkspaceView>("brief");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [activities, setActivities] = useState<
    ActivityItem[]
  >([]);

  function addActivity(
    title: string,
    view: WorkspaceView
  ) {
    const activity: ActivityItem = {
      id: crypto.randomUUID(),
      title,
      view,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setActivities((previous) => [
      activity,
      ...previous,
    ].slice(0, 10));
  }

  return (
    <WorkspaceContext.Provider
      value={{
        view,
        setView,
        searchQuery,
        setSearchQuery,
        activities,
        addActivity,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error(
      "useWorkspace must be used inside a WorkspaceProvider."
    );
  }

  return context;
}