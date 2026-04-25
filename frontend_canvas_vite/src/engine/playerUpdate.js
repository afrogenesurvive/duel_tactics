import { drawPlayerStep } from "./drawPlayerStep";
import { checkTests } from "./playerUpdate/checkTests";
import { checkDeflection } from "./playerUpdate/checkDefelection";
import { checkStamina } from "./playerUpdate/checkStamina";
import { checkVoid } from "./playerUpdate/checkVoid";
import { checkMoveCancel } from "./playerUpdate/player_action/checkMoveCancel";
import { checkCellMouseOver } from "./playerUpdate/checkCellMouseOver";
import { checkCamera } from "./playerUpdate/checkCamera";
import { checkPopups } from "./playerUpdate/checkPopups";
import { checkObstacleBarrier } from "./playerUpdate/checkObstacleBarrier";
import { checkDeflectionElasticCounter } from "./playerUpdate/checkDeflectionElasticCounter";
import { checkMoveProgress } from "./playerUpdate/player_action/checkMoveProgress";
import { checkDashing } from "./playerUpdate/player_action/checkDashing";
import { checkFeintsCancels } from "./playerUpdate/player_action/checkFeintsCancels";
import { checkDodge } from "./playerUpdate/player_action/checkDodge";
import { checkElasticCounter } from "./playerUpdate/checkElasticCounter";
import { checkHalfCompletePushback } from "./playerUpdate/checkHalfCompletePushback";
import { checkAttacking } from "./playerUpdate/player_action/checkAttacking";
import { checkDefending } from "./playerUpdate/player_action/checkDefending";
import { checkFlanking } from "./playerUpdate/player_action/checkFlanking";
import { checkMoveInput } from "./playerUpdate/input/checkMoveInput";
import { checkNonMoveInput } from "./playerUpdate/input/checkNonMoveInput";
import { checkPlayerGear } from "./playerUpdate/player_action/checkPlayerGear";

