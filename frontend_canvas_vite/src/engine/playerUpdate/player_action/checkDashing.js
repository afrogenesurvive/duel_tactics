/**
 * checkDashing — Runtime for the 2-tile dash mechanic.
 *
 * Called every frame while the player is dashing (dashing.state === true)
 * or in the post-dash cooldown (postDash.state === true).
 * Handles: two-cell movement, mid-dash feints, collision/deflection,
 * speed/delay restoration, and cooldown expiry.
 */
export function checkDashing(app, player, keyPressedDirection, nextPosition) {
  // ── Logger ───────────────────────────────────────────────
  const logDash = (message, data = {}) => {
    app.globalLogger("player.dashing", message, data, { fn: "checkDashing" });
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
        if (guaranteeDeflect || app.rnJesus(1, app.dashRef.deflectOdds.otherPlayer) === 1) {
          app.setDeflection(other, "bluntAttacked", false);
          app.pushBack(other, app.getOppositeDirection(player.dashing.dashDirection));
        }

        if (app.rnJesus(1, app.dashRef.deflectOdds.dasher) === 1) {
          app.setDeflection(player, "bluntAttacked", false);
        }
      }

      const sameDashTarget =
        other.dashing.state === true && other.dashing.cell_2.x === targetCellNumber.x && other.dashing.cell_2.y === targetCellNumber.y;
      if (sameDashTarget === true) {
        app.setDeflection(other, "bluntAttacked", false);
        app.pushBack(other, app.getOppositeDirection(player.dashing.dashDirection));
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
    } else {
      restoreMoveDefaults();
      player.dashing = resetDashState();
    }
    return nextPosition;
  }

  // ──────────────────────────────────────────────────────────
  // 2) STATE GUARD — exit early if not actively dashing
  // ──────────────────────────────────────────────────────────
  if (player.dashing.state !== true) {
    return nextPosition;
  }

  // ──────────────────────────────────────────────────────────
  // 3) ENSURE ACTION TAG
  // ──────────────────────────────────────────────────────────
  if (player.action !== "dashing") {
    player.action = "dashing";
  }

  // ──────────────────────────────────────────────────────────
  // 4) MID-DASH FEINT
  // ──────────────────────────────────────────────────────────
  // After reaching cell 1 but before cell 2, pressing the
  // opposite direction within the feint step threshold can
  // cancel the dash — if the player's reflexes roll succeeds.
  if (player.dashing.cell_1_arrived === true && player.dashing.cell_2_arrived !== true) {
    if (keyPressedDirection === app.getOppositeDirection(player.dashing.dashDirection) && player.moving.step < app.dashRef.feintStepThreshold) {
      if (app.rnJesus(1, player.crits.reflexes) === 1) {
        restoreMoveDefaults();
        player.moving.state = false;
        player.action = "idle";
        startPostDash();
        logDash("dashFeint", {
          plyr_no: player.number,
          step: player.moving.step,
        });
        return nextPosition;
      }
    }
  }

  // ──────────────────────────────────────────────────────────
  // 5) INTERPOLATE POSITION ALONG THE DASH PATH
  // ──────────────────────────────────────────────────────────
  nextPosition = app.lineCrementer(player);
  player.nextPosition = nextPosition;

  // ──────────────────────────────────────────────────────────
  // 6) APPROACHING CELL 1
  // ──────────────────────────────────────────────────────────
  if (player.dashing.cell_1_arrived !== true) {
    if (isAtDestination(nextPosition, player.target.cell1.center)) {
      // Snap to cell 1 grid position
      player.currentPosition.cell.number = player.target.cell1.number;
      player.currentPosition.cell.center = player.target.cell1.center;
      player.dashing.cell_1_arrived = true;

      // Check for collisions at cell 1
      resolveDashCollision(player.target.cell1.number, player.moving.step);

      // Re-target for cell 2 by resetting the moving state
      // with cell 1 as the new origin and cell 2 center as destination
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

      logDash("dashMidpoint", {
        plyr_no: player.number,
        cell: player.currentPosition.cell.number,
      });
    }

    return nextPosition;
  }

  // ──────────────────────────────────────────────────────────
  // 7) APPROACHING CELL 2
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

      logDash("dashComplete", {
        plyr_no: player.number,
        cell: player.currentPosition.cell.number,
      });
    }
  }

  return nextPosition;
}
