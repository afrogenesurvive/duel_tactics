export function menuToggleCamera(app) {
  let canStart = true;
  if (
    app.camera.instructions.length > 0 ||
    app.camera.preInstructions.length > 0 ||
    app.settingAutoCamera === true ||
    app.autoCamPanWaitingForPath === true
    // app.toggleCameraMode === false
  ) {
    canStart = false;
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
    console.log("auto cam is probably engaged. Can't start input cam");
  }
}
