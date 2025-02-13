import { NormalizedTreeAchievements } from "../models/NormalizedTreeAchievements";
import Achievement from "../Components/Achievement";
import { Edge, Node } from "@xyflow/react";
import CustomStepEdge from "../Components/CustomStepEdge";
import Dagre from "@dagrejs/dagre";

export const nodeTypes = { achievement: Achievement };
export const edgeTypes = {
  step: CustomStepEdge,
};

export const getInitialNodes = (tree: NormalizedTreeAchievements | null) => {
  if (!tree) return [];

  return Object.values(tree).map((value) => {
    const { id } = value;

    return {
      id: String(id),
      type: "achievement",
      data: { ...value },
      position: { x: 0, y: 0 },
    };
  });
};

export const updateStateNodes = (
  tree: NormalizedTreeAchievements | null,
  nodes: Node[]
) => {
  if (!tree) return [];

  return nodes.map((node) => {
    const { id } = node;

    return {
      ...node,
      data: { ...tree[Number(id)] },
    };
  });
};

export const getInitialEdges = (tree: NormalizedTreeAchievements | null) => {
  if (!tree) return [];
  const edges: Edge[] = [];

  Object.values(tree).forEach((value) => {
    const { id, children } = value;

    if (value.children.length === 0) return;

    const addEdges = children.map<Edge>((childId) => ({
      id: `e${id}${childId}`,
      source: String(id),
      type: "step",
      target: String(childId),
    }));
    edges.push(...addEdges);
  });
  return edges;
};

export const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "LR", nodesep: 100, ranksep: 109 });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    })
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};
