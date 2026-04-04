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

  if (setting !== true) {
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
