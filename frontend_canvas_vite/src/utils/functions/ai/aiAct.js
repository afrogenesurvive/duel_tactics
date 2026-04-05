export function aiAct(app, plyr) {
  let currentInstruction = plyr.ai.instructions[plyr.ai.currentInstruction];
  const logAct = (message, data = {}) => {
    app.globalLogger("ai.act", message, { plyr_no: plyr.number, ...data }, { fn: "aiAct" });
  };

  if (currentInstruction) {
    let targetCell = app.gridInfo.find((elem) => elem.number.x === plyr.target.cell1.number.x && elem.number.y === plyr.target.cell1.number.y);
    let playerCell = app.gridInfo.find(
      (elem) => elem.number.x === plyr.currentPosition.cell.number.x && elem.number.y === plyr.currentPosition.cell.number.y,
    );

    let pathIndx = plyr.ai.pathArray.findIndex(
      (elem) => elem.x === plyr.currentPosition.cell.number.x && elem.y === plyr.currentPosition.cell.number.y,
    );
    let currentPathStep = plyr.ai.pathArray[pathIndx];
    let nextPathStep = plyr.ai.pathArray[pathIndx + 1];
    let nextPathStepCell = undefined;
    if (nextPathStep) {
      nextPathStepCell = app.gridInfo.find((elem) => elem.number.x === nextPathStep.x && elem.number.y === nextPathStep.y);
    }

    // console.log('total instructions',plyr.ai.instructions.length,'currentInstruction',plyr.ai.currentInstruction,plyr.moving.state, !plyr.turning.state,'keyword',currentInstruction.keyword,'limit',currentInstruction.limit,'instructions',plyr.ai.instructions,'deflected',plyr.success.deflected.state);
    // console.log('ai act',plyr.ai.currentInstruction,currentInstruction,'mission',plyr.ai.mission,'instructions',plyr.ai.instructions,'newMoveDelay.state',plyr.newMoveDelay.state);

    app.keyPressed[plyr.number - 1] = {
      north: false,
      south: false,
      east: false,
      west: false,
      attack: false,
      defend: false,
      strafe: false,
      dodge: false,
      pull: false,
      kick: false,
      cycleWeapon: false,
      cycleArmor: false,
      discardWeapon: false,
      discardArmor: false,
      uiMenu: false,
      playerMenu: false,
      rotateRight: false,
      rotateLeft: false,
    };

    const targetPlayer = app.players?.[plyr.ai?.targetPlayer?.number - 1];
    const setDirectionalInput = () => {
      let dir = plyr.direction;
      if (targetPlayer?.currentPosition?.cell?.number && plyr.currentPosition?.cell?.number) {
        const dx = targetPlayer.currentPosition.cell.number.x - plyr.currentPosition.cell.number.x;
        const dy = targetPlayer.currentPosition.cell.number.y - plyr.currentPosition.cell.number.y;
        if (Math.abs(dx) >= Math.abs(dy)) {
          if (dx > 0) {
            dir = "east";
          } else if (dx < 0) {
            dir = "west";
          }
        } else {
          if (dy > 0) {
            dir = "south";
          } else if (dy < 0) {
            dir = "north";
          }
        }
      }

      if (dir && app.keyPressed[plyr.number - 1][dir] !== undefined) {
        app.keyPressed[plyr.number - 1][dir] = true;
      }
    };
    const handleJumpInput = (dir) => {
      if (currentInstruction.count === 0) {
        logAct("jumpAttempt", { dir: dir });
      }
      currentInstruction.limit = Math.max(6, currentInstruction.limit || 0);
      app.keyPressed[plyr.number - 1].strafe = true;
      app.keyPressed[plyr.number - 1][dir] = true;
      app.players[plyr.number - 1].turnCheckerDirection = dir;

      if (plyr.jumping.state === true) {
        logAct("jumpStarted", { dir: dir });
        plyr.ai.currentInstruction++;
        return;
      }

      if (currentInstruction.count < currentInstruction.limit) {
        currentInstruction.count++;
      } else {
        logAct("jumpNoStartReset", { dir: dir, limit: currentInstruction.limit });
        plyr.ai.currentInstruction++;
        plyr.ai.resetInstructions = true;
      }
    };

    switch (currentInstruction.keyword) {
      case "short_wait":
        // console.log('ai act -- short_wait');
        currentInstruction.limit = 15;
        if (currentInstruction.count < currentInstruction.limit) {
          currentInstruction.count++;
        } else if (currentInstruction.count >= currentInstruction.limit) {
          plyr.ai.currentInstruction++;
        }
        break;
      case "long_wait":
        // console.log('ai act -- long_wait');
        currentInstruction.limit = 25;
        if (currentInstruction.count < currentInstruction.limit) {
          currentInstruction.count++;
        } else if (currentInstruction.count >= currentInstruction.limit) {
          plyr.ai.currentInstruction++;
        }
        break;
      case "jump_north":
        handleJumpInput("north");
        break;
      case "jump_south":
        handleJumpInput("south");
        break;
      case "jump_east":
        handleJumpInput("east");
        break;
      case "jump_west":
        handleJumpInput("west");
        break;
      case "move_north":
        // console.log('ai act -- move_north');
        if (
          plyr.newMoveDelay.state !== true &&
          plyr.moving.state !== true &&
          !plyr.turning.state &&
          plyr.success.deflected.state !== true &&
          plyr.action === "idle"
        ) {
          let inDanger = false;
          if (plyr.direction === "north") {
            if (!targetCell) {
              // console.log('heading off the edge');
              inDanger = true;
            } else {
              if (targetCell.void.state === true || targetCell.terrain.type === "deep" || targetCell.terrain.type === "hazard") {
                // console.log('heading for mid-grid danger',targetCell.number);
                inDanger = true;
              }
            }
          }

          if (inDanger === false) {
            // console.log('safe: move_north');
            // currentInstruction.limit = 1;
            app.keyPressed[plyr.number - 1].north = true;
            app.players[plyr.number - 1].turnCheckerDirection = "north";
            // plyr.ai.currentInstruction++;
            if (currentInstruction.limit === 1) {
              plyr.ai.currentInstruction++;
            } else {
              if (currentInstruction.count < currentInstruction.limit) {
                currentInstruction.count++;
              } else if (currentInstruction.count >= currentInstruction.limit) {
                plyr.ai.currentInstruction++;
              }
            }
          } else {
            // console.log('danger: move_north');
            plyr.ai.currentInstruction++;
            plyr.ai.resetInstructions = true;
          }
          // console.log('inDanger',inDanger);
        }
        break;
      case "move_south":
        // console.log('ai act -- move_south');

        if (
          plyr.newMoveDelay.state !== true &&
          plyr.moving.state !== true &&
          !plyr.turning.state &&
          plyr.success.deflected.state !== true &&
          plyr.action === "idle"
        ) {
          let inDanger = false;
          if (plyr.direction === "south") {
            if (!targetCell) {
              // console.log('heading off the edge');
              inDanger = true;
            } else {
              if (targetCell.void.state === true || targetCell.terrain.type === "deep" || targetCell.terrain.type === "hazard") {
                // console.log('heading for mid-grid danger',targetCell.number);
                inDanger = true;
              }
            }
          }

          if (inDanger === false) {
            // console.log('safe: move_south');

            // currentInstruction.limit = 1;
            app.keyPressed[plyr.number - 1].south = true;
            app.players[plyr.number - 1].turnCheckerDirection = "south";
            // plyr.ai.currentInstruction++;
            if (currentInstruction.limit === 1) {
              plyr.ai.currentInstruction++;
            } else {
              if (currentInstruction.count < currentInstruction.limit) {
                currentInstruction.count++;
              } else if (currentInstruction.count >= currentInstruction.limit) {
                plyr.ai.currentInstruction++;
              }
            }
          } else {
            // console.log('danger: move_south');
            plyr.ai.currentInstruction++;
            plyr.ai.resetInstructions = true;
          }
        }
        break;
      case "move_east":
        // console.log('ai act -- move_east');
        if (
          plyr.newMoveDelay.state !== true &&
          plyr.moving.state !== true &&
          !plyr.turning.state &&
          plyr.success.deflected.state !== true &&
          plyr.action === "idle"
        ) {
          let inDanger = false;
          if (plyr.direction === "east") {
            if (!targetCell) {
              // console.log('heading off the edge');
              inDanger = true;
            } else {
              if (targetCell.void.state === true || targetCell.terrain.type === "deep" || targetCell.terrain.type === "hazard") {
                // console.log('heading for mid-grid danger',targetCell.number);
                inDanger = true;
              }
            }
          }

          if (inDanger === false) {
            // console.log('safe: move_east');
            // currentInstruction.limit = 1;
            app.keyPressed[plyr.number - 1].east = true;
            app.players[plyr.number - 1].turnCheckerDirection = "east";
            // plyr.ai.currentInstruction++;
            if (currentInstruction.limit === 1) {
              plyr.ai.currentInstruction++;
            } else {
              if (currentInstruction.count < currentInstruction.limit) {
                currentInstruction.count++;
              } else if (currentInstruction.count >= currentInstruction.limit) {
                plyr.ai.currentInstruction++;
              }
            }
          } else {
            // console.log('danger: : move_east');
            plyr.ai.currentInstruction++;
            plyr.ai.resetInstructions = true;
          }
        }
        break;
      case "move_west":
        // console.log('ai act -- move_west');
        if (
          plyr.newMoveDelay.state !== true &&
          plyr.moving.state !== true &&
          !plyr.turning.state &&
          plyr.success.deflected.state !== true &&
          plyr.action === "idle"
        ) {
          let inDanger = false;
          if (plyr.direction === "west") {
            if (!targetCell) {
              // console.log('heading off the edge');
              inDanger = true;
            } else {
              if (targetCell.void.state === true || targetCell.terrain.type === "deep" || targetCell.terrain.type === "hazard") {
                // console.log('heading for mid-grid danger',targetCell.number);
                inDanger = true;
              }
            }
          }

          if (inDanger === false) {
            // console.log('safe: move_west');
            // currentInstruction.limit = 1;
            app.keyPressed[plyr.number - 1].west = true;
            app.players[plyr.number - 1].turnCheckerDirection = "west";
            // plyr.ai.currentInstruction++;
            if (currentInstruction.limit === 1) {
              plyr.ai.currentInstruction++;
            } else {
              if (currentInstruction.count < currentInstruction.limit) {
                currentInstruction.count++;
              } else if (currentInstruction.count >= currentInstruction.limit) {
                plyr.ai.currentInstruction++;
              }
            }
          } else {
            // console.log('danger: move_west');
            plyr.ai.currentInstruction++;
            plyr.ai.resetInstructions = true;
          }
        }
        break;
      case "strafe_south":
        // console.log('ai act -- strafe_south');
        if (
          plyr.newMoveDelay.state !== true &&
          plyr.moving.state !== true &&
          !plyr.turning.state &&
          plyr.success.deflected.state !== true &&
          plyr.action === "idle"
        ) {
          let inDanger = false;
          // if (plyr.direction === 'south') {
          if (!targetCell) {
            // console.log('heading off the edge');
            inDanger = true;
          } else {
            if (targetCell.void.state === true || targetCell.terrain.type === "deep" || targetCell.terrain.type === "hazard") {
              // console.log('heading for mid-grid danger');
              inDanger = true;
            }
          }
          // }

          if (inDanger === false) {
            // currentInstruction.limit = 1;
            app.keyPressed[plyr.number - 1].strafe = true;
            app.keyPressed[plyr.number - 1].south = true;

            // app.players[plyr.number-1].turnCheckerDirection = 'south';
            // plyr.ai.currentInstruction++;
            if (currentInstruction.limit === 1) {
              plyr.ai.currentInstruction++;
            } else {
              if (currentInstruction.count < currentInstruction.limit) {
                currentInstruction.count++;
              } else if (currentInstruction.count >= currentInstruction.limit) {
                plyr.ai.currentInstruction++;
              }
            }
          } else {
            // console.log('danger');
            plyr.ai.currentInstruction++;
            plyr.ai.resetInstructions = true;
          }
        }
        break;
      case "strafe_north":
        // console.log('ai act -- strafe_north');
        if (
          plyr.newMoveDelay.state !== true &&
          plyr.moving.state !== true &&
          !plyr.turning.state &&
          plyr.success.deflected.state !== true &&
          plyr.action === "idle"
        ) {
          let inDanger = false;
          // if (plyr.direction === 'north') {
          if (!targetCell) {
            // console.log('heading off the edge');
            inDanger = true;
          } else {
            if (targetCell.void.state === true || targetCell.terrain.type === "deep" || targetCell.terrain.type === "hazard") {
              // console.log('heading for mid-grid danger');
              inDanger = true;
            }
          }
          // }

          if (inDanger === false) {
            // currentInstruction.limit = 1;
            app.keyPressed[plyr.number - 1].strafe = true;
            app.keyPressed[plyr.number - 1].north = true;

            // app.players[plyr.number-1].turnCheckerDirection = 'north';
            // plyr.ai.currentInstruction++;
            if (currentInstruction.limit === 1) {
              plyr.ai.currentInstruction++;
            } else {
              if (currentInstruction.count < currentInstruction.limit) {
                currentInstruction.count++;
              } else if (currentInstruction.count >= currentInstruction.limit) {
                plyr.ai.currentInstruction++;
              }
            }
          } else {
            // console.log('danger');
            plyr.ai.currentInstruction++;
            plyr.ai.resetInstructions = true;
          }
        }
        break;
      case "strafe_east":
        // console.log('ai act -- strafe_east');
        if (
          plyr.newMoveDelay.state !== true &&
          plyr.moving.state !== true &&
          !plyr.turning.state &&
          plyr.success.deflected.state !== true &&
          plyr.action === "idle"
        ) {
          let inDanger = false;
          // if (plyr.direction === 'east') {
          if (!targetCell) {
            // console.log('heading off the edge');
            inDanger = true;
          } else {
            if (targetCell.void.state === true || targetCell.terrain.type === "deep" || targetCell.terrain.type === "hazard") {
              // console.log('heading for mid-grid danger');
              inDanger = true;
            }
          }
          // }

          if (inDanger === false) {
            // currentInstruction.limit = 1;
            app.keyPressed[plyr.number - 1].strafe = true;
            app.keyPressed[plyr.number - 1].east = true;

            // app.players[plyr.number-1].turnCheckerDirection = 'east';
            // plyr.ai.currentInstruction++;
            if (currentInstruction.limit === 1) {
              plyr.ai.currentInstruction++;
            } else {
              if (currentInstruction.count < currentInstruction.limit) {
                currentInstruction.count++;
              } else if (currentInstruction.count >= currentInstruction.limit) {
                plyr.ai.currentInstruction++;
              }
            }
          } else {
            // console.log('danger');
            plyr.ai.currentInstruction++;
            plyr.ai.resetInstructions = true;
          }
        }
        break;
      case "strafe_west":
        // console.log('ai act -- strafe_west');
        if (
          plyr.newMoveDelay.state !== true &&
          plyr.moving.state !== true &&
          !plyr.turning.state &&
          plyr.success.deflected.state !== true &&
          plyr.action === "idle"
        ) {
          let inDanger = false;
          // if (plyr.direction === 'west') {
          if (!targetCell) {
            // console.log('heading off the edge');
            inDanger = true;
          } else {
            if (targetCell.void.state === true || targetCell.terrain.type === "deep" || targetCell.terrain.type === "hazard") {
              // console.log('heading for mid-grid danger');
              inDanger = true;
            }
          }
          // }

          if (inDanger === false) {
            // currentInstruction.limit = 1;
            app.keyPressed[plyr.number - 1].strafe = true;
            app.keyPressed[plyr.number - 1].west = true;

            // app.players[plyr.number-1].turnCheckerDirection = 'west';
            // plyr.ai.currentInstruction++;
            if (currentInstruction.limit === 1) {
              plyr.ai.currentInstruction++;
            } else {
              if (currentInstruction.count < currentInstruction.limit) {
                currentInstruction.count++;
              } else if (currentInstruction.count >= currentInstruction.limit) {
                plyr.ai.currentInstruction++;
              }
            }
          } else {
            // console.log('danger');
            plyr.ai.currentInstruction++;
            plyr.ai.resetInstructions = true;
          }
        }
        break;
      case "flank_north":
        // console.log('ai act -- flank_north');
        if (plyr.flanking.state !== true && plyr.action !== "flanking") {
          // console.log('flanking north @ ai act');
          // currentInstruction.limit = 1;
          app.keyPressed[plyr.number - 1].dodge = true;
          app.keyPressed[plyr.number - 1].north = true;
          if (currentInstruction.count < currentInstruction.limit) {
            currentInstruction.count++;
          } else if (currentInstruction.count >= currentInstruction.limit) {
            plyr.ai.currentInstruction++;
          }
        }
        break;
      case "flank_south":
        // console.log('ai act -- flank_south');
        if (plyr.flanking.state !== true && plyr.action !== "flanking") {
          // console.log('flanking south @ ai act');
          // currentInstruction.limit = 1;
          app.keyPressed[plyr.number - 1].dodge = true;
          app.keyPressed[plyr.number - 1].south = true;
          if (currentInstruction.count < currentInstruction.limit) {
            currentInstruction.count++;
          } else if (currentInstruction.count >= currentInstruction.limit) {
            plyr.ai.currentInstruction++;
          }
        }
        break;
      case "flank_east":
        // console.log('ai act -- flank_east');
        if (plyr.flanking.state !== true && plyr.action !== "flanking") {
          // console.log('flanking east @ ai act');
          // currentInstruction.limit = 1;
          app.keyPressed[plyr.number - 1].dodge = true;
          app.keyPressed[plyr.number - 1].east = true;
          if (currentInstruction.count < currentInstruction.limit) {
            currentInstruction.count++;
          } else if (currentInstruction.count >= currentInstruction.limit) {
            plyr.ai.currentInstruction++;
          }
        }
        break;
      case "flank_west":
        // console.log('ai act -- flank_west');
        if (plyr.flanking.state !== true && plyr.action !== "flanking") {
          // console.log('flanking west @ ai act');
          // currentInstruction.limit = 1;
          app.keyPressed[plyr.number - 1].dodge = true;
          app.keyPressed[plyr.number - 1].west = true;
          if (currentInstruction.count < currentInstruction.limit) {
            currentInstruction.count++;
          } else if (currentInstruction.count >= currentInstruction.limit) {
            plyr.ai.currentInstruction++;
          }
        }
        break;
      case "attack_charge": {
        const maxCharge = Number.isFinite(plyr.attacking?.maxCharge) ? plyr.attacking.maxCharge : 0;
        let chargeTarget = Number.isFinite(currentInstruction.chargeTarget) ? currentInstruction.chargeTarget : 0;
        if (chargeTarget < 0) {
          chargeTarget = 0;
        }
        if (maxCharge > 0) {
          chargeTarget = Math.min(chargeTarget, maxCharge);
        }

        const maxHold = Number.isFinite(currentInstruction.limit) ? currentInstruction.limit : Math.max(10, chargeTarget + 8);
        const peakReached = plyr.attacking.peakCount > 0 && plyr.attacking.count >= plyr.attacking.peakCount;
        const chargeReached = chargeTarget > 0 && plyr.attacking.chargeCount >= chargeTarget;
        const shouldRelease = plyr.attacking.state === true && ((chargeTarget <= 0 && peakReached) || chargeReached);

        if (currentInstruction.count === 0) {
          logAct("attackChargeStart", {
            charge_target: chargeTarget,
            max_charge: maxCharge,
            max_hold: maxHold,
          });
        }

        app.keyPressed[plyr.number - 1].attack = true;
        setDirectionalInput();

        if (plyr.moving.state !== true) {
          if (shouldRelease === true || currentInstruction.count >= maxHold) {
            if (shouldRelease === true) {
              logAct("attackChargeRelease", {
                charge_count: plyr.attacking.chargeCount,
                charge_target: chargeTarget,
                peak_count: plyr.attacking.peakCount,
              });
            }
            plyr.ai.currentInstruction++;
          } else {
            currentInstruction.count++;
          }
        }
        break;
      }
      case "attack":
        // console.log('ai act -- attack');
        let atkPeak;
        if (plyr.currentWeapon.name === "") {
          atkPeak = plyr.attacking.animRef.peak.unarmed;
        } else {
          atkPeak = plyr.attacking.animRef.peak[plyr.currentWeapon.type];
        }
        currentInstruction.limit = atkPeak + 2;
        if (currentInstruction.count === 0) {
          logAct("attackStart", {
            weapon_type: plyr.currentWeapon.type || "unarmed",
            peak: atkPeak,
          });
        }
        app.keyPressed[plyr.number - 1].attack = true;
        setDirectionalInput();
        if (plyr.moving.state !== true) {
          if (currentInstruction.count < currentInstruction.limit) {
            currentInstruction.count++;
          } else if (currentInstruction.count >= currentInstruction.limit) {
            plyr.ai.currentInstruction++;
          }
        }
        break;
      case "long_defend":
        // console.log('ai act -- long defend');
        currentInstruction.limit = 25;
        if (currentInstruction.count === 0) {
          logAct("defendStart", { limit: currentInstruction.limit });
        }
        app.keyPressed[plyr.number - 1].defend = true;
        setDirectionalInput();
        if (currentInstruction.count < currentInstruction.limit) {
          currentInstruction.count++;
        } else if (currentInstruction.count >= currentInstruction.limit) {
          plyr.ai.currentInstruction++;
        }
        break;
      case "short_defend":
        // console.log('ai act -- short defend');
        currentInstruction.limit = 15;
        app.keyPressed[plyr.number - 1].defend = true;
        setDirectionalInput();
        if (currentInstruction.count < currentInstruction.limit) {
          currentInstruction.count++;
        } else if (currentInstruction.count >= currentInstruction.limit) {
          plyr.ai.currentInstruction++;
        }
        break;
      case "dodge":
        // console.log('ai act -- dodge');
        currentInstruction.limit = 1;
        app.keyPressed[plyr.number - 1].dodge = true;
        if (currentInstruction.count < currentInstruction.limit) {
          currentInstruction.count++;
        } else if (currentInstruction.count >= currentInstruction.limit) {
          plyr.ai.currentInstruction++;
        }
        break;
      case "pickup":
        logAct("pickup", { limit: currentInstruction.limit });
        // currentInstruction.limit = 10;
        // app.keyPressed[plyr.number-1].defend = true;
        app.keyPressed[plyr.number - 1].cycleWeapon = true;

        if (currentInstruction.count < currentInstruction.limit) {
          currentInstruction.count++;
        } else if (currentInstruction.count >= currentInstruction.limit) {
          plyr.ai.currentInstruction++;
        }
        break;
      case "drop_weapon":
        logAct("dropWeapon");
        // currentInstruction.limit = 10;
        app.keyPressed[plyr.number - 1].defend = true;
        if (currentInstruction.count > 3) {
          app.keyPressed[plyr.number - 1].cycleWeapon = true;
        }

        if (currentInstruction.count < currentInstruction.limit) {
          currentInstruction.count++;
        } else if (currentInstruction.count >= currentInstruction.limit) {
          plyr.ai.currentInstruction++;
        }
        break;
    }

    if (plyr.ai.currentInstruction === plyr.ai.instructions.length) {
      // console.log('NO MORE INSTRUCTIONS!!');
      if (plyr.ai.engaging.state === true) {
        plyr.ai.engaging.state = false;
        plyr.ai.engaging.targetAction = "";
      }
    }
    if (plyr.ai.mission === "engage" && plyr.currentWeapon.type === "crossbow") {
      if (plyr.ai.currentInstruction === plyr.ai.instructions.length - 1) {
        if (plyr.ai.engaging.state === true) {
          plyr.ai.engaging.state = false;
          plyr.ai.engaging.targetAction = "";
        }
      }
    }

    let index = plyr.ai.instructions.indexOf(currentInstruction);
    if (index >= plyr.ai.instructions.length - 1 && plyr.ai.mission === "patrol" && plyr.ai.patrolling.checkin === "checkedIn") {
      // console.log('patrol instructions complete');
      plyr.ai.instructions = [];
      app.players[plyr.number - 1].ai.patrolling.loopControl = false;
    }
    if (index >= plyr.ai.instructions.length - 1 && plyr.ai.mission === "defend" && plyr.ai.defending.checkin === "checkedIn") {
      // console.log('defend instructions complete');
      plyr.ai.instructions = [];
    }
  } else {
    app.keyPressed[plyr.number - 1] = {
      north: false,
      south: false,
      east: false,
      west: false,
      northEast: false,
      northWest: false,
      southEast: false,
      southWest: false,
      attack: false,
      defend: false,
      strafe: false,
      cycleWeapon: false,
      cycleArmor: false,
      dodge: false,
      menu: false,
    };
  }
}
