export function toggleDebugMenu(app, nextSettings) {
  if (nextSettings.showOrigin && typeof nextSettings === "object") {
    app.loggingSettings = nextSettings;
    return;
  }

  const newState = !app.state.showDebugMenu;
  app.setState({
    showDebugMenu: newState,
  });
}
