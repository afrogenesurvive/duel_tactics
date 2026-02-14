export function removeAiPlayer(app, playerNumber) {
  console.log("removing ai player", playerNumber);

  let index1 = app.players.indexOf(app.players[playerNumber - 1]);
  let index2 = app.aiPlayers.indexOf(playerNumber);

  // SHIFT AI PLAYER NUMBERS!
  for (let elem of app.players) {
    let indx = app.players.indexOf(elem);
    if (indx > index1) {
      elem.number = elem.number - 1;
    }
  }
  for (let elem2 of app.aiPlayers) {
    let indx2 = app.aiPlayers.indexOf(elem2);
    if (indx2 > index2) {
      elem2 = elem2 - 1;
    }
  }

  app.aiPlayers.splice(index2, 1);

  let keyPressedToRemove = app.keyPressed[playerNumber - 1];
  app.keyPressed = app.keyPressed.filter((y) => y !== keyPressedToRemove);

  app.removeAi = playerNumber;

  app.addAiCount.state = true;

  // REMOVE DEAD AI FINAL POSITION
  // let indx3;
  // for (const item of app.additionalAvoidArray) {
  //   if (item.player === playerNumber) {
  //     indx3 = app.additionalAvoidArray.indexOf(item)
  //   }
  // }
  // app.additionalAvoidArray.splice(indx3,1)
}
