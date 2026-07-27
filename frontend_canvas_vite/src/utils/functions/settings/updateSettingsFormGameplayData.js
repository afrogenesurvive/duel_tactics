export function updateSettingsFormGameplayData(app, args) {
  app.settingsFormGameplayData = args;

  app.setState({
    stateUpdater: "..",
  });
}
