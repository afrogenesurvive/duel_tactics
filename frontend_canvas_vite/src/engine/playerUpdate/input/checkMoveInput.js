export function checkMoveInput(app, player, plyrPullPushed, plyrPullPushedPlyr, breakPulledPushed, keyPressedDirection, nextPosition) {
  // CONFIRM MOVE KEYPRESS!!
  if (
    app.keyPressed[player.number - 1].north === true ||
    app.keyPressed[player.number - 1].south === true ||
    app.keyPressed[player.number - 1].east === true ||
    app.keyPressed[player.number - 1].west === true ||
    app.keyPressed[player.number - 1].northEast === true ||
    app.keyPressed[player.number - 1].northWest === true ||
    app.keyPressed[player.number - 1].southEast === true ||
    app.keyPressed[player.number - 1].southWest === true
  ) {
    if (plyrPullPushed === true) {
      breakPulledPushed = true;
    }
    if (player.newMoveDelay.state !== true) {
      // MOVE IF DIRECTION ALIGNS & NOT STRAFING!!
      if (keyPressedDirection === player.direction && player.strafing.state === false) {
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
              // console.log(`Start movment for player ${player.number}. Stamina: current ${player.stamina.current} / cost ${app.staminaCostRef.move} `);
            } else {
              player.stamina.current = 0;
              player.statusDisplay = {
                state: true,
                status: "Out of Stamina",
                count: 0,
                limit: player.statusDisplay.limit,
              };
              console.log(`Player ${player.number} can't move. Out of stamina`);
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
      }
    }

    // CHANGE DIRECTION IF NOT STRAFING!!
    if (keyPressedDirection !== player.direction && player.strafing.state === false && player.turning.state !== true) {
      // console.log('change player direction to',keyPressedDirection);
      // console.log('player',player.number,player.direction,' turn-start',keyPressedDirection);

      if (player.stamina.current - app.staminaCostRef.turn >= 0) {
        player.stamina.current -= app.staminaCostRef.turn;

        // console.log('start turning');
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
        // console.log('cell1',cell1);
        // console.log('cell2',cell2);

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
            // console.log('a');

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
                console.log("can't jump! obstacle in cell1");
              }
              // if (cell2.obstacle.state === true) {
              //   console.log("can't jump! obstacle in cell2");
              // }
              if (myCellBlocked === true) {
                console.log("can't jump! barrier in player cell blocking");
              }
              if (cell1BarrierNear === true) {
                console.log("can't jump! barrier cell 1 blocking");
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
          console.log("cant jump fwd here. Check for can kick");
        }
      }
    }
  }
}
