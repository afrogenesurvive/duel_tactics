export function toggleDebugMenu(app, nextSettings) {
  const isSettingsPayload =
    nextSettings &&
    typeof nextSettings === "object" &&
    (Object.prototype.hasOwnProperty.call(nextSettings, "showOrigin") || Object.prototype.hasOwnProperty.call(nextSettings, "player"));

  if (isSettingsPayload) {
    app.loggingSettings = nextSettings;
    try {
      localStorage.setItem("duelTactics_loggingSettings", JSON.stringify(nextSettings));
    } catch (e) {
      // localStorage unavailable
    }
    return;
  }

  const newState = !app.state.showDebugMenu;
  app.setState({
    showDebugMenu: newState,
  });
}
