import React from "react";
import "./eventLog.css";

const TYPE_COLORS = {
  gameplay: "#4a9eff",
  combat: "#f44336",
  movement: "#4a9eff",
  items: "#ffc107",
  ai: "#4caf50",
  system: "#9c27b0",
  trap: "#ff9800",
};

function getTypeColor(type) {
  return TYPE_COLORS[type] || "#cccccc";
}

function formatTime(tick) {
  const secs = Math.floor((tick || 0) / 60);
  const mins = Math.floor(secs / 60);
  const s = secs % 60;
  const tenths = Math.floor(((tick || 0) % 60) / 6);
  return `${mins}:${String(s).padStart(2, "0")}.${tenths}`;
}

export default function EventLog({ eventLog, onClose }) {
  const visibleCount = 50; // only show the top X (most recent) messages
  const visible = eventLog.slice(-visibleCount).reverse(); // newest at top

  return (
    <div className="eventLogWindow">
      <div className="eventLogHeader">
        <span className="eventLogTitle">Event Log</span>
        <div className="eventLogHeaderControls">
          <span className="eventLogCount" title={`Total: ${eventLog.length}`}>
            {visible.length}
          </span>
          <button className="eventLogCloseBtn" onClick={onClose} title="Close">
            &times;
          </button>
        </div>
      </div>
      <div className="eventLogList">
        {visible.length === 0 && <div className="eventLogEmpty">No events yet.</div>}
        {visible.map((entry) => (
          <div key={entry.id} className="eventLogEntry">
            <span className="eventLogTime" title={`Tick ${entry.time}`}>
              {formatTime(entry.time)}
            </span>
            <span className="eventLogBadge" style={{ backgroundColor: getTypeColor(entry.type) }}>
              {entry.type}
            </span>
            <span className="eventLogMsg">{entry.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
