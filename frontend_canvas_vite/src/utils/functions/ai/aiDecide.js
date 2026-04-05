import Easystar from "easystarjs";

export function aiDecide(app, aiPlayer) {
  // console.log('aiDecide',aiPlayer.number);

  let getPath = false;
  const logDecide = (message, data = {}) => {
    app.globalLogger("ai.decide", message, { plyr_no: aiPlayer.number, ...data }, { fn: "aiDecide" });
  };
  const getCell = (x, y) => app.gridInfo.find((cell) => cell.number.x === x && cell.number.y === y);
  const isUnsafeCell = (cell) => {
    if (!cell) {
      return true;
    }
    return cell.levelData.split("_")[1] !== "*" || cell.terrain.type === "deep" || cell.terrain.type === "hazard" || cell.void.state === true;
  };
  const isJumpGapCell = (cell) => {
    if (!cell) {
      return false;
    }

    if (cell.levelData.split("_")[1] !== "*") {
      return false;
    }

    const isGap = cell.void.state === true || cell.terrain.type === "deep" || cell.terrain.type === "hazard";
    if (!isGap) {
      return false;
    }

    const candidates = [
      { dir: "north", from: { x: cell.number.x, y: cell.number.y + 1 }, to: { x: cell.number.x, y: cell.number.y - 1 } },
      { dir: "south", from: { x: cell.number.x, y: cell.number.y - 1 }, to: { x: cell.number.x, y: cell.number.y + 1 } },
      { dir: "east", from: { x: cell.number.x - 1, y: cell.number.y }, to: { x: cell.number.x + 1, y: cell.number.y } },
      { dir: "west", from: { x: cell.number.x + 1, y: cell.number.y }, to: { x: cell.number.x - 1, y: cell.number.y } },
    ];

    for (const candidate of candidates) {
      const fromCell = getCell(candidate.from.x, candidate.from.y);
      const toCell = getCell(candidate.to.x, candidate.to.y);

      if (isUnsafeCell(fromCell) || isUnsafeCell(toCell)) {
        continue;
      }

      if (toCell.obstacle.state === true) {
        continue;
      }

      if (toCell.barrier.state === true && toCell.barrier.position === app.getOppositeDirection(candidate.dir)) {
        continue;
      }

      if (cell.barrier.state === true && cell.barrier.position === app.getOppositeDirection(candidate.dir)) {
        continue;
      }

      logDecide("jumpGapCandidate", {
        gap: cell.number,
        from: fromCell.number,
        to: toCell.number,
        dir: candidate.dir,
      });
      return true;
    }

    return false;
  };

  const resolveChargeTarget = () => {
    const maxCharge = Number.isFinite(aiPlayer.attacking?.maxCharge) ? aiPlayer.attacking.maxCharge : 0;
    if (maxCharge <= 0) {
      return 0;
    }

    const intent = aiPlayer.ai.chargeIntent || "quick";
    if (intent === "full") {
      return maxCharge;
    }
    if (intent === "medium") {
      return Math.max(1, Math.ceil(maxCharge * 0.5));
    }
    return 0;
  };

  const applyChargePlan = (instructions) => {
    if (!Array.isArray(instructions)) {
      return instructions;
    }

    const chargeTarget = resolveChargeTarget();
    const chargeHoldLimit = Math.max(10, chargeTarget + 8);

    return instructions.map((inst) => {
      if (!inst || inst.keyword !== "attack") {
        return inst;
      }
      return {
        ...inst,
        keyword: "attack_charge",
        chargeTarget: chargeTarget,
        limit: Math.max(inst.limit || 0, chargeHoldLimit),
      };
    });
  };

  let targetPlayer = app.players[aiPlayer.ai.targetPlayer.number - 1];
  let prevTargetPos = aiPlayer.ai.targetPlayer.currentPosition;
  let currentTargetPos;
  if (aiPlayer.ai.targetSet === true) {
    currentTargetPos = targetPlayer.currentPosition.cell.number;
  }

  // CHECK FOR PURSUIT TARGET POSITION CHANGE!!
  if (aiPlayer.ai.mission === "pursue" && aiPlayer.ai.targetSet === true) {
    // console.log('pursuing');

    if (
      prevTargetPos.x !== currentTargetPos.x ||
      (prevTargetPos.y !== currentTargetPos.y && targetPlayer.dead.state !== true && targetPlayer.falling.state !== true)
    ) {
      logDecide("pursuitTargetMoved", {
        plyr_no: aiPlayer.number,
        prevTargetPos: prevTargetPos,
        currentTargetPos: currentTargetPos,
      });

      aiPlayer.ai.targetPlayer.currentPosition = {
        x: targetPlayer.currentPosition.cell.number.x,
        y: targetPlayer.currentPosition.cell.number.y,
      };
      getPath = true;
      aiPlayer.ai.targetAcquired = true;
      aiPlayer.ai.currentInstruction = 0;
    }
    if (aiPlayer.ai.targetSet === true && aiPlayer.ai.targetAcquired !== true) {
      getPath = true;
      aiPlayer.ai.targetAcquired = true;
    } else if (getPath !== true) {
      // console.log('target position unchanged! Skipping path update!');
      getPath = false;
    }
  }

  let patrolDest;
  if (aiPlayer.ai.mission === "patrol") {
    // console.log('patrolling',aiPlayer.ai.patrolling.checkin);
    if (targetPlayer) {
      if (
        prevTargetPos.x !== currentTargetPos.x ||
        (prevTargetPos.y !== currentTargetPos.y && targetPlayer.dead.state !== true && targetPlayer.falling.state !== true)
      ) {
        // console.log('patrolling but target location changed! Dont update path. Just track target',aiPlayer.number);

        aiPlayer.ai.targetPlayer.currentPosition = {
          x: targetPlayer.currentPosition.cell.number.x,
          y: targetPlayer.currentPosition.cell.number.y,
        };
      }
    }

    if (!aiPlayer.ai.patrolling.checkin) {
      // if (aiPlayer.ai.instructions.length > 0) {
      //   console.log('bloody hell');
      //   aiPlayer.ai.instructions = []
      // }
      // console.log('start out to patrol location @',aiPlayer.ai.patrolling.area[0],aiPlayer.ai.instructions,aiPlayer.ai.currentInstruction,aiPlayer.ai.patrolling.area[0]);

      aiPlayer.ai.patrolling.checkin = "enroute";

      if (!aiPlayer.popups.find((x) => x.msg === "missionEnroute")) {
        aiPlayer.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "missionEnroute",
          img: "",
        });
      }

      patrolDest = aiPlayer.ai.patrolling.area[0];
      getPath = true;
    }
    if (aiPlayer.ai.patrolling.checkin === "enroute") {
      if (aiPlayer.attacking.state === true) {
        aiPlayer.attacking.state = false;
      }

      if (
        aiPlayer.ai.patrolling.area[0].x === aiPlayer.currentPosition.cell.number.x &&
        aiPlayer.ai.patrolling.area[0].y === aiPlayer.currentPosition.cell.number.y
      ) {
        aiPlayer.ai.patrolling.checkin = "arrived";
        // console.log('arrived @ patrol point');
      } else {
        // console.log('en route to patrol. do nothing',aiPlayer.ai.patrolling.area[0]);
      }
    }
    if (aiPlayer.ai.patrolling.checkin === "arrived") {
      aiPlayer.ai.patrolling.checkin = "checkedIn";
      aiPlayer.ai.currentInstruction = 0;
      aiPlayer.ai.instructions = [];
      patrolDest = aiPlayer.ai.patrolling.area[1];
      getPath = true;
      // console.log('checked in to patrol point. moving to 2nd point @ ',patrolDest);
    }

    if (aiPlayer.ai.patrolling.checkin === "checkedIn" && aiPlayer.ai.patrolling.loopControl === false) {
      // console.log('currently patrolling');
      let currentPatrolPoint = aiPlayer.ai.patrolling.area.findIndex(
        (elem) => elem.x === aiPlayer.currentPosition.cell.number.x && elem.y === aiPlayer.currentPosition.cell.number.y,
      );
      // console.log('currentPatrolPoint 1',currentPatrolPoint, aiPlayer.currentPosition.cell.number);
      if (currentPatrolPoint === 0) {
        patrolDest = aiPlayer.ai.patrolling.area[1];
        getPath = true;
        aiPlayer.ai.patrolling.loopControl = true;
      }
      if (currentPatrolPoint === 1) {
        patrolDest = aiPlayer.ai.patrolling.area[0];
        getPath = true;
        aiPlayer.ai.patrolling.loopControl = true;
      }
    }
  }

  if (aiPlayer.ai.mission === "engage" && aiPlayer.attacking.state !== true) {
    // console.log('engaging');

    // CHECK FOR TARGET LOCATION CHNAGE!
    if (
      prevTargetPos.x !== currentTargetPos.x ||
      (prevTargetPos.y !== currentTargetPos.y && targetPlayer.dead.state !== true && targetPlayer.falling.state !== true)
    ) {
      // console.log('engage target location changed! Updating path for player',aiPlayer.number,targetPlayer.dead.state);

      aiPlayer.ai.targetPlayer.currentPosition = {
        x: targetPlayer.currentPosition.cell.number.x,
        y: targetPlayer.currentPosition.cell.number.y,
      };
      if (aiPlayer.ai.primaryMission === "pursue") {
        aiPlayer.ai.mission = "pursue";
        app.aiResetRanges(aiPlayer);

        if (!aiPlayer.popups.find((x) => x.msg === "missionPursue")) {
          aiPlayer.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "missionPursue",
            img: "",
          });
        }
      }

      aiPlayer.ai.targetAcquired = false;
    }

    let oppositeDir;
    let engageTargetAction;
    // FACE TARGET!
    if (
      targetPlayer.currentPosition.cell.number.x === aiPlayer.currentPosition.cell.number.x &&
      targetPlayer.currentPosition.cell.number.y > aiPlayer.currentPosition.cell.number.y
    ) {
      if (aiPlayer.direction !== "south") {
        aiPlayer.direction = "south";
        // oppositeDir = 'north';
      }
      oppositeDir = "north";
    }
    if (
      targetPlayer.currentPosition.cell.number.x === aiPlayer.currentPosition.cell.number.x &&
      targetPlayer.currentPosition.cell.number.y < aiPlayer.currentPosition.cell.number.y
    ) {
      if (aiPlayer.direction !== "north") {
        aiPlayer.direction = "north";
        // oppositeDir = 'south';
      }
      oppositeDir = "south";
    }
    if (
      targetPlayer.currentPosition.cell.number.x < aiPlayer.currentPosition.cell.number.x &&
      targetPlayer.currentPosition.cell.number.y === aiPlayer.currentPosition.cell.number.y
    ) {
      if (aiPlayer.direction !== "west") {
        aiPlayer.direction = "west";
        // oppositeDir = 'east';
      }
      oppositeDir = "east";
    }
    if (
      targetPlayer.currentPosition.cell.number.x > aiPlayer.currentPosition.cell.number.x &&
      targetPlayer.currentPosition.cell.number.y === aiPlayer.currentPosition.cell.number.y
    ) {
      if (aiPlayer.direction !== "east") {
        aiPlayer.direction = "east";
        // oppositeDir = 'west';
      }
      oppositeDir = "west";
    }

    app.getTarget(aiPlayer);
    // if (aiPlayer.ai.engaging.state === true) {
    // if (aiPlayer.ai.engaging.state !== true) {

    if (aiPlayer.currentWeapon.type === "crossbow" && aiPlayer.action === "idle" && aiPlayer.success.deflected.state !== true) {
      let instructions3 = [];
      // ENGAGED TARGET IS OPEN TO ATTACK!
      if (
        targetPlayer.defending.state !== true &&
        targetPlayer.attacking.state !== true &&
        targetPlayer.defending.decay.state !== true &&
        targetPlayer.dodging.state !== true
      ) {
        // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,'is neither attacking nor defending');

        if (
          aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x - 3 ||
          aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x + 3 ||
          aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y - 3 ||
          aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y + 3 ||
          aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x - 2 ||
          aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x + 2 ||
          aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y - 2 ||
          aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y + 2 ||
          aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x - 1 ||
          aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x + 1 ||
          aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y - 1 ||
          aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y + 1
        ) {
          logDecide("crossbowTooClose", {
            target_no: targetPlayer?.number,
            target_pos: targetPlayer?.currentPosition?.cell?.number,
          });
          aiPlayer.ai.retreating.state = false;
          aiPlayer.ai.retreating.checkin = undefined;
          aiPlayer.ai.mission = "retreat";
          aiPlayer.ai.retreating.safe = false;

          if (!aiPlayer.popups.find((x) => x.msg === "missionRetreat")) {
            aiPlayer.popups.push({
              state: false,
              count: 0,
              limit: 30,
              type: "",
              position: "",
              msg: "missionRetreat",
              img: "",
            });
          }
          // aiPlayer.ai.currentInstruction = 0;
        } else if (aiPlayer.items.ammo > 0) {
          instructions3.push({
            keyword: "attack",
            count: 0,
            limit: 1,
          });
        }
        if (aiPlayer.items.ammo === 0) {
          logDecide("crossbowNoAmmo");
        }

        engageTargetAction = "open";
      }
      if (targetPlayer.defending.state === true || targetPlayer.defending.decay.count > targetPlayer.defending.decay.limit - 10) {
      }

      let deflecting = false;
      if (app.aiDeflectedCheck.includes(aiPlayer.number) === true) {
        deflecting = true;
      }
      if (deflecting === true) {
        aiPlayer.ai.instructions = [];
        aiPlayer.ai.currentInstruction = 0;
        aiPlayer.ai.engaging.targetAction = "";
      }

      if (aiPlayer.ai.engaging.targetAction !== engageTargetAction && deflecting !== true) {
        // console.log('target status has changed. switch up the approach');

        // aiPlayer.ai.instructions = instructions3;
        aiPlayer.ai.instructions = applyChargePlan(instructions3);
        aiPlayer.ai.currentInstruction = 0;
        aiPlayer.ai.engaging.state = true;
        aiPlayer.ai.engaging.targetAction = engageTargetAction;
      }
    }
    if (aiPlayer.currentWeapon.type === "spear" && aiPlayer.action === "idle" && aiPlayer.success.deflected.state !== true) {
      let instructions2 = [];

      // ENGAGED TARGET IS OPEN TO ATTAVK!
      if (targetPlayer.defending.state !== true && targetPlayer.attacking.state !== true && targetPlayer.defending.decay.state !== true) {
        // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,'is neither attacking nor defending')
        if (aiPlayer.ai.safeRange === true) {
          if (oppositeDir) {
            if (aiPlayer.target.cell2.occupant.type === "player") {
              // console.log('target is too close! back it up');
              instructions2.push(
                {
                  keyword: "strafe_" + oppositeDir,
                  count: 0,
                  limit: 1,
                },
                {
                  keyword: "strafe_" + oppositeDir,
                  count: 0,
                  limit: 1,
                },
              );
            }
            if (
              aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x - 3 ||
              aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x + 3 ||
              aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y - 3 ||
              aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y + 3
            ) {
              instructions2.push({
                keyword: "move_" + aiPlayer.direction,
                count: 0,
                limit: 1,
              });
            }
            instructions2.push(
              {
                keyword: "attack",
                count: 0,
                limit: 1,
              },
              {
                keyword: "strafe_" + oppositeDir,
                count: 0,
                limit: 1,
              },
              {
                keyword: "short_wait",
                count: 0,
                limit: 15,
              },
            );
          }
        } else {
          instructions2.push(
            {
              keyword: "attack",
              count: 0,
              limit: 1,
            },
            {
              keyword: "short_wait",
              count: 0,
              limit: 1,
            },
          );
        }
        engageTargetAction = "open";
      }

      // ENGAGED TARGET IS DEFENDING!
      if (targetPlayer.defending.decay.count > targetPlayer.defending.decay.limit - 10) {
        logDecide("targetDefending", {
          target_no: targetPlayer?.number,
          defend_decay: targetPlayer?.defending?.decay?.count,
        });
        if (aiPlayer.ai.safeRange === true) {
          if (oppositeDir) {
            if (aiPlayer.target.cell2.occupant.type === "player") {
              // console.log('target is too close! back it up');
              instructions2.push(
                {
                  keyword: "strafe_" + oppositeDir,
                  count: 0,
                  limit: 1,
                },
                {
                  keyword: "strafe_" + oppositeDir,
                  count: 0,
                  limit: 1,
                },
              );
            }
            if (
              aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x - 3 ||
              aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x + 3 ||
              aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y - 3 ||
              aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y + 3
            ) {
              instructions2.push({
                keyword: "move_" + aiPlayer.direction,
                count: 0,
                limit: 1,
              });
            }
            instructions2.push(
              {
                keyword: "attack",
                count: 0,
                limit: 1,
              },
              {
                keyword: "strafe_" + oppositeDir,
                count: 0,
                limit: 1,
              },
              {
                keyword: "short_wait",
                count: 0,
                limit: 15,
              },
            );
          }
        } else {
          instructions2.push(
            {
              keyword: "attack",
              count: 0,
              limit: 1,
            },
            {
              keyword: "short_wait",
              count: 0,
              limit: 1,
            },
          );
        }
        engageTargetAction = "defend";
      }

      // ENGAGED TARGET IS ATTACKING!
      if (targetPlayer.attacking.count > 0) {
        // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,' is attacking',targetPlayer.attacking.count);

        // ATTACK IS PEAKING!
        if (
          targetPlayer.attacking.count < targetPlayer.attacking.animRef.peak.spear &&
          targetPlayer.attacking.count >= targetPlayer.attacking.animRef.peak.spear - 4
        ) {
          logDecide("targetAttackPeak");
          let whatDo3 = app.rnJesus(1, 2);

          // DEFEND!
          if (whatDo3 === 1) {
            logDecide("respondDefend");
            instructions2.push({
              keyword: "long_defend",
              count: 0,
              limit: 1,
            });
          }

          // DODGE!
          else {
            logDecide("respondDodge");
            instructions2.push({
              keyword: "dodge",
              count: 0,
              limit: 1,
            });
          }
        }

        // ATTACK IS EARLY!
        if (targetPlayer.attacking.count <= 8) {
          logDecide("targetAttackEarly");
          let whatDo4 = app.rnJesus(1, 4);
          // whatDo2 = 4

          // DEFEND!
          if (whatDo4 === 1) {
            logDecide("respondDefend");
            instructions2.push({
              keyword: "long_defend",
              count: 0,
              limit: 1,
            });
          }

          // FLANK!
          if (whatDo4 === 2) {
            let flankDir3;
            let aiPosCell3 = app.gridInfo.find(
              (elem) => elem.number.x === aiPlayer.currentPosition.cell.number.x && elem.number.y === aiPlayer.currentPosition.cell.number.y,
            );

            switch (aiPlayer.direction) {
              case "north":
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "east") {
                  flankDir3 = "west";
                }
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "west") {
                  flankDir3 = "east";
                } else {
                  flankDir3 = "west";
                }
                break;
              case "south":
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "east") {
                  flankDir3 = "west";
                }
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "west") {
                  flankDir3 = "east";
                } else {
                  flankDir3 = "west";
                }
                break;
              case "east":
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "north") {
                  flankDir3 = "south";
                }
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "south") {
                  flankDir3 = "north";
                } else {
                  flankDir3 = "south";
                }
                break;
              case "west":
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "north") {
                  flankDir3 = "south";
                }
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "south") {
                  flankDir3 = "north";
                } else {
                  flankDir3 = "south";
                }
                break;
            }
            logDecide("respondFlank", { dir: flankDir3 });

            instructions2.push({
              keyword: "flank_" + flankDir3,
              count: 0,
              limit: 5,
            });
          }

          // DODGE!
          if (whatDo4 === 3) {
            logDecide("respondDodge");
            instructions2.push({
              keyword: "dodge",
              count: 0,
              limit: 1,
            });
          }

          // STRAFE EVADE!
          if (whatDo4 === 4) {
            logDecide("respondStrafeEvade");
            let evadeDirection2;
            let cellsToConsider2 = [
              {
                x: aiPlayer.currentPosition.cell.number.x + 1,
                y: aiPlayer.currentPosition.cell.number.y,
              },
              {
                x: aiPlayer.currentPosition.cell.number.x - 1,
                y: aiPlayer.currentPosition.cell.number.y,
              },
              {
                x: aiPlayer.currentPosition.cell.number.x,
                y: aiPlayer.currentPosition.cell.number.y + 1,
              },
              {
                x: aiPlayer.currentPosition.cell.number.x,
                y: aiPlayer.currentPosition.cell.number.y - 1,
              },
            ];
            for (const cell2 of cellsToConsider2) {
              let freeCell2 = true;
              let cellRef2 = app.gridInfo.find((elem) => elem.number.x === cell2.x && elem.number.y === cell2.y);
              if (cellRef2) {
                let terrainInfo4 = cellRef2.levelData.length - 1;
                if (
                  cellRef2.levelData.charAt(terrainInfo4) === "j" ||
                  cellRef2.levelData.charAt(terrainInfo4) === "h" ||
                  cellRef2.levelData.charAt(terrainInfo4) === "i" ||
                  cellRef2.levelData.charAt(0) !== "x" ||
                  cellRef2.void.state === true
                ) {
                  freeCell2 = false;
                }
                for (const plyr6 of app.players) {
                  if (plyr6.currentPosition.cell.number.x === cellRef2.number.x && plyr6.currentPosition.cell.number.y === cellRef2.number.y) {
                    freeCell2 = false;
                  }
                }
              } else {
                freeCell2 = false;
              }
              if (freeCell2 === true) {
                if (cell2.x === aiPlayer.currentPosition.cell.number.x + 1 && cell2.y === aiPlayer.currentPosition.cell.number.y) {
                  evadeDirection2 = "east";
                }
                if (cell2.x === aiPlayer.currentPosition.cell.number.x - 1 && cell2.y === aiPlayer.currentPosition.cell.number.y) {
                  evadeDirection2 = "west";
                }
                if (cell2.x === aiPlayer.currentPosition.cell.number.x && cell2.y === aiPlayer.currentPosition.cell.number.y + 1) {
                  evadeDirection2 = "south";
                }
                if (cell2.x === aiPlayer.currentPosition.cell.number.x && cell2.y === aiPlayer.currentPosition.cell.number.y - 1) {
                  evadeDirection2 = "north";
                }
              }
            }

            instructions2.push({
              keyword: "strafe_" + evadeDirection2,
              count: 0,
              limit: 1,
            });
            aiPlayer.ai.targetAcquired = false;
          }
        }

        engageTargetAction = "attack";
      }

      for (const inst of aiPlayer.ai.instructions) {
        if (inst.keyword === "attack") {
          // console.log('ai '+aiPlayer.number+' decides to attack w/ spear');
        }
      }

      let deflecting = false;
      if (app.aiDeflectedCheck.includes(aiPlayer.number) === true) {
        deflecting = true;
      }
      if (deflecting === true) {
        aiPlayer.ai.instructions = [];
        aiPlayer.ai.currentInstruction = 0;
        aiPlayer.ai.engaging.targetAction = "";
      }

      if (aiPlayer.ai.engaging.targetAction !== engageTargetAction && deflecting !== true) {
        // console.log('target status has changed. switch up the approach');

        // aiPlayer.ai.instructions = instructions2;
        aiPlayer.ai.instructions = applyChargePlan(instructions2);
        aiPlayer.ai.currentInstruction = 0;
        aiPlayer.ai.engaging.state = true;
        aiPlayer.ai.engaging.targetAction = engageTargetAction;
      }

      // console.log('aiPlayer.instructions',aiPlayer.ai.instructions);
    }
    if (aiPlayer.currentWeapon.type === "sword" && aiPlayer.action === "idle" && aiPlayer.success.deflected.state !== true) {
      // console.log('ai decide sword engagement');

      let instructions1 = [];

      // ENGAGED TARGET IS OPEN TO ATTACK!
      if (
        targetPlayer.defending.state !== true &&
        targetPlayer.attacking.state !== true &&
        targetPlayer.defending.decay.state !== true &&
        targetPlayer.dodging.state !== true
      ) {
        // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,'is neither attacking nor defending');
        if (aiPlayer.ai.safeRange === true) {
          if (oppositeDir) {
            // console.log('safe sword range attack flow');

            if (aiPlayer.target.cell1.occupant.type === "player") {
              // console.log('target is too close! back it up');
              instructions1.push({
                keyword: "strafe_" + oppositeDir,
                count: 0,
                limit: 1,
              });
            }
            instructions1.push(
              {
                keyword: "move_" + aiPlayer.direction,
                count: 0,
                limit: 1,
              },
              {
                keyword: "attack",
                count: 0,
                limit: 1,
              },
              {
                keyword: "strafe_" + oppositeDir,
                count: 0,
                limit: 1,
              },
              {
                keyword: "short_wait",
                count: 0,
                limit: 15,
              },
            );
          }
        } else {
          instructions1.push(
            {
              keyword: "attack",
              count: 0,
              limit: 1,
            },
            {
              keyword: "short_wait",
              count: 0,
              limit: 1,
            },
          );
        }
        engageTargetAction = "open";
      }

      // ENGAGED TARGET DEFENDING!
      if (targetPlayer.defending.state === true || targetPlayer.defending.decay.count > targetPlayer.defending.decay.limit - 10) {
        // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,' is defending',targetPlayer.defending.decay.count);

        if (aiPlayer.ai.safeRange === true) {
          if (oppositeDir) {
            // console.log('safe range attack flow');

            if (aiPlayer.target.cell1.occupant.type === "player") {
              // console.log('target is too close! back it up');
              instructions1.push({
                keyword: "strafe_" + oppositeDir,
                count: 0,
                limit: 1,
              });
            }
            instructions1.push(
              {
                keyword: "move_" + aiPlayer.direction,
                count: 0,
                limit: 1,
              },
              {
                keyword: "attack",
                count: 0,
                limit: 1,
              },
              {
                keyword: "strafe_" + oppositeDir,
                count: 0,
                limit: 1,
              },
              {
                keyword: "short_wait",
                count: 0,
                limit: 15,
              },
            );
          }
        } else {
          instructions1.push(
            {
              keyword: "attack",
              count: 0,
              limit: 1,
            },
            {
              keyword: "short_wait",
              count: 0,
              limit: 1,
            },
          );
        }
        engageTargetAction = "defend";
      }

      // ENGAGED TARGET ATTACKING!
      if (targetPlayer.attacking.count > 0) {
        // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,' is attacking',targetPlayer.attacking.count);

        // ATTACK IS PEAKING!
        if (
          targetPlayer.attacking.count < targetPlayer.attacking.animRef.peak.sword &&
          targetPlayer.attacking.count >= targetPlayer.attacking.animRef.peak.sword - 4
        ) {
          logDecide("targetAttackPeak");
          let whatDo = app.rnJesus(1, 2);
          whatDo = 1;

          // DEFEND!
          if (whatDo === 1) {
            logDecide("respondDefend");
            instructions1.push({
              keyword: "long_defend",
              count: 0,
              limit: 1,
            });
          }

          // DODGE!
          else {
            logDecide("respondDodge");
            instructions1.push({
              keyword: "dodge",
              count: 0,
              limit: 1,
            });
          }
        }

        // ATTACK IS EARLY!
        if (targetPlayer.attacking.count <= 6) {
          logDecide("targetAttackEarly");
          let whatDo2 = app.rnJesus(1, 4);
          whatDo2 = 1;

          // DEFEND!
          if (whatDo2 === 1) {
            logDecide("respondDefend");
            instructions1.push({
              keyword: "long_defend",
              count: 0,
              limit: 1,
            });
          }

          // FLANK!
          if (whatDo2 === 2) {
            let flankDir2;
            let aiPosCell2 = app.gridInfo.find(
              (elem) => elem.number.x === aiPlayer.currentPosition.cell.number.x && elem.number.y === aiPlayer.currentPosition.cell.number.y,
            );

            switch (aiPlayer.direction) {
              case "north":
                if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === "east") {
                  flankDir2 = "west";
                }
                if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === "west") {
                  flankDir2 = "east";
                } else {
                  flankDir2 = "west";
                }
                break;
              case "south":
                if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === "east") {
                  flankDir2 = "west";
                }
                if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === "west") {
                  flankDir2 = "east";
                } else {
                  flankDir2 = "west";
                }
                break;
              case "east":
                if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === "north") {
                  flankDir2 = "south";
                }
                if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === "south") {
                  flankDir2 = "north";
                } else {
                  flankDir2 = "south";
                }
                break;
              case "west":
                if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === "north") {
                  flankDir2 = "south";
                }
                if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === "south") {
                  flankDir2 = "north";
                } else {
                  flankDir2 = "south";
                }
                break;
            }
            logDecide("respondFlank", { dir: flankDir2 });

            instructions1.push({
              keyword: "flank_" + flankDir2,
              count: 0,
              limit: 5,
            });
          }

          // DODGE!
          if (whatDo2 === 3) {
            logDecide("respondDodge");
            instructions1.push({
              keyword: "dodge",
              count: 0,
              limit: 1,
            });
          }

          // STRAFE EVADE!
          if (whatDo2 === 4) {
            logDecide("respondStrafeEvade");
            let evadeDirection;
            let cellsToConsider = [
              {
                x: aiPlayer.currentPosition.cell.number.x + 1,
                y: aiPlayer.currentPosition.cell.number.y,
              },
              {
                x: aiPlayer.currentPosition.cell.number.x - 1,
                y: aiPlayer.currentPosition.cell.number.y,
              },
              {
                x: aiPlayer.currentPosition.cell.number.x,
                y: aiPlayer.currentPosition.cell.number.y + 1,
              },
              {
                x: aiPlayer.currentPosition.cell.number.x,
                y: aiPlayer.currentPosition.cell.number.y - 1,
              },
            ];
            for (const cell of cellsToConsider) {
              let freeCell = true;
              let cellRef = app.gridInfo.find((elem) => elem.number.x === cell.x && elem.number.y === cell.y);
              if (cellRef) {
                let terrainInfo3 = cellRef.levelData.length - 1;
                if (
                  cellRef.levelData.charAt(terrainInfo3) === "j" ||
                  cellRef.levelData.charAt(terrainInfo3) === "h" ||
                  cellRef.levelData.charAt(terrainInfo3) === "i" ||
                  cellRef.levelData.charAt(0) !== "x" ||
                  cellRef.void.state === true
                ) {
                  freeCell = false;
                }
                for (const plyr5 of app.players) {
                  if (plyr5.currentPosition.cell.number.x === cellRef.number.x && plyr5.currentPosition.cell.number.y === cellRef.number.y) {
                    freeCell = false;
                  }
                }
              } else {
                freeCell = false;
              }
              if (freeCell === true) {
                if (cell.x === aiPlayer.currentPosition.cell.number.x + 1 && cell.y === aiPlayer.currentPosition.cell.number.y) {
                  evadeDirection = "east";
                }
                if (cell.x === aiPlayer.currentPosition.cell.number.x - 1 && cell.y === aiPlayer.currentPosition.cell.number.y) {
                  evadeDirection = "west";
                }
                if (cell.x === aiPlayer.currentPosition.cell.number.x && cell.y === aiPlayer.currentPosition.cell.number.y + 1) {
                  evadeDirection = "south";
                }
                if (cell.x === aiPlayer.currentPosition.cell.number.x && cell.y === aiPlayer.currentPosition.cell.number.y - 1) {
                  evadeDirection = "north";
                }
              }
            }

            instructions1.push({
              keyword: "strafe_" + evadeDirection,
              count: 0,
              limit: 1,
            });
            aiPlayer.ai.targetAcquired = false;
          }
        }

        engageTargetAction = "attack";
      }

      let deflecting = false;
      if (app.aiDeflectedCheck.includes(aiPlayer.number) === true) {
        deflecting = true;
      }
      if (deflecting === true) {
        aiPlayer.ai.instructions = [];
        aiPlayer.ai.currentInstruction = 0;
        aiPlayer.ai.engaging.targetAction = "";
      }

      // target status has changed. switch up the approach
      if (aiPlayer.ai.engaging.targetAction !== engageTargetAction && deflecting !== true) {
        // if (aiPlayer.ai.engaging.targetAction !== engageTargetAction ) {

        // console.log('target status has changed. switch up the approach');

        // aiPlayer.ai.instructions = instructions1;
        aiPlayer.ai.instructions = applyChargePlan(instructions1);
        aiPlayer.ai.currentInstruction = 0;
        aiPlayer.ai.engaging.state = true;
        aiPlayer.ai.engaging.targetAction = engageTargetAction;
      }

      // console.log('aiPlayer.instructions',aiPlayer.ai.instructions);
    }
    if (
      aiPlayer.currentWeapon.type === "" &&
      aiPlayer.action === "idle" &&
      aiPlayer.success.deflected.state !== true &&
      aiPlayer.ai.organizing.dropped.state !== true
    ) {
      // console.log('unarmed engagement');

      let instructions4 = [];

      // ENGAGED TARGET IS OPEN TO ATTACK!
      if (
        targetPlayer.defending.state !== true &&
        targetPlayer.attacking.state !== true &&
        targetPlayer.defending.decay.state !== true &&
        targetPlayer.dodging.state !== true
      ) {
        // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,'is neither attacking nor defending');
        if (aiPlayer.ai.safeRange === true) {
          if (oppositeDir) {
            // console.log('safe sword range attack flow');

            if (aiPlayer.target.cell1.occupant.type === "player") {
              // console.log('target is too close! back it up');
              instructions4.push({
                keyword: "strafe_" + oppositeDir,
                count: 0,
                limit: 1,
              });
            }
            instructions4.push(
              {
                keyword: "move_" + aiPlayer.direction,
                count: 0,
                limit: 1,
              },
              {
                keyword: "attack",
                count: 0,
                limit: 1,
              },
              {
                keyword: "strafe_" + oppositeDir,
                count: 0,
                limit: 1,
              },
              {
                keyword: "short_wait",
                count: 0,
                limit: 15,
              },
            );
          }
        } else {
          instructions4.push(
            {
              keyword: "attack",
              count: 0,
              limit: 1,
            },
            {
              keyword: "short_wait",
              count: 0,
              limit: 1,
            },
          );
        }

        engageTargetAction = "open";
      }

      // ENGAGED TARGET DEFENDING!
      if (targetPlayer.defending.state === true || targetPlayer.defending.decay.count > targetPlayer.defending.decay.limit - 10) {
        logDecide("targetDefending", {
          target_no: targetPlayer?.number,
          defend_decay: targetPlayer?.defending?.decay?.count,
        });

        if (aiPlayer.ai.safeRange === true) {
          if (oppositeDir) {
            // console.log('safe range attack flow');

            if (aiPlayer.target.cell1.occupant.type === "player") {
              // console.log('target is too close! back it up');
              instructions4.push({
                keyword: "strafe_" + oppositeDir,
                count: 0,
                limit: 1,
              });
            }
            instructions4.push(
              {
                keyword: "move_" + aiPlayer.direction,
                count: 0,
                limit: 1,
              },
              {
                keyword: "attack",
                count: 0,
                limit: 1,
              },
              {
                keyword: "strafe_" + oppositeDir,
                count: 0,
                limit: 1,
              },
              {
                keyword: "short_wait",
                count: 0,
                limit: 15,
              },
            );
          }
        } else {
          instructions4.push(
            {
              keyword: "attack",
              count: 0,
              limit: 1,
            },
            {
              keyword: "short_wait",
              count: 0,
              limit: 1,
            },
          );
        }

        engageTargetAction = "defend";
      }

      // ENGAGED TARGET ATTACKING!
      if (targetPlayer.attacking.count > 0) {
        // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,' is attacking',targetPlayer.attacking.count);

        // ATTACK IS PEAKING!
        if (
          targetPlayer.attacking.count < targetPlayer.attacking.animRef.peak.sword &&
          targetPlayer.attacking.count >= targetPlayer.attacking.animRef.peak.sword - 4
        ) {
          logDecide("targetAttackPeak");
          let whatDo5 = app.rnJesus(1, 2);

          // DEFEND!
          if (whatDo5 === 1) {
            logDecide("respondDefend");
            instructions4.push({
              keyword: "long_defend",
              count: 0,
              limit: 1,
            });
          }

          // DODGE!
          else {
            logDecide("respondDodge");
            instructions4.push({
              keyword: "dodge",
              count: 0,
              limit: 1,
            });
          }
        }

        // ATTACK IS EARLY!
        if (targetPlayer.attacking.count <= 6) {
          logDecide("targetAttackEarly");
          let whatDo6 = app.rnJesus(1, 4);
          // whatDo2 = 4

          // DEFEND!
          if (whatDo6 === 1) {
            logDecide("respondDefend");
            instructions4.push({
              keyword: "long_defend",
              count: 0,
              limit: 1,
            });
          }

          // FLANK!
          if (whatDo6 === 2) {
            let flankDir3;
            let aiPosCell3 = app.gridInfo.find(
              (elem) => elem.number.x === aiPlayer.currentPosition.cell.number.x && elem.number.y === aiPlayer.currentPosition.cell.number.y,
            );

            switch (aiPlayer.direction) {
              case "north":
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "east") {
                  flankDir3 = "west";
                }
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "west") {
                  flankDir3 = "east";
                } else {
                  flankDir3 = "west";
                }
                break;
              case "south":
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "east") {
                  flankDir3 = "west";
                }
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "west") {
                  flankDir3 = "east";
                } else {
                  flankDir3 = "west";
                }
                break;
              case "east":
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "north") {
                  flankDir3 = "south";
                }
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "south") {
                  flankDir3 = "north";
                } else {
                  flankDir3 = "south";
                }
                break;
              case "west":
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "north") {
                  flankDir3 = "south";
                }
                if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === "south") {
                  flankDir3 = "north";
                } else {
                  flankDir3 = "south";
                }
                break;
            }
            logDecide("respondFlank", { dir: flankDir3 });

            instructions4.push({
              keyword: "flank_" + flankDir3,
              count: 0,
              limit: 5,
            });
          }

          // DODGE!
          if (whatDo6 === 3) {
            logDecide("respondDodge");
            instructions4.push({
              keyword: "dodge",
              count: 0,
              limit: 1,
            });
          }

          // STRAFE EVADE!
          if (whatDo6 === 4) {
            logDecide("respondStrafeEvade");
            let evadeDirection3;
            let cellsToConsider3 = [
              {
                x: aiPlayer.currentPosition.cell.number.x + 1,
                y: aiPlayer.currentPosition.cell.number.y,
              },
              {
                x: aiPlayer.currentPosition.cell.number.x - 1,
                y: aiPlayer.currentPosition.cell.number.y,
              },
              {
                x: aiPlayer.currentPosition.cell.number.x,
                y: aiPlayer.currentPosition.cell.number.y + 1,
              },
              {
                x: aiPlayer.currentPosition.cell.number.x,
                y: aiPlayer.currentPosition.cell.number.y - 1,
              },
            ];
            for (const cell3 of cellsToConsider3) {
              let freeCell3 = true;
              let cellRef3 = app.gridInfo.find((elem) => elem.number.x === cell3.x && elem.number.y === cell3.y);
              if (cellRef3) {
                let terrainInfo5 = cellRef3.levelData.length - 1;
                if (
                  cellRef3.levelData.charAt(terrainInfo5) === "j" ||
                  cellRef3.levelData.charAt(terrainInfo5) === "h" ||
                  cellRef3.levelData.charAt(terrainInfo5) === "i" ||
                  cellRef3.levelData.charAt(0) !== "x" ||
                  cellRef3.void.state === true
                ) {
                  freeCell3 = false;
                }
                for (const plyr7 of app.players) {
                  if (plyr7.currentPosition.cell.number.x === cellRef3.number.x && plyr7.currentPosition.cell.number.y === cellRef3.number.y) {
                    freeCell3 = false;
                  }
                }
              } else {
                freeCell3 = false;
              }
              if (freeCell3 === true) {
                if (cell3.x === aiPlayer.currentPosition.cell.number.x + 1 && cell3.y === aiPlayer.currentPosition.cell.number.y) {
                  evadeDirection3 = "east";
                }
                if (cell3.x === aiPlayer.currentPosition.cell.number.x - 1 && cell3.y === aiPlayer.currentPosition.cell.number.y) {
                  evadeDirection3 = "west";
                }
                if (cell3.x === aiPlayer.currentPosition.cell.number.x && cell3.y === aiPlayer.currentPosition.cell.number.y + 1) {
                  evadeDirection3 = "south";
                }
                if (cell3.x === aiPlayer.currentPosition.cell.number.x && cell3.y === aiPlayer.currentPosition.cell.number.y - 1) {
                  evadeDirection3 = "north";
                }
              }
            }

            instructions4.push({
              keyword: "strafe_" + evadeDirection3,
              count: 0,
              limit: 1,
            });
            aiPlayer.ai.targetAcquired = false;
          }
        }

        engageTargetAction = "attack";
      }

      let deflecting = false;
      if (app.aiDeflectedCheck.includes(aiPlayer.number) === true) {
        deflecting = true;
      }
      if (deflecting === true) {
        aiPlayer.ai.instructions = [];
        aiPlayer.ai.currentInstruction = 0;
        aiPlayer.ai.engaging.targetAction = "";
      }

      if (aiPlayer.ai.engaging.targetAction !== engageTargetAction && deflecting !== true) {
        // console.log('target status has changed. switch up the approach');

        // aiPlayer.ai.instructions = instructions4;
        aiPlayer.ai.instructions = applyChargePlan(instructions4);
        aiPlayer.ai.currentInstruction = 0;
        aiPlayer.ai.engaging.state = true;
        aiPlayer.ai.engaging.targetAction = engageTargetAction;
      }

      // console.log('aiPlayer.instructions',aiPlayer.ai.instructions);
    }

    // }
  }

  let defendDest;
  if (aiPlayer.ai.mission === "defend") {
    // console.log('defending',aiPlayer.ai.defending);
    // console.log('aiDecide mission: defend - prevTargetPos',prevTargetPos,'currentTargetPos',currentTargetPos);

    // TARGET LOCATION CHANGED!!
    if (prevTargetPos.x && currentTargetPos.x) {
      if (
        prevTargetPos.x !== currentTargetPos.x ||
        (prevTargetPos.y !== currentTargetPos.y && targetPlayer.dead.state !== true && targetPlayer.falling.state !== true)
      ) {
        // console.log('defending but target location changed! Dont update path. Just track target',aiPlayer.number);

        aiPlayer.ai.targetPlayer.currentPosition = {
          x: targetPlayer.currentPosition.cell.number.x,
          y: targetPlayer.currentPosition.cell.number.y,
        };
      }
    }

    // SET OUT TO DEFEND POINT
    if (!aiPlayer.ai.defending.checkin) {
      logDecide("move to defend location", { dest: aiPlayer.ai.defending.area[0] });
      aiPlayer.ai.defending.checkin = "enroute";

      if (!aiPlayer.popups.find((x) => x.msg === "missionEnroute")) {
        aiPlayer.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "missionEnroute",
          img: "",
        });
      }

      let cellsToConsider2 = [
        {
          x: aiPlayer.ai.defending.area[0].x + 1,
          y: aiPlayer.ai.defending.area[0].y,
        },
        {
          x: aiPlayer.ai.defending.area[0].x - 1,
          y: aiPlayer.ai.defending.area[0].y,
        },
        {
          x: aiPlayer.ai.defending.area[0].x,
          y: aiPlayer.ai.defending.area[0].y + 1,
        },
        {
          x: aiPlayer.ai.defending.area[0].x,
          y: aiPlayer.ai.defending.area[0].y - 1,
        },
      ];
      let freeCell2 = true;
      let freeCellNo;
      let freeCells = [];
      for (const cell2 of cellsToConsider2) {
        // console.log('cell2a',cell2);
        freeCell2 = true;
        let cellRef2 = app.gridInfo.find((elem) => elem.number.x === cell2.x && elem.number.y === cell2.y);
        if (cellRef2) {
          if (
            cellRef2.levelData.split("_")[1] !== "*" ||
            cellRef2.terrain.type === "deep" ||
            cellRef2.terrain.type === "hazard" ||
            // cellRef2.barrier.state === true ||
            cellRef2.void.state === true
          ) {
            freeCell2 = false;
          }
          for (const plyr6 of app.players) {
            if (plyr6.currentPosition.cell.number.x === cellRef2.number.x && plyr6.currentPosition.cell.number.y === cellRef2.number.y) {
              freeCell2 = false;
            }
          }
        } else {
          freeCell2 = false;
        }
        if (freeCell2 === true) {
          freeCells.push(cell2);
          // console.log('freeCellNo',cell2);
        }
      }
      let whatCell = app.rnJesus(1, freeCells.length);

      defendDest = freeCells[whatCell - 1];
      logDecide("defendDest", { dest: defendDest });
      if (aiPlayer.ai.defending.area.length > 1) {
        aiPlayer.ai.defending.area[1] = defendDest;
      }
      if (aiPlayer.ai.defending.area.length === 1) {
        aiPlayer.ai.defending.area.push(defendDest);
      }

      getPath = true;
    }

    // EN ROUTE TO DEFEND POINT
    if (aiPlayer.ai.defending.checkin === "enroute") {
      // console.log('en route to defend point');

      if (aiPlayer.attacking.state === true) {
        aiPlayer.attacking.state = false;
      }

      if (
        aiPlayer.ai.defending.area[1].x === aiPlayer.currentPosition.cell.number.x &&
        aiPlayer.ai.defending.area[1].y === aiPlayer.currentPosition.cell.number.y
      ) {
        aiPlayer.ai.defending.checkin = "checkedIn";
        aiPlayer.ai.instructions = [];
        aiPlayer.ai.currentInstruction = 0;
        // console.log('arrived @ defend point',aiPlayer.ai.instructions);
      } else {
        // console.log('en route to defend post. do nothing',aiPlayer.ai.defending.area[0]);
      }
    }

    // ARRIVED AT DEFEND POINT
    if (aiPlayer.ai.defending.checkin === "checkedIn" && aiPlayer.ai.instructions.length === 0) {
      // console.log('defend post checkedIn');
      let instructions = [];
      switch (aiPlayer.direction) {
        case "north":
          instructions = [
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_east", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_south", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_west", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_north", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
          ];
          break;
        case "east":
          instructions = [
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_south", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_west", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_north", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_east", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
          ];
          break;
        case "south":
          instructions = [
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_west", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_north", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_east", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_south", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
          ];
          break;
        case "west":
          instructions = [
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_north", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_east", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_south", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "long_wait", count: 0, limit: 25 },
            { keyword: "move_west", count: 0, limit: 1 },
            { keyword: "long_wait", count: 0, limit: 25 },
          ];
          break;
      }

      // aiPlayer.ai.instructions = instructions;
      aiPlayer.ai.instructions = applyChargePlan(instructions);
      aiPlayer.ai.currentInstruction = 0;
      // console.log('aiPlayer.ai.instructions',aiPlayer.ai.instructions);
    }
  }

  if (aiPlayer.ai.mission === "retrieve") {
    // SET OUT
    if (aiPlayer.ai.retrieving.state !== true && aiPlayer.ai.retrieving.safe === true) {
      // console.log('retrive mission start: target item ',aiPlayer.ai.retrieving.targetItem.name,targetPlayer,aiPlayer.ai.retrieving);
      aiPlayer.ai.retrieving.state = true;
      aiPlayer.ai.retrieving.checkin = "enroute";
      getPath = true;

      if (!aiPlayer.popups.find((x) => x.msg === "missionEnroute")) {
        aiPlayer.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "missionEnroute",
          img: "",
        });
      }
    }

    // EN ROUTE
    if (aiPlayer.ai.retrieving.state === true) {
      if (aiPlayer.ai.retrieving.checkin === "enroute") {
        // console.log('en route to retrieve point',aiPlayer.ai.retrieving.point);

        let targetCell = app.gridInfo.find(
          (elem) => elem.number.x === aiPlayer.ai.retrieving.point.x && elem.number.y === aiPlayer.ai.retrieving.point.y,
        );
        if (targetCell.item.name === "" || aiPlayer.ai.retrieving.targetItem.name !== targetCell.item.name) {
          logDecide("retrieveItemMissing");
          aiPlayer.ai.retrieving.checkin = "abort";
        }

        if (
          aiPlayer.currentPosition.cell.number.x === aiPlayer.ai.retrieving.point.x &&
          aiPlayer.currentPosition.cell.number.y === aiPlayer.ai.retrieving.point.y
        ) {
          logDecide("retrieveLocationArrived");
          aiPlayer.ai.retrieving.checkin = "complete";
          aiPlayer.ai.retrieving.state = false;
        }
      }
    }
  }

  if (aiPlayer.ai.mission === "retreat") {
    // SET OUT
    if (aiPlayer.ai.retreating.state !== true && aiPlayer.ai.retreating.safe === true) {
      // console.log('start retreating to',aiPlayer.ai.retreating.point);
      aiPlayer.ai.retreating.state = true;
      aiPlayer.ai.retreating.checkin = "enroute";
      getPath = true;

      if (!aiPlayer.popups.find((x) => x.msg === "missionEnroute")) {
        aiPlayer.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "missionEnroute",
          img: "",
        });
      }
    }

    // EN ROUTE
    if (aiPlayer.ai.retreating.state === true) {
      if (aiPlayer.ai.retreating.checkin === "enroute") {
        // console.log('enroute to retreat point @',aiPlayer.ai.retreating.point,'instructions',aiPlayer.ai.instructions,aiPlayer.ai.currentInstruction);
        if (
          aiPlayer.currentPosition.cell.number.x === aiPlayer.ai.retreating.point.x &&
          aiPlayer.currentPosition.cell.number.y === aiPlayer.ai.retreating.point.y
        ) {
          // console.log('arrived at retreat location');
          aiPlayer.ai.instructions.push({
            keyword: "long_wait",
            count: 0,
            limit: 25,
          });
          aiPlayer.ai.retreating.checkin = "resting";
        }
      }

      if (aiPlayer.ai.retreating.checkin === "resting") {
        if (aiPlayer.stamina.current >= aiPlayer.stamina.max) {
          logDecide("retreatComplete");
          aiPlayer.ai.retreating.checkin = "complete";
          aiPlayer.ai.retreating.state = false;
        }
      }
    }
  }

  // if player cycling and path set not true add cycle gear to plyr instructions

  let cancelPath = false;

  // SET PATH !!
  let pathSet = [];

  if (getPath === true && !targetPlayer && aiPlayer.ai.mission === "retrieve" && aiPlayer.ai.retrieving.state === true) {
    logDecide("pathfindingRetrieve");
    app.updatePathArray();
    app.easyStar = new Easystar.js();

    let aiPos;
    let targetPos;

    // console.log('get retrive path',aiPlayer.ai.retrieving.point);
    aiPos = aiPlayer.currentPosition.cell.number;
    targetPos = {
      x: aiPlayer.ai.retrieving.point.x,
      y: aiPlayer.ai.retrieving.point.y,
    };

    app.easyStar.setGrid(app.pathArray);
    app.easyStar.setAcceptableTiles([0]);

    // PLAYER CELLS TO AVOID
    for (const plyr of app.players) {
      // console.log('building pathfind obstacles checking plyr',plyr.number);
      if (
        plyr.dead.state !== true &&
        plyr.falling.state !== true &&
        plyr.respawn !== true &&
        plyr.number !== aiPlayer.number &&
        plyr.number !== targetPlayer.number
      ) {
        // console.log('avoid plyr',plyr.number,'@',plyr.currentPosition.cell.number.x, plyr.currentPosition.cell.number.y);
        app.easyStar.avoidAdditionalPoint(plyr.currentPosition.cell.number.x, plyr.currentPosition.cell.number.y);
      }
    }

    // AVOID PATHS THAT GO CLOSE TO ENEMY PLAYERS IF ALIVE
    for (const plyr of app.players) {
      if (plyr.ai.state !== true && plyr.dead.state !== true && plyr.falling.state !== true) {
        logDecide("carefulPathing", { mission: aiPlayer.ai.mission, enemy_no: plyr.number });
        let rng;
        let span;

        if (plyr.currentWeapon.type === "sword" || plyr.currentWeapon.name === "") {
          rng = 1;
        } else {
          rng = 2;
        }
        span = rng * 2 + 1;
        let cornerCell = undefined;
        let whichCorner;

        while (!cornerCell) {
          let whichCorner2 = app.rnJesus(1, 4);

          switch (whichCorner2) {
            case 1:
              cornerCell = app.gridInfo.find(
                (elem) => elem.number.x === plyr.currentPosition.cell.number.x + rng && elem.number.y === plyr.currentPosition.cell.number.y + rng,
              );
              whichCorner = "southEast";
              break;
            case 2:
              cornerCell = app.gridInfo.find(
                (elem) => elem.number.x === plyr.currentPosition.cell.number.x - rng && elem.number.y === plyr.currentPosition.cell.number.y - rng,
              );
              whichCorner = "northWest";
              break;
            case 3:
              cornerCell = app.gridInfo.find(
                (elem) => elem.number.x === plyr.currentPosition.cell.number.x - rng && elem.number.y === plyr.currentPosition.cell.number.y + rng,
              );
              whichCorner = "southWest";
              break;
            case 4:
              cornerCell = app.gridInfo.find(
                (elem) => elem.number.x === plyr.currentPosition.cell.number.x + rng && elem.number.y === plyr.currentPosition.cell.number.y - rng,
              );
              whichCorner = "northEast";
              break;
          }
        }

        if (cornerCell) {
          // console.log('cornerCell',cornerCell.number);

          for (var i = 0; i < span; i++) {
            let startCell;
            switch (whichCorner) {
              case "southEast":
                startCell = {
                  x: cornerCell.number.x - i,
                  y: cornerCell.number.y,
                };
                break;
              case "northEast":
                startCell = {
                  x: cornerCell.number.x - i,
                  y: cornerCell.number.y,
                };
                break;
              case "southWest":
                startCell = {
                  x: cornerCell.number.x + i,
                  y: cornerCell.number.y,
                };
                break;
              case "northWest":
                startCell = {
                  x: cornerCell.number.x + i,
                  y: cornerCell.number.y,
                };
                break;
            }
            // console.log('startCell',startCell,i);

            for (var j = 0; j < span; j++) {
              let cell;

              switch (whichCorner) {
                case "southEast":
                  cell = {
                    x: startCell.x,
                    y: startCell.y - j,
                  };
                  break;
                case "northEast":
                  cell = {
                    x: startCell.x,
                    y: startCell.y + j,
                  };
                  break;
                case "southWest":
                  cell = {
                    x: startCell.x,
                    y: startCell.y - j,
                  };
                  break;
                case "northWest":
                  cell = {
                    x: startCell.x,
                    y: startCell.y + j,
                  };
                  break;
              }
              // console.log('cell',cell,j);

              if (cell.x <= app.gridWidth && cell.x >= 0 && cell.y <= app.gridWidth && cell.y >= 0) {
                // console.log(aiPlayer.ai.mission,'avoid cell ',cell);
                app.easyStar.avoidAdditionalPoint(cell.x, cell.y);
              }
            }
          }
        }
      }
    }

    // AVOID DEBUFFS!!
    if (aiPlayer.ai.mission === "retrieve") {
      let fieldItemScan = [];
      for (const cell of app.gridInfo) {
        if (cell.item.name !== "") {
          fieldItemScan.push({
            name: cell.item.name,
            type: cell.item.type,
            subType: cell.item.subType,
            effect: cell.item.effect,
            location: { x: cell.number.x, y: cell.number.y },
          });
        }
      }

      let nerfItemPositions = [];
      for (const item of fieldItemScan) {
        switch (item.name) {
          case "moveSpeedDown":
            nerfItemPositions.push(item);
            break;
          case "hpDown":
            nerfItemPositions.push(item);
            break;
          case "focusDown":
            nerfItemPositions.push(item);
            break;
          case "strengthDown":
            nerfItemPositions.push(item);
            break;
        }
      }

      for (const nerf of nerfItemPositions) {
        app.easyStar.avoidAdditionalPoint(nerf.location.x, nerf.location.y);
      }
    }

    // TERRAIN & OBSTACLE CELLS TO AVOID
    for (const cell2 of app.gridInfo) {
      if (isUnsafeCell(cell2) && !isJumpGapCell(cell2)) {
        app.easyStar.avoidAdditionalPoint(cell2.number.x, cell2.number.y);
      }
    }

    // FIND PATH!
    app.players[aiPlayer.number - 1].ai.easyStarPath = app.easyStar.findPath(aiPos.x, aiPos.y, targetPos.x, targetPos.y, function (path) {
      if (path === null) {
        cancelPath = true;
        logDecide("pathNotFound", { plyr_no: aiPlayer.number });
      } else {
        pathSet = path;
      }
    });

    app.easyStar.setIterationsPerCalculation(4000);
    app.easyStar.calculate();
    setTimeout(() => {
      // console.log('plyr',aiPlayer.number,'pathSet',pathSet,app.players[aiPlayer.number-1].ai.easyStarPath);

      if (cancelPath === true) {
        logDecide("pathCanceled");
        app.easyStar = new Easystar.js();
        app.players[aiPlayer.number - 1].ai.targetAcquired = false;
      }
      app.aiParsePath(pathSet, aiPlayer.number);
    }, 50);
  }

  if (targetPlayer) {
    if (getPath === true && targetPlayer.dead.state !== true && targetPlayer.falling.state !== true) {
      logDecide("pathfindingStart");
      app.updatePathArray();
      app.easyStar = new Easystar.js();

      let aiPos;
      let targetPos;

      if (aiPlayer.ai.mission === "pursue") {
        aiPos = aiPlayer.currentPosition.cell.number;
        targetPos = app.players[aiPlayer.ai.targetPlayer.number - 1].currentPosition.cell.number;
        logDecide("pursuitTarget", { target_pos: targetPos });

        if (aiPlayer.ai.safeRange === true) {
          let candidateTargets = [
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
          ];

          if (aiPlayer.currentWeapon.type === "crossbow") {
            // candidateTargets = [
            //   {x: targetPos.x-6, y: targetPos.y},
            //   {x: targetPos.x+6, y: targetPos.y},
            //   {x: targetPos.x, y: targetPos.y+6},
            //   {x: targetPos.x, y: targetPos.y-6},
            // ]
            let range = aiPlayer.ai.pathfindingRanges.crossbow;
            candidateTargets = [
              { x: targetPos.x - range, y: targetPos.y },
              { x: targetPos.x + range, y: targetPos.y },
              { x: targetPos.x, y: targetPos.y + range },
              { x: targetPos.x, y: targetPos.y - range },
            ];

            // console.log('candidateTargets',candidateTargets);

            let freeSpaces = [];

            for (const rangeElem of candidateTargets) {
              let indx = candidateTargets.findIndex((rng) => rng.x === rangeElem.x && rng.y === rangeElem.y);

              let pursuitTargetRef = app.gridInfo.find((elem) => elem.number.x === rangeElem.x && elem.number.y === rangeElem.y);

              if (!pursuitTargetRef) {
                // console.log('range element is  out of bounds',rangeElem,'indx',indx);
              } else {
                let rangeElemCells2 = [];

                // DON'T fire from obstructed position
                // app.cellsToHighlight.push(rangeElem)

                let dirToFire;
                let diff = 0;
                if (rangeElem.x === targetPos.x && rangeElem.y > targetPos.y) {
                  dirToFire = "north";
                  diff = rangeElem.y - targetPos.y;
                  for (var i = 0; i < diff; i++) {
                    rangeElemCells2.push({
                      x: rangeElem.x,
                      y: rangeElem.y - i,
                    });
                    // app.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y - i})
                  }
                }
                if (rangeElem.x > targetPos.x && rangeElem.y === targetPos.y) {
                  dirToFire = "west";
                  diff = rangeElem.x - targetPos.x;
                  for (var i = 0; i < diff; i++) {
                    rangeElemCells2.push({
                      x: rangeElem.x - i,
                      y: rangeElem.y,
                    });
                    // app.cellsToHighlight.push({x:rangeElem.x - i, y: rangeElem.y})
                  }
                }
                if (rangeElem.x === targetPos.x && rangeElem.y < targetPos.y) {
                  dirToFire = "south";
                  diff = targetPos.y - rangeElem.y;
                  for (var i = 0; i < diff; i++) {
                    rangeElemCells2.push({
                      x: rangeElem.x,
                      y: rangeElem.y + i,
                    });
                    // app.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y + i})
                  }
                }
                if (rangeElem.x < targetPos.x && rangeElem.y === targetPos.y) {
                  dirToFire = "east";
                  diff = targetPos.x - rangeElem.x;
                  for (var i = 0; i < diff; i++) {
                    rangeElemCells2.push({
                      x: rangeElem.x + i,
                      y: rangeElem.y,
                    });
                    // app.cellsToHighlight.push({x:rangeElem.x + i, y: rangeElem.y})
                  }
                } else {
                  // console.log('exception! rangeElem,targetPos',rangeElem,targetPos);
                }

                // let rangeElemCells = [];
                // switch(indx) {
                //   case 0:
                //     rangeElemCells = [
                //       // {x:rangeElem - 5, y: rangeElem.y },
                //       {x:rangeElem.x - 4, y: rangeElem.y },
                //       {x:rangeElem.x - 3, y: rangeElem.y },
                //       {x:rangeElem.x - 2, y: rangeElem.y },
                //       {x:rangeElem.x - 1, y: rangeElem.y },
                //     ]
                //   break;
                //   case 1:
                //     rangeElemCells = [
                //       // {x:rangeElem + 5, y: rangeElem.y },
                //       {x:rangeElem.x + 4, y: rangeElem.y },
                //       {x:rangeElem.x + 3, y: rangeElem.y },
                //       {x:rangeElem.x + 2, y: rangeElem.y },
                //       {x:rangeElem.x + 1, y: rangeElem.y },
                //     ]
                //   break;
                //   case 2:
                //     rangeElemCells = [
                //       // {x:rangeElem, y: rangeElem.y + 5},
                //       {x:rangeElem.x, y: rangeElem.y + 4},
                //       {x:rangeElem.x, y: rangeElem.y + 3},
                //       {x:rangeElem.x, y: rangeElem.y + 2},
                //       {x:rangeElem.x, y: rangeElem.y + 1},
                //     ]
                //   break;
                //   case 3:
                //     rangeElemCells = [
                //       // {x:rangeElem, y: rangeElem.y - 5},
                //       {x:rangeElem.x, y: rangeElem.y - 4},
                //       {x:rangeElem.x, y: rangeElem.y - 3},
                //       {x:rangeElem.x, y: rangeElem.y - 2},
                //       {x:rangeElem.x, y: rangeElem.y - 1},
                //     ]
                //   break;
                //   // case 4:
                //   //   rangeElemCells = [
                //   //     {x:rangeElem, y: rangeElem.y - 5},
                //   //     {x:rangeElem, y: rangeElem.y - 4},
                //   //     {x:rangeElem, y: rangeElem.y - 3},
                //   //     {x:rangeElem, y: rangeElem.y - 2},
                //   //     {x:rangeElem, y: rangeElem.y - 1},
                //   //   ]
                //   // break;
                // }

                // IS FIRE POSITION FREE?
                let rngElCellFree = true;
                let cellRef3 = app.gridInfo.find((elema) => elema.number.x === rangeElem.x && elema.number.y === rangeElem.y);
                if (cellRef3) {
                  if (
                    cellRef3.levelData.charAt(0) === "z" ||
                    cellRef3.levelData.charAt(0) === "y" ||
                    cellRef3.terrain.type === "deep" ||
                    cellRef3.terrain.type === "hazard"
                  ) {
                    rngElCellFree = false;
                  } else {
                  }
                } else if (!cellRef3) {
                  rngElCellFree = false;
                }

                let clearToShoot = false;
                // IS SIGHT OBSTRUCTED?
                if (rngElCellFree === true) {
                  let obstructions = [];
                  for (const cellx of rangeElemCells2) {
                    let cellRef4 = app.gridInfo.find((elemb) => elemb.number.x === cellx.x && elemb.number.y === cellx.y);

                    if (cellRef4.levelData.charAt(0) === "y" || cellRef4.levelData.charAt(0) === "z") {
                      // clearToShoot = false;
                      obstructions.push(cellx);
                    }
                    if (cellRef4.levelData.charAt(0) !== "y" && cellRef4.levelData.charAt(0) !== "z") {
                      // clearToShoot = true;
                      // obstructions.push(cellx)
                    }
                  }

                  // if (clearToShoot === true) {
                  if (obstructions.length === 0) {
                    freeSpaces.push(rangeElem);
                    // app.cellsToHighlight = rangeElemCells2;
                    // console.log('rangeElemCells2',rangeElemCells2);
                    // console.log('found path to safe bow range',targetPos);
                  } else {
                    // console.log('target obstructed @',obstructions);
                  }
                } else {
                  logDecide("safePathBlocked");
                }
              }
            }

            if (freeSpaces[0]) {
              // console.log('freeSpaces',freeSpaces);
              targetPos = freeSpaces[0];
              // console.log('found path to safe bow range',targetPos);
            } else {
              logDecide("noCrossbowFiringPosition");
              if (aiPlayer.ai.pathfindingRanges.crossbow > 1) {
                aiPlayer.ai.pathfindingRanges.crossbow--;
              }
              aiPlayer.ai.safeRange = false;
              aiPlayer.ai.targetAcquired = false;

              let fieldItemScan = [];
              for (const cell of app.gridInfo) {
                if (cell.item.name !== "") {
                  fieldItemScan.push({
                    name: cell.item.name,
                    type: cell.item.type,
                    subType: cell.item.subType,
                    effect: cell.item.effect,
                    location: { x: cell.number.x, y: cell.number.y },
                  });
                }
              }
              if (fieldItemScan.find((x) => x.type === "spear") || fieldItemScan.find((x) => x.type === "sword")) {
                aiPlayer.ai.upgradeWeapon = true;
                aiPlayer.ai.organizing.weaponPriorityIndex = 1;
              } else {
                aiPlayer.currentWeapon = {
                  name: "",
                  type: "",
                  effect: "",
                };
                logDecide("crossbowNoOptionSwitchUnarmed");
              }
            }
          }

          if (aiPlayer.currentWeapon.type === "spear") {
            let range = aiPlayer.ai.pathfindingRanges.spear;
            candidateTargets = [
              { x: targetPos.x - range, y: targetPos.y },
              { x: targetPos.x + range, y: targetPos.y },
              { x: targetPos.x, y: targetPos.y + range },
              { x: targetPos.x, y: targetPos.y - range },
            ];

            // for (const rangeElem of candidateTargets)  {
            //   let indx = candidateTargets.findIndex(rng => rng.x === rangeElem.x && rng.y === rangeElem.y)
            //
            //   let pursuitTargetRef = app.gridInfo.find(elem => elem.number.x === rangeElem.x && elem.number.y === rangeElem.y)
            //
            //   if (!pursuitTargetRef) {
            //    // console.log('range element is out of bounds');
            //   } else {
            //
            //
            //     let rangeElemCells;
            //
            //     switch(indx) {
            //       case 0:
            //         rangeElemCells = [
            //           {x:rangeElem - 2, y: rangeElem.y },
            //           {x:rangeElem - 1, y: rangeElem.y },
            //         ]
            //       break;
            //       case 1:
            //         rangeElemCells = [
            //           {x:rangeElem + 2, y: rangeElem.y },
            //           {x:rangeElem + 1, y: rangeElem.y },
            //         ]
            //       break;
            //       case 2:
            //         rangeElemCells = [
            //           {x:rangeElem, y: rangeElem.y + 2},
            //           {x:rangeElem, y: rangeElem.y + 1},
            //         ]
            //       break;
            //       case 3:
            //         rangeElemCells = [
            //           {x:rangeElem, y: rangeElem.y - 2},
            //           {x:rangeElem, y: rangeElem.y - 1},
            //         ]
            //       break;
            //     }
            //
            //     let rngElCellFree = true;
            //     for (const rngElCell of rangeElemCells) {
            //
            //       for (const plyr of app.players) {
            //         if (plyr.currentPosition.cell.number.x === rngElCell.x && plyr.currentPosition.cell.number.y === rngElCell.y) {
            //           rngElCellFree = false;
            //         }
            //         let cellRef3 = app.gridInfo.find(elema => elema.number.x === rngElCell.x && elema.number.y === rngElCell.y)
            //         if (cellRef3) {
            //           if (
            //             cellRef3.levelData.charAt(0) ===  'z' ||
            //             cellRef3.levelData.charAt(0) ===  'y' ||
            //             cellRef3.terrain.type ===  'deep' ||
            //             cellRef3.terrain.type ===  'hazard'
            //           ) {
            //             rngElCellFree = false;
            //           }
            //         }
            //
            //       }
            //     }
            //     if (rngElCellFree === true) {
            //       targetPos = rangeElem;
            //       // console.log('found path to safe spear range');
            //     } else {
            //       console.log('your safe path is blocked');
            //     }
            //   }
            // }

            let freeSpaces = [];

            for (const rangeElem of candidateTargets) {
              // app.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y})
              let indx = candidateTargets.findIndex((rng) => rng.x === rangeElem.x && rng.y === rangeElem.y);

              let pursuitTargetRef = app.gridInfo.find((elem) => elem.number.x === rangeElem.x && elem.number.y === rangeElem.y);

              if (!pursuitTargetRef) {
                // console.log('range element is  out of bounds',rangeElem,'indx',indx);
              } else {
                let rangeElemCells2 = [];

                let dirToFire;
                let diff = 0;
                if (rangeElem.x === targetPos.x && rangeElem.y > targetPos.y) {
                  dirToFire = "north";
                  diff = rangeElem.y - targetPos.y;
                  for (var i = 0; i < diff; i++) {
                    rangeElemCells2.push({
                      x: rangeElem.x,
                      y: rangeElem.y - i,
                    });
                    // app.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y - i})
                  }
                }
                if (rangeElem.x > targetPos.x && rangeElem.y === targetPos.y) {
                  dirToFire = "west";
                  diff = rangeElem.x - targetPos.x;
                  for (var i = 0; i < diff; i++) {
                    rangeElemCells2.push({
                      x: rangeElem.x - i,
                      y: rangeElem.y,
                    });
                    // app.cellsToHighlight.push({x:rangeElem.x - i, y: rangeElem.y})
                  }
                }
                if (rangeElem.x === targetPos.x && rangeElem.y < targetPos.y) {
                  dirToFire = "south";
                  diff = targetPos.y - rangeElem.y;
                  for (var i = 0; i < diff; i++) {
                    rangeElemCells2.push({
                      x: rangeElem.x,
                      y: rangeElem.y + i,
                    });
                    // app.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y + i})
                  }
                }
                if (rangeElem.x < targetPos.x && rangeElem.y === targetPos.y) {
                  dirToFire = "east";
                  diff = targetPos.x - rangeElem.x;
                  for (var i = 0; i < diff; i++) {
                    rangeElemCells2.push({
                      x: rangeElem.x + i,
                      y: rangeElem.y,
                    });
                    // app.cellsToHighlight.push({x:rangeElem.x + i, y: rangeElem.y})
                  }
                } else {
                  // console.log('exception! rangeElem,targetPos',rangeElem,targetPos);
                }

                // IS attack POSITION FREE?
                let rngElCellFree = true;
                let cellRef3 = app.gridInfo.find((elema) => elema.number.x === rangeElem.x && elema.number.y === rangeElem.y);
                if (cellRef3) {
                  if (
                    cellRef3.levelData.charAt(0) === "z" ||
                    cellRef3.levelData.charAt(0) === "y" ||
                    cellRef3.terrain.type === "deep" ||
                    cellRef3.terrain.type === "hazard"
                  ) {
                    rngElCellFree = false;
                  } else {
                  }
                } else if (!cellRef3) {
                  rngElCellFree = false;
                }

                let clearToShoot = false;
                // IS SIGHT OBSTRUCTED?
                if (rngElCellFree === true) {
                  let obstructions = [];
                  for (const cellx of rangeElemCells2) {
                    let cellRef4 = app.gridInfo.find((elemb) => elemb.number.x === cellx.x && elemb.number.y === cellx.y);

                    if (cellRef4.levelData.charAt(0) === "y" || cellRef4.levelData.charAt(0) === "z") {
                      // clearToShoot = false;
                      obstructions.push(cellx);
                    }
                    if (cellRef4.levelData.charAt(0) !== "y" && cellRef4.levelData.charAt(0) !== "z") {
                      // clearToShoot = true;
                      // obstructions.push(cellx)
                    }
                  }

                  // if (clearToShoot === true) {
                  if (obstructions.length === 0) {
                    freeSpaces.push(rangeElem);
                    // app.cellsToHighlight = rangeElemCells2;
                    // console.log('rangeElemCells2',rangeElemCells2);
                    // console.log('found path to safe bow range',targetPos);
                  } else {
                    logDecide("targetObstructed", { obstructions: obstructions });
                  }
                } else {
                  logDecide("safePathBlocked");
                }
              }
            }

            if (freeSpaces[0]) {
              // console.log('freeSpaces',freeSpaces);
              targetPos = freeSpaces[0];
              // console.log('found path to safe spear range',targetPos);
            } else {
              logDecide("noSpearFiringPosition");
              if (aiPlayer.ai.pathfindingRanges.spear > 1) {
                aiPlayer.ai.pathfindingRanges.spear--;
              }
              aiPlayer.ai.safeRange = false;
              aiPlayer.ai.targetAcquired = false;
            }
          }
          if (aiPlayer.currentWeapon.type === "sword" || aiPlayer.currentWeapon.name === "") {
            candidateTargets = [
              { x: targetPos.x - 2, y: targetPos.y },
              { x: targetPos.x + 2, y: targetPos.y },
              { x: targetPos.x, y: targetPos.y + 2 },
              { x: targetPos.x, y: targetPos.y - 2 },
            ];

            for (const rangeElem of candidateTargets) {
              let indx = candidateTargets.findIndex((rng) => rng.x === rangeElem.x && rng.y === rangeElem.y);

              let pursuitTargetRef = app.gridInfo.find((elem) => elem.number.x === rangeElem.x && elem.number.y === rangeElem.y);

              if (!pursuitTargetRef) {
                // console.log('range element is out of bounds');
              } else {
                let rangeElemCells;

                switch (indx) {
                  case 0:
                    rangeElemCells = [{ x: rangeElem - 1, y: rangeElem.y }];
                    break;
                  case 1:
                    rangeElemCells = [{ x: rangeElem + 1, y: rangeElem.y }];
                    break;
                  case 2:
                    rangeElemCells = [{ x: rangeElem, y: rangeElem.y + 1 }];
                    break;
                  case 3:
                    rangeElemCells = [{ x: rangeElem, y: rangeElem.y - 1 }];
                    break;
                }

                let rngElCellFree = true;
                for (const rngElCell of rangeElemCells) {
                  for (const plyr of app.players) {
                    if (plyr.currentPosition.cell.number.x === rngElCell.x && plyr.currentPosition.cell.number.y === rngElCell.y) {
                      rngElCellFree = false;
                    }
                    let cellRef3 = app.gridInfo.find((elema) => elema.number.x === rngElCell.x && elema.number.y === rngElCell.y);
                    if (cellRef3) {
                      if (
                        cellRef3.levelData.charAt(0) === "z" ||
                        cellRef3.levelData.charAt(0) === "y" ||
                        cellRef3.terrain.type === "deep" ||
                        cellRef3.terrain.type === "hazard"
                      ) {
                        rngElCellFree = false;
                      }
                    }
                  }
                }
                if (rngElCellFree === true) {
                  targetPos = rangeElem;
                  // console.log('found path to safe sword range',targetPos);
                } else {
                  logDecide("safePathBlocked");
                }
              }
            }
          }
        }

        // app.pathArray[targetPos.x][targetPos.y] = 0;
        // app.pathArray[aiPos.x][aiPos.y] = 0;
      }
      if (aiPlayer.ai.mission === "patrol") {
        aiPos = aiPlayer.currentPosition.cell.number;
        targetPos = patrolDest;

        // app.pathArray[targetPos.x][targetPos.y] = 0;
      }
      if (aiPlayer.ai.mission === "engage") {
      }
      if (aiPlayer.ai.mission === "defend") {
        aiPos = aiPlayer.currentPosition.cell.number;
        targetPos = defendDest;

        logDecide("pathfindingTarget", { target_pos: targetPos });
        // app.pathArray[targetPos.x][targetPos.y] = 0;
      }
      if (aiPlayer.ai.mission === "retreat") {
        // console.log('get retreat path',aiPlayer.ai.retreating.point);
        aiPos = aiPlayer.currentPosition.cell.number;
        targetPos = {
          x: aiPlayer.ai.retreating.point.x,
          y: aiPlayer.ai.retreating.point.y,
        };
      }
      if (aiPlayer.ai.mission === "retrieve") {
        logDecide("retrievePath", { target_pos: aiPlayer.ai.retrieving.point });
        aiPos = aiPlayer.currentPosition.cell.number;
        targetPos = {
          x: aiPlayer.ai.retrieving.point.x,
          y: aiPlayer.ai.retrieving.point.y,
        };
      }

      app.easyStar.setGrid(app.pathArray);
      app.easyStar.setAcceptableTiles([0]);

      // PLAYER CELLS TO AVOID
      for (const plyr of app.players) {
        // console.log('building pathfind obstacles checking plyr',plyr.number);
        if (
          plyr.dead.state !== true &&
          plyr.falling.state !== true &&
          plyr.respawn !== true &&
          plyr.number !== aiPlayer.number &&
          plyr.number !== targetPlayer.number
        ) {
          // console.log('avoid plyr',plyr.number,'@',plyr.currentPosition.cell.number.x, plyr.currentPosition.cell.number.y);
          app.easyStar.avoidAdditionalPoint(plyr.currentPosition.cell.number.x, plyr.currentPosition.cell.number.y);
        }
      }

      // AVOID PATHS THAT GO CLOSE TO ENEMY PLAYERS
      if (aiPlayer.ai.mission === "retreat" || aiPlayer.ai.mission === "retrieve") {
        for (const plyr of app.players) {
          if (plyr.ai.state !== true) {
            logDecide("carefulPathing", { mission: aiPlayer.ai.mission, enemy_no: plyr.number });
            let rng;
            let span;

            if (plyr.currentWeapon.type === "sword" || plyr.currentWeapon.name === "") {
              rng = 1;
            } else {
              rng = 2;
            }
            span = rng * 2 + 1;
            let cornerCell = undefined;
            let whichCorner;

            while (!cornerCell) {
              let whichCorner2 = app.rnJesus(1, 4);

              switch (whichCorner2) {
                case 1:
                  cornerCell = app.gridInfo.find(
                    (elem) =>
                      elem.number.x === plyr.currentPosition.cell.number.x + rng && elem.number.y === plyr.currentPosition.cell.number.y + rng,
                  );
                  whichCorner = "southEast";
                  break;
                case 2:
                  cornerCell = app.gridInfo.find(
                    (elem) =>
                      elem.number.x === plyr.currentPosition.cell.number.x - rng && elem.number.y === plyr.currentPosition.cell.number.y - rng,
                  );
                  whichCorner = "northWest";
                  break;
                case 3:
                  cornerCell = app.gridInfo.find(
                    (elem) =>
                      elem.number.x === plyr.currentPosition.cell.number.x - rng && elem.number.y === plyr.currentPosition.cell.number.y + rng,
                  );
                  whichCorner = "southWest";
                  break;
                case 4:
                  cornerCell = app.gridInfo.find(
                    (elem) =>
                      elem.number.x === plyr.currentPosition.cell.number.x + rng && elem.number.y === plyr.currentPosition.cell.number.y - rng,
                  );
                  whichCorner = "northEast";
                  break;
              }
            }

            if (cornerCell) {
              // console.log('cornerCell',cornerCell.number);

              for (var i = 0; i < span; i++) {
                let startCell;
                switch (whichCorner) {
                  case "southEast":
                    startCell = {
                      x: cornerCell.number.x - i,
                      y: cornerCell.number.y,
                    };
                    break;
                  case "northEast":
                    startCell = {
                      x: cornerCell.number.x - i,
                      y: cornerCell.number.y,
                    };
                    break;
                  case "southWest":
                    startCell = {
                      x: cornerCell.number.x + i,
                      y: cornerCell.number.y,
                    };
                    break;
                  case "northWest":
                    startCell = {
                      x: cornerCell.number.x + i,
                      y: cornerCell.number.y,
                    };
                    break;
                }
                // console.log('startCell',startCell,i);

                for (var j = 0; j < span; j++) {
                  let cell;

                  switch (whichCorner) {
                    case "southEast":
                      cell = {
                        x: startCell.x,
                        y: startCell.y - j,
                      };
                      break;
                    case "northEast":
                      cell = {
                        x: startCell.x,
                        y: startCell.y + j,
                      };
                      break;
                    case "southWest":
                      cell = {
                        x: startCell.x,
                        y: startCell.y - j,
                      };
                      break;
                    case "northWest":
                      cell = {
                        x: startCell.x,
                        y: startCell.y + j,
                      };
                      break;
                  }
                  // console.log('cell',cell,j);

                  if (cell.x <= app.gridWidth && cell.x >= 0 && cell.y <= app.gridWidth && cell.y >= 0) {
                    // console.log(aiPlayer.ai.mission,'avoid cell ',cell);
                    app.easyStar.avoidAdditionalPoint(cell.x, cell.y);
                  }
                }
              }
            }
          }
        }

        // AVOID DEBUFFS!!
        if (aiPlayer.ai.mission === "retrive") {
          let fieldItemScan = [];
          for (const cell of app.gridInfo) {
            if (cell.item.name !== "") {
              fieldItemScan.push({
                name: cell.item.name,
                type: cell.item.type,
                subType: cell.item.subType,
                effect: cell.item.effect,
                location: { x: cell.number.x, y: cell.number.y },
              });
            }
          }

          let nerfItemPositions = [];
          for (const item of fieldItemScan) {
            switch (item.name) {
              case "moveSpeedDown":
                nerfItemPositions.push(item);
                break;
              case "hpDown":
                nerfItemPositions.push(item);
                break;
              case "focusDown":
                nerfItemPositions.push(item);
                break;
              case "strengthDown":
                nerfItemPositions.push(item);
                break;
            }
          }

          for (const nerf of nerfItemPositions) {
            app.easyStar.avoidAdditionalPoint(nerf.location.x, nerf.location.y);
          }
        }
      }

      // '**_*_0.0_a_0**'
      // barrierType(a,b,c)BarrierPosition(n,s,e,w)_obstacle_x.y_terrain_elevationNumber(0,1,2)ElevationType(a,b,c)ElevationPosition(n,s,e,w)

      // TERRAIN & OBSTACLE CELLS TO AVOID
      for (const cell2 of app.gridInfo) {
        if (isUnsafeCell(cell2) && !isJumpGapCell(cell2)) {
          app.easyStar.avoidAdditionalPoint(cell2.number.x, cell2.number.y);
        }
      }

      // FIND PATH!
      app.players[aiPlayer.number - 1].ai.easyStarPath = app.easyStar.findPath(aiPos.x, aiPos.y, targetPos.x, targetPos.y, function (path) {
        if (path === null) {
          cancelPath = true;
          logDecide("pathNotFound", { plyr_no: aiPlayer.number });
        } else {
          pathSet = path;
        }
      });

      app.easyStar.setIterationsPerCalculation(4000);
      app.easyStar.calculate();
      setTimeout(() => {
        // console.log('plyr',aiPlayer.number,'pathSet',pathSet,app.players[aiPlayer.number-1].ai.easyStarPath);

        if (cancelPath === true) {
          logDecide("pathCanceled");
          app.easyStar = new Easystar.js();
          app.players[aiPlayer.number - 1].ai.targetAcquired = false;
        }
        app.aiParsePath(pathSet, aiPlayer.number);
      }, 50);
    }
  }

  app.players[aiPlayer.number - 1] = aiPlayer;

  app.aiAct(aiPlayer);
}
