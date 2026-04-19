export function prePlayerPullCheck(app, puller, target, pullDirection) {
  const logPullInput = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger(app, "player.pulling.input", message, data, { fn: "prePlayerPullCheck" });
    }
  };
  const logPullCount = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger(app, "player.pulling.count", message, data, { fn: "prePlayerPullCheck" });
    }
  };

  let resetPull = false;
  let targetCell = app.gridInfo.find((x) => x.number.x === target.cell1.number.x && x.number.y === target.cell1.number.y);
  let plyrRefCell = app.gridInfo.find(
    (x) => x.number.x === puller.currentPosition.cell.number.x && x.number.y === puller.currentPosition.cell.number.y,
  );
  let limit = puller.defending.limit - 1;
  let myCellCheck = true;
  if (plyrRefCell.barrier.state === true && plyrRefCell.barrier.position === puller.direction) {
    myCellCheck = false;
  }
  if (myCellCheck !== true) {
    logPullInput("blockedByPlayerCellBarrier", {
      playerId: puller.number,
      direction: puller.direction,
    });
    resetPull = true;
  }

  let targetOpen = false;
  let targetPlayer = app.players[target.cell1.occupant.player - 1];
  if (targetPlayer.success.deflected.state === true || targetPlayer.action === "idle") {
    targetOpen = true;
  } else {
    logPullInput("targetNotOpen", {
      pullerId: puller.number,
      targetId: targetPlayer.number,
      result: "target player is no longer deflected or idle",
    });
    resetPull = true;
  }

  if (targetOpen === true && myCellCheck === true && puller.newPushPullDelay.state !== true) {
    if (puller.prePull.state !== true && puller.prePull.count === 0) {
      // console.log('start player pre pull');
      puller.prePull = {
        state: true,
        count: puller.prePull.count++,
        limit: puller.prePull.limit,
        targetCell: targetCell,
        direction: pullDirection,
        puller: puller.number,
      };
      logPullCount("startPlayerPrePull", {
        pullerId: puller.number,
        targetId: targetPlayer.number,
        direction: pullDirection,
      });
    }

    if (puller.prePull.state === true) {
      if (puller.prePull.count >= puller.prePull.limit) {
        // if (puller.prePllh.count >= 25) {
        // if (puller.prePull.count >= limit) {

        // console.log('pre pull limit. check can pull player');
        app.players[puller.number - 1].prePull = puller.prePull;
        app.players[puller.number - 1].pulling = puller.pulling;
        if (puller.popups.find((x) => x.msg === "prePull")) {
          puller.popups.splice(
            puller.popups.findIndex((x) => x.msg === "prePull"),
            1,
          );
        }
        logPullCount("playerPrePullLimitReached", {
          pullerId: puller.number,
          targetId: targetPlayer.number,
          count: puller.prePull.count,
          limit: puller.prePull.limit,
        });
        app.canPullPlayer(puller, targetCell, targetPlayer);
      } else {
        if (
          puller.prePull.targetCell.number.x === targetCell.number.x &&
          puller.prePull.targetCell.number.y === targetCell.number.y &&
          puller.prePull.direction === pullDirection &&
          puller.prePull.puller === puller.number
        ) {
          puller.prePull.count++;
          logPullCount("playerPrePullProgress", {
            pullerId: puller.number,
            targetId: targetPlayer.number,
            count: puller.prePull.count,
            limit: puller.prePull.limit,
          });
          if (!puller.popups.find((x) => x.msg === "prePull")) {
            puller.popups.push({
              state: false,
              count: 0,
              limit: puller.prePull.limit,
              type: "",
              position: "",
              msg: "prePull",
              img: "",
            });
          }
          // console.log('pre pulling the same player. Continue',puller.prePull.count);
        } else {
          // console.log('pre pull player, target or direction has changed. Reset prepull');
          puller.prePull = {
            state: false,
            count: 0,
            limit: puller.prePull.limit,
            targetCell: undefined,
            direction: "",
            puller: undefined,
          };
          logPullInput("resetMismatch", {
            pullerId: puller.number,
            result: "pre pull player, target or direction has changed. Reset prepull",
          });

          resetPull = true;
        }
      }
    }
  }

  if (puller.newPushPullDelay.state === true) {
    resetPull = true;
  }

  if (targetOpen !== true) {
    logPullInput("targetNotOpen", {
      pullerId: puller.number,
      targetId: targetPlayer.number,
      result: "player is unpullable. reset pull",
    });
    resetPull = true;
  }

  if (resetPull === true) {
    logPullInput("prePlayerPullReset", {
      pullerId: puller.number,
      targetId: targetPlayer?.number,
    });
    puller.action = "idle";
    puller.prePull = {
      state: false,
      count: 0,
      limit: puller.prePull.limit,
      targetCell: undefined,
      direction: "",
      puller: undefined,
    };

    app.keyPressed[puller.number - 1].pull = false;

    if (app.players[puller.number - 1].newPushPullDelay.state !== true) {
      app.players[puller.number - 1].newPushPullDelay.state = true;
    }

    if (!app.players[puller.number - 1].popups.find((x) => x.msg === "noPull")) {
      app.players[puller.number - 1].popups.push({
        state: false,
        count: 0,
        limit: app.players[puller.number - 1].prePull.limit,
        type: "",
        position: "",
        msg: "noPull",
        img: "",
      });
    }

    if (app.players[puller.number - 1].popups.find((x) => x.msg === "prePull")) {
      app.players[puller.number - 1].popups.splice(
        app.players[puller.number - 1].popups.findIndex((x) => x.msg === "prePull"),
        1,
      );
    }
    if (app.players[puller.number - 1].popups.find((x) => x.msg === "canPull")) {
      app.players[puller.number - 1].popups.splice(
        app.players[puller.number - 1].popups.findIndex((x) => x.msg === "canPull"),
        1,
      );
    }
  }

  app.players[puller.number - 1].prePull = puller.prePull;
  app.players[puller.number - 1].pulling = puller.pulling;
}
