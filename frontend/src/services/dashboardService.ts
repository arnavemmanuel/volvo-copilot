import { executiveData } from "../data/executiveData";

export async function getDashboardStats() {
  return executiveData.stats;
}