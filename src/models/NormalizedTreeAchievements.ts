import { TreeAchievements } from "./TreeAchievements";

export interface AchievementType extends Omit<TreeAchievements, "children"> {
  id: number;
  parentId: number | null;
  completed: boolean;
  children: number[];
}

export type NormalizedTreeAchievements = Record<number, AchievementType>;
