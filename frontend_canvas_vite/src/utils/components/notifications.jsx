import React, { useEffect } from "react";
import "./notifications.css";

const TYPE_STYLES = {
  info: "#4a9eff",
  warn: "#ff9800",
  error: "#f44336",
  success: "#4caf50",
};

// ~4 seconds at 60fps; tick-based so it pauses with the game loop
const DISMISS_TICKS = 240;

export default function Notifications({ notifications, currentTime, onDismiss }) {
  // Auto-dismiss toasts that have been around longer than DISMISS_TICKS.
  // Runs every frame (parent re-renders each tick) so expiry is prompt.
  useEffect(() => {
    if (!Array.isArray(notifications)) return;
    for (const n of notifications) {
      if (currentTime - (n.time || 0) >= DISMISS_TICKS) {
        onDismiss(n.id);
        return;
      }
    }
  }, [notifications, currentTime, onDismiss]);

  if (!Array.isArray(notifications) || notifications.length === 0) {
    return null;
  }

  return (
    <div className="notificationStack">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`notificationToast ${n.type || "info"}`}
          style={{ borderLeftColor: TYPE_STYLES[n.type] || "#cccccc" }}>
          <span className="notificationMsg">{n.msg}</span>
          <button className="notificationClose" onClick={() => onDismiss(n.id)} title="Dismiss">
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
