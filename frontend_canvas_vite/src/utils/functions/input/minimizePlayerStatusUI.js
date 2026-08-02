export function minimizePlayerStatusUI(app, plyrNo) {
  if (plyrNo === 1) {
    app.playerStatusUIStyle = "playerStatusUI closed";
  }
  if (plyrNo === 2) {
    app.playerStatusUIStyle2 = "playerStatusUI2 closed";
  }
}
