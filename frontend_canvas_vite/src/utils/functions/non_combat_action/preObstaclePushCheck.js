export function preObstaclePushCheck(app, player, target) {
  const logPushInput = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("player.pushing.input", message, data, { fn: "preObstaclePushCheck" });
    }
  };
  const logPushCount = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("player.pushing.count", message, data, { fn: "preObstaclePushCheck" });
    }
  };

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
    logPushInput("blockedByPlayerCellBarrier", {
      playerId: player.number,
      direction: player.direction,
    });
    resetPush = true;
  }

  if (refCell.obstacle.state !== true) {
    logPushInput("targetNotObstacle", {
      playerId: player.number,
      target: refCell.number,
    });
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
      logPushCount("startPreObstaclePush", {
        playerId: player.number,
        target: refCell.number,
        direction: player.direction,
      });
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
        logPushCount("prePushLimitReached", {
          playerId: player.number,
          target: refCell.number,
          count: player.prePush.count,
          limit: player.prePush.limit,
        });
        app.canPushObstacle("player", player, refCell, "");
      } else {
        if (
          player.prePush.targetCell.number.x === refCell.number.x &&
          player.prePush.targetCell.number.y === refCell.number.y &&
          player.prePush.direction === player.direction &&
          player.prePush.pusher === player.number
        ) {
          player.prePush.count++;
          logPushCount("preObstaclePushProgress", {
            playerId: player.number,
            target: refCell.number,
            count: player.prePush.count,
            limit: player.prePush.limit,
          });
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
          logPushInput("resetMismatch", {
            playerId: player.number,
            result: "pre push player, target or direction has changed. Reset prepush",
          });

          resetPush = true;
        }
      }
    }
  }

  if (player.newPushPullDelay.state === true) {
    resetPush = true;
  }

  if (refCell.obstacle.moving.pushable !== true) {
    logPushInput("targetUnpushable", {
      playerId: player.number,
      target: refCell.number,
    });
    resetPush = true;
  }

  if (resetPush === true) {
    logPushInput("preObstaclePushReset", {
      playerId: player.number,
      target: refCell.number,
    });
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
