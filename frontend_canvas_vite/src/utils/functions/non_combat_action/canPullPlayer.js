export function canPullPlayer(app, puller, targetCell, targetPlayer) {
  let resetPull = false;
  let thresholdMultiplier = app.rnJesus(1, 3);
  let canPullStrength = false;
  let canPullTargetFree = true;
  let pullStrengthThreshold = (targetPlayer.hp + (targetPlayer.crits.pushBack - 3) + (targetPlayer.crits.guardBreak - 2)) * thresholdMultiplier;
  let pullStrengthPlayer = 0;
  let movePlayer = true;
  let impactDirection = puller.prePull.direction;
  let pullerCellRef = app.gridInfo.find(
    (x) => x.number.x === puller.currentPosition.cell.number.x && x.number.y === puller.currentPosition.cell.number.y,
  );

  if (puller.stamina.current - app.staminaCostRef.pull >= 0) {
    puller.stamina.current = puller.stamina.current - app.staminaCostRef.pull;

    if (puller.hp > 1) {
      pullStrengthPlayer += puller.hp - 1;
    }
    pullStrengthPlayer += puller.crits.pushBack - 3;
    pullStrengthPlayer += puller.crits.guardBreak - 2;
    pullStrengthPlayer += 15;

    let destCell = app.getCellFromDirection(1, puller.currentPosition.cell.number, impactDirection);

    // console.log('destCell',destCell,'pull pos',puller.currentPosition.cell.number,'impact dir',impactDirection);
    let destCellRef = app.gridInfo.find((x) => x.number.x === destCell.x && x.number.y === destCell.y);
    let destCellOccupant = "";

    let preMoveSpeed = Math.ceil(pullStrengthPlayer / pullStrengthThreshold);
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
        canPullTargetFree = false;
        destCellOccupant = "obstacle";
        resetPull = true;
      }

      if (destCellRef.barrier.state === true) {
        let barrier = app.checkForwardBarrier(impactDirection, destCellRef);

        if (barrier === true) {
          canPullTargetFree = false;
          destCellOccupant = "barrier";
          resetPull = true;
        }
      }

      if (targetCell.barrier.state === true) {
        // --------------
        let barrier = app.checkForwardBarrier(impactDirection, targetCell);

        if (barrier === true) {
          console.log("barrier in obstacle cell in front of target player");
          canPullTargetFree = false;
          destCellOccupant = "barrier";
          resetPull = true;
        }
        // --------------

        if (targetCell.barrier.position === impactDirection) {
          console.log("barrier in target player cell behind target player");
          canPullTargetFree = false;
          destCellOccupant = "barrier";
          resetPull = true;
        }
      }

      for (const plyr of app.players) {
        if (plyr.currentPosition.cell.number.x === destCell.x && plyr.currentPosition.cell.number.y === destCell.y) {
          // change when implementing push player
          canPullTargetFree = false;
          resetPull = true;
          destCellOccupant = `player_${plyr.number}`;
        }
      }
    }

    if (pullStrengthPlayer >= pullStrengthThreshold) {
      canPullStrength = true;
      // console.log(
      //   "you are strongh enough to pull app player",
      //   pullStrengthPlayer,
      //   pullStrengthThreshold,
      //   puller.crits.guardBreak - 2,
      //   puller.crits.pushBack - 2
      // );
    } else {
      console.log(
        "you are NOT strong enough to pull app player",
        pullStrengthPlayer,
        pullStrengthThreshold,
        puller.crits.guardBreak - 2,
        puller.crits.pushBack - 2,
      );
      resetPull = true;
    }

    // movePlayer = true;

    if (!destCellRef && pullStrengthPlayer >= pullStrengthThreshold) {
      // console.log('ready to pull',moveSpeed);
      if (!app.players[puller.number - 1].popups.find((x) => x.msg === "canPull")) {
        app.players[puller.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "canPull",
          img: "",
        });
      }

      if (app.players[puller.number - 1].popups.find((x) => x.msg === "prePull")) {
        app.players[puller.number - 1].popups.splice(
          app.players[puller.number - 1].popups.findIndex((x) => x.msg === "prePull"),
          1,
        );
      }
      if (app.players[puller.number - 1].popups.find((x) => x.msg === "noPull")) {
        app.players[puller.number - 1].popups.splice(
          app.players[puller.number - 1].popups.findIndex((x) => x.msg === "noPull"),
          1,
        );
      }

      let voidCenter = app.getVoidCenter(1, impactDirection, pullerCellRef.center);

      // MOVE TARGET PLAYER

      if (puller.prePull.direction !== targetPlayer.direction) {
        app.players[targetPlayer.number - 1].strafing.direction = impactDirection;
        app.players[targetPlayer.number - 1].strafing.state = true;
        app.players[targetPlayer.number - 1].action = "strafe moving";
      } else {
        app.players[targetPlayer.number - 1].action = "moving";
      }

      app.unsetDeflection(targetPlayer);

      app.players[targetPlayer.number - 1].pulled = {
        state: true,
        puller: puller.number,
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
        destination: pullerCellRef.center,
      };
      let targetPlyrNextPosition = app.lineCrementer(targetPlayer);
      app.players[targetPlayer.number - 1].nextPosition = targetPlyrNextPosition;

      // MOVE PUllER
      app.players[puller.number - 1].prePull = {
        state: false,
        count: 0,
        limit: puller.prePull.limit,
        targetCell: undefined,
        direction: impactDirection,
        puller: undefined,
      };

      if (movePlayer === true) {
        app.players[puller.number - 1].pulling = {
          state: true,
          targetCell: targetCell,
          moveSpeed: moveSpeed,
        };

        app.getTarget(puller);

        if (puller.turning.delayCount === 0) {
          app.players[puller.number - 1].strafing.direction = impactDirection;
          app.players[puller.number - 1].strafing.state = true;
          app.players[puller.number - 1].action = "strafe moving";
          app.players[puller.number - 1].moving = {
            state: true,
            step: 0,
            course: "",
            origin: {
              number: {
                x: puller.currentPosition.cell.number.x,
                y: puller.currentPosition.cell.number.y,
              },
              center: {
                x: puller.currentPosition.cell.center,
                y: puller.currentPosition.cell.center,
              },
            },
            destination: voidCenter,
          };
          let nextPosition = app.lineCrementer(puller);
          puller.nextPosition = nextPosition;
        }
      }

      app.players[puller.number - 1].prePull.direction = "";
    }

    // console.log('pullStrengthThreshold/Player',pullStrengthThreshold,pullStrengthPlayer);

    if (canPullTargetFree !== true) {
      console.log("something is in the way of the player to be pulled");
      resetPull = true;
    }

    if (canPullStrength === true && canPullTargetFree === true && destCellRef) {
      // console.log('ready to pull',moveSpeed);
      if (!app.players[puller.number - 1].popups.find((x) => x.msg === "canPull")) {
        app.players[puller.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "canPull",
          img: "",
        });
      }

      if (app.players[puller.number - 1].popups.find((x) => x.msg === "prePull")) {
        app.players[puller.number - 1].popups.splice(
          app.players[puller.number - 1].popups.findIndex((x) => x.msg === "prePull"),
          1,
        );
      }
      if (app.players[puller.number - 1].popups.find((x) => x.msg === "noPull")) {
        app.players[puller.number - 1].popups.splice(
          app.players[puller.number - 1].popups.findIndex((x) => x.msg === "noPull"),
          1,
        );
      }

      // MOVE TARGET PLAYER
      if (impactDirection !== targetPlayer.direction) {
        app.players[targetPlayer.number - 1].strafing.direction = impactDirection;
        app.players[targetPlayer.number - 1].strafing.state = true;
        app.players[targetPlayer.number - 1].action = "strafe moving";
      } else {
        app.players[targetPlayer.number - 1].action = "moving";
      }

      app.unsetDeflection(targetPlayer);

      app.players[targetPlayer.number - 1].pulled = {
        state: true,
        puller: puller.number,
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
        destination: pullerCellRef.center,
      };
      let targetPlyrNextPosition = app.lineCrementer(targetPlayer);
      app.players[targetPlayer.number - 1].nextPosition = targetPlyrNextPosition;

      // MOVE PULLER
      app.players[puller.number - 1].prePull = {
        state: false,
        count: 0,
        limit: puller.prePull.limit,
        targetCell: undefined,
        direction: impactDirection,
        puller: undefined,
      };
      app.players[puller.number - 1].defending = {
        state: false,
        count: 0,
        limit: puller.defending.limit,
        animRef: puller.defending.animRef,
        peak: false,
        peakCount: 0,
        decay: {
          state: false,
          count: 0,
          limit: puller.defending.decay.limit,
        },
        direction: "",
        directionType: "", //thrust or slash
      };

      if (movePlayer === true) {
        app.players[puller.number - 1].pulling = {
          state: true,
          targetCell: targetCell,
          moveSpeed: moveSpeed,
        };

        app.getTarget(puller);

        app.players[puller.number - 1].prePull.direction = "";

        if (puller.turning.delayCount === 0) {
          app.players[puller.number - 1].strafing.direction = impactDirection;
          app.players[puller.number - 1].strafing.state = true;
          app.players[puller.number - 1].action = "strafe moving";
          app.players[puller.number - 1].moving = {
            state: true,
            step: 0,
            course: "",
            origin: {
              number: {
                x: puller.currentPosition.cell.number.x,
                y: puller.currentPosition.cell.number.y,
              },
              center: {
                x: puller.currentPosition.cell.center,
                y: puller.currentPosition.cell.center,
              },
            },
            destination: destCellRef.center,
          };
          let nextPosition = app.lineCrementer(puller);
          puller.nextPosition = nextPosition;
        }
      } else {
        puller.action = "idle";
      }
    }

    // if target isn't free, 1/2 pushback
  } else {
    puller.stamina.current = 0;
    resetPull = true;
    puller.statusDisplay = {
      state: true,
      status: "Out of Stamina",
      count: 1,
      limit: puller.statusDisplay.limit,
    };

    if (!puller.popups.find((x) => x.msg === "outOfStamina")) {
      puller.popups.push({
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

  if (resetPull === true) {
    app.players[puller.number - 1].action = "idle";
    app.players[puller.number - 1].prePull = {
      state: false,
      count: 0,
      limit: puller.prePull.limit,
      targetCell: undefined,
      direction: "",
      puller: undefined,
    };
    app.players[puller.number - 1].pulling = {
      state: false,
      targetCell: undefined,
      moveSpeed: 0,
    };

    app.players[puller.number - 1].postPull = {
      state: true,
      count: 0,
      limit: puller.postPull.limit,
    };

    app.keyPressed[puller.number - 1].pull = false;

    if (app.players[puller.number - 1].newPushPullDelay.state !== true) {
      app.players[puller.number - 1].newPushPullDelay.state = true;
    }

    if (!app.players[puller.number - 1].popups.find((x) => x.msg === "noPull")) {
      app.players[puller.number - 1].popups.push({
        state: false,
        count: 0,
        limit: 25,
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
}
