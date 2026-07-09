import { useEffect } from "react";
import { Notification } from "@mantine/core";

const VARIANT_TO_COLOR = {
  success: "green",
  danger: "red",
  warning: "yellow",
  info: "blue",
};

export default function ToastMessage({
  show,
  onClose,
  message,
  variant = "success",
}) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 1000 }}>
      <Notification
        title="FilmInPocket"
        color={VARIANT_TO_COLOR[variant] ?? variant}
        onClose={onClose}
      >
        {message}
      </Notification>
    </div>
  );
}
