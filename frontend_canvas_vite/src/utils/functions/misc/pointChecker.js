export function pointChecker(app, player) {
  const logBlood = (message, data = {}) => {
    if (app?.globalLogger) {
      app.globalLogger("stage.blood_sacrifice", message, data, { fn: "pointChecker" });
    }
  };
  // console.log('point checker player',player);

  let points = player.points;
  if (points % 5 === 0) {
    app.bloodSacrificeEvent.state = true;
    app.bloodSacrificeEvent.limit = 2000;
    app.bloodSacrificeEvent.restore = true;
    app.openVoid = true;
    logBlood("triggered", {
      playerId: player.number,
      points,
    });
  }
}
