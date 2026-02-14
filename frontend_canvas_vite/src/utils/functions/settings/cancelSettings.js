export function cancelSettings(app) {
  // app.updateSettingsFormAiDataData = {};
  app.settingsFormAiStartPosList = [];
  app.setState({
    showSettings: false,
  });
  app.showSettingsCanvasData.state = false;
}
