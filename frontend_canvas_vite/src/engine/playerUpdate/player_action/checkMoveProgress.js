export function checkMoveProgress(app, player, nextPosition) {
  const logMove = (message, data = {}, origin) => {
    app.globalLogger("player.movement", message, data, origin || { fn: "checkMoveProgress" });
  };
  const logMoveCount = (message, data = {}, origin) => {
    app.globalLogger("player.movement_count", message, data, origin || { fn: "checkMoveProgress" });
  };
  const endDash = (startCooldown = true) => {
    player.dashing.state = false;
    player.dashing.cell_1_arrived = false;
    player.dashing.cell_2_arrived = false;
    if (Number.isFinite(player.dashing.originalMoveSpeed)) {
      player.speed.move = player.dashing.originalMoveSpeed;
    }
    if (Number.isFinite(player.dashing.originalMoveDelayLimit)) {
      player.newMoveDelay.limit = player.dashing.originalMoveDelayLimit;
    }
    if (startCooldown === true) {
      player.dashing.postDash.state = true;
      player.dashing.postDash.count = 0;
    }
  };

  if (player.moving.state === true) {
    // console.log("checkMoveProgress", {
    //   plyr_number: player.number,
    //   action: player.action,
    //   step: player.moving.step,
    //   move_speed: player.speed.move,
    //   stamina: player.stamina.current,
    // });

    nextPosition = app.lineCrementer(player);
    player.nextPosition = nextPosition;
    if (player.dashing?.state === true && player.success?.deflected?.state === true) {
      player.moving.state = false;
      player.action = "deflected";
      endDash(true);
      return;
    }
    if (player.moveCancel.state === true) {
      logMoveCount(
        "moveCancelReturning",
        {
          step: player.moving.step,
          nextPosition,
          cellNumbers: player.currentPosition.cell.numbers,
        },
        { fn: "checkMoveProgress", line: 14 },
      );
    }

    let atDestRanges1 = [false, false, false, false];
    let atDestRanges2 = [false, false, false, false];
    let refCell1 = app.gridInfo.find((x) => x.number.x === player.target.cell1.number.x && x.number.y === player.target.cell1.number.y);
    let refCell2 = app.gridInfo.find((x) => x.number.x === player.target.cell2.number.x && x.number.y === player.target.cell2.number.y);

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
      if (nextPosition.x === player.target.cell1.center.x - 0.25 && nextPosition.y === player.target.cell1.center.y + 0.5) {
        atDestRanges1[1] = true;
        destRngIndx = 1;
      }
      if (nextPosition.x === player.target.cell1.center.x && nextPosition.y === player.target.cell1.center.y) {
        atDestRanges1[2] = true;
        destRngIndx = 2;
      }
      if (nextPosition.x === player.target.cell1.center.x - 5 && nextPosition.y === player.target.cell1.center.y - 5) {
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

          if (player.dashing?.state === true) {
            const dashCell1 = player.dashing.cell_1;
            const dashCell2 = player.dashing.cell_2;
            const dashCell1Ref = dashCell1
              ? app.gridInfo.find((x) => x.number.x === dashCell1.number.x && x.number.y === dashCell1.number.y)
              : null;
            const dashCell2Ref = dashCell2
              ? app.gridInfo.find((x) => x.number.x === dashCell2.number.x && x.number.y === dashCell2.number.y)
              : null;

            if (player.dashing.cell_1_arrived !== true) {
              player.dashing.cell_1_arrived = true;

              if (dashCell1) {
                player.currentPosition.cell.number = dashCell1.number;
                player.currentPosition.cell.center = dashCell1.center;
              }

              if (dashCell1Ref) {
                const dashCell1Player = app.players.find(
                  (x) =>
                    x.number !== player.number &&
                    x.currentPosition.cell.number.x === dashCell1Ref.number.x &&
                    x.currentPosition.cell.number.y === dashCell1Ref.number.y,
                );
                if (dashCell1Player) {
                  app.setDeflection(player, "attacked", false);
                  app.setDeflection(dashCell1Player, "attacked", false);
                  app.pushBack(dashCell1Player, player.direction);
                  player.action = "idle";
                  player.moving.state = false;
                  player.newMoveDelay.state = true;
                  endDash(true);
                  return;
                }
              }

              const dashBlocked =
                !dashCell2Ref ||
                dashCell2Ref.void === true ||
                (dashCell1Ref?.barrier?.state === true && dashCell1Ref.barrier.position === player.direction) ||
                (dashCell2Ref?.barrier?.state === true &&
                  dashCell2Ref.barrier.position === app.getOppositeDirection(player.direction));

              if (dashBlocked) {
                player.action = "idle";
                player.moving.state = false;
                player.newMoveDelay.state = true;
                endDash(true);
                return;
              }

              if (dashCell2) {
                player.target.cell1.number = dashCell2.number;
                player.target.cell1.center = dashCell2.center;
              }

              player.moving = {
                state: true,
                step: 0,
                course: player.moving.course,
                origin: {
                  number: dashCell1 ? dashCell1.number : player.moving.origin.number,
                  center: dashCell1 ? dashCell1.center : player.moving.origin.center,
                },
                destination: dashCell2 ? dashCell2.center : player.moving.destination,
              };
              player.action = "dashing";
              player.nextPosition = app.lineCrementer(player);
              return;
            }

            if (player.dashing.cell_2_arrived !== true) {
              player.dashing.cell_2_arrived = true;

              if (dashCell2) {
                player.currentPosition.cell.number = dashCell2.number;
                player.currentPosition.cell.center = dashCell2.center;
              }

              if (dashCell2Ref) {
                const dashTargetPlayer = app.players.find(
                  (x) =>
                    x.number !== player.number &&
                    x.currentPosition.cell.number.x === dashCell2Ref.number.x &&
                    x.currentPosition.cell.number.y === dashCell2Ref.number.y,
                );

                if (dashTargetPlayer) {
                  const deflectBoth = app.rnJesus(1, 5) !== 1;
                  if (deflectBoth) {
                    app.setDeflection(player, "attacked", false);
                    app.setDeflection(dashTargetPlayer, "attacked", false);
                  } else {
                    app.setDeflection(dashTargetPlayer, "attacked", false);
                  }
                  app.pushBack(dashTargetPlayer, player.direction);
                }

                if (dashCell2Ref.obstacle?.state === true) {
                  app.setDeflection(player, "bluntAttacked", false);
                  app.pushBack(player, app.getOppositeDirection(player.direction));
                }
              }

              player.action = "idle";
              player.moving.state = false;
              player.newMoveDelay.state = true;
              endDash(true);
              return;
            }
          }

          player.newMoveDelay.state = true;

          if (refCell1) {
            player.currentPosition.cell.number = player.target.cell1.number;
            player.currentPosition.cell.center = player.target.cell1.center;
          }

          logMove(
            "reachedDestination",
            {
              step: player.moving.step,
              nextPosition,
              cellNumbers: player.currentPosition.cell.number,
              move_speed: player.speed.move,
            },
            { fn: "checkMoveProgress", line: 150 },
          );

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
            if (player.pulling.state === true || player.pushed.state === true || player.pulled.state === true) {
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
            app.gridInfo.find((x) => x.number.x === player.currentPosition.cell.number.x && x.number.y === player.currentPosition.cell.number.y)
              .terrain.type !== "deep"
          ) {
            // console.log('pulled pushed player at destination. deflect?');

            if (app.rnJesus(1, player.crits.guardBreak) === 1) {
              app.setDeflection(player, "bluntAttacked", false);
            }
          }

          // PUSHBACK MOVEMENT
          if (player.pushBack.state === true) {
            app.globalLogger(
              "player.pushBack",
              "finishedMoving",
              {
                plyr_no: player.number,
                flanking: player.flanking.state,
              },
              { fn: "checkMoveProgress", line: 178 },
            );

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
                  maxCharge: player.attacking.maxCharge,
                  chargeCount: 0,
                  execute: false,
                  effectivenessAllowance: player.attacking.effectivenessAllowance,
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
                  limit: app.defendAnimRef.limit[player.currentWeapon.type].slash - app.defendAnimRef.peak[player.currentWeapon.type].slash,
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
            if (player.drowning !== true && player.dead.state !== true && player.pushBack.state !== true) {
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
      if (nextPosition.x === player.target.cell1.center.x - 0.25 && nextPosition.y === player.target.cell1.center.y + 0.5) {
        atDestRanges1[1] = true;
      }
      if (nextPosition.x === player.target.cell1.center.x && nextPosition.y === player.target.cell1.center.y) {
        atDestRanges1[2] = true;
      }
      if (nextPosition.x === player.target.cell1.center.x - 5 && nextPosition.y === player.target.cell1.center.y - 5) {
        atDestRanges1[3] = true;
      }

      for (const el of atDestRanges1) {
        if (el === true) {
          let blocked = false;
          let blockType = "";

          if (refCell2.barrier.state === true) {
            if (refCell2.barrier.position === app.getOppositeDirection(player.direction)) {
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
      if (nextPosition.x === player.target.cell2.center.x - 0.25 && nextPosition.y === player.target.cell2.center.y + 0.5) {
        atDestRanges2[1] = true;
      }
      if (nextPosition.x === player.target.cell2.center.x && nextPosition.y === player.target.cell2.center.y) {
        atDestRanges2[2] = true;
      }
      if (nextPosition.x === player.target.cell2.center.x - 5 && nextPosition.y === player.target.cell2.center.y - 5) {
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
}
