import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import CopilotOverlay from "./copilot/CopilotOverlay";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <main className="mx-auto max-w-[1700px] px-8 py-6">
            <TopBar />

            <div className="mt-8">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Global Executive Copilot */}
      <CopilotOverlay />
    </div>
  );
}