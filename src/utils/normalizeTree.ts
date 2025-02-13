import { NormalizedTreeAchievements } from "../models/NormalizedTreeAchievements";
import { TreeAchievements } from "../models/TreeAchievements";

interface NormalizeTreeType {
  childId: number;
  normalizedTree: NormalizedTreeAchievements;
}

export const normalizeTree = (
  tree: TreeAchievements,
  parentId: number | null = null,
  currentId = { value: 1 },
  normalizedTree: NormalizedTreeAchievements = {}
): NormalizeTreeType => {
  const id = currentId.value++;
  const { children, ...rest } = tree;

  normalizedTree[id] = {
    ...rest,
    id,
    parentId,
    completed: false,
    children: [],
  };

  children.forEach((node) => {
    const { childId } = normalizeTree(node, id, currentId, normalizedTree);
    normalizedTree[id].children.push(childId);
  });

  return { childId: id, normalizedTree };
};
