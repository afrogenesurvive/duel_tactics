const LOG_BUFFER_MAX = 500;
let nextLogId = 0;

export function globalLogger(app, type, message, data, origin) {
  // type is a loggingSettings path, e.g. "player.movement"
  if (!app || !app.loggingSettings || !type) {
    return;
  }

  const pathParts = type.split(".");
  let setting = app.loggingSettings;
  for (const part of pathParts) {
    if (!setting || typeof setting !== "object" || !(part in setting)) {
      return;
    }
    setting = setting[part];
  }

  const passed = setting === true;

  // Always push to buffer for Live Log window (regardless of filter)
  const entry = {
    id: nextLogId++,
    type,
    message: message || type,
    data: data ? { ...data } : undefined,
    origin: origin ? { ...origin } : undefined,
    time: app.time,
    passed,
  };
  if (Array.isArray(app.logBuffer)) {
    app.logBuffer.push(entry);
    if (app.logBuffer.length > LOG_BUFFER_MAX) {
      app.logBuffer.shift();
    }
  }

  if (!passed) {
    return;
  }

  const showOrigin = app.loggingSettings.showOrigin === true;
  const showTime = app.loggingSettings.showTime === true;
  let payload = data;

  if (showTime === true) {
    payload.time = app.time;
  }

  const label = message || type;

  if (payload === undefined) {
    console.log(type, label, showOrigin ? origin || "" : "");
  } else {
    console.log(type, label, payload, showOrigin ? origin || "" : "");
  }
}
