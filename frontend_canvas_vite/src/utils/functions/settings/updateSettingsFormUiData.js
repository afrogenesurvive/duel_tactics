export function updateSettingsFormUiData(app, args) {
  app.settingsFormUiData = args;

  app.setState({
    stateUpdater: "..",
  });
}
