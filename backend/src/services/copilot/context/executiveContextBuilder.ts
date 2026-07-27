interface ExecutiveContextOptions {
  meeting?: unknown;
  emails?: unknown[];
  violin?: unknown[];
  dashboard?: unknown;
}

export function buildExecutiveContext({
  meeting,
  emails = [],
  violin = [],
  dashboard,
}: ExecutiveContextOptions): string {
  const sections: string[] = [];

  sections.push("========== EXECUTIVE CONTEXT ==========");

  if (meeting) {
    sections.push("");
    sections.push("CURRENT MEETING");
    sections.push("----------------");
    sections.push(formatObject(meeting));
  }

  if (emails.length > 0) {
    sections.push("");
    sections.push("RELATED EMAILS");
    sections.push("----------------");

    emails.forEach((email, index) => {
      sections.push(`Email ${index + 1}`);
      sections.push(formatObject(email));
      sections.push("");
    });
  }

  if (violin.length > 0) {
    sections.push("");
    sections.push("VIOLIN UPDATES");
    sections.push("----------------");

    violin.forEach((item, index) => {
      sections.push(`Update ${index + 1}`);
      sections.push(formatObject(item));
      sections.push("");
    });
  }

  if (dashboard) {
    sections.push("");
    sections.push("EXECUTIVE DASHBOARD");
    sections.push("----------------");
    sections.push(formatObject(dashboard));
  }

  return sections.join("\n");
}

function formatObject(value: unknown, indent = 0): string {
  const spacing = "  ".repeat(indent);

  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value !== "object") {
    return `${value}`;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => `${spacing}- ${formatObject(item, indent + 1)}`)
      .join("\n");
  }

  return Object.entries(value as Record<string, unknown>)
    .map(([key, val]) => {
      if (
        typeof val === "object" &&
        val !== null
      ) {
        return `${spacing}${prettify(key)}:\n${formatObject(
          val,
          indent + 1
        )}`;
      }

      return `${spacing}${prettify(key)}: ${val}`;
    })
    .join("\n");
}

function prettify(text: string): string {
  return text
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}