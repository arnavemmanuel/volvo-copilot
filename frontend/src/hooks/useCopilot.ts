import { useContext } from "react";
import { CopilotContext } from "../context/CopilotContext";

export function useCopilot() {
  const context = useContext(CopilotContext);

  if (!context) {
    throw new Error(
      "useCopilot must be used inside CopilotProvider"
    );
  }

  return context;
}