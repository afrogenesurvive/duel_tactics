export function expandPlayerStatusUI(app, plyrNo) {
  if (plyrNo === 1) {
    app.playerStatusUIStyle = "playerStatusUI open";
  }
  if (plyrNo === 2) {
    app.playerStatusUIStyle2 = "playerStatusUI2 open";
  }
}
