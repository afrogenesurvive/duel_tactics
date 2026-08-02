// Notification helper — important non-player-action info shown as toasts in
// the top-right of the screen. Some callers also route the same event to the
// event log (dual delivery) via addEventLog.
let nextNotifId = 0;

export function addNotification(app, msg, type = "info", opts = {}) {
  if (!app || !Array.isArray(app.notifications)) {
    return;
  }
  app.notifications.push({
    id: nextNotifId++,
    type,
    msg: msg || "",
    time: app.time,
    ...opts,
  });
  if (app.notifications.length > app.notificationMax) {
    app.notifications.shift();
  }
}
