export function preObstaclePushCheck(app, player, target) {
  // console.log('pre push check');

  let resetPush = false;
  let refCell = app.gridInfo.find((x) => x.number.x === target.cell1.number.x && x.number.y === target.cell1.number.y);
  let plyrRefCell = app.gridInfo.find(
    (x) => x.number.x === player.currentPosition.cell.number.x && x.number.y === player.currentPosition.cell.number.y,
  );

  let myCellCheck = true;
  if (plyrRefCell.barrier.state === true && plyrRefCell.barrier.position === player.direction) {
    myCellCheck = false;
  }
  if (myCellCheck !== true) {
    console.log("a barrier in player cell is blocking a push");
    resetPush = true;
  }

  if (refCell.obstacle.state !== true) {
    console.log("barrier not obstacle. Cant be pushed");
    resetPush = true;
  } else if (refCell.obstacle.moving.pushable === true && myCellCheck === true && player.newPushPullDelay.state !== true) {
    if (player.prePush.state !== true && player.prePush.count === 0) {
      // console.log('start pre push');
      player.prePush = {
        state: true,
        count: player.prePush.count++,
        limit: player.prePush.limit,
        targetCell: refCell,
        direction: player.direction,
        pusher: player.number,
      };
    }

    if (player.prePush.state === true) {
      if (player.prePush.count >= player.prePush.limit) {
        // console.log('pre push limit. check can push');
        app.players[player.number - 1].prePush = player.prePush;
        app.players[player.number - 1].pushing = player.pushing;

        if (player.popups.find((x) => x.msg === "prePush")) {
          player.popups.splice(
            player.popups.findIndex((x) => x.msg === "prePush"),
            1,
          );
        }
        app.canPushObstacle("player", player, refCell, "");
      } else {
        if (
          player.prePush.targetCell.number.x === refCell.number.x &&
          player.prePush.targetCell.number.y === refCell.number.y &&
          player.prePush.direction === player.direction &&
          player.prePush.pusher === player.number
        ) {
          player.prePush.count++;
          if (!player.popups.find((x) => x.msg === "prePush")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: player.prePush.limit,
              type: "",
              position: "",
              msg: "prePush",
              img: "",
            });
          }
          // console.log('pre pushing the same obstacle. Continue',player.prePush.count);
        } else {
          // console.log('pre push player, target or direction has changed. Reset prepush');
          player.prePush = {
            state: false,
            count: 0,
            limit: player.prePush.limit,
            targetCell: undefined,
            direction: "",
            pusher: undefined,
          };

          resetPush = true;
        }
      }
    }
  }

  if (player.newPushPullDelay.state === true) {
    resetPush = true;
  }

  if (refCell.obstacle.moving.pushable !== true) {
    console.log("obstacle is instrinsically unpushable");
    resetPush = true;
  }

  if (resetPush === true) {
    player.prePush = {
      state: false,
      count: 0,
      limit: player.prePush.limit,
      targetCell: undefined,
      direction: "",
      pusher: undefined,
    };

    if (player.newPushPullDelay.state !== true) {
      player.newPushPullDelay.state = true;
    }
  }

  app.players[player.number - 1].prePush = player.prePush;
  app.players[player.number - 1].pushing = player.pushing;
}
