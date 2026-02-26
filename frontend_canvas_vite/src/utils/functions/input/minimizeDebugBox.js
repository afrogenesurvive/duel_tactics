export function minimizeDebugBox(app, plyrNo) {
  if (plyrNo === 1) {
    app.debugBoxStyle = "debugDisplay closedDebug";
  }
  if (plyrNo === 2) {
    app.debugBoxStyle2 = "debugDisplay2 closedDebug";
  }
}
