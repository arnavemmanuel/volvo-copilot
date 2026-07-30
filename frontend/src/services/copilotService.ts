export interface CopilotAction {
  id: string;

  entity:
    | "email"
    | "meeting"
    | "document"
    | "violin";

  title: string;

  subtitle: string;

  route: string;
}

export interface CopilotResponse {
  message: string;

  actions?: CopilotAction[];
}

export async function sendCopilotMessage(
  prompt: string
): Promise<CopilotResponse> {
  const response = await fetch(
    "http://localhost:5000/api/copilot/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to contact Copilot."
    );
  }

  return response.json();
}