export function playerUpdate(app, player, canvas, context, canvas2, context2, canvas3, context3) {
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
      if (key !== "east" && key !== "west" && key !== "east" && key !== "west" && value === true) {
        // console.log('pressed2',key,'plyr',player.number);
      }
    }
  }

  let nextPosition;

  // TESTING
  checkTests(app, player);

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

  checkVoid(app, player);

  // STAMINA!!
  checkStamina(app, player);

  // CHECK AND SET DEFLECTION!!
  checkDeflection(app, player);

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
  checkCellMouseOver(app);
  app.mouseMoving = false;

  // DEFLECTED PLAYER CAN'T DO ANYTHING!!
  if (player.success.deflected.state === false && player.dead.state !== true && app.camera.state !== true) {
    // AI STRAFE SWITCH ON!!
    if (player.ai.state === true && app.keyPressed[player.number - 1]) {
      if (app.keyPressed[player.number - 1].strafe === true) {
        app.players[player.number - 1].strafing.state = true;
      }
    }

    // MOVE CANCEL/RETURN
    if (player.dashing.state !== true && player.dashing.postDash.state !== true) {
      checkMoveCancel(app, player, nextPosition);
    }

    // DON'T READ INPUTS. JUST MOVE!!
    // if player.moving.state === true
    if (player.dashing.state === true || player.dashing.postDash.state === true) {
      nextPosition = checkDashing(app, player, keyPressedDirection, nextPosition);
    } else {
      checkMoveProgress(app, player, nextPosition);
    }

    // CAN READ INPUTS
    if (player.moving.state === false) {
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
              playerBPushDir2 = ["north", "south", "east", "west"].filter((x) => x !== playerAPushDir2)[0];
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
                if (
                  elem.ownerType === "player" &&
                  elem.action === "attacking" &&
                  player.attacking.peak === false &&
                  player.attacking.chargeCount > 0
                ) {
                  // console.log("player attack charging/held. Do nothing");
                } else {
                  player.actionDirectionAnimationArray.splice(index, 1);
                }
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
                if (
                  elem.ownerType === "player" &&
                  elem.action === "attacking" &&
                  player.attacking.peak === false &&
                  player.attacking.chargeCount > 0
                ) {
                  // console.log("player attack charging/held. Do nothing");
                } else {
                  player.actionDirectionAnimationArray.splice(index, 1);
                }
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
          app.globalLogger(
            "player.turning",
            "complete",
            {
              plyr_no: player.number,
              direction: player.direction,
              time: app.time,
            },
            { fn: "playerUpdate", line: 292 },
          );
        }
      }

      // KEY PRESS RELEASE CHECKS!!
      checkFeintsCancels("", app, player);

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
      checkAttacking(app, player);

      // DEFENDING!!
      checkDefending(app, player);

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
      checkFeintsCancels("push", app, player);

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

      // DODGE STEPPER!
      checkDodge(app, player);

      checkHalfCompletePushback(app, player);

      // ELASTIC COUNTER
      checkElasticCounter(app, player);

      checkPlayerGear(app, player);

      // FLANKING!
      nextPosition = checkFlanking(app, player, keyPressedDirection, nextPosition);

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
        player.dashing.state !== true &&
        player.dashing.postDash.state !== true &&
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
        checkMoveInput(app, player, plyrPullPushed, plyrPullPushedPlyr, breakPulledPushed, keyPressedDirection, nextPosition);
      }

      // CAN READ NON-MOVE INPUTS!!
      if (
        player.moving.state !== true &&
        player.dashing.state !== true &&
        player.dashing.postDash.state !== true &&
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
        checkNonMoveInput(app, player, plyrPullPushed, plyrPullPushedPlyr, breakPulledPushed, keyPressedDirection, nextPosition);
      }

      // BREAK FROM PULLED, PUSHED COMPLETE
      if (breakPulledPushed === true) {
        console.log("player ", player.number, " was being pre-pulled/pushed by ", plyrPullPushedPlyr, " break pulling/pushing and deflect?");

        let shouldDeflect = app.rnJesus(1, player.crits.guardBreak);
        if (shouldDeflect === 1) {
          app.setDeflection(app.players[plyrPullPushedPlyr - 1], "bluntAttacked", false);
        }

        // POPUPS
        if (app.players[plyrPullPushedPlyr - 1].prePush.state === true) {
          if (!app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "noPush")) {
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

          if (app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "prePush")) {
            app.players[plyrPullPushedPlyr - 1].popups.splice(
              app.players[plyrPullPushedPlyr - 1].popups.findIndex((x) => x.msg === "prePush"),
              1,
            );
          }
          if (app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "noPush")) {
            app.players[plyrPullPushedPlyr - 1].popups.splice(
              app.players[plyrPullPushedPlyr - 1].popups.findIndex((x) => x.msg === "canPush"),
              1,
            );
          }
        }
        if (app.players[plyrPullPushedPlyr - 1].prePull.state === true) {
          if (!app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "noPull")) {
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

          if (app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "prePull")) {
            app.players[plyrPullPushedPlyr - 1].popups.splice(
              app.players[plyrPullPushedPlyr - 1].popups.findIndex((x) => x.msg === "prePull"),
              1,
            );
          }
          if (app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "canPull")) {
            app.players[plyrPullPushedPlyr - 1].popups.splice(
              app.players[plyrPullPushedPlyr - 1].popups.findIndex((x) => x.msg === "canPull"),
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
            app.players[plyrPullPushedPlyr - 1].popups.findIndex((x) => x.msg === "prePush"),
            1,
          );
        }
        if (app.players[plyrPullPushedPlyr - 1].popups.find((x) => x.msg === "prePull")) {
          app.players[plyrPullPushedPlyr - 1].popups.splice(
            app.players[plyrPullPushedPlyr - 1].popups.findIndex((x) => x.msg === "prePull"),
            1,
          );
        }
      }
    }

    // DISPLAY ATTACK AND DEFENSE SUCCESS!
    if (player.success.attackSuccess.state === true) {
      if (player.success.attackSuccess.count < player.success.attackSuccess.limit) {
        player.success.attackSuccess.count++;
      } else if (player.success.attackSuccess.count >= player.success.attackSuccess.limit) {
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
      } else if (player.success.defendSuccess.count >= player.success.defendSuccess.limit) {
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
  checkDeflectionElasticCounter(app, player);

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
  checkObstacleBarrier(app, player, nextPosition);

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
  if (player.statusDisplay.state === true && player.statusDisplay.count < player.statusDisplay.limit) {
    // console.log('stepping status display');
    player.statusDisplay.count++;
  } else if (player.statusDisplay.state === true && player.statusDisplay.count >= player.statusDisplay.limit) {
    // console.log('hide status display');
    player.statusDisplay = {
      state: false,
      status: "",
      count: 0,
      limit: player.statusDisplay.limit,
    };
  }

  // POPUPS
  checkPopups(app, player);

  // CAMERA
  checkCamera(app, player, canvas, context);

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
