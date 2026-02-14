export function checkCombatAdvantage(app, player1, player2) {
  let advantage = 0;
  let players = [0, 0];
  if (player1.currentWeapon.name !== "") {
    players[0] += 1;
  }
  if (player2.currentWeapon.name !== "") {
    players[1] += 1;
  }
  if (player1.attacking.state === true && player2.attacking.state === true) {
    if (player1.attacking.blunt !== true && player1.currentWeapon.name !== "") {
      players[0] += 1;
    }
    if (player2.attacking.blunt !== true && player2.currentWeapon.name !== "") {
      players[1] += 1;
    }
  }
  if (players[0] === players[1]) {
    advantage = 0;
  } else {
    let max = Math.max(players[0], players[1]);
    advantage = players.indexOf(max) + 1;
  }

  return advantage;
}
