export function updateSettingsFormAiData(app, args) {
  app.updateSettingsFormAiDataData = {
    startItems: args.startItems,
    count: args.count,
    random: args.random,
    mode: args.mode,
    weapon: args.weapon,
    armor: args.armor,
    team: args.team,
    mission: args.mission,
  };
  app.setState({
    stateUpdater: "..",
  });
  // console.log('updateSettingsFormAiData',app.updateSettingsFormAiDataData);
  app.settingsFormGridWidthUpdate(app.settingsGridWidth);
}
