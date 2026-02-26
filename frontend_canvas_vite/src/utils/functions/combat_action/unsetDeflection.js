export function unsetDeflection(app, player) {
  app.players[player.number - 1].success.deflected = {
    state: false,
    count: 0,
    limit: player.success.deflected.limit,
    predeflect: false,
    type: "",
  };

  if (player.ai.state === true) {
    let indx = app.aiDeflectedCheck.indexOf(player.number);
    // app.aiDeflectedCheck.splice(indx,1)
    let newArr = app.aiDeflectedCheck.filter((x) => x !== player.number);
    app.aiDeflectedCheck = newArr;
    console.log("app.aiDeflectedCheck", app.aiDeflectedCheck);
  }
}
