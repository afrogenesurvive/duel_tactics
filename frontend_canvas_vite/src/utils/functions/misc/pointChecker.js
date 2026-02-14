export function pointChecker(app, player) {
  // console.log('point checker player',player);

  let points = player.points;
  if (points % 5 === 0) {
    app.bloodSacrificeEvent.state = true;
    app.bloodSacrificeEvent.limit = 2000;
    app.bloodSacrificeEvent.restore = true;
    app.openVoid = true;
    console.log("the gods have accepted a blood sacrifice. Standby for void tiles");
  }
}
