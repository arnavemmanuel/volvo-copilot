import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";

import "./index.css";
import App from "./App";
import { msalInstance } from "./auth/msalInstance";
import CopilotProvider from "./providers/CopilotProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <CopilotProvider>
        <App />
      </CopilotProvider>
    </MsalProvider>
  </StrictMode>
);