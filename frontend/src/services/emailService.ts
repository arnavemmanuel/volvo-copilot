import { executiveData } from "../data/executiveData";
import type { Email } from "../types/email";

export async function getPriorityEmails(): Promise<Email[]> {
  return executiveData.emails.filter(
    (email) =>
      email.importance === "high" || email.requiresAction
  );
}

export async function getAllEmails(): Promise<Email[]> {
  return executiveData.emails;
}