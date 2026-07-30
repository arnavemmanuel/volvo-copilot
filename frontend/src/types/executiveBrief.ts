import type { Meeting } from "./meeting";
import type { Email } from "./email";
import type { DashboardStats } from "./stats";

export interface ExecutiveBrief {
  meetings: Meeting[];

  emails: Email[];

  actions: string[];

  stats: DashboardStats;
}