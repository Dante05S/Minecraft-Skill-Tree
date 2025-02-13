import {
  BaseEdge,
  getSmoothStepPath,
  SmoothStepEdgeProps,
} from "@xyflow/react";
import { useMemo } from "react";

import styles from "./CustomStepEdge.module.css";

type Props = SmoothStepEdgeProps;

function CustomStepEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  pathOptions,
}: Props) {
  const [path] = useMemo(() => {
    return getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      borderRadius: pathOptions?.borderRadius,
      offset: pathOptions?.offset,
    });
  }, [
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    pathOptions?.borderRadius,
    pathOptions?.offset,
  ]);

  return <BaseEdge id={id} path={path} className={styles.edge} />;
}

export default CustomStepEdge;
