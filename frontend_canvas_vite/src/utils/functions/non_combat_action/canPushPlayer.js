export function canPushPlayer(app, pusher, targetCell, targetPlayer) {
  const logPush = (message, data = {}) => {
    if (app?.globalLogger) {
      app.globalLogger("player.pushing.execution", message, data, { fn: "canPushPlayer" });
    }
  };
  let resetPush = false;
  let thresholdMultiplier = app.rnJesus(1, 3);
  let canPushStrength = false;
  let canPushTargetFree = true;
  let pushStrengthThreshold = (targetPlayer.hp + (targetPlayer.crits.pushBack - 3) + (targetPlayer.crits.guardBreak - 2)) * thresholdMultiplier;
  let pushStrengthPlayer = 0;
  let movePlayer = true;
  let impactDirection = pusher.prePush.direction;

  let destCell = app.getCellFromDirection(1, targetCell.number, impactDirection);

  let destCellRef = app.gridInfo.find((x) => x.number.x === destCell.x && x.number.y === destCell.y);
  let destCellOccupant = "";

  if (pusher.stamina.current - app.staminaCostRef.push >= 0) {
    pusher.stamina.current = pusher.stamina.current - app.staminaCostRef.push;

    if (pusher.hp > 1) {
      pushStrengthPlayer += pusher.hp - 1;
    }
    pushStrengthPlayer += pusher.crits.pushBack - 3;
    pushStrengthPlayer += pusher.crits.guardBreak - 2;
    // pushStrengthPlayer += 15;

    let preMoveSpeed = Math.ceil(pushStrengthPlayer / pushStrengthThreshold);
    let moveSpeed = 0;
    if (preMoveSpeed <= 1) {
      moveSpeed = 0.05;
    }
    if (preMoveSpeed === 2) {
      moveSpeed = 0.1;
    }
    if (preMoveSpeed > 2 && preMoveSpeed < 4) {
      moveSpeed = 0.125;
    }
    if (preMoveSpeed >= 4) {
      moveSpeed = 0.2;
    }

    if (destCellRef) {
      if (destCellRef.obstacle.state === true) {
        canPushTargetFree = false;
        destCellOccupant = "obstacle";
        resetPush = true;
      }

      if (destCellRef.barrier.state === true) {
        let barrier = app.checkForwardBarrier(impactDirection, destCellRef);
        let destCell = app.getCellFromDirection(1, targetCell.number, impactDirection);

        if (barrier === true) {
          canPushTargetFree = false;
          destCellOccupant = "barrier";
          resetPush = true;
        }
      }

      if (targetCell.barrier.state === true) {
        // --------------
        let barrier = app.checkForwardBarrier(impactDirection, targetCell);

        if (barrier === true) {
          logPush("blocked", {
            pusherId: pusher.number,
            targetId: targetPlayer.number,
            blocker: "barrier",
            reason: "barrier in cell in front of target player",
            cell: targetCell.number,
          });
          canPushTargetFree = false;
          destCellOccupant = "barrier";
          resetPush = true;
        }
        // --------------

        if (targetCell.barrier.position === impactDirection) {
          logPush("blocked", {
            pusherId: pusher.number,
            targetId: targetPlayer.number,
            blocker: "barrier",
            reason: "barrier in cell behind target player",
            cell: targetCell.number,
          });
          canPushTargetFree = false;
          destCellOccupant = "barrier";
          resetPush = true;
        }
      }

      if (destCellRef.elevation.number > targetCell.elevation.number) {
        canPushTargetFree = false;
        destCellOccupant = "higherElevation";
        resetPush = true;
      }

      for (const plyr of app.players) {
        if (plyr.currentPosition.cell.number.x === destCell.x && plyr.currentPosition.cell.number.y === destCell.y) {
          // change when implementing push player
          canPushTargetFree = false;
          resetPush = true;
          destCellOccupant = `player_${plyr.number}`;
        }
      }
    } else {
      if (targetCell.barrier.state === true) {
        // --------------
        let barrier = app.checkForwardBarrier(impactDirection, targetCell);

        if (barrier === true) {
          logPush("blocked", {
            pusherId: pusher.number,
            targetId: targetPlayer.number,
            blocker: "barrier",
            reason: "barrier in cell in front of target player (edge, no dest cell)",
            cell: targetCell.number,
          });
          canPushTargetFree = false;
          destCellOccupant = "barrier";
          resetPush = true;
        }
        // --------------

        if (targetCell.barrier.position === impactDirection) {
          logPush("blocked", {
            pusherId: pusher.number,
            targetId: targetPlayer.number,
            blocker: "barrier",
            reason: "barrier in cell behind target player (edge, no dest cell)",
            cell: targetCell.number,
          });
          canPushTargetFree = false;
          destCellOccupant = "barrier";
          resetPush = true;
        }
      }
    }

    let extraPush = 0;
    if (pushStrengthPlayer >= pushStrengthThreshold) {
      canPushStrength = true;
      extraPush = pushStrengthPlayer - pushStrengthThreshold;
      // console.log(
      //   "you are strongh enough to push app player",
      //   pushStrengthPlayer,
      //   pushStrengthThreshold,
      //   pusher.crits.guardBreak - 2,
      //   pusher.crits.pushBack - 2,
      //   "extra",
      //   extraPush
      // );
    } else {
      logPush("notStrongEnough", {
        pusherId: pusher.number,
        targetId: targetPlayer.number,
        strength: pushStrengthPlayer,
        threshold: pushStrengthThreshold,
      });
      resetPush = true;
    }
    if (extraPush > 3) {
      logPush("extraPushForce", {
        pusherId: pusher.number,
        targetId: targetPlayer.number,
        extra: extraPush,
        result: "move target player without pusher moving",
      });
      movePlayer = false;
    }

    if (canPushStrength === true && canPushTargetFree === true && !destCellRef) {
      logPush("success", {
        pusherId: pusher.number,
        targetId: targetPlayer.number,
        destCell: destCell,
        edgeCase: "no dest cell ref",
        movePlayer,
      });
      if (!app.players[pusher.number - 1].popups.find((x) => x.msg === "canPush")) {
        app.players[pusher.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "canPush",
          img: "",
        });
      }

      if (app.players[pusher.number - 1].popups.find((x) => x.msg === "prePush")) {
        app.players[pusher.number - 1].popups.splice(
          app.players[pusher.number - 1].popups.findIndex((x) => x.msg === "prePush"),
          1,
        );
      }
      if (app.players[pusher.number - 1].popups.find((x) => x.msg === "noPush")) {
        app.players[pusher.number - 1].popups.splice(
          app.players[pusher.number - 1].popups.findIndex((x) => x.msg === "noPush"),
          1,
        );
      }

      // MOVE TARGET PLAYER
      app.players[targetPlayer.number - 1].strafing.direction = impactDirection;
      app.players[targetPlayer.number - 1].strafing.state = true;
      app.players[targetPlayer.number - 1].action = "strafe moving";

      app.unsetDeflection(targetPlayer);

      app.players[targetPlayer.number - 1].pushed = {
        state: true,
        pusher: pusher.number,
        moveSpeed: moveSpeed,
      };
      app.getTarget(targetPlayer);

      if (!app.players[targetPlayer.number - 1].popups.find((x) => x.msg === "pushedPulled")) {
        app.players[targetPlayer.number - 1].popups.push({
          state: false,
          count: 0,
          limit: app.players[targetPlayer.number - 1].prePull.limit,
          type: "",
          position: "",
          msg: "pushedPulled",
          img: "",
        });
      }
      app.players[targetPlayer.number - 1].moving = {
        state: true,
        step: 0,
        course: "",
        origin: {
          number: {
            x: targetPlayer.currentPosition.cell.number.x,
            y: targetPlayer.currentPosition.cell.number.y,
          },
          center: {
            x: targetPlayer.currentPosition.cell.center,
            y: targetPlayer.currentPosition.cell.center,
          },
        },
        destination: targetPlayer.target.cell1.center,
      };
      let targetPlyrNextPosition = app.lineCrementer(targetPlayer);
      app.players[targetPlayer.number - 1].nextPosition = targetPlyrNextPosition;

      // MOVE PUSHER
      app.players[pusher.number - 1].prePush = {
        state: false,
        count: 0,
        limit: pusher.prePush.limit,
        targetCell: undefined,
        direction: "",
        pusher: undefined,
      };

      if (movePlayer === true) {
        app.players[pusher.number - 1].pushing = {
          state: true,
          targetCell: targetCell,
          moveSpeed: moveSpeed,
        };

        if (pusher.turning.delayCount === 0) {
          app.players[pusher.number - 1].action = "moving";
          app.players[pusher.number - 1].moving = {
            state: true,
            step: 0,
            course: "",
            origin: {
              number: {
                x: pusher.currentPosition.cell.number.x,
                y: pusher.currentPosition.cell.number.y,
              },
              center: {
                x: pusher.currentPosition.cell.center,
                y: pusher.currentPosition.cell.center,
              },
            },
            destination: targetCell.center,
          };
          let nextPosition = app.lineCrementer(pusher);
          pusher.nextPosition = nextPosition;
        }
      }
    }

    // console.log('pushStrengthThreshold/Player',pushStrengthThreshold,pushStrengthPlayer);

    if (canPushTargetFree !== true) {
      logPush("blocked", {
        pusherId: pusher.number,
        targetId: targetPlayer.number,
        blocker: destCellOccupant || "unknown",
        reason: "something is in the way of the target player",
      });
      resetPush = true;
    }

    if (canPushStrength === true && canPushTargetFree === true && destCellRef) {
      logPush("success", {
        pusherId: pusher.number,
        targetId: targetPlayer.number,
        destCell: destCell,
        destCellOccupant,
        movePlayer,
      });
      // console.log('ready to push');
      if (!app.players[pusher.number - 1].popups.find((x) => x.msg === "canPush")) {
        app.players[pusher.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "canPush",
          img: "",
        });
      }

      if (app.players[pusher.number - 1].popups.find((x) => x.msg === "prePush")) {
        app.players[pusher.number - 1].popups.splice(
          app.players[pusher.number - 1].popups.findIndex((x) => x.msg === "prePush"),
          1,
        );
      }
      if (app.players[pusher.number - 1].popups.find((x) => x.msg === "noPush")) {
        app.players[pusher.number - 1].popups.splice(
          app.players[pusher.number - 1].popups.findIndex((x) => x.msg === "noPush"),
          1,
        );
      }

      // MOVE TARGET PLAYER
      app.players[targetPlayer.number - 1].strafing.direction = impactDirection;
      app.players[targetPlayer.number - 1].strafing.state = true;
      app.players[targetPlayer.number - 1].action = "strafe moving";

      app.unsetDeflection(targetPlayer);

      app.players[targetPlayer.number - 1].pushed = {
        state: true,
        pusher: pusher.number,
        moveSpeed: moveSpeed,
      };
      app.getTarget(targetPlayer);

      if (!app.players[targetPlayer.number - 1].popups.find((x) => x.msg === "pushedPulled")) {
        app.players[targetPlayer.number - 1].popups.push({
          state: false,
          count: 0,
          limit: app.players[targetPlayer.number - 1].prePull.limit,
          type: "",
          position: "",
          msg: "pushedPulled",
          img: "",
        });
      }

      app.players[targetPlayer.number - 1].moving = {
        state: true,
        step: 0,
        course: "",
        origin: {
          number: {
            x: targetPlayer.currentPosition.cell.number.x,
            y: targetPlayer.currentPosition.cell.number.y,
          },
          center: {
            x: targetPlayer.currentPosition.cell.center,
            y: targetPlayer.currentPosition.cell.center,
          },
        },
        destination: destCellRef.center,
      };
      let targetPlyrNextPosition = app.lineCrementer(targetPlayer);
      app.players[targetPlayer.number - 1].nextPosition = targetPlyrNextPosition;

      // MOVE PUSHER
      app.players[pusher.number - 1].prePush = {
        state: false,
        count: 0,
        limit: pusher.prePush.limit,
        targetCell: undefined,
        direction: "",
        pusher: undefined,
      };
      if (movePlayer === true) {
        app.players[pusher.number - 1].pushing = {
          state: true,
          targetCell: targetCell,
          moveSpeed: moveSpeed,
        };

        if (pusher.turning.delayCount === 0) {
          app.players[pusher.number - 1].action = "moving";
          app.players[pusher.number - 1].moving = {
            state: true,
            step: 0,
            course: "",
            origin: {
              number: {
                x: pusher.currentPosition.cell.number.x,
                y: pusher.currentPosition.cell.number.y,
              },
              center: {
                x: pusher.currentPosition.cell.center,
                y: pusher.currentPosition.cell.center,
              },
            },
            destination: targetCell.center,
          };
          let nextPosition = app.lineCrementer(pusher);
          pusher.nextPosition = nextPosition;
        }
      } else {
        pusher.action = "idle";
      }
    }
  } else {
    pusher.stamina.current = 0;
    resetPush = true;
    logPush("outOfStamina", {
      pusherId: pusher.number,
      stamina: pusher.stamina.current,
      cost: app.staminaCostRef.push,
    });
    pusher.statusDisplay = {
      state: true,
      status: "Out of Stamina",
      count: 1,
      limit: pusher.statusDisplay.limit,
    };

    if (!pusher.popups.find((x) => x.msg === "outOfStamina")) {
      pusher.popups.push({
        state: false,
        count: 0,
        limit: 20,
        type: "",
        position: "",
        msg: "outOfStamina",
        img: "",
      });
    }
  }

  if (resetPush === true) {
    app.players[pusher.number - 1].prePush = {
      state: false,
      count: 0,
      limit: pusher.prePush.limit,
      targetCell: undefined,
      direction: "",
      pusher: undefined,
    };
    app.players[pusher.number - 1].pushing = {
      state: false,
      targetCell: undefined,
      moveSpeed: 0,
    };
    if (app.players[pusher.number - 1].newPushPullDelay.state !== true) {
      app.players[pusher.number - 1].newPushPullDelay.state = true;
    }

    if (!app.players[pusher.number - 1].popups.find((x) => x.msg === "noPush")) {
      app.players[pusher.number - 1].popups.push({
        state: false,
        count: 0,
        limit: 25,
        type: "",
        position: "",
        msg: "noPush",
        img: "",
      });
    }

    if (app.players[pusher.number - 1].popups.find((x) => x.msg === "prePush")) {
      app.players[pusher.number - 1].popups.splice(
        app.players[pusher.number - 1].popups.findIndex((x) => x.msg === "prePush"),
        1,
      );
    }
    if (app.players[pusher.number - 1].popups.find((x) => x.msg === "canaPush")) {
      app.players[pusher.number - 1].popups.splice(
        app.players[pusher.number - 1].popups.findIndex((x) => x.msg === "canPush"),
        1,
      );
    }

    if (canPushTargetFree !== true && destCellOccupant !== "") {
      let type = destCellOccupant;
      if (type.split("_")[1]) {
        type = "player";
      }
      app.startHalfPushBack("player", type, impactDirection, targetPlayer);
    }
  }
}
