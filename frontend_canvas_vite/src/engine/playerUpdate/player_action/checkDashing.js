/**
 * checkDashing — Runtime for the 2-tile dash mechanic.
 *
 * Called every frame while the player is dashing (dashing.state === true)
 * or in the post-dash cooldown (postDash.state === true).
 * Handles: two-cell movement, mid-dash feints, collision/deflection,
 * speed/delay restoration, and cooldown expiry.
 */
export function checkDashing(app, player, keyPressedDirection, nextPosition) {
  // ── Loggers ──────────────────────────────────────────────
  const logDashInit = (message, data = {}) => {
    app.globalLogger("player.dashing.initiation", message, data, { fn: "checkDashing" });
  };
  const logDashMove = (message, data = {}) => {
    app.globalLogger("player.dashing.movement", message, data, { fn: "checkDashing" });
  };
  const logDashColl = (message, data = {}) => {
    app.globalLogger("player.dashing.collision", message, data, { fn: "checkDashing" });
  };
  const logDashFeint = (message, data = {}) => {
    app.globalLogger("player.dashing.feint", message, data, { fn: "checkDashing" });
  };
  const logDashCool = (message, data = {}) => {
    app.globalLogger("player.dashing.cooldown", message, data, { fn: "checkDashing" });
  };
  const logDashCount = (message, data = {}) => {
    app.globalLogger("player.dashing.count", message, data, { fn: "checkDashing" });
  };
  const logDashBlocked = (message, data = {}) => {
    app.globalLogger("player.dashing.blocked", message, data, { fn: "checkDashing" });
  };

  // ── Reset factory: returns a clean default dashing state ──
  const resetDashState = () => ({
    state: false,
    originalDirection: "",
    dashDirection: "",
    origin: {},
    moveStepCount_1: 0,
    cell_1: {
      x: null,
      y: null,
      occupied: false,
      occupant_id: {},
    },
    cell_1_arrived: false,
    moveStepCount_2: 0,
    cell_2: {
      x: null,
      y: null,
      occupied: false,
      occupant_id: {},
    },
    cell_2_arrived: false,
    originalMoveSpeed: null,
    originalMoveDelayLimit: null,
    dashMoveSpeed: undefined,
    lastMoveStartTime: -1,
    tap: {
      active: false,
      direction: "",
      time: -1,
    },
    postDash: {
      state: false,
      count: 0,
      limit: app.dashRef.postDashLimit,
    },
    cell2Blocked: false,
    blockedBouncePending: false,
    blockedBounceAnimId: null,
  });

  // ── Restore the player's pre-dash movement stats ─────────
  // Called on dash completion, feint, or attack-cancel to revert
  // the boosted speed and shortened move delay.
  const restoreMoveDefaults = () => {
    if (player.dashing.originalMoveSpeed !== null && player.speed.move > player.dashing.originalMoveSpeed) {
      player.speed.move = player.dashing.originalMoveSpeed;
    }
    if (player.dashing.originalMoveDelayLimit !== null) {
      player.newMoveDelay.limit = player.dashing.originalMoveDelayLimit;
    }
  };

  // ── Enter post-dash cooldown ─────────────────────────────
  // After reaching cell 2 (or feinting) the player cannot act
  // for postDashLimit frames while their stats restore.
  const startPostDash = () => {
    player.dashing.state = false;
    player.dashing.postDash.state = true;
    player.dashing.postDash.count = 0;
    player.dashing.postDash.limit = app.dashRef.postDashLimit;
    logDashCool("start", {
      plyr_no: player.number,
      limit: app.dashRef.postDashLimit,
    });
  };

  // ── Loose position match ─────────────────────────────────
  // Checks whether the player's interpolated pixel position
  // has arrived at the destination cell center (within tolerance).
  const isAtDestination = (pos, dest) => {
    return (
      (pos.x >= dest.x - 1 && pos.x <= dest.x + 1 && pos.y >= dest.y - 1 && pos.y <= dest.y + 1) ||
      (pos.x === dest.x - 0.25 && pos.y === dest.y + 0.5) ||
      (pos.x === dest.x && pos.y === dest.y) ||
      (pos.x === dest.x - 5 && pos.y === dest.y - 5)
    );
  };

  // ── Resolve collisions when the dasher arrives at a cell ──
  // Checks all other players who either occupy or are heading
  // to the same target cell. If the dasher is past the halfway
  // step and the other player is also moving there, deflection
  // is guaranteed. Otherwise a random roll decides.
  // Two dashers targeting the same cell: the later arrival loses.
  const resolveDashCollision = (targetCellNumber, dashStep) => {
    for (const other of app.players) {
      if (other.number === player.number || other.dead.state === true) {
        continue;
      }

      const otherAtCell = other.currentPosition.cell.number.x === targetCellNumber.x && other.currentPosition.cell.number.y === targetCellNumber.y;

      const otherHeadingToCell =
        other.moving.state === true && other.target?.cell1?.number?.x === targetCellNumber.x && other.target?.cell1?.number?.y === targetCellNumber.y;

      if (otherAtCell || otherHeadingToCell) {
        const guaranteeDeflect = dashStep >= app.dashRef.collisionHalfwayStep && otherHeadingToCell === true;
        const otherRoll = app.rnJesus(1, app.dashRef.deflectOdds.otherPlayer);
        if (guaranteeDeflect || otherRoll === 1) {
          app.setDeflection(other, "bluntAttacked", false);
          app.pushBack(other, app.getOppositeDirection(player.dashing.dashDirection));
          logDashColl("otherDeflected", {
            dasher: player.number,
            other: other.number,
            cell: targetCellNumber,
            guaranteeDeflect,
            roll: guaranteeDeflect ? "guaranteed" : otherRoll,
          });
        } else {
          logDashColl("otherNotDeflected", {
            dasher: player.number,
            other: other.number,
            cell: targetCellNumber,
            dashStep,
            collisionHalfwayStep: app.dashRef.collisionHalfwayStep,
            roll: otherRoll,
            odds: app.dashRef.deflectOdds.otherPlayer,
          });
        }

        const dasherRoll = app.rnJesus(1, app.dashRef.deflectOdds.dasher);
        if (dasherRoll === 1) {
          app.setDeflection(player, "bluntAttacked", false);
          logDashColl("dasherDeflected", {
            plyr_no: player.number,
            other: other.number,
            cell: targetCellNumber,
            roll: dasherRoll,
          });
        } else {
          logDashColl("dasherNotDeflected", {
            plyr_no: player.number,
            other: other.number,
            cell: targetCellNumber,
            roll: dasherRoll,
            odds: app.dashRef.deflectOdds.dasher,
          });
        }
      }

      const sameDashTarget =
        other.dashing.state === true && other.dashing.cell_2.x === targetCellNumber.x && other.dashing.cell_2.y === targetCellNumber.y;
      if (sameDashTarget === true) {
        app.setDeflection(other, "bluntAttacked", false);
        app.pushBack(other, app.getOppositeDirection(player.dashing.dashDirection));
        logDashColl("sameDashTarget", {
          dasher: player.number,
          other: other.number,
          cell: targetCellNumber,
        });
      }
    }
  };

  // ──────────────────────────────────────────────────────────
  // 1) POST-DASH COOLDOWN
  // ──────────────────────────────────────────────────────────
  // Count frames until limit is reached, then fully reset state.
  // During cooldown the player cannot move or act.
  if (player.dashing.postDash.state === true) {
    if (player.dashing.postDash.count < player.dashing.postDash.limit) {
      player.dashing.postDash.count++;
      logDashCount("postDashCount", {
        plyr_no: player.number,
        count: player.dashing.postDash.count,
        limit: player.dashing.postDash.limit,
      });
    } else {
      restoreMoveDefaults();
      player.dashing = resetDashState();
      logDashCool("end", {
        plyr_no: player.number,
      });
    }
    return nextPosition;
  }

  // ──────────────────────────────────────────────────────────
  // 2) BLOCKED BOUNCE COMPLETION CHECK
  // ──────────────────────────────────────────────────────────
  // After dashing to cell 1 (cell 2 was blocked), a thrust
  // windup animation plays. Once the animation element is
  // removed from the array, apply deflection.
  if (player.dashing.blockedBouncePending === true) {
    const animStillPlaying = player.actionDirectionAnimationArray.some(
      (a) => a.id === player.dashing.blockedBounceAnimId
    );
    if (!animStillPlaying) {
      // Thrust animation completed — apply deflection
      player.dashing.blockedBouncePending = false;
      player.dashing.blockedBounceAnimId = null;
      restoreMoveDefaults();
      app.setDeflection(player, "bluntAttacked", false);
      startPostDash();
      player.action = "idle";
      logDashBlocked("bounceComplete", {
        plyr_no: player.number,
        cell: player.currentPosition.cell.number,
      });
    }
    return nextPosition;
  }

  // ──────────────────────────────────────────────────────────
  // 3) STATE GUARD — exit early if not actively dashing
  // ──────────────────────────────────────────────────────────
  if (player.dashing.state !== true) {
    return nextPosition;
  }

  // ──────────────────────────────────────────────────────────
  // 4) ENSURE ACTION TAG
  // ──────────────────────────────────────────────────────────
  if (player.action !== "dashing") {
    player.action = "dashing";
  }

  // ──────────────────────────────────────────────────────────
  // 5) MID-DASH FEINT
  // ──────────────────────────────────────────────────────────
  // After reaching cell 1 but before cell 2, pressing the
  // opposite direction within the feint step threshold can
  // cancel the dash — if the player's reflexes roll succeeds.
  if (player.dashing.cell_1_arrived === true && player.dashing.cell_2_arrived !== true) {
    if (keyPressedDirection === app.getOppositeDirection(player.dashing.dashDirection) && player.moving.step < app.dashRef.feintStepThreshold) {
      const roll = app.rnJesus(1, player.crits.reflexes);
      if (roll === 1) {
        restoreMoveDefaults();
        player.moving.state = false;
        player.action = "idle";
        startPostDash();
        logDashFeint("success", {
          plyr_no: player.number,
          step: player.moving.step,
          reflexes: player.crits.reflexes,
        });
        return nextPosition;
      } else {
        logDashFeint("fail", {
          plyr_no: player.number,
          step: player.moving.step,
          reflexes: player.crits.reflexes,
          roll,
        });
      }
    }
  }

  // ──────────────────────────────────────────────────────────
  // 6) INTERPOLATE POSITION ALONG THE DASH PATH
  // ──────────────────────────────────────────────────────────
  nextPosition = app.lineCrementer(player);
  player.nextPosition = nextPosition;

  // ──────────────────────────────────────────────────────────
  // 7) APPROACHING CELL 1
  // ──────────────────────────────────────────────────────────
  if (player.dashing.cell_1_arrived !== true) {
    if (isAtDestination(nextPosition, player.target.cell1.center)) {
      // Snap to cell 1 grid position
      player.currentPosition.cell.number = player.target.cell1.number;
      player.currentPosition.cell.center = player.target.cell1.center;
      player.dashing.cell_1_arrived = true;

      // Check for collisions at cell 1
      resolveDashCollision(player.target.cell1.number, player.moving.step);

      if (player.dashing.cell2Blocked === true) {
        // ── CELL 2 BLOCKED: stop and start forward bounce ──
        player.moving = {
          state: false,
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
          destination: { x: 0, y: 0 },
        };

        // Push a thrust windup animation (release phase = forward)
        // to show the player bumping into the blocked cell
        const bumpAnimId = player.actionDirectionAnimationArray.length + 1;
        player.actionDirectionAnimationArray.push({
          id: bumpAnimId,
          ownerType: "player",
          ownerNumber: player.number,
          ownerDirection: player.dashing.dashDirection,
          action: "bump",
          actionDirection: player.dashing.dashDirection,
          actionDirectionType: "thrust",
          phase: "release",
          radius: 50,
          angle: 0,
          startAngle: 0,
          direction: "counterClockwise",
          face: "top",
          shape: "",
          color: "red",
          counter: { count: 0, limit: 10 },
          delay: { state: false, count: 0, limit: 15 },
          points: [],
          locationCell: {
            x: player.currentPosition.cell.number.x,
            y: player.currentPosition.cell.number.y,
          },
        });

        player.dashing.cell2Blocked = false;
        player.dashing.blockedBouncePending = true;
        player.dashing.blockedBounceAnimId = bumpAnimId;
        player.action = "bump";

        logDashBlocked("cell2Blocked", {
          plyr_no: player.number,
          cell: player.currentPosition.cell.number,
          dash_direction: player.dashing.dashDirection,
        });
      } else {
        // ── CELL 2 FREE: re-target normally ────────────
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
          destination: player.target.cell1.center,
        };

        app.getTarget(player);

        player.moving.destination = player.target.cell1.center;
        player.nextPosition = app.lineCrementer(player);

        logDashMove("cell1Arrived", {
          plyr_no: player.number,
          cell: player.currentPosition.cell.number,
          step: player.moving.step,
          next_cell: player.target.cell1.number,
        });
      }
    }

    return nextPosition;
  }

  // ──────────────────────────────────────────────────────────
  // 8) APPROACHING CELL 2
  // ──────────────────────────────────────────────────────────
  if (player.dashing.cell_2_arrived !== true) {
    if (isAtDestination(nextPosition, player.target.cell1.center)) {
      // Snap to cell 2 grid position
      player.currentPosition.cell.number = player.target.cell1.number;
      player.currentPosition.cell.center = player.target.cell1.center;
      player.dashing.cell_2_arrived = true;

      // Check for collisions at cell 2
      resolveDashCollision(player.target.cell1.number, player.moving.step);

      // Dash complete — stop moving
      player.moving = {
        state: false,
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
        destination: {
          x: 0,
          y: 0,
        },
      };

      // Restore pre-dash speed/delay and enter cooldown
      restoreMoveDefaults();
      startPostDash();
      player.action = "idle";
      app.checkDestination(player, false);

      logDashMove("cell2Arrived", {
        plyr_no: player.number,
        cell: player.currentPosition.cell.number,
        step: player.moving.step,
      });
    }
  }

  return nextPosition;
}
