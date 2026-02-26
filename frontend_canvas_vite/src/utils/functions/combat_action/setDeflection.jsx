export function setDeflection(app, player, type, pushBack) {
  // app.deflectedLengthRef = {
  //   outOfStamina: 50,
  //   attacked: 20,
  //   bluntAttacked: 25,
  //   defended: 10,
  // parried: 25
  // };
  app.attackedCancel(player);

  player.action = "deflected";
  player.success.deflected = {
    state: true,
    count: 0,
    limit: app.deflectedLengthRef[type],
    predeflect: player.success.deflected.predeflect,
    type: type,
  };
  player.stamina.current -= app.staminaCostRef.deflected[type];

  if (pushBack === true) {
    player.success.deflected.state = false;
    player.success.deflected.predeflect = true;

    app.pushBack(player, app.getOppositeDirection(player.direction));
  } else {
    player.success.deflected.predeflect = false;
    if (app.aiDeflectedCheck.includes(player.number) !== true) {
      app.aiDeflectedCheck.push(player.number);
    }
  }

  if (pushBack !== true) {
    player = app.setElasticCounter("deflected", "", true, player);
  }

  app.players[player.number - 1] = player;
}
