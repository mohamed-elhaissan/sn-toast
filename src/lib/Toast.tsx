import { motion, TargetAndTransition } from "framer-motion";
import { ToastProps } from "./type";
import { getBackgroundColor, getType } from "./assets";

export default function Toast({
  type,
  message,
  richColor = false,
  onClose,
  initial,
  animate,
  exit,
}: ToastProps & {
  onClose?: () => void;
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
}) {
  const icon = getType(type);
  const bgColor = getBackgroundColor({ type, richColor });

  return (
    <motion.div
      layout
      initial={initial}
      animate={animate}
      exit={exit}
      className={`toast ${bgColor}`}
    >
      {icon}
      <span>{message}</span>
      {onClose && (
        <button className="toast-close" onClick={onClose} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}
