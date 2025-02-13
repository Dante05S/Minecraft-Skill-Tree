import { createPortal } from "react-dom";

import styles from "./Toast.module.css";
import { useEffect } from "react";
import soundEffect from "/sound-achievement.mp3"; // Ruta del sonido
import { ToastType } from "../../store/slices/toast";

interface ToastProps extends ToastType {
  onClose: () => void;
}

function Toast({ image, name, onClose }: ToastProps) {
  useEffect(() => {
    const audio = new Audio(soundEffect);
    audio.volume = 0.5;
    audio.play().catch(console.error);

    setTimeout(() => {
      onClose();
    }, 3000);
  }, []);

  return createPortal(
    <div
      className={styles.toast}
      style={{
        animation:
          "achievement-slide-in 0.5s ease-out, achievement-slide-out 0.5s ease-in 2s forwards",
      }}
    >
      <div className={styles.container}>
        <img src={image} className={styles.achievement_img} />
        <div className={styles.text_container}>
          <span className={styles.title}>Logro desbloqueado</span>
          <span className={styles.description}>{name}</span>
        </div>
      </div>
    </div>,
    document.querySelector("#toast")!
  );
}

export default Toast;
