import React, { useState, useEffect, useRef, useCallback } from "react";
import "./liveLogWindow.css";

const CATEGORY_COLORS = {
  player: "#4a9eff",
  ai: "#4caf50",
  obstacle: "#ff9800",
  barrier: "#ff9800",
  trap: "#f44336",
  camera: "#9c27b0",
  grid: "#9e9e9e",
  items: "#ffc107",
  directional_animations: "#009688",
};

function getCategoryColor(type) {
  const top = type.split(".")[0];
  return CATEGORY_COLORS[top] || "#cccccc";
}

function formatTime(tick) {
  const secs = Math.floor((tick || 0) / 60);
  const mins = Math.floor(secs / 60);
  const s = secs % 60;
  const tenths = Math.floor(((tick || 0) % 60) / 6);
  return `${mins}:${String(s).padStart(2, "0")}.${tenths}`;
}

export default function LiveLogWindow({ logBuffer, logFilterMode, onClose, onClear, onToggleFilter }) {
  const [autoScroll, setAutoScroll] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const listRef = useRef(null);

  const filtered = logFilterMode === "filtered"
    ? logBuffer.filter((e) => e.passed)
    : logBuffer;

  const handleScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 30;
    if (!atBottom && autoScroll) {
      setAutoScroll(false);
    } else if (atBottom && !autoScroll) {
      setAutoScroll(true);
    }
  }, [autoScroll]);

  // Auto-scroll when new entries arrive
  useEffect(() => {
    if (autoScroll && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [filtered.length, autoScroll]);

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    setAutoScroll(true);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="liveLogWindow">
      <div className="liveLogHeader">
        <span className="liveLogTitle">Live Log</span>
        <div className="liveLogHeaderControls">
          <span className="liveLogCount">{filtered.length}</span>
          <button className="liveLogFilterBtn" onClick={onToggleFilter} title="Toggle filter mode">
            {logFilterMode === "filtered" ? "Filtered" : "All"}
          </button>
          <button className="liveLogClearBtn" onClick={onClear} title="Clear log buffer">
            Clear
          </button>
          <button className="liveLogCloseBtn" onClick={onClose} title="Close">
            &times;
          </button>
        </div>
      </div>
      <div className="liveLogList" ref={listRef} onScroll={handleScroll}>
        {filtered.length === 0 && (
          <div className="liveLogEmpty">No log entries yet. Enable categories in Debug Log Menu.</div>
        )}
        {filtered.map((entry) => (
          <div key={entry.id} className={`liveLogEntry ${expandedId === entry.id ? "expanded" : ""}`}>
            <div className="liveLogEntryLine" onClick={() => toggleExpand(entry.id)}>
              <span className="liveLogTime" title={`Tick ${entry.time}`}>
                {formatTime(entry.time)}
              </span>
              <span className="liveLogBadge" style={{ backgroundColor: getCategoryColor(entry.type) }}>
                {entry.type}
              </span>
              <span className="liveLogMessage">{entry.message}</span>
              {!entry.passed && <span className="liveLogMuted">(disabled)</span>}
              {entry.data && <span className="liveLogExpandHint">{expandedId === entry.id ? "▲" : "▼"}</span>}
            </div>
            {expandedId === entry.id && (
              <div className="liveLogDetails">
                <div className="liveLogDetailRow">
                  <span className="liveLogDetailLabel">Tick:</span>
                  <span className="liveLogDetailValue">{entry.time}</span>
                </div>
                {entry.origin && (
                  <div className="liveLogDetailRow">
                    <span className="liveLogDetailLabel">Origin:</span>
                    <span className="liveLogDetailValue">{JSON.stringify(entry.origin)}</span>
                  </div>
                )}
                {entry.data && (
                  <div className="liveLogDetailRow">
                    <span className="liveLogDetailLabel">Data:</span>
                    <pre className="liveLogDetailPre">{JSON.stringify(entry.data, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {!autoScroll && filtered.length > 0 && (
        <button className="liveLogScrollBtn" onClick={scrollToBottom}>
          ↓ Scroll to bottom
        </button>
      )}
    </div>
  );
}
