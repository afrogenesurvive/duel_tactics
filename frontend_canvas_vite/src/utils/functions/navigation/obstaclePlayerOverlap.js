export function obstaclePlayerOverlap(app, type, cell, player, obstacle) {
  console.log("obstaclePlayerOverlap");

  let obstacleDirection = app.getOppositeDirection(app.getDirectionFromCells(obstacle.moving.origin.number, obstacle.moving.destination.number));

  let pushPull = false;
  if (
    player.pulling.state === true ||
    player.pushing.state === true
    // player.postPull.state
  ) {
    pushPull = true;
  }
  if (pushPull !== true) {
    if (type === "player") {
      if (app.rnJesus(0, 5) === 0) {
        if (app.rnJesus(0, 2) === 0) {
          app.pushBack(player, app.getOppositeDirection(player.direction));
        } else {
          app.canPushObstacle(player, cell, `overlap_${obstacleDirection}`);
        }
      } else {
        app.canPushObstacle(player, cell, `overlap_${obstacleDirection}`);
        app.pushBack(player, app.getOppositeDirection(player.direction));
      }
    }

    if (type === "obstacle") {
      if (app.rnJesus(0, 5) === 0) {
        if (app.rnJesus(0, 2) === 0) {
          app.pushBack(player, app.getOppositeDirection(player.direction));
        } else {
          app.canPushObstacle(player, cell, `overlap_${obstacleDirection}`);
        }
      } else {
        app.canPushObstacle(player, cell, `overlap_${obstacleDirection}`);
        app.pushBack(player, app.getOppositeDirection(player.direction));
      }
    }
  }
}
