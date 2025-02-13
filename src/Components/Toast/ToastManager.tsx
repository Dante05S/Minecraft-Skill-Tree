import Toast from ".";
import { useDispatch, useSelector } from "react-redux";
import { removeToast, selectQueue, ToastType } from "../../store/slices/toast";
import { useEffect, useState } from "react";

function ToastManager() {
  const dispatch = useDispatch();
  const queue = useSelector(selectQueue);
  const [currentToast, setCurrentToast] = useState<ToastType | null>(queue[0]);

  const onClose = () => {
    setCurrentToast(null);
    dispatch(removeToast());
  };

  useEffect(() => {
    if (!currentToast && queue.length > 0) setCurrentToast(queue[0]);
  }, [currentToast, queue]);

  if (!currentToast) return null;

  return <Toast {...currentToast} onClose={onClose} />;
}

export default ToastManager;
