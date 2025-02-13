import React, { useId } from "react";
import { Tooltip } from "react-tooltip";

import styles from "./TooltipAchievement.module.css";
import { createPortal } from "react-dom";
import { useAchievementContext } from "../../context/AchievementContext";

interface TooltipAchievement {
  children: React.ReactNode;
}

interface PortalTooltipProps {
  id: string;
}

function PortalTooltip({ id }: PortalTooltipProps) {
  const { name, description } = useAchievementContext();

  return createPortal(
    <Tooltip
      id={id}
      place="bottom"
      className={styles.tooltip_root}
      noArrow
      opacity={1}
    >
      <div className={styles.tooltip_container}>
        <div className={styles.tooltip_title}>
          <span>{name}</span>
        </div>
        <div className={styles.tooltip_description}>
          <span>{description}</span>
        </div>
      </div>
    </Tooltip>,
    document.querySelector("#tooltip")!
  );
}

function TooltipAchievement({ children }: TooltipAchievement) {
  const id = useId();

  return (
    <>
      <div data-tooltip-id={id}>{children}</div>
      <PortalTooltip id={id} />
    </>
  );
}

export default TooltipAchievement;
