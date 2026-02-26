export function canPullObstacle(app, player, obstacleCell) {
  let resetPull = false;
  let thresholdMultiplier = app.rnJesus(1, 3);
  let canPullStrength = false;
  let canPullTargetFree = true;
  let pullStrengthThreshold = (obstacleCell.obstacle.height + obstacleCell.obstacle.weight) * thresholdMultiplier;
  let pullStrengthPlayer = 0;
  let impactDirection = player.prePull.direction;

  if (player.stamina.current - app.staminaCostRef.pull >= 0) {
    player.stamina.current = player.stamina.current - app.staminaCostRef.pull;

    if (player.hp > 1) {
      pullStrengthPlayer += player.hp - 1;
    }
    pullStrengthPlayer += player.crits.pushBack - 3;
    pullStrengthPlayer += player.crits.guardBreak - 2;
    let playerCellRef = app.gridInfo.find(
      (x) => x.number.x === player.currentPosition.cell.number.x && x.number.y === player.currentPosition.cell.number.y,
    );

    let destCell = app.getCellFromDirection(1, player.currentPosition.cell.number, impactDirection);

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
    // pullStrengthThreshold = 100
    if (app.terrainMoveSpeedRef[obstacleCell.terrain.type]) {
      moveSpeed = app.terrainMoveSpeedRef[obstacleCell.terrain.type];
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

      if (obstacleCell.barrier.state === true) {
        if (obstacleCell.barrier.position === impactDirection) {
          console.log("barrier in obstacle cell behind obstacle");
          canPullTargetFree = false;
          destCellOccupant = "barrier";
          resetPull = true;
        }
      }

      for (const plyr of app.players) {
        if (plyr.currentPosition.cell.number.x === destCell.x && plyr.currentPosition.cell.number.y === destCell.y) {
          canPullTargetFree = false;
          resetPull = true;
          destCellOccupant = `player_${plyr.number}`;
        }
      }
    }

    if (!destCellRef && pullStrengthPlayer >= pullStrengthThreshold) {
      // console.log('ready to pull',moveSpeed);
      if (!app.players[player.number - 1].popups.find((x) => x.msg === "canPull")) {
        app.players[player.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "canPull",
          img: "",
        });
      }

      if (app.players[player.number - 1].popups.find((x) => x.msg === "prePull")) {
        app.players[player.number - 1].popups.splice(
          app.players[player.number - 1].popups.findIndex((x) => x.msg === "prePull"),
          1,
        );
      }
      if (app.players[player.number - 1].popups.find((x) => x.msg === "noPull")) {
        app.players[player.number - 1].popups.splice(
          app.players[player.number - 1].popups.findIndex((x) => x.msg === "noPull"),
          1,
        );
      }

      let voidCenter = app.getVoidCenter(1, impactDirection, playerCellRef.center);

      let obstacleCrementObj = app.obstacleMoveCrementer(obstacleCell, {
        center: playerCellRef.center,
      });

      obstacleCell.obstacle = {
        id: obstacleCell.obstacle.id,
        trap: obstacleCell.obstacle.trap,
        state: obstacleCell.obstacle.state,
        name: obstacleCell.obstacle.name,
        type: obstacleCell.obstacle.type,
        hp: obstacleCell.obstacle.hp,
        destructible: obstacleCell.obstacle.destructible,
        locked: obstacleCell.obstacle.locked,
        weight: obstacleCell.obstacle.weight,
        height: obstacleCell.obstacle.height,
        items: obstacleCell.obstacle.items,
        effects: obstacleCell.obstacle.effects,
        moving: {
          state: true,
          step: obstacleCrementObj.step,
          origin: {
            number: obstacleCell.number,
            center: obstacleCell.center,
          },
          destination: {
            number: playerCellRef.number,
            center: playerCellRef.center,
          },
          currentPosition: obstacleCell.center,
          nextPosition: obstacleCrementObj.pos,
          moveSpeed: moveSpeed,
          pushable: true,
          pushed: true,
          pusher: player.number,
          falling: obstacleCell.obstacle.moving.falling,
        },
      };

      app.players[player.number - 1].prePull = {
        state: false,
        count: 0,
        limit: player.prePull.limit,
        targetCell: undefined,
        direction: impactDirection,
        puller: undefined,
      };
      app.players[player.number - 1].pulling = {
        state: true,
        targetCell: obstacleCell,
        moveSpeed: moveSpeed,
      };

      // app.players[player.number-1].postPull = {
      //   state: true,
      //   count: 0,
      //   limit: player.postPull.limit
      // }
      app.getTarget(player);
      console.log("here", voidCenter);

      app.players[player.number - 1].prePull.direction = "";

      if (player.turning.delayCount === 0) {
        player.target.cell1.void = true;
        app.players[player.number - 1].strafing.direction = impactDirection;
        app.players[player.number - 1].strafing.state = true;
        app.players[player.number - 1].action = "strafe moving";
        app.players[player.number - 1].moving = {
          state: true,
          step: 0,
          course: "",
          origin: {
            number: {
              x: player.currentPosition.cell.number.x,
              y: player.currentPosition.cell.number.y,
            },
            center: {
              x: player.currentPosition.cell.center,
              y: player.currentPosition.cell.center,
            },
          },
          destination: voidCenter,
        };
        let nextPosition = app.lineCrementer(player);
        player.nextPosition = nextPosition;
      }
    }

    // console.log('pushStrengthThreshold/Player',pushStrengthThreshold,pushStrengthPlayer);
    pullStrengthPlayer += 15;
    if (pullStrengthPlayer >= pullStrengthThreshold && obstacleCell.obstacle.moving.pushable === true) {
      canPullStrength = true;
      // console.log(
      //   "you are strongh enough to pull app obstacle",
      //   pullStrengthPlayer,
      //   pullStrengthThreshold,
      //   player.crits.guardBreak - 2,
      //   player.crits.pushBack - 2
      // );
    } else {
      console.log(
        "you are NOT strong enough to pull app obstacle",
        pullStrengthPlayer,
        pullStrengthThreshold,
        player.crits.guardBreak - 2,
        player.crits.pushBack - 2,
      );
      resetPull = true;
    }

    if (canPullTargetFree !== true) {
      console.log("something is in the way of the obstacle to be pulled");
      resetPull = true;
    }

    if (canPullStrength === true && canPullTargetFree === true && destCellRef) {
      // console.log('ready to pull',moveSpeed);
      if (!app.players[player.number - 1].popups.find((x) => x.msg === "canPull")) {
        app.players[player.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "canPull",
          img: "",
        });
      }

      if (app.players[player.number - 1].popups.find((x) => x.msg === "prePull")) {
        app.players[player.number - 1].popups.splice(
          app.players[player.number - 1].popups.findIndex((x) => x.msg === "prePull"),
          1,
        );
      }
      if (app.players[player.number - 1].popups.find((x) => x.msg === "noPull")) {
        app.players[player.number - 1].popups.splice(
          app.players[player.number - 1].popups.findIndex((x) => x.msg === "noPull"),
          1,
        );
      }

      let obstacleCrementObj = app.obstacleMoveCrementer(obstacleCell, playerCellRef);

      obstacleCell.obstacle = {
        id: obstacleCell.obstacle.id,
        trap: obstacleCell.obstacle.trap,
        state: obstacleCell.obstacle.state,
        name: obstacleCell.obstacle.name,
        type: obstacleCell.obstacle.type,
        hp: obstacleCell.obstacle.hp,
        destructible: obstacleCell.obstacle.destructible,
        locked: obstacleCell.obstacle.locked,
        weight: obstacleCell.obstacle.weight,
        height: obstacleCell.obstacle.height,
        items: obstacleCell.obstacle.items,
        effects: obstacleCell.obstacle.effects,
        moving: {
          state: true,
          step: obstacleCrementObj.step,
          origin: {
            number: obstacleCell.number,
            center: obstacleCell.center,
          },
          destination: {
            number: playerCellRef.number,
            center: playerCellRef.center,
          },
          currentPosition: obstacleCell.center,
          nextPosition: obstacleCrementObj.pos,
          moveSpeed: moveSpeed,
          pushable: true,
          pushed: true,
          pusher: player.number,
          falling: obstacleCell.obstacle.moving.falling,
        },
      };

      app.players[player.number - 1].prePull = {
        state: false,
        count: 0,
        limit: player.prePull.limit,
        targetCell: undefined,
        direction: impactDirection,
        puller: undefined,
      };
      app.players[player.number - 1].pulling = {
        state: true,
        targetCell: obstacleCell,
        moveSpeed: moveSpeed,
      };
      app.players[player.number - 1].defending = {
        state: false,
        count: 0,
        limit: player.defending.limit,
        animRef: player.defending.animRef,
        peak: false,
        peakCount: 0,
        decay: {
          state: false,
          count: 0,
          limit: app.defendAnimRef.limit[player.currentWeapon.type].slash - app.defendAnimRef.peak[player.currentWeapon.type].slash,
        },
        direction: "",
        directionType: "", //thrust or slash
      };

      app.getTarget(player);

      app.players[player.number - 1].prePull.direction = "";

      if (player.turning.delayCount === 0) {
        app.players[player.number - 1].strafing.direction = impactDirection;
        app.players[player.number - 1].strafing.state = true;
        app.players[player.number - 1].action = "strafe moving";
        app.players[player.number - 1].moving = {
          state: true,
          step: 0,
          course: "",
          origin: {
            number: {
              x: player.currentPosition.cell.number.x,
              y: player.currentPosition.cell.number.y,
            },
            center: {
              x: player.currentPosition.cell.center,
              y: player.currentPosition.cell.center,
            },
          },
          destination: destCellRef.center,
        };
        let nextPosition = app.lineCrementer(player);
        player.nextPosition = nextPosition;
      }
    }
  } else {
    player.stamina.current = 0;
    resetPull = true;
    player.statusDisplay = {
      state: true,
      status: "Out of Stamina",
      count: 1,
      limit: player.statusDisplay.limit,
    };

    if (!player.popups.find((x) => x.msg === "outOfStamina")) {
      player.popups.push({
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
    app.players[player.number - 1].action = "idle";
    app.players[player.number - 1].prePull = {
      state: false,
      count: 0,
      limit: player.prePull.limit,
      targetCell: undefined,
      direction: "",
      puller: undefined,
    };
    app.players[player.number - 1].pulling = {
      state: false,
      targetCell: undefined,
      moveSpeed: 0,
    };

    app.players[player.number - 1].postPull = {
      state: true,
      count: 0,
      limit: player.postPull.limit,
    };

    app.keyPressed[player.number - 1].pull = false;

    if (app.players[player.number - 1].newPushPullDelay.state !== true) {
      app.players[player.number - 1].newPushPullDelay.state = true;
    }

    if (!app.players[player.number - 1].popups.find((x) => x.msg === "noPull")) {
      app.players[player.number - 1].popups.push({
        state: false,
        count: 0,
        limit: 25,
        type: "",
        position: "",
        msg: "noPull",
        img: "",
      });
    }

    if (app.players[player.number - 1].popups.find((x) => x.msg === "prePull")) {
      app.players[player.number - 1].popups.splice(
        app.players[player.number - 1].popups.findIndex((x) => x.msg === "prePull"),
        1,
      );
    }
    if (app.players[player.number - 1].popups.find((x) => x.msg === "canPull")) {
      app.players[player.number - 1].popups.splice(
        app.players[player.number - 1].popups.findIndex((x) => x.msg === "canPull"),
        1,
      );
    }
  }
}
