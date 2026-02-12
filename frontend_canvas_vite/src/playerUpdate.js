import { drawPlayerStep } from "./drawPlayerStep";

export function playerUpdate(
  app,
  player,
  canvas,
  context,
  canvas2,
  context2,
  canvas3,
  context3,
) {
  // console.log('updating player',player.number,app.currentPlayer);

  let keyPressedDirection;
  if (player.ai.state === true && player.dead.state === true) {
  } else {
    for (const [key, value] of Object.entries(app.keyPressed[player.number - 1])) {
      // console.log(`${key}: ${value} ....${player.number}`);

      if (
        key !== "strafe" &&
        key !== "attack" &&
        key !== "defend" &&
        key !== "dodge" &&
        key !== "pull" &&
        key !== "kick" &&
        key !== "cycleWeapon" &&
        key !== "cycleArmor" &&
        key !== "discardWeapon" &&
        key !== "discardArmor" &&
        key !== "uiMenu" &&
        key !== "playerMenu" &&
        key !== "rotateRight" &&
        key !== "rotateLeft" &&
        value === true
      ) {
        // if (player.ai.state === true) {
        //   console.log('ai pressed',key,'plyr',player.number);
        // }
        // console.log('pressed1',key,'plyr',player.number);

        keyPressedDirection = key;
      }
      if (
        key !== "east" &&
        key !== "west" &&
        key !== "east" &&
        key !== "west" &&
        value === true
      ) {
        // console.log('pressed2',key,'plyr',player.number);
      }
    }
  }

  let nextPosition;

  // TESTING
  if (app.time === 10 && player.number === 1) {
    app.toggleCameraCustomView();
    // app.setAutoCamera("test", player);
    // app.setAutoCamera('attackFocus',player);
    // app.setAutoCamera('attackFocusBreak',player);
    // app.setAutoCamera('playerSpawnFocus',player);
    // app.setAutoCamera('aiSpawnFocus',player);
    // app.setAutoCamera('pushbackPan',player);
    // app.setAutoCamera('followBolt',player);
    // console.log(
    //   "xxx",
    //   app.gridInfo.filter((x) => x.obstacle.state === true || x.barrier.state === true && x.).length
    // );
    // app.projectileTester(app.gridInfo.find((x) => x.number.x === 3 && x.number.y === 0));
    // let testTraps = app.customObstacleBarrierTrapSet("activateInactive", "");
    // let testTraps = app.customObstacleBarrierTrapSet("shuffleActive","")
    // let testTraps = app.customObstacleBarrierTrapSet("refreshActive","")
    // let testTraps = app.customObstacleBarrierTrapSet("setNewRandom", "");
    // let testTraps = app.customObstacleBarrierTrapSet(
    //   "setNewCustom",
    //   app.customTrapSetNewCustomTestData
    // );
    // for (const trap of testTraps) {
    //   app.gridInfo.find((x) => x.number.x === trap.location.x && x.number.y === trap.location.y)[trap.type].trap = trap.trap;
    // }
    // player = app.setElasticCounter("test", "start", true, player);
  }
  if (app.time === 100 && player.number === 1) {
    // app.setBackgroundImage("sea_clouds_1");
    // app.testCount.state = true;
    // app.testCount.limit = 10;
    // app.pushBack(player, "east");
    // app.setDeflection(player, "parried", false);
    // let testTraps = app.customObstacleBarrierTrapSet("refreshActive", "");
    let testTraps = app.customObstacleBarrierTrapSet("activateInactive", "");
  }
  if (app.time === 120 && player.number === 1) {
    // app.setDeflection(player, "defended", true);
    // app.setDeflection(player, "attacked", false);
    // app.pushBack(player, app.getOppositeDirection(player.direction));
  }
  // CIRCLE ARC CREMENTER TESTING
  if (app.testCount.state === true && player.number === 1) {
    if (app.testCount.count < app.testCount.limit) {
      app.testCount.count++;

      app.circleArcCrementer(
        "testing",
        player,
        "isometric",
        50,
        180,
        180,
        "arc",
        "counterClockwise",
        "front",
        "east",
      );
    }
    if (app.testCount.count >= app.testCount.limit) {
      app.testCount.state = false;
    }
  }
  // POPUP TESTING
  if (app.time === 100 && player.number === 1) {
    let newArray = [];
    let x = 0;
    let y = 0;
    for (const [key, value] of Object.entries(app.popupImageRef)) {
      newArray.push(key);
    }
    // player.popups.push({
    //   state: false,
    //   count: 0,
    //   limit: 50,
    //   type: "",
    //   position: "",
    //   msg: "hpUp" + "_-5",
    //   img: "",
    //   cell: app.gridInfo.find(
    //     (x) =>
    //       x.number.x === player.currentPosition.cell.number.x &&
    //       x.number.y === player.currentPosition.cell.number.y
    //   ),
    // });
    // for (var i = 0; i < 12; i++) {
    //   if (
    //     !player.popups.find((x) => x.msg === newArray[i])
    //     // player.number === 2 &&
    //     // newArray[i] !== "hpUp" &&
    //     // newArray[i] !== "hpDown"
    //   ) {
    //     if (newArray[i] === "hpUp" || newArray[i] === "hpDown") {
    //       player.popups.push({
    //         state: false,
    //         count: 0,
    //         limit: 50,
    //         type: "",
    //         position: "",
    //         msg: newArray[i] + "_-5",
    //         img: "",
    //         cell: app.gridInfo.find(
    //           (x) =>
    //             x.number.x === player.currentPosition.cell.number.x &&
    //             x.number.y === player.currentPosition.cell.number.y
    //         ),
    //       });
    //     } else {
    //       player.popups.push({
    //         state: false,
    //         count: 0,
    //         limit: 50,
    //         type: "",
    //         position: "",
    //         msg: newArray[i],
    //         img: "",
    //         cell: app.gridInfo.find(
    //           (x) =>
    //             x.number.x === player.currentPosition.cell.number.x &&
    //             x.number.y === player.currentPosition.cell.number.y
    //         ),
    //       });
    //     }
    //   }
    // }
  }

  // DYING
  if (player.dead.state === true) {
    if (player.dead.count > 0 && player.dead.count < player.dead.limit + 1) {
      player.dead.count++;
      // console.log('player',player.number,'dying',player.dead.count);
    } else if (player.dead.count >= player.dead.limit) {
      player.dead.count = 0;
    }
  }
  if (player.dead.state === true && player.dead.count === 0) {
    // console.log('done dying remove from board');
    player.nextPosition = {
      x: -30,
      y: -30,
    };
  }

  // OPEN VOID!!???
  if (app.openVoid === true) {
    if (app.cellToVoid.state !== true) {
      // console.log('set a new cell to void');

      let cell = {
        x: 0,
        y: 0,
      };

      let voidChance = Math.round(1000 / app.gridWidth);
      let openVoid = app.rnJesus(1, voidChance);

      if (openVoid === 1) {
        // console.log('boom');
        cell.x = app.rnJesus(0, app.gridWidth);
        cell.y = app.rnJesus(0, app.gridWidth);

        app.cellToVoid.state = true;
        app.cellToVoid.x = cell.x;
        app.cellToVoid.y = cell.y;
        app.cellToVoid.count = 1;
      }
    } else if (app.cellToVoid.state === true) {
      // console.log('already voiding a cell');
      if (app.cellToVoid.count < app.cellToVoid.limit) {
        app.cellToVoid.count++;
        // console.log('cv',app.cellToVoid.count);
      } else if (app.cellToVoid.count >= app.cellToVoid.limit) {
        // console.log('summon void now',app.cellToVoid.x,app.cellToVoid.y);

        let cell = {
          x: app.cellToVoid.x,
          y: app.cellToVoid.y,
        };

        app.voidSummon(cell);

        app.cellToVoid = {
          state: false,
          x: 0,
          y: 0,
          count: 0,
          limit: app.cellToVoid.limit,
        };

        if (app.voidCustomCell === true) {
          // console.log('void custom cell switch off');
          app.openVoid = false;
          app.voidCustomCell = false;
        }
      }
    }
  }
  // LIMIT CELL VOID EVENT!!
  if (app.voidTimer.count < app.voidTimer.limit) {
    app.voidTimer.count++;
    // console.log('void count',app.voidTimer.count);
  }
  if (app.voidTimer.count >= app.voidTimer.limit) {
    app.openVoid = false;
    // console.log('void off');
  }

  // BLOOD SACRIFICE!!
  if (app.bloodSacrificeEvent.state === true) {
    if (app.bloodSacrificeEvent.count < app.bloodSacrificeEvent.limit) {
      app.bloodSacrificeEvent.count++;
    } else if (app.bloodSacrificeEvent.count >= app.bloodSacrificeEvent.limit) {
      if (app.cellToVoid.state !== true) {
        app.bloodSacrificeEvent.state = false;
        app.openVoid = false;
        console.log("Blood Sacrifice event is now over.");
        if (app.bloodSacrificeEvent.restore === true) {
          for (const cell of app.bloodSacrificeVoidedCells) {
            // console.log('restoring cells after blood Sacrifice',cell);
            if (cell.terrain.name !== "void") {
              cell.void.state = false;
            }
          }

          app.bloodSacrificeVoidedCells = [];
          app.bloodSacrificeEvent.restore = false;
        }
      }
    }
  }

  // STAMINA!!
  if (player.stamina.current < player.stamina.max) {
    player.stamina.current += 0.05;
    player.stamina.current = +(Math.round(player.stamina.current + "e+" + 3) + "e-" + 3);

    if (player.stamina.current >= player.stamina.max) {
      player.stamina.current = player.stamina.max;
    }
    if (player.stamina.current < 0) {
      // console.log('stamina lower limit reset for player ',player.number);
      player.stamina.current = 0;
    }
    if (player.stamina.current === 1) {
      // console.log('OUT OF STAMINA @ player update');
      player.flanking = {
        checking: false,
        preFlankDirection: "",
        direction: "",
        state: false,
        step: 0,
        target1: { x: 0, y: 0 },
        target2: { x: 0, y: 0 },
      };
      player.dodging = {
        countState: false,
        state: false,
        count: 0,
        limit: player.dodging.limit,
        peak: {
          start: player.dodging.peak.start,
          end: player.dodging.peak.end,
        },
        direction: "",
      };

      app.attackedCancel(player);

      if (player.success.deflected.state !== true) {
        app.setDeflection(player, "outOfStamina", false);
      }

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

    // AI RETREAT ON LOW STAMINA
    if (player.stamina.current <= 4) {
      if (player.ai.state === true) {
        console.log("ai player", player.number, " almost out of stamina. Retreat");
        player.ai.mission = "retreat";

        if (!player.popups.find((x) => x.msg === "missionRetreat")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "missionRetreat",
            img: "",
          });
        }
      }
    }
  }

  // CHECK AND SET DEFLECTION!!
  // if (player.success.deflected.state === true && player.success.deflected.count < player.success.deflected.limit && player.success.deflected.predeflect !== true) {
  if (
    player.success.deflected.state === true &&
    player.success.deflected.count < player.success.deflected.limit
  ) {
    player.action = "deflected";
    player.success.deflected.count++;

    if (player.success.deflected.count === 2) {
      // console.log('count',player.success.deflected.count,'limit',player.success.deflected.limit,'type',player.success.deflected.type);

      if (
        player.success.deflected.type === "bluntAttacked" ||
        player.success.deflected.type === "defended"
      ) {
        if (!player.popups.find((x) => x.msg === "guardBroken")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: player.success.deflected.limit,
            type: "",
            position: "",
            msg: "guardBroken",
            img: "",
          });
        }
      }

      if (player.success.deflected.type === "parried") {
        if (!player.popups.find((x) => x.msg === "attackParried")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: player.success.deflected.limit,
            type: "",
            position: "",
            msg: "attackParried",
            img: "",
          });
        }
      }
      if (player.success.deflected.type === "attacked") {
        if (!player.popups.find((x) => x.msg === "injured")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: player.success.deflected.limit,
            type: "",
            position: "",
            msg: "injured",
            img: "",
          });
        }
      }
      if (player.success.deflected.type === "outOfStamina") {
        if (!player.popups.find((x) => x.msg === player.success.deflected.type)) {
          player.popups.push({
            state: false,
            count: 0,
            limit: player.success.deflected.limit,
            type: "",
            position: "",
            msg: player.success.deflected.type,
            img: "",
          });
        }
      }
    }

    // if (player.ai.state === true) {
    //   player.ai.instructions = []
    //   player.ai.currentInstruction = 0
    //   if (player.ai.mission === 'engage') {
    //     player.ai.engaging.targetAction = ''
    //   }
    // }
  }
  //END DEFLECTION, SPIN & DROP
  else if (
    player.success.deflected.state === true &&
    player.success.deflected.count >= player.success.deflected.limit
  ) {
    // console.log('deflect end',player.success.deflected.type);
    // DEFLECT SPIN!
    let shouldSpin;
    if (player.success.deflected.type === "attacked") {
      shouldSpin = app.rnJesus(1, 5);
    }
    if (player.success.deflected.type === "defended") {
      shouldSpin = app.rnJesus(1, 10);
    }

    if (player.success.deflected.type === "outOfStamina") {
      shouldSpin = app.rnJesus(1, 2);
    }
    if (player.success.deflected.type === "parried") {
      shouldSpin = 1;
    }
    let newDirection;
    if (shouldSpin === 1) {
      switch (player.direction) {
        case "north":
          if (shouldSpin === 1) {
            newDirection = "east";
          } else {
            newDirection = "west";
          }
          break;
        case "south":
          if (shouldSpin === 1) {
            newDirection = "east";
          } else {
            newDirection = "west";
          }
          break;
        case "east":
          if (shouldSpin === 1) {
            newDirection = "north";
          } else {
            newDirection = "south";
          }
          break;
        case "west":
          if (shouldSpin === 1) {
            newDirection = "north";
          } else {
            newDirection = "south";
          }
          break;
      }
      player.direction = newDirection;
    }

    player.action = "idle";

    app.unsetDeflection(player);

    // CANCEL AI ATTACK, DEFEND!!
    if (player.ai.state === true) {
      if (player.ai.state === true) {
        player.attacking = {
          state: false,
          count: 0,
          limit: player.attacking.limit,
          strength: 0,
          direction: "",
          directionType: "", //thrust or slash
          animRef: player.attacking.animRef,
          peak: false,
          peakCount: 0,
          charge: 0,
          chargePeak: false,
          blunt: false,
          clashing: {
            state: false,
            count: 0,
            limit: player.attacking.clashing.limit,
          },
        };
      }

      player.defending = {
        state: false,
        count: 0,
        limit: player.defending.limit,
        animRef: player.defending.animRef,
        peak: false,
        peakCount: 0,
        decay: {
          state: false,
          count: 0,
          limit: player.defending.decay.limit,
        },
        direction: "",
        directionType: "", //thrust or slash
      };

      player.ai.targetAqcuiredReset = true;
    }

    if (player.dead.state !== true && player.falling.state !== true) {
      let shouldDeflectDrop = app.rnJesus(1, player.crits.guardBreak);
      if (shouldDeflectDrop === 1) {
        app.deflectDrop(player);
      }
    }
  }

  // CELLS TO HIGHLIGHT V2!!
  for (const cell3 of app.cellsToHighlight2) {
    if (cell3.limit > 0) {
      if (cell3.count < cell3.limit) {
        cell3.count++;
      } else if (cell3.count >= cell3.limit) {
        let index = app.cellsToHighlight2.indexOf(cell3);
        app.cellsToHighlight2.splice(index, 1);
      }
    }
  }

  // MOUSED OVER CELL
  if (
    app.mouseOverCell.cell &&
    app.mouseOverCell.state === false &&
    app.mouseMoving !== true
  ) {
    if (app.mouseOverCell.count < app.mouseOverCell.threshold) {
      app.mouseOverCell.count++;
      // console.log('mouse not moving but moused over cell is counting',app.mouseOverCell.count);
    }
    if (app.mouseOverCell.count >= app.mouseOverCell.threshold) {
      app.mouseOverCell.count = 0;
      app.mouseOverCell.state = true;
      app.clicked.cell = app.mouseOverCell.cell;
      let plyrPresent = false;
      for (const plyr of app.players) {
        if (
          plyr.currentPosition.cell.number.x === app.mouseOverCell.cell.number.x &&
          plyr.currentPosition.cell.number.y === app.mouseOverCell.cell.number.y
        ) {
          app.clicked.player = plyr;
          plyrPresent = true;
        }
      }
      if (plyrPresent !== true) {
        app.clicked.player = undefined;
      }
      app.showCellInfoBox = true;
    }
  }
  // SWITCH OFF ATER TIME IF MOUSE MOVED OUT OF GRID
  if (app.mouseOverCellSwitchOff.state === true) {
    if (app.mouseOverCellSwitchOff.count < app.mouseOverCellSwitchOff.limit) {
      app.mouseOverCellSwitchOff.count++;
    }
    if (app.mouseOverCellSwitchOff.count >= app.mouseOverCellSwitchOff.limit) {
      app.mouseOverCellSwitchOff = {
        state: false,
        count: 0,
        limit: app.mouseOverCellSwitchOff.limit,
      };
      app.showCellInfoBox = false;
      app.mouseOverCell = {
        state: false,
        cell: undefined,
        count: 0,
        threshold: app.mouseOverCell.threshold,
      };
    }
  }
  app.mouseMoving = false;

  // DEFLECTED PLAYER CAN'T DO ANYTHING!!
  if (
    player.success.deflected.state === false &&
    player.dead.state !== true &&
    app.camera.state !== true
  ) {
    // AI STRAFE SWITCH ON!!
    if (player.ai.state === true && app.keyPressed[player.number - 1]) {
      if (app.keyPressed[player.number - 1].strafe === true) {
        app.players[player.number - 1].strafing.state = true;
      }
    }

    // MOVE CANCEL/RETURN
    if (player.moving.state === true) {
      // console.log("player ", player.number, " ", player.action, " : ", player.moving.step);
      let canCancelMove = false;

      if (
        app.keyPressed[player.number - 1].north === true ||
        app.keyPressed[player.number - 1].south === true ||
        app.keyPressed[player.number - 1].east === true ||
        app.keyPressed[player.number - 1].west === true
      ) {
        let oldDirection;
        let newDirection;
        if (app.keyPressed[player.number - 1].north === true) {
          newDirection = "north";
        }
        if (app.keyPressed[player.number - 1].south === true) {
          newDirection = "south";
        }
        if (app.keyPressed[player.number - 1].east === true) {
          newDirection = "east";
        }
        if (app.keyPressed[player.number - 1].west === true) {
          newDirection = "west";
        }
        if (player.strafing.state === true) {
          if (newDirection === app.getOppositeDirection(player.strafing.direction)) {
            canCancelMove = true;
          }
          oldDirection = player.strafing.direction;
        } else {
          if (newDirection === app.getOppositeDirection(player.direction)) {
            canCancelMove = true;
          }
          oldDirection = player.direction;
        }

        if (
          player.drowning === true ||
          player.pushBack.state === true ||
          player.falling.state === true ||
          player.pushing.state === true ||
          player.pulling.state === true ||
          player.pushed.state === true ||
          player.pulled.state === true
        ) {
          canCancelMove = false;
          console.log(
            "cannot cancel move when being pushed back, falling, drowning, pulling, pushing, and being pushed or pulled",
          );
        }

        if (player.moveCancel.state !== true && canCancelMove === true) {
          // console.log("new input direction", newDirection, player.moving.step);
          // player.speed.move = 0.2;
          let inTime = false;
          let inTimeThresh;
          let threshIndx;
          if (player.jumping.state === true) {
            inTimeThresh = 0.4;
          } else {
            let indx3 = player.speed.range.indexOf(player.speed.move);
            threshIndx = Math.ceil(app.moveStepRef[indx3].length / 2);
            // inTimeThresh = app.moveStepRef[indx3][threshIndx];
            inTimeThresh = app.moveStepRef[indx3][threshIndx + 1];
            // console.log("inTimeThresh", inTimeThresh, "step", player.moving.step);
          }
          if (player.moving.step < inTimeThresh) {
            inTime = true;
          }

          if (inTime === true) {
            if (player.stamina.current - app.staminaCostRef.move >= 0) {
              player.stamina.current -= app.staminaCostRef.move;

              app.moveSpeed = player.speed.move;
              if (player.jumping.state === true) {
                player.jumping = {
                  checking: false,
                  state: false,
                };
              }
              if (player.flanking.state === true) {
                player.flanking = {
                  checking: false,
                  preFlankDirection: "",
                  direction: "",
                  state: false,
                  step: 0,
                  target1: { x: 0, y: 0 },
                  target2: { x: 0, y: 0 },
                };
              }
              let originalDest = player.target.cell1;

              player.moveCancel = {
                state: true,
                oldDirection: oldDirection,
                newDirection: newDirection,
                returningTo: {},
                returningFrom: {},
              };

              if (player.strafing.state !== true) {
                player.strafing.state = true;
                player.strafing.direction = newDirection;
              } else {
                if (
                  player.strafing.direction === app.getOppositeDirection(player.direction)
                ) {
                  player.strafing.state = false;
                  player.strafing.direction = "";
                } else {
                  player.strafing.direction = newDirection;
                }
              }

              let newTarget = app.getTarget(player);

              let indx3 = player.speed.range.indexOf(player.speed.move);
              let indx4 = app.moveStepRef[indx3].indexOf(player.moving.step);
              let newIndx = app.moveStepRef[indx3].length - (indx4 + 1);
              let newStep = app.moveStepRef[indx3][newIndx - 1];

              // // move speeds
              // [0.05, 0.1, 0.125, 0.2],
              // // Move speed step indices
              // [
              //   0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8,
              //   0.85, 0.9, 0.95, 1,
              // ],
              // [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
              // [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
              // [0.2, 0.4, 0.6, 0.8, 1],

              player.action = "moving";
              player.moving = {
                state: true,
                step: newStep,
                course: "",
                origin: {
                  number: originalDest.number,
                  center: originalDest.center,
                },
                destination: newTarget.cell1.center,
              };

              nextPosition = app.lineCrementer(player);
              player.nextPosition = nextPosition;
              // console.log(
              //   "can move cancel/ return: starting"
              //   // originalDest.number,
              //   // newTarget.cell1.number,
              // );

              if (
                app.mouseOverCell.state === true &&
                app.mouseOverCell.cell.number.x ===
                  player.currentPosition.cell.number.x &&
                app.mouseOverCell.cell.number.y === player.currentPosition.cell.number.y
              ) {
                app.clicked.player = player;
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
          } else {
            console.log("too late to move cancel. move step is", player.moving.step);
          }
        } else if (player.moveCancel.state === true) {
          // console.log("already move cancelling");
        }
      }
    }
    // DON'T READ INPUTS. JUST MOVE!!
    if (player.moving.state === true) {
      // console.log(
      //   "player ",
      //   player.number,
      //   " ",
      //   player.action,
      //   " : ",
      //   player.moving.step
      // );

      nextPosition = app.lineCrementer(player);
      player.nextPosition = nextPosition;
      if (player.moveCancel.state === true) {
        // console.log(
        //   "move cancel/ returning...",
        //   player.moving.step,
        //   nextPosition,
        //   player.currentPosition.cell.numbers
        // );
      }

      let atDestRanges1 = [false, false, false, false];
      let atDestRanges2 = [false, false, false, false];
      let refCell1 = app.gridInfo.find(
        (x) =>
          x.number.x === player.target.cell1.number.x &&
          x.number.y === player.target.cell1.number.y,
      );
      let refCell2 = app.gridInfo.find(
        (x) =>
          x.number.x === player.target.cell2.number.x &&
          x.number.y === player.target.cell2.number.y,
      );

      if (player.target.cell1.void === true) {
        if (player.falling.state === true) {
          // console.log('...');
        } else {
          player.action = "moving";
          // console.log('stepping into the void',player.action,player.moving.step);
        }
      }

      if (player.jumping.state !== true) {
        let destRngIndx = undefined;

        if (
          nextPosition.x >= player.target.cell1.center.x - 1 &&
          nextPosition.x <= player.target.cell1.center.x + 1 &&
          nextPosition.y >= player.target.cell1.center.y - 1 &&
          nextPosition.y <= player.target.cell1.center.y + 1
        ) {
          atDestRanges1[0] = true;
          destRngIndx = 0;
        }
        if (
          nextPosition.x === player.target.cell1.center.x - 0.25 &&
          nextPosition.y === player.target.cell1.center.y + 0.5
        ) {
          atDestRanges1[1] = true;
          destRngIndx = 1;
        }
        if (
          nextPosition.x === player.target.cell1.center.x &&
          nextPosition.y === player.target.cell1.center.y
        ) {
          atDestRanges1[2] = true;
          destRngIndx = 2;
        }
        if (
          nextPosition.x === player.target.cell1.center.x - 5 &&
          nextPosition.y === player.target.cell1.center.y - 5
        ) {
          atDestRanges1[3] = true;
          destRngIndx = 3;
        }

        // FLANKING POPUP 1
        if (player.flanking.state === true || player.action === "flanking") {
          // console.log('flanking moving');
          if (!player.popups.find((x) => x.msg === "flanking2")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: 20,
              type: "",
              position: "",
              msg: "flanking2",
              img: "",
            });
          }
        }
        if (player.popups.find((x) => x.msg === "dodging")) {
          player.popups.splice(
            player.popups.findIndex((x) => x.msg === "dodging"),
            1,
          );
        }

        for (const el of atDestRanges1) {
          if (el === true) {
            let indx = atDestRanges1.indexOf(el);

            player.newMoveDelay.state = true;

            if (refCell1) {
              player.currentPosition.cell.number = player.target.cell1.number;
              player.currentPosition.cell.center = player.target.cell1.center;
            }

            player.action = "idle";
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

            if (player.strafing.state === true) {
              if (
                player.pulling.state === true ||
                player.pushed.state === true ||
                player.pulled.state === true
              ) {
                // player.strafing.direction = '';
                player.strafeReleaseHook = true;
              }

              // CONTINUOUS STRAFING CHECK
              if (app.keyPressed[player.number - 1].strafe !== true) {
                // console.log("continuous strafe check");
                player.strafing.state = false;
                player.strafing.direction = "";
              } else {
                // console.log("continuous strafe check 2", player.moveCancel.state);
                if (player.moveCancel.state === true) {
                  player.strafing.state = false;
                }
                player.strafing.direction = "";
              }
            }

            // PULLED, PUSHED PLAYERS
            if (player.pushing.state === true) {
              player.pushing = {
                state: false,
                targetCell: undefined,
                moveSpeed: 0,
              };
            }
            if (player.pulling.state === true) {
              player.pulling = {
                state: false,
                targetCell: undefined,
                moveSpeed: 0,
              };
              player.postPull.state = true;
            }
            let deflectPullPushedPlayer = false;
            if (player.pulled.state === true) {
              player.pulled = {
                state: false,
                puller: 0,
                moveSpeed: 0,
              };
              deflectPullPushedPlayer = true;
            }
            if (player.pushed.state === true) {
              player.pushed = {
                state: false,
                pusher: 0,
                moveSpeed: 0,
              };
              deflectPullPushedPlayer = true;
            }
            // PUSHED & PULLED PLAYERS DEFLECT?
            if (
              deflectPullPushedPlayer === true &&
              app.gridInfo.find(
                (x) =>
                  x.number.x === player.currentPosition.cell.number.x &&
                  x.number.y === player.currentPosition.cell.number.y,
              ).terrain.type !== "deep"
            ) {
              // console.log('pulled pushed player at destination. deflect?');

              if (app.rnJesus(1, player.crits.guardBreak) === 1) {
                app.setDeflection(player, "bluntAttacked", false);
              }
            }

            // PUSHBACK MOVEMENT
            if (player.pushBack.state === true) {
              // console.log('player',player.number,'finished moving pushed back',player.flanking.state);

              // CANCEL AI ATTACK, DEFEND!!
              if (player.ai.state === true) {
                if (player.ai.state === true) {
                  player.attacking = {
                    state: false,
                    count: 0,
                    limit: player.attacking.limit,
                    strength: 0,
                    direction: "",
                    directionType: "", //thrust or slash
                    animRef: player.attacking.animRef,
                    peak: false,
                    peakCount: 0,
                    charge: 0,
                    chargePeak: false,
                    blunt: false,
                    clashing: {
                      state: false,
                      count: 0,
                      limit: player.attacking.clashing.limit,
                    },
                  };
                }

                player.defending = {
                  state: false,
                  count: 0,
                  limit: player.defending.limit,
                  animRef: player.defending.animRef,
                  peak: false,
                  peakCount: 0,
                  decay: {
                    state: false,
                    count: 0,
                    limit: player.defending.decay.limit,
                  },
                  direction: "",
                  directionType: "", //thrust or slash
                };

                player.ai.targetAqcuiredReset = true;
              }

              player.pushBack.state = false;
              player.strafing = {
                state: false,
                direction: "",
              };
              player.speed.move = player.pushBack.prePushMoveSpeed;
            }
            if (player.moveCancel.state === true) {
              // console.log("arrived! reset move cancel");
              player.moveCancel.state = false;
            }

            if (!refCell1) {
              player.falling.state = true;
              player.action = "falling";

              app.players[player.number - 1].moving = {
                state: true,
                step: 0,
                course: "",
                origin: {
                  number: player.currentPosition.cell.number,
                  center: player.currentPosition.cell.center,
                },
                destination: {
                  x: player.currentPosition.cell.center.x,
                  y: player.currentPosition.cell.center.y,
                },
              };

              nextPosition = app.lineCrementer(player);
              app.players[player.number - 1].nextPosition = nextPosition;

              if (!player.popups.find((x) => x.msg === "falling")) {
                player.popups.push({
                  state: false,
                  count: 0,
                  limit: 30,
                  type: "",
                  position: "",
                  msg: "falling",
                  img: "",
                });
              }
            } else {
              if (
                player.drowning !== true &&
                player.dead.state !== true &&
                player.pushBack.state !== true
              ) {
                app.getTarget(player);
              }

              app.checkDestination(player, false);

              if (refCell1.obstacle.state === true) {
                app.obstaclePlayerOverlap("player", refCell2, player, refCell1.obstacle);
              }
            }
            break;
          }
        }
      }

      if (player.jumping.state === true) {
        // console.log(
        //   "mid jump",
        //   player.moving.step
        //   // player.currentPosition.cell.number,
        // );

        if (
          nextPosition.x >= player.target.cell1.center.x - 1 &&
          nextPosition.x <= player.target.cell1.center.x + 1 &&
          nextPosition.y >= player.target.cell1.center.y - 1 &&
          nextPosition.y <= player.target.cell1.center.y + 1
        ) {
          atDestRanges1[0] = true;
        }
        if (
          nextPosition.x === player.target.cell1.center.x - 0.25 &&
          nextPosition.y === player.target.cell1.center.y + 0.5
        ) {
          atDestRanges1[1] = true;
        }
        if (
          nextPosition.x === player.target.cell1.center.x &&
          nextPosition.y === player.target.cell1.center.y
        ) {
          atDestRanges1[2] = true;
        }
        if (
          nextPosition.x === player.target.cell1.center.x - 5 &&
          nextPosition.y === player.target.cell1.center.y - 5
        ) {
          atDestRanges1[3] = true;
        }

        for (const el of atDestRanges1) {
          if (el === true) {
            let blocked = false;
            let blockType = "";

            if (refCell2.barrier.state === true) {
              if (
                refCell2.barrier.position === app.getOppositeDirection(player.direction)
              ) {
                blocked = true;
                blockType = "cell2";
              }
            }

            // CHECK 1ST CELL 2ND BECAUSE OF OVERWRITE W/ BARRIERS IN 2 CELLS
            if (refCell1.barrier.state === true) {
              if (refCell1.barrier.position === player.direction) {
                blocked = true;
                blockType = "cell1";
              }
            }

            if (blocked === true) {
              app.jumpCollisionCheck("barrier", blockType, player);

              // console.log('barrier bloackage ',blockType);
            }

            // console.log("@ mid jump cell 1", player.target.cell1.number);
            break;
          }
        }

        if (
          nextPosition.x >= player.target.cell2.center.x - 1 &&
          nextPosition.x <= player.target.cell2.center.x + 1 &&
          nextPosition.y >= player.target.cell2.center.y - 1 &&
          nextPosition.y <= player.target.cell2.center.y + 1
        ) {
          atDestRanges2[0] = true;
        }
        if (
          nextPosition.x === player.target.cell2.center.x - 0.25 &&
          nextPosition.y === player.target.cell2.center.y + 0.5
        ) {
          atDestRanges2[1] = true;
        }
        if (
          nextPosition.x === player.target.cell2.center.x &&
          nextPosition.y === player.target.cell2.center.y
        ) {
          atDestRanges2[2] = true;
        }
        if (
          nextPosition.x === player.target.cell2.center.x - 5 &&
          nextPosition.y === player.target.cell2.center.y - 5
        ) {
          atDestRanges2[3] = true;
        }

        for (const el of atDestRanges2) {
          if (el === true) {
            // console.log("at jump destination", player.target.cell2.number);
            // console.log('next position is destination a',player.number);
            player.newMoveDelay.state = true;

            let blocked = false;
            let blockType = "";
            let blockSubType = "";

            for (const plyr of app.players) {
              if (
                plyr.number !== player.number &&
                plyr.moving.state !== true &&
                plyr.currentPosition.cell.number.x === player.target.cell2.number.x &&
                plyr.currentPosition.cell.number.y === player.target.cell2.number.y
              ) {
                blocked = true;
                blockType = "player";
                blockSubType = "cell2";
              }
            }

            if (refCell2.obstacle.state === true) {
              blocked = true;
              blockType = "obstacle";
              blockSubType = "cell2";
            }

            if (blocked === true) {
              app.jumpCollisionCheck(blockType, blockSubType, player);
            }

            if (blocked !== true) {
              player.jumping.state = false;
              player.currentPosition.cell.number = player.target.cell2.number;
              player.currentPosition.cell.center = player.target.cell2.center;
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

              if (player.pushBack.state !== true) {
                app.getTarget(player);
              }

              if (refCell2.obstacle.state === true) {
                app.obstaclePlayerOverlap("player", refCell2, player, refCell2.obstacle);
              }

              app.checkDestination(player, false);

              // console.log('no blockage. Arrived at jump dest');
            }

            break;
          }
        }
      }
    }

    // CAN READ INPUTS
    else if (player.moving.state === false) {
      // COLLISION/ MOVEMENT OVERLAP PUSHBACK!!
      // if neither is pulling/pushng or pulled/pushed
      for (const plyr4 of app.players) {
        if (
          player.number !== plyr4.number &&
          player.currentPosition.cell.number.x === plyr4.currentPosition.cell.number.x &&
          player.currentPosition.cell.number.y === plyr4.currentPosition.cell.number.y &&
          player.pushBack.state !== true &&
          plyr4.pushBack.state !== true &&
          plyr4.dead.state !== true
        ) {
          let nopushpull = true;
          if (
            player.pulled.state === true ||
            player.pushed.state === true ||
            player.pulling.state === true ||
            player.pushing.state === true ||
            plyr4.pulled.state === true ||
            plyr4.pushed.state === true ||
            plyr4.pulling.state === true ||
            plyr4.pushing.state === true
          ) {
            nopushpull = false;
            // console.log('player cell overlap but 1 is pushing/pulling the other');
          }
          // console.log('buck up btwn plyrs',player.number,plyr4.number,"@",player.currentPosition.cell.number,plyr4.currentPosition.cell.number);
          // console.log('plyrs pushed back?',player.pushBack.state,plyr4.pushBack.state);
          // console.log('plyrs moving?',player.moving.state,plyr4.moving.state);
          if (nopushpull === true) {
            let playerAPushDir2 = app.getOppositeDirection(plyr4.direction);
            let playerBPushDir2 = app.getOppositeDirection(player.direction);

            if (player.flanking.state === true || player.action === "flanking") {
              player.flanking = {
                checking: false,
                direction: "",
                state: false,
                step: 0,
                target1: { x: 0, y: 0 },
                target2: { x: 0, y: 0 },
              };
              player.action = "idle";
            }
            if (plyr4.flanking.state === true || plyr4.action === "flanking") {
              plyr4.flanking = {
                checking: false,
                direction: "",
                state: false,
                step: 0,
                target1: { x: 0, y: 0 },
                target2: { x: 0, y: 0 },
              };
              plyr4.action = "idle";
            }
            // playerAPushDir2 = "north";
            if (playerAPushDir2 === playerBPushDir2) {
              playerBPushDir2 = ["north", "south", "east", "west"].filter(
                (x) => x !== playerAPushDir2,
              )[0];
            }
            let canPush = app.pushBack(plyr4, playerAPushDir2);
            let canPush2 = app.pushBack(player, playerBPushDir2);
          }
        }
      }

      // // IDLE ANIM STEPPER!
      if (player.action === "idle") {
        // player.idleAnim.state = true
        if (player.idleAnim.count < player.idleAnim.limit) {
          // console.log('player.idleAnim.count',player.idleAnim.count);
          player.idleAnim.count++;
        }
        if (player.idleAnim.count >= player.idleAnim.limit) {
          player.idleAnim.count = 0;
          player.idleAnim.state = false;
        }
      } else if (player.action !== "idle") {
        // player.idleAnim.state = false;
        player.idleAnim.count = 0;
      }

      // DIRECTIONAL ATTACK/DEFEND ANIM
      if (player.actionDirectionAnimationArray.length > 0) {
        for (const elem of player.actionDirectionAnimationArray) {
          if (elem.actionDirectionType === "slash") {
            if (elem.delay.state !== true) {
              if (elem.counter.count < elem.counter.limit) {
                elem.counter.count++;
                player = app.circleArcCrementer(
                  "playerDirectionalAction",
                  player,
                  "isometric",
                  elem.radius,
                  elem.angle,
                  elem.startAngle,
                  elem.shape,
                  elem.direction,
                  elem.face,
                  elem,
                );
              }
              if (elem.counter.count >= elem.counter.limit) {
                elem.delay.state = true;
              }
            } else {
              if (elem.delay.count < elem.delay.limit) {
                elem.delay.count++;
              }
              if (elem.delay.count >= elem.delay.limit) {
                let index = player.actionDirectionAnimationArray.findIndex((x) => {
                  return x.id === elem.id;
                });
                player.actionDirectionAnimationArray.splice(index, 1);
              }
            }
          }
          if (elem.actionDirectionType === "thrust") {
            if (elem.delay.state !== true) {
              if (elem.counter.count < elem.counter.limit) {
                elem.counter.count++;
                player = app.directionalActionAnimLineCrementer("player", player, elem);
              }
              if (elem.counter.count >= elem.counter.limit) {
                elem.delay.state = true;
              }
            } else {
              if (elem.delay.count < elem.delay.limit) {
                elem.delay.count++;
              }
              if (elem.delay.count >= elem.delay.limit) {
                let index = player.actionDirectionAnimationArray.findIndex((x) => {
                  return x.id === elem.id;
                });
                player.actionDirectionAnimationArray.splice(index, 1);
              }
            }
          }
        }
      }

      // TURNER!!
      if (player.turning.state === true && player.flanking.state !== true) {
        if (player.turning.delayCount < player.turning.limit) {
          player.turning.delayCount++;
          // console.log('turning...',player.turning.delayCount);
        }
        if (player.turning.delayCount >= player.turning.limit) {
          player.direction = player.turning.toDirection;
          player.turnCheckerDirection = "";
          player.turning = {
            state: false,
            toDirection: "",
            delayCount: 0,
            limit: player.turning.limit,
          };

          app.getTarget(player);
          // console.log('turned/ turn complete');
        }
      }

      // KEY PRESS RELEASE CHECKS!!

      // DEFEND FEINT
      if (
        app.keyPressed[player.number - 1].defend === false &&
        player.defending.state === true
      ) {
        // console.log('player',player.number,' defend key release');
        let canFeint = false;

        let defendType = player.currentWeapon.type;
        if (player.currentWeapon.name === "") {
          defendType = "unarmed";
        }

        if (player.defending.decay.state !== true) {
          if (player.defending.count < player.defending.peakCount) {
            canFeint = true;
          }
        } else {
          if (
            player.defending.decay.count < player.defending.decay.limit &&
            player.defending.peak !== true
          ) {
            canFeint = true;
          }
        }
        if (canFeint === true) {
          let dir = player.defending.direction;
          player.defending = {
            state: false,
            count: 0,
            limit: player.defending.limit,
            animRef: player.defending.animRef,
            peak: false,
            peakCount: 0,
            decay: {
              state: false,
              count: 0,
              limit: player.defending.decay.limit,
            },
            direction: "",
            directionType: "", //thrust or slash
          };
          player.action = "idle";

          player.stamina.current += app.staminaCostRef.defend.pre;

          let popup;
          let popupsToRemove = [
            "defending",
            "noDirection3",
            "northDirection",
            "southDirection",
            "eastDirection",
            "westDirection",
          ];
          for (const pop of popupsToRemove) {
            popup = player.popups.find((x) => x.msg === pop);
            if (popup) {
              player.popups.splice(
                player.popups.findIndex((x) => x.msg === pop),
                1,
              );
            }
          }

          if (player.falling.state !== true && player.moving.state !== true) {
            player.action = "idle";
          }

          // RESET ELASTIC COUNTER
          if (
            player.elasticCounter.state === true &&
            player.elasticCounter.type === "defending"
          ) {
            player.elasticCounter.state = false;
            player.elasticCounter.type = "";
            player.elasticCounter.subType = "";
          }

          if (app.camera.customView.state !== true && player.ai.state !== true) {
            app.setAutoCamera("defendFocusBreak", player);
          }

          player.actionDirectionAnimationArray = [];
          console.log("defend feinted");
        } else {
          if (player.defending.peak === true) {
            console.log("peak defense. cant feint");
          } else {
            // console.log("too late to feint defense");
          }
        }
      }

      // PRE PULL FEINT
      if (
        app.keyPressed[player.number - 1].pull === false &&
        player.prePull.state === true
      ) {
        // console.log("player was pre pulling. reset");
        player.prePull = {
          state: false,
          count: 0,
          limit: player.prePull.limit,
          targetCell: undefined,
          direction: "",
          puller: 0,
        };

        if (player.newPushPullDelay.state !== true) {
          player.newPushPullDelay.state = true;
        }

        if (player.falling.state !== true && player.moving.state !== true) {
          player.action = "idle";
        }
      }

      // ATTACK FEINT
      if (
        app.keyPressed[player.number - 1].attack === false &&
        player.attacking.state === true
      ) {
        let directionalActionResult = app.checkSetAttackDefendDirectionalInput(
          "windup",
          "attacking",
          player,
        );
        player = directionalActionResult.player;
        let chargeType = "normal";
        if (directionalActionResult.charging === true) {
          chargeType = "charged";
        }

        let atkPeak;
        let atkType = player.currentWeapon.type;
        let blunt = "normal";
        if (player.currentWeapon.name === "") {
          atkType = "unarmed";
        }
        if (player.attacking.blunt === true) {
          blunt = "blunt";
        }

        if (player.attacking.count < player.attacking.peakCount) {
          console
            .log
            // "attack windup key release before peak. feinting. refund stamina part"
            ();
          let dir = player.attacking.direction;
          player.action = "idle";
          player.attacking = {
            state: false,
            count: 0,
            limit: player.attacking.limit,
            strength: 0,
            direction: "",
            directionType: "", //thrust or slash
            animRef: player.attacking.animRef,
            peak: false,
            peakCount: 0,
            charge: 0,
            chargePeak: false,
            blunt: false,
            clashing: {
              state: false,
              count: 0,
              limit: player.attacking.clashing.limit,
            },
          };
          player.stamina.current += app.staminaCostRef.attack[atkType][blunt].pre;

          // RESET ELASTIC COUNTER
          if (
            player.elasticCounter.state === true &&
            player.elasticCounter.type === "attacking"
          ) {
            player.elasticCounter.state = false;
            player.elasticCounter.type = "";
            player.elasticCounter.subType = "";
          }

          let popup;
          let popupsToRemove = [
            "attacking",
            "charging",
            "noDirection3",
            "northDirection",
            "southDirection",
            "eastDirection",
            "westDirection",
          ];
          for (const pop of popupsToRemove) {
            popup = player.popups.find((x) => x.msg === pop);
            if (popup) {
              player.popups.splice(
                player.popups.findIndex((x) => x.msg === pop),
                1,
              );
            }
          }

          console.log("attack feinted");

          if (app.camera.customView.state !== true && player.ai.state !== true) {
            app.setAutoCamera("attackFocusBreak", player);
          }

          player.actionDirectionAnimationArray = [];
        } else {
          // console.log("too late to feint attack");
        }
      }

      // DODGE RELEASE/FEINT
      if (
        player.dodging.countState === true &&
        player.dodging.count <= player.dodging.peak.start - player.crits.dodge &&
        app.keyPressed[player.number - 1].dodge !== true &&
        player.flanking.state !== true
      ) {
        // console.log("released dodge key while winding up. cancel dodge.");
        player.stamina.current += app.staminaCostRef.dodge.pre;
        player.action = "idle";
        player.dodging = {
          countState: false,
          state: false,
          count: 0,
          limit: player.dodging.limit,
          peak: {
            start: player.dodging.peak.start,
            end: player.dodging.peak.end,
          },
          direction: "",
        };
        if (
          player.elasticCounter.state === true &&
          player.elasticCounter.type === "dodging"
        ) {
          player.elasticCounter.state = false;
          player.elasticCounter.type = "";
          player.elasticCounter.subType = "";
        }

        if (player.popups.find((x) => x.msg === "dodging")) {
          player.popups.splice(
            player.popups.findIndex((x) => x.msg === "dodging"),
            1,
          );
        }
      }

      // STRAFE RELEASE
      if (player.strafeReleaseHook === true) {
        player.strafing.state = false;
        player.strafeReleaseHook = false;
        app.getTarget(player);
        player.strafing.direction = "";
        // console.log('strafe release hook');
      }

      // CELL BY CELL MOVEMENT DELAY COUNTER!
      if (player.newMoveDelay.state === true) {
        if (player.newMoveDelay.count < player.newMoveDelay.limit) {
          player.newMoveDelay.count++;
          // console.log("newMoveDelay.count", player.newMoveDelay.count);
        }
        if (player.newMoveDelay.count >= player.newMoveDelay.limit) {
          player.newMoveDelay = {
            state: false,
            count: 0,
            limit: player.newMoveDelay.limit,
          };
        }
      }

      // ATTACKING!
      if (player.attacking.state === true) {
        let directionalActionResult = app.checkSetAttackDefendDirectionalInput(
          "windup",
          "attacking",
          player,
        );
        player = directionalActionResult.player;
        if (player.attacking.state === true) {
          let chargeType = "normal";
          if (directionalActionResult.charging === true) {
            chargeType = "charged";
          }

          let attackPeak;
          let stamAtkType = player.currentWeapon.type;

          if (player.currentWeapon.type === "") {
            stamAtkType = "unarmed";
          }

          let blunt = "normal";
          if (player.attacking.blunt === true) {
            blunt = "blunt";
            // console.log("blunt attack");
          }

          if (player.attacking.directionType === "") {
            attackPeak = 0;
          } else {
            attackPeak =
              player.attacking.animRef.peak[stamAtkType][player.attacking.directionType][
                chargeType
              ];
          }

          if (
            player.attacking.peakCount === 0 ||
            player.attacking.count < player.attacking.peakCount
            // chargeType === "charged"
          ) {
            // console.log(
            //   "attacking peakCount changed. was",
            //   player.attacking.peakCount,
            //   "now",
            //   attackPeak
            // );
            player.attacking.peakCount = attackPeak;
          }

          if (
            player.attacking.limit === 0 ||
            player.attacking.count < player.attacking.peakCount
            // chargeType === "charged"
          ) {
            // console.log(
            //   "attacking limit changed. was",
            //   player.attacking.limit,
            //   "now",
            //   player.attacking.animRef.limit[stamAtkType][player.attacking.directionType][
            //     chargeType
            //   ]
            // );
            player.attacking.limit =
              player.attacking.animRef.limit[stamAtkType][player.attacking.directionType][
                chargeType
              ];
          }

          // STEP ATTACKING COUNT
          if (player.attacking.count < player.attacking.limit) {
            if (player.attacking.count < player.attacking.peakCount) {
              // console.log(
              //   "atk windup:",
              //   player.attacking.direction,
              //   "counts:",
              //   player.attacking.count,
              //   player.attacking.peakCount,
              //   player.attacking.limit,
              //   chargeType === "charged"
              // );
              player.attacking.peak = false;
              player.attacking.chargePeak = false;
            }

            player.action = "attacking";
            player.attacking.count++;

            // APPLY BLUNT ATTACK
            if (
              player.dodging.countState === true ||
              player.dodging.state === true ||
              app.keyPressed[player.number - 1].dodge === true
            ) {
              // console.log("was attacking then pressed dodging. blunt attack");

              if (player.attacking.blunt !== true) {
                player.dodging = {
                  countState: false,
                  state: false,
                  count: 0,
                  limit: player.dodging.limit,
                  peak: {
                    start: player.dodging.peak.start,
                    end: player.dodging.peak.end,
                  },
                  direction: "",
                };
                app.keyPressed[player.number - 1].dodge = false;
                player.attacking.blunt = true;

                // RESET DODGE ELASTIC COUNTER
                if (
                  player.elasticCounter.state === true &&
                  player.elasticCounter.type === "dodging"
                ) {
                  player.elasticCounter.state = false;
                  player.elasticCounter.type = "";
                  player.elasticCounter.subType = "";
                }
              }
            }

            // ATTACK START POPUP, GET TARGET, CELLS UNDER ATTACK & AUTO CAM
            if (player.attacking.count <= 2) {
              if (!player.popups.find((x) => x.msg === "attackStart")) {
                player.popups.push({
                  state: false,
                  count: 0,
                  limit: 5,
                  type: "",
                  position: "",
                  msg: "attackStart",
                  img: "",
                });
              }

              app.getTarget(player);

              // CELLS UNDER PRE ATTACK!
              let cellUnderPreAttack1 = app.gridInfo.find(
                (elem) =>
                  elem.number.x === player.target.cell1.number.x &&
                  elem.number.y === player.target.cell1.number.y,
              );
              let cellUnderPreAttack2;
              if (player.currentWeapon.type === "spear") {
                cellUnderPreAttack2 = app.gridInfo.find(
                  (elem) =>
                    elem.number.x === player.target.cell2.number.x &&
                    elem.number.y === player.target.cell2.number.y,
                );
              }
              if (player.currentWeapon.type === "spear") {
                app.cellsUnderPreAttack.push({
                  number: {
                    x: player.target.cell1.number.x,
                    y: player.target.cell1.number.y,
                  },
                  count: 1,
                  limit: 8,
                });
                app.cellsUnderPreAttack.push({
                  number: {
                    x: player.target.cell2.number.x,
                    y: player.target.cell2.number.y,
                  },
                  count: 1,
                  limit: 8,
                });
              }
              if (
                player.currentWeapon.type === "sword" ||
                player.currentWeapon.type === ""
              ) {
                // console.log('sword/unarmed melee target',player.target);

                app.cellsUnderPreAttack.push({
                  number: {
                    x: player.target.cell1.number.x,
                    y: player.target.cell1.number.y,
                  },
                  count: 1,
                  limit: 8,
                });
              }

              // if (player.currentWeapon.type === 'crossbow' && player.attacking.blunt === true) {
              if (player.currentWeapon.type === "crossbow") {
                // console.log('crossbow melee target',player.target);

                app.cellsUnderPreAttack.push({
                  number: {
                    x: player.target.cell1.number.x,
                    y: player.target.cell1.number.y,
                  },
                  count: 1,
                  limit: 8,
                });
              }

              // console.log('app.cellsUnderPreAttack',app.cellsUnderPreAttack[0],app.cellsUnderPreAttack[1]);

              // CAMERA ATTACK FOCUS
              if (
                app.camera.customView.state !== true &&
                app.settingAutoCamera === false &&
                player.ai.state !== true &&
                app.camera.preInstructions.length === 0 &&
                app.camera.instructions.length === 0
              ) {
                if (app.players[0].dead.state !== true) {
                  if (player.number === 1) {
                    app.setAutoCamera("attackFocus", player);
                  }
                } else if (player.number === 2) {
                  app.setAutoCamera("attackFocus", player);
                }
              } else {
                // console.log("no setting auto cam: attackFocus");
              }
            }

            // SHOW ATTACKING POPUP
            if (player.attacking.count > 2) {
              if (!player.popups.find((x) => x.msg === "attacking")) {
                let limit = player.attackinglimit - player.attacking.count;
                if (limit === 0) {
                  limit = 5;
                }
                if (!player.popups.find((x) => x.msg === "attacking")) {
                  player.popups.push({
                    state: false,
                    count: 0,
                    limit: limit,
                    type: "",
                    position: "",
                    msg: "attacking",
                    img: "",
                  });
                }
              }
              // else {
              //   console.log('beep2',player.attacking.animRef.limit[stamAtkType]-player.attacking.count);
              //   player.popups.find(x => x.msg === "attacking").limit = player.attacking.animRef.limit[stamAtkType]-player.attacking.count
              // }
            }
            let dirInputThresh = Math.ceil(
              player.attacking.animRef.peak.unarmed.thrust.normal / 2,
            );
            if (player.attacking.count === dirInputThresh) {
              if (player.elasticCounter.state !== true) {
                player = app.setElasticCounter("attacking", "windup", false, player);
              }
            }
          }

          // SET DIRECTIONAL ATTACK ANIMATIONS
          if (app.showDirectionalActionAnimation === true) {
            let dirAnimSetCalcMod = 5;
            let xTime =
              player.attacking.peakCount +
              dirAnimSetCalcMod -
              directionalActionResult.inputThresh;
            if (directionalActionResult.inputThresh === player.attacking.count) {
              player = app.handleDirectionalActionAnimation(
                "player",
                "attacking",
                "pullback",
                player,
                null,
                // directionalActionResult.inputThresh +
                //   Math.ceil(xTime / 2) -
                //   player.attacking.count,
                Math.ceil(xTime / 2),
                app.directionalAnimShape,
              );
            }

            if (
              player.attacking.count < player.attacking.peakCount &&
              player.attacking.count ===
                directionalActionResult.inputThresh + Math.ceil(xTime / 2)
            ) {
              player.actionDirectionAnimationArray = [];
              player = app.handleDirectionalActionAnimation(
                "player",
                "attacking",
                "release",
                player,
                null,
                // player.attacking.peakCount +
                //   dirAnimSetCalcMod -
                //   (directionalActionResult.inputThresh + Math.ceil(xTime / 2)),
                Math.ceil(xTime / 2),
                app.directionalAnimShape,
              );
            }
          }

          let executeAttack = false;
          if (
            player.elasticCounter.state !== true &&
            player.elasticCounter.type !== "attacking" &&
            player.elasticCounter.subType !== "peak"
          ) {
            if (
              chargeType !== "charged" &&
              player.attacking.charge > 0 &&
              player.attacking.count >
                player.attacking.animRef.peak[stamAtkType][player.attacking.directionType]
                  .normal &&
              player.attacking.count <
                player.attacking.animRef.peak[stamAtkType][player.attacking.directionType]
                  .charged
            ) {
              // console.log(
              //   "not currently charging, but past non charge peak. charge attack released early...adjusting peak"
              // );
              // console.log(
              //   "counts",
              //   player.attacking.count,
              //   player.attacking.animRef.peak[stamAtkType][
              //     player.attacking.directionType
              //   ].normal
              // );
              executeAttack = true;
              attackPeak =
                player.attacking.animRef.peak[stamAtkType][player.attacking.directionType]
                  .normal;
              player.attacking.limit =
                player.attacking.animRef.limit[stamAtkType][
                  player.attacking.directionType
                ].charged;
              player.attacking.peakCount = attackPeak;
            } else if (player.attacking.count === attackPeak) {
              executeAttack = true;
              player.attacking.peakCount = attackPeak;
              // console.log(
              //   "execute ",
              //   chargeType,
              //   " attack at peak normally",
              //   player.attacking.charge,
              //   player.attacking.blunt
              // );
            }
          } else {
            // console.log("attack peak already reached/passed");
          }

          // TIME TO ATTACK IS NOW!
          if (executeAttack === true) {
            // WEAPON STAMINA COST!!
            if (
              player.stamina.current -
                app.staminaCostRef.attack[stamAtkType][blunt].peak >=
              0
            ) {
              player.stamina.current -=
                app.staminaCostRef.attack[stamAtkType][blunt].peak;

              let melee = true;

              // console.log(
              //   "atk peak:",
              //   player.attacking.direction,
              //   "counts:",
              //   player.attacking.count,
              //   player.attacking.peakCount,
              //   player.attacking.limit,
              //   chargeType === "charged",
              //   "blunt:",
              //   player.attacking.blunt
              // );

              player = app.setElasticCounter("attacking", "peak", false, player);

              player.attacking.peak = true;
              if (player.attacking.charge > 0) {
                player.attacking.chargePeak = true;
              }

              // CREATE NEW PROJECTILE
              if (
                player.currentWeapon.type === "crossbow" &&
                player.attacking.blunt !== true &&
                player.items.ammo > 0
              ) {
                // console.log('firing crossbow');
                melee = false;

                let projectileResult = app.projectileCreator("player", player, "bolt");
                player = projectileResult.owner;

                app.projectiles.push(projectileResult.projectile);

                app.getBoltTarget(projectileResult.projectile);
              }
              // NO PROJECTILE AMMO
              if (
                player.currentWeapon.type === "crossbow" &&
                player.attacking.blunt !== true &&
                player.items.ammo <= 0
              ) {
                // console.log('no ammo!');
                app.players[player.number - 1].statusDisplay = {
                  state: true,
                  status: "out of ammo",
                  count: 1,
                  limit: app.players[player.number - 1].statusDisplay.limit,
                };
                player.currentWeapon.effect = "ammo+0";

                if (!player.popups.find((x) => x.msg === "outOfAmmo")) {
                  player.popups.push({
                    state: false,
                    count: 0,
                    limit: 30,
                    type: "",
                    position: "",
                    msg: "outOfAmmo",
                    img: "",
                  });
                }
              }

              if (
                player.currentWeapon.type === "crossbow" &&
                player.attacking.blunt === true
              ) {
                melee = true;
              }

              if (melee === true) {
                app.getTarget(player);
                app.meleeAttackPeak("player", player);
              }
            }

            // OUT OF STAMINA
            else {
              player.attacking.count = attackPeak + 1;
              player.stamina.current = 0;
              player.statusDisplay = {
                state: true,
                status: "Out of Stamina",
                count: 1,
                limit: player.statusDisplay.limit,
              };
            }
          }

          // ATTACK COOLDOWN AND END!
          if (
            executeAttack !== true &&
            player.attacking.count !== 0 &&
            player.attacking.peakCount !== 0 &&
            player.attacking.count > player.attacking.peakCount &&
            player.attacking.count < player.attacking.limit
          ) {
            // console.log(
            //   "atk cooldown:",
            //   player.attacking.direction,
            //   "counts:",
            //   player.attacking.count,
            //   player.attacking.peakCount,
            //   player.attacking.limit,
            //   chargeType === "charged"
            // );
            player.attacking.peak = false;
            player.attacking.chargePeak = false;
            player.attacking.blunt = false;

            // let popup;
            // let popupsToRemove = [
            //   "noDirection3",
            //   "northDirection",
            //   "southDirection",
            //   "eastDirection",
            //   "westDirection",
            // ];
            // for (const pop of popupsToRemove) {
            //   popup = player.popups.find((x) => x.msg === pop);
            //   if (popup) {
            //     player.popups.splice(
            //       player.popups.findIndex((x) => x.msg === pop),
            //       1
            //     );
            //   }
            // }
          }

          if (
            player.attacking.count >= player.attacking.limit &&
            player.attacking.count !== 0
          ) {
            player.attacking = {
              state: false,
              count: 0,
              limit: player.attacking.limit,
              strength: 0,
              direction: "",
              directionType: "", //thrust or slash
              animRef: player.attacking.animRef,
              peak: false,
              peakCount: 0,
              charge: 0,
              chargePeak: false,
              blunt: false,
              clashing: {
                state: false,
                count: 0,
                limit: player.attacking.clashing.limit,
              },
            };
            player.action = "idle";

            // AUTO CAM (ATK FOCUS BREAK)
            if (
              app.camera.customView.state !== true &&
              // app.settingAutoCamera === false &&
              player.ai.state !== true &&
              app.camera.preInstructions.length === 0 &&
              app.camera.instructions.length === 0
            ) {
              app.setAutoCamera("attackFocusBreak", player);
            } else {
              // console.log("no setting auto cam: attackFocusBreak");
            }

            if (player.popups.find((x) => x.msg === "attacking")) {
              player.popups.splice(
                player.popups.findIndex((x) => x.msg === "attacking"),
                1,
              );
            }

            let popup;
            let popupsToRemove = [
              "noDirection3",
              "northDirection",
              "southDirection",
              "eastDirection",
              "westDirection",
            ];
            for (const pop of popupsToRemove) {
              popup = player.popups.find((x) => x.msg === pop);
              if (popup) {
                player.popups.splice(
                  player.popups.findIndex((x) => x.msg === pop),
                  1,
                );
              }
            }
            player.actionDirectionAnimationArray = [];

            console.log("attack end");
          }
        } else {
          console.log("no longer attacking. probably feinted");
        }
      }
      // CLASHING
      if (player.attacking.clashing.state === true) {
        if (!player.popups.find((x) => x.msg === "clashing")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: player.attacking.clashing.limit,
            type: "",
            position: "",
            msg: "clashing",
            img: "",
          });
        }
        if (player.attacking.clashing.count < player.attacking.clashing.limit) {
          player.attacking.clashing.count++;
        }
        if (player.attacking.clashing.count >= player.attacking.clashing.limit) {
          player.attacking.clashing = {
            state: false,
            count: 0,
            limit: 10,
          };
        }
      }

      // DEFENDING!!
      if (player.defending.state === true) {
        let directionalActionResult = app.checkSetAttackDefendDirectionalInput(
          "windup",
          "defending",
          player,
        );
        player = directionalActionResult.player;

        let defendDecayLimitPercentage = 0.55; // calc & increase this based on defend stats

        let defendType = player.currentWeapon.type;
        if (player.currentWeapon.name === "") {
          defendType = "unarmed";
        }

        let defendPeak =
          player.defending.animRef.peak[defendType][player.defending.directionType];

        let defenseValueDecreased = false;
        if (
          player.defending.decay.state !== true &&
          defendPeak !== player.defending.peakCount
        ) {
          if (defendPeak > player.defending.peakCount) {
            defenseValueDecreased = true;
          }
          // console.log(
          //   "defend peak changed from",
          //   player.defending.peakCount,
          //   "to",
          //   defendPeak
          // );
          player.defending.peakCount = defendPeak;
        }

        let limit =
          player.defending.animRef.limit[defendType][player.defending.directionType];
        if (player.defending.decay.state !== true && limit !== player.defending.limit) {
          // console.log("defend limit changed from", player.defending.limit, "to", limit);
          player.defending.limit = limit;
        }

        // WINDUP
        if (
          player.defending.count < defendPeak &&
          player.defending.decay.state !== true
        ) {
          player.defending.count++;
          player.action = "defending";
          player.defending.peak = false;
          // console.log(
          //   "defend windup:",
          //   player.defending.direction,
          //   "counts",
          //   player.defending.count,
          //   defendPeak,
          //   player.defending.limit
          // );
          if (!player.popups.find((x) => x.msg === "defending")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: player.defending.limit,
              type: "",
              position: "",
              msg: "defending",
              img: "",
            });
          }

          if (player.defending.count <= 2) {
            // CAMERA DEFEND FOCUS
            if (
              app.camera.customView.state !== true &&
              app.settingAutoCamera === false &&
              player.ai.state !== true &&
              app.camera.preInstructions.length === 0 &&
              app.camera.instructions.length === 0
            ) {
              if (app.players[0].dead.state !== true) {
                if (player.number === 1) {
                  app.setAutoCamera("defendFocus", player);
                }
              } else if (player.number === 2) {
                app.setAutoCamera("defendFocus", player);
              }
            } else {
              // console.log("no setting auto cam: defendFocus");
            }
          }
        }

        if (
          defenseValueDecreased === true &&
          player.defending.count > player.defending.peakCount
        ) {
          // console.log(
          //   "defend was directional now non directional & pask peak. Execute defend"
          // );
          player.defending.peakCount = player.defending.count;
        }

        // SET DIRECTIONAL DEFEND ANIMATIONS
        if (app.showDirectionalActionAnimation === true) {
          let dirAnimSetCalcMod = 5;
          const decayLimit = Math.ceil(
            (player.defending.limit - defendPeak) * defendDecayLimitPercentage,
          );
          let xTime =
            player.defending.peakCount +
            decayLimit +
            dirAnimSetCalcMod -
            player.defending.count;
          let existingDefendAnim = player.actionDirectionAnimationArray.find(
            (x) => x.action === "defending",
          );
          // if (player.defending.count === directionalActionResult.inputThresh) {
          if (!existingDefendAnim) {
            player = app.handleDirectionalActionAnimation(
              "player",
              "defending",
              "release",
              player,
              null,
              xTime,
              app.directionalAnimShape,
            );
          }
          if (directionalActionResult.directionChanged === true) {
            player.actionDirectionAnimationArray = [];
            let yTime;
            if (player.defending.decay.state !== true) {
              yTime = player.defending.peakCount + decayLimit - player.defending.count;
            } else {
              yTime =
                player.defending.decay.limit +
                dirAnimSetCalcMod -
                player.defending.decay.count;
            }
            player = app.handleDirectionalActionAnimation(
              "player",
              "defending",
              "release",
              player,
              null,
              yTime,
              app.directionalAnimShape,
            );
          }
        }

        let executeDefend = false;
        if (
          player.elasticCounter.subType !== "windup" &&
          player.defending.count === player.defending.peakCount &&
          player.defending.decay.state !== true
        ) {
          executeDefend = true;
        }

        // PEAK, START DECAY
        if (executeDefend === true) {
          if (player.stamina.current - app.staminaCostRef.defend.peak >= 0) {
            player.action = "defending";
            player.defending.peak = true;
            player.defending.count++;
            player.defending.decay.state = true;
            player.defending.decay.count = 0;
            player.defending.decay.limit = Math.ceil(
              (player.defending.limit - defendPeak) * defendDecayLimitPercentage,
            );
            player.stamina.current =
              player.stamina.current - app.staminaCostRef.defend.peak;

            if (!player.popups.find((x) => x.msg === "defending")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: player.defending.limit,
                type: "",
                position: "",
                msg: "defending",
                img: "",
              });
            }

            player = app.setElasticCounter("defending", "peak", false, player);
            // console.log(
            //   "defend peak:",
            //   player.defending.direction,
            //   "counts",
            //   player.defending.count,
            //   defendPeak,
            //   player.defending.limit,
            //   "decay:",
            //   player.defending.decay.state,
            //   player.defending.decay.count,
            //   player.defending.decay.limit
            // );
          }
          // OUT OF STAMINA
          else {
            console.log("not enough stamina for peak defend. reset stamina");
            player.action = "idle";
            player.defending = {
              state: false,
              count: 0,
              limit: player.defending.limit,
              animRef: player.defending.animRef,
              peak: false,
              peakCount: 0,
              decay: {
                state: false,
                count: 0,
                limit: player.defending.decay.limit,
              },
              direction: "",
              directionType: "", //thrust or slash
            };
            player.stamina.current = 0;
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
                limit: 10,
                type: "",
                position: "",
                msg: "outOfStamina",
                img: "",
              });
            }
          }
        }

        // DECAY!!
        if (player.defending.decay.state === true) {
          if (player.defending.decay.count < player.defending.decay.limit) {
            player.action = "defending";
            player.defending.decay.count++;
            if (player.defending.decay.count >= app.defendPeakAllowance) {
              player.defending.peak = false;
              // console.log(
              //   "peak defend over: count",
              //   player.defending.count,
              //   defendPeak,
              //   player.defending.decay.state
              // );
            }

            if (!player.popups.find((x) => x.msg === "defending")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: player.defending.decay.limit,
                type: "",
                position: "",
                msg: "defending",
                img: "",
              });
            }
            player = app.setElasticCounter("defending", "decay", false, player);
            // console.log(
            //   "defend decay:",
            //   player.defending.direction,
            //   "counts",
            //   player.defending.count,
            //   defendPeak,
            //   player.defending.limit,
            //   "decay:",
            //   player.defending.decay.state,
            //   player.defending.decay.count,
            //   player.defending.decay.limit
            // );
          }

          if (player.defending.decay.count >= player.defending.decay.limit) {
            player.defending.decay.state = false;
            player.defending.decay.count = 0;
            player.defending.count = defendPeak + player.defending.decay.limit;
            // console.log(
            //   "defend decay end:",
            //   player.defending.direction,
            //   "counts",
            //   player.defending.count,
            //   defendPeak,
            //   player.defending.limit
            // );
          }
        }

        // DEFEND COOLDOWN
        if (
          player.defending.decay.state !== true &&
          player.defending.count > defendPeak
        ) {
          if (player.defending.count < player.defending.limit) {
            // let popup;
            // let popupsToRemove = [
            //   "noDirection3",
            //   "northDirection",
            //   "southDirection",
            //   "eastDirection",
            //   "westDirection",
            // ];
            // for (const pop of popupsToRemove) {
            //   popup = player.popups.find((x) => x.msg === pop);
            //   if (popup) {
            //     player.popups.splice(
            //       player.popups.findIndex((x) => x.msg === pop),
            //       1
            //     );
            //   }
            // }
            player.defending.count++;
            // console.log(
            //   "defend cooldown:",
            //   player.defending.direction,
            //   "counts",
            //   player.defending.count,
            //   defendPeak,
            //   player.defending.limit
            // );
          }
          if (player.defending.count >= player.defending.limit) {
            player.action = "idle";
            player.defending = {
              state: false,
              count: 0,
              limit: player.defending.limit,
              animRef: player.defending.animRef,
              peak: false,
              peakCount: 0,
              decay: {
                state: false,
                count: 0,
                limit: player.defending.decay.limit,
              },
              direction: "",
              directionType: "", //thrust or slash
            };

            let popup;
            let popupsToRemove = [
              "defending",
              "noDirection3",
              "northDirection",
              "southDirection",
              "eastDirection",
              "westDirection",
            ];
            for (const pop of popupsToRemove) {
              popup = player.popups.find((x) => x.msg === pop);
              if (popup) {
                player.popups.splice(
                  player.popups.findIndex((x) => x.msg === pop),
                  1,
                );
              }
            }

            // AUTO CAM (DEF FOCUS BREAK)
            if (
              app.camera.customView.state !== true &&
              // app.settingAutoCamera === false &&
              player.ai.state !== true &&
              app.camera.preInstructions.length === 0 &&
              app.camera.instructions.length === 0
            ) {
              app.setAutoCamera("defendFocusBreak", player);
            } else {
              // console.log("no setting auto cam: defendFocusBreak");
            }
            // RESET ELASTIC COUNTER
            if (
              player.elasticCounter.state === true &&
              player.elasticCounter.type === "defending"
            ) {
              player.elasticCounter.state = false;
              player.elasticCounter.type = "";
              player.elasticCounter.subType = "";
            }
            player.actionDirectionAnimationArray = [];
            console.log("defend end");
          }
        }
      }

      // PUSHING/PULLING
      // NEW PUSH/PULL DELAY AFTER LAST ATTEMPT
      if (player.newPushPullDelay.state === true) {
        if (player.newPushPullDelay.count < player.newPushPullDelay.limit) {
          player.newPushPullDelay.count++;
          // console.log('new push pull delay');
        }
        if (player.newPushPullDelay.count >= player.newPushPullDelay.limit) {
          player.newPushPullDelay.state = false;
          player.newPushPullDelay.count = 0;
        }
      }
      // PUSH KEY RELEASE
      if (
        player.prePush.state === true &&
        app.keyPressed[player.number - 1][player.prePush.direction] !== true
      ) {
        // console.log('mid prePush but key released. reset prePush');
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

      // PULL CHECK
      if (player.postPull.state === true) {
        if (player.postPull.count < player.postPull.limit) {
          player.postPull.count++;
          // console.log('post pull count',player.postPull.count);
        }
        if (player.postPull.count >= player.postPull.limit) {
          // console.log('post pull limit');
          player.postPull = {
            state: false,
            count: 0,
            limit: player.postPull.limit,
          };
        }
      }

      // // DODGE STEPPER!
      let dodgeCondition = false;
      if (player.crits.dodge > 4) {
        player.crits.dodge = 4;
      }
      if (
        player.dodging.countState === true &&
        player.dodging.count <= player.dodging.peak.start - player.crits.dodge &&
        app.keyPressed[player.number - 1].dodge === true
      ) {
        dodgeCondition = true;
      }
      if (
        player.dodging.countState === true &&
        player.dodging.count > player.dodging.peak.start - player.crits.dodge
      ) {
        dodgeCondition = true;
      }
      if (dodgeCondition === true && player.flanking.state !== true) {
        let startMod = player.crits.dodge;
        let endMod = player.crits.dodge;
        if (player.crits.dodge > 5) {
          player.crits.dodge = 5;
        }
        // START & ENDMODS CAN'T MAKE DODGE WIND UP & COOLDOWN < 2
        if (player.dodging.peak.start - startMod < 2) {
          startMod = player.dodging.peak.start - 2;
        }
        if (player.dodging.peak.end + endMod > player.dodging.limit - 2) {
          endMod = player.dodging.limit - (2 + player.dodging.peak.end);
        }

        // HAVE STAMIN FOR DODGE
        if (player.dodging.count === 0) {
          if (player.stamina.current - app.staminaCostRef.dodge.peak >= 0) {
            player.stamina.current =
              player.stamina.current - app.staminaCostRef.dodge.peak;
            player.dodging.count++;
            player.action = "dodging";

            // CHOOSE DODGE DIRECTION
            let whichDirection = app.rnJesus(1, 2);
            switch (player.direction) {
              case "north":
                if (whichDirection === 1) {
                  player.dodging.direction = "east";
                } else {
                  player.dodging.direction = "west";
                }
                break;
              case "south":
                if (whichDirection === 1) {
                  player.dodging.direction = "east";
                } else {
                  player.dodging.direction = "west";
                }
                break;
              case "east":
                if (whichDirection === 1) {
                  player.dodging.direction = "north";
                } else {
                  player.dodging.direction = "south";
                }
                break;
              case "west":
                if (whichDirection === 1) {
                  player.dodging.direction = "north";
                } else {
                  player.dodging.direction = "south";
                }
                break;
            }

            if (!player.popups.find((x) => x.msg === "dodgeStart")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 5,
                type: "",
                position: "",
                msg: "dodgeStart",
                img: "",
              });
            }

            player = app.setElasticCounter("dodging", "", true, player);
          } else {
            player.stamina.current = 0;
            player.dodging = {
              countState: false,
              state: false,
              count: 0,
              limit: player.dodging.limit,
              peak: {
                start: player.dodging.peak.start,
                end: player.dodging.peak.end,
              },
              direction: "",
            };
            player.action = "idle";
            player.statusDisplay = {
              state: true,
              status: "Out of Stamina",
              count: 1,
              limit: player.statusDisplay.limit,
            };
          }
        }
        if (player.dodging.count >= 1 && player.dodging.count < player.dodging.limit) {
          player.dodging.count++;
          player.action = "dodging";
          // console.log("dodge count", player.dodging.count);

          if (!player.popups.find((x) => x.msg === "dodging")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: player.dodging.limit,
              type: "",
              position: "",
              msg: "dodging",
              img: "",
            });
          }
        }
        // PEAK START
        if (player.dodging.count === player.dodging.peak.start - startMod) {
          // console.log("dodge count", player.dodging.count);
          // player.popups.push(
          //   {
          //     state: false,
          //     count: 0,
          //     limit: (player.dodging.peak.end + endMod)-(player.dodging.peak.start + startMod),
          //     type: '',
          //     position: '',
          //     msg: 'dodgeSuccess',
          //     img: '',
          //
          //   }
          // )
        }

        // PEAK DURATION
        if (
          player.dodging.count > player.dodging.peak.start - startMod &&
          player.dodging.count < player.dodging.peak.end + endMod
        ) {
          player.dodging.state = true;

          // console.log("dodge peak", player.dodging.count);
        }

        // IF DODGE IS BEFORE OR AFTER PEAK, STATE OFF
        if (
          player.dodging.count < player.dodging.peak.start - startMod ||
          player.dodging.count > player.dodging.peak.end + endMod
        ) {
          player.dodging.state = false;
          player.dodging.direction = "";
          // console.log('dodge peak off');
        }
        if (player.dodging.count >= player.dodging.limit) {
          player.action = "idle";
          player.dodging = {
            countState: false,
            state: false,
            count: 0,
            limit: player.dodging.limit,
            peak: {
              start: player.dodging.peak.start,
              end: player.dodging.peak.end,
            },
            direction: "",
          };
        }
      }

      // RESET MOVE SPEED POST PUSHBACK
      if (player.pushBack.state !== true && player.pushBack.prePushBackMoveSpeed !== 0) {
        player.speed.move = player.player.pushBack.prePushBackMoveSpeed;
        player.player.pushBack.prePushBackMoveSpeed = 0;
      }

      // COMPLETE PUSHBACK DEFLECT FLOW!
      if (
        player.pushBack.state === false &&
        player.success.deflected.predeflect === true &&
        player.moving.state === false
      ) {
        // console.log('predefelct --> pushback ---> deflect');

        app.setDeflection(player, player.success.deflected.type, false);
      }

      // CONTINUE, COMPLETE PLAYER HALF PUSHBACK
      if (player.halfPushBack.state === true) {
        if (player.halfPushBack.countUp.state === true) {
          player.action = "deflected";

          if (player.halfPushBack.countUp.count < player.halfPushBack.countUp.limit) {
            if (player.halfPushBack.countUp.count === 1) {
              // console.log('player 1/2 pushback start');
            }

            player.halfPushBack.countUp.count++;
            // console.log('player 1/2 pushback count up',player.halfPushBack.countUp.count);
          }

          if (player.halfPushBack.countUp.count >= player.halfPushBack.countUp.limit) {
            player.halfPushBack.countUp = {
              state: false,
              count: 0,
              limit: player.halfPushBack.countUp.limit,
            };
            // console.log('player 1/2 pushback peak');
            // app.handleHalfPushBackResult('player',player);
            player.halfPushBack.countDown.state = true;
          }
        }

        if (player.halfPushBack.countDown.state === true) {
          if (player.halfPushBack.countDown.count < player.halfPushBack.countDown.limit) {
            player.halfPushBack.countDown.count++;
            // console.log('player 1/2 pushback count down',player.halfPushBack.countDown.count);
          }

          if (
            player.halfPushBack.countDown.count >= player.halfPushBack.countDown.limit
          ) {
            player.halfPushBack.countDown = {
              state: false,
              count: 0,
              limit: player.halfPushBack.countDown.limit,
            };

            // console.log('player 1/2 pushback end');
            app.handleHalfPushBackResult("player", player);
            player.halfPushBack.state = false;
            player.action = "idle";
          }
        }
      }

      // ELASTIC COUNTER
      if (
        player.elasticCounter.state === true &&
        player.elasticCounter.type !== "deflected"
      ) {
        // player.action = player.elasticCounter.type;

        // IF PAUSE IS START, COUNT PAUSE 1ST
        if (
          player.elasticCounter.pause.preState === true &&
          player.elasticCounter.pause.type === "start"
        ) {
          player.elasticCounter.pause.preState = false;
          player.elasticCounter.pause.state = true;
          // console.log("start pause, turn on pause");
        }

        // IF PAUSE IS NOT START, COUNT UP
        if (
          player.elasticCounter.pause.type !== "start" &&
          player.elasticCounter.countUp.state !== true &&
          player.elasticCounter.countDown.state !== true &&
          player.elasticCounter.pause.state !== true
        ) {
          player.elasticCounter.countUp.state = true;
          // console.log("pause is not start. count up");
        }

        // COUNT UP
        if (player.elasticCounter.countUp.state === true) {
          if (player.elasticCounter.countUp.count < player.elasticCounter.countUp.limit) {
            if (player.elasticCounter.countUp.count === 0) {
              // console.log("elastic count up start");
            }

            player.elasticCounter.countUp.count++;
            // console.log("elastic counting up: ", player.elasticCounter.countUp.count);
          }

          // FINISH COUNT UP
          if (
            player.elasticCounter.countUp.count >= player.elasticCounter.countUp.limit
          ) {
            // RESET COUNT UP
            player.elasticCounter.countUp = {
              state: false,
              count: 0,
              limit: player.elasticCounter.countUp.limit,
            };
            // console.log("finished count up. elastic counter peak");

            // IF PAUSE IS PEAK, COUNT PAUSE AT PEAK
            if (
              player.elasticCounter.pause.preState === true &&
              player.elasticCounter.pause.type === "peak"
            ) {
              player.elasticCounter.pause.preState = false;
              player.elasticCounter.pause.state = true;
              // console.log("peak pause. turn on pause");
            }

            // IF PAUSE IS NOT PEAK, COUNT DOWM
            if (player.elasticCounter.pause.type !== "peak") {
              player.elasticCounter.countDown.state = true;
              // console.log("pause is not peak. count down");
            }
          }
        }

        // COUNT PAUSE
        if (player.elasticCounter.pause.state === true) {
          // console.log('pause count. type: ',player.elasticCounter.pause.type);

          // COUNT PAUSE
          if (player.elasticCounter.pause.count < player.elasticCounter.pause.limit) {
            if (player.elasticCounter.pause.count === 0) {
              // console.log("pause count start");
            }

            player.elasticCounter.pause.count++;
            // console.log("pause counting: ", player.elasticCounter.pause.count);
          }

          // FINISH PAUSE
          if (player.elasticCounter.pause.count >= player.elasticCounter.pause.limit) {
            // console.log("pause count finished");

            // IF PAUSE IS START, COUNT UP
            if (player.elasticCounter.pause.type === "start") {
              player.elasticCounter.countUp.state = true;
              // console.log("start pause count finished. count up");
            }

            // IF PAUSE IS PEAK, COUNT DOWN
            if (player.elasticCounter.pause.type === "peak") {
              player.elasticCounter.countDown.state = true;
              // console.log("peak pause count finished. count down");
            }

            // IF PAUSE IS END, TURN OFF ELASTIC COUNT
            if (player.elasticCounter.pause.type === "end") {
              player.elasticCounter.state = false;
              player.elasticCounter.type = "";
              player.elasticCounter.subType = "";
              // console.log("end pause count finished. turn off elastic count");
            }

            // RESET PAUSE COUNT
            player.elasticCounter.pause.state = false;
            player.elasticCounter.pause.count = 0;
          }
        }

        // COUNT DOWN
        if (player.elasticCounter.countDown.state === true) {
          // COUNT DOWN
          if (
            player.elasticCounter.countDown.count < player.elasticCounter.countDown.limit
          ) {
            if (player.elasticCounter.countDown.count === 1) {
              // console.log(
              //   "elastic count down start",
              //   player.elasticCounter.countDown.limit
              // );
            }

            player.elasticCounter.countDown.count++;
            // console.log(
            //   "elastic counting down: ",
            //   player.elasticCounter.countDown.count
            // );
          }

          // FINISH COUNT DOWN
          if (
            player.elasticCounter.countDown.count >= player.elasticCounter.countDown.limit
          ) {
            player.elasticCounter.countDown = {
              state: false,
              count: 0,
              limit: player.elasticCounter.countDown.limit,
            };
            // console.log("finished count down.");

            // IF PAUSE IS END, COUNT PAUSE
            if (
              player.elasticCounter.pause.preState === true &&
              player.elasticCounter.pause.type === "end"
            ) {
              player.elasticCounter.pause.preState = false;
              player.elasticCounter.pause.state = true;
              // console.log("end pause. turn on pause");
            }

            // IF PAUSE IS NOT END, TURN OFF ELASTIC COUNTER
            if (player.elasticCounter.pause.type !== "end") {
              player.elasticCounter.state = false;
              player.elasticCounter.type = "";
              player.elasticCounter.subType = "";
              // console.log("pause is not end. turn off elastic count");
            }

            // if (player.elasticCounter !== "dodging") {
            //   player.action = "idle";
            // }
          }
        }
      }

      // DISCARD GEAR STEPPER!!
      if (player.discardGear.state === true) {
        if (player.discardGear.count < player.discardGear.limit) {
          player.discardGear.count++;
        } else if (player.discardGear.count >= player.discardGear.limit) {
          player.discardGear = {
            state: false,
            count: 0,
            limit: player.discardGear.limit,
          };
        }
      }

      // WEAPON/ARMOR CYCLE CHECK!!
      if (
        app.keyPressed[player.number - 1].cycleWeapon === true &&
        player.cycleWeapon.state === false
      ) {
        if (player.cycleWeapon.count < player.cycleWeapon.limit) {
          player.cycleWeapon.count++;
          // console.log('player.cycleWeapon.count',player.cycleWeapon.count);
        }
        if (player.cycleWeapon.count >= player.cycleWeapon.limit) {
          if (
            app.keyPressed[player.number - 1].cycleWeapon === true &&
            player.items.weapons.length > 1
          ) {
            // console.log('cycling weapon',player.items);

            // let currentIndex = player.items.weapons.indexOf(player.currentWeapon);
            let currentIndex = player.items.weaponIndex;
            let newIndex;
            // console.log(player.items.weapons,player.currentWeapon,currentIndex,player.items.weapons[currentIndex]);
            if (currentIndex + 1 > player.items.weapons.length - 1) {
              newIndex = 0;
            } else {
              newIndex = currentIndex + 1;
            }
            player.items.weaponIndex = newIndex;
            player.currentWeapon = player.items.weapons[newIndex];

            if (
              !player.popups.find((x) => x.msg === player.items.weapons[newIndex].type)
            ) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: player.items.weapons[newIndex].type,
                img: "",
              });
            }

            // console.log(player.items.weapons,player.currentWeapon,newIndex,player.items.weapons[newIndex]);
          }
          if (
            app.keyPressed[player.number - 1].cycleWeapon === true &&
            player.items.weapons.length === 1
          ) {
            if (player.currentWeapon.type === "crossbow" && player.items.ammo === 0) {
              player.currentWeapon = {
                name: "",
                type: "",
                effect: "",
              };
              console.log("only have empty crossbow left, switching to unarmed");
            } else {
              player.currentWeapon = player.items.weapons[0];
              // console.log('nothing to cycle through');
              app.players[player.number - 1].statusDisplay = {
                state: true,
                status: "no weapons to cycle!",
                count: 1,
                limit: app.players[player.number - 1].statusDisplay.limit,
              };

              if (!player.popups.find((x) => x.msg === "stop")) {
                player.popups.push({
                  state: false,
                  count: 0,
                  limit: 30,
                  type: "",
                  position: "",
                  msg: "stop",
                  img: "",
                });
              }
            }
          }

          player.cycleWeapon = {
            state: false,
            count: 0,
            limit: player.cycleWeapon.limit,
          };

          let myCell = app.gridInfo.find(
            (cell) =>
              cell.number.x === player.currentPosition.cell.number.x &&
              cell.number.y === player.currentPosition.cell.number.y,
          );
          // if (myCell.item.name !== '') {
          //   // console.log('found an item. picking it up');
          //   app.checkDestination(player)
          // }
        }
      } else if (
        app.keyPressed[player.number - 1].cycleWeapon === true &&
        player.cycleWeapon.state === true
      ) {
        console.log("already cycling weapon");
      }
      if (
        app.keyPressed[player.number - 1].cycleArmor === true &&
        player.cycleArmor.state === false
      ) {
        if (player.cycleArmor.count < player.cycleArmor.limit) {
          player.cycleArmor.count++;
          // console.log('player.cycleArmor.count',player.cycleArmor.count);
        }
        if (player.cycleArmor.count >= player.cycleArmor.limit) {
          if (
            app.keyPressed[player.number - 1].cycleArmor === true &&
            player.items.armor.length > 0
          ) {
            // console.log('cycling armor');

            // let currentIndex = player.items.armor.indexOf(player.currentArmor);
            let currentIndex = player.items.armorIndex;
            let newIndex;
            if (currentIndex + 1 > player.items.armor.length - 1) {
              newIndex = 0;
            } else {
              newIndex = currentIndex + 1;
            }

            switch (player.currentArmor.effect) {
              case "hpUp":
                if (player.hp > 1) {
                  // console.log('armor cycle debuff hp',player.hp);
                  player.hp = player.hp - 1;
                  // console.log('armor cycle debuff hp',player.hp);
                }
                break;
              case "speedUp":
                let currentSpd1 = player.speed.range.indexOf(player.speed.move);
                if (player.speed.move > 0.05) {
                  // console.log('armor cycle debuff speed',player.speed.move);
                  player.speed.move = player.speed.range[currentSpd1 - 1];
                  // console.log('armor cycle debuff speed',player.speed.move);
                }
                break;
            }

            switch (player.items.armor[newIndex].effect) {
              case "hpUp":
                if (player.hp < 3) {
                  // console.log('armor cycle buff hp',player.hp);
                  player.hp = player.hp + 1;
                  // console.log('armor cycle buff hp',player.hp);

                  player.statusDisplay = {
                    state: true,
                    status: "hpUp",
                    count: 1,
                    limit: player.statusDisplay.limit,
                  };
                }
                break;
              case "speedUp":
                let currentSpd2 = player.speed.range.indexOf(player.speed.move);
                if (player.speed.move < 0.2) {
                  // console.log('armor cycle buff speed',player.speed.move);
                  player.speed.move = player.speed.range[currentSpd2 + 1];
                  // console.log('armor cycle buff speed',player.speed.move);

                  player.statusDisplay = {
                    state: true,
                    status: "speedUp",
                    count: 1,
                    limit: player.statusDisplay.limit,
                  };
                }
                break;
            }

            player.items.armorIndex = newIndex;
            player.currentArmor = player.items.armor[newIndex];

            if (
              player.items.armor[newIndex].type !== "" &&
              !player.popups.find((x) => x.msg === player.items.armor[newIndex].type)
            ) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: player.items.armor[newIndex].type,
                img: "",
              });
            }
            if (
              player.items.armor[newIndex].type === "" &&
              !player.popups.find((x) => x.msg === "stop")
            ) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: "stop",
                img: "",
              });
            }
          }
          if (
            app.keyPressed[player.number - 1].cycleArmor === true &&
            player.items.armor.length === 0
          ) {
            console.log("no armor to cycle through");
            app.players[player.number - 1].statusDisplay = {
              state: true,
              status: "no armor to cycle!",
              count: 1,
              limit: app.players[player.number - 1].statusDisplay.limit,
            };

            if (!player.popups.find((x) => x.msg === "stop")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: "stop",
                img: "",
              });
            }
          }

          player.cycleArmor = {
            state: false,
            count: 0,
            limit: player.cycleArmor.limit,
          };

          let myCell = app.gridInfo.find(
            (cell) =>
              cell.number.x === player.currentPosition.cell.number.x &&
              cell.number.y === player.currentPosition.cell.number.y,
          );
          // if (myCell.item.name !== '') {
          //   // console.log('found an item. picking it up');
          //   app.checkDestination(player)
          // }
        }
      } else if (
        app.keyPressed[player.number - 1].cycleArmor === true &&
        player.cycleArmor.state === true
      ) {
        console.log("already cycling armor");
      }

      // ITEM PICKUP/DROP ANIM COUNTER!
      if (player.itemDrop.state === true) {
        if (player.itemDrop.count < player.itemDrop.limit) {
          player.itemDrop.count++;
          // console.log('dropping item anim');
        } else if (player.itemDrop.count >= player.itemDrop.limit) {
          player.itemDrop = {
            state: false,
            count: 0,
            limit: 10,
            item: {
              name: "",
            },
            gear: {
              type: "",
            },
          };
        }
      }
      if (player.itemPickup.state === true) {
        if (player.itemPickup.count < player.itemPickup.limit) {
          player.itemPickup.count++;
          // console.log('picking item anim');
        } else if (player.itemPickup.count >= player.itemPickup.limit) {
          player.itemPickup = {
            state: false,
            count: 0,
            limit: 10,
            item: {
              name: "",
            },
            gear: {
              type: "",
            },
          };
        }
      }

      // FLANKING!
      if (player.flanking.state === true) {
        // RESET DODGING
        app.players[player.number - 1].dodging = {
          countState: false,
          state: false,
          count: 0,
          limit: player.dodging.limit,
          peak: {
            start: player.dodging.peak.start,
            end: player.dodging.peak.end,
          },
          direction: "",
        };

        if (
          player.elasticCounter.state === true &&
          player.elasticCounter.type === "dodging"
        ) {
          player.elasticCounter.state = false;
          player.elasticCounter.type = "";
          player.elasticCounter.subType = "";
        }

        if (app.players[player.number - 1].popups.find((x) => x.msg === "dodging")) {
          app.players[player.number - 1].popups.splice(
            app.players[player.number - 1].popups.findIndex((x) => x.msg === "dodging"),
            1,
          );
        }

        if (player.flanking.step === 2) {
          // console.log(
          //   "flanking step 2 plyr dir: ",
          //   player.direction,
          //   " pre-flank dir: ",
          //   player.flanking.preFlankDirection,
          //   " flank dir: ",
          //   player.flanking.direction,
          //   "current position: ",
          //   player.currentPosition.cell.number,
          //   " strafing: ",
          //   player.strafing.state,
          //   " move step: ",
          //   player.moving.step
          // );
          // console.log(
          //   "flanking step 2: ",
          //   player.moving.state,
          //   player.moving.step,
          //   "-",
          //   player.turning.state
          // );
          // console.log("3", player.currentPosition.cell.number);

          player.direction = app.getOppositeDirection(player.flanking.direction);
          player.turning.toDirection = app.getOppositeDirection(
            player.flanking.direction,
          );

          player.flanking = {
            checking: false,
            direction: "",
            preFlankDirection: "",
            state: false,
            step: 0,
            target1: { x: 0, y: 0 },
            target2: { x: 0, y: 0 },
          };

          if (player.popups.find((x) => x.msg === "flanking2")) {
            player.popups.splice(
              player.popups.findIndex((y) => y.msg === "flanking2"),
              1,
            );
          }
        }
        if (player.flanking.step === 1) {
          // console.log(
          //   "flanking step 1 plyr dir: ",
          //   player.direction,
          //   " pre-flank dir: ",
          //   player.flanking.preFlankDirection,
          //   " flank dir: ",
          //   player.flanking.direction,
          //   "current position: ",
          //   player.currentPosition.cell.number,
          //   " strafing: ",
          //   player.strafing.state,
          //   " move step: ",
          //   player.moving.step
          // );
          // console.log("flanking step 1: ");
          // console.log("2", player.currentPosition.cell.number);
          let continueFlank = false;
          if (
            app.keyPressed[player.number - 1].north === true ||
            app.keyPressed[player.number - 1].south === true ||
            app.keyPressed[player.number - 1].east === true ||
            app.keyPressed[player.number - 1].west === true
          ) {
            if (player.flanking.direction === keyPressedDirection) {
              // console.log(
              //   "already flanking in this direction. no move interrupt. continue flank"
              // );
              continueFlank = true;
            } else {
              // console.log(
              //   "flanking cancelled by move input!",
              //   player.flanking.direction,
              //   player.turning.toDirection,
              //   player.direction,
              //   keyPressedDirection
              // );
              player.action = "idle";
              player.turning.toDirection = player.direction;

              app.players[player.number - 1].statusDisplay = {
                state: true,
                status: "flanking cancelled!",
                count: 1,
                limit: app.players[player.number - 1].statusDisplay.limit,
              };
              player.flanking = {
                checking: false,
                direction: "",
                preFlankDirection: "",
                state: false,
                step: 0,
                target1: { x: 0, y: 0 },
                target2: { x: 0, y: 0 },
              };

              if (player.popups.find((x) => x.msg === "flanking2")) {
                player.popups.splice(
                  player.popups.findIndex((y) => y.msg === "flanking2"),
                  1,
                );
              }
              if (!player.popups.find((x) => x.msg === "noFlanking")) {
                player.popups.push({
                  state: false,
                  count: 0,
                  limit: 30,
                  type: "",
                  position: "",
                  msg: "noFlanking",
                  img: "",
                });
              }
            }
          } else {
            continueFlank = true;
          }

          if (continueFlank === true) {
            let target = app.getTarget(player);

            let myCell = app.gridInfo.find(
              (elem2) =>
                elem2.number.x === player.currentPosition.cell.number.x &&
                elem2.number.y === player.currentPosition.cell.number.y,
            );
            let myCellBlock = app.checkMyCellBarrier(player.direction, myCell);

            if (target.cell1.free === true && myCellBlock !== true) {
              player.flanking.step = 2;
              player.flanking.target2 = target.cell1.number;
              // player.action = 'moving';
              player.action = "flanking";
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

              if (player.ai.state === true) {
                app.keyPressed[player.number - 1].dodge = false;
              }

              if (!player.popups.find((x) => x.msg === "flanking2")) {
                player.popups.push({
                  state: false,
                  count: 0,
                  limit: 20,
                  type: "",
                  position: "",
                  msg: "flanking2",
                  img: "",
                });
              }

              if (
                app.players[player.number - 1].popups.find((x) => x.msg === "dodging")
              ) {
                app.players[player.number - 1].popups.splice(
                  app.players[player.number - 1].popups.findIndex(
                    (x) => x.msg === "dodging",
                  ),
                  1,
                );
              }
            } else {
              // console.log(
              //   "cancel flanking 2",
              //   player.flanking.direction,
              //   player.flanking.preFlankDirection,
              //   player.direction
              // );
              player.action = "idle";
              player.turning.toDirection = player.direction;

              app.players[player.number - 1].statusDisplay = {
                state: true,
                status: "flanking cancelled!",
                count: 1,
                limit: app.players[player.number - 1].statusDisplay.limit,
              };
              player.flanking = {
                checking: false,
                direction: "",
                preFlankDirection: "",
                state: false,
                step: 0,
                target1: { x: 0, y: 0 },
                target2: { x: 0, y: 0 },
              };

              if (player.popups.find((x) => x.msg === "flanking2")) {
                player.popups.splice(
                  player.popups.findIndex((y) => y.msg === "flanking2"),
                  1,
                );
              }
              if (!player.popups.find((x) => x.msg === "noFlanking")) {
                player.popups.push({
                  state: false,
                  count: 0,
                  limit: 30,
                  type: "",
                  position: "",
                  msg: "noFlanking",
                  img: "",
                });
              }
            }
          }
        }
      }
      // START
      if (
        app.keyPressed[player.number - 1].dodge === true &&
        player.flanking.state !== true &&
        player.attacking.state !== true
      ) {
        if (
          app.keyPressed[player.number - 1].north === true ||
          app.keyPressed[player.number - 1].south === true ||
          app.keyPressed[player.number - 1].east === true ||
          app.keyPressed[player.number - 1].west === true
        ) {
          if (player.strafing.state !== true && player.flanking.state !== true) {
            const cancelDodge = () => {
              // RESET DODGING
              app.players[player.number - 1].stamina.current +=
                app.staminaCostRef.dodge.pre;
              app.players[player.number - 1].dodging = {
                countState: false,
                state: false,
                count: 0,
                limit: player.dodging.limit,
                peak: {
                  start: player.dodging.peak.start,
                  end: player.dodging.peak.end,
                },
                direction: "",
              };
              player.action = "idle";
              if (
                player.elasticCounter.state === true &&
                player.elasticCounter.type === "dodging"
              ) {
                player.elasticCounter.state = false;
                player.elasticCounter.type = "";
                player.elasticCounter.subType = "";
              }
            };

            const continueDodge = () => {
              player.dodging.countState = true;
            };
            let canFlank1 = false;

            if (player.dodging.countState === true && player.dodging.state !== true) {
              if (
                player.dodging.count <=
                player.dodging.peak.start - player.crits.dodge
              ) {
                canFlank1 = true;
                // console.log("can flank before dodge peak start");
              } else {
                console.log("too late in dodge windup to flank");
                continueDodge();
              }
            }
            if (player.dodging.countState === true && player.dodging.state === true) {
              // console.log("peak dodging. can't flank");
            }
            if (player.dodging.countState !== true && player.dodging.state !== true) {
              console.log("highly unlikely. can flank anyway");
              canFlank1 = true;
            }

            if (canFlank1 === true) {
              cancelDodge();
              if (keyPressedDirection !== player.direction) {
                let canFlank2 = false;
                switch (player.direction) {
                  case "north":
                    if (
                      keyPressedDirection === "east" ||
                      keyPressedDirection === "west"
                    ) {
                      canFlank2 = true;
                    }
                    break;
                  case "south":
                    if (
                      keyPressedDirection === "east" ||
                      keyPressedDirection === "west"
                    ) {
                      canFlank2 = true;
                    }
                    break;
                  case "west":
                    if (
                      keyPressedDirection === "north" ||
                      keyPressedDirection === "south"
                    ) {
                      canFlank2 = true;
                    }
                    break;
                  case "east":
                    if (
                      keyPressedDirection === "north" ||
                      keyPressedDirection === "south"
                    ) {
                      canFlank2 = true;
                    }
                    break;
                }

                if (canFlank2 === true) {
                  if (player.stamina.current - app.staminaCostRef.flank >= 0) {
                    // console.log('flanking step',keyPressedDirection,player.direction);
                    app.players[player.number - 1].flanking.checking = true;
                    app.players[player.number - 1].flanking.direction =
                      keyPressedDirection;
                    app.players[player.number - 1].flanking.preFlankDirection =
                      player.direction;

                    let target = app.getTarget(player);

                    let myCell = app.gridInfo.find(
                      (elem2) =>
                        elem2.number.x === player.currentPosition.cell.number.x &&
                        elem2.number.y === player.currentPosition.cell.number.y,
                    );
                    let myCellBlock = app.checkMyCellBarrier(keyPressedDirection, myCell);

                    // if (target.cell1.free === true) {
                    if (target.cell1.free === true && myCellBlock !== true) {
                      player.stamina.current =
                        player.stamina.current - app.staminaCostRef.flank;
                      // console.log('flank stam check1. cost',app.staminaCostRef.flank,'stam',player.stamina.current);

                      // console.log('flanking step 0 plyr dir: ',player.direction,' pre-flank dir: ',player.flanking.preFlankDirection,' flank dir: ',player.flanking.direction,"current position: ",player.currentPosition.cell.number,' strafing: ',player.strafing.state,' move step: ',player.moving.step);

                      app.players[player.number - 1].flanking.checking = false;
                      app.players[player.number - 1].flanking.state = true;
                      app.players[player.number - 1].flanking.step = 1;
                      app.players[player.number - 1].flanking.target1 =
                        target.cell1.number;
                      // console.log('app.players[player.number-1].flanking.target1',app.players[player.number-1].flanking.target1);
                      // player.action = 'moving';

                      if (
                        !player.popups.find((x) => x.msg === "preAction2") &&
                        !player.popups.find((x) => x.msg === "dodgeStart")
                      ) {
                        player.popups.push({
                          state: false,
                          count: 0,
                          limit: 5,
                          type: "",
                          position: "",
                          msg: "preAction2",
                          img: "",
                        });
                      }

                      player.action = "flanking";
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
                      // console.log("1", player.currentPosition.cell.number);
                      if (
                        app.mouseOverCell.state === true &&
                        app.mouseOverCell.cell.number.x ===
                          player.currentPosition.cell.number.x &&
                        app.mouseOverCell.cell.number.y ===
                          player.currentPosition.cell.number.y
                      ) {
                        app.clicked.player = undefined;
                      }
                    } else {
                      // console.log(
                      //   "cancel flanking 1",
                      //   player.flanking.direction,
                      //   player.flanking.preFlankDirection,
                      //   player.direction,
                      //   player.action
                      // );
                      player.action = "idle";
                      player.turning.toDirection = player.direction;

                      app.players[player.number - 1].flanking.checking = false;
                      app.players[player.number - 1].flanking.state = false;
                      app.players[player.number - 1].flanking.direction = "";
                      app.players[player.number - 1].flanking.preFlankDirection = "";

                      if (!player.popups.find((x) => x.msg === "noFlanking")) {
                        player.popups.push({
                          state: false,
                          count: 0,
                          limit: 30,
                          type: "",
                          position: "",
                          msg: "noFlanking",
                          img: "",
                        });
                      }
                      if (player.popups.find((x) => x.msg === "flanking2")) {
                        player.popups.splice(
                          player.popups.findIndex((y) => y.msg === "flanking2"),
                          1,
                        );
                      }
                    }
                  } else {
                    // console.log('flank stam check. cost',app.staminaCostRef.flank,'stam',player.stamina.current);
                    player.action = "idle";
                    player.stamina.current = 0;
                    player.statusDisplay = {
                      state: true,
                      status: "Out of Stamina",
                      count: 1,
                      limit: player.statusDisplay.limit,
                    };
                  }
                } else {
                  console.log("cant flank2 incompatible direction");
                }
              }
              if (keyPressedDirection === player.direction) {
                console.log("!! dodge roll key combo!! or kick");
              }
            }
          } else {
            // console.log("already strafing and/or flanking. cant start flank");
          }
        }
      }

      // BREAK FROM PULLED/PUSHED CHECK
      let plyrPullPushed = false;
      let plyrPullPushedPlyr = 0;
      let breakPulledPushed = false;
      for (const plyr of app.players) {
        if (plyr.prePush.state === true) {
          if (
            plyr.target.cell1.number.x === player.currentPosition.cell.number.x &&
            plyr.target.cell1.number.y === player.currentPosition.cell.number.y
          ) {
            // console.log('player is being pre pushed by plyr',plyr.number);
            plyrPullPushed = true;
            plyrPullPushedPlyr = plyr.number;
          }
        }
        if (plyr.prePull.state === true) {
          if (
            plyr.target.cell1.number.x === player.currentPosition.cell.number.x &&
            plyr.target.cell1.number.y === player.currentPosition.cell.number.y
          ) {
            // console.log('player is being pre pulled by plyr',plyr.number);
            plyrPullPushed = true;
            plyrPullPushedPlyr = plyr.number;
          }
        }
      }

      // CAN READ MOVE INPUTS!!
      if (
        player.attacking.state === false &&
        player.defending.state === false &&
        player.action !== "attacking" &&
        player.action !== "defending" &&
        player.defending.count < 1 &&
        player.dodging.state === false &&
        player.dodging.countState === false &&
        player.turning.state !== true &&
        player.postPull.state !== true &&
        player.defending.decay.state !== true &&
        player.flanking.state !== true &&
        player.jumping.state !== true &&
        player.turning.state !== true &&
        player.halfPushBack.state !== true &&
        player.elasticCounter.state !== true &&
        player.pulling.state !== true &&
        player.pushing.state !== true &&
        player.itemDrop.state !== true &&
        player.itemPickup.state !== true
      ) {
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
            if (
              keyPressedDirection === player.direction &&
              player.strafing.state === false
            ) {
              let target = app.getTarget(player);

              if (
                target.cell1.free === true &&
                player.target.cell1.void === false &&
                target.myCellBlock !== true
              ) {
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
                      app.mouseOverCell.cell.number.x ===
                        player.currentPosition.cell.number.x &&
                      app.mouseOverCell.cell.number.y ===
                        player.currentPosition.cell.number.y
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

              if (target.cell1.free !== true && target.myCellBlock !== true) {
                if (
                  target.cell1.occupant.type === "obstacle" &&
                  player.pushing.state !== true
                ) {
                  app.preObstaclePushCheck(player, target);
                }
                if (
                  target.cell1.occupant.type === "player" &&
                  player.pushing.state !== true
                ) {
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

                  app.moveSpeed = player.speed.move;

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
                    app.mouseOverCell.cell.number.x ===
                      player.currentPosition.cell.number.x &&
                    app.mouseOverCell.cell.number.y ===
                      player.currentPosition.cell.number.y
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
          if (
            keyPressedDirection !== player.direction &&
            player.strafing.state === false &&
            player.turning.state !== true
          ) {
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
            if (
              keyPressedDirection !== player.direction &&
              player.strafing.state === true
            ) {
              player.strafing.direction = keyPressedDirection;
              let target = app.getTarget(player);

              if (target.cell1.free === true && target.myCellBlock !== true) {
                if (player.stamina.current - app.staminaCostRef.strafe >= 0) {
                  player.stamina.current -= app.staminaCostRef.strafe;
                  app.moveSpeed = player.speed.move;

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
                    app.mouseOverCell.cell.number.x ===
                      player.currentPosition.cell.number.x &&
                    app.mouseOverCell.cell.number.y ===
                      player.currentPosition.cell.number.y
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
                (elem) =>
                  elem.number.x === player.currentPosition.cell.number.x &&
                  elem.number.y === player.currentPosition.cell.number.y,
              );
              let cell1 = app.gridInfo.find(
                (elem) =>
                  elem.number.x === target.cell1.number.x &&
                  elem.number.y === target.cell1.number.y,
              );
              let cell2 = app.gridInfo.find(
                (elem) =>
                  elem.number.x === target.cell2.number.x &&
                  elem.number.y === target.cell2.number.y,
              );
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
                if (
                  cell1.void.state === true ||
                  cell1.terrain.type === "deep" ||
                  cell1.terrain.type === "hazard"
                ) {
                  // console.log('a');

                  // CHECK ALL 3 JUMPING CELLS FOR BARRIERS BASED ON POSITION
                  let myCellBlocked = false;
                  let cell1BarrierNear = false;
                  let cell1BarrierFar = false;
                  let cell2Barrier = false;
                  if (
                    myCell.barrier.state === true &&
                    myCell.barrier.position === player.direction
                  ) {
                    myCellBlocked = true;
                  }
                  if (cell1.barrier.state === true) {
                    if (cell1.barrier.position === player.direction) {
                      cell1BarrierFar = true;
                    }
                    if (
                      cell1.barrier.position ===
                      app.getOppositeDirection(player.direction)
                    ) {
                      cell1BarrierNear = true;
                    }
                  }
                  if (cell2.barrier.state === true) {
                    if (
                      cell2.barrier.position ===
                      app.getOppositeDirection(player.direction)
                    ) {
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
                        player.stamina.current =
                          player.stamina.current - app.staminaCostRef.jump;

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
                          app.mouseOverCell.cell.number.x ===
                            player.currentPosition.cell.number.x &&
                          app.mouseOverCell.cell.number.y ===
                            player.currentPosition.cell.number.y
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
                if (
                  !app.players[player.number - 1].popups.find((x) => x.msg === "alarmed")
                ) {
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

      // CAN READ NON-MOVE INPUTS!!
      if (
        player.moving.state !== true &&
        player.strafing.state === false &&
        player.turning.state !== true &&
        player.postPull.state !== true &&
        player.halfPushBack.state !== true &&
        player.elasticCounter.state !== true &&
        player.pulling.state !== true &&
        player.pushing.state !== true &&
        player.itemDrop.state !== true &&
        player.itemPickup.state !== true
      ) {
        // ATTACKING/DEFENDING
        if (
          app.keyPressed[player.number - 1].attack === true ||
          app.keyPressed[player.number - 1].defend === true
        ) {
          // ALREADY ATTACKING/DEFENDING!!
          if (player.attacking.state === true || player.defending.state === true) {
            if (app.keyPressed[player.number - 1].attack === true) {
              // console.log("already attacking");
            }
            if (app.keyPressed[player.number - 1].defend === true) {
              // console.log('already defending',player.number);
            }
          }

          // START ATTACK/DEFEND!!
          if (
            player.attacking.state === false &&
            player.defending.state === false &&
            player.defending.decay.state !== true
          ) {
            if (
              app.keyPressed[player.number - 1].attack === true &&
              player.success.deflected.state !== true &&
              app.keyPressed[player.number - 1].defend !== true
            ) {
              let atkType = player.currentWeapon.type;
              let blunt = "normal";
              if (player.attacking.blunt === true) {
                atkType = "blunt";
                blunt = "blunt";
              }
              if (player.currentWeapon.name === "") {
                atkType = "unarmed";
              }

              // BLUNT ATTACK!!
              if (app.keyPressed[player.number - 1].dodge === true) {
                // console.log('start blunt attack');
                if (
                  player.dodging.countState === true ||
                  player.dodging.state === true ||
                  app.keyPressed[player.number - 1].dodge === true
                ) {
                  console.log(
                    "was dodging, now blunt attacking. cancel dodge. return dodge stamina",
                  );
                  player.stamina.current += app.staminaCostRef.dodge.peak;
                  player.dodging = {
                    countState: false,
                    state: false,
                    count: 0,
                    limit: player.dodging.limit,
                    peak: {
                      start: player.dodging.peak.start,
                      end: player.dodging.peak.end,
                    },
                    direction: "",
                  };
                  if (
                    player.elasticCounter.state === true &&
                    player.elasticCounter.type === "dodging"
                  ) {
                    player.elasticCounter.state = false;
                    player.elasticCounter.type = "";
                    player.elasticCounter.subType = "";
                  }
                }
                app.keyPressed[player.number - 1].dodge = false;

                let popup = player.popups.find((x) => x.msg === "dodging");
                if (popup) {
                  player.popups.splice(
                    player.popups.findIndex((x) => x.msg === "dodging"),
                    1,
                  );
                }
                let popup2 = player.popups.find((x) => x.msg === "dodgeStart");
                if (popup2) {
                  player.popups.splice(
                    player.popups.findIndex((x) => x.msg === "dodgeStart"),
                    1,
                  );
                }

                player.attacking.blunt = true;
                atkType = "blunt";
              }

              player = app.checkSetAttackDefendDirectionalInput(
                "init",
                "attacking",
                player,
              ).player;

              player.action = "attacking";
              player.attacking.state = true;
              player.attacking.count = 1;

              // console.log("start attack");

              if (plyrPullPushed === true) {
                breakPulledPushed = true;
              }
            }

            if (
              app.keyPressed[player.number - 1].defend === true &&
              player.defending.decay.state !== true &&
              app.keyPressed[player.number - 1].attack !== true
            ) {
              // console.log('start defending',player.number);

              // console.log('start defending');
              if (plyrPullPushed === true) {
                breakPulledPushed = true;
              }

              if (player.defending.count === 0 && player.defending.decay.state !== true) {
                player = app.checkSetAttackDefendDirectionalInput(
                  "init",
                  "defending",
                  player,
                ).player;

                player.defending.state = true;
                player.defending.count = 1;

                if (!player.popups.find((x) => x.msg === "preAction1")) {
                  player.popups.push({
                    state: false,
                    count: 0,
                    limit: 5,
                    type: "",
                    position: "",
                    msg: "preAction1",
                    img: "",
                  });
                }
              } else {
                // console.log('cant start defend. might already be in progress');
              }
            }
          }
        }

        // PRE PULL
        if (app.keyPressed[player.number - 1].pull === true) {
          app.getTarget(player);

          if (
            player.target.cell1.occupant.type === "obstacle" &&
            player.pulling.state !== true
          ) {
            // console.log('pulling obstacle trigger north',player.prePull.state,player.prePull.count);
            app.preObstaclePullCheck(
              player,
              player.target,
              app.getOppositeDirection(player.direction),
            );
          }
          if (
            player.target.cell1.occupant.type === "player" &&
            player.pulling.state !== true
          ) {
            // console.log('pulling player trigger north',player.prePull.state,player.prePull.count);
            app.prePlayerPullCheck(
              player,
              player.target,
              app.getOppositeDirection(player.direction),
            );
          }
        }

        // DODGE START
        else if (
          app.keyPressed[player.number - 1].dodge === true &&
          app.keyPressed[player.number - 1].attack !== true &&
          app.keyPressed[player.number - 1].defend !== true
        ) {
          if (player.attacking.state !== true && player.defending.state !== true) {
            if (player.dodging.state !== true && player.dodging.countState !== true) {
              console.log("start dodge wind up");
              player.dodging.countState = true;

              if (plyrPullPushed === true) {
                breakPulledPushed = true;
              }
            }
            if (player.dodging.state === true || player.dodging.countState === true) {
              console.log("already dodging");
            }
          } else {
            console.log("cant dodge while already attacking or defending");
          }
        }

        // DISCARD GEAR/PICKUP GEAR & ITEMS!!
        if (
          app.keyPressed[player.number - 1].discardWeapon === true &&
          player.discardGear.state !== true
        ) {
          app.discardGear(player, "weapon");
          player.discardGear.state = true;
        }
        if (
          app.keyPressed[player.number - 1].discardArmor === true &&
          player.discardGear.state !== true
        ) {
          app.discardGear(player, "armor");
          player.discardGear.state = true;
        }
      }

      // BREAK FROM PULLED, PUSHED COMPLETE
      if (breakPulledPushed === true) {
        console.log(
          "player ",
          player.number,
          " was being pre-pulled/pushed by ",
          plyrPullPushedPlyr,
          " break pulling/pushing and deflect?",
        );

        let shouldDeflect = app.rnJesus(1, player.crits.guardBreak);
        if (shouldDeflect === 1) {
          app.setDeflection(app.players[plyrPullPushedPlyr - 1], "bluntAttacked", false);
        }

        // POPUPS
        if (app.players[plyrPullPushedPlyr - 1].prePush.state === true) {
          if (
            !app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "noPush")
          ) {
            app.players[plyrPullPushedPlyr - 1].popups.push({
              state: false,
              count: 0,
              limit: 25,
              type: "",
              position: "",
              msg: "noPush",
              img: "",
            });
          }

          if (
            app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "prePush")
          ) {
            app.players[plyrPullPushedPlyr - 1].popups.splice(
              app.players[plyrPullPushedPlyr - 1].popups.findIndex(
                (x) => x.msg === "prePush",
              ),
              1,
            );
          }
          if (
            app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "noPush")
          ) {
            app.players[plyrPullPushedPlyr - 1].popups.splice(
              app.players[plyrPullPushedPlyr - 1].popups.findIndex(
                (x) => x.msg === "canPush",
              ),
              1,
            );
          }
        }
        if (app.players[plyrPullPushedPlyr - 1].prePull.state === true) {
          if (
            !app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "noPull")
          ) {
            app.players[plyrPullPushedPlyr - 1].popups.push({
              state: false,
              count: 0,
              limit: 25,
              type: "",
              position: "",
              msg: "noPull",
              img: "",
            });
          }

          if (
            app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "prePull")
          ) {
            app.players[plyrPullPushedPlyr - 1].popups.splice(
              app.players[plyrPullPushedPlyr - 1].popups.findIndex(
                (x) => x.msg === "prePull",
              ),
              1,
            );
          }
          if (
            app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "canPull")
          ) {
            app.players[plyrPullPushedPlyr - 1].popups.splice(
              app.players[plyrPullPushedPlyr - 1].popups.findIndex(
                (x) => x.msg === "canPull",
              ),
              1,
            );
          }
        }

        app.players[plyrPullPushedPlyr - 1].pushing = {
          state: false,
          targetCell: undefined,
          moveSpeed: 0,
        };
        app.players[plyrPullPushedPlyr - 1].pulling = {
          state: false,
          targetCell: undefined,
          moveSpeed: 0,
        };
        app.players[plyrPullPushedPlyr - 1].prePush = {
          state: false,
          count: 0,
          limit: app.players[plyrPullPushedPlyr - 1].prePush.limit,
          targetCell: undefined,
          direction: "",
          pusher: undefined,
        };
        app.players[plyrPullPushedPlyr - 1].prePull = {
          state: false,
          count: 0,
          limit: app.players[plyrPullPushedPlyr - 1].prePull.limit,
          targetCell: undefined,
          direction: "",
          puller: undefined,
        };

        if (app.players[plyrPullPushedPlyr - 1].newPushPullDelay.state !== true) {
          app.players[plyrPullPushedPlyr - 1].newPushPullDelay.state = true;
        }

        if (app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "prePush")) {
          app.players[plyrPullPushedPlyr - 1].popups.splice(
            app.players[plyrPullPushedPlyr - 1].popups.findIndex(
              (x) => x.msg === "prePush",
            ),
            1,
          );
        }
        if (app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "prePull")) {
          app.players[plyrPullPushedPlyr - 1].popups.splice(
            app.players[plyrPullPushedPlyr - 1].popups.findIndex(
              (x) => x.msg === "prePull",
            ),
            1,
          );
        }
      }
    }

    // DISPLAY ATTACK AND DEFENSE SUCCESS!
    if (player.success.attackSuccess.state === true) {
      if (player.success.attackSuccess.count < player.success.attackSuccess.limit) {
        player.success.attackSuccess.count++;
      } else if (
        player.success.attackSuccess.count >= player.success.attackSuccess.limit
      ) {
        player.success.attackSuccess = {
          state: false,
          count: 0,
          limit: player.success.attackSuccess.limit,
        };
      }
    }
    if (player.success.defendSuccess.state === true) {
      if (player.success.defendSuccess.count < player.success.defendSuccess.limit) {
        player.success.defendSuccess.count++;
      } else if (
        player.success.defendSuccess.count >= player.success.defendSuccess.limit
      ) {
        player.success.defendSuccess = {
          state: false,
          count: 0,
          limit: player.success.defendSuccess.limit,
        };
      }
    }
  } else {
    // console.log('sorry no key presses right now. you are deflected');
  }

  // DEFLECTION ELASTIC COUNTER
  if (
    player.elasticCounter.state === true &&
    player.elasticCounter.type === "deflected"
  ) {
    player.action = player.elasticCounter.type;

    // IF PAUSE IS START, COUNT PAUSE 1ST
    if (
      player.elasticCounter.pause.preState === true &&
      player.elasticCounter.pause.type === "start"
    ) {
      player.elasticCounter.pause.preState = false;
      player.elasticCounter.pause.state = true;
      // console.log('start pause, turn on pause');
    }

    // IF PAUSE IS NOT START, COUNT UP
    if (
      player.elasticCounter.pause.type !== "start" &&
      player.elasticCounter.countUp.state !== true &&
      player.elasticCounter.countDown.state !== true &&
      player.elasticCounter.pause.state !== true
    ) {
      player.elasticCounter.countUp.state = true;
    }

    // COUNT UP
    if (player.elasticCounter.countUp.state === true) {
      if (player.elasticCounter.countUp.count < player.elasticCounter.countUp.limit + 1) {
        if (player.elasticCounter.countUp.count === 0) {
          // console.log('elastic count up start');
        }

        player.elasticCounter.countUp.count++;
        // console.log('elastic counting up: ',player.elasticCounter.countUp.count);
      }

      // FINISH COUNT UP
      if (
        player.elasticCounter.countUp.count >=
        player.elasticCounter.countUp.limit + 1
      ) {
        // RESET COUNT UP
        player.elasticCounter.countUp = {
          state: false,
          count: 0,
          limit: player.elasticCounter.countUp.limit,
        };
        // console.log('finished count up. elastic counter peak');

        // IF PAUSE IS PEAK, COUNT PAUSE AT PEAK
        if (
          player.elasticCounter.pause.preState === true &&
          player.elasticCounter.pause.type === "peak"
        ) {
          player.elasticCounter.pause.preState = false;
          player.elasticCounter.pause.state = true;
          // console.log('peak pause. turn on pause');
        }

        // IF PAUSE IS NOT PEAK, COUNT DOWM
        if (player.elasticCounter.pause.type !== "peak") {
          player.elasticCounter.countDown.state = true;
          // console.log('pause is not peak. count down');
        }
      }
    }

    // COUNT PAUSE
    if (player.elasticCounter.pause.state === true) {
      // console.log('pause count. type: ',player.elasticCounter.pause.type);

      // COUNT PAUSE
      if (player.elasticCounter.pause.count < player.elasticCounter.pause.limit + 1) {
        if (player.elasticCounter.pause.count === 0) {
          // console.log('pause count start');
        }

        player.elasticCounter.pause.count++;
        // console.log('pause counting: ',player.elasticCounter.pause.count);
      }

      // FINISH PAUSE
      if (player.elasticCounter.pause.count >= player.elasticCounter.pause.limit + 1) {
        // console.log('pause count finished');

        // IF PAUSE IS START, COUNT UP
        if (player.elasticCounter.pause.type === "start") {
          player.elasticCounter.countUp.state = true;
          // console.log('start pause count finished. count up');
        }

        // IF PAUSE IS PEAK, COUNT DOWN
        if (player.elasticCounter.pause.type === "peak") {
          player.elasticCounter.countDown.state = true;
          // console.log('peak pause count finished. count down');
        }

        // IF PAUSE IS END, TURN OFF ELASTIC COUNT
        if (player.elasticCounter.pause.type === "end") {
          player.elasticCounter.state = false;
          player.elasticCounter.type = "";
          player.elasticCounter.subType = "";
          // player.action = "idle";
          // console.log('end pause count finished. turn off elastic count');
        }

        // RESET PAUSE COUNT
        player.elasticCounter.pause.state = false;
        player.elasticCounter.pause.count = 0;
      }
    }

    // COUNT DOWN
    if (player.elasticCounter.countDown.state === true) {
      // COUNT DOWN
      if (
        player.elasticCounter.countDown.count <
        player.elasticCounter.countDown.limit + 1
      ) {
        if (player.elasticCounter.countDown.count === 1) {
          // console.log('elastic count down start');
        }

        player.elasticCounter.countDown.count++;
        // console.log('elastic counting down: ',player.elasticCounter.countDown.count);
      }

      // FINISH COUNT DOWN
      if (
        player.elasticCounter.countDown.count >=
        player.elasticCounter.countDown.limit + 1
      ) {
        player.elasticCounter.countDown = {
          state: false,
          count: 0,
          limit: player.elasticCounter.countDown.limit,
        };
        // console.log('finished count down. elastic counter end');

        // IF PAUSE IS END, COUNT PAUSE
        if (
          player.elasticCounter.pause.preState === true &&
          player.elasticCounter.pause.type === "end"
        ) {
          player.elasticCounter.pause.preState = false;
          player.elasticCounter.pause.state = true;

          // console.log('end pause. turn on pause');
        }

        // IF PAUSE IS NOT END, TURN OFF ELASTIC COUNTER
        if (player.elasticCounter.pause.type !== "end") {
          player.elasticCounter.state = false;
          player.elasticCounter.type = "";
          player.elasticCounter.subType = "";
          player.action = "idle";

          // reset deflected here?
          // console.log('pause is not end. turn off elastic count',player.success.deflected.state,player.success.deflected.count,'/',player.success.deflected.limit);
        }
      }
    }
  }

  // CHECK CELL UNDER ATTACK & PRE ATTACK!!
  for (const cell of app.cellsUnderAttack) {
    if (cell.limit > 0) {
      if (cell.count < cell.limit) {
        cell.count++;
      } else if (cell.count >= cell.limit) {
        let index = app.cellsUnderAttack.indexOf(cell);
        app.cellsUnderAttack.splice(index, 1);
      }
    }
  }
  for (const cell2 of app.cellsUnderPreAttack) {
    if (cell2.limit > 0) {
      if (cell2.count < cell2.limit) {
        cell2.count++;
      } else if (cell2.count >= cell2.limit) {
        let index = app.cellsUnderPreAttack.indexOf(cell2);
        app.cellsUnderPreAttack.splice(index, 1);
      }
    }
  }

  // OBSTACLE
  // MOVING & FALLING
  // CHECK OBSTACLE/BARRIER TRAPS AND UPDATE CELL BARRIER/OBSTACLE
  for (let cell of app.gridInfo) {
    if (
      cell.obstacle.state === true &&
      cell.obstacle.moving.state === true &&
      cell.obstacle.moving.falling.state !== true
    ) {
      // console.log("tracking moving obstacle", cell.obstacle.moving.origin);

      let destCellRef = app.gridInfo.find(
        (x) =>
          x.number.x === cell.obstacle.moving.destination.number.x &&
          x.number.y === cell.obstacle.moving.destination.number.y,
      );

      let obstacleCrementObj = undefined;
      if (!destCellRef) {
        obstacleCrementObj = app.obstacleMoveCrementer(cell, {
          center: cell.obstacle.moving.destination.center,
        });
      } else {
        obstacleCrementObj = app.obstacleMoveCrementer(cell, destCellRef);
      }

      cell.obstacle.moving.nextPosition = obstacleCrementObj.pos;
      cell.obstacle.moving.step = obstacleCrementObj.step;
      nextPosition = obstacleCrementObj.pos;

      let atDestRanges = [false, false, false, false];

      let destRngIndx = undefined;
      if (
        nextPosition.x >= cell.obstacle.moving.destination.center.x - 1 &&
        nextPosition.x <= cell.obstacle.moving.destination.center.x + 1 &&
        nextPosition.y >= cell.obstacle.moving.destination.center.y - 1 &&
        nextPosition.y <= cell.obstacle.moving.destination.center.y + 1
      ) {
        atDestRanges[0] = true;
        destRngIndx = 0;
      }
      if (
        nextPosition.x === cell.obstacle.moving.destination.center.x - 0.25 &&
        nextPosition.y === cell.obstacle.moving.destination.center.y + 0.5
      ) {
        atDestRanges[1] = true;
        destRngIndx = 1;
      }
      if (
        nextPosition.x === cell.obstacle.moving.destination.center.x &&
        nextPosition.y === cell.obstacle.moving.destination.center.y
      ) {
        atDestRanges[2] = true;
        destRngIndx = 2;
      }
      if (
        nextPosition.x === cell.obstacle.moving.destination.center.x - 5 &&
        nextPosition.y === cell.obstacle.moving.destination.center.y - 5
      ) {
        atDestRanges[3] = true;
        destRngIndx = 3;
      }

      for (const el of atDestRanges) {
        if (el === true) {
          let indx = atDestRanges.indexOf(el);
          // console.log('obstacle at destination');

          if (destCellRef) {
            // console.log("obstacle at in bounds destination", cell.obstacle);

            let cell2 = cell;
            let originLevelData = cell2.levelData.split("_");
            originLevelData[1] = "*";

            let originCellRef = app.gridInfo.find(
              (x) =>
                x.number.x === cell.obstacle.moving.origin.number.x &&
                x.number.y === cell.obstacle.moving.origin.number.y,
            );
            let destCellRef = app.gridInfo.find(
              (x) =>
                x.number.x === cell.obstacle.moving.destination.number.x &&
                x.number.y === cell.obstacle.moving.destination.number.y,
            );

            if (destCellRef.void.state === true || destCellRef.terrain.type === "deep") {
              destCellRef.obstacle = {
                state: true,
                id: cell2.obstacle.id,
                trap: cell2.obstacle.trap,
                name: cell2.obstacle.name,
                type: cell2.obstacle.type,
                hp: cell2.obstacle.hp,
                destructible: cell2.obstacle.destructible,
                locked: cell2.obstacle.locked,
                weight: cell2.obstacle.weight,
                height: cell2.obstacle.height,
                items: cell2.obstacle.items,
                effects: cell2.obstacle.effects,
                moving: {
                  state: false,
                  step: 0,
                  origin: {
                    number: {
                      x: undefined,
                      y: undefined,
                    },
                    center: {
                      x: undefined,
                      y: undefined,
                    },
                  },
                  destination: {
                    number: {
                      x: undefined,
                      y: undefined,
                    },
                    center: {
                      x: undefined,
                      y: undefined,
                    },
                  },
                  currentPosition: {
                    x: undefined,
                    y: undefined,
                  },
                  nextPosition: {
                    x: destCellRef.center.x,
                    y: destCellRef.center.y,
                  },
                  moveSpeed: 0,
                  pushable: true,
                  pushed: false,
                  pusher: undefined,
                  falling: {
                    state: true,
                    count: 0,
                    limit: cell2.obstacle.moving.falling.limit,
                  },
                },
              };

              destCellRef.obstacle.moving.nextPosition.x -= app.floorImageWidth / 2;
              destCellRef.obstacle.moving.nextPosition.y -= app.floorImageHeight / 2;
            }
            if (destCellRef.void.state !== true && destCellRef.terrain.type !== "deep") {
              destCellRef.obstacle = {
                id: cell2.obstacle.id,
                trap: cell2.obstacle.trap,
                state: true,
                name: cell2.obstacle.name,
                type: cell2.obstacle.type,
                hp: cell2.obstacle.hp,
                destructible: cell2.obstacle.destructible,
                locked: cell2.obstacle.locked,
                weight: cell2.obstacle.weight,
                height: cell2.obstacle.height,
                items: cell2.obstacle.items,
                effects: cell2.obstacle.effects,
                moving: {
                  state: false,
                  step: 0,
                  origin: {
                    number: originCellRef.number,
                    center: {
                      x: undefined,
                      y: undefined,
                    },
                  },
                  destination: {
                    number: destCellRef.number,
                    center: {
                      x: undefined,
                      y: undefined,
                    },
                  },
                  currentPosition: {
                    x: undefined,
                    y: undefined,
                  },
                  nextPosition: {
                    x: undefined,
                    y: undefined,
                  },
                  moveSpeed: 0,
                  pushable: true,
                  pushed: false,
                  pusher: undefined,
                  falling: cell2.obstacle.moving.falling,
                },
              };
            }

            destCellRef.levelData = cell2.levelData;

            originCellRef.obstacle = {
              id: "",
              trap: {},
              state: false,
              name: "",
              type: "",
              hp: 0,
              destructible: {
                state: false,
                weapons: [],
                leaveRubble: false,
              },
              locked: {
                state: false,
                key: "",
              },
              weight: 1,
              height: 0.5,
              items: [],
              effects: [],
              moving: {
                state: false,
                step: 0,
                origin: {
                  number: {
                    x: undefined,
                    y: undefined,
                  },
                  center: {
                    x: undefined,
                    y: undefined,
                  },
                },
                destination: {
                  number: {
                    x: undefined,
                    y: undefined,
                  },
                  center: {
                    x: undefined,
                    y: undefined,
                  },
                },
                currentPosition: {
                  x: undefined,
                  y: undefined,
                },
                nextPosition: {
                  x: undefined,
                  y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                  state: false,
                  count: 0,
                  limit: 25,
                },
              },
            };
            originCellRef.levelData = originLevelData.join("_");

            for (const obs of app.obstacleBarrierToDestroy) {
              if (
                originCellRef.number.x === obs.cell.number.x &&
                originCellRef.number.y === obs.cell.number.y &&
                destCellRef.void.state !== true
              ) {
                app.obstacleBarrierToDestroy.push({
                  type: "obstacle",
                  action: "damage",
                  count: 0,
                  limit: 30,
                  complete: false,
                  cell: destCellRef,
                });
              }
            }

            for (const plyr of app.players) {
              if (
                plyr.currentPosition.cell.number.x === destCellRef.number.x &&
                plyr.currentPosition.cell.number.y === destCellRef.number.y
              ) {
                app.obstaclePlayerOverlap(
                  "obstacle",
                  destCellRef,
                  plyr,
                  destCellRef.obstacle,
                );
              }
            }
            app.obstacleCheckDestination(destCellRef, player);
          } else {
            // console.log('obstacle at out of bounds destination',cell.obstacle.moving.origin.center,cell.obstacle.moving.nextPosition);
            let cell2 = cell;
            let originLevelData = cell2.levelData.split("_");
            originLevelData[1] = "*";

            cell2.obstacle.moving.falling = {
              state: true,
              count: 0,
              limit: cell2.obstacle.moving.falling.limit,
            };

            cell2.obstacle.moving.nextPosition.x -= app.floorImageWidth / 2;
            cell2.obstacle.moving.nextPosition.y -= app.floorImageHeight / 2;

            app.obstaclesOutOfBoundsFall.push(cell2.obstacle);

            let originCellRef = app.gridInfo.find(
              (x) =>
                x.number.x === cell.obstacle.moving.origin.number.x &&
                x.number.y === cell.obstacle.moving.origin.number.y,
            );

            originCellRef.obstacle = {
              id: 0,
              trap: {},
              state: false,
              name: "",
              type: "",
              hp: 0,
              destructible: {
                state: false,
                weapons: [],
                leaveRubble: false,
              },
              locked: {
                state: false,
                key: "",
              },
              weight: 1,
              height: 0.5,
              items: [],
              effects: [],
              moving: {
                state: false,
                step: 0,
                origin: {
                  number: {
                    x: undefined,
                    y: undefined,
                  },
                  center: {
                    x: undefined,
                    y: undefined,
                  },
                },
                destination: {
                  number: {
                    x: undefined,
                    y: undefined,
                  },
                  center: {
                    x: undefined,
                    y: undefined,
                  },
                },
                currentPosition: {
                  x: undefined,
                  y: undefined,
                },
                nextPosition: {
                  x: undefined,
                  y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                  state: false,
                  count: 0,
                  limit: 25,
                },
              },
            };
            originCellRef.levelData = originLevelData.join("_");
          }

          break;
        }
      }

      // if (cell.obstacle.moving.step >= 1) {
      //
      // }
    }

    // step falling.count
    if (cell.obstacle.state === true && cell.obstacle.moving.falling.state === true) {
      // console.log('falling obstacle');
      if (cell.obstacle.moving.falling.count < cell.obstacle.moving.falling.limit) {
        cell.obstacle.moving.falling.count++;
        // console.log('obstacle falling in bounds a count',cell.obstacle.moving.falling.count,'position',cell.obstacle.moving.nextPosition);
      }
      if (cell.obstacle.moving.falling.count >= cell.obstacle.moving.falling.limit) {
        let cell2 = cell;
        let levelData = cell2.levelData.split("_");
        levelData[1] = "*";
        cell.levelData = levelData.join("_");
        cell.obstacle = {
          id: 0,
          trap: {},
          state: false,
          name: "",
          type: "",
          hp: 0,
          destructible: {
            state: false,
            weapons: [],
            leaveRubble: false,
          },
          locked: {
            state: false,
            key: "",
          },
          weight: 1,
          height: 0.5,
          items: [],
          effects: [],
          moving: {
            state: false,
            step: 0,
            origin: {
              number: {
                x: undefined,
                y: undefined,
              },
              center: {
                x: undefined,
                y: undefined,
              },
            },
            destination: {
              number: {
                x: undefined,
                y: undefined,
              },
              center: {
                x: undefined,
                y: undefined,
              },
            },
            currentPosition: {
              x: undefined,
              y: undefined,
            },
            nextPosition: {
              x: undefined,
              y: undefined,
            },
            moveSpeed: 0,
            pushable: true,
            pushed: false,
            pusher: undefined,
            falling: {
              state: false,
              count: 0,
              limit: 10,
            },
          },
        };
        // console.log('obstacle falling in bounds over');
      }
    }

    // CHECK OBSTACLE/BARRIER TRAPS AND UPDATE CELL BARRIER/OBSTACLE
    if (cell.obstacle.state === true) {
      if (cell.obstacle.trap?.state === true) {
        cell = app.obstacleBarrierTrapChecker(cell, "obstacle");
      }
    }
    if (cell.barrier.state === true) {
      if (cell.barrier.trap?.state === true) {
        cell = app.obstacleBarrierTrapChecker(cell, "barrier");
      }
    }
  }
  for (const elem of app.obstaclesOutOfBoundsFall) {
    if (elem.moving.falling.count < elem.moving.falling.limit) {
      elem.moving.falling.count++;
      // obstacle.moving.nextPosition.y += (obstacle.moving.falling.count*5)
      // console.log('obstacle falling out of bounds a count',elem.moving.falling.count,'position',elem.moving.nextPosition);
    }
    if (elem.moving.falling.count >= elem.moving.falling.limit) {
      // console.log('obstacle falling out of bounds over');
      let index = app.obstaclesOutOfBoundsFall.indexOf(elem);
      app.obstaclesOutOfBoundsFall.splice(index, 1);
    }
  }
  // OBSTACLE/BARRIER DAMAGE/DESTROY
  for (const cell of app.obstacleBarrierToDestroy) {
    if (cell.limit > 0) {
      if (cell.count < cell.limit) {
        cell.count++;
      } else if (cell.count >= cell.limit) {
        let index = app.obstacleBarrierToDestroy.indexOf(cell);
        app.obstacleBarrierToDestroy.splice(index, 1);
      }
    }
  }
  // HALF PUSHED BACK
  for (const halfPushBackObstacle of app.halfPushBackObstacles) {
    if (halfPushBackObstacle.state === true) {
      if (halfPushBackObstacle.countUp.state === true) {
        if (halfPushBackObstacle.countUp.count < halfPushBackObstacle.countUp.limit) {
          if (halfPushBackObstacle.countUp.count === 1) {
            // console.log("obstacle 1/2 pushback start", halfPushBackObstacle.myCellNo);
          }

          halfPushBackObstacle.countUp.count++;
          // console.log("obstacle 1/2 pushback count up", halfPushBackObstacle.countUp.count);
        }

        if (halfPushBackObstacle.countUp.count >= halfPushBackObstacle.countUp.limit) {
          halfPushBackObstacle.countUp = {
            state: false,
            count: 0,
            limit: halfPushBackObstacle.countUp.limit,
          };

          // console.log('obstacle 1/2 pushback peak');
          // app.handleHalfPushBackResult('obstacle',halfPushBackObstacle);
          halfPushBackObstacle.countDown.state = true;
        }
      }

      if (halfPushBackObstacle.countDown.state === true) {
        if (halfPushBackObstacle.countDown.count < halfPushBackObstacle.countDown.limit) {
          halfPushBackObstacle.countDown.count++;
          // console.log('obstacle 1/2 pushback count down',halfPushBackObstacle.countDown.count);
        }

        if (
          halfPushBackObstacle.countDown.count >= halfPushBackObstacle.countDown.limit
        ) {
          halfPushBackObstacle.countDown = {
            state: false,
            count: 0,
            limit: halfPushBackObstacle.countDown.limit,
          };

          // console.log("obstacle 1/2 pushback end");
          app.handleHalfPushBackResult("obstacle", halfPushBackObstacle);
          halfPushBackObstacle.state = false;
        }
      }
    }

    if (halfPushBackObstacle.state !== true) {
      let index = app.halfPushBackObstacles.indexOf(halfPushBackObstacle);
      app.halfPushBackObstacles.splice(index, 1);
    }
  }

  // OBSTACLE BARRIER DIRECTIONAL ACTION ANIMATION
  for (let elem of app.obstacleBarrierActionAnimationArray) {
    if (elem.actionDirectionType === "slash") {
      if (elem.delay.state !== true) {
        if (elem.counter.count < elem.counter.limit) {
          elem.counter.count++;
          elem = app.circleArcCrementer(
            "obstacleBarrierDirectionalAction",
            null,
            "isometric",
            elem.radius,
            elem.angle,
            elem.startAngle,
            elem.shape,
            elem.direction,
            elem.face,
            elem,
          );
        }
        if (elem.counter.count >= elem.counter.limit) {
          elem.delay.state = true;
        }
      } else {
        if (elem.delay.count < elem.delay.limit) {
          elem.delay.count++;
        }
        if (elem.delay.count >= elem.delay.limit) {
          let index = app.obstacleBarrierActionAnimationArray.findIndex((x) => {
            return x.id === elem.id;
          });
          app.obstacleBarrierActionAnimationArray.splice(index, 1);
        }
      }
    }
    if (elem.actionDirectionType === "thrust") {
      if (elem.delay.state !== true) {
        if (elem.counter.count < elem.counter.limit) {
          elem.counter.count++;
          elem = app.directionalActionAnimLineCrementer(elem.ownerType, null, elem);
        }
        if (elem.counter.count >= elem.counter.limit) {
          elem.delay.state = true;
        }
      } else {
        if (elem.delay.count < elem.delay.limit) {
          elem.delay.count++;
        }
        if (elem.delay.count >= elem.delay.limit) {
          let index = app.obstacleBarrierActionAnimationArray.findIndex((x) => {
            return x.id === elem.id;
          });
          app.obstacleBarrierActionAnimationArray.splice(index, 1);
        }
      }
    }
  }

  // ITEMS TO DROP
  // -call itemdrop crementer and set position like w/ movement
  for (const cell of app.obstacleItemsToDrop) {
    if (cell.limit > 0) {
      if (cell.count < cell.limit) {
        cell.count++;
      } else if (cell.count >= cell.limit) {
        let index = app.obstacleItemsToDrop.indexOf(cell);
        app.obstacleItemsToDrop.splice(index, 1);
      }
    }
  }

  // ITEMS FALLING/SINKING

  // STATUS DISPLAY STEPPER!!
  if (
    player.statusDisplay.state === true &&
    player.statusDisplay.count < player.statusDisplay.limit
  ) {
    // console.log('stepping status display');
    player.statusDisplay.count++;
  } else if (
    player.statusDisplay.state === true &&
    player.statusDisplay.count >= player.statusDisplay.limit
  ) {
    // console.log('hide status display');
    player.statusDisplay = {
      state: false,
      status: "",
      count: 0,
      limit: player.statusDisplay.limit,
    };
  }

  // POPUPS

  //PLAYER
  if (player.popups.length > 0) {
    for (const popup of player.popups) {
      let indx = player.popups.findIndex((x) => x === popup);
      if (popup.state === true && popup.position !== "northWest") {
        if (popup.limit > 0) {
          if (popup.state === true && popup.count < popup.limit) {
            popup.count++;
          }
          if (popup.count >= popup.limit) {
            player.popups.splice(indx, 1);
          }
        }
        if (popup.limit === 0) {
          // check if the player state it relates to is true, if not remove it
        }
      }
    }

    let currentPopupCount = player.popups.filter((x) => x.state === true).length;
    for (const popup2 of player.popups) {
      if (currentPopupCount < 8) {
        let indx = player.popups.findIndex((x) => x === popup2);
        if (popup2.state === false) {
          popup2.state = true;
          currentPopupCount++;
          // console.log('turn on new popup',popup2.msg);
        }
      } else {
        // console.log('currentPopup display full..',popup2.msg);
      }
    }
  }
  // CELL
  if (app.cellPopups.length > 0) {
    for (const popup of app.cellPopups) {
      let indx = app.cellPopups.findIndex((x) => x === popup);
      if (popup.state === true) {
        if (popup.limit > 0) {
          if (popup.state === true && popup.count < popup.limit) {
            popup.count++;
          }
          if (popup.count >= popup.limit) {
            app.cellPopups.splice(indx, 1);
          }
        }
        if (popup.limit === 0) {
          // check if the player state it relates to is true, if not remove it
        }
      }
    }

    let currentPopupCount = app.cellPopups.filter((x) => x.state === true).length;
    for (const popup2 of app.cellPopups) {
      if (currentPopupCount < 8) {
        let indx = app.cellPopups.findIndex((x) => x === popup2);
        if (popup2.state === false) {
          popup2.state = true;
          currentPopupCount++;
          // console.log('turn on new popup',popup2.msg);
        }
      } else {
        // console.log('currentPopup display full..',popup2.msg);
      }
    }
  }

  // CAMERA
  if (app.setInitZoom.state === true) {
    if (app.setInitZoom.gridWidth >= 12) {
      // if (app.setInitZoom.windowWidth < 1100) {

      if (app.camera.zoom.x - 1 >= app.zoomThresh) {
        app.camera.zoom.x -= 0.02;
        app.camera.zoom.y -= 0.02;
        app.camera.zoomDirection = "out";

        let zoom = app.camera.zoom.x;
        let diff = 1 - zoom;

        // app.camera.zoomFocusPan.x = (diff*(canvas.width/2));
        // app.camera.zoomFocusPan.y = (diff*(canvas.width/2))-(diff*(canvas.width/6));

        // TRY THESE FOR CAM SMOOTHNESS
        app.camera.zoomFocusPan.x =
          (canvas.width / 2) * (1 - zoom) + 1 + app.camera.pan.x * zoom;
        app.camera.zoomFocusPan.y =
          (canvas.height / 2) * (1 - zoom) + 1 + app.camera.pan.y * zoom;

        app.camera.mode = "zoom";
        app.setZoomPan(canvas);
        app.findFocusCell("panToCell", "", {}, canvas, context);
      }

      if (app.camera.zoom.x - 1 < app.zoomThresh) {
        app.setInitZoom.state = false;
      }

      // }
      if (app.setInitZoom.windowWidth > 1100) {
      }
    }

    if (app.setInitZoom.gridWidth < 12) {
      // if (app.setInitZoom.windowWidth < 1100) {

      if (app.camera.zoom.x - 1 >= app.zoomThresh) {
        app.camera.zoom.x -= 0.02;
        app.camera.zoom.y -= 0.02;
        // app.camera.zoomDirection = 'in';
        app.camera.zoomDirection = "out";

        let zoom = app.camera.zoom.x;
        let diff = 1 - zoom;

        // app.camera.zoomFocusPan.x = (diff*(canvas.width/2));
        // app.camera.zoomFocusPan.y = (diff*(canvas.width/2))-(diff*(canvas.width/6));

        // TRY THESE FOR CAM SMOOTHNESS
        app.camera.zoomFocusPan.x =
          (canvas.width / 2) * (1 - zoom) + 1 + app.camera.pan.x * zoom;
        app.camera.zoomFocusPan.y =
          (canvas.height / 2) * (1 - zoom) + 1 + app.camera.pan.y * zoom;

        app.camera.mode = "zoom";

        // console.log('zooming out to init',app.camera.zoom.x-1);
        // app.setCameraFocus('input',canvas, context, canvas2, context2);
        app.setZoomPan(canvas);
        app.findFocusCell("panToCell", "", {}, canvas, context);
      }

      if (app.camera.zoom.x - 1 < app.zoomThresh) {
        app.setInitZoom.state = false;
      }

      // }
    }
    // console.log('zooming out to init',app.camera.zoom.x-1);
  }
  //INPUT MODE SWITCH
  if (app.toggleCameraMode === false && app.camera.state === true) {
    app.camera.startCount = 0;
  }
  if (
    app.camera.state === false &&
    app.toggleCameraMode === false &&
    app.camera.startCount >= app.camera.startLimit &&
    app.camera.instructionType === "default"
  ) {
    // console.log('welcome to input camera mode');

    let canStart = true;
    if (
      app.camera.instructions.length > 0 ||
      app.camera.preInstructions.length > 0 ||
      app.settingAutoCamera === true ||
      app.autoCamPanWaitingForPath === true
      // app.toggleCameraMode === false
    ) {
      canStart = false;
    }
    if (app.camera.customView.state === false) {
      if (
        app.camera.zoom.x - 1 > app.zoomThresh ||
        app.camera.zoom.x - 1 < app.zoomThresh
      ) {
        canStart = false;
      }
      // if ((app.camera.zoom.x-1) > (app.zoomThresh+.01) || (app.camera.zoom.x-1) < (app.zoomThresh-.01)) {
      //   canStart = false;
      // }
      if (app.camera.pan.x < -1 || app.camera.pan.x > -1) {
        canStart = false;
      }
      if (app.camera.pan.y < -1 || app.camera.pan.y > -1) {
        canStart = false;
      }
    }

    if (canStart === true) {
      app.camera.startCount = 0;
      app.camera.state = true;
      app.camera.fixed = true;
    }
    if (canStart === false) {
      app.camera.startCount = 0;
      console.log("auto cam is probably engaged. Can't start input cam");
    }
  }
  if (app.toggleCameraMode === true) {
    let state = app.toggleCameraMode;

    if (
      app.camera.state === false &&
      state === true &&
      app.camera.startCount < app.camera.startLimit
    ) {
      // console.log('starting camera mode ...');
      app.camera.startCount++;
    }
    if (
      app.camera.state === true &&
      state === true &&
      app.camera.startCount < app.camera.startLimit
    ) {
      // console.log('leaving camera mode ...');
      app.camera.startCount++;
    }
    if (
      app.camera.state === true &&
      state === true &&
      app.camera.startCount >= app.camera.startLimit
    ) {
      // console.log('thank you for using the camera');
      app.camera.startCount = 0;
      app.camera.state = false;
      app.camera.fixed = false;

      if (
        app.camera.customView.state !== true &&
        app.settingAutoCamera === false &&
        app.camera.preInstructions.length === 0 &&
        app.camera.instructions.length === 0
        // (app.camera.zoom.x-1) > app.zoomThresh
      ) {
        app.setAutoCamera("zoomReset", player);
      }
    }
  }
  //INDICATOR COUNTER
  if (app.camera.limits.state.zoom === true || app.camera.limits.state.pan === true) {
    if (app.camera.limits.state.count < app.camera.limits.state.limit) {
      app.camera.limits.state.count++;
    }
  }
  if (app.camera.limits.state.zoom === true || app.camera.limits.state.pan === true) {
    if (app.camera.limits.state.count >= app.camera.limits.state.limit) {
      app.camera.limits.state.count = 0;
      app.camera.limits.state.zoom = false;
      app.camera.limits.state.pan = false;
    }
  }
  //INPUT MODE CONTROLS
  if (app.camera.state === true && app.camera.instructionType === "default") {
    let setFocus = false;
    let setZoomPan = false;
    let findFocusCell = false;

    // IDLE ANIM STEPPER!
    if (player.action === "idle") {
      // player.idleAnim.state = true
      if (player.idleAnim.count < player.idleAnim.limit) {
        // console.log('player.idleAnim.count',player.idleAnim.count);
        player.idleAnim.count++;
      }
      if (player.idleAnim.count >= player.idleAnim.limit) {
        player.idleAnim.count = 0;
        player.idleAnim.state = false;
      }
    } else if (player.action !== "idle") {
      // player.idleAnim.state = false;
      player.idleAnim.count = 0;
    }

    if (app.keyPressed[player.number - 1].attack === true) {
      // if mode is pan and x or y are outside threshold +/- 2, log pan value, special value = true
      app.camera.mode = "zoom";
    }
    if (app.keyPressed[player.number - 1].defend === true) {
      app.camera.mode = "pan";
    }
    if (app.keyPressed[player.number - 1].dodge === true) {
      if (
        app.camera.customView.keyPressCount.start <
        app.camera.customView.keyPressCount.limit
      ) {
        app.camera.customView.keyPressCount.start++;
      }
      if (
        app.camera.customView.keyPressCount.start >=
        app.camera.customView.keyPressCount.limit
      ) {
        app.camera.customView.keyPressCount.start = 0;
        app.toggleCameraCustomView();
      }
    }

    if (app.camera.mode === "zoom") {
      if (
        app.keyPressed[player.number - 1].north === true &&
        app.keyPressed[player.number - 1].south !== true &&
        app.camera.zoom.x < app.camera.limits.zoom.max
      ) {
        app.camera.zoom.x += 0.02;
        app.camera.zoom.y += 0.02;
        app.camera.zoomDirection = "in";
        setFocus = true;
        setZoomPan = true;

        // console.log('zooming in',app.camera.zoom.x);
      }
      if (
        app.keyPressed[player.number - 1].north === true &&
        app.camera.zoom.x >= app.camera.limits.zoom.max
      ) {
        app.camera.limits.state.zoom = true;
        // console.log('zoom in limit',app.camera.limits.state.zoom);
      }
      if (
        app.keyPressed[player.number - 1].south === true &&
        app.keyPressed[player.number - 1].north !== true &&
        app.camera.zoom.x > app.camera.limits.zoom.min
      ) {
        app.camera.zoom.x -= 0.02;
        app.camera.zoom.y -= 0.02;
        app.camera.zoomDirection = "out";
        setFocus = true;
        setZoomPan = true;

        // console.log('zooming out',app.camera.zoom.x);
      }
      if (
        app.keyPressed[player.number - 1].south === true &&
        app.camera.zoom.x <= app.camera.limits.zoom.min
      ) {
        // console.log('zoom out limit');
        app.camera.limits.state.zoom = true;
      }
    }

    if (app.camera.mode === "pan") {
      // ONLY PAN IF CANT SEE WHOLE MAP
      let canPan = false;

      if (app.gridWidth >= 12) {
        // if (app.camera.zoom.x > .8) {
        if (app.camera.zoom.x - 1 > app.zoomThresh) {
          canPan = true;
        }
      } else {
        if (app.camera.zoom.x - 1 > app.zoomThresh) {
          canPan = true;
        }
      }

      if (canPan === true) {
        // console.log('canPan',canPan);

        if (
          app.keyPressed[player.number - 1].north === true &&
          app.keyPressed[player.number - 1].south !== true &&
          app.keyPressed[player.number - 1].east !== true &&
          app.keyPressed[player.number - 1].west !== true &&
          app.camera.pan.y < app.camera.limits.pan.y.max
        ) {
          app.camera.pan.y += 10;
          app.camera.adjustedPan.y += 10 * app.camera.zoom.x;
          app.camera.panDirection = "north";
          setFocus = true;
          setZoomPan = true;
          findFocusCell = true;

          // console.log('input panning north',app.camera.pan.y);
        }
        if (
          app.keyPressed[player.number - 1].north === true &&
          app.camera.pan.y >= app.camera.limits.pan.y.max
        ) {
          // console.log('pan limit north',app.camera.pan.y,'/',app.camera.limits.pan.y.max);
          app.camera.limits.state.pan = true;
        }
        if (
          app.keyPressed[player.number - 1].south === true &&
          app.keyPressed[player.number - 1].north !== true &&
          app.keyPressed[player.number - 1].west !== true &&
          app.keyPressed[player.number - 1].east !== true &&
          app.camera.pan.y > app.camera.limits.pan.y.min
        ) {
          app.camera.pan.y -= 10;
          app.camera.adjustedPan.y -= 10 * app.camera.zoom.x;
          app.camera.panDirection = "south";
          setFocus = true;
          setZoomPan = true;
          findFocusCell = true;

          // console.log('input panning south',app.camera.pan.y);
        }
        if (
          app.keyPressed[player.number - 1].south === true &&
          app.camera.pan.y <= app.camera.limits.pan.y.min
        ) {
          // console.log('pan limit south',app.camera.pan.y,'/',app.camera.limits.pan.y.min);
          app.camera.limits.state.pan = true;
        }
        if (
          app.keyPressed[player.number - 1].east === true &&
          app.keyPressed[player.number - 1].west !== true &&
          app.keyPressed[player.number - 1].north !== true &&
          app.keyPressed[player.number - 1].south !== true &&
          app.camera.pan.x > app.camera.limits.pan.x.min
        ) {
          app.camera.pan.x -= 10;
          app.camera.adjustedPan.x -= 10 * app.camera.zoom.x;
          app.camera.panDirection = "east";
          setFocus = true;
          setZoomPan = true;
          findFocusCell = true;

          // console.log('input panning east',app.camera.pan.x);
        }
        if (
          app.keyPressed[player.number - 1].east === true &&
          app.camera.pan.x <= app.camera.limits.pan.x.min
        ) {
          // console.log('pan limit east',app.camera.pan.x,'/',app.camera.limits.pan.x.min);
          app.camera.limits.state.pan = true;
        }
        if (
          app.keyPressed[player.number - 1].west === true &&
          app.keyPressed[player.number - 1].east !== true &&
          app.keyPressed[player.number - 1].north !== true &&
          app.keyPressed[player.number - 1].south !== true &&
          app.camera.pan.x < app.camera.limits.pan.x.max
        ) {
          app.camera.pan.x += 10;
          app.camera.adjustedPan.x += 10 * app.camera.zoom.x;
          app.camera.panDirection = "west";
          setFocus = true;
          setZoomPan = true;
          findFocusCell = true;

          // console.log('input panning west',app.camera.pan.x);
        }
        if (
          app.keyPressed[player.number - 1].west === true &&
          app.camera.pan.x >= app.camera.limits.pan.x.max
        ) {
          // console.log('pan limit west',app.camera.pan.x,'/',app.camera.limits.pan.x.max);
          app.camera.limits.state.pan = true;
        }
      } else {
        // console.log('cant pan at this zoom');
        // app.camera.limits.state.pan = true;

        if (
          app.keyPressed[player.number - 1].north === true ||
          app.keyPressed[player.number - 1].south === true ||
          app.keyPressed[player.number - 1].east === true ||
          app.keyPressed[player.number - 1].west === true
        ) {
          app.camera.limits.state.pan = true;
        }
      }
    }

    // ADJUST PAN WHEN ZOOMING TO KEEP CENTERED
    if (setZoomPan === true) {
      app.setZoomPan(canvas);
      findFocusCell = true;
    }

    //SET CAMERA FOCUS
    if (setFocus === true) {
      // app.setCameraFocus('input',canvas, context, canvas2, context2);
    }

    if (findFocusCell) {
      app.findFocusCell("panToCell", "", {}, canvas, context);
    }
  }
  // RESET
  if (app.resetCameraSwitch === true) {
    // console.log('resetting camera');

    app.resetCameraSwitch = false;
    app.camera = {
      state: true,
      startCount: 0,
      startLimit: 4,
      mode: "pan",
      fixed: false,
      target: {
        type: "player",
        plyrNo: 1,
        cell: {
          x: undefined,
          y: undefined,
        },
      },
      focus: {
        x: undefined,
        y: undefined,
      },
      focusCell: {
        x: app.camera.focusCell.x,
        y: app.camera.focusCell.y,
      },
      cellToPanOrigin: {
        x: undefined,
        y: undefined,
      },
      zoom: {
        x: 1,
        y: 1,
      },
      zoomDirection: "in",
      pan: {
        x: 1,
        y: 1,
      },
      panDirection: "east",
      zoomFocusPan: {
        x: -1,
        y: -1,
      },
      adjustedPan: {
        x: 1,
        y: 1,
      },
      limits: {
        zoom: {
          min: 0.5,
          max: 2.5,
        },
        pan: {
          x: {
            min: -400,
            max: 400,
          },
          y: {
            min: -200,
            max: 200,
          },
        },
        state: {
          count: 0,
          limit: 10,
          zoom: false,
          pan: false,
        },
      },
      instructionType: "default",
      currentPreInstruction: 0,
      preInstructions: [],
      currentInstruction: 0,
      instructions: [],
      customView: {
        state: false,
        zoom: 0,
        pan: {
          x: 0,
          y: 0,
        },
        keyPressCount: {
          start: 0,
          limit: 4,
        },
      },
    };

    app.setZoomPan(canvas);

    // app.setCameraFocus('reset', canvas, context, canvas2, context2);
  }
  // AUTO CAMERA
  if (app.camera.state !== true && app.camera.fixed !== true) {
    if (app.camera.instructionType === "default") {
      // PRE/RAW INSTRUCTIONS!!
      if (
        app.camera.preInstructions.length > 0 &&
        app.camera.instructions.length === 0 &&
        app.autoCamPanWaitingForPath !== true
      ) {
        // console.log('step through auto camera pre instructions',app.camera.preInstructions);

        let preInstruction = app.camera.preInstructions[app.camera.currentPreInstruction];
        // let indx = app.camera.preInstructions.indexOf(preInstruction)
        let focusCell = {
          x: undefined,
          y: undefined,
        };
        // console.log('Step through pre instructions...','preInstructions',preInstruction);

        let speed = null;
        switch (preInstruction.split("_")[0]) {
          case "moveTo":
            speed = preInstruction.split("_")[3];
            if (
              preInstruction.split("_")[0] === "moveTo" &&
              app.autoCamPanWaitingForPath !== true
            ) {
              app.autoCamPanWaitingForPath = true;
              focusCell.x = parseInt(preInstruction.split("_")[1]);
              focusCell.y = parseInt(preInstruction.split("_")[2]);

              app.findFocusCell("cellToPan", "moveTo", focusCell, canvas, context, speed);
            }
            break;
          case "zoom":
            if (preInstruction.split("_")[1] === "outToInit") {
              let zoomSteps = ((app.camera.zoom.x - 1 - app.zoomThresh) / 0.02).toFixed(
                0,
              );
              zoomSteps = parseInt(zoomSteps);
              if (zoomSteps === 0) {
                zoomSteps = 1;
              }
              if (zoomSteps < 0) {
                zoomSteps = zoomSteps * -1;
              }

              app.camera.instructions.push({
                action: "zoom_out_" + zoomSteps,
                // action:'zoom_outToInit',
                action2: "",
                count: 0,
                count2: 0,
                limit: zoomSteps,
                // limit: 1,
                limit2: 0,
                speed: "",
              });
            }
            if (preInstruction.split("_")[1] === "inToInit") {
              let zoomSteps = ((app.zoomThresh - (app.camera.zoom.x - 1)) / 0.02).toFixed(
                0,
              );
              zoomSteps = parseInt(zoomSteps);
              if (zoomSteps === 0) {
                zoomSteps = 1;
              }
              if (zoomSteps < 0) {
                zoomSteps = zoomSteps * -1;
              }

              app.camera.instructions.push({
                action: "zoom_in_" + zoomSteps,
                // action:'zoom_outToInit',
                action2: "",
                count: 0,
                count2: 0,
                limit: zoomSteps,
                // limit: 1,
                limit2: 0,
                speed: "",
              });
            } else if (
              preInstruction.split("_")[1] !== "inToInit" &&
              preInstruction.split("_")[1] !== "outToInit"
            ) {
              app.camera.instructions.push({
                action: "zoom_" + preInstruction.split("_")[1],
                action2: "",
                count: 0,
                count2: 0,
                limit: parseInt(preInstruction.split("_")[2]),
                limit2: 0,
                speed: "",
              });
            }

            break;
          case "waitFor":
            app.camera.instructions.push({
              action: "wait",
              action2: "",
              count: 0,
              count2: 0,
              limit: parseInt(preInstruction.split("_")[1]),
              limit2: 0,
              speed: "",
            });

            break;
          case "move&&zoom":
            speed = preInstruction.split("_")[4];
            if (app.autoCamPanWaitingForPath !== true) {
              app.autoCamPanWaitingForPath = true;
              focusCell.x = parseInt(preInstruction.split("_")[2]);
              focusCell.y = parseInt(preInstruction.split("_")[3]);

              app.findFocusCell(
                "cellToPan",
                "move&&zoom_" +
                  preInstruction.split("_")[1] +
                  "_" +
                  preInstruction.split("_")[5],
                focusCell,
                canvas,
                context,
                speed,
              );
            }

            break;
        }

        if (app.camera.currentPreInstruction === app.camera.preInstructions.length - 1) {
          // console.log("this is the last preInstruction. Empty array");
          app.camera.preInstructions = [];
          app.camera.currentPreInstruction = 0;
          // console.log('camera instructions',app.camera.instructions);
        } else {
          app.camera.currentPreInstruction++;
        }

        // console.log("auto camera: pre instruction parsed: ", app.camera.instructions);
      }

      const increment = (mode, direction) => {
        if (mode === "zoom") {
          app.camera.mode = "zoom";

          switch (direction) {
            case "in":
              if (app.camera.zoom.x >= app.camera.limits.zoom.max) {
                app.camera.limits.state.zoom = true;
                // console.log('auto cam zoom in limit fast',app.camera.zoom.x,'/',app.camera.limits.zoom.max,app.camera.instructions[app.camera.currentInstruction].count);
              } else {
                app.camera.zoom.x += 0.02;
                app.camera.zoom.y += 0.02;
                app.camera.zoomDirection = "in";
                // console.log('auto cam zooming in fast ',app.camera.instructions[app.camera.currentInstruction].count);
              }
              break;
            case "out":
              if (app.camera.zoom.x <= app.camera.limits.zoom.min) {
                app.camera.limits.state.zoom = true;
                // console.log('auto cam zoom in limit fast ',app.camera.zoom.x,'/',app.camera.limits.zoom.min,app.camera.instructions[app.camera.currentInstruction].count);
              } else {
                app.camera.zoom.x -= 0.02;
                app.camera.zoom.y -= 0.02;
                app.camera.zoomDirection = "out";
                // console.log('auto cam zooming out fast ',app.camera.instructions[app.camera.currentInstruction].count);
              }
              break;
            case "outToInit":
              // app.setInitZoom.state = true;
              if (app.setInitZoom.state !== true) {
                app.setInitZoom = {
                  state: true,
                  windowWidth: window.innerWidth,
                  gridWidth: app.gridWidth,
                };
              }

              break;
          }

          app.setZoomPan(canvas);
          app.findFocusCell("panToCell", "", {}, canvas, context);
        }
        if (mode === "pan") {
          app.camera.mode = "pan";

          switch (direction) {
            case "north":
              if (app.camera.pan.y >= app.camera.limits.pan.y.max) {
                // console.log('auto cam pan limit north fast ',app.camera.pan.y,'/',app.camera.limits.pan.y.max,app.camera.instructions[app.camera.currentInstruction].count);
                app.camera.limits.state.pan = true;
              } else {
                app.camera.pan.y += 1;
                app.camera.adjustedPan.y += 1 * app.camera.zoom.x;
                app.camera.panDirection = "north";
                // console.log('auto cam panning north fast ',app.camera.instructions[app.camera.currentInstruction].count)
              }
              break;
            case "south":
              if (app.camera.pan.y <= app.camera.limits.pan.y.min) {
                // console.log('auto cam pan limit south fast ',app.camera.pan.y,'/',app.camera.limits.pan.y.min,app.camera.instructions[app.camera.currentInstruction].count);
                app.camera.limits.state.pan = true;
              } else {
                app.camera.pan.y -= 1;
                app.camera.adjustedPan.y -= 1 * app.camera.zoom.x;
                app.camera.panDirection = "south";
                // console.log('auto cam panning south fast ',app.camera.instructions[app.camera.currentInstruction].count)
              }
              break;
            case "east":
              if (app.camera.pan.x <= app.camera.limits.pan.x.min) {
                // console.log('auto cam pan limit east fast ',app.camera.pan.x,'/',app.camera.limits.pan.x.min,app.camera.instructions[app.camera.currentInstruction].count);
                app.camera.limits.state.pan = true;
              } else {
                app.camera.pan.x -= 1;
                app.camera.adjustedPan.x -= 1 * app.camera.zoom.x;
                app.camera.panDirection = "east";
                // console.log('auto cam panning east fast ',app.camera.instructions[app.camera.currentInstruction].count)
              }
              break;
            case "west":
              if (
                app.keyPressed[player.number - 1].west === true &&
                app.camera.pan.x >= app.camera.limits.pan.x.max
              ) {
                // console.log('auto cam pan limit west fast ',app.camera.pan.x,'/',app.camera.limits.pan.x.max,app.camera.instructions[app.camera.currentInstruction].count);
                app.camera.limits.state.pan = true;
              } else {
                app.camera.pan.x += 1;
                app.camera.adjustedPan.x += 1 * app.camera.zoom.x;
                app.camera.panDirection = "west";
                // console.log('auto cam panning west fast ',app.camera.instructions[app.camera.currentInstruction].count)
              }
              break;
          }

          app.setZoomPan(canvas);
          app.findFocusCell("panToCell", "", {}, canvas, context);
        }
      };

      // PARSED INSTRUCTIONS!
      let secondaryAction = false;
      let tertiaryAction = false;
      let currentInstruction = app.camera.instructions[app.camera.currentInstruction];
      if (
        app.camera.instructions.length > 0 &&
        app.camera.currentInstruction < app.camera.instructions.length
      ) {
        // console.log(app.camera.zoom.x-1,'auto camera: stepping through all instructions... current',app.camera.currentInstruction,app.camera.instructions[app.camera.currentInstruction]);

        if (app.camera.instructions[app.camera.currentInstruction]) {
          if (app.camera.instructions[app.camera.currentInstruction].action !== "") {
            if (
              app.camera.instructions[app.camera.currentInstruction].count <
              app.camera.instructions[app.camera.currentInstruction].limit
            ) {
              if (
                app.camera.instructions[app.camera.currentInstruction].action === "wait"
              ) {
                // waiting/ do nothing
                // console.log('waiting',app.camera.instructions[app.camera.currentInstruction].count);
                app.camera.instructions[app.camera.currentInstruction].count++;
              } else {
                if (
                  app.camera.instructions[app.camera.currentInstruction].speed === "fast"
                ) {
                  for (
                    var i = 0;
                    i < app.camera.instructions[app.camera.currentInstruction].limit;
                    i++
                  ) {
                    if (
                      app.camera.instructions[app.camera.currentInstruction].action.split(
                        "_",
                      )[0] === "zoom"
                    ) {
                      // console.log('fast zooming ',app.camera.instructions[app.camera.currentInstruction].action.split("_")[1],' primary. coount:  ',app.camera.instructions[app.camera.currentInstruction].count);

                      increment(
                        "zoom",
                        app.camera.instructions[
                          app.camera.currentInstruction
                        ].action.split("_")[1],
                      );

                      if (
                        app.camera.instructions[app.camera.currentInstruction].action2 !==
                          "" &&
                        app.camera.instructions[app.camera.currentInstruction].count2 <
                          app.camera.instructions[app.camera.currentInstruction].limit2
                      ) {
                        secondaryAction = true;
                        if (
                          app.camera.instructions[
                            app.camera.currentInstruction
                          ].action2.split("_")[0] === "zoom"
                        ) {
                          increment(
                            "zoom",
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action2.split("_")[1],
                          );
                        }
                        if (
                          app.camera.instructions[
                            app.camera.currentInstruction
                          ].action2.split("_")[0] === "pan"
                        ) {
                          if (
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action.split("_")[0] === "pan"
                          ) {
                            for (let index = 0; index < 2; index++) {
                              // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                              increment(
                                "pan",
                                app.camera.instructions[
                                  app.camera.currentInstruction
                                ].action2.split("_")[1],
                              );
                            }
                          } else {
                            increment(
                              "pan",
                              app.camera.instructions[
                                app.camera.currentInstruction
                              ].action2.split("_")[1],
                            );
                          }
                        }
                      }

                      if (
                        app.camera.instructions[app.camera.currentInstruction].action3
                      ) {
                        if (
                          app.camera.instructions[app.camera.currentInstruction]
                            .action3 !== "" &&
                          app.camera.instructions[app.camera.currentInstruction].count3 <
                            app.camera.instructions[app.camera.currentInstruction].limit3
                        ) {
                          tertiaryAction = true;
                          if (
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action3.split("_")[0] === "zoom"
                          ) {
                            increment(
                              "zoom",
                              app.camera.instructions[
                                app.camera.currentInstruction
                              ].action3.split("_")[1],
                            );
                          }
                          if (
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action3.split("_")[0] === "pan"
                          ) {
                            if (
                              app.camera.instructions[
                                app.camera.currentInstruction
                              ].action2.split("_")[0] === "pan"
                            ) {
                              for (let index = 0; index < 2; index++) {
                                // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                                increment(
                                  "pan",
                                  app.camera.instructions[
                                    app.camera.currentInstruction
                                  ].action3.split("_")[1],
                                );
                              }
                            } else {
                              increment(
                                "pan",
                                app.camera.instructions[
                                  app.camera.currentInstruction
                                ].action3.split("_")[1],
                              );
                            }
                          }
                        }
                      }
                    }

                    if (
                      app.camera.instructions[app.camera.currentInstruction].action.split(
                        "_",
                      )[0] === "pan"
                    ) {
                      // console.log('fast panning ',app.camera.instructions[app.camera.currentInstruction].action.split("_")[1],' primary. count: ',app.camera.instructions[app.camera.currentInstruction].count);

                      increment(
                        "pan",
                        app.camera.instructions[
                          app.camera.currentInstruction
                        ].action.split("_")[1],
                      );

                      if (
                        app.camera.instructions[app.camera.currentInstruction].action2 !==
                          "" &&
                        app.camera.instructions[app.camera.currentInstruction].count2 <
                          app.camera.instructions[app.camera.currentInstruction].limit2
                      ) {
                        secondaryAction = true;
                        if (
                          app.camera.instructions[
                            app.camera.currentInstruction
                          ].action2.split("_")[0] === "zoom"
                        ) {
                          increment(
                            "zoom",
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action2.split("_")[1],
                          );
                        }
                        if (
                          app.camera.instructions[
                            app.camera.currentInstruction
                          ].action2.split("_")[0] === "pan"
                        ) {
                          if (
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action.split("_")[0] === "pan"
                          ) {
                            for (let index = 0; index < 2; index++) {
                              // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                              increment(
                                "pan",
                                app.camera.instructions[
                                  app.camera.currentInstruction
                                ].action2.split("_")[1],
                              );
                            }
                          } else {
                            increment(
                              "pan",
                              app.camera.instructions[
                                app.camera.currentInstruction
                              ].action2.split("_")[1],
                            );
                          }
                        }
                      }

                      if (
                        app.camera.instructions[app.camera.currentInstruction].action3
                      ) {
                        if (
                          app.camera.instructions[app.camera.currentInstruction]
                            .action3 !== "" &&
                          app.camera.instructions[app.camera.currentInstruction].count3 <
                            app.camera.instructions[app.camera.currentInstruction].limit3
                        ) {
                          tertiaryAction = true;
                          if (
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action3.split("_")[0] === "zoom"
                          ) {
                            increment(
                              "zoom",
                              app.camera.instructions[
                                app.camera.currentInstruction
                              ].action3.split("_")[1],
                            );
                          }
                          if (
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action3.split("_")[0] === "pan"
                          ) {
                            if (
                              app.camera.instructions[
                                app.camera.currentInstruction
                              ].action2.split("_")[0] === "pan"
                            ) {
                              for (let index = 0; index < 2; index++) {
                                // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                                increment(
                                  "pan",
                                  app.camera.instructions[
                                    app.camera.currentInstruction
                                  ].action3.split("_")[1],
                                );
                              }
                            } else {
                              increment(
                                "pan",
                                app.camera.instructions[
                                  app.camera.currentInstruction
                                ].action3.split("_")[1],
                              );
                            }
                          }
                        }
                      }
                    }

                    app.camera.instructions[app.camera.currentInstruction].count++;
                    // console.log('1a');
                    if (secondaryAction === true) {
                      app.camera.instructions[app.camera.currentInstruction].count2++;
                    }
                    if (tertiaryAction === true) {
                      app.camera.instructions[app.camera.currentInstruction].count3++;
                    }
                  }
                } else {
                  if (
                    app.camera.instructions[app.camera.currentInstruction].action.split(
                      "_",
                    )[0] === "zoom"
                  ) {
                    // console.log('slow zooming ',app.camera.instructions[app.camera.currentInstruction].action.split("_")[1],' primary. count: ',app.camera.instructions[app.camera.currentInstruction].count);

                    increment(
                      "zoom",
                      app.camera.instructions[app.camera.currentInstruction].action.split(
                        "_",
                      )[1],
                    );

                    if (
                      app.camera.instructions[app.camera.currentInstruction].action2 !==
                        "" &&
                      app.camera.instructions[app.camera.currentInstruction].count2 <
                        app.camera.instructions[app.camera.currentInstruction].limit2
                    ) {
                      secondaryAction = true;
                      if (
                        app.camera.instructions[
                          app.camera.currentInstruction
                        ].action2.split("_")[0] === "zoom"
                      ) {
                        increment(
                          "zoom",
                          app.camera.instructions[
                            app.camera.currentInstruction
                          ].action2.split("_")[1],
                        );
                      }
                      if (
                        app.camera.instructions[
                          app.camera.currentInstruction
                        ].action2.split("_")[0] === "pan"
                      ) {
                        if (
                          app.camera.instructions[
                            app.camera.currentInstruction
                          ].action.split("_")[0] === "pan"
                        ) {
                          for (let index = 0; index < 2; index++) {
                            // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                            increment(
                              "pan",
                              app.camera.instructions[
                                app.camera.currentInstruction
                              ].action2.split("_")[1],
                            );
                          }
                        } else {
                          increment(
                            "pan",
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action2.split("_")[1],
                          );
                        }
                      }
                    }

                    if (app.camera.instructions[app.camera.currentInstruction].action3) {
                      if (
                        app.camera.instructions[app.camera.currentInstruction].action3 !==
                          "" &&
                        app.camera.instructions[app.camera.currentInstruction].count3 <
                          app.camera.instructions[app.camera.currentInstruction].limit3
                      ) {
                        tertiaryAction = true;
                        if (
                          app.camera.instructions[
                            app.camera.currentInstruction
                          ].action3.split("_")[0] === "zoom"
                        ) {
                          increment(
                            "zoom",
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action3.split("_")[1],
                          );
                        }
                        if (
                          app.camera.instructions[
                            app.camera.currentInstruction
                          ].action3.split("_")[0] === "pan"
                        ) {
                          if (
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action2.split("_")[0] === "pan"
                          ) {
                            for (let index = 0; index < 2; index++) {
                              // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                              increment(
                                "pan",
                                app.camera.instructions[
                                  app.camera.currentInstruction
                                ].action3.split("_")[1],
                              );
                            }
                          } else {
                            increment(
                              "pan",
                              app.camera.instructions[
                                app.camera.currentInstruction
                              ].action3.split("_")[1],
                            );
                          }
                        }
                      }
                    }
                  }

                  if (
                    app.camera.instructions[app.camera.currentInstruction].action.split(
                      "_",
                    )[0] === "pan"
                  ) {
                    // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action.split("_")[1],' primary. count: ',app.camera.instructions[app.camera.currentInstruction].count);

                    increment(
                      "pan",
                      app.camera.instructions[app.camera.currentInstruction].action.split(
                        "_",
                      )[1],
                    );

                    if (
                      app.camera.instructions[app.camera.currentInstruction].action2 !==
                        "" &&
                      app.camera.instructions[app.camera.currentInstruction].count2 <
                        app.camera.instructions[app.camera.currentInstruction].limit2
                    ) {
                      secondaryAction = true;
                      if (
                        app.camera.instructions[
                          app.camera.currentInstruction
                        ].action2.split("_")[0] === "zoom"
                      ) {
                        increment(
                          "zoom",
                          app.camera.instructions[
                            app.camera.currentInstruction
                          ].action2.split("_")[1],
                        );
                      }
                      if (
                        app.camera.instructions[
                          app.camera.currentInstruction
                        ].action2.split("_")[0] === "pan"
                      ) {
                        if (
                          app.camera.instructions[
                            app.camera.currentInstruction
                          ].action.split("_")[0] === "pan"
                        ) {
                          for (let index = 0; index < 2; index++) {
                            // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                            increment(
                              "pan",
                              app.camera.instructions[
                                app.camera.currentInstruction
                              ].action2.split("_")[1],
                            );
                          }
                        } else {
                          increment(
                            "pan",
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action2.split("_")[1],
                          );
                        }
                      }
                    }

                    if (app.camera.instructions[app.camera.currentInstruction].action3) {
                      if (
                        app.camera.instructions[app.camera.currentInstruction].action3 !==
                          "" &&
                        app.camera.instructions[app.camera.currentInstruction].count3 <
                          app.camera.instructions[app.camera.currentInstruction].limit3
                      ) {
                        tertiaryAction = true;
                        if (
                          app.camera.instructions[
                            app.camera.currentInstruction
                          ].action3.split("_")[0] === "zoom"
                        ) {
                          increment(
                            "zoom",
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action3.split("_")[1],
                          );
                        }
                        if (
                          app.camera.instructions[
                            app.camera.currentInstruction
                          ].action3.split("_")[0] === "pan"
                        ) {
                          if (
                            app.camera.instructions[
                              app.camera.currentInstruction
                            ].action2.split("_")[0] === "pan"
                          ) {
                            for (let index = 0; index < 2; index++) {
                              // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                              increment(
                                "pan",
                                app.camera.instructions[
                                  app.camera.currentInstruction
                                ].action3.split("_")[1],
                              );
                            }
                          } else {
                            increment(
                              "pan",
                              app.camera.instructions[
                                app.camera.currentInstruction
                              ].action3.split("_")[1],
                            );
                          }
                        }
                      }
                    }
                  }

                  app.camera.instructions[app.camera.currentInstruction].count++;
                  // console.log('1b');
                  if (secondaryAction === true) {
                    app.camera.instructions[app.camera.currentInstruction].count2++;
                  }
                  if (tertiaryAction === true) {
                    app.camera.instructions[app.camera.currentInstruction].count3++;
                  }
                }
              }
            } else {
              if (secondaryAction === true) {
                // if (app.camera.instructions[app.camera.currentInstruction].count >= app.camera.instructions[app.camera.currentInstruction].limit) {
                //   // app.camera.currentInstruction++;
                //     console.log('finished primary instruction w/ secondary');
                // }
                // if (app.camera.instructions[app.camera.currentInstruction].count2 >= app.camera.instructions[app.camera.currentInstruction].limit2) {
                //     app.camera.currentInstruction++;
                //     console.log('finished secondary instruction');
                //     // secondaryAction = false;
                //     // continueSecondary = true;
                // }
              } else {
                if (
                  app.camera.instructions[app.camera.currentInstruction].count >=
                  app.camera.instructions[app.camera.currentInstruction].limit
                ) {
                  app.camera.currentInstruction++;
                  // console.log("finished primary instruction only");
                }
              }
            }
          }
        }

        // FINISHED CAMERA INSTRUCTIONS
        if (app.camera.currentInstruction >= app.camera.instructions.length) {
          app.camera.instructions = [];
          app.camera.currentInstruction = 0;
          app.settingAutoCamera = false;
          // console.log("finished auto camera instructions");
        }
      }
    }

    if (app.camera.instructionType === "story") {
      // if there are nstructions, execute and step instructions.count, remove from array
      //
      // use a cameraInstructionRef to adjust the camera values accordingly, and push to app.camera.instructions
      //
      // if this is the last instruction, set the instructionType back to default
    }
  }

  // MENU

  if (player.ai.state !== true && app.keyPressed[player.number - 1].playerMenu === true) {
    // toggle the menu here
  }

  // // CHECK PROJECTILES!!
  app.projectileTracker();

  // ADD COM PLAYER!
  if (app.addAiPlayerKeyPress === true) {
    // app.addAiRandomPlayer('random')
    // app.addAiRandomPlayer('pursue')
    // app.addAiRandomPlayer('patrol')
    // app.addAiRandomPlayer('defend')
    app.addAiPlayer();
  }
  if (app.addAiCount.state === true) {
    if (app.addAiCount.count < app.addAiCount.limit) {
      app.addAiCount.count++;
    }
    if (app.addAiCount.count >= app.addAiCount.limit) {
      app.addAiCount = {
        state: false,
        count: 0,
        limit: app.addAiCount.limit,
      };
    }
  }

  // SYNC W/ GLOBAL PLAYER DATA
  app.players[player.number - 1] = player;

  // AI EVALUATE
  if (player.ai.state === true) {
    app.aiEvaluate(player);
  }

  // DRAW EVERYTHING
  //   app.drawPlayerStep(player.number, canvas, context, canvas2, context2);
  drawPlayerStep(app, player.number, canvas, context, canvas2, context2);
}
