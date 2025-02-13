import { TreeAchievements } from "../models/TreeAchievements";

export const getAchievements = async (): Promise<TreeAchievements> => {
  const response = await fetch(import.meta.env.VITE_API_ACHIEVEMENTS ?? "");
  return response.json() as unknown as TreeAchievements;
};
