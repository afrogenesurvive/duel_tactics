// Event Log helper — gameplay-facing log entries that persist across game
// resets (unless the "Reset Event Log" gameplay setting is enabled).
// Mirrors the globalLogger pattern: standalone function taking `app` first.
let nextEventLogId = 0;

export function addEventLog(app, msg, type = "gameplay", data) {
  if (!app || !Array.isArray(app.eventLog)) {
    return;
  }
  app.eventLog.push({
    id: nextEventLogId++,
    type,
    msg: msg || "",
    data: data ? { ...data } : undefined,
    time: app.time,
  });
  // Remove earliest entry for each new one once the cap is exceeded.
  if (app.eventLog.length > app.eventLogMax) {
    app.eventLog.shift();
  }
}
