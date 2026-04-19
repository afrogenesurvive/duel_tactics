export function prePlayerPushCheck(app, pusher, target) {
  const logPushInput = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger(app, "player.pushing.input", message, data, { fn: "prePlayerPushCheck" });
    }
  };
  const logPushCount = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger(app, "player.pushing.count", message, data, { fn: "prePlayerPushCheck" });
    }
  };

  let resetPush = false;
  let targetCell = app.gridInfo.find((x) => x.number.x === target.cell1.number.x && x.number.y === target.cell1.number.y);
  let plyrRefCell = app.gridInfo.find(
    (x) => x.number.x === pusher.currentPosition.cell.number.x && x.number.y === pusher.currentPosition.cell.number.y,
  );

  let myCellCheck = true;
  if (plyrRefCell.barrier.state === true && plyrRefCell.barrier.position === pusher.direction) {
    myCellCheck = false;
  }
  if (myCellCheck !== true) {
    logPushInput("blockedByPlayerCellBarrier", {
      pusherId: pusher.number,
      direction: pusher.direction,
    });
    resetPush = true;
  }

  let targetOpen = false;
  let targetPlayer = app.players[target.cell1.occupant.player - 1];
  if (targetPlayer.success.deflected.state === true || targetPlayer.action === "idle") {
    targetOpen = true;
  } else {
    logPushInput("targetNotOpen", {
      pusherId: pusher.number,
      targetId: targetPlayer.number,
      result: "target player is no longer deflected or idle",
    });
    resetPush = true;
  }

  if (targetOpen === true && myCellCheck === true && pusher.newPushPullDelay.state !== true) {
    if (pusher.prePush.state !== true && pusher.prePush.count === 0) {
      pusher.prePush = {
        state: true,
        count: pusher.prePush.count++,
        limit: pusher.prePush.limit,
        targetCell: targetCell,
        direction: pusher.direction,
        pusher: pusher.number,
      };
      logPushCount("prePlayerPushStart", {
        pusherId: pusher.number,
        targetId: targetPlayer.number,
        direction: pusher.direction,
      });
    }

    if (pusher.prePush.state === true) {
      // if (pusher.prePush.count >= 25) {
      if (pusher.prePush.count >= pusher.prePush.limit) {
        // console.log('pre push limit. check can push player');
        app.players[pusher.number - 1].prePush = pusher.prePush;
        app.players[pusher.number - 1].pushing = pusher.pushing;
        if (pusher.popups.find((x) => x.msg === "prePush")) {
          pusher.popups.splice(
            pusher.popups.findIndex((x) => x.msg === "prePush"),
            1,
          );
        }
        logPushCount("playerPrePushLimitReached", {
          pusherId: pusher.number,
          targetId: targetPlayer.number,
          count: pusher.prePush.count,
          limit: pusher.prePush.limit,
        });
        app.canPushPlayer(pusher, targetCell, targetPlayer);
      } else {
        if (
          pusher.prePush.targetCell.number.x === targetCell.number.x &&
          pusher.prePush.targetCell.number.y === targetCell.number.y &&
          pusher.prePush.direction === pusher.direction &&
          pusher.prePush.pusher === pusher.number
        ) {
          pusher.prePush.count++;
          logPushCount("playerPrePushProgress", {
            pusherId: pusher.number,
            targetId: targetPlayer.number,
            count: pusher.prePush.count,
            limit: pusher.prePush.limit,
          });
          if (!pusher.popups.find((x) => x.msg === "prePush")) {
            pusher.popups.push({
              state: false,
              count: 0,
              limit: pusher.prePush.limit,
              type: "",
              position: "",
              msg: "prePush",
              img: "",
            });
          }
          // console.log('pre pushing the same player. Continue',pusher.prePush.count);
        } else {
          // console.log('pre push player, target or direction has changed. Reset prepush');
          pusher.prePush = {
            state: false,
            count: 0,
            limit: pusher.prePush.limit,
            targetCell: undefined,
            direction: "",
            pusher: undefined,
          };
          logPushInput("resetMismatch", {
            pusherId: pusher.number,
            result: "pre push player, target or direction has changed. Reset prepush",
          });

          resetPush = true;
        }
      }
    }
  }

  if (pusher.newPushPullDelay.state === true) {
    resetPush = true;
  }

  if (targetOpen !== true) {
    logPushInput("targetNotOpen", {
      pusherId: pusher.number,
      targetId: targetPlayer.number,
      result: "player is unpushable. reset push",
    });
    resetPush = true;
  }

  if (resetPush === true) {
    logPushInput("prePlayerPushReset", {
      pusherId: pusher.number,
      targetId: targetPlayer?.number,
    });
    pusher.prePush = {
      state: false,
      count: 0,
      limit: pusher.prePush.limit,
      targetCell: undefined,
      direction: "",
      pusher: undefined,
    };

    if (pusher.newPushPullDelay.state !== true) {
      pusher.newPushPullDelay.state = true;
    }
  }

  app.players[pusher.number - 1].prePush = pusher.prePush;
  app.players[pusher.number - 1].pushing = pusher.pushing;
}
