import { ToastProps } from "./type";

export type ToastListener = (toast: ToastProps) => void;

export class ToastManager {
  private listeners = new Set<ToastListener>();

  private emit(toast: ToastProps) {
    const id = crypto.randomUUID();
    this.listeners.forEach((listener) => {
      listener({ ...toast, id });
    });
  }

  success(message: string) {
    this.emit({ type: "success", message });
  }
  error(message: string) {
    this.emit({ type: "error", message });
  }
  warning(message: string) {
    this.emit({ type: "warning", message });
  }
  info(message: string) {
    this.emit({ type: "info", message });
  }
  normal(message: string) {
    this.emit({ type: "normal", message });
  }

  _subscribe(listener: ToastListener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const toast = new ToastManager();
