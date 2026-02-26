export function updateSettingsFormPlayerData(app, args) {
  app.settingsFormPlayerData = args;

  app.setState({
    stateUpdater: "..",
  });
}
