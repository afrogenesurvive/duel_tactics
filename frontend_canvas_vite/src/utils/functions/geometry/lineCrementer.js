export function lineCrementer(app, player) {
  // console.log(
  //   "line crementer",
  //   player.number,
  //   player.moving.step,
  //   player.moveCancel.state,
  //   player.nextPosition
  // );

  let currentPosition = player.currentPosition.cell.center;
  let target = player.target;
  let moveSpeed = player.speed.move;
  if (player.moveCancel.state === true) {
    currentPosition = player.moving.origin.center;
  }
  if (player.terrainMoveSpeed.state === true) {
    // console.log('terrain speed mod',player.terrainMoveSpeed.speed);
    moveSpeed = player.terrainMoveSpeed.speed;
  }
  if (player.jumping.state === true) {
    moveSpeed = 0.1;
  }
  if (player.stamina.current < 1) {
    moveSpeed = 0.05;
  }

  if (player.flanking.state === true) {
    // moveSpeed = .1
    moveSpeed = 0.2;
    // if (moveSpeed === .05) {
    //   moveSpeed = .1
    // }
    // else if (moveSpeed === .1) {
    //   moveSpeed = .125
    // }
    // else if (moveSpeed === .125) {
    //   moveSpeed = .2
    // }
  }

  if (player.pushing.state === true) {
    moveSpeed = player.pushing.moveSpeed;
    // console.log('player ',player.number,' pushing speed',moveSpeed);
  }
  if (player.pulling.state === true) {
    moveSpeed = player.pulling.moveSpeed;
    // console.log('player ',player.number,' pulling speed',moveSpeed);
  }
  if (player.pulled.state === true) {
    moveSpeed = player.pulled.moveSpeed;
    // console.log('player ',player.number,' pulled speed',moveSpeed);
  }
  if (player.pushed.state === true) {
    moveSpeed = player.pushed.moveSpeed;
    // console.log('player ',player.number,' pushed speed',moveSpeed);
  }

  // console.log('mover stepper',player.moving.step);
  // console.log(`lineCrementer: move step ${player.moving.step} movespeed ${moveSpeed}, stamina ${player.stamina.current}`);

  player.moving.step = +(Math.round(player.moving.step + moveSpeed + "e+" + 3) + "e-" + 3);
  // player.moving.step = player.moving.step + moveSpeed;
  // console.log("mover stepper", player.moving.step);
  let newPosition;

  // line: percent is 0-1
  let startPt = currentPosition;
  let endPt;
  if (player.jumping.state === true) {
    endPt = target.cell2.center;
  } else {
    endPt = target.cell1.center;

    // endPt = player.moving.destination;
  }

  function getLineXYatPercent(startPt, endPt, percent) {
    let dx = endPt.x - startPt.x;
    let dy = endPt.y - startPt.y;
    let X = startPt.x + dx * percent;
    let Y = startPt.y + dy * percent;
    // newPosition = {x:X,y:Y}
    newPosition = { x: Math.round(X), y: Math.round(Y) };
  }
  getLineXYatPercent(startPt, endPt, player.moving.step);

  if (player.falling.state === true) {
    player.falling.count++;

    newPosition = {
      x: target.cell1.center.x,
      y: target.cell1.center.y + player.falling.count * 5,
    };
    player.currentPosition.cell.center = newPosition;
  }

  player.nextPosition = newPosition;

  app.players[player.number - 1] = player;

  return newPosition;
}
