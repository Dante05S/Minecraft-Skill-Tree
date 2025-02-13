import { Handle, Position } from "@xyflow/react";
import styles from "./Achievement.module.css";
import TooltipAchievement from "../TooltipAchievement";
import { AchievementType } from "../../models/NormalizedTreeAchievements";
import { AchievementContext } from "../../context/AchievementContext";
import { useDispatch, useSelector } from "react-redux";
import {
  completeAchievement,
  selectAchievement,
} from "../../store/slices/achievement";
import { useMemo } from "react";
import { RootState } from "../../store";
import { addToast } from "../../store/slices/toast";

interface Props {
  data: AchievementType;
}

function Achievement({ data }: Props) {
  const dispatch = useDispatch();
  const achievementParent = useSelector((state: RootState) =>
    selectAchievement(state, data.parentId)
  );

  const styleContainer = useMemo(() => {
    const background = data.completed ? styles.completed : styles.no_completed;
    return `${styles.container} ${background}`;
  }, [data.completed]);

  const canCompleted = useMemo(() => {
    return (
      (data.parentId === null || achievementParent?.completed) &&
      !data.completed
    );
  }, [achievementParent, data.parentId, data.completed]);

  const complete = () => {
    if (!canCompleted) return;
    dispatch(completeAchievement(data.id));

    const { image, name } = data;
    dispatch(addToast({ image, name }));
  };

  const childContext = useMemo(() => {
    return { name: data.name, description: data.description };
  }, [data.name, data.description]);

  return (
    <AchievementContext.Provider value={childContext}>
      <TooltipAchievement>
        <button onClick={complete} disabled={!canCompleted}>
          <div className={styles.vertical_border}>
            <div className={styles.horizontal_border}>
              <div
                className={styleContainer}
                style={{ cursor: canCompleted ? "pointer" : "default" }}
              >
                <Handle
                  type="target"
                  position={Position.Left}
                  isConnectable={false}
                  style={{ visibility: "hidden" }}
                />
                <img src={data.image} className={styles.achievement_img} />
                <Handle
                  type="source"
                  position={Position.Right}
                  isConnectable={false}
                  style={{ visibility: "hidden" }}
                />
              </div>
            </div>
          </div>
        </button>
      </TooltipAchievement>
    </AchievementContext.Provider>
  );
}

export default Achievement;
