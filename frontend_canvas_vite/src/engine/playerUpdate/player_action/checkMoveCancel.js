export function checkMoveCancel(app, player, nextPosition) {
  const logMove = (message, data = {}) => {
    app.globalLogger("player.movement", message, data, { fn: "checkMoveCancel" });
  };
  const logMoveCount = (message, data = {}) => {
    app.globalLogger("player.movement_count", message, data, { fn: "checkMoveCancel" });
  };
  const logDashInit = (message, data = {}) => {
    app.globalLogger("player.dashing.initiation", message, data, { fn: "checkMoveCancel" });
  };

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
        console.log("cannot cancel move when being pushed back, falling, drowning, pulling, pushing, and being pushed or pulled");
        if (app.cancelNotifyShown !== true) {
          app.cancelNotifyShown = true;
          if (app?.addNotification) {
            app.addNotification("Can't cancel move while pushed/pulled/falling/drowning", "warn");
          }
          if (app?.addEventLog) {
            app.addEventLog("P" + player.number + " can't cancel move (pushed/pulled/falling/drowning)", "system");
          }
        }
      } else {
        app.cancelNotifyShown = false;
      }

      let inTime = false;
      let inTimeThresh;
      let threshIndx;
      if (player.jumping.state === true) {
        inTimeThresh = 0.4;
      } else {
        let indx3 = player.speed.range_2.indexOf(player.speed.move);
        threshIndx = Math.ceil(app.moveStepRef[indx3].length / 2);
        inTimeThresh = app.moveStepRef[indx3][threshIndx + 1];
      }
      if (player.moving.step < inTimeThresh) {
        inTime = true;
      }

      // ── GATE: Move Cancel toggle ──────────────────────────
      // If moveCancelEnabled is false, disable both move cancel and dashing initiation.
      const moveCancelEnabled = app.settingsFormGameplayData?.moveCancelEnabled !== false;
      if (!moveCancelEnabled) {
        canCancelMove = false;
      }

      // ── DASH INITIATION CONDITIONS ────────────────────────
      // A dash can only start when move cancel is enabled, the player is still in the
      // cancel window (inTime), is NOT already dashing or in
      // post-dash cooldown, is NOT strafing or jumping, AND
      // the key pressed matches the player's facing direction
      // AND matches the tap recorded by handleKeyPress_ (the
      // double-tap detection: press same direction twice fast).
      const canStartDash =
        moveCancelEnabled === true &&
        inTime === true &&
        player.dashing.state !== true &&
        player.dashing.postDash.state !== true &&
        player.strafing.state !== true &&
        player.jumping.state !== true &&
        newDirection === player.direction &&
        player.dashing.tap.active === true &&
        player.dashing.tap.direction === newDirection &&
        player.dashing.tap.time > player.dashing.lastMoveStartTime;

      // ── Compute the boosted dash move speed ───────────────
      // Pulls speed from the configured range/index in dashRef.
      // If the resulting speed is not faster than the player's
      // current move speed, it increments by one step so the
      // dash is always an improvement.
      const getDashMoveSpeed = () => {
        const dashRange = player.speed[app.dashRef.speedRange] || player.speed.range_2;
        let dashSpeed = dashRange[app.dashRef.speedIndex];
        if (!dashSpeed) {
          dashSpeed = dashRange[dashRange.length - 1];
        }

        if (dashSpeed <= player.speed.move) {
          const last = dashRange[dashRange.length - 1];
          const prev = dashRange[dashRange.length - 2] || 0;
          if (player.speed.move >= last) {
            const step = Math.max(0.05, +(last - prev).toFixed(3));
            dashSpeed = +(player.speed.move + step).toFixed(3);
          } else {
            dashSpeed = player.speed.move;
          }
        }
        return dashSpeed;
      };

      // ── FIRE THE DASH ─────────────────────────────────────
      if (canStartDash === true) {
        logDashInit("doubleTap", {
          plyr_no: player.number,
          direction: newDirection,
          movingStep: player.moving.step,
          inTimeThresh,
          stepsRemaining: +(inTimeThresh - player.moving.step).toFixed(3),
          tapTime: player.dashing.tap.time,
          lastMoveStartTime: player.dashing.lastMoveStartTime,
          timeSinceLastMove: app.time - player.dashing.lastMoveStartTime,
        });
        player.dashing.tap.active = false; // Consume the tap

        // Check stamina (dash costs 8 stamina)
        if (player.stamina.current - app.staminaCostRef.dash >= 0) {
          player.stamina.current -= app.staminaCostRef.dash;

          // Check that BOTH target cells (cell 1 and cell 2)
          // are free of barriers, obstacles, higher elevation, or void
          let target = app.getTarget(player);
          const cell1Blocked =
            target.cell1.occupant.type === "barrier" ||
            target.cell1.occupant.type === "obstacle" ||
            target.cell1.occupant.type === "higherElevation" ||
            target.cell1.void === true;
          const cell2Blocked =
            target.cell2.occupant.type === "barrier" ||
            target.cell2.occupant.type === "obstacle" ||
            target.cell2.occupant.type === "higherElevation" ||
            target.cell2.void === true;

          if (target.myCellBlock !== true && cell1Blocked !== true) {
            // Cell 1 is free — start the dash (even if cell 2 is blocked)
            if (cell2Blocked === true) {
              player.dashing.cell2Blocked = true;
            }
            // Set action and state flags
            player.action = "dashing";
            player.dashing.state = true;
            if (app?.addEventLog) {
              app.addEventLog("P" + player.number + " dashed " + player.direction, "movement");
            }
            player.dashing.originalDirection = player.direction;
            player.dashing.dashDirection = player.direction;

            // Record origin grid position
            player.dashing.origin = {
              number: {
                x: player.currentPosition.cell.number.x,
                y: player.currentPosition.cell.number.y,
              },
              center: {
                x: player.currentPosition.cell.center.x,
                y: player.currentPosition.cell.center.y,
              },
            };

            // Record cell 1 and cell 2 target info for collision logic
            player.dashing.cell_1 = {
              x: target.cell1.number.x,
              y: target.cell1.number.y,
              occupied: target.cell1.free !== true,
              occupant_id: target.cell1.occupant,
            };
            player.dashing.cell_2 = {
              x: target.cell2.number.x,
              y: target.cell2.number.y,
              occupied: target.cell2.free !== true,
              occupant_id: target.cell2.occupant,
            };
            player.dashing.cell_1_arrived = false;
            player.dashing.cell_2_arrived = false;

            // Save pre-dash move stats so they can be restored later
            player.dashing.originalMoveSpeed = player.speed.move;
            player.dashing.originalMoveDelayLimit = player.newMoveDelay.limit;

            // Apply dash-boosted speed and shortened move delay
            player.dashing.dashMoveSpeed = getDashMoveSpeed();
            player.speed.move = player.dashing.dashMoveSpeed;
            player.newMoveDelay.limit = app.dashRef.moveDelayLimit;

            // Initialize post-dash cooldown (starts false, set by checkDashing on arrival)
            player.dashing.postDash = {
              state: false,
              count: 0,
              limit: app.dashRef.postDashLimit,
            };

            app.globalLogger(
              "player.dashing.initiation",
              "start",
              {
                plyr_no: player.number,
                dash_dir: player.dashing.dashDirection,
                dash_speed: player.dashing.dashMoveSpeed,
                move_speed: player.dashing.originalMoveSpeed,
                stamina: player.stamina.current,
              },
              { fn: "checkMoveCancel" },
            );
          } else {
            // Origin cell or cell 1 is blocked — show status message
            player.statusDisplay = {
              state: true,
              status: "dash blocked",
              count: 1,
              limit: player.statusDisplay.limit,
            };
            app.globalLogger(
              "player.dashing.blocked",
              "blocked",
              {
                plyr_no: player.number,
                cell1Blocked,
                cell2Blocked,
                dir: player.direction,
              },
              { fn: "checkMoveCancel" },
            );
          }
        } else {
          // Not enough stamina for dash
          // player.stamina.current = 0;
          player.statusDisplay = {
            state: true,
            status: "Out of Stamina",
            count: 0,
            limit: player.statusDisplay.limit,
          };
          app.globalLogger(
            "player.dashing.initiation",
            "outOfStamina",
            {
              plyr_no: player.number,
              stamina: player.stamina.current,
              cost: app.staminaCostRef.dash,
            },
            { fn: "checkMoveCancel" },
          );
        }

        return; // Exit after attempting dash (don't fall through to move-cancel)
      }

      if (player.moveCancel.state !== true && canCancelMove === true) {
        // console.log("new input direction", newDirection, player.moving.step);
        // player.speed.move = 0.2;

        if (inTime === true) {
          if (player.stamina.current - app.staminaCostRef.move >= 0) {
            player.stamina.current -= app.staminaCostRef.move;

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

            logMove("moveCancelStart", {
              plyr_no: player.number,
              old_direction: oldDirection,
              new_direction: newDirection,
              step: player.moving.step,
              move_speed: player.speed.move,
              jumping: player.jumping.state,
              strafing: player.strafing.state,
            });

            if (player.strafing.state !== true) {
              player.strafing.state = true;
              player.strafing.direction = newDirection;
            } else {
              if (player.strafing.direction === app.getOppositeDirection(player.direction)) {
                player.strafing.state = false;
                player.strafing.direction = "";
              } else {
                player.strafing.direction = newDirection;
              }
            }

            let newTarget = app.getTarget(player);

            let indx3 = player.speed.range_2.indexOf(player.speed.move);
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
              app.mouseOverCell.cell.number.x === player.currentPosition.cell.number.x &&
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
}
