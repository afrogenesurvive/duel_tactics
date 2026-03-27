export function canPushObstacle(app, ownerType, owner, obstacleCell, type) {
  console.log("canPushObstacle", {
    ownerType,
    owner,
    obstacleCell,
    type,
  });
  // let pusherCellRef = app.gridInfo.find(x=> x.number.x === player.currentPosition.cell.number.x && x.number.y === player.currentPosition.cell.number.y);
  let resetPush = false;
  let thresholdMultiplier = app.rnJesus(1, 3);
  let canPushStrength = false;
  let canPushTargetFree = true;
  let pushStrengthThreshold = (obstacleCell.obstacle.height + obstacleCell.obstacle.weight) * thresholdMultiplier;
  let pushStrengthPlayer = 0;
  let movePlayer = true;
  let impactDirection = "";
  let preMoveSpeed;
  let moveSpeed;
  let staminaCheck;
  let ownerId;
  pushStrengthPlayer += 15;

  const setSpeed = () => {
    preMoveSpeed = Math.ceil(pushStrengthPlayer / pushStrengthThreshold);

    moveSpeed = 0;
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

    if (app.terrainMoveSpeedRef[obstacleCell.terrain.type]) {
      moveSpeed = app.terrainMoveSpeedRef[obstacleCell.terrain.type];
    }
  };
  const setPushStrength = () => {
    if (ownerType === "player") {
      if (owner.hp > 1) {
        pushStrengthPlayer += owner.hp - 1;
      }
      pushStrengthPlayer += owner.crits.pushBack - 3;
      pushStrengthPlayer += owner.crits.guardBreak - 2;
    } else {
      pushStrengthPlayer = 5;
      pushStrengthPlayer += app.rnJesus(1, pushStrengthThreshold);
    }
    setSpeed();
  };

  if (type === "hitPush" || type.split("_")[0] === "hitPushBolt") {
    movePlayer = false;
    pushStrengthPlayer += 1;
    // console.log('obstacle hit push');
  }

  if (type.split("_")[0] === "hitPushBolt") {
    impactDirection = type.split("_")[1];
    // console.log('impactDirection',type.split('_')[1]);
  }
  if (type === "hitPush") {
    if (ownerType === "player") {
      impactDirection = owner.direction;
    } else {
      let myCell = app.gridInfo.find((x) => x[ownerType].state === true && x[ownerType].id === owner.id);
      if (!myCell && owner.trap.state === true) {
        myCell = app.gridInfo.find((x) => x[ownerType].id === owner.id);
      }
      impactDirection = app.getDirectionFromCells(myCell.number, owner.trap.target);
    }
  }
  if (type === "") {
    impactDirection = owner.prePush.direction;
  }

  if (type === "jumpCollision") {
    impactDirection = owner.direction;
    movePlayer = false;
    pushStrengthPlayer += 30;
  }

  if (type.split("_")[0] === "overlap") {
    impactDirection = type.split("_")[1];
    movePlayer = false;
    pushStrengthPlayer += 30;
  }

  let destCell = app.getCellFromDirection(1, obstacleCell.number, impactDirection);
  let destCellRef = app.gridInfo.find((x) => x.number.x === destCell.x && x.number.y === destCell.y);
  let destCellOccupant = "";

  if (ownerType === "player") {
    ownerId = owner.number;
    if (owner.stamina.current - app.staminaCostRef.push >= 0) {
      staminaCheck = true;
    }
    owner.stamina.current = owner.stamina.current - app.staminaCostRef.push;
  } else {
    ownerId = owner.id;
    staminaCheck = true;
  }

  if (staminaCheck === true) {
    setPushStrength();
    // setSpeed();

    obstacleCell.obstacle = app.trapActionCancel(obstacleCell.obstacle);

    if (destCellRef) {
      if (destCellRef.obstacle.state === true) {
        canPushTargetFree = false;
        destCellOccupant = "obstacle";
        resetPush = true;
      }

      if (destCellRef.barrier.state === true) {
        let barrier = false;
        if (destCellRef.barrier.position === app.getOppositeDirection(impactDirection)) {
          barrier = true;
        }

        if (barrier === true) {
          canPushTargetFree = false;
          destCellOccupant = "barrier";
          resetPush = true;
        }
      }

      if (destCellRef.elevation.number > obstacleCell.elevation.number) {
        canPushTargetFree = false;
        destCellOccupant = "higherElevation";
        resetPush = true;
      }

      if (obstacleCell.barrier.state === true) {
        // --------------
        let barrier = false;
        if (obstacleCell.barrier.position === app.getOppositeDirection(impactDirection)) {
          barrier = true;
        }

        if (barrier === true) {
          console.log("barrier in obstacle cell in front of obstacle");
          canPushTargetFree = false;
          destCellOccupant = "barrier";
          resetPush = true;
        }
        // --------------

        if (obstacleCell.barrier.position === impactDirection) {
          console.log("barrier in obstacle cell behind obstacle");
          canPushTargetFree = false;
          destCellOccupant = "barrier";
          resetPush = true;
        }
      }

      for (const plyr of app.players) {
        if (plyr.currentPosition.cell.number.x === destCell.x && plyr.currentPosition.cell.number.y === destCell.y) {
          canPushTargetFree = false;
          resetPush = true;
          destCellOccupant = `player_${plyr.number}`;
        }
      }
    } else {
      if (obstacleCell.barrier.state === true) {
        // --------------
        let barrier = false;
        if (obstacleCell.barrier.position === app.getOppositeDirection(impactDirection)) {
          barrier = true;
        }

        if (barrier === true) {
          console.log("barrier in obstacle cell in front of obstacle2");
          canPushTargetFree = false;
          destCellOccupant = "barrier";
          resetPush = true;
        }
        // --------------

        if (obstacleCell.barrier.position === impactDirection) {
          console.log("barrier in obstacle cell behind obstacle2");
          canPushTargetFree = false;
          destCellOccupant = "barrier";
          resetPush = true;
        }
      }
    }

    let extraPush = 0;
    if (pushStrengthPlayer >= pushStrengthThreshold && obstacleCell.obstacle.moving.pushable === true) {
      canPushStrength = true;
      extraPush = pushStrengthPlayer - pushStrengthThreshold;
      if (ownerType === "player") {
        // console.log(
        //   "you are strongh enough to push app obstacle",
        //   pushStrengthPlayer,
        //   pushStrengthThreshold,
        //   owner.crits.guardBreak - 2,
        //   owner.crits.pushBack - 2,
        //   "extra",
        //   extraPush
        // );
      }
    } else {
      if (ownerType === "player") {
        console.log(
          "you are NOT strong enough to push app obstacle",
          pushStrengthPlayer,
          pushStrengthThreshold,
          owner.crits.guardBreak - 2,
          owner.crits.pushBack - 2,
        );
      }

      resetPush = true;
    }
    if (extraPush > 5) {
      // console.log("extra push force. Push obstacle w/o plyr move");
      movePlayer = false;
    }

    // if(!destCellRef && pushStrengthPlayer >= pushStrengthThreshold ) {
    if (canPushStrength === true && canPushTargetFree === true && !destCellRef) {
      if (ownerType === "player") {
        if (!app.players[owner.number - 1].popups.find((x) => x.msg === "canPush")) {
          app.players[owner.number - 1].popups.push({
            state: false,
            count: 0,
            limit: 25,
            type: "",
            position: "",
            msg: "canPush",
            img: "",
          });
        }

        if (app.players[owner.number - 1].popups.find((x) => x.msg === "prePush")) {
          app.players[owner.number - 1].popups.splice(
            app.players[owner.number - 1].popups.findIndex((x) => x.msg === "prePush"),
            1,
          );
        }
        if (app.players[owner.number - 1].popups.find((x) => x.msg === "noPush")) {
          app.players[owner.number - 1].popups.splice(
            app.players[owner.number - 1].popups.findIndex((x) => x.msg === "noPush"),
            1,
          );
        }
      }

      let voidCenter = app.getVoidCenter(1, impactDirection, obstacleCell.center);

      let obstacleCrementObj = app.obstacleMoveCrementer(obstacleCell, {
        center: voidCenter,
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
            number: {
              x: undefined,
              y: undefined,
            },
            center: voidCenter,
          },
          currentPosition: obstacleCell.center,
          nextPosition: obstacleCrementObj.pos,
          moveSpeed: moveSpeed,
          pushable: true,
          pushed: true,
          pusher: ownerId,
          falling: obstacleCell.obstacle.moving.falling,
        },
      };

      if (ownerType === "player") {
        app.players[owner.number - 1].prePush = {
          state: false,
          count: 0,
          limit: owner.prePush.limit,
          targetCell: undefined,
          direction: "",
          pusher: undefined,
        };

        if (movePlayer === true) {
          app.players[owner.number - 1].pushing = {
            state: true,
            targetCell: obstacleCell,
            moveSpeed: moveSpeed,
          };

          if (owner.turning.delayCount === 0) {
            app.players[owner.number - 1].action = "moving";
            app.players[owner.number - 1].moving = {
              state: true,
              step: 0,
              course: "",
              origin: {
                number: {
                  x: owner.currentPosition.cell.number.x,
                  y: owner.currentPosition.cell.number.y,
                },
                center: {
                  x: owner.currentPosition.cell.center,
                  y: owner.currentPosition.cell.center,
                },
              },
              destination: obstacleCell.center,
            };
            let nextPosition = app.lineCrementer(owner);
            owner.nextPosition = nextPosition;
          }
        }
      }
    }

    if (ownerType === "player") {
      // console.log('pushStrengthThreshold/Player',pushStrengthThreshold,pushStrengthPlayer);
      if (!app.players[owner.number - 1].popups.find((x) => x.msg === "canPush")) {
        app.players[owner.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "canPush",
          img: "",
        });
      }

      if (app.players[owner.number - 1].popups.find((x) => x.msg === "prePush")) {
        app.players[owner.number - 1].popups.splice(
          app.players[owner.number - 1].popups.findIndex((x) => x.msg === "prePush"),
          1,
        );
      }
      if (app.players[owner.number - 1].popups.find((x) => x.msg === "noPush")) {
        app.players[owner.number - 1].popups.splice(
          app.players[owner.number - 1].popups.findIndex((x) => x.msg === "noPush"),
          1,
        );
      }
    }

    if (canPushTargetFree !== true) {
      // console.log('something is in the way of the obstacle to be pushed');
      resetPush = true;
    }

    if (canPushStrength === true && canPushTargetFree === true && destCellRef) {
      // console.log("ready to push");
      if (ownerType === "player") {
        if (!app.players[owner.number - 1].popups.find((x) => x.msg === "canPush")) {
          app.players[owner.number - 1].popups.push({
            state: false,
            count: 0,
            limit: 25,
            type: "",
            position: "",
            msg: "canPush",
            img: "",
          });
        }

        if (app.players[owner.number - 1].popups.find((x) => x.msg === "prePush")) {
          app.players[owner.number - 1].popups.splice(
            app.players[owner.number - 1].popups.findIndex((x) => x.msg === "prePush"),
            1,
          );
        }
        if (app.players[owner.number - 1].popups.find((x) => x.msg === "noPush")) {
          app.players[owner.number - 1].popups.splice(
            app.players[owner.number - 1].popups.findIndex((x) => x.msg === "noPush"),
            1,
          );
        }
      }

      let obstacleCrementObj = app.obstacleMoveCrementer(obstacleCell, destCellRef);

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
            number: destCellRef.number,
            center: destCellRef.center,
          },
          currentPosition: obstacleCell.center,
          nextPosition: obstacleCrementObj.pos,
          moveSpeed: moveSpeed,
          pushable: true,
          pushed: true,
          pusher: ownerId,
          falling: obstacleCell.obstacle.moving.falling,
        },
      };

      if (ownerType === "player") {
        app.players[owner.number - 1].prePush = {
          state: false,
          count: 0,
          limit: owner.prePush.limit,
          targetCell: undefined,
          direction: "",
          pusher: undefined,
        };

        if (movePlayer === true) {
          app.players[owner.number - 1].pushing = {
            state: true,
            targetCell: obstacleCell,
            moveSpeed: moveSpeed,
          };

          if (owner.turning.delayCount === 0) {
            app.players[owner.number - 1].action = "moving";
            app.players[owner.number - 1].moving = {
              state: true,
              step: 0,
              course: "",
              origin: {
                number: {
                  x: owner.currentPosition.cell.number.x,
                  y: owner.currentPosition.cell.number.y,
                },
                center: {
                  x: owner.currentPosition.cell.center,
                  y: owner.currentPosition.cell.center,
                },
              },
              destination: obstacleCell.center,
            };
            let nextPosition = app.lineCrementer(owner);
            owner.nextPosition = nextPosition;
          }
        } else {
          owner.action = "idle";
        }
      }
    }
  } else {
    owner.stamina.current = 0;
    resetPush = true;
    owner.statusDisplay = {
      state: true,
      status: "Out of Stamina",
      count: 1,
      limit: owner.statusDisplay.limit,
    };

    if (!owner.popups.find((x) => x.msg === "outOfStamina")) {
      owner.popups.push({
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
    if (ownerType === "player") {
      app.players[owner.number - 1].prePush = {
        state: false,
        count: 0,
        limit: owner.prePush.limit,
        targetCell: undefined,
        direction: "",
        pusher: undefined,
      };
      app.players[owner.number - 1].pushing = {
        state: false,
        targetCell: undefined,
        moveSpeed: 0,
      };

      if (app.players[owner.number - 1].newPushPullDelay.state !== true) {
        app.players[owner.number - 1].newPushPullDelay.state = true;
      }

      if (!app.players[owner.number - 1].popups.find((x) => x.msg === "noPush")) {
        app.players[owner.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "noPush",
          img: "",
        });
      }

      if (app.players[owner.number - 1].popups.find((x) => x.msg === "prePush")) {
        app.players[owner.number - 1].popups.splice(
          app.players[owner.number - 1].popups.findIndex((x) => x.msg === "prePush"),
          1,
        );
      }
      if (app.players[owner.number - 1].popups.find((x) => x.msg === "noPush")) {
        app.players[owner.number - 1].popups.splice(
          app.players[owner.number - 1].popups.findIndex((x) => x.msg === "canPush"),
          1,
        );
      }
    }

    if (canPushTargetFree !== true && destCellOccupant !== "") {
      let type = destCellOccupant;
      if (type.split("_")[1]) {
        type = "player";
      }
      app.startHalfPushBack("obstacle", type, impactDirection, obstacleCell);
    }
  }

  if (type === "jumpCollision") {
    if (canPushTargetFree === true) {
      return true;
    } else {
      return false;
    }
  }
}
