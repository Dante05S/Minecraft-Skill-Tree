import { Edge, Node, ReactFlow } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import styles from "./SkillTree.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAchievements,
  selectStateAchievements,
} from "../../store/slices/achievement";
import {
  edgeTypes,
  getInitialEdges,
  getInitialNodes,
  getLayoutedElements,
  nodeTypes,
  updateStateNodes,
} from "../../utils/configTree";
import { AppDispatch } from "../../store";
import { StatusAchievements } from "../../enums/StatusAchievements";
import Loader from "../Loader";
import Error from "../Error";

function SkillTree() {
  const dispatch = useDispatch<AppDispatch>();
  const { achievements, status, error } = useSelector(selectStateAchievements);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [firstRender, setFirstRender] = useState(false);
  const [loading, setLoading] = useState(
    status === StatusAchievements.IDLE || status === StatusAchievements.LOADING
  );

  const configLayout = () => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      getInitialNodes(achievements),
      getInitialEdges(achievements)
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    setFirstRender(true);
  };

  useEffect(() => {
    void dispatch(fetchAchievements());
  }, []);

  useEffect(() => {
    if (achievements) {
      if (!firstRender) {
        configLayout();
      } else {
        setNodes(updateStateNodes(achievements, nodes));
      }
    }
  }, [achievements]);

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      {!loading && status === StatusAchievements.ERROR && (
        <Error message={error} />
      )}
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edgeTypes={edgeTypes}
        edges={edges}
        defaultViewport={{ x: 40, y: 52, zoom: 0.81 }}
        nodesDraggable={false}
        panOnDrag={false}
        zoomActivationKeyCode={null}
        zoomOnDoubleClick={false}
        fitView
        onInit={() => setLoading(false)}
      />
    </div>
  );
}

export default SkillTree;
