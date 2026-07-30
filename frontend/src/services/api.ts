const API_BASE_URL = "http://localhost:5000";

export async function getDashboardData() {
  const response = await fetch(`${API_BASE_URL}/api/dashboard`);

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
}

export async function getMeetings() {
  const response = await fetch(`${API_BASE_URL}/api/meetings`);

  if (!response.ok) {
    throw new Error("Failed to fetch meetings");
  }

  return response.json();
}

export async function getViolinNews() {
  const response = await fetch(`${API_BASE_URL}/api/violin`);

  if (!response.ok) {
    throw new Error("Failed to fetch VIOLIN news");
  }

  return response.json();
}
export async function getEmails() {
  const response = await fetch(`${API_BASE_URL}/api/emails`);

  if (!response.ok) {
    throw new Error("Failed to fetch emails");
  }

  return response.json();
}
export async function getCalendarSummary() {
  const response = await fetch(`${API_BASE_URL}/api/calendar`);

  if (!response.ok) {
    throw new Error("Failed to fetch calendar summary");
  }

  return response.json();
}
export async function getMeetingPreparation() {
  const response = await fetch(`${API_BASE_URL}/api/meeting-prep`);

  if (!response.ok) {
    throw new Error("Failed to fetch meeting preparation.");
  }

  return response.json();
}
export async function askCopilot(question: string) {
  const response = await fetch(`${API_BASE_URL}/api/copilot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("Failed to contact Executive Copilot.");
  }

  return response.json();
}