// resetAutoCamera(app)
// Cancels any in-progress auto-camera and returns the camera to a neutral,
// non-auto state. Used when engaging input camera / assess mode while an
// auto-camera (attackFocus / defendFocus / followBolt / playerSpawnFocus /
// zoomReset) is still running, so the auto-cam doesn't keep overriding the
// view. The current zoom/pan transform is preserved.
export function resetAutoCamera(app) {
  app.camera.preInstructions = [];
  app.camera.currentPreInstruction = 0;
  app.camera.instructions = [];
  app.camera.currentInstruction = 0;
  app.settingAutoCamera = false;
  app.settingAutoCameraFollowBolt = false;
  app.autoCamPanWaitingForPath = false;

  if (app?.addEventLog) {
    app.addEventLog("Auto camera cancelled — assess mode engaged", "system");
  }
}
