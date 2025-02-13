import { createContext, useContext } from "react";
import { TreeAchievements } from "../models/TreeAchievements";

interface AchievementState {
  name: TreeAchievements["name"];
  description: TreeAchievements["description"];
}

const initState: AchievementState = {
  name: "",
  description: "",
};

export const AchievementContext = createContext<AchievementState>(initState);

export const useAchievementContext = (): AchievementState => {
  return useContext(AchievementContext);
};
