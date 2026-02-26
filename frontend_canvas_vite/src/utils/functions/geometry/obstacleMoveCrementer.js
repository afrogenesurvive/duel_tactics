export function obstacleMoveCrementer(app, obstacleCell, destCell) {
  // console.log('obstacle line crementer',obstacle.moving.step,obstacle.moving.moveSpeed);

  let currentPosition = obstacleCell.obstacle.moving.currentPosition;
  let moveSpeed = obstacleCell.obstacle.moving.moveSpeed;

  let step = +(Math.round(obstacleCell.obstacle.moving.step + moveSpeed + "e+" + 3) + "e-" + 3);

  // player.moving.step = player.moving.step + moveSpeed;
  // console.log('mover stepper',player.moving.step);
  let newPosition;

  // line: percent is 0-1
  let startPt = currentPosition;
  let endPt;
  endPt = destCell.center;

  let percent = step;

  function getLineXYatPercent(startPt, endPt, percent) {
    let dx = endPt.x - startPt.x;
    let dy = endPt.y - startPt.y;
    let X = startPt.x + dx * percent;
    let Y = startPt.y + dy * percent;
    // newPosition = {x:X,y:Y}
    newPosition = { x: Math.round(X), y: Math.round(Y) };
  }
  getLineXYatPercent(startPt, endPt, percent);
  // console.log("obstacle moving crementer", moveSpeed, step, newPosition);

  return { pos: newPosition, step: step };
}
