export function preObstaclePullCheck(app, player, target, pullDirection) {
  // console.log('pre obstacle pull check');

  let resetPull = false;
  let refCell = app.gridInfo.find((x) => x.number.x === target.cell1.number.x && x.number.y === target.cell1.number.y);
  let plyrRefCell = app.gridInfo.find(
    (x) => x.number.x === player.currentPosition.cell.number.x && x.number.y === player.currentPosition.cell.number.y,
  );
  let limit = player.defending.limit - 1;
  let myCellCheck = true;
  if (plyrRefCell.barrier.state === true && plyrRefCell.barrier.position === player.direction) {
    myCellCheck = false;
  }
  if (myCellCheck !== true) {
    console.log("a barrier in player cell is blocking a pull");
    resetPull = true;
  }

  if (refCell.obstacle.state !== true) {
    console.log("barrier not obstacle. Cant be pulled");
    resetPull = true;
  } else if (refCell.obstacle.moving.pushable === true && myCellCheck === true && player.newPushPullDelay.state !== true) {
    if (player.prePull.state !== true && player.prePull.count === 0) {
      // console.log('start pre pull');
      player.prePull = {
        state: true,
        count: player.prePull.count++,
        limit: player.prePull.limit,
        targetCell: refCell,
        direction: pullDirection,
        puller: player.number,
      };
    }

    if (player.prePull.state === true) {
      if (player.prePull.count >= player.prePull.limit) {
        // if (player.prePull.count >= 25) {
        // if (player.prePull.count >= limit) {

        // console.log("pre pull limit. check can pull");
        app.players[player.number - 1].prePull = player.prePull;
        app.players[player.number - 1].pulling = player.pulling;
        if (player.popups.find((x) => x.msg === "prePull")) {
          player.popups.splice(
            player.popups.findIndex((x) => x.msg === "prePull"),
            1,
          );
        }
        app.canPullObstacle(player, refCell);
      } else {
        if (
          player.prePull.targetCell.number.x === refCell.number.x &&
          player.prePull.targetCell.number.y === refCell.number.y &&
          player.prePull.direction === pullDirection &&
          player.prePull.puller === player.number
        ) {
          player.prePull.count++;
          if (!player.popups.find((x) => x.msg === "prePull")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: player.prePull.limit,
              type: "",
              position: "",
              msg: "prePull",
              img: "",
            });
          }
          // console.log('pre pulling the same obstacle. Continue',player.prePull.count,limit);
        } else {
          // console.log('pre pull player, target or direction has changed. Reset prepull');
          player.action = "idle";
          player.prePull = {
            state: false,
            count: 0,
            limit: player.prePull.limit,
            targetCell: undefined,
            direction: "",
            puller: undefined,
          };

          resetPull = true;
        }
      }
    }
  }

  if (player.newPushPullDelay.state === true) {
    resetPull = true;
  }

  if (refCell.obstacle.moving.pushable !== true) {
    console.log("obstacle is instrinsically unpullable");
    resetPull = true;
  }

  if (resetPull === true) {
    player.action = "idle";
    player.prePull = {
      state: false,
      count: 0,
      limit: player.prePull.limit,
      targetCell: undefined,
      direction: "",
      puller: undefined,
    };
    player.postPull = {
      state: true,
      count: 0,
      limit: player.postPull.limit,
    };

    app.keyPressed[player.number - 1].pull = false;

    if (app.players[player.number - 1].newPushPullDelay.state !== true) {
      app.players[player.number - 1].newPushPullDelay.state = true;
    }

    if (!player.popups.find((x) => x.msg === "noPull")) {
      player.popups.push({
        state: false,
        count: 0,
        limit: player.prePull.limit,
        type: "",
        position: "",
        msg: "noPull",
        img: "",
      });
    }

    if (player.popups.find((x) => x.msg === "prePull")) {
      player.popups.splice(
        player.popups.findIndex((x) => x.msg === "prePull"),
        1,
      );
    }
    if (player.popups.find((x) => x.msg === "canPull")) {
      player.popups.splice(
        player.popups.findIndex((x) => x.msg === "canPull"),
        1,
      );
    }
  }

  app.players[player.number - 1].prePull = player.prePull;
  app.players[player.number - 1].pulling = player.pulling;
}
