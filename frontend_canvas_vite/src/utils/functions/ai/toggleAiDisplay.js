export function toggleAiDisplay(app) {
  let newState = !app.state.showAiStatus;
  app.setState({
    showAiStatus: newState,
  });
}
