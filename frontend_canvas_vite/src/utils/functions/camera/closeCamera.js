export function closeCamera(app) {
  app.camera.state = false;
  app.camera.fixed = false;

  if (
    app.camera.customView.state !== true &&
    app.settingAutoCamera === false &&
    app.camera.preInstructions.length === 0 &&
    app.camera.instructions.length === 0
    // (app.camera.zoom.x-1) > app.zoomThresh
  ) {
    app.setAutoCamera("zoomReset", app.players[0]);
  }
}
