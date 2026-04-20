export function checkMoveInput(app, player, plyrPullPushed, plyrPullPushedPlyr, breakPulledPushed, keyPressedDirection, nextPosition) {
  const logMove = (message, data = {}, origin) => {
    app.globalLogger("player.movement", message, data, origin || { fn: "checkMoveInput" });
  };
  const logMoveCount = (message, data = {}, origin) => {
    app.globalLogger("player.movement_count", message, data, origin || { fn: "checkMoveInput" });
  };
  const tickDashCooldown = () => {
    if (player.dashing?.postDash?.state !== true) {
      return false;
    }

    player.dashing.postDash.count += 1;
    if (player.dashing.postDash.count >= player.dashing.postDash.limit) {
      player.dashing.postDash.state = false;
      player.dashing.postDash.count = 0;
      player.dashing.cell_1_arrived = false;
      player.dashing.cell_2_arrived = false;
      player.dashing.inputHoldCount = 0;
      player.dashing.originalMoveSpeed = null;
      player.dashing.dashMoveSpeed = null;
      player.dashing.originalMoveDelayLimit = null;
    }

    return true;
  };

  if (tickDashCooldown()) {
    return;
  }
  if (player.dashing?.state === true) {
    return;
  }

  const moveInputActive =
    app.keyPressed[player.number - 1].north === true ||
    app.keyPressed[player.number - 1].south === true ||
    app.keyPressed[player.number - 1].east === true ||
    app.keyPressed[player.number - 1].west === true ||
    app.keyPressed[player.number - 1].northEast === true ||
    app.keyPressed[player.number - 1].northWest === true ||
    app.keyPressed[player.number - 1].southEast === true ||
    app.keyPressed[player.number - 1].southWest === true;

  if (!moveInputActive) {
    if (player.dashing?.inputHoldCount) {
      player.dashing.inputHoldCount = 0;
    }
    return;
  }

  // CONFIRM MOVE KEYPRESS!!
  if (moveInputActive) {
    if (plyrPullPushed === true) {
      breakPulledPushed = true;
    }
    if (player.newMoveDelay.state !== true) {
      // MOVE IF DIRECTION ALIGNS & NOT STRAFING!!
      if (keyPressedDirection === player.direction && player.strafing.state === false) {
        const dashEligible =
          player.moving.state !== true &&
          player.turning.state !== true &&
          player.jumping.state !== true &&
          player.pushing.state !== true &&
          player.pulling.state !== true &&
          player.pushed.state !== true &&
          player.pulled.state !== true;

        if (dashEligible) {
          player.dashing.inputHoldCount += 1;
          if (player.dashing.inputHoldCount >= player.dashing.inputHoldLimit) {
            const target = app.getTarget(player);
            const cell1 = target.cell1;
            const cell2 = target.cell2;
            const dashBlocked =
              !cell1 ||
              !cell2 ||
              target.myCellBlock === true ||
              cell1.void === true ||
              cell2.void === true ||
              cell1.free !== true ||
              cell2.free !== true;

            if (dashBlocked) {
              player.dashing.inputHoldCount = 0;
            } else if (player.stamina.current - app.staminaCostRef.dash >= 0) {
              player.stamina.current -= app.staminaCostRef.dash;
              player.dashing.state = true;
              player.dashing.dashDirection = player.direction;
              player.dashing.origin = {
                number: { ...player.currentPosition.cell.number },
                center: { ...player.currentPosition.cell.center },
              };
              player.dashing.cell_1_arrived = false;
              player.dashing.cell_2_arrived = false;
              player.dashing.postDash.state = false;
              player.dashing.postDash.count = 0;

              if (player.dashing.originalMoveSpeed === null) {
                player.dashing.originalMoveSpeed = player.speed.move;
              }
              if (player.dashing.originalMoveDelayLimit === null) {
                player.dashing.originalMoveDelayLimit = player.newMoveDelay.limit;
              }

              const maxSpeed = player.speed.range_1[player.speed.range_1.length - 1];
              let dashMoveSpeed = maxSpeed;
              if (maxSpeed === player.speed.move) {
                dashMoveSpeed = Math.min(0.9, player.speed.move + 0.25);
              }
              player.dashing.dashMoveSpeed = dashMoveSpeed;
              player.speed.move = dashMoveSpeed;
              player.newMoveDelay.limit = player.dashing.dashMoveDelayLimit;

              player.action = "dashing";
              player.moving = {
                state: true,
                step: 0,
                course: "",
                origin: {
                  number: {
                    x: player.currentPosition.cell.number.x,
                    y: player.currentPosition.cell.number.y,
                  },
                  center: {
                    x: player.currentPosition.cell.center.x,
                    y: player.currentPosition.cell.center.y,
                  },
                },
                destination: target.cell1.center,
              };
              nextPosition = app.lineCrementer(player);
              player.nextPosition = nextPosition;
              player.dashing.inputHoldCount = 0;

              logMove(
                "dashStart",
                {
                  plyr_no: player.number,
                  dash_speed: dashMoveSpeed,
                  stamina: player.stamina.current,
                  dash_cost: app.staminaCostRef.dash,
                },
                { fn: "checkMoveInput" },
              );
              return;
            } else {
              player.stamina.current = 0;
              player.statusDisplay = {
                state: true,
                status: "Out of Stamina",
                count: 0,
                limit: player.statusDisplay.limit,
              };
              player.dashing.inputHoldCount = 0;
              app.globalLogger(
                "player.movement",
                "dashOutOfStamina",
                { plyr_no: player.number },
                { fn: "checkMoveInput" },
              );
            }
          }
        } else if (player.dashing.inputHoldCount !== 0) {
          player.dashing.inputHoldCount = 0;
        }

        let target = app.getTarget(player);

        if (target.cell1.free === true && player.target.cell1.void === false && target.myCellBlock !== true) {
          if (player.dead.state === true && player.dead.count === 0) {
            player.nextPosition = {
              x: -30,
              y: -30,
            };
          } else if (player.turning.delayCount === 0) {
            if (player.stamina.current - app.staminaCostRef.move >= 0) {
              player.stamina.current -= app.staminaCostRef.move;

              player.action = "moving";
              player.moving = {
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
                destination: target.cell1.center,
              };
              nextPosition = app.lineCrementer(player);
              player.nextPosition = nextPosition;

              if (
                app.mouseOverCell.state === true &&
                app.mouseOverCell.cell.number.x === player.currentPosition.cell.number.x &&
                app.mouseOverCell.cell.number.y === player.currentPosition.cell.number.y
              ) {
                app.clicked.player = undefined;
              }

              app.globalLogger(
                "player.movement",
                "start",
                {
                  plyr_no: player.number,
                  plyr_stamina: player.stamina.current,
                  move_cost: app.staminaCostRef.move,
                  move_speed: player.speed.move,
                  time: app.time,
                },
                { fn: "checkMoveInput", line: 59 },
              );
            } else {
              player.stamina.current = 0;
              player.statusDisplay = {
                state: true,
                status: "Out of Stamina",
                count: 0,
                limit: player.statusDisplay.limit,
              };
              app.globalLogger(
                "player.movement",
                "outOfStamina",
                {
                  plyr_no: player.number,
                },
                { fn: "checkMoveInput", line: 74 },
              );
            }
          }
        }

        if (target.cell1.free !== true && target.myCellBlock !== true) {
          if (target.cell1.occupant.type === "obstacle" && player.pushing.state !== true) {
            app.preObstaclePushCheck(player, target);
          }
          if (target.cell1.occupant.type === "player" && player.pushing.state !== true) {
            app.prePlayerPushCheck(player, target);
          }
          if (player.pushing.state === true) {
            // console.log('You are already pushing something');
          }
        }

        if (player.target.cell1.void === true && target.myCellBlock !== true) {
          // console.log('target is VOID!!',target.cell1.center.x,target.cell1.center.y);

          if (player.stamina.current - app.staminaCostRef.move >= 0) {
            player.stamina.current -= app.staminaCostRef.move;

            player.moving = {
              state: true,
              step: 0,
              course: "",
              origin: {
                number: player.currentPosition.cell.number,
                center: player.currentPosition.cell.center,
              },
              destination: target.cell1.center,
            };

            nextPosition = app.lineCrementer(player);
            player.nextPosition = nextPosition;

            if (
              app.mouseOverCell.state === true &&
              app.mouseOverCell.cell.number.x === player.currentPosition.cell.number.x &&
              app.mouseOverCell.cell.number.y === player.currentPosition.cell.number.y
            ) {
              app.clicked.player = undefined;
            }
          } else {
            player.stamina.current = 0;
            player.statusDisplay = {
              state: true,
              status: "Out of Stamina",
              count: 0,
              limit: player.statusDisplay.limit,
            };
          }
        }
      } else if (player.dashing.inputHoldCount !== 0) {
        player.dashing.inputHoldCount = 0;
      }
    }

    // CHANGE DIRECTION IF NOT STRAFING!!
    if (keyPressedDirection !== player.direction && player.strafing.state === false && player.turning.state !== true) {
      // console.log('change player direction to',keyPressedDirection);
      // console.log('player',player.number,player.direction,' turn-start',keyPressedDirection);

      if (player.stamina.current - app.staminaCostRef.turn >= 0) {
        player.stamina.current -= app.staminaCostRef.turn;

        app.globalLogger(
          "player.turning",
          "start",
          {
            plyr_no: player.number,
            from: player.direction,
            to: keyPressedDirection,
            stamina: player.stamina.current,
            cost: app.staminaCostRef.turn,
            time: app.time,
          },
          { fn: "checkMoveInput", line: 141 },
        );
        player.turning.state = true;
        player.turning.toDirection = keyPressedDirection;
      } else {
        player.stamina.current = 0;
        player.statusDisplay = {
          state: true,
          status: "Out of Stamina",
          count: 0,
          limit: player.statusDisplay.limit,
        };
      }
    }

    if (player.newMoveDelay.state !== true) {
      // MOVE WHILE STRAFING!!
      if (keyPressedDirection !== player.direction && player.strafing.state === true) {
        player.strafing.direction = keyPressedDirection;
        let target = app.getTarget(player);

        if (target.cell1.free === true && target.myCellBlock !== true) {
          if (player.stamina.current - app.staminaCostRef.strafe >= 0) {
            player.stamina.current -= app.staminaCostRef.strafe;

            // console.log('start strafing');
            player.action = "strafe moving";
            player.moving = {
              state: true,
              step: 0,
              course: "",
              origin: {
                number: {
                  x: player.currentPosition.cell.number.x,
                  y: player.currentPosition.cell.number.y,
                },
                center: {
                  x: player.currentPosition.cell.center.x,
                  y: player.currentPosition.cell.center.y,
                },
              },
              destination: target.cell1.center,
            };
            nextPosition = app.lineCrementer(player);
            player.nextPosition = nextPosition;

            if (
              app.mouseOverCell.state === true &&
              app.mouseOverCell.cell.number.x === player.currentPosition.cell.number.x &&
              app.mouseOverCell.cell.number.y === player.currentPosition.cell.number.y
            ) {
              app.clicked.player = undefined;
            }
          } else {
            player.stamina.current = 0;
            player.statusDisplay = {
              state: true,
              status: "Out of Stamina",
              count: 0,
              limit: player.statusDisplay.limit,
            };
          }
        }

        if (target.cell1.free === false || target.myCellBlock === true) {
          // console.log('here',player.direction);
        }
      }

      // JUMPING!!
      if (
        keyPressedDirection === player.direction &&
        player.strafing.state === true &&
        player.jumping.checking !== true &&
        player.jumping.state !== true
      ) {
        let alarmedPopup = false;
        app.players[player.number - 1].jumping.checking = true;
        let target = app.getTarget(player);

        let myCell = app.gridInfo.find(
          (elem) => elem.number.x === player.currentPosition.cell.number.x && elem.number.y === player.currentPosition.cell.number.y,
        );
        let cell1 = app.gridInfo.find((elem) => elem.number.x === target.cell1.number.x && elem.number.y === target.cell1.number.y);
        let cell2 = app.gridInfo.find((elem) => elem.number.x === target.cell2.number.x && elem.number.y === target.cell2.number.y);

        let cellsWithinBounds = true;
        if (!cell1 || !cell2) {
          cellsWithinBounds = false;
        } else {
          if (cell1.number.x < 0 || cell1.number.x > app.gridWidth) {
            cellsWithinBounds = false;
          }
          if (cell1.number.y < 0 || cell1.number.y > app.gridWidth) {
            cellsWithinBounds = false;
          }
        }

        if (cellsWithinBounds === true) {
          // CAN ONLY JUMP OVER HAZARDS, DEEP OR VOID
          if (cell1.void.state === true || cell1.terrain.type === "deep" || cell1.terrain.type === "hazard") {
            // CHECK ALL 3 JUMPING CELLS FOR BARRIERS BASED ON POSITION
            let myCellBlocked = false;
            let cell1BarrierNear = false;
            let cell1BarrierFar = false;
            let cell2Barrier = false;
            if (myCell.barrier.state === true && myCell.barrier.position === player.direction) {
              myCellBlocked = true;
            }
            if (cell1.barrier.state === true) {
              if (cell1.barrier.position === player.direction) {
                cell1BarrierFar = true;
              }
              if (cell1.barrier.position === app.getOppositeDirection(player.direction)) {
                cell1BarrierNear = true;
              }
            }
            if (cell2.barrier.state === true) {
              if (cell2.barrier.position === app.getOppositeDirection(player.direction)) {
                cell2Barrier = true;
              }
            }

            if (
              // cell1.obstacle.state !== true &&
              // cell2.obstacle.state !== true &&
              cell1BarrierNear !== true &&
              // cell2Barrier !== true &&
              myCellBlocked !== true
            ) {
              // console.log('no obstacles at jump destination');

              if (cell2.void.state !== true && cell2.terrain.type !== "deep") {
                if (player.stamina.current - app.staminaCostRef.jump >= 0) {
                  // console.log('can jump',player.stamina.current);
                  app.players[player.number - 1].jumping.checking = false;
                  app.players[player.number - 1].jumping.state = true;
                  player.action = "jumping";
                  player.stamina.current = player.stamina.current - app.staminaCostRef.jump;

                  player.moving = {
                    state: true,
                    step: 0,
                    course: "",
                    origin: {
                      number: player.currentPosition.cell.number,
                      center: player.currentPosition.cell.center,
                    },
                    destination: target.cell2.center,
                  };

                  nextPosition = app.lineCrementer(player);
                  // nextPosition = app.jumpCrementer(player);
                  player.nextPosition = nextPosition;

                  // RESET CELL INFO PLAYER
                  if (
                    app.mouseOverCell.state === true &&
                    app.mouseOverCell.cell.number.x === player.currentPosition.cell.number.x &&
                    app.mouseOverCell.cell.number.y === player.currentPosition.cell.number.y
                  ) {
                    app.clicked.player = undefined;
                  }
                } else {
                  // app.getTarget(player);
                  app.players[player.number - 1].jumping.checking = false;
                  player.action = "idle";
                  player.stamina.current = 0;
                  player.statusDisplay = {
                    state: true,
                    status: "Out of Stamina",
                    count: 0,
                    limit: player.statusDisplay.limit,
                  };
                }
              } else {
                // console.log('can only jump over voids or deep water cell 2');
                app.players[player.number - 1].jumping.checking = false;
                alarmedPopup = true;
              }
            } else {
              // console.log('jump obstacle detected');
              app.players[player.number - 1].jumping.checking = false;
              alarmedPopup = true;

              if (cell1.obstacle.state === true) {
                app.globalLogger(
                  "player.jumping",
                  "blockedObstacleCell1",
                  {
                    plyr_no: player.number,
                    cell1: cell1?.number,
                  },
                  { fn: "checkMoveInput", line: 330 },
                );
              }
              // if (cell2.obstacle.state === true) {
              //   console.log("can't jump! obstacle in cell2");
              // }
              if (myCellBlocked === true) {
                app.globalLogger(
                  "player.jumping",
                  "blockedBarrierPlayerCell",
                  {
                    plyr_no: player.number,
                    cell: myCell?.number,
                    barrier: myCell?.barrier?.position,
                  },
                  { fn: "checkMoveInput", line: 338 },
                );
              }
              if (cell1BarrierNear === true) {
                app.globalLogger(
                  "player.jumping",
                  "blockedBarrierCell1",
                  {
                    plyr_no: player.number,
                    cell1: cell1?.number,
                    barrier: cell1?.barrier?.position,
                  },
                  { fn: "checkMoveInput", line: 343 },
                );
              }
              // if (cell2Barrier === true) {
              //   console.log("can't jump! barrier cell 2 blocking");
              // }
            }
          } else {
            // console.log('can only jump over voids, hazards or deep water cell 2');
            app.players[player.number - 1].jumping.checking = false;
            alarmedPopup = true;
          }
        } else {
          // console.log('cell out of bounds');
          app.players[player.number - 1].jumping.checking = false;
          alarmedPopup = true;
          app.globalLogger(
            "player.jumping",
            "jumpingCellDestOutOfBounds",
            {
              plyr_no: player.number,
              cell1: cell1?.number,
              cell2: cell2?.number,
              gridWidth: app.gridWidth,
            },
            { fn: "checkMoveInput", line: 374 },
          );
        }

        if (alarmedPopup === true) {
          if (!app.players[player.number - 1].popups.find((x) => x.msg === "alarmed")) {
            app.players[player.number - 1].popups.push({
              state: false,
              count: 0,
              limit: 30,
              type: "",
              position: "",
              msg: "alarmed",
              img: "",
            });
          }
        }
      }
    }
  }
}
