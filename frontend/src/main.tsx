import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";

import "./index.css";
import App from "./App";
import { msalInstance } from "./auth/msalInstance";
import CopilotProvider from "./providers/CopilotProvider";
import { WorkspaceProvider } from "./context/WorkspaceContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <WorkspaceProvider>
        <CopilotProvider>
          <App />
        </CopilotProvider>
      </WorkspaceProvider>
    </MsalProvider>
  </StrictMode>
);