export function jumpCollisionCheck(app, type, subType, player) {
  // console.log('jumpCollisionCheck',type,subType);

  let jumpComplete = true;
  let cellRef = undefined;
  let otherPlayer = undefined;

  if (subType === "cell1") {
    cellRef = app.gridInfo.find((x) => x.number.x === player.target.cell1.number.x && x.number.y === player.target.cell1.number.y);
  }
  if (subType === "cell2") {
    cellRef = app.gridInfo.find((x) => x.number.x === player.target.cell2.number.x && x.number.y === player.target.cell2.number.y);
  }
  if (type === "player") {
    for (const plyr of app.players) {
      if (plyr.currentPosition.cell.number.x === cellRef.number.x && plyr.currentPosition.cell.number.y === cellRef.number.y) {
        otherPlayer = plyr;
      }
    }
  }

  let obstacle = undefined;
  let barrier = undefined;
  if (type === "barrier" && cellRef.barrier.state === true) {
    barrier = cellRef.barrier;
  }
  if (type === "obstacle" && cellRef.obstacle.state === true) {
    obstacle = cellRef.obstacle;
  }

  let shouldDamageObstacle = (args) => {
    if (args.destructible.state === true) {
      let hp = args.hp - 1;
      let state = true;
      if (hp <= 0) {
        state = false;
      }
      cellRef.obstacle = {
        state: state,
        name: cellRef.obstacle.name,
        type: cellRef.obstacle.type,
        hp: hp,
        destructible: cellRef.obstacle.destructible,
        locked: cellRef.obstacle.locked,
        weight: cellRef.obstacle.weight,
        height: cellRef.obstacle.height,
        items: cellRef.obstacle.items,
        effects: cellRef.obstacle.effects,
        moving: cellRef.obstacle.moving,
      };
    } else {
      if (!app.cellPopups.find((x) => x.msg === "unbreakable" && x.cell.number.x === cellRef.number.x && x.cell.number.y === cellRef.number.y)) {
        app.cellPopups.push({
          state: false,
          count: 0,
          limit: 35,
          type: "",
          position: "",
          msg: "unbreakable",
          color: "",
          img: "",
          cell: app.gridInfo.find((x) => x.number.x === cellRef.number.x && x.number.y === cellRef.number.y),
        });
      }
    }

    if (cellRef.obstacle.hp <= 0) {
      animateDamageDestroy("obstacle", "destroy", cellRef.obstacle);
    } else {
      animateDamageDestroy("obstacle", "damage", cellRef.obstacle);
    }

    return cellRef.obstacle;
  };

  let shouldDamageBarrier = (args) => {
    if (args.destructible.state === true) {
      let hp = args.hp - 1;
      let state = true;
      if (hp <= 0) {
        state = false;
      }
      cellRef.barrier = {
        state: state,
        name: cellRef.barrier.name,
        type: cellRef.barrier.type,
        hp: hp,
        destructible: cellRef.barrier.destructible,
        locked: cellRef.barrier.locked,
        position: cellRef.barrier.position,
        height: cellRef.barrier.height,
      };
    } else {
      if (!app.cellPopups.find((x) => x.msg === "unbreakable" && x.cell.number.x === cellRef.number.x && x.cell.number.y === cellRef.number.y)) {
        app.cellPopups.push({
          state: false,
          count: 0,
          limit: 35,
          type: "",
          position: "",
          msg: "unbreakable",
          color: "",
          img: "",
          cell: app.gridInfo.find((x) => x.number.x === cellRef.number.x && x.number.y === cellRef.number.y),
        });
      }
    }

    if (cellRef.barrier.hp <= 0) {
      animateDamageDestroy("barrier", "destroy", cellRef.barrier);
    } else {
      animateDamageDestroy("barrier", "damage", cellRef.barrier);
    }

    return cellRef.barrier;
  };

  let animateDamageDestroy = (type, action, args) => {
    if (action === "damage") {
      app.obstacleBarrierToDestroy.push({
        type: type,
        action: "damage",
        count: 0,
        limit: 30,
        complete: false,
        cell: cellRef,
      });
      app.players[player.number - 1].statusDisplay = {
        state: true,
        status: "Damaged " + cellRef[type].name + "!",
        count: 1,
        limit: player.statusDisplay.limit,
      };
    }
    if (action === "destroy") {
      app.obstacleBarrierToDestroy.push({
        type: type,
        action: "destroy",
        count: 0,
        limit: 30,
        complete: false,
        cell: cellRef,
      });
      app.players[player.number - 1].statusDisplay = {
        state: true,
        status: "Destroyed " + cellRef[type].name + "!",
        count: 1,
        limit: player.statusDisplay.limit,
      };

      if (!player.popups.find((x) => x.msg === "destroyedItem")) {
        player.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "destroyedItem",
          img: "",
        });
      }

      if (cellRef.obstacle.items[0]) {
        app.obstacleItemDrop(cellRef, player);
      }

      if (cellRef.obstacle.destructible.leaveRubble === true || cellRef.barrier.destructible.leaveRubble === true) {
        if (cellRef.terrain.type !== "void" && cellRef.terrain.type !== "deep") {
          cellRef.rubble = true;
        }
      }
    }
  };

  let interruptJump = () => {
    player.jumping.state = false;
    player.strafing.state = false;
    player.action = "idle";

    jumpComplete = false;

    if (type === "barrier") {
      player.moving = {
        state: false,
        step: 0,
        course: "",
        origin: {
          number: {
            x: player.target.cell1.number.x,
            y: player.target.cell1.number.y,
          },
          center: {
            x: player.target.cell1.center.x,
            y: player.target.cell1.center.y,
          },
        },
        destination: {
          x: 0,
          y: 0,
        },
      };
      player.currentPosition.cell.number = player.target.cell1.number;
      player.currentPosition.cell.center = player.target.cell1.center;

      app.checkDestination(player, false);
    }

    if (type === "obstacle" || type === "player") {
      player.jumping.state = false;
      player.strafing.state = false;
      player.action = "idle";
      player.moving = {
        state: false,
        step: 0,
        course: "",
        origin: {
          number: {
            x: player.target.cell2.number.x,
            y: player.target.cell2.number.y,
          },
          center: {
            x: player.target.cell2.center.x,
            y: player.target.cell2.center.y,
          },
        },
        destination: {
          x: 0,
          y: 0,
        },
      };

      player.currentPosition.cell.number = player.target.cell2.number;
      player.currentPosition.cell.center = player.target.cell2.center;

      app.pushBack(player, app.getOppositeDirection(player.direction));
    }
  };

  let completeJump = () => {
    if (type === "obstacle" || type === "player") {
      app.players[player.number - 1].jumping.checking = false;
      player.jumping.state = false;
      player.currentPosition.cell.number = player.target[subType].number;
      player.currentPosition.cell.center = player.target[subType].center;
      player.strafing.state = false;
      player.action = "idle";
      player.moving = {
        state: false,
        step: 0,
        course: "",
        origin: {
          number: {
            x: player.target.cell2.number.x,
            y: player.target.cell2.number.y,
          },
          center: {
            x: player.target.cell2.center.x,
            y: player.target.cell2.center.y,
          },
        },
        destination: {
          x: 0,
          y: 0,
        },
      };

      app.checkDestination(player, false);
    }

    if (type === "barrier") {
      app.players[player.number - 1].jumping.checking = false;
      app.players[player.number - 1].jumping.state = true;
      player.action = "jumping";
      player.moving = {
        state: true,
        step: player.moving.step,
        course: "",
        origin: {
          // number: player.target.cell1.number,
          // center: player.target.cell1.center,
          number: player.currentPosition.cell.number,
          center: player.currentPosition.cell.center,
        },
        destination: player.target.cell2.center,
      };
      // player.currentPosition.cell.number = player.target.cell2.number;
      // player.currentPosition.cell.center = player.target.cell2.center;

      let nextPosition = app.lineCrementer(player);
      // nextPosition = app.jumpCrementer(player);
      player.nextPosition = nextPosition;
    }
  };

  switch (type) {
    case "barrier":
      barrier = shouldDamageBarrier(barrier);
      // app.handleMiscPlayerDamage(player,"jumpCollision")

      player = app.players[player.number - 1];

      if (player.dead.state === true) {
        // DO NOTHING
      } else {
        if (subType === "cell1") {
          let cell2Ref = app.gridInfo.find((x) => x.number.x === player.target.cell2.number.x && x.number.y === player.target.cell2.number.y);

          if (cell2Ref.barrier.state === true && cell2Ref.barrier.position === app.getOppositeDirection(player.direction)) {
            interruptJump();
          } else {
            if (barrier.hp > 0) {
              interruptJump();
            } else {
              // DO NOTHING, COMPLETE JUMP
              completeJump();
            }
          }
        }
        if (subType === "cell2") {
          if (barrier.hp > 0) {
            interruptJump();
          } else {
            // DO NOTHING, COMPLETE JUMP
            completeJump();
          }
        }
      }

      break;
    case "obstacle":
      obstacle = shouldDamageObstacle(obstacle);
      app.handleMiscPlayerDamage(player, "jumpCollision");

      player = app.players[player.number - 1];
      if (player.dead.state === true) {
        // DO NOTHING
      } else {
        if (obstacle.hp > 0) {
          if (player.hp >= obstacle.hp) {
            let canPush = app.canPushObstacle(player, cellRef, "jumpCollision");

            if (canPush === true) {
              // DO NOTHING, COMPLETE JUMP

              completeJump();
            } else {
              interruptJump();
            }
          } else {
            interruptJump();
          }
        } else {
          completeJump();
          // DO NOTHING, COMPLETE JUMP
        }
      }

      break;
    case "player":
      let damageBoth = false;
      app.handleMiscPlayerDamage(player, "jumpCollision");
      app.handleMiscPlayerDamage(otherPlayer, "jumpCollision");

      player = app.players[player.number - 1];

      otherPlayer = app.players[otherPlayer.number - 1];
      if (player.dead.state !== true) {
        if (otherPlayer.dead.state === true) {
          // COMPLETE JUMP
          completeJump();
        } else {
          if (player.hp > otherPlayer.hp) {
            // COMPLETE JUMP
            app.pushBack(otherPlayer, app.getOppositeDirection(otherPlayer.direction));
            completeJump();
          } else {
            if (app.rnJesus(0, 5) === 0) {
              completeJump();
              app.pushBack(otherPlayer, app.getOppositeDirection(otherPlayer.direction));
            } else {
              interruptJump();
            }
          }
        }
      }

      break;
    default:
  }
}
