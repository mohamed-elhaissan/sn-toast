export type ToastTypes = "success" | "info" | "warning" | "error" | "normal";
export type ToastTheme = "light" | "dark";
export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export interface ToastProps {
  message?: string;
  id?: string;
  richColor?: boolean;
  theme?: ToastTheme;
  type: ToastTypes;
  position?: ToastPosition;
}
