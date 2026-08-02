export function menuToggleCamera(app) {
  const autoCamBusy =
    app.camera.instructions.length > 0 ||
    app.camera.preInstructions.length > 0 ||
    app.settingAutoCamera === true ||
    app.autoCamPanWaitingForPath === true;

  let canStart = true;

  if (autoCamBusy === true) {
    // Auto camera is running — cancel it and engage assess mode at the
    // current view (skipping the view-at-default requirement).
    app.resetAutoCamera();
    app.camera.startCount = 0;
    app.camera.state = true;
    app.camera.fixed = true;
    return;
  }

  if (app.camera.customView.state === false) {
    if (app.camera.zoom.x - 1 > app.zoomThresh || app.camera.zoom.x - 1 < app.zoomThresh) {
      canStart = false;
    }
    if (app.camera.zoom.x - 1 > app.zoomThresh + 0.01 || app.camera.zoom.x - 1 < app.zoomThresh - 0.01) {
      canStart = false;
    }
    if (app.camera.pan.x < -1 || app.camera.pan.x > -1) {
      canStart = false;
    }
    if (app.camera.pan.y < -1 || app.camera.pan.y > -1) {
      canStart = false;
    }
  }

  if (canStart === true) {
    app.camera.startCount = 0;
    app.camera.state = true;
    app.camera.fixed = true;
  }
  if (canStart === false) {
    console.log("camera is not at the default view. Can't start input cam");
    if (app?.addNotification) {
      app.addNotification("Can't start input camera — camera is not at the default view", "warn");
    }
    if (app?.addEventLog) {
      app.addEventLog("Can't start input camera (camera not at default view)", "system");
    }
  }
}